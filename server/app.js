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

var auth = function(req, res, next){ 
    if (!req.isAuthenticated()) {
        res.send(401);
    } else {
        next();   
    } 
}; 

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

    req.login(user, function (err, user) {
        if(err){
            return next(err);
        }
        return res.send({success : true, message : 'authentication succeeded' });
    });
  })(req, res, next);
});

app.post('/api/login', function (req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.status(401).send({err: err, info: info, success : false, message : 'authentication failed' });
    }

    req.login(user, function (err) {
        if(err){
            return next(err);
        }

        user = user.toObject();
        delete user.local; //Don't send back credentials
        return res.send({ success : true, message : 'authentication succeeded', user: user });
    }); 

  })(req, res, next);
});

app.get('/api/loggedin', function(req, res) { 
    if (!req.isAuthenticated()) {
        res.status(401).send({message: "You're not logged in!"});
    } else {
        var user = req.user.toObject();
        delete user.local;
        res.send(user);
    }
     
}); 

app.get('/api/logout', function(req, res) { 
    if (!req.isAuthenticated()) {
        res.status(401).send({message: "You're not logged in!"});
    } else {
        req.logOut();
        req.session.destroy();
        res.send(200);
    }
     
}); 

app.post('/api/addlist', auth, function(req,res,next) {
    var listName = req.body.listName;
    User.findOne({ _id : req.user._id}, function (err, user){
        var userObj = user.toObject();

        if (!req.user.wordLists[listName]) {
            userObj.wordLists[listName] = [];
            User.update({_id: req.user._id},  {$set : {wordLists:userObj.wordLists}}, {overwrite: true}, function(err, doc) {
                if (err) res.send(err);
                res.send(200);
            });
        }
        else {
            res.send({message: "A list with that name already exists!"})
        }
    });

});

app.post('/api/addtolist', auth, function (req, res, next) {
   //var wordList = '"wordLists.'+req.body.wordList+'"';
   var wordList = req.body.wordList;
   var inFavorites = req.body.inFavorites || false;

   var word = req.body.word;

   var conditions = {_id : req.user._id},
       update = { $set : {wordList:word}},
       options = {upsert: false};

  

    User.findOne({ _id : req.user._id}, function (err, user){
        var userObj = user.toObject();

        if (!req.user.wordLists[wordList]) {
            userObj.wordLists[wordList] = [];
        }

        userObj.wordLists[wordList].push({word: word, updated_at: new Date()});
        if (!inFavorites) userObj.wordLists['Favorites'].push({word: word, updated_at: new Date()});

        User.update({_id: req.user._id},  {$set : {wordLists:userObj.wordLists}}, {overwrite: true}, function(err, doc) {
            if (err) res.send(err);
            res.send(200);
        });
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
        res.status(result.statusCode);
        if (result.statusCode != 200 || !result.body.results) {
          res.send('Could not find "'+ word +'."');
        }
        else {
            res.json(result.body);
        }
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