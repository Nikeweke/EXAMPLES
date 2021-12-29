/*
*    base.js
*
*    Главный скрипт
*/





/*******************************************
*  Отправить сообщение (.EMIT)
* 
*******************************************/
function SendMessage()
 {
     var message =  $('#areaMsg').val().trim();
     
     if(message == ''){ alert('Empty message field!'); return; }
     
            /* 
               !!    Можно запускать событие и ловить на стороне клиента 
               !!    или же просто возврощать статус 200 и с ним ответку
               !!
             */ 

//      io.socket.get('/hello', {message: message}, function (data, res) 
//        {
//        //  console.log('Server responded with status code ' + res.statusCode + ' and data: ', data);
//           var html = '<li>['+ data.name +']: <strong>'+ data.msg +'</strong></li>';
//           $('#messages').append(html);
//        });
     io.socket.get('/hello', {message: message});
     
     $('#areaMsg').val('');
 }




/*******************************************
*  Новый коннект (.ON)(.EMIT)
*
*******************************************/
io.socket.on('connect', function ()
{
     /* 
     !!    Можно запускать событие и ловить на стороне клиента 
     !!    или же просто возврощать статус 200 и с ним ответку
     !!
     */ 
     // Connect new incoming man
//     io.socket.get('/connect', null, function (data, res)
//      {
//         var html = '<li class="list-group-item">'+ data.name +'</li>';
//         $('#users').append(html);
//      });
    io.socket.get('/connect');
});



/*******************************************
*  Связь установлена (.ON)
*
*******************************************/
io.socket.on('connected', function (data)
{
    var html = '<li class="list-group-item">'+ data.name +'</li>';
   // console.log(data);
    
     $('#users').append(html);
});



/*******************************************
*  Принять сообщение (.ON)
*
*******************************************/
io.socket.on('hello', function (data)
{
    var html = '<li>['+ data.name +']: <strong>'+ data.msg +'</strong></li>';
    console.log(data);
    
   $('#messages').append(html);
});