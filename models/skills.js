const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SkillSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  percent: {
    type: Number,
    required: true
  },
  category: {
      type: String,
      reuired: true
  },
  image_url: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
});

const Skill = mongoose.model('skill', SkillSchema);

module.exports = Skill;
