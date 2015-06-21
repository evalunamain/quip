define(['marionette'], function(Marionette) {

    var ErrorView = Marionette.ItemView.extend({

    	className: 'row',

        template: '#error',


    });

    return ErrorView;

});