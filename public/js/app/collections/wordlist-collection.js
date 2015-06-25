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

         initialize: function(options) {
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
                console.log("reponse");
              app.currentUser.wordLists[self.listHref] = self;
              self.wordsChannel.trigger('listSaved');
            }).fail(function(data,textStatus,jqXHR) {
                console.log("error");
              console.log(data,jqXHR);             
            });
         }

    });

    return WordsList;

});