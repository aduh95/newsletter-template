(window.webpackJsonp=window.webpackJsonp||[]).push([[3,6,9,19],[,,,,,,,,,,,function(t,e,n){"use strict";n.r(e),n.d(e,"default",function(){return h});var s=n(0),r=n(25),i=n(24);const o=t=>t?Array.isArray(t)?t:[t]:[],a=t=>t;class l extends s.a{render(){return Object(s.h)("iframe",{src:this.props.src,frameborder:"0",width:"300",height:"175",loading:"lazy",allow:"autoplay; fullscreen; picture-in-picture",allowfullscreen:!0,loading:"lazy","data-key":"src"})}}class c extends s.a{render(){return Object(s.h)("img",{alt:this.props.alt,src:this.props.src,loading:"lazy","data-key":"src"})}}class d extends s.a{render(){return this.props.src?this.props.isVideo?Object(s.h)(l,this.props):Object(s.h)(c,this.props):null}}class h extends s.a{constructor(...t){var e,n,s;super(...t),e=this,n="state",s={writeMode:!1,data:JSON.stringify(this.props)},n in e?Object.defineProperty(e,n,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[n]=s}update(t){this.setState({writeMode:!1,data:JSON.stringify(t)})}clickHandler(t){if(!this.state.writeMode&&!t.ctrlKey){t.preventDefault();const[e]=t.composedPath();e.contentEditable="true",setTimeout(()=>{e.contentEditable="false",this.state.writeMode||"A"!==e.nodeName||n.e(0).then(n.bind(null,29)).then(t=>t.default).then(t=>t("Use Ctrl+Click to open the link"))},300)}}dblClickHandler(t){if(!this.state.writeMode){var e,n;const i=[],o=t.composedPath();let a=0;for(;o[a]&&void 0===(null===(s=o[a].dataset)||void 0===s?void 0:s.key);){var s;a++}if(t.preventDefault(),window.getSelection){let t=0;const e=getSelection(),{anchorOffset:n,focusOffset:s}=e;if(a>0){let n=o[0];do{var r;const{previousSibling:e}=n;t+=(null==e?void 0:null===(r=e.textContent)||void 0===r?void 0:r.length)||0,n=e||n.parentNode}while(n&&n!==o[a]);this.setState({focusText:e.toString()})}i.push(t+n,t+s)}this.setState({writeMode:!0,focus:null===(e=o[a])||void 0===e?void 0:null===(n=e.dataset)||void 0===n?void 0:n.key,focusOffset:i})}}render(){return Object(s.h)("article",{className:this.props.isMain?"main":void 0,"data-type":"NewsletterArticle","data-json":this.state.data,onClick:this.clickHandler.bind(this),onDblclick:this.dblClickHandler.bind(this)},Object(s.h)("h4",{"data-key":"title"},this.props.title),Object(s.h)(d,{isVideo:this.props.isVideo,src:this.props.illustration,alt:this.props.illustrationDescription}),Object(s.h)(r.a,{content:this.props.description,attributes:{"data-key":"description"}}),Object(s.h)("p",null,o(this.props.links).map((t,e)=>Object(s.h)(s.b,null,Object(s.h)("a",{"data-key":`label[${e}]`,href:a(t.href),target:"_blank",rel:"noopener"},t.label),".",Object(s.h)("br",null)))),Object(s.h)(i.default,{componentName:"NewsletterArticle",active:this.state.writeMode,props:{...this.props,focus:this.state.focus,focusOffset:this.state.focusOffset,focusText:this.state.focusText,saveState:this.update.bind(this),resetState:()=>this.setState({writeMode:!1})}}))}}},function(t,e,n){"use strict";n.r(e),n.d(e,"default",function(){return o});var s=n(0),r=n(31),i=n(32);class o extends s.a{render(){const{sections:t}=this.props;return Object(s.h)("nav",{class:"newsletter","data-ignore":!0},t.map(t=>Object(s.h)("a",{href:"#"+t.id,"data-link-to-edit":!0,onClick:this.props.editSection(t)},Object(s.h)("img",{src:t.illustration,alt:t.illustrationDescription}))),Object(s.h)("a",{href:"#",style:{display:"flex",alignItems:"center",justifyContent:"center"},"data-link-to-create":!0,onClick:this.props.addSection},Object(s.h)(r.a,{icon:i.g})))}}},function(t,e,n){"use strict";n.r(e),n.d(e,"default",function(){return i});var s=n(0),r=n(11);class i extends s.a{render(){const t=this.props.content||[];return Object(s.h)("section",{className:"newsletter","data-type":"NewsletterSection",style:{"--nb-of-articles":t.length},id:this.props.id},Object(s.h)("output",{hidden:!0,"data-key":"id"},this.props.id),Object(s.h)("output",{hidden:!0,"data-key":"illustration"},this.props.illustration),Object(s.h)("output",{hidden:!0,"data-key":"illustrationDescription"},this.props.illustrationDescription),Object(s.h)("h2",{className:"newsletter","data-key":"title"},this.props.title),t.map(t=>Object(s.h)(r.default,t)),Object(s.h)("button",{"data-ignore":!0,style:"grid-column: span var(--nb-of-columns)",onClick:t=>n.e(0).then(n.bind(null,29)).then(t=>t.default).then(t=>t("Not implemented yet"))},"Add a new article"))}}},,,function(t,e,n){"use strict";n.r(e),n.d(e,"default",function(){return o});var s=n(0),r=n(12),i=n(13);class o extends s.a{addSection(t){t.preventDefault(),n.e(0).then(n.bind(null,29)).then(t=>t.default("Not implemented yet"))}editSection(t){return e=>{e.preventDefault(),n.e(0).then(n.bind(null,29)).then(t=>t.default("Not implemented yet")),console.log("edit",t)}}render(){const t=this.props.content||[];return Object(s.h)("section",{class:"newsletter","data-type":"FeatureStories"},Object(s.h)("h2",{class:"newsletter","data-key":"title"},this.props.title),Object(s.h)(r.default,{sections:t,addSection:this.addSection.bind(this),editSection:this.editSection.bind(this)}),t.map(t=>Object(s.h)(i.default,t)))}}},,,,,,,,function(t,e,n){"use strict";n.r(e),n.d(e,"default",function(){return i});var s=n(0),r=n(2);class i extends s.a{render(){const t=this.props.active?Object(r.b)(()=>n(27)(`./${this.props.componentName}.js`)):s.b;return Object(s.h)(r.a,{fallback:Object(s.h)("dialog",{open:!0,"data-ignore":!0},"Loading...")},Object(s.h)(t,this.props.props))}}},function(t,e,n){"use strict";n.d(e,"a",function(){return a});var s=n(0),r=n(26);function i(){return(i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(t[s]=n[s])}return t}).apply(this,arguments)}const o=new(n.n(r).a);class a extends s.a{constructor(...t){var e,n,s;super(...t),s={loading:!0},(n="state")in(e=this)?Object.defineProperty(e,n,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[n]=s}static translate(t){let e;const n=new Promise(t=>e=t),s=function(t,e,n){if(t!==e)throw new TypeError("Private static access of wrong provenance");return n.value}(this,a,l).then(()=>new Promise((e,n)=>{o.onmessage=({data:t})=>{e(t)},o.onmessageerror=n,o.onerror=n,o.postMessage(t)})).finally(e);return function(t,e,n,s){if(t!==e)throw new TypeError("Private static access of wrong provenance");if(!n.writable)throw new TypeError("attempted to set read only private field");n.value=s}(this,a,l,n),s}componentDidMount(){this.translate()}componentDidUpdate(t){t.content!==this.props.content&&this.translate()}translate(){this.constructor.translate(this.props.content).then(t=>{this.setState({loading:!1,html:t})}).catch(t=>{console.error(t),this.setState({loading:!1,html:"<div data-ignore class='error'>Error when rendering markdown content</div>"})})}render(){return this.state.loading?Object(s.h)("p",{"data-ignore":!0},"Loading..."):Object(s.h)("output",i({"data-contents":!0,dangerouslySetInnerHTML:{__html:this.state.html}},this.props.attributes))}}var l={writable:!0,value:Promise.resolve()}},function(t,e,n){t.exports=function(){return new Worker(n.p+"25e8b5bb6f306b1d55e5.worker.js")}},function(t,e,n){var s={"./AsideList.js":[34,11],"./Footer.js":[35,1,7],"./NewsletterArticle.js":[36,1,4],"./NewsletterSection.js":[37,16],"./OrderedList.js":[28,15],"./lazy-edit-compomponent.js":[24]};function r(t){if(!n.o(s,t))return Promise.resolve().then(function(){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e});var e=s[t],r=e[0];return Promise.all(e.slice(1).map(n.e)).then(function(){return n(r)})}r.keys=function(){return Object.keys(s)},r.id=27,t.exports=r}]]);