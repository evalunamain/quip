/**
 * Created by 40in on 07.10.14.
 */
var express = require('express'),
    app = express(),
    grunt = require('grunt'),
    indexGenerator = require('./template-generator.js'),
    http = require('http'),
    path = require('path');

var config = grunt.file.readJSON('config.json');

console.log('Enviroment: ' + config.enviroment);
if (config.enviroment === 'dev') {
    app.use(express.static(path.join(__dirname, '..', 'public')));
} else {
    app.use(express.static(path.join(__dirname, '..', 'dist', 'public')));
}

app.get('/api/user/(:id)?', function(req, res){
    var userId = req.params.id;

    if (!userId) {
        res.json({
            login: 'terminator',
            name: 'Arnoldo Shunzenfegeld',
            language: 'ru',
            id: '1'
        });
        return;
    }

    res.json({
        id: req.params.id,
        login: 'randomuser',
        name: 'Random',
        language: 'en'
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