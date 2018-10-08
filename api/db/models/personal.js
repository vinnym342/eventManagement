const mongoose = require('./init').mongoose

const personalSchema = mongoose.Schema({
  userID: String,
  firstName: String,
  lastName: String
})

const personal = mongoose.model('Personal', personalSchema)

module.exports = personal
