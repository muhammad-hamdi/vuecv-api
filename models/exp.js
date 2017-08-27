const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExpSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    role: {
        type: String,
        reuired: true
    },
    user_id: {
        type: String,
        required: true
    }
});

const Exp = mongoose.model('exp', ExpSchema);

module.exports = Exp;
