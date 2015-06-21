/**
 * Created by 40in on 08.10.14.
 */
define(['app', 'backbone', 'jquery', 'marionette', 'js/app/routing-module', 'model/word', 'view/words-list-view', 'collection/words-list'], function(app, Backbone, $, Marionette, RoutingModule, Word, WordsListView, WordsList) {

    var HomeModule = Marionette.AppRouter.extend({

        // startWithParent: false,

        routes: {
            // 'home': 'homeAction',
            'test': 'test',
            'test2': 'test2'
            // '': 'homeAction'
        },

        initialize: function() {
            // RoutingModule.prototype.initialize.apply(this, arguments);
            console.log('HomeModule initialize');
        },

        onStart: function() {
            console.log('HomeModule start');
        },

        onStop: function() {
            console.log('HomeModule stop');
        },

        test: function () {
            console.log('hi in test');
        },

        test2: function () {
            console.log('hi in test2');
        },

        homeAction: function() {
            console.log('homeAction');

            if (!app.currentUser) {
                return;
            } else {
            
            app.userWords = ['syzygy','truculent','risible', 'orotund'];
            
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
    
                    
      },  

    });

    return HomeModule;

});