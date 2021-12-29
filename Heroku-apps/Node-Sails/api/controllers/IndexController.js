/*
*    IndexController.js
*
*    Контроллер главной страницы
*/

// для фейковых имен
var faker = require('faker');



module.exports = {

      

        /********************************************
        *   Формирования главной страницы
        *
        *********************************************/
        Index: function(req, res)
         {    
            // var dataOut =   { Man: 'mate',  data: [{name:'dude1'},{name:'dude'}] };
            return res.view('index');
          },



    
        /********************************************
        *   Обработка отправки сообщения
        *
        *********************************************/    
        Hello: function(req, res) 
         {
           // Удостовериться что запрос сокетов пришел именно от Sails Sockets
             if (!req.isSocket) {
               return res.badRequest();
             }

             // если имя не установлено - установить 
             if(!sails.sockets.user_name){ sails.sockets.user_name =  faker.name.findName(); console.log('new name')}
             else{  console.log('old name'); } 

             console.log(sails.sockets.user_name)
            
              
             /* 
               !!    Можно запускать событие и ловить на стороне клиента 
               !!    или же просто возврощать статус 200 и с ним ответку но при этом данные увидит только один человек, тот который запустил событие
               !!
             */ 
             sails.sockets.blast('hello', { name:sails.sockets.user_name, msg: req.body.message});
             // return res.ok({ name:sails.sockets.user_name, msg: req.body.message });
         },



    

        /********************************************
        *   Коннект нового человека
        *
        *********************************************/       
        Connect: function(req, res) 
         {
           // Make sure this is a socket request (not traditional HTTP)
             if (!req.isSocket) {
               return res.badRequest();
             }
            
             // генерим имя
             var userName = faker.name.findName();
              
             
             // присваиваем сокету имя которое сгенирили    
             sails.sockets.user_name =  userName;
             
             console.log(userName + ' - connected............');
             
              /* 
               !!    Можно запускать событие и ловить на стороне клиента 
               !!    или же просто возврощать статус 200 и с ним ответку но при этом данные увидит только один человек, тот который запустил событие
               !!
             */ 
             //return res.ok({ name:sails.sockets.user_name});
             sails.sockets.blast('connected', { name:sails.sockets.user_name});
         },
                
};