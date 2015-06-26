define(['marionette', 'jquery', 'velocity', 'model/user', 'collection/wordlist-collection'], function(Marionette, $, Velocity, User, WordList) {

    var NavbarView = Marionette.ItemView.extend({
    	
    	tagName: 'nav',

        initialize: function() {
            this.authChannel = app.Radio.channel('auth');
            this.wordsChannel = app.Radio.channel('words');
            this.uiChannel = app.Radio.channel('ui');

            this.authChannel.on('logIn', this.render);
            this.authChannel.on('logOut', this.render);

            this.wordsChannel.on('listSaved', this.listSaved);
            this.wordsChannel.on('removeList', this.removeFromMenu);

            //this.uiChannel.on('listSavedComplete', this.render);
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
            "submit .search-field": "searchWord",
            "click .list-delete": "deleteList"
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

        listSaved: function() {
            var self = this;
            var $icon = $('.nav-menu-new-list').prev();
            var $menublock = $('.nav-menu-new-list').parent().parent();
            var newHeight = $menublock.innerHeight() + 56 + "px";
            $icon.velocity({
                    'translateX' :'-48px'
                }, 
                {
                    easing: 'easeInOut',
                    duration: 500,
                    complete: function() {
                        $icon.html('grade');
                        var $newLi = $('<li><i class="material-icons">library_add</i><input class="nav-menu-new-list" placeholder="Create new list"></input></li>');
                        $newLi.hide();
                        $menublock.append($newLi);
                        
                        $icon.velocity({
                            'translateX': '0px'
                        },
                        { 
                            easing: 'easeInOut',
                            duration: 500,
                            complete: function() {
                                app.Radio.channel("ui").trigger("listSavedComplete");
                            }
                        });

                        $newLi.velocity("fadeIn", {duration:500});
                    }
            });

            $menublock.velocity({
                'height' : newHeight
            },
            {
                duration: 350,
                easing: 'easeInOut',
                queue: false
            });
        },

        newList: function(e) {
            if (e.keyCode != 13) return;
            var $target = $(e.currentTarget);
            $target.blur();
            var listName = $target.val();
            var listHref =  app.normalizeForSearch(listName).replace(/\s+/g, '-');
            var wordList = new WordList();
            wordList.listName = listName;
            wordList.listHref = listHref;
            wordList.newList();
        },

        deleteList: function (e) {
            var listHref = $(e.currentTarget).data('delete'),
                list = app.currentUser.wordLists[listHref];
            list && list.deleteList();
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
        },

        removeFromMenu: function (list) {
            var list = $ ('[data-listHref="'+list+'"]');
            list.remove();
        }
    });

    return NavbarView;

});