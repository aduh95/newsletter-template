(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{26:function(t,e,r){"use strict";r.r(e),r.d(e,"default",function(){return a});var n=r(0),o=r(31),s=r(32);class a extends n.a{constructor(...t){var e,r,n;super(...t),n={writeMode:!1},(r="state")in(e=this)?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n}update({text:t}){this.setState({writeMode:!1}),Object.assign(this.props,{text:t})}render(){return Object(n.h)("section",{className:"newsletter-footer","data-type":"Footer",onClick:t=>{t.preventDefault(),this.setState({writeMode:!0})}},Object(n.h)("output",{hidden:!0,"data-key":"text"},this.props.text),Object(n.h)(s.a,{content:this.props.text,attributes:{"data-ignore":!0}}),Object(n.h)(o.default,{componentName:"Footer",active:this.state.writeMode,props:{...this.props,saveState:this.update.bind(this),resetState:()=>this.setState({writeMode:!1})}}))}}},31:function(t,e,r){"use strict";r.r(e),r.d(e,"default",function(){return s});var n=r(0),o=r(3);class s extends n.a{render(){const t=this.props.active?Object(o.b)(()=>r(35)(`./${this.props.componentName}.js`)):n.b;return Object(n.h)(o.a,{fallback:Object(n.h)("dialog",{open:!0,"data-ignore":!0},"Loading...")},Object(n.h)(t,this.props.props))}}},32:function(t,e,r){"use strict";r.d(e,"a",function(){return i});var n=r(0),o=r(33);function s(){return(s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t}).apply(this,arguments)}const a=new(r.n(o).a);class i extends n.a{constructor(...t){var e,r,n;super(...t),n={loading:!0},(r="state")in(e=this)?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n}static translate(t){let e;const r=new Promise(t=>e=t),n=function(t,e,r){if(t!==e)throw new TypeError("Private static access of wrong provenance");return r.value}(this,i,c).then(()=>new Promise((e,r)=>{a.onmessage=({data:t})=>{e(t)},a.onmessageerror=r,a.onerror=r,a.postMessage(t)})).finally(e);return function(t,e,r,n){if(t!==e)throw new TypeError("Private static access of wrong provenance");if(!r.writable)throw new TypeError("attempted to set read only private field");r.value=n}(this,i,c,r),n}componentDidMount(){this.translate()}componentDidUpdate(t){t.content!==this.props.content&&this.translate()}translate(){this.constructor.translate(this.props.content).then(t=>{this.setState({loading:!1,html:t})}).catch(t=>{console.error(t),this.setState({loading:!1,html:"<div data-ignore class='error'>Error when rendering markdown content</div>"})})}render(){return this.state.loading?Object(n.h)("p",{"data-ignore":!0},"Loading..."):Object(n.h)("output",s({"data-contents":!0,dangerouslySetInnerHTML:{__html:this.state.html}},this.props.attributes))}}var c={writable:!0,value:Promise.resolve()}},33:function(t,e,r){t.exports=function(){return new Worker(r.p+"25e8b5bb6f306b1d55e5.worker.js")}},35:function(t,e,r){var n={"./AsideList.js":[36,9],"./Footer.js":[37,2],"./NewsletterArticle.js":[38,3],"./OrderedList.js":[34,15],"./lazy-edit-compomponent.js":[31]};function o(t){if(!r.o(n,t))return Promise.resolve().then(function(){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e});var e=n[t],o=e[0];return Promise.all(e.slice(1).map(r.e)).then(function(){return r(o)})}o.keys=function(){return Object.keys(n)},o.id=35,t.exports=o}}]);