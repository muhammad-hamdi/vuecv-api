const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {type: String, required: true, unique: true},
  email: {
      type: String,
      required: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: false
  },
  age: {
    type: Number,
    required: false
  },
  description: {
    type: String,
    required: false
  },
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
