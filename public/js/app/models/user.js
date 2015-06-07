/**
 * Created by 40in on 16.10.14.
 */
define(['app', 'backbone'], function(app, Backbone) {

    var User = Backbone.Model.extend({

    	defaults: {
    		name: 'Eva Luna Main'
    	},

        url: '/api/user/'

    });

    return User;

});