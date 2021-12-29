
  var socket = io.connect(); // Переменная для сокетов
  
  //var options = {                  // some options
  // transports: [ 'websocket']
  // };
  // var socket = io.connect('http://' + window.location.host, options);   // for server 

  var $userForm = $('#user-form'); // форма
  var $userNick = $('#nickname') // поле ввода

  var $msges = $('#msges'); // All Messages

  var $messageForm = $('#send-message'); // форма
  var $messageBox = $('#message') // поле ввода

  var $chat = $('#chat'); // поле куда выводить сообшения
  var $users = $('#users'); // поле куда выводить сообшения

// Нажатие на кнопку отсылки сообщения
  $messageForm.submit(function(e)
   {
    e.preventDefault();
    console.log($messageBox.val());

    socket.emit('send message', $messageBox.val()); // запуск функции "Отправки сообщения"
    $messageBox.val(''); // опустошить поле ввода
   })



   // Нажатие на кнопку OK при вводе никнейма
   $userForm.submit(function(e)
    {
     e.preventDefault();

     socket.emit('new user', $userNick.val()); // запуск функции "нового пользователя"
     $userNick.val(''); // опустошить поле ввода
    })


// ..................................................................... CLIENT-SIDE





// ..................................................................... SERVER-SIDE
   //  "Новое сообщение" на стороне Сервера
   socket.on('new message', function(data)
    {
        $chat.append('[' + data.nick + '] - ' + data.message + '<br>');
    })


    //  "Новое сообщение" на стороне Сервера
    socket.on('msges', function(data)
     {
       var html = '';

       for(var i = 0; i<data.length; i++)
        {
          html += data[i] + '<br>';
        }

        $msges.html(html);
     })


 //  "Пользователи" на стороне Сервера
    socket.on('users', function(data)
     {
        var html = '';

        for(var i = 0; i<data.length; i++)
         {
           html += data[i] + '<br>';
         }

         $users.html(html);
     })
// ..................................................................... SERVER-SIDE





