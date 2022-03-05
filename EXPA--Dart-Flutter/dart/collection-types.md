# Collection types

```dart
void main() {
  // https://metanit.com/dart/tutorial/5.1.php
  // list its like array
  var list = [1, 2, 3];
  // or 
  // List<int> list = [1, 2, 3];

  
  // https://metanit.com/dart/tutorial/5.2.php
  // Класс Set представляет неупорядоченный набор уникальных объектов
  var set = {1, 2, 3, 5};
  // or 
  // Set<int> set1 = {1, 2, 3, 5};  
  // var set2 = <int> {1, 2, 3, 5};
  // Set<int> set3 = <int> {1, 2, 3, 5};


  var map = {
    1: "Tom",
    2: "Bob",
    3: "Sam"
  };
  // эквивалентное определение Map
  // Map<int, String> map2 = {
  //         1: "Tom",
  //         2: "Bob",
  //         3: "Sam"
  // };


  print(list);  
  print(set);
  print(map);
}

```
