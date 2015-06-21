define(['backbone'], function(Backbone) {

    var User = Backbone.Model.extend({
	    signIn: function(options){
		    var model = this;

		    var credentials = {
		      "email": options.email,
		      "password": options.password
		    };

		    $.ajax({
          url: '/api/login',
          type: 'post',
          dataType: 'json',
          data: credentials
        }).done(function(data){
	        model.set(data.user);
	      	var userChannel = app.Radio.channel('auth');
	      	userChannel.trigger('signIn');
	      	// Backbone.history.navigate('home', {trigger:true});
        }).fail(function(err, jqXHR) {
           debugger
        })
		  },

		  // signOut: function(options){
		  //   var model = this;

		  //   $.ajax({
		  //     url: ,
		  //     type: "DELETE",
		  //     dataType: "json",
		  //     success: function(data){
		  //       model.clear();
		  //       options.success && options.success();
		  //     }
		  //   });
		  // }
	 
    });

    return User;

});