/**
 * Created by 40in on 08.10.14.
 */
define(['app', 'marionette', 'js/app/routing-module', 'view/text-view'], function(app, Marionette, RoutingModule, TextView) {

    var HomeModule = RoutingModule.extend({

        startWithParent: false,

        routesList: {
            'home': 'homeAction',
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

        homeAction: function() {
            console.log('homeAction');
            var textView = new TextView({
                text: 'home page'
            });
            app.content(textView.render());
        }

    });

    return app.module('home', HomeModule);

});