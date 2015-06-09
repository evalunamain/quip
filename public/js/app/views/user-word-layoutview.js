define(['marionette', 'view/user-word-basic-view', 'view/user-word-expanded-view'], function(Marionette, UserWordBasicView, UserWordExpandedView) {

    var UserWordLayoutView = Marionette.LayoutView.extend({

    	className: 'wordrow',

        template: '#userwordlayout',

        regions: {
        	'wordListed' : '.wordListed'
        },

        events: {
            "click .wordListed": 'wordExpand'
        },

        onRender: function() {
        	var wordBasicView = new UserWordBasicView({model: this.model});
        	this.getRegion('wordListed').show(wordBasicView);
        },

        wordExpand: function(e) {
            this.$el.append($('<div class="word-expanded col s12">'));
            this.addRegion("wordExpanded", ".word-expanded");
            var wordExpandedView = new UserWordExpandedView({ model: this.model});
            this.getRegion('wordExpanded').show(wordExpandedView);
            
        }



    });

    return UserWordLayoutView;

});