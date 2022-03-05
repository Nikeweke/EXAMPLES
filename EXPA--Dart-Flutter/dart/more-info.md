# EXPA - Dart & Flutter



#### Содержание (Dart)
* Установка
* Quick start 
* Использование библиотек
* Вопросы и Ответы

--- 

### Установка
1. Скачать можно с офиц. сайта dart:
  * .zip - [ссылка](https://dart.dev/tools/sdk/archive)
  * через choco  [ссылка](https://dart.dev/get-dart)
2. Установить в `Path` путь к папке `/some/path/dart/bin` 
3. 
```sh
dart --version 
```


### Quick start
###### main.dart
```dart
void main() {
  print('Hello there');
}
```

```bash
dart run main.dart
dart compile exe main.dart # compile to exe
dart compile js main.dart # compile to js
```

###### packages.bat
```batch
@ECHO OFF
SETLOCAL
chcp 866>nul

SET PUB_CACHE=%CD%\cache

rem get packages that specified in pubspec.yaml
dart pub get 

rem add some package
dart pub add ssh
```

###### run.bat
```batch
@ECHO OFF
SETLOCAL
chcp 866>nul

SET PUB_CACHE=%CD%\cache

dart run
```

###  Использование библиотек
Для того чтобы установить пакеты извне, нужно обозначить текущий рабочий проект в путях:
* **PUB_CACHE** - это там где установлен язык. После установки, этот путь сам добавиться в `PATH`
    
### Вопросы и Ответы

**1)** Как поменять место установки пакетов? 
> Поставить переменную **PUB_CACHE** через `.bat` файл 
```batch
rem packages.bat

SET PUB_CACHE=%CD%\cache
rem get packages that specified in pubspec.yaml
dart pub get 
```



