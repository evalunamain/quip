define(['app', 'backbone', 'model/word'], function(app, Backbone, Word) {

    var UserWords = Backbone.Collection.extend({

    	model: Word

    });

    return UserWords;

});