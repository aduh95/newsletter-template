(window.webpackJsonp=window.webpackJsonp||[]).push([[2,15],{23:function(t,e,n){"use strict";n.d(e,"a",function(){return p});var r=n(0),o=n(24);function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(){return(a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function c(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function s(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function l(t,e){return(l=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var f=new(n.n(o).a),p=function(t){function e(){var t,n,r,o,a,c,l;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);for(var f=arguments.length,p=new Array(f),h=0;h<f;h++)p[h]=arguments[h];return r=this,n=!(o=(t=u(e)).call.apply(t,[this].concat(p)))||"object"!==i(o)&&"function"!=typeof o?s(r):o,a=s(n),l={loading:!0},(c="state")in a?Object.defineProperty(a,c,{value:l,enumerable:!0,configurable:!0,writable:!0}):a[c]=l,n}var n,o,p;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&l(t,e)}(e,r["a"]),n=e,p=[{key:"translate",value:function(t){var n,r=new Promise(function(t){return n=t}),o=function(t,e,n){if(t!==e)throw new TypeError("Private static access of wrong provenance");return n.value}(this,e,h).then(function(){return new Promise(function(e,n){f.onmessage=function(t){var n=t.data;e(n)},f.onmessageerror=n,f.onerror=n,f.postMessage(t)})}).finally(n);return function(t,e,n,r){if(t!==e)throw new TypeError("Private static access of wrong provenance");if(!n.writable)throw new TypeError("attempted to set read only private field");n.value=r}(this,e,h,r),o}}],(o=[{key:"componentDidMount",value:function(){this.translate()}},{key:"componentDidUpdate",value:function(t){t.content!==this.props.content&&this.translate()}},{key:"translate",value:function(){var t=this;this.constructor.translate(this.props.content).then(function(e){t.setState({loading:!1,html:e})}).catch(function(e){console.error(e),t.setState({loading:!1,html:"<div data-ignore class='error'>Error when rendering markdown content</div>"})})}},{key:"render",value:function(){return this.state.loading?Object(r.h)("p",{"data-ignore":!0},"Loading..."):Object(r.h)("output",a({"data-contents":!0,dangerouslySetInnerHTML:{__html:this.state.html}},this.props.attributes))}}])&&c(n.prototype,o),p&&c(n,p),e}(),h={writable:!0,value:Promise.resolve()}},24:function(t,e,n){t.exports=function(){return new Worker(n.p+"25e8b5bb6f306b1d55e5.worker.js")}},25:function(t,e,n){"use strict";n.r(e),n.d(e,"default",function(){return l});var r=n(0),o=n(2);function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function c(t,e){return!e||"object"!==i(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function s(t,e){return(s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var l=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),c(this,u(e).apply(this,arguments))}var n,i,l;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}(e,r["a"]),n=e,(i=[{key:"handleDrag",value:function(t,e){var n=t.currentTarget,r=Array.from(n.parentNode.children),o=r.indexOf(n),i=r.indexOf(e);this.props.handleReOrder(o,i)}},{key:"render",value:function(){var t=this,e=this.props.content||[];return Object(r.h)("ol",{className:"ordered-list"},e.concat([{}]).map(function(n,i){var a=n.label,c=n.href;return Object(r.h)("li",{draggable:i<e.length,onDragStart:Object(o.a)(t.handleDrag.bind(t)),key:i},Object(r.h)("input",{name:"label",value:a||"",placeholder:"Link label",onChange:function(e){return t.props.handleChange(e,i)}}),Object(r.h)("input",{name:"href",value:c||"",placeholder:"Link URL",onChange:function(e){return t.props.handleChange(e,i)},type:"url"}))}))}}])&&a(n.prototype,i),l&&a(n,l),e}()},28:function(t,e,n){"use strict";n.r(e),n.d(e,"default",function(){return h});var r=n(0),o=(n(25),n(31)),i=n(30);function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,r)}return n}function u(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function s(t){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function l(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function f(t,e){return(f=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function p(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var h=function(t){function e(){var t,n,o,i;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);for(var c=arguments.length,u=new Array(c),f=0;f<c;f++)u[f]=arguments[f];return o=this,n=!(i=(t=s(e)).call.apply(t,[this].concat(u)))||"object"!==a(i)&&"function"!=typeof i?l(o):i,p(l(n),"dialog",Object(r.g)()),n}var n,h,b;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&f(t,e)}(e,r["a"]),n=e,(h=[{key:"componentWillMount",value:function(){var t=this.props,e=t.type,n=t.text;this.setState({type:e,text:n})}},{key:"componentDidMount",value:function(){this.update()}},{key:"componentDidUpdate",value:function(t){this.update(t)}},{key:"update",value:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];var t=this.dialog.current;Object(i.a)(t).then(function(){return t&&!t.open&&t.showModal()})}},{key:"handleSubmit",value:function(){var t=this,e=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(n,!0).forEach(function(e){p(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}({},this.state);requestIdleCallback(function(){return t.props.saveState(e)})}},{key:"onReset",value:function(t){t.stopPropagation(),this.props.resetState()}},{key:"render",value:function(){var t=this;return Object(r.h)("dialog",{"data-ignore":!0,onClose:this.onReset.bind(this),onClick:function(t){return t.stopPropagation()},ref:this.dialog},Object(r.h)("form",{method:"dialog",onSubmit:this.handleSubmit.bind(this)},Object(r.h)("div",null,Object(r.h)("label",null,"Footer: ",Object(r.h)(o.a,{name:"description",value:this.state.text,onChange:function(e){return t.setState({text:e.target.value})},initiallyActive:!0})),Object(r.h)("button",{type:"submit"},"Save"),Object(r.h)("button",{type:"reset",onClick:this.onReset.bind(this)},"Cancel"))))}}])&&u(n.prototype,h),b&&u(n,b),e}()},30:function(t,e,n){"use strict";var r="HTMLDialogElement"in window;e.a=function(t){return r?Promise.resolve():n.e(18).then(n.bind(null,33)).then(function(e){return e.default.registerDialog(t)})}},31:function(t,e,n){"use strict";n.d(e,"a",function(){return w});var r=n(0),o=n(23),i=n(32);function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function c(){return(c=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function u(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var a,c=t[Symbol.iterator]();!(r=(a=c.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==c.return||c.return()}finally{if(o)throw i}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function l(t){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function f(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function p(t,e){return(p=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function h(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var b=new(n.n(i).a),y=[{label:"Bold",char:"**",shortcut:"b"},{label:"Italic",char:"_",shortcut:"i"},{label:"Link",charBefore:"[",charAfter:"](https://)",selectionAfter:!0,selectionOffset:[2,1],shortcut:"k"},{label:"List",charAfter:"\n\n- ",selectionAfter:!0}],v=/\n\s*-\s.+$/,d=/\n(\s*)(\d+)\.\s.+$/,g=/\n\s*(-|\d+\.)\s*$/,m=/\n\s*\d\.\s*$/,w=function(t){function e(){var t,n,o,i;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);for(var c=arguments.length,u=new Array(c),s=0;s<c;s++)u[s]=arguments[s];return o=this,n=!(i=(t=l(e)).call.apply(t,[this].concat(u)))||"object"!==a(i)&&"function"!=typeof i?f(o):i,h(f(n),"state",{active:n.props.initiallyActive}),h(f(n),"textarea",Object(r.g)()),n}var n,i,w;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&p(t,e)}(e,r["a"]),n=e,w=[{key:"makePrettier",value:function(t){var n,r=new Promise(function(t){return n=t}),o=function(t,e,n){if(t!==e)throw new TypeError("Private static access of wrong provenance");return n.value}(this,e,O).then(function(){return new Promise(function(e,n){b.onmessage=function(t){var n=t.data;e(n)},b.onmessageerror=n,b.onerror=n,b.postMessage(t)})}).finally(n);return function(t,e,n,r){if(t!==e)throw new TypeError("Private static access of wrong provenance");if(!n.writable)throw new TypeError("attempted to set read only private field");n.value=r}(this,e,O,r),o}}],(i=[{key:"getCaretPosition",value:function(t){if(window.getSelection){var e=window.getSelection(),n=e.anchorNode,r=e.anchorOffset;this.focusPosition={text:n.textContent,offset:r}}}},{key:"handleCommand",value:function(t){var e=this;return function(n){var r=e.textarea.current;if(r){var o=r.selectionStart,i=r.selectionEnd,a=r.value,c=t.charBefore||t.char||"",s=t.charAfter||t.char||"";if(r.value=a.substring(0,o)+c+a.substring(o,i)+s+a.substring(i),t.selectionAfter)if(t.selectionOffset){var l=u(t.selectionOffset,2),f=l[0],p=l[1];r.setSelectionRange(i+c.length+f,i+c.length+s.length-p)}else r.setSelectionRange(i+s.length,i+s.length);else r.setSelectionRange(o+c.length,i+c.length);e.props.onChange({target:r}),r.focus()}}}},{key:"helper",value:function(t){var e=t.target,n=e.value,r=e.selectionStart,o=e.selectionEnd,i=n.lastIndexOf("\n",r-1),a=n.indexOf("\n",o-1),c=n.substring(~i?i:0,~a?a:void 0);if(13===t.keyCode)if(v.test(c))t.preventDefault(),t.target.setRangeText("\n- ",r,o,"end");else if(d.test(c)){t.preventDefault();var s=u(c.match(d),3),l=(s[0],s[1]),f=s[2];t.target.setRangeText("\n".concat(l).concat(Number(f)+1,". "),r,o,"end")}else g.test(c)&&t.target.setRangeText("\n",r-3,o,"end");else 9===t.keyCode?g.test(c)?(t.preventDefault(),t.target.setRangeText("  - ",r-2-m.test(c),o,"end")):0===c.trim().length&&(t.preventDefault(),t.target.setRangeText(" > ",r,o,"end")):console.log(t.keyCode)}},{key:"makePrettier",value:function(t){var e=this,n=this.textarea.current;if(n){var r=n.value;this.constructor.makePrettier(r).then(function(t){n.value=t,e.props.onChange({target:n})}).catch(console.warn)}}},{key:"componentDidUpdate",value:function(){if(this.focusPosition&&this.textarea.current){var t=this.textarea.current,e=t.value.lastIndexOf(this.focusPosition.text)+this.focusPosition.offset;t.setSelectionRange(e,e),this.focusPosition=null}}},{key:"render",value:function(){var t=this;return this.state.active?Object(r.h)("fidelset",{className:"markdown-editor"},Object(r.h)("legend",null,"Markdown editor"),Object(r.h)("p",null,Object(r.h)("button",{hidden:!0,type:"button",onClick:function(){var e;return null===(e=t.textarea.current)||void 0===e?void 0:e.focus()}}),"[ ",y.map(function(e){return Object(r.h)("button",{onClick:t.handleCommand(e),accesskey:e.shortcut,type:"button"},e.label)})," ] [",Object(r.h)("button",{accesskey:"s",onClick:function(){return t.setState({active:!1})}},"Back to preview")," ]"),Object(r.h)("p",null,Object(r.h)("textarea",c({},this.props,{ref:this.textarea,onKeyDown:this.helper.bind(this),onBlur:this.makePrettier.bind(this),rows:"10",cols:"50"})))):Object(r.h)(o.a,{content:this.props.value,attributes:{contenteditable:"true",style:"display:initial",onBlur:this.getCaretPosition.bind(this),onClick:function(e){e.stopImmediatePropagation(),t.setState({active:!0})}}})}}])&&s(n.prototype,i),w&&s(n,w),e}(),O={writable:!0,value:Promise.resolve()}},32:function(t,e,n){t.exports=function(){return new Worker(n.p+"adfb402c072b1a1540cb.worker.js")}}}]);