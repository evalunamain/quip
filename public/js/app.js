define('app', ['marionette', 'backbone', 'jquery', 'model/word', 'model/user', 'collection/words-list', 'view/navbar-view'], function(Marionette, Backbone, $, Word, User, WordsList, NavbarView) {

    // Redefine Marionette.Renderer.render for production using.
    if (window.JST) {

        Marionette.Renderer.render = function(templateId, data){
            if (!window.JST[templateId]) {
                throw new Marionette.Error({
                    name: 'NoTemplateError',
                    message: 'Could not find template: "' + templateId + '"'
                });
            }
            return window.JST[templateId](data);
        };
    }

    var app = new Marionette.Application({

        regions: {
            Header: '#header',
            Content: '#content',
            Footer: '#footer'
        },

        navigate: function(route) {
            Backbone.history.navigate(route, {
                trigger: true
            });
        },

        content: function(view) {
            this.Content.show(view);
        }
    });

    app.on('before:start', function () {

        $.ajax({
            url: '/api/loggedin',
            type: 'get'
        }).done(function (data, a, b) {
            app.currentUser = new User(data);
            console.log('user session found', app.currentUser);
        }).fail(function (data, a, b) {
            if (app.currentUser) {
                delete app.currentUser;
            }
        })
    });

    app.on('start', function() {
        if (!Backbone.history) return;
        app.Radio = Marionette.Radio;
        
        require(['router/home-router', 'router/words-router'], function(HomeRouter, WordsRouter) {
            var HomeRouter = new HomeRouter();
            var WordsRouter = new WordsRouter();
            app.Header.show(new NavbarView());
            Backbone.history.start({pushState: true});
        });
       
     
        

    });

    $(document).click(function(event) {
        if (event.target.nodeName !== 'A') return;

        var href = event.target.attributes.item('href') ? event.target.attributes.item('href').value : false;
        if (!href || href === '#' || href.indexOf('http') === 0) return;

        event.preventDefault();
        app.navigate(href);
    });

    window.app = app;
    return app;
});

