/**
 * Created by 40in on 08.10.14.
 */
define(['app', 'jquery', 'marionette', 'js/app/routing-module'], function(app, $, Marionette, RoutingModule) {

    var AuthModule = RoutingModule.extend({

        startWithParent: false,

        routesList: {
            'login': 'loginAction',
            '': 'homeAction'
        },

        initialize: function() {
            RoutingModule.prototype.initialize.apply(this, arguments);
            console.log('HomeModule initialize');
        },

        onStart: function() {
            console.log('HomeModule start');
        },

        onStop: function() {
            console.log('HomeModule stop');
        },

        loginAction: function() {
                
        },
                    
    });

    return app.module('auth', AuthModule);

});