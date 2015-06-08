define(['marionette'], function(Marionette) {

    var UserWordView = Marionette.ItemView.extend({

    	className: 'row',

        template: '#userword',


    });

    return UserWordView;

});