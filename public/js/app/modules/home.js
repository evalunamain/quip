/**
 * Created by 40in on 08.10.14.
 */
define(['app', 'jquery', 'marionette', 'js/app/routing-module', 'model/word', 'view/words-list-view', 'collection/words-list'], function(app, $, Marionette, RoutingModule, Word, WordsListView, WordsList) {

    var HomeModule = RoutingModule.extend({

        startWithParent: false,

        routesList: {
            'word': 'homeAction',
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
                        var words = data.map(function(word) {
                            return new Word(word);
                        });
                        app.userWordsCollection = new WordsList(words);
                        var wordsListView = new WordsListView({collection: app.userWordsCollection});
                        app.content(wordsListView);                   
                    },
                   type: 'GET'
            });
    
                    
        }    
            
        

    });

    return app.module('home', HomeModule);

});