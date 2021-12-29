/*
*  crud.js
*
*  Crud functions for testing mongoDB with mongoose
*/


module.exports = {
  // Select data
  get (Model) {
    Model.find({}, (err, docs) => {
      if (err) console.log(err)
      // docs.forEach
      console.log(docs)
    })
  },

  // Making new instance and saving it
  insert (Model, data) {
    let employer = new Model(data)
    employer.save((err) => {
      if (err) console.log(err)
      // saved!
    })
  },

  // Just creating record without instance
  create (Model, data) {
    Model.create(data, function (err, small) {
      if (err) console.log(err)
      // saved!
    })
  },

  // Updating
  update (id, Model, updDate) {
    Model.update({_id: id}, updDate, {upsert: true}, (err) => console.log(err))
  },

  // Deleting
  deleteRecord (id, Model) {
    Model.find({ _id: id }).remove((err) => console.log(err))
  }

}
