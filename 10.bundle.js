(window.webpackJsonp=window.webpackJsonp||[]).push([[10,13,20,33],{14:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return a}));var r=n(0),i=n(1),s=n(17);const o=new Map;function a({active:t,componentName:e,props:a}){o.has(e)||o.set(e,Object(i.d)(()=>n(16)("./".concat(e,".js"))));const c=o.get(e);return Object(r.h)(i.b,{fallback:Object(r.h)(s.a,null)},t?Object(r.h)(c,a):null)}},16:function(t,e,n){var r={"./AddComponent.js":[24,34],"./AsideList.js":[30,15],"./Footer.js":[31,2,11],"./NewsletterArticle.js":[32,2,7],"./NewsletterSection.js":[33,19],"./OrderedList.js":[20,24],"./TemplateSettings.js":[34,17],"./lazy-edit-component.js":[14,20],"./normalizeURL.js":[19,22]};function i(t){if(!n.o(r,t))return Promise.resolve().then((function(){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}));var e=r[t],i=e[0];return Promise.all(e.slice(1).map(n.e)).then((function(){return n(i)}))}i.keys=function(){return Object.keys(r)},i.id=16,t.exports=i},17:function(t,e,n){"use strict";var r=n(0),i=n(1);function s(t){t.target.close()}e.a=Object(i.e)((function(){return Object(i.c)(Object(r.h)("dialog",{"data-do-not-export":!0,open:!0,"data-ignore":!0,class:"loading",onClick:s},"Loading..."),document.body)}))},21:function(t,e,n){"use strict";n.d(e,"a",(function(){return u}));var r=n(0),i=n(22),s=n.n(i),o=n(3);function a(){return(a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function c(t,e){if(!Object.prototype.hasOwnProperty.call(t,e))throw new TypeError("attempted to use private field on non-instance");return t}var l=0;const d=new s.a;class u extends r.a{constructor(...t){super(...t),this.state={loading:!0}}static translate(t){let e;const n=new Promise(t=>e=t),r=c(this,h)[h].then(()=>new Promise((e,n)=>{d.onmessage=({data:t})=>{e(t)},d.onmessageerror=n,d.onerror=n,d.postMessage(t)})).finally(e);return c(this,h)[h]=n,r}componentDidMount(){this.translate()}componentDidUpdate(t){t.content!==this.props.content&&this.translate()}translate(){this.constructor.translate(this.props.content).then(t=>{this.setState({loading:!1,html:t})}).catch(t=>{console.error(t),this.setState({loading:!1,html:"<div data-ignore class='error'>Error when rendering markdown content</div>"})})}render(){return this.state.loading?Object(r.h)(o.a,null):Object(r.h)("output",a({"data-contents":!0,dangerouslySetInnerHTML:{__html:this.state.html}},this.props.attributes))}}var h="__private_"+l+++"_"+"translationJobs";Object.defineProperty(u,h,{writable:!0,value:Promise.resolve()})},22:function(t,e,n){t.exports=function(){return new Worker(n.p+"9934fcf3e23c2ee8b1da.worker.js")}},23:function(t,e,n){"use strict";n.r(e),n.d(e,"touchHandler",(function(){return o})),n.d(e,"keyboardHandler",(function(){return a})),n.d(e,"clickHandler",(function(){return c})),n.d(e,"dblClickHandler",(function(){return l}));const r=1,i=300,s=new WeakMap;function o(t){const[e]=t.composedPath(),n=s.get(e)||0,r=t.timeStamp||Date.now();s.set(e,r),r-n<i&&l.call(this,t)}function a(t){switch(t.key){case"Enter":l.call(this,t);break;case"Delete":this.base.remove(),n.e(0).then(n.bind(null,18)).then(t=>t.default).then(t=>t("Article has been removed, use undo to restore it."))}}function c(t){if(!this.state.writeMode&&!t.ctrlKey&&t.which===r){t.preventDefault();const[e]=t.composedPath();"A"===e.nodeName&&(e.contentEditable="true",setTimeout(()=>{try{this.base.focus()}catch{e.blur()}e.contentEditable="false",this.state.writeMode||n.e(0).then(n.bind(null,18)).then(t=>t.default).then(t=>t("Use Ctrl+Click to open the link"))},i))}}function l(t){if(!this.state.writeMode){var e,n;const s=[],o=t.composedPath();let a=0;for(;o[a]&&void 0===(null===(r=o[a].dataset)||void 0===r?void 0:r.key);){var r;a++}if(t.preventDefault(),window.getSelection){let t=0;const e=getSelection(),{anchorOffset:n,focusOffset:r}=e;if(a>0){let n=o[0];do{var i;const{previousSibling:e}=n;t+=(null==e?void 0:null===(i=e.textContent)||void 0===i?void 0:i.length)||0,n=e||n.parentNode}while(n&&n!==o[a]);this.setState({focusText:e.toString()})}s.push(t+n,t+r)}this.setState({writeMode:!0,focus:null===(e=o[a])||void 0===e?void 0:null===(n=e.dataset)||void 0===n?void 0:n.key,focusOffset:s})}}},37:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return b}));var r=n(0),i=n(23),s=n(21),o=n(14);function a(t,e){if(!Object.prototype.hasOwnProperty.call(t,e))throw new TypeError("attempted to use private field on non-instance");return t}var c=0;function l(t){return"__private_"+c+++"_"+t}const d=t=>t?Array.isArray(t)?t:[t]:[],u=t=>t;class h extends r.a{render(){return Object(r.h)("iframe",{src:this.props.src,frameborder:"0",width:"300",height:"175",loading:"lazy",allow:"autoplay; fullscreen; picture-in-picture",allowfullscreen:!0,loading:"lazy","data-key":"src"})}}class p extends r.a{render(){return Object(r.h)("img",{alt:this.props.alt,src:this.props.src,loading:"lazy","data-key":"src"})}}class f extends r.a{render(){return this.props.src?this.props.isVideo?Object(r.h)(h,this.props):Object(r.h)(p,this.props):null}}class b extends r.a{constructor(...t){super(...t),this.state={writeMode:!1,data:JSON.stringify(this.props)},Object.defineProperty(this,w,{writable:!0,value:i.clickHandler.bind(this)}),Object.defineProperty(this,v,{writable:!0,value:i.dblClickHandler.bind(this)}),Object.defineProperty(this,y,{writable:!0,value:i.touchHandler.bind(this)}),Object.defineProperty(this,O,{writable:!0,value:i.keyboardHandler.bind(this)}),Object.defineProperty(this,j,{writable:!0,value:this.update.bind(this)}),Object.defineProperty(this,m,{writable:!0,value:()=>this.setState({writeMode:!1},this.focus)})}update(t){this.setState({writeMode:!1,data:JSON.stringify(t)},this.focus)}focus(){addEventListener("keyup",()=>{requestIdleCallback(()=>this.base.focus())},{once:!0})}render(){return Object(r.h)("article",{className:this.props.isMain?"main":void 0,"data-type":"NewsletterArticle","data-json":this.state.data,onClick:a(this,w)[w],onDblclick:a(this,v)[v],onTouchEnd:a(this,y)[y],onKeyUp:a(this,O)[O],tabIndex:0},Object(r.h)("h4",{"data-key":"title"},this.props.title),Object(r.h)(f,{isVideo:this.props.isVideo,src:this.props.illustration,alt:this.props.illustrationDescription}),Object(r.h)("div",null,Object(r.h)(s.a,{content:this.props.description,attributes:{"data-key":"description"}})),Object(r.h)("p",null,d(this.props.links).map((t,e)=>Object(r.h)(r.b,null,Object(r.h)("a",{"data-key":"label[".concat(e,"]"),href:u(t.href),target:"_blank",rel:"noopener",tabIndex:-1},t.label),".",Object(r.h)("br",null)))),Object(r.h)(o.default,{componentName:"NewsletterArticle",active:this.state.writeMode,props:{...this.props,focus:this.state.focus,focusOffset:this.state.focusOffset,focusText:this.state.focusText,saveState:a(this,j)[j],resetState:a(this,m)[m]}}))}}var w=l("clickHandler"),v=l("dblClickHandler"),y=l("touchHandler"),O=l("keyboardHandler"),j=l("update"),m=l("closeDialog")},45:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return l}));var r=n(0),i=n(37),s=n(14);function o(t,e){if(!Object.prototype.hasOwnProperty.call(t,e))throw new TypeError("attempted to use private field on non-instance");return t}var a=0;function c(t){return"__private_"+a+++"_"+t}class l extends r.a{constructor(...t){super(...t),this.state={newArticle:null},Object.defineProperty(this,d,{writable:!0,value:this.setState.bind(this,{openNewArticleDialog:!0})}),Object.defineProperty(this,u,{writable:!0,value:{saveState:this.addNewArticle.bind(this),resetState:()=>this.setState({openNewArticleDialog:!1})}}),Object.defineProperty(this,h,{writable:!0,value:!1}),Object.defineProperty(this,p,{writable:!0,value:!1})}addNewArticle(t){this.setState({newArticle:Object(r.h)("output",{"data-request-render":!0,"data-json":JSON.stringify(t)}),openNewArticleDialog:!1},()=>o(this,h)[h]=!0)}componentDidUpdate(){o(this,p)[p]?this.setState({newArticle:null},()=>{o(this,p)[p]=!1,requestAnimationFrame(()=>{var t,e;return null===(t=this.base)||void 0===t?void 0:null===(e=t.querySelector("article:last-of-type"))||void 0===e?void 0:e.focus()})}):o(this,h)[h]&&(o(this,p)[p]=!0,o(this,h)[h]=!1)}render(){const t=this.props.content||[],e=t.filter(({isMain:t})=>!t).length,n=e%2==0?2:e%3==0||(e-1)%3==0?3:2;return Object(r.h)("section",{className:"newsletter","data-type":"NewsletterSection",style:{"--nb-of-columns":n},id:this.props.id},Object(r.h)("output",{hidden:!0,"data-key":"id"},this.props.id),Object(r.h)("output",{hidden:!0,"data-key":"illustration"},this.props.illustration),Object(r.h)("output",{hidden:!0,"data-key":"illustrationDescription"},this.props.illustrationDescription),Object(r.h)("h2",{className:"newsletter","data-key":"title"},this.props.title),t.map(t=>Object(r.h)(i.default,t)),Object(r.h)("button",{"data-ignore":!0,"data-do-not-export":!0,style:"grid-column: span var(--nb-of-columns)",onClick:o(this,d)[d]},"Add a new article"),Object(r.h)(s.default,{componentName:"NewsletterArticle",active:this.state.openNewArticleDialog,props:o(this,u)[u]}),this.state.newArticle)}}var d=c("createNewArticle"),u=c("newArticleProps"),h=c("readyToConsumeState"),p=c("readyToCleanState")}}]);