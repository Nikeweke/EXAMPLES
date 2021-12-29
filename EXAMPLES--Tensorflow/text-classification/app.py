
# turn off Tensorflow CUDA warning
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'


import tensorflow as tf
import numpy as np
from tensorflow import keras

data = keras.datasets.imdb

# Количество слов из словаря
VOCABULARY_SIZE = 88000 

(train_data, train_labels), (test_data, test_labels) = data.load_data(num_words=VOCABULARY_SIZE)

# =======================================> Что такое здесь "train_data"?
# train_data[0] - вмещает просто набор индексов которые соотвествуют словам


# =======================================> Как понять текст из набора чисел(индексов)?
# чтобы узнать слово по индексу - нужен справочник типа [индекс слова] => слово
# (может скачать доп. справочник по словам, если его нет),

# получаем справочник по всем словам
word_index = data.get_word_index()

# Пытаемся перевести отзыв из индексов слов в текст
word_index = {k: (v+3) for k, v in word_index.items()}
word_index["<PAD>"] = 0
word_index["<START>"] = 1
word_index["<UNK>"] = 2  # заменяет в тексте если неизвестная знак
word_index["<UNUSED>"] = 3
reverse_word_index = dict([(value, key) for (key, value) in word_index.items()])



# Меняем размер отзывов к одной длине - 250 знаков, почему?
# Потому что для обучение модели надо точные входные данные, 
# потому что отзывы есть разной длины
train_data = keras.preprocessing.sequence.pad_sequences(
  train_data,
  value=word_index["<PAD>"],
  padding="post",
  maxlen=250
)
test_data = keras.preprocessing.sequence.pad_sequences(
  test_data,
  value=word_index["<PAD>"],
  padding="post",
  maxlen=250
)


def decode_review(text):
  return " ".join([reverse_word_index.get(i, "?") for i in text])

# показать отзыв
# print(decode_review(test_data[0]))


# ===========================================> СОЗДАНИЕ МОДЕЛИ
model = keras.Sequential()
# "Embedding" - строит вектор 10000 векторов с словами и находит подходящее
# 16 - это число пространств
model.add(keras.layers.Embedding(VOCABULARY_SIZE, 16))
# "GlobalAveragePooling1D" - уменьшает пространство для улучшения обучения
model.add(keras.layers.GlobalAveragePooling1D())
# 16 - выбрано случайно
model.add(keras.layers.Dense(16, activation="relu"))
# sigmoid - должен выдать результат - 1 или 0(позитивный или негативный отзыв) на основе 16 нейронов
model.add(keras.layers.Dense(1, activation="sigmoid"))

model.summary()

# ===========================================> КОМПИЛЯЦИЯ МОДЕЛИ
model.compile(
  optimizer="adam",
  loss="binary_crossentropy",
  metrics=["accuracy"]
)


# Создаем данные для валидации
validation_data = train_data[:10000]
train_data_sliced = train_data[10000:]

validation_labels = train_labels[:10000]
train_labels_sliced = train_labels[10000:]

fitModel = model.fit(
  train_data_sliced, 
  train_labels_sliced, 
  epochs=40,
  batch_size=512,
  validation_data=(validation_data, validation_labels),
  verbose=1  
)

results = model.evaluate(test_data, test_labels)
print(results)


itemIndex = 12
test_review = test_data[itemIndex]
predict = model.predict([test_review])
print("Review: ")
print(decode_review(test_review))
print("Prediction: " + str(np.argmax(predict[itemIndex])))
print("Actual: " + str(test_labels[itemIndex])) 

# np.argmax(predictions[itemIndex]) 