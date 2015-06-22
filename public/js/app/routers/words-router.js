define(['marionette', 'controller/words-controller'], function(Marionette, WordsController) {

    var WordsRouter = Marionette.AppRouter.extend({

        controller: WordsController,

        appRoutes: {
            'lists/:list(/)': 'showList',
            'lists(/)' : 'showList',
            'word/:word(/)': 'lookup'
        }
    
    });

    return WordsRouter;
});