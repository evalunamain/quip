/**
 * Created by 40in on 16.10.14.
 */
define(['marionette', 'view/words-list-word-view'], function(Marionette, WordsListWordView) {

    var WordsListView = Marionette.CollectionView.extend({

    	className: 'collapsible popout',

    	tagName: 'ul',	

        childView: WordsListWordView

    });

    return WordsListView;

});