# Dart language 

* Install
* Quick launch
* Init project

--- 

### Install 
* Get from [Dart official website](https://dart.dev/get-dart) zip file 
* OR get in bundle with [Flutter](https://docs.flutter.dev/get-started/install/windows)

### Quick launch 

###### app.dart

```dart
void main() {
  print('Hello there');
}
```

```sh
dart run app.dart

dart compile exe main.dart # compile to exe
dart compile js main.dart # compile to js
```

### Init project 

```sh
# create basic project (create project, with pubspec.yml list of packages)
dart create ./my-project

# start 
dart run ./my-project/bin/my-project
```

```sh
# create project from template (create project, with pubspec.yml list of packages)
dart create --template server-shelf ./http-server

# start 
dart run ./http-server/bin/server
```






