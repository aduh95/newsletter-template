(window.webpackJsonp=window.webpackJsonp||[]).push([[4,7],{20:function(t,e,r){"use strict";r.r(e),r.d(e,"default",function(){return j});var n=r(0),o=r(32),i=r(31);function a(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)}return r}function c(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?a(r,!0).forEach(function(e){s(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):a(r).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}function u(t){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function s(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function f(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function l(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function p(t,e,r){return e&&l(t.prototype,e),r&&l(t,r),t}function y(t,e){return!e||"object"!==u(e)&&"function"!=typeof e?b(t):e}function b(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function h(t){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function d(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&v(t,e)}function v(t,e){return(v=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var O=function(t){function e(){return f(this,e),y(this,h(e).apply(this,arguments))}return d(e,n["a"]),p(e,[{key:"render",value:function(){var t;return Object(n.h)("iframe",(s(t={src:this.props.src,frameborder:"0",width:"300",height:"175",loading:"lazy",allow:"autoplay; fullscreen; picture-in-picture",allowfullscreen:!0},"loading","lazy"),s(t,"data-key","src"),t))}}]),e}(),w=function(t){function e(){return f(this,e),y(this,h(e).apply(this,arguments))}return d(e,n["a"]),p(e,[{key:"render",value:function(){return Object(n.h)("img",{alt:this.props.alt,src:this.props.src,loading:"lazy","data-key":"src"})}}]),e}(),m=function(t){function e(){return f(this,e),y(this,h(e).apply(this,arguments))}return d(e,n["a"]),p(e,[{key:"render",value:function(){return this.props.src?this.props.isVideo?Object(n.h)(O,this.props):Object(n.h)(w,this.props):null}}]),e}(),j=function(t){function e(){var t,r;f(this,e);for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return s(b(r=y(this,(t=h(e)).call.apply(t,[this].concat(o)))),"state",{writeMode:!1,data:JSON.stringify(r.props)}),r}return d(e,n["a"]),p(e,[{key:"update",value:function(t){this.setState({writeMode:!1,data:JSON.stringify(t)})}},{key:"render",value:function(){var t,e=this;return Object(n.h)("article",{className:this.props.isMain?"main":void 0,"data-type":"NewsletterArticle","data-json":this.state.data,onClick:function(t){var r,n;t.preventDefault();for(var o=0;t.path[o]&&void 0===(null===(i=t.path[o].dataset)||void 0===i?void 0:i.key);){var i;o++}e.setState({writeMode:!0,focus:null===(r=t.path[o])||void 0===r?void 0:null===(n=r.dataset)||void 0===n?void 0:n.key})}},Object(n.h)("h4",{"data-key":"title"},this.props.title),Object(n.h)(m,{isVideo:this.props.isVideo,src:this.props.illustration,alt:this.props.illustrationDescription}),Object(n.h)(o.a,{content:this.props.description,attributes:s({},"data-key","description")}),Object(n.h)("p",null,(t=this.props.links,t?Array.isArray(t)?t:[t]:[]).map(function(t,e){return Object(n.h)(n.b,null,Object(n.h)("a",{"data-key":"label[".concat(e,"]"),href:(r=t.href,r),target:"_blank",rel:"noopener"},t.label),".",Object(n.h)("br",null));var r})),Object(n.h)(i.default,{componentName:"NewsletterArticle",active:this.state.writeMode,props:c({},this.props,{focus:this.state.focus,saveState:this.update.bind(this),resetState:function(){return e.setState({writeMode:!1})}})}))}}]),e}()},28:function(t,e,r){"use strict";r.r(e),r.d(e,"default",function(){return f});var n=r(0),o=r(20);function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function c(t,e){return!e||"object"!==i(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function s(t,e){return(s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var f=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),c(this,u(e).apply(this,arguments))}var r,i,f;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}(e,n["a"]),r=e,(i=[{key:"render",value:function(){var t=this.props.content||[];return Object(n.h)("section",{class:"newsletter hot-topics","data-type":"HotTopics"},Object(n.h)("h2",{"data-key":"title"},this.props.title),t.map(function(t){return Object(n.h)(o.default,t)}))}}])&&a(r.prototype,i),f&&a(r,f),e}()},31:function(t,e,r){"use strict";r.r(e),r.d(e,"default",function(){return f});var n=r(0),o=r(3);function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function c(t,e){return!e||"object"!==i(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function s(t,e){return(s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var f=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),c(this,u(e).apply(this,arguments))}var i,f,l;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}(e,n["a"]),i=e,(f=[{key:"render",value:function(){var t=this,e=this.props.active?Object(o.b)(function(){return r(35)("./".concat(t.props.componentName,".js"))}):n.b;return Object(n.h)(o.a,{fallback:Object(n.h)("dialog",{open:!0,"data-ignore":!0},"Loading...")},Object(n.h)(e,this.props.props))}}])&&a(i.prototype,f),l&&a(i,l),e}()},32:function(t,e,r){"use strict";r.d(e,"a",function(){return p});var n=r(0),o=r(33);function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(){return(a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t}).apply(this,arguments)}function c(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function s(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function f(t,e){return(f=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var l=new(r.n(o).a),p=function(t){function e(){var t,r,n,o,a,c,f;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);for(var l=arguments.length,p=new Array(l),y=0;y<l;y++)p[y]=arguments[y];return n=this,r=!(o=(t=u(e)).call.apply(t,[this].concat(p)))||"object"!==i(o)&&"function"!=typeof o?s(n):o,a=s(r),f={loading:!0},(c="state")in a?Object.defineProperty(a,c,{value:f,enumerable:!0,configurable:!0,writable:!0}):a[c]=f,r}var r,o,p;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&f(t,e)}(e,n["a"]),r=e,p=[{key:"translate",value:function(t){var r,n=new Promise(function(t){return r=t}),o=function(t,e,r){if(t!==e)throw new TypeError("Private static access of wrong provenance");return r.value}(this,e,y).then(function(){return new Promise(function(e,r){l.onmessage=function(t){var r=t.data;e(r)},l.onmessageerror=r,l.onerror=r,l.postMessage(t)})}).finally(r);return function(t,e,r,n){if(t!==e)throw new TypeError("Private static access of wrong provenance");if(!r.writable)throw new TypeError("attempted to set read only private field");r.value=n}(this,e,y,n),o}}],(o=[{key:"componentDidMount",value:function(){this.translate()}},{key:"componentDidUpdate",value:function(t){t.content!==this.props.content&&this.translate()}},{key:"translate",value:function(){var t=this;this.constructor.translate(this.props.content).then(function(e){t.setState({loading:!1,html:e})}).catch(function(e){console.error(e),t.setState({loading:!1,html:"<div data-ignore class='error'>Error when rendering markdown content</div>"})})}},{key:"render",value:function(){return this.state.loading?Object(n.h)("p",{"data-ignore":!0},"Loading..."):Object(n.h)("output",a({"data-contents":!0,dangerouslySetInnerHTML:{__html:this.state.html}},this.props.attributes))}}])&&c(r.prototype,o),p&&c(r,p),e}(),y={writable:!0,value:Promise.resolve()}},33:function(t,e,r){t.exports=function(){return new Worker(r.p+"25e8b5bb6f306b1d55e5.worker.js")}},35:function(t,e,r){var n={"./AsideList.js":[36,9],"./Footer.js":[37,2],"./NewsletterArticle.js":[38,3],"./OrderedList.js":[34,15],"./lazy-edit-compomponent.js":[31]};function o(t){if(!r.o(n,t))return Promise.resolve().then(function(){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e});var e=n[t],o=e[0];return Promise.all(e.slice(1).map(r.e)).then(function(){return r(o)})}o.keys=function(){return Object.keys(n)},o.id=35,t.exports=o}}]);