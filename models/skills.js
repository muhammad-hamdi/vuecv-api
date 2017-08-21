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
  }
});

const Skill = mongoose.module('skill', SkillSchema);

module.exports = Skill;
