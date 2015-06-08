define('app', ['marionette', 'backbone', 'jquery', 'model/word', 'collection/user-words'], function(Marionette, Backbone, $, Word, UserWords) {

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

        currentModule: '',

        


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

        startModule: function(module) {
            if (this.currentModule && this.currentModule === module) {
                return;
            }
            this.currentModule && this.currentModule.stop();

            this.currentModule = module;
            this.currentModule.start();
        },

        content: function(view) {
            this.Content.show(view);
        }
    });

    app.on('start', function() {
        if (!Backbone.history) return;

        var wordBlue = new Word({'word': 'blue', 'definition': 'It\'s the color blue, stupid.'});
        var wordRed = new Word({'word': 'red', 'definition': 'It\'s the color red, stupid.'});
        var wordGreen = new Word({'word': 'Green', 'definition': 'It\'s the color green, stupid.'});
        var wordYellow = new Word({'word': 'yellow', 'definition': 'It\'s the color yellow, stupid.'});
        var wordPurple = new Word({'word': 'purple', 'definition': 'It\'s the color purple, stupid.'});
        var wordPink = new Word({'word': 'pink', 'definition': 'It\'s the color pink, stupid.'});

        app.userWords = new UserWords([wordBlue,wordRed,wordGreen,wordYellow,wordPink,wordPurple]);

        require(['js/app/menu', 'module/users', 'module/home'], function(menu) {
            app.Header.show(menu);
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