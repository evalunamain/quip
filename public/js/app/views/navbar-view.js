define(['marionette', 'jquery', 'model/user'], function(Marionette, $, User) {

    var NavbarView = Marionette.ItemView.extend({
    	
    	className: 'navbar-fixed',

        initialize: function() {
            this.authChannel = app.Radio.channel('auth');
            var self = this;
            this.authChannel.on('signIn', self.test);
        },

        hideForm: function (e) {
            $('.nav-items').hide();
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

            var user = new User();
            user.signIn(params);
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
                app.navigate('word/'+word);
                // var apiEndpoint = 'http://localhost:3000/api/word/' + word;
          
                // $.ajax({
                //     url: apiEndpoint,
                //     type: 'GET',
                //     dataType:'json',
                //     })
                // .done(function(data, textStatus, jqXHR) {
                //       var wordModel = new Word(data);
                //       var resultView = new WordExpandedView({model: wordModel});
                //       app.content(resultView);  
                // }).fail(function(data) {
                //       console.log(data);                  
                // });
            }
        }

    });

    return NavbarView;

});