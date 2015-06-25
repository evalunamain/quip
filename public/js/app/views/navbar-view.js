define(['marionette', 'jquery', 'model/user'], function(Marionette, $, User) {

    var NavbarView = Marionette.ItemView.extend({
    	
    	tagName: 'nav',

        initialize: function() {
            this.authChannel = app.Radio.channel('auth');
            this.authChannel.on('logIn', this.render);
            this.authChannel.on('logOut', this.render);
        },

        hideForm: function (e) {
            $('.nav-items').hide();
        },

        template: '#navbar',

        events: {
            'click #js-logout': "logOut",
            'click .menu-button': "toggleMenu",
            'keyup .nav-menu-new-list': 'newList',
            "submit .log-in-form": "logIn",
            "submit .search-field": "searchWord"
        },

        onRender: function () {
            this.$search = this.$('#search');
            this.$sidenav = this.$('.side-nav-menu');
           // this.$newListInput = this.$('.nav-menu-new-list');
        },

        logIn: function (e) {
            e.preventDefault();
            var params = {
                email: $('#email').val(),
                password: $('#password').val()
            }

            var user = new User();
            user.logIn(params);
        },

        logOut: function(e) {
            e.preventDefault();
            e.stopPropagation();
            app.currentUser.logOut();
        },

        newList: function(e) {
            if (e.keyCode != 13) return;
            var listName = $(e.currentTarget).val();
            // var listHref =  app.normalizeForSearch(listName).replace(/\s+/g, '-');
            // app.currentUser.wordLists[listHref] = new WordList();
            // app.currentUser.wordLists[listHref].listName = listName;

        },

        searchWord: function(e) {
            e.preventDefault();
            var word = this.$search.val(),
                pattern = /[a-zA-Z]/,
                self = this;

            if (!pattern.test(word)) {
                this.$search.addClass('invalid');
                
                setTimeout(function() {
                    self.$search.removeClass('invalid');
                }, 1000);

            } else {
                this.$search.removeClass('invalid');
                app.navigate('word/'+word);
            }
        },

        toggleMenu: function(e) {
            this.$sidenav.toggleClass('side-nav-open');
            app.$content.toggleClass('side-nav-open');
        }
    });

    return NavbarView;

});