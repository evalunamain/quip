/**
 * Created by 40in on 08.10.14.
 */
define(['app', 'jquery', 'marionette', 'js/app/routing-module', 'model/word', 'view/word-expanded-view'], function(app, $, Marionette, RoutingModule, Word, WordExpandedView) {

    var WordsModule = RoutingModule.extend({

        startWithParent: false,

        routesList: {
            'word/:word': 'defSearch',
            'lists/:list': 'wordList'
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
          var apiEndpoint = 'http://localhost:3000/api/word/' + word;
          
          $.ajax({
            url: apiEndpoint,
            type: 'GET',
            dataType:'json',
            }).done(function(data, textStatus, jqXHR) {
              var wordModel = new Word(data);
              var resultView = new WordExpandedView({model: wordModel});
              app.content(resultView);  
            }).fail(function(data) {
              console.log(data);                  
            });
           
        },

        wordList: function () {
            
        }
    
    });

    return app.module('words', WordsModule);

});