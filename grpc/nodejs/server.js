const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const packageDef = protoLoader.loadSync('todo.proto', {})
const grpcObject = grpc.loadPackageDefinition(packageDef)
const todoPackage = grpcObject.todoPackage

const server = new grpc.Server()
server.bind(
  '127.0.0.1:4000',
  grpc.ServerCredentials.createInsecure()
)


const todos = []
const actions = {
  createTodo(call, callback) {
    const todoItem = call.request
    todos.push(todoItem)
    callback(null, todoItem)
  },

  readTodos(call, callback) {
    callback(null, {items: todos})
  },

  readTodosStream(call, callback) {
    for (const item of todos) {
      call.write(item)
    }
    call.end()
  },
}

server.addService(todoPackage.Todo.service, {
  'createTodo': actions.createTodo,
  'readTodos': actions.readTodos,
  'readTodosStream': actions.readTodosStream,
})
server.start()
console.log('Server is running...')