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
		 },

		 normalizeForSearch: function (s) {

        function filter(c) {
            switch (c) {
            case 'æ':
            case 'ä':
                return 'ae';

            case 'å':
                return 'aa';

            case 'á':
            case 'à':
            case 'ã':
            case 'â':
                return 'a';

            case 'ç':
            case 'č':
                return 'c';

            case 'é':
            case 'ê':
            case 'è':
            case 'ë':
                return 'e';

            case 'î':
            case 'ï':
            case 'í':
                return 'i';

            case 'œ':
            case 'ö':
                return 'oe';

            case 'ó':
            case 'õ':
            case 'ô':
                return 'o';

            case 'ś':
            case 'š':
                return 's';

            case 'ü':
                return 'ue';

            case 'ù':
            case 'ú':
                return 'u';

            case 'ß':
                return 'ss';

            case 'ё':
                return 'е';

            default:
                return c;
            }
        }

        var normalized = '', i, l;
        s = s.toLowerCase();
        for (i = 0, l = s.length; i < l; i = i + 1) {
            normalized = normalized + filter(s.charAt(i));
        }
        return normalized;
    }

		 
	}
	return utils
});