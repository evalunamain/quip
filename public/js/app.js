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

        var wordTrue = new Word({'word': 'true', 
                                 'definitions': [{'definition': 'being in accordance with the actual state or conditions; conforming to reality or fact; not false:', 'example' : 'a true story.'},
                                                 {'definition': 'real; genuine; authentic:; conforming to reality or fact; not false:', 'example' : 'true gold; true feelings.'},
                                                 {'definition': 'sincere; not deceitful', 'example' : 'a true interest in someone\'s welfare.'},
                                                 {'definition': 'firm in allegiance; loyal; faithful; steadfast', 'example' : 'a true friend.'},
                                                 {'definition': 'being or reflecting the essential or genuine character of something', 'example': 'the true meaning of his statement.'}
                                                ],
                                'pronunciation': '[troo]',
                                'etymology': 'before 900; Middle English trewe (adj. and adv.), Old English trēowe (adj.) loyal, trusty, honest (see trow, truce ); akin to Dutch trouw, German treu, Old Norse tryggr, Gothic triggws'
                                });


        var wordBlue = new Word({'word': 'true', 
                                 'definitions': [{'definition': 'being in accordance with the actual state or conditions; conforming to reality or fact; not false:', 'example' : 'a true story.'},
                                                 {'definition': 'real; genuine; authentic:; conforming to reality or fact; not false:', 'example' : 'true gold; true feelings.'},
                                                 {'definition': 'sincere; not deceitful', 'example' : 'a true interest in someone\'s welfare.'},
                                                 {'definition': 'firm in allegiance; loyal; faithful; steadfast', 'example' : 'a true friend.'},
                                                 {'definition': 'being or reflecting the essential or genuine character of something', 'example': 'the true meaning of his statement.'}
                                                ],
                                'pronunciation': '[troo]',
                                'etymology': 'before 900; Middle English trewe (adj. and adv.), Old English trēowe (adj.) loyal, trusty, honest (see trow, truce ); akin to Dutch trouw, German treu, Old Norse tryggr, Gothic triggws'
                                });
        var wordRed = new Word({'word': 'true', 
                                 'definitions': [{'definition': 'being in accordance with the actual state or conditions; conforming to reality or fact; not false:', 'example' : 'a true story.'},
                                                 {'definition': 'real; genuine; authentic:; conforming to reality or fact; not false:', 'example' : 'true gold; true feelings.'},
                                                 {'definition': 'sincere; not deceitful', 'example' : 'a true interest in someone\'s welfare.'},
                                                 {'definition': 'firm in allegiance; loyal; faithful; steadfast', 'example' : 'a true friend.'},
                                                 {'definition': 'being or reflecting the essential or genuine character of something', 'example': 'the true meaning of his statement.'}
                                                ],
                                'pronunciation': '[troo]',
                                'etymology': 'before 900; Middle English trewe (adj. and adv.), Old English trēowe (adj.) loyal, trusty, honest (see trow, truce ); akin to Dutch trouw, German treu, Old Norse tryggr, Gothic triggws'
                                });

        var wordGreen = new Word({'word': 'true', 
                                 'definitions': [{'definition': 'being in accordance with the actual state or conditions; conforming to reality or fact; not false:', 'example' : 'a true story.'},
                                                 {'definition': 'real; genuine; authentic:; conforming to reality or fact; not false:', 'example' : 'true gold; true feelings.'},
                                                 {'definition': 'sincere; not deceitful', 'example' : 'a true interest in someone\'s welfare.'},
                                                 {'definition': 'firm in allegiance; loyal; faithful; steadfast', 'example' : 'a true friend.'},
                                                 {'definition': 'being or reflecting the essential or genuine character of something', 'example': 'the true meaning of his statement.'}
                                                ],
                                'pronunciation': '[troo]',
                                'etymology': 'before 900; Middle English trewe (adj. and adv.), Old English trēowe (adj.) loyal, trusty, honest (see trow, truce ); akin to Dutch trouw, German treu, Old Norse tryggr, Gothic triggws'
                                });
        var wordYellow = new Word({'word': 'true', 
                                 'definitions': [{'definition': 'being in accordance with the actual state or conditions; conforming to reality or fact; not false:', 'example' : 'a true story.'},
                                                 {'definition': 'real; genuine; authentic:; conforming to reality or fact; not false:', 'example' : 'true gold; true feelings.'},
                                                 {'definition': 'sincere; not deceitful', 'example' : 'a true interest in someone\'s welfare.'},
                                                 {'definition': 'firm in allegiance; loyal; faithful; steadfast', 'example' : 'a true friend.'},
                                                 {'definition': 'being or reflecting the essential or genuine character of something', 'example': 'the true meaning of his statement.'}
                                                ],
                                'pronunciation': '[troo]',
                                'etymology': 'before 900; Middle English trewe (adj. and adv.), Old English trēowe (adj.) loyal, trusty, honest (see trow, truce ); akin to Dutch trouw, German treu, Old Norse tryggr, Gothic triggws'
                                });        
        var wordPink = new Word({'word': 'true', 
                                 'definitions': [{'definition': 'being in accordance with the actual state or conditions; conforming to reality or fact; not false:', 'example' : 'a true story.'},
                                                 {'definition': 'real; genuine; authentic:; conforming to reality or fact; not false:', 'example' : 'true gold; true feelings.'},
                                                 {'definition': 'sincere; not deceitful', 'example' : 'a true interest in someone\'s welfare.'},
                                                 {'definition': 'firm in allegiance; loyal; faithful; steadfast', 'example' : 'a true friend.'},
                                                 {'definition': 'being or reflecting the essential or genuine character of something', 'example': 'the true meaning of his statement.'}
                                                ],
                                'pronunciation': '[troo]',
                                'etymology': 'before 900; Middle English trewe (adj. and adv.), Old English trēowe (adj.) loyal, trusty, honest (see trow, truce ); akin to Dutch trouw, German treu, Old Norse tryggr, Gothic triggws'
                                });
        var wordIndigo = new Word({'word': 'true', 
                                 'definitions': [{'definition': 'being in accordance with the actual state or conditions; conforming to reality or fact; not false:', 'example' : 'a true story.'},
                                                 {'definition': 'real; genuine; authentic:; conforming to reality or fact; not false:', 'example' : 'true gold; true feelings.'},
                                                 {'definition': 'sincere; not deceitful', 'example' : 'a true interest in someone\'s welfare.'},
                                                 {'definition': 'firm in allegiance; loyal; faithful; steadfast', 'example' : 'a true friend.'},
                                                 {'definition': 'being or reflecting the essential or genuine character of something', 'example': 'the true meaning of his statement.'}
                                                ],
                                'pronunciation': '[troo]',
                                'etymology': 'before 900; Middle English trewe (adj. and adv.), Old English trēowe (adj.) loyal, trusty, honest (see trow, truce ); akin to Dutch trouw, German treu, Old Norse tryggr, Gothic triggws'
                                });
        var wordMauve = new Word({'word': 'true', 
                                 'definitions': [{'definition': 'being in accordance with the actual state or conditions; conforming to reality or fact; not false:', 'example' : 'a true story.'},
                                                 {'definition': 'real; genuine; authentic:; conforming to reality or fact; not false:', 'example' : 'true gold; true feelings.'},
                                                 {'definition': 'sincere; not deceitful', 'example' : 'a true interest in someone\'s welfare.'},
                                                 {'definition': 'firm in allegiance; loyal; faithful; steadfast', 'example' : 'a true friend.'},
                                                 {'definition': 'being or reflecting the essential or genuine character of something', 'example': 'the true meaning of his statement.'}
                                                ],
                                'pronunciation': '[troo]',
                                'etymology': 'before 900; Middle English trewe (adj. and adv.), Old English trēowe (adj.) loyal, trusty, honest (see trow, truce ); akin to Dutch trouw, German treu, Old Norse tryggr, Gothic triggws'
                                });


        app.userWords = new UserWords([wordBlue,wordTrue,wordGreen,wordYellow,wordPink,wordIndigo,wordMauve]);

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