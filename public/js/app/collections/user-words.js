define(['app', 'backbone', 'model/word'], function(app, Backbone, Word) {

    var UserWords = Backbone.Collection.extend({

    	model: Word,

    	comparator: function(word) {
    		return word.get('word');
    	},

    	url: 'api/words/',

    });

    return UserWords;

});