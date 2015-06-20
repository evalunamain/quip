define(['marionette', 'jquery'], function(Marionette, $) {

    var NavbarView = Marionette.ItemView.extend({
    	
    	className: 'navbar-fixed',

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
            $.ajax({
                url: '/api/login',
                type: 'POST',
                dataType: 'json',
                data: params
            }).done(function(data) {
                debugger
            }).fail(function(err, jqXHR) {
                debugger
            });
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