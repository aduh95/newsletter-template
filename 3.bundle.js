(window.webpackJsonp=window.webpackJsonp||[]).push([[3,6,8,15,19],{36:function(t,e,i){"use strict";i.r(e),i.d(e,"touchHandler",function(){return a}),i.d(e,"clickHandler",function(){return o}),i.d(e,"dblClickHandler",function(){return c});const n=1,r=300,s=new WeakMap;function a(t){const[e]=t.composedPath(),i=s.get(e)||0,n=t.timeStamp||Date.now();s.set(e,n),n-i<r&&c.call(this,t)}function o(t){if(!this.state.writeMode&&!t.ctrlKey&&t.which===n){t.preventDefault();const[e]=t.composedPath();"A"===e.nodeName&&(e.contentEditable="true",setTimeout(()=>{e.contentEditable="false",this.state.writeMode||i.e(0).then(i.bind(null,60)).then(t=>t.default).then(t=>t("Use Ctrl+Click to open the link"))},r))}}function c(t){if(!this.state.writeMode){var e,i;const s=[],a=t.composedPath();let o=0;for(;a[o]&&void 0===(null===(n=a[o].dataset)||void 0===n?void 0:n.key);){var n;o++}if(t.preventDefault(),window.getSelection){let t=0;const e=getSelection(),{anchorOffset:i,focusOffset:n}=e;if(o>0){let i=a[0];do{var r;const{previousSibling:e}=i;t+=(null==e?void 0:null===(r=e.textContent)||void 0===r?void 0:r.length)||0,i=e||i.parentNode}while(i&&i!==a[o]);this.setState({focusText:e.toString()})}s.push(t+i,t+n)}this.setState({writeMode:!0,focus:null===(e=a[o])||void 0===e?void 0:null===(i=e.dataset)||void 0===i?void 0:i.key,focusOffset:s})}}},38:function(t,e,i){"use strict";i.r(e),i.d(e,"default",function(){return b});var n=i(0),r=i(36),s=i(57),a=i(11);function o(t,e){if(!Object.prototype.hasOwnProperty.call(t,e))throw new TypeError("attempted to use private field on non-instance");return t}var c=0;function l(t){return"__private_"+c+++"_"+t}const d=t=>t?Array.isArray(t)?t:[t]:[],h=t=>t;class u extends n.a{render(){return Object(n.h)("iframe",{src:this.props.src,frameborder:"0",width:"300",height:"175",loading:"lazy",allow:"autoplay; fullscreen; picture-in-picture",allowfullscreen:!0,loading:"lazy","data-key":"src"})}}class p extends n.a{render(){return Object(n.h)("img",{alt:this.props.alt,src:this.props.src,loading:"lazy","data-key":"src"})}}class f extends n.a{render(){return this.props.src?this.props.isVideo?Object(n.h)(u,this.props):Object(n.h)(p,this.props):null}}class b extends n.a{constructor(...t){super(...t),this.state={writeMode:!1,data:JSON.stringify(this.props)},Object.defineProperty(this,w,{writable:!0,value:r.clickHandler.bind(this)}),Object.defineProperty(this,v,{writable:!0,value:r.dblClickHandler.bind(this)}),Object.defineProperty(this,y,{writable:!0,value:r.touchHandler.bind(this)})}update(t){this.setState({writeMode:!1,data:JSON.stringify(t)})}render(){return Object(n.h)("article",{className:this.props.isMain?"main":void 0,"data-type":"NewsletterArticle","data-json":this.state.data,onClick:o(this,w)[w],onDblclick:o(this,v)[v],onTouchEnd:o(this,y)[y]},Object(n.h)("h4",{"data-key":"title"},this.props.title),Object(n.h)(f,{isVideo:this.props.isVideo,src:this.props.illustration,alt:this.props.illustrationDescription}),Object(n.h)("div",null,Object(n.h)(s.a,{content:this.props.description,attributes:{"data-key":"description"}})),Object(n.h)("p",null,d(this.props.links).map((t,e)=>Object(n.h)(n.b,null,Object(n.h)("a",{"data-key":"label[".concat(e,"]"),href:h(t.href),target:"_blank",rel:"noopener"},t.label),".",Object(n.h)("br",null)))),Object(n.h)(a.default,{componentName:"NewsletterArticle",active:this.state.writeMode,props:{...this.props,focus:this.state.focus,focusOffset:this.state.focusOffset,focusText:this.state.focusText,saveState:this.update.bind(this),resetState:()=>this.setState({writeMode:!1})}}))}}var w=l("clickHandler"),v=l("dblClickHandler"),y=l("touchHandler")},40:function(t,e,i){"use strict";i.r(e),i.d(e,"default",function(){return a});var n=i(0),r=i(4),s=i(5);function a({addSection:t,editSection:e,sections:i}){return Object(n.h)("nav",{class:"newsletter","data-ignore":!0},i.map(t=>Object(n.h)("a",{href:"#"+t.id,"data-link-to-edit":!0,onClick:e(t)},Object(n.h)("img",{src:t.illustration,alt:t.illustrationDescription}))),Object(n.h)("a",{href:"#",style:{display:"flex",alignItems:"center",justifyContent:"center",color:"black"},"data-link-to-create":!0,"data-do-not-export":!0,onClick:t},Object(n.h)(r.a,{icon:s.e,size:"2x"})))}},41:function(t,e,i){"use strict";i.r(e),i.d(e,"default",function(){return l});var n=i(0),r=i(38),s=i(11);function a(t,e){if(!Object.prototype.hasOwnProperty.call(t,e))throw new TypeError("attempted to use private field on non-instance");return t}var o=0;function c(t){return"__private_"+o+++"_"+t}class l extends n.a{constructor(...t){super(...t),this.state={newArticle:null},Object.defineProperty(this,d,{writable:!0,value:this.setState.bind(this,{openNewArticleDialog:!0})}),Object.defineProperty(this,h,{writable:!0,value:{saveState:this.addNewArticle.bind(this),resetState:()=>this.setState({openNewArticleDialog:!1})}}),Object.defineProperty(this,u,{writable:!0,value:!1}),Object.defineProperty(this,p,{writable:!0,value:!1})}addNewArticle(t){this.setState({newArticle:Object(n.h)("output",{"data-request-render":!0,"data-json":JSON.stringify(t)}),openNewArticleDialog:!1},()=>a(this,u)[u]=!0)}componentDidUpdate(){a(this,p)[p]?this.setState({newArticle:null},()=>a(this,p)[p]=!1):a(this,u)[u]&&(a(this,p)[p]=!0,a(this,u)[u]=!1)}render(){const t=this.props.content||[],e=t.filter(({isMain:t})=>!t).length,i=e%2==0?2:e%3==0||(e-1)%3==0?3:2;return Object(n.h)("section",{className:"newsletter","data-type":"NewsletterSection",style:{"--nb-of-columns":i},id:this.props.id},Object(n.h)("output",{hidden:!0,"data-key":"id"},this.props.id),Object(n.h)("output",{hidden:!0,"data-key":"illustration"},this.props.illustration),Object(n.h)("output",{hidden:!0,"data-key":"illustrationDescription"},this.props.illustrationDescription),Object(n.h)("h2",{className:"newsletter","data-key":"title"},this.props.title),t.map(t=>Object(n.h)(r.default,t)),Object(n.h)("button",{"data-ignore":!0,"data-do-not-export":!0,style:"grid-column: span var(--nb-of-columns)",onClick:a(this,d)[d]},"Add a new article"),Object(n.h)(s.default,{componentName:"NewsletterArticle",active:this.state.openNewArticleDialog,props:a(this,h)[h]}),this.state.newArticle)}}var d=c("createNewArticle"),h=c("newArticleProps"),u=c("readyToConsumeState"),p=c("readyToCleanState")},49:function(t,e,i){"use strict";i.r(e),i.d(e,"default",function(){return h});var n=i(0),r=i(11),s=i(40),a=i(41);function o(t,e){if(!Object.prototype.hasOwnProperty.call(t,e))throw new TypeError("attempted to use private field on non-instance");return t}var c=0;function l(t){return"__private_"+c+++"_"+t}const d="NewsletterSection";class h extends n.a{constructor(...t){super(...t),this.state={newSection:null},Object.defineProperty(this,u,{writable:!0,value:this.addSection.bind(this)}),Object.defineProperty(this,p,{writable:!0,value:this.editSection.bind(this)}),Object.defineProperty(this,f,{writable:!0,value:()=>this.setState({edit:null})}),Object.defineProperty(this,b,{writable:!0,value:!1}),Object.defineProperty(this,w,{writable:!0,value:!1})}addSection(t){t.preventDefault(),this.setState({edit:{type:d,saveState:t=>{this.setState({edit:null,newSection:Object(n.h)("output",{"data-request-render":!0,"data-json":JSON.stringify(t)})},()=>o(this,b)[b]=!0)}}})}editSection(t){return e=>{e.preventDefault(),this.setState({edit:{...t,saveState:e=>{const{id:i}=t,n=document.getElementById(i);n.id=e.id,Object.entries(e).forEach(([t,e])=>{const i=n.querySelector("[data-key='".concat(t,"']"));for(;i&&i.firstChild.nextSibling;)i.removeChild(i.firstChild);i&&(i.firstChild.textContent=e)});const r=n.parentElement.querySelector('nav>a[href="#'.concat(i,'"]'));r.href="#"+e.id,r.firstElementChild.src=e.illustration,r.firstElementChild.alt=e.illustrationDescription}}})}}componentDidUpdate(){o(this,w)[w]?this.setState({newSection:null},()=>o(this,w)[w]=!1):o(this,b)[b]&&(o(this,w)[w]=!0,o(this,b)[b]=!1)}render(){const t=this.props.content||[];return Object(n.h)("section",{class:"newsletter","data-type":"FeatureStories"},Object(n.h)("h2",{class:"newsletter","data-key":"title"},this.props.title||"[[Title]]"),Object(n.h)(s.default,{sections:t,addSection:o(this,u)[u],editSection:o(this,p)[p]}),Object(n.h)(r.default,{componentName:d,active:!!this.state.edit,props:{...this.state.edit,resetState:o(this,f)[f]}}),t.map(t=>Object(n.h)(a.default,t)),this.state.newSection)}}var u=l("addSection"),p=l("editSection"),f=l("resetState"),b=l("readyToConsumeState"),w=l("readyToCleanState")},57:function(t,e,i){"use strict";i.d(e,"a",function(){return l});var n=i(0),r=i(58);function s(){return(s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t}).apply(this,arguments)}function a(t,e){if(!Object.prototype.hasOwnProperty.call(t,e))throw new TypeError("attempted to use private field on non-instance");return t}var o=0;const c=new(i.n(r).a);class l extends n.a{constructor(...t){super(...t),this.state={loading:!0}}static translate(t){let e;const i=new Promise(t=>e=t),n=a(this,d)[d].then(()=>new Promise((e,i)=>{c.onmessage=({data:t})=>{e(t)},c.onmessageerror=i,c.onerror=i,c.postMessage(t)})).finally(e);return a(this,d)[d]=i,n}componentDidMount(){this.translate()}componentDidUpdate(t){t.content!==this.props.content&&this.translate()}translate(){this.constructor.translate(this.props.content).then(t=>{this.setState({loading:!1,html:t})}).catch(t=>{console.error(t),this.setState({loading:!1,html:"<div data-ignore class='error'>Error when rendering markdown content</div>"})})}render(){return this.state.loading?Object(n.h)("p",{"data-ignore":!0},"Loading..."):Object(n.h)("output",s({"data-contents":!0,dangerouslySetInnerHTML:{__html:this.state.html}},this.props.attributes))}}var d="__private_"+o+++"_"+"translationJobs";Object.defineProperty(l,d,{writable:!0,value:Promise.resolve()})},58:function(t,e,i){t.exports=function(){return new Worker(i.p+"cb4cdbc0bec39800bfd9.worker.js")}}}]);