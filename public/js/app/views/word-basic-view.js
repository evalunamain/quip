define(['marionette'], function(Marionette) {

    var WordBasicView = Marionette.ItemView.extend({
    	
        template: '#userwordbasic',

        initialize: function () {
        	console.log(this.model);
        	this.listenToOnce(this.model, 'sync', this.render);
        },

    });

    return WordBasicView;

});