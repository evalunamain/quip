/**
 * Created by 40in on 08.10.14.
 */
var grunt = require('grunt'),
    path = require('path'),
    cons = require('consolidate');

exports.index = function(success, enviroment) {
    var config = grunt.file.readJSON('config.json'),
        cssList = [],
        jsList = [],
        lessPath = 'lib/less.js/dist/less-1.7.5.js',
        templates = [],
        enviroment = enviroment || config.enviroment;


    if (enviroment === 'dev') {
        var cssList = grunt.file.expand(config.staticSrc.css + '/*.css');
        cssList = cssList.map(function(filePath) {
            return path.relative(config.staticSrc.css, filePath);
        });

        var templates = [];
        grunt.file.expand(config.staticSrc.templates + '/*' + config.templateExt).map(function(filePath) {
            var template = {};
            template.name = path.basename(path.relative(config.staticSrc.templates, filePath), config.templateExt);
            template.content = grunt.file.read(filePath);
            templates.push(template);
        });
        jsList = ['require.js', 'require.config.js'];
    } else {
        cssList = [config.staticDist.cssBundleName];
        jsList = [config.staticDist.jsBundleName];
    }

    cons.underscore('server/templates/index.us', {
        jsList: jsList,
        cssList: cssList,
        templates: templates,
        lessPath: lessPath,
        title: ''
    }, function(err, html){
        if (err) throw err;
        success(html);
    });
};