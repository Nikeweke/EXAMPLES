/*
*  app.js
*
*  Точка входа (Главный скрипт)
*
*/

// Express init
// var app = require('express')(); // как варик делать так
var express = require('express');
var app = express();


app.set('view engine', 'ejs');   // иниц. шаблнизатора
app.use(express.static('./public'));  // статичные файли(СSS, JS)

server = require('http').createServer(app); // нужно для поднятия сервера. С вариантом app.listen() - не будет работать
io = require('socket.io').listen(server);   // sockets object

//.........................................  INIT SECTION



// ROUTES
app.get('/', function(req, res) { res.render('index'); })

// Controoller of Sockets
var socketContoller = require('./SocketController');
socketContoller(io);





//.........................................  LAUNCH SECTION
var port = 3000;
server.listen(port);
console.log('Server is launched.............. on port ' + port);
