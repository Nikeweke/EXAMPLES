###  FROM MySQLi - TO PDO
```php
mysqli_query($db,"...") = $db->query("...")
mysqli_fetch_array($query) = $query->fetch(PDO::FETCH_ASSOC)
mysqli_real_string_escape = prepare($query); $query->execute();
mysqli_nums_row = $query->countRow()
```


###  Перехват ошибок
```php
<?php

try { throw new Exception ('Это ошибка епты'); }

catch(Exception $e)
 {
  echo "Исключение " . $e->getCode() . ": " . $e->getMessage() . "<br>" . " в " . $e->getFile() . ", строка "  . $e->getLine() . "<br>";
  }
?>
```



###   Передача переменных между PHP-файлами посредством сессии
######   Можно использовать сессии, которые в отличие от cookie, храняться на сервере, и стираються после закрития браузера. session_start() - на каждой странице где юзаеться сессия 
```php
 <?php
  session_start();
  $_SESSION['user'] = 'bonskii';
?>

//Обращаться к значению, сохранённому в сессии можно используя суперглобальный массив:

 <?php
  echo $_SESSION['user'];
?>
```


###  Функция ругалась что не видела переменных $user_data, $e_password, $e_login
######  и через global все работает
```php
<?php

function checkForPass()
 {
	global $user_data;
	global $e_password;  // or like that -> $GLOBALS['e_password'];
	global $e_login;


	  if($user_data['pass'] == $e_password)  // ** $e_password = $GLOBALS['e_password']
						  {
						   echo "<h2> You exist in database. </h2>";
							echo "<h3> Welcome $e_login. </h3>";
						  }

						else
						  {
						  echo "Wrong password";
                      }
	}
```

## Connection to DB
```php
function Connect_db()
 {
	 include 'connect.php'; // Data of Connection
	 try{
	      $db = new PDO("mysql:host=$host;dbname=$db_name", $user, $password);
	      $db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
        $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
	      $db->exec("SET NAMES utf8");
        if($db == true){ return $db ; }
				else { die('Cant connect to DB'); }
	    }

	 catch(PDOException $e){ echo $e->getMessage();  }
 }
$db =  Connect_db();  // CONNECT VAR
```



## Генератор паролей
```php
function Generator()
{
  // Символы, которые будут использоваться в пароле.
  $chars="qazxswedcvfrtgbnhyujmkiolp1234567890QAZXSWEDCVFRTGBNHYUJMKIOLP";
  // Количество символов в пароле.
  $max=20;
  // Определяем количество символов в $chars
  $size=StrLen($chars)-1;
  // Определяем пустую переменную, в которую и будем записывать символы.
  $password=null;
  // Создаём пароль.
  while($max--)
  $password.=$chars[rand(0,$size)];
  return $password;
}
```


## Delete Cookies
```php
function DelCookie($cook)
 {
   setcookie($cook, "", time() - 86400*100, "/");
 }
```




## Добавляет запись про просмотр статьи
```php
function ViewedPage($page)
 {
    $db = Connect_db();

		// Ловим IP- человека который смотрел статью
		 $ip = $_SERVER["REMOTE_ADDR"];

		// Запрос на запись есть ли уже такая же запись
    $query_is_exist = $db->query("SELECT * FROM viewed_pages WHERE user = '$ip' AND page = $page");
		$kol_vo = $query_is_exist->rowCount();

    // Если нашло хоть 1 запись
	  if($kol_vo <= 0) { $db->query("INSERT INTO viewed_pages(user, page) VALUES( '$ip', $page )"); }
 }
```


--------------------------------------------------
## Считает количество лайков на заданную страницу
```php
function CounterLikes($page)
 {
   $db = Connect_db();

   $query_likes = $db->query("SELECT * FROM likes WHERE likes_page = $page");
	 $likes =  $query_likes->rowCount() ;

	 return $likes;
  }
```





## Считает количество просмотров на заданную страницу
```php
function CounterViews($page)
 {
   $db = Connect_db();

	 $query_viewes = $db->query("SELECT * FROM viewed_pages WHERE page = $page");
 	 $views = $query_viewes->rowCount();

 	 return $views;
 }
````




## Считает количество комментариев на заданную страницу
```php
function CounterCommentaries($page)
{
 $db = Connect_db();

 $query_comments = $db->query("SELECT id FROM coments  WHERE id_page = $page");
 $comments = $query_comments->rowCount();

 return $comments;
}
```



## Действие : Считает кол-во статей по заданной сфере
```php
function CounterSfera($sfera)
 {
	 $db = Connect_db();

    $query = $db->query( "SELECT * FROM stati WHERE sfera = $sfera");
		$kol_vo = $query->rowCount();

		return $kol_vo;
 }
```



## Функция для получение рандомных имен для картинок
```php
class DFileHelper
{
    public static function getRandomFileName($path, $extension='')
    {
        $extension = $extension ? '.' . $extension : '';
        $path = $path ? $path . '/' : '';

        do {
            $name = md5(microtime() . rand(0, 9999));
            $file = $path . $name . $extension;
        } while (file_exists($file));

        return $name;
    }
}
````


## Действие : Удаление опасного кода в переменных от пользователей и хакеристов
```php
function StringCleaner($var)
 {
   $var = strip_tags($var);
   $var = htmlentities($var);
   $var = addslashes($var); // Против - апострофа '
   $var = trim($var);
   return $var;
}
```



## Проверяет заполнена ли форма
```php
function filled_out($form_var)
 {
    if((!isset($form_var)) or ($form_var == ''))
       {
           return false;
       }
       return true;
 }
```




## Действие : Проверяет почты на допустимость по знакам.
```php
function valid_email($adress)
 {
	  //Проверить допустимость адреса
    if(ereg('^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA=z0-9\-\.]+$',$adress)){ return true; }
    else { return false; }
 }
```
