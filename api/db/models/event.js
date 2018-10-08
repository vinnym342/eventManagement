const mongoose = require('./init').mongoose

const eventSchema = mongoose.Schema({
  // employeeId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Employee',
  //   required: true,
  // }
  name: String,
  description: String,
  venueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Venue',
      required: true,
    },
})

const event = mongoose.model('event', eventSchema)

module.exports = event