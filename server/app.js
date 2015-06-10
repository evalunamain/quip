/**
 * Created by 40in on 07.10.14.
 */
var express = require('express'),
    app = express(),
    grunt = require('grunt'),
    indexGenerator = require('./template-generator.js'),
    http = require('http'),
    unirest = require('unirest'),
    path = require('path');

    if (!process.env.WORDSAPI_KEY) {
        var env = require('./env.js')
    }

    var WORDSAPI_KEY = process.env.WORDSAPI_KEY;

var config = grunt.file.readJSON('config.json');

console.log('Enviroment: ' + config.enviroment);
if (config.enviroment === 'dev') {
    app.use(express.static(path.join(__dirname, '..', 'public')));
} else {
    app.use(express.static(path.join(__dirname, '..', 'dist', 'public')));
}

// app.get('/api/user/(:id)?', function(req, res){
//     var userId = req.params.id;

//     if (!userId) {
//         res.json({
//             login: 'terminator',
//             name: 'Arnoldo Shunzenfegeld',
//             language: 'ru',
//             id: '1'
//         });
//         return;
//     }

//     res.json({
//         id: req.params.id,
//         login: 'randomuser',
//         name: 'Random',
//         language: 'en'
//     });
// });
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