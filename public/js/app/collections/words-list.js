define(['app', 'backbone', 'model/word'], function(app, Backbone, Word) {

    var WordsList = Backbone.Collection.extend({

    	model: Word,

    	comparator: function(word) {
    		return word.get('word');
    	},

    	url: 'api/words/',

    });

    return WordsList;

});