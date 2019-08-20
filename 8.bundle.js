(window.webpackJsonp=window.webpackJsonp||[]).push([[8,19],{36:function(t,e,r){"use strict";r.r(e),r.d(e,"touchHandler",function(){return o}),r.d(e,"clickHandler",function(){return a}),r.d(e,"dblClickHandler",function(){return c});const n=1,s=300,i=new WeakMap;function o(t){const[e]=t.composedPath(),r=i.get(e)||0,n=t.timeStamp||Date.now();i.set(e,n),n-r<s&&c.call(this,t)}function a(t){if(!this.state.writeMode&&!t.ctrlKey&&t.which===n){t.preventDefault();const[e]=t.composedPath();"A"===e.nodeName&&(e.contentEditable="true",setTimeout(()=>{e.contentEditable="false",this.state.writeMode||r.e(0).then(r.bind(null,60)).then(t=>t.default).then(t=>t("Use Ctrl+Click to open the link"))},s))}}function c(t){if(!this.state.writeMode){var e,r;const i=[],o=t.composedPath();let a=0;for(;o[a]&&void 0===(null===(n=o[a].dataset)||void 0===n?void 0:n.key);){var n;a++}if(t.preventDefault(),window.getSelection){let t=0;const e=getSelection(),{anchorOffset:r,focusOffset:n}=e;if(a>0){let r=o[0];do{var s;const{previousSibling:e}=r;t+=(null==e?void 0:null===(s=e.textContent)||void 0===s?void 0:s.length)||0,r=e||r.parentNode}while(r&&r!==o[a]);this.setState({focusText:e.toString()})}i.push(t+r,t+n)}this.setState({writeMode:!0,focus:null===(e=o[a])||void 0===e?void 0:null===(r=e.dataset)||void 0===r?void 0:r.key,focusOffset:i})}}},38:function(t,e,r){"use strict";r.r(e),r.d(e,"default",function(){return b});var n=r(0),s=r(36),i=r(57),o=r(11);function a(t,e){if(!Object.prototype.hasOwnProperty.call(t,e))throw new TypeError("attempted to use private field on non-instance");return t}var c=0;function l(t){return"__private_"+c+++"_"+t}const d=t=>t?Array.isArray(t)?t:[t]:[],h=t=>t;class p extends n.a{render(){return Object(n.h)("iframe",{src:this.props.src,frameborder:"0",width:"300",height:"175",loading:"lazy",allow:"autoplay; fullscreen; picture-in-picture",allowfullscreen:!0,loading:"lazy","data-key":"src"})}}class u extends n.a{render(){return Object(n.h)("img",{alt:this.props.alt,src:this.props.src,loading:"lazy","data-key":"src"})}}class f extends n.a{render(){return this.props.src?this.props.isVideo?Object(n.h)(p,this.props):Object(n.h)(u,this.props):null}}class b extends n.a{constructor(...t){super(...t),this.state={writeMode:!1,data:JSON.stringify(this.props)},Object.defineProperty(this,w,{writable:!0,value:s.clickHandler.bind(this)}),Object.defineProperty(this,v,{writable:!0,value:s.dblClickHandler.bind(this)}),Object.defineProperty(this,O,{writable:!0,value:s.touchHandler.bind(this)})}update(t){this.setState({writeMode:!1,data:JSON.stringify(t)})}render(){return Object(n.h)("article",{className:this.props.isMain?"main":void 0,"data-type":"NewsletterArticle","data-json":this.state.data,onClick:a(this,w)[w],onDblclick:a(this,v)[v],onTouchEnd:a(this,O)[O]},Object(n.h)("h4",{"data-key":"title"},this.props.title),Object(n.h)(f,{isVideo:this.props.isVideo,src:this.props.illustration,alt:this.props.illustrationDescription}),Object(n.h)("div",null,Object(n.h)(i.a,{content:this.props.description,attributes:{"data-key":"description"}})),Object(n.h)("p",null,d(this.props.links).map((t,e)=>Object(n.h)(n.b,null,Object(n.h)("a",{"data-key":"label[".concat(e,"]"),href:h(t.href),target:"_blank",rel:"noopener"},t.label),".",Object(n.h)("br",null)))),Object(n.h)(o.default,{componentName:"NewsletterArticle",active:this.state.writeMode,props:{...this.props,focus:this.state.focus,focusOffset:this.state.focusOffset,focusText:this.state.focusText,saveState:this.update.bind(this),resetState:()=>this.setState({writeMode:!1})}}))}}var w=l("clickHandler"),v=l("dblClickHandler"),O=l("touchHandler")},57:function(t,e,r){"use strict";r.d(e,"a",function(){return l});var n=r(0),s=r(58);function i(){return(i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t}).apply(this,arguments)}function o(t,e){if(!Object.prototype.hasOwnProperty.call(t,e))throw new TypeError("attempted to use private field on non-instance");return t}var a=0;const c=new(r.n(s).a);class l extends n.a{constructor(...t){super(...t),this.state={loading:!0}}static translate(t){let e;const r=new Promise(t=>e=t),n=o(this,d)[d].then(()=>new Promise((e,r)=>{c.onmessage=({data:t})=>{e(t)},c.onmessageerror=r,c.onerror=r,c.postMessage(t)})).finally(e);return o(this,d)[d]=r,n}componentDidMount(){this.translate()}componentDidUpdate(t){t.content!==this.props.content&&this.translate()}translate(){this.constructor.translate(this.props.content).then(t=>{this.setState({loading:!1,html:t})}).catch(t=>{console.error(t),this.setState({loading:!1,html:"<div data-ignore class='error'>Error when rendering markdown content</div>"})})}render(){return this.state.loading?Object(n.h)("p",{"data-ignore":!0},"Loading..."):Object(n.h)("output",i({"data-contents":!0,dangerouslySetInnerHTML:{__html:this.state.html}},this.props.attributes))}}var d="__private_"+a+++"_"+"translationJobs";Object.defineProperty(l,d,{writable:!0,value:Promise.resolve()})},58:function(t,e,r){t.exports=function(){return new Worker(r.p+"cb4cdbc0bec39800bfd9.worker.js")}}}]);