var __wpo = {"assets":{"main":["./5453111770a84d3ddef090639cdc067e.webmanifest","./f41fa8374fceb1b006fc.worker.js","./cb4cdbc0bec39800bfd9.worker.js","./0115055d88c997eecb0a.worker.js","./0.css","./0.bundle.js","./main.css","./bundle.js","./2.bundle.js","./3.bundle.js","./4.bundle.js","./5.bundle.js","./6.bundle.js","./7.bundle.js","./8.bundle.js","./9.bundle.js","./10.bundle.js","./11.bundle.js","./12.bundle.js","./13.css","./13.bundle.js","./14.bundle.js","./15.bundle.js","./16.bundle.js","./17.bundle.js","./18.bundle.js","./19.bundle.js","./20.bundle.js","./21.bundle.js","./22.bundle.js","./23.bundle.js","./24.bundle.js","./favicon.ico","./icon-256.png","./"],"additional":[],"optional":[]},"externals":[],"hashesMap":{"a6d7f34408455a7c31db095a39709bb8db9cffb4":"./5453111770a84d3ddef090639cdc067e.webmanifest","09e81897fef08b316328df8691e51c722786d914":"./f41fa8374fceb1b006fc.worker.js","52e4a66ef5960661e251f44c5a54183e33b59cc0":"./cb4cdbc0bec39800bfd9.worker.js","97285be00d3d0279eb12df2056bd4a5c9fe2a4bf":"./0115055d88c997eecb0a.worker.js","aa6c7a8eaf5fde4b29bc242c818b7981a1316759":"./0.css","f773681896b9be1f3005962e7a94f78d8dcf1179":"./0.bundle.js","90dd692a1c2541d59a342c18a115ee1213d8562e":"./main.css","7c3febc706d9803b7ef78ef91982eae2c7eefcaf":"./bundle.js","91359ee81bfe1a5c1181a5685bd40e96c2a8251c":"./2.bundle.js","2264a555e5c363bfa6ecd803fc99af28e1e5476b":"./3.bundle.js","3ee53e29c9581671781be5423770d553d144ec40":"./4.bundle.js","9cf646f0a8202950b311bf80836b0682d2bc0a3a":"./5.bundle.js","2e1bf38f172c5ba43013742145aded70a88e6fe4":"./6.bundle.js","456992bce0685043a8238f273a854d13a69c15cd":"./7.bundle.js","d5f5906bbf70ab71d2ac146cf2ee507d5c537a31":"./8.bundle.js","b046d9596739eca19194615a78d46b28f5cfd8f7":"./9.bundle.js","1989c7c4af5235248e60920328a6c55258e89117":"./10.bundle.js","a9fd69daa715fa248a86d597fc24ea933b34541b":"./11.bundle.js","a46b3a2290bba2c01e8ae9fb5ffc48e67208d3f9":"./12.bundle.js","5fbec0e369ea7674be7167c472eb1aaddb4fbe06":"./13.css","c72559ffcc66ce638ca787cbf6a8284fbbdf60b8":"./13.bundle.js","46d0a757827d72695e38f4ce1a1d83ff5d6821be":"./14.bundle.js","585a63db444f60ed56184f644c30cc1702a874c9":"./15.bundle.js","9d0b1ef29022a93b073de386bcdab402b64bb56c":"./16.bundle.js","44a49306104dadd30b1e451f22dd70af6c1cfb28":"./17.bundle.js","4d82538486dafcebb08c791584b776a99db930db":"./18.bundle.js","9a507fac471a5b727ac764ff189788b969443ff9":"./19.bundle.js","1cc466f04fa18cfbff19d8d7a614d9c14257defd":"./20.bundle.js","03709e5a18cf0c8a1c66234c05da1df817da2bb0":"./21.bundle.js","2010b856551ae5f57af14e238d19e8f65f79908d":"./22.bundle.js","6e6181cf2e583ff43d0f4e81fb67c1e67f09239e":"./23.bundle.js","56a46e6f649dc3adfa5f19195249fa5233dd3031":"./24.bundle.js","f627dded52c24bfc60afe271381d9c03b70af818":"./favicon.ico","1c90495bb1be1949e4b2f4fae5d4d8260c76e6d8":"./icon-256.png","0678a38e6d968ae3c5e9a1e22469ed0fd02f4622":"./"},"strategy":"changed","responseStrategy":"cache-first","version":"2019-8-26 22:45:33","name":"webpack-offline:newsletter-template-builder","pluginVersion":"5.0.7","relativePaths":true};

!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){"use strict";var r,o,i;if(r=ExtendableEvent.prototype.waitUntil,o=FetchEvent.prototype.respondWith,i=new WeakMap,ExtendableEvent.prototype.waitUntil=function(e){var n=this,t=i.get(n);if(!t)return t=[Promise.resolve(e)],i.set(n,t),r.call(n,Promise.resolve().then(function e(){var r=t.length;return Promise.all(t.map(function(e){return e.catch(function(){})})).then(function(){return t.length!=r?e():(i.delete(n),Promise.all(t))})}));t.push(Promise.resolve(e))},FetchEvent.prototype.respondWith=function(e){return this.waitUntil(e),o.call(this,e)},void 0===a)var a=!1;function c(e,n){return caches.match(e,{cacheName:n}).then(function(t){return u(t)?t:s(t).then(function(t){return caches.open(n).then(function(n){return n.put(e,t)}).then(function(){return t})})}).catch(function(){})}function u(e){return!e||!e.redirected||!e.ok||"opaqueredirect"===e.type}function s(e){return u(e)?Promise.resolve(e):("body"in e?Promise.resolve(e.body):e.blob()).then(function(n){return new Response(n,{headers:e.headers,status:e.status})})}function f(e,n){console.groupCollapsed("[SW]:",e),n.forEach(function(e){console.log("Asset:",e)}),console.groupEnd()}!function(e,n){var t=n.cacheMaps,r=n.navigationPreload,o=e.strategy,i=e.responseStrategy,u=e.assets,l=e.hashesMap,h=e.externals,d=e.prefetchRequest||{credentials:"same-origin",mode:"cors"},p=e.name,v=e.version,m=p+":"+v,g=p+"$preload",w="__offline_webpack__data";Object.keys(u).forEach(function(e){u[e]=u[e].map(function(e){var n=new URL(e,location);return n.hash="",-1===h.indexOf(e)&&(n.search=""),n.toString()})}),l=Object.keys(l).reduce(function(e,n){var t=new URL(l[n],location);return t.search="",t.hash="",e[n]=t.toString(),e},{}),h=h.map(function(e){var n=new URL(e,location);return n.hash="",n.toString()});var y=[].concat(u.main,u.additional,u.optional);function b(n){var t=u[n];return caches.open(m).then(function(r){return R(r,t,{bust:e.version,request:d,failAll:"main"===n})}).then(function(){f("Cached assets: "+n,t)}).catch(function(e){throw console.error(e),e})}function P(n){return caches.keys().then(function(e){for(var n=e.length,t=void 0;n--&&0!==(t=e[n]).indexOf(p););if(t){var r=void 0;return caches.open(t).then(function(e){return r=e,e.match(new URL(w,location).toString())}).then(function(e){if(e)return Promise.all([r,r.keys(),e.json()])})}}).then(function(t){if(!t)return b(n);var r=t[0],o=t[1],i=t[2],a=i.hashmap,c=i.version;if(!i.hashmap||c===e.version)return b(n);var s=Object.keys(a).map(function(e){return a[e]}),h=o.map(function(e){var n=new URL(e.url);return n.search="",n.hash="",n.toString()}),p=u[n],v=[],g=p.filter(function(e){return-1===h.indexOf(e)||-1===s.indexOf(e)});Object.keys(l).forEach(function(e){var n=l[e];if(-1!==p.indexOf(n)&&-1===g.indexOf(n)&&-1===v.indexOf(n)){var t=a[e];t&&-1!==h.indexOf(t)?v.push([t,n]):g.push(n)}}),f("Changed assets: "+n,g),f("Moved assets: "+n,v);var w=Promise.all(v.map(function(e){return r.match(e[0]).then(function(n){return[e[1],n]})}));return caches.open(m).then(function(t){var r=w.then(function(e){return Promise.all(e.map(function(e){return t.put(e[0],e[1])}))});return Promise.all([r,R(t,g,{bust:e.version,request:d,failAll:"main"===n,deleteFirst:"main"!==n})])})})}function O(){return caches.keys().then(function(e){var n=e.map(function(e){if(0===e.indexOf(p)&&0!==e.indexOf(m))return console.log("[SW]:","Delete cache:",e),caches.delete(e)});return Promise.all(n)})}function S(){return caches.open(m).then(function(n){var t=new Response(JSON.stringify({version:e.version,hashmap:l}));return n.put(new URL(w,location).toString(),t)})}self.addEventListener("install",function(e){console.log("[SW]:","Install event");var n=void 0;n="changed"===o?P("main"):b("main"),e.waitUntil(n)}),self.addEventListener("activate",function(e){console.log("[SW]:","Activate event");var n=function(){if(!u.additional.length)return Promise.resolve();a&&console.log("[SW]:","Caching additional");var e=void 0;e="changed"===o?P("additional"):b("additional");return e.catch(function(e){console.error("[SW]:","Cache section `additional` failed to load")})}();n=(n=(n=n.then(S)).then(O)).then(function(){if(self.clients&&self.clients.claim)return self.clients.claim()}),r&&self.registration.navigationPreload&&(n=Promise.all([n,self.registration.navigationPreload.enable()])),e.waitUntil(n)}),self.addEventListener("fetch",function(e){if("GET"===e.request.method&&("only-if-cached"!==e.request.cache||"same-origin"===e.request.mode)){var n=new URL(e.request.url);n.hash="";var o=n.toString();-1===h.indexOf(o)&&(n.search="",o=n.toString());var u=-1!==y.indexOf(o),s=o;if(!u){var f=function(e){var n=e.url,r=new URL(n),o=void 0;o=function(e){return"navigate"===e.mode||e.headers.get("Upgrade-Insecure-Requests")||-1!==(e.headers.get("Accept")||"").indexOf("text/html")}(e)?"navigate":r.origin===location.origin?"same-origin":"cross-origin";for(var i=0;i<t.length;i++){var a=t[i];if(a&&(!a.requestTypes||-1!==a.requestTypes.indexOf(o))){var c=void 0;if((c="function"==typeof a.match?a.match(r,e):n.replace(a.match,a.to))&&c!==n)return c}}}(e.request);f&&(s=f,u=!0)}if(u){var l=void 0;l="network-first"===i?function(e,n,t){return x(e).then(function(e){if(e.ok)return a&&console.log("[SW]:","URL ["+n+"] from network"),e;throw e}).catch(function(e){return a&&console.log("[SW]:","URL ["+n+"] from cache if possible"),c(t,m).then(function(n){if(n)return n;if(e instanceof Response)return e;throw e})})}(e,o,s):function(e,n,t){return function(e){if(r&&"function"==typeof r.map&&e.preloadResponse&&"navigate"===e.request.mode){var n=r.map(new URL(e.request.url),e.request);n&&function(e,n){var t=new URL(e,location),r=n.preloadResponse;U.set(r,{url:t,response:r});var o=function(){return U.has(r)},i=r.then(function(e){if(e&&o()){var n=e.clone();return caches.open(g).then(function(e){if(o())return e.put(t,n).then(function(){if(!o())return caches.open(g).then(function(e){return e.delete(t)})})})}});n.waitUntil(i)}(n,e)}}(e),c(t,m).then(function(r){return r?(a&&console.log("[SW]:","URL ["+t+"]("+n+") from cache"),r):fetch(e.request).then(function(r){return r.ok?(a&&console.log("[SW]:","URL ["+n+"] from network"),t===n&&(o=r.clone(),i=caches.open(m).then(function(e){return e.put(n,o)}).then(function(){console.log("[SW]:","Cache asset: "+n)}),e.waitUntil(i)),r):(a&&console.log("[SW]:","URL ["+n+"] wrong response: ["+r.status+"] "+r.type),r);var o,i})})}(e,o,s),e.respondWith(l)}else{if("navigate"===e.request.mode&&!0===r)return void e.respondWith(x(e));if(r){var d=function(e){var n=new URL(e.request.url);if(!(self.registration.navigationPreload&&r&&r.test&&r.test(n,e.request)))return;var t=function(e){if(!U)return;var n=void 0,t=void 0;if(U.forEach(function(r,o){r.url.href===e.href&&(n=r.response,t=o)}),n)return U.delete(t),n}(n),o=e.request;if(t)return e.waitUntil(caches.open(g).then(function(e){return e.delete(o)})),t;return c(o,g).then(function(n){return n&&e.waitUntil(caches.open(g).then(function(e){return e.delete(o)})),n||fetch(e.request)})}(e);if(d)return void e.respondWith(d)}}}}),self.addEventListener("message",function(e){var n=e.data;if(n)switch(n.action){case"skipWaiting":self.skipWaiting&&self.skipWaiting()}});var U=new Map;function R(e,n,t){n=n.slice();var r=t.bust,o=!1!==t.failAll,i=!0===t.deleteFirst,a=t.request||{credentials:"omit",mode:"cors"},c=Promise.resolve();return i&&(c=Promise.all(n.map(function(n){return e.delete(n).catch(function(){})}))),Promise.all(n.map(function(e){var n,t,o;return r&&(t=r,o=-1!==(n=e).indexOf("?"),e=n+(o?"&":"?")+"__uncache="+encodeURIComponent(t)),fetch(e,a).then(s).then(function(e){return e.ok?{response:e}:{error:!0}},function(){return{error:!0}})})).then(function(t){return o&&t.some(function(e){return e.error})?Promise.reject(new Error("Wrong response status")):(o||(t=t.filter(function(e,t){return!e.error||(n.splice(t,1),!1)})),c.then(function(){var r=t.map(function(t,r){var o=t.response;return e.put(n[r],o)});return Promise.all(r)}))})}function x(e){return e.preloadResponse&&!0===r?e.preloadResponse.then(function(n){return n||fetch(e.request)}):fetch(e.request)}}(__wpo,{loaders:{},cacheMaps:[],navigationPreload:!1}),e.exports=t(1)},function(e,n){}]);