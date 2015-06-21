/**
 * Created by 40in on 08.10.14.
 */
define(['app', 'jquery', 'marionette', 'js/app/routing-module', 'model/word', 'view/search-result-view', 'view/error-view', 'view/words-list-view'], function(app, $, Marionette, RoutingModule, Word, SearchResultView, ErrorView, WordsListView) {

    var WordsModule = RoutingModule.extend({

        startWithParent: false,

        routesList: {
            'word/:word': 'lookup',
            'lists/(:list)': 'wordLists'
        },

        initialize: function() {
            RoutingModule.prototype.initialize.apply(this, arguments);
            console.log('WordsModule initialize');
        },

        onStart: function() {
            console.log('WordsModule start');
        },

        onStop: function() {
            console.log('WordsModule stop');
        },

        lookup: function(word) {
          var apiEndpoint = 'http://localhost:3000/api/word/' + word;
          
          $.ajax({
            url: apiEndpoint,
            type: 'GET',
            dataType:'json',
            }).done(function(data, textStatus, jqXHR) {
              var wordModel = new Word(data);
              var resultView = new SearchResultView({model: wordModel});
              app.content(resultView);  
            }).fail(function(jqXHR) {
              var errView = new ErrorView({model: new Backbone.Model({message: jqXHR.responseText})}); 
              app.content(errView);               
            });
           
        },


        wordLists: function(wordList) {
            console.log('in list');
            debugger
            var activeList = wordList ? app.curentUser.wordLists[wordList] : app.currentUser.wordLists['Favorites'];
            var wordsListView = new WordsListView({collection: activeList});
            app.content(wordsListView);
        }
    
    });

    return app.module('words', WordsModule);

});