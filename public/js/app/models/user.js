define(['backbone', 'collection/wordlist-collection', 'model/word'], function(Backbone, WordList, Word) {

    var User = Backbone.Model.extend({

      idAttribute: '_id',

   		set: function (attributes, options) {
        // if (app.currentUser && !app.currentUser.words) app.currentUser.words = new WordList();
        
   			if (attributes.wordLists) {
   				this.wordLists = attributes.wordLists;
   				this.setWordLists();
   				delete attributes.wordLists;
   			}
   			return Backbone.Model.prototype.set.call(this, attributes, options);
   		},

   		setWordLists: function () {

   			var self = this;
   			Object.keys(self.wordLists).forEach(function(listName) {
          if (listName != 'Favorites') {
     				var collection = new WordList(self.wordLists[listName]);
     				collection.listName = listName;
     				self.wordLists[listName] = collection;
          }
   			});
   		},

	    signIn: function(options){
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
        
  		      app.currentUser.set(data.user);
  		      app.Radio.channel('auth').trigger('signIn');
            app.navigate('lists');
        }).fail(function(err, jqXHR) {
           debugger
        })
		  },

		  // signOut: function(options){
		  //   var model = this;

		  //   $.ajax({
		  //     url: ,
		  //     type: "DELETE",
		  //     dataType: "json",
		  //     success: function(data){
		  //       model.clear();
		  //       options.success && options.success();
		  //     }
		  //   });
		  // }
	 
    });

    return User;

});