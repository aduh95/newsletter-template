(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{24:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return h}));var o=n(0),a=n(1);function s(e,t){if(!Object.prototype.hasOwnProperty.call(e,t))throw new TypeError("attempted to use private field on non-instance");return e}var r=0;function i(e){return"__private_"+r+++"_"+e}class h extends a.a{constructor(...e){super(...e),this.state={newComponent:null},Object.defineProperty(this,p,{writable:!0,value:Object(o.g)()}),Object.defineProperty(this,d,{writable:!0,value:this.handleChange.bind(this)})}addNewComponent(e){this.props.onChange(e),this.setState({newComponent:null})}handleChange(e){const{target:t}=e,{value:a}=t;t.selectedIndex=0,n(16)(`./${a}.js`).then(e=>e.default).then(e=>{this.setState({newComponent:Object(o.h)(e,{type:a,resetState:()=>this.setState({newComponent:null},()=>requestAnimationFrame(()=>{var e;return null===(e=s(this,p)[p].current)||void 0===e?void 0:e.focus()})),saveState:this.addNewComponent.bind(this)})})}).catch(this.addNewComponent.bind(this,{type:a}))}render(){return Object(o.h)(o.b,null,Object(o.h)("select",{"data-ignore":!0,"data-do-not-export":!0,onChange:s(this,d)[d],ref:s(this,p)[p],style:"width:100%"},Object(o.h)("option",null,"Add new component"),this.props.components.map(e=>Object(o.h)("option",{value:e},e))),this.state.newComponent)}}var p=i("selectRef"),d=i("handleChange")}}]);