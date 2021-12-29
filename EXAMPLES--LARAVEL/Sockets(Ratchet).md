## План действий :    
### С Ратчетом можно сделать чат уже, но при этом нельзя показывать уведомления с сервера
- Скачать Ларавел
- в Composer.json после строки версии Ларавела прописать : "cboden/ratchet": "^0.3.3"
- потом в этой папке через Гит-Баш выполнить : php composer.phar update
- создать в папке App такую последовальность папок и файл app\Classes\Sockets\Base\BaseSocket.php
- там нужно будет создать консоль то там комманда не make:console , а make:command
- чтобы юзать комманду надо в файле Kernel.php в массив $commands добавить путь к нашему файлу : \App\Console\Commands\ChatServer::class,

### С Ратчетом + ZeroMQ можно уже делать полный общение сервера и клиента (НЕ работает - не удаеться сделать апдейт из-за phpzmq.dll)
- Интструкция по установке ZeroMQ http://superuser.com/questions/585291/installing-zeromq-on-windows-7-wamp-server#answer-774973
- ссылыч на библиотеку http://pecl.php.net/package/zmq/1.1.2/windows

## Адресс проекта
- https://github.com/Nikeweke/Laravel-WebSocket
   
## Адресс курса
- https://www.youtube.com/watch?v=TuH8-kYxGGU&list=PLoonZ8wII66je1zXdGrrHgExx6J0WQYKd&index=1
