define(['marionette'], function(Marionette) {

    var UserWordExpandedView = Marionette.ItemView.extend({

    	className: 'wordrow',

        template: '#userwordexpanded',


    });

    return UserWordExpandedView;

});