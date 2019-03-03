const mongoose = require('mongoose')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let destinationSchema = new mongoose.Schema({
  title: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE, unique: [true, 'Destination already exists.']},
  image: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE},
  description: {type: mongoose.Schema.Types.String},
  likes: [{type: mongoose.Schema.Types.String}],
  reviews: []
})

let Destination = mongoose.model('Destination', destinationSchema)

module.exports = Destination
