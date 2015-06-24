define(['jquery','marionette','dropdown'], function($,Marionette) {

    var SearchResultView = Marionette.ItemView.extend({

    	className: 'row',

      template: '#searchresult',

      onRender: function() {
      	console.log($.dropdown);
      	$('.card-action-link').dropdown();
      }


    });

    return SearchResultView;

});