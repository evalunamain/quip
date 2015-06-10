define('app', ['marionette', 'backbone', 'jquery', 'model/word', 'collection/user-words', 'view/navbar-view'], function(Marionette, Backbone, $, Word, UserWords, NavbarView) {

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

        app.userWords = ['cat','blue','true','hedgehog','polar bear','motorcycle'];

        require(['module/home'], function() {
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