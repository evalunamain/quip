define(['marionette'], function(Marionette) {

    var UserWordBasicView = Marionette.ItemView.extend({

        template: '#userwordbasic',
        initialize: function(){
        	console.log("Hi");
        	console.log(this.model);
        },


    });

    return UserWordBasicView;

});