# turn off Tensorflow CUDA warning
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

import tensorflow as tf
import matplotlib.pyplot as plt
import numpy as np

# Keras - это API high-level которое позволяет писать код быстрее для ML
from tensorflow import keras

# Берем данные с keras про одежду
data = keras.datasets.fashion_mnist

# Получаем данные для тренировки, и теста (готовые данные из tensorflow.keras)
(train_images, train_labels), (test_images, test_labels) = data.load_data()

# make pixel smaller as values (потому что картинки предаставлены в числах 0 - 255)
# print(train_images[0])
train_images = train_images / 255.0
test_images = test_images / 255.0

# "train_labels" и "test_labels" - держат в себе индексы которые указывают на "class_names"
# то есть получая результат мы должны просто подставить индекс и получить название одежды
class_names = ['T-shirt/top', 'Trouser', 'Pullover', 'Dress', 'Coat',
               'Sandal', 'Shirt', 'Sneaker', 'Bag', 'Ankle boot']


# =================================================================> ЗАГРУЗКА 
model = keras.models.load_model("clothes-recog.h5")


# =================================================================> ИСПОЛЬЗОВАНИЕ и РЕЗУЛЬТАТЫ
# Делаем определение данных с помощью натренерованной нейронной сети(модели)
# под каждую картинку создаеться предсказание(prediction) 

# make one item for predict
# img = test_images[0]
# img = (np.expand_dims(img, 0))
predictions = model.predict(test_images)

# Индекс предсказания которого мы хотим посмотреть
itemIndex = 1

# Получаем массив из 10 предсказаний (почему именно 10? Так определил выходные нейроны(output neurons))
# при создании модели с методом "Sequntial"
# будем массив из чисел от 0 до 9 - потомучто мы имеем 10 типов одежды, просто такое соотношение
# номера индекса и название класса одежды
print(predictions[itemIndex])


# Теперь выбираем максимальное значение из предсказания (то есть более точное)
predictedLabel = np.argmax(predictions[itemIndex]) 
print(class_names[predictedLabel])


# Показать картинку которая даеться на опознание
plt.figure()
plt.imshow(test_images[itemIndex])
plt.colorbar()
plt.grid(False)
plt.show()




