const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  Age: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    required: true
  }
});

const User = mongoose.module('user', SkillSchema);

module.exports = User;
