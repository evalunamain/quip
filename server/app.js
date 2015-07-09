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
var WordList = require('./models/wordlist');
var ObjectId = require('mongodb').ObjectID;
var db = mongoose.connection;

db.on('error', console.error);

mongoose.connect(process.env.DB_URL);

//Functions
var auth = function(req, res, next){ 
    if (!req.isAuthenticated()) {
        res.send(401);
    } else {
        next();   
    } 
}; 

var getWordLists = function (wordListIds) {
    console.log('in function: ', wordListIds);
    WordList.find({
        '_id': { $in: wordListIds}}, function (err, docs) {
            console.log('err: ', err, 'docs: ', docs);
        if (err || docs.length == 0) return false;
        return docs;
    });
};

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
       
        WordList.find({
            '_id': { $in: user.wordLists}}, function (err, docs) {
                console.log('err: ', err, 'docs: ', docs);
                if (err ) res.status(401).send({message: err});
                if (docs.length < user.wordLists.length) {
                    res.status(401).send({message: 'There was an problem retrieving your wordLists, please try again.'});
                }
                user.wordLists = docs;
                return res.send({ success : true, message : 'authentication succeeded', user: user });

        });
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
    var wordListName = req.body.wordListName;
    var newWordList = new WordList({
        name: wordListName,
        dateCreated: new Date()
    });

    newWordList.save(function(err, list) {
        var wordListId = list.id;

        User.update({ _id : req.user._id}, {"$push" : {"wordLists": new ObjectId(wordListId)}}, function (err, list){
            if (err) res.status(401).send(err);
            res.status(200).send({message: "List added!"});
         });

    });



});

app.post('/api/deletelist', function(req,res,next) {
    var wordListId = new ObjectId(req.body.wordListId);
    WordList.findOneAndRemove({"_id": wordListId}, function (err, doc) {
    // doc.remove(function(err, doc) {
        if (err) res.status(401).send(err);
        User.update({ _id : req.user._id}, {"$pull" : {"wordLists": req.body.wordListId}}, function (err, list){
            if (err) res.status(401).send(err);
            res.status(200).send({message: "List removed!"});
        });

    // });
    });
   

});

app.post('/api/addtolist', function (req, res, next) {
   var wordListId = new ObjectId(req.body.wordListId);
   var wordListName = req.body.wordListName;
   var word = {word:req.body.word, dateAdded: new Date()};

    WordList.update({_id: wordListId}, {"$push" : {"words" : word}}, function (err, affected){
        if (err) res.status(401).send(err);
        res.status(200).send({message: req.body.word + ' added to "' + wordListName + '" word list.'});

    });
});

app.post('/api/deletefromlist', function (req, res, next) {
   var wordListId = new ObjectId(req.body.wordListId);
   var wordListName = req.body.wordListName;
   var word = req.body.word;

    WordList.update({_id: wordListId}, {"$pull" : {"words" : {"word":word}}}, function (err, affected){
        if (err) res.status(401).send(err);
        res.status(200).send({message: word + ' removed from "' + wordListName + '" word list.'});

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
          res.send({message:'Could not find "'+ word +'."'});
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