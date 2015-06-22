define(['backbone', 'collection/list-collection', 'model/word'], function(Backbone, WordList, Word) {

    var User = Backbone.Model.extend({
   		set: function (attributes, options) {
        
   			if (attributes.wordLists) {
   				this.wordLists = attributes.wordLists;
   				this.setCollections();
   				delete attributes.wordLists;
   			}
   			return Backbone.Model.prototype.set.call(this, attributes, options);
   		},

   		setCollections: function () {
   			var self = this;
   			Object.keys(self.wordLists).forEach(function(listName) {
   				var collection = new WordList(self.wordLists[listName]);
   				collection.listName = listName;
   				self.wordLists[listName] = collection;
   			})
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
        	console.log('data found');
		       model.set(data.user);
           app.currentUser = model;
		      app.Radio.channel('auth').trigger('signIn');
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