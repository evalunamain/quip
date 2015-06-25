define(['backbone', 'underscore','model/word'], function(Backbone, _, Word) {

    var WordsList = Backbone.Collection.extend({
 
    	model: function(attrs, options) {
            var newWord = attrs.word;
            var wordExists = app.currentUser.words.findWhere({word: newWord});
            
            if (!wordExists) {
                var newWord = new Word(attrs,options);
                app.currentUser.words.add(newWord);
                return newWord;
            }
            return wordExists;
         },

      

    	url: 'api/words/',

    });

    return WordsList;

});