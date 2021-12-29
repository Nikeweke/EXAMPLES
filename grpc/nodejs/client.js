const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const packageDef = protoLoader.loadSync('todo.proto', {})
const grpcObject = grpc.loadPackageDefinition(packageDef)
const todoPackage = grpcObject.todoPackage

const client = new todoPackage.Todo(
  '127.0.0.1:4000',
  grpc.credentials.createInsecure(),
)

client.createTodo({
  id: 12,
  text: 'popi',
}, (err, res) => {
  if (err ) {
    console.log(err)
  }
  console.log('createTodo - Response from server:', res)
})


setTimeout(() => {
  client.readTodos(null, (err, res) => {
    if (err ) {
      console.log(err)
    }
    console.log('readTodos - Response from server:', res)
  })
}, 1000)

setTimeout(() => {
  const call = client.readTodosStream()
  call.on('data', item => {
    console.log('HEre: ', item)
  })
  call.on('end', err => console.log('server done'))

}, 5000)
