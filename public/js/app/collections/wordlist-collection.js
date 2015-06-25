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

         intiailize: function(options) {
            this.wordsChannel = app.Radio.channel('words');
         },

         newList: function(data) {
            var self = this;
            $.ajax({
                url: '/api/addlist',
                type: 'POST',
                dataType:'json',
                data: {
                    listName: self.listName
                }
            }).done(function(data, textStatus, jqXHR) {
              app.currentUser.wordLists[listHref] = self;
              debugger
              self.wordsChannel.trigger('listSaved');
            }).fail(function(jqXHR) {
              console.log(jqXHR);             
            });
         }

    });

    return WordsList;

});