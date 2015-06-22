define(['marionette'], function(Marionette) {

    var WordBasicView = Marionette.ItemView.extend({
    	
        template: '#userwordbasic',

        initialize: function () {
        	this.listenTo(this.model, 'sync', this.render);
        },
    });

    return WordBasicView;

});