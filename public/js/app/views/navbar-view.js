define(['marionette', 'jquery'], function(Marionette, $) {

    var NavbarView = Marionette.ItemView.extend({
    	
    	className: 'navbar-fixed',

        template: '#navbar',

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
                debugger
            }).fail(function(err, jqXHR) {
                debugger
            })
        }

    });

    return NavbarView;

});