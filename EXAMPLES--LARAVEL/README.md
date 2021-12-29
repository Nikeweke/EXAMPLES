# Examples - Laravel

#### Содержание 
* **Quick start**
* **Запуск проекта после скачки с репозитория**
* **Полезные пакеты**
* **Tutorials and docs**
* [**Комманды Artisan**](#kомманды-artisan)
* [**SQL & Eloquent(Tricks)**](#sql--eloquenttricks)
* [**Localization**](#localization)
* [**Шаблонизатор(Blade)**](#Шаблонизаторblade)
* [**Middleware**](#middleware)
* [**Session**](#session)
* [**Cookies**](#cookies)
* **Проблемы и решения**

--- 

## Quick start
```bash
# Создание проекта
composer create-project --prefer-dist laravel/laravel my_app
composer create-project laravel/laravel your-project-name 5.3.*

cd my_app
composer install
php artisan serve
```

## Запуск проекта после скачки с репозитория:
1. в папке с проектом : `composer update` или `composer update --no-dev` (при условии что нет папки **vendor**)
2. файл для БД - **.env**
3. php artisan serve

## Полезные пакеты
* [Laravel Excel](https://github.com/Nikeweke/Laravel-Excel)
* [Laravel Lang](https://github.com/Nikeweke/Laravel-lang) - перевод на разные языкы сообщений приложения

## Tutorials and docs
* [Дмитрий А.](https://www.youtube.com/watch?v=Iqvjb9bhocA&list=PLoonZ8wII66h7pF6CFPzK3pVhTWo3DL9G&index=12)
* [laravel.su](http://laravel.su/docs/5.2/quickstart#introduction)
* [Курс по Laravel](https://www.youtube.com/watch?v=c_uDG9_2iJA&list=PLBT2g0kDwD_a_MFg1N2ibEHodJwRiD8AT&index=1)


##  Kомманды Artisan
* **php artisan serve** - запуск сервера
* **php artisan make:controller NameController** - Создать контроллер
* **php artisan make:model task** - Создать модель
* **php artisan make:model Name -m** - Создать миграцию и модель
* **php artisan make:middleware MiddlwareName** - создать промежуточное ПО 
* **php artisan make:migration create_tasks_table --create=tasks** - Создать миграцию
* **php artisan migrate** - Запуск миграций (создание таблиц)
* **php artisan migrate:refresh** - Рефреш миграций (создание таблиц)
* **php artisan route:list** - Просмотра маршрутов (routes)
* **php artisan db:seed** - это тестовые записи в БД делаються
* **php artisan route:cache** - закешить маршруты
* **php artisan make:test UserTest** - создание теста

## SQL & Eloquent(Tricks)
###### Вызов процедуры из модели
```php
function GetSomething($itemId)
 {
   return DB::select("call product_with_cats_names('$itemId')");
 }
```
###### Сохранение и апдейт данных -  `$this->save()`, `$this->insert()`, `$this->create()`, `$user->fill()`, `self::find()`.
```php 
//$this->save() - просто создает запись в БД
$this->name = 'Alex';
$this->pass = '1234';
$this->save(); // вернет boolean

// $this->insert() - то же самое что и $this->save(), но как параметр нужен массив
$this->insert([ 'name' => 'Kaleb',   'pass' => 2344 ]); // вернет boolean

// $this->create() - для его работы нужен массив $fillable в Модели, иначе будет ошибка. 
// В $fillable должны быть поля которые заполняються, если не будет то в БД будет приходить пустота
$user = $this->create([ 'name' => 'Кракен',   'pass' => 2344 ]); // вернет объект Модели 

// $user->fill() - изменяет данные текущего обьекта Модели
$user->fill(['name' => 'Braker']); // изменит данные объекта Модели, но сделает апдейт в БД
$user->save();                     // после этого апдейт записи в БД будет, "Кракен" измениться на "Braker"

// userModel::find(id) - находит запись и возвращает обьект Модели с данными записи
$user = $userModel(1);
$user->name = 'Petro';
$user->save();   // апдейт имени 
``` 


## Localization
```php
// получение сообщения в соответствии с языком 
// resources/lang/(language)/validation.php  - 'alert' => 'внимание'
echo trans('validation.alert'); // выведет внимание
```

## Шаблонизатор(Blade)
{{-- коммент --}}
###### IndexController.php
```php
/// передача данных в шаблон
function Index(){
$data = 'hello dudes';
return view('index', ['title' => $data]);
}
```

## Middleware
* создаем middleware `php artisan make:middleware MiddlewareName`
* в **app\Http\Kernel.php** секция - `$routeMiddleware`: вниз дописать `"'myauth' => \App\Http\Middleware\MiddlewareName::class,"`
* в маршрутах(**routes/web**): `Route::group(['middleware' => 'myauth'], function(){...}`




## Session
С сессиями можно работать несколькими способами: 
* с помощью метода session() HTTP-запросов, 
* с помощью фасада Session (`use Session;`)
*  с помощью функции session(). При вызове функции session() без аргументов она возвратит весь объект сессии. 
```php
/*
*   someController.php
*/

use Session; // FACADE for using Session::....

// Create session key
Session::put('cart', $shit);

// Get session
Session::get('key', false); // if no 'key' found - return 'false'
Session::get('key');
Session::all();

// Del session
Session::forget($key);
Session::flush();

// Check for exist
if(Session::has('users'))

```

###### index.blade.php
```blade
<html>
{{-- Its commentary --}}
<title> {{ $title }} </title> {{-- Out our var --}}
...
</html>
```

## Cookies
```php
use Cookie;
...
// Get cookie
$request->cookie('name');
Cookie::get('name');
Cookie::get('name', 'default');

// Create cookie
$cookie  = cookie('name', value, 2880); // делаем куки
$cookie1 = Cookie::make('name', value, 2880); // делаем куки (needs - use Cookie;)

return  response($resData)->cookie($cookie)->cookie($cookie1); // без возврата ответки куки не поставяться 
return redirect()->back()->cookie($cookie);                     // без возврата ответки куки не поставяться 

// Del cookie
Cookie::forget('name');

```

## Проблемы и решения 

**1)** Если при запуске миграции, не видит новоиспеченную миграцию:
> `composer dump-autoload -o`        

**2** Ошибка при миграции версия `5.4`. Как решить?
```php
// app/Providers/AppServiceProvider.php
class AppServiceProvider extends ServiceProvider
{
  /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
    }
```


                                                  

