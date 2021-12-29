# Expirience from PHP



#### Содержание 
* [**Useful links**](#useful-links)
* [**Как запустить встроенный сервер PHP**](#Как-запустить-встроенный-сервер-php)
* [**Из массива в строку и ставим в Cookies**](#Из-массива-в-строку-и-ставим-в-cookies)
* [**Closure(Anonymys func) and Reference vars**](#closureanonymys-func-and-reference-vars)
* [**Traits**](#traits)
* [**Namespace and Use**](#namespace-and-use)
* [**Objects of stdClass**](#objects-of-stdClass)
* [**__autoload**](#__autoload)

---


### Useful links
* Composer CheatSheet: http://composer.json.jolicode.com/

### Как запустить встроенный сервер PHP:
```
php -S localhost:8000
```

### Из массива в строку и ставим в Cookies

* **index.php** - из массива делает строку и записывает в куку
* **page.php** - из строки которая в куке делает массив
* **off.php** - удаляет массив

###### index.php
```php
<?php
// МАссив
$arr = [
         'email' => 'Driver3@meta.ua',
         'password' => '12345'
       ];
// Делаем строку
$rez = serialize($arr);
// Вывод строки полученной
var_dump($rez);
// SET 
setcookie("nabor",$rez,time()+8600*30,"/");
 ?>

<a href="page.php">See cooka</a>
<a href="off.php">DElete cooka</a>

```


###### page.php
```php
<?php

$nabor = $_COOKIE['nabor'];

//var_dump($nabor);

$rez = unserialize($nabor);


echo $rez['email'] . "<br>";
echo $rez['password'] . "<br>";

```


###### off.php
```php
<?php
setcookie('nabor', "", time() - 86400*100, "/");
//header("Location:page.php");

```

### Closure(Anonymys func) and Reference vars

###### index.php
```php
<?php
 
// reference by var 
 $var = 2;
 function foo(&$var)
 {
   $var++;
 }

 foo($var);
 echo $var;
 
 
 // Closure
$message = 'hello';
 
// No "use" out - NULL
$example = function () {
  echo "first -> ";
    var_dump($message);
};
$example();
 
// Inherit $message - out - hello
$example = function () use ($message) {
    echo "<br>second -> ";
    echo($message);
};
$example();
 
```


### Traits

Трейт (англ. trait) - это механизм обеспечения повторного использования кода в языках с поддержкой единого наследования, 
таких как PHP. Трейт очень похож на класс, но предназначен для групирования функционала хорошо структурированым и
последовательным образом. Невозможно создать самостоятельный экземпляр трейта. Это дополнение к обычному наследованию 
и позволяет сделать горизонтальную композицию поведения, то есть применение членов класса без необходимости наследования. 

###### Traits.php
```php
trait MyTrait
{
  public function Bye()
   { echo "Its method from trait - Bye()"; }

}
```


###### Index.php
```php
class A {
    
    // including Traits.php
    use MyTrait;

   function Hello(){ echo "Its A method - Hello()"; }
}

$some = new A;
$some->Hello();
$some->Bye();

```





### Namespace and Use

Файлы могут быть в одной папке, но иметь разные пространства имен. Например если в файлах одинаковые классы, то в таком случае зарешают пространства. В данном примере все файлы находяться в одной папке.


###### class1.php
```php
<?php

namespace App;

class Index {

	function Index(){
	  echo "Hello dude, its App space";
	  return ;  
	}
}

```


###### class2.php
```php
<?php

namespace App\Models;

class Index {
	
	function Index(){
	  echo "Hello dude, its App\Models space";
	  return; 
	}
}

```


###### index.php
```php
<?php

include 'class1.php'; // тут класс с названием Index 
include 'class2.php';  // и тут класс с таким же названием

// без "use" классы не будут видны здесь, хоть они и подключены свыше
use App\Index;
use App\Models\Index as IndexModel;

$index = new Index();
$index->index();

$grand = new IndexModel();
$grand->index();
```

### Objects of stdClass
Обьект класса `stdClass` это как объект в JS. После создания объекта внутри пусто , но это как объект(объект класса).
```php
 // создание обьекта
$obj = new stdClass;

// добавляем переменные
$obj->name    = 'Joker';
$obj->surname = 'Petrovich';

// добавление ф-ции
$obj->calc = function(){ echo 1 + 1; };

print_r($obj);

// вызов ф-ции
$func = $obj->calc;
$func(); 
// OR
($obj->calc)(); 
```

### __autoload
Автоматичское подключение файлов с классами в которых есть нужные экземпляры
###### ./index.php
```php
spl_autoload_register(function($class_name){
	$filename = './ctrls/'.$class_name.'.php';
	   // echo $class_name . PHP_EOL;
	 include($filename);  
});

$obj = new Freak;
$obj->Say();
```

###### ./ctrls/freak.php
```php
<?php
class Freak{
   public function Say(){ echo $this->words; }
}
```
