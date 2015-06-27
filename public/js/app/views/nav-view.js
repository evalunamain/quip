define(['marionette', 'jquery', 'velocity', 'toastr', 'model/user', 'view/navbar-view', 'view/side-nav-menu-view', 'collection/wordlist-collection'], function(Marionette, $, Velocity, toastr, User, NavbarView, SideNavMenuView, WordList) {

    var NavbarView = Marionette.LayoutView.extend({
    	
    	regions: {
            'navbar': '#navbar',
            'side-nav-menu' : '#side-nav-menu'
        },

        onShow: function() {
            this.getRegion('navbar').show(new NavbarView);
            this.getRegion('side-nav-menu').show(new SideNavMenuView);
        },

        initialize: function() {
            this.authChannel = app.Radio.channel('auth');
            this.wordsChannel = app.Radio.channel('words');
            this.uiChannel = app.Radio.channel('ui');

            this.authChannel.on('logIn', this.render);
            this.authChannel.on('logOut', this.render);

            this.wordsChannel.on('listSaved', this.listSaved);
            this.wordsChannel.on('removeList', this.removeFromMenu);

            toastr["success"]("Test.");

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
            "click .list-delete": "confirmDeleteList",
            "click .js-delete-ok": "deleteList",
            "click .js-delete-cancel": "cancelDeleteList"
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

        confirmDeleteList: function (e) {
            var $listDiv = $(e.currentTarget).parent();
            var $li = $listDiv.parent();
            var $confirmDeleteDiv = $listDiv.next('.confirm-delete-div');
        
            $listDiv.velocity({opacity:0}, {
                duration: 300,
                complete: function() {
                    $confirmDeleteDiv.velocity({opacity: 1}, {duration:300});
                }
            });
        },

        deleteList: function(e) {
            var listHref = $(e.currentTarget).data('delete'),
                list = app.currentUser.wordLists[listHref];
            list && list.deleteList();
        },

        cancelDeleteList: function (e) {
            var $deleteDiv = $(e.currentTarget).parent(),
                $listDiv = $deleteDiv.prev();

            $deleteDiv.velocity({opacity:0}, {
                duration: 300,
                complete: function() {
                    $listDiv.velocity({opacity: 1}, {duration:300});
                }
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
                app.navigate('word/'+word);
            }
        },

        toggleMenu: function(e) {
            this.$sidenav.toggleClass('side-nav-open');
            app.$content.toggleClass('side-nav-open');
        },

        removeFromMenu: function (list) {
            var $list = $ ('[data-listHref="'+list+'"]');
            $list.velocity('fadeOut', {
                duration: 500,
                complete: function() {
                    $list.remove();
                }
            })
        }
                
    });

    return NavbarView;

});