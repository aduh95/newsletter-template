(window.webpackJsonp=window.webpackJsonp||[]).push([[12,20,33],{14:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return a}));var o=n(0),r=n(1),i=n(17);const s=new Map;function a({active:t,componentName:e,props:a}){s.has(e)||s.set(e,Object(r.d)(()=>n(16)(`./${e}.js`)));const c=s.get(e);return Object(o.h)(r.b,{fallback:Object(o.h)(i.a,null)},t?Object(o.h)(c,a):null)}},16:function(t,e,n){var o={"./AddComponent.js":[24,34],"./AsideList.js":[30,15],"./Footer.js":[31,2,11],"./NewsletterArticle.js":[32,2,7],"./NewsletterSection.js":[33,19],"./OrderedList.js":[20,24],"./TemplateSettings.js":[34,17],"./lazy-edit-component.js":[14,20],"./normalizeURL.js":[19,22]};function r(t){if(!n.o(o,t))return Promise.resolve().then((function(){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}));var e=o[t],r=e[0];return Promise.all(e.slice(1).map(n.e)).then((function(){return n(r)}))}r.keys=function(){return Object.keys(o)},r.id=16,t.exports=r},17:function(t,e,n){"use strict";var o=n(0),r=n(1);function i(t){t.target.close()}e.a=Object(r.e)((function(){return Object(r.c)(Object(o.h)("dialog",{"data-do-not-export":!0,open:!0,"data-ignore":!0,class:"loading",onClick:i},"Loading..."),document.body)}))},21:function(t,e,n){"use strict";n.d(e,"a",(function(){return u}));var o=n(0),r=n(22),i=n.n(r),s=n(3);function a(){return(a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t}).apply(this,arguments)}function c(t,e){if(!Object.prototype.hasOwnProperty.call(t,e))throw new TypeError("attempted to use private field on non-instance");return t}var l=0;const d=new i.a;class u extends o.a{constructor(...t){super(...t),this.state={loading:!0}}static translate(t){let e;const n=new Promise(t=>e=t),o=c(this,h)[h].then(()=>new Promise((e,n)=>{d.onmessage=({data:t})=>{e(t)},d.onmessageerror=n,d.onerror=n,d.postMessage(t)})).finally(e);return c(this,h)[h]=n,o}componentDidMount(){this.translate()}componentDidUpdate(t){t.content!==this.props.content&&this.translate()}translate(){this.constructor.translate(this.props.content).then(t=>{this.setState({loading:!1,html:t})}).catch(t=>{console.error(t),this.setState({loading:!1,html:"<div data-ignore class='error'>Error when rendering markdown content</div>"})})}render(){return this.state.loading?Object(o.h)(s.a,null):Object(o.h)("output",a({"data-contents":!0,dangerouslySetInnerHTML:{__html:this.state.html}},this.props.attributes))}}var h="__private_"+l+++"_"+"translationJobs";Object.defineProperty(u,h,{writable:!0,value:Promise.resolve()})},22:function(t,e,n){t.exports=function(){return new Worker(n.p+"44d1adee71d79f1e0dc4.worker.js")}},23:function(t,e,n){"use strict";n.r(e),n.d(e,"touchHandler",(function(){return r})),n.d(e,"keyboardHandler",(function(){return i})),n.d(e,"clickHandler",(function(){return s})),n.d(e,"dblClickHandler",(function(){return a}));const o=new WeakMap;function r(t){const[e]=t.composedPath(),n=o.get(e)||0,r=t.timeStamp||Date.now();o.set(e,r),r-n<300&&a.call(this,t)}function i(t){switch(t.key){case"Enter":a.call(this,t);break;case"Delete":this.base.remove(),n.e(0).then(n.bind(null,18)).then(t=>t.default).then(t=>t("Article has been removed, use undo to restore it."))}}function s(t){if(!this.state.writeMode&&!t.ctrlKey&&1===t.which){t.preventDefault();const[e]=t.composedPath();"A"===e.nodeName&&(e.contentEditable="true",setTimeout(()=>{try{this.base.focus()}catch{e.blur()}e.contentEditable="false",this.state.writeMode||n.e(0).then(n.bind(null,18)).then(t=>t.default).then(t=>t("Use Ctrl+Click to open the link"))},300))}}function a(t){if(!this.state.writeMode){var e,n;const i=[],s=t.composedPath();let a=0;for(;s[a]&&void 0===(null===(o=s[a].dataset)||void 0===o?void 0:o.key);){var o;a++}if(t.preventDefault(),window.getSelection){let t=0;const e=getSelection(),{anchorOffset:n,focusOffset:o}=e;if(a>0){let n=s[0];do{var r;const{previousSibling:e}=n;t+=(null==e||null===(r=e.textContent)||void 0===r?void 0:r.length)||0,n=e||n.parentNode}while(n&&n!==s[a]);this.setState({focusText:e.toString()})}i.push(t+n,t+o)}this.setState({writeMode:!0,focus:null===(e=s[a])||void 0===e||null===(n=e.dataset)||void 0===n?void 0:n.key,focusOffset:i})}}},64:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return d}));var o=n(0),r=n(23),i=n(14),s=n(21);function a(t,e){if(!Object.prototype.hasOwnProperty.call(t,e))throw new TypeError("attempted to use private field on non-instance");return t}var c=0;function l(t){return"__private_"+c+++"_"+t}class d extends o.a{constructor(...t){super(...t),this.state={writeMode:!1},Object.defineProperty(this,u,{writable:!0,value:r.touchHandler.bind(this)}),Object.defineProperty(this,h,{writable:!0,value:r.clickHandler.bind(this)}),Object.defineProperty(this,f,{writable:!0,value:this.dblClickHandler.bind(this)}),Object.defineProperty(this,p,{writable:!0,value:r.keyboardHandler.bind(this)}),Object.defineProperty(this,b,{writable:!0,value:()=>this.setState({writeMode:!1},()=>this.base.focus())})}dblClickHandler(t){if(!this.state.writeMode){const o=[],r=t.composedPath();let i=0;for(;r[i]&&void 0===(null===(e=r[i].dataset)||void 0===e?void 0:e.key);){var e;i++}if(t.preventDefault(),r[i]&&window.getSelection){let t=0;const e=getSelection(),{anchorOffset:s,focusOffset:a}=e;if(i>0){let o=r[0];do{var n;const{previousSibling:e}=o;t+=(null==e||null===(n=e.textContent)||void 0===n?void 0:n.length)||0,o=e||o.parentNode}while(o&&o!==r[i]);this.setState({focusText:e.toString()})}Object.assign(o,{start:t+s,end:t+a,text:e.toString()})}this.setState({writeMode:!0,focusPosition:o})}}update({text:t}){this.setState({writeMode:!1}),Object.assign(this.props,{text:t})}render(){return Object(o.h)("section",{className:"newsletter-footer","data-type":"Footer",onTouchEnd:a(this,u)[u],onClick:a(this,h)[h],onDblclick:a(this,f)[f],onKeyUp:a(this,p)[p],tabIndex:0},Object(o.h)("output",{hidden:!0,"data-key":"text"},this.props.text),Object(o.h)(s.a,{content:this.props.text,attributes:{"data-key":!0,"data-ignore":!0}}),Object(o.h)(i.default,{componentName:"Footer",active:this.state.writeMode,props:{...this.props,focusPosition:this.state.focusPosition,saveState:this.update.bind(this),resetState:a(this,b)[b]}}))}}var u=l("touchHandler"),h=l("clickHandler"),f=l("dblClickHandler"),p=l("keyboardHandler"),b=l("closeDialog")}}]);