define(['marionette'], function(Marionette) {

    var WordBasicView = Marionette.ItemView.extend({
    	
        template: '#userwordbasic',

        initialize: function () {
        	console.log(this.model);
        }

    });

    return WordBasicView;

});