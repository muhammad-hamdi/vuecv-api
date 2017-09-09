const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const goalSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
});

const Goal = mongoose.model('goal', goalSchema);

module.exports = Goal;
