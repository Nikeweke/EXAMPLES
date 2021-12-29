/*
*  Главный script - точка входа
*
*  app.js
*/
const express    = require('express')
const routes     = require('./config/routes')
const server     = require('./config/server.js')

const app = express()
routes(app)
module.exports = server(app) 



