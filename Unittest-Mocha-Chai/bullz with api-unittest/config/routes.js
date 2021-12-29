/*
*  routes.js
*
*  Маршруты приложения
*/
const bodyParser = require('body-parser') 
const cookieParser = require('cookie-parser') 

module.exports = function (app) {
  // set middleware
  app.use(bodyParser.json()) // parse request data - application/json
  app.use(bodyParser.urlencoded({ extended: false })) // parse request data - application/x-www-form-urlencoded
  app.use(cookieParser())

  // routes
  app.use('/api', require('../routes/api'))
}
