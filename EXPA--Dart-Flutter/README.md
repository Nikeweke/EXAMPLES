# EXPA - Dart & Flutter

* [Awesome Dart](https://github.com/yissachar/awesome-dart)
* [Dart tutorial](https://metanit.com/dart/tutorial/2.2.php)
* [Language Tour](https://dart.dev/guides/language/language-tour)
* [Dart tutotorial](https://metanit.com/dart/tutorial/1.1.php)


### Flutter tutorials 
* [Flutter docs](https://flutter.dev/docs)
* [Cupertino Store](https://codelabs.developers.google.com/codelabs/flutter-cupertino#0)
* [TodoApp tutorial](https://www.youtube.com/watch?v=mOiXndQAZpw&list=WL&index=1&t=1020s&pbjreload=101)
* [Radio tiles](https://github.com/askNilesh/radio_button)
* [Page transitions](https://medium.com/flutter-community/everything-you-need-to-know-about-flutter-page-route-transition-9ef5c1b32823)
* [Cupertino tab bar](https://medium.com/flutter-community/add-a-tab-bar-and-navigation-bar-with-ios-style-in-your-next-flutter-app-bf97b1e27e3a)

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



