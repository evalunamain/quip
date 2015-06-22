define(['app', 'jquery', 'marionette','model/word', 'view/search-result-view', 'view/error-view', 'view/words-list-view'], function(app, $, Marionette, Word, SearchResultView, ErrorView, WordsListView) {
	var WordsController = {

		//Lookup function for search bar.
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

    showList: function(wordList) {
      var listCollection = this.getListToShow(wordList);
      console.log(listCollection);
      var wordsListView = new WordsListView({collection: listCollection});
      app.content(wordsListView);
    },

    getListToShow: function(wordList) {
    	if (!wordList) return app.currentUser.wordLists['Favorites'];
      var wordListFormatted = wordList.replace(/-/g, ' ');
			var activeList = app.currentUser.wordLists[wordList] || 
							app.currentUser.wordLists[wordListFormatted];   
			return activeList;
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