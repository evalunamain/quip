define(['marionette', 'jquery', 'velocity', 'toastr', 'model/user', 'collection/wordlist-collection'], function(Marionette, $, Velocity, toastr, User, WordList) {

    var NavbarView = Marionette.ItemView.extend({
    	
    //	className: 'navbar-fixed',
        template: '#nav-bar',

        initialize: function() {
            this.authChannel = app.Radio.channel('auth');
            this.wordsChannel = app.Radio.channel('words');
            this.uiChannel = app.Radio.channel('ui');

            this.authChannel.on('logIn', this.render);
            this.authChannel.on('logOut', this.render);

            toastr["success"]("Test.");

            //this.uiChannel.on('listSavedComplete', this.render);
        },

        hideForm: function (e) {
            $('.nav-items').hide();
        },

        events: {
            'click #js-logout': "logOut",
            'click .menu-button': "toggleMenu",
       //     'keyup .nav-menu-new-list': 'newList',
          //  "submit .log-in-form": "logIn",
            "submit .search-field": "searchWord",
            "click .list-delete": "confirmDeleteList",
        //    "click .js-delete-ok": "deleteList",
         //   "click .js-delete-cancel": "cancelDeleteList"
        },

        onRender: function () {
            this.$search = $('#search');
            this.$sidenav = $('.side-nav-menu');
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