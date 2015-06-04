this["JST"] = this["JST"] || {};

this["JST"]["#menu"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<ul class="menu">\n    ';
 _.each(structure, function(item) { ;
__p += '\n        <li style="display: inline-block;">\n            <a href="' +
((__t = ( item.href )) == null ? '' : __t) +
'">' +
((__t = ( item.name )) == null ? '' : __t) +
'</a>\n        </li>\n    ';
 }); ;
__p += '\n</ul>';

}
return __p
};

this["JST"]["#text"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<ul>\n    ' +
((__t = ( text )) == null ? '' : __t) +
'\n</ul>';

}
return __p
};