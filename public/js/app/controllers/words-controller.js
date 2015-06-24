define(['app', 'jquery', 'marionette','model/word', 'view/search-result-view', 'view/error-view', 'view/words-list-view'], function(app, $, Marionette, Word, SearchResultView, ErrorView, WordsListView) {
	var WordsController = {

		//Lookup function for search bar.
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
          app.content(app.makeErrView(jqXHR.responseText));               
        });
       
    },

    showList: function(listName) {
      if (!app.currentUser) {
        return app.content(app.makeErrView("You need to be logged in to view your lists!"));
      }

      var listCollection = this.getListToShow(listName);
      if (!listCollection) {
        return app.content(app.makeErrView("We couldn't find that word list."));               
      }

      var wordsListView = new WordsListView({collection: listCollection});
      app.content(wordsListView);
    },

    getListToShow: function(listName) {
    	if (!listName) return app.currentUser.words;
      var listHrefNormalized = app.normalizeForSearch(listName).replace(/\s+/g, '-');
			return app.currentUser.wordLists[listHrefNormalized] || undefined;

			
    }
	  // lookup : function () {
	  // 	console.log('looking up');
	  // },

	  // wordList: function(wordList) {
	  // 	  	console.log('lists');
	  // }
	}


	 return WordsController;
});