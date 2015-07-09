var mongoose = require('mongoose');

var wordListSchema = new mongoose.Schema({
    name: 'String',
    dateCreated: {
    	type: Date,
    	required: true
    },
    dateUpdated: {
    	type: Date,
    	required: false
    },
    words: {
        type: mongoose.Schema.Types.Mixed,
    }
});

module.exports = mongoose.model('WordList', wordListSchema);