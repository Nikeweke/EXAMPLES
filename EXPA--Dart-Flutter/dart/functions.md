# Functions

> https://stackoverflow.com/questions/13264230/what-is-the-difference-between-named-and-positional-parameters-in-dart

### Positional params
```dart
String getHttpUrl(String server, String path) {
  return server + path;
}

getHttpUrl('Some server', 'some path');
```
<br />


### Named params
A parameter wrapped by { } is a named optional parameter. 
```dart
String getHttpUrl({String server, String path, {int port = 80}) {...}

getHttpUrl('Some server', 'some path', port = 7000);
```
<br />

### Optional params
A parameter wrapped by [ ] is a positional optional parameter.
```dart
String getHttpUrl({String server, String path, [int port = 80]) {...}

getHttpUrl('Some server', 'some path', port = 7000);
// or 
getHttpUrl('Some server', 'some path');
```
<br />

### Named and Optional params WONT WORK!

```dart
thisFunctionWontWork(String foo, [String positonal], {String named}) {
  // will not work!
}
```
