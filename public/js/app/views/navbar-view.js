define(['marionette'], function(Marionette) {

    var NavbarView = Marionette.ItemView.extend({
    	
    	className: 'navbar-fixed',

        template: '#navbar',

        events: {
            'click a': function(event) {
                event.preventDefault();
            }
        },

    });

    return NavbarView;

});