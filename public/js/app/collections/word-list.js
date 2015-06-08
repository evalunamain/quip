define(['app', 'backbone', 'model/word'], function(app, Backbone, Word) {

    var WordList = Backbone.Collection.extend({

    	model: Word

    });

    return WordList;

});