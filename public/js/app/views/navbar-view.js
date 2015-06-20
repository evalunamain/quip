define(['marionette', 'jquery', 'model/user'], function(Marionette, $, User) {

    var NavbarView = Marionette.ItemView.extend({
    	
    	className: 'navbar-fixed',

        template: '#navbar',

        initialize: function () {
            var user = new User();
            console.log(user);
        },

        events: {
            'click a': function(event) {
                event.preventDefault();
            },
            "submit .log-in-form": "logInUser"
        },

        logInUser: function (e) {
            e.preventDefault();
            var params = {
                email: $('#email').val(),
                password: $('#password').val()
            }
            $.ajax({
                url: '/api/login',
                type: 'post',
                dataType: 'json',
                data: params
            }).done(function(data) {
                var user = new User(data.user);
                console.log(user);
            }).fail(function(err, jqXHR) {
                debugger
            })
        }

    });

    return NavbarView;

});