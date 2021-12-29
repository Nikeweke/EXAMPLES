## SQlite and work with it


### Class for connection
```php
<?php
class MyDB extends SQLite3
{
 function __construct()
   {
      $this->open('ex.db');
    }
 }
 $db = new MyDB();
```

### Object for connection
```php
$db = new SQLite3('ex.db');
```

### Query
```php
$rez = $db->query('SELECT * FROM orks');
while( $row = $rez->fetchArray() ){
   echo $row['name'] . '<br>';
}
```

### Insert
```php
$this->query("INSERT INTO orks(id, name) VAlUES($id, $name)");
```
