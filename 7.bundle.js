(window.webpackJsonp=window.webpackJsonp||[]).push([[7,24],{10:function(t,e,n){"use strict";n.r(e),n.d(e,"touchHandler",function(){return s}),n.d(e,"clickHandler",function(){return a}),n.d(e,"dblClickHandler",function(){return c});const o=1,r=300,i=new WeakMap;function s(t){const[e]=t.composedPath(),n=i.get(e)||0,o=t.timeStamp||Date.now();i.set(e,o),o-n<r&&c.call(this,t)}function a(t){if(!this.state.writeMode&&!t.ctrlKey&&t.which===o){t.preventDefault();const[e]=t.composedPath();"A"===e.nodeName&&(e.contentEditable="true",setTimeout(()=>{e.contentEditable="false",this.state.writeMode||n.e(1).then(n.bind(null,34)).then(t=>t.default).then(t=>t("Use Ctrl+Click to open the link"))},r))}}function c(t){if(!this.state.writeMode){var e,n;const i=[],s=t.composedPath();let a=0;for(;s[a]&&void 0===(null===(o=s[a].dataset)||void 0===o?void 0:o.key);){var o;a++}if(t.preventDefault(),window.getSelection){let t=0;const e=getSelection(),{anchorOffset:n,focusOffset:o}=e;if(a>0){let n=s[0];do{var r;const{previousSibling:e}=n;t+=(null==e?void 0:null===(r=e.textContent)||void 0===r?void 0:r.length)||0,n=e||n.parentNode}while(n&&n!==s[a]);this.setState({focusText:e.toString()})}i.push(t+n,t+o)}this.setState({writeMode:!0,focus:null===(e=s[a])||void 0===e?void 0:null===(n=e.dataset)||void 0===n?void 0:n.key,focusOffset:i})}}},17:function(t,e,n){"use strict";n.r(e),n.d(e,"default",function(){return c});var o=n(0),r=n(10),i=n(24),s=n(25);function a(t,e){var n=e.get(t);if(!n)throw new TypeError("attempted to get private field on non-instance");return n.get?n.get.call(t):n.value}class c extends o.a{constructor(...t){var e,n,o;super(...t),o={writeMode:!1},(n="state")in(e=this)?Object.defineProperty(e,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[n]=o,l.set(this,{writable:!0,value:r.touchHandler.bind(this)}),d.set(this,{writable:!0,value:r.clickHandler.bind(this)}),u.set(this,{writable:!0,value:this.dblClickHandler.bind(this)})}dblClickHandler(t){if(!this.state.writeMode){const o=[],r=t.composedPath();let i=0;for(;r[i]&&void 0===(null===(e=r[i].dataset)||void 0===e?void 0:e.key);){var e;i++}if(t.preventDefault(),r[i]&&window.getSelection){let t=0;const e=getSelection(),{anchorOffset:s,focusOffset:a}=e;if(i>0){let o=r[0];do{var n;const{previousSibling:e}=o;t+=(null==e?void 0:null===(n=e.textContent)||void 0===n?void 0:n.length)||0,o=e||o.parentNode}while(o&&o!==r[i]);this.setState({focusText:e.toString()})}Object.assign(o,{start:t+s,end:t+a,text:e.toString()})}this.setState({writeMode:!0,focusPosition:o})}}update({text:t}){this.setState({writeMode:!1}),Object.assign(this.props,{text:t})}render(){return Object(o.h)("section",{className:"newsletter-footer","data-type":"Footer",onTouchEnd:a(this,l),onClick:a(this,d),onDblclick:a(this,u)},Object(o.h)("output",{hidden:!0,"data-key":"text"},this.props.text),Object(o.h)(s.a,{content:this.props.text,attributes:{"data-key":!0,"data-ignore":!0}}),Object(o.h)(i.default,{componentName:"Footer",active:this.state.writeMode,props:{...this.props,focusPosition:this.state.focusPosition,saveState:this.update.bind(this),resetState:()=>this.setState({writeMode:!1})}}))}}var l=new WeakMap,d=new WeakMap,u=new WeakMap},24:function(t,e,n){"use strict";n.r(e),n.d(e,"default",function(){return i});var o=n(0),r=n(2);function i(t){const e=Object(r.c)(()=>n(28)(`./${t.componentName}.js`));return Object(o.h)(r.a,{fallback:Object(o.h)("dialog",{"data-do-not-export":!0,open:!0,"data-ignore":!0},"Loading...")},t.active?Object(o.h)(e,t.props):null)}},25:function(t,e,n){"use strict";n.d(e,"a",function(){return a});var o=n(0),r=n(26);function i(){return(i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t}).apply(this,arguments)}const s=new(n.n(r).a);class a extends o.a{constructor(...t){var e,n,o;super(...t),o={loading:!0},(n="state")in(e=this)?Object.defineProperty(e,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[n]=o}static translate(t){let e;const n=new Promise(t=>e=t),o=function(t,e,n){if(t!==e)throw new TypeError("Private static access of wrong provenance");return n.value}(this,a,c).then(()=>new Promise((e,n)=>{s.onmessage=({data:t})=>{e(t)},s.onmessageerror=n,s.onerror=n,s.postMessage(t)})).finally(e);return function(t,e,n,o){if(t!==e)throw new TypeError("Private static access of wrong provenance");if(!n.writable)throw new TypeError("attempted to set read only private field");n.value=o}(this,a,c,n),o}componentDidMount(){this.translate()}componentDidUpdate(t){t.content!==this.props.content&&this.translate()}translate(){this.constructor.translate(this.props.content).then(t=>{this.setState({loading:!1,html:t})}).catch(t=>{console.error(t),this.setState({loading:!1,html:"<div data-ignore class='error'>Error when rendering markdown content</div>"})})}render(){return this.state.loading?Object(o.h)("p",{"data-ignore":!0},"Loading..."):Object(o.h)("output",i({"data-contents":!0,dangerouslySetInnerHTML:{__html:this.state.html}},this.props.attributes))}}var c={writable:!0,value:Promise.resolve()}},26:function(t,e,n){t.exports=function(){return new Worker(n.p+"25e8b5bb6f306b1d55e5.worker.js")}},28:function(t,e,n){var o={"./AsideList.js":[36,9],"./Footer.js":[37,0,10],"./NewsletterArticle.js":[38,0,3],"./NewsletterSection.js":[39,14],"./OrderedList.js":[29,16],"./lazy-edit-component.js":[24],"./normalizeURL.js":[27,17]};function r(t){if(!n.o(o,t))return Promise.resolve().then(function(){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e});var e=o[t],r=e[0];return Promise.all(e.slice(1).map(n.e)).then(function(){return n(r)})}r.keys=function(){return Object.keys(o)},r.id=28,t.exports=r}}]);