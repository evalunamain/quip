requirejs.config({

    baseUrl: '',
    paths: {
        'backbone': 'bower_components/backbone/backbone',
        'backbone_radio' : 'bower_components/backbone.radio/build/backbone.radio',
        'marionette': 'bower_components/backbone.marionette/lib/backbone.marionette',
        'marionette.radio' : 'js/lib/marionette.radio',
        'underscore': 'bower_components/underscore/underscore',
        'jquery': 'bower_components/jquery/dist/jquery',
        'jquery-ui': 'bower_components/jquery-ui/jquery-ui.min',
        'dropdown' : 'bower_components/materialize/js/dropdown',
        'toastr' : 'bower_components/toastr/toastr.min',    
        'velocity' : 'js/lib/velocity.min',    
        'app': 'js/app',
        'router': 'js/app/routers',
        'module': 'js/app/modules',
        'controller' : 'js/app/controllers',
        'model': 'js/app/models',
        'view': 'js/app/views',
        'collection': 'js/app/collections'
    },
    map: {
        '*': {
            'marionette' : 'marionette.radio',
            'backbone.wreqr': 'backbone_radio'
        },
        'marionette.radio' : {
            'marionette': 'marionette'
        }
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
        'dropdown' : {
            deps:['jquery']
        },
        "velocity": {
            deps: [ "jquery" ]
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
        },
        'jquery-ui': {
            deps: ['jquery']
        },
        'toastr' : {
            deps: ['jquery'],
            exports: 'toastr'
        }
    }
});

require(['app', 'underscore', 'module/utils'], function(app, _, appUtils) {
    _.extend(app,appUtils);
    app.start();
});