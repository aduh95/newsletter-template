(window.webpackJsonp=window.webpackJsonp||[]).push([[5,7],{10:function(t,e,n){"use strict";n.r(e),n.d(e,"default",function(){return j});var r=n(0),o=n(22),i=n(21);function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,r)}return n}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(n,!0).forEach(function(e){s(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}function u(t){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function s(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function f(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function l(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function p(t,e,n){return e&&l(t.prototype,e),n&&l(t,n),t}function y(t,e){return!e||"object"!==u(e)&&"function"!=typeof e?b(t):e}function b(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function h(t){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function d(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&v(t,e)}function v(t,e){return(v=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var O=function(t){function e(){return f(this,e),y(this,h(e).apply(this,arguments))}return d(e,r["a"]),p(e,[{key:"render",value:function(){return Object(r.h)("iframe",s({src:this.props.src,frameborder:"0",width:"300",height:"175",loading:"lazy",allow:"autoplay; fullscreen; picture-in-picture",allowfullscreen:!0},"loading","lazy"))}}]),e}(),w=function(t){function e(){return f(this,e),y(this,h(e).apply(this,arguments))}return d(e,r["a"]),p(e,[{key:"render",value:function(){return Object(r.h)("img",{alt:this.props.alt,src:this.props.src,loading:"lazy"})}}]),e}(),m=function(t){function e(){return f(this,e),y(this,h(e).apply(this,arguments))}return d(e,r["a"]),p(e,[{key:"render",value:function(){return this.props.src?this.props.isVideo?Object(r.h)(w,this.props):Object(r.h)(O,this.props):null}}]),e}(),j=function(t){function e(){var t,n;f(this,e);for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return s(b(n=y(this,(t=h(e)).call.apply(t,[this].concat(o)))),"state",{writeMode:!1,data:JSON.stringify(n.props)}),n}return d(e,r["a"]),p(e,[{key:"update",value:function(t){this.setState({writeMode:!1,data:JSON.stringify(t)}),Object.assign(this.props,t)}},{key:"render",value:function(){var t,e=this;return Object(r.h)("article",{className:this.props.isMain?"main":void 0,"data-type":"NewsletterArticle","data-json":this.state.data,onClick:function(t){var n,r;t.preventDefault();for(var o=0;t.path[o]&&void 0===(null===(i=t.path[o].dataset)||void 0===i?void 0:i.key);){var i;o++}e.setState({writeMode:!0,focus:null===(n=t.path[o])||void 0===n?void 0:null===(r=n.dataset)||void 0===r?void 0:r.key})}},Object(r.h)("h4",{"data-key":"title"},this.props.title),Object(r.h)(m,{isVideo:this.props.isVideo,src:this.props.illustration,alt:this.props.illustrationDescription}),Object(r.h)(o.a,{content:this.props.description,attributes:s({},"data-key","description")}),Object(r.h)("p",null,(t=this.props.links,t?Array.isArray(t)?t:[t]:[]).map(function(t,e){return Object(r.h)(r.b,null,Object(r.h)("a",{"data-key":"label[".concat(e,"]"),href:(n=t.href,n),target:"_blank",rel:"noopener"},t.label),".",Object(r.h)("br",null));var n})),Object(r.h)(i.default,{componentName:"NewsletterArticle",active:this.state.writeMode,props:c({},this.props,{focus:this.state.focus,saveState:this.update.bind(this),resetState:function(){return e.setState({writeMode:!1})}})}))}}]),e}()},12:function(t,e,n){"use strict";n.r(e),n.d(e,"default",function(){return f});var r=n(0),o=n(10);function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function c(t,e){return!e||"object"!==i(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function s(t,e){return(s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var f=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),c(this,u(e).apply(this,arguments))}var n,i,f;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}(e,r["a"]),n=e,(i=[{key:"render",value:function(){var t,e,n,i=this.props.content||[];return Object(r.h)("section",{className:"newsletter","data-type":"NewsletterSection",style:(t={},e="--nb-of-articles",n=i.length,e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t),id:this.props.id},Object(r.h)("output",{hidden:!0,"data-key":"id"},this.props.id),Object(r.h)("h2",{className:"newsletter","data-key":"title"},this.props.title),i.map(function(t){return Object(r.h)(o.default,t)}))}}])&&a(n.prototype,i),f&&a(n,f),e}()},21:function(t,e,n){"use strict";n.r(e),n.d(e,"default",function(){return f});var r=n(0),o=n(1);function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function c(t,e){return!e||"object"!==i(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function s(t,e){return(s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var f=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),c(this,u(e).apply(this,arguments))}var i,f,l;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}(e,r["a"]),i=e,(f=[{key:"render",value:function(){var t=this,e=this.props.active?Object(o.b)(function(){return n(25)("./".concat(t.props.componentName,".js"))}):r.b;return Object(r.h)(o.a,{fallback:Object(r.h)("dialog",{open:!0,"data-ignore":!0},"Loading...")},Object(r.h)(e,this.props.props))}}])&&a(i.prototype,f),l&&a(i,l),e}()},22:function(t,e,n){"use strict";n.d(e,"a",function(){return p});var r=n(0),o=n(23);function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(){return(a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function c(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function s(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function f(t,e){return(f=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var l=new(n.n(o).a),p=function(t){function e(){var t,n,r,o,a,c,f;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);for(var l=arguments.length,p=new Array(l),y=0;y<l;y++)p[y]=arguments[y];return r=this,n=!(o=(t=u(e)).call.apply(t,[this].concat(p)))||"object"!==i(o)&&"function"!=typeof o?s(r):o,a=s(n),f={loading:!0},(c="state")in a?Object.defineProperty(a,c,{value:f,enumerable:!0,configurable:!0,writable:!0}):a[c]=f,n}var n,o,p;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&f(t,e)}(e,r["a"]),n=e,p=[{key:"translate",value:function(t){var n,r=new Promise(function(t){return n=t}),o=function(t,e,n){if(t!==e)throw new TypeError("Private static access of wrong provenance");return n.value}(this,e,y).then(function(){return new Promise(function(e,n){l.onmessage=function(t){var n=t.data;e(n)},l.onmessageerror=n,l.onerror=n,l.postMessage(t)})}).finally(n);return function(t,e,n,r){if(t!==e)throw new TypeError("Private static access of wrong provenance");if(!n.writable)throw new TypeError("attempted to set read only private field");n.value=r}(this,e,y,r),o}}],(o=[{key:"componentDidMount",value:function(){this.translate()}},{key:"componentDidUpdate",value:function(t){t.content!==this.props.content&&this.translate()}},{key:"translate",value:function(){var t=this;this.constructor.translate(this.props.content).then(function(e){t.setState({loading:!1,html:e})}).catch(function(e){console.error(e),t.setState({loading:!1,html:"<div data-ignore class='error'>Error when rendering markdown content</div>"})})}},{key:"render",value:function(){return this.state.loading?Object(r.h)("p",{"data-ignore":!0},"Loading..."):Object(r.h)("output",a({"data-contents":!0,dangerouslySetInnerHTML:{__html:this.state.html}},this.props.attributes))}}])&&c(n.prototype,o),p&&c(n,p),e}(),y={writable:!0,value:Promise.resolve()}},23:function(t,e,n){t.exports=function(){return new Worker(n.p+"25e8b5bb6f306b1d55e5.worker.js")}},25:function(t,e,n){var r={"./AsideList.js":[26,9],"./Footer.js":[27,2],"./NewsletterArticle.js":[28,3],"./OrderedList.js":[24,15],"./lazy-edit-compomponent.js":[21]};function o(t){if(!n.o(r,t))return Promise.resolve().then(function(){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e});var e=r[t],o=e[0];return Promise.all(e.slice(1).map(n.e)).then(function(){return n(o)})}o.keys=function(){return Object.keys(r)},o.id=25,t.exports=o}}]);