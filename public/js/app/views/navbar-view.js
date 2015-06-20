define(['marionette', 'jquery', 'model/user'], function(Marionette, $, User) {

    var NavbarView = Marionette.ItemView.extend({
    	
    	className: 'navbar-fixed',

        test: function (e) {
            console.log('signed in', e);
        },

        template: '#navbar',

        events: {
            'click a': function(event) {
                event.preventDefault();
            },
            "submit .log-in-form": "logInUser",
            "submit .search-field": "searchWord"
        },

        onRender: function () {
            this.$search = this.$('#search');
        },

        logInUser: function (e) {
            e.preventDefault();
            var params = {
                email: $('#email').val(),
                password: $('#password').val()
            }


            app.currentUser.signIn(params);
            // debugger
            // $.ajax({
            //     url: '/api/login',
            //     type: 'post',
            //     dataType: 'json',
            //     data: params
            // }).done(function(data) {
            //     var user = new User(data.user);
            //     console.log(user);
            // }).fail(function(err, jqXHR) {
            //     debugger
            // })
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

                var endpoint = '/api/word/' + word;
                $.ajax({
                    url: endpoint,
                    type: 'GET',
                    dataType: 'json',
                    data: params
                }).done(function(data) {

                }).fail(function(err, jqXHR) {
                    debugger
                });
            }
        }

    });

    return NavbarView;

});