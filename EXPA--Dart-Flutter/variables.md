# Variables 

```dart
// for using "late" keyword
// https://stackoverflow.com/questions/63969287/flutter-error-null-safety-features-are-disabled-for-this-library

// you can not specify "void main() {...}"
void main() {
  var salary = 45;

  double measure = 0.2;
  int age = 45;
  bool isMarried = false;
  String name = "Hi there";
  
  // dynamic - allow set value of another type, even if it was another at start
  dynamic surnameOrPhone = 0;
  surnameOrPhone = "Brodvey";

  // Runes - это последовательность символов в кодировке Unicode.
  Runes input = Runes('\u041F\u0440\u0438\u0432\u0435\u0442');
  Runes text = Runes('Привет');

  print(age);
  print(name);
  print(surnameOrPhone);

  // final and const 
  // Главное различие между const и final состоит в том, что значение const должно быть определено при компиляции, 
  // а значение константы final определяется во время выполнения.
  final warning = "Warn1";
  const warning2 = "Warn2";

  // warning = "gg"; // error 

  // interpolation 
  print("$warning - ($age) $name $surnameOrPhone"); 
}
```

