(window.webpackJsonp=window.webpackJsonp||[]).push([[8,21],{39:function(t,e,n){"use strict";n.r(e),n.d(e,"touchHandler",(function(){return s})),n.d(e,"clickHandler",(function(){return a})),n.d(e,"dblClickHandler",(function(){return c}));const o=1,i=300,r=new WeakMap;function s(t){const[e]=t.composedPath(),n=r.get(e)||0,o=t.timeStamp||Date.now();r.set(e,o),o-n<i&&c.call(this,t)}function a(t){if(!this.state.writeMode&&!t.ctrlKey&&t.which===o){t.preventDefault();const[e]=t.composedPath();"A"===e.nodeName&&(e.contentEditable="true",setTimeout(()=>{e.contentEditable="false",this.state.writeMode||n.e(0).then(n.bind(null,63)).then(t=>t.default).then(t=>t("Use Ctrl+Click to open the link"))},i))}}function c(t){if(!this.state.writeMode){var e,n;const r=[],s=t.composedPath();let a=0;for(;s[a]&&void 0===(null===(o=s[a].dataset)||void 0===o?void 0:o.key);){var o;a++}if(t.preventDefault(),window.getSelection){let t=0;const e=getSelection(),{anchorOffset:n,focusOffset:o}=e;if(a>0){let n=s[0];do{var i;const{previousSibling:e}=n;t+=(null==e?void 0:null===(i=e.textContent)||void 0===i?void 0:i.length)||0,n=e||n.parentNode}while(n&&n!==s[a]);this.setState({focusText:e.toString()})}r.push(t+n,t+o)}this.setState({writeMode:!0,focus:null===(e=s[a])||void 0===e?void 0:null===(n=e.dataset)||void 0===n?void 0:n.key,focusOffset:r})}}},53:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return d}));var o=n(0),i=n(39),r=n(11),s=n(60);function a(t,e){if(!Object.prototype.hasOwnProperty.call(t,e))throw new TypeError("attempted to use private field on non-instance");return t}var c=0;function l(t){return"__private_"+c+++"_"+t}class d extends o.a{constructor(...t){super(...t),this.state={writeMode:!1},Object.defineProperty(this,u,{writable:!0,value:i.touchHandler.bind(this)}),Object.defineProperty(this,h,{writable:!0,value:i.clickHandler.bind(this)}),Object.defineProperty(this,p,{writable:!0,value:this.dblClickHandler.bind(this)})}dblClickHandler(t){if(!this.state.writeMode){const o=[],i=t.composedPath();let r=0;for(;i[r]&&void 0===(null===(e=i[r].dataset)||void 0===e?void 0:e.key);){var e;r++}if(t.preventDefault(),i[r]&&window.getSelection){let t=0;const e=getSelection(),{anchorOffset:s,focusOffset:a}=e;if(r>0){let o=i[0];do{var n;const{previousSibling:e}=o;t+=(null==e?void 0:null===(n=e.textContent)||void 0===n?void 0:n.length)||0,o=e||o.parentNode}while(o&&o!==i[r]);this.setState({focusText:e.toString()})}Object.assign(o,{start:t+s,end:t+a,text:e.toString()})}this.setState({writeMode:!0,focusPosition:o})}}update({text:t}){this.setState({writeMode:!1}),Object.assign(this.props,{text:t})}render(){return Object(o.h)("section",{className:"newsletter-footer","data-type":"Footer",onTouchEnd:a(this,u)[u],onClick:a(this,h)[h],onDblclick:a(this,p)[p]},Object(o.h)("output",{hidden:!0,"data-key":"text"},this.props.text),Object(o.h)(s.a,{content:this.props.text,attributes:{"data-key":!0,"data-ignore":!0}}),Object(o.h)(r.default,{componentName:"Footer",active:this.state.writeMode,props:{...this.props,focusPosition:this.state.focusPosition,saveState:this.update.bind(this),resetState:()=>this.setState({writeMode:!1})}}))}}var u=l("touchHandler"),h=l("clickHandler"),p=l("dblClickHandler")},60:function(t,e,n){"use strict";n.d(e,"a",(function(){return u}));var o=n(0),i=n(61),r=n.n(i),s=n(13);function a(){return(a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t}).apply(this,arguments)}function c(t,e){if(!Object.prototype.hasOwnProperty.call(t,e))throw new TypeError("attempted to use private field on non-instance");return t}var l=0;const d=new r.a;class u extends o.a{constructor(...t){super(...t),this.state={loading:!0}}static translate(t){let e;const n=new Promise(t=>e=t),o=c(this,h)[h].then(()=>new Promise((e,n)=>{d.onmessage=({data:t})=>{e(t)},d.onmessageerror=n,d.onerror=n,d.postMessage(t)})).finally(e);return c(this,h)[h]=n,o}componentDidMount(){this.translate()}componentDidUpdate(t){t.content!==this.props.content&&this.translate()}translate(){this.constructor.translate(this.props.content).then(t=>{this.setState({loading:!1,html:t})}).catch(t=>{console.error(t),this.setState({loading:!1,html:"<div data-ignore class='error'>Error when rendering markdown content</div>"})})}render(){return this.state.loading?Object(o.h)(s.a,null):Object(o.h)("output",a({"data-contents":!0,dangerouslySetInnerHTML:{__html:this.state.html}},this.props.attributes))}}var h="__private_"+l+++"_"+"translationJobs";Object.defineProperty(u,h,{writable:!0,value:Promise.resolve()})},61:function(t,e,n){t.exports=function(){return new Worker(n.p+"68d89b06e5bbcff2ad92.worker.js")}}}]);