/**
 * Created by 40in on 08.10.14.
 */
define(['app', 'jquery', 'marionette', 'js/app/routing-module', 'model/word', 'view/text-view', 'view/user-words-view', 'collection/user-words'], function(app, $, Marionette, RoutingModule, Word, TextView, UserWordsView, UserWords) {

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
            // var textView = new TextView({
            //     text: 'home page'
            // });
            var apiEndpoint = 'http://localhost:3000/api/words/' + JSON.stringify(app.userWords);
            
            $.ajax({
                   url: apiEndpoint,
                   data: {
                      format: 'json'
                   },
                   error: function(err) {
                        console.log(err);
                    },
                   success: function(data) {
                        console.log(data)
                        debugger
                        var words = data.map(function(word) {
                            return new Word(word);
                        });
                        app.userWordsCollection = new UserWords(words);
                        var userWordsView = new UserWordsView({collection: app.userWordsCollection});
                        app.content(userWordsView);                   
                    },
                   type: 'GET'
            });
    
                    
        }    
            
        

    });

    return app.module('home', HomeModule);

});