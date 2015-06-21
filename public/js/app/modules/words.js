/**
 * Created by 40in on 08.10.14.
 */
define(['app', 'jquery', 'marionette', 'js/app/routing-module', 'model/word', 'view/search-result-view', 'view/error-view', 'view/words-list-view'], function(app, $, Marionette, RoutingModule, Word, SearchResultView, ErrorView, WordsListView) {

    var WordsModule = Backbone.Router.extend({

        // startWithParent: false,

        routes: {
            'lists': 'wordListTest',
             'word/:word': 'lookup',
        },

        initialize: function() {
            // RoutingModule.prototype.initialize.apply(this, arguments);
            console.log('WordsModule initialize');
        },

        onStart: function() {
            console.log('WordsModule start');
        },

        onStop: function() {
            console.log('WordsModule stop');
        },

        lookup: function(word) {
            console.log('in word lookup');
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

        wordListTest: function(wordList) {
            console.log('in list');
            var activeList = wordList ? app.curentUser.wordLists[wordList] : app.currentUser.wordLists['Favorites'];
            var wordsListView = new WordsListView({collection: activeList});
            app.content(wordsListView);
        }
    
    });

    return WordsModule;
});