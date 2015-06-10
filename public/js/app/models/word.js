
define(['app', 'backbone'], function(app, Backbone) {

    var Word = Backbone.Model.extend({

    	initialize: function() {
    		console.log(this.get('word'));
    	},

	    url: function() {
	    	return 'api/word/' + this.get('word');
	    },

	    // parse: function (response) {
	    // 	if (response.results) {
	    // 		var results = response.results,
	    // 			self = this,
	    // 			definitions = [];

	    // 		results.forEach(function(result) {
	    // 			var definition = {definition: result.definition};
	    // 			definitions.push(definition);
	    // 		});

	    // 		response.definitions = definitions;
	    // 	}
	
	    // 	return response;
	    // }
    });

    return Word;

});