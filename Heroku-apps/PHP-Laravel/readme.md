## Laravel for Heroku
#### Это приложение можно ставить на Heroku сервис
##### Чтобы запустить  это на сервисе приложение нужно:
1. Иметь **Procfile** - в этом файле указываеться путь к запуску всего приложения(в Laravel - **public/index.php**)
2. в папке с проектом : `composer update` или `composer update --no-dev` (при условии что нет папки **vendor**)
3. файл для БД - **.env**
