/**
 * Created by 40in on 16.10.14.
 */
define(['marionette', 'view/words-list-word-view'], function(Marionette, WordsListWordView) {

    var WordsListView = Marionette.CompositeView.extend({

    	className: 'wordlist-container row',

    	template: '#wordlistview',

      childView: WordsListWordView,

      childViewContainer: 'ul',

      templateHelpers: function() {
    		return { listName: this.collection.listName};
  		}

    });

    return WordsListView;

});