
### 1. Primitive types
```php
function Test( float ...$int ){   // primitive types: float, bool, string, int
  var_dump($int);
}
Test(21, 22.22, 45);
```


### 2. Object types
```php
function Test1( stdClass $int ){   // object types: array, callable
  var_dump($int);
}
// $object = new class{}; // initate object
// $object = (object)[];  // initate object
$object       = new stdClass;
$object->name = 'kraki';
Test1($gg);
```


###  3. Return types
```php
function ReturnTypes() : array {
  return ['sss'];
}
var_dump( ReturnTypes() );
```

###  4. Coasceling null
```php
$rez  = 12;
$data = $rez ?? ''; // same - $data = $rez ? $rez : '' ;
echo $data;
```

### 5. Generators
```php
/*
  Генераторы не возвращаться назад
  next() - Передвигает внутренний указатель массива на одну позицию вперёд
  current() - Возвращает текущий элемент массива
*/
function Gen(){
  yield PHP_EOL . 'out yield 1';
  yield PHP_EOL . 'out yield 2';
  return 55;
}

$gen = Gen();
echo $gen->current(); // out yield 1
$gen->next();
echo $gen->current(); // out yield 2
echo $gen->getReturn(); // 55
```
