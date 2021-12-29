# Полезные пакеты для Laravel


* [**PHPUnit**](#phpunit)
* [**Laravel Excel**](#laravel-excel)
* [**Debugbar**](#debugbar)
* [**Iseed**](#iseed)
* [**IMigrations**](#imigrations)
* [**LaravelCollective - HTML**](#laravelcollective---html)

## PHPUnit
1. Создание теста: `cmd> php artisan make:test UserTest`
2. Тесты находяться: **./tests** 
3. Запуск тестов:
```
cmd> ./vendor/bin/phpunit ./tests/              --> запуск всех тестов
cmd> ./vendor/bin/phpunit ./tests/UserTest      --> запуск теста UserTest
```


## Laravel Excel:
* Установка
```php
composer require maatwebsite/excel
```
* Добавить в config/app.php класс и алиас, чтобы можно было обращатсья через фасады (use Excel;)
```php
Maatwebsite\Excel\ExcelServiceProvider::class,
...
'Excel' => Maatwebsite\Excel\Facades\Excel::class,
```
###### users.xlsx
```
|name|password|
|Alex|1234|
....
....
```

###### excel_form.blade.php
```php
<span>
<table>
<tr>

 {{-- Загрузка Excel --}}
	<td>
	   <form action="/distributor/load-xls" method="post" enctype="multipart/form-data" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
	        <input type="file" name="file" style='float:left;'>
			<input type="hidden" name="_token" value="{{csrf_token()}}">
	        <input class='btn btn-success' style='float:left;' type="submit" value='import from XLS'>
	  </form>
	</td>

	 {{-- Выдача Excel --}}
	<td>
		<a style='margin-left:20px;' href='/admin/distributor/get-xls' class='btn btn-info'>export to XLS</a>
	</td>
 </tr>
 </table>
 </span>
 <br>
 <br>

```

###### routes/web.php
```php
Route::get('distributor/get-xls', 'SomeController@getXls');
Route::post('distributor/load-xls', 'SomeController@loadFromXls');
```

###### SomeController.php

```php
use Excel;
use Illuminate\Support\Facades\Input;
...
...
   /*
   *  Загрузка Excel файла и вывод данных в массивы 
   *
   */
   public function loadFromXls(User $user, Distributor $distributor)
     {
       // обработка пришедшых данных
       $input = Input::all();
       $file  = array_get($input,'file');

       // проверка на выбранн ли файл и являеться ли он excel (.xls, .xlsx)
       if(!$file){
        return redirect()->back()->withErrors("File not selected");
       }

       $extension = $file->getClientOriginalExtension();
       if(!in_array($extension,['xls','xlsx'])){
        
        return redirect()->back()->withErrors("error file type - need xls,xlsx");
       }
     
      // Сохранение файла, если нужно 
      // $path = $file->store('excel');

       // Выведет массив из данных
       Excel::load($file->getPathName(), function($reader) use($user, $distributor)
        {
          $results     = $reader->get();  // получение всех данных
          $first_sheet = $results[0];     // выбрать первый лист
 
           // получить все данные из 1 листа
          foreach($first_sheet as $row)
           {
              echo $row->name;
              echo $row->password;
              
           
             // создание пользователя 
              $user = $user->create([ 
                             'name'           => $row->name,
                             'password'       => $row->password,
                             'email'          => $row->email,
                             'parent_user_id' => Auth::user()->id
                           ]);

             // создание дистрибютора и связка его с новосозданным пользователем (user.id -> distributor.user_id)
             $distributor->create([ 
                             'user_id' => $user->id,
                             'logo'    => 'some logo',
                             'phone'   => '222-222-222',
                             'site'    => 'www.dis.com',
                             'email'   => 'dis@ss.com',
                           ]);
           }
        });
      }
      
      public function getXls(){
   
  /*
   *  Создание Excel файла на основе данных из БД
   *
   */
  Excel::create('materials-base', function($excel) {

   $excel->sheet('materials', function($sheet) {
    $sheet->loadView('materials');
    
    $materials=Material::where('enabled','=','1')->get();
     
     foreach($materials as $material){
      //echo $material->title;
      $sheet->appendRow([
       $material->id,
       (isset($material->vendor->title)?$material->vendor->title:''),
       $material->article, 
       $material->title,
       $material->units,
       $material->zone,
       $material->vendor_price,
       $material->our_price,      
       $material->customer_price,
       $material->customer_discount,
       $material->coef_error,
       $material->coef_plintus
       ]);
     }
     
     
   });
   
    

  })->download('xls');;
 }
    
  
```

## [Debugbar](https://laravel-news.com/laravel-debugbar)
* Установка
```
composer require barryvdh/laravel-debugbar --dev
```
* в config/app.php
```
'Barryvdh\Debugbar\ServiceProvider',  // in providers array
'Debugbar' => 'Barryvdh\Debugbar\Facade', // in aliases array
```

###### Сообщения
```
use Debugbar;

Debugbar::info($object);
Debugbar::error('Error!');
Debugbar::warning('Watch out…');
Debugbar::addMessage('Another message', 'mylabel');
```

###### Время засекает
```
use Debugbar;

Debugbar::startMeasure('render','Time for rendering');
Debugbar::stopMeasure('render');
Debugbar::addMeasure('now', LARAVEL_START, microtime(true));
Debugbar::measure('My long operation', function() {
// Do something…
});

```

## [ISeed](https://github.com/orangehill/iseed)
* Установка
```
composer require orangehill/iseed --dev
```
* в config/app.php
```
Orangehill\Iseed\IseedServiceProvider::class,  // in providers array
```

Создает на основе подключенной БД сиды таблиц из нее
###### Пример
```
REM (На основе текущей таблицы(Users) из БД построит сид - UsersTableSeeder.php )
php artisan iseed users

php artisan iseed users, another_table

php artisan iseed users --force
```

## [IMigrations](https://github.com/Xethron/migrations-generator)
* Установка
```
composer require --dev "xethron/migrations-generator"
```
* в config/app.php
```
 // in providers array
'Way\Generators\GeneratorsServiceProvider',  
'Xethron\MigrationsGenerator\MigrationsGeneratorServiceProvider', 
```

###### Пример
```
REM Делает все миграции по всем таблам
php artisan migrate:generate

php artisan migrate:generate table_name
```


## [LaravelCollective - HTML](https://packagist.org/packages/laravelcollective/html)
**link_to_route()** - how to enable (HTML Laravel Collective)
  ```
   composer require laravelcollective/html
  ```
 
  - открыть config/app.php, там найти массив **providers**  в конец которого добавить :   
  ###### config/app.php
  ```php
  $providers = [... 'Collective\Html\HtmlServiceProvider'`, ... ];
  
  $aliases = [ ...
                  'Form' => 'Collective\Html\FormFacade',`     
                  'Html' => 'Collective\Html\HtmlFacade'
              ];
  
  ```
  
