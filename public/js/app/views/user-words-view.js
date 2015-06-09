/**
 * Created by 40in on 16.10.14.
 */
define(['marionette', 'view/user-word-layoutview'], function(Marionette, UserWordLayoutView) {

    var UserWordsView = Marionette.CollectionView.extend({

    	className: 'collapsible popout',

    	tagName: 'ul',	

        childView: UserWordLayoutView

    });

    return UserWordsView;

});