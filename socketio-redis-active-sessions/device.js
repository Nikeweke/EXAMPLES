




var socket = require('socket.io-client')('http://localhost:3000', {
  extraHeaders: {
    // Authorization: "Bearer authorization_token_here"
  }
});



socket.on('connect', function(){});
socket.on('event', function(data){});
socket.on('disconnect', function(){});