define(['underscore', 'backbone', 'view/error-view'], function (_, Backbone, ErrorView) {
	var utils = {
			// loggedIn : function(options) {
			// 	$.ajax({
   //          url: '/api/loggedin',
   //          type: 'get'
			//   }).done(function(data) {
			//   	console.log()
			//       if(!options.passUser) { 
			//       	return true;
			//       } else {
			//       	if (options && typeof options.callback == "function") {
			//       		options.callback(data);
			//       	}
			//       	else {
			//       		return data;
			//       	}
			//       } 
			//   }).fail(function(data) {
			//   	debugger
			//   	return false;
			//   });
		  
		 //  	return loggedIn;

		 //  }

		 makeErrView: function(erMsg) {
		 		return new ErrorView({model: new Backbone.Model({message: erMsg})})
		 }

		 
	}
	return utils
});