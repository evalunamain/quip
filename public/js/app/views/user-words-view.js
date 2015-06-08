/**
 * Created by 40in on 16.10.14.
 */
define(['marionette', 'view/user-word-view'], function(Marionette, UserWordView) {

    var UserWordsView = Marionette.CollectionView.extend({

    	className: '',

        childView: UserWordView

    });

    return UserWordsView;

});