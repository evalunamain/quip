define(['app', 'backbone', 'model/word',], function(app, Backbone, Word) {

    var ListCollection = Backbone.Collection.extend({

    	model: Word,

    	// initialize: function (models) {
    	// 	if (typeof(models) == 'object') {
    	// 		var newModels = [];

    	// 		newModels.push.apply(this, Object.keys(models)); 
    	// 		newModels.forEach(function (wordObj) {
    	// 			wordObj = new Word(wordObj);
    	// 		});
    	// 		this.set()
    	// 	}
    	// 	debugger
    	// },

    	// set: function (models, options) {
    	// 	console.log(models);
    	// 	debugger
    	// 	if (typeof(models) == 'object') {
    	// 		var newModels = [];

    	// 	Object.keys(models).forEach(function (word) {
    	// 			console.log(word);
    	// 			var wordModel = new Word(models[word]);
    	// 			newModels.push(wordModel);
    	// 		})
    	// 		models = newModels

    	// 	} 
    	// 	return Backbone.Collection.prototype.set.call(this, models, options);
    		

    	// 	debugger
  
    	// },

    	url: 'api/words/',

    });

    return ListCollection;

});