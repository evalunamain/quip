/**
 * Created by 40in on 16.10.14.
 */
define(['marionette', 'view/user-word-layoutview'], function(Marionette, UserWordLayoutView) {

    var UserWordsView = Marionette.CollectionView.extend({

    	className: 'card',

        childView: UserWordLayoutView

    });

    return UserWordsView;

});