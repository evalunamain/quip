
define(['marionette', 'controller/home-controller'], function(Marionette, HomeController) {

    var HomeRouter = Marionette.AppRouter.extend({

        controller: HomeController,

        appRoutes: {
            'home(/)': 'homeAction',
             '': 'homeAction'
        }

    });

    return HomeRouter;

});