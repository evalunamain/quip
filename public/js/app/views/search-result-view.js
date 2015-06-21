define(['marionette'], function(Marionette) {

    var SearchResultView = Marionette.ItemView.extend({

    	className: 'row',

        template: '#searchresult',


    });

    return SearchResultView;

});