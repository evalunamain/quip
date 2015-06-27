module.exports = function(app) {  



var auth = function(req, res, next){ 
    if (!req.isAuthenticated()) {
        res.send(401);
    } else {
        next();   
    } 
}; 

//
//Wordlist management
//

//Add a new wordlist
app.post('/api/addlist', auth, function(req,res,next) {
    var listName = req.body.listName;
    User.findOne({ _id : req.user._id}, function (err, user){
        console.log(err,user)
        var userObj = user.toObject();

        if (!req.user.wordLists[listName]) {
            userObj.wordLists[listName] = [];
            User.update({_id: req.user._id},  {$set : {wordLists:userObj.wordLists}}, {overwrite: true}, function(err, doc) {
                if (err) {
                    console.log(err);
                    res.status(401).send(err);
                }
                res.status(200).send({message: listName + ' word list created.'});
            });
        }
        else {
            res.status(401).send({message: "A list with that name already exists!"})
        }
    });

});

//Delete a wordlist
app.post('/api/deletelist', auth, function(req,res,next) {
    var listName = req.body.listName;
    User.findOne({ _id : req.user._id}, function (err, user){
        
        var userObj = user.toObject();

        if (req.user.wordLists[listName]) {
            delete userObj.wordLists[listName];
            User.update({_id: req.user._id},  {$set : {wordLists:userObj.wordLists}}, {overwrite: true}, function(err, doc) {
                if (err) {
                    console.log(err);
                    res.status(401).send(err);
                }
                res.status(200).send({message: listName + ' word list removed.'});
            });
        }
        else {
            res.status(401).send({message: "You can't remove something that doesn't exist!"})
        }
    });
});

//Add word to list
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
            res.status(200).send({message: word + ' added to "' + wordList + '" word list.'});
        });
    });
});


//
//Words functionality
//


//Retrieve multiple words 
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

//Retrieve a word
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



};