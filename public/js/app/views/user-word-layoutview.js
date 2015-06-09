define(['marionette', 'view/user-word-basic-view'], function(Marionette, UserWordBasicView) {

    var UserWordLayoutView = Marionette.LayoutView.extend({

    	className: 'wordrow',

        template: '#userwordlayout',

        regions: {
        	'wordListed' : '.wordListed'
        },

        initialize: function() {
       		this.test = new UserWordBasicView({model:this.model});
        },



        onBeforeRender: function() {
        	
  
        },

        onAfterRender: function() {
        	this.getRegion('wordListed').show(this.test);
        	console.log("rendered layoutview");
        }



    });

    return UserWordLayoutView;

});