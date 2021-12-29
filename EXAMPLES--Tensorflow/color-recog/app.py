# turn off Tensorflow CUDA warning
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
import pathlib
from tensorflow import keras

# Определяем папку с картинками
DATASET_DIR = './dataset'
# Определяем сколько вариантов ответа или цветов в данном случае может быть
COLOR_NAMES_MAP = {'black': 0, 'grey': 1, 'white': 2}
COLOR_NAMES = list(COLOR_NAMES_MAP.keys()) 



# ======================================> Указание пути к Dataset
# Делаем указатель на папку с помощью библитеки pathlib
# она поможет получить все пути к картинкам 
data_root = pathlib.Path(DATASET_DIR)

# Проверка типа:
# print(type(data_root)) - pathlib.WindowsPath

# Крутим цикл внутри списка(массива) и заполняем тот самый массив путями к картинкам
imagesPathes = [str(path) for path in data_root.iterdir()]
# print(imagesPathes)

# Создаем метки в соотвествии с названиями каритнок
imagesLabels = [0, 1, 2]
# for path in data_root.iterdir():
#   imagesLabels.append(COLOR_NAMES_MAP[path.stem])


# ======================================> Обработка данных для TensorFlow
# Функции для обработки картинок для Tensorflow
def load_and_preprocess_image(path):
  image = tf.io.read_file(path)
  return preprocess_image(image)

def preprocess_image(image):
  image = tf.io.decode_png(image, channels=0)
  image = tf.image.resize(image, [192, 192])
  image /= 255.0  # normalize to [0,1] range
  return image


# Показать обработанную картинку
# img_path = imagesPathes[1]
# plt.imshow(load_and_preprocess_image(img_path))
# plt.grid(False)
# plt.title("grey")
# plt.show()


# ======================================> Создание Dataset для Tensorflow
imagesData = []
for path in imagesPathes:
  imagesData.append(load_and_preprocess_image(path))

# train_data = np.array(imagesData)
# train_labels = np.array(imagesLabels)

# делает из обычного массива нарезку для tensorflow
# path_dataset = tf.data.Dataset.from_tensor_slices(imagesPathes)

# Создадим новый датасет который загружает и форматирует изображения на лету пройдясь 
# с preprocess_image по датасету с путями к файлам.
# image_dataset = path_dataset.map(
#   load_and_preprocess_image, 
#   num_parallel_calls=tf.data.experimental.AUTOTUNE
# )

# label_dataset = tf.data.Dataset.from_tensor_slices(tf.cast(imagesLabels, tf.int64))

# print(imagesData[0])
# print(label_dataset)


# image_label_ds = tf.data.Dataset.zip((image_dataset, label_dataset))
# print(image_label_ds)


image_label_ds = tf.data.Dataset.from_tensor_slices((imagesPathes, imagesLabels))
print(image_label_ds)

# Кортежи распаковываются в позиционные аргументы отображаемой функции
def load_and_preprocess_from_path_label(path, label):
  return load_and_preprocess_image(path), label

ds = image_label_ds.map(load_and_preprocess_from_path_label)
print(ds)


# Установка размера буфера перемешивания, равного набору данных, гарантирует
# полное перемешивание данных.
# ds = image_label_ds.shuffle(buffer_size=len(imagesPathes))
# ds = ds.repeat()
# ds = ds.batch(BATCH_SIZE)
# # `prefetch` позволяет датасету извлекать пакеты в фоновом режиме, во время обучения модели.
# ds = ds.prefetch(buffer_size=tf.data.experimental.AUTOTUNE)

BATCH_SIZE = 32

ds = ds.shuffle(buffer_size=len(imagesPathes))
ds = ds.repeat()
ds = ds.batch(BATCH_SIZE)
ds = ds.prefetch(buffer_size=tf.data.experimental.AUTOTUNE)
print(ds)

# =================================================================> СОЗДАНИЕ и ТРЕНИРОВКА
# Создание модели 
model = keras.Sequential([
  # input neurons - 28*28 = 784 input neurons
  # flatten - means from 2 dimensial array make values into 1 dimension
  # keras.layers.Dense(units=2, input_shape=(192, 192)),

  # hidden neurons (128 its 16% of input neurons)
  # keras.layers.Dense(128, activation="relu"),
  tf.keras.layers.GlobalAveragePooling2D(input_shape=(192, 192, 3)),
  
  # output neurons  - softmax set probability from 0 to 1
  keras.layers.Dense(len(imagesLabels), activation="softmax") # кол-во соотвествует "class_names"
])


# # Настройка логики модели
model.compile(
  optimizer="adam",
  loss="sparse_categorical_crossentropy",
  metrics=["accuracy"],
)


# # Обучение модели на данных (показываем данные для тренировки)
# # 5 кругов будет скармливаться рандомные данные для тренировки(train_images, train_labels)
# # нейронной сети
# steps_per_epoch=tf.math.ceil(len(imagesLabels)/BATCH_SIZE).numpy()
epochs = 12
steps_per_epoch = 30 
model.fit(ds, epochs=8, steps_per_epoch=steps_per_epoch)

# Проверяем точность модели
# print("Evaluate accuracy:")
# test_loss, test_acc = model.evaluate(ds, steps=steps_per_epoch)
# print("Testted Acc:", test_acc)


img = imagesData[0]
imgPrepared = (np.expand_dims(img, 0))
predictions = model.predict(imgPrepared)

# Получаем массив из 10 предсказаний (почему именно 10? Так определил выходные нейроны(output neurons))
# при создании модели с методом "Sequntial"
# будем массив из чисел от 0 до 9 - потомучто мы имеем 10 типов одежды, просто такое соотношение
# номера индекса и название класса одежды
print(predictions[0])


float_formatter = "{:.2f}".format
normalizedValues = []
for item in predictions[0]:
  print(float_formatter(item))
  normalizedValues.append(float_formatter(item))

# print(np.amax(np.array(normalizedValues).astype(np.float)))

result = np.where(predictions[0] == np.amax(predictions[0]))
maxValueIndex = result[0][0]

print("Image color is", COLOR_NAMES[maxValueIndex])


# print('Returned tuple of arrays :', result)
# print('List of Indices of maximum element :', result[0][0])

# Теперь выбираем максимальное значение из предсказания (то есть более точное)
# predictedLabel = np.argmax(predictions[itemIndex]) 
# print(class_names[predictedLabel])


# Показать картинку которая даеться на опознание
plt.figure()
plt.imshow(img)
plt.colorbar()
plt.grid(False)
plt.show()




