const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: String,
  first_name: String,
  last_name: String,
  password: String
})

const User = mongoose.model('User', UserSchema)

module.exports = User