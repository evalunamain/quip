/**
 * Created by 40in on 07.10.14.
 */
var express = require('express'),
    app = express(),
    grunt = require('grunt'),
    indexGenerator = require('./template-generator.js'),
    mongoose = require('mongoose'),
    http = require('http'),
    unirest = require('unirest'),
    passport = require('passport'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    session = require('express-session'),
    path = require('path');

    if (!process.env.WORDSAPI_KEY) {
        var env = require('./config/env.js')
    }

var WORDSAPI_KEY = process.env.WORDSAPI_KEY;
var config = grunt.file.readJSON('config.json');

//Database
var User = require('./models/user');
var db = mongoose.connection;

db.on('error', console.error);

mongoose.connect(process.env.DB_URL);

require('./config/passport')(passport);

app.use(cookieParser(process.env.SESSION_SECRET));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(session({ 
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
})); // session secret

app.use(passport.initialize());
app.use(passport.session());

//Routes
require('./routes/auth')(app);
require('./routes/words')(app);
//Pass all other routes to Marionette aplication.
app.get('/*', function(req, res){
    indexGenerator.index(function(html) {
        res.send(html);
    });
});

console.log('Enviroment: ' + config.enviroment);
if (config.enviroment === 'dev') {
    app.use(express.static(path.join(__dirname, '..', 'public')));
} else {
    app.use(express.static(path.join(__dirname, '..', 'dist', 'public')));
}


var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});