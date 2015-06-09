define(['marionette', 'view/user-word-basic-view', 'view/user-word-expanded-view', 'jquery-ui'], function(Marionette, UserWordBasicView, UserWordExpandedView) {

    var UserWordLayoutView = Marionette.LayoutView.extend({

    	className: 'wordrow',

        tagName: 'li',

        template: '#userwordlayout',

        initialize: function() {
            this.viewModel = new Backbone.Model({
                defaults: {
                    expanded: false
                }
            })
        },

        regions: {
        	'wordListed' : '.wordListed'
        },

        events: {
            "click .wordListed": 'expandToggle'
        },

        onRender: function() {
        	var wordBasicView = new UserWordBasicView({model: this.model});
        	this.getRegion('wordListed').show(wordBasicView);
        },

        expandToggle: function() {
            var expanded = this.viewModel.get('expanded');
            expanded ? this.toggleExpandedView() : this.loadExpandedView();
        },

        loadExpandedView: function() {
            this.$el.append($('<div class="word-expanded collapsible-body col s12">'));
            this.addRegion("wordExpanded", ".word-expanded");
            this.wordExpandedView = new UserWordExpandedView({ model: this.model});
            this.getRegion('wordExpanded').show(this.wordExpandedView);
            this.viewModel.set('expanded', true);
            this.toggleExpandedView();
            
        },

        closeExpandedView: function() {
            this.wordExpandedView && this.wordExpandedView.remove();
            this.$('.word-expanded').remove();
            this.viewModel.set('expanded', false);
        },

        toggleExpandedView: function() {
            //From materialiize.js
            var header = this.$('.collapsible-header'),
                self = this;
            header.toggleClass('active');

            if (header.hasClass('active')) {
                header.parent().addClass('active');
            }
            else {
                header.parent().removeClass('active');
            }
            if (header.parent().hasClass('active')){
              header.siblings('.collapsible-body').stop(true,false).slideDown({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '')}});
            }
            else{
              header.siblings('.collapsible-body').stop(true,false).slideUp({ duration: 350, easing: "easeOutQuart", queue: false, 
                complete: function() {
                    $(this).css('height', '');
                    self.closeExpandedView();
                }
            });
            }
        }



    });

    return UserWordLayoutView;

});