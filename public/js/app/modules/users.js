/**
 * Created by 40in on 08.10.14.
 */
define(['app', 'marionette', 'js/app/routing-module', 'model/user', 'view/text-view', 'view/test-view'], function(app, Marionette, RoutingModule, User, TextView, TestView) {

    var UsersModule = RoutingModule.extend({

        startWithParent: false,

        routesList: {
            'users': 'listAction',
            'test' : 'testUser'
        },

        initialize: function() {
            RoutingModule.prototype.initialize.apply(this, arguments);
            app.currentUser = new User();
            console.log('UsersModule initialize');
        },

        onStart: function() {
            console.log('UsersModule start');
        },

        onStop: function() {
            console.log('Users Module stop');
        },

        listAction: function() {
            console.log('listAction');
            var textView = new TextView({
                text: 'users page'
            });
            app.content(textView.render());
        },

        testUser: function() {
            var testView = new TestView({model: app.currentUser});
            app.content(testView.render());
            console.log(app.currentUser.get('name'));
        }

    });

    return app.module('users', UsersModule);

});