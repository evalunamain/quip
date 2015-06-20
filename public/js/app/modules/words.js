/**
 * Created by 40in on 08.10.14.
 */
define(['app', 'jquery', 'marionette', 'js/app/routing-module', 'model/word', 'view/words-list-view', 'view/word-expanded-view', 'collection/words-list'], function(app, $, Marionette, RoutingModule, Word, WordsListView, WordExpandedView, WordsList) {

    var WordsModule = RoutingModule.extend({

        startWithParent: false,

        routesList: {
            'word/:word': 'defSearch'
        },

        initialize: function() {
            RoutingModule.prototype.initialize.apply(this, arguments);
            console.log('HomeModule initialize');
        },

        onStart: function() {
            console.log('WordsModule start');
        },

        onStop: function() {
            console.log('WordsModule stop');
        },

        defSearch: function(word) {
         debugger
            var apiEndpoint = 'http://localhost:3000/api/word' + word;
            
            $.ajax({
                   url: apiEndpoint,
                   data: {
                      format: 'json'
                   },
                   error: function(err) {
                        console.log(err);
                    },
                   success: function(data) {
                        var wordModel = new Word(data);
                        var resultView = new WordExpandedView({model: wordModel});
                        app.content(resultView);                   
                    },
                   type: 'GET'
            });
    
                    
        }    
            
        

    });

    return app.module('words', WordsModule);

});