!function(e){function t(t){for(var n,r,i=t[0],a=t[1],l=0,u=[];l<i.length;l++)r=i[l],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&u.push(o[r][0]),o[r]=0;for(n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n]);for(c&&c(t);u.length;)u.shift()()}var n={},r={2:0},o={2:0};function i(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.e=function(e){var t=[];r[e]?t.push(r[e]):0!==r[e]&&{0:1,10:1,12:1,13:1,17:1}[e]&&t.push(r[e]=new Promise(function(t,n){for(var o=e+".css",a=i.p+o,l=document.getElementsByTagName("link"),u=0;u<l.length;u++){var c=(f=l[u]).getAttribute("data-href")||f.getAttribute("href");if("stylesheet"===f.rel&&(c===o||c===a))return t()}var s=document.getElementsByTagName("style");for(u=0;u<s.length;u++){var f;if((c=(f=s[u]).getAttribute("data-href"))===o||c===a)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var o=t&&t.target&&t.target.src||a,i=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=o,delete r[e],p.parentNode.removeChild(p),n(i)},p.href=a,document.getElementsByTagName("head")[0].appendChild(p)}).then(function(){r[e]=0}));var n=o[e];if(0!==n)if(n)t.push(n[2]);else{var a=new Promise(function(t,r){n=o[e]=[t,r]});t.push(n[2]=a);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,i.nc&&u.setAttribute("nonce",i.nc),u.src=function(e){return i.p+""+e+".bundle.js"}(e);var c=new Error;l=function(t){u.onerror=u.onload=null,clearTimeout(s);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src;c.message="Loading chunk "+e+" failed.\n("+r+": "+i+")",c.name="ChunkLoadError",c.type=r,c.request=i,n[1](c)}o[e]=void 0}};var s=setTimeout(function(){l({type:"timeout",target:u})},12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(t)},i.m=e,i.c=n,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i.oe=function(e){throw console.error(e),e};var a=window.webpackJsonp=window.webpackJsonp||[],l=a.push.bind(a);a.push=t,a=a.slice();for(var u=0;u<a.length;u++)t(a[u]);var c=l;i(i.s=10)}([function(e,t,n){"use strict";n.d(t,"k",function(){return I}),n.d(t,"i",function(){return A}),n.d(t,"f",function(){return d}),n.d(t,"h",function(){return d}),n.d(t,"b",function(){return v}),n.d(t,"g",function(){return h}),n.d(t,"a",function(){return g}),n.d(t,"d",function(){return W}),n.d(t,"e",function(){return D}),n.d(t,"l",function(){return k}),n.d(t,"c",function(){return T}),n.d(t,"j",function(){return r});var r,o,i,a,l,u={},c=[],s=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;function f(e,t){for(var n in t)e[n]=t[n];return e}function p(e){var t=e.parentNode;t&&t.removeChild(e)}function d(e,t,n){var r,o,i,a,l=arguments;if(t=f({},t),arguments.length>3)for(n=[n],r=3;r<arguments.length;r++)n.push(l[r]);if(null!=n&&(t.children=n),null!=e&&null!=e.defaultProps)for(o in e.defaultProps)void 0===t[o]&&(t[o]=e.defaultProps[o]);return a=t.key,null!=(i=t.ref)&&delete t.ref,null!=a&&delete t.key,_(e,t,a,i)}function _(e,t,n,o){var i={type:e,props:t,key:n,ref:o,__k:null,__p:null,__b:0,__e:null,l:null,__c:null,constructor:void 0};return r.vnode&&r.vnode(i),i}function h(){return{}}function v(e){return e.children}function m(e){if(null==e||"boolean"==typeof e)return null;if("string"==typeof e||"number"==typeof e)return _(null,e,null,null);if(null!=e.__e||null!=e.__c){var t=_(e.type,e.props,e.key,null);return t.__e=e.__e,t}return e}function g(e,t){this.props=e,this.context=t}function b(e,t){if(null==t)return e.__p?b(e.__p,e.__p.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?b(e):null}function y(e){!e.__d&&(e.__d=!0)&&1===o.push(e)&&(r.debounceRendering||i)(w)}function w(){var e;for(o.sort(function(e,t){return t.__v.__b-e.__v.__b});e=o.pop();)e.__d&&e.forceUpdate(!1)}function S(e,t,n,r,o,i,a,l,s){var f,d,_,h,v,g,y,w,S=t.__k||k(t.props.children,t.__k=[],m,!0),j=n&&n.__k||c,O=j.length;for(l==u&&(l=null!=i?i[0]:O?b(n,0):null),d=0;d<S.length;d++)if(null!=(f=S[d]=m(S[d]))){if(f.__p=t,f.__b=t.__b+1,null===(h=j[d])||h&&f.key==h.key&&f.type===h.type)j[d]=void 0;else for(_=0;_<O;_++){if((h=j[_])&&f.key==h.key&&f.type===h.type){j[_]=void 0;break}h=null}if(v=N(e,f,h=h||u,r,o,i,a,null,l,s),(_=f.ref)&&h.ref!=_&&(w||(w=[])).push(_,f.__c||v,f),null!=v){if(null==y&&(y=v),null!=f.l)v=f.l,f.l=null;else if(i==h||v!=l||null==v.parentNode)e:if(null==l||l.parentNode!==e)e.appendChild(v);else{for(g=l,_=0;(g=g.nextSibling)&&_<O;_+=2)if(g==v)break e;e.insertBefore(v,l)}l=v.nextSibling,"function"==typeof t.type&&(t.l=v)}}if(t.__e=y,null!=i&&"function"!=typeof t.type)for(d=i.length;d--;)null!=i[d]&&p(i[d]);for(d=O;d--;)null!=j[d]&&T(j[d],j[d]);if(w)for(d=0;d<w.length;d++)P(w[d],w[++d],w[++d])}function k(e,t,n,r){if(null==t&&(t=[]),null==e||"boolean"==typeof e)r&&t.push(null);else if(Array.isArray(e))for(var o=0;o<e.length;o++)k(e[o],t,n,r);else t.push(n?n(e):e);return t}function j(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]="number"==typeof n&&!1===s.test(t)?n+"px":n}function O(e,t,n,r,o){var i,a,l,u,c;if("key"===(t=o?"className"===t?"class":t:"class"===t?"className":t)||"children"===t);else if("style"===t)if(i=e.style,"string"==typeof n)i.cssText=n;else{if("string"==typeof r&&(i.cssText="",r=null),r)for(a in r)n&&a in n||j(i,a,"");if(n)for(l in n)r&&n[l]===r[l]||j(i,l,n[l])}else if("o"===t[0]&&"n"===t[1])u=t!==(t=t.replace(/Capture$/,"")),c=t.toLowerCase(),t=(c in e?c:t).slice(2),n?(r||e.addEventListener(t,C,u),(e.u||(e.u={}))[t]=n):e.removeEventListener(t,C,u);else if("list"!==t&&"tagName"!==t&&!o&&t in e)if(e.length&&"value"==t)for(t=e.length;t--;)e.options[t].selected=e.options[t].value==n;else e[t]=null==n?"":n;else"function"!=typeof n&&"dangerouslySetInnerHTML"!==t&&(t!==(t=t.replace(/^xlink:?/,""))?null==n||!1===n?e.removeAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase()):e.setAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase(),n):null==n||!1===n?e.removeAttribute(t):e.setAttribute(t,n))}function C(e){return this.u[e.type](r.event?r.event(e):e)}function N(e,t,n,o,i,a,l,u,c,s){var p,d,_,h,b,y,w,j,O,C,N=t.type;if(void 0!==t.constructor)return null;(p=r.__b)&&p(t);try{e:if("function"==typeof N){if(j=t.props,O=(p=N.contextType)&&o[p.__c],C=p?O?O.props.value:p.__p:o,n.__c?w=(d=t.__c=n.__c).__p=d.__E:(N.prototype&&N.prototype.render?t.__c=d=new N(j,C):(t.__c=d=new g(j,C),d.constructor=N,d.render=U),O&&O.sub(d),d.props=j,d.state||(d.state={}),d.context=C,d.__n=o,_=d.__d=!0,d.__h=[]),null==d.__s&&(d.__s=d.state),null!=N.getDerivedStateFromProps&&f(d.__s==d.state?d.__s=f({},d.__s):d.__s,N.getDerivedStateFromProps(j,d.__s)),_)null==N.getDerivedStateFromProps&&null!=d.componentWillMount&&d.componentWillMount(),null!=d.componentDidMount&&l.push(d);else{if(null==N.getDerivedStateFromProps&&null==u&&null!=d.componentWillReceiveProps&&d.componentWillReceiveProps(j,C),!u&&null!=d.shouldComponentUpdate&&!1===d.shouldComponentUpdate(j,d.__s,C)){d.props=j,d.state=d.__s,d.__d=!1,d.__v=t,t.__e=n.__e,t.__k=n.__k;break e}null!=d.componentWillUpdate&&d.componentWillUpdate(j,d.__s,C)}for(h=d.props,b=d.state,d.context=C,d.props=j,d.state=d.__s,(p=r.__r)&&p(t),d.__d=!1,d.__v=t,d.__P=e,k(null!=(p=d.render(d.props,d.state,d.context))&&p.type==v&&null==p.key?p.props.children:p,t.__k=[],m,!0),null!=d.getChildContext&&(o=f(f({},o),d.getChildContext())),_||null==d.getSnapshotBeforeUpdate||(y=d.getSnapshotBeforeUpdate(h,b)),S(e,t,n,o,i,a,l,c,s),d.base=t.__e;p=d.__h.pop();)p.call(d);_||null==h||null==d.componentDidUpdate||d.componentDidUpdate(h,b,y),w&&(d.__E=d.__p=null)}else t.__e=x(n.__e,t,n,o,i,a,l,s);(p=r.diffed)&&p(t)}catch(e){r.__e(e,t,n)}return t.__e}function E(e,t){for(var n;n=e.pop();)try{n.componentDidMount()}catch(e){r.__e(e,n.__v)}r.__c&&r.__c(t)}function x(e,t,n,r,o,i,a,l){var s,f,p,d,_=n.props,h=t.props;if(o="svg"===t.type||o,null==e&&null!=i)for(s=0;s<i.length;s++)if(null!=(f=i[s])&&(null===t.type?3===f.nodeType:f.localName===t.type)){e=f,i[s]=null;break}if(null==e){if(null===t.type)return document.createTextNode(h);e=o?document.createElementNS("http://www.w3.org/2000/svg",t.type):document.createElement(t.type),i=null}return null===t.type?_!==h&&(e.data=h):t!==n&&(null!=i&&(i=c.slice.call(e.childNodes)),p=(_=n.props||u).dangerouslySetInnerHTML,d=h.dangerouslySetInnerHTML,l||(d||p)&&(d&&p&&d.__html==p.__html||(e.innerHTML=d&&d.__html||"")),function(e,t,n,r,o){var i;for(i in n)i in t||O(e,i,null,n[i],r);for(i in t)o&&"function"!=typeof t[i]||"value"===i||"checked"===i||n[i]===t[i]||O(e,i,t[i],n[i],r)}(e,h,_,o,l),d||S(e,t,n,r,"foreignObject"!==t.type&&o,i,a,u,l),l||("value"in h&&void 0!==h.value&&h.value!==e.value&&(e.value=null==h.value?"":h.value),"checked"in h&&void 0!==h.checked&&h.checked!==e.checked&&(e.checked=h.checked))),e}function P(e,t,n){try{"function"==typeof e?e(t):e.current=t}catch(e){r.__e(e,n)}}function T(e,t,n){var o,i,a;if(r.unmount&&r.unmount(e),(o=e.ref)&&P(o,null,t),n||"function"==typeof e.type||(n=null!=(i=e.__e)),e.__e=e.l=null,null!=(o=e.__c)){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(e){r.__e(e,t)}o.base=o.__P=null}if(o=e.__k)for(a=0;a<o.length;a++)o[a]&&T(o[a],t,n);null!=i&&p(i)}function U(e,t,n){return this.constructor(e,n)}function I(e,t,n){var o,i,l;r.__p&&r.__p(e,t),i=(o=n===a)?null:n&&n.__k||t.__k,e=d(v,null,[e]),l=[],N(t,o?t.__k=e:(n||t).__k=e,i||u,u,void 0!==t.ownerSVGElement,n&&!o?[n]:i?null:c.slice.call(t.childNodes),l,!1,n||u,o),E(l,e)}function A(e,t){I(e,t,a)}function W(e,t){return t=f(f({},e.props),t),arguments.length>2&&(t.children=c.slice.call(arguments,2)),_(e.type,t,t.key||e.key,t.ref||e.ref)}function D(e){var t={},n={__c:"__cC"+l++,__p:e,Consumer:function(e,t){return e.children(t)},Provider:function(e){var r,o=this;return this.getChildContext||(r=[],this.getChildContext=function(){return t[n.__c]=o,t},this.shouldComponentUpdate=function(e){r.some(function(t){t.__P&&(t.context=e.value,y(t))})},this.sub=function(e){r.push(e);var t=e.componentWillUnmount;e.componentWillUnmount=function(){r.splice(r.indexOf(e),1),t&&t.call(e)}}),e.children}};return n.Consumer.contextType=n,n}r={},g.prototype.setState=function(e,t){var n=this.__s!==this.state&&this.__s||(this.__s=f({},this.state));("function"!=typeof e||(e=e(n,this.props)))&&f(n,e),null!=e&&this.__v&&(t&&this.__h.push(t),y(this))},g.prototype.forceUpdate=function(e){var t,n,r,o=this.__v,i=this.__v.__e,a=this.__P;a&&(t=!1!==e,n=[],r=N(a,o,f({},o),this.__n,void 0!==a.ownerSVGElement,null,n,t,null==i?b(o):i),E(n,o),r!=i&&function e(t){var n,r;if(null!=(t=t.__p)&&null!=t.__c){for(t.__e=t.__c.base=null,n=0;n<t.__k.length;n++)if(null!=(r=t.__k[n])&&null!=r.__e){t.__e=t.__c.base=r.__e;break}return e(t)}}(o)),e&&e()},g.prototype.render=v,o=[],i="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,r.__e=function(e,t,n){for(var r;t=t.__p;)if((r=t.__c)&&!r.__p)try{if(r.constructor&&null!=r.constructor.getDerivedStateFromError)r.setState(r.constructor.getDerivedStateFromError(e));else{if(null==r.componentDidCatch)continue;r.componentDidCatch(e)}return y(r.__E=r)}catch(t){e=t}throw e},a=u,l=0},function(e,t,n){"use strict";var r,o,i,a,l,u,c,s,f,p;function d(e,t,n){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return n}function _(e,t,n){var r=t.get(e);if(!r)throw new TypeError("attempted to set private field on non-instance");if(r.set)r.set.call(e,n);else{if(!r.writable)throw new TypeError("attempted to set read only private field");r.value=n}return n}function h(e,t){var n=t.get(e);if(!n)throw new TypeError("attempted to get private field on non-instance");return n.get?n.get.call(e):n.value}t.a=new(r=class{constructor(){c.add(this),u.add(this),l.add(this),o.set(this,{writable:!0,value:0}),i.set(this,{writable:!0,value:new Set}),a.set(this,{writable:!0,value:!1})}subscribe(e){h(this,i).add(e)}unsubscribe(e){h(this,i).delete(e)}rewindToPreviousState(){const e=Number(sessionStorage.getItem("current"))-1;return _(this,o,1+ +h(this,o)),d(this,l,s).call(this,e)}forwardToNextState(){const e=Number(sessionStorage.getItem("current"))+1;return _(this,o,+h(this,o)-1),d(this,l,s).call(this,e)}get hasPreviousState(){return Number(sessionStorage.getItem("oldest"))<Number(sessionStorage.getItem("current"))}get hasNextState(){return h(this,o)>0}set currentState(e){try{const t=JSON.stringify(e);d(this,c,p).call(this,t),h(this,a)?_(this,a,!1):d(this,u,f).call(this,t)}catch{}finally{h(this,i).forEach(t=>t(e))}}get currentState(){return JSON.parse(sessionStorage.getItem("state"+sessionStorage.getItem("current")))}get hasRecoverableState(){return null!==localStorage.getItem("content")}get lastSavedStateDate(){return this.hasRecoverableState?new Date(Number(localStorage.getItem("lastSaveDate"))):null}recoverSaveState(){const e=localStorage.getItem("content");try{sessionStorage.setItem("oldest",0),sessionStorage.setItem("current",0),sessionStorage.setItem("state0",e)}catch{}finally{h(this,i).forEach(t=>t(JSON.parse(e)))}}clearCurrentSession(){sessionStorage.clear(),h(this,i).forEach(e=>e({}))}clearRecoverState(){localStorage.removeItem("content"),h(this,i).forEach(e=>e({}))}},o=new WeakMap,i=new WeakMap,a=new WeakMap,l=new WeakSet,u=new WeakSet,c=new WeakSet,s=function(e){const t={};try{const n=sessionStorage.getItem("state"+e);Object.assign(t,JSON.parse(n)),d(this,c,p).call(this,n),_(this,a,!0),sessionStorage.setItem("current",e)}catch{}finally{h(this,i).forEach(e=>e(t))}return t},f=function(e){const t=sessionStorage.getItem("current"),n=null===t?0:Number(t)+1;null===t&&(sessionStorage.setItem("oldest",0),sessionStorage.setItem("current",0)),_(this,o,0);try{sessionStorage.setItem("state"+n,e)}catch{const t=Number(sessionStorage.getItem("oldest"));sessionStorage.removeItem("state"+t),sessionStorage.setItem("oldest",t+1),sessionStorage.setItem("state"+n,e)}sessionStorage.setItem("current",n)},p=function(e){localStorage.setItem("content",e),localStorage.setItem("lastSaveDate",Date.now())},r)},function(e,t,n){"use strict";var r={};n.r(r),n.d(r,"useState",function(){return p}),n.d(r,"useReducer",function(){return d}),n.d(r,"useEffect",function(){return _}),n.d(r,"useLayoutEffect",function(){return h}),n.d(r,"useRef",function(){return v}),n.d(r,"useImperativeHandle",function(){return m}),n.d(r,"useMemo",function(){return g}),n.d(r,"useCallback",function(){return b}),n.d(r,"useContext",function(){return y}),n.d(r,"useDebugValue",function(){return w});var o,i,a=n(0),l=[],u=a.j.__r;a.j.__r=function(e){u&&u(e),o=0,(i=e.__c).__H&&(i.__H.t=j(i.__H.t))};var c=a.j.diffed;a.j.diffed=function(e){c&&c(e);var t=e.__c;if(t){var n=t.__H;n&&(n.u=j(n.u))}};var s=a.j.unmount;function f(e){a.j.__h&&a.j.__h(i);var t=i.__H||(i.__H={i:[],t:[],u:[]});return e>=t.i.length&&t.i.push({}),t.i[e]}function p(e){return d(E,e)}function d(e,t,n){var r=f(o++);return r.__c||(r.__c=i,r.o=[n?n(t):E(null,t),function(t){var n=e(r.o[0],t);r.o[0]!==n&&(r.o[0]=n,r.__c.setState({}))}]),r.o}function _(e,t){var n=f(o++);N(n.v,t)&&(n.o=e,n.v=t,i.__H.t.push(n),S(i))}function h(e,t){var n=f(o++);N(n.v,t)&&(n.o=e,n.v=t,i.__H.u.push(n))}function v(e){return g(function(){return{current:e}},[])}function m(e,t,n){var r=f(o++);N(r.v,n)&&(r.v=n,e&&(e.current=t()))}function g(e,t){var n=f(o++);return N(n.v,t)?(n.v=t,n.m=e,n.o=e()):n.o}function b(e,t){return g(function(){return e},t)}function y(e){var t=i.context[e.__c];if(!t)return e.__p;var n=f(o++);return null==n.o&&(n.o=!0,t.sub(i)),t.props.value}function w(e,t){a.j.useDebugValue&&a.j.useDebugValue(t?t(e):e)}a.j.unmount=function(e){s&&s(e);var t=e.__c;if(t){var n=t.__H;n&&n.i.forEach(function(e){return e.p&&e.p()})}};var S=function(){};function k(){l.some(function(e){e.l=!1,e.__P&&(e.__H.t=j(e.__H.t))}),l=[]}function j(e){return e.forEach(O),e.forEach(C),[]}function O(e){e.p&&e.p()}function C(e){var t=e.o();"function"==typeof t&&(e.p=t)}function N(e,t){return!e||t.some(function(t,n){return t!==e[n]})}function E(e,t){return"function"==typeof t?t(e):t}function x(e,t){for(var n in t)e[n]=t[n];return e}function P(e){var t=e.parentNode;t&&t.removeChild(e)}"undefined"!=typeof window&&(S=function(e){!e.l&&(e.l=!0)&&1===l.push(e)&&(a.j.requestAnimationFrame||function(e){var t=function(){clearTimeout(n),cancelAnimationFrame(r),setTimeout(e)},n=setTimeout(t,100),r=requestAnimationFrame(t)})(k)}),n.d(t,"a",function(){return U}),n.d(t,"b",function(){return I});var T=a.j.__e;function U(){this.t=[]}function I(e){var t,n,r;function o(o){if(t||(t=e()).then(function(e){n=e.default},function(e){r=e}),r)throw r;if(!n)throw t;return Object(a.f)(n,o)}return o.displayName="Lazy",o.o=!0,o}a.j.__e=function(e,t,n){if(e.then&&n)for(var r,o=t;o=o.__p;)if((r=o.__c)&&r.i)return n&&(t.__e=n.__e,t.__k=n.__k),void r.i(e);T(e,t,n)},(U.prototype=new a.a).i=function(e){var t=this;t.t.push(e);var n=function(){t.t[t.t.indexOf(e)]=t.t[t.t.length-1],t.t.pop(),0==t.t.length&&(Object(a.c)(t.props.fallback),t.__v.__e=null,t.__v.__k=t.state.u,t.setState({u:null}))};null==t.state.u&&(t.setState({u:t.__v.__k}),function e(t){for(var n=0;n<t.length;n++){var r=t[n];null!=r&&("function"!=typeof r.type&&r.__e?P(r.__e):r.__k&&e(r.__k))}}(t.__v.__k),t.__v.__k=[]),e.then(n,n)},U.prototype.render=function(e,t){return t.u?e.fallback:e.children};var A="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,W=/^(?:accent|alignment|arabic|baseline|cap|clip|color|fill|flood|font|glyph|horiz|marker|overline|paint|stop|strikethrough|stroke|text|underline|unicode|units|v|vector|vert|word|writing|x)[A-Z]/,D=a.j.event;function L(e,t,n){for(;t.firstChild;)P(t.firstChild);return Object(a.k)(e,t),"function"==typeof n&&n(),e?e.__c:null}a.j.event=function(e){return D&&(e=D(e)),e.persist=function(){},e.nativeEvent=e};var M=function(){};function R(e){var t=this,n=e.container,r=Object(a.h)(M,{context:t.context},e.vnode);return t.l&&t.l!==n&&(t.s.parentNode&&t.l.removeChild(t.s),Object(a.c)(t.v),t.p=!1),e.vnode?t.p?(n.__k=t.__k,Object(a.k)(r,n),t.__k=n.__k):(t.s=document.createTextNode(""),Object(a.i)("",n),n.insertBefore(t.s,n.firstChild),t.p=!0,t.l=n,Object(a.k)(r,n,t.s),t.__k=this.s.__k):t.p&&(t.s.parentNode&&t.l.removeChild(t.s),Object(a.c)(t.v)),t.v=r,t.componentWillUnmount=function(){t.s.parentNode&&t.l.removeChild(t.s),Object(a.c)(t.v)},null}M.prototype.getChildContext=function(){return this.props.context},M.prototype.render=function(e){return e.children};var H=function(e,t){return e?Object(a.l)(e).map(t):null},F={map:H,forEach:H,count:function(e){return e?Object(a.l)(e).length:0},only:function(e){if(1!==(e=Object(a.l)(e)).length)throw new Error("Children.only() expects only one child.");return e[0]},toArray:a.l};function V(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];var n=a.h.apply(void 0,e),r=n.type,o=n.props;return"function"!=typeof r&&(o.defaultValue&&(o.value||0===o.value||(o.value=o.defaultValue),delete o.defaultValue),Array.isArray(o.value)&&o.multiple&&"select"===r&&(Object(a.l)(o.children).forEach(function(e){-1!=o.value.indexOf(e.props.value)&&(e.props.selected=!0)}),delete o.value),function(e,t){var n,r,o;for(o in t)if(n=W.test(o))break;if(n)for(o in r=e.props={},t)r[W.test(o)?o.replace(/([A-Z0-9])/,"-$1").toLowerCase():o]=t[o]}(n,o)),n.preactCompatNormalized=!1,B(n)}function B(e){return e.preactCompatNormalized=!0,function(e){var t=e.props;(t.class||t.className)&&(z.enumerable="className"in t,t.className&&(t.class=t.className),Object.defineProperty(t,"className",z))}(e),e}function $(e){return!!e&&e.$$typeof===A}var z={configurable:!0,get:function(){return this.class}};function J(e,t){for(var n in e)if(!(n in t))return!0;for(var r in t)if(e[r]!==t[r])return!0;return!1}var q=function(e){function t(t){e.call(this,t),this.isPureReactComponent=!0}return e&&(t.__proto__=e),(t.prototype=Object.create(e&&e.prototype)).constructor=t,t.prototype.shouldComponentUpdate=function(e,t){return J(this.props,e)||J(this.state,t)},t}(a.a);function G(e,t){Object.defineProperty(e.prototype,"UNSAFE_"+t,{configurable:!0,get:function(){return this[t]},set:function(e){this[t]=e}})}a.a.prototype.isReactComponent={},G(a.a,"componentWillMount"),G(a.a,"componentWillReceiveProps"),G(a.a,"componentWillUpdate");var Z=a.j.vnode;a.j.vnode=function(e){e.$$typeof=A,function(t){var n=e.type,r=e.props;if(r&&"string"==typeof n){var o={};for(var i in r)/^on(Ani|Tra)/.test(i)&&(r[i.toLowerCase()]=r[i],delete r[i]),o[i.toLowerCase()]=i;if(o.ondoubleclick&&(r.ondblclick=r[o.ondoubleclick],delete r[o.ondoubleclick]),o.onbeforeinput&&(r.onbeforeinput=r[o.onbeforeinput],delete r[o.onbeforeinput]),o.onchange&&("textarea"===n||"input"===n.toLowerCase()&&!/^fil|che|ra/i.test(r.type))){var a=o.oninput||"oninput";r[a]||(r[a]=r[o.onchange],delete r[o.onchange])}}}();var t=e.type;t&&t.o&&e.ref&&(e.props.ref=e.ref,e.ref=null),Z&&Z(e)};x({version:"16.8.0",Children:F,render:L,hydrate:L,unmountComponentAtNode:function(e){return!!e.__k&&(Object(a.k)(null,e),!0)},createPortal:function(e,t){return Object(a.h)(R,{vnode:e,container:t})},createElement:V,createContext:a.e,createFactory:function(e){return V.bind(null,e)},cloneElement:function(e){return $(e)?B(a.d.apply(null,arguments)):e},createRef:a.g,Fragment:a.b,isValidElement:$,findDOMNode:function(e){return e&&(e.base||1===e.nodeType&&e)||null},Component:a.a,PureComponent:q,memo:function(e,t){function n(e){var n=this.props.ref,r=n==e.ref;return r||(n.call?n(null):n.current=null),(t?!t(this.props,e):J(this.props,e))||!r}function r(t){return this.shouldComponentUpdate=n,Object(a.h)(e,x({},t))}return r.displayName="Memo("+(e.displayName||e.name)+")",r.o=!0,r},forwardRef:function(e){function t(t){var n=t.ref;return delete t.ref,e(t,n)}return t.o=!0,t.displayName="ForwardRef("+(e.displayName||e.name)+")",t},unstable_batchedUpdates:function(e,t){return e(t)},Suspense:U,lazy:I},r)},function(e,t){var n;function r(){return"serviceWorker"in navigator&&("https:"===window.location.protocol||"localhost"===window.location.hostname||0===window.location.hostname.indexOf("127."))}t.install=function(e){if(e||(e={}),r()){var t=navigator.serviceWorker.register("sw.js",{}),o=function(e){var t,n,r,o=e.installing||e.waiting;o&&!o.onstatechange&&(e.active?(a(),r=a):(l(),r=l),t=!0,e.waiting&&(n=!0),o.onstatechange=r);function a(){switch(o.state){case"redundant":i("onUpdateFailed"),o.onstatechange=null;break;case"installing":t||i("onUpdating");break;case"installed":n||i("onUpdateReady");break;case"activated":i("onUpdated"),o.onstatechange=null}}function l(){switch(o.state){case"redundant":o.onstatechange=null;break;case"installing":case"installed":break;case"activated":i("onInstalled"),o.onstatechange=null}}},i=function(t){"function"==typeof e[t]&&e[t]({source:"ServiceWorker"})};t.then(function(e){e&&(o(e),e.onupdatefound=function(){o(e)})}).catch(function(e){return i("onError"),Promise.reject(e)})}else if(window.applicationCache){var a=function(){var t=document.createElement("iframe");window.addEventListener("message",function(n){if(n.source===t.contentWindow){var r=(n.data+"").match(/__offline-plugin_AppCacheEvent:(\w+)/);if(r){var o=r[1];"function"==typeof e[o]&&e[o]({source:"AppCache"})}}}),t.src="appcache/manifest.html",t.style.display="none",n=t,document.body.appendChild(t)};"complete"===document.readyState?setTimeout(a):window.addEventListener("load",a)}else;},t.applyUpdate=function(e,t){if(r())navigator.serviceWorker.getRegistration().then(function(n){n&&n.waiting?(n.waiting.postMessage({action:"skipWaiting"}),e&&e()):t&&t()});else if(n)try{n.contentWindow.__applyUpdate(),e&&setTimeout(e)}catch(e){t&&setTimeout(t)}},t.update=function(){if(r()&&navigator.serviceWorker.getRegistration().then(function(e){if(e)return e.update()}),n)try{n.contentWindow.applicationCache.update()}catch(e){}}},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){var r={"./AsideList.js":[14,14],"./AsideStory.js":[15,18],"./FeatureStories.js":[16,1,3],"./FeatureStoriesNav.js":[12,1,19],"./Footer.js":[17,8],"./Hero.js":[18,20],"./HotTopics.js":[19,5],"./NewletterComponent.js":[20,21],"./NewsletterArticle.js":[11,9],"./NewsletterSection.js":[13,6],"./Separator.js":[21,22]};function o(e){if(!n.o(r,e))return Promise.resolve().then(function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t});var t=r[e],o=t[0];return Promise.all(t.slice(1).map(n.e)).then(function(){return n(o)})}o.keys=function(){return Object.keys(r)},o.id=8,e.exports=o},function(e,t,n){"requestIdleCallback"in window||n.e(24).then(n.t.bind(null,22,7)),"text"in Blob.prototype||n.e(23).then(n.t.bind(null,23,7))},function(e,t,n){"use strict";n.r(t);var r=n(0),o=(n(4),n(5),n(6),n(3)),i=n(2),a=n(1);n(7);function l(e){return Object(r.h)("main",{"data-ignore":!0,className:"error"},Object(r.h)("h2",null,"Oops!"),Object(r.h)("p",null,"You have encountered an error."),a.a.hasPreviousState?Object(r.h)("a",{onClick:t=>{t.preventDefault(),a.a.rewindToPreviousState(),e.resetState()},href:"#"},"Cancel last action"):null,Object(r.h)("a",{onClick:t=>{t.preventDefault(),a.a.clearCurrentSession(),e.resetState()},href:"#"},"Reset the app"))}class u extends r.a{render(){return Object(r.h)("div",{"data-ignore":!0,className:"loading"},"Loading...")}}function c(){return(c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function s(e,t,n){var r=t.get(e);if(!r)throw new TypeError("attempted to set private field on non-instance");if(r.set)r.set.call(e,n);else{if(!r.writable)throw new TypeError("attempted to set read only private field");r.value=n}return n}const f="Newsletter template builder",p=new Map;var d=new WeakMap;n(9);Object(r.k)(Object(r.h)(class extends r.a{constructor(...e){var t,n,r;super(...e),r={previewing:!0,hasError:!1},(n="state")in(t=this)?Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r,d.set(this,{writable:!0,value:!0})}static getDerivedStateFromError(e){return console.warn(e),{hasError:!0}}componentWillMount(){a.a.subscribe(this.update.bind(this));const{currentState:e}=a.a;e&&this.update(e),Object(o.install)({onUpdating:console.log,onUpdateReady:()=>{this.updateReady=!0},onInstalled:()=>{n.e(0).then(n.bind(null,29)).then(e=>e.default).then(e=>e("Ready to work offline"))},onUpdated:()=>{n.e(0).then(n.bind(null,29)).then(e=>e.default).then(e=>e("Updated to last version"))}})}componentWillUnmount(){a.a.unsubscribe(this.update.bind(this))}update(e){try{let{main:t,aside:n}=e;Array.isArray(t)||(t=void 0),Array.isArray(n)||(n=void 0),console.log("import",{main:t,aside:n}),this.setState({main:t,aside:n})}catch(t){console.warn(t,e),this.setState({hasError:!0})}}saveState(e,t=!0){a.a.currentState=e,s(this,d,t)}shouldComponentUpdate(){if(!function(e,t){var n=t.get(e);if(!n)throw new TypeError("attempted to get private field on non-instance");return n.get?n.get.call(e):n.value}(this,d))return s(this,d,!0),!1}getComponents(e){return e.map((e,t)=>{try{const{type:o}=e;p.has(o)||(console.log("try loading component",o),p.set(o,Object(i.b)(()=>/[^\w]/.test(o)?Promise.reject(new l("Invalid component name")):n(8)(`./${o}.js`))));const a=p.get(o);return e?Object(r.h)(a,c({key:t},e)):null}catch{return Object(r.h)("div",{"data-ignore":!0},"Invalid component")}})}render(){this.updateReady&&Object(o.applyUpdate)();const{main:e,aside:t}=this.state,c=Object(i.b)(()=>n.e(10).then(n.bind(null,54))),s=e&&t,p=s?Object(i.b)(()=>Promise.all([n.e(1),n.e(12)]).then(n.bind(null,56))):null,d=s?null:Object(i.b)(()=>n.e(13).then(n.bind(null,55)));return this.state.hasError?Object(r.h)(l,{resetState:()=>this.setState({hasError:!1})}):Object(r.h)(r.b,null,Object(r.h)(i.a,{fallback:Object(r.h)(u,null)},Object(r.h)(c,{dataHandler:e=>this.saveState(e)}),s?Object(r.h)(p,{title:f,onChange:this.saveState.bind(this)},Object(r.h)("main",{"data-type":"main"},Object(r.h)(i.a,{fallback:Object(r.h)(u,null)},e?this.getComponents(e):Object(r.h)("p",{"data-ignore":!0},Object(r.h)("em",null,"Empty")))),Object(r.h)("aside",{"data-type":"aside","data-contents":!0},Object(r.h)("section",{className:"newsletter aside","data-type":"aside"},Object(r.h)(i.a,{fallback:Object(r.h)(u,null)},t?this.getComponents(t):Object(r.h)("p",{"data-ignore":!0},Object(r.h)("em",null,"Empty")))))):Object(r.h)(d,{title:f,dataHandler:e=>this.saveState(e),previousStateDate:a.a.lastSavedStateDate})),Object(r.h)("footer",null,Object(r.h)("ul",null,Object(r.h)("li",null,Object(r.h)("a",{target:"_blank",rel:"noopener",href:"https://github.com/aduh95/newsletter-template"},"View the code")),Object(r.h)("li",null,Object(r.h)("a",{target:"_blank",rel:"noopener",href:"https://github.com/aduh95/newsletter-template/issues"},"Report a bug")))))}},null),document.body)}]);