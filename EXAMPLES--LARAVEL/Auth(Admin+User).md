### Аутентификация с помощью Auth (Юзер + Админ часть)

#### [Ссылка на видос](https://www.youtube.com/watch?v=iKRLrJXNN4M)

**1.** Создаем модель для **админа**, просто копируем и меняем все под **админа** модель **User** и её миграцию  и потом :
```php
php artisan migrate
```

**2.** Создаем заготовки инструементами Laravel. Это комманда создаст - HomeController.php, layouts/, auth/, home.blade.php + 2 маршрута(Auth::routes() и путь к дом.контроллеру)  :
```php
php artisan make:auth
```

**3.** Надо добавить строки в - **config/auth.php** :
```php
'guards' => [

        // это по стандарту
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        'api' => [
            'driver' => 'token',
            'provider' => 'users',
        ],

        // это уже от себя для админа
        'admin' => [
            'driver' => 'session',
            'provider' => 'admins',
        ],

        'admin-api' => [
            'driver' => 'token',
            'provider' => 'admins',
        ],

    ],

        ...

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\User::class,
        ],

        'admins' => [
            'driver' => 'eloquent',
            'model' => App\Admin::class,
        ],
    ],

```

**4.** Добавить в модель app/Admin.php - стража которого мы недавно добавили **"admin"**. Если не указать стража, то по-ум. будет применяться страж **"web"** который для обычных юзеров.
```php
class Admin extends Authenticatable
{
    use Notifiable;
    protected $guard = 'admin'; // <-- its guard
```

**5.** Делаем контроллеры для админа и юзера, при этом в маршрутах распихиваем их в разные группы с разными **middleware** :
```php
// Auth activate
Auth::routes();

// User part
Route::group(['middleware' => 'auth'], function () {          // auth ( web ) - для обычных смертных
    Route::get('/', 'IndexController@index')->name('home');  // возвращает  вьюху для авторизованого юзера
});

// Admin part
Route::prefix('admin')->middleware('auth:admin')->group(function () { // auth:admin - для админов
    Route::get('/', 'AdminController@index')->name('admin.home');  // возвращает  вьюху для авторизованого админа
});
```

**6.** Создаем контроллер Auth\AdminLoginController.php - он будет контролировать процес авторизации админов и пишем там такое:
```php
use Auth;

class AdminLoginController extends Controller
{

    /**
     *  Форма входа для админа
     *
     * @return \Illuminate\Http\Response
     */
    public function ShowLoginForm()
    {
       return view('auth.admin-login');
    }



    /**
     *  Совершение входа админа
     *
     * @return \Illuminate\Http\Response
     */
     public function Login(Request $request)
      {
       // проверка данных с формы
        $this->validate($request, [
          'email' => 'required|email',
          'password' => 'required|min:2'
        ]);

        // попытка авторизовать юзера
       if(Auth::guard('admin')->attempt(['email' => $request->email, 'password' => $request->password], $request->remember))
        {
          // если все ок, редирект на страницу для авторизованых
          return redirect()->route('admin.home');
         }

        // если плохо , редирект на форму для входа с предидущими данными
        return redirect()->back()->withInput($request->only('email', 'remember'));
      }
}
```

**7.** Создаем вьюху для авторизации админов. Просто копируй **auth/login.blade**, и меняешь в форме (<form>) **action**:
```html
<form action="{{ route('login') }}" ... > <!-- Было -->

<form action="{{ route('login') }}" ... > <!-- Стало -->
```

**8.** Добавляем в маршруты следующие **web.php**:
```php
// Auth activate
Auth::routes();

// User part
Route::group(['middleware' => 'auth'], function () {
    Route::get('/', 'IndexController@index')->name('home');
});

// Admin part
Route::prefix('admin')->middleware('guest:admin')->group(function () {     // гард "админ" гостевой                        
  Route::get('/login',  'Auth\AdminLoginController@showLoginForm')->name('admin.login');           // форма для авторизации админов
  Route::post('/login', 'Auth\AdminLoginController@login'        )->name('admin.login.submit');    // действие - авторизация админа
});

Route::prefix('admin')->middleware('auth:admin')->group(function () {
    Route::get('/', 'AdminController@index')->name('admin.home');
});

```


**9.** Используя **tinker** можно создать админа, так как у нас нет формы для его регистрации через cmd:
```
cmd> php artisan tinker
cmd> $admin = new App\Admin
cmd> $admin->name = 'Niggar'
cmd> $admin->password = Hash::make('password')
cmd> $admin->email = "bb@bb.com"
cmd> $admin->rights = 1
cmd> $admin->save()

```

**10.** Теперь можно логиниться в **юзерскую часть** и в **админскую часть**, но остаються проблемы с редиректом, которые бросают на **/home** - адрес по-ум. Это то мы исправим :
###### Изменяем поведение Unauthenticated. Если человек не авторизован, и хочет попасть страницу для админов, где действует страж "auth:admin", тогда мы ловим этого стража и даем правильную страницу для авторизации пользователя как админа(route('admin.login')), а не редиректим всех на route('login') - как это стоит по-ум.
```php
// app/Exceptions/Handler.php

protected function unauthenticated($request, AuthenticationException $exception)
{
    // для api not auth people
    if ($request->expectsJson()) {
        return response()->json(['error' => 'Unauthenticated.'], 401);
    }

    //  Ловим из исключения стража который юзаеться в тек. момент,
    //  и в зависимости от этого делаем правильный редирект
    $guard = array_get($exception->guards(), 0);
    switch($guard){
      case 'admin':
         $login = 'admin.login'; // route to admin-login form
         break;

      default:
          $login = 'login';     // route to Auth::-login form
          break;
    }

    return redirect()->guest(route($login));
}

```


######  Изменяем поведение IfAuthenticated. Если человек авторизован как админ и пытаеться попасть на адрес "admin/login", его не должно кидать на пользователськую часть("/home"), его должно кинуть на админскую часть('admin/home')
```php
// app/Http/Middleware/RedirectIfAuthenticated.php

public function handle($request, Closure $next, $guard = null)
{
    // if (Auth::guard($guard)->check()) {
    //     return redirect('/home');
    // }

    switch ($guard) {
      case 'admin':
          if(Auth::guard($guard)->check()){
             return redirect()->route('admin.home')
          }
        break;

      default:
          if (Auth::guard($guard)->check()) {
              return redirect('/');
          }
        break;
     }

    return $next($request);
}
```

**11.** Добавляем выход из админской части
```php
// Controllers/Auth/AdminLoginController.php
public function Logout()
{
  Auth::guard('admin')->logout();
  return redirect()->route('admin.login');
}

// route/web.php
...
Route::prefix('admin')->middleware('auth:admin')->group(function () {
    Route::get('/', 'AdminController@index'                    )->name('admin.home');
    Route::post('/logout', 'Auth\AdminLoginController@logout'   )->name('admin.logout');
});

// navbar.blade.php
<ul class="dropdown-menu" role="menu">
    <li>
        <a href="{{ route('admin.logout') }}"
            onclick="event.preventDefault();
                     document.getElementById('logout-form').submit();">
            Logout
        </a>

        <form id="logout-form" action="{{ route('admin.logout') }}" method="POST" style="display: none;">
            {{ csrf_field() }}
        </form>
    </li>
</ul>
```

##### Проверяем работу:
 Авторизовавшись под админом - попадаешь на **"/admin/"** - после перехода на **"/admin/login"** - должно кинуть на **"/admin/"**, если это так все **ОК**
