/**
 * almond 0.2.6 Copyright (c) 2011-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */

var requirejs,require,define;!function(e){function n(e,n){return x.call(e,n)}function r(e,n){var r,i,t,o,f,u,c,l,s,p,a=n&&n.split("/"),d=h.map,g=d&&d["*"]||{};if(e&&"."===e.charAt(0))if(n){for(a=a.slice(0,a.length-1),e=a.concat(e.split("/")),l=0;l<e.length;l+=1)if(p=e[l],"."===p)e.splice(l,1),l-=1;else if(".."===p){if(1===l&&(".."===e[2]||".."===e[0]))break;l>0&&(e.splice(l-1,2),l-=2)}e=e.join("/")}else 0===e.indexOf("./")&&(e=e.substring(2));if((a||g)&&d){for(r=e.split("/"),l=r.length;l>0;l-=1){if(i=r.slice(0,l).join("/"),a)for(s=a.length;s>0;s-=1)if(t=d[a.slice(0,s).join("/")],t&&(t=t[i])){o=t,f=l;break}if(o)break;!u&&g&&g[i]&&(u=g[i],c=l)}!o&&u&&(o=u,f=c),o&&(r.splice(0,f,o),e=r.join("/"))}return e}function i(n,r){return function(){return s.apply(e,y.call(arguments,0).concat([n,r]))}}function t(e){return function(n){return r(n,e)}}function o(e){return function(n){d[e]=n}}function f(r){if(n(g,r)){var i=g[r];delete g[r],m[r]=!0,l.apply(e,i)}if(!n(d,r)&&!n(m,r))throw new Error("No "+r);return d[r]}function u(e){var n,r=e?e.indexOf("!"):-1;return r>-1&&(n=e.substring(0,r),e=e.substring(r+1,e.length)),[n,e]}function c(e){return function(){return h&&h.config&&h.config[e]||{}}}var l,s,p,a,d={},g={},h={},m={},x=Object.prototype.hasOwnProperty,y=[].slice;p=function(e,n){var i,o=u(e),c=o[0];return e=o[1],c&&(c=r(c,n),i=f(c)),c?e=i&&i.normalize?i.normalize(e,t(n)):r(e,n):(e=r(e,n),o=u(e),c=o[0],e=o[1],c&&(i=f(c))),{f:c?c+"!"+e:e,n:e,pr:c,p:i}},a={require:function(e){return i(e)},exports:function(e){var n=d[e];return"undefined"!=typeof n?n:d[e]={}},module:function(e){return{id:e,uri:"",exports:d[e],config:c(e)}}},l=function(r,t,u,c){var l,s,h,x,y,j,q=[];if(c=c||r,"function"==typeof u){for(t=!t.length&&u.length?["require","exports","module"]:t,y=0;y<t.length;y+=1)if(x=p(t[y],c),s=x.f,"require"===s)q[y]=a.require(r);else if("exports"===s)q[y]=a.exports(r),j=!0;else if("module"===s)l=q[y]=a.module(r);else if(n(d,s)||n(g,s)||n(m,s))q[y]=f(s);else{if(!x.p)throw new Error(r+" missing "+s);x.p.load(x.n,i(c,!0),o(s),{}),q[y]=d[s]}h=u.apply(d[r],q),r&&(l&&l.exports!==e&&l.exports!==d[r]?d[r]=l.exports:h===e&&j||(d[r]=h))}else r&&(d[r]=u)},requirejs=require=s=function(n,r,i,t,o){return"string"==typeof n?a[n]?a[n](r):f(p(n,r).f):(n.splice||(h=n,r.splice?(n=r,r=i,i=null):n=e),r=r||function(){},"function"==typeof i&&(i=t,t=o),t?l(e,n,r,i):setTimeout(function(){l(e,n,r,i)},4),s)},s.config=function(e){return h=e,h.deps&&s(h.deps,h.callback),s},requirejs._defined=d,define=function(e,r,i){r.splice||(i=r,r=[]),n(d,e)||n(g,e)||(g[e]=[e,r,i])},define.amd={jQuery:!0}}();