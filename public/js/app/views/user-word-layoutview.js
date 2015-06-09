define(['marionette', 'view/user-word-basic-view', 'view/user-word-expanded-view'], function(Marionette, UserWordBasicView, UserWordExpandedView) {

    var UserWordLayoutView = Marionette.LayoutView.extend({

    	className: 'wordrow',

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
            expanded ? this.wordCollapse() : this.wordExpand();
        },

        wordExpand: function() {
            this.$el.append($('<div class="word-expanded col s12">'));
            this.addRegion("wordExpanded", ".word-expanded");
            this.wordExpandedView = new UserWordExpandedView({ model: this.model});
            this.getRegion('wordExpanded').show(this.wordExpandedView);
            this.viewModel.set('expanded', true);
            
        },

        wordCollapse: function() {
            this.wordExpandedView && this.wordExpandedView.remove();
            $('.word-expanded').remove();
            this.viewModel.set('expanded', false);
        },



    });

    return UserWordLayoutView;

});