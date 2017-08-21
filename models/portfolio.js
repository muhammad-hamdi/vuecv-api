const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  image_url: {
    type: String,
    required: true
  }
});

const Work = mongoose.model('work', WorkSchema);

module.exports = Work;
