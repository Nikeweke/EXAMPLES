## Web-Сокеты PHP с библиотекой "Ратчет"

https://github.com/ratchetphp/Ratchet

###### websockets.php 
```php
<?php

// Make sure composer dependencies have been installed
require __DIR__ . '/vendor/autoload.php';

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;


/**
 * chat.php
 * Send any incoming messages to all connected clients (except sender)
 */
class MyChat implements MessageComponentInterface {
    protected $clients;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
    }

    public function onOpen(ConnectionInterface $conn) {
        $this->clients->attach($conn);
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        foreach ($this->clients as $client) {
            if ($from != $client) {
                $client->send($msg);
            }
        }
    }

    public function onClose(ConnectionInterface $conn) {
        $this->clients->detach($conn);
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        $conn->close();
    }
}

    // Run the server application through the WebSocket protocol on port 8080
    $app = new Ratchet\App('localhost', 8080);
    $app->route('/chat', new MyChat);
    $app->route('/echo', new Ratchet\Server\EchoServer, array('*'));
    $app->run();

```

```
php websockets.php
```


###### index.html
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>

 <script type="text/javascript">
// Then some JavaScript in the browser:
  var conn = new WebSocket('ws://localhost:8080/echo');
  conn.onmessage = function(e) { console.log(e.data); };
  conn.onopen = function(e) { conn.send('Hello Me!'); };
 </script>

  </body>
</html>

```
