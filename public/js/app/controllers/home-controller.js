define(['app', 'backbone', 'jquery', 'marionette', 'js/app/routing-module', 'model/word', 'view/words-list-view', 'collection/words-list'], function(app, Backbone, $, Marionette, RoutingModule, Word, WordsListView, WordsList) {

	var HomeController = {

		homeAction: function() {
            console.log('homeAction');

            // if (!app.currentUser) {
            //     return;
            // } else {
            
            // var apiEndpoint = 'http://localhost:3000/api/words/' + JSON.stringify(app.userWords);
            
            // $.ajax({
            //        url: apiEndpoint,
            //        data: {
            //           format: 'json'
            //        },
            //        error: function(err) {
            //             console.log(err);
            //         },
            //        success: function(data) {
            //             console.log(data)
            //             var words = data.map(function(word) {
            //                 return new Word(word);
            //             });
            //             app.userWordsCollection = new WordsList(words);
            //             var wordsListView = new WordsListView({collection: app.userWordsCollection});
            //             app.content(wordsListView);                   
            //         },
            //        type: 'GET'
            // });
        }
    }

    return HomeController;

});
