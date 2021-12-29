/*
*  bootstrap.js
*
*  Import of packages and setup of app
*/
 
const express    = require('express')
const routes     = require('./routes')
const server     = require('./server.js')

module.exports = function () {
  const app = express()
  routes(app)
  return server(app) // returning for test
}

