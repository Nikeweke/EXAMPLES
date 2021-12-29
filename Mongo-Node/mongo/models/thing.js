/*
*  thing.js
*
*  Model of thing
*/

const mongoose = require('mongoose')
const { Schema } = mongoose

const thingSchema = new Schema({
  id: Schema.ObjectId,
  name: String
})

module.exports = mongoose.model('things', thingSchema)
