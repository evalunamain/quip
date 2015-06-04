/**
 * Created by 40in on 14.10.14.
 */
define(['app', 'marionette'], function(app, Marionette) {

    var structure = [{
        name: 'Home',
        href: 'home'
    }, {
        name: 'Users',
        href: 'users'
    }];

    var MenuView = Marionette.ItemView.extend({

        template: '#menu',

        events: {
            'click a': function(event) {
                event.preventDefault();
            }
        },

        serializeData: function() {
            return {
                structure: structure
            }
        }

    });

    return new MenuView();

});