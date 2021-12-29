/*
*  app.js
*
*/
const connect = require('./mongo/database')
const crud = require('./mongo/crud')

// models
const employerModel = require('./mongo/models/employer')
const thingModel = require('./mongo/models/thing')

// connecting to MongoDb
connect()
// console.log(mongoose.connection.readyState)

/*
*   Создание новой коллекции в БД: создать модель, записать с помощью модели
*/

// Вставка нескольких записей
// crud.create(thingModel, [{name: 'Pen'}, {name: 'Spoon'}])

// Выборка данных
// crud.get(employerModel)