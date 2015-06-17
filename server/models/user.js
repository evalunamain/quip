var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    wordLists: {
        type: mongoose.Schema.Types.Mixed,
        required: false
    },
    dateJoined: {
        type: Date,
        required: true
    },
    settings: {
        type: mongoose.Schema.Types.Mixed,
        required: false
    }


});

module.exports = mongoose.model('User', userSchema);