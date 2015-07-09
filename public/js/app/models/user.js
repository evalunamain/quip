define(['backbone', 'collection/wordlist-collection', 'model/word'], function(Backbone, WordList, Word) {

    var User = Backbone.Model.extend({

      idAttribute: '_id',

   		set: function (attributes, options) {
        // if (app.currentUser && !app.currentUser.words) app.currentUser.words = new WordList();
   			if (attributes.wordLists) {
   				this.wordLists = this.setWordLists(attributes.wordLists);
   				delete attributes.wordLists;
   			}
   			return Backbone.Model.prototype.set.call(this, attributes, options);
   		},

   		setWordLists: function (wordLists) {
        var userWordLists = {};

        wordLists.forEach(function (wordList) {
          var collection = new WordList(wordList.words),
            nameNormalized = app.normalizeForSearch(wordList['name']).replace(/\s+/g, '-');

          collection._id = wordList._id;
          collection.listName = wordList['name'];
          collection.listHref = nameNormalized;
          userWordLists[nameNormalized] = collection;
        });

        return userWordLists;
   		},

	    logIn: function(options){
		    var model = this;

		    var credentials = {
		      "email": options.email,
		      "password": options.password
		    };

		    $.ajax({
          url: '/api/login',
          type: 'post',
          dataType: 'json',
          data: credentials
        }).done(function(data){
            app.currentUser = model;
            app.currentUser.words = new WordList();
            app.currentUser.words.listName = "All words"
  		      app.currentUser.set(data.user);
  		      app.Radio.channel('auth').trigger('logIn');
            app.navigate('lists');
        }).fail(function(err, jqXHR) {
           debugger
        })
		  },

		  logOut: function(options){
		    var model = this;

		    $.ajax({
		      url: '/api/logout',
		      type: "GET",
          }).done(function(data) {
            model.clear();
            delete app.currentUser;
            app.Radio.channel('auth').trigger('logOut');
            app.navigate('');
          }).fail(function(data) {
            var erMsg = "Logout failed. Please try again.";
            app.content(new ErrorView({model: new Backbone.Model({message: erMsg})}));
          });
		    }
	 
    });

    return User;

});