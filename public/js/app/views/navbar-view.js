define(['marionette'], function(Marionette) {

    var NavbarView = Marionette.ItemView.extend({
    	
        template: '#navbar',

        events: {
            'click a': function(event) {
                event.preventDefault();
            }
        },

    });

    return NavbarView;

});