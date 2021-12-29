# turn off Tensorflow CUDA warning
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

import tensorflow as tf
import numpy as np 
import matplotlib.pyplot as plt

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



print(type(train_images))
print(type(train_labels))


# =================================================================> СОЗДАНИЕ и ТРЕНИРОВКА
# Создание модели 
model = keras.Sequential([
  # input neurons - 28*28 = 784 input neurons
  # flatten - means from 2 dimensial array make values into 1 dimension
  keras.layers.Flatten(input_shape=(28,28)),

  # hidden neurons (128 its 16% of input neurons)
  keras.layers.Dense(128, activation="relu"),
  
  # output neurons  - softmax set probability from 0 to 1
  keras.layers.Dense(10, activation="softmax") # кол-во соотвествует "class_names"
])


# Настройка логики модели
model.compile(
  optimizer="adam",
  loss="sparse_categorical_crossentropy",
  metrics=["accuracy"],
)

# Обучение модели на данных (показываем данные для тренировки)
# 5 кругов будет скармливаться рандомные данные для тренировки(train_images, train_labels)
# нейронной сети
model.fit(train_images, train_labels, epochs=5)

# Проверяем точность модели
test_loss, test_acc = model.evaluate(test_images, test_labels)
print("Testted Acc:", test_acc)



# =================================================================> СОХРАНЕННИЕ
model.save("clothes-recog.h5") # h5 - default keras model extension

