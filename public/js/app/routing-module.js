/**
 * Created by 40in on 15.10.14.
 */
define(['app', 'marionette', 'backbone', 'jquery'], function(app, Marionette, Backbone, $) {

    var RoutingModule = Marionette.Module.extend({

        initialize: function() {

            if (!this.routesList) return;

            this.router = new Backbone.Router();


            for (var route in this.routesList) {
                if (!this.routesList.hasOwnProperty(route)) continue;
                var routeName = this.routesList[route];
                this.router.route(route, routeName, $.proxy(function() {
                    app.startModule(this);
                    $.isFunction(this[routeName]) && this[routeName].apply(this, arguments);

                }, this));
            }

        }

    });


    return RoutingModule;

});