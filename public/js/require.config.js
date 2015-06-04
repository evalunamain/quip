requirejs.config({

    baseUrl: '',
    paths: {
        'backbone': 'bower_components/backbone/backbone',
        'marionette': 'bower_components/backbone.marionette/lib/backbone.marionette',
        'underscore': 'bower_components/underscore/underscore',
        'jquery': 'bower_components/jquery/dist/jquery',
        'app': 'js/app',
        'module': 'js/app/modules',
        'model': 'js/app/models',
        'view': 'js/app/views'
    },
    shim: {
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        'marionette': {
            deps: ['backbone'],
            exports: 'Marionette'
        },
        'underscore': {
            exports: '_'
        },
        jquery: {
            exports: '$'
        }
    }
});

require(['app'], function(app) {
    app.start();
});