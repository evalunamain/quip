define(['marionette'], function(Marionette) {

    var UserWordView = Marionette.ItemView.extend({

    	className: 'small-4 columns',

        template: '#userword',


    });

    return UserWordView;

});