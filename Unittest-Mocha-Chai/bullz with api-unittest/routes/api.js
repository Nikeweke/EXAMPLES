/*
*   api.js
*
*   API Routes
*
*/
const express = require('express')
const router  = express.Router()

// controllers
const ApiController = require('../app/controllers/ApiController')

// middlewares
const middlewares = []

router.get( '/stack', (req, res) => ApiController.getFromStack(req, res))
router.post('/stack', (req, res) => ApiController.addToStack(req, res))

router.post('/store',        (req, res) => ApiController.addKeyToStore(req, res))
router.get( '/store/:key',   (req, res) => ApiController.getValueByKey(req, res))
router.delete('/store/:key', (req, res) => ApiController.deleteValueByKey(req, res))

module.exports = router

