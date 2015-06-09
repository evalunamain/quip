define(['marionette', 'view/user-word-basic-view'], function(Marionette, UserWordBasicView) {

    var UserWordLayoutView = Marionette.LayoutView.extend({

    	className: 'wordrow',

        template: '#userwordlayout',

        regions: {
        	'wordListed' : '.wordListed'
        },

        onRender: function() {
        	var wordBasicView = new UserWordBasicView({model: this.model});
        	this.getRegion('wordListed').show(wordBasicView);
        }



    });

    return UserWordLayoutView;

});