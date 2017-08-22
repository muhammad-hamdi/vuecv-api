const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
      type: String,
      required: true
  },
  password: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: false
  },
  Age: {
    type: Number,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  admin: {
    type: Boolean,
    required: true
  }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
