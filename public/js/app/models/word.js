define(['app', 'backbone'], function(app, Backbone) {

    var Word = Backbone.Model.extend({

	    url: function() {
	    	return 'api/word/' + this.get('word');
	    },

	    defaults: {
	    	definitions: []
	    },

	    initialize: function(data) {
	    	console.log("Word initialize",data);
	    	if (this.get('definitions').length == 0) {
	    		this.fetch();
	    	}
	    },

	    parse: function (response) {
	    	console.log("Word parse",response);
	    	if (response.results) {
	    		var results = response.results,
	    			self = this,
	    			definitions = [];

	    		results.forEach(function(result) {
	    			var definition = {definition: result.definition};
	    			definitions.push(definition);
	    		});

	    		response.definitions = definitions;
	    	}
	
	    	return response;
	    }
    });

    return Word;

});