/*
* employer.js
*
*  Model of employer
*/

const mongoose = require('mongoose')
const { Schema } = mongoose

const employerSchema = new Schema({
  id: Schema.ObjectId,
  name: String,
  surname: String
})

module.exports = mongoose.model('employees', employerSchema)
