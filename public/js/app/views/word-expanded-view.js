define(['marionette'], function(Marionette) {

    var WordExpandedView = Marionette.ItemView.extend({

    	className: 'expanded-container',

        template: '#userwordexpanded',


    });

    return WordExpandedView;

});