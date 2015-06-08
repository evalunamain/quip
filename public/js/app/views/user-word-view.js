define(['marionette'], function(Marionette) {

    var UserWordView = Marionette.ItemView.extend({

    	className: 'wordrow',

        template: '#userword',


    });

    return UserWordView;

});