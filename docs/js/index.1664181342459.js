/* 
Tool Cool Range Slider Documentation
Author: Tool Cool, toolcool.org@gmail.com>                          
*/
(()=>{(()=>{var l=Y=>!isNaN(parseFloat(Y))&&isFinite(Y),x=(Y,S)=>l(Y)?Number(Y):S;window.tcRangeSliderPlugins=window.tcRangeSliderPlugins||[];var E=()=>{let Y=null,S=null,I=null,P=[],F=[],D=(h,H)=>{Object.prototype.hasOwnProperty.call(S,h)||Object.defineProperty(S,h,{get(){return P[H]},set:T=>{Q(H,T)}})},Q=(h,H)=>{let T=!!F[h];F[h]&&(F[h].textContent="");let G=document.querySelector(H);F[h]=G!=null?G:void 0,P[h]=H!=null?H:void 0,T||(h===0?(D("valueLabel",h),D("value0Label",h),D("value1Label",h)):D(`value${h+1}Label`,h)),typeof I=="function"&&I()},Z=()=>{var h,H,T,G,ne,ie,L;let O=(h=Y==null?void 0:Y.getValues())!=null?h:[];for(let $=0;$<O.length;$++){let M="";if($===0?(M=(H=S==null?void 0:S.getAttribute("value-label"))!=null?H:"",M||(M=(T=S==null?void 0:S.getAttribute("value0-label"))!=null?T:""),M||(M=(G=S==null?void 0:S.getAttribute("value1-label"))!=null?G:"")):M=(ne=S==null?void 0:S.getAttribute(`value${$+1}-label`))!=null?ne:"",!M){F[$]=void 0,P[$]=void 0;continue}let N=document.querySelector(M);if(!N){F[$]=void 0,P[$]=void 0;continue}F[$]=N,P[$]=M,N.textContent=(L=(ie=O[$])==null?void 0:ie.toString())!=null?L:"",$===0?(D("valueLabel",$),D("value0Label",$),D("value1Label",$)):D(`value${$+1}Label`,$)}typeof I=="function"&&I()};return{get name(){return"Binding Labels"},init:(h,H,T,G)=>{S=h,I=H,Y=G,Z()},update:h=>{var H;for(let T=0;T<h.values.length;T++){let G=F[T];if(!G)continue;let ne=(H=h.values[T])!=null?H:"";G.textContent=ne.toString()}},onAttrChange:(h,H)=>{if(/^value([0-9]*)-label$/.test(h)&&typeof I=="function"){let T=h.replace(/\D/g,"").trim(),G=T===""||T==="0"||T==="1"?0:x(T,0)-1;Q(G,H)}},destroy:()=>{for(let h of F)!h||h.remove()}}};window.tcRangeSliderPlugins.push(E);var V=E})();(()=>{var l=S=>S==null?!1:typeof S=="boolean"?S:S.trim().toLowerCase()==="true";window.tcRangeSliderPlugins=window.tcRangeSliderPlugins||[];var x="min-label",E="max-label",V=()=>{let S=null,I=null,P=null,F=!1,D=null,Q=null,Z=null,h=[],H=()=>{var L;let O=(L=S==null?void 0:S.shadowRoot)==null?void 0:L.querySelector(".range-slider-box");D=document.createElement("div"),D.classList.add("labels-row"),O.prepend(D)},T=L=>{let O=document.createElement("label");return O.className=L,O.setAttribute("for","range-slider"),O},G=()=>{var L,O,$;let M=(P==null?void 0:P.isRightToLeft())||(P==null?void 0:P.isBottomToTop());Q=T(x),Q.textContent=(L=P==null?void 0:P.getTextMin().toString())!=null?L:"",Z=T(E),Z.textContent=(O=P==null?void 0:P.getTextMax().toString())!=null?O:"",M?(I==null||I.after(Q),I==null||I.before(Z)):(I==null||I.before(Q),I==null||I.after(Z));let N=P==null?void 0:P.getValues();if(N)for(let ee=0;ee<N.length;ee++){let K=T(`value${ee+1}-label generated-label`);K.textContent=(($=N[ee])!=null?$:"").toString(),h.push(K),M?D==null||D.prepend(K):D==null||D.append(K)}},ne=()=>{for(let L of h)!L||L.remove();Q==null||Q.remove(),Z==null||Z.remove(),h=[]},ie=L=>{F=L,F?(H(),G()):ne()};return{get name(){return"Generated Labels"},init:(L,O,$,M)=>{var N;S=L,P=M,I=(N=L.shadowRoot)==null?void 0:N.getElementById("range-slider"),ie(l(S.getAttribute("generate-labels")))},update:L=>{var O,$;if(!(!F||!L.values)){for(let M=0;M<L.values.length;M++){let N=L.values[M],ee=h[M];if(N===void 0&&!!ee){ee.remove(),h[M]=void 0;continue}if(N!==void 0&&!ee){let K=T(`value${M+1}-label generated-label`);if(K.textContent=(N!=null?N:"").toString(),h[M]=K,L.values.length<=0)D==null||D.append(K);else{let fe=(P==null?void 0:P.isRightToLeft())||(P==null?void 0:P.isBottomToTop());if(M===0)fe?D==null||D.append(K):D==null||D.prepend(K);else{let ye=K[M-1];fe?ye.before(K):ye.after(K)}}continue}!ee||(ee.textContent=(N!=null?N:"").toString())}Q&&(Q.textContent=((O=L.textMin)!=null?O:"").toString()),Z&&(Z.textContent=(($=L.textMax)!=null?$:"").toString())}},onAttrChange:(L,O)=>{L==="generate-labels"&&ie(l(O))},gettersAndSetters:[{name:"generateLabels",attributes:{get(){return F!=null?F:!1},set:L=>{ie(l(L))}}}],css:`
    .labels-row{
      text-align: center;
      display: flex;
      justify-content: center;
    }
    
    .type-vertical .labels-row{
      flex-direction: column;
      order: 1;
    }
    
    .max-label,
    .min-label{
      margin: 0 1rem;
      width: 2rem;
      text-align: center;
      white-space: nowrap;
    }
    
    .generated-label{
      text-align: center;
      margin: 0 0.5rem;
      white-space: nowrap;
    }
    `,destroy:ne}};window.tcRangeSliderPlugins.push(V);var Y=V})();(()=>{var l=Object.defineProperty,x=Math.pow,E=(e,n,i)=>n in e?l(e,n,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[n]=i,V=(e,n,i)=>(E(e,typeof n!="symbol"?n+"":n,i),i),Y=(e,n)=>` ${n&&n.length>0?n.map(i=>`<link rel="stylesheet" href="${i}" />`).join(""):""} <style> ${e} </style> <div class="range-slider-box"> <div class="row"> <div id="range-slider" class="range-slider"> <div class="container"> <div class="panel"></div> <div class="panel-fill"></div> <div class="container"> <div class="pointer" tabindex="0" role="slider"> <div class="pointer-shape"></div> </div> </div> </div> </div> </div> </div>`,S=":host{--width:300px;--height:.25rem;--opacity:.4;--panel-bg:#4d69ad;--panel-bg-hover:#5f79b7;--panel-bg-fill:#000;--panel-bg-border-radius:1rem;--pointer-width:1rem;--pointer-height:1rem;--pointer-bg:#fff;--pointer-bg-hover:#dcdcdc;--pointer-bg-focus:#dcdcdc;--pointer-shadow:0 0 2px rgba(0,0,0,0.6);--pointer-shadow-hover:0 0 2px #000;--pointer-shadow-focus:0 0 2px #000;--pointer-border:1px solid hsla(0,0%,88%,0.5);--pointer-border-hover:1px solid hsla(0,0%,88%,0.5);--pointer-border-focus:1px solid hsl(201,72%,59%);--pointer-border-radius:100%;--animate-onclick:.3s}:host{max-width:100%}.range-slider-box{display:flex;position:relative;flex-direction:column}.range-slider{position:relative;width:var(--width,100%);height:var(--height,0.25rem);touch-action:none;max-width:100%;box-sizing:border-box}.row{width:100%;display:flex;align-items:center}.range-slider.disabled{opacity:var(--opacity,0.4)}.range-slider *{box-sizing:border-box}.container{position:absolute;width:100%;height:100%}.panel{position:absolute;z-index:10;width:100%;height:100%;background:var(--panel-bg,#2d4373);border-radius:var(--panel-bg-border-radius,1rem);overflow:hidden;transition:.3s all ease}.panel-fill{background:var(--panel-bg-fill,#000);border-radius:var(--panel-bg-border-radius,1rem);overflow:hidden;height:100%;position:absolute;z-index:10}.panel:hover{background:var(--panel-bg-hover,#5f79b7)}.disabled .panel:hover{background:var(--panel-bg,#5f79b7)}.pointer{position:absolute;z-index:20;outline:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.pointer-shape{background:var(--pointer-bg,#fff);background-size:contain;box-shadow:var(--pointer-shadow);cursor:pointer;border:var(--pointer-border);border-radius:var(--pointer-border-radius,100%);-webkit-transform:translateX(-50%);transform:translateX(-50%);width:var(--pointer-width,15px);height:var(--pointer-height,15px);transition:.3s all ease}.pointer-shape:hover{background:var(--pointer-bg-hover,#fff);background-size:contain;border:var(--pointer-border-hover);box-shadow:var(--pointer-shadow-hover)}.disabled .pointer-shape:hover{background:var(--pointer-bg,#fff);background-size:contain;border:var(--pointer-border);box-shadow:var(--pointer-shadow)}.pointer:focus .pointer-shape{background:var(--pointer-bg-focus,#fff);background-size:contain;border:var(--pointer-border-focus);box-shadow:var(--pointer-shadow-focus)}.disabled .pointer:focus .pointer-shape{background:var(--pointer-bg,#fff);background-size:contain;border:var(--pointer-border);box-shadow:var(--pointer-shadow)}.type-vertical .range-slider{--width:.25rem;--height:300px;max-height:100%}.type-vertical .range-slider .pointer{left:50%}.type-vertical .range-slider .panel-fill{width:100%}.type-vertical.range-slider-box{flex-direction:row}.type-vertical .row{flex-direction:column}.animate-on-click .pointer,.animate-on-click .panel-fill{transition:all var(--animate-onclick)}.range-dragging .panel-fill{cursor:move}",I="pointers-overlap",P="pointers-min-distance",F="pointers-max-distance",D="range-dragging",Q="data",Z="min",h="max",H="step",T="round",G="type",ne="theme",ie="rtl",L="btt",O="disabled",$="keyboard-disabled",M="slider-width",N="slider-height",ee="slider-radius",K="slider-bg",fe="slider-bg-hover",ye="slider-bg-fill",Ht="pointer-width",Ot="pointer-height",qt="pointer-radius",Nt="pointer-bg",zt="pointer-bg-hover",jt="pointer-bg-focus",Vt="pointer-shadow",Ft="pointer-shadow-hover",_t="pointer-shadow-focus",Wt="pointer-border",Gt="pointer-border-hover",Yt="pointer-border-focus",tt="animate-onclick",Xt="css-links",te="vertical",ce="horizontal",De=(e,n,i,r,a)=>{let p=n-e;return p===0?i:(r-i)*(a-e)/p+i},oe=e=>!isNaN(parseFloat(e))&&isFinite(e),q=(e,n)=>oe(e)?Number(e):n,nt=(e,n)=>n===0?0:Math.round(e/n)*n,Kt=(e,n=1/0)=>{if(n===1/0)return e;let i=x(10,n);return Math.round(e*i)/i},U=e=>e==null?!1:typeof e=="boolean"?e:e.trim().toLowerCase()==="true",Ut=(e,n)=>{e.dispatchEvent(new CustomEvent("onPointerClicked",{detail:{$pointer:n}}))},Jt=(e,n)=>{e.dispatchEvent(new CustomEvent("onMouseDown",{detail:{nativeEvent:n}}))},Qt=(e,n)=>{e.dispatchEvent(new CustomEvent("onMouseUp",{detail:{nativeEvent:n}}))},Zt=(e,n)=>{e.dispatchEvent(new CustomEvent("onKeyDown",{detail:{nativeEvent:n}}))},en=(e,n)=>{if(!n||n.length<=0)return;let i=n.map(a=>oe(a)?q(a,a):a),r={values:i||[]};r.value=i[0],r.value0=i[0],r.value1=i[0];for(let a=1;a<i.length;a++)r[`value${a+1}`]=i[a];e.dispatchEvent(new CustomEvent("change",{detail:r}))},Te=(e,n,i)=>{let r=0,a,p,v,s,d=!1,f=(m,z,j,R,_,W)=>{j!==void 0&&m>j&&(m=j),z!==void 0&&m<z&&(m=z),r=m;let X=r;(R===te&&W||R===ce&&_)&&(X=100-X),R===te?n.style.top=`${X}%`:n.style.left=`${X}%`},y=m=>m===n||n.contains(m),c=(m,z,j,R)=>{a=m,p=z,v=j,s=R},w=m=>{d=m,n.classList.toggle("disabled",d),d?n.setAttribute("aria-disabled","true"):n.hasAttribute("aria-disabled")&&n.removeAttribute("aria-disabled")},re=(m,z)=>{z==null?n.removeAttribute(m):n.setAttribute(m,z)},g=m=>n.getAttribute(m),b=m=>{if(!d){switch(m.key){case"ArrowLeft":{m.preventDefault(),typeof a=="function"&&a(i);break}case"ArrowRight":{m.preventDefault(),typeof p=="function"&&p(i);break}case"ArrowUp":{m.preventDefault(),typeof v=="function"&&v(i);break}case"ArrowDown":{m.preventDefault(),typeof s=="function"&&s(i);break}}Zt(e,m)}},C=()=>{d||Ut(e,n)};return n.className=`pointer pointer-${i}`,n.addEventListener("keydown",b),n.addEventListener("click",C),{$pointer:n,get percent(){return r},get disabled(){return d},set disabled(m){w(m)},updatePosition:f,isClicked:y,setCallbacks:c,setAttr:re,getAttr:g,destroy:()=>{n.removeEventListener("keydown",b),n.removeEventListener("click",C),n.remove()}}},tn=e=>{if(e==null)return;if(Array.isArray(e))return e;if(e.trim()==="")return;let n=e.split(","),i=[],r=!0;for(let a=0;a<n.length;a++){let p=n[a].trim();p!==""&&(i.push(p),oe(p)||(r=!1))}return r?i.map(a=>Number(a)):i},nn=(e,n)=>n?n.findIndex(i=>i===e||i.toString().trim()===e.toString().trim()):-1,rn=e=>({updatePosition:(n,i,r,a)=>{if(i.length<=0)return;let p=i.length===1,v=i[0],s=i[i.length-1];n===te?(e.style.removeProperty("width"),e.style.removeProperty("right"),e.style.removeProperty("left"),p?e.style.height=`${v}%`:e.style.height=`${Math.abs(v-s)}%`,a?(e.style.bottom="0%",p?e.style.top="auto":e.style.top=`${Math.min(100-s,100-v)}%`):(e.style.bottom="auto",p?e.style.top="0%":e.style.top=`${Math.min(v,s)}%`)):(e.style.removeProperty("height"),e.style.removeProperty("top"),e.style.removeProperty("bottom"),p?e.style.width=`${v}%`:e.style.width=`${Math.abs(v-s)}%`,r?(e.style.right="0%",p?e.style.left="auto":e.style.left=`${Math.min(100-s,100-v)}%`):(e.style.right="auto",p?e.style.left="0%":e.style.left=`${Math.min(v,s)}%`))}}),rt="--animate-onclick",ln="--width",on="--height",an="--panel-bg-border-radius",sn="--panel-bg",dn="--panel-bg-hover",un="--panel-bg-fill",cn="--pointer-width",pn="--pointer-height",gn="--pointer-border-radius",mn="--pointer-bg",vn="--pointer-bg-hover",hn="--pointer-bg-focus",bn="--pointer-shadow",fn="--pointer-shadow-hover",yn="--pointer-shadow-focus",xn="--pointer-border",En="--pointer-border-hover",Ln="--pointer-border-focus",xe=(e,n,i)=>{let r=new Map;for(let a of e.attributes){let p=a.nodeName.trim().toLowerCase();if(!n.test(p))continue;let v=p.replace(/\D/g,"").trim(),s=v===""||v==="0"||v==="1"?0:q(v,0)-1,d=i&&typeof i=="function"?i(a.value):a.value;r.set(s,d)}return r},wn=e=>{if(!e)return null;let n=e.getAttribute(Xt);if(!n)return null;let i=n.split(";"),r=[];for(let a of i)a.trim()!==""&&r.push(a.trim());return r},lt=[[ln,M,"sliderWidth",null],[on,N,"sliderHeight",null],[an,ee,"sliderRadius",null],[sn,K,"sliderBg",null],[dn,fe,"sliderBgHover",null],[un,ye,"sliderBgFill",null],[cn,Ht,"pointer#Width",/^pointer([0-9]*)-width$/],[pn,Ot,"pointer#Height",/^pointer([0-9]*)-height$/],[gn,qt,"pointer#Radius",/^pointer([0-9]*)-radius$/],[mn,Nt,"pointer#Bg",/^pointer([0-9]*)-bg$/],[vn,zt,"pointer#BgHover",/^pointer([0-9]*)-bg-hover$/],[hn,jt,"pointer#BgFocus",/^pointer([0-9]*)-bg-focus$/],[bn,Vt,"pointer#Shadow",/^pointer([0-9]*)-shadow$/],[fn,Ft,"pointer#ShadowHover",/^pointer([0-9]*)-shadow-hover$/],[yn,_t,"pointer#ShadowFocus",/^pointer([0-9]*)-shadow-focus$/],[xn,Wt,"pointer#Border",/^pointer([0-9]*)-border$/],[En,Gt,"pointer#BorderHover",/^pointer([0-9]*)-border-hover$/],[Ln,Yt,"pointer#BorderFocus",/^pointer([0-9]*)-border-focus$/]],kn=(e,n,i)=>{let r=null,a=[],p=new Map,v=g=>{let b=[...n.classList];for(let C of b)C.startsWith(g)&&n.classList.remove(C)},s=g=>{r=g,v("theme-"),typeof g=="string"&&n.classList.add(`theme-${g}`)},d=()=>{v("shape");for(let g=0;g<a.length;g++){let b=a[g];!b||n.classList.add("shape",`shape${g}-${b}`)}},f=(g,b)=>{a[g]=b,d()},y=()=>{let g=xe(e,/^pointer([0-9]*)-shape$/);v("shape");for(let b of g){let C=b[0];a[C]=b[1]}d()},c=(g,b)=>`${g}-${b}`,w=(g,b,C)=>{let m=i[C];if(!m)return;let z=C===0?n:m.$pointer;if(b==null){p.has(c(g,C))&&p.delete(c(g,C)),z.style.removeProperty(g);return}p.set(c(g,C),b),z.style.setProperty(g,b)},re=(g,b)=>p.get(c(g,b));return(()=>{for(let g of lt){let[b,C,m,z]=g;if(z){let R=xe(e,z);for(let _ of R){let W=_[0],X=_[1];w(b,X,W)}}else{let R=e.getAttribute(C);w(b,R,0)}let j=[];if(m.indexOf("#")===-1)j.push([m,0]);else{j.push([m.replace("#",""),0]),j.push([m.replace("#","0"),0]),j.push([m.replace("#","1"),0]);for(let R=1;R<i.length;R++)j.push([m.replace("#",(R+1).toString()),R])}for(let R of j)try{let _=R[0],W=R[1];Object.prototype.hasOwnProperty.call(e,_)||Object.defineProperty(e,_,{get(){return re(b,W)},set:X=>{w(b,X,W)}})}catch(_){console.error(_)}}s(e.getAttribute(ne)),y()})(),{setStyle:w,getStyle:re,get theme(){return r},set theme(g){s(g)},get pointerShapes(){return a},setPointerShape:f}},me="animate-on-click",it="range-dragging",Sn=(e,n,i,r)=>{let a=[],p=y=>{for(let c of a)c.update&&typeof c.update=="function"&&c.update(y)},v=()=>{for(let y of a)y.destroy&&typeof y.destroy=="function"&&y.destroy()},s=(y,c)=>{for(let w of a)w.onAttrChange&&typeof w.onAttrChange=="function"&&w.onAttrChange(y,c)},d=y=>{if(y.gettersAndSetters){for(let c of y.gettersAndSetters)if(!(!c.name||!c.attributes))try{Object.prototype.hasOwnProperty.call(e,c.name)||Object.defineProperty(e,c.name,c.attributes)}catch(w){console.error("defineSettersGetters error:",w)}}},f=y=>{var c;if(!y.css)return;let w=(c=e.shadowRoot)==null?void 0:c.querySelector("style");!w||(w.innerHTML+=y.css)};return{init:()=>{if(window.tcRangeSliderPlugins)for(let y of window.tcRangeSliderPlugins){let c=y();a.push(c),c.init&&typeof c.init=="function"&&(c.init(e,n,i,r),d(c),f(c))}},update:p,onAttrChange:s,destroy:v}},$n=(e,n)=>{let i=new Map,r=/^value([0-9]*)$/;for(let s of e.attributes){let d=s.nodeName.trim().toLowerCase();if(!r.test(d))continue;let f=d.replace("value","").trim(),y=f===""||f==="0"||f==="1"?0:q(f,0)-1,c=oe(s.value)?q(s.value,0):s.value;i.set(y,c)}let a=Math.max(...Array.from(i.keys())),p=[];p.push([Te(e,n,0),i.get(0)]);let v=n;for(let s=1;s<=a;s++){let d=n.cloneNode(!0);v.after(d),v=d,p.push([Te(e,d,s),i.get(s)])}return p},ot=(e,n,i,r,a,p,v)=>{try{Object.defineProperty(e,r,{configurable:!0,get(){if(!n)return;let s=n.pointers[i];if(!s)return;let d=n.getTextValue(s.percent);return oe(d)?q(d,d):d},set:s=>{n==null||n.setValue(s,i)}}),Object.defineProperty(e,a,{configurable:!0,get(){var s,d;return(d=(s=n==null?void 0:n.pointers[i])==null?void 0:s.getAttr("aria-label"))!=null?d:void 0},set:s=>{!n||n.setAriaLabel(i,s)}}),Object.defineProperty(e,p,{configurable:!0,get(){var s,d;return(d=(s=n==null?void 0:n.styles)==null?void 0:s.pointerShapes[i])!=null?d:null},set:s=>{!n||!n.styles||n.styles.setPointerShape(i,s)}}),Object.defineProperty(e,v,{configurable:!0,get(){var s;return(s=n==null?void 0:n.pointers[i].disabled)!=null?s:!1},set:s=>{if(!n)return;let d=n==null?void 0:n.pointers[i];!d||(d.disabled=s)}})}catch(s){console.error(s)}},Mn=(e,n)=>{let i=[["value","ariaLabel","pointerShape","pointerDisabled",0],["value0","ariaLabel0","pointerShape0","pointer0Disabled",0],["value1","ariaLabel1","pointerShape1","pointer1Disabled",0]];for(let r=1;r<n.pointers.length;r++)i.push([`value${r+1}`,`ariaLabel${r+1}`,`pointer${r+1}Shape`,`pointer${r+1}Disabled`,r]);for(let r of i)ot(e,n,r[4],r[0],r[1],r[2],r[3])},at=(e,n,i)=>{var r;let a=(r=i.shadowRoot)==null?void 0:r.querySelector(".container");if(a)for(let p of e)n?a.prepend(p.$pointer):a.append(p.$pointer)},Ae=0,ve=100,pe=2,Bn=(e,n,i)=>{let r=i.map(t=>t[0]),a=null,p=null,v=null,s=null,d=Ae,f=ve,y,c,w=ce,re=pe,g=!1,b=!1,C=!1,m=0,z=1/0,j=!1,R,_,W=!1,X=!1,se,st=[],dt=t=>{W||(t.preventDefault&&t.preventDefault(),ae(t),window.addEventListener("mousemove",ae),window.addEventListener("mouseup",Ce),Jt(e,t))},Ce=t=>{W||(R=void 0,_=void 0,window.removeEventListener("mousemove",ae),window.removeEventListener("mouseup",ae),se&&n.classList.add(me),Qt(e,t))},An=(t,o)=>{if(r.length<=0)return;if(r.length===1)return r[0].isClicked(t)&&se&&n.classList.remove(me),r[0];let u=Cn(t);if(j){let A=o,ue=Ee(A);ue!==void 0&&(A=nt(A,ue)),u?(R=A,_=0):R!==void 0&&(_=A-R,R=A)}if(!Pn(t)&&!u){for(let A of r)if(A.isClicked(t))return se&&n.classList.remove(me),A;for(let A of r)if(a===A)return A}let B=1/0,k=null;for(let A of r){let ue=Math.abs(o-A.percent);ue<B&&(B=ue,k=A)}return k},ut=()=>r.findIndex(t=>a===t&&!t.disabled),ae=t=>{let o;if(w===te){let{height:B,top:k}=n.getBoundingClientRect(),A=t.type.indexOf("mouse")!==-1?t.clientY:t.touches[0].clientY;o=Math.min(Math.max(0,A-k),B)*100/B}else{let{width:B,left:k}=n.getBoundingClientRect(),A=t.type.indexOf("mouse")!==-1?t.clientX:t.touches[0].clientX;o=Math.min(Math.max(0,A-k),B)*100/B}if((g||b)&&(o=100-o),a=An(t.target,o),j&&r.length>1&&_!==void 0){let B=r[0],k=r[r.length-1],A=B.percent+_<0,ue=k.percent+_>100;if(A||ue)return;J(0,B.percent+_),J(1,k.percent+_);return}let u=ut();u!==-1&&(J(u,o),a==null||a.$pointer.focus())},ct=t=>{if(W||document.activeElement!==e||(a==null?void 0:a.disabled))return;t.stopPropagation(),t.preventDefault();let o=t.deltaY<0,u=g||b,B=o?!u:u,k=ut();k!==-1&&(B?he(k,r[k].percent):be(k,r[k].percent))},pt=t=>{W||X||(w===te?b?J(t,100):J(t,0):g?be(t,r[t].percent):he(t,r[t].percent))},gt=t=>{W||X||(w===te?b?J(t,0):J(t,100):g?he(t,r[t].percent):be(t,r[t].percent))},mt=t=>{W||X||(w===te?b?be(t,r[t].percent):he(t,r[t].percent):g?J(t,100):J(t,0))},vt=t=>{W||X||(w===te?b?he(t,r[t].percent):be(t,r[t].percent):g?J(t,0):J(t,100))},Pn=t=>t.classList.contains("panel"),Cn=t=>t.classList.contains("panel-fill"),he=(t,o)=>{if(o===void 0)return;let u=Ee(o);u==null&&(u=1),o-=u,o<0&&(o=0),J(t,o)},be=(t,o)=>{if(o===void 0)return;let u=Ee(o);u==null&&(u=1),o+=u,o>100&&(o=100),J(t,o)},de=()=>{!s||s.update({percents:ht(),values:bt(),min:ft(),max:yt(),data:Ie(),step:Re(),round:Oe(),type:He(),textMin:Le(),textMax:we(),rightToLeft:ze(),bottomToTop:je(),pointersOverlap:_e(),pointersMinDistance:qe(),pointersMaxDistance:Ne(),rangeDragging:We(),disabled:Ve(),keyboardDisabled:Fe()})},Rn=()=>{de()},In=t=>{if(!(C||r.length<=1||f===d))if(t===0){let o=z*100/(f-d);return Math.max(0,r[t+1].percent-o)}else{let o=m*100/(f-d);return Math.min(r[t-1].percent+o,100)}},Hn=t=>{if(!(C||r.length<=1||f===d))if(t===r.length-1){let o=z*100/(f-d);return Math.min(r[t-1].percent+o,100)}else{let o=m*100/(f-d);return Math.max(0,r[t+1].percent-o)}},Ee=t=>{let o;if(typeof y=="function"){let u=De(0,100,d,f,t);o=y(u,t)}else o=y;if(oe(o)){let u=f-d;return o=u===0?0:o*100/u,o}},ge=t=>{if(t===void 0)return;let o=De(0,100,d,f,t);return c!==void 0?c[Math.round(o)]:Kt(o,re)},Le=()=>c!==void 0?c[d]:d,we=()=>c!==void 0?c[f]:f,Re=()=>y,On=t=>{var o;return t<=0||C?Le():(o=ge(r[t-1].percent))!=null?o:""},qn=t=>{var o;return r.length<=1||t>=r.length-1||C?we():(o=ge(r[t+1].percent))!=null?o:""},ht=()=>r.map(t=>t.percent),bt=()=>r.map(t=>ge(t.percent)),ft=()=>d,yt=()=>f,Ie=()=>c,He=()=>w,Oe=()=>re,qe=()=>m,Ne=()=>z,Nn=t=>st[t],ze=()=>g,je=()=>b,Ve=()=>W,Fe=()=>X,_e=()=>C,We=()=>j,J=(t,o)=>{if(o===void 0)return;let u=Ee(o);u!==void 0&&(o=nt(o,u));let B=r[t];if(B){B.updatePosition(o,In(t),Hn(t),w,g,b),p==null||p.updatePosition(w,r.map(k=>k.percent),g,b),de();for(let k of r){let A=ge(k.percent);A!==void 0&&(k.setAttr("aria-valuenow",A.toString()),k.setAttr("aria-valuetext",A.toString()))}jn(),en(e,r.map(k=>ge(k.percent)))}},le=()=>{for(let t=0;t<r.length;t++)J(t,r[t].percent)},zn=(t,o)=>{d=c!==void 0?0:q(t,Ae),f=c!==void 0?c.length-1:q(o,ve),ke(d),Se(f)},jn=()=>{var t,o;for(let u=0;u<r.length;u++){let B=r[u];B.setAttr("aria-valuemin",((t=On(u))!=null?t:"").toString()),B.setAttr("aria-valuemax",((o=qn(u))!=null?o:"").toString())}},ke=t=>{d=q(t,Ae),d>f&&(f=d+ve),le()},Se=t=>{f=q(t,ve),f<d&&(f=d+ve),le()},xt=t=>{C=!0;for(let o=0;o<t.length;o++)$e(t[o],o);C=!1;for(let o=0;o<t.length;o++)$e(t[o],o)},$e=(t,o)=>{let u;c!==void 0?(u=t==null?0:nn(t,c),u===-1&&(u=0)):(u=q(t,d),u<d&&(u=d),u>f&&(u=f));let B=De(d,f,0,100,u);J(o,B)},Me=t=>{if(t==null){y=void 0;return}if(typeof t=="function"){y=t,le();return}if(oe(t)){y=q(t,1);let o=Math.abs(f-d);y>o&&(y=void 0),le();return}y=void 0},Ge=t=>{C=t,le()},Ye=t=>{(!oe(t)||t<0)&&(t=0),m=t},Xe=t=>{(!oe(t)||t<0)&&(t=1/0),z=t},Ke=t=>{W=t,n.classList.toggle("disabled",W),W?n.setAttribute("aria-disabled","true"):n.hasAttribute("aria-disabled")&&n.removeAttribute("aria-disabled")},Et=t=>{X=t},Ue=t=>{if(t==null){c=void 0;return}if(c=tn(t),c===void 0||c.length<=0){c=void 0;return}ke(0),Se(c.length-1),y===void 0&&Me(1)},Je=t=>{var o;typeof t=="string"?w=t.trim().toLowerCase()===te?te:ce:w=ce;let u=(o=e.shadowRoot)==null?void 0:o.querySelector(".range-slider-box");if(!u)return;u.className=`range-slider-box type-${w}`,le();let B=w===te?"vertical":"horizontal";for(let k of r)k.setAttr("aria-orientation",B)},Qe=t=>{g=t,r.length>1&&at(r,g,e),le(),de()},Ze=t=>{b=t,r.length>1&&at(r,b,e),le(),de()},et=t=>{re=q(t,pe),re<0&&(re=pe),de()},Lt=t=>{t==null?(se=void 0,n.style.removeProperty(rt),n.classList.remove(me)):(se=t,n.style.setProperty(rt,se),n.classList.add(me))},wt=(t,o)=>{let u=r[t];!u||(u.setAttr("aria-label",o),st[t]=o)},Be=t=>{if(R=void 0,r.length<=1){j=!1,n.classList.remove(it);return}j=t,n.classList.toggle(it,j)},Vn=()=>{Ke(U(e.getAttribute(O))),X=U(e.getAttribute($));let t=xe(e,/^pointer([0-9]*)-disabled$/,o=>U(o));for(let o of t){let u=o[0];!r[u]||(r[u].disabled=o[1])}},Fn=()=>{let t=xe(e,/^aria-label([0-9]*)$/);for(let o of t){let u=o[0];wt(u,o[1])}},_n=t=>{let o=r.length,u=r[o-1].$pointer,B=u.cloneNode(!0);u.after(B);let k=Te(e,B,o);return k.setCallbacks(pt,gt,mt,vt),r.push(k),$e(t,o),le(),de(),o},Wn=()=>{let t=r.length,o=r[t-1];return o?(o.destroy(),r.pop(),r.length<=1&&Be(!1),le(),de(),t-1):-1};return(()=>{var t;for(let u of r)u.setCallbacks(pt,gt,mt,vt);let o=(t=e.shadowRoot)==null?void 0:t.querySelector(".panel-fill");o&&(p=rn(o)),Je(e.getAttribute(G)),Qe(U(e.getAttribute(ie))),Ze(U(e.getAttribute(L))),zn(e.getAttribute(Z),e.getAttribute(h)),Me(e.getAttribute(H)),Ue(e.getAttribute(Q)),xt(i.map(u=>u[1])),Ge(U(e.getAttribute(I))),Ye(q(e.getAttribute(P),0)),Xe(q(e.getAttribute(F),1/0)),Be(U(e.getAttribute(D))),et(q(e.getAttribute(T),pe)),Vn(),Fn(),v=kn(e,n,r),Lt(e.getAttribute(tt)),n.addEventListener("mousedown",dt),n.addEventListener("mouseup",Ce),n.addEventListener("touchmove",ae),n.addEventListener("touchstart",ae),document.addEventListener("wheel",ct,{passive:!1}),s=Sn(e,Rn,{setValues:xt,setMin:ke,setMax:Se,setStep:Me,setPointersOverlap:Ge,setPointersMinDistance:Ye,setPointersMaxDistance:Xe,setDisabled:Ke,setType:Je,setRightToLeft:Qe,setBottomToTop:Ze,setRound:et,setKeyboardDisabled:Et,setRangeDragging:Be,setData:Ue},{getPercents:ht,getValues:bt,getMin:ft,getMax:yt,getStep:Re,getData:Ie,getType:He,getRound:Oe,getTextMin:Le,getTextMax:we,isRightToLeft:ze,isBottomToTop:je,isDisabled:Ve,isKeyboardDisabled:Fe,isPointersOverlap:_e,isRangeDraggingEnabled:We,getPointersMinDistance:qe,getPointersMaxDistance:Ne}),s.init()})(),{get pointers(){return r},get styles(){return v},get pluginsManager(){return s},get min(){return Le()},get max(){return we()},get step(){return Re()},get pointersOverlap(){return _e()},set pointersOverlap(t){Ge(t)},get pointersMinDistance(){return qe()},set pointersMinDistance(t){Ye(t)},get pointersMaxDistance(){return Ne()},set pointersMaxDistance(t){Xe(t)},get disabled(){return Ve()},set disabled(t){Ke(t)},get data(){return Ie()},get type(){return He()},set type(t){Je(t)},get rightToLeft(){return ze()},set rightToLeft(t){Qe(t)},get bottomToTop(){return je()},set bottomToTop(t){Ze(t)},get round(){return Oe()},set round(t){et(t)},get animateOnClick(){return se},set animateOnClick(t){Lt(t)},get keyboardDisabled(){return Fe()},set keyboardDisabled(t){Et(t)},get rangeDragging(){return We()},set rangeDragging(t){Be(t)},setMin:ke,setMax:Se,setValue:$e,setStep:Me,setData:Ue,getTextValue:ge,setAriaLabel:wt,getAriaLabel:Nn,addPointer:_n,removePointer:Wn,destroy:()=>{n.removeEventListener("mousedown",dt),n.removeEventListener("mouseup",Ce),n.removeEventListener("touchmove",ae),n.removeEventListener("touchstart",ae),document.removeEventListener("wheel",ct);for(let t of r)t.destroy();s==null||s.destroy()}}},Dn=(e,n,i)=>{let r=lt.find(([s,d,f,y])=>d.replace("#","")===n.replace(/\d+/g,""));if(r&&e.styles){let[s,d,f,y]=r,c=n.replace(/\D/g,"").trim(),w=c===""||c==="0"||c==="1"?0:q(c,0)-1;e.styles.setStyle(s,i,w);return}switch(e&&e.pluginsManager&&e.pluginsManager.onAttrChange(n,i),n){case Z:{e.setMin(i);break}case h:{e.setMax(i);break}case H:{e.setStep(i);break}case I:{e.pointersOverlap=U(i);break}case P:{e.pointersMinDistance=q(i,0);break}case D:{e.rangeDragging=U(i);break}case F:{e.pointersMaxDistance=q(i,1/0);break}case O:{e.disabled=U(i);break}case $:{e.keyboardDisabled=U(i);break}case Q:{e.setData(i);break}case G:{e.type=i;break}case ie:{e.rightToLeft=U(i);break}case L:{e.bottomToTop=U(i);break}case T:{e.round=q(i,pe);break}case ne:{e.styles&&(e.styles.theme=i);break}case tt:{e.animateOnClick=i;break}}let a=null;if(/^value([0-9]*)$/.test(n)&&(a="value"),/^pointer([0-9]*)-disabled$/.test(n)&&(a="pointer-disabled"),/^aria-label([0-9]*)$/.test(n)&&(a="aria-label"),/^pointer([0-9]*)-shape$/.test(n)&&(a="pointer-shape"),!a)return;let p=n.replace(/\D/g,"").trim(),v=p===""||p==="0"||p==="1"?0:q(p,0)-1;switch(a){case"value":{e.setValue(i,v);break}case"pointer-disabled":{let s=e==null?void 0:e.pointers[v];if(!s)return;s.disabled=U(i);break}case"aria-label":{e.setAriaLabel(v,i);break}case"pointer-shape":{e.styles&&e.styles.setPointerShape(v,i);break}}},Tn=class extends HTMLElement{constructor(){super(),V(this,"slider"),V(this,"_externalCSSList",[]),V(this,"_observer",null),this.attachShadow({mode:"open"})}set step(e){this.slider&&this.slider.setStep(e)}get step(){var e;return(e=this.slider)==null?void 0:e.step}set disabled(e){this.slider&&(this.slider.disabled=e)}get disabled(){var e,n;return(n=(e=this.slider)==null?void 0:e.disabled)!=null?n:!1}set data(e){var n;(n=this.slider)==null||n.setData(e)}get data(){var e;return(e=this.slider)==null?void 0:e.data}set min(e){var n;(n=this.slider)==null||n.setMin(e)}get min(){var e;return(e=this.slider)==null?void 0:e.min}set max(e){var n;(n=this.slider)==null||n.setMax(e)}get max(){var e;return(e=this.slider)==null?void 0:e.max}set round(e){!this.slider||(this.slider.round=e)}get round(){var e,n;return(n=(e=this.slider)==null?void 0:e.round)!=null?n:pe}set type(e){!this.slider||(this.slider.type=e!=null?e:ce)}get type(){var e;return((e=this.slider)==null?void 0:e.type)||ce}set pointersOverlap(e){!this.slider||(this.slider.pointersOverlap=e)}get pointersOverlap(){var e,n;return(n=(e=this.slider)==null?void 0:e.pointersOverlap)!=null?n:!1}set pointersMinDistance(e){!this.slider||(this.slider.pointersMinDistance=e)}get pointersMinDistance(){var e,n;return(n=(e=this.slider)==null?void 0:e.pointersMinDistance)!=null?n:0}set pointersMaxDistance(e){!this.slider||(this.slider.pointersMaxDistance=e)}get pointersMaxDistance(){var e,n;return(n=(e=this.slider)==null?void 0:e.pointersMaxDistance)!=null?n:1/0}set theme(e){!this.slider||!this.slider.styles||(this.slider.styles.theme=e)}get theme(){var e,n,i;return(i=(n=(e=this.slider)==null?void 0:e.styles)==null?void 0:n.theme)!=null?i:null}set rtl(e){!this.slider||(this.slider.rightToLeft=e)}get rtl(){var e,n;return(n=(e=this.slider)==null?void 0:e.rightToLeft)!=null?n:!1}set btt(e){!this.slider||(this.slider.bottomToTop=e)}get btt(){var e,n;return(n=(e=this.slider)==null?void 0:e.bottomToTop)!=null?n:!1}set keyboardDisabled(e){!this.slider||(this.slider.keyboardDisabled=e)}get keyboardDisabled(){var e,n;return(n=(e=this.slider)==null?void 0:e.keyboardDisabled)!=null?n:!1}set animateOnClick(e){!this.slider||(this.slider.animateOnClick=e)}get animateOnClick(){var e;return(e=this.slider)==null?void 0:e.animateOnClick}get rangeDragging(){var e,n;return(n=(e=this.slider)==null?void 0:e.rangeDragging)!=null?n:!1}set rangeDragging(e){this.slider&&(this.slider.rangeDragging=U(e))}get externalCSSList(){return this._externalCSSList}addPointer(e){var n;if(!this.slider)return;let i=(n=this.slider)==null?void 0:n.addPointer(e);ot(this,this.slider,i,`value${i+1}`,`ariaLabel${i+1}`,`pointerShape${i+1}`,`pointer${i+1}Disabled`)}removePointer(){var e;!this.slider||(e=this.slider)==null||e.removePointer()}connectedCallback(){var e,n;if(!this.shadowRoot)return;this._externalCSSList=wn(this),this.shadowRoot.innerHTML=Y(S,this._externalCSSList);let i=(e=this.shadowRoot)==null?void 0:e.querySelector(".pointer");if(!i)return;let r=(n=this.shadowRoot)==null?void 0:n.getElementById("range-slider");if(!r)return;let a=$n(this,i);this.slider=Bn(this,r,a),Mn(this,this.slider),this._observer=new MutationObserver(p=>{p.forEach(v=>{var s;if(!this.slider||v.type!=="attributes")return;let d=v.attributeName;!d||Dn(this.slider,d,(s=this.getAttribute(d))!=null?s:"")})}),this._observer.observe(this,{attributes:!0})}disconnectedCallback(){this._observer&&this._observer.disconnect(),this.slider&&this.slider.destroy()}},Pe=Tn;window.tcRangeSlider=Pe,customElements.get("toolcool-range-slider")||customElements.define("toolcool-range-slider",Pe),customElements.get("tc-range-slider")||customElements.define("tc-range-slider",class extends Pe{})})();var kt=()=>{if(!!document.querySelector('[data-examples="get-set-values"]')){try{let l=document.getElementById("slider-1"),x=document.getElementById("label-1");l.addEventListener("change",E=>{x.textContent=E.detail.value}),l.value=50}catch(l){console.error(l)}try{let l=document.getElementById("slider-2"),x=document.getElementById("label-2"),E=document.getElementById("label-3");l.addEventListener("change",V=>{x.textContent=V.detail.value,E.textContent=V.detail.value2}),l.value1=40,l.value2=80}catch(l){console.error(l)}}},St=()=>{if(!!document.querySelector('[data-examples="auto-binding-values"]'))try{let l=document.getElementById("slider-2");l.valueLabel=".value-22"}catch(l){console.error(l)}},$t=()=>{if(!!document.querySelector('[data-examples="auto-generated-labels"]'))try{let l=document.getElementById("slider-3");if(!l)return;let x=document.getElementById("toggle-gen-labels");if(!x)return;x.addEventListener("click",()=>{let E=l;E.generateLabels=!E.generateLabels})}catch(l){console.error(l)}},Mt=()=>{if(!!document.querySelector('[data-examples="min-max"]'))try{let l=document.getElementById("slider-4"),x=document.getElementById("set-min-max-btn"),E=document.getElementById("set-min-max-btn-reset");x.addEventListener("click",()=>{l.min=-200,l.max=200}),E.addEventListener("click",()=>{l.min=-500,l.max=500})}catch(l){console.error(l)}},Bt=()=>{if(!!document.querySelector('[data-examples="rounding"]'))try{let l=document.getElementById("slider-5"),x=document.getElementById("rounding-btn"),E=document.getElementById("rounding-reset");x.addEventListener("click",()=>{l.round=0}),E.addEventListener("click",()=>{l.round=2})}catch(l){console.error(l)}},Dt=()=>{if(!!document.querySelector('[data-examples="step"]'))try{let l=document.getElementById("slider-6"),x=document.getElementById("step-btn"),E=document.getElementById("step-reset");x.addEventListener("click",()=>{l.step=10}),E.addEventListener("click",()=>{l.step=void 0})}catch(l){console.error(l)}},Tt=()=>{if(!!document.querySelector('[data-examples="non-linear-step"]'))try{let l=document.getElementById("slider-7");l.step=(x,E)=>x<50?5:10}catch(l){console.error(l)}},At=()=>{if(!!document.querySelector('[data-examples="data"]'))try{let l=document.getElementById("slider-8"),x=document.getElementById("data-btn"),E=document.getElementById("data-reset");x.addEventListener("click",()=>{l.data=["red","green","blue","yellow","pink","brown","silver","white","black"]}),E.addEventListener("click",()=>{l.data=[0,10,20,30,40,50,60,70,80,90,100]})}catch(l){console.error(l)}},Pt=()=>{if(!!document.querySelector('[data-examples="width-height-border-radius"]'))try{let l=document.getElementById("slider-9"),x=document.getElementById("styles-btn"),E=document.getElementById("styles-reset");x.addEventListener("click",()=>{l.sliderWidth="200px",l.sliderHeight="0.7rem",l.sliderRadius=0,l.pointerWidth="1.8rem",l.pointerHeight="1.8rem",l.pointerRadius=0,l.pointer2Width="1.3rem",l.pointer2Height="1.3rem",l.pointer2Radius="1rem"}),E.addEventListener("click",()=>{l.sliderWidth="300px",l.sliderHeight="0.25rem",l.sliderRadius="1rem",l.pointerWidth="1rem",l.pointerHeight="1rem",l.pointerRadius="100%",l.pointer2Width="1rem",l.pointer2Height="1rem",l.pointer2Radius="100%"})}catch(l){console.error(l)}},Ct=()=>{if(!!document.querySelector('[data-examples="colors"]'))try{let l=document.getElementById("slider-10"),x=document.getElementById("color-btn"),E=document.getElementById("color-reset");x.addEventListener("click",()=>{l.sliderBg="#efefef",l.sliderBgHover="#ddd",l.sliderBgFill="#ccc",l.pointer1Bg="red",l.pointer2Bg="green",l.pointer3Bg="blue",l.pointer1Border="none",l.pointer2Border="none",l.pointer3Border="none"}),E.addEventListener("click",()=>{l.sliderBg=void 0,l.sliderBgHover=void 0,l.sliderBgFill=void 0,l.pointer1Bg=void 0,l.pointer2Bg=void 0,l.pointer3Bg=void 0,l.pointer1Border=void 0,l.pointer2Border=void 0,l.pointer3Border=void 0})}catch(l){console.error(l)}},Rt=()=>{if(!!document.querySelector('[data-examples="themes"]'))try{let l=document.getElementById("slider-11"),x=document.getElementById("rect-btn"),E=document.getElementById("glass-btn"),V=document.getElementById("circle-btn"),Y=document.getElementById("rainbow-btn");x.addEventListener("click",()=>{l.theme="rect"}),E.addEventListener("click",()=>{l.theme="glass"}),V.addEventListener("click",()=>{l.theme="circle"}),Y.addEventListener("click",()=>{l.theme="rainbow"})}catch(l){console.error(l)}},It=()=>{if(!!document.querySelector('[data-examples="pointer-shapes"]'))try{let l=document.getElementById("slider-12"),x=document.getElementById("shape-triangle-btn"),E=document.getElementById("shape-star-btn"),V=document.getElementById("shape-rhombus-btn"),Y=document.getElementById("shape-trapezoid-btn"),S=document.getElementById("shape-parallelogram-btn"),I=document.getElementById("shape-right-arrow-btn");x.addEventListener("click",()=>{l.pointerShape="triangle"}),E.addEventListener("click",()=>{l.pointerShape="star"}),V.addEventListener("click",()=>{l.pointerShape="rhombus"}),Y.addEventListener("click",()=>{l.pointerShape="trapezoid"}),S.addEventListener("click",()=>{l.pointerShape="parallelogram"}),I.addEventListener("click",()=>{l.pointerShape="right-arrow"})}catch(l){console.error(l)}};var Gn=()=>{let l=document.getElementById("mobile-menu-btn");if(!l)return;l.addEventListener("click",V=>{V.stopPropagation(),document.body.classList.toggle("mobile-menu-opened")}),document.body.addEventListener("click",()=>{document.body.classList.remove("mobile-menu-opened")});let x=document.getElementById("side-menu");if(!x)return;x.addEventListener("click",V=>{V.stopPropagation()});let E=document.getElementById("mobile-menu-close-btn");!E||E.addEventListener("click",()=>{document.body.classList.remove("mobile-menu-opened")})},Yn=()=>{Gn(),kt(),St(),$t(),Mt(),Bt(),Dt(),Tt(),At(),Pt(),Ct(),Rt(),It()};document.addEventListener("DOMContentLoaded",()=>{Yn()});})();
//# sourceMappingURL=index.1664181342459.js.map
