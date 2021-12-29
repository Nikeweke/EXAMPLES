/*
*  SocketController.js
*
*  Контроллер управление сокетами
*
*/

module.exports = function(io)
 {

   var usersIds = []; // хранит Id подключенных пользователей
   var users = []; // хранит данные ID, nick, avatar подключенных пользователей
   var msges = []; // хранит  сообщения

   // ========================================-> SOCKETS CONNECTED
   io.sockets.on('connection', function(socket)
      {

           // console.log('New client connected [socket-id = ' + socket.id + ']');

           // Запуск функций для вывода данных
           //io.sockets.emit('users', users);
           //io.sockets.emit('msges', msges);

         // ............................................................................ CLIENT-SIDE
           /***********************************************************
           *   Действие на запуск функции "Отправка сообщения" на стороне Клиента
           *
           ***********************************************************/
           socket.on('send message', function(data)
            {
              // запуск функции "Новое сообщение"
              io.sockets.emit('new message', {nick: socket.nickname, message: data});     // отошлет всем данные включая меня

              msges.push(data);

             io.sockets.emit('msges', msges);

            //  socket.broadcast.emit('msges', msges); // отошлет всем данные кроме меня
            })




            /***********************************************************
            *  Действие на запуск функции "Новый юзер" на стороне Клиента
            *
            ***********************************************************/
            socket.on('new user', function(data, callback)
             {
                      console.log("Data came: " + JSON.stringify(data));
                      console.log("Begin Array: " + JSON.stringify(usersIds));

                    // Получаем данные юзера и устанавливаем их в сокет
                     socket.user_name = data.name;
                     socket.user_id = data.user_id;
                     socket.user_ava = data.avatar;

                  //    console.log(socket.user_id);
                  //   user_id = socket.user_id




                     // если массив пуст
                     if(usersIds.length == 0)
                      {
                        console.log('User_ids was empty');
                        usersIds.push(data.user_id);
                        users.push(data);
                      }

                      else{
                             console.log('User_ids not empty');

                            for(var i=0; i < usersIds.length ; i++)
                             {
                               console.log(usersIds[i]);

                                  // если не найден тогда добавить
                                 if(usersIds.indexOf(socket.user_id) == -1)
                                  {
                                     usersIds.push(data.user_id);
                                     users.push(data);
                                   }
                             }
                      }


                     io.sockets.emit('users', users);
                     console.log("End Array(Users): " + JSON.stringify(users));
                     console.log("End Array(UsersIds): " + JSON.stringify(usersIds));
             })


             /***********************************************************
             *  Действие на отсоеденение клиента
             *
             ***********************************************************/
              socket.on('disconnect', function(data)
               {
                 if(!socket.user_id) return; // если в массиве сокетов нет поля nickname - выход


                  console.log(usersIds.length);
                 // если массив пуст
                 if(usersIds.length == 0)
                  {
                    return;
                  }

                  else{




                        for(var i=0; i < usersIds.length ; i++)
                         {
                              console.log(usersIds[i].indexOf(socket.user_id))

                              // если  найден
                             if(usersIds[i].indexOf(socket.user_id) > -1)
                              {
                                 usersIds.splice(usersIds.indexOf(socket.user_id), 1);
                                 users.splice(i, 1);
                                 console.log('deleted');
                               }

                            else{ console.log('not found'); return;}
                         }
                  }


                 console.log('....................................Disconnection \n');
                 io.sockets.emit('users', users); // обновляем
               })
         // ............................................................................ CLIENT-SIDE

      });
      // ========================================-> SOCKETS CONNECTED
 }
