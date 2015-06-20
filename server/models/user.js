var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
    email: 'String',

    local : {
        email: String,
        password: String,
    },
    wordLists: {
        type: mongoose.Schema.Types.Mixed,
        required: false
    },
    dateJoined: {
        type: Date,
        required: true,
    },
    settings: {
        type: mongoose.Schema.Types.Mixed,
        required: false
    }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);