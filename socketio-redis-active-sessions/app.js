const jwt = require('jsonwebtoken'); 
const io = require('socket.io')(3000, {
  cors: {
    origin: "*",
  }
});

const JWT_SECRET = 'd08abc7a-9e6b-42f8-b1f0-53fb8248ea34'


io.on('connection', (socket) => {
  console.log('Device connected - ', socket.id)
 
  const rawAuthHeader = socket.request.headers['authorization']
  if (!rawAuthHeader) {
    socket.disconnect()
    console.log('Auth header not found')
    return 
  }

  const token = rawAuthHeader.split(' ')[1]
  console.log(token)
  // const token = 


  // var decoded = jwt.verify(token, JWT_SECRET);
  // console.log(decoded) // bar

});

