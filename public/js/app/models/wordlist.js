define(['app', 'backbone'], function(app, Backbone) {

    var WordList = Backbone.Model.extend({

    	initialize: function () {
    		console.log(this);
    	},

  

	    url: function() {
	    	return 'api/word/' + this.get('word');
	    },

    });

    return WordList;

});