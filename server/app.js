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

app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(session({ 
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
})); // session secret

app.use(passport.initialize());
app.use(passport.session());

console.log('Enviroment: ' + config.enviroment);
if (config.enviroment === 'dev') {
    app.use(express.static(path.join(__dirname, '..', 'public')));
} else {
    app.use(express.static(path.join(__dirname, '..', 'dist', 'public')));
}

app.post('/api/signup', function (req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.send({err: err, info: info, success : false, message : 'authentication failed' });
    }

    req.login(user, function (err) {
        if(err){
            return next(err);
        }
        return res.send({ success : true, message : 'authentication succeeded' });
    });
  })(req, res, next);
});

app.post('/api/login', function (req, res, next) {
    console.log(req.body);
    passport.authenticate('local-login', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.status(401).send({err: err, info: info, success : false, message : 'authentication failed' });
    }
    console.log(req.session.passport.user);
    return res.send({ success : true, message : 'authentication succeeded', user: user });
  })(req, res, next);
});


app.get('/api/user/(:email)?', function(req, res){
    var email = req.params.email;
    User.findOne({ email: email }, function(err, user) {
      if (err) return console.error(err);
      res.json(user);
    });
});


app.get('/api/words/(:words)', function(req, res){
   var words = JSON.parse(req.params.words);
   console.log("REQUEST ARRAY : " + words);
   var results = [];

    words.forEach(function(word) {
        console.log("API Call for : " + word);
        unirest.get("https://wordsapiv1.p.mashape.com/words/" + word)
            .header("X-Mashape-Key", WORDSAPI_KEY)
            .header("Accept", "application/json")
            .end(function (result) {
                results.push(result.body);
                if (results.length == words.length) res.json(results);
        });
    });
 });

app.get('/api/word/(:word)', function(req, res){
    var word = req.params.word;

    unirest.get("https://wordsapiv1.p.mashape.com/words/" + word)
        .header("X-Mashape-Key", WORDSAPI_KEY)
        .header("Accept", "application/json")
        .end(function (result) {
          res.json(result.body);
    });

});

app.get('/*', function(req, res){
    indexGenerator.index(function(html) {
        res.send(html);
    });
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});