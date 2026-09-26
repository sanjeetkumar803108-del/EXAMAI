const Z6="modulepreload",ep=function(n,e){return new URL(n,e).href},G1={},tp=function(e,t,r){let s=Promise.resolve();if(t&&t.length>0){let o=function(f){return Promise.all(f.map(p=>Promise.resolve(p).then(w=>({status:"fulfilled",value:w}),w=>({status:"rejected",reason:w}))))};const c=document.getElementsByTagName("link"),u=document.querySelector("meta[property=csp-nonce]"),h=u?.nonce||u?.getAttribute("nonce");s=o(t.map(f=>{if(f=ep(f,r),f in G1)return;G1[f]=!0;const p=f.endsWith(".css"),w=p?'[rel="stylesheet"]':"";if(!!r)for(let L=c.length-1;L>=0;L--){const x=c[L];if(x.href===f&&(!p||x.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${f}"]${w}`))return;const P=document.createElement("link");if(P.rel=p?"stylesheet":Z6,p||(P.as="script"),P.crossOrigin="",P.href=f,h&&P.setAttribute("nonce",h),document.head.appendChild(P),p)return new Promise((L,x)=>{P.addEventListener("load",L),P.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${f}`)))})}))}function i(o){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=o,window.dispatchEvent(c),!c.defaultPrevented)throw o}return s.then(o=>{for(const c of o||[])c.status==="rejected"&&i(c.reason);return e().catch(i)})};/*! Capacitor: https://capacitorjs.com/ - MIT License */var Or;(function(n){n.Unimplemented="UNIMPLEMENTED",n.Unavailable="UNAVAILABLE"})(Or||(Or={}));class Ua extends Error{constructor(e,t,r){super(e),this.message=e,this.code=t,this.data=r}}const np=n=>{var e,t;return n?.androidBridge?"android":!((t=(e=n?.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||t===void 0)&&t.bridge?"ios":"web"},rp=n=>{const e=n.CapacitorCustomPlatform||null,t=n.Capacitor||{},r=t.Plugins=t.Plugins||{},s=()=>e!==null?e.name:np(n),i=()=>s()!=="web",o=p=>{const w=h.get(p);return!!(w?.platforms.has(s())||c(p))},c=p=>{var w;return(w=t.PluginHeaders)===null||w===void 0?void 0:w.find(b=>b.name===p)},u=p=>n.console.error(p),h=new Map,f=(p,w={})=>{const b=h.get(p);if(b)return console.warn(`Capacitor plugin "${p}" already registered. Cannot register plugins twice.`),b.proxy;const P=s(),L=c(p);let x;const z=async()=>(!x&&P in w?x=typeof w[P]=="function"?x=await w[P]():x=w[P]:e!==null&&!x&&"web"in w&&(x=typeof w.web=="function"?x=await w.web():x=w.web),x),te=(g,E)=>{var R,I;if(L){const C=L?.methods.find(_=>E===_.name);if(C)return C.rtype==="promise"?_=>t.nativePromise(p,E.toString(),_):(_,Le)=>t.nativeCallback(p,E.toString(),_,Le);if(g)return(R=g[E])===null||R===void 0?void 0:R.bind(g)}else{if(g)return(I=g[E])===null||I===void 0?void 0:I.bind(g);throw new Ua(`"${p}" plugin is not implemented on ${P}`,Or.Unimplemented)}},re=g=>{let E;const R=(...I)=>{const C=z().then(_=>{const Le=te(_,g);if(Le){const wt=Le(...I);return E=wt?.remove,wt}else throw new Ua(`"${p}.${g}()" is not implemented on ${P}`,Or.Unimplemented)});return g==="addListener"&&(C.remove=async()=>E()),C};return R.toString=()=>`${g.toString()}() { [capacitor code] }`,Object.defineProperty(R,"name",{value:g,writable:!1,configurable:!1}),R},he=re("addListener"),Ve=re("removeListener"),Ee=(g,E)=>{const R=he({eventName:g},E),I=async()=>{const _=await R;Ve({eventName:g,callbackId:_},E)},C=new Promise(_=>R.then(()=>_({remove:I})));return C.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await I()},C},A=new Proxy({},{get(g,E){switch(E){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return L?Ee:he;case"removeListener":return Ve;default:return re(E)}}});return r[p]=A,h.set(p,{name:p,proxy:A,platforms:new Set([...Object.keys(w),...L?[P]:[]])}),A};return t.convertFileSrc||(t.convertFileSrc=p=>p),t.getPlatform=s,t.handleError=u,t.isNativePlatform=i,t.isPluginAvailable=o,t.registerPlugin=f,t.Exception=Ua,t.DEBUG=!!t.DEBUG,t.isLoggingEnabled=!!t.isLoggingEnabled,t},sp=n=>n.Capacitor=rp(n),rc=sp(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),So=rc.registerPlugin;class Po{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let r=!1;this.listeners[e]||(this.listeners[e]=[],r=!0),this.listeners[e].push(t);const i=this.windowListeners[e];i&&!i.registered&&this.addWindowListener(i),r&&this.sendRetainedArgumentsForEvent(e);const o=async()=>this.removeListener(e,t);return Promise.resolve({remove:o})}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,r){const s=this.listeners[e];if(!s){if(r){let i=this.retainedEventArguments[e];i||(i=[]),i.push(t),this.retainedEventArguments[e]=i}return}s.forEach(i=>i(t))}hasListeners(e){var t;return!!(!((t=this.listeners[e])===null||t===void 0)&&t.length)}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:r=>{this.notifyListeners(t,r)}}}unimplemented(e="not implemented"){return new rc.Exception(e,Or.Unimplemented)}unavailable(e="not available"){return new rc.Exception(e,Or.Unavailable)}async removeListener(e,t){const r=this.listeners[e];if(!r)return;const s=r.indexOf(t);this.listeners[e].splice(s,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){const t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(r=>{this.notifyListeners(e,r)}))}}const W1=n=>encodeURIComponent(n).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),z1=n=>n.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class ip extends Po{async getCookies(){const e=document.cookie,t={};return e.split(";").forEach(r=>{if(r.length<=0)return;let[s,i]=r.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=z1(s).trim(),i=z1(i).trim(),t[s]=i}),t}async setCookie(e){try{const t=W1(e.key),r=W1(e.value),s=e.expires?`; expires=${e.expires.replace("expires=","")}`:"",i=(e.path||"/").replace("path=",""),o=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${t}=${r||""}${s}; path=${i}; ${o};`}catch(t){return Promise.reject(t)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(t){return Promise.reject(t)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const t of e)document.cookie=t.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}So("CapacitorCookies",{web:()=>new ip});const op=async n=>new Promise((e,t)=>{const r=new FileReader;r.onload=()=>{const s=r.result;e(s.indexOf(",")>=0?s.split(",")[1]:s)},r.onerror=s=>t(s),r.readAsDataURL(n)}),ap=(n={})=>{const e=Object.keys(n);return Object.keys(n).map(s=>s.toLocaleLowerCase()).reduce((s,i,o)=>(s[i]=n[e[o]],s),{})},cp=(n,e=!0)=>n?Object.entries(n).reduce((r,s)=>{const[i,o]=s;let c,u;return Array.isArray(o)?(u="",o.forEach(h=>{c=e?encodeURIComponent(h):h,u+=`${i}=${c}&`}),u.slice(0,-1)):(c=e?encodeURIComponent(o):o,u=`${i}=${c}`),`${r}&${u}`},"").substr(1):null,up=(n,e={})=>{const t=Object.assign({method:n.method||"GET",headers:n.headers},e),s=ap(n.headers)["content-type"]||"";if(typeof n.data=="string")t.body=n.data;else if(s.includes("application/x-www-form-urlencoded")){const i=new URLSearchParams;for(const[o,c]of Object.entries(n.data||{}))i.set(o,c);t.body=i.toString()}else if(s.includes("multipart/form-data")||n.data instanceof FormData){const i=new FormData;if(n.data instanceof FormData)n.data.forEach((c,u)=>{i.append(u,c)});else for(const c of Object.keys(n.data))i.append(c,n.data[c]);t.body=i;const o=new Headers(t.headers);o.delete("content-type"),t.headers=o}else(s.includes("application/json")||typeof n.data=="object")&&(t.body=JSON.stringify(n.data));return t};class lp extends Po{async request(e){const t=up(e,e.webFetchExtra),r=cp(e.params,e.shouldEncodeUrlParams),s=r?`${e.url}?${r}`:e.url,i=await fetch(s,t),o=i.headers.get("content-type")||"";let{responseType:c="text"}=i.ok?e:{};o.includes("application/json")&&(c="json");let u,h;switch(c){case"arraybuffer":case"blob":h=await i.blob(),u=await op(h);break;case"json":u=await i.json();break;case"document":case"text":default:u=await i.text()}const f={};return i.headers.forEach((p,w)=>{f[w]=p}),{data:u,headers:f,status:i.status,url:i.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}So("CapacitorHttp",{web:()=>new lp});var K1;(function(n){n.Dark="DARK",n.Light="LIGHT",n.Default="DEFAULT"})(K1||(K1={}));var Y1;(function(n){n.StatusBar="StatusBar",n.NavigationBar="NavigationBar"})(Y1||(Y1={}));class hp extends Po{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}So("SystemBars",{web:()=>new hp});/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dp=()=>{};var Q1={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jh=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},fp=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],o=n[t++],c=n[t++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],o=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Zh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],o=s+1<n.length,c=o?n[s+1]:0,u=s+2<n.length,h=u?n[s+2]:0,f=i>>2,p=(i&3)<<4|c>>4;let w=(c&15)<<2|h>>6,b=h&63;u||(b=64,o||(w=64)),r.push(t[f],t[p],t[w],t[b])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Jh(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):fp(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const h=s<n.length?t[n.charAt(s)]:64;++s;const p=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||h==null||p==null)throw new pp;const w=i<<2|c>>4;if(r.push(w),h!==64){const b=c<<4&240|h>>2;if(r.push(b),p!==64){const P=h<<6&192|p;r.push(P)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class pp extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const mp=function(n){const e=Jh(n);return Zh.encodeByteArray(e,!0)},so=function(n){return mp(n).replace(/\./g,"")},e2=function(n){try{return Zh.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gp(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _p=()=>gp().__FIREBASE_DEFAULTS__,Ep=()=>{if(typeof process>"u"||typeof Q1>"u")return;const n=Q1.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},yp=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&e2(n[1]);return e&&JSON.parse(e)},bo=()=>{try{return dp()||_p()||Ep()||yp()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},t2=n=>bo()?.emulatorHosts?.[n],n2=n=>{const e=t2(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},r2=()=>bo()?.config,s2=n=>bo()?.[`_${n}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i2{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function o2(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[so(JSON.stringify(t)),so(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ze(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function wp(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ze())}function Ip(){const n=bo()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Tp(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Ap(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Rp(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function vp(){const n=Ze();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Cp(){return!Ip()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Sp(){try{return typeof indexedDB=="object"}catch{return!1}}function Pp(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bp="FirebaseError";class Kt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=bp,Object.setPrototypeOf(this,Kt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,si.prototype.create)}}class si{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?Np(i,r):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new Kt(s,c,r)}}function Np(n,e){return n.replace(Op,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Op=/\{\$([^}]+)}/g;function kp(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function kn(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],o=e[s];if(X1(i)&&X1(o)){if(!kn(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function X1(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fr(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function _s(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Es(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Dp(n,e){const t=new Vp(n,e);return t.subscribe.bind(t)}class Vp{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Lp(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Fa),s.error===void 0&&(s.error=Fa),s.complete===void 0&&(s.complete=Fa);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Lp(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Fa(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function J(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function No(n){return(await fetch(n,{credentials:"include"})).ok}class Dn{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const er="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xp{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new i2;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Up(e))try{this.getOrInitializeService({instanceIdentifier:er})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=er){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=er){return this.instances.has(e)}getOptions(e=er){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&o.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Mp(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=er){return this.component?this.component.multipleInstances?e:er:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Mp(n){return n===er?void 0:n}function Up(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fp{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new xp(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var oe;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(oe||(oe={}));const Bp={debug:oe.DEBUG,verbose:oe.VERBOSE,info:oe.INFO,warn:oe.WARN,error:oe.ERROR,silent:oe.SILENT},$p=oe.INFO,Hp={[oe.DEBUG]:"log",[oe.VERBOSE]:"log",[oe.INFO]:"info",[oe.WARN]:"warn",[oe.ERROR]:"error"},qp=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=Hp[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Oc{constructor(e){this.name=e,this._logLevel=$p,this._logHandler=qp,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in oe))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Bp[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,oe.DEBUG,...e),this._logHandler(this,oe.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,oe.VERBOSE,...e),this._logHandler(this,oe.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,oe.INFO,...e),this._logHandler(this,oe.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,oe.WARN,...e),this._logHandler(this,oe.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,oe.ERROR,...e),this._logHandler(this,oe.ERROR,...e)}}const jp=(n,e)=>e.some(t=>n instanceof t);let J1,Z1;function Gp(){return J1||(J1=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Wp(){return Z1||(Z1=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const a2=new WeakMap,sc=new WeakMap,c2=new WeakMap,Ba=new WeakMap,kc=new WeakMap;function zp(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{t(vn(n.result)),s()},o=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&a2.set(t,n)}).catch(()=>{}),kc.set(e,n),e}function Kp(n){if(sc.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});sc.set(n,e)}let ic={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return sc.get(n);if(e==="objectStoreNames")return n.objectStoreNames||c2.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return vn(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Yp(n){ic=n(ic)}function Qp(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call($a(this),e,...t);return c2.set(r,e.sort?e.sort():[e]),vn(r)}:Wp().includes(n)?function(...e){return n.apply($a(this),e),vn(a2.get(this))}:function(...e){return vn(n.apply($a(this),e))}}function Xp(n){return typeof n=="function"?Qp(n):(n instanceof IDBTransaction&&Kp(n),jp(n,Gp())?new Proxy(n,ic):n)}function vn(n){if(n instanceof IDBRequest)return zp(n);if(Ba.has(n))return Ba.get(n);const e=Xp(n);return e!==n&&(Ba.set(n,e),kc.set(e,n)),e}const $a=n=>kc.get(n);function Jp(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(n,e),c=vn(o);return r&&o.addEventListener("upgradeneeded",u=>{r(vn(o.result),u.oldVersion,u.newVersion,vn(o.transaction),u)}),t&&o.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const Zp=["get","getKey","getAll","getAllKeys","count"],e0=["put","add","delete","clear"],Ha=new Map;function el(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Ha.get(e))return Ha.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=e0.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Zp.includes(t)))return;const i=async function(o,...c){const u=this.transaction(o,s?"readwrite":"readonly");let h=u.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),s&&u.done]))[0]};return Ha.set(e,i),i}Yp(n=>({...n,get:(e,t,r)=>el(e,t)||n.get(e,t,r),has:(e,t)=>!!el(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t0{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(n0(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function n0(n){return n.getComponent()?.type==="VERSION"}const oc="@firebase/app",tl="0.15.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sn=new Oc("@firebase/app"),r0="@firebase/app-compat",s0="@firebase/analytics-compat",i0="@firebase/analytics",o0="@firebase/app-check-compat",a0="@firebase/app-check",c0="@firebase/auth",u0="@firebase/auth-compat",l0="@firebase/database",h0="@firebase/data-connect",d0="@firebase/database-compat",f0="@firebase/functions",p0="@firebase/functions-compat",m0="@firebase/installations",g0="@firebase/installations-compat",_0="@firebase/messaging",E0="@firebase/messaging-compat",y0="@firebase/performance",w0="@firebase/performance-compat",I0="@firebase/remote-config",T0="@firebase/remote-config-compat",A0="@firebase/storage",R0="@firebase/storage-compat",v0="@firebase/firestore",C0="@firebase/ai",S0="@firebase/firestore-compat",P0="firebase",b0="12.15.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ac="[DEFAULT]",N0={[oc]:"fire-core",[r0]:"fire-core-compat",[i0]:"fire-analytics",[s0]:"fire-analytics-compat",[a0]:"fire-app-check",[o0]:"fire-app-check-compat",[c0]:"fire-auth",[u0]:"fire-auth-compat",[l0]:"fire-rtdb",[h0]:"fire-data-connect",[d0]:"fire-rtdb-compat",[f0]:"fire-fn",[p0]:"fire-fn-compat",[m0]:"fire-iid",[g0]:"fire-iid-compat",[_0]:"fire-fcm",[E0]:"fire-fcm-compat",[y0]:"fire-perf",[w0]:"fire-perf-compat",[I0]:"fire-rc",[T0]:"fire-rc-compat",[A0]:"fire-gcs",[R0]:"fire-gcs-compat",[v0]:"fire-fst",[S0]:"fire-fst-compat",[C0]:"fire-vertex","fire-js":"fire-js",[P0]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const io=new Map,O0=new Map,cc=new Map;function nl(n,e){try{n.container.addComponent(e)}catch(t){sn.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function cr(n){const e=n.name;if(cc.has(e))return sn.debug(`There were multiple attempts to register component ${e}.`),!1;cc.set(e,n);for(const t of io.values())nl(t,n);for(const t of O0.values())nl(t,n);return!0}function ii(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Pe(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k0={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Cn=new si("app","Firebase",k0);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D0{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Dn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Cn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fr=b0;function V0(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:ac,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw Cn.create("bad-app-name",{appName:String(s)});if(t||(t=r2()),!t)throw Cn.create("no-options");const i=io.get(s);if(i){if(kn(t,i.options)&&kn(r,i.config))return i;throw Cn.create("duplicate-app",{appName:s})}const o=new Fp(s);for(const u of cc.values())o.addComponent(u);const c=new D0(t,r,o);return io.set(s,c),c}function Dc(n=ac){const e=io.get(n);if(!e&&n===ac&&r2())return V0();if(!e)throw Cn.create("no-app",{appName:n});return e}function tn(n,e,t){let r=N0[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${r}" with version "${e}":`];s&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),sn.warn(o.join(" "));return}cr(new Dn(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L0="firebase-heartbeat-database",x0=1,Us="firebase-heartbeat-store";let qa=null;function u2(){return qa||(qa=Jp(L0,x0,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Us)}catch(t){console.warn(t)}}}}).catch(n=>{throw Cn.create("idb-open",{originalErrorMessage:n.message})})),qa}async function M0(n){try{const t=(await u2()).transaction(Us),r=await t.objectStore(Us).get(l2(n));return await t.done,r}catch(e){if(e instanceof Kt)sn.warn(e.message);else{const t=Cn.create("idb-get",{originalErrorMessage:e?.message});sn.warn(t.message)}}}async function rl(n,e){try{const r=(await u2()).transaction(Us,"readwrite");await r.objectStore(Us).put(e,l2(n)),await r.done}catch(t){if(t instanceof Kt)sn.warn(t.message);else{const r=Cn.create("idb-set",{originalErrorMessage:t?.message});sn.warn(r.message)}}}function l2(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const U0=1024,F0=30;class B0{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new H0(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=sl();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats.length>F0){const s=q0(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){sn.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=sl(),{heartbeatsToSend:t,unsentEntries:r}=$0(this._heartbeatsCache.heartbeats),s=so(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return sn.warn(e),""}}}function sl(){return new Date().toISOString().substring(0,10)}function $0(n,e=U0){const t=[];let r=n.slice();for(const s of n){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),il(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),il(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class H0{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Sp()?Pp().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await M0(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return rl(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return rl(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function il(n){return so(JSON.stringify({version:2,heartbeats:n})).length}function q0(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j0(n){cr(new Dn("platform-logger",e=>new t0(e),"PRIVATE")),cr(new Dn("heartbeat",e=>new B0(e),"PRIVATE")),tn(oc,tl,n),tn(oc,tl,"esm2020"),tn("fire-js","")}j0("");var ol=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Sn,h2;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(A,g){function E(){}E.prototype=g.prototype,A.F=g.prototype,A.prototype=new E,A.prototype.constructor=A,A.D=function(R,I,C){for(var _=Array(arguments.length-2),Le=2;Le<arguments.length;Le++)_[Le-2]=arguments[Le];return g.prototype[I].apply(R,_)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(A,g,E){E||(E=0);const R=Array(16);if(typeof g=="string")for(var I=0;I<16;++I)R[I]=g.charCodeAt(E++)|g.charCodeAt(E++)<<8|g.charCodeAt(E++)<<16|g.charCodeAt(E++)<<24;else for(I=0;I<16;++I)R[I]=g[E++]|g[E++]<<8|g[E++]<<16|g[E++]<<24;g=A.g[0],E=A.g[1],I=A.g[2];let C=A.g[3],_;_=g+(C^E&(I^C))+R[0]+3614090360&4294967295,g=E+(_<<7&4294967295|_>>>25),_=C+(I^g&(E^I))+R[1]+3905402710&4294967295,C=g+(_<<12&4294967295|_>>>20),_=I+(E^C&(g^E))+R[2]+606105819&4294967295,I=C+(_<<17&4294967295|_>>>15),_=E+(g^I&(C^g))+R[3]+3250441966&4294967295,E=I+(_<<22&4294967295|_>>>10),_=g+(C^E&(I^C))+R[4]+4118548399&4294967295,g=E+(_<<7&4294967295|_>>>25),_=C+(I^g&(E^I))+R[5]+1200080426&4294967295,C=g+(_<<12&4294967295|_>>>20),_=I+(E^C&(g^E))+R[6]+2821735955&4294967295,I=C+(_<<17&4294967295|_>>>15),_=E+(g^I&(C^g))+R[7]+4249261313&4294967295,E=I+(_<<22&4294967295|_>>>10),_=g+(C^E&(I^C))+R[8]+1770035416&4294967295,g=E+(_<<7&4294967295|_>>>25),_=C+(I^g&(E^I))+R[9]+2336552879&4294967295,C=g+(_<<12&4294967295|_>>>20),_=I+(E^C&(g^E))+R[10]+4294925233&4294967295,I=C+(_<<17&4294967295|_>>>15),_=E+(g^I&(C^g))+R[11]+2304563134&4294967295,E=I+(_<<22&4294967295|_>>>10),_=g+(C^E&(I^C))+R[12]+1804603682&4294967295,g=E+(_<<7&4294967295|_>>>25),_=C+(I^g&(E^I))+R[13]+4254626195&4294967295,C=g+(_<<12&4294967295|_>>>20),_=I+(E^C&(g^E))+R[14]+2792965006&4294967295,I=C+(_<<17&4294967295|_>>>15),_=E+(g^I&(C^g))+R[15]+1236535329&4294967295,E=I+(_<<22&4294967295|_>>>10),_=g+(I^C&(E^I))+R[1]+4129170786&4294967295,g=E+(_<<5&4294967295|_>>>27),_=C+(E^I&(g^E))+R[6]+3225465664&4294967295,C=g+(_<<9&4294967295|_>>>23),_=I+(g^E&(C^g))+R[11]+643717713&4294967295,I=C+(_<<14&4294967295|_>>>18),_=E+(C^g&(I^C))+R[0]+3921069994&4294967295,E=I+(_<<20&4294967295|_>>>12),_=g+(I^C&(E^I))+R[5]+3593408605&4294967295,g=E+(_<<5&4294967295|_>>>27),_=C+(E^I&(g^E))+R[10]+38016083&4294967295,C=g+(_<<9&4294967295|_>>>23),_=I+(g^E&(C^g))+R[15]+3634488961&4294967295,I=C+(_<<14&4294967295|_>>>18),_=E+(C^g&(I^C))+R[4]+3889429448&4294967295,E=I+(_<<20&4294967295|_>>>12),_=g+(I^C&(E^I))+R[9]+568446438&4294967295,g=E+(_<<5&4294967295|_>>>27),_=C+(E^I&(g^E))+R[14]+3275163606&4294967295,C=g+(_<<9&4294967295|_>>>23),_=I+(g^E&(C^g))+R[3]+4107603335&4294967295,I=C+(_<<14&4294967295|_>>>18),_=E+(C^g&(I^C))+R[8]+1163531501&4294967295,E=I+(_<<20&4294967295|_>>>12),_=g+(I^C&(E^I))+R[13]+2850285829&4294967295,g=E+(_<<5&4294967295|_>>>27),_=C+(E^I&(g^E))+R[2]+4243563512&4294967295,C=g+(_<<9&4294967295|_>>>23),_=I+(g^E&(C^g))+R[7]+1735328473&4294967295,I=C+(_<<14&4294967295|_>>>18),_=E+(C^g&(I^C))+R[12]+2368359562&4294967295,E=I+(_<<20&4294967295|_>>>12),_=g+(E^I^C)+R[5]+4294588738&4294967295,g=E+(_<<4&4294967295|_>>>28),_=C+(g^E^I)+R[8]+2272392833&4294967295,C=g+(_<<11&4294967295|_>>>21),_=I+(C^g^E)+R[11]+1839030562&4294967295,I=C+(_<<16&4294967295|_>>>16),_=E+(I^C^g)+R[14]+4259657740&4294967295,E=I+(_<<23&4294967295|_>>>9),_=g+(E^I^C)+R[1]+2763975236&4294967295,g=E+(_<<4&4294967295|_>>>28),_=C+(g^E^I)+R[4]+1272893353&4294967295,C=g+(_<<11&4294967295|_>>>21),_=I+(C^g^E)+R[7]+4139469664&4294967295,I=C+(_<<16&4294967295|_>>>16),_=E+(I^C^g)+R[10]+3200236656&4294967295,E=I+(_<<23&4294967295|_>>>9),_=g+(E^I^C)+R[13]+681279174&4294967295,g=E+(_<<4&4294967295|_>>>28),_=C+(g^E^I)+R[0]+3936430074&4294967295,C=g+(_<<11&4294967295|_>>>21),_=I+(C^g^E)+R[3]+3572445317&4294967295,I=C+(_<<16&4294967295|_>>>16),_=E+(I^C^g)+R[6]+76029189&4294967295,E=I+(_<<23&4294967295|_>>>9),_=g+(E^I^C)+R[9]+3654602809&4294967295,g=E+(_<<4&4294967295|_>>>28),_=C+(g^E^I)+R[12]+3873151461&4294967295,C=g+(_<<11&4294967295|_>>>21),_=I+(C^g^E)+R[15]+530742520&4294967295,I=C+(_<<16&4294967295|_>>>16),_=E+(I^C^g)+R[2]+3299628645&4294967295,E=I+(_<<23&4294967295|_>>>9),_=g+(I^(E|~C))+R[0]+4096336452&4294967295,g=E+(_<<6&4294967295|_>>>26),_=C+(E^(g|~I))+R[7]+1126891415&4294967295,C=g+(_<<10&4294967295|_>>>22),_=I+(g^(C|~E))+R[14]+2878612391&4294967295,I=C+(_<<15&4294967295|_>>>17),_=E+(C^(I|~g))+R[5]+4237533241&4294967295,E=I+(_<<21&4294967295|_>>>11),_=g+(I^(E|~C))+R[12]+1700485571&4294967295,g=E+(_<<6&4294967295|_>>>26),_=C+(E^(g|~I))+R[3]+2399980690&4294967295,C=g+(_<<10&4294967295|_>>>22),_=I+(g^(C|~E))+R[10]+4293915773&4294967295,I=C+(_<<15&4294967295|_>>>17),_=E+(C^(I|~g))+R[1]+2240044497&4294967295,E=I+(_<<21&4294967295|_>>>11),_=g+(I^(E|~C))+R[8]+1873313359&4294967295,g=E+(_<<6&4294967295|_>>>26),_=C+(E^(g|~I))+R[15]+4264355552&4294967295,C=g+(_<<10&4294967295|_>>>22),_=I+(g^(C|~E))+R[6]+2734768916&4294967295,I=C+(_<<15&4294967295|_>>>17),_=E+(C^(I|~g))+R[13]+1309151649&4294967295,E=I+(_<<21&4294967295|_>>>11),_=g+(I^(E|~C))+R[4]+4149444226&4294967295,g=E+(_<<6&4294967295|_>>>26),_=C+(E^(g|~I))+R[11]+3174756917&4294967295,C=g+(_<<10&4294967295|_>>>22),_=I+(g^(C|~E))+R[2]+718787259&4294967295,I=C+(_<<15&4294967295|_>>>17),_=E+(C^(I|~g))+R[9]+3951481745&4294967295,A.g[0]=A.g[0]+g&4294967295,A.g[1]=A.g[1]+(I+(_<<21&4294967295|_>>>11))&4294967295,A.g[2]=A.g[2]+I&4294967295,A.g[3]=A.g[3]+C&4294967295}r.prototype.v=function(A,g){g===void 0&&(g=A.length);const E=g-this.blockSize,R=this.C;let I=this.h,C=0;for(;C<g;){if(I==0)for(;C<=E;)s(this,A,C),C+=this.blockSize;if(typeof A=="string"){for(;C<g;)if(R[I++]=A.charCodeAt(C++),I==this.blockSize){s(this,R),I=0;break}}else for(;C<g;)if(R[I++]=A[C++],I==this.blockSize){s(this,R),I=0;break}}this.h=I,this.o+=g},r.prototype.A=function(){var A=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);A[0]=128;for(var g=1;g<A.length-8;++g)A[g]=0;g=this.o*8;for(var E=A.length-8;E<A.length;++E)A[E]=g&255,g/=256;for(this.v(A),A=Array(16),g=0,E=0;E<4;++E)for(let R=0;R<32;R+=8)A[g++]=this.g[E]>>>R&255;return A};function i(A,g){var E=c;return Object.prototype.hasOwnProperty.call(E,A)?E[A]:E[A]=g(A)}function o(A,g){this.h=g;const E=[];let R=!0;for(let I=A.length-1;I>=0;I--){const C=A[I]|0;R&&C==g||(E[I]=C,R=!1)}this.g=E}var c={};function u(A){return-128<=A&&A<128?i(A,function(g){return new o([g|0],g<0?-1:0)}):new o([A|0],A<0?-1:0)}function h(A){if(isNaN(A)||!isFinite(A))return p;if(A<0)return x(h(-A));const g=[];let E=1;for(let R=0;A>=E;R++)g[R]=A/E|0,E*=4294967296;return new o(g,0)}function f(A,g){if(A.length==0)throw Error("number format error: empty string");if(g=g||10,g<2||36<g)throw Error("radix out of range: "+g);if(A.charAt(0)=="-")return x(f(A.substring(1),g));if(A.indexOf("-")>=0)throw Error('number format error: interior "-" character');const E=h(Math.pow(g,8));let R=p;for(let C=0;C<A.length;C+=8){var I=Math.min(8,A.length-C);const _=parseInt(A.substring(C,C+I),g);I<8?(I=h(Math.pow(g,I)),R=R.j(I).add(h(_))):(R=R.j(E),R=R.add(h(_)))}return R}var p=u(0),w=u(1),b=u(16777216);n=o.prototype,n.m=function(){if(L(this))return-x(this).m();let A=0,g=1;for(let E=0;E<this.g.length;E++){const R=this.i(E);A+=(R>=0?R:4294967296+R)*g,g*=4294967296}return A},n.toString=function(A){if(A=A||10,A<2||36<A)throw Error("radix out of range: "+A);if(P(this))return"0";if(L(this))return"-"+x(this).toString(A);const g=h(Math.pow(A,6));var E=this;let R="";for(;;){const I=he(E,g).g;E=z(E,I.j(g));let C=((E.g.length>0?E.g[0]:E.h)>>>0).toString(A);if(E=I,P(E))return C+R;for(;C.length<6;)C="0"+C;R=C+R}},n.i=function(A){return A<0?0:A<this.g.length?this.g[A]:this.h};function P(A){if(A.h!=0)return!1;for(let g=0;g<A.g.length;g++)if(A.g[g]!=0)return!1;return!0}function L(A){return A.h==-1}n.l=function(A){return A=z(this,A),L(A)?-1:P(A)?0:1};function x(A){const g=A.g.length,E=[];for(let R=0;R<g;R++)E[R]=~A.g[R];return new o(E,~A.h).add(w)}n.abs=function(){return L(this)?x(this):this},n.add=function(A){const g=Math.max(this.g.length,A.g.length),E=[];let R=0;for(let I=0;I<=g;I++){let C=R+(this.i(I)&65535)+(A.i(I)&65535),_=(C>>>16)+(this.i(I)>>>16)+(A.i(I)>>>16);R=_>>>16,C&=65535,_&=65535,E[I]=_<<16|C}return new o(E,E[E.length-1]&-2147483648?-1:0)};function z(A,g){return A.add(x(g))}n.j=function(A){if(P(this)||P(A))return p;if(L(this))return L(A)?x(this).j(x(A)):x(x(this).j(A));if(L(A))return x(this.j(x(A)));if(this.l(b)<0&&A.l(b)<0)return h(this.m()*A.m());const g=this.g.length+A.g.length,E=[];for(var R=0;R<2*g;R++)E[R]=0;for(R=0;R<this.g.length;R++)for(let I=0;I<A.g.length;I++){const C=this.i(R)>>>16,_=this.i(R)&65535,Le=A.i(I)>>>16,wt=A.i(I)&65535;E[2*R+2*I]+=_*wt,te(E,2*R+2*I),E[2*R+2*I+1]+=C*wt,te(E,2*R+2*I+1),E[2*R+2*I+1]+=_*Le,te(E,2*R+2*I+1),E[2*R+2*I+2]+=C*Le,te(E,2*R+2*I+2)}for(A=0;A<g;A++)E[A]=E[2*A+1]<<16|E[2*A];for(A=g;A<2*g;A++)E[A]=0;return new o(E,0)};function te(A,g){for(;(A[g]&65535)!=A[g];)A[g+1]+=A[g]>>>16,A[g]&=65535,g++}function re(A,g){this.g=A,this.h=g}function he(A,g){if(P(g))throw Error("division by zero");if(P(A))return new re(p,p);if(L(A))return g=he(x(A),g),new re(x(g.g),x(g.h));if(L(g))return g=he(A,x(g)),new re(x(g.g),g.h);if(A.g.length>30){if(L(A)||L(g))throw Error("slowDivide_ only works with positive integers.");for(var E=w,R=g;R.l(A)<=0;)E=Ve(E),R=Ve(R);var I=Ee(E,1),C=Ee(R,1);for(R=Ee(R,2),E=Ee(E,2);!P(R);){var _=C.add(R);_.l(A)<=0&&(I=I.add(E),C=_),R=Ee(R,1),E=Ee(E,1)}return g=z(A,I.j(g)),new re(I,g)}for(I=p;A.l(g)>=0;){for(E=Math.max(1,Math.floor(A.m()/g.m())),R=Math.ceil(Math.log(E)/Math.LN2),R=R<=48?1:Math.pow(2,R-48),C=h(E),_=C.j(g);L(_)||_.l(A)>0;)E-=R,C=h(E),_=C.j(g);P(C)&&(C=w),I=I.add(C),A=z(A,_)}return new re(I,A)}n.B=function(A){return he(this,A).h},n.and=function(A){const g=Math.max(this.g.length,A.g.length),E=[];for(let R=0;R<g;R++)E[R]=this.i(R)&A.i(R);return new o(E,this.h&A.h)},n.or=function(A){const g=Math.max(this.g.length,A.g.length),E=[];for(let R=0;R<g;R++)E[R]=this.i(R)|A.i(R);return new o(E,this.h|A.h)},n.xor=function(A){const g=Math.max(this.g.length,A.g.length),E=[];for(let R=0;R<g;R++)E[R]=this.i(R)^A.i(R);return new o(E,this.h^A.h)};function Ve(A){const g=A.g.length+1,E=[];for(let R=0;R<g;R++)E[R]=A.i(R)<<1|A.i(R-1)>>>31;return new o(E,A.h)}function Ee(A,g){const E=g>>5;g%=32;const R=A.g.length-E,I=[];for(let C=0;C<R;C++)I[C]=g>0?A.i(C+E)>>>g|A.i(C+E+1)<<32-g:A.i(C+E);return new o(I,A.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,h2=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=f,Sn=o}).apply(typeof ol<"u"?ol:typeof self<"u"?self:typeof window<"u"?window:{});var xi=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var d2,ys,f2,zi,uc,p2,m2,g2;(function(){var n,e=Object.defineProperty;function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof xi=="object"&&xi];for(var l=0;l<a.length;++l){var d=a[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function s(a,l){if(l)e:{var d=r;a=a.split(".");for(var m=0;m<a.length-1;m++){var S=a[m];if(!(S in d))break e;d=d[S]}a=a[a.length-1],m=d[a],l=l(m),l!=m&&l!=null&&e(d,a,{configurable:!0,writable:!0,value:l})}}s("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(a){return a||function(l){var d=[],m;for(m in l)Object.prototype.hasOwnProperty.call(l,m)&&d.push([m,l[m]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function c(a){var l=typeof a;return l=="object"&&a!=null||l=="function"}function u(a,l,d){return a.call.apply(a.bind,arguments)}function h(a,l,d){return h=u,h.apply(null,arguments)}function f(a,l){var d=Array.prototype.slice.call(arguments,1);return function(){var m=d.slice();return m.push.apply(m,arguments),a.apply(this,m)}}function p(a,l){function d(){}d.prototype=l.prototype,a.Z=l.prototype,a.prototype=new d,a.prototype.constructor=a,a.Ob=function(m,S,O){for(var F=Array(arguments.length-2),ee=2;ee<arguments.length;ee++)F[ee-2]=arguments[ee];return l.prototype[S].apply(m,F)}}var w=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function b(a){const l=a.length;if(l>0){const d=Array(l);for(let m=0;m<l;m++)d[m]=a[m];return d}return[]}function P(a,l){for(let m=1;m<arguments.length;m++){const S=arguments[m];var d=typeof S;if(d=d!="object"?d:S?Array.isArray(S)?"array":d:"null",d=="array"||d=="object"&&typeof S.length=="number"){d=a.length||0;const O=S.length||0;a.length=d+O;for(let F=0;F<O;F++)a[d+F]=S[F]}else a.push(S)}}class L{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return this.h>0?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function x(a){o.setTimeout(()=>{throw a},0)}function z(){var a=A;let l=null;return a.g&&(l=a.g,a.g=a.g.next,a.g||(a.h=null),l.next=null),l}class te{constructor(){this.h=this.g=null}add(l,d){const m=re.get();m.set(l,d),this.h?this.h.next=m:this.g=m,this.h=m}}var re=new L(()=>new he,a=>a.reset());class he{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let Ve,Ee=!1,A=new te,g=()=>{const a=Promise.resolve(void 0);Ve=()=>{a.then(E)}};function E(){for(var a;a=z();){try{a.h.call(a.g)}catch(d){x(d)}var l=re;l.j(a),l.h<100&&(l.h++,a.next=l.g,l.g=a)}Ee=!1}function R(){this.u=this.u,this.C=this.C}R.prototype.u=!1,R.prototype.dispose=function(){this.u||(this.u=!0,this.N())},R.prototype[Symbol.dispose]=function(){this.dispose()},R.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function I(a,l){this.type=a,this.g=this.target=l,this.defaultPrevented=!1}I.prototype.h=function(){this.defaultPrevented=!0};var C=(function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,l=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};o.addEventListener("test",d,l),o.removeEventListener("test",d,l)}catch{}return a})();function _(a){return/^[\s\xa0]*$/.test(a)}function Le(a,l){I.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,l)}p(Le,I),Le.prototype.init=function(a,l){const d=this.type=a.type,m=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=l,l=a.relatedTarget,l||(d=="mouseover"?l=a.fromElement:d=="mouseout"&&(l=a.toElement)),this.relatedTarget=l,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&Le.Z.h.call(this)},Le.prototype.h=function(){Le.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var wt="closure_listenable_"+(Math.random()*1e6|0),I6=0;function T6(a,l,d,m,S){this.listener=a,this.proxy=null,this.src=l,this.type=d,this.capture=!!m,this.ha=S,this.key=++I6,this.da=this.fa=!1}function Ii(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Ti(a,l,d){for(const m in a)l.call(d,a[m],m,a)}function A6(a,l){for(const d in a)l.call(void 0,a[d],d,a)}function ju(a){const l={};for(const d in a)l[d]=a[d];return l}const Gu="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Wu(a,l){let d,m;for(let S=1;S<arguments.length;S++){m=arguments[S];for(d in m)a[d]=m[d];for(let O=0;O<Gu.length;O++)d=Gu[O],Object.prototype.hasOwnProperty.call(m,d)&&(a[d]=m[d])}}function Ai(a){this.src=a,this.g={},this.h=0}Ai.prototype.add=function(a,l,d,m,S){const O=a.toString();a=this.g[O],a||(a=this.g[O]=[],this.h++);const F=ma(a,l,m,S);return F>-1?(l=a[F],d||(l.fa=!1)):(l=new T6(l,this.src,O,!!m,S),l.fa=d,a.push(l)),l};function pa(a,l){const d=l.type;if(d in a.g){var m=a.g[d],S=Array.prototype.indexOf.call(m,l,void 0),O;(O=S>=0)&&Array.prototype.splice.call(m,S,1),O&&(Ii(l),a.g[d].length==0&&(delete a.g[d],a.h--))}}function ma(a,l,d,m){for(let S=0;S<a.length;++S){const O=a[S];if(!O.da&&O.listener==l&&O.capture==!!d&&O.ha==m)return S}return-1}var ga="closure_lm_"+(Math.random()*1e6|0),_a={};function zu(a,l,d,m,S){if(Array.isArray(l)){for(let O=0;O<l.length;O++)zu(a,l[O],d,m,S);return null}return d=Qu(d),a&&a[wt]?a.J(l,d,c(m)?!!m.capture:!1,S):R6(a,l,d,!1,m,S)}function R6(a,l,d,m,S,O){if(!l)throw Error("Invalid event type");const F=c(S)?!!S.capture:!!S;let ee=ya(a);if(ee||(a[ga]=ee=new Ai(a)),d=ee.add(l,d,m,F,O),d.proxy)return d;if(m=v6(),d.proxy=m,m.src=a,m.listener=d,a.addEventListener)C||(S=F),S===void 0&&(S=!1),a.addEventListener(l.toString(),m,S);else if(a.attachEvent)a.attachEvent(Yu(l.toString()),m);else if(a.addListener&&a.removeListener)a.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return d}function v6(){function a(d){return l.call(a.src,a.listener,d)}const l=C6;return a}function Ku(a,l,d,m,S){if(Array.isArray(l))for(var O=0;O<l.length;O++)Ku(a,l[O],d,m,S);else m=c(m)?!!m.capture:!!m,d=Qu(d),a&&a[wt]?(a=a.i,O=String(l).toString(),O in a.g&&(l=a.g[O],d=ma(l,d,m,S),d>-1&&(Ii(l[d]),Array.prototype.splice.call(l,d,1),l.length==0&&(delete a.g[O],a.h--)))):a&&(a=ya(a))&&(l=a.g[l.toString()],a=-1,l&&(a=ma(l,d,m,S)),(d=a>-1?l[a]:null)&&Ea(d))}function Ea(a){if(typeof a!="number"&&a&&!a.da){var l=a.src;if(l&&l[wt])pa(l.i,a);else{var d=a.type,m=a.proxy;l.removeEventListener?l.removeEventListener(d,m,a.capture):l.detachEvent?l.detachEvent(Yu(d),m):l.addListener&&l.removeListener&&l.removeListener(m),(d=ya(l))?(pa(d,a),d.h==0&&(d.src=null,l[ga]=null)):Ii(a)}}}function Yu(a){return a in _a?_a[a]:_a[a]="on"+a}function C6(a,l){if(a.da)a=!0;else{l=new Le(l,this);const d=a.listener,m=a.ha||a.src;a.fa&&Ea(a),a=d.call(m,l)}return a}function ya(a){return a=a[ga],a instanceof Ai?a:null}var wa="__closure_events_fn_"+(Math.random()*1e9>>>0);function Qu(a){return typeof a=="function"?a:(a[wa]||(a[wa]=function(l){return a.handleEvent(l)}),a[wa])}function ze(){R.call(this),this.i=new Ai(this),this.M=this,this.G=null}p(ze,R),ze.prototype[wt]=!0,ze.prototype.removeEventListener=function(a,l,d,m){Ku(this,a,l,d,m)};function tt(a,l){var d,m=a.G;if(m)for(d=[];m;m=m.G)d.push(m);if(a=a.M,m=l.type||l,typeof l=="string")l=new I(l,a);else if(l instanceof I)l.target=l.target||a;else{var S=l;l=new I(m,a),Wu(l,S)}S=!0;let O,F;if(d)for(F=d.length-1;F>=0;F--)O=l.g=d[F],S=Ri(O,m,!0,l)&&S;if(O=l.g=a,S=Ri(O,m,!0,l)&&S,S=Ri(O,m,!1,l)&&S,d)for(F=0;F<d.length;F++)O=l.g=d[F],S=Ri(O,m,!1,l)&&S}ze.prototype.N=function(){if(ze.Z.N.call(this),this.i){var a=this.i;for(const l in a.g){const d=a.g[l];for(let m=0;m<d.length;m++)Ii(d[m]);delete a.g[l],a.h--}}this.G=null},ze.prototype.J=function(a,l,d,m){return this.i.add(String(a),l,!1,d,m)},ze.prototype.K=function(a,l,d,m){return this.i.add(String(a),l,!0,d,m)};function Ri(a,l,d,m){if(l=a.i.g[String(l)],!l)return!0;l=l.concat();let S=!0;for(let O=0;O<l.length;++O){const F=l[O];if(F&&!F.da&&F.capture==d){const ee=F.listener,xe=F.ha||F.src;F.fa&&pa(a.i,F),S=ee.call(xe,m)!==!1&&S}}return S&&!m.defaultPrevented}function S6(a,l){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=h(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(l)>2147483647?-1:o.setTimeout(a,l||0)}function Xu(a){a.g=S6(()=>{a.g=null,a.i&&(a.i=!1,Xu(a))},a.l);const l=a.h;a.h=null,a.m.apply(null,l)}class P6 extends R{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Xu(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Xr(a){R.call(this),this.h=a,this.g={}}p(Xr,R);var Ju=[];function Zu(a){Ti(a.g,function(l,d){this.g.hasOwnProperty(d)&&Ea(l)},a),a.g={}}Xr.prototype.N=function(){Xr.Z.N.call(this),Zu(this)},Xr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ia=o.JSON.stringify,b6=o.JSON.parse,N6=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function e1(){}function t1(){}var Jr={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Ta(){I.call(this,"d")}p(Ta,I);function Aa(){I.call(this,"c")}p(Aa,I);var Yn={},n1=null;function vi(){return n1=n1||new ze}Yn.Ia="serverreachability";function r1(a){I.call(this,Yn.Ia,a)}p(r1,I);function Zr(a){const l=vi();tt(l,new r1(l))}Yn.STAT_EVENT="statevent";function s1(a,l){I.call(this,Yn.STAT_EVENT,a),this.stat=l}p(s1,I);function nt(a){const l=vi();tt(l,new s1(l,a))}Yn.Ja="timingevent";function i1(a,l){I.call(this,Yn.Ja,a),this.size=l}p(i1,I);function es(a,l){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},l)}function ts(){this.g=!0}ts.prototype.ua=function(){this.g=!1};function O6(a,l,d,m,S,O){a.info(function(){if(a.g)if(O){var F="",ee=O.split("&");for(let fe=0;fe<ee.length;fe++){var xe=ee[fe].split("=");if(xe.length>1){const $e=xe[0];xe=xe[1];const Lt=$e.split("_");F=Lt.length>=2&&Lt[1]=="type"?F+($e+"="+xe+"&"):F+($e+"=redacted&")}}}else F=null;else F=O;return"XMLHTTP REQ ("+m+") [attempt "+S+"]: "+l+`
`+d+`
`+F})}function k6(a,l,d,m,S,O,F){a.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+S+"]: "+l+`
`+d+`
`+O+" "+F})}function _r(a,l,d,m){a.info(function(){return"XMLHTTP TEXT ("+l+"): "+V6(a,d)+(m?" "+m:"")})}function D6(a,l){a.info(function(){return"TIMEOUT: "+l})}ts.prototype.info=function(){};function V6(a,l){if(!a.g)return l;if(!l)return null;try{const O=JSON.parse(l);if(O){for(a=0;a<O.length;a++)if(Array.isArray(O[a])){var d=O[a];if(!(d.length<2)){var m=d[1];if(Array.isArray(m)&&!(m.length<1)){var S=m[0];if(S!="noop"&&S!="stop"&&S!="close")for(let F=1;F<m.length;F++)m[F]=""}}}}return Ia(O)}catch{return l}}var Ci={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},o1={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},a1;function Ra(){}p(Ra,e1),Ra.prototype.g=function(){return new XMLHttpRequest},a1=new Ra;function ns(a){return encodeURIComponent(String(a))}function L6(a){var l=1;a=a.split(":");const d=[];for(;l>0&&a.length;)d.push(a.shift()),l--;return a.length&&d.push(a.join(":")),d}function dn(a,l,d,m){this.j=a,this.i=l,this.l=d,this.S=m||1,this.V=new Xr(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new c1}function c1(){this.i=null,this.g="",this.h=!1}var u1={},va={};function Ca(a,l,d){a.M=1,a.A=Pi(Vt(l)),a.u=d,a.R=!0,l1(a,null)}function l1(a,l){a.F=Date.now(),Si(a),a.B=Vt(a.A);var d=a.B,m=a.S;Array.isArray(m)||(m=[String(m)]),A1(d.i,"t",m),a.C=0,d=a.j.L,a.h=new c1,a.g=$1(a.j,d?l:null,!a.u),a.P>0&&(a.O=new P6(h(a.Y,a,a.g),a.P)),l=a.V,d=a.g,m=a.ba;var S="readystatechange";Array.isArray(S)||(S&&(Ju[0]=S.toString()),S=Ju);for(let O=0;O<S.length;O++){const F=zu(d,S[O],m||l.handleEvent,!1,l.h||l);if(!F)break;l.g[F.key]=F}l=a.J?ju(a.J):{},a.u?(a.v||(a.v="POST"),l["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,l)):(a.v="GET",a.g.ea(a.B,a.v,null,l)),Zr(),O6(a.i,a.v,a.B,a.l,a.S,a.u)}dn.prototype.ba=function(a){a=a.target;const l=this.O;l&&mn(a)==3?l.j():this.Y(a)},dn.prototype.Y=function(a){try{if(a==this.g)e:{const ee=mn(this.g),xe=this.g.ya(),fe=this.g.ca();if(!(ee<3)&&(ee!=3||this.g&&(this.h.h||this.g.la()||N1(this.g)))){this.K||ee!=4||xe==7||(xe==8||fe<=0?Zr(3):Zr(2)),Sa(this);var l=this.g.ca();this.X=l;var d=x6(this);if(this.o=l==200,k6(this.i,this.v,this.B,this.l,this.S,ee,l),this.o){if(this.U&&!this.L){t:{if(this.g){var m,S=this.g;if((m=S.g?S.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!_(m)){var O=m;break t}}O=null}if(a=O)_r(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Pa(this,a);else{this.o=!1,this.m=3,nt(12),Qn(this),rs(this);break e}}if(this.R){a=!0;let $e;for(;!this.K&&this.C<d.length;)if($e=M6(this,d),$e==va){ee==4&&(this.m=4,nt(14),a=!1),_r(this.i,this.l,null,"[Incomplete Response]");break}else if($e==u1){this.m=4,nt(15),_r(this.i,this.l,d,"[Invalid Chunk]"),a=!1;break}else _r(this.i,this.l,$e,null),Pa(this,$e);if(h1(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ee!=4||d.length!=0||this.h.h||(this.m=1,nt(16),a=!1),this.o=this.o&&a,!a)_r(this.i,this.l,d,"[Invalid Chunked Response]"),Qn(this),rs(this);else if(d.length>0&&!this.W){this.W=!0;var F=this.j;F.g==this&&F.aa&&!F.P&&(F.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),xa(F),F.P=!0,nt(11))}}else _r(this.i,this.l,d,null),Pa(this,d);ee==4&&Qn(this),this.o&&!this.K&&(ee==4?M1(this.j,this):(this.o=!1,Si(this)))}else X6(this.g),l==400&&d.indexOf("Unknown SID")>0?(this.m=3,nt(12)):(this.m=0,nt(13)),Qn(this),rs(this)}}}catch{}finally{}};function x6(a){if(!h1(a))return a.g.la();const l=N1(a.g);if(l==="")return"";let d="";const m=l.length,S=mn(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return Qn(a),rs(a),"";a.h.i=new o.TextDecoder}for(let O=0;O<m;O++)a.h.h=!0,d+=a.h.i.decode(l[O],{stream:!(S&&O==m-1)});return l.length=0,a.h.g+=d,a.C=0,a.h.g}function h1(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function M6(a,l){var d=a.C,m=l.indexOf(`
`,d);return m==-1?va:(d=Number(l.substring(d,m)),isNaN(d)?u1:(m+=1,m+d>l.length?va:(l=l.slice(m,m+d),a.C=m+d,l)))}dn.prototype.cancel=function(){this.K=!0,Qn(this)};function Si(a){a.T=Date.now()+a.H,d1(a,a.H)}function d1(a,l){if(a.D!=null)throw Error("WatchDog timer not null");a.D=es(h(a.aa,a),l)}function Sa(a){a.D&&(o.clearTimeout(a.D),a.D=null)}dn.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(D6(this.i,this.B),this.M!=2&&(Zr(),nt(17)),Qn(this),this.m=2,rs(this)):d1(this,this.T-a)};function rs(a){a.j.I==0||a.K||M1(a.j,a)}function Qn(a){Sa(a);var l=a.O;l&&typeof l.dispose=="function"&&l.dispose(),a.O=null,Zu(a.V),a.g&&(l=a.g,a.g=null,l.abort(),l.dispose())}function Pa(a,l){try{var d=a.j;if(d.I!=0&&(d.g==a||ba(d.h,a))){if(!a.L&&ba(d.h,a)&&d.I==3){try{var m=d.Ba.g.parse(l)}catch{m=null}if(Array.isArray(m)&&m.length==3){var S=m;if(S[0]==0){e:if(!d.v){if(d.g)if(d.g.F+3e3<a.F)Di(d),Oi(d);else break e;La(d),nt(18)}}else d.xa=S[1],0<d.xa-d.K&&S[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=es(h(d.Va,d),6e3));m1(d.h)<=1&&d.ta&&(d.ta=void 0)}else Jn(d,11)}else if((a.L||d.g==a)&&Di(d),!_(l))for(S=d.Ba.g.parse(l),l=0;l<S.length;l++){let fe=S[l];const $e=fe[0];if(!($e<=d.K))if(d.K=$e,fe=fe[1],d.I==2)if(fe[0]=="c"){d.M=fe[1],d.ba=fe[2];const Lt=fe[3];Lt!=null&&(d.ka=Lt,d.j.info("VER="+d.ka));const Zn=fe[4];Zn!=null&&(d.za=Zn,d.j.info("SVER="+d.za));const gn=fe[5];gn!=null&&typeof gn=="number"&&gn>0&&(m=1.5*gn,d.O=m,d.j.info("backChannelRequestTimeoutMs_="+m)),m=d;const _n=a.g;if(_n){const Li=_n.g?_n.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Li){var O=m.h;O.g||Li.indexOf("spdy")==-1&&Li.indexOf("quic")==-1&&Li.indexOf("h2")==-1||(O.j=O.l,O.g=new Set,O.h&&(Na(O,O.h),O.h=null))}if(m.G){const Ma=_n.g?_n.g.getResponseHeader("X-HTTP-Session-Id"):null;Ma&&(m.wa=Ma,pe(m.J,m.G,Ma))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-a.F,d.j.info("Handshake RTT: "+d.T+"ms")),m=d;var F=a;if(m.na=B1(m,m.L?m.ba:null,m.W),F.L){g1(m.h,F);var ee=F,xe=m.O;xe&&(ee.H=xe),ee.D&&(Sa(ee),Si(ee)),m.g=F}else L1(m);d.i.length>0&&ki(d)}else fe[0]!="stop"&&fe[0]!="close"||Jn(d,7);else d.I==3&&(fe[0]=="stop"||fe[0]=="close"?fe[0]=="stop"?Jn(d,7):Va(d):fe[0]!="noop"&&d.l&&d.l.qa(fe),d.A=0)}}Zr(4)}catch{}}var U6=class{constructor(a,l){this.g=a,this.map=l}};function f1(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function p1(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function m1(a){return a.h?1:a.g?a.g.size:0}function ba(a,l){return a.h?a.h==l:a.g?a.g.has(l):!1}function Na(a,l){a.g?a.g.add(l):a.h=l}function g1(a,l){a.h&&a.h==l?a.h=null:a.g&&a.g.has(l)&&a.g.delete(l)}f1.prototype.cancel=function(){if(this.i=_1(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function _1(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let l=a.i;for(const d of a.g.values())l=l.concat(d.G);return l}return b(a.i)}var E1=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function F6(a,l){if(a){a=a.split("&");for(let d=0;d<a.length;d++){const m=a[d].indexOf("=");let S,O=null;m>=0?(S=a[d].substring(0,m),O=a[d].substring(m+1)):S=a[d],l(S,O?decodeURIComponent(O.replace(/\+/g," ")):"")}}}function fn(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let l;a instanceof fn?(this.l=a.l,ss(this,a.j),this.o=a.o,this.g=a.g,is(this,a.u),this.h=a.h,Oa(this,R1(a.i)),this.m=a.m):a&&(l=String(a).match(E1))?(this.l=!1,ss(this,l[1]||"",!0),this.o=os(l[2]||""),this.g=os(l[3]||"",!0),is(this,l[4]),this.h=os(l[5]||"",!0),Oa(this,l[6]||"",!0),this.m=os(l[7]||"")):(this.l=!1,this.i=new cs(null,this.l))}fn.prototype.toString=function(){const a=[];var l=this.j;l&&a.push(as(l,y1,!0),":");var d=this.g;return(d||l=="file")&&(a.push("//"),(l=this.o)&&a.push(as(l,y1,!0),"@"),a.push(ns(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&a.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(as(d,d.charAt(0)=="/"?H6:$6,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",as(d,j6)),a.join("")},fn.prototype.resolve=function(a){const l=Vt(this);let d=!!a.j;d?ss(l,a.j):d=!!a.o,d?l.o=a.o:d=!!a.g,d?l.g=a.g:d=a.u!=null;var m=a.h;if(d)is(l,a.u);else if(d=!!a.h){if(m.charAt(0)!="/")if(this.g&&!this.h)m="/"+m;else{var S=l.h.lastIndexOf("/");S!=-1&&(m=l.h.slice(0,S+1)+m)}if(S=m,S==".."||S==".")m="";else if(S.indexOf("./")!=-1||S.indexOf("/.")!=-1){m=S.lastIndexOf("/",0)==0,S=S.split("/");const O=[];for(let F=0;F<S.length;){const ee=S[F++];ee=="."?m&&F==S.length&&O.push(""):ee==".."?((O.length>1||O.length==1&&O[0]!="")&&O.pop(),m&&F==S.length&&O.push("")):(O.push(ee),m=!0)}m=O.join("/")}else m=S}return d?l.h=m:d=a.i.toString()!=="",d?Oa(l,R1(a.i)):d=!!a.m,d&&(l.m=a.m),l};function Vt(a){return new fn(a)}function ss(a,l,d){a.j=d?os(l,!0):l,a.j&&(a.j=a.j.replace(/:$/,""))}function is(a,l){if(l){if(l=Number(l),isNaN(l)||l<0)throw Error("Bad port number "+l);a.u=l}else a.u=null}function Oa(a,l,d){l instanceof cs?(a.i=l,G6(a.i,a.l)):(d||(l=as(l,q6)),a.i=new cs(l,a.l))}function pe(a,l,d){a.i.set(l,d)}function Pi(a){return pe(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function os(a,l){return a?l?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function as(a,l,d){return typeof a=="string"?(a=encodeURI(a).replace(l,B6),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function B6(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var y1=/[#\/\?@]/g,$6=/[#\?:]/g,H6=/[#\?]/g,q6=/[#\?@]/g,j6=/#/g;function cs(a,l){this.h=this.g=null,this.i=a||null,this.j=!!l}function Xn(a){a.g||(a.g=new Map,a.h=0,a.i&&F6(a.i,function(l,d){a.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}n=cs.prototype,n.add=function(a,l){Xn(this),this.i=null,a=Er(this,a);let d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(l),this.h+=1,this};function w1(a,l){Xn(a),l=Er(a,l),a.g.has(l)&&(a.i=null,a.h-=a.g.get(l).length,a.g.delete(l))}function I1(a,l){return Xn(a),l=Er(a,l),a.g.has(l)}n.forEach=function(a,l){Xn(this),this.g.forEach(function(d,m){d.forEach(function(S){a.call(l,S,m,this)},this)},this)};function T1(a,l){Xn(a);let d=[];if(typeof l=="string")I1(a,l)&&(d=d.concat(a.g.get(Er(a,l))));else for(a=Array.from(a.g.values()),l=0;l<a.length;l++)d=d.concat(a[l]);return d}n.set=function(a,l){return Xn(this),this.i=null,a=Er(this,a),I1(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[l]),this.h+=1,this},n.get=function(a,l){return a?(a=T1(this,a),a.length>0?String(a[0]):l):l};function A1(a,l,d){w1(a,l),d.length>0&&(a.i=null,a.g.set(Er(a,l),b(d)),a.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],l=Array.from(this.g.keys());for(let m=0;m<l.length;m++){var d=l[m];const S=ns(d);d=T1(this,d);for(let O=0;O<d.length;O++){let F=S;d[O]!==""&&(F+="="+ns(d[O])),a.push(F)}}return this.i=a.join("&")};function R1(a){const l=new cs;return l.i=a.i,a.g&&(l.g=new Map(a.g),l.h=a.h),l}function Er(a,l){return l=String(l),a.j&&(l=l.toLowerCase()),l}function G6(a,l){l&&!a.j&&(Xn(a),a.i=null,a.g.forEach(function(d,m){const S=m.toLowerCase();m!=S&&(w1(this,m),A1(this,S,d))},a)),a.j=l}function W6(a,l){const d=new ts;if(o.Image){const m=new Image;m.onload=f(pn,d,"TestLoadImage: loaded",!0,l,m),m.onerror=f(pn,d,"TestLoadImage: error",!1,l,m),m.onabort=f(pn,d,"TestLoadImage: abort",!1,l,m),m.ontimeout=f(pn,d,"TestLoadImage: timeout",!1,l,m),o.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=a}else l(!1)}function z6(a,l){const d=new ts,m=new AbortController,S=setTimeout(()=>{m.abort(),pn(d,"TestPingServer: timeout",!1,l)},1e4);fetch(a,{signal:m.signal}).then(O=>{clearTimeout(S),O.ok?pn(d,"TestPingServer: ok",!0,l):pn(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(S),pn(d,"TestPingServer: error",!1,l)})}function pn(a,l,d,m,S){try{S&&(S.onload=null,S.onerror=null,S.onabort=null,S.ontimeout=null),m(d)}catch{}}function K6(){this.g=new N6}function ka(a){this.i=a.Sb||null,this.h=a.ab||!1}p(ka,e1),ka.prototype.g=function(){return new bi(this.i,this.h)};function bi(a,l){ze.call(this),this.H=a,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(bi,ze),n=bi.prototype,n.open=function(a,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=l,this.readyState=1,ls(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const l={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(l.body=a),(this.H||o).fetch(new Request(this.D,l)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,us(this)),this.readyState=0},n.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,ls(this)),this.g&&(this.readyState=3,ls(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;v1(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function v1(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}n.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var l=a.value?a.value:new Uint8Array(0);(l=this.B.decode(l,{stream:!a.done}))&&(this.response=this.responseText+=l)}a.done?us(this):ls(this),this.readyState==3&&v1(this)}},n.Oa=function(a){this.g&&(this.response=this.responseText=a,us(this))},n.Na=function(a){this.g&&(this.response=a,us(this))},n.ga=function(){this.g&&us(this)};function us(a){a.readyState=4,a.l=null,a.j=null,a.B=null,ls(a)}n.setRequestHeader=function(a,l){this.A.append(a,l)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=l.next();return a.join(`\r
`)};function ls(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(bi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function C1(a){let l="";return Ti(a,function(d,m){l+=m,l+=":",l+=d,l+=`\r
`}),l}function Da(a,l,d){e:{for(m in d){var m=!1;break e}m=!0}m||(d=C1(d),typeof a=="string"?d!=null&&ns(d):pe(a,l,d))}function we(a){ze.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(we,ze);var Y6=/^https?$/i,Q6=["POST","PUT"];n=we.prototype,n.Fa=function(a){this.H=a},n.ea=function(a,l,d,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);l=l?l.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():a1.g(),this.g.onreadystatechange=w(h(this.Ca,this));try{this.B=!0,this.g.open(l,String(a),!0),this.B=!1}catch(O){S1(this,O);return}if(a=d||"",d=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var S in m)d.set(S,m[S]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const O of m.keys())d.set(O,m.get(O));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(d.keys()).find(O=>O.toLowerCase()=="content-type"),S=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(Q6,l,void 0)>=0)||m||S||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[O,F]of d)this.g.setRequestHeader(O,F);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(O){S1(this,O)}};function S1(a,l){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=l,a.o=5,P1(a),Ni(a)}function P1(a){a.A||(a.A=!0,tt(a,"complete"),tt(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,tt(this,"complete"),tt(this,"abort"),Ni(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ni(this,!0)),we.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?b1(this):this.Xa())},n.Xa=function(){b1(this)};function b1(a){if(a.h&&typeof i<"u"){if(a.v&&mn(a)==4)setTimeout(a.Ca.bind(a),0);else if(tt(a,"readystatechange"),mn(a)==4){a.h=!1;try{const O=a.ca();e:switch(O){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var d;if(!(d=l)){var m;if(m=O===0){let F=String(a.D).match(E1)[1]||null;!F&&o.self&&o.self.location&&(F=o.self.location.protocol.slice(0,-1)),m=!Y6.test(F?F.toLowerCase():"")}d=m}if(d)tt(a,"complete"),tt(a,"success");else{a.o=6;try{var S=mn(a)>2?a.g.statusText:""}catch{S=""}a.l=S+" ["+a.ca()+"]",P1(a)}}finally{Ni(a)}}}}function Ni(a,l){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const d=a.g;a.g=null,l||tt(a,"ready");try{d.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function mn(a){return a.g?a.g.readyState:0}n.ca=function(){try{return mn(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(a){if(this.g){var l=this.g.responseText;return a&&l.indexOf(a)==0&&(l=l.substring(a.length)),b6(l)}};function N1(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function X6(a){const l={};a=(a.g&&mn(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<a.length;m++){if(_(a[m]))continue;var d=L6(a[m]);const S=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const O=l[S]||[];l[S]=O,O.push(d)}A6(l,function(m){return m.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function hs(a,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||l}function O1(a){this.za=0,this.i=[],this.j=new ts,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=hs("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=hs("baseRetryDelayMs",5e3,a),this.Za=hs("retryDelaySeedMs",1e4,a),this.Ta=hs("forwardChannelMaxRetries",2,a),this.va=hs("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new f1(a&&a.concurrentRequestLimit),this.Ba=new K6,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=O1.prototype,n.ka=8,n.I=1,n.connect=function(a,l,d,m){nt(0),this.W=a,this.H=l||{},d&&m!==void 0&&(this.H.OSID=d,this.H.OAID=m),this.F=this.X,this.J=B1(this,null,this.W),ki(this)};function Va(a){if(k1(a),a.I==3){var l=a.V++,d=Vt(a.J);if(pe(d,"SID",a.M),pe(d,"RID",l),pe(d,"TYPE","terminate"),ds(a,d),l=new dn(a,a.j,l),l.M=2,l.A=Pi(Vt(d)),d=!1,o.navigator&&o.navigator.sendBeacon)try{d=o.navigator.sendBeacon(l.A.toString(),"")}catch{}!d&&o.Image&&(new Image().src=l.A,d=!0),d||(l.g=$1(l.j,null),l.g.ea(l.A)),l.F=Date.now(),Si(l)}F1(a)}function Oi(a){a.g&&(xa(a),a.g.cancel(),a.g=null)}function k1(a){Oi(a),a.v&&(o.clearTimeout(a.v),a.v=null),Di(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function ki(a){if(!p1(a.h)&&!a.m){a.m=!0;var l=a.Ea;Ve||g(),Ee||(Ve(),Ee=!0),A.add(l,a),a.D=0}}function J6(a,l){return m1(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=l.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=es(h(a.Ea,a,l),U1(a,a.D)),a.D++,!0)}n.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const S=new dn(this,this.j,a);let O=this.o;if(this.U&&(O?(O=ju(O),Wu(O,this.U)):O=this.U),this.u!==null||this.R||(S.J=O,O=null),this.S)e:{for(var l=0,d=0;d<this.i.length;d++){t:{var m=this.i[d];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(l+=m,l>4096){l=d;break e}if(l===4096||d===this.i.length-1){l=d+1;break e}}l=1e3}else l=1e3;l=V1(this,S,l),d=Vt(this.J),pe(d,"RID",a),pe(d,"CVER",22),this.G&&pe(d,"X-HTTP-Session-Id",this.G),ds(this,d),O&&(this.R?l="headers="+ns(C1(O))+"&"+l:this.u&&Da(d,this.u,O)),Na(this.h,S),this.Ra&&pe(d,"TYPE","init"),this.S?(pe(d,"$req",l),pe(d,"SID","null"),S.U=!0,Ca(S,d,null)):Ca(S,d,l),this.I=2}}else this.I==3&&(a?D1(this,a):this.i.length==0||p1(this.h)||D1(this))};function D1(a,l){var d;l?d=l.l:d=a.V++;const m=Vt(a.J);pe(m,"SID",a.M),pe(m,"RID",d),pe(m,"AID",a.K),ds(a,m),a.u&&a.o&&Da(m,a.u,a.o),d=new dn(a,a.j,d,a.D+1),a.u===null&&(d.J=a.o),l&&(a.i=l.G.concat(a.i)),l=V1(a,d,1e3),d.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),Na(a.h,d),Ca(d,m,l)}function ds(a,l){a.H&&Ti(a.H,function(d,m){pe(l,m,d)}),a.l&&Ti({},function(d,m){pe(l,m,d)})}function V1(a,l,d){d=Math.min(a.i.length,d);const m=a.l?h(a.l.Ka,a.l,a):null;e:{var S=a.i;let ee=-1;for(;;){const xe=["count="+d];ee==-1?d>0?(ee=S[0].g,xe.push("ofs="+ee)):ee=0:xe.push("ofs="+ee);let fe=!0;for(let $e=0;$e<d;$e++){var O=S[$e].g;const Lt=S[$e].map;if(O-=ee,O<0)ee=Math.max(0,S[$e].g-100),fe=!1;else try{O="req"+O+"_"||"";try{var F=Lt instanceof Map?Lt:Object.entries(Lt);for(const[Zn,gn]of F){let _n=gn;c(gn)&&(_n=Ia(gn)),xe.push(O+Zn+"="+encodeURIComponent(_n))}}catch(Zn){throw xe.push(O+"type="+encodeURIComponent("_badmap")),Zn}}catch{m&&m(Lt)}}if(fe){F=xe.join("&");break e}}F=void 0}return a=a.i.splice(0,d),l.G=a,F}function L1(a){if(!a.g&&!a.v){a.Y=1;var l=a.Da;Ve||g(),Ee||(Ve(),Ee=!0),A.add(l,a),a.A=0}}function La(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=es(h(a.Da,a),U1(a,a.A)),a.A++,!0)}n.Da=function(){if(this.v=null,x1(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=es(h(this.Wa,this),a)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,nt(10),Oi(this),x1(this))};function xa(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function x1(a){a.g=new dn(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var l=Vt(a.na);pe(l,"RID","rpc"),pe(l,"SID",a.M),pe(l,"AID",a.K),pe(l,"CI",a.F?"0":"1"),!a.F&&a.ia&&pe(l,"TO",a.ia),pe(l,"TYPE","xmlhttp"),ds(a,l),a.u&&a.o&&Da(l,a.u,a.o),a.O&&(a.g.H=a.O);var d=a.g;a=a.ba,d.M=1,d.A=Pi(Vt(l)),d.u=null,d.R=!0,l1(d,a)}n.Va=function(){this.C!=null&&(this.C=null,Oi(this),La(this),nt(19))};function Di(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function M1(a,l){var d=null;if(a.g==l){Di(a),xa(a),a.g=null;var m=2}else if(ba(a.h,l))d=l.G,g1(a.h,l),m=1;else return;if(a.I!=0){if(l.o)if(m==1){d=l.u?l.u.length:0,l=Date.now()-l.F;var S=a.D;m=vi(),tt(m,new i1(m,d)),ki(a)}else L1(a);else if(S=l.m,S==3||S==0&&l.X>0||!(m==1&&J6(a,l)||m==2&&La(a)))switch(d&&d.length>0&&(l=a.h,l.i=l.i.concat(d)),S){case 1:Jn(a,5);break;case 4:Jn(a,10);break;case 3:Jn(a,6);break;default:Jn(a,2)}}}function U1(a,l){let d=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(d*=2),d*l}function Jn(a,l){if(a.j.info("Error code "+l),l==2){var d=h(a.bb,a),m=a.Ua;const S=!m;m=new fn(m||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||ss(m,"https"),Pi(m),S?W6(m.toString(),d):z6(m.toString(),d)}else nt(2);a.I=0,a.l&&a.l.pa(l),F1(a),k1(a)}n.bb=function(a){a?(this.j.info("Successfully pinged google.com"),nt(2)):(this.j.info("Failed to ping google.com"),nt(1))};function F1(a){if(a.I=0,a.ja=[],a.l){const l=_1(a.h);(l.length!=0||a.i.length!=0)&&(P(a.ja,l),P(a.ja,a.i),a.h.i.length=0,b(a.i),a.i.length=0),a.l.oa()}}function B1(a,l,d){var m=d instanceof fn?Vt(d):new fn(d);if(m.g!="")l&&(m.g=l+"."+m.g),is(m,m.u);else{var S=o.location;m=S.protocol,l=l?l+"."+S.hostname:S.hostname,S=+S.port;const O=new fn(null);m&&ss(O,m),l&&(O.g=l),S&&is(O,S),d&&(O.h=d),m=O}return d=a.G,l=a.wa,d&&l&&pe(m,d,l),pe(m,"VER",a.ka),ds(a,m),m}function $1(a,l,d){if(l&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return l=a.Aa&&!a.ma?new we(new ka({ab:d})):new we(a.ma),l.Fa(a.L),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function H1(){}n=H1.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Vi(){}Vi.prototype.g=function(a,l){return new pt(a,l)};function pt(a,l){ze.call(this),this.g=new O1(l),this.l=a,this.h=l&&l.messageUrlParams||null,a=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(a?a["X-WebChannel-Content-Type"]=l.messageContentType:a={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.sa&&(a?a["X-WebChannel-Client-Profile"]=l.sa:a={"X-WebChannel-Client-Profile":l.sa}),this.g.U=a,(a=l&&l.Qb)&&!_(a)&&(this.g.u=a),this.A=l&&l.supportsCrossDomainXhr||!1,this.v=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!_(l)&&(this.g.G=l,a=this.h,a!==null&&l in a&&(a=this.h,l in a&&delete a[l])),this.j=new yr(this)}p(pt,ze),pt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},pt.prototype.close=function(){Va(this.g)},pt.prototype.o=function(a){var l=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.v&&(d={},d.__data__=Ia(a),a=d);l.i.push(new U6(l.Ya++,a)),l.I==3&&ki(l)},pt.prototype.N=function(){this.g.l=null,delete this.j,Va(this.g),delete this.g,pt.Z.N.call(this)};function q1(a){Ta.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var l=a.__sm__;if(l){e:{for(const d in l){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,l=l!==null&&a in l?l[a]:void 0),this.data=l}else this.data=a}p(q1,Ta);function j1(){Aa.call(this),this.status=1}p(j1,Aa);function yr(a){this.g=a}p(yr,H1),yr.prototype.ra=function(){tt(this.g,"a")},yr.prototype.qa=function(a){tt(this.g,new q1(a))},yr.prototype.pa=function(a){tt(this.g,new j1)},yr.prototype.oa=function(){tt(this.g,"b")},Vi.prototype.createWebChannel=Vi.prototype.g,pt.prototype.send=pt.prototype.o,pt.prototype.open=pt.prototype.m,pt.prototype.close=pt.prototype.close,g2=function(){return new Vi},m2=function(){return vi()},p2=Yn,uc={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Ci.NO_ERROR=0,Ci.TIMEOUT=8,Ci.HTTP_ERROR=6,zi=Ci,o1.COMPLETE="complete",f2=o1,t1.EventType=Jr,Jr.OPEN="a",Jr.CLOSE="b",Jr.ERROR="c",Jr.MESSAGE="d",ze.prototype.listen=ze.prototype.J,ys=t1,we.prototype.listenOnce=we.prototype.K,we.prototype.getLastError=we.prototype.Ha,we.prototype.getLastErrorCode=we.prototype.ya,we.prototype.getStatus=we.prototype.ca,we.prototype.getResponseJson=we.prototype.La,we.prototype.getResponseText=we.prototype.la,we.prototype.send=we.prototype.ea,we.prototype.setWithCredentials=we.prototype.Fa,d2=we}).apply(typeof xi<"u"?xi:typeof self<"u"?self:typeof window<"u"?window:{});/*!
 * re2js
 * RE2JS is the JavaScript port of RE2, a regular expression engine that provides linear time matching
 *
 * @version v0.4.3
 * @author Alexey Vasiliev
 * @homepage https://github.com/le0pard/re2js#readme
 * @repository github:le0pard/re2js
 * @license MIT
 */class B{static FOLD_CASE=1;static LITERAL=2;static CLASS_NL=4;static DOT_NL=8;static ONE_LINE=16;static NON_GREEDY=32;static PERL_X=64;static UNICODE_GROUPS=128;static WAS_DOLLAR=256;static MATCH_NL=B.CLASS_NL|B.DOT_NL;static PERL=B.CLASS_NL|B.ONE_LINE|B.PERL_X|B.UNICODE_GROUPS;static POSIX=0;static UNANCHORED=0;static ANCHOR_START=1;static ANCHOR_BOTH=2}class N{static CODES=new Map([["\x07",7],["\b",8],["	",9],[`
`,10],["\v",11],["\f",12],["\r",13],[" ",32],['"',34],["$",36],["&",38],["(",40],[")",41],["*",42],["+",43],["-",45],[".",46],["0",48],["1",49],["2",50],["3",51],["4",52],["5",53],["6",54],["7",55],["8",56],["9",57],[":",58],["<",60],[">",62],["?",63],["A",65],["B",66],["C",67],["F",70],["P",80],["Q",81],["U",85],["Z",90],["[",91],["\\",92],["]",93],["^",94],["_",95],["a",97],["b",98],["f",102],["i",105],["m",109],["n",110],["r",114],["s",115],["t",116],["v",118],["x",120],["z",122],["{",123],["|",124],["}",125]]);static toUpperCase(e){const t=String.fromCodePoint(e).toUpperCase();if(t.length>1)return e;const r=String.fromCodePoint(t.codePointAt(0)).toLowerCase();return r.length>1||r.codePointAt(0)!==e?e:t.codePointAt(0)}static toLowerCase(e){const t=String.fromCodePoint(e).toLowerCase();if(t.length>1)return e;const r=String.fromCodePoint(t.codePointAt(0)).toUpperCase();return r.length>1||r.codePointAt(0)!==e?e:t.codePointAt(0)}}class y{static CASE_ORBIT=new Map([[75,107],[107,8490],[8490,75],[83,115],[115,383],[383,83],[181,924],[924,956],[956,181],[197,229],[229,8491],[8491,197],[452,453],[453,454],[454,452],[455,456],[456,457],[457,455],[458,459],[459,460],[460,458],[497,498],[498,499],[499,497],[837,921],[921,953],[953,8126],[8126,837],[914,946],[946,976],[976,914],[917,949],[949,1013],[1013,917],[920,952],[952,977],[977,1012],[1012,920],[922,954],[954,1008],[1008,922],[928,960],[960,982],[982,928],[929,961],[961,1009],[1009,929],[931,962],[962,963],[963,931],[934,966],[966,981],[981,934],[937,969],[969,8486],[8486,937],[1042,1074],[1074,7296],[7296,1042],[1044,1076],[1076,7297],[7297,1044],[1054,1086],[1086,7298],[7298,1054],[1057,1089],[1089,7299],[7299,1057],[1058,1090],[1090,7300],[7300,7301],[7301,1058],[1066,1098],[1098,7302],[7302,1066],[1122,1123],[1123,7303],[7303,1122],[7304,42570],[42570,42571],[42571,7304],[7776,7777],[7777,7835],[7835,7776],[223,7838],[7838,223],[8064,8072],[8072,8064],[8065,8073],[8073,8065],[8066,8074],[8074,8066],[8067,8075],[8075,8067],[8068,8076],[8076,8068],[8069,8077],[8077,8069],[8070,8078],[8078,8070],[8071,8079],[8079,8071],[8080,8088],[8088,8080],[8081,8089],[8089,8081],[8082,8090],[8090,8082],[8083,8091],[8091,8083],[8084,8092],[8092,8084],[8085,8093],[8093,8085],[8086,8094],[8094,8086],[8087,8095],[8095,8087],[8096,8104],[8104,8096],[8097,8105],[8105,8097],[8098,8106],[8106,8098],[8099,8107],[8107,8099],[8100,8108],[8108,8100],[8101,8109],[8109,8101],[8102,8110],[8110,8102],[8103,8111],[8111,8103],[8115,8124],[8124,8115],[8131,8140],[8140,8131],[912,8147],[8147,912],[944,8163],[8163,944],[8179,8188],[8188,8179],[64261,64262],[64262,64261],[66560,66600],[66600,66560],[66561,66601],[66601,66561],[66562,66602],[66602,66562],[66563,66603],[66603,66563],[66564,66604],[66604,66564],[66565,66605],[66605,66565],[66566,66606],[66606,66566],[66567,66607],[66607,66567],[66568,66608],[66608,66568],[66569,66609],[66609,66569],[66570,66610],[66610,66570],[66571,66611],[66611,66571],[66572,66612],[66612,66572],[66573,66613],[66613,66573],[66574,66614],[66614,66574],[66575,66615],[66615,66575],[66576,66616],[66616,66576],[66577,66617],[66617,66577],[66578,66618],[66618,66578],[66579,66619],[66619,66579],[66580,66620],[66620,66580],[66581,66621],[66621,66581],[66582,66622],[66622,66582],[66583,66623],[66623,66583],[66584,66624],[66624,66584],[66585,66625],[66625,66585],[66586,66626],[66626,66586],[66587,66627],[66627,66587],[66588,66628],[66628,66588],[66589,66629],[66629,66589],[66590,66630],[66630,66590],[66591,66631],[66631,66591],[66592,66632],[66632,66592],[66593,66633],[66633,66593],[66594,66634],[66634,66594],[66595,66635],[66635,66595],[66596,66636],[66636,66596],[66597,66637],[66637,66597],[66598,66638],[66638,66598],[66599,66639],[66639,66599],[66736,66776],[66776,66736],[66737,66777],[66777,66737],[66738,66778],[66778,66738],[66739,66779],[66779,66739],[66740,66780],[66780,66740],[66741,66781],[66781,66741],[66742,66782],[66782,66742],[66743,66783],[66783,66743],[66744,66784],[66784,66744],[66745,66785],[66785,66745],[66746,66786],[66786,66746],[66747,66787],[66787,66747],[66748,66788],[66788,66748],[66749,66789],[66789,66749],[66750,66790],[66790,66750],[66751,66791],[66791,66751],[66752,66792],[66792,66752],[66753,66793],[66793,66753],[66754,66794],[66794,66754],[66755,66795],[66795,66755],[66756,66796],[66796,66756],[66757,66797],[66797,66757],[66758,66798],[66798,66758],[66759,66799],[66799,66759],[66760,66800],[66800,66760],[66761,66801],[66801,66761],[66762,66802],[66802,66762],[66763,66803],[66803,66763],[66764,66804],[66804,66764],[66765,66805],[66805,66765],[66766,66806],[66806,66766],[66767,66807],[66807,66767],[66768,66808],[66808,66768],[66769,66809],[66809,66769],[66770,66810],[66810,66770],[66771,66811],[66811,66771],[66928,66967],[66967,66928],[66929,66968],[66968,66929],[66930,66969],[66969,66930],[66931,66970],[66970,66931],[66932,66971],[66971,66932],[66933,66972],[66972,66933],[66934,66973],[66973,66934],[66935,66974],[66974,66935],[66936,66975],[66975,66936],[66937,66976],[66976,66937],[66938,66977],[66977,66938],[66940,66979],[66979,66940],[66941,66980],[66980,66941],[66942,66981],[66981,66942],[66943,66982],[66982,66943],[66944,66983],[66983,66944],[66945,66984],[66984,66945],[66946,66985],[66985,66946],[66947,66986],[66986,66947],[66948,66987],[66987,66948],[66949,66988],[66988,66949],[66950,66989],[66989,66950],[66951,66990],[66990,66951],[66952,66991],[66991,66952],[66953,66992],[66992,66953],[66954,66993],[66993,66954],[66956,66995],[66995,66956],[66957,66996],[66996,66957],[66958,66997],[66997,66958],[66959,66998],[66998,66959],[66960,66999],[66999,66960],[66961,67e3],[67e3,66961],[66962,67001],[67001,66962],[66964,67003],[67003,66964],[66965,67004],[67004,66965],[68736,68800],[68800,68736],[68737,68801],[68801,68737],[68738,68802],[68802,68738],[68739,68803],[68803,68739],[68740,68804],[68804,68740],[68741,68805],[68805,68741],[68742,68806],[68806,68742],[68743,68807],[68807,68743],[68744,68808],[68808,68744],[68745,68809],[68809,68745],[68746,68810],[68810,68746],[68747,68811],[68811,68747],[68748,68812],[68812,68748],[68749,68813],[68813,68749],[68750,68814],[68814,68750],[68751,68815],[68815,68751],[68752,68816],[68816,68752],[68753,68817],[68817,68753],[68754,68818],[68818,68754],[68755,68819],[68819,68755],[68756,68820],[68820,68756],[68757,68821],[68821,68757],[68758,68822],[68822,68758],[68759,68823],[68823,68759],[68760,68824],[68824,68760],[68761,68825],[68825,68761],[68762,68826],[68826,68762],[68763,68827],[68827,68763],[68764,68828],[68828,68764],[68765,68829],[68829,68765],[68766,68830],[68830,68766],[68767,68831],[68831,68767],[68768,68832],[68832,68768],[68769,68833],[68833,68769],[68770,68834],[68834,68770],[68771,68835],[68835,68771],[68772,68836],[68836,68772],[68773,68837],[68837,68773],[68774,68838],[68838,68774],[68775,68839],[68839,68775],[68776,68840],[68840,68776],[68777,68841],[68841,68777],[68778,68842],[68842,68778],[68779,68843],[68843,68779],[68780,68844],[68844,68780],[68781,68845],[68845,68781],[68782,68846],[68846,68782],[68783,68847],[68847,68783],[68784,68848],[68848,68784],[68785,68849],[68849,68785],[68786,68850],[68850,68786],[71840,71872],[71872,71840],[71841,71873],[71873,71841],[71842,71874],[71874,71842],[71843,71875],[71875,71843],[71844,71876],[71876,71844],[71845,71877],[71877,71845],[71846,71878],[71878,71846],[71847,71879],[71879,71847],[71848,71880],[71880,71848],[71849,71881],[71881,71849],[71850,71882],[71882,71850],[71851,71883],[71883,71851],[71852,71884],[71884,71852],[71853,71885],[71885,71853],[71854,71886],[71886,71854],[71855,71887],[71887,71855],[71856,71888],[71888,71856],[71857,71889],[71889,71857],[71858,71890],[71890,71858],[71859,71891],[71891,71859],[71860,71892],[71892,71860],[71861,71893],[71893,71861],[71862,71894],[71894,71862],[71863,71895],[71895,71863],[71864,71896],[71896,71864],[71865,71897],[71897,71865],[71866,71898],[71898,71866],[71867,71899],[71899,71867],[71868,71900],[71900,71868],[71869,71901],[71901,71869],[71870,71902],[71902,71870],[71871,71903],[71903,71871],[93760,93792],[93792,93760],[93761,93793],[93793,93761],[93762,93794],[93794,93762],[93763,93795],[93795,93763],[93764,93796],[93796,93764],[93765,93797],[93797,93765],[93766,93798],[93798,93766],[93767,93799],[93799,93767],[93768,93800],[93800,93768],[93769,93801],[93801,93769],[93770,93802],[93802,93770],[93771,93803],[93803,93771],[93772,93804],[93804,93772],[93773,93805],[93805,93773],[93774,93806],[93806,93774],[93775,93807],[93807,93775],[93776,93808],[93808,93776],[93777,93809],[93809,93777],[93778,93810],[93810,93778],[93779,93811],[93811,93779],[93780,93812],[93812,93780],[93781,93813],[93813,93781],[93782,93814],[93814,93782],[93783,93815],[93815,93783],[93784,93816],[93816,93784],[93785,93817],[93817,93785],[93786,93818],[93818,93786],[93787,93819],[93819,93787],[93788,93820],[93820,93788],[93789,93821],[93821,93789],[93790,93822],[93822,93790],[93791,93823],[93823,93791],[125184,125218],[125218,125184],[125185,125219],[125219,125185],[125186,125220],[125220,125186],[125187,125221],[125221,125187],[125188,125222],[125222,125188],[125189,125223],[125223,125189],[125190,125224],[125224,125190],[125191,125225],[125225,125191],[125192,125226],[125226,125192],[125193,125227],[125227,125193],[125194,125228],[125228,125194],[125195,125229],[125229,125195],[125196,125230],[125230,125196],[125197,125231],[125231,125197],[125198,125232],[125232,125198],[125199,125233],[125233,125199],[125200,125234],[125234,125200],[125201,125235],[125235,125201],[125202,125236],[125236,125202],[125203,125237],[125237,125203],[125204,125238],[125238,125204],[125205,125239],[125239,125205],[125206,125240],[125240,125206],[125207,125241],[125241,125207],[125208,125242],[125242,125208],[125209,125243],[125243,125209],[125210,125244],[125244,125210],[125211,125245],[125245,125211],[125212,125246],[125246,125212],[125213,125247],[125247,125213],[125214,125248],[125248,125214],[125215,125249],[125249,125215],[125216,125250],[125250,125216],[125217,125251],[125251,125217]]);static C=[[0,31,1],[127,159,1],[173,888,715],[889,896,7],[897,899,1],[907,909,2],[930,1328,398],[1367,1368,1],[1419,1420,1],[1424,1480,56],[1481,1487,1],[1515,1518,1],[1525,1541,1],[1564,1757,193],[1806,1807,1],[1867,1868,1],[1970,1983,1],[2043,2044,1],[2094,2095,1],[2111,2140,29],[2141,2143,2],[2155,2159,1],[2191,2199,1],[2274,2436,162],[2445,2446,1],[2449,2450,1],[2473,2481,8],[2483,2485,1],[2490,2491,1],[2501,2502,1],[2505,2506,1],[2511,2518,1],[2520,2523,1],[2526,2532,6],[2533,2559,26],[2560,2564,4],[2571,2574,1],[2577,2578,1],[2601,2609,8],[2612,2618,3],[2619,2621,2],[2627,2630,1],[2633,2634,1],[2638,2640,1],[2642,2648,1],[2653,2655,2],[2656,2661,1],[2679,2688,1],[2692,2702,10],[2706,2729,23],[2737,2740,3],[2746,2747,1],[2758,2766,4],[2767,2769,2],[2770,2783,1],[2788,2789,1],[2802,2808,1],[2816,2820,4],[2829,2830,1],[2833,2834,1],[2857,2865,8],[2868,2874,6],[2875,2885,10],[2886,2889,3],[2890,2894,4],[2895,2900,1],[2904,2907,1],[2910,2916,6],[2917,2936,19],[2937,2945,1],[2948,2955,7],[2956,2957,1],[2961,2966,5],[2967,2968,1],[2971,2973,2],[2976,2978,1],[2981,2983,1],[2987,2989,1],[3002,3005,1],[3011,3013,1],[3017,3022,5],[3023,3025,2],[3026,3030,1],[3032,3045,1],[3067,3071,1],[3085,3089,4],[3113,3130,17],[3131,3141,10],[3145,3150,5],[3151,3156,1],[3159,3163,4],[3164,3166,2],[3167,3172,5],[3173,3184,11],[3185,3190,1],[3213,3217,4],[3241,3252,11],[3258,3259,1],[3269,3273,4],[3278,3284,1],[3287,3292,1],[3295,3300,5],[3301,3312,11],[3316,3327,1],[3341,3345,4],[3397,3401,4],[3408,3411,1],[3428,3429,1],[3456,3460,4],[3479,3481,1],[3506,3516,10],[3518,3519,1],[3527,3529,1],[3531,3534,1],[3541,3543,2],[3552,3557,1],[3568,3569,1],[3573,3584,1],[3643,3646,1],[3676,3712,1],[3715,3717,2],[3723,3748,25],[3750,3774,24],[3775,3781,6],[3783,3791,8],[3802,3803,1],[3808,3839,1],[3912,3949,37],[3950,3952,1],[3992,4029,37],[4045,4059,14],[4060,4095,1],[4294,4296,2],[4297,4300,1],[4302,4303,1],[4681,4686,5],[4687,4695,8],[4697,4702,5],[4703,4745,42],[4750,4751,1],[4785,4790,5],[4791,4799,8],[4801,4806,5],[4807,4823,16],[4881,4886,5],[4887,4955,68],[4956,4989,33],[4990,4991,1],[5018,5023,1],[5110,5111,1],[5118,5119,1],[5789,5791,1],[5881,5887,1],[5910,5918,1],[5943,5951,1],[5972,5983,1],[5997,6001,4],[6004,6015,1],[6110,6111,1],[6122,6127,1],[6138,6143,1],[6158,6170,12],[6171,6175,1],[6265,6271,1],[6315,6319,1],[6390,6399,1],[6431,6444,13],[6445,6447,1],[6460,6463,1],[6465,6467,1],[6510,6511,1],[6517,6527,1],[6572,6575,1],[6602,6607,1],[6619,6621,1],[6684,6685,1],[6751,6781,30],[6782,6794,12],[6795,6799,1],[6810,6815,1],[6830,6831,1],[6863,6911,1],[6989,6991,1],[7039,7156,117],[7157,7163,1],[7224,7226,1],[7242,7244,1],[7305,7311,1],[7355,7356,1],[7368,7375,1],[7419,7423,1],[7958,7959,1],[7966,7967,1],[8006,8007,1],[8014,8015,1],[8024,8030,2],[8062,8063,1],[8117,8133,16],[8148,8149,1],[8156,8176,20],[8177,8181,4],[8191,8203,12],[8204,8207,1],[8234,8238,1],[8288,8303,1],[8306,8307,1],[8335,8349,14],[8350,8351,1],[8385,8399,1],[8433,8447,1],[8588,8591,1],[9255,9279,1],[9291,9311,1],[11124,11125,1],[11158,11508,350],[11509,11512,1],[11558,11560,2],[11561,11564,1],[11566,11567,1],[11624,11630,1],[11633,11646,1],[11671,11679,1],[11687,11743,8],[11870,11903,1],[11930,12020,90],[12021,12031,1],[12246,12271,1],[12352,12439,87],[12440,12544,104],[12545,12548,1],[12592,12687,95],[12772,12782,1],[12831,42125,29294],[42126,42127,1],[42183,42191,1],[42540,42559,1],[42744,42751,1],[42955,42959,1],[42962,42964,2],[42970,42993,1],[43053,43055,1],[43066,43071,1],[43128,43135,1],[43206,43213,1],[43226,43231,1],[43348,43358,1],[43389,43391,1],[43470,43482,12],[43483,43485,1],[43519,43575,56],[43576,43583,1],[43598,43599,1],[43610,43611,1],[43715,43738,1],[43767,43776,1],[43783,43784,1],[43791,43792,1],[43799,43807,1],[43815,43823,8],[43884,43887,1],[44014,44015,1],[44026,44031,1],[55204,55215,1],[55239,55242,1],[55292,63743,1],[64110,64111,1],[64218,64255,1],[64263,64274,1],[64280,64284,1],[64311,64317,6],[64319,64325,3],[64451,64466,1],[64912,64913,1],[64968,64974,1],[64976,65007,1],[65050,65055,1],[65107,65127,20],[65132,65135,1],[65141,65277,136],[65278,65280,1],[65471,65473,1],[65480,65481,1],[65488,65489,1],[65496,65497,1],[65501,65503,1],[65511,65519,8],[65520,65531,1],[65534,65535,1],[65548,65575,27],[65595,65598,3],[65614,65615,1],[65630,65663,1],[65787,65791,1],[65795,65798,1],[65844,65846,1],[65935,65949,14],[65950,65951,1],[65953,65999,1],[66046,66175,1],[66205,66207,1],[66257,66271,1],[66300,66303,1],[66340,66348,1],[66379,66383,1],[66427,66431,1],[66462,66500,38],[66501,66503,1],[66518,66559,1],[66718,66719,1],[66730,66735,1],[66772,66775,1],[66812,66815,1],[66856,66863,1],[66916,66926,1],[66939,66955,16],[66963,66966,3],[66978,66994,16],[67002,67005,3],[67006,67071,1],[67383,67391,1],[67414,67423,1],[67432,67455,1],[67462,67505,43],[67515,67583,1],[67590,67591,1],[67593,67638,45],[67641,67643,1],[67645,67646,1],[67670,67743,73],[67744,67750,1],[67760,67807,1],[67827,67830,3],[67831,67834,1],[67868,67870,1],[67898,67902,1],[67904,67967,1],[68024,68027,1],[68048,68049,1],[68100,68103,3],[68104,68107,1],[68116,68120,4],[68150,68151,1],[68155,68158,1],[68169,68175,1],[68185,68191,1],[68256,68287,1],[68327,68330,1],[68343,68351,1],[68406,68408,1],[68438,68439,1],[68467,68471,1],[68498,68504,1],[68509,68520,1],[68528,68607,1],[68681,68735,1],[68787,68799,1],[68851,68857,1],[68904,68911,1],[68922,69215,1],[69247,69290,43],[69294,69295,1],[69298,69372,1],[69416,69423,1],[69466,69487,1],[69514,69551,1],[69580,69599,1],[69623,69631,1],[69710,69713,1],[69750,69758,1],[69821,69827,6],[69828,69839,1],[69865,69871,1],[69882,69887,1],[69941,69960,19],[69961,69967,1],[70007,70015,1],[70112,70133,21],[70134,70143,1],[70162,70210,48],[70211,70271,1],[70279,70281,2],[70286,70302,16],[70314,70319,1],[70379,70383,1],[70394,70399,1],[70404,70413,9],[70414,70417,3],[70418,70441,23],[70449,70452,3],[70458,70469,11],[70470,70473,3],[70474,70478,4],[70479,70481,2],[70482,70486,1],[70488,70492,1],[70500,70501,1],[70509,70511,1],[70517,70655,1],[70748,70754,6],[70755,70783,1],[70856,70863,1],[70874,71039,1],[71094,71095,1],[71134,71167,1],[71237,71247,1],[71258,71263,1],[71277,71295,1],[71354,71359,1],[71370,71423,1],[71451,71452,1],[71468,71471,1],[71495,71679,1],[71740,71839,1],[71923,71934,1],[71943,71944,1],[71946,71947,1],[71956,71959,3],[71990,71993,3],[71994,72007,13],[72008,72015,1],[72026,72095,1],[72104,72105,1],[72152,72153,1],[72165,72191,1],[72264,72271,1],[72355,72367,1],[72441,72447,1],[72458,72703,1],[72713,72759,46],[72774,72783,1],[72813,72815,1],[72848,72849,1],[72872,72887,15],[72888,72959,1],[72967,72970,3],[73015,73017,1],[73019,73022,3],[73032,73039,1],[73050,73055,1],[73062,73065,3],[73103,73106,3],[73113,73119,1],[73130,73439,1],[73465,73471,1],[73489,73531,42],[73532,73533,1],[73562,73647,1],[73649,73663,1],[73714,73726,1],[74650,74751,1],[74863,74869,6],[74870,74879,1],[75076,77711,1],[77811,77823,1],[78896,78911,1],[78934,82943,1],[83527,92159,1],[92729,92735,1],[92767,92778,11],[92779,92781,1],[92863,92874,11],[92875,92879,1],[92910,92911,1],[92918,92927,1],[92998,93007,1],[93018,93026,8],[93048,93052,1],[93072,93759,1],[93851,93951,1],[94027,94030,1],[94088,94094,1],[94112,94175,1],[94181,94191,1],[94194,94207,1],[100344,100351,1],[101590,101631,1],[101641,110575,1],[110580,110588,8],[110591,110883,292],[110884,110897,1],[110899,110927,1],[110931,110932,1],[110934,110947,1],[110952,110959,1],[111356,113663,1],[113771,113775,1],[113789,113791,1],[113801,113807,1],[113818,113819,1],[113824,118527,1],[118574,118575,1],[118599,118607,1],[118724,118783,1],[119030,119039,1],[119079,119080,1],[119155,119162,1],[119275,119295,1],[119366,119487,1],[119508,119519,1],[119540,119551,1],[119639,119647,1],[119673,119807,1],[119893,119965,72],[119968,119969,1],[119971,119972,1],[119975,119976,1],[119981,119994,13],[119996,120004,8],[120070,120075,5],[120076,120085,9],[120093,120122,29],[120127,120133,6],[120135,120137,1],[120145,120486,341],[120487,120780,293],[120781,121484,703],[121485,121498,1],[121504,121520,16],[121521,122623,1],[122655,122660,1],[122667,122879,1],[122887,122905,18],[122906,122914,8],[122917,122923,6],[122924,122927,1],[122990,123022,1],[123024,123135,1],[123181,123183,1],[123198,123199,1],[123210,123213,1],[123216,123535,1],[123567,123583,1],[123642,123646,1],[123648,124111,1],[124154,124895,1],[124903,124908,5],[124911,124927,16],[125125,125126,1],[125143,125183,1],[125260,125263,1],[125274,125277,1],[125280,126064,1],[126133,126208,1],[126270,126463,1],[126468,126496,28],[126499,126501,2],[126502,126504,2],[126515,126520,5],[126522,126524,2],[126525,126529,1],[126531,126534,1],[126536,126540,2],[126544,126547,3],[126549,126550,1],[126552,126560,2],[126563,126565,2],[126566,126571,5],[126579,126589,5],[126591,126602,11],[126620,126624,1],[126628,126634,6],[126652,126703,1],[126706,126975,1],[127020,127023,1],[127124,127135,1],[127151,127152,1],[127168,127184,16],[127222,127231,1],[127406,127461,1],[127491,127503,1],[127548,127551,1],[127561,127567,1],[127570,127583,1],[127590,127743,1],[128728,128731,1],[128749,128751,1],[128765,128767,1],[128887,128890,1],[128986,128991,1],[129004,129007,1],[129009,129023,1],[129036,129039,1],[129096,129103,1],[129114,129119,1],[129160,129167,1],[129198,129199,1],[129202,129279,1],[129620,129631,1],[129646,129647,1],[129661,129663,1],[129673,129679,1],[129726,129734,8],[129735,129741,1],[129756,129759,1],[129769,129775,1],[129785,129791,1],[129939,129995,56],[129996,130031,1],[130042,131071,1],[173792,173823,1],[177978,177983,1],[178206,178207,1],[183970,183983,1],[191457,191471,1],[192094,194559,1],[195102,196607,1],[201547,201551,1],[205744,917759,1],[918e3,1114111,1]];static Cc=[[0,31,1],[127,159,1]];static Cf=[[173,1536,1363],[1537,1541,1],[1564,1757,193],[1807,2192,385],[2193,2274,81],[6158,8203,2045],[8204,8207,1],[8234,8238,1],[8288,8292,1],[8294,8303,1],[65279,65529,250],[65530,65531,1],[69821,69837,16],[78896,78911,1],[113824,113827,1],[119155,119162,1],[917505,917536,31],[917537,917631,1]];static Co=[[57344,63743,1],[983040,1048573,1],[1048576,1114109,1]];static Cs=[[55296,57343,1]];static L=[[65,90,1],[97,122,1],[170,181,11],[186,192,6],[193,214,1],[216,246,1],[248,705,1],[710,721,1],[736,740,1],[748,750,2],[880,884,1],[886,887,1],[890,893,1],[895,902,7],[904,906,1],[908,910,2],[911,929,1],[931,1013,1],[1015,1153,1],[1162,1327,1],[1329,1366,1],[1369,1376,7],[1377,1416,1],[1488,1514,1],[1519,1522,1],[1568,1610,1],[1646,1647,1],[1649,1747,1],[1749,1765,16],[1766,1774,8],[1775,1786,11],[1787,1788,1],[1791,1808,17],[1810,1839,1],[1869,1957,1],[1969,1994,25],[1995,2026,1],[2036,2037,1],[2042,2048,6],[2049,2069,1],[2074,2084,10],[2088,2112,24],[2113,2136,1],[2144,2154,1],[2160,2183,1],[2185,2190,1],[2208,2249,1],[2308,2361,1],[2365,2384,19],[2392,2401,1],[2417,2432,1],[2437,2444,1],[2447,2448,1],[2451,2472,1],[2474,2480,1],[2482,2486,4],[2487,2489,1],[2493,2510,17],[2524,2525,1],[2527,2529,1],[2544,2545,1],[2556,2565,9],[2566,2570,1],[2575,2576,1],[2579,2600,1],[2602,2608,1],[2610,2611,1],[2613,2614,1],[2616,2617,1],[2649,2652,1],[2654,2674,20],[2675,2676,1],[2693,2701,1],[2703,2705,1],[2707,2728,1],[2730,2736,1],[2738,2739,1],[2741,2745,1],[2749,2768,19],[2784,2785,1],[2809,2821,12],[2822,2828,1],[2831,2832,1],[2835,2856,1],[2858,2864,1],[2866,2867,1],[2869,2873,1],[2877,2908,31],[2909,2911,2],[2912,2913,1],[2929,2947,18],[2949,2954,1],[2958,2960,1],[2962,2965,1],[2969,2970,1],[2972,2974,2],[2975,2979,4],[2980,2984,4],[2985,2986,1],[2990,3001,1],[3024,3077,53],[3078,3084,1],[3086,3088,1],[3090,3112,1],[3114,3129,1],[3133,3160,27],[3161,3162,1],[3165,3168,3],[3169,3200,31],[3205,3212,1],[3214,3216,1],[3218,3240,1],[3242,3251,1],[3253,3257,1],[3261,3293,32],[3294,3296,2],[3297,3313,16],[3314,3332,18],[3333,3340,1],[3342,3344,1],[3346,3386,1],[3389,3406,17],[3412,3414,1],[3423,3425,1],[3450,3455,1],[3461,3478,1],[3482,3505,1],[3507,3515,1],[3517,3520,3],[3521,3526,1],[3585,3632,1],[3634,3635,1],[3648,3654,1],[3713,3714,1],[3716,3718,2],[3719,3722,1],[3724,3747,1],[3749,3751,2],[3752,3760,1],[3762,3763,1],[3773,3776,3],[3777,3780,1],[3782,3804,22],[3805,3807,1],[3840,3904,64],[3905,3911,1],[3913,3948,1],[3976,3980,1],[4096,4138,1],[4159,4176,17],[4177,4181,1],[4186,4189,1],[4193,4197,4],[4198,4206,8],[4207,4208,1],[4213,4225,1],[4238,4256,18],[4257,4293,1],[4295,4301,6],[4304,4346,1],[4348,4680,1],[4682,4685,1],[4688,4694,1],[4696,4698,2],[4699,4701,1],[4704,4744,1],[4746,4749,1],[4752,4784,1],[4786,4789,1],[4792,4798,1],[4800,4802,2],[4803,4805,1],[4808,4822,1],[4824,4880,1],[4882,4885,1],[4888,4954,1],[4992,5007,1],[5024,5109,1],[5112,5117,1],[5121,5740,1],[5743,5759,1],[5761,5786,1],[5792,5866,1],[5873,5880,1],[5888,5905,1],[5919,5937,1],[5952,5969,1],[5984,5996,1],[5998,6e3,1],[6016,6067,1],[6103,6108,5],[6176,6264,1],[6272,6276,1],[6279,6312,1],[6314,6320,6],[6321,6389,1],[6400,6430,1],[6480,6509,1],[6512,6516,1],[6528,6571,1],[6576,6601,1],[6656,6678,1],[6688,6740,1],[6823,6917,94],[6918,6963,1],[6981,6988,1],[7043,7072,1],[7086,7087,1],[7098,7141,1],[7168,7203,1],[7245,7247,1],[7258,7293,1],[7296,7304,1],[7312,7354,1],[7357,7359,1],[7401,7404,1],[7406,7411,1],[7413,7414,1],[7418,7424,6],[7425,7615,1],[7680,7957,1],[7960,7965,1],[7968,8005,1],[8008,8013,1],[8016,8023,1],[8025,8031,2],[8032,8061,1],[8064,8116,1],[8118,8124,1],[8126,8130,4],[8131,8132,1],[8134,8140,1],[8144,8147,1],[8150,8155,1],[8160,8172,1],[8178,8180,1],[8182,8188,1],[8305,8319,14],[8336,8348,1],[8450,8455,5],[8458,8467,1],[8469,8473,4],[8474,8477,1],[8484,8490,2],[8491,8493,1],[8495,8505,1],[8508,8511,1],[8517,8521,1],[8526,8579,53],[8580,11264,2684],[11265,11492,1],[11499,11502,1],[11506,11507,1],[11520,11557,1],[11559,11565,6],[11568,11623,1],[11631,11648,17],[11649,11670,1],[11680,11686,1],[11688,11694,1],[11696,11702,1],[11704,11710,1],[11712,11718,1],[11720,11726,1],[11728,11734,1],[11736,11742,1],[11823,12293,470],[12294,12337,43],[12338,12341,1],[12347,12348,1],[12353,12438,1],[12445,12447,1],[12449,12538,1],[12540,12543,1],[12549,12591,1],[12593,12686,1],[12704,12735,1],[12784,12799,1],[13312,19903,1],[19968,42124,1],[42192,42237,1],[42240,42508,1],[42512,42527,1],[42538,42539,1],[42560,42606,1],[42623,42653,1],[42656,42725,1],[42775,42783,1],[42786,42888,1],[42891,42954,1],[42960,42961,1],[42963,42965,2],[42966,42969,1],[42994,43009,1],[43011,43013,1],[43015,43018,1],[43020,43042,1],[43072,43123,1],[43138,43187,1],[43250,43255,1],[43259,43261,2],[43262,43274,12],[43275,43301,1],[43312,43334,1],[43360,43388,1],[43396,43442,1],[43471,43488,17],[43489,43492,1],[43494,43503,1],[43514,43518,1],[43520,43560,1],[43584,43586,1],[43588,43595,1],[43616,43638,1],[43642,43646,4],[43647,43695,1],[43697,43701,4],[43702,43705,3],[43706,43709,1],[43712,43714,2],[43739,43741,1],[43744,43754,1],[43762,43764,1],[43777,43782,1],[43785,43790,1],[43793,43798,1],[43808,43814,1],[43816,43822,1],[43824,43866,1],[43868,43881,1],[43888,44002,1],[44032,55203,1],[55216,55238,1],[55243,55291,1],[63744,64109,1],[64112,64217,1],[64256,64262,1],[64275,64279,1],[64285,64287,2],[64288,64296,1],[64298,64310,1],[64312,64316,1],[64318,64320,2],[64321,64323,2],[64324,64326,2],[64327,64433,1],[64467,64829,1],[64848,64911,1],[64914,64967,1],[65008,65019,1],[65136,65140,1],[65142,65276,1],[65313,65338,1],[65345,65370,1],[65382,65470,1],[65474,65479,1],[65482,65487,1],[65490,65495,1],[65498,65500,1],[65536,65547,1],[65549,65574,1],[65576,65594,1],[65596,65597,1],[65599,65613,1],[65616,65629,1],[65664,65786,1],[66176,66204,1],[66208,66256,1],[66304,66335,1],[66349,66368,1],[66370,66377,1],[66384,66421,1],[66432,66461,1],[66464,66499,1],[66504,66511,1],[66560,66717,1],[66736,66771,1],[66776,66811,1],[66816,66855,1],[66864,66915,1],[66928,66938,1],[66940,66954,1],[66956,66962,1],[66964,66965,1],[66967,66977,1],[66979,66993,1],[66995,67001,1],[67003,67004,1],[67072,67382,1],[67392,67413,1],[67424,67431,1],[67456,67461,1],[67463,67504,1],[67506,67514,1],[67584,67589,1],[67592,67594,2],[67595,67637,1],[67639,67640,1],[67644,67647,3],[67648,67669,1],[67680,67702,1],[67712,67742,1],[67808,67826,1],[67828,67829,1],[67840,67861,1],[67872,67897,1],[67968,68023,1],[68030,68031,1],[68096,68112,16],[68113,68115,1],[68117,68119,1],[68121,68149,1],[68192,68220,1],[68224,68252,1],[68288,68295,1],[68297,68324,1],[68352,68405,1],[68416,68437,1],[68448,68466,1],[68480,68497,1],[68608,68680,1],[68736,68786,1],[68800,68850,1],[68864,68899,1],[69248,69289,1],[69296,69297,1],[69376,69404,1],[69415,69424,9],[69425,69445,1],[69488,69505,1],[69552,69572,1],[69600,69622,1],[69635,69687,1],[69745,69746,1],[69749,69763,14],[69764,69807,1],[69840,69864,1],[69891,69926,1],[69956,69959,3],[69968,70002,1],[70006,70019,13],[70020,70066,1],[70081,70084,1],[70106,70108,2],[70144,70161,1],[70163,70187,1],[70207,70208,1],[70272,70278,1],[70280,70282,2],[70283,70285,1],[70287,70301,1],[70303,70312,1],[70320,70366,1],[70405,70412,1],[70415,70416,1],[70419,70440,1],[70442,70448,1],[70450,70451,1],[70453,70457,1],[70461,70480,19],[70493,70497,1],[70656,70708,1],[70727,70730,1],[70751,70753,1],[70784,70831,1],[70852,70853,1],[70855,71040,185],[71041,71086,1],[71128,71131,1],[71168,71215,1],[71236,71296,60],[71297,71338,1],[71352,71424,72],[71425,71450,1],[71488,71494,1],[71680,71723,1],[71840,71903,1],[71935,71942,1],[71945,71948,3],[71949,71955,1],[71957,71958,1],[71960,71983,1],[71999,72001,2],[72096,72103,1],[72106,72144,1],[72161,72163,2],[72192,72203,11],[72204,72242,1],[72250,72272,22],[72284,72329,1],[72349,72368,19],[72369,72440,1],[72704,72712,1],[72714,72750,1],[72768,72818,50],[72819,72847,1],[72960,72966,1],[72968,72969,1],[72971,73008,1],[73030,73056,26],[73057,73061,1],[73063,73064,1],[73066,73097,1],[73112,73440,328],[73441,73458,1],[73474,73476,2],[73477,73488,1],[73490,73523,1],[73648,73728,80],[73729,74649,1],[74880,75075,1],[77712,77808,1],[77824,78895,1],[78913,78918,1],[82944,83526,1],[92160,92728,1],[92736,92766,1],[92784,92862,1],[92880,92909,1],[92928,92975,1],[92992,92995,1],[93027,93047,1],[93053,93071,1],[93760,93823,1],[93952,94026,1],[94032,94099,67],[94100,94111,1],[94176,94177,1],[94179,94208,29],[94209,100343,1],[100352,101589,1],[101632,101640,1],[110576,110579,1],[110581,110587,1],[110589,110590,1],[110592,110882,1],[110898,110928,30],[110929,110930,1],[110933,110948,15],[110949,110951,1],[110960,111355,1],[113664,113770,1],[113776,113788,1],[113792,113800,1],[113808,113817,1],[119808,119892,1],[119894,119964,1],[119966,119967,1],[119970,119973,3],[119974,119977,3],[119978,119980,1],[119982,119993,1],[119995,119997,2],[119998,120003,1],[120005,120069,1],[120071,120074,1],[120077,120084,1],[120086,120092,1],[120094,120121,1],[120123,120126,1],[120128,120132,1],[120134,120138,4],[120139,120144,1],[120146,120485,1],[120488,120512,1],[120514,120538,1],[120540,120570,1],[120572,120596,1],[120598,120628,1],[120630,120654,1],[120656,120686,1],[120688,120712,1],[120714,120744,1],[120746,120770,1],[120772,120779,1],[122624,122654,1],[122661,122666,1],[122928,122989,1],[123136,123180,1],[123191,123197,1],[123214,123536,322],[123537,123565,1],[123584,123627,1],[124112,124139,1],[124896,124902,1],[124904,124907,1],[124909,124910,1],[124912,124926,1],[124928,125124,1],[125184,125251,1],[125259,126464,1205],[126465,126467,1],[126469,126495,1],[126497,126498,1],[126500,126503,3],[126505,126514,1],[126516,126519,1],[126521,126523,2],[126530,126535,5],[126537,126541,2],[126542,126543,1],[126545,126546,1],[126548,126551,3],[126553,126561,2],[126562,126564,2],[126567,126570,1],[126572,126578,1],[126580,126583,1],[126585,126588,1],[126590,126592,2],[126593,126601,1],[126603,126619,1],[126625,126627,1],[126629,126633,1],[126635,126651,1],[131072,173791,1],[173824,177977,1],[177984,178205,1],[178208,183969,1],[183984,191456,1],[191472,192093,1],[194560,195101,1],[196608,201546,1],[201552,205743,1]];static foldL=[[837,837,1]];static Ll=[[97,122,1],[181,223,42],[224,246,1],[248,255,1],[257,311,2],[312,328,2],[329,375,2],[378,382,2],[383,384,1],[387,389,2],[392,396,4],[397,402,5],[405,409,4],[410,411,1],[414,417,3],[419,421,2],[424,426,2],[427,429,2],[432,436,4],[438,441,3],[442,445,3],[446,447,1],[454,460,3],[462,476,2],[477,495,2],[496,499,3],[501,505,4],[507,563,2],[564,569,1],[572,575,3],[576,578,2],[583,591,2],[592,659,1],[661,687,1],[881,883,2],[887,891,4],[892,893,1],[912,940,28],[941,974,1],[976,977,1],[981,983,1],[985,1007,2],[1008,1011,1],[1013,1019,3],[1020,1072,52],[1073,1119,1],[1121,1153,2],[1163,1215,2],[1218,1230,2],[1231,1327,2],[1376,1416,1],[4304,4346,1],[4349,4351,1],[5112,5117,1],[7296,7304,1],[7424,7467,1],[7531,7543,1],[7545,7578,1],[7681,7829,2],[7830,7837,1],[7839,7935,2],[7936,7943,1],[7952,7957,1],[7968,7975,1],[7984,7991,1],[8e3,8005,1],[8016,8023,1],[8032,8039,1],[8048,8061,1],[8064,8071,1],[8080,8087,1],[8096,8103,1],[8112,8116,1],[8118,8119,1],[8126,8130,4],[8131,8132,1],[8134,8135,1],[8144,8147,1],[8150,8151,1],[8160,8167,1],[8178,8180,1],[8182,8183,1],[8458,8462,4],[8463,8467,4],[8495,8505,5],[8508,8509,1],[8518,8521,1],[8526,8580,54],[11312,11359,1],[11361,11365,4],[11366,11372,2],[11377,11379,2],[11380,11382,2],[11383,11387,1],[11393,11491,2],[11492,11500,8],[11502,11507,5],[11520,11557,1],[11559,11565,6],[42561,42605,2],[42625,42651,2],[42787,42799,2],[42800,42801,1],[42803,42865,2],[42866,42872,1],[42874,42876,2],[42879,42887,2],[42892,42894,2],[42897,42899,2],[42900,42901,1],[42903,42921,2],[42927,42933,6],[42935,42947,2],[42952,42954,2],[42961,42969,2],[42998,43002,4],[43824,43866,1],[43872,43880,1],[43888,43967,1],[64256,64262,1],[64275,64279,1],[65345,65370,1],[66600,66639,1],[66776,66811,1],[66967,66977,1],[66979,66993,1],[66995,67001,1],[67003,67004,1],[68800,68850,1],[71872,71903,1],[93792,93823,1],[119834,119859,1],[119886,119892,1],[119894,119911,1],[119938,119963,1],[119990,119993,1],[119995,119997,2],[119998,120003,1],[120005,120015,1],[120042,120067,1],[120094,120119,1],[120146,120171,1],[120198,120223,1],[120250,120275,1],[120302,120327,1],[120354,120379,1],[120406,120431,1],[120458,120485,1],[120514,120538,1],[120540,120545,1],[120572,120596,1],[120598,120603,1],[120630,120654,1],[120656,120661,1],[120688,120712,1],[120714,120719,1],[120746,120770,1],[120772,120777,1],[120779,122624,1845],[122625,122633,1],[122635,122654,1],[122661,122666,1],[125218,125251,1]];static foldLl=[[65,90,1],[192,214,1],[216,222,1],[256,302,2],[306,310,2],[313,327,2],[330,376,2],[377,381,2],[385,386,1],[388,390,2],[391,393,2],[394,395,1],[398,401,1],[403,404,1],[406,408,1],[412,413,1],[415,416,1],[418,422,2],[423,425,2],[428,430,2],[431,433,2],[434,435,1],[437,439,2],[440,444,4],[452,453,1],[455,456,1],[458,459,1],[461,475,2],[478,494,2],[497,498,1],[500,502,2],[503,504,1],[506,562,2],[570,571,1],[573,574,1],[577,579,2],[580,582,1],[584,590,2],[837,880,43],[882,886,4],[895,902,7],[904,906,1],[908,910,2],[911,913,2],[914,929,1],[931,939,1],[975,984,9],[986,1006,2],[1012,1015,3],[1017,1018,1],[1021,1071,1],[1120,1152,2],[1162,1216,2],[1217,1229,2],[1232,1326,2],[1329,1366,1],[4256,4293,1],[4295,4301,6],[5024,5109,1],[7312,7354,1],[7357,7359,1],[7680,7828,2],[7838,7934,2],[7944,7951,1],[7960,7965,1],[7976,7983,1],[7992,7999,1],[8008,8013,1],[8025,8031,2],[8040,8047,1],[8072,8079,1],[8088,8095,1],[8104,8111,1],[8120,8124,1],[8136,8140,1],[8152,8155,1],[8168,8172,1],[8184,8188,1],[8486,8490,4],[8491,8498,7],[8579,11264,2685],[11265,11311,1],[11360,11362,2],[11363,11364,1],[11367,11373,2],[11374,11376,1],[11378,11381,3],[11390,11392,1],[11394,11490,2],[11499,11501,2],[11506,42560,31054],[42562,42604,2],[42624,42650,2],[42786,42798,2],[42802,42862,2],[42873,42877,2],[42878,42886,2],[42891,42893,2],[42896,42898,2],[42902,42922,2],[42923,42926,1],[42928,42932,1],[42934,42948,2],[42949,42951,1],[42953,42960,7],[42966,42968,2],[42997,65313,22316],[65314,65338,1],[66560,66599,1],[66736,66771,1],[66928,66938,1],[66940,66954,1],[66956,66962,1],[66964,66965,1],[68736,68786,1],[71840,71871,1],[93760,93791,1],[125184,125217,1]];static Lm=[[688,705,1],[710,721,1],[736,740,1],[748,750,2],[884,890,6],[1369,1600,231],[1765,1766,1],[2036,2037,1],[2042,2074,32],[2084,2088,4],[2249,2417,168],[3654,3782,128],[4348,6103,1755],[6211,6823,612],[7288,7293,1],[7468,7530,1],[7544,7579,35],[7580,7615,1],[8305,8319,14],[8336,8348,1],[11388,11389,1],[11631,11823,192],[12293,12337,44],[12338,12341,1],[12347,12445,98],[12446,12540,94],[12541,12542,1],[40981,42232,1251],[42233,42237,1],[42508,42623,115],[42652,42653,1],[42775,42783,1],[42864,42888,24],[42994,42996,1],[43e3,43001,1],[43471,43494,23],[43632,43741,109],[43763,43764,1],[43868,43871,1],[43881,65392,21511],[65438,65439,1],[67456,67461,1],[67463,67504,1],[67506,67514,1],[92992,92995,1],[94099,94111,1],[94176,94177,1],[94179,110576,16397],[110577,110579,1],[110581,110587,1],[110589,110590,1],[122928,122989,1],[123191,123197,1],[124139,125259,1120]];static Lo=[[170,186,16],[443,448,5],[449,451,1],[660,1488,828],[1489,1514,1],[1519,1522,1],[1568,1599,1],[1601,1610,1],[1646,1647,1],[1649,1747,1],[1749,1774,25],[1775,1786,11],[1787,1788,1],[1791,1808,17],[1810,1839,1],[1869,1957,1],[1969,1994,25],[1995,2026,1],[2048,2069,1],[2112,2136,1],[2144,2154,1],[2160,2183,1],[2185,2190,1],[2208,2248,1],[2308,2361,1],[2365,2384,19],[2392,2401,1],[2418,2432,1],[2437,2444,1],[2447,2448,1],[2451,2472,1],[2474,2480,1],[2482,2486,4],[2487,2489,1],[2493,2510,17],[2524,2525,1],[2527,2529,1],[2544,2545,1],[2556,2565,9],[2566,2570,1],[2575,2576,1],[2579,2600,1],[2602,2608,1],[2610,2611,1],[2613,2614,1],[2616,2617,1],[2649,2652,1],[2654,2674,20],[2675,2676,1],[2693,2701,1],[2703,2705,1],[2707,2728,1],[2730,2736,1],[2738,2739,1],[2741,2745,1],[2749,2768,19],[2784,2785,1],[2809,2821,12],[2822,2828,1],[2831,2832,1],[2835,2856,1],[2858,2864,1],[2866,2867,1],[2869,2873,1],[2877,2908,31],[2909,2911,2],[2912,2913,1],[2929,2947,18],[2949,2954,1],[2958,2960,1],[2962,2965,1],[2969,2970,1],[2972,2974,2],[2975,2979,4],[2980,2984,4],[2985,2986,1],[2990,3001,1],[3024,3077,53],[3078,3084,1],[3086,3088,1],[3090,3112,1],[3114,3129,1],[3133,3160,27],[3161,3162,1],[3165,3168,3],[3169,3200,31],[3205,3212,1],[3214,3216,1],[3218,3240,1],[3242,3251,1],[3253,3257,1],[3261,3293,32],[3294,3296,2],[3297,3313,16],[3314,3332,18],[3333,3340,1],[3342,3344,1],[3346,3386,1],[3389,3406,17],[3412,3414,1],[3423,3425,1],[3450,3455,1],[3461,3478,1],[3482,3505,1],[3507,3515,1],[3517,3520,3],[3521,3526,1],[3585,3632,1],[3634,3635,1],[3648,3653,1],[3713,3714,1],[3716,3718,2],[3719,3722,1],[3724,3747,1],[3749,3751,2],[3752,3760,1],[3762,3763,1],[3773,3776,3],[3777,3780,1],[3804,3807,1],[3840,3904,64],[3905,3911,1],[3913,3948,1],[3976,3980,1],[4096,4138,1],[4159,4176,17],[4177,4181,1],[4186,4189,1],[4193,4197,4],[4198,4206,8],[4207,4208,1],[4213,4225,1],[4238,4352,114],[4353,4680,1],[4682,4685,1],[4688,4694,1],[4696,4698,2],[4699,4701,1],[4704,4744,1],[4746,4749,1],[4752,4784,1],[4786,4789,1],[4792,4798,1],[4800,4802,2],[4803,4805,1],[4808,4822,1],[4824,4880,1],[4882,4885,1],[4888,4954,1],[4992,5007,1],[5121,5740,1],[5743,5759,1],[5761,5786,1],[5792,5866,1],[5873,5880,1],[5888,5905,1],[5919,5937,1],[5952,5969,1],[5984,5996,1],[5998,6e3,1],[6016,6067,1],[6108,6176,68],[6177,6210,1],[6212,6264,1],[6272,6276,1],[6279,6312,1],[6314,6320,6],[6321,6389,1],[6400,6430,1],[6480,6509,1],[6512,6516,1],[6528,6571,1],[6576,6601,1],[6656,6678,1],[6688,6740,1],[6917,6963,1],[6981,6988,1],[7043,7072,1],[7086,7087,1],[7098,7141,1],[7168,7203,1],[7245,7247,1],[7258,7287,1],[7401,7404,1],[7406,7411,1],[7413,7414,1],[7418,8501,1083],[8502,8504,1],[11568,11623,1],[11648,11670,1],[11680,11686,1],[11688,11694,1],[11696,11702,1],[11704,11710,1],[11712,11718,1],[11720,11726,1],[11728,11734,1],[11736,11742,1],[12294,12348,54],[12353,12438,1],[12447,12449,2],[12450,12538,1],[12543,12549,6],[12550,12591,1],[12593,12686,1],[12704,12735,1],[12784,12799,1],[13312,19903,1],[19968,40980,1],[40982,42124,1],[42192,42231,1],[42240,42507,1],[42512,42527,1],[42538,42539,1],[42606,42656,50],[42657,42725,1],[42895,42999,104],[43003,43009,1],[43011,43013,1],[43015,43018,1],[43020,43042,1],[43072,43123,1],[43138,43187,1],[43250,43255,1],[43259,43261,2],[43262,43274,12],[43275,43301,1],[43312,43334,1],[43360,43388,1],[43396,43442,1],[43488,43492,1],[43495,43503,1],[43514,43518,1],[43520,43560,1],[43584,43586,1],[43588,43595,1],[43616,43631,1],[43633,43638,1],[43642,43646,4],[43647,43695,1],[43697,43701,4],[43702,43705,3],[43706,43709,1],[43712,43714,2],[43739,43740,1],[43744,43754,1],[43762,43777,15],[43778,43782,1],[43785,43790,1],[43793,43798,1],[43808,43814,1],[43816,43822,1],[43968,44002,1],[44032,55203,1],[55216,55238,1],[55243,55291,1],[63744,64109,1],[64112,64217,1],[64285,64287,2],[64288,64296,1],[64298,64310,1],[64312,64316,1],[64318,64320,2],[64321,64323,2],[64324,64326,2],[64327,64433,1],[64467,64829,1],[64848,64911,1],[64914,64967,1],[65008,65019,1],[65136,65140,1],[65142,65276,1],[65382,65391,1],[65393,65437,1],[65440,65470,1],[65474,65479,1],[65482,65487,1],[65490,65495,1],[65498,65500,1],[65536,65547,1],[65549,65574,1],[65576,65594,1],[65596,65597,1],[65599,65613,1],[65616,65629,1],[65664,65786,1],[66176,66204,1],[66208,66256,1],[66304,66335,1],[66349,66368,1],[66370,66377,1],[66384,66421,1],[66432,66461,1],[66464,66499,1],[66504,66511,1],[66640,66717,1],[66816,66855,1],[66864,66915,1],[67072,67382,1],[67392,67413,1],[67424,67431,1],[67584,67589,1],[67592,67594,2],[67595,67637,1],[67639,67640,1],[67644,67647,3],[67648,67669,1],[67680,67702,1],[67712,67742,1],[67808,67826,1],[67828,67829,1],[67840,67861,1],[67872,67897,1],[67968,68023,1],[68030,68031,1],[68096,68112,16],[68113,68115,1],[68117,68119,1],[68121,68149,1],[68192,68220,1],[68224,68252,1],[68288,68295,1],[68297,68324,1],[68352,68405,1],[68416,68437,1],[68448,68466,1],[68480,68497,1],[68608,68680,1],[68864,68899,1],[69248,69289,1],[69296,69297,1],[69376,69404,1],[69415,69424,9],[69425,69445,1],[69488,69505,1],[69552,69572,1],[69600,69622,1],[69635,69687,1],[69745,69746,1],[69749,69763,14],[69764,69807,1],[69840,69864,1],[69891,69926,1],[69956,69959,3],[69968,70002,1],[70006,70019,13],[70020,70066,1],[70081,70084,1],[70106,70108,2],[70144,70161,1],[70163,70187,1],[70207,70208,1],[70272,70278,1],[70280,70282,2],[70283,70285,1],[70287,70301,1],[70303,70312,1],[70320,70366,1],[70405,70412,1],[70415,70416,1],[70419,70440,1],[70442,70448,1],[70450,70451,1],[70453,70457,1],[70461,70480,19],[70493,70497,1],[70656,70708,1],[70727,70730,1],[70751,70753,1],[70784,70831,1],[70852,70853,1],[70855,71040,185],[71041,71086,1],[71128,71131,1],[71168,71215,1],[71236,71296,60],[71297,71338,1],[71352,71424,72],[71425,71450,1],[71488,71494,1],[71680,71723,1],[71935,71942,1],[71945,71948,3],[71949,71955,1],[71957,71958,1],[71960,71983,1],[71999,72001,2],[72096,72103,1],[72106,72144,1],[72161,72163,2],[72192,72203,11],[72204,72242,1],[72250,72272,22],[72284,72329,1],[72349,72368,19],[72369,72440,1],[72704,72712,1],[72714,72750,1],[72768,72818,50],[72819,72847,1],[72960,72966,1],[72968,72969,1],[72971,73008,1],[73030,73056,26],[73057,73061,1],[73063,73064,1],[73066,73097,1],[73112,73440,328],[73441,73458,1],[73474,73476,2],[73477,73488,1],[73490,73523,1],[73648,73728,80],[73729,74649,1],[74880,75075,1],[77712,77808,1],[77824,78895,1],[78913,78918,1],[82944,83526,1],[92160,92728,1],[92736,92766,1],[92784,92862,1],[92880,92909,1],[92928,92975,1],[93027,93047,1],[93053,93071,1],[93952,94026,1],[94032,94208,176],[94209,100343,1],[100352,101589,1],[101632,101640,1],[110592,110882,1],[110898,110928,30],[110929,110930,1],[110933,110948,15],[110949,110951,1],[110960,111355,1],[113664,113770,1],[113776,113788,1],[113792,113800,1],[113808,113817,1],[122634,123136,502],[123137,123180,1],[123214,123536,322],[123537,123565,1],[123584,123627,1],[124112,124138,1],[124896,124902,1],[124904,124907,1],[124909,124910,1],[124912,124926,1],[124928,125124,1],[126464,126467,1],[126469,126495,1],[126497,126498,1],[126500,126503,3],[126505,126514,1],[126516,126519,1],[126521,126523,2],[126530,126535,5],[126537,126541,2],[126542,126543,1],[126545,126546,1],[126548,126551,3],[126553,126561,2],[126562,126564,2],[126567,126570,1],[126572,126578,1],[126580,126583,1],[126585,126588,1],[126590,126592,2],[126593,126601,1],[126603,126619,1],[126625,126627,1],[126629,126633,1],[126635,126651,1],[131072,173791,1],[173824,177977,1],[177984,178205,1],[178208,183969,1],[183984,191456,1],[191472,192093,1],[194560,195101,1],[196608,201546,1],[201552,205743,1]];static Lt=[[453,459,3],[498,8072,7574],[8073,8079,1],[8088,8095,1],[8104,8111,1],[8124,8140,16],[8188,8188,1]];static foldLt=[[452,454,2],[455,457,2],[458,460,2],[497,499,2],[8064,8071,1],[8080,8087,1],[8096,8103,1],[8115,8131,16],[8179,8179,1]];static Lu=[[65,90,1],[192,214,1],[216,222,1],[256,310,2],[313,327,2],[330,376,2],[377,381,2],[385,386,1],[388,390,2],[391,393,2],[394,395,1],[398,401,1],[403,404,1],[406,408,1],[412,413,1],[415,416,1],[418,422,2],[423,425,2],[428,430,2],[431,433,2],[434,435,1],[437,439,2],[440,444,4],[452,461,3],[463,475,2],[478,494,2],[497,500,3],[502,504,1],[506,562,2],[570,571,1],[573,574,1],[577,579,2],[580,582,1],[584,590,2],[880,882,2],[886,895,9],[902,904,2],[905,906,1],[908,910,2],[911,913,2],[914,929,1],[931,939,1],[975,978,3],[979,980,1],[984,1006,2],[1012,1015,3],[1017,1018,1],[1021,1071,1],[1120,1152,2],[1162,1216,2],[1217,1229,2],[1232,1326,2],[1329,1366,1],[4256,4293,1],[4295,4301,6],[5024,5109,1],[7312,7354,1],[7357,7359,1],[7680,7828,2],[7838,7934,2],[7944,7951,1],[7960,7965,1],[7976,7983,1],[7992,7999,1],[8008,8013,1],[8025,8031,2],[8040,8047,1],[8120,8123,1],[8136,8139,1],[8152,8155,1],[8168,8172,1],[8184,8187,1],[8450,8455,5],[8459,8461,1],[8464,8466,1],[8469,8473,4],[8474,8477,1],[8484,8490,2],[8491,8493,1],[8496,8499,1],[8510,8511,1],[8517,8579,62],[11264,11311,1],[11360,11362,2],[11363,11364,1],[11367,11373,2],[11374,11376,1],[11378,11381,3],[11390,11392,1],[11394,11490,2],[11499,11501,2],[11506,42560,31054],[42562,42604,2],[42624,42650,2],[42786,42798,2],[42802,42862,2],[42873,42877,2],[42878,42886,2],[42891,42893,2],[42896,42898,2],[42902,42922,2],[42923,42926,1],[42928,42932,1],[42934,42948,2],[42949,42951,1],[42953,42960,7],[42966,42968,2],[42997,65313,22316],[65314,65338,1],[66560,66599,1],[66736,66771,1],[66928,66938,1],[66940,66954,1],[66956,66962,1],[66964,66965,1],[68736,68786,1],[71840,71871,1],[93760,93791,1],[119808,119833,1],[119860,119885,1],[119912,119937,1],[119964,119966,2],[119967,119973,3],[119974,119977,3],[119978,119980,1],[119982,119989,1],[120016,120041,1],[120068,120069,1],[120071,120074,1],[120077,120084,1],[120086,120092,1],[120120,120121,1],[120123,120126,1],[120128,120132,1],[120134,120138,4],[120139,120144,1],[120172,120197,1],[120224,120249,1],[120276,120301,1],[120328,120353,1],[120380,120405,1],[120432,120457,1],[120488,120512,1],[120546,120570,1],[120604,120628,1],[120662,120686,1],[120720,120744,1],[120778,125184,4406],[125185,125217,1]];static Upper=this.Lu;static foldLu=[[97,122,1],[181,223,42],[224,246,1],[248,255,1],[257,303,2],[307,311,2],[314,328,2],[331,375,2],[378,382,2],[383,384,1],[387,389,2],[392,396,4],[402,405,3],[409,410,1],[414,417,3],[419,421,2],[424,429,5],[432,436,4],[438,441,3],[445,447,2],[453,454,1],[456,457,1],[459,460,1],[462,476,2],[477,495,2],[498,499,1],[501,505,4],[507,543,2],[547,563,2],[572,575,3],[576,578,2],[583,591,2],[592,596,1],[598,599,1],[601,603,2],[604,608,4],[609,613,2],[614,616,2],[617,620,1],[623,625,2],[626,629,3],[637,640,3],[642,643,1],[647,652,1],[658,669,11],[670,837,167],[881,883,2],[887,891,4],[892,893,1],[940,943,1],[945,974,1],[976,977,1],[981,983,1],[985,1007,2],[1008,1011,1],[1013,1019,3],[1072,1119,1],[1121,1153,2],[1163,1215,2],[1218,1230,2],[1231,1327,2],[1377,1414,1],[4304,4346,1],[4349,4351,1],[5112,5117,1],[7296,7304,1],[7545,7549,4],[7566,7681,115],[7683,7829,2],[7835,7841,6],[7843,7935,2],[7936,7943,1],[7952,7957,1],[7968,7975,1],[7984,7991,1],[8e3,8005,1],[8017,8023,2],[8032,8039,1],[8048,8061,1],[8112,8113,1],[8126,8144,18],[8145,8160,15],[8161,8165,4],[8526,8580,54],[11312,11359,1],[11361,11365,4],[11366,11372,2],[11379,11382,3],[11393,11491,2],[11500,11502,2],[11507,11520,13],[11521,11557,1],[11559,11565,6],[42561,42605,2],[42625,42651,2],[42787,42799,2],[42803,42863,2],[42874,42876,2],[42879,42887,2],[42892,42897,5],[42899,42900,1],[42903,42921,2],[42933,42947,2],[42952,42954,2],[42961,42967,6],[42969,42998,29],[43859,43888,29],[43889,43967,1],[65345,65370,1],[66600,66639,1],[66776,66811,1],[66967,66977,1],[66979,66993,1],[66995,67001,1],[67003,67004,1],[68800,68850,1],[71872,71903,1],[93792,93823,1],[125218,125251,1]];static M=[[768,879,1],[1155,1161,1],[1425,1469,1],[1471,1473,2],[1474,1476,2],[1477,1479,2],[1552,1562,1],[1611,1631,1],[1648,1750,102],[1751,1756,1],[1759,1764,1],[1767,1768,1],[1770,1773,1],[1809,1840,31],[1841,1866,1],[1958,1968,1],[2027,2035,1],[2045,2070,25],[2071,2073,1],[2075,2083,1],[2085,2087,1],[2089,2093,1],[2137,2139,1],[2200,2207,1],[2250,2273,1],[2275,2307,1],[2362,2364,1],[2366,2383,1],[2385,2391,1],[2402,2403,1],[2433,2435,1],[2492,2494,2],[2495,2500,1],[2503,2504,1],[2507,2509,1],[2519,2530,11],[2531,2558,27],[2561,2563,1],[2620,2622,2],[2623,2626,1],[2631,2632,1],[2635,2637,1],[2641,2672,31],[2673,2677,4],[2689,2691,1],[2748,2750,2],[2751,2757,1],[2759,2761,1],[2763,2765,1],[2786,2787,1],[2810,2815,1],[2817,2819,1],[2876,2878,2],[2879,2884,1],[2887,2888,1],[2891,2893,1],[2901,2903,1],[2914,2915,1],[2946,3006,60],[3007,3010,1],[3014,3016,1],[3018,3021,1],[3031,3072,41],[3073,3076,1],[3132,3134,2],[3135,3140,1],[3142,3144,1],[3146,3149,1],[3157,3158,1],[3170,3171,1],[3201,3203,1],[3260,3262,2],[3263,3268,1],[3270,3272,1],[3274,3277,1],[3285,3286,1],[3298,3299,1],[3315,3328,13],[3329,3331,1],[3387,3388,1],[3390,3396,1],[3398,3400,1],[3402,3405,1],[3415,3426,11],[3427,3457,30],[3458,3459,1],[3530,3535,5],[3536,3540,1],[3542,3544,2],[3545,3551,1],[3570,3571,1],[3633,3636,3],[3637,3642,1],[3655,3662,1],[3761,3764,3],[3765,3772,1],[3784,3790,1],[3864,3865,1],[3893,3897,2],[3902,3903,1],[3953,3972,1],[3974,3975,1],[3981,3991,1],[3993,4028,1],[4038,4139,101],[4140,4158,1],[4182,4185,1],[4190,4192,1],[4194,4196,1],[4199,4205,1],[4209,4212,1],[4226,4237,1],[4239,4250,11],[4251,4253,1],[4957,4959,1],[5906,5909,1],[5938,5940,1],[5970,5971,1],[6002,6003,1],[6068,6099,1],[6109,6155,46],[6156,6157,1],[6159,6277,118],[6278,6313,35],[6432,6443,1],[6448,6459,1],[6679,6683,1],[6741,6750,1],[6752,6780,1],[6783,6832,49],[6833,6862,1],[6912,6916,1],[6964,6980,1],[7019,7027,1],[7040,7042,1],[7073,7085,1],[7142,7155,1],[7204,7223,1],[7376,7378,1],[7380,7400,1],[7405,7412,7],[7415,7417,1],[7616,7679,1],[8400,8432,1],[11503,11505,1],[11647,11744,97],[11745,11775,1],[12330,12335,1],[12441,12442,1],[42607,42610,1],[42612,42621,1],[42654,42655,1],[42736,42737,1],[43010,43014,4],[43019,43043,24],[43044,43047,1],[43052,43136,84],[43137,43188,51],[43189,43205,1],[43232,43249,1],[43263,43302,39],[43303,43309,1],[43335,43347,1],[43392,43395,1],[43443,43456,1],[43493,43561,68],[43562,43574,1],[43587,43596,9],[43597,43643,46],[43644,43645,1],[43696,43698,2],[43699,43700,1],[43703,43704,1],[43710,43711,1],[43713,43755,42],[43756,43759,1],[43765,43766,1],[44003,44010,1],[44012,44013,1],[64286,65024,738],[65025,65039,1],[65056,65071,1],[66045,66272,227],[66422,66426,1],[68097,68099,1],[68101,68102,1],[68108,68111,1],[68152,68154,1],[68159,68325,166],[68326,68900,574],[68901,68903,1],[69291,69292,1],[69373,69375,1],[69446,69456,1],[69506,69509,1],[69632,69634,1],[69688,69702,1],[69744,69747,3],[69748,69759,11],[69760,69762,1],[69808,69818,1],[69826,69888,62],[69889,69890,1],[69927,69940,1],[69957,69958,1],[70003,70016,13],[70017,70018,1],[70067,70080,1],[70089,70092,1],[70094,70095,1],[70188,70199,1],[70206,70209,3],[70367,70378,1],[70400,70403,1],[70459,70460,1],[70462,70468,1],[70471,70472,1],[70475,70477,1],[70487,70498,11],[70499,70502,3],[70503,70508,1],[70512,70516,1],[70709,70726,1],[70750,70832,82],[70833,70851,1],[71087,71093,1],[71096,71104,1],[71132,71133,1],[71216,71232,1],[71339,71351,1],[71453,71467,1],[71724,71738,1],[71984,71989,1],[71991,71992,1],[71995,71998,1],[72e3,72002,2],[72003,72145,142],[72146,72151,1],[72154,72160,1],[72164,72193,29],[72194,72202,1],[72243,72249,1],[72251,72254,1],[72263,72273,10],[72274,72283,1],[72330,72345,1],[72751,72758,1],[72760,72767,1],[72850,72871,1],[72873,72886,1],[73009,73014,1],[73018,73020,2],[73021,73023,2],[73024,73029,1],[73031,73098,67],[73099,73102,1],[73104,73105,1],[73107,73111,1],[73459,73462,1],[73472,73473,1],[73475,73524,49],[73525,73530,1],[73534,73538,1],[78912,78919,7],[78920,78933,1],[92912,92916,1],[92976,92982,1],[94031,94033,2],[94034,94087,1],[94095,94098,1],[94180,94192,12],[94193,113821,19628],[113822,118528,4706],[118529,118573,1],[118576,118598,1],[119141,119145,1],[119149,119154,1],[119163,119170,1],[119173,119179,1],[119210,119213,1],[119362,119364,1],[121344,121398,1],[121403,121452,1],[121461,121476,15],[121499,121503,1],[121505,121519,1],[122880,122886,1],[122888,122904,1],[122907,122913,1],[122915,122916,1],[122918,122922,1],[123023,123184,161],[123185,123190,1],[123566,123628,62],[123629,123631,1],[124140,124143,1],[125136,125142,1],[125252,125258,1],[917760,917999,1]];static foldM=[[921,953,32],[8126,8126,1]];static Mc=[[2307,2363,56],[2366,2368,1],[2377,2380,1],[2382,2383,1],[2434,2435,1],[2494,2496,1],[2503,2504,1],[2507,2508,1],[2519,2563,44],[2622,2624,1],[2691,2750,59],[2751,2752,1],[2761,2763,2],[2764,2818,54],[2819,2878,59],[2880,2887,7],[2888,2891,3],[2892,2903,11],[3006,3007,1],[3009,3010,1],[3014,3016,1],[3018,3020,1],[3031,3073,42],[3074,3075,1],[3137,3140,1],[3202,3203,1],[3262,3264,2],[3265,3268,1],[3271,3272,1],[3274,3275,1],[3285,3286,1],[3315,3330,15],[3331,3390,59],[3391,3392,1],[3398,3400,1],[3402,3404,1],[3415,3458,43],[3459,3535,76],[3536,3537,1],[3544,3551,1],[3570,3571,1],[3902,3903,1],[3967,4139,172],[4140,4145,5],[4152,4155,3],[4156,4182,26],[4183,4194,11],[4195,4196,1],[4199,4205,1],[4227,4228,1],[4231,4236,1],[4239,4250,11],[4251,4252,1],[5909,5940,31],[6070,6078,8],[6079,6085,1],[6087,6088,1],[6435,6438,1],[6441,6443,1],[6448,6449,1],[6451,6456,1],[6681,6682,1],[6741,6743,2],[6753,6755,2],[6756,6765,9],[6766,6770,1],[6916,6965,49],[6971,6973,2],[6974,6977,1],[6979,6980,1],[7042,7073,31],[7078,7079,1],[7082,7143,61],[7146,7148,1],[7150,7154,4],[7155,7204,49],[7205,7211,1],[7220,7221,1],[7393,7415,22],[12334,12335,1],[43043,43044,1],[43047,43136,89],[43137,43188,51],[43189,43203,1],[43346,43347,1],[43395,43444,49],[43445,43450,5],[43451,43454,3],[43455,43456,1],[43567,43568,1],[43571,43572,1],[43597,43643,46],[43645,43755,110],[43758,43759,1],[43765,44003,238],[44004,44006,2],[44007,44009,2],[44010,44012,2],[69632,69634,2],[69762,69808,46],[69809,69810,1],[69815,69816,1],[69932,69957,25],[69958,70018,60],[70067,70069,1],[70079,70080,1],[70094,70188,94],[70189,70190,1],[70194,70195,1],[70197,70368,171],[70369,70370,1],[70402,70403,1],[70462,70463,1],[70465,70468,1],[70471,70472,1],[70475,70477,1],[70487,70498,11],[70499,70709,210],[70710,70711,1],[70720,70721,1],[70725,70832,107],[70833,70834,1],[70841,70843,2],[70844,70846,1],[70849,71087,238],[71088,71089,1],[71096,71099,1],[71102,71216,114],[71217,71218,1],[71227,71228,1],[71230,71340,110],[71342,71343,1],[71350,71456,106],[71457,71462,5],[71724,71726,1],[71736,71984,248],[71985,71989,1],[71991,71992,1],[71997,72e3,3],[72002,72145,143],[72146,72147,1],[72156,72159,1],[72164,72249,85],[72279,72280,1],[72343,72751,408],[72766,72873,107],[72881,72884,3],[73098,73102,1],[73107,73108,1],[73110,73461,351],[73462,73475,13],[73524,73525,1],[73534,73535,1],[73537,94033,20496],[94034,94087,1],[94192,94193,1],[119141,119142,1],[119149,119154,1]];static Me=[[1160,1161,1],[6846,8413,1567],[8414,8416,1],[8418,8420,1],[42608,42610,1]];static Mn=[[768,879,1],[1155,1159,1],[1425,1469,1],[1471,1473,2],[1474,1476,2],[1477,1479,2],[1552,1562,1],[1611,1631,1],[1648,1750,102],[1751,1756,1],[1759,1764,1],[1767,1768,1],[1770,1773,1],[1809,1840,31],[1841,1866,1],[1958,1968,1],[2027,2035,1],[2045,2070,25],[2071,2073,1],[2075,2083,1],[2085,2087,1],[2089,2093,1],[2137,2139,1],[2200,2207,1],[2250,2273,1],[2275,2306,1],[2362,2364,2],[2369,2376,1],[2381,2385,4],[2386,2391,1],[2402,2403,1],[2433,2492,59],[2497,2500,1],[2509,2530,21],[2531,2558,27],[2561,2562,1],[2620,2625,5],[2626,2631,5],[2632,2635,3],[2636,2637,1],[2641,2672,31],[2673,2677,4],[2689,2690,1],[2748,2753,5],[2754,2757,1],[2759,2760,1],[2765,2786,21],[2787,2810,23],[2811,2815,1],[2817,2876,59],[2879,2881,2],[2882,2884,1],[2893,2901,8],[2902,2914,12],[2915,2946,31],[3008,3021,13],[3072,3076,4],[3132,3134,2],[3135,3136,1],[3142,3144,1],[3146,3149,1],[3157,3158,1],[3170,3171,1],[3201,3260,59],[3263,3270,7],[3276,3277,1],[3298,3299,1],[3328,3329,1],[3387,3388,1],[3393,3396,1],[3405,3426,21],[3427,3457,30],[3530,3538,8],[3539,3540,1],[3542,3633,91],[3636,3642,1],[3655,3662,1],[3761,3764,3],[3765,3772,1],[3784,3790,1],[3864,3865,1],[3893,3897,2],[3953,3966,1],[3968,3972,1],[3974,3975,1],[3981,3991,1],[3993,4028,1],[4038,4141,103],[4142,4144,1],[4146,4151,1],[4153,4154,1],[4157,4158,1],[4184,4185,1],[4190,4192,1],[4209,4212,1],[4226,4229,3],[4230,4237,7],[4253,4957,704],[4958,4959,1],[5906,5908,1],[5938,5939,1],[5970,5971,1],[6002,6003,1],[6068,6069,1],[6071,6077,1],[6086,6089,3],[6090,6099,1],[6109,6155,46],[6156,6157,1],[6159,6277,118],[6278,6313,35],[6432,6434,1],[6439,6440,1],[6450,6457,7],[6458,6459,1],[6679,6680,1],[6683,6742,59],[6744,6750,1],[6752,6754,2],[6757,6764,1],[6771,6780,1],[6783,6832,49],[6833,6845,1],[6847,6862,1],[6912,6915,1],[6964,6966,2],[6967,6970,1],[6972,6978,6],[7019,7027,1],[7040,7041,1],[7074,7077,1],[7080,7081,1],[7083,7085,1],[7142,7144,2],[7145,7149,4],[7151,7153,1],[7212,7219,1],[7222,7223,1],[7376,7378,1],[7380,7392,1],[7394,7400,1],[7405,7412,7],[7416,7417,1],[7616,7679,1],[8400,8412,1],[8417,8421,4],[8422,8432,1],[11503,11505,1],[11647,11744,97],[11745,11775,1],[12330,12333,1],[12441,12442,1],[42607,42612,5],[42613,42621,1],[42654,42655,1],[42736,42737,1],[43010,43014,4],[43019,43045,26],[43046,43052,6],[43204,43205,1],[43232,43249,1],[43263,43302,39],[43303,43309,1],[43335,43345,1],[43392,43394,1],[43443,43446,3],[43447,43449,1],[43452,43453,1],[43493,43561,68],[43562,43566,1],[43569,43570,1],[43573,43574,1],[43587,43596,9],[43644,43696,52],[43698,43700,1],[43703,43704,1],[43710,43711,1],[43713,43756,43],[43757,43766,9],[44005,44008,3],[44013,64286,20273],[65024,65039,1],[65056,65071,1],[66045,66272,227],[66422,66426,1],[68097,68099,1],[68101,68102,1],[68108,68111,1],[68152,68154,1],[68159,68325,166],[68326,68900,574],[68901,68903,1],[69291,69292,1],[69373,69375,1],[69446,69456,1],[69506,69509,1],[69633,69688,55],[69689,69702,1],[69744,69747,3],[69748,69759,11],[69760,69761,1],[69811,69814,1],[69817,69818,1],[69826,69888,62],[69889,69890,1],[69927,69931,1],[69933,69940,1],[70003,70016,13],[70017,70070,53],[70071,70078,1],[70089,70092,1],[70095,70191,96],[70192,70193,1],[70196,70198,2],[70199,70206,7],[70209,70367,158],[70371,70378,1],[70400,70401,1],[70459,70460,1],[70464,70502,38],[70503,70508,1],[70512,70516,1],[70712,70719,1],[70722,70724,1],[70726,70750,24],[70835,70840,1],[70842,70847,5],[70848,70850,2],[70851,71090,239],[71091,71093,1],[71100,71101,1],[71103,71104,1],[71132,71133,1],[71219,71226,1],[71229,71231,2],[71232,71339,107],[71341,71344,3],[71345,71349,1],[71351,71453,102],[71454,71455,1],[71458,71461,1],[71463,71467,1],[71727,71735,1],[71737,71738,1],[71995,71996,1],[71998,72003,5],[72148,72151,1],[72154,72155,1],[72160,72193,33],[72194,72202,1],[72243,72248,1],[72251,72254,1],[72263,72273,10],[72274,72278,1],[72281,72283,1],[72330,72342,1],[72344,72345,1],[72752,72758,1],[72760,72765,1],[72767,72850,83],[72851,72871,1],[72874,72880,1],[72882,72883,1],[72885,72886,1],[73009,73014,1],[73018,73020,2],[73021,73023,2],[73024,73029,1],[73031,73104,73],[73105,73109,4],[73111,73459,348],[73460,73472,12],[73473,73526,53],[73527,73530,1],[73536,73538,2],[78912,78919,7],[78920,78933,1],[92912,92916,1],[92976,92982,1],[94031,94095,64],[94096,94098,1],[94180,113821,19641],[113822,118528,4706],[118529,118573,1],[118576,118598,1],[119143,119145,1],[119163,119170,1],[119173,119179,1],[119210,119213,1],[119362,119364,1],[121344,121398,1],[121403,121452,1],[121461,121476,15],[121499,121503,1],[121505,121519,1],[122880,122886,1],[122888,122904,1],[122907,122913,1],[122915,122916,1],[122918,122922,1],[123023,123184,161],[123185,123190,1],[123566,123628,62],[123629,123631,1],[124140,124143,1],[125136,125142,1],[125252,125258,1],[917760,917999,1]];static foldMn=[[921,953,32],[8126,8126,1]];static N=[[48,57,1],[178,179,1],[185,188,3],[189,190,1],[1632,1641,1],[1776,1785,1],[1984,1993,1],[2406,2415,1],[2534,2543,1],[2548,2553,1],[2662,2671,1],[2790,2799,1],[2918,2927,1],[2930,2935,1],[3046,3058,1],[3174,3183,1],[3192,3198,1],[3302,3311,1],[3416,3422,1],[3430,3448,1],[3558,3567,1],[3664,3673,1],[3792,3801,1],[3872,3891,1],[4160,4169,1],[4240,4249,1],[4969,4988,1],[5870,5872,1],[6112,6121,1],[6128,6137,1],[6160,6169,1],[6470,6479,1],[6608,6618,1],[6784,6793,1],[6800,6809,1],[6992,7001,1],[7088,7097,1],[7232,7241,1],[7248,7257,1],[8304,8308,4],[8309,8313,1],[8320,8329,1],[8528,8578,1],[8581,8585,1],[9312,9371,1],[9450,9471,1],[10102,10131,1],[11517,12295,778],[12321,12329,1],[12344,12346,1],[12690,12693,1],[12832,12841,1],[12872,12879,1],[12881,12895,1],[12928,12937,1],[12977,12991,1],[42528,42537,1],[42726,42735,1],[43056,43061,1],[43216,43225,1],[43264,43273,1],[43472,43481,1],[43504,43513,1],[43600,43609,1],[44016,44025,1],[65296,65305,1],[65799,65843,1],[65856,65912,1],[65930,65931,1],[66273,66299,1],[66336,66339,1],[66369,66378,9],[66513,66517,1],[66720,66729,1],[67672,67679,1],[67705,67711,1],[67751,67759,1],[67835,67839,1],[67862,67867,1],[68028,68029,1],[68032,68047,1],[68050,68095,1],[68160,68168,1],[68221,68222,1],[68253,68255,1],[68331,68335,1],[68440,68447,1],[68472,68479,1],[68521,68527,1],[68858,68863,1],[68912,68921,1],[69216,69246,1],[69405,69414,1],[69457,69460,1],[69573,69579,1],[69714,69743,1],[69872,69881,1],[69942,69951,1],[70096,70105,1],[70113,70132,1],[70384,70393,1],[70736,70745,1],[70864,70873,1],[71248,71257,1],[71360,71369,1],[71472,71483,1],[71904,71922,1],[72016,72025,1],[72784,72812,1],[73040,73049,1],[73120,73129,1],[73552,73561,1],[73664,73684,1],[74752,74862,1],[92768,92777,1],[92864,92873,1],[93008,93017,1],[93019,93025,1],[93824,93846,1],[119488,119507,1],[119520,119539,1],[119648,119672,1],[120782,120831,1],[123200,123209,1],[123632,123641,1],[124144,124153,1],[125127,125135,1],[125264,125273,1],[126065,126123,1],[126125,126127,1],[126129,126132,1],[126209,126253,1],[126255,126269,1],[127232,127244,1],[130032,130041,1]];static Nd=[[48,57,1],[1632,1641,1],[1776,1785,1],[1984,1993,1],[2406,2415,1],[2534,2543,1],[2662,2671,1],[2790,2799,1],[2918,2927,1],[3046,3055,1],[3174,3183,1],[3302,3311,1],[3430,3439,1],[3558,3567,1],[3664,3673,1],[3792,3801,1],[3872,3881,1],[4160,4169,1],[4240,4249,1],[6112,6121,1],[6160,6169,1],[6470,6479,1],[6608,6617,1],[6784,6793,1],[6800,6809,1],[6992,7001,1],[7088,7097,1],[7232,7241,1],[7248,7257,1],[42528,42537,1],[43216,43225,1],[43264,43273,1],[43472,43481,1],[43504,43513,1],[43600,43609,1],[44016,44025,1],[65296,65305,1],[66720,66729,1],[68912,68921,1],[69734,69743,1],[69872,69881,1],[69942,69951,1],[70096,70105,1],[70384,70393,1],[70736,70745,1],[70864,70873,1],[71248,71257,1],[71360,71369,1],[71472,71481,1],[71904,71913,1],[72016,72025,1],[72784,72793,1],[73040,73049,1],[73120,73129,1],[73552,73561,1],[92768,92777,1],[92864,92873,1],[93008,93017,1],[120782,120831,1],[123200,123209,1],[123632,123641,1],[124144,124153,1],[125264,125273,1],[130032,130041,1]];static Nl=[[5870,5872,1],[8544,8578,1],[8581,8584,1],[12295,12321,26],[12322,12329,1],[12344,12346,1],[42726,42735,1],[65856,65908,1],[66369,66378,9],[66513,66517,1],[74752,74862,1]];static No=[[178,179,1],[185,188,3],[189,190,1],[2548,2553,1],[2930,2935,1],[3056,3058,1],[3192,3198,1],[3416,3422,1],[3440,3448,1],[3882,3891,1],[4969,4988,1],[6128,6137,1],[6618,8304,1686],[8308,8313,1],[8320,8329,1],[8528,8543,1],[8585,9312,727],[9313,9371,1],[9450,9471,1],[10102,10131,1],[11517,12690,1173],[12691,12693,1],[12832,12841,1],[12872,12879,1],[12881,12895,1],[12928,12937,1],[12977,12991,1],[43056,43061,1],[65799,65843,1],[65909,65912,1],[65930,65931,1],[66273,66299,1],[66336,66339,1],[67672,67679,1],[67705,67711,1],[67751,67759,1],[67835,67839,1],[67862,67867,1],[68028,68029,1],[68032,68047,1],[68050,68095,1],[68160,68168,1],[68221,68222,1],[68253,68255,1],[68331,68335,1],[68440,68447,1],[68472,68479,1],[68521,68527,1],[68858,68863,1],[69216,69246,1],[69405,69414,1],[69457,69460,1],[69573,69579,1],[69714,69733,1],[70113,70132,1],[71482,71483,1],[71914,71922,1],[72794,72812,1],[73664,73684,1],[93019,93025,1],[93824,93846,1],[119488,119507,1],[119520,119539,1],[119648,119672,1],[125127,125135,1],[126065,126123,1],[126125,126127,1],[126129,126132,1],[126209,126253,1],[126255,126269,1],[127232,127244,1]];static P=[[33,35,1],[37,42,1],[44,47,1],[58,59,1],[63,64,1],[91,93,1],[95,123,28],[125,161,36],[167,171,4],[182,183,1],[187,191,4],[894,903,9],[1370,1375,1],[1417,1418,1],[1470,1472,2],[1475,1478,3],[1523,1524,1],[1545,1546,1],[1548,1549,1],[1563,1565,2],[1566,1567,1],[1642,1645,1],[1748,1792,44],[1793,1805,1],[2039,2041,1],[2096,2110,1],[2142,2404,262],[2405,2416,11],[2557,2678,121],[2800,3191,391],[3204,3572,368],[3663,3674,11],[3675,3844,169],[3845,3858,1],[3860,3898,38],[3899,3901,1],[3973,4048,75],[4049,4052,1],[4057,4058,1],[4170,4175,1],[4347,4960,613],[4961,4968,1],[5120,5742,622],[5787,5788,1],[5867,5869,1],[5941,5942,1],[6100,6102,1],[6104,6106,1],[6144,6154,1],[6468,6469,1],[6686,6687,1],[6816,6822,1],[6824,6829,1],[7002,7008,1],[7037,7038,1],[7164,7167,1],[7227,7231,1],[7294,7295,1],[7360,7367,1],[7379,8208,829],[8209,8231,1],[8240,8259,1],[8261,8273,1],[8275,8286,1],[8317,8318,1],[8333,8334,1],[8968,8971,1],[9001,9002,1],[10088,10101,1],[10181,10182,1],[10214,10223,1],[10627,10648,1],[10712,10715,1],[10748,10749,1],[11513,11516,1],[11518,11519,1],[11632,11776,144],[11777,11822,1],[11824,11855,1],[11858,11869,1],[12289,12291,1],[12296,12305,1],[12308,12319,1],[12336,12349,13],[12448,12539,91],[42238,42239,1],[42509,42511,1],[42611,42622,11],[42738,42743,1],[43124,43127,1],[43214,43215,1],[43256,43258,1],[43260,43310,50],[43311,43359,48],[43457,43469,1],[43486,43487,1],[43612,43615,1],[43742,43743,1],[43760,43761,1],[44011,64830,20819],[64831,65040,209],[65041,65049,1],[65072,65106,1],[65108,65121,1],[65123,65128,5],[65130,65131,1],[65281,65283,1],[65285,65290,1],[65292,65295,1],[65306,65307,1],[65311,65312,1],[65339,65341,1],[65343,65371,28],[65373,65375,2],[65376,65381,1],[65792,65794,1],[66463,66512,49],[66927,67671,744],[67871,67903,32],[68176,68184,1],[68223,68336,113],[68337,68342,1],[68409,68415,1],[68505,68508,1],[69293,69461,168],[69462,69465,1],[69510,69513,1],[69703,69709,1],[69819,69820,1],[69822,69825,1],[69952,69955,1],[70004,70005,1],[70085,70088,1],[70093,70107,14],[70109,70111,1],[70200,70205,1],[70313,70731,418],[70732,70735,1],[70746,70747,1],[70749,70854,105],[71105,71127,1],[71233,71235,1],[71264,71276,1],[71353,71484,131],[71485,71486,1],[71739,72004,265],[72005,72006,1],[72162,72255,93],[72256,72262,1],[72346,72348,1],[72350,72354,1],[72448,72457,1],[72769,72773,1],[72816,72817,1],[73463,73464,1],[73539,73551,1],[73727,74864,1137],[74865,74868,1],[77809,77810,1],[92782,92783,1],[92917,92983,66],[92984,92987,1],[92996,93847,851],[93848,93850,1],[94178,113823,19645],[121479,121483,1],[125278,125279,1]];static Pc=[[95,8255,8160],[8256,8276,20],[65075,65076,1],[65101,65103,1],[65343,65343,1]];static Pd=[[45,1418,1373],[1470,5120,3650],[6150,8208,2058],[8209,8213,1],[11799,11802,3],[11834,11835,1],[11840,11869,29],[12316,12336,20],[12448,65073,52625],[65074,65112,38],[65123,65293,170],[69293,69293,1]];static Pe=[[41,93,52],[125,3899,3774],[3901,5788,1887],[8262,8318,56],[8334,8969,635],[8971,9002,31],[10089,10101,2],[10182,10215,33],[10217,10223,2],[10628,10648,2],[10713,10715,2],[10749,11811,1062],[11813,11817,2],[11862,11868,2],[12297,12305,2],[12309,12315,2],[12318,12319,1],[64830,65048,218],[65078,65092,2],[65096,65114,18],[65116,65118,2],[65289,65341,52],[65373,65379,3]];static Pf=[[187,8217,8030],[8221,8250,29],[11779,11781,2],[11786,11789,3],[11805,11809,4]];static Pi=[[171,8216,8045],[8219,8220,1],[8223,8249,26],[11778,11780,2],[11785,11788,3],[11804,11808,4]];static Po=[[33,35,1],[37,39,1],[42,46,2],[47,58,11],[59,63,4],[64,92,28],[161,167,6],[182,183,1],[191,894,703],[903,1370,467],[1371,1375,1],[1417,1472,55],[1475,1478,3],[1523,1524,1],[1545,1546,1],[1548,1549,1],[1563,1565,2],[1566,1567,1],[1642,1645,1],[1748,1792,44],[1793,1805,1],[2039,2041,1],[2096,2110,1],[2142,2404,262],[2405,2416,11],[2557,2678,121],[2800,3191,391],[3204,3572,368],[3663,3674,11],[3675,3844,169],[3845,3858,1],[3860,3973,113],[4048,4052,1],[4057,4058,1],[4170,4175,1],[4347,4960,613],[4961,4968,1],[5742,5867,125],[5868,5869,1],[5941,5942,1],[6100,6102,1],[6104,6106,1],[6144,6149,1],[6151,6154,1],[6468,6469,1],[6686,6687,1],[6816,6822,1],[6824,6829,1],[7002,7008,1],[7037,7038,1],[7164,7167,1],[7227,7231,1],[7294,7295,1],[7360,7367,1],[7379,8214,835],[8215,8224,9],[8225,8231,1],[8240,8248,1],[8251,8254,1],[8257,8259,1],[8263,8273,1],[8275,8277,2],[8278,8286,1],[11513,11516,1],[11518,11519,1],[11632,11776,144],[11777,11782,5],[11783,11784,1],[11787,11790,3],[11791,11798,1],[11800,11801,1],[11803,11806,3],[11807,11818,11],[11819,11822,1],[11824,11833,1],[11836,11839,1],[11841,11843,2],[11844,11855,1],[11858,11860,1],[12289,12291,1],[12349,12539,190],[42238,42239,1],[42509,42511,1],[42611,42622,11],[42738,42743,1],[43124,43127,1],[43214,43215,1],[43256,43258,1],[43260,43310,50],[43311,43359,48],[43457,43469,1],[43486,43487,1],[43612,43615,1],[43742,43743,1],[43760,43761,1],[44011,65040,21029],[65041,65046,1],[65049,65072,23],[65093,65094,1],[65097,65100,1],[65104,65106,1],[65108,65111,1],[65119,65121,1],[65128,65130,2],[65131,65281,150],[65282,65283,1],[65285,65287,1],[65290,65294,2],[65295,65306,11],[65307,65311,4],[65312,65340,28],[65377,65380,3],[65381,65792,411],[65793,65794,1],[66463,66512,49],[66927,67671,744],[67871,67903,32],[68176,68184,1],[68223,68336,113],[68337,68342,1],[68409,68415,1],[68505,68508,1],[69461,69465,1],[69510,69513,1],[69703,69709,1],[69819,69820,1],[69822,69825,1],[69952,69955,1],[70004,70005,1],[70085,70088,1],[70093,70107,14],[70109,70111,1],[70200,70205,1],[70313,70731,418],[70732,70735,1],[70746,70747,1],[70749,70854,105],[71105,71127,1],[71233,71235,1],[71264,71276,1],[71353,71484,131],[71485,71486,1],[71739,72004,265],[72005,72006,1],[72162,72255,93],[72256,72262,1],[72346,72348,1],[72350,72354,1],[72448,72457,1],[72769,72773,1],[72816,72817,1],[73463,73464,1],[73539,73551,1],[73727,74864,1137],[74865,74868,1],[77809,77810,1],[92782,92783,1],[92917,92983,66],[92984,92987,1],[92996,93847,851],[93848,93850,1],[94178,113823,19645],[121479,121483,1],[125278,125279,1]];static Ps=[[40,91,51],[123,3898,3775],[3900,5787,1887],[8218,8222,4],[8261,8317,56],[8333,8968,635],[8970,9001,31],[10088,10100,2],[10181,10214,33],[10216,10222,2],[10627,10647,2],[10712,10714,2],[10748,11810,1062],[11812,11816,2],[11842,11861,19],[11863,11867,2],[12296,12304,2],[12308,12314,2],[12317,64831,52514],[65047,65077,30],[65079,65091,2],[65095,65113,18],[65115,65117,2],[65288,65339,51],[65371,65375,4],[65378,65378,1]];static S=[[36,43,7],[60,62,1],[94,96,2],[124,126,2],[162,166,1],[168,169,1],[172,174,2],[175,177,1],[180,184,4],[215,247,32],[706,709,1],[722,735,1],[741,747,1],[749,751,2],[752,767,1],[885,900,15],[901,1014,113],[1154,1421,267],[1422,1423,1],[1542,1544,1],[1547,1550,3],[1551,1758,207],[1769,1789,20],[1790,2038,248],[2046,2047,1],[2184,2546,362],[2547,2554,7],[2555,2801,246],[2928,3059,131],[3060,3066,1],[3199,3407,208],[3449,3647,198],[3841,3843,1],[3859,3861,2],[3862,3863,1],[3866,3871,1],[3892,3896,2],[4030,4037,1],[4039,4044,1],[4046,4047,1],[4053,4056,1],[4254,4255,1],[5008,5017,1],[5741,6107,366],[6464,6622,158],[6623,6655,1],[7009,7018,1],[7028,7036,1],[8125,8127,2],[8128,8129,1],[8141,8143,1],[8157,8159,1],[8173,8175,1],[8189,8190,1],[8260,8274,14],[8314,8316,1],[8330,8332,1],[8352,8384,1],[8448,8449,1],[8451,8454,1],[8456,8457,1],[8468,8470,2],[8471,8472,1],[8478,8483,1],[8485,8489,2],[8494,8506,12],[8507,8512,5],[8513,8516,1],[8522,8525,1],[8527,8586,59],[8587,8592,5],[8593,8967,1],[8972,9e3,1],[9003,9254,1],[9280,9290,1],[9372,9449,1],[9472,10087,1],[10132,10180,1],[10183,10213,1],[10224,10626,1],[10649,10711,1],[10716,10747,1],[10750,11123,1],[11126,11157,1],[11159,11263,1],[11493,11498,1],[11856,11857,1],[11904,11929,1],[11931,12019,1],[12032,12245,1],[12272,12287,1],[12292,12306,14],[12307,12320,13],[12342,12343,1],[12350,12351,1],[12443,12444,1],[12688,12689,1],[12694,12703,1],[12736,12771,1],[12783,12800,17],[12801,12830,1],[12842,12871,1],[12880,12896,16],[12897,12927,1],[12938,12976,1],[12992,13311,1],[19904,19967,1],[42128,42182,1],[42752,42774,1],[42784,42785,1],[42889,42890,1],[43048,43051,1],[43062,43065,1],[43639,43641,1],[43867,43882,15],[43883,64297,20414],[64434,64450,1],[64832,64847,1],[64975,65020,45],[65021,65023,1],[65122,65124,2],[65125,65126,1],[65129,65284,155],[65291,65308,17],[65309,65310,1],[65342,65344,2],[65372,65374,2],[65504,65510,1],[65512,65518,1],[65532,65533,1],[65847,65855,1],[65913,65929,1],[65932,65934,1],[65936,65948,1],[65952,66e3,48],[66001,66044,1],[67703,67704,1],[68296,71487,3191],[73685,73713,1],[92988,92991,1],[92997,113820,20823],[118608,118723,1],[118784,119029,1],[119040,119078,1],[119081,119140,1],[119146,119148,1],[119171,119172,1],[119180,119209,1],[119214,119274,1],[119296,119361,1],[119365,119552,187],[119553,119638,1],[120513,120539,26],[120571,120597,26],[120629,120655,26],[120687,120713,26],[120745,120771,26],[120832,121343,1],[121399,121402,1],[121453,121460,1],[121462,121475,1],[121477,121478,1],[123215,123647,432],[126124,126128,4],[126254,126704,450],[126705,126976,271],[126977,127019,1],[127024,127123,1],[127136,127150,1],[127153,127167,1],[127169,127183,1],[127185,127221,1],[127245,127405,1],[127462,127490,1],[127504,127547,1],[127552,127560,1],[127568,127569,1],[127584,127589,1],[127744,128727,1],[128732,128748,1],[128752,128764,1],[128768,128886,1],[128891,128985,1],[128992,129003,1],[129008,129024,16],[129025,129035,1],[129040,129095,1],[129104,129113,1],[129120,129159,1],[129168,129197,1],[129200,129201,1],[129280,129619,1],[129632,129645,1],[129648,129660,1],[129664,129672,1],[129680,129725,1],[129727,129733,1],[129742,129755,1],[129760,129768,1],[129776,129784,1],[129792,129938,1],[129940,129994,1]];static Sc=[[36,162,126],[163,165,1],[1423,1547,124],[2046,2047,1],[2546,2547,1],[2555,2801,246],[3065,3647,582],[6107,8352,2245],[8353,8384,1],[43064,65020,21956],[65129,65284,155],[65504,65505,1],[65509,65510,1],[73693,73696,1],[123647,126128,2481]];static Sk=[[94,96,2],[168,175,7],[180,184,4],[706,709,1],[722,735,1],[741,747,1],[749,751,2],[752,767,1],[885,900,15],[901,2184,1283],[8125,8127,2],[8128,8129,1],[8141,8143,1],[8157,8159,1],[8173,8175,1],[8189,8190,1],[12443,12444,1],[42752,42774,1],[42784,42785,1],[42889,42890,1],[43867,43882,15],[43883,64434,20551],[64435,64450,1],[65342,65344,2],[65507,127995,62488],[127996,127999,1]];static Sm=[[43,60,17],[61,62,1],[124,126,2],[172,177,5],[215,247,32],[1014,1542,528],[1543,1544,1],[8260,8274,14],[8314,8316,1],[8330,8332,1],[8472,8512,40],[8513,8516,1],[8523,8592,69],[8593,8596,1],[8602,8603,1],[8608,8614,3],[8622,8654,32],[8655,8658,3],[8660,8692,32],[8693,8959,1],[8992,8993,1],[9084,9115,31],[9116,9139,1],[9180,9185,1],[9655,9665,10],[9720,9727,1],[9839,10176,337],[10177,10180,1],[10183,10213,1],[10224,10239,1],[10496,10626,1],[10649,10711,1],[10716,10747,1],[10750,11007,1],[11056,11076,1],[11079,11084,1],[64297,65122,825],[65124,65126,1],[65291,65308,17],[65309,65310,1],[65372,65374,2],[65506,65513,7],[65514,65516,1],[120513,120539,26],[120571,120597,26],[120629,120655,26],[120687,120713,26],[120745,120771,26],[126704,126705,1]];static So=[[166,169,3],[174,176,2],[1154,1421,267],[1422,1550,128],[1551,1758,207],[1769,1789,20],[1790,2038,248],[2554,2928,374],[3059,3064,1],[3066,3199,133],[3407,3449,42],[3841,3843,1],[3859,3861,2],[3862,3863,1],[3866,3871,1],[3892,3896,2],[4030,4037,1],[4039,4044,1],[4046,4047,1],[4053,4056,1],[4254,4255,1],[5008,5017,1],[5741,6464,723],[6622,6655,1],[7009,7018,1],[7028,7036,1],[8448,8449,1],[8451,8454,1],[8456,8457,1],[8468,8470,2],[8471,8478,7],[8479,8483,1],[8485,8489,2],[8494,8506,12],[8507,8522,15],[8524,8525,1],[8527,8586,59],[8587,8597,10],[8598,8601,1],[8604,8607,1],[8609,8610,1],[8612,8613,1],[8615,8621,1],[8623,8653,1],[8656,8657,1],[8659,8661,2],[8662,8691,1],[8960,8967,1],[8972,8991,1],[8994,9e3,1],[9003,9083,1],[9085,9114,1],[9140,9179,1],[9186,9254,1],[9280,9290,1],[9372,9449,1],[9472,9654,1],[9656,9664,1],[9666,9719,1],[9728,9838,1],[9840,10087,1],[10132,10175,1],[10240,10495,1],[11008,11055,1],[11077,11078,1],[11085,11123,1],[11126,11157,1],[11159,11263,1],[11493,11498,1],[11856,11857,1],[11904,11929,1],[11931,12019,1],[12032,12245,1],[12272,12287,1],[12292,12306,14],[12307,12320,13],[12342,12343,1],[12350,12351,1],[12688,12689,1],[12694,12703,1],[12736,12771,1],[12783,12800,17],[12801,12830,1],[12842,12871,1],[12880,12896,16],[12897,12927,1],[12938,12976,1],[12992,13311,1],[19904,19967,1],[42128,42182,1],[43048,43051,1],[43062,43063,1],[43065,43639,574],[43640,43641,1],[64832,64847,1],[64975,65021,46],[65022,65023,1],[65508,65512,4],[65517,65518,1],[65532,65533,1],[65847,65855,1],[65913,65929,1],[65932,65934,1],[65936,65948,1],[65952,66e3,48],[66001,66044,1],[67703,67704,1],[68296,71487,3191],[73685,73692,1],[73697,73713,1],[92988,92991,1],[92997,113820,20823],[118608,118723,1],[118784,119029,1],[119040,119078,1],[119081,119140,1],[119146,119148,1],[119171,119172,1],[119180,119209,1],[119214,119274,1],[119296,119361,1],[119365,119552,187],[119553,119638,1],[120832,121343,1],[121399,121402,1],[121453,121460,1],[121462,121475,1],[121477,121478,1],[123215,126124,2909],[126254,126976,722],[126977,127019,1],[127024,127123,1],[127136,127150,1],[127153,127167,1],[127169,127183,1],[127185,127221,1],[127245,127405,1],[127462,127490,1],[127504,127547,1],[127552,127560,1],[127568,127569,1],[127584,127589,1],[127744,127994,1],[128e3,128727,1],[128732,128748,1],[128752,128764,1],[128768,128886,1],[128891,128985,1],[128992,129003,1],[129008,129024,16],[129025,129035,1],[129040,129095,1],[129104,129113,1],[129120,129159,1],[129168,129197,1],[129200,129201,1],[129280,129619,1],[129632,129645,1],[129648,129660,1],[129664,129672,1],[129680,129725,1],[129727,129733,1],[129742,129755,1],[129760,129768,1],[129776,129784,1],[129792,129938,1],[129940,129994,1]];static Z=[[32,160,128],[5760,8192,2432],[8193,8202,1],[8232,8233,1],[8239,8287,48],[12288,12288,1]];static Zl=[[8232,8232,1]];static Zp=[[8233,8233,1]];static Zs=[[32,160,128],[5760,8192,2432],[8193,8202,1],[8239,8287,48],[12288,12288,1]];static Adlam=[[125184,125259,1],[125264,125273,1],[125278,125279,1]];static Ahom=[[71424,71450,1],[71453,71467,1],[71472,71494,1]];static Anatolian_Hieroglyphs=[[82944,83526,1]];static Arabic=[[1536,1540,1],[1542,1547,1],[1549,1562,1],[1564,1566,1],[1568,1599,1],[1601,1610,1],[1622,1647,1],[1649,1756,1],[1758,1791,1],[1872,1919,1],[2160,2190,1],[2192,2193,1],[2200,2273,1],[2275,2303,1],[64336,64450,1],[64467,64829,1],[64832,64911,1],[64914,64967,1],[64975,65008,33],[65009,65023,1],[65136,65140,1],[65142,65276,1],[69216,69246,1],[69373,69375,1],[126464,126467,1],[126469,126495,1],[126497,126498,1],[126500,126503,3],[126505,126514,1],[126516,126519,1],[126521,126523,2],[126530,126535,5],[126537,126541,2],[126542,126543,1],[126545,126546,1],[126548,126551,3],[126553,126561,2],[126562,126564,2],[126567,126570,1],[126572,126578,1],[126580,126583,1],[126585,126588,1],[126590,126592,2],[126593,126601,1],[126603,126619,1],[126625,126627,1],[126629,126633,1],[126635,126651,1],[126704,126705,1]];static Armenian=[[1329,1366,1],[1369,1418,1],[1421,1423,1],[64275,64279,1]];static Avestan=[[68352,68405,1],[68409,68415,1]];static Balinese=[[6912,6988,1],[6992,7038,1]];static Bamum=[[42656,42743,1],[92160,92728,1]];static Bassa_Vah=[[92880,92909,1],[92912,92917,1]];static Batak=[[7104,7155,1],[7164,7167,1]];static Bengali=[[2432,2435,1],[2437,2444,1],[2447,2448,1],[2451,2472,1],[2474,2480,1],[2482,2486,4],[2487,2489,1],[2492,2500,1],[2503,2504,1],[2507,2510,1],[2519,2524,5],[2525,2527,2],[2528,2531,1],[2534,2558,1]];static Bhaiksuki=[[72704,72712,1],[72714,72758,1],[72760,72773,1],[72784,72812,1]];static Bopomofo=[[746,747,1],[12549,12591,1],[12704,12735,1]];static Brahmi=[[69632,69709,1],[69714,69749,1],[69759,69759,1]];static Braille=[[10240,10495,1]];static Buginese=[[6656,6683,1],[6686,6687,1]];static Buhid=[[5952,5971,1]];static Canadian_Aboriginal=[[5120,5759,1],[6320,6389,1],[72368,72383,1]];static Carian=[[66208,66256,1]];static Caucasian_Albanian=[[66864,66915,1],[66927,66927,1]];static Chakma=[[69888,69940,1],[69942,69959,1]];static Cham=[[43520,43574,1],[43584,43597,1],[43600,43609,1],[43612,43615,1]];static Cherokee=[[5024,5109,1],[5112,5117,1],[43888,43967,1]];static Chorasmian=[[69552,69579,1]];static Common=[[0,64,1],[91,96,1],[123,169,1],[171,185,1],[187,191,1],[215,247,32],[697,735,1],[741,745,1],[748,767,1],[884,894,10],[901,903,2],[1541,1548,7],[1563,1567,4],[1600,1757,157],[2274,2404,130],[2405,3647,1242],[4053,4056,1],[4347,5867,1520],[5868,5869,1],[5941,5942,1],[6146,6147,1],[6149,7379,1230],[7393,7401,8],[7402,7404,1],[7406,7411,1],[7413,7415,1],[7418,8192,774],[8193,8203,1],[8206,8292,1],[8294,8304,1],[8308,8318,1],[8320,8334,1],[8352,8384,1],[8448,8485,1],[8487,8489,1],[8492,8497,1],[8499,8525,1],[8527,8543,1],[8585,8587,1],[8592,9254,1],[9280,9290,1],[9312,10239,1],[10496,11123,1],[11126,11157,1],[11159,11263,1],[11776,11869,1],[12272,12292,1],[12294,12296,2],[12297,12320,1],[12336,12343,1],[12348,12351,1],[12443,12444,1],[12448,12539,91],[12540,12688,148],[12689,12703,1],[12736,12771,1],[12783,12832,49],[12833,12895,1],[12927,13007,1],[13055,13144,89],[13145,13311,1],[19904,19967,1],[42752,42785,1],[42888,42890,1],[43056,43065,1],[43310,43471,161],[43867,43882,15],[43883,64830,20947],[64831,65040,209],[65041,65049,1],[65072,65106,1],[65108,65126,1],[65128,65131,1],[65279,65281,2],[65282,65312,1],[65339,65344,1],[65371,65381,1],[65392,65438,46],[65439,65504,65],[65505,65510,1],[65512,65518,1],[65529,65533,1],[65792,65794,1],[65799,65843,1],[65847,65855,1],[65936,65948,1],[66e3,66044,1],[66273,66299,1],[113824,113827,1],[118608,118723,1],[118784,119029,1],[119040,119078,1],[119081,119142,1],[119146,119162,1],[119171,119172,1],[119180,119209,1],[119214,119274,1],[119488,119507,1],[119520,119539,1],[119552,119638,1],[119648,119672,1],[119808,119892,1],[119894,119964,1],[119966,119967,1],[119970,119973,3],[119974,119977,3],[119978,119980,1],[119982,119993,1],[119995,119997,2],[119998,120003,1],[120005,120069,1],[120071,120074,1],[120077,120084,1],[120086,120092,1],[120094,120121,1],[120123,120126,1],[120128,120132,1],[120134,120138,4],[120139,120144,1],[120146,120485,1],[120488,120779,1],[120782,120831,1],[126065,126132,1],[126209,126269,1],[126976,127019,1],[127024,127123,1],[127136,127150,1],[127153,127167,1],[127169,127183,1],[127185,127221,1],[127232,127405,1],[127462,127487,1],[127489,127490,1],[127504,127547,1],[127552,127560,1],[127568,127569,1],[127584,127589,1],[127744,128727,1],[128732,128748,1],[128752,128764,1],[128768,128886,1],[128891,128985,1],[128992,129003,1],[129008,129024,16],[129025,129035,1],[129040,129095,1],[129104,129113,1],[129120,129159,1],[129168,129197,1],[129200,129201,1],[129280,129619,1],[129632,129645,1],[129648,129660,1],[129664,129672,1],[129680,129725,1],[129727,129733,1],[129742,129755,1],[129760,129768,1],[129776,129784,1],[129792,129938,1],[129940,129994,1],[130032,130041,1],[917505,917536,31],[917537,917631,1]];static foldCommon=[[924,956,32]];static Coptic=[[994,1007,1],[11392,11507,1],[11513,11519,1]];static Cuneiform=[[73728,74649,1],[74752,74862,1],[74864,74868,1],[74880,75075,1]];static Cypriot=[[67584,67589,1],[67592,67594,2],[67595,67637,1],[67639,67640,1],[67644,67647,3]];static Cypro_Minoan=[[77712,77810,1]];static Cyrillic=[[1024,1156,1],[1159,1327,1],[7296,7304,1],[7467,7544,77],[11744,11775,1],[42560,42655,1],[65070,65071,1],[122928,122989,1],[123023,123023,1]];static Deseret=[[66560,66639,1]];static Devanagari=[[2304,2384,1],[2389,2403,1],[2406,2431,1],[43232,43263,1],[72448,72457,1]];static Dives_Akuru=[[71936,71942,1],[71945,71948,3],[71949,71955,1],[71957,71958,1],[71960,71989,1],[71991,71992,1],[71995,72006,1],[72016,72025,1]];static Dogra=[[71680,71739,1]];static Duployan=[[113664,113770,1],[113776,113788,1],[113792,113800,1],[113808,113817,1],[113820,113823,1]];static Egyptian_Hieroglyphs=[[77824,78933,1]];static Elbasan=[[66816,66855,1]];static Elymaic=[[69600,69622,1]];static Ethiopic=[[4608,4680,1],[4682,4685,1],[4688,4694,1],[4696,4698,2],[4699,4701,1],[4704,4744,1],[4746,4749,1],[4752,4784,1],[4786,4789,1],[4792,4798,1],[4800,4802,2],[4803,4805,1],[4808,4822,1],[4824,4880,1],[4882,4885,1],[4888,4954,1],[4957,4988,1],[4992,5017,1],[11648,11670,1],[11680,11686,1],[11688,11694,1],[11696,11702,1],[11704,11710,1],[11712,11718,1],[11720,11726,1],[11728,11734,1],[11736,11742,1],[43777,43782,1],[43785,43790,1],[43793,43798,1],[43808,43814,1],[43816,43822,1],[124896,124902,1],[124904,124907,1],[124909,124910,1],[124912,124926,1]];static Georgian=[[4256,4293,1],[4295,4301,6],[4304,4346,1],[4348,4351,1],[7312,7354,1],[7357,7359,1],[11520,11557,1],[11559,11565,6]];static Glagolitic=[[11264,11359,1],[122880,122886,1],[122888,122904,1],[122907,122913,1],[122915,122916,1],[122918,122922,1]];static Gothic=[[66352,66378,1]];static Grantha=[[70400,70403,1],[70405,70412,1],[70415,70416,1],[70419,70440,1],[70442,70448,1],[70450,70451,1],[70453,70457,1],[70460,70468,1],[70471,70472,1],[70475,70477,1],[70480,70487,7],[70493,70499,1],[70502,70508,1],[70512,70516,1]];static Greek=[[880,883,1],[885,887,1],[890,893,1],[895,900,5],[902,904,2],[905,906,1],[908,910,2],[911,929,1],[931,993,1],[1008,1023,1],[7462,7466,1],[7517,7521,1],[7526,7530,1],[7615,7936,321],[7937,7957,1],[7960,7965,1],[7968,8005,1],[8008,8013,1],[8016,8023,1],[8025,8031,2],[8032,8061,1],[8064,8116,1],[8118,8132,1],[8134,8147,1],[8150,8155,1],[8157,8175,1],[8178,8180,1],[8182,8190,1],[8486,43877,35391],[65856,65934,1],[65952,119296,53344],[119297,119365,1]];static foldGreek=[[181,837,656]];static Gujarati=[[2689,2691,1],[2693,2701,1],[2703,2705,1],[2707,2728,1],[2730,2736,1],[2738,2739,1],[2741,2745,1],[2748,2757,1],[2759,2761,1],[2763,2765,1],[2768,2784,16],[2785,2787,1],[2790,2801,1],[2809,2815,1]];static Gunjala_Gondi=[[73056,73061,1],[73063,73064,1],[73066,73102,1],[73104,73105,1],[73107,73112,1],[73120,73129,1]];static Gurmukhi=[[2561,2563,1],[2565,2570,1],[2575,2576,1],[2579,2600,1],[2602,2608,1],[2610,2611,1],[2613,2614,1],[2616,2617,1],[2620,2622,2],[2623,2626,1],[2631,2632,1],[2635,2637,1],[2641,2649,8],[2650,2652,1],[2654,2662,8],[2663,2678,1]];static Han=[[11904,11929,1],[11931,12019,1],[12032,12245,1],[12293,12295,2],[12321,12329,1],[12344,12347,1],[13312,19903,1],[19968,40959,1],[63744,64109,1],[64112,64217,1],[94178,94179,1],[94192,94193,1],[131072,173791,1],[173824,177977,1],[177984,178205,1],[178208,183969,1],[183984,191456,1],[191472,192093,1],[194560,195101,1],[196608,201546,1],[201552,205743,1]];static Hangul=[[4352,4607,1],[12334,12335,1],[12593,12686,1],[12800,12830,1],[12896,12926,1],[43360,43388,1],[44032,55203,1],[55216,55238,1],[55243,55291,1],[65440,65470,1],[65474,65479,1],[65482,65487,1],[65490,65495,1],[65498,65500,1]];static Hanifi_Rohingya=[[68864,68903,1],[68912,68921,1]];static Hanunoo=[[5920,5940,1]];static Hatran=[[67808,67826,1],[67828,67829,1],[67835,67839,1]];static Hebrew=[[1425,1479,1],[1488,1514,1],[1519,1524,1],[64285,64310,1],[64312,64316,1],[64318,64320,2],[64321,64323,2],[64324,64326,2],[64327,64335,1]];static Hiragana=[[12353,12438,1],[12445,12447,1],[110593,110879,1],[110898,110928,30],[110929,110930,1],[127488,127488,1]];static Imperial_Aramaic=[[67648,67669,1],[67671,67679,1]];static Inherited=[[768,879,1],[1157,1158,1],[1611,1621,1],[1648,2385,737],[2386,2388,1],[6832,6862,1],[7376,7378,1],[7380,7392,1],[7394,7400,1],[7405,7412,7],[7416,7417,1],[7616,7679,1],[8204,8205,1],[8400,8432,1],[12330,12333,1],[12441,12442,1],[65024,65039,1],[65056,65069,1],[66045,66272,227],[70459,118528,48069],[118529,118573,1],[118576,118598,1],[119143,119145,1],[119163,119170,1],[119173,119179,1],[119210,119213,1],[917760,917999,1]];static foldInherited=[[921,953,32],[8126,8126,1]];static Inscriptional_Pahlavi=[[68448,68466,1],[68472,68479,1]];static Inscriptional_Parthian=[[68416,68437,1],[68440,68447,1]];static Javanese=[[43392,43469,1],[43472,43481,1],[43486,43487,1]];static Kaithi=[[69760,69826,1],[69837,69837,1]];static Kannada=[[3200,3212,1],[3214,3216,1],[3218,3240,1],[3242,3251,1],[3253,3257,1],[3260,3268,1],[3270,3272,1],[3274,3277,1],[3285,3286,1],[3293,3294,1],[3296,3299,1],[3302,3311,1],[3313,3315,1]];static Katakana=[[12449,12538,1],[12541,12543,1],[12784,12799,1],[13008,13054,1],[13056,13143,1],[65382,65391,1],[65393,65437,1],[110576,110579,1],[110581,110587,1],[110589,110590,1],[110592,110880,288],[110881,110882,1],[110933,110948,15],[110949,110951,1]];static Kawi=[[73472,73488,1],[73490,73530,1],[73534,73561,1]];static Kayah_Li=[[43264,43309,1],[43311,43311,1]];static Kharoshthi=[[68096,68099,1],[68101,68102,1],[68108,68115,1],[68117,68119,1],[68121,68149,1],[68152,68154,1],[68159,68168,1],[68176,68184,1]];static Khitan_Small_Script=[[94180,101120,6940],[101121,101589,1]];static Khmer=[[6016,6109,1],[6112,6121,1],[6128,6137,1],[6624,6655,1]];static Khojki=[[70144,70161,1],[70163,70209,1]];static Khudawadi=[[70320,70378,1],[70384,70393,1]];static Lao=[[3713,3714,1],[3716,3718,2],[3719,3722,1],[3724,3747,1],[3749,3751,2],[3752,3773,1],[3776,3780,1],[3782,3784,2],[3785,3790,1],[3792,3801,1],[3804,3807,1]];static Latin=[[65,90,1],[97,122,1],[170,186,16],[192,214,1],[216,246,1],[248,696,1],[736,740,1],[7424,7461,1],[7468,7516,1],[7522,7525,1],[7531,7543,1],[7545,7614,1],[7680,7935,1],[8305,8319,14],[8336,8348,1],[8490,8491,1],[8498,8526,28],[8544,8584,1],[11360,11391,1],[42786,42887,1],[42891,42954,1],[42960,42961,1],[42963,42965,2],[42966,42969,1],[42994,43007,1],[43824,43866,1],[43868,43876,1],[43878,43881,1],[64256,64262,1],[65313,65338,1],[65345,65370,1],[67456,67461,1],[67463,67504,1],[67506,67514,1],[122624,122654,1],[122661,122666,1]];static Lepcha=[[7168,7223,1],[7227,7241,1],[7245,7247,1]];static Limbu=[[6400,6430,1],[6432,6443,1],[6448,6459,1],[6464,6468,4],[6469,6479,1]];static Linear_A=[[67072,67382,1],[67392,67413,1],[67424,67431,1]];static Linear_B=[[65536,65547,1],[65549,65574,1],[65576,65594,1],[65596,65597,1],[65599,65613,1],[65616,65629,1],[65664,65786,1]];static Lisu=[[42192,42239,1],[73648,73648,1]];static Lycian=[[66176,66204,1]];static Lydian=[[67872,67897,1],[67903,67903,1]];static Mahajani=[[69968,70006,1]];static Makasar=[[73440,73464,1]];static Malayalam=[[3328,3340,1],[3342,3344,1],[3346,3396,1],[3398,3400,1],[3402,3407,1],[3412,3427,1],[3430,3455,1]];static Mandaic=[[2112,2139,1],[2142,2142,1]];static Manichaean=[[68288,68326,1],[68331,68342,1]];static Marchen=[[72816,72847,1],[72850,72871,1],[72873,72886,1]];static Masaram_Gondi=[[72960,72966,1],[72968,72969,1],[72971,73014,1],[73018,73020,2],[73021,73023,2],[73024,73031,1],[73040,73049,1]];static Medefaidrin=[[93760,93850,1]];static Meetei_Mayek=[[43744,43766,1],[43968,44013,1],[44016,44025,1]];static Mende_Kikakui=[[124928,125124,1],[125127,125142,1]];static Meroitic_Cursive=[[68e3,68023,1],[68028,68047,1],[68050,68095,1]];static Meroitic_Hieroglyphs=[[67968,67999,1]];static Miao=[[93952,94026,1],[94031,94087,1],[94095,94111,1]];static Modi=[[71168,71236,1],[71248,71257,1]];static Mongolian=[[6144,6145,1],[6148,6150,2],[6151,6169,1],[6176,6264,1],[6272,6314,1],[71264,71276,1]];static Mro=[[92736,92766,1],[92768,92777,1],[92782,92783,1]];static Multani=[[70272,70278,1],[70280,70282,2],[70283,70285,1],[70287,70301,1],[70303,70313,1]];static Myanmar=[[4096,4255,1],[43488,43518,1],[43616,43647,1]];static Nabataean=[[67712,67742,1],[67751,67759,1]];static Nag_Mundari=[[124112,124153,1]];static Nandinagari=[[72096,72103,1],[72106,72151,1],[72154,72164,1]];static New_Tai_Lue=[[6528,6571,1],[6576,6601,1],[6608,6618,1],[6622,6623,1]];static Newa=[[70656,70747,1],[70749,70753,1]];static Nko=[[1984,2042,1],[2045,2047,1]];static Nushu=[[94177,110960,16783],[110961,111355,1]];static Nyiakeng_Puachue_Hmong=[[123136,123180,1],[123184,123197,1],[123200,123209,1],[123214,123215,1]];static Ogham=[[5760,5788,1]];static Ol_Chiki=[[7248,7295,1]];static Old_Hungarian=[[68736,68786,1],[68800,68850,1],[68858,68863,1]];static Old_Italic=[[66304,66339,1],[66349,66351,1]];static Old_North_Arabian=[[68224,68255,1]];static Old_Permic=[[66384,66426,1]];static Old_Persian=[[66464,66499,1],[66504,66517,1]];static Old_Sogdian=[[69376,69415,1]];static Old_South_Arabian=[[68192,68223,1]];static Old_Turkic=[[68608,68680,1]];static Old_Uyghur=[[69488,69513,1]];static Oriya=[[2817,2819,1],[2821,2828,1],[2831,2832,1],[2835,2856,1],[2858,2864,1],[2866,2867,1],[2869,2873,1],[2876,2884,1],[2887,2888,1],[2891,2893,1],[2901,2903,1],[2908,2909,1],[2911,2915,1],[2918,2935,1]];static Osage=[[66736,66771,1],[66776,66811,1]];static Osmanya=[[66688,66717,1],[66720,66729,1]];static Pahawh_Hmong=[[92928,92997,1],[93008,93017,1],[93019,93025,1],[93027,93047,1],[93053,93071,1]];static Palmyrene=[[67680,67711,1]];static Pau_Cin_Hau=[[72384,72440,1]];static Phags_Pa=[[43072,43127,1]];static Phoenician=[[67840,67867,1],[67871,67871,1]];static Psalter_Pahlavi=[[68480,68497,1],[68505,68508,1],[68521,68527,1]];static Rejang=[[43312,43347,1],[43359,43359,1]];static Runic=[[5792,5866,1],[5870,5880,1]];static Samaritan=[[2048,2093,1],[2096,2110,1]];static Saurashtra=[[43136,43205,1],[43214,43225,1]];static Sharada=[[70016,70111,1]];static Shavian=[[66640,66687,1]];static Siddham=[[71040,71093,1],[71096,71133,1]];static SignWriting=[[120832,121483,1],[121499,121503,1],[121505,121519,1]];static Sinhala=[[3457,3459,1],[3461,3478,1],[3482,3505,1],[3507,3515,1],[3517,3520,3],[3521,3526,1],[3530,3535,5],[3536,3540,1],[3542,3544,2],[3545,3551,1],[3558,3567,1],[3570,3572,1],[70113,70132,1]];static Sogdian=[[69424,69465,1]];static Sora_Sompeng=[[69840,69864,1],[69872,69881,1]];static Soyombo=[[72272,72354,1]];static Sundanese=[[7040,7103,1],[7360,7367,1]];static Syloti_Nagri=[[43008,43052,1]];static Syriac=[[1792,1805,1],[1807,1866,1],[1869,1871,1],[2144,2154,1]];static Tagalog=[[5888,5909,1],[5919,5919,1]];static Tagbanwa=[[5984,5996,1],[5998,6e3,1],[6002,6003,1]];static Tai_Le=[[6480,6509,1],[6512,6516,1]];static Tai_Tham=[[6688,6750,1],[6752,6780,1],[6783,6793,1],[6800,6809,1],[6816,6829,1]];static Tai_Viet=[[43648,43714,1],[43739,43743,1]];static Takri=[[71296,71353,1],[71360,71369,1]];static Tamil=[[2946,2947,1],[2949,2954,1],[2958,2960,1],[2962,2965,1],[2969,2970,1],[2972,2974,2],[2975,2979,4],[2980,2984,4],[2985,2986,1],[2990,3001,1],[3006,3010,1],[3014,3016,1],[3018,3021,1],[3024,3031,7],[3046,3066,1],[73664,73713,1],[73727,73727,1]];static Tangsa=[[92784,92862,1],[92864,92873,1]];static Tangut=[[94176,94208,32],[94209,100343,1],[100352,101119,1],[101632,101640,1]];static Telugu=[[3072,3084,1],[3086,3088,1],[3090,3112,1],[3114,3129,1],[3132,3140,1],[3142,3144,1],[3146,3149,1],[3157,3158,1],[3160,3162,1],[3165,3168,3],[3169,3171,1],[3174,3183,1],[3191,3199,1]];static Thaana=[[1920,1969,1]];static Thai=[[3585,3642,1],[3648,3675,1]];static Tibetan=[[3840,3911,1],[3913,3948,1],[3953,3991,1],[3993,4028,1],[4030,4044,1],[4046,4052,1],[4057,4058,1]];static Tifinagh=[[11568,11623,1],[11631,11632,1],[11647,11647,1]];static Tirhuta=[[70784,70855,1],[70864,70873,1]];static Toto=[[123536,123566,1]];static Ugaritic=[[66432,66461,1],[66463,66463,1]];static Vai=[[42240,42539,1]];static Vithkuqi=[[66928,66938,1],[66940,66954,1],[66956,66962,1],[66964,66965,1],[66967,66977,1],[66979,66993,1],[66995,67001,1],[67003,67004,1]];static Wancho=[[123584,123641,1],[123647,123647,1]];static Warang_Citi=[[71840,71922,1],[71935,71935,1]];static Yezidi=[[69248,69289,1],[69291,69293,1],[69296,69297,1]];static Yi=[[40960,42124,1],[42128,42182,1]];static Zanabazar_Square=[[72192,72263,1]];static CATEGORIES=new Map([["C",y.C],["Cc",y.Cc],["Cf",y.Cf],["Co",y.Co],["Cs",y.Cs],["L",y.L],["Ll",y.Ll],["Lm",y.Lm],["Lo",y.Lo],["Lt",y.Lt],["Lu",y.Lu],["M",y.M],["Mc",y.Mc],["Me",y.Me],["Mn",y.Mn],["N",y.N],["Nd",y.Nd],["Nl",y.Nl],["No",y.No],["P",y.P],["Pc",y.Pc],["Pd",y.Pd],["Pe",y.Pe],["Pf",y.Pf],["Pi",y.Pi],["Po",y.Po],["Ps",y.Ps],["S",y.S],["Sc",y.Sc],["Sk",y.Sk],["Sm",y.Sm],["So",y.So],["Z",y.Z],["Zl",y.Zl],["Zp",y.Zp],["Zs",y.Zs]]);static SCRIPTS=new Map([["Adlam",y.Adlam],["Ahom",y.Ahom],["Anatolian_Hieroglyphs",y.Anatolian_Hieroglyphs],["Arabic",y.Arabic],["Armenian",y.Armenian],["Avestan",y.Avestan],["Balinese",y.Balinese],["Bamum",y.Bamum],["Bassa_Vah",y.Bassa_Vah],["Batak",y.Batak],["Bengali",y.Bengali],["Bhaiksuki",y.Bhaiksuki],["Bopomofo",y.Bopomofo],["Brahmi",y.Brahmi],["Braille",y.Braille],["Buginese",y.Buginese],["Buhid",y.Buhid],["Canadian_Aboriginal",y.Canadian_Aboriginal],["Carian",y.Carian],["Caucasian_Albanian",y.Caucasian_Albanian],["Chakma",y.Chakma],["Cham",y.Cham],["Cherokee",y.Cherokee],["Chorasmian",y.Chorasmian],["Common",y.Common],["Coptic",y.Coptic],["Cuneiform",y.Cuneiform],["Cypriot",y.Cypriot],["Cypro_Minoan",y.Cypro_Minoan],["Cyrillic",y.Cyrillic],["Deseret",y.Deseret],["Devanagari",y.Devanagari],["Dives_Akuru",y.Dives_Akuru],["Dogra",y.Dogra],["Duployan",y.Duployan],["Egyptian_Hieroglyphs",y.Egyptian_Hieroglyphs],["Elbasan",y.Elbasan],["Elymaic",y.Elymaic],["Ethiopic",y.Ethiopic],["Georgian",y.Georgian],["Glagolitic",y.Glagolitic],["Gothic",y.Gothic],["Grantha",y.Grantha],["Greek",y.Greek],["Gujarati",y.Gujarati],["Gunjala_Gondi",y.Gunjala_Gondi],["Gurmukhi",y.Gurmukhi],["Han",y.Han],["Hangul",y.Hangul],["Hanifi_Rohingya",y.Hanifi_Rohingya],["Hanunoo",y.Hanunoo],["Hatran",y.Hatran],["Hebrew",y.Hebrew],["Hiragana",y.Hiragana],["Imperial_Aramaic",y.Imperial_Aramaic],["Inherited",y.Inherited],["Inscriptional_Pahlavi",y.Inscriptional_Pahlavi],["Inscriptional_Parthian",y.Inscriptional_Parthian],["Javanese",y.Javanese],["Kaithi",y.Kaithi],["Kannada",y.Kannada],["Katakana",y.Katakana],["Kawi",y.Kawi],["Kayah_Li",y.Kayah_Li],["Kharoshthi",y.Kharoshthi],["Khitan_Small_Script",y.Khitan_Small_Script],["Khmer",y.Khmer],["Khojki",y.Khojki],["Khudawadi",y.Khudawadi],["Lao",y.Lao],["Latin",y.Latin],["Lepcha",y.Lepcha],["Limbu",y.Limbu],["Linear_A",y.Linear_A],["Linear_B",y.Linear_B],["Lisu",y.Lisu],["Lycian",y.Lycian],["Lydian",y.Lydian],["Mahajani",y.Mahajani],["Makasar",y.Makasar],["Malayalam",y.Malayalam],["Mandaic",y.Mandaic],["Manichaean",y.Manichaean],["Marchen",y.Marchen],["Masaram_Gondi",y.Masaram_Gondi],["Medefaidrin",y.Medefaidrin],["Meetei_Mayek",y.Meetei_Mayek],["Mende_Kikakui",y.Mende_Kikakui],["Meroitic_Cursive",y.Meroitic_Cursive],["Meroitic_Hieroglyphs",y.Meroitic_Hieroglyphs],["Miao",y.Miao],["Modi",y.Modi],["Mongolian",y.Mongolian],["Mro",y.Mro],["Multani",y.Multani],["Myanmar",y.Myanmar],["Nabataean",y.Nabataean],["Nag_Mundari",y.Nag_Mundari],["Nandinagari",y.Nandinagari],["New_Tai_Lue",y.New_Tai_Lue],["Newa",y.Newa],["Nko",y.Nko],["Nushu",y.Nushu],["Nyiakeng_Puachue_Hmong",y.Nyiakeng_Puachue_Hmong],["Ogham",y.Ogham],["Ol_Chiki",y.Ol_Chiki],["Old_Hungarian",y.Old_Hungarian],["Old_Italic",y.Old_Italic],["Old_North_Arabian",y.Old_North_Arabian],["Old_Permic",y.Old_Permic],["Old_Persian",y.Old_Persian],["Old_Sogdian",y.Old_Sogdian],["Old_South_Arabian",y.Old_South_Arabian],["Old_Turkic",y.Old_Turkic],["Old_Uyghur",y.Old_Uyghur],["Oriya",y.Oriya],["Osage",y.Osage],["Osmanya",y.Osmanya],["Pahawh_Hmong",y.Pahawh_Hmong],["Palmyrene",y.Palmyrene],["Pau_Cin_Hau",y.Pau_Cin_Hau],["Phags_Pa",y.Phags_Pa],["Phoenician",y.Phoenician],["Psalter_Pahlavi",y.Psalter_Pahlavi],["Rejang",y.Rejang],["Runic",y.Runic],["Samaritan",y.Samaritan],["Saurashtra",y.Saurashtra],["Sharada",y.Sharada],["Shavian",y.Shavian],["Siddham",y.Siddham],["SignWriting",y.SignWriting],["Sinhala",y.Sinhala],["Sogdian",y.Sogdian],["Sora_Sompeng",y.Sora_Sompeng],["Soyombo",y.Soyombo],["Sundanese",y.Sundanese],["Syloti_Nagri",y.Syloti_Nagri],["Syriac",y.Syriac],["Tagalog",y.Tagalog],["Tagbanwa",y.Tagbanwa],["Tai_Le",y.Tai_Le],["Tai_Tham",y.Tai_Tham],["Tai_Viet",y.Tai_Viet],["Takri",y.Takri],["Tamil",y.Tamil],["Tangsa",y.Tangsa],["Tangut",y.Tangut],["Telugu",y.Telugu],["Thaana",y.Thaana],["Thai",y.Thai],["Tibetan",y.Tibetan],["Tifinagh",y.Tifinagh],["Tirhuta",y.Tirhuta],["Toto",y.Toto],["Ugaritic",y.Ugaritic],["Vai",y.Vai],["Vithkuqi",y.Vithkuqi],["Wancho",y.Wancho],["Warang_Citi",y.Warang_Citi],["Yezidi",y.Yezidi],["Yi",y.Yi],["Zanabazar_Square",y.Zanabazar_Square]]);static FOLD_CATEGORIES=new Map([["L",y.foldL],["Ll",y.foldLl],["Lt",y.foldLt],["Lu",y.foldLu],["M",y.foldM],["Mn",y.foldMn]]);static FOLD_SCRIPT=new Map([["Common",y.foldCommon],["Greek",y.foldGreek],["Inherited",y.foldInherited]])}class Z{static MAX_RUNE=1114111;static MAX_ASCII=127;static MAX_LATIN1=255;static MAX_BMP=65535;static MIN_FOLD=65;static MAX_FOLD=125251;static is32(e,t){let r=0,s=e.length;for(;r<s;){let i=r+Math.floor((s-r)/2),o=e[i];if(o[0]<=t&&t<=o[1])return(t-o[0])%o[2]===0;t<o[0]?s=i:r=i+1}return!1}static is(e,t){if(t<=this.MAX_LATIN1){for(let r of e)if(!(t>r[1]))return t<r[0]?!1:(t-r[0])%r[2]===0;return!1}return e.length>0&&t>=e[0][0]&&this.is32(e,t)}static isUpper(e){if(e<=this.MAX_LATIN1){const t=String.fromCodePoint(e);return t.toUpperCase()===t&&t.toLowerCase()!==t}return this.is(y.Upper,e)}static isPrint(e){return e<=this.MAX_LATIN1?e>=32&&e<127||e>=161&&e!==173:this.is(y.L,e)||this.is(y.M,e)||this.is(y.N,e)||this.is(y.P,e)||this.is(y.S,e)}static simpleFold(e){if(y.CASE_ORBIT.has(e))return y.CASE_ORBIT.get(e);const t=N.toLowerCase(e);return t!==e?t:N.toUpperCase(e)}static equalsIgnoreCase(e,t){if(e<0||t<0||e===t)return!0;if(e<=this.MAX_ASCII&&t<=this.MAX_ASCII)return N.CODES.get("A")<=e&&e<=N.CODES.get("Z")&&(e|=32),N.CODES.get("A")<=t&&t<=N.CODES.get("Z")&&(t|=32),e===t;for(let r=this.simpleFold(e);r!==e;r=this.simpleFold(r))if(r===t)return!0;return!1}}class le{static METACHARACTERS="\\.+*?()|[]{}^$";static EMPTY_BEGIN_LINE=1;static EMPTY_END_LINE=2;static EMPTY_BEGIN_TEXT=4;static EMPTY_END_TEXT=8;static EMPTY_WORD_BOUNDARY=16;static EMPTY_NO_WORD_BOUNDARY=32;static EMPTY_ALL=-1;static emptyInts(){return[]}static isalnum(e){return N.CODES.get("0")<=e&&e<=N.CODES.get("9")||N.CODES.get("a")<=e&&e<=N.CODES.get("z")||N.CODES.get("A")<=e&&e<=N.CODES.get("Z")}static unhex(e){return N.CODES.get("0")<=e&&e<=N.CODES.get("9")?e-N.CODES.get("0"):N.CODES.get("a")<=e&&e<=N.CODES.get("f")?e-N.CODES.get("a")+10:N.CODES.get("A")<=e&&e<=N.CODES.get("F")?e-N.CODES.get("A")+10:-1}static escapeRune(e){let t="";if(Z.isPrint(e))this.METACHARACTERS.indexOf(String.fromCodePoint(e))>=0&&(t+="\\"),t+=String.fromCodePoint(e);else switch(e){case N.CODES.get('"'):t+='\\"';break;case N.CODES.get("\\"):t+="\\\\";break;case N.CODES.get("	"):t+="\\t";break;case N.CODES.get(`
`):t+="\\n";break;case N.CODES.get("\r"):t+="\\r";break;case N.CODES.get("\b"):t+="\\b";break;case N.CODES.get("\f"):t+="\\f";break;default:{let r=e.toString(16);e<256?(t+="\\x",r.length===1&&(t+="0"),t+=r):t+=`\\x{${r}}`;break}}return t}static stringToRunes(e){return String(e).split("").map(t=>t.codePointAt(0))}static runeToString(e){return String.fromCodePoint(e)}static isWordRune(e){return N.CODES.get("a")<=e&&e<=N.CODES.get("z")||N.CODES.get("A")<=e&&e<=N.CODES.get("Z")||N.CODES.get("0")<=e&&e<=N.CODES.get("9")||e===N.CODES.get("_")}static emptyOpContext(e,t){let r=0;return e<0&&(r|=this.EMPTY_BEGIN_TEXT|this.EMPTY_BEGIN_LINE),e===N.CODES.get(`
`)&&(r|=this.EMPTY_BEGIN_LINE),t<0&&(r|=this.EMPTY_END_TEXT|this.EMPTY_END_LINE),t===N.CODES.get(`
`)&&(r|=this.EMPTY_END_LINE),this.isWordRune(e)!==this.isWordRune(t)?r|=this.EMPTY_WORD_BOUNDARY:r|=this.EMPTY_NO_WORD_BOUNDARY,r}static quoteMeta(e){return e.split("").map(t=>this.METACHARACTERS.indexOf(t)>=0?`\\${t}`:t).join("")}static charCount(e){return e>Z.MAX_BMP?2:1}static stringToUtf8ByteArray(e){if(globalThis.TextEncoder)return Array.from(new TextEncoder().encode(e));{let t=[],r=0;for(let s=0;s<e.length;s++){let i=e.charCodeAt(s);i<128?t[r++]=i:i<2048?(t[r++]=i>>6|192,t[r++]=i&63|128):(i&64512)===55296&&s+1<e.length&&(e.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(e.charCodeAt(++s)&1023),t[r++]=i>>18|240,t[r++]=i>>12&63|128,t[r++]=i>>6&63|128,t[r++]=i&63|128):(t[r++]=i>>12|224,t[r++]=i>>6&63|128,t[r++]=i&63|128)}return t}}static utf8ByteArrayToString(e){if(globalThis.TextDecoder)return new TextDecoder("utf-8").decode(new Uint8Array(e));{let t=[],r=0,s=0;for(;r<e.length;){let i=e[r++];if(i<128)t[s++]=String.fromCharCode(i);else if(i>191&&i<224){let o=e[r++];t[s++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){let o=e[r++],c=e[r++],u=e[r++],h=((i&7)<<18|(o&63)<<12|(c&63)<<6|u&63)-65536;t[s++]=String.fromCharCode(55296+(h>>10)),t[s++]=String.fromCharCode(56320+(h&1023))}else{let o=e[r++],c=e[r++];t[s++]=String.fromCharCode((i&15)<<12|(o&63)<<6|c&63)}}return t.join("")}}}const _2=(n=[],e=0)=>{const t={};for(let r=0;r<n.length;r++){const s=n[r],i=e+r;t[s]=i,t[i]=s}return Object.freeze(t)};class on{static Encoding=_2(["UTF_16","UTF_8"]);getEncoding(){throw Error("not implemented")}isUTF8Encoding(){return this.getEncoding()===on.Encoding.UTF_8}isUTF16Encoding(){return this.getEncoding()===on.Encoding.UTF_16}}class al extends on{constructor(e=null){super(),this.bytes=e}getEncoding(){return on.Encoding.UTF_8}asCharSequence(){return le.utf8ByteArrayToString(this.bytes)}asBytes(){return this.bytes}length(){return this.bytes.length}}class G0 extends on{constructor(e=null){super(),this.charSequence=e}getEncoding(){return on.Encoding.UTF_16}asCharSequence(){return this.charSequence}asBytes(){return this.charSequence.toString().split("").map(e=>e.codePointAt(0))}length(){return this.charSequence.length}}class oo{static utf16(e){return new G0(e)}static utf8(e){return Array.isArray(e)?new al(e):new al(le.stringToUtf8ByteArray(e))}}class Oo extends Error{constructor(e){super(e),this.name="RE2JSException"}}class Ae extends Oo{constructor(e,t=null){let r=`error parsing regexp: ${e}`;t&&(r+=`: \`${t}\``),super(r),this.name="RE2JSSyntaxException",this.message=r,this.error=e,this.input=t}getDescription(){return this.error}getPattern(){return this.input}}class W0 extends Oo{constructor(e){super(e),this.name="RE2JSCompileException"}}class Yt extends Oo{constructor(e){super(e),this.name="RE2JSGroupException"}}class z0 extends Oo{constructor(e){super(e),this.name="RE2JSFlagsException"}}class K0{static quoteReplacement(e){return e.indexOf("\\")<0&&e.indexOf("$")<0?e:e.split("").map(t=>{const r=t.codePointAt(0);return r===N.CODES["\\"]||r===N.CODES.$?`\\${t}`:t}).join("")}constructor(e,t){if(e===null)throw new Error("pattern is null");this.patternInput=e;const r=this.patternInput.re2();this.patternGroupCount=r.numberOfCapturingGroups(),this.groups=[],this.namedGroups=r.namedGroups,t instanceof on?this.resetMatcherInput(t):Array.isArray(t)?this.resetMatcherInput(oo.utf8(t)):this.resetMatcherInput(oo.utf16(t))}pattern(){return this.patternInput}reset(){return this.matcherInputLength=this.matcherInput.length(),this.appendPos=0,this.hasMatch=!1,this.hasGroups=!1,this.anchorFlag=0,this}resetMatcherInput(e){if(e===null)throw new Error("input is null");return this.matcherInput=e,this.reset(),this}start(e=0){if(typeof e=="string"){const t=this.namedGroups[e];if(!Number.isFinite(t))throw new Yt(`group '${e}' not found`);e=t}return this.loadGroup(e),this.groups[2*e]}end(e=0){if(typeof e=="string"){const t=this.namedGroups[e];if(!Number.isFinite(t))throw new Yt(`group '${e}' not found`);e=t}return this.loadGroup(e),this.groups[2*e+1]}group(e=0){if(typeof e=="string"){const s=this.namedGroups[e];if(!Number.isFinite(s))throw new Yt(`group '${e}' not found`);e=s}const t=this.start(e),r=this.end(e);return t<0&&r<0?null:this.substring(t,r)}groupCount(){return this.patternGroupCount}loadGroup(e){if(e<0||e>this.patternGroupCount)throw new Yt(`Group index out of bounds: ${e}`);if(!this.hasMatch)throw new Yt("perhaps no match attempted");if(e===0||this.hasGroups)return;let t=this.groups[1]+1;t>this.matcherInputLength&&(t=this.matcherInputLength);const r=this.patternInput.re2().matchMachineInput(this.matcherInput,this.groups[0],t,this.anchorFlag,1+this.patternGroupCount);if(!r[0])throw new Yt("inconsistency in matching group data");this.groups=r[1],this.hasGroups=!0}matches(){return this.genMatch(0,B.ANCHOR_BOTH)}lookingAt(){return this.genMatch(0,B.ANCHOR_START)}find(e=null){if(e!==null){if(e<0||e>this.matcherInputLength)throw new Yt(`start index out of bounds: ${e}`);return this.reset(),this.genMatch(e,0)}return e=0,this.hasMatch&&(e=this.groups[1],this.groups[0]===this.groups[1]&&e++),this.genMatch(e,B.UNANCHORED)}genMatch(e,t){const r=this.patternInput.re2().matchMachineInput(this.matcherInput,e,this.matcherInputLength,t,1);return r[0]?(this.groups=r[1],this.hasMatch=!0,this.hasGroups=!1,this.anchorFlag=t,!0):!1}substring(e,t){return this.matcherInput.isUTF8Encoding()?le.utf8ByteArrayToString(this.matcherInput.asBytes().slice(e,t)):this.matcherInput.asCharSequence().substring(e,t).toString()}inputLength(){return this.matcherInputLength}appendReplacement(e,t=!1){let r="";const s=this.start(),i=this.end();return this.appendPos<s&&(r+=this.substring(this.appendPos,s)),this.appendPos=i,r+=t?this.appendReplacementInternalPerl(e):this.appendReplacementInternal(e),r}appendReplacementInternal(e){let t="",r=0;const s=e.length;for(let i=0;i<s-1;i++){if(e.codePointAt(i)===N.CODES.get("\\")){r<i&&(t+=e.substring(r,i)),i++,r=i;continue}if(e.codePointAt(i)===N.CODES.get("$")){let o=e.codePointAt(i+1);if(N.CODES.get("0")<=o&&o<=N.CODES.get("9")){let c=o-N.CODES.get("0");for(r<i&&(t+=e.substring(r,i)),i+=2;i<s&&(o=e.codePointAt(i),!(o<N.CODES.get("0")||o>N.CODES.get("9")||c*10+o-N.CODES.get("0")>this.patternGroupCount));i++)c=c*10+o-N.CODES.get("0");if(c>this.patternGroupCount)throw new Yt(`n > number of groups: ${c}`);const u=this.group(c);u!==null&&(t+=u),r=i,i--;continue}else if(o===N.CODES.get("{")){r<i&&(t+=e.substring(r,i)),i++;let c=i+1;for(;c<e.length&&e.codePointAt(c)!==N.CODES.get("}")&&e.codePointAt(c)!==N.CODES.get(" ");)c++;if(c===e.length||e.codePointAt(c)!==N.CODES.get("}"))throw new Yt("named capture group is missing trailing '}'");const u=e.substring(i+1,c);t+=this.group(u),r=c+1}}}return r<s&&(t+=e.substring(r,s)),t}appendReplacementInternalPerl(e){let t="",r=0;const s=e.length;for(let i=0;i<s-1;i++)if(e.codePointAt(i)===N.CODES.get("$")){let o=e.codePointAt(i+1);if(N.CODES.get("$")===o){r<i&&(t+=e.substring(r,i)),t+="$",i++,r=i+1;continue}else if(N.CODES.get("&")===o){r<i&&(t+=e.substring(r,i));const c=this.group(0);c!==null?t+=c:t+="$&",i++,r=i+1;continue}else if(N.CODES.get("1")<=o&&o<=N.CODES.get("9")){let c=o-N.CODES.get("0");for(r<i&&(t+=e.substring(r,i)),i+=2;i<s&&(o=e.codePointAt(i),!(o<N.CODES.get("0")||o>N.CODES.get("9")||c*10+o-N.CODES.get("0")>this.patternGroupCount));i++)c=c*10+o-N.CODES.get("0");if(c>this.patternGroupCount){t+=`$${c}`,r=i,i--;continue}const u=this.group(c);u!==null&&(t+=u),r=i,i--;continue}else if(o===N.CODES.get("<")){r<i&&(t+=e.substring(r,i)),i++;let c=i+1;for(;c<e.length&&e.codePointAt(c)!==N.CODES.get(">")&&e.codePointAt(c)!==N.CODES.get(" ");)c++;if(c===e.length||e.codePointAt(c)!==N.CODES.get(">")){t+=e.substring(i-1,c+1),r=c+1;continue}const u=e.substring(i+1,c);Object.prototype.hasOwnProperty.call(this.namedGroups,u)?t+=this.group(u):t+=`$<${u}>`,r=c+1}}return r<s&&(t+=e.substring(r,s)),t}appendTail(){return this.substring(this.appendPos,this.matcherInputLength)}replaceAll(e,t=!1){return this.replace(e,!0,t)}replaceFirst(e,t=!1){return this.replace(e,!1,t)}replace(e,t=!0,r=!1){let s="";for(this.reset();this.find()&&(s+=this.appendReplacement(e,r),!!t););return s+=this.appendTail(),s}}class In{static EOF(){return-8}canCheckPrefix(){return!0}endPos(){return this.end}}class Y0 extends In{constructor(e,t=0,r=e.length){super(),this.bytes=e,this.start=t,this.end=r}step(e){if(e+=this.start,e>=this.end)return In.EOF();let t=this.bytes[e++]&255;return(t&128)===0?t<<3|1:(t&224)===192?(t=t&31,e>=this.end?In.EOF():(t=t<<6|this.bytes[e++]&63,t<<3|2)):(t&240)===224?(t=t&15,e+1>=this.end?In.EOF():(t=t<<6|this.bytes[e++]&63,t=t<<6|this.bytes[e++]&63,t<<3|3)):(t=t&7,e+2>=this.end?In.EOF():(t=t<<6|this.bytes[e++]&63,t=t<<6|this.bytes[e++]&63,t=t<<6|this.bytes[e++]&63,t<<3|4))}index(e,t){t+=this.start;const r=this.indexOf(this.bytes,e.prefixUTF8,t);return r<0?r:r-t}context(e){e+=this.start;let t=-1;if(e>this.start&&e<=this.end){let s=e-1;if(t=this.bytes[s--],t>=128){let i=e-4;for(i<this.start&&(i=this.start);s>=i&&(this.bytes[s]&192)===128;)s--;s<this.start&&(s=this.start),t=this.step(s)>>3}}const r=e<this.end?this.step(e)>>3:-1;return le.emptyOpContext(t,r)}indexOf(e,t,r=0){let s=t.length;if(s===0)return-1;let i=e.length;for(let o=r;o<=i-s;o++)for(let c=0;c<s&&e[o+c]===t[c];c++)if(c===s-1)return o;return-1}}class Q0 extends In{constructor(e,t=0,r=e.length){super(),this.charSequence=e,this.start=t,this.end=r}step(e){if(e+=this.start,e<this.end){const t=this.charSequence.codePointAt(e);return t<<3|le.charCount(t)}else return In.EOF()}index(e,t){t+=this.start;const r=this.charSequence.indexOf(e.prefix,t);return r<0?r:r-t}context(e){e+=this.start;const t=e>0&&e<=this.charSequence.length?this.charSequence.codePointAt(e-1):-1,r=e<this.charSequence.length?this.charSequence.codePointAt(e):-1;return le.emptyOpContext(t,r)}}class Re{static fromUTF8(e,t=0,r=e.length){return new Y0(e,t,r)}static fromUTF16(e,t=0,r=e.length){return new Q0(e,t,r)}}class v{static Op=_2(["NO_MATCH","EMPTY_MATCH","LITERAL","CHAR_CLASS","ANY_CHAR_NOT_NL","ANY_CHAR","BEGIN_LINE","END_LINE","BEGIN_TEXT","END_TEXT","WORD_BOUNDARY","NO_WORD_BOUNDARY","CAPTURE","STAR","PLUS","QUEST","REPEAT","CONCAT","ALTERNATE","LEFT_PAREN","VERTICAL_BAR"]);static isPseudoOp(e){return e>=v.Op.LEFT_PAREN}static emptySubs(){return[]}static quoteIfHyphen(e){return e===N.CODES.get("-")?"\\":""}static fromRegexp(e){const t=new v(e.op);return t.flags=e.flags,t.subs=e.subs,t.runes=e.runes,t.cap=e.cap,t.min=e.min,t.max=e.max,t.name=e.name,t.namedGroups=e.namedGroups,t}constructor(e){this.op=e,this.flags=0,this.subs=v.emptySubs(),this.runes=null,this.min=0,this.max=0,this.cap=0,this.name=null,this.namedGroups={}}reinit(){this.flags=0,this.subs=v.emptySubs(),this.runes=null,this.cap=0,this.min=0,this.max=0,this.name=null,this.namedGroups={}}toString(){return this.appendTo()}appendTo(){let e="";switch(this.op){case v.Op.NO_MATCH:e+="[^\\x00-\\x{10FFFF}]";break;case v.Op.EMPTY_MATCH:e+="(?:)";break;case v.Op.STAR:case v.Op.PLUS:case v.Op.QUEST:case v.Op.REPEAT:{const t=this.subs[0];switch(t.op>v.Op.CAPTURE||t.op===v.Op.LITERAL&&t.runes.length>1?e+=`(?:${t.appendTo()})`:e+=t.appendTo(),this.op){case v.Op.STAR:e+="*";break;case v.Op.PLUS:e+="+";break;case v.Op.QUEST:e+="?";break;case v.Op.REPEAT:e+=`{${this.min}`,this.min!==this.max&&(e+=",",this.max>=0&&(e+=this.max)),e+="}";break}(this.flags&B.NON_GREEDY)!==0&&(e+="?");break}case v.Op.CONCAT:{for(let t of this.subs)t.op===v.Op.ALTERNATE?e+=`(?:${t.appendTo()})`:e+=t.appendTo();break}case v.Op.ALTERNATE:{let t="";for(let r of this.subs)e+=t,t="|",e+=r.appendTo();break}case v.Op.LITERAL:(this.flags&B.FOLD_CASE)!==0&&(e+="(?i:");for(let t of this.runes)e+=le.escapeRune(t);(this.flags&B.FOLD_CASE)!==0&&(e+=")");break;case v.Op.ANY_CHAR_NOT_NL:e+="(?-s:.)";break;case v.Op.ANY_CHAR:e+="(?s:.)";break;case v.Op.CAPTURE:this.name===null||this.name.length===0?e+="(":e+=`(?P<${this.name}>`,this.subs[0].op!==v.Op.EMPTY_MATCH&&(e+=this.subs[0].appendTo()),e+=")";break;case v.Op.BEGIN_TEXT:e+="\\A";break;case v.Op.END_TEXT:(this.flags&B.WAS_DOLLAR)!==0?e+="(?-m:$)":e+="\\z";break;case v.Op.BEGIN_LINE:e+="^";break;case v.Op.END_LINE:e+="$";break;case v.Op.WORD_BOUNDARY:e+="\\b";break;case v.Op.NO_WORD_BOUNDARY:e+="\\B";break;case v.Op.CHAR_CLASS:if(this.runes.length%2!==0){e+="[invalid char class]";break}if(e+="[",this.runes.length===0)e+="^\\x00-\\x{10FFFF}";else if(this.runes[0]===0&&this.runes[this.runes.length-1]===Z.MAX_RUNE){e+="^";for(let t=1;t<this.runes.length-1;t+=2){const r=this.runes[t]+1,s=this.runes[t+1]-1;e+=v.quoteIfHyphen(r),e+=le.escapeRune(r),r!==s&&(e+="-",e+=v.quoteIfHyphen(s),e+=le.escapeRune(s))}}else for(let t=0;t<this.runes.length;t+=2){const r=this.runes[t],s=this.runes[t+1];e+=v.quoteIfHyphen(r),e+=le.escapeRune(r),r!==s&&(e+="-",e+=v.quoteIfHyphen(s),e+=le.escapeRune(s))}e+="]";break;default:e+=this.op;break}return e}maxCap(){let e=0;if(this.op===v.Op.CAPTURE&&(e=this.cap),this.subs!==null)for(let t of this.subs){const r=t.maxCap();e<r&&(e=r)}return e}equals(e){if(!(e!==null&&e instanceof v)||this.op!==e.op)return!1;switch(this.op){case v.Op.END_TEXT:{if((this.flags&B.WAS_DOLLAR)!==(e.flags&B.WAS_DOLLAR))return!1;break}case v.Op.LITERAL:case v.Op.CHAR_CLASS:{if(this.runes===null&&e.runes===null)break;if(this.runes===null||e.runes===null||this.runes.length!==e.runes.length)return!1;for(let t=0;t<this.runes.length;t++)if(this.runes[t]!==e.runes[t])return!1;break}case v.Op.ALTERNATE:case v.Op.CONCAT:{if(this.subs.length!==e.subs.length)return!1;for(let t=0;t<this.subs.length;++t)if(!this.subs[t].equals(e.subs[t]))return!1;break}case v.Op.STAR:case v.Op.PLUS:case v.Op.QUEST:{if((this.flags&B.NON_GREEDY)!==(e.flags&B.NON_GREEDY)||!this.subs[0].equals(e.subs[0]))return!1;break}case v.Op.REPEAT:{if((this.flags&B.NON_GREEDY)!==(e.flags&B.NON_GREEDY)||this.min!==e.min||this.max!==e.max||!this.subs[0].equals(e.subs[0]))return!1;break}case v.Op.CAPTURE:{if(this.cap!==e.cap||(this.name===null?e.name!==null:this.name!==e.name)||!this.subs[0].equals(e.subs[0]))return!1;break}}return!0}}class G{static ALT=1;static ALT_MATCH=2;static CAPTURE=3;static EMPTY_WIDTH=4;static FAIL=5;static MATCH=6;static NOP=7;static RUNE=8;static RUNE1=9;static RUNE_ANY=10;static RUNE_ANY_NOT_NL=11;static isRuneOp(e){return G.RUNE<=e&&e<=G.RUNE_ANY_NOT_NL}static escapeRunes(e){let t='"';for(let r of e)t+=le.escapeRune(r);return t+='"',t}constructor(e){this.op=e,this.out=0,this.arg=0,this.runes=null}matchRune(e){if(this.runes.length===1){const s=this.runes[0];return(this.arg&B.FOLD_CASE)!==0?Z.equalsIgnoreCase(s,e):e===s}for(let s=0;s<this.runes.length&&s<=8;s+=2){if(e<this.runes[s])return!1;if(e<=this.runes[s+1])return!0}let t=0,r=this.runes.length/2|0;for(;t<r;){const s=t+((r-t)/2|0);if(this.runes[2*s]<=e){if(e<=this.runes[2*s+1])return!0;t=s+1}else r=s}return!1}toString(){switch(this.op){case G.ALT:return`alt -> ${this.out}, ${this.arg}`;case G.ALT_MATCH:return`altmatch -> ${this.out}, ${this.arg}`;case G.CAPTURE:return`cap ${this.arg} -> ${this.out}`;case G.EMPTY_WIDTH:return`empty ${this.arg} -> ${this.out}`;case G.MATCH:return"match";case G.FAIL:return"fail";case G.NOP:return`nop -> ${this.out}`;case G.RUNE:return this.runes===null?"rune <null>":["rune ",G.escapeRunes(this.runes),(this.arg&B.FOLD_CASE)!==0?"/i":""," -> ",this.out].join("");case G.RUNE1:return`rune1 ${G.escapeRunes(this.runes)} -> ${this.out}`;case G.RUNE_ANY:return`any -> ${this.out}`;case G.RUNE_ANY_NOT_NL:return`anynotnl -> ${this.out}`;default:throw new Error("unhandled case in Inst.toString")}}}class X0{constructor(){this.inst=[],this.start=0,this.numCap=2}getInst(e){return this.inst[e]}numInst(){return this.inst.length}addInst(e){this.inst.push(new G(e))}skipNop(e){let t=this.inst[e];for(;t.op===G.NOP||t.op===G.CAPTURE;)t=this.inst[e],e=t.out;return t}prefix(){let e="",t=this.skipNop(this.start);if(!G.isRuneOp(t.op)||t.runes.length!==1)return[t.op===G.MATCH,e];for(;G.isRuneOp(t.op)&&t.runes.length===1&&(t.arg&B.FOLD_CASE)===0;)e+=String.fromCodePoint(t.runes[0]),t=this.skipNop(t.out);return[t.op===G.MATCH,e]}startCond(){let e=0,t=this.start;e:for(;;){const r=this.inst[t];switch(r.op){case G.EMPTY_WIDTH:e|=r.arg;break;case G.FAIL:return-1;case G.CAPTURE:case G.NOP:break;default:break e}t=r.out}return e}next(e){const t=this.inst[e>>1];return(e&1)===0?t.out:t.arg}patch(e,t){for(;e!==0;){const r=this.inst[e>>1];(e&1)===0?(e=r.out,r.out=t):(e=r.arg,r.arg=t)}}append(e,t){if(e===0)return t;if(t===0)return e;let r=e;for(;;){const i=this.next(r);if(i===0)break;r=i}const s=this.inst[r>>1];return(r&1)===0?s.out=t:s.arg=t,e}toString(){let e="";for(let t=0;t<this.inst.length;t++){const r=e.length;e+=t,t===this.start&&(e+="*"),e+="        ".substring(e.length-r),e+=this.inst[t],e+=`
`}return e}}class Mi{constructor(e=0,t=0,r=!1){this.i=e,this.out=t,this.nullable=r}}class Rs{static ANY_RUNE_NOT_NL(){return[0,N.CODES.get(`
`)-1,N.CODES.get(`
`)+1,Z.MAX_RUNE]}static ANY_RUNE(){return[0,Z.MAX_RUNE]}static compileRegexp(e){const t=new Rs,r=t.compile(e);return t.prog.patch(r.out,t.newInst(G.MATCH).i),t.prog.start=r.i,t.prog}constructor(){this.prog=new X0,this.newInst(G.FAIL)}newInst(e){return this.prog.addInst(e),new Mi(this.prog.numInst()-1,0,!0)}nop(){const e=this.newInst(G.NOP);return e.out=e.i<<1,e}fail(){return new Mi}cap(e){const t=this.newInst(G.CAPTURE);return t.out=t.i<<1,this.prog.getInst(t.i).arg=e,this.prog.numCap<e+1&&(this.prog.numCap=e+1),t}cat(e,t){return e.i===0||t.i===0?this.fail():(this.prog.patch(e.out,t.i),new Mi(e.i,t.out,e.nullable&&t.nullable))}alt(e,t){if(e.i===0)return t;if(t.i===0)return e;const r=this.newInst(G.ALT),s=this.prog.getInst(r.i);return s.out=e.i,s.arg=t.i,r.out=this.prog.append(e.out,t.out),r.nullable=e.nullable||t.nullable,r}loop(e,t){const r=this.newInst(G.ALT),s=this.prog.getInst(r.i);return t?(s.arg=e.i,r.out=r.i<<1):(s.out=e.i,r.out=r.i<<1|1),this.prog.patch(e.out,r.i),r}quest(e,t){const r=this.newInst(G.ALT),s=this.prog.getInst(r.i);return t?(s.arg=e.i,r.out=r.i<<1):(s.out=e.i,r.out=r.i<<1|1),r.out=this.prog.append(r.out,e.out),r}star(e,t){return e.nullable?this.quest(this.plus(e,t),t):this.loop(e,t)}plus(e,t){return new Mi(e.i,this.loop(e,t).out,e.nullable)}empty(e){const t=this.newInst(G.EMPTY_WIDTH);return this.prog.getInst(t.i).arg=e,t.out=t.i<<1,t}rune(e,t){const r=this.newInst(G.RUNE);r.nullable=!1;const s=this.prog.getInst(r.i);return s.runes=e,t&=B.FOLD_CASE,(e.length!==1||Z.simpleFold(e[0])===e[0])&&(t&=-2),s.arg=t,r.out=r.i<<1,(t&B.FOLD_CASE)===0&&e.length===1||e.length===2&&e[0]===e[1]?s.op=G.RUNE1:e.length===2&&e[0]===0&&e[1]===Z.MAX_RUNE?s.op=G.RUNE_ANY:e.length===4&&e[0]===0&&e[1]===N.CODES.get(`
`)-1&&e[2]===N.CODES.get(`
`)+1&&e[3]===Z.MAX_RUNE&&(s.op=G.RUNE_ANY_NOT_NL),r}compile(e){switch(e.op){case v.Op.NO_MATCH:return this.fail();case v.Op.EMPTY_MATCH:return this.nop();case v.Op.LITERAL:if(e.runes.length===0)return this.nop();{let t=null;for(let r of e.runes){const s=this.rune([r],e.flags);t=t===null?s:this.cat(t,s)}return t}case v.Op.CHAR_CLASS:return this.rune(e.runes,e.flags);case v.Op.ANY_CHAR_NOT_NL:return this.rune(Rs.ANY_RUNE_NOT_NL(),0);case v.Op.ANY_CHAR:return this.rune(Rs.ANY_RUNE(),0);case v.Op.BEGIN_LINE:return this.empty(le.EMPTY_BEGIN_LINE);case v.Op.END_LINE:return this.empty(le.EMPTY_END_LINE);case v.Op.BEGIN_TEXT:return this.empty(le.EMPTY_BEGIN_TEXT);case v.Op.END_TEXT:return this.empty(le.EMPTY_END_TEXT);case v.Op.WORD_BOUNDARY:return this.empty(le.EMPTY_WORD_BOUNDARY);case v.Op.NO_WORD_BOUNDARY:return this.empty(le.EMPTY_NO_WORD_BOUNDARY);case v.Op.CAPTURE:{const t=this.cap(e.cap<<1),r=this.compile(e.subs[0]),s=this.cap(e.cap<<1|1);return this.cat(this.cat(t,r),s)}case v.Op.STAR:return this.star(this.compile(e.subs[0]),(e.flags&B.NON_GREEDY)!==0);case v.Op.PLUS:return this.plus(this.compile(e.subs[0]),(e.flags&B.NON_GREEDY)!==0);case v.Op.QUEST:return this.quest(this.compile(e.subs[0]),(e.flags&B.NON_GREEDY)!==0);case v.Op.CONCAT:{if(e.subs.length===0)return this.nop();{let t=null;for(let r of e.subs){const s=this.compile(r);t=t===null?s:this.cat(t,s)}return t}}case v.Op.ALTERNATE:{if(e.subs.length===0)return this.nop();{let t=null;for(let r of e.subs){const s=this.compile(r);t=t===null?s:this.alt(t,s)}return t}}default:throw new W0("regexp: unhandled case in compile")}}}class Nt{static simplify(e){if(e===null)return null;switch(e.op){case v.Op.CAPTURE:case v.Op.CONCAT:case v.Op.ALTERNATE:{let t=e;for(let r=0;r<e.subs.length;r++){const s=e.subs[r],i=Nt.simplify(s);t===e&&i!==s&&(t=v.fromRegexp(e),t.runes=null,t.subs=e.subs.slice(0,e.subs.length)),t!==e&&(t.subs[r]=i)}return t}case v.Op.STAR:case v.Op.PLUS:case v.Op.QUEST:{const t=Nt.simplify(e.subs[0]);return Nt.simplify1(e.op,e.flags,t,e)}case v.Op.REPEAT:{if(e.min===0&&e.max===0)return new v(v.Op.EMPTY_MATCH);const t=Nt.simplify(e.subs[0]);if(e.max===-1){if(e.min===0)return Nt.simplify1(v.Op.STAR,e.flags,t,null);if(e.min===1)return Nt.simplify1(v.Op.PLUS,e.flags,t,null);const s=new v(v.Op.CONCAT),i=[];for(let o=0;o<e.min-1;o++)i.push(t);return i.push(Nt.simplify1(v.Op.PLUS,e.flags,t,null)),s.subs=i.slice(0),s}if(e.min===1&&e.max===1)return t;let r=null;if(e.min>0){r=[];for(let s=0;s<e.min;s++)r.push(t)}if(e.max>e.min){let s=Nt.simplify1(v.Op.QUEST,e.flags,t,null);for(let i=e.min+1;i<e.max;i++){const o=new v(v.Op.CONCAT);o.subs=[t,s],s=Nt.simplify1(v.Op.QUEST,e.flags,o,null)}if(r===null)return s;r.push(s)}if(r!==null){const s=new v(v.Op.CONCAT);return s.subs=r.slice(0),s}return new v(v.Op.NO_MATCH)}}return e}static simplify1(e,t,r,s){return r.op===v.Op.EMPTY_MATCH||e===r.op&&(t&B.NON_GREEDY)===(r.flags&B.NON_GREEDY)?r:(s!==null&&s.op===e&&(s.flags&B.NON_GREEDY)===(t&B.NON_GREEDY)&&r===s.subs[0]||(s=new v(e),s.flags=t,s.subs=[r]),s)}}class ce{constructor(e,t){this.sign=e,this.cls=t}}const cl=[48,57],ul=[9,10,12,13,32,32],ll=[48,57,65,90,95,95,97,122],hl=new Map([["\\d",new ce(1,cl)],["\\D",new ce(-1,cl)],["\\s",new ce(1,ul)],["\\S",new ce(-1,ul)],["\\w",new ce(1,ll)],["\\W",new ce(-1,ll)]]),dl=[48,57,65,90,97,122],fl=[65,90,97,122],pl=[0,127],ml=[9,9,32,32],gl=[0,31,127,127],_l=[48,57],El=[33,126],yl=[97,122],wl=[32,126],Il=[33,47,58,64,91,96,123,126],Tl=[9,13,32,32],Al=[65,90],Rl=[48,57,65,90,95,95,97,122],vl=[48,57,65,70,97,102],Cl=new Map([["[:alnum:]",new ce(1,dl)],["[:^alnum:]",new ce(-1,dl)],["[:alpha:]",new ce(1,fl)],["[:^alpha:]",new ce(-1,fl)],["[:ascii:]",new ce(1,pl)],["[:^ascii:]",new ce(-1,pl)],["[:blank:]",new ce(1,ml)],["[:^blank:]",new ce(-1,ml)],["[:cntrl:]",new ce(1,gl)],["[:^cntrl:]",new ce(-1,gl)],["[:digit:]",new ce(1,_l)],["[:^digit:]",new ce(-1,_l)],["[:graph:]",new ce(1,El)],["[:^graph:]",new ce(-1,El)],["[:lower:]",new ce(1,yl)],["[:^lower:]",new ce(-1,yl)],["[:print:]",new ce(1,wl)],["[:^print:]",new ce(-1,wl)],["[:punct:]",new ce(1,Il)],["[:^punct:]",new ce(-1,Il)],["[:space:]",new ce(1,Tl)],["[:^space:]",new ce(-1,Tl)],["[:upper:]",new ce(1,Al)],["[:^upper:]",new ce(-1,Al)],["[:word:]",new ce(1,Rl)],["[:^word:]",new ce(-1,Rl)],["[:xdigit:]",new ce(1,vl)],["[:^xdigit:]",new ce(-1,vl)]]);class Ye{static charClassToString(e,t){let r="[";for(let s=0;s<t;s+=2){s>0&&(r+=" ");const i=e[s],o=e[s+1];i===o?r+=`0x${i.toString(16)}`:r+=`0x${i.toString(16)}-0x${o.toString(16)}`}return r+="]",r}static cmp(e,t,r,s){const i=e[t]-r;return i!==0?i:s-e[t+1]}static qsortIntPair(e,t,r){const s=((t+r)/2|0)&-2,i=e[s],o=e[s+1];let c=t,u=r;for(;c<=u;){for(;c<r&&Ye.cmp(e,c,i,o)<0;)c+=2;for(;u>t&&Ye.cmp(e,u,i,o)>0;)u-=2;if(c<=u){if(c!==u){let h=e[c];e[c]=e[u],e[u]=h,h=e[c+1],e[c+1]=e[u+1],e[u+1]=h}c+=2,u-=2}}t<u&&Ye.qsortIntPair(e,t,u),c<r&&Ye.qsortIntPair(e,c,r)}constructor(e=le.emptyInts()){this.r=e,this.len=e.length}toArray(){return this.len===this.r.length?this.r:this.r.slice(0,this.len)}cleanClass(){if(this.len<4)return this;Ye.qsortIntPair(this.r,0,this.len-2);let e=2;for(let t=2;t<this.len;t+=2){const r=this.r[t],s=this.r[t+1];if(r<=this.r[e-1]+1){s>this.r[e-1]&&(this.r[e-1]=s);continue}this.r[e]=r,this.r[e+1]=s,e+=2}return this.len=e,this}appendLiteral(e,t){return(t&B.FOLD_CASE)!==0?this.appendFoldedRange(e,e):this.appendRange(e,e)}appendRange(e,t){if(this.len>0){for(let r=2;r<=4;r+=2)if(this.len>=r){const s=this.r[this.len-r],i=this.r[this.len-r+1];if(e<=i+1&&s<=t+1)return e<s&&(this.r[this.len-r]=e),t>i&&(this.r[this.len-r+1]=t),this}}return this.r[this.len++]=e,this.r[this.len++]=t,this}appendFoldedRange(e,t){if(e<=Z.MIN_FOLD&&t>=Z.MAX_FOLD)return this.appendRange(e,t);if(t<Z.MIN_FOLD||e>Z.MAX_FOLD)return this.appendRange(e,t);e<Z.MIN_FOLD&&(this.appendRange(e,Z.MIN_FOLD-1),e=Z.MIN_FOLD),t>Z.MAX_FOLD&&(this.appendRange(Z.MAX_FOLD+1,t),t=Z.MAX_FOLD);for(let r=e;r<=t;r++){this.appendRange(r,r);for(let s=Z.simpleFold(r);s!==r;s=Z.simpleFold(s))this.appendRange(s,s)}return this}appendClass(e){for(let t=0;t<e.length;t+=2)this.appendRange(e[t],e[t+1]);return this}appendFoldedClass(e){for(let t=0;t<e.length;t+=2)this.appendFoldedRange(e[t],e[t+1]);return this}appendNegatedClass(e){let t=0;for(let r=0;r<e.length;r+=2){const s=e[r],i=e[r+1];t<=s-1&&this.appendRange(t,s-1),t=i+1}return t<=Z.MAX_RUNE&&this.appendRange(t,Z.MAX_RUNE),this}appendTable(e){for(let t of e){const r=t[0],s=t[1],i=t[2];if(i===1){this.appendRange(r,s);continue}for(let o=r;o<=s;o+=i)this.appendRange(o,o)}return this}appendNegatedTable(e){let t=0;for(let r of e){const s=r[0],i=r[1],o=r[2];if(o===1){t<=s-1&&this.appendRange(t,s-1),t=i+1;continue}for(let c=s;c<=i;c+=o)t<=c-1&&this.appendRange(t,c-1),t=c+1}return t<=Z.MAX_RUNE&&this.appendRange(t,Z.MAX_RUNE),this}appendTableWithSign(e,t){return t<0?this.appendNegatedTable(e):this.appendTable(e)}negateClass(){let e=0,t=0;for(let r=0;r<this.len;r+=2){const s=this.r[r],i=this.r[r+1];e<=s-1&&(this.r[t]=e,this.r[t+1]=s-1,t+=2),e=i+1}return this.len=t,e<=Z.MAX_RUNE&&(this.r[this.len++]=e,this.r[this.len++]=Z.MAX_RUNE),this}appendClassWithSign(e,t){return t<0?this.appendNegatedClass(e):this.appendClass(e)}appendGroup(e,t){let r=e.cls;return t&&(r=new Ye().appendFoldedClass(r).cleanClass().toArray()),this.appendClassWithSign(r,e.sign)}toString(){return Ye.charClassToString(this.r,this.len)}}class vs{static of(e,t){return new vs(e,t)}constructor(e,t){this.first=e,this.second=t}}class J0{constructor(e){this.str=e,this.position=0}pos(){return this.position}rewindTo(e){this.position=e}more(){return this.position<this.str.length}peek(){return this.str.codePointAt(this.position)}skip(e){this.position+=e}skipString(e){this.position+=e.length}pop(){const e=this.str.codePointAt(this.position);return this.position+=le.charCount(e),e}lookingAt(e){return this.rest().startsWith(e)}rest(){return this.str.substring(this.position)}from(e){return this.str.substring(e,this.position)}toString(){return this.rest()}}class Y{static ERR_INTERNAL_ERROR="regexp/syntax: internal error";static ERR_INVALID_CHAR_RANGE="invalid character class range";static ERR_INVALID_ESCAPE="invalid escape sequence";static ERR_INVALID_NAMED_CAPTURE="invalid named capture";static ERR_INVALID_PERL_OP="invalid or unsupported Perl syntax";static ERR_INVALID_REPEAT_OP="invalid nested repetition operator";static ERR_INVALID_REPEAT_SIZE="invalid repeat count";static ERR_MISSING_BRACKET="missing closing ]";static ERR_MISSING_PAREN="missing closing )";static ERR_MISSING_REPEAT_ARGUMENT="missing argument to repetition operator";static ERR_TRAILING_BACKSLASH="trailing backslash at end of expression";static ERR_DUPLICATE_NAMED_CAPTURE="duplicate capture group name";static ANY_TABLE(){return[[0,Z.MAX_RUNE,1]]}static unicodeTable(e){return e==="Any"?vs.of(Y.ANY_TABLE(),Y.ANY_TABLE()):y.CATEGORIES.has(e)?vs.of(y.CATEGORIES.get(e),y.FOLD_CATEGORIES.get(e)):y.SCRIPTS.has(e)?vs.of(y.SCRIPTS.get(e),y.FOLD_SCRIPT.get(e)):null}static minFoldRune(e){if(e<Z.MIN_FOLD||e>Z.MAX_FOLD)return e;let t=e;const r=e;for(e=Z.simpleFold(e);e!==r;e=Z.simpleFold(e))t>e&&(t=e);return t}static leadingRegexp(e){if(e.op===v.Op.EMPTY_MATCH)return null;if(e.op===v.Op.CONCAT&&e.subs.length>0){const t=e.subs[0];return t.op===v.Op.EMPTY_MATCH?null:t}return e}static literalRegexp(e,t){const r=new v(v.Op.LITERAL);return r.flags=t,r.runes=le.stringToRunes(e),r}static parse(e,t){return new Y(e,t).parseInternal()}static parseRepeat(e){const t=e.pos();if(!e.more()||!e.lookingAt("{"))return-1;e.skip(1);const r=Y.parseInt(e);if(r===-1||!e.more())return-1;let s;if(!e.lookingAt(","))s=r;else{if(e.skip(1),!e.more())return-1;if(e.lookingAt("}"))s=-1;else if((s=Y.parseInt(e))===-1)return-1}if(!e.more()||!e.lookingAt("}"))return-1;if(e.skip(1),r<0||r>1e3||s===-2||s>1e3||s>=0&&r>s)throw new Ae(Y.ERR_INVALID_REPEAT_SIZE,e.from(t));return r<<16|s&Z.MAX_BMP}static isValidCaptureName(e){if(e.length===0)return!1;for(let t=0;t<e.length;t++){const r=e.codePointAt(t);if(r!==N.CODES.get("_")&&!le.isalnum(r))return!1}return!0}static parseInt(e){const t=e.pos();for(;e.more()&&e.peek()>=N.CODES.get("0")&&e.peek()<=N.CODES.get("9");)e.skip(1);const r=e.from(t);return r.length===0||r.length>1&&r.codePointAt(0)===N.CODES.get("0")?-1:r.length>8?-2:parseFloat(r,10)}static isCharClass(e){return e.op===v.Op.LITERAL&&e.runes.length===1||e.op===v.Op.CHAR_CLASS||e.op===v.Op.ANY_CHAR_NOT_NL||e.op===v.Op.ANY_CHAR}static matchRune(e,t){switch(e.op){case v.Op.LITERAL:return e.runes.length===1&&e.runes[0]===t;case v.Op.CHAR_CLASS:for(let r=0;r<e.runes.length;r+=2)if(e.runes[r]<=t&&t<=e.runes[r+1])return!0;return!1;case v.Op.ANY_CHAR_NOT_NL:return t!==N.CODES.get(`
`);case v.Op.ANY_CHAR:return!0}return!1}static mergeCharClass(e,t){switch(e.op){case v.Op.ANY_CHAR:break;case v.Op.ANY_CHAR_NOT_NL:Y.matchRune(t,N.CODES.get(`
`))&&(e.op=v.Op.ANY_CHAR);break;case v.Op.CHAR_CLASS:t.op===v.Op.LITERAL?e.runes=new Ye(e.runes).appendLiteral(t.runes[0],t.flags).toArray():e.runes=new Ye(e.runes).appendClass(t.runes).toArray();break;case v.Op.LITERAL:if(t.runes[0]===e.runes[0]&&t.flags===e.flags)break;e.op=v.Op.CHAR_CLASS,e.runes=new Ye().appendLiteral(e.runes[0],e.flags).appendLiteral(t.runes[0],t.flags).toArray();break}}static parseEscape(e){const t=e.pos();if(e.skip(1),!e.more())throw new Ae(Y.ERR_TRAILING_BACKSLASH);let r=e.pop();e:switch(r){case N.CODES.get("1"):case N.CODES.get("2"):case N.CODES.get("3"):case N.CODES.get("4"):case N.CODES.get("5"):case N.CODES.get("6"):case N.CODES.get("7"):if(!e.more()||e.peek()<N.CODES.get("0")||e.peek()>N.CODES.get("7"))break;case N.CODES.get("0"):{let s=r-N.CODES.get("0");for(let i=1;i<3&&!(!e.more()||e.peek()<N.CODES.get("0")||e.peek()>N.CODES.get("7"));i++)s=s*8+e.peek()-N.CODES.get("0"),e.skip(1);return s}case N.CODES.get("x"):{if(!e.more())break;if(r=e.pop(),r===N.CODES.get("{")){let o=0,c=0;for(;;){if(!e.more())break e;if(r=e.pop(),r===N.CODES.get("}"))break;const u=le.unhex(r);if(u<0||(c=c*16+u,c>Z.MAX_RUNE))break e;o++}if(o===0)break e;return c}const s=le.unhex(r);if(!e.more())break;r=e.pop();const i=le.unhex(r);if(s<0||i<0)break;return s*16+i}case N.CODES.get("a"):return N.CODES.get("\x07");case N.CODES.get("f"):return N.CODES.get("\f");case N.CODES.get("n"):return N.CODES.get(`
`);case N.CODES.get("r"):return N.CODES.get("\r");case N.CODES.get("t"):return N.CODES.get("	");case N.CODES.get("v"):return N.CODES.get("\v");default:if(!le.isalnum(r))return r;break}throw new Ae(Y.ERR_INVALID_ESCAPE,e.from(t))}static parseClassChar(e,t){if(!e.more())throw new Ae(Y.ERR_MISSING_BRACKET,e.from(t));return e.lookingAt("\\")?Y.parseEscape(e):e.pop()}static concatRunes(e,t){return[...e,...t]}constructor(e,t=0){this.wholeRegexp=e,this.flags=t,this.numCap=0,this.namedGroups={},this.stack=[],this.free=null}newRegexp(e){let t=this.free;return t!==null&&t.subs!==null&&t.subs.length>0?(this.free=t.subs[0],t.reinit(),t.op=e):t=new v(e),t}reuse(e){e.subs!==null&&e.subs.length>0&&(e.subs[0]=this.free),this.free=e}pop(){return this.stack.pop()}popToPseudo(){const e=this.stack.length;let t=e;for(;t>0&&!v.isPseudoOp(this.stack[t-1].op);)t--;const r=this.stack.slice(t,e);return this.stack=this.stack.slice(0,t),r}push(e){if(e.op===v.Op.CHAR_CLASS&&e.runes.length===2&&e.runes[0]===e.runes[1]){if(this.maybeConcat(e.runes[0],this.flags&-2))return null;e.op=v.Op.LITERAL,e.runes=[e.runes[0]],e.flags=this.flags&-2}else if(e.op===v.Op.CHAR_CLASS&&e.runes.length===4&&e.runes[0]===e.runes[1]&&e.runes[2]===e.runes[3]&&Z.simpleFold(e.runes[0])===e.runes[2]&&Z.simpleFold(e.runes[2])===e.runes[0]||e.op===v.Op.CHAR_CLASS&&e.runes.length===2&&e.runes[0]+1===e.runes[1]&&Z.simpleFold(e.runes[0])===e.runes[1]&&Z.simpleFold(e.runes[1])===e.runes[0]){if(this.maybeConcat(e.runes[0],this.flags|B.FOLD_CASE))return null;e.op=v.Op.LITERAL,e.runes=[e.runes[0]],e.flags=this.flags|B.FOLD_CASE}else this.maybeConcat(-1,0);return this.stack.push(e),e}maybeConcat(e,t){const r=this.stack.length;if(r<2)return!1;const s=this.stack[r-1],i=this.stack[r-2];return s.op!==v.Op.LITERAL||i.op!==v.Op.LITERAL||(s.flags&B.FOLD_CASE)!==(i.flags&B.FOLD_CASE)?!1:(i.runes=Y.concatRunes(i.runes,s.runes),e>=0?(s.runes=[e],s.flags=t,!0):(this.pop(),this.reuse(s),!1))}newLiteral(e,t){const r=this.newRegexp(v.Op.LITERAL);return r.flags=t,(t&B.FOLD_CASE)!==0&&(e=Y.minFoldRune(e)),r.runes=[e],r}literal(e){this.push(this.newLiteral(e,this.flags))}op(e){const t=this.newRegexp(e);return t.flags=this.flags,this.push(t)}repeat(e,t,r,s,i,o){let c=this.flags;if((c&B.PERL_X)!==0&&(i.more()&&i.lookingAt("?")&&(i.skip(1),c^=B.NON_GREEDY),o!==-1))throw new Ae(Y.ERR_INVALID_REPEAT_OP,i.from(o));const u=this.stack.length;if(u===0)throw new Ae(Y.ERR_MISSING_REPEAT_ARGUMENT,i.from(s));const h=this.stack[u-1];if(v.isPseudoOp(h.op))throw new Ae(Y.ERR_MISSING_REPEAT_ARGUMENT,i.from(s));const f=this.newRegexp(e);f.min=t,f.max=r,f.flags=c,f.subs=[h],this.stack[u-1]=f}concat(){this.maybeConcat(-1,0);const e=this.popToPseudo();return e.length===0?this.push(this.newRegexp(v.Op.EMPTY_MATCH)):this.push(this.collapse(e,v.Op.CONCAT))}alternate(){const e=this.popToPseudo();return e.length>0&&this.cleanAlt(e[e.length-1]),e.length===0?this.push(this.newRegexp(v.Op.NO_MATCH)):this.push(this.collapse(e,v.Op.ALTERNATE))}cleanAlt(e){e.op===v.Op.CHAR_CLASS&&(e.runes=new Ye(e.runes).cleanClass().toArray(),e.runes.length===2&&e.runes[0]===0&&e.runes[1]===Z.MAX_RUNE?(e.runes=null,e.op=v.Op.ANY_CHAR):e.runes.length===4&&e.runes[0]===0&&e.runes[1]===N.CODES.get(`
`)-1&&e.runes[2]===N.CODES.get(`
`)+1&&e.runes[3]===Z.MAX_RUNE&&(e.runes=null,e.op=v.Op.ANY_CHAR_NOT_NL))}collapse(e,t){if(e.length===1)return e[0];let r=0;for(let c of e)r+=c.op===t?c.subs.length:1;let s=new Array(r).fill(null),i=0;for(let c of e)c.op===t?(s.splice(i,c.subs.length,...c.subs),i+=c.subs.length,this.reuse(c)):s[i++]=c;let o=this.newRegexp(t);if(o.subs=s,t===v.Op.ALTERNATE&&(o.subs=this.factor(o.subs),o.subs.length===1)){const c=o;o=o.subs[0],this.reuse(c)}return o}factor(e){if(e.length<2)return e;let t=0,r=e.length,s=0,i=null,o=0,c=0,u=0;for(let f=0;f<=r;f++){let p=null,w=0,b=0;if(f<r){let P=e[t+f];if(P.op===v.Op.CONCAT&&P.subs.length>0&&(P=P.subs[0]),P.op===v.Op.LITERAL&&(p=P.runes,w=P.runes.length,b=P.flags&B.FOLD_CASE),b===c){let L=0;for(;L<o&&L<w&&i[L]===p[L];)L++;if(L>0){o=L;continue}}}if(f!==u)if(f===u+1)e[s++]=e[t+u];else{const P=this.newRegexp(v.Op.LITERAL);P.flags=c,P.runes=i.slice(0,o);for(let z=u;z<f;z++)e[t+z]=this.removeLeadingString(e[t+z],o);const L=this.collapse(e.slice(t+u,t+f),v.Op.ALTERNATE),x=this.newRegexp(v.Op.CONCAT);x.subs=[P,L],e[s++]=x}u=f,i=p,o=w,c=b}r=s,t=0,u=0,s=0;let h=null;for(let f=0;f<=r;f++){let p=null;if(!(f<r&&(p=Y.leadingRegexp(e[t+f]),h!==null&&h.equals(p)&&(Y.isCharClass(h)||h.op===v.Op.REPEAT&&h.min===h.max&&Y.isCharClass(h.subs[0]))))){if(f!==u)if(f===u+1)e[s++]=e[t+u];else{const w=h;for(let L=u;L<f;L++){const x=L!==u;e[t+L]=this.removeLeadingRegexp(e[t+L],x)}const b=this.collapse(e.slice(t+u,t+f),v.Op.ALTERNATE),P=this.newRegexp(v.Op.CONCAT);P.subs=[w,b],e[s++]=P}u=f,h=p}}r=s,t=0,u=0,s=0;for(let f=0;f<=r;f++)if(!(f<r&&Y.isCharClass(e[t+f]))){if(f!==u)if(f===u+1)e[s++]=e[t+u];else{let p=u;for(let b=u+1;b<f;b++){const P=e[t+p],L=e[t+b];(P.op<L.op||P.op===L.op&&(P.runes!==null?P.runes.length:0)<(L.runes!==null?L.runes.length:0))&&(p=b)}const w=e[t+u];e[t+u]=e[t+p],e[t+p]=w;for(let b=u+1;b<f;b++)Y.mergeCharClass(e[t+u],e[t+b]),this.reuse(e[t+b]);this.cleanAlt(e[t+u]),e[s++]=e[t+u]}f<r&&(e[s++]=e[t+f]),u=f+1}r=s,t=0,u=0,s=0;for(let f=0;f<r;++f)f+1<r&&e[t+f].op===v.Op.EMPTY_MATCH&&e[t+f+1].op===v.Op.EMPTY_MATCH||(e[s++]=e[t+f]);return r=s,t=0,e.slice(t,r)}removeLeadingString(e,t){if(e.op===v.Op.CONCAT&&e.subs.length>0){const r=this.removeLeadingString(e.subs[0],t);if(e.subs[0]=r,r.op===v.Op.EMPTY_MATCH)switch(this.reuse(r),e.subs.length){case 0:case 1:e.op=v.Op.EMPTY_MATCH,e.subs=null;break;case 2:{const s=e;e=e.subs[1],this.reuse(s);break}default:e.subs=e.subs.slice(1,e.subs.length);break}return e}return e.op===v.Op.LITERAL&&(e.runes=e.runes.slice(t,e.runes.length),e.runes.length===0&&(e.op=v.Op.EMPTY_MATCH)),e}removeLeadingRegexp(e,t){if(e.op===v.Op.CONCAT&&e.subs.length>0){switch(t&&this.reuse(e.subs[0]),e.subs=e.subs.slice(1,e.subs.length),e.subs.length){case 0:{e.op=v.Op.EMPTY_MATCH,e.subs=v.emptySubs();break}case 1:{const r=e;e=e.subs[0],this.reuse(r);break}}return e}return t&&this.reuse(e),this.newRegexp(v.Op.EMPTY_MATCH)}parseInternal(){if((this.flags&B.LITERAL)!==0)return Y.literalRegexp(this.wholeRegexp,this.flags);let e=-1,t=-1,r=-1;const s=new J0(this.wholeRegexp);for(;s.more();){let o=-1;e:switch(s.peek()){case N.CODES.get("("):if((this.flags&B.PERL_X)!==0&&s.lookingAt("(?")){this.parsePerlFlags(s);break}this.op(v.Op.LEFT_PAREN).cap=++this.numCap,s.skip(1);break;case N.CODES.get("|"):this.parseVerticalBar(),s.skip(1);break;case N.CODES.get(")"):this.parseRightParen(),s.skip(1);break;case N.CODES.get("^"):(this.flags&B.ONE_LINE)!==0?this.op(v.Op.BEGIN_TEXT):this.op(v.Op.BEGIN_LINE),s.skip(1);break;case N.CODES.get("$"):(this.flags&B.ONE_LINE)!==0?this.op(v.Op.END_TEXT).flags|=B.WAS_DOLLAR:this.op(v.Op.END_LINE),s.skip(1);break;case N.CODES.get("."):(this.flags&B.DOT_NL)!==0?this.op(v.Op.ANY_CHAR):this.op(v.Op.ANY_CHAR_NOT_NL),s.skip(1);break;case N.CODES.get("["):this.parseClass(s);break;case N.CODES.get("*"):case N.CODES.get("+"):case N.CODES.get("?"):{o=s.pos();let c=null;switch(s.pop()){case N.CODES.get("*"):c=v.Op.STAR;break;case N.CODES.get("+"):c=v.Op.PLUS;break;case N.CODES.get("?"):c=v.Op.QUEST;break}this.repeat(c,t,r,o,s,e);break}case N.CODES.get("{"):{o=s.pos();const c=Y.parseRepeat(s);if(c<0){s.rewindTo(o),this.literal(s.pop());break}t=c>>16,r=(c&Z.MAX_BMP)<<16>>16,this.repeat(v.Op.REPEAT,t,r,o,s,e);break}case N.CODES.get("\\"):{const c=s.pos();if(s.skip(1),(this.flags&B.PERL_X)!==0&&s.more())switch(s.pop()){case N.CODES.get("A"):this.op(v.Op.BEGIN_TEXT);break e;case N.CODES.get("b"):this.op(v.Op.WORD_BOUNDARY);break e;case N.CODES.get("B"):this.op(v.Op.NO_WORD_BOUNDARY);break e;case N.CODES.get("C"):throw new Ae(Y.ERR_INVALID_ESCAPE,"\\C");case N.CODES.get("Q"):{let p=s.rest();const w=p.indexOf("\\E");w>=0&&(p=p.substring(0,w)),s.skipString(p),s.skipString("\\E");let b=0;for(;b<p.length;){const P=p.codePointAt(b);this.literal(P),b+=le.charCount(P)}break e}case N.CODES.get("z"):this.op(v.Op.END_TEXT);break e;default:s.rewindTo(c);break}const u=this.newRegexp(v.Op.CHAR_CLASS);if(u.flags=this.flags,s.lookingAt("\\p")||s.lookingAt("\\P")){const f=new Ye;if(this.parseUnicodeClass(s,f)){u.runes=f.toArray(),this.push(u);break e}}const h=new Ye;if(this.parsePerlClassEscape(s,h)){u.runes=h.toArray(),this.push(u);break e}s.rewindTo(c),this.reuse(u),this.literal(Y.parseEscape(s));break}default:this.literal(s.pop());break}e=o}if(this.concat(),this.swapVerticalBar()&&this.pop(),this.alternate(),this.stack.length!==1)throw new Ae(Y.ERR_MISSING_PAREN,this.wholeRegexp);return this.stack[0].namedGroups=this.namedGroups,this.stack[0]}parsePerlFlags(e){const t=e.pos(),r=e.rest();if(r.startsWith("(?P<")||r.startsWith("(?<")){const c=r.charAt(2)==="P"?4:3,u=r.indexOf(">");if(u<0)throw new Ae(Y.ERR_INVALID_NAMED_CAPTURE,r);const h=r.substring(c,u);if(e.skipString(h),e.skip(c+1),!Y.isValidCaptureName(h))throw new Ae(Y.ERR_INVALID_NAMED_CAPTURE,r.substring(0,u+1));const f=this.op(v.Op.LEFT_PAREN);if(f.cap=++this.numCap,this.namedGroups[h])throw new Ae(Y.ERR_DUPLICATE_NAMED_CAPTURE,h);this.namedGroups[h]=this.numCap,f.name=h;return}e.skip(2);let s=this.flags,i=1,o=!1;e:for(;e.more();){const c=e.pop();switch(c){case N.CODES.get("i"):s|=B.FOLD_CASE,o=!0;break;case N.CODES.get("m"):s&=-17,o=!0;break;case N.CODES.get("s"):s|=B.DOT_NL,o=!0;break;case N.CODES.get("U"):s|=B.NON_GREEDY,o=!0;break;case N.CODES.get("-"):if(i<0)break e;i=-1,s=~s,o=!1;break;case N.CODES.get(":"):case N.CODES.get(")"):if(i<0){if(!o)break e;s=~s}c===N.CODES.get(":")&&this.op(v.Op.LEFT_PAREN),this.flags=s;return;default:break e}}throw new Ae(Y.ERR_INVALID_PERL_OP,e.from(t))}parseVerticalBar(){this.concat(),this.swapVerticalBar()||this.op(v.Op.VERTICAL_BAR)}swapVerticalBar(){const e=this.stack.length;if(e>=3&&this.stack[e-2].op===v.Op.VERTICAL_BAR&&Y.isCharClass(this.stack[e-1])&&Y.isCharClass(this.stack[e-3])){let t=this.stack[e-1],r=this.stack[e-3];if(t.op>r.op){const s=r;r=t,t=s,this.stack[e-3]=r}return Y.mergeCharClass(r,t),this.reuse(t),this.pop(),!0}if(e>=2){const t=this.stack[e-1],r=this.stack[e-2];if(r.op===v.Op.VERTICAL_BAR)return e>=3&&this.cleanAlt(this.stack[e-3]),this.stack[e-2]=t,this.stack[e-1]=r,!0}return!1}parseRightParen(){if(this.concat(),this.swapVerticalBar()&&this.pop(),this.alternate(),this.stack.length<2)throw new Ae(Y.ERR_INTERNAL_ERROR,"stack underflow");const t=this.pop(),r=this.pop();if(r.op!==v.Op.LEFT_PAREN)throw new Ae(Y.ERR_MISSING_PAREN,this.wholeRegexp);this.flags=r.flags,r.cap===0?this.push(t):(r.op=v.Op.CAPTURE,r.subs=[t],this.push(r))}parsePerlClassEscape(e,t){const r=e.pos();if((this.flags&B.PERL_X)===0||!e.more()||e.pop()!==N.CODES.get("\\")||!e.more())return!1;e.pop();const s=e.from(r),i=hl.has(s)?hl.get(s):null;return i===null?!1:(t.appendGroup(i,(this.flags&B.FOLD_CASE)!==0),!0)}parseNamedClass(e,t){const r=e.rest(),s=r.indexOf(":]");if(s<0)return!1;const i=r.substring(0,s+2);e.skipString(i);const o=Cl.has(i)?Cl.get(i):null;if(o===null)throw new Ae(Y.ERR_INVALID_CHAR_RANGE,i);return t.appendGroup(o,(this.flags&B.FOLD_CASE)!==0),!0}parseUnicodeClass(e,t){const r=e.pos();if((this.flags&B.UNICODE_GROUPS)===0||!e.lookingAt("\\p")&&!e.lookingAt("\\P"))return!1;e.skip(1);let s=1,i=e.pop();if(i===N.CODES.get("P")&&(s=-1),!e.more())throw e.rewindTo(r),new Ae(Y.ERR_INVALID_CHAR_RANGE,e.rest());i=e.pop();let o;if(i!==N.CODES.get("{"))o=le.runeToString(i);else{const f=e.rest(),p=f.indexOf("}");if(p<0)throw e.rewindTo(r),new Ae(Y.ERR_INVALID_CHAR_RANGE,e.rest());o=f.substring(0,p),e.skipString(o),e.skip(1)}o.length!==0&&o.codePointAt(0)===N.CODES.get("^")&&(s=0-s,o=o.substring(1));const c=Y.unicodeTable(o);if(c===null)throw new Ae(Y.ERR_INVALID_CHAR_RANGE,e.from(r));const u=c.first,h=c.second;if((this.flags&B.FOLD_CASE)===0||h===null)t.appendTableWithSign(u,s);else{const f=new Ye().appendTable(u).appendTable(h).cleanClass().toArray();t.appendClassWithSign(f,s)}return!0}parseClass(e){const t=e.pos();e.skip(1);const r=this.newRegexp(v.Op.CHAR_CLASS);r.flags=this.flags;const s=new Ye;let i=1;e.more()&&e.lookingAt("^")&&(i=-1,e.skip(1),(this.flags&B.CLASS_NL)===0&&s.appendRange(N.CODES.get(`
`),N.CODES.get(`
`)));let o=!0;for(;!e.more()||e.peek()!==N.CODES.get("]")||o;){if(e.more()&&e.lookingAt("-")&&(this.flags&B.PERL_X)===0&&!o){const f=e.rest();if(f==="-"||!f.startsWith("-]"))throw e.rewindTo(t),new Ae(Y.ERR_INVALID_CHAR_RANGE,e.rest())}o=!1;const c=e.pos();if(e.lookingAt("[:")){if(this.parseNamedClass(e,s))continue;e.rewindTo(c)}if(this.parseUnicodeClass(e,s)||this.parsePerlClassEscape(e,s))continue;e.rewindTo(c);const u=Y.parseClassChar(e,t);let h=u;if(e.more()&&e.lookingAt("-")){if(e.skip(1),e.more()&&e.lookingAt("]"))e.skip(-1);else if(h=Y.parseClassChar(e,t),h<u)throw new Ae(Y.ERR_INVALID_CHAR_RANGE,e.from(c))}(this.flags&B.FOLD_CASE)===0?s.appendRange(u,h):s.appendFoldedRange(u,h)}e.skip(1),s.cleanClass(),i<0&&s.negateClass(),r.runes=s.toArray(),this.push(r)}}class Z0{constructor(){this.inst=null,this.cap=[]}}class Sl{constructor(){this.sparse=[],this.densePcs=[],this.denseThreads=[],this.size=0}contains(e){const t=this.sparse[e];return t<this.size&&this.densePcs[t]===e}isEmpty(){return this.size===0}add(e){const t=this.size++;return this.sparse[e]=t,this.denseThreads[t]=null,this.densePcs[t]=e,t}clear(){this.sparse=[],this.densePcs=[],this.denseThreads=[],this.size=0}toString(){let e="{";for(let t=0;t<this.size;t++)t!==0&&(e+=", "),e+=this.densePcs[t];return e+="}",e}}class vr{static fromRE2(e){const t=new vr;return t.prog=e.prog,t.re2=e,t.q0=new Sl(t.prog.numInst()),t.q1=new Sl(t.prog.numInst()),t.pool=[],t.poolSize=0,t.matched=!1,t.matchcap=Array(t.prog.numCap<2?2:t.prog.numCap).fill(0),t.ncap=0,t}static fromMachine(e){const t=new vr;return t.re2=e.re2,t.prog=e.prog,t.q0=e.q0,t.q1=e.q1,t.pool=e.pool,t.poolSize=e.poolSize,t.matched=e.matched,t.matchcap=e.matchcap,t.ncap=e.ncap,t}init(e){this.ncap=e,e>this.matchcap.length?this.initNewCap(e):this.resetCap(e)}resetCap(e){for(let t=0;t<this.poolSize;t++){const r=this.pool[t];r.cap=Array(e).fill(0)}}initNewCap(e){for(let t=0;t<this.poolSize;t++){const r=this.pool[t];r.cap=Array(e).fill(0)}this.matchcap=Array(e).fill(0)}submatches(){return this.ncap===0?le.emptyInts():this.matchcap.slice(0,this.ncap)}alloc(e){let t;return this.poolSize>0?(this.poolSize--,t=this.pool[this.poolSize]):t=new Z0,t.inst=e,t}freeQueue(e,t=0){const r=e.size-t,s=this.poolSize+r;this.pool.length<s&&(this.pool=this.pool.slice(0,Math.max(this.pool.length*2,s)));for(let i=t;i<e.size;i++){const o=e.denseThreads[i];o!==null&&(this.pool[this.poolSize]=o,this.poolSize++)}e.clear()}freeThread(e){this.pool.length<=this.poolSize&&(this.pool=this.pool.slice(0,this.pool.length*2)),this.pool[this.poolSize]=e,this.poolSize++}match(e,t,r){const s=this.re2.cond;if(s===le.EMPTY_ALL||(r===B.ANCHOR_START||r===B.ANCHOR_BOTH)&&t!==0)return!1;this.matched=!1,this.matchcap=Array(this.prog.numCap).fill(-1);let i=this.q0,o=this.q1,c=e.step(t),u=c>>3,h=c&7,f=-1,p=0;c!==In.EOF()&&(c=e.step(t+h),f=c>>3,p=c&7);let w;for(t===0?w=le.emptyOpContext(-1,u):w=e.context(t);;){if(i.isEmpty()){if((s&le.EMPTY_BEGIN_TEXT)!==0&&t!==0||this.matched)break;if(this.re2.prefix.length!==0&&f!==this.re2.prefixRune&&e.canCheckPrefix()){const L=e.index(this.re2,t);if(L<0)break;t+=L,c=e.step(t),u=c>>3,h=c&7,c=e.step(t+h),f=c>>3,p=c&7}}!this.matched&&(t===0||r===B.UNANCHORED)&&(this.ncap>0&&(this.matchcap[0]=t),this.add(i,this.prog.start,t,this.matchcap,w,null));const b=t+h;if(w=e.context(b),this.step(i,o,t,b,u,w,r,t===e.endPos()),h===0||this.ncap===0&&this.matched)break;t+=h,u=f,h=p,u!==-1&&(c=e.step(t+h),f=c>>3,p=c&7);const P=i;i=o,o=P}return this.freeQueue(o),this.matched}step(e,t,r,s,i,o,c,u){const h=this.re2.longest;for(let f=0;f<e.size;f++){let p=e.denseThreads[f];if(p===null)continue;if(h&&this.matched&&this.ncap>0&&this.matchcap[0]<p.cap[0]){this.freeThread(p);continue}const w=p.inst;let b=!1;switch(w.op){case G.MATCH:if(c===B.ANCHOR_BOTH&&!u)break;this.ncap>0&&(!h||!this.matched||this.matchcap[1]<r)&&(p.cap[1]=r,this.matchcap=p.cap.slice(0,this.ncap)),h||this.freeQueue(e,f+1),this.matched=!0;break;case G.RUNE:b=w.matchRune(i);break;case G.RUNE1:b=i===w.runes[0];break;case G.RUNE_ANY:b=!0;break;case G.RUNE_ANY_NOT_NL:b=i!==N.CODES.get(`
`);break;default:throw new Error("bad inst")}b&&(p=this.add(t,w.out,s,p.cap,o,p)),p!==null&&(this.freeThread(p),e.denseThreads[f]=null)}e.clear()}add(e,t,r,s,i,o){if(t===0||e.contains(t))return o;const c=e.add(t),u=this.prog.inst[t];switch(u.op){case G.FAIL:break;case G.ALT:case G.ALT_MATCH:o=this.add(e,u.out,r,s,i,o),o=this.add(e,u.arg,r,s,i,o);break;case G.EMPTY_WIDTH:(u.arg&~i)===0&&(o=this.add(e,u.out,r,s,i,o));break;case G.NOP:o=this.add(e,u.out,r,s,i,o);break;case G.CAPTURE:if(u.arg<this.ncap){const h=s[u.arg];s[u.arg]=r,this.add(e,u.out,r,s,i,null),s[u.arg]=h}else o=this.add(e,u.out,r,s,i,o);break;case G.MATCH:case G.RUNE:case G.RUNE1:case G.RUNE_ANY:case G.RUNE_ANY_NOT_NL:o===null?o=this.alloc(u):o.inst=u,this.ncap>0&&o.cap!==s&&(o.cap=s.slice(0,this.ncap)),e.denseThreads[c]=o,o=null;break;default:throw new Error("unhandled")}return o}}class e7{constructor(e){this.value=e}get(){return this.value}set(e){this.value=e}compareAndSet(e,t){return this.value===e?(this.value=t,!0):!1}}class yn{static initTest(e){const t=yn.compile(e),r=new yn(t.expr,t.prog,t.numSubexp,t.longest);return r.cond=t.cond,r.prefix=t.prefix,r.prefixUTF8=t.prefixUTF8,r.prefixComplete=t.prefixComplete,r.prefixRune=t.prefixRune,r}static compile(e){return yn.compileImpl(e,B.PERL,!1)}static compilePOSIX(e){return yn.compileImpl(e,B.POSIX,!0)}static compileImpl(e,t,r){let s=Y.parse(e,t);const i=s.maxCap();s=Nt.simplify(s);const o=Rs.compileRegexp(s),c=new yn(e,o,i,r),[u,h]=o.prefix();return c.prefixComplete=u,c.prefix=h,c.prefixUTF8=le.stringToUtf8ByteArray(c.prefix),c.prefix.length>0&&(c.prefixRune=c.prefix.codePointAt(0)),c.namedGroups=s.namedGroups,c}static match(e,t){return yn.compile(e).match(t)}constructor(e,t,r=0,s=0){this.expr=e,this.prog=t,this.numSubexp=r,this.longest=s,this.cond=t.startCond(),this.prefix=null,this.prefixUTF8=null,this.prefixComplete=!1,this.prefixRune=0,this.pooled=new e7}numberOfCapturingGroups(){return this.numSubexp}get(){let e;do e=this.pooled.get();while(e&&!this.pooled.compareAndSet(e,e.next));return e}reset(){this.pooled.set(null)}put(e,t){let r=this.pooled.get();do r=this.pooled.get(),!t&&r&&(e=vr.fromMachine(e),t=!0),e.next!==r&&(e.next=r);while(!this.pooled.compareAndSet(r,e))}toString(){return this.expr}doExecute(e,t,r,s){let i=this.get(),o=!1;i?i.next!==null&&(i=vr.fromMachine(i),o=!0):(i=vr.fromRE2(this),o=!0),i.init(s);const c=i.match(e,t,r)?i.submatches():null;return this.put(i,o),c}match(e){return this.doExecute(Re.fromUTF16(e),0,B.UNANCHORED,0)!==null}matchWithGroup(e,t,r,s,i){return e instanceof on||(e=oo.utf16(e)),this.matchMachineInput(e,t,r,s,i)}matchMachineInput(e,t,r,s,i){if(t>r)return[!1,null];const o=e.isUTF16Encoding()?Re.fromUTF16(e.asCharSequence(),0,r):Re.fromUTF8(e.asBytes(),0,r),c=this.doExecute(o,t,s,2*i);return c===null?[!1,null]:[!0,c]}matchUTF8(e){return this.doExecute(Re.fromUTF8(e),0,B.UNANCHORED,0)!==null}replaceAll(e,t){return this.replaceAllFunc(e,()=>t,2*e.length+1)}replaceFirst(e,t){return this.replaceAllFunc(e,()=>t,1)}replaceAllFunc(e,t,r){let s=0,i=0,o="";const c=Re.fromUTF16(e);let u=0;for(;i<=e.length;){const h=this.doExecute(c,i,B.UNANCHORED,2);if(h===null||h.length===0)break;o+=e.substring(s,h[0]),(h[1]>s||h[0]===0)&&(o+=t(e.substring(h[0],h[1])),u++),s=h[1];const f=c.step(i)&7;if(i+f>h[1]?i+=f:i+1>h[1]?i++:i=h[1],u>=r)break}return o+=e.substring(s),o}pad(e){if(e===null)return null;let t=(1+this.numSubexp)*2;if(e.length<t){let r=new Array(t).fill(-1);for(let s=0;s<e.length;s++)r[s]=e[s];e=r}return e}allMatches(e,t,r=s=>s){let s=[];const i=e.endPos();t<0&&(t=i+1);let o=0,c=0,u=-1;for(;c<t&&o<=i;){const h=this.doExecute(e,o,B.UNANCHORED,this.prog.numCap);if(h===null||h.length===0)break;let f=!0;if(h[1]===o){h[0]===u&&(f=!1);const p=e.step(o);p<0?o=i+1:o+=p&7}else o=h[1];u=h[1],f&&(s.push(r(this.pad(h))),c++)}return s}findUTF8(e){const t=this.doExecute(Re.fromUTF8(e),0,B.UNANCHORED,2);return t===null?null:e.slice(t[0],t[1])}findUTF8Index(e){const t=this.doExecute(Re.fromUTF8(e),0,B.UNANCHORED,2);return t===null?null:t.slice(0,2)}find(e){const t=this.doExecute(Re.fromUTF16(e),0,B.UNANCHORED,2);return t===null?"":e.substring(t[0],t[1])}findIndex(e){return this.doExecute(Re.fromUTF16(e),0,B.UNANCHORED,2)}findUTF8Submatch(e){const t=this.doExecute(Re.fromUTF8(e),0,B.UNANCHORED,this.prog.numCap);if(t===null)return null;const r=new Array(1+this.numSubexp).fill(null);for(let s=0;s<r.length;s++)2*s<t.length&&t[2*s]>=0&&(r[s]=e.slice(t[2*s],t[2*s+1]));return r}findUTF8SubmatchIndex(e){return this.pad(this.doExecute(Re.fromUTF8(e),0,B.UNANCHORED,this.prog.numCap))}findSubmatch(e){const t=this.doExecute(Re.fromUTF16(e),0,B.UNANCHORED,this.prog.numCap);if(t===null)return null;const r=new Array(1+this.numSubexp).fill(null);for(let s=0;s<r.length;s++)2*s<t.length&&t[2*s]>=0&&(r[s]=e.substring(t[2*s],t[2*s+1]));return r}findSubmatchIndex(e){return this.pad(this.doExecute(Re.fromUTF16(e),0,B.UNANCHORED,this.prog.numCap))}findAllUTF8(e,t){const r=this.allMatches(Re.fromUTF8(e),t,s=>e.slice(s[0],s[1]));return r.length===0?null:r}findAllUTF8Index(e,t){const r=this.allMatches(Re.fromUTF8(e),t,s=>s.slice(0,2));return r.length===0?null:r}findAll(e,t){const r=this.allMatches(Re.fromUTF16(e),t,s=>e.substring(s[0],s[1]));return r.length===0?null:r}findAllIndex(e,t){const r=this.allMatches(Re.fromUTF16(e),t,s=>s.slice(0,2));return r.length===0?null:r}findAllUTF8Submatch(e,t){const r=this.allMatches(Re.fromUTF8(e),t,s=>{let i=new Array(s.length/2|0).fill(null);for(let o=0;o<i.length;o++)s[2*o]>=0&&(i[o]=e.slice(s[2*o],s[2*o+1]));return i});return r.length===0?null:r}findAllUTF8SubmatchIndex(e,t){const r=this.allMatches(Re.fromUTF8(e),t);return r.length===0?null:r}findAllSubmatch(e,t){const r=this.allMatches(Re.fromUTF16(e),t,s=>{let i=new Array(s.length/2|0).fill(null);for(let o=0;o<i.length;o++)s[2*o]>=0&&(i[o]=e.substring(s[2*o],s[2*o+1]));return i});return r.length===0?null:r}findAllSubmatchIndex(e,t){const r=this.allMatches(Re.fromUTF16(e),t);return r.length===0?null:r}}class It{static CASE_INSENSITIVE=1;static DOTALL=2;static MULTILINE=4;static DISABLE_UNICODE_GROUPS=8;static LONGEST_MATCH=16;static quote(e){return le.quoteMeta(e)}static compile(e,t=0){let r=e;if((t&It.CASE_INSENSITIVE)!==0&&(r=`(?i)${r}`),(t&It.DOTALL)!==0&&(r=`(?s)${r}`),(t&It.MULTILINE)!==0&&(r=`(?m)${r}`),(t&-32)!==0)throw new z0("Flags should only be a combination of MULTILINE, DOTALL, CASE_INSENSITIVE, DISABLE_UNICODE_GROUPS, LONGEST_MATCH");let s=B.PERL;(t&It.DISABLE_UNICODE_GROUPS)!==0&&(s&=-129);const i=new It(e,t);return i.re2Input=yn.compileImpl(r,s,(t&It.LONGEST_MATCH)!==0),i}static matches(e,t){return It.compile(e).matcher(t).matches()}static initTest(e,t,r){if(e==null)throw new Error("pattern is null");if(r==null)throw new Error("re2 is null");const s=new It(e,t);return s.re2Input=r,s}constructor(e,t){this.patternInput=e,this.flagsInput=t}reset(){this.re2Input.reset()}flags(){return this.flagsInput}pattern(){return this.patternInput}re2(){return this.re2Input}matches(e){return this.matcher(e).matches()}matcher(e){return Array.isArray(e)&&(e=oo.utf8(e)),new K0(this,e)}split(e,t=0){const r=this.matcher(e),s=[];let i=0,o=0;for(;r.find();){if(o===0&&r.end()===0){o=r.end();continue}if(t>0&&s.length===t-1)break;if(o===r.start()){if(t===0){i+=1,o=r.end();continue}}else for(;i>0;)s.push(""),i-=1;s.push(r.substring(o,r.start())),o=r.end()}if(t===0&&o!==r.inputLength()){for(;i>0;)s.push(""),i-=1;s.push(r.substring(o,r.inputLength()))}return(t!==0||s.length===0)&&s.push(r.substring(o,r.inputLength())),s}toString(){return this.patternInput}groupCount(){return this.re2Input.numberOfCapturingGroups()}namedGroups(){return this.re2Input.namedGroups}equals(e){return this===e?!0:e===null||this.constructor!==e.constructor?!1:this.flagsInput===e.flagsInput&&this.patternInput===e.patternInput}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qe{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Qe.UNAUTHENTICATED=new Qe(null),Qe.GOOGLE_CREDENTIALS=new Qe("google-credentials-uid"),Qe.FIRST_PARTY=new Qe("first-party-uid"),Qe.MOCK_USER=new Qe("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Br="12.15.0";function t7(n){Br=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ur=new Oc("@firebase/firestore");function wr(){return ur.logLevel}function H(n,...e){if(ur.logLevel<=oe.DEBUG){const t=e.map(Vc);ur.debug(`Firestore (${Br}): ${n}`,...t)}}function an(n,...e){if(ur.logLevel<=oe.ERROR){const t=e.map(Vc);ur.error(`Firestore (${Br}): ${n}`,...t)}}function kt(n,...e){if(ur.logLevel<=oe.WARN){const t=e.map(Vc);ur.warn(`Firestore (${Br}): ${n}`,...t)}}function Vc(n){if(typeof n=="string")return n;try{return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function W(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,E2(n,r,t)}function E2(n,e,t){let r=`FIRESTORE (${Br}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw an(r),new Error(r)}function q(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||E2(e,s,r)}function X(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class U extends Kt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nn{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y2{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class n7{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Qe.UNAUTHENTICATED)))}shutdown(){}}class r7{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class s7{constructor(e){this.t=e,this.currentUser=Qe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){q(this.o===void 0,42304);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new nn;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new nn,e.enqueueRetryable((()=>s(this.currentUser)))};const o=()=>{const u=i;e.enqueueRetryable((async()=>{await u.promise,await s(this.currentUser)}))},c=u=>{H("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((u=>c(u))),setTimeout((()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(H("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new nn)}}),0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(H("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(q(typeof r.accessToken=="string",31837,{l:r}),new y2(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return q(e===null||typeof e=="string",2055,{h:e}),new Qe(e)}}class i7{constructor(e,t,r){this.T=e,this.P=t,this.R=r,this.type="FirstParty",this.user=Qe.FIRST_PARTY,this.I=new Map}A(){return this.R?this.R():null}get headers(){this.I.set("X-Goog-AuthUser",this.T);const e=this.A();return e&&this.I.set("Authorization",e),this.P&&this.I.set("X-Goog-Iam-Authorization-Token",this.P),this.I}}class o7{constructor(e,t,r){this.T=e,this.P=t,this.R=r}getToken(){return Promise.resolve(new i7(this.T,this.P,this.R))}start(e,t){e.enqueueRetryable((()=>t(Qe.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Pl{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class a7{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Pe(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){q(this.o===void 0,3512);const r=i=>{i.error!=null&&H("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,H("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>r(i)))};const s=i=>{H("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):H("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Pl(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(q(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Pl(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function c7(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lc{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=c7(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function ie(n,e){return n<e?-1:n>e?1:0}function lc(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return ja(s)===ja(i)?ie(s,i):ja(s)?1:-1}return ie(n.length,e.length)}const u7=55296,l7=57343;function ja(n){const e=n.charCodeAt(0);return e>=u7&&e<=l7}function kr(n,e,t){return n.length===e.length&&n.every(((r,s)=>t(r,e[s])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mt="__name__";class xt{constructor(e,t,r){t===void 0?t=0:t>e.length&&W(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&W(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return xt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof xt?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=xt.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return ie(e.length,t.length)}static compareSegments(e,t){const r=xt.isNumericId(e),s=xt.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?xt.extractNumericId(e).compare(xt.extractNumericId(t)):lc(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Sn.fromString(e.substring(4,e.length-2))}}class de extends xt{construct(e,t,r){return new de(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toStringWithLeadingSlash(){return`/${this.canonicalString()}`}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new U(D.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((s=>s.length>0)))}return new de(t)}static emptyPath(){return new de([])}}const h7=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Me extends xt{construct(e,t,r){return new Me(e,t,r)}static isValidIdentifier(e){return h7.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Me.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Mt}static keyField(){return new Me([Mt])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new U(D.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new U(D.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new U(D.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(r+=c,s++):(i(),s++)}if(i(),o)throw new U(D.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Me(t)}static emptyPath(){return new Me([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(e){this.path=e}static fromPath(e){return new j(de.fromString(e))}static fromName(e){return new j(de.fromString(e).popFirst(5))}static empty(){return new j(de.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&de.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return de.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new j(new de(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function w2(n,e,t){if(!t)throw new U(D.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function d7(n,e,t,r){if(e===!0&&r===!0)throw new U(D.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function bl(n){if(!j.isDocumentKey(n))throw new U(D.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Nl(n){if(j.isDocumentKey(n))throw new U(D.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function oi(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function ko(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":W(12329,{type:typeof n})}function Je(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new U(D.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=ko(n);throw new U(D.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ne(n,e){const t={typeString:n};return e&&(t.value=e),t}function ai(n,e){if(!oi(n))throw new U(D.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const o=n[r];if(s&&typeof o!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new U(D.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ol=-62135596800,kl=1e6;class me{static now(){return me.fromMillis(Date.now())}static fromDate(e){return me.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*kl);return new me(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new U(D.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new U(D.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Ol)throw new U(D.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new U(D.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/kl}_compareTo(e){return this.seconds===e.seconds?ie(this.nanoseconds,e.nanoseconds):ie(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:me._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(ai(e,me._jsonSchema))return new me(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Ol;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}me._jsonSchemaVersion="firestore/timestamp/1.0",me._jsonSchema={type:Ne("string",me._jsonSchemaVersion),seconds:Ne("number"),nanoseconds:Ne("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q{static fromTimestamp(e){return new Q(e)}static min(){return new Q(new me(0,0))}static max(){return new Q(new me(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fs=-1;function f7(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=Q.fromTimestamp(r===1e9?new me(t+1,0):new me(t,r));return new Vn(s,j.empty(),e)}function p7(n){return new Vn(n.readTime,n.key,Fs)}class Vn{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Vn(Q.min(),j.empty(),Fs)}static max(){return new Vn(Q.max(),j.empty(),Fs)}}function m7(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=j.comparator(n.documentKey,e.documentKey),t!==0?t:ie(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g7="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class _7{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $r(n){if(n.code!==D.FAILED_PRECONDITION||n.message!==g7)throw n;H("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&W(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new V(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof V?t:V.resolve(t)}catch(t){return V.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):V.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):V.reject(t)}static resolve(e){return new V(((t,r)=>{t(e)}))}static reject(e){return new V(((t,r)=>{r(e)}))}static waitFor(e){return new V(((t,r)=>{let s=0,i=0,o=!1;e.forEach((c=>{++s,c.next((()=>{++i,o&&i===s&&t()}),(u=>r(u)))})),o=!0,i===s&&t()}))}static or(e){let t=V.resolve(!1);for(const r of e)t=t.next((s=>s?V.resolve(s):r()));return t}static forEach(e,t){const r=[];return e.forEach(((s,i)=>{r.push(t.call(this,s,i))})),this.waitFor(r)}static mapArray(e,t){return new V(((r,s)=>{const i=e.length,o=new Array(i);let c=0;for(let u=0;u<i;u++){const h=u;t(e[h]).next((f=>{o[h]=f,++c,c===i&&r(o)}),(f=>s(f)))}}))}static doWhile(e,t){return new V(((r,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):r()};i()}))}}function E7(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Hr(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Do{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Do.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xc=-1;function Vo(n){return n==null}function Bs(n){return n===0&&1/n==-1/0}function y7(n){return typeof n=="number"&&Number.isInteger(n)&&!Bs(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}function w7(n){return typeof n=="string"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const I2="";function I7(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Dl(e)),e=T7(n.get(t),e);return Dl(e)}function T7(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case I2:t+="";break;default:t+=i}}return t}function Dl(n){return n+I2+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _e{constructor(e,t){this.comparator=e,this.root=t||Ge.EMPTY}insert(e,t){return new _e(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ge.BLACK,null,null))}remove(e){return new _e(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ge.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Ui(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Ui(this.root,e,this.comparator,!1)}getReverseIterator(){return new Ui(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Ui(this.root,e,this.comparator,!0)}}class Ui{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ge{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??Ge.RED,this.left=s??Ge.EMPTY,this.right=i??Ge.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new Ge(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Ge.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Ge.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ge.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ge.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw W(43730,{key:this.key,value:this.value});if(this.right.isRed())throw W(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw W(27949);return e+(this.isRed()?0:1)}}Ge.EMPTY=null,Ge.RED=!0,Ge.BLACK=!1;Ge.EMPTY=new class{constructor(){this.size=0}get key(){throw W(57766)}get value(){throw W(16141)}get color(){throw W(16727)}get left(){throw W(29726)}get right(){throw W(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new Ge(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe{constructor(e){this.comparator=e,this.data=new _e(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Vl(this.data.getIterator())}getIteratorFrom(e){return new Vl(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof Oe)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new Oe(this.comparator);return t.data=e,t}}class Vl{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e){this.fields=e,e.sort(Me.comparator)}static empty(){return new gt([])}unionWith(e){let t=new Oe(Me.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new gt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return kr(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ao(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Wn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function A7(n,e){const t=[];for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&t.push(e(n[r],r,n));return t}function T2(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A2 extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new A2("Invalid base64 string: "+i):i}})(e);return new ke(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i})(e);return new ke(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ie(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ke.EMPTY_BYTE_STRING=new ke("");const R7=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Ln(n){if(q(!!n,39018),typeof n=="string"){let e=0;const t=R7.exec(n);if(q(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ye(n.seconds),nanos:ye(n.nanos)}}function ye(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function xn(n){return typeof n=="string"?ke.fromBase64String(n):ke.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const R2="server_timestamp",v2="__type__",C2="__previous_value__",S2="__local_write_time__";function Lo(n){return(n?.mapValue?.fields||{})[v2]?.stringValue===R2}function ci(n){const e=n.mapValue.fields[C2];return Lo(e)?ci(e):e}function Dr(n){const e=Ln(n.mapValue.fields[S2].timestampValue);return new me(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v7{constructor(e,t,r,s,i,o,c,u,h,f,p){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=h,this.isUsingEmulator=f,this.apiKey=p}}const $s="(default)";class Hs{constructor(e,t){this.projectId=e,this.database=t||$s}static empty(){return new Hs("","")}get isDefaultDatabase(){return this.database===$s}isEqual(e){return e instanceof Hs&&e.projectId===this.projectId&&e.database===this.database}}function C7(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new U(D.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Hs(n.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P2="__type__",S7="__max__",Fi={mapValue:{}},b2="__vector__",qs="value",Vr={nullValue:"NULL_VALUE"},ht={booleanValue:!0},qe={booleanValue:!1};function De(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Lo(n)?4:P7(n)?9007199254740991:co(n)?10:11:W(28295,{value:n})}function Pt(n,e,t){if(n===e)return!0;const r=De(n);if(r!==De(e))return!1;switch(r){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Dr(n).isEqual(Dr(e));case 3:return(function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;const c=Ln(i.timestampValue),u=Ln(o.timestampValue);return c.seconds===u.seconds&&c.nanos===u.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(i,o){return xn(i.bytesValue).isEqual(xn(o.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(i,o){return ye(i.geoPointValue.latitude)===ye(o.geoPointValue.latitude)&&ye(i.geoPointValue.longitude)===ye(o.geoPointValue.longitude)})(n,e);case 2:return(function(i,o,c){if("integerValue"in i&&"integerValue"in o)return ye(i.integerValue)===ye(o.integerValue);let u,h;if("doubleValue"in i&&"doubleValue"in o)u=ye(i.doubleValue),h=ye(o.doubleValue);else{if(!c?.Ee)return!1;u=ye(i.integerValue??i.doubleValue),h=ye(o.integerValue??o.doubleValue)}return u===h?!!c?.he||Bs(u)===Bs(h):!!(c===void 0||c.Te)&&isNaN(u)&&isNaN(h)})(n,e,t);case 9:return kr(n.arrayValue.values||[],e.arrayValue.values||[],((s,i)=>Pt(s,i,t)));case 10:case 11:return(function(i,o,c){const u=i.mapValue.fields||{},h=o.mapValue.fields||{};if(ao(u)!==ao(h))return!1;for(const f in u)if(u.hasOwnProperty(f)&&(h[f]===void 0||!Pt(u[f],h[f],c)))return!1;return!0})(n,e,t);default:return W(52216,{left:n})}}function js(n,e){return(n.values||[]).find((t=>Pt(t,e)))!==void 0}function dt(n,e){if(n===e)return 0;const t=De(n),r=De(e);if(t!==r)return ie(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return ie(n.booleanValue,e.booleanValue);case 2:return(function(i,o){const c=ye(i.integerValue||i.doubleValue),u=ye(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1})(n,e);case 3:return Ll(n.timestampValue,e.timestampValue);case 4:return Ll(Dr(n),Dr(e));case 5:return lc(n.stringValue,e.stringValue);case 6:return(function(i,o){const c=xn(i),u=xn(o);return c.compareTo(u)})(n.bytesValue,e.bytesValue);case 7:return(function(i,o){const c=i.split("/"),u=o.split("/");for(let h=0;h<c.length&&h<u.length;h++){const f=ie(c[h],u[h]);if(f!==0)return f}return ie(c.length,u.length)})(n.referenceValue,e.referenceValue);case 8:return(function(i,o){const c=ie(ye(i.latitude),ye(o.latitude));return c!==0?c:ie(ye(i.longitude),ye(o.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return xl(n.arrayValue,e.arrayValue);case 10:return(function(i,o){const c=i.fields||{},u=o.fields||{},h=c[qs]?.arrayValue,f=u[qs]?.arrayValue,p=ie(h?.values?.length||0,f?.values?.length||0);return p!==0?p:xl(h,f)})(n.mapValue,e.mapValue);case 11:return(function(i,o){if(i===Fi.mapValue&&o===Fi.mapValue)return 0;if(i===Fi.mapValue)return 1;if(o===Fi.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),h=o.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let p=0;p<u.length&&p<f.length;++p){const w=lc(u[p],f[p]);if(w!==0)return w;const b=dt(c[u[p]],h[f[p]]);if(b!==0)return b}return ie(u.length,f.length)})(n.mapValue,e.mapValue);default:throw W(23264,{Pe:t})}}function Ll(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ie(n,e);const t=Ln(n),r=Ln(e),s=ie(t.seconds,r.seconds);return s!==0?s:ie(t.nanos,r.nanos)}function xl(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=dt(t[s],r[s]);if(i!==void 0&&i!==0)return i}return ie(t.length,r.length)}function Lr(n){return hc(n)}function hc(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=Ln(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return xn(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return j.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=hc(i);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${hc(t.fields[o])}`;return s+"}"})(n.mapValue):W(61005,{value:n})}function Ki(n){switch(De(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=ci(n);return e?16+Ki(e):16;case 5:return 2*n.stringValue.length;case 6:return xn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+Ki(i)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return Wn(r.fields,((i,o)=>{s+=i.length+Ki(o)})),s})(n.mapValue);default:throw W(13486,{value:n})}}function Ml(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Ut(n){return!!n&&"integerValue"in n}function nr(n){return!!n&&"doubleValue"in n}function Mn(n){return Ut(n)||nr(n)}function xr(n){return!!n&&"arrayValue"in n}function _t(n){return!!n&&"nullValue"in n}function ft(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function rr(n){return!!n&&"mapValue"in n}function co(n){return(n?.mapValue?.fields||{})[P2]?.stringValue===b2}function dc(n){return(n?.mapValue?.fields||{})[qs]?.arrayValue}function Cs(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Wn(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=Cs(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Cs(n.arrayValue.values[t]);return e}return{...n}}function P7(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===S7}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class it{constructor(e){this.value=e}static empty(){return new it({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!rr(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Cs(t)}setAll(e){let t=Me.emptyPath(),r={},s=[];e.forEach(((o,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=c.popLast()}o?r[c.lastSegment()]=Cs(o):s.push(c.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());rr(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Pt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];rr(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){Wn(t,((s,i)=>e[s]=i));for(const s of r)delete e[s]}clone(){return new it(Cs(this.value))}}function N2(n){const e=[];return Wn(n.fields,((t,r)=>{const s=new Me([t]);if(rr(r)){const i=N2(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)})),new gt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xo(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Bs(e)?"-0":e}}function Mc(n){return{integerValue:""+n}}function Mo(n,e,t){return Number.isInteger(e)&&t?.preferIntegers||y7(e)?Mc(e):xo(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uo{constructor(){this._=void 0}}function b7(n,e,t){return n instanceof Gs?(function(s,i){const o={fields:{[v2]:{stringValue:R2},[S2]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Lo(i)&&(i=ci(i)),i&&(o.fields[C2]=i),{mapValue:o}})(t,e):n instanceof Ws?k2(n,e):n instanceof zs?D2(n,e):n instanceof Mr?(function(s,i){const o=O2(s,i),c=ho(o)+ho(s.Re);return Ut(o)&&Ut(s.Re)?Mc(c):xo(s.serializer,c)})(n,e):n instanceof uo?(function(s,i){return Ul(s,i,Math.min)})(n,e):n instanceof lo?(function(s,i){return Ul(s,i,Math.max)})(n,e):void 0}function N7(n,e,t){return n instanceof Ws?k2(n,e):n instanceof zs?D2(n,e):t}function O2(n,e){return n instanceof Mr?Mn(e)?e:{integerValue:0}:null}class Gs extends Uo{}class Ws extends Uo{constructor(e){super(),this.elements=e}}function k2(n,e){const t=V2(e);for(const r of n.elements)t.some((s=>Pt(s,r)))||t.push(r);return{arrayValue:{values:t}}}class zs extends Uo{constructor(e){super(),this.elements=e}}function D2(n,e){let t=V2(e);for(const r of n.elements)t=t.filter((s=>!Pt(s,r)));return{arrayValue:{values:t}}}class Uc extends Uo{constructor(e,t){super(),this.serializer=e,this.Re=t}}class Mr extends Uc{}class uo extends Uc{}class lo extends Uc{}function Ul(n,e,t){if(!Mn(e))return n.Re;const r=t(ho(e),ho(n.Re));return Ut(e)&&Ut(n.Re)?Mc(r):xo(n.serializer,r)}function ho(n){return ye(n.integerValue||n.doubleValue)}function V2(n){return xr(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L2{constructor(e,t){this.field=e,this.transform=t}}function O7(n,e){return n.field.isEqual(e.field)&&(function(r,s){return r instanceof Ws&&s instanceof Ws||r instanceof zs&&s instanceof zs?kr(r.elements,s.elements,Pt):r instanceof Mr&&s instanceof Mr||r instanceof uo&&s instanceof uo||r instanceof lo&&s instanceof lo?Pt(r.Re,s.Re):r instanceof Gs&&s instanceof Gs})(n.transform,e.transform)}class k7{constructor(e,t){this.version=e,this.transformResults=t}}class St{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new St}static exists(e){return new St(void 0,e)}static updateTime(e){return new St(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Yi(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Fo{}function x2(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Fc(n.key,St.none()):new ui(n.key,n.data,St.none());{const t=n.data,r=it.empty();let s=new Oe(Me.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new zn(n.key,r,new gt(s.toArray()),St.none())}}function D7(n,e,t){n instanceof ui?(function(s,i,o){const c=s.value.clone(),u=Bl(s.fieldTransforms,i,o.transformResults);c.setAll(u),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(n,e,t):n instanceof zn?(function(s,i,o){if(!Yi(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=Bl(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(M2(s)),u.setAll(c),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()})(n,e,t):(function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,t)}function Ss(n,e,t,r){return n instanceof ui?(function(i,o,c,u){if(!Yi(i.precondition,o))return c;const h=i.value.clone(),f=$l(i.fieldTransforms,u,o);return h.setAll(f),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null})(n,e,t,r):n instanceof zn?(function(i,o,c,u){if(!Yi(i.precondition,o))return c;const h=$l(i.fieldTransforms,u,o),f=o.data;return f.setAll(M2(i)),f.setAll(h),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((p=>p.field)))})(n,e,t,r):(function(i,o,c){return Yi(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c})(n,e,t)}function V7(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=O2(r.transform,s||null);i!=null&&(t===null&&(t=it.empty()),t.set(r.field,i))}return t||null}function Fl(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&kr(r,s,((i,o)=>O7(i,o)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class ui extends Fo{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class zn extends Fo{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function M2(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function Bl(n,e,t){const r=new Map;q(n.length===t.length,32656,{Ie:t.length,Ae:n.length});for(let s=0;s<t.length;s++){const i=n[s],o=i.transform,c=e.data.field(i.field);r.set(i.field,N7(o,c,t[s]))}return r}function $l(n,e,t){const r=new Map;for(const s of n){const i=s.transform,o=t.data.field(s.field);r.set(s.field,b7(i,o,e))}return r}class Fc extends Fo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class L7 extends Fo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fo{constructor(e,t){this.position=e,this.inclusive=t}}function Hl(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],o=n.position[s];if(i.field.isKeyField()?r=j.comparator(j.fromName(o.referenceValue),t.key):r=dt(o,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function ql(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Pt(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U2{}class be extends U2{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new M7(e,t,r):t==="array-contains"?new B7(e,r):t==="in"?new $7(e,r):t==="not-in"?new H7(e,r):t==="array-contains-any"?new q7(e,r):new be(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new U7(e,r):new F7(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(dt(t,this.value)):t!==null&&De(this.value)===De(t)&&this.matchesComparison(dt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return W(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Dt extends U2{constructor(e,t){super(),this.filters=e,this.op=t,this.Ve=null}static create(e,t){return new Dt(e,t)}matches(e){return F2(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Ve!==null||(this.Ve=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Ve}getFilters(){return Object.assign([],this.filters)}}function F2(n){return n.op==="and"}function B2(n){return x7(n)&&F2(n)}function x7(n){for(const e of n.filters)if(e instanceof Dt)return!1;return!0}function fc(n){if(n instanceof be)return n.field.canonicalString()+n.op.toString()+Lr(n.value);if(B2(n))return n.filters.map((e=>fc(e))).join(",");{const e=n.filters.map((t=>fc(t))).join(",");return`${n.op}(${e})`}}function $2(n,e){return n instanceof be?(function(r,s){return s instanceof be&&r.op===s.op&&r.field.isEqual(s.field)&&Pt(r.value,s.value)})(n,e):n instanceof Dt?(function(r,s){return s instanceof Dt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,o,c)=>i&&$2(o,s.filters[c])),!0):!1})(n,e):void W(19439)}function H2(n){return n instanceof be?(function(t){return`${t.field.canonicalString()} ${t.op} ${Lr(t.value)}`})(n):n instanceof Dt?(function(t){return t.op.toString()+" {"+t.getFilters().map(H2).join(" ,")+"}"})(n):"Filter"}class M7 extends be{constructor(e,t,r){super(e,t,r),this.key=j.fromName(r.referenceValue)}matches(e){const t=j.comparator(e.key,this.key);return this.matchesComparison(t)}}class U7 extends be{constructor(e,t){super(e,"in",t),this.keys=q2("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class F7 extends be{constructor(e,t){super(e,"not-in",t),this.keys=q2("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function q2(n,e){return(e.arrayValue?.values||[]).map((t=>j.fromName(t.referenceValue)))}class B7 extends be{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return xr(t)&&js(t.arrayValue,this.value)}}class $7 extends be{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&js(this.value.arrayValue,t)}}class H7 extends be{constructor(e,t){super(e,"not-in",t)}matches(e){if(js(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!js(this.value.arrayValue,t)}}class q7 extends be{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!xr(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>js(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ks{constructor(e,t="asc"){this.field=e,this.dir=t}}function j7(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe{constructor(e,t,r,s,i,o,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(e){return new Xe(e,0,Q.min(),Q.min(),Q.min(),it.empty(),0)}static newFoundDocument(e,t,r,s){return new Xe(e,1,t,Q.min(),r,s,0)}static newNoDocument(e,t){return new Xe(e,2,t,Q.min(),Q.min(),it.empty(),0)}static newUnknownDocument(e,t){return new Xe(e,3,t,Q.min(),Q.min(),it.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(Q.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=it.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=it.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Q.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Xe&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Xe(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G7{constructor(e,t=null,r=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.de=null}}function jl(n,e=null,t=[],r=[],s=null,i=null,o=null){return new G7(n,e,t,r,s,i,o)}function j2(n){const e=X(n);if(e.de===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>fc(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),Vo(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>Lr(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>Lr(r))).join(",")),e.de=t}return e.de}function G2(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!j7(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!$2(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!ql(n.startAt,e.startAt)&&ql(n.endAt,e.endAt)}function tr(n){return!!n.isCorePipeline}function W2(n){return!!n.path&&j.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qr{constructor(e,t=null,r=[],s=[],i=null,o="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=u,this.fe=null,this.me=null,this.pe=null,this.startAt,this.endAt}}function W7(n,e,t,r,s,i,o,c){return new qr(n,e,t,r,s,i,o,c)}function Bo(n){return new qr(n)}function Gl(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function z7(n){return j.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function z2(n){return n.collectionGroup!==null}function Ps(n){const e=X(n);if(e.fe===null){e.fe=[];const t=new Set;for(const i of e.explicitOrderBy)e.fe.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new Oe(Me.comparator);return o.filters.forEach((u=>{u.getFlattenedFilters().forEach((h=>{h.isInequality()&&(c=c.add(h.field))}))})),c})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.fe.push(new Ks(i,r))})),t.has(Me.keyField().canonicalString())||e.fe.push(new Ks(Me.keyField(),r))}return e.fe}function Bt(n){const e=X(n);return e.me||(e.me=K7(e,Ps(n))),e.me}function K7(n,e){if(n.limitType==="F")return jl(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new Ks(s.field,i)}));const t=n.endAt?new fo(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new fo(n.startAt.position,n.startAt.inclusive):null;return jl(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function pc(n,e){const t=n.filters.concat([e]);return new qr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Y7(n,e){const t=n.explicitOrderBy.concat([e]);return new qr(n.path,n.collectionGroup,t,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function mc(n,e,t){return new qr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Q7(n,e){return G2(Bt(n),Bt(e))&&n.limitType===e.limitType}function bs(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((s=>H2(s))).join(", ")}]`),Vo(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((s=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(s))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((s=>Lr(s))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((s=>Lr(s))).join(",")),`Target(${r})`})(Bt(n))}; limitType=${n.limitType})`}function $o(n,e){return e.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):j.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(n,e)&&(function(r,s){for(const i of Ps(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(n,e)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(n,e)&&(function(r,s){return!(r.startAt&&!(function(o,c,u){const h=Hl(o,c,u);return o.inclusive?h<=0:h<0})(r.startAt,Ps(r),s)||r.endAt&&!(function(o,c,u){const h=Hl(o,c,u);return o.inclusive?h>=0:h>0})(r.endAt,Ps(r),s))})(n,e)}function Bc(n){return(e,t)=>{let r=!1;for(const s of Ps(n)){const i=X7(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function X7(n,e,t){const r=n.field.isKeyField()?j.comparator(e.key,t.key):(function(i,o,c){const u=o.data.field(i),h=c.data.field(i);return u!==null&&h!==null?dt(u,h):W(42886)})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return W(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J7{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ce,ae;function Z7(n){switch(n){case D.OK:return W(64938);case D.CANCELLED:case D.UNKNOWN:case D.DEADLINE_EXCEEDED:case D.RESOURCE_EXHAUSTED:case D.INTERNAL:case D.UNAVAILABLE:case D.UNAUTHENTICATED:return!1;case D.INVALID_ARGUMENT:case D.NOT_FOUND:case D.ALREADY_EXISTS:case D.PERMISSION_DENIED:case D.FAILED_PRECONDITION:case D.ABORTED:case D.OUT_OF_RANGE:case D.UNIMPLEMENTED:case D.DATA_LOSS:return!0;default:return W(15467,{code:n})}}function K2(n){if(n===void 0)return an("GRPC error has no .code"),D.UNKNOWN;switch(n){case Ce.OK:return D.OK;case Ce.CANCELLED:return D.CANCELLED;case Ce.UNKNOWN:return D.UNKNOWN;case Ce.DEADLINE_EXCEEDED:return D.DEADLINE_EXCEEDED;case Ce.RESOURCE_EXHAUSTED:return D.RESOURCE_EXHAUSTED;case Ce.INTERNAL:return D.INTERNAL;case Ce.UNAVAILABLE:return D.UNAVAILABLE;case Ce.UNAUTHENTICATED:return D.UNAUTHENTICATED;case Ce.INVALID_ARGUMENT:return D.INVALID_ARGUMENT;case Ce.NOT_FOUND:return D.NOT_FOUND;case Ce.ALREADY_EXISTS:return D.ALREADY_EXISTS;case Ce.PERMISSION_DENIED:return D.PERMISSION_DENIED;case Ce.FAILED_PRECONDITION:return D.FAILED_PRECONDITION;case Ce.ABORTED:return D.ABORTED;case Ce.OUT_OF_RANGE:return D.OUT_OF_RANGE;case Ce.UNIMPLEMENTED:return D.UNIMPLEMENTED;case Ce.DATA_LOSS:return D.DATA_LOSS;default:return W(39323,{code:n})}}(ae=Ce||(Ce={}))[ae.OK=0]="OK",ae[ae.CANCELLED=1]="CANCELLED",ae[ae.UNKNOWN=2]="UNKNOWN",ae[ae.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ae[ae.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ae[ae.NOT_FOUND=5]="NOT_FOUND",ae[ae.ALREADY_EXISTS=6]="ALREADY_EXISTS",ae[ae.PERMISSION_DENIED=7]="PERMISSION_DENIED",ae[ae.UNAUTHENTICATED=16]="UNAUTHENTICATED",ae[ae.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ae[ae.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ae[ae.ABORTED=10]="ABORTED",ae[ae.OUT_OF_RANGE=11]="OUT_OF_RANGE",ae[ae.UNIMPLEMENTED=12]="UNIMPLEMENTED",ae[ae.INTERNAL=13]="INTERNAL",ae[ae.UNAVAILABLE=14]="UNAVAILABLE",ae[ae.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pr{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Wn(this.inner,((t,r)=>{for(const[s,i]of r)e(s,i)}))}isEmpty(){return T2(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const e4=new _e(j.comparator);function ct(){return e4}const Y2=new _e(j.comparator);function Ir(...n){let e=Y2;for(const t of n)e=e.insert(t.key,t);return e}function Q2(n){let e=Y2;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function Tn(){return Ns()}function X2(){return Ns()}function Ns(){return new pr((n=>n.toString()),((n,e)=>n.isEqual(e)))}const t4=new _e(j.comparator),n4=new Oe(j.comparator);function ne(...n){let e=n4;for(const t of n)e=e.add(t);return e}const r4=new Oe(ie);function s4(){return r4}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function i4(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const o4=new Sn([4294967295,4294967295],0);function Wl(n){const e=i4().encode(n),t=new h2;return t.update(e),new Uint8Array(t.digest())}function zl(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Sn([t,r],0),new Sn([s,i],0)]}class $c{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new ws(`Invalid padding: ${t}`);if(r<0)throw new ws(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new ws(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new ws(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.ye=Sn.fromNumber(this.ge)}we(e,t,r){let s=e.add(t.multiply(Sn.fromNumber(r)));return s.compare(o4)===1&&(s=new Sn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.ye).toNumber()}be(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=Wl(e),[r,s]=zl(t);for(let i=0;i<this.hashCount;i++){const o=this.we(r,s,i);if(!this.be(o))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new $c(i,s,t);return r.forEach((c=>o.insert(c))),o}insert(e){if(this.ge===0)return;const t=Wl(e),[r,s]=zl(t);for(let i=0;i<this.hashCount;i++){const o=this.we(r,s,i);this.ve(o)}}ve(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class ws extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class li{constructor(e,t,r,s,i,o){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.augmentedDocumentUpdates=i,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,hi.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new li(Q.min(),s,new _e(ie),ct(),ct(),ne())}}class hi{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new hi(r,t,ne(),ne(),ne())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qi{constructor(e,t,r,s){this.Se=e,this.removedTargetIds=t,this.key=r,this.De=s}}class J2{constructor(e,t){this.targetId=e,this.xe=t}}class Z2{constructor(e,t,r=ke.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Kl{constructor(e){this.targetId=e,this.Ce=0,this.Fe=Yl(),this.Oe=ke.EMPTY_BYTE_STRING,this.Me=!1,this.Ne=!0}get current(){return this.Me}get resumeToken(){return this.Oe}get Le(){return this.Ce!==0}get Be(){return this.Ne}Ue(e){e.approximateByteSize()>0&&(this.Ne=!0,this.Oe=e)}ke(){let e=ne(),t=ne(),r=ne();return this.Fe.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:W(38017,{changeType:i})}})),new hi(this.Oe,this.Me,e,t,r)}qe(){this.Ne=!1,this.Fe=Yl()}$e(e,t){this.Ne=!0,this.Fe=this.Fe.insert(e,t)}Ke(e){this.Ne=!0,this.Fe=this.Fe.remove(e)}We(){this.Ce+=1}Qe(){this.Ce-=1,q(this.Ce>=0,3241,{Ce:this.Ce,targetId:this.targetId})}Ge(){this.Ne=!0,this.Me=!0}}const fs="WatchChangeAggregator";class a4{constructor(e){this.ze=e,this.je=new Map,this.He=ct(),this.Je=Bi(),this.Ye=ct(),this.Ze=Bi(),this.Xe=new _e(ie)}et(e){for(const t of e.Se)e.De&&e.De.isFoundDocument()?this.tt(t,e.De):this.nt(t,e.key,e.De);for(const t of e.removedTargetIds)this.nt(t,e.key,e.De)}rt(e){this.forEachTarget(e,(t=>{const r=this.je.get(t);if(r)switch(e.state){case 0:this.it(t)&&r.Ue(e.resumeToken);break;case 1:r.Qe(),r.Le||r.qe(),r.Ue(e.resumeToken);break;case 2:r.Qe(),r.Le||this.removeTarget(t);break;case 3:this.it(t)&&(r.Ge(),r.Ue(e.resumeToken));break;case 4:this.it(t)&&(this.st(t),r.Ue(e.resumeToken));break;default:W(56790,{state:e.state})}else H(fs,`handleTargetChange received targetChange for untracked target ID (${t}) with state (${e.state})`)}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.je.forEach(((r,s)=>{this.it(s)&&t(s)}))}_t(e){return tr(e)?e.getPipelineSourceType()==="documents"&&e.getPipelineDocuments()?.length===1:W2(e)}ot(e){const t=e.targetId,r=e.xe.count,s=this.ut(t);if(s){const i=s.target;if(this._t(i))if(r===0){const o=new j(tr(i)?de.fromString(i.getPipelineDocuments()[0]):i.path);this.nt(t,o,Xe.newNoDocument(o,Q.min()))}else q(r===1,20013,"Single document existence filter with count: "+r);else{const o=this.ct(t);if(o!==r){const c=this.lt(e),u=c?this.Et(c,e,o):1;if(u!==0){this.st(t);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Xe=this.Xe.insert(t,h)}}}}}lt(e){const t=e.xe.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let o,c;try{o=xn(r).toUint8Array()}catch(u){if(u instanceof A2)return kt("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new $c(o,s,i)}catch(u){return kt(u instanceof ws?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}Et(e,t,r){return t.xe.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.ze.getRemoteKeysForTarget(t);let s=0;return r.forEach((i=>{const o=this.ze.Tt(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.nt(t,i,null),s++)})),s}Rt(e){const t=new Map;this.je.forEach(((i,o)=>{const c=this.ut(o);if(c){if(i.current&&this._t(c.target)){const u=tr(c.target)?de.fromString(c.target.getPipelineDocuments()[0]):c.target.path,h=new j(u);this.It(h).has(o)||this.At(o,h)||this.nt(o,h,Xe.newNoDocument(h,e))}i.Be&&(t.set(o,i.ke()),i.qe())}}));let r=ne();this.Ze.forEach(((i,o)=>{let c=!0;o.forEachWhile((u=>{const h=this.ut(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(r=r.add(i))})),this.He.forEach(((i,o)=>o.setReadTime(e))),this.Ye.forEach(((i,o)=>o.setReadTime(e)));const s=new li(e,t,this.Xe,this.He,this.Ye,r);return this.He=ct(),this.Je=Bi(),this.Ye=ct(),this.Ze=Bi(),this.Xe=new _e(ie),s}tt(e,t){const r=this.je.get(e);if(!r||!this.it(e))return void H(fs,`addDocumentToTarget received document for unknown inactive target (${e})`);const s=this.At(e,t.key)?2:0;r.$e(t.key,s),tr(this.ut(e).target)&&this.ut(e).target.getPipelineFlavor()!=="exact"?this.Ye=this.Ye.insert(t.key,t):this.He=this.He.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.Ze=this.Ze.insert(t.key,this.Vt(t.key).add(e))}nt(e,t,r){const s=this.je.get(e);s&&this.it(e)?(this.At(e,t)?s.$e(t,1):s.Ke(t),this.Ze=this.Ze.insert(t,this.Vt(t).delete(e)),this.Ze=this.Ze.insert(t,this.Vt(t).add(e)),r&&(tr(this.ut(e).target)&&this.ut(e).target.getPipelineFlavor()!=="exact"?this.Ye=this.Ye.insert(t,r):this.He=this.He.insert(t,r))):H(fs,`removeDocumentFromTarget received document for unknown or inactive target (${e})`)}removeTarget(e){this.je.delete(e)}ct(e){const t=this.je.get(e);if(!t)return 0;const r=t.ke();return this.ze.getRemoteKeysForTarget(e).size+r.addedDocuments.size-r.removedDocuments.size}We(e){let t=this.je.get(e);t||(H(fs,`recordPendingTargetRequest set up tracking for target ID ${e}`),t=new Kl(e),this.je.set(e,t)),t.We()}Vt(e){let t=this.Ze.get(e);return t||(t=new Oe(ie),this.Ze=this.Ze.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new Oe(ie),this.Je=this.Je.insert(e,t)),t}it(e){const t=this.ut(e)!==null;return t||H(fs,"Detected inactive target",e),t}ut(e){const t=this.je.get(e);return t===void 0||t.Le?null:this.ze.dt(e)}st(e){this.je.set(e,new Kl(e)),this.ze.getRemoteKeysForTarget(e).forEach((t=>{this.nt(e,t,null)}))}At(e,t){return this.ze.getRemoteKeysForTarget(e).has(t)}}function Bi(){return new _e(j.comparator)}function Yl(){return new _e(j.comparator)}const c4={asc:"ASCENDING",desc:"DESCENDING"},u4={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},l4={and:"AND",or:"OR"};class h4{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function gc(n,e){return n.useProto3Json||Vo(e)?e:{value:e}}function po(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Hc(n){const e=Ln(n);return new me(e.seconds,e.nanos)}function ed(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Xi(n,e){return po(n,e.toTimestamp())}function $t(n){return q(!!n,49232),Q.fromTimestamp(Hc(n))}function qc(n,e){return _c(n,e).canonicalString()}function _c(n,e){const t=(function(s){return new de(["projects",s.projectId,"databases",s.database])})(n).child("documents");return e===void 0?t:t.child(e)}function td(n){const e=de.fromString(n);return q(od(e),10190,{key:e.toString()}),e}function mo(n,e){return qc(n.databaseId,e.path)}function Ga(n,e){const t=td(e);if(t.get(1)!==n.databaseId.projectId)throw new U(D.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new U(D.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new j(rd(t))}function nd(n,e){return qc(n.databaseId,e)}function d4(n){const e=td(n);return e.length===4?de.emptyPath():rd(e)}function Ec(n){return new de(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function rd(n){return q(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Ql(n,e,t){return{name:mo(n,e),fields:t.value.mapValue.fields}}function f4(n,e){let t;if("targetChange"in e){e.targetChange;const r=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:W(39313,{state:h})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(h,f){return h.useProto3Json?(q(f===void 0||typeof f=="string",58123),ke.fromBase64String(f||"")):(q(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),ke.fromUint8Array(f||new Uint8Array))})(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&(function(h){const f=h.code===void 0?D.UNKNOWN:K2(h.code);return new U(f,h.message||"")})(o);t=new Z2(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Ga(n,r.document.name),i=$t(r.document.updateTime),o=r.document.createTime?$t(r.document.createTime):Q.min(),c=new it({mapValue:{fields:r.document.fields}}),u=Xe.newFoundDocument(s,i,o,c),h=r.targetIds||[],f=r.removedTargetIds||[];t=new Qi(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Ga(n,r.document),i=r.readTime?$t(r.readTime):Q.min(),o=Xe.newNoDocument(s,i),c=r.removedTargetIds||[];t=new Qi([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Ga(n,r.document),i=r.removedTargetIds||[];t=new Qi([],i,s,null)}else{if(!("filter"in e))return W(11601,{ft:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new J7(s,i),c=r.targetId;t=new J2(c,o)}}return t}function p4(n,e){let t;if(e instanceof ui)t={update:Ql(n,e.key,e.value)};else if(e instanceof Fc)t={delete:mo(n,e.key)};else if(e instanceof zn)t={update:Ql(n,e.key,e.data),updateMask:R4(e.fieldMask)};else{if(!(e instanceof L7))return W(16599,{gt:e.type});t={verify:mo(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((r=>(function(i,o){const c=o.transform;if(c instanceof Gs)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Ws)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof zs)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Mr)return{fieldPath:o.field.canonicalString(),increment:c.Re};if(c instanceof uo)return{fieldPath:o.field.canonicalString(),minimum:c.Re};if(c instanceof lo)return{fieldPath:o.field.canonicalString(),maximum:c.Re};throw W(20930,{transform:o.transform})})(0,r)))),e.precondition.isNone||(t.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:Xi(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:W(27497)})(n,e.precondition)),t}function m4(n,e){return n&&n.length>0?(q(e!==void 0,14353),n.map((t=>(function(s,i){let o=s.updateTime?$t(s.updateTime):$t(i);return o.isEqual(Q.min())&&(o=$t(i)),new k7(o,s.transformResults||[])})(t,e)))):[]}function g4(n,e){return{documents:[nd(n,e.path)]}}function _4(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=nd(n,s);const i=(function(h){if(h.length!==0)return id(Dt.create(h,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const o=(function(h){if(h.length!==0)return h.map((f=>(function(w){return{field:Tr(w.field),direction:I4(w.dir)}})(f)))})(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=gc(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(e.endAt)),{yt:t,parent:s}}function E4(n){let e=d4(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){q(r===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=(function(p){const w=sd(p);return w instanceof Dt&&B2(w)?w.getFilters():[w]})(t.where));let o=[];t.orderBy&&(o=(function(p){return p.map((w=>(function(P){return new Ks(Ar(P.field),(function(x){switch(x){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(P.direction))})(w)))})(t.orderBy));let c=null;t.limit&&(c=(function(p){let w;return w=typeof p=="object"?p.value:p,Vo(w)?null:w})(t.limit));let u=null;t.startAt&&(u=(function(p){const w=!!p.before,b=p.values||[];return new fo(b,w)})(t.startAt));let h=null;return t.endAt&&(h=(function(p){const w=!p.before,b=p.values||[];return new fo(b,w)})(t.endAt)),W7(e,s,o,i,c,"F",u,h)}function y4(n,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return W(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function w4(n,e){return{structuredPipeline:{pipeline:{stages:e.stages.map((t=>t._toProto(n)))}}}}function sd(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Ar(t.unaryFilter.field);return be.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Ar(t.unaryFilter.field);return be.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Ar(t.unaryFilter.field);return be.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Ar(t.unaryFilter.field);return be.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return W(61313);default:return W(60726)}})(n):n.fieldFilter!==void 0?(function(t){return be.create(Ar(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return W(58110);default:return W(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return Dt.create(t.compositeFilter.filters.map((r=>sd(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return W(1026)}})(t.compositeFilter.op))})(n):W(30097,{filter:n})}function I4(n){return c4[n]}function T4(n){return u4[n]}function A4(n){return l4[n]}function Tr(n){return{fieldPath:n.canonicalString()}}function Ar(n){return Me.fromServerFormat(n.fieldPath)}function id(n){return n instanceof be?(function(t){if(t.op==="=="){if(ft(t.value))return{unaryFilter:{field:Tr(t.field),op:"IS_NAN"}};if(_t(t.value))return{unaryFilter:{field:Tr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(ft(t.value))return{unaryFilter:{field:Tr(t.field),op:"IS_NOT_NAN"}};if(_t(t.value))return{unaryFilter:{field:Tr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Tr(t.field),op:T4(t.op),value:t.value}}})(n):n instanceof Dt?(function(t){const r=t.getFilters().map((s=>id(s)));return r.length===1?r[0]:{compositeFilter:{op:A4(t.op),filters:r}}})(n):W(54877,{filter:n})}function R4(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function od(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function ad(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}function Ys(n,e){const t={fields:{}};return e.forEach(((r,s)=>{if(typeof s!="string")throw new Error(`Cannot encode map with non-string key: ${s}`);t.fields[s]=r._toProto(n)})),{mapValue:t}}function cd(n){return{stringValue:n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ho(n){return new h4(n,!0)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Tt(ke.fromBase64String(e))}catch(t){throw new U(D.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Tt(ke.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Tt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(ai(e,Tt._jsonSchema))return Tt.fromBase64String(e.bytes)}}Tt._jsonSchemaVersion="firestore/bytes/1.0",Tt._jsonSchema={type:Ne("string",Tt._jsonSchemaVersion),bytes:Ne("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qo{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new U(D.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Me(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function v4(){return new qo(Mt)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class di{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ht{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new U(D.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new U(D.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ie(this._lat,e._lat)||ie(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Ht._jsonSchemaVersion}}static fromJSON(e){if(ai(e,Ht._jsonSchema))return new Ht(e.latitude,e.longitude)}}function ud(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ht._jsonSchemaVersion="firestore/geoPoint/1.0",Ht._jsonSchema={type:Ne("string",Ht._jsonSchemaVersion),latitude:Ne("number"),longitude:Ne("number")};class C4{bt(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xl="ConnectivityMonitor";class Jl{constructor(){this.vt=()=>this.St(),this.Dt=()=>this.xt(),this.Ct=[],this.Ft()}bt(e){this.Ct.push(e)}shutdown(){window.removeEventListener("online",this.vt),window.removeEventListener("offline",this.Dt)}Ft(){window.addEventListener("online",this.vt),window.addEventListener("offline",this.Dt)}St(){H(Xl,"Network connectivity changed: AVAILABLE");for(const e of this.Ct)e(0)}xt(){H(Xl,"Network connectivity changed: UNAVAILABLE");for(const e of this.Ct)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $i=null;function yc(){return $i===null?$i=(function(){return 268435456+Math.round(2147483648*Math.random())})():$i++,"0x"+$i.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wa="RestConnection",S4={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class P4{get Ot(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Mt=t+"://"+e.host,this.Nt=`projects/${r}/databases/${s}`,this.Lt=this.databaseId.database===$s?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Bt(e,t,r,s,i){const o=yc(),c=this.Ut(e,t.toUriEncodedString());H(Wa,`Sending RPC '${e}' ${o}:`,c,r);const u={"google-cloud-resource-prefix":this.Nt,"x-goog-request-params":this.Lt};this.kt(u,s,i);const{host:h}=new URL(c),f=Gn(h);return this.qt(e,c,u,r,f).then((p=>(H(Wa,`Received RPC '${e}' ${o}: `,p),p)),(p=>{throw kt(Wa,`RPC '${e}' ${o} failed with error: `,p,"url: ",c,"request:",r),p}))}$t(e,t,r,s,i,o){return this.Bt(e,t,r,s,i)}kt(e,t,r){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Br})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),r&&r.headers.forEach(((s,i)=>e[i]=s))}Ut(e,t){const r=S4[e];let s=`${this.Mt}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b4{constructor(e){this.Kt=e.Kt,this.Wt=e.Wt}Qt(e){this.Gt=e}zt(e){this.jt=e}Ht(e){this.Jt=e}onMessage(e){this.Yt=e}close(){this.Wt()}send(e){this.Kt(e)}Zt(){this.Gt()}Xt(){this.jt()}en(e){this.Jt(e)}tn(e){this.Yt(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ke="WebChannelConnection",ps=(n,e,t)=>{n.listen(e,(r=>{try{t(r)}catch(s){setTimeout((()=>{throw s}),0)}}))};class Cr extends P4{constructor(e){super(e),this.nn=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static rn(){if(!Cr.sn){const e=m2();ps(e,p2.STAT_EVENT,(t=>{t.stat===uc.PROXY?H(Ke,"STAT_EVENT: detected buffering proxy"):t.stat===uc.NOPROXY&&H(Ke,"STAT_EVENT: detected no buffering proxy")})),Cr.sn=!0}}qt(e,t,r,s,i){const o=yc();return new Promise(((c,u)=>{const h=new d2;h.setWithCredentials(!0),h.listenOnce(f2.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case zi.NO_ERROR:const p=h.getResponseJson();H(Ke,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(p)),c(p);break;case zi.TIMEOUT:H(Ke,`RPC '${e}' ${o} timed out`),u(new U(D.DEADLINE_EXCEEDED,"Request time out"));break;case zi.HTTP_ERROR:const w=h.getStatus();if(H(Ke,`RPC '${e}' ${o} failed with status:`,w,"response text:",h.getResponseText()),w>0){let b=h.getResponseJson();Array.isArray(b)&&(b=b[0]);const P=b?.error;if(P&&P.status&&P.message){const L=(function(z){const te=z.toLowerCase().replace(/_/g,"-");return Object.values(D).indexOf(te)>=0?te:D.UNKNOWN})(P.status);u(new U(L,P.message))}else u(new U(D.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new U(D.UNAVAILABLE,"Connection failed."));break;default:W(9055,{_n:e,streamId:o,an:h.getLastErrorCode(),un:h.getLastError()})}}finally{H(Ke,`RPC '${e}' ${o} completed.`)}}));const f=JSON.stringify(s);H(Ke,`RPC '${e}' ${o} sending request:`,s),h.send(t,"POST",f,r,15)}))}cn(e,t,r){const s=yc(),i=[this.Mt,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.kt(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const h=i.join("");H(Ke,`Creating RPC '${e}' stream ${s}: ${h}`,c);const f=o.createWebChannel(h,c);this.En(f);let p=!1,w=!1;const b=new b4({Kt:P=>{w?H(Ke,`Not sending because RPC '${e}' stream ${s} is closed:`,P):(p||(H(Ke,`Opening RPC '${e}' stream ${s} transport.`),f.open(),p=!0),H(Ke,`RPC '${e}' stream ${s} sending:`,P),f.send(P))},Wt:()=>f.close()});return ps(f,ys.EventType.OPEN,(()=>{w||(H(Ke,`RPC '${e}' stream ${s} transport opened.`),b.Zt())})),ps(f,ys.EventType.CLOSE,(()=>{w||(w=!0,H(Ke,`RPC '${e}' stream ${s} transport closed`),b.en(),this.hn(f))})),ps(f,ys.EventType.ERROR,(P=>{w||(w=!0,kt(Ke,`RPC '${e}' stream ${s} transport errored. Name:`,P.name,"Message:",P.message),b.en(new U(D.UNAVAILABLE,"The operation could not be completed")))})),ps(f,ys.EventType.MESSAGE,(P=>{if(!w){const L=P.data[0];q(!!L,16349);const x=L,z=x?.error||x[0]?.error;if(z){H(Ke,`RPC '${e}' stream ${s} received error:`,z);const te=z.status;let re=(function(Ee){const A=Ce[Ee];if(A!==void 0)return K2(A)})(te),he=z.message;te==="NOT_FOUND"&&he.includes("database")&&he.includes("does not exist")&&he.includes(this.databaseId.database)&&kt(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),re===void 0&&(re=D.INTERNAL,he="Unknown error status: "+te+" with message "+z.message),w=!0,b.en(new U(re,he)),f.close()}else H(Ke,`RPC '${e}' stream ${s} received:`,L),b.tn(L)}})),Cr.rn(),setTimeout((()=>{b.Xt()}),0),b}terminate(){this.nn.forEach((e=>e.close())),this.nn=[]}En(e){this.nn.push(e)}hn(e){this.nn=this.nn.filter((t=>t===e))}kt(e,t,r){super.kt(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return g2()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function N4(n){return new Cr(n)}Cr.sn=!1;class ld{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Tn=e,this.timerId=t,this.Pn=r,this.Rn=s,this.In=i,this.An=0,this.Vn=null,this.dn=Date.now(),this.reset()}reset(){this.An=0}fn(){this.An=this.In}mn(e){this.cancel();const t=Math.floor(this.An+this.pn()),r=Math.max(0,Date.now()-this.dn),s=Math.max(0,t-r);s>0&&H("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.An} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Vn=this.Tn.enqueueAfterDelay(this.timerId,s,(()=>(this.dn=Date.now(),e()))),this.An*=this.Rn,this.An<this.Pn&&(this.An=this.Pn),this.An>this.In&&(this.An=this.In)}gn(){this.Vn!==null&&(this.Vn.skipDelay(),this.Vn=null)}cancel(){this.Vn!==null&&(this.Vn.cancel(),this.Vn=null)}pn(){return(Math.random()-.5)*this.An}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zl="PersistentStream";class hd{constructor(e,t,r,s,i,o,c,u){this.Tn=e,this.yn=r,this.wn=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.bn=0,this.vn=null,this.Sn=null,this.stream=null,this.Dn=0,this.xn=new ld(e,t)}Cn(){return this.state===1||this.state===5||this.Fn()}Fn(){return this.state===2||this.state===3}start(){this.Dn=0,this.state!==4?this.auth():this.On()}async stop(){this.Cn()&&await this.close(0)}Mn(){this.state=0,this.xn.reset()}Nn(){this.Fn()&&this.vn===null&&(this.vn=this.Tn.enqueueAfterDelay(this.yn,6e4,(()=>this.Ln())))}Bn(e){this.Un(),this.stream.send(e)}async Ln(){if(this.Fn())return this.close(0)}Un(){this.vn&&(this.vn.cancel(),this.vn=null)}kn(){this.Sn&&(this.Sn.cancel(),this.Sn=null)}async close(e,t){this.Un(),this.kn(),this.xn.cancel(),this.bn++,e!==4?this.xn.reset():t&&t.code===D.RESOURCE_EXHAUSTED?(an(t.toString()),an("Using maximum backoff delay to prevent overloading the backend."),this.xn.fn()):t&&t.code===D.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.qn(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Ht(t)}qn(){}auth(){this.state=1;const e=this.$n(this.bn),t=this.bn;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.bn===t&&this.Kn(r,s)}),(r=>{e((()=>{const s=new U(D.UNKNOWN,"Fetching auth token failed: "+r.message);return this.Wn(s)}))}))}Kn(e,t){const r=this.$n(this.bn);this.stream=this.Qn(e,t),this.stream.Qt((()=>{r((()=>this.listener.Qt()))})),this.stream.zt((()=>{r((()=>(this.state=2,this.Sn=this.Tn.enqueueAfterDelay(this.wn,1e4,(()=>(this.Fn()&&(this.state=3),Promise.resolve()))),this.listener.zt())))})),this.stream.Ht((s=>{r((()=>this.Wn(s)))})),this.stream.onMessage((s=>{r((()=>++this.Dn==1?this.Gn(s):this.onNext(s)))}))}On(){this.state=5,this.xn.mn((async()=>{this.state=0,this.start()}))}Wn(e){return H(Zl,`close with error: ${e}`),this.stream=null,this.close(4,e)}$n(e){return t=>{this.Tn.enqueueAndForget((()=>this.bn===e?t():(H(Zl,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class O4 extends hd{constructor(e,t,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}Qn(e,t){return this.connection.cn("Listen",e,t)}Gn(e){return this.onNext(e)}onNext(e){this.xn.reset();const t=f4(this.serializer,e),r=(function(i){if(!("targetChange"in i))return Q.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?Q.min():o.readTime?$t(o.readTime):Q.min()})(e);return this.listener.zn(t,r)}jn(e){const t={};t.database=Ec(this.serializer),t.addTarget=(function(i,o){let c;const u=o.target;if(c=tr(u)?{pipelineQuery:w4(i,u)}:W2(u)?{documents:g4(i,u)}:{query:_4(i,u).yt},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=ed(i,o.resumeToken);const h=gc(i,o.expectedCount);h!==null&&(c.expectedCount=h)}else if(o.snapshotVersion.compareTo(Q.min())>0){c.readTime=po(i,o.snapshotVersion.toTimestamp());const h=gc(i,o.expectedCount);h!==null&&(c.expectedCount=h)}return c})(this.serializer,e);const r=y4(this.serializer,e);r&&(t.labels=r),this.Bn(t)}Hn(e){const t={};t.database=Ec(this.serializer),t.removeTarget=e,this.Bn(t)}}class k4 extends hd{constructor(e,t,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}get Jn(){return this.Dn>0}start(){this.lastStreamToken=void 0,super.start()}qn(){this.Jn&&this.Yn([])}Qn(e,t){return this.connection.cn("Write",e,t)}Gn(e){return q(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,q(!e.writeResults||e.writeResults.length===0,55816),this.listener.Zn()}onNext(e){q(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.xn.reset();const t=m4(e.writeResults,e.commitTime),r=$t(e.commitTime);return this.listener.Xn(r,t)}er(){const e={};e.database=Ec(this.serializer),this.Bn(e)}Yn(e){const t={streamToken:this.lastStreamToken,writes:e.map((r=>p4(this.serializer,r)))};this.Bn(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D4{}class V4 extends D4{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.tr=!1}nr(){if(this.tr)throw new U(D.FAILED_PRECONDITION,"The client has already been terminated.")}Bt(e,t,r,s){return this.nr(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.Bt(e,_c(t,r),s,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===D.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new U(D.UNKNOWN,i.toString())}))}$t(e,t,r,s,i){return this.nr(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,c])=>this.connection.$t(e,_c(t,r),s,o,c,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===D.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new U(D.UNKNOWN,o.toString())}))}terminate(){this.tr=!0,this.connection.terminate()}}function L4(n,e,t,r){return new V4(n,e,t,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x4="ComponentProvider",eh=new Map;function M4(n,e,t,r,s){return new v7(n,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,ud(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const th={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},dd=41943040;class at{static withCacheSize(e){return new at(e,at.DEFAULT_COLLECTION_PERCENTILE,at.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}at.DEFAULT_COLLECTION_PERCENTILE=10,at.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,at.DEFAULT=new at(dd,at.DEFAULT_COLLECTION_PERCENTILE,at.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),at.DISABLED=new at(-1,0,0);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nh="LruGarbageCollector",fd=1048576;function rh([n,e],[t,r]){const s=ie(n,t);return s===0?ie(e,r):s}class U4{constructor(e){this.rr=e,this.buffer=new Oe(rh),this.ir=0}sr(){return++this.ir}_r(e){const t=[e,this.sr()];if(this.buffer.size<this.rr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();rh(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class F4{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.ur(6e4)}stop(){this.ar&&(this.ar.cancel(),this.ar=null)}get started(){return this.ar!==null}ur(e){H(nh,`Garbage collection scheduled in ${e}ms`),this.ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Hr(t)?H(nh,"Ignoring IndexedDB error during garbage collection: ",t):await $r(t)}await this.ur(3e5)}))}}class B4{constructor(e,t){this.cr=e,this.params=t}calculateTargetCount(e,t){return this.cr.lr(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return V.resolve(Do.ce);const r=new U4(t);return this.cr.forEachTarget(e,(s=>r._r(s.sequenceNumber))).next((()=>this.cr.Er(e,(s=>r._r(s))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.cr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.cr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(H("LruGarbageCollector","Garbage collection skipped; disabled"),V.resolve(th)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(H("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),th):this.hr(e,t)))}getCacheSize(e){return this.cr.getCacheSize(e)}hr(e,t){let r,s,i,o,c,u,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((p=>(p>this.params.maximumSequenceNumbersToCollect?(H("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,o=Date.now(),this.nthSequenceNumber(e,s)))).next((p=>(r=p,c=Date.now(),this.removeTargets(e,r,t)))).next((p=>(i=p,u=Date.now(),this.removeOrphanedDocuments(e,r)))).next((p=>(h=Date.now(),wr()<=oe.DEBUG&&H("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${p} documents in `+(h-u)+`ms
Total Duration: ${h-f}ms`),V.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p}))))}}function $4(n,e){return new B4(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pd="firestore.googleapis.com",sh=!0;class ih{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new U(D.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=pd,this.ssl=sh}else this.host=e.host,this.ssl=e.ssl??sh;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=dd;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<fd)throw new U(D.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}d7("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=ud(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new U(D.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new U(D.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new U(D.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class jo{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ih({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new U(D.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new U(D.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ih(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new n7;switch(r.type){case"firstParty":return new o7(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new U(D.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=eh.get(t);r&&(H(x4,"Removing Datastore"),eh.delete(t),r.terminate())})(this),Promise.resolve()}}function H4(n,e,t,r={}){n=Je(n,jo);const s=Gn(e),i=n._getSettings(),o={...i,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;s&&No(`https://${c}`),i.host!==pd&&i.host!==c&&kt("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:c,ssl:s,emulatorOptions:r};if(!kn(u,o)&&(n._setSettings(u),r.mockUserToken)){let h,f;if(typeof r.mockUserToken=="string")h=r.mockUserToken,f=Qe.MOCK_USER;else{h=o2(r.mockUserToken,n._app?.options.projectId);const p=r.mockUserToken.sub||r.mockUserToken.user_id;if(!p)throw new U(D.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");f=new Qe(p)}n._authCredentials=new r7(new y2(h,f))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Kn(this.firestore,e,this._query)}}class ge{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Pn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ge(this.firestore,e,this._key)}toJSON(){return{type:ge._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(ai(t,ge._jsonSchema))return new ge(e,r||null,new j(de.fromString(t.referencePath)))}}ge._jsonSchemaVersion="firestore/documentReference/1.0",ge._jsonSchema={type:Ne("string",ge._jsonSchemaVersion),referencePath:Ne("string")};class Pn extends Kn{constructor(e,t,r){super(e,t,Bo(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new ge(this.firestore,null,new j(e))}withConverter(e){return new Pn(this.firestore,e,this._path)}}function cE(n,e,...t){if(n=J(n),w2("collection","path",e),n instanceof jo){const r=de.fromString(e,...t);return Nl(r),new Pn(n,null,r)}{if(!(n instanceof ge||n instanceof Pn))throw new U(D.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(de.fromString(e,...t));return Nl(r),new Pn(n.firestore,null,r)}}function q4(n,e,...t){if(n=J(n),arguments.length===1&&(e=Lc.newId()),w2("doc","path",e),n instanceof jo){const r=de.fromString(e,...t);return bl(r),new ge(n,null,new j(r))}{if(!(n instanceof ge||n instanceof Pn))throw new U(D.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(de.fromString(e,...t));return bl(r),new ge(n.firestore,n instanceof Pn?n.converter:null,new j(r))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:ut._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(ai(e,ut._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new ut(e.vectorValues);throw new U(D.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}ut._jsonSchemaVersion="firestore/vectorValue/1.0",ut._jsonSchema={type:Ne("string",ut._jsonSchemaVersion),vectorValues:Ne("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const j4=/^__.*__$/;class G4{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new zn(e,this.data,this.fieldMask,t,this.fieldTransforms):new ui(e,this.data,t,this.fieldTransforms)}}class md{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new zn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function gd(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw W(40011,{dataSource:n})}}class jc{constructor(e,t,r,s,i,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.validatePath(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new jc({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){const t=this.path?.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePathSegment(e),r}childContextForFieldPath(e){const t=this.path?.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePath(),r}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return go(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(e.length===0)throw this.createError("Document fields must not be empty");if(gd(this.dataSource)&&j4.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class W4{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Ho(e)}createContext(e,t,r,s=!1){return new jc({dataSource:e,methodName:t,targetDoc:r,path:Me.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Go(n){const e=n._freezeSettings(),t=Ho(n._databaseId);return new W4(n._databaseId,!!e.ignoreUndefinedProperties,t)}function _d(n,e,t,r,s,i={}){const o=n.createContext(i.merge||i.mergeFields?2:0,e,t,s);zc("Data must be an object, but it was:",o,r);const c=Ed(r,o);let u,h;if(i.merge)u=new gt(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const w=Fn(e,p,t);if(!o.contains(w))throw new U(D.INVALID_ARGUMENT,`Field '${w}' is specified in your field mask but missing from your input data.`);Id(f,w)||f.push(w)}u=new gt(f),h=o.fieldTransforms.filter((p=>u.covers(p.field)))}else u=null,h=o.fieldTransforms;return new G4(new it(c),u,h)}class Wo extends di{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.createError(`${this._methodName}() can only appear at the top level of your update data`):e.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Wo}}class Gc extends di{_toFieldTransform(e){return new L2(e.path,new Gs)}isEqual(e){return e instanceof Gc}}class Wc extends di{constructor(e,t){super(e),this.Pr=t}_toFieldTransform(e){const t=new Mr(e.serializer,Mo(e.serializer,this.Pr));return new L2(e.path,t)}isEqual(e){return e instanceof Wc&&(this.Pr===e.Pr||Number.isNaN(this.Pr)&&Number.isNaN(e.Pr))}}function z4(n,e,t,r){const s=n.createContext(1,e,t);zc("Data must be an object, but it was:",s,r);const i=[],o=it.empty();Wn(r,((u,h)=>{const f=wd(e,u,t);h=J(h);const p=s.childContextForFieldPath(f);if(h instanceof Wo)i.push(f);else{const w=Un(h,p);w!=null&&(i.push(f),o.set(f,w))}}));const c=new gt(i);return new md(o,c,s.fieldTransforms)}function K4(n,e,t,r,s,i){const o=n.createContext(1,e,t),c=[Fn(e,r,t)],u=[s];if(i.length%2!=0)throw new U(D.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let w=0;w<i.length;w+=2)c.push(Fn(e,i[w])),u.push(i[w+1]);const h=[],f=it.empty();for(let w=c.length-1;w>=0;--w)if(!Id(h,c[w])){const b=c[w];let P=u[w];P=J(P);const L=o.childContextForFieldPath(b);if(P instanceof Wo)h.push(b);else{const x=Un(P,L);x!=null&&(h.push(b),f.set(b,x))}}const p=new gt(h);return new md(f,p,o.fieldTransforms)}function Y4(n,e,t,r=!1){return Un(t,n.createContext(r?4:3,e))}function Un(n,e,t){if(yd(n=J(n)))return zc("Unsupported field value:",e,n),Ed(n,e);if(n instanceof di)return(function(s,i){if(!gd(i.dataSource))throw i.createError(`${s._methodName}() can only be used with update() and set()`);if(!i.path)throw i.createError(`${s._methodName}() is not currently supported inside arrays`);const o=s._toFieldTransform(i);o&&i.fieldTransforms.push(o)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.createError("Nested arrays are not supported");return(function(s,i){const o=[];let c=0;for(const u of s){let h=Un(u,i.childContextForArray(c));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),c++}return{arrayValue:{values:o}}})(n,e)}return(function(s,i,o){if((s=J(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return Mo(i.serializer,s,o);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const c=me.fromDate(s);return{timestampValue:po(i.serializer,c)}}if(s instanceof me){const c=new me(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:po(i.serializer,c)}}if(s instanceof Ht)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof Tt)return{bytesValue:ed(i.serializer,s._byteString)};if(s instanceof ge){const c=i.databaseId,u=s.firestore._databaseId;if(!u.isEqual(c))throw i.createError(`Document reference is for database ${u.projectId}/${u.database} but should be for database ${c.projectId}/${c.database}`);return{referenceValue:qc(s.firestore._databaseId||i.databaseId,s._key.path)}}if(s instanceof ut)return(function(u,h){const f=u instanceof ut?u.toArray():u;return{mapValue:{fields:{[P2]:{stringValue:b2},[qs]:{arrayValue:{values:f.map((w=>{if(typeof w!="number")throw h.createError("VectorValues must only contain numeric values.");return xo(h.serializer,w)}))}}}}}})(s,i);if(ad(s))return s._toProto(i.serializer);throw i.createError(`Unsupported field value: ${ko(s)}`)})(n,e,t)}function Ed(n,e){const t={};return T2(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Wn(n,((r,s)=>{const i=Un(s,e.childContextForField(r));i!=null&&(t[r]=i)})),{mapValue:{fields:t}}}function yd(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof me||n instanceof Ht||n instanceof Tt||n instanceof ge||n instanceof di||n instanceof ut||ad(n))}function zc(n,e,t){if(!yd(t)||!oi(t)){const r=ko(t);throw r==="an object"?e.createError(n+" a custom object"):e.createError(n+" "+r)}}function Fn(n,e,t){if((e=J(e))instanceof qo)return e._internalPath;if(typeof e=="string")return wd(n,e);throw go("Field path arguments must be of type string or ",n,!1,void 0,t)}const Q4=new RegExp("[~\\*/\\[\\]]");function wd(n,e,t){if(e.search(Q4)>=0)throw go(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new qo(...e.split("."))._internalPath}catch{throw go(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function go(n,e,t,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${r}`),o&&(u+=` in document ${s}`),u+=")"),new U(D.INVALID_ARGUMENT,c+n+u)}function Id(n,e){return n.some((t=>t.isEqual(e)))}function Td(n){return typeof n._readUserData=="function"}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(e){this.optionDefinitions=e}_getKnownOptions(e,t){const r=it.empty();for(const s in this.optionDefinitions)if(this.optionDefinitions.hasOwnProperty(s)){const i=this.optionDefinitions[s];if(s in e){const o=e[s];let c;i.nestedOptions&&oi(o)?c={mapValue:{fields:new et(i.nestedOptions).getOptionsProto(t,o)}}:o&&(c=Un(o,t)??void 0),c&&r.set(Me.fromServerFormat(i.serverName),c)}}return r}getOptionsProto(e,t,r){const s=this._getKnownOptions(t,e);if(r){const i=new Map(A7(r,((o,c)=>[Me.fromServerFormat(c),o!==void 0?Un(o,e):null])));s.setAll(i)}return s.value.mapValue.fields??{}}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function X4(n){return typeof n=="object"&&n!==null&&!!("nullValue"in n&&(n.nullValue===null||n.nullValue==="NULL_VALUE")||"booleanValue"in n&&(n.booleanValue===null||typeof n.booleanValue=="boolean")||"integerValue"in n&&(n.integerValue===null||typeof n.integerValue=="number"||typeof n.integerValue=="string")||"doubleValue"in n&&(n.doubleValue===null||typeof n.doubleValue=="number")||"timestampValue"in n&&(n.timestampValue===null||(function(t){return typeof t=="object"&&t!==null&&"seconds"in t&&(t.seconds===null||typeof t.seconds=="number"||typeof t.seconds=="string")&&"nanos"in t&&(t.nanos===null||typeof t.nanos=="number")})(n.timestampValue))||"stringValue"in n&&(n.stringValue===null||typeof n.stringValue=="string")||"bytesValue"in n&&(n.bytesValue===null||n.bytesValue instanceof Uint8Array)||"referenceValue"in n&&(n.referenceValue===null||typeof n.referenceValue=="string")||"geoPointValue"in n&&(n.geoPointValue===null||(function(t){return typeof t=="object"&&t!==null&&"latitude"in t&&(t.latitude===null||typeof t.latitude=="number")&&"longitude"in t&&(t.longitude===null||typeof t.longitude=="number")})(n.geoPointValue))||"arrayValue"in n&&(n.arrayValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("values"in t)||t.values!==null&&!Array.isArray(t.values))})(n.arrayValue))||"mapValue"in n&&(n.mapValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("fields"in t)||t.fields!==null&&!oi(t.fields))})(n.mapValue))||"fieldReferenceValue"in n&&(n.fieldReferenceValue===null||typeof n.fieldReferenceValue=="string")||"functionValue"in n&&(n.functionValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("name"in t)||t.name!==null&&typeof t.name!="string"||!("args"in t)||t.args!==null&&!Array.isArray(t.args))})(n.functionValue))||"pipelineValue"in n&&(n.pipelineValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("stages"in t)||t.stages!==null&&!Array.isArray(t.stages))})(n.pipelineValue)))}function uE(){return new Gc("serverTimestamp")}function lE(n){return new Wc("increment",n)}function J4(n){return new ut(n)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M(n){let e;return n instanceof mr?n:(e=oi(n)?rm(n):n instanceof Array?sm(n):Ad(n,void 0),e)}function za(n){if(n instanceof mr)return n;if(n instanceof ut)return Qs(n);if(Array.isArray(n))return Qs(J4(n));throw new Error("Unsupported value: "+typeof n)}function Kc(n){return w7(n)?Ji(n):M(n)}class mr{constructor(){this._protoValueType="ProtoValue"}add(e){return new k("add",[this,M(e)],"add")}asBoolean(){if(this instanceof Bn)return this;if(this instanceof Gr)return new vd(this);if(this instanceof jr)return new nm(this);if(this instanceof k)return new Rd(this);throw new U("invalid-argument",`Conversion of type ${typeof this} to BooleanExpression not supported.`)}subtract(e){return new k("subtract",[this,M(e)],"subtract")}multiply(e){return new k("multiply",[this,M(e)],"multiply")}divide(e){return new k("divide",[this,M(e)],"divide")}mod(e){return new k("mod",[this,M(e)],"mod")}equal(e){return new k("equal",[this,M(e)],"equal").asBoolean()}notEqual(e){return new k("not_equal",[this,M(e)],"notEqual").asBoolean()}lessThan(e){return new k("less_than",[this,M(e)],"lessThan").asBoolean()}lessThanOrEqual(e){return new k("less_than_or_equal",[this,M(e)],"lessThanOrEqual").asBoolean()}greaterThan(e){return new k("greater_than",[this,M(e)],"greaterThan").asBoolean()}greaterThanOrEqual(e){return new k("greater_than_or_equal",[this,M(e)],"greaterThanOrEqual").asBoolean()}arrayConcat(e,...t){const r=[e,...t].map((s=>M(s)));return new k("array_concat",[this,...r],"arrayConcat")}arrayContains(e){return new k("array_contains",[this,M(e)],"arrayContains").asBoolean()}arrayContainsAll(e){const t=Array.isArray(e)?new Is(e.map(M),"arrayContainsAll"):e;return new k("array_contains_all",[this,t],"arrayContainsAll").asBoolean()}arrayContainsAny(e){const t=Array.isArray(e)?new Is(e.map(M),"arrayContainsAny"):e;return new k("array_contains_any",[this,t],"arrayContainsAny").asBoolean()}arrayReverse(){return new k("array_reverse",[this])}arrayLength(){return new k("array_length",[this],"arrayLength")}equalAny(e){const t=Array.isArray(e)?new Is(e.map(M),"equalAny"):e;return new k("equal_any",[this,t],"equalAny").asBoolean()}notEqualAny(e){const t=Array.isArray(e)?new Is(e.map(M),"notEqualAny"):e;return new k("not_equal_any",[this,t],"notEqualAny").asBoolean()}exists(){return new k("exists",[this],"exists").asBoolean()}charLength(){return new k("char_length",[this],"charLength")}like(e){return new k("like",[this,M(e)],"like").asBoolean()}regexContains(e){return new k("regex_contains",[this,M(e)],"regexContains").asBoolean()}regexFind(e){return new k("regex_find",[this,M(e)],"regexFind")}regexFindAll(e){return new k("regex_find_all",[this,M(e)],"regexFindAll")}regexMatch(e){return new k("regex_match",[this,M(e)],"regexMatch").asBoolean()}stringContains(e){return new k("string_contains",[this,M(e)],"stringContains").asBoolean()}startsWith(e){return new k("starts_with",[this,M(e)],"startsWith").asBoolean()}endsWith(e){return new k("ends_with",[this,M(e)],"endsWith").asBoolean()}toLower(){return new k("to_lower",[this],"toLower")}toUpper(){return new k("to_upper",[this],"toUpper")}trim(e){const t=[this];return e&&t.push(M(e)),new k("trim",t,"trim")}ltrim(e){const t=[this];return e&&t.push(M(e)),new k("ltrim",t,"ltrim")}rtrim(e){const t=[this];return e&&t.push(M(e)),new k("rtrim",t,"rtrim")}type(){return new k("type",[this])}isType(e){return new k("is_type",[this,Qs(e)],"isType").asBoolean()}stringConcat(e,...t){const r=[e,...t].map(M);return new k("string_concat",[this,...r],"stringConcat")}stringIndexOf(e){return new k("string_index_of",[this,M(e)],"stringIndexOf")}stringRepeat(e){return new k("string_repeat",[this,M(e)],"stringRepeat")}stringReplaceAll(e,t){return new k("string_replace_all",[this,M(e),M(t)],"stringReplaceAll")}stringReplaceOne(e,t){return new k("string_replace_one",[this,M(e),M(t)],"stringReplaceOne")}concat(e,...t){const r=[e,...t].map(M);return new k("concat",[this,...r],"concat")}reverse(){return new k("reverse",[this],"reverse")}arrayFilter(e,t){return new k("array_filter",[this,M(e),t],"arrayFilter")}arrayTransform(e,t){return new k("array_transform",[this,M(e),t],"arrayTransform")}arrayTransformWithIndex(e,t,r){return new k("array_transform",[this,M(e),M(t),r],"arrayTransformWithIndex")}arraySlice(e,t){const r=[this,M(e)];return t!==void 0&&r.push(M(t)),new k("array_slice",r,"arraySlice")}arrayFirst(){return new k("array_first",[this],"arrayFirst")}arrayFirstN(e){return new k("array_first_n",[this,M(e)],"arrayFirstN")}arrayLast(){return new k("array_last",[this],"arrayLast")}arrayLastN(e){return new k("array_last_n",[this,M(e)],"arrayLastN")}arrayMaximum(){return new k("maximum",[this],"arrayMaximum")}arrayMaximumN(e){return new k("maximum_n",[this,M(e)],"arrayMaximumN")}arrayMinimum(){return new k("minimum",[this],"arrayMinimum")}arrayMinimumN(e){return new k("minimum_n",[this,M(e)],"arrayMinimumN")}arrayIndexOf(e){return new k("array_index_of",[this,M(e),M("first")],"arrayIndexOf")}arrayLastIndexOf(e){return new k("array_index_of",[this,M(e),M("last")],"arrayLastIndexOf")}arrayIndexOfAll(e){return new k("array_index_of_all",[this,M(e)],"arrayIndexOfAll")}byteLength(){return new k("byte_length",[this],"byteLength")}ceil(){return new k("ceil",[this])}floor(){return new k("floor",[this])}abs(){return new k("abs",[this])}exp(){return new k("exp",[this])}mapGet(e){return new k("map_get",[this,Qs(e)],"mapGet")}mapSet(e,t,...r){const s=[this,M(e),M(t),...r.map(M)];return new k("map_set",s,"mapSet")}mapKeys(){return new k("map_keys",[this],"mapKeys")}mapValues(){return new k("map_values",[this],"mapValues")}mapEntries(){return new k("map_entries",[this],"mapEntries")}getField(e){return new k("get_field",[this,M(e)],"get_field")}count(){return mt._create("count",[this],"count")}sum(){return mt._create("sum",[this],"sum")}average(){return mt._create("average",[this],"average")}minimum(){return mt._create("minimum",[this],"minimum")}maximum(){return mt._create("maximum",[this],"maximum")}first(){return mt._create("first",[this],"first")}last(){return mt._create("last",[this],"last")}arrayAgg(){return mt._create("array_agg",[this],"arrayAgg")}arrayAggDistinct(){return mt._create("array_agg_distinct",[this],"arrayAggDistinct")}countDistinct(){return mt._create("count_distinct",[this],"countDistinct")}logicalMaximum(e,...t){const r=[e,...t];return new k("maximum",[this,...r.map(M)],"logicalMaximum")}logicalMinimum(e,...t){const r=[e,...t];return new k("minimum",[this,...r.map(M)],"minimum")}vectorLength(){return new k("vector_length",[this],"vectorLength")}cosineDistance(e){return new k("cosine_distance",[this,za(e)],"cosineDistance")}dotProduct(e){return new k("dot_product",[this,za(e)],"dotProduct")}euclideanDistance(e){return new k("euclidean_distance",[this,za(e)],"euclideanDistance")}unixMicrosToTimestamp(){return new k("unix_micros_to_timestamp",[this],"unixMicrosToTimestamp")}timestampToUnixMicros(){return new k("timestamp_to_unix_micros",[this],"timestampToUnixMicros")}unixMillisToTimestamp(){return new k("unix_millis_to_timestamp",[this],"unixMillisToTimestamp")}timestampToUnixMillis(){return new k("timestamp_to_unix_millis",[this],"timestampToUnixMillis")}unixSecondsToTimestamp(){return new k("unix_seconds_to_timestamp",[this],"unixSecondsToTimestamp")}timestampToUnixSeconds(){return new k("timestamp_to_unix_seconds",[this],"timestampToUnixSeconds")}timestampAdd(e,t){return new k("timestamp_add",[this,M(e),M(t)],"timestampAdd")}timestampSubtract(e,t){return new k("timestamp_subtract",[this,M(e),M(t)],"timestampSubtract")}timestampDiff(e,t){return new k("timestamp_diff",[this,Kc(e),M(t)],"timestampDiff")}timestampExtract(e,t){const r=[this,M(e)];return t&&r.push(M(t)),new k("timestamp_extract",r,"timestampExtract")}documentId(){return new k("document_id",[this],"documentId")}parent(){return new k("parent",[this],"parent")}substring(e,t){const r=M(e);return new k("substring",t===void 0?[this,r]:[this,r,M(t)],"substring")}arrayGet(e){return new k("array_get",[this,M(e)],"arrayGet")}isError(){return new k("is_error",[this],"isError").asBoolean()}ifError(e){const t=new k("if_error",[this,M(e)],"ifError");return e instanceof Bn?t.asBoolean():t}isAbsent(){return new k("is_absent",[this],"isAbsent").asBoolean()}mapRemove(e){return new k("map_remove",[this,M(e)],"mapRemove")}mapMerge(e,...t){const r=M(e),s=t.map(M);return new k("map_merge",[this,r,...s],"mapMerge")}pow(e){return new k("pow",[this,M(e)])}trunc(e){return e===void 0?new k("trunc",[this]):new k("trunc",[this,M(e)],"trunc")}round(e){return e===void 0?new k("round",[this]):new k("round",[this,M(e)],"round")}collectionId(){return new k("collection_id",[this])}length(){return new k("length",[this])}ln(){return new k("ln",[this])}sqrt(){return new k("sqrt",[this])}stringReverse(){return new k("string_reverse",[this])}ifAbsent(e){return new k("if_absent",[this,M(e)],"ifAbsent")}ifNull(e){return new k("if_null",[this,M(e)],"ifNull")}coalesce(e,...t){return new k("coalesce",[this,M(e),...t.map(M)],"coalesce")}join(e){return new k("join",[this,M(e)],"join")}log10(){return new k("log10",[this])}arraySum(){return new k("sum",[this])}split(e){return new k("split",[this,M(e)])}timestampTruncate(e,t){const r=[this,M(e)];return t&&r.push(M(t)),new k("timestamp_trunc",r)}ascending(){return im(this)}descending(){return om(this)}as(e){return new em(this,e,"as")}}class mt{constructor(e,t){this.name=e,this.params=t,this.exprType="AggregateFunction",this._protoValueType="ProtoValue"}static _create(e,t,r){const s=new mt(e,t);return s._methodName=r,s}as(e){return new Z4(this,e,"as")}_toProto(e){return{functionValue:{name:this.name,args:this.params.map((t=>t._toProto(e)))}}}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach((t=>t._readUserData(e)))}}class Z4{constructor(e,t,r){this.aggregate=e,this.alias=t,this._methodName=r}_readUserData(e){this.aggregate._readUserData(e)}}class em{constructor(e,t,r){this.expr=e,this.alias=t,this._methodName=r,this.exprType="AliasedExpression",this.selectable=!0}_readUserData(e){this.expr._readUserData(e)}}class Is extends mr{constructor(e,t){super(),this.Rr=e,this._methodName=t,this.expressionType="ListOfExpressions"}_toProto(e){return{arrayValue:{values:this.Rr.map((t=>t._toProto(e)))}}}_readUserData(e){this.Rr.forEach((t=>t._readUserData(e)))}}class jr extends mr{constructor(e,t){super(),this.fieldPath=e,this._methodName=t,this.expressionType="Field",this.selectable=!0}get _fieldPath(){return this.fieldPath}get fieldName(){return this.fieldPath.canonicalString()}get alias(){return this.fieldName}get expr(){return this}geoDistance(e){return new k("geo_distance",[this,M(e)],"geoDistance")}_toProto(e){return{fieldReferenceValue:this.fieldPath.canonicalString()}}_readUserData(e){}}function Ji(n){return tm(n,"field")}function tm(n,e){return new jr(typeof n=="string"?Mt===n?v4()._internalPath:Fn("field",n):n._internalPath,e)}class Gr extends mr{constructor(e,t){super(),this.value=e,this._methodName=t,this.expressionType="Constant"}static _fromProto(e){const t=new Gr(e,void 0);return t._protoValue=e,t}_toProto(e){return q(this._protoValue!==void 0,237),this._protoValue}_getValue(){return this._protoValue}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,X4(this._protoValue)||(this._protoValue=Un(this.value,e))}}function Qs(n,e){return Ad(n,"constant")}function Ad(n,e){const t=new Gr(n,e);return typeof n=="boolean"?new vd(t):t}class k extends mr{constructor(e,t,r,s){super(),this.name=e,this.params=t,this.expressionType="Function",this._optionsProto=void 0,r!==void 0&&(this._methodName=r),s!==void 0&&(this._options=s)}get _optionsUtil(){return new et({})}_toProto(e){const t={functionValue:{name:this.name,args:this.params.map((r=>r._toProto(e)))}};return this._optionsProto&&(t.functionValue.options=this._optionsProto),t}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach((t=>t._readUserData(e))),this._options&&(this._optionsProto=this._optionsUtil.getOptionsProto(e,this._options))}}class Bn extends mr{get _methodName(){return this._expr._methodName}countIf(){return mt._create("count_if",[this],"countIf")}not(){return new k("not",[this],"not").asBoolean()}conditional(e,t){return new k("conditional",[this,e,t],"conditional")}ifError(e){const t=M(e),r=new k("if_error",[this,t],"ifError");return t instanceof Bn?r.asBoolean():r}_toProto(e){return this._expr._toProto(e)}_readUserData(e){this._expr._readUserData(e)}}class Rd extends Bn{constructor(e){super(),this._expr=e,this.expressionType="Function"}}class vd extends Bn{constructor(e){super(),this._expr=e,this.expressionType="Constant"}_getValue(){return this._expr._getValue()}}class nm extends Bn{constructor(e){super(),this._expr=e,this.expressionType="Field"}}function rm(n,e){const t=[];for(const r in n)if(Object.prototype.hasOwnProperty.call(n,r)){const s=n[r];t.push(Qs(r)),t.push(M(s))}return new k("map",t,"map")}function sm(n){return(function(t,r){return new k("array",t.map((s=>M(s))),r)})(n,"array")}function im(n){return new Cd(Kc(n),"ascending","ascending")}function om(n){return new Cd(Kc(n),"descending","descending")}class Cd{constructor(e,t,r){this.expr=e,this.direction=t,this._methodName=r,this._protoValueType="ProtoValue"}_toProto(e){return{mapValue:{fields:{direction:cd(this.direction),expression:this.expr._toProto(e)}}}}_readUserData(e){this.expr._readUserData(e)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt{constructor(e){this.optionsProto=void 0,{rawOptions:this.rawOptions,...this.knownOptions}=e}_readUserData(e){this.optionsProto=this._optionsUtil.getOptionsProto(e,this.knownOptions,this.rawOptions)}_toProto(e){return{name:this._name,options:this.optionsProto}}}class Sd extends yt{get _name(){return"add_fields"}get _optionsUtil(){return new et({})}constructor(e,t){super(t),this.fields=e}_toProto(e){return{...super._toProto(e),args:[Ys(e,this.fields)]}}_readUserData(e){super._readUserData(e),$n(this.fields,e)}}class Pd extends yt{get _name(){return"aggregate"}get _optionsUtil(){return new et({})}constructor(e,t,r){super(r),this.groups=e,this.accumulators=t}_toProto(e){return{...super._toProto(e),args:[Ys(e,this.accumulators),Ys(e,this.groups)]}}_readUserData(e){super._readUserData(e),$n(this.groups,e),$n(this.accumulators,e)}}class bd extends yt{get _name(){return"distinct"}get _optionsUtil(){return new et({})}constructor(e,t){super(t),this.groups=e}_toProto(e){return{...super._toProto(e),args:[Ys(e,this.groups)]}}_readUserData(e){super._readUserData(e),$n(this.groups,e)}}class zo extends yt{get _name(){return"collection"}get _optionsUtil(){return new et({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.Vr=e.startsWith("/")?e:"/"+e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:this.Vr}]}}_readUserData(e){super._readUserData(e)}}class Ko extends yt{get _name(){return"collection_group"}get _optionsUtil(){return new et({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.collectionId=e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:""},{stringValue:this.collectionId}]}}_readUserData(e){super._readUserData(e)}}class Yc extends yt{get _name(){return"database"}get _optionsUtil(){return new et({})}_toProto(e){return{...super._toProto(e)}}_readUserData(e){super._readUserData(e)}}class Qc extends yt{get _name(){return"documents"}get _optionsUtil(){return new et({})}constructor(e,t){if(super(t),!e||e.length===0)throw new U(D.INVALID_ARGUMENT,"Empty document paths are not allowed in DocumentsSource");const r=e.map((i=>i.startsWith("/")?i:"/"+i)),s=new Set(r);if(s.size!==r.length)throw new U(D.INVALID_ARGUMENT,"Duplicate document paths are not allowed in DocumentsSource");this.dr=r,this.mr=s}_toProto(e){return{...super._toProto(e),args:this.dr.map((t=>({referenceValue:t})))}}_readUserData(e){super._readUserData(e)}}class Yo extends yt{get _name(){return"where"}get _optionsUtil(){return new et({})}constructor(e,t){super(t),this.condition=e}_toProto(e){return{...super._toProto(e),args:[this.condition._toProto(e)]}}_readUserData(e){super._readUserData(e),$n(this.condition,e)}}class lr extends yt{get _name(){return"limit"}get _optionsUtil(){return new et({})}constructor(e,t){q(!isNaN(e)&&e!==1/0&&e!==-1/0,34860),super(t),this.limit=e}_toProto(e){return{...super._toProto(e),args:[Mo(e,this.limit)]}}}class oh extends yt{get _name(){return"offset"}get _optionsUtil(){return new et({})}constructor(e,t){super(t),this.offset=e}_toProto(e){return{...super._toProto(e),args:[Mo(e,this.offset)]}}}class am extends yt{get _name(){return"select"}get _optionsUtil(){return new et({})}constructor(e,t){super(t),this.selections=e}_toProto(e){return{...super._toProto(e),args:[Ys(e,this.selections)]}}_readUserData(e){super._readUserData(e),$n(this.selections,e)}}class Xt extends yt{get _name(){return"sort"}get _optionsUtil(){return new et({})}constructor(e,t){super(t),this.orderings=e}_toProto(e){return{...super._toProto(e),args:this.orderings.map((t=>t._toProto(e)))}}_readUserData(e){super._readUserData(e),$n(this.orderings,e)}}class Xc extends yt{get _name(){return"replace_with"}get _optionsUtil(){return new et({})}constructor(e,t){super(t),this.map=e}_toProto(e){return{...super._toProto(e),args:[this.map._toProto(e),cd(Xc.pr)]}}_readUserData(e){super._readUserData(e),$n(this.map,e)}}Xc.pr="full_replace";function $n(n,e){return Td(n)?n._readUserData(e):Array.isArray(n)?n.forEach((t=>t._readUserData(e))):n instanceof Map?n.forEach((t=>t._readUserData(e))):Object.values(n).forEach((t=>t._readUserData(e))),n}// Copyright 2024 Google LLC* @license
class st{constructor(e,t,r){this.serializer=e,this.stages=t,this.listenOptions=r,this.isCorePipeline=!0}getPipelineCollection(){return Qo(this)}getPipelineCollectionGroup(){return Jc(this)}getPipelineCollectionId(){return cm(this)}getPipelineDocuments(){return wc(this)}getPipelineFlavor(){return(function(t){let r="exact";return t.stages.forEach(((s,i)=>{s._name!==bd.name&&s._name!==Pd.name||(r="keyless"),s._name===am.name&&r==="exact"&&(r="augmented"),s._name===Sd.name&&i<t.stages.length-1&&r==="exact"&&(r="augmented")})),r})(this)}getPipelineSourceType(){return bn(this)}}function bn(n){const e=n.stages[0];return e instanceof zo||e instanceof Ko||e instanceof Yc||e instanceof Qc?e._name:"unknown"}function Qo(n){if(bn(n)==="collection")return n.stages[0].Vr}function Jc(n){if(bn(n)==="collection_group")return n.stages[0].collectionId}function cm(n){switch(bn(n)){case"collection":return de.fromString(Qo(n)).lastSegment();case"collection_group":return Jc(n);default:return}}function wc(n){if(bn(n)==="documents")return n.stages[0].dr}class Os{constructor(e,t,r,s){this._db=e,this.userDataReader=t,this._userDataWriter=r,this.stages=s}wr(e,t){const r=this.userDataReader.createContext(3,e);return Td(t)?t._readUserData(r):Array.isArray(t)?t.forEach((s=>s._readUserData(r))):t.forEach((s=>s._readUserData(r))),t}where(e){const t=this.stages.map((r=>r));return this.wr("where",e),t.push(new Yo(e,{})),new Os(this._db,this.userDataReader,this._userDataWriter,t)}limit(e){const t=this.stages.map((r=>r));return t.push(new lr(e,{})),new Os(this._db,this.userDataReader,this._userDataWriter,t)}sort(e,...t){const r=this.stages.map((s=>s));return"orderings"in e?r.push(new Xt(this.wr("sort",e.orderings),{})):r.push(new Xt(this.wr("sort",[e,...t]),{})),new Os(this._db,this.userDataReader,this._userDataWriter,r)}br(e){return{pipeline:{stages:this.stages.map((t=>t._toProto(e)))}}}}// Copyright 2024 Google LLC* @license
class T{constructor(e,t){this.type=e,this.value=t}static vr(){return new T("ERROR",void 0)}static Sr(){return new T("UNSET",void 0)}static Dr(){return new T("NULL",Vr)}static newValue(e){return _t(e)?new T("NULL",Vr):(function(r){return!!r&&"booleanValue"in r})(e)?new T("BOOLEAN",e):Ut(e)?new T("INT",e):nr(e)?new T("DOUBLE",e):(function(r){return!!r&&"timestampValue"in r&&!!r.timestampValue})(e)?new T("TIMESTAMP",e):(function(r){return!!r&&"stringValue"in r})(e)?new T("STRING",e):(function(r){return!!r&&"bytesValue"in r})(e)?new T("BYTES",e):e.referenceValue?new T("REFERENCE",e):e.geoPointValue?new T("GEO_POINT",e):xr(e)?new T("ARRAY",e):co(e)?new T("VECTOR",e):rr(e)?new T("MAP",e):new T("ERROR",void 0)}Cr(){return this.type==="ERROR"||this.type==="UNSET"}Fr(){return this.type==="NULL"}}function ks(n){if(!n.Cr())return n.value}function Nd(n){return n instanceof Bn?n._expr:n}function K(n){if((n=Nd(n))instanceof jr)return new um(n);if(n instanceof Gr)return new lm(n);if(n instanceof Is)return new hm(n);if(n instanceof k){if(n.name==="add")return new pm(n);if(n.name==="subtract")return new mm(n);if(n.name==="multiply")return new gm(n);if(n.name==="divide")return new _m(n);if(n.name==="mod")return new Em(n);if(n.name==="and")return new ym(n);if(n.name==="equal")return new Om(n);if(n.name==="not_equal")return new km(n);if(n.name==="less_than")return new Dm(n);if(n.name==="less_than_or_equal")return new Vm(n);if(n.name==="greater_than")return new Lm(n);if(n.name==="greater_than_or_equal")return new xm(n);if(n.name==="array_concat")return new Mm(n);if(n.name==="array_reverse")return new Um(n);if(n.name==="array_contains")return new Fm(n);if(n.name==="array_contains_all")return new Bm(n);if(n.name==="array_contains_any")return new $m(n);if(n.name==="array_length")return new Hm(n);if(n.name==="array_element")return new qm(n);if(n.name==="equal_any")return new Od(n);if(n.name==="not_equal_any")return new Im(n);if(n.name==="is_nan")return new Tm(n);if(n.name==="is_not_nan")return new Am(n);if(n.name==="is_null")return new Rm(n);if(n.name==="is_not_null")return new vm(n);if(n.name==="is_error")return new Cm(n);if(n.name==="exists")return new Sm(n);if(n.name==="not")return new Xo(n);if(n.name==="or")return new wm(n);if(n.name==="xor")return new Zc(n);if(n.name==="conditional")return new Pm(n);if(n.name==="maximum")return new bm(n);if(n.name==="minimum")return new Nm(n);if(n.name==="reverse")return new jm(n);if(n.name==="replace_first")return new Gm(n);if(n.name==="replace_all")return new Wm(n);if(n.name==="char_length")return new zm(n);if(n.name==="byte_length")return new Km(n);if(n.name==="like")return new Ym(n);if(n.name==="regex_contains")return new Qm(n);if(n.name==="regex_match")return new Xm(n);if(n.name==="string_contains")return new Jm(n);if(n.name==="starts_with")return new Zm(n);if(n.name==="ends_with")return new eg(n);if(n.name==="to_lower")return new tg(n);if(n.name==="to_upper")return new ng(n);if(n.name==="trim")return new rg(n);if(n.name==="string_concat")return new sg(n);if(n.name==="map_get")return new ig(n);if(n.name==="cosine_distance")return new og(n);if(n.name==="dot_product")return new ag(n);if(n.name==="euclidean_distance")return new cg(n);if(n.name==="vector_length")return new ug(n);if(n.name==="unix_micros_to_timestamp")return new pg(n);if(n.name==="timestamp_to_unix_micros")return new _g(n);if(n.name==="unix_millis_to_timestamp")return new mg(n);if(n.name==="timestamp_to_unix_millis")return new Eg(n);if(n.name==="unix_seconds_to_timestamp")return new gg(n);if(n.name==="timestamp_to_unix_seconds")return new yg(n);if(n.name==="timestamp_add")return new wg(n);if(n.name==="timestamp_subtract")return new Ig(n)}throw new Error(`Unknown Expr : ${n}`)}class um{constructor(e){this.expr=e}evaluate(e,t){if(this.expr.fieldName===Mt)return T.newValue({referenceValue:mo(e.serializer,t.key)});if(this.expr.fieldName==="__update_time__")return T.newValue({timestampValue:Xi(e.serializer,t.version)});if(this.expr.fieldName==="__create_time__")return T.newValue({timestampValue:Xi(e.serializer,t.createTime)});const r=t.data.field(this.expr._fieldPath);return r?Lo(r)?T.newValue((function(i,o){if(i.serverTimestampBehavior==="estimate")return{timestampValue:Xi(i.serializer,Q.fromTimestamp(Dr(o)))};if(i.serverTimestampBehavior==="previous"){const c=ci(o);if(c)return c}return{nullValue:"NULL_VALUE"}})(e,r)):T.newValue(r):T.Sr()}}class lm{constructor(e){this.expr=e}evaluate(e,t){return T.newValue(this.expr._getValue())}}class hm{constructor(e){this.expr=e}evaluate(e,t){const r=this.expr.Rr.map((s=>K(s).evaluate(e,t)));return r.some((s=>s.Cr()))?T.vr():T.newValue({arrayValue:{values:r.map((s=>s.value))}})}}function We(n){return nr(n)?Number(n.doubleValue):Number(n.integerValue)}function qt(n){return BigInt(n.integerValue)}const dm=BigInt("0x7fffffffffffffff"),fm=-BigInt("0x8000000000000000");class fi{constructor(e){this.expr=e}evaluate(e,t){q(this.expr.params.length>=2,24778);const r=K(this.expr.params[0]).evaluate(e,t),s=K(this.expr.params[1]).evaluate(e,t);let i=this.Or(r,s);for(const o of this.expr.params.slice(2)){const c=K(o).evaluate(e,t);i=this.Or(i,c)}return i}Or(e,t){if(e.Cr()||t.Cr())return T.vr();if(e.Fr()||t.Fr())return T.Dr();const r=e.value,s=t.value;if(!nr(r)&&!Ut(r)||!nr(s)&&!Ut(s))return T.vr();if(nr(r)||nr(s)){const i=this.Mr(r,s);return i?T.newValue(i):T.vr()}if(Ut(r)&&Ut(s)){const i=this.Nr(r,s);return i===void 0?T.vr():typeof i=="number"?T.newValue({doubleValue:i}):i<fm||i>dm?T.vr():T.newValue({integerValue:`${i}`})}return T.vr()}}function cn(n,e){return De(n)!==De(e)?"TYPE_MISMATCH":ft(n)||ft(e)?"NOT_EQ":_t(n)&&_t(e)?"EQ":_t(n)||_t(e)?"NULL":xr(n)&&xr(e)?(function(r,s){if(r.values?.length!==s.values?.length)return"NOT_EQ";let i=!1;for(let o=0;o<(r.values?.length??0);o++){const c=r.values[o],u=s.values[o];switch(cn(c,u)){case"EQ":break;case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":i=!0;break;default:W(44609,{Lr:c,Br:u})}}return i?"NULL":"EQ"})(n.arrayValue,e.arrayValue):co(n)&&co(e)||rr(n)&&rr(e)?(function(r,s){const i=r.fields||{},o=s.fields||{};if(ao(i)!==ao(o))return"NOT_EQ";let c=!1;for(const u in i)if(i.hasOwnProperty(u)){if(o[u]===void 0)return"NOT_EQ";switch(cn(i[u],o[u])){case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":c=!0}}return c?"NULL":"EQ"})(n.mapValue,e.mapValue):(function(r,s){return Pt(r,s,{Te:!1,Ee:!0,he:!0})})(n,e)?"EQ":"NOT_EQ"}class pm extends fi{Nr(e,t){return qt(e)+qt(t)}Mr(e,t){return{doubleValue:We(e)+We(t)}}}class mm extends fi{constructor(e){super(e),this.expr=e}Nr(e,t){return qt(e)-qt(t)}Mr(e,t){return{doubleValue:We(e)-We(t)}}}class gm extends fi{constructor(e){super(e),this.expr=e}Nr(e,t){return qt(e)*qt(t)}Mr(e,t){return{doubleValue:We(e)*We(t)}}}class _m extends fi{constructor(e){super(e),this.expr=e}Nr(e,t){const r=qt(t);if(r!==BigInt(0))return qt(e)/r}Mr(e,t){const r=We(t);return r===0?{doubleValue:Bs(r)?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY}:{doubleValue:We(e)/r}}}class Em extends fi{constructor(e){super(e),this.expr=e}Nr(e,t){const r=qt(t);if(r!==BigInt(0))return qt(e)%r}Mr(e,t){const r=We(t);if(r!==0)return{doubleValue:We(e)%r}}}class ym{constructor(e){this.expr=e}evaluate(e,t){let r=!1,s=!1;for(const i of this.expr.params){const o=K(i).evaluate(e,t);switch(o.type){case"BOOLEAN":if(!o.value?.booleanValue)return T.newValue(qe);break;case"NULL":s=!0;break;default:r=!0}}return r?T.vr():s?T.Dr():T.newValue(ht)}}class Xo{constructor(e){this.expr=e}evaluate(e,t){q(this.expr.params.length===1,9634);const r=K(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BOOLEAN":return T.newValue({booleanValue:!r.value?.booleanValue});case"NULL":return T.Dr();default:return T.vr()}}}class wm{constructor(e){this.expr=e}evaluate(e,t){let r=!1,s=!1;for(const i of this.expr.params){const o=K(i).evaluate(e,t);switch(o.type){case"BOOLEAN":if(o.value?.booleanValue)return T.newValue(ht);break;case"NULL":s=!0;break;default:r=!0}}return r?T.vr():s?T.Dr():T.newValue(qe)}}class Zc{constructor(e){this.expr=e}evaluate(e,t){let r=!1,s=!1;for(const i of this.expr.params){const o=K(i).evaluate(e,t);switch(o.type){case"BOOLEAN":r=Zc.xor(r,!!o.value?.booleanValue);break;case"NULL":s=!0;break;default:return T.vr()}}return s?T.Dr():T.newValue({booleanValue:r})}static xor(e,t){return(e||t)&&!(e&&t)}}class Od{constructor(e){this.expr=e}evaluate(e,t){q(this.expr.params.length===2,55094);let r=!1;const s=K(this.expr.params[0]).evaluate(e,t);switch(s.type){case"NULL":r=!0;break;case"ERROR":case"UNSET":return T.vr()}const i=K(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return T.vr()}if(r)return T.Dr();for(const o of i.value?.arrayValue?.values??[])switch(_t(s.value)&&_t(o)?"EQ":cn(s.value,o)){case"EQ":return T.newValue(ht);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:W(44608,{value:s.value,candidate:o})}return r?T.Dr():T.newValue(qe)}}class Im{constructor(e){this.expr=e}evaluate(e,t){return new Xo(new k("not",[new k("equal_any",this.expr.params)])).evaluate(e,t)}}class Tm{constructor(e){this.expr=e}evaluate(e,t){q(this.expr.params.length===1,23322);const r=K(this.expr.params[0]).evaluate(e,t);switch(r.type){case"INT":return T.newValue(qe);case"DOUBLE":return T.newValue({booleanValue:isNaN(We(r.value))});case"NULL":return T.Dr();default:return T.vr()}}}class Am{constructor(e){this.expr=e}evaluate(e,t){return q(this.expr.params.length===1,50406),new Xo(new k("not",[new k("is_nan",this.expr.params)])).evaluate(e,t)}}class Rm{constructor(e){this.expr=e}evaluate(e,t){switch(q(this.expr.params.length===1,23123),K(this.expr.params[0]).evaluate(e,t).type){case"NULL":return T.newValue(ht);case"UNSET":case"ERROR":return T.vr();default:return T.newValue(qe)}}}class vm{constructor(e){this.expr=e}evaluate(e,t){return q(this.expr.params.length===1,23167),new Xo(new k("not",[new k("is_null",this.expr.params)])).evaluate(e,t)}}class Cm{constructor(e){this.expr=e}evaluate(e,t){return q(this.expr.params.length===1,5228),K(this.expr.params[0]).evaluate(e,t).type==="ERROR"?T.newValue(ht):T.newValue(qe)}}class Sm{constructor(e){this.expr=e}evaluate(e,t){switch(q(this.expr.params.length===1,6877),K(this.expr.params[0]).evaluate(e,t).type){case"ERROR":return T.vr();case"UNSET":return T.newValue(qe);default:return T.newValue(ht)}}}class Pm{constructor(e){this.expr=e}evaluate(e,t){q(this.expr.params.length===3,11706);const r=K(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BOOLEAN":return r.value?.booleanValue?K(this.expr.params[1]).evaluate(e,t):K(this.expr.params[2]).evaluate(e,t);case"NULL":return K(this.expr.params[2]).evaluate(e,t);default:return T.vr()}}}class bm{constructor(e){this.expr=e}evaluate(e,t){const r=this.expr.params.map((i=>K(i).evaluate(e,t)));let s;for(const i of r)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||dt(i.value,s.value)>0?i:s}return s===void 0?T.Dr():s}}class Nm{constructor(e){this.expr=e}evaluate(e,t){const r=this.expr.params.map((i=>K(i).evaluate(e,t)));let s;for(const i of r)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||dt(i.value,s.value)<0?i:s}return s===void 0?T.Dr():s}}class Wr{constructor(e){this.expr=e}evaluate(e,t){q(this.expr.params.length===2,31033,`${this.expr.name}() function should have exactly 2 params`);const r=K(this.expr.params[0]).evaluate(e,t);switch(r.type){case"ERROR":case"UNSET":return T.vr()}const s=K(this.expr.params[1]).evaluate(e,t);switch(s.type){case"ERROR":case"UNSET":return T.vr()}return this.Ur(r,s)}}class Om extends Wr{constructor(e){super(e),this.expr=e}Ur(e,t){if(e.Fr()&&t.Fr())return T.newValue(ht);if(e.Fr()||t.Fr()||ft(e.value)||ft(t.value)||De(e.value)!==De(t.value))return T.newValue(qe);switch(cn(e.value,t.value)){case"EQ":return T.newValue(ht);case"NOT_EQ":return T.newValue(qe);case"NULL":return T.Dr();default:W(44615,{left:e,right:t})}}}class km extends Wr{constructor(e){super(e),this.expr=e}Ur(e,t){switch(cn(e.value,t.value)){case"EQ":return T.newValue(qe);case"NOT_EQ":case"TYPE_MISMATCH":return T.newValue(ht);case"NULL":return T.Dr();default:W(44614,{left:e,right:t})}}}class Dm extends Wr{constructor(e){super(e),this.expr=e}Ur(e,t){return De(e.value)!==De(t.value)||ft(e.value)||ft(t.value)?T.newValue(qe):T.newValue({booleanValue:dt(e.value,t.value)<0})}}class Vm extends Wr{constructor(e){super(e),this.expr=e}Ur(e,t){return De(e.value)!==De(t.value)||ft(e.value)||ft(t.value)?T.newValue(qe):cn(e.value,t.value)==="EQ"?T.newValue(ht):T.newValue({booleanValue:dt(e.value,t.value)<0})}}class Lm extends Wr{constructor(e){super(e),this.expr=e}Ur(e,t){return De(e.value)!==De(t.value)||ft(e.value)||ft(t.value)?T.newValue(qe):T.newValue({booleanValue:dt(e.value,t.value)>0})}}class xm extends Wr{constructor(e){super(e),this.expr=e}Ur(e,t){return De(e.value)!==De(t.value)||ft(e.value)||ft(t.value)?T.newValue(qe):cn(e.value,t.value)==="EQ"?T.newValue(ht):T.newValue({booleanValue:dt(e.value,t.value)>0})}}class Mm{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class Um{constructor(e){this.expr=e}evaluate(e,t){q(this.expr.params.length===1,216);const r=K(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return T.Dr();case"ARRAY":{const s=r.value.arrayValue?.values??[];return T.newValue({arrayValue:{values:[...s].reverse()}})}default:return T.vr()}}}class Fm{constructor(e){this.expr=e}evaluate(e,t){return q(this.expr.params.length===2,52884),new Od(new k("eq_any",[this.expr.params[1],this.expr.params[0]])).evaluate(e,t)}}class Bm{constructor(e){this.expr=e}evaluate(e,t){q(this.expr.params.length===2,1392);let r=!1;const s=K(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return T.vr()}const i=K(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return T.vr()}if(r)return T.Dr();const o=i.value?.arrayValue?.values??[],c=s.value?.arrayValue?.values??[];for(const u of o){let h=!1;r=!1;for(const f of c){switch(_t(u)&&_t(f)?"EQ":cn(u,f)){case"EQ":h=!0;break;case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:W(44613,{value:f,search:u})}if(h)break}if(!h)return T.newValue(qe)}return T.newValue(ht)}}class $m{constructor(e){this.expr=e}evaluate(e,t){q(this.expr.params.length===2,2680);let r=!1;const s=K(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return T.vr()}const i=K(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return T.vr()}if(r)return T.Dr();const o=i.value?.arrayValue?.values??[],c=s.value?.arrayValue?.values??[];for(const u of c)for(const h of o)switch(_t(u)&&_t(h)?"EQ":cn(u,h)){case"EQ":return T.newValue(ht);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:W(44608,{value:u,search:h})}return r?T.Dr():T.newValue(qe)}}class Hm{constructor(e){this.expr=e}evaluate(e,t){q(this.expr.params.length===1,38605);const r=K(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return T.Dr();case"ARRAY":return T.newValue({integerValue:`${r.value?.arrayValue?.values?.length??0}`});default:return T.vr()}}}class qm{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class jm{constructor(e){this.expr=e}evaluate(e,t){q(this.expr.params.length===1,1508);const r=K(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return T.Dr();case"BYTES":{const s=r.value?.bytesValue;if(typeof s=="string"){const i=ke.fromBase64String(s).toUint8Array();return i.reverse(),T.newValue({bytesValue:ke.fromUint8Array(i).toBase64()})}return T.newValue({bytesValue:new Uint8Array(s).reverse()})}case"STRING":{const s=r.value?.stringValue,i=new Intl.__PRIVATE_Segmenter(void 0,{granularity:"grapheme"}).segment(s),o=Array.from(i,(c=>c.segment)).reverse();return T.newValue({stringValue:o.join("")})}default:return T.vr()}}}class Gm{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class Wm{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class zm{constructor(e){this.expr=e}evaluate(e,t){q(this.expr.params.length===1,19400);const r=K(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return T.Dr();case"STRING":{const s=(function(o){let c=0;for(let u=0;u<o.length;u++){const h=o.codePointAt(u);if(h===void 0)return;if(h<=65535)if(h>=55296&&h<=57343)if(h<=56319){const f=o.codePointAt(u+1);f!==void 0&&f>=56320&&f<=57343?(c+=1,u++):c+=1}else c+=1;else c+=1;else{if(!(h<=1114111))return;c+=1,u++}}return c})(r.value.stringValue);return s===void 0?T.vr():T.newValue({integerValue:s})}default:return T.vr()}}}class Km{constructor(e){this.expr=e}evaluate(e,t){q(this.expr.params.length===1,8486);const r=K(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BYTES":{const s=r.value?.bytesValue;return typeof s=="string"?T.newValue({integerValue:ke.fromBase64String(s).toUint8Array().length}):T.newValue({integerValue:new Uint8Array(s).length})}case"STRING":{const s=(function(o){let c=0;for(let u=0;u<o.length;u++){const h=o.codePointAt(u);if(h===void 0)return;if(h>=55296&&h<=57343){if(!(h<=56319))return;{const f=o.codePointAt(u+1);if(f===void 0||!(f>=56320&&f<=57343))return;c+=4,u++}}else if(h<=127)c+=1;else if(h<=2047)c+=2;else if(h<=65535)c+=3;else{if(!(h<=1114111))return;c+=4,u++}}return c})(r.value?.stringValue);return s===void 0?T.vr():T.newValue({integerValue:s})}case"NULL":return T.Dr();default:return T.vr()}}}class zr{constructor(e){this.expr=e}evaluate(e,t){q(this.expr.params.length===2,39773,`${this.expr.name}() function should have exactly two parameters`);let r=!1;const s=K(this.expr.params[0]).evaluate(e,t);switch(s.type){case"STRING":break;case"NULL":r=!0;break;default:return T.vr()}const i=K(this.expr.params[1]).evaluate(e,t);switch(i.type){case"STRING":break;case"NULL":r=!0;break;default:return T.vr()}return r?T.Dr():this.kr(s.value?.stringValue,i.value?.stringValue)}}class Ym extends zr{kr(e,t){try{const r=(function(o){let c="";for(let u=0;u<o.length;u++){const h=o.charAt(u);switch(h){case"_":c+=".";break;case"%":c+=".*";break;case"\\":case".":case"*":case"?":case"+":case"^":case"$":case"|":case"(":case")":case"[":case"]":case"{":case"}":c+="\\"+h;break;default:c+=h}}return"^"+c+"$"})(t),s=It.compile(r);return T.newValue({booleanValue:s.matches(e)})}catch(r){return kt(`Invalid LIKE pattern converted to regex: ${t}, returning error. Error: ${r}`),T.vr()}}}class Qm extends zr{kr(e,t){try{const r=It.compile(t);return T.newValue({booleanValue:r.matcher(e).find()})}catch{return kt(`Invalid regex pattern found in regex_contains: ${t}, returning error`),T.vr()}}}class Xm extends zr{kr(e,t){try{return T.newValue({booleanValue:It.compile(t).matches(e)})}catch{return kt(`Invalid regex pattern found in regex_match: ${t}, returning error`),T.vr()}}}class Jm extends zr{kr(e,t){return T.newValue({booleanValue:e.includes(t)})}}class Zm extends zr{kr(e,t){return T.newValue({booleanValue:e.startsWith(t)})}}class eg extends zr{kr(e,t){return T.newValue({booleanValue:e.endsWith(t)})}}class tg{constructor(e){this.expr=e}evaluate(e,t){q(this.expr.params.length===1,29079);const r=K(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return T.newValue({stringValue:r.value?.stringValue?.toLowerCase()});case"NULL":return T.Dr();default:return T.vr()}}}class ng{constructor(e){this.expr=e}evaluate(e,t){q(this.expr.params.length===1,60487);const r=K(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return T.newValue({stringValue:r.value?.stringValue?.toUpperCase()});case"NULL":return T.Dr();default:return T.vr()}}}class rg{constructor(e){this.expr=e}evaluate(e,t){q(this.expr.params.length===1,28544);const r=K(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return T.newValue({stringValue:r.value?.stringValue?.trim()});case"NULL":return T.Dr();default:return T.vr()}}}class sg{constructor(e){this.expr=e}evaluate(e,t){const r=this.expr.params.map((o=>K(o).evaluate(e,t)));let s="",i=!1;for(const o of r)switch(o.type){case"STRING":s+=o.value.stringValue;break;case"NULL":i=!0;break;default:return T.vr()}return i?T.Dr():T.newValue({stringValue:s})}}class ig{constructor(e){this.expr=e}evaluate(e,t){q(this.expr.params.length===2,4483);const r=K(this.expr.params[0]).evaluate(e,t);switch(r.type){case"UNSET":return T.Sr();case"MAP":break;default:return T.vr()}const s=K(this.expr.params[1]).evaluate(e,t);if(s.type!=="STRING")return T.vr();const i=r.value?.mapValue?.fields?.[s.value?.stringValue];return i===void 0?T.Sr():T.newValue(i)}}class eu{constructor(e){this.expr=e}evaluate(e,t){q(this.expr.params.length===2,25231,`${this.expr.name}() function should have exactly 2 params`);let r=!1;const s=K(this.expr.params[0]).evaluate(e,t);switch(s.type){case"VECTOR":break;case"NULL":r=!0;break;default:return T.vr()}const i=K(this.expr.params[1]).evaluate(e,t);switch(i.type){case"VECTOR":break;case"NULL":r=!0;break;default:return T.vr()}if(r)return T.Dr();const o=dc(s.value),c=dc(i.value);if(o===void 0||c===void 0||o.values?.length!==c.values?.length)return T.vr();const u=this.qr(o,c);return u===void 0||isNaN(u)?T.vr():T.newValue({doubleValue:u})}}class og extends eu{qr(e,t){const r=e?.values??[],s=t?.values??[];if(r.length===0)return;let i=0,o=0,c=0;for(let h=0;h<r.length;h++){if(!Mn(r[h])||!Mn(s[h]))return;const f=We(r[h]),p=We(s[h]);i+=f*p,o+=f*f,c+=p*p}const u=Math.sqrt(o)*Math.sqrt(c);if(u!==0)return 1-Math.max(-1,Math.min(1,i/u))}}class ag extends eu{qr(e,t){const r=e?.values??[],s=t?.values??[];if(r.length===0)return 0;let i=0;for(let o=0;o<r.length;o++){if(!Mn(r[o])||!Mn(s[o]))return;i+=We(r[o])*We(s[o])}return i}}class cg extends eu{qr(e,t){const r=e?.values??[],s=t?.values??[];if(r.length===0)return 0;let i=0;for(let o=0;o<r.length;o++){if(!Mn(r[o])||!Mn(s[o]))return;const c=We(r[o]),u=We(s[o]);i+=Math.pow(c-u,2)}return Math.sqrt(i)}}class ug{constructor(e){this.expr=e}evaluate(e,t){q(this.expr.params.length===1,39044);const r=K(this.expr.params[0]).evaluate(e,t);switch(r.type){case"VECTOR":{const s=dc(r.value);return T.newValue({integerValue:s?.values?.length??0})}case"NULL":return T.Dr();default:return T.vr()}}}const Xs=BigInt(-62135596800),Js=BigInt(253402300799),_o=BigInt(1e3),Nn=BigInt(1e6),lg=Xs*_o,hg=Js*_o+BigInt(999),dg=Xs*Nn,fg=Js*Nn+BigInt(999999);function tu(n){return n>=dg&&n<=fg}function kd(n){return n>=Xs&&n<=Js}function Zs(n,e){const t=BigInt(n);return!(t<Xs||t>Js)&&!(e<0||e>=1e9)&&(t!==Xs||e===0)&&!(t===Js&&e>999999999)}function Dd(n,e){return e<0?{seconds:n-1,nanos:e+1e9}:{seconds:n,nanos:e}}function nu(n){return BigInt(n.seconds)*Nn+BigInt(Math.trunc(n.nanoseconds/1e3))}class ru{constructor(e){this.expr=e}evaluate(e,t){q(this.expr.params.length===1,49262,`${this.expr.name}() function should have exactly one parameter`);const r=K(this.expr.params[0]).evaluate(e,t);switch(r.type){case"INT":return this.toTimestamp(BigInt(r.value.integerValue));case"NULL":return T.Dr();default:return T.vr()}}}class pg extends ru{toTimestamp(e){if(!tu(e))return T.vr();let t=Number(e/Nn),r=Number(e%Nn*BigInt(1e3));const s=Dd(t,r);return t=s.seconds,r=s.nanos,Zs(t,r)?T.newValue({timestampValue:{seconds:t,nanos:r}}):T.vr()}}class mg extends ru{toTimestamp(e){if(!(function(o){return o>=lg&&o<=hg})(e))return T.vr();let t=Number(e/_o),r=Number(e%_o*BigInt(1e6));const s=Dd(t,r);return t=s.seconds,r=s.nanos,Zs(t,r)?T.newValue({timestampValue:{seconds:t,nanos:r}}):T.vr()}}class gg extends ru{toTimestamp(e){if(!kd(e))return T.vr();const t=Number(e);return T.newValue({timestampValue:{seconds:t,nanos:0}})}}class su{constructor(e){this.expr=e}evaluate(e,t){q(this.expr.params.length===1,1265,`${this.expr.name}() function should have exactly one parameter`);const r=K(this.expr.params[0]).evaluate(e,t);switch(r.type){case"TIMESTAMP":break;case"NULL":return T.Dr();default:return T.vr()}const s=Hc(r.value.timestampValue);return Zs(s.seconds,s.nanoseconds)?this.$r(s):T.vr()}}class _g extends su{$r(e){const t=nu(e);return tu(t)?T.newValue({integerValue:`${t.toString()}`}):T.vr()}}class Eg extends su{$r(e){const t=nu(e),r=t/BigInt(1e3),s=t%BigInt(1e3);return r>BigInt(0)||s===BigInt(0)?T.newValue({integerValue:r.toString()}):T.newValue({integerValue:(r-BigInt(1)).toString()})}}class yg extends su{$r(e){const t=BigInt(e.seconds);return kd(t)?T.newValue({integerValue:t.toString()}):T.vr()}}class Vd{constructor(e){this.expr=e}evaluate(e,t){q(this.expr.params.length===3,2775,`${this.expr.name}() function should have exactly 3 parameters`);let r=!1;const s=K(this.expr.params[0]).evaluate(e,t);switch(s.type){case"TIMESTAMP":break;case"NULL":r=!0;break;default:return T.vr()}const i=K(this.expr.params[1]).evaluate(e,t);let o;switch(i.type){case"STRING":if(o=(function(te){switch(te){case"microsecond":return"microsecond";case"millisecond":return"millisecond";case"second":return"second";case"minute":return"minute";case"hour":return"hour";case"day":return"day";default:return}})(i.value.stringValue),o===void 0)return T.vr();break;case"NULL":r=!0;break;default:return T.vr()}const c=K(this.expr.params[2]).evaluate(e,t);switch(c.type){case"INT":break;case"NULL":r=!0;break;default:return T.vr()}if(r)return T.Dr();const u=BigInt(c.value.integerValue);let h;try{switch(o){case"microsecond":h=u;break;case"millisecond":h=u*BigInt(1e3);break;case"second":h=u*BigInt(1e6);break;case"minute":h=u*BigInt(6e7);break;case"hour":h=u*BigInt(36e8);break;case"day":h=u*BigInt(864e8);break;default:return T.vr()}if(o!=="microsecond"&&u!==BigInt(0)&&h/u!==BigInt(this.Kr(o)))return T.vr()}catch(z){return kt(`Error during timestamp arithmetic: ${z}`),T.vr()}const f=Hc(s.value.timestampValue);if(!Zs(f.seconds,f.nanoseconds))return T.vr();const p=nu(f),w=this.Wr(p,h);if(!tu(w))return T.vr();const b=Number(w/Nn),P=w%Nn,L=Number((P<0?P+Nn:P)*BigInt(1e3)),x=P<0?b-1:b;return Zs(x,L)?T.newValue({timestampValue:{seconds:x,nanos:L}}):T.vr()}Kr(e){switch(e){case"millisecond":return 1e3;case"second":return 1e6;case"minute":return 6e7;case"hour":return 36e8;case"day":return 864e8;default:return 1}}}class wg extends Vd{Wr(e,t){return e+t}}class Ig extends Vd{Wr(e,t){return e-t}}function ei(n){if((n=Nd(n))instanceof jr)return`fld(${n.fieldName})`;if(n instanceof Gr)return`cst(${(function(t){return t===null?"null":typeof t=="number"?t.toString():typeof t=="string"?`"${t}"`:t instanceof ge?`ref(${t.path})`:t instanceof ut?`vec(${JSON.stringify(t)})`:JSON.stringify(t)})(n.value)})`;if(n instanceof k)return`fn(${n.name},[${n.params.map(ei).join(",")}])`;if(n.expressionType==="ListOfExpressions")return`list([${n.Rr.map(ei).join(",")}])`;throw new Error(`Unrecognized expr ${JSON.stringify(n,null,2)}`)}function Tg(n){if(n instanceof Sd)return`${n._name}(${Hi(n.fields)})`;if(n instanceof Pd){let e=`${n._name}(${Hi(n.accumulators)})`;return n.groups.size>0&&(e+=`grouping(${Hi(n.groups)})`),e}if(n instanceof bd)return`${n._name}(${Hi(n.groups)})`;if(n instanceof zo)return`${n._name}(${n.Vr})`;if(n instanceof Ko)return`${n._name}(${n.collectionId})`;if(n instanceof Yc)return`${n._name}()`;if(n instanceof Qc)return`${n._name}(${n.dr.sort()})`;if(n instanceof Yo)return`${n._name}(${ei(n.condition)})`;if(n instanceof lr)return`${n._name}(${n.limit})`;if(n instanceof Xt)return`${n._name}(${(function(t){return t.map((r=>`${ei(r.expr)}${r.direction}`)).join(",")})(n.orderings)})`;throw new Error(`Unrecognized stage ${n._name}`)}function Hi(n){return`${Array.from(n.entries()).sort().map((([e,t])=>`${e}=${ei(t)}`)).join(",")}`}function rn(n){return n.stages.map((e=>Tg(e))).join("|")}function Ld(n,e){return rn(n)===rn(e)}function Ue(n){return n instanceof st}function ah(n){return Ue(n)?rn(n):bs(n)}function xd(n){return Ue(n)?rn(n):(function(t){return`${j2(Bt(t))}|lt:${t.limitType}`})(n)}function Jo(n,e){return n instanceof st&&e instanceof st?Ld(n,e):!(n instanceof st&&!(e instanceof st)||!(n instanceof st)&&e instanceof st)&&Q7(n,e)}function Md(n){return tr(n)?rn(n):j2(n)}function Ud(n,e){return n instanceof st&&e instanceof st?Ld(n,e):!(n instanceof st&&!(e instanceof st)||!(n instanceof st)&&e instanceof st)&&G2(n,e)}function Ag(n,e){const t=(function(s){let i=!1;const o=[];for(const c of s)if(c instanceof Xt)if(i=!0,c.orderings.some((u=>u.expr instanceof jr&&u.expr.fieldName===Mt)))o.push(c);else{const u=c.orderings.map((h=>h));u.push(Ji(Mt).ascending()),o.push(new Xt(u,{}))}else c instanceof lr&&(i||(o.push(new Xt([Ji(Mt).ascending()],{})),i=!0)),o.push(c);return i||o.push(new Xt([Ji(Mt).ascending()],{})),o})(n.stages);if(n.userDataReader){const r=n.userDataReader.createContext(3,"toCorePipeline");t.forEach((s=>s._readUserData(r)))}return new st(n.userDataReader.serializer,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rg{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&D7(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Ss(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Ss(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=X2();return this.mutations.forEach((s=>{const i=e.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=t.has(s.key)?null:c;const u=x2(o,c);u!==null&&r.set(s.key,u),o.isValidDocument()||o.convertToNoDocument(Q.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),ne())}isEqual(e){return this.batchId===e.batchId&&kr(this.mutations,e.mutations,((t,r)=>Fl(t,r)))&&kr(this.baseMutations,e.baseMutations,((t,r)=>Fl(t,r)))}}class iu{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){q(e.mutations.length===r.length,58842,{Qr:e.mutations.length,Gr:r.length});let s=(function(){return t4})();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new iu(e,t,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vg{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(e,t,r,s,i=Q.min(),o=Q.min(),c=ke.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new Jt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Jt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Jt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Jt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cg{constructor(e){this.zr=e}}function Sg(n){const e=E4({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?mc(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pg{constructor(){this.Hi=new bg}addToCollectionParentIndex(e,t){return this.Hi.add(t),V.resolve()}getCollectionParents(e,t){return V.resolve(this.Hi.getEntries(t))}addFieldIndex(e,t){return V.resolve()}deleteFieldIndex(e,t){return V.resolve()}deleteAllFieldIndexes(e){return V.resolve()}createTargetIndexes(e,t){return V.resolve()}getDocumentsMatchingTarget(e,t){return V.resolve(null)}getIndexType(e,t){return V.resolve(0)}getFieldIndexes(e,t){return V.resolve([])}getNextCollectionGroupToUpdate(e){return V.resolve(null)}getMinOffset(e,t){return V.resolve(Vn.min())}getMinOffsetFromCollectionGroup(e,t){return V.resolve(Vn.min())}updateCollectionGroup(e,t,r){return V.resolve()}updateIndexEntries(e,t){return V.resolve()}}class bg{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new Oe(de.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Oe(de.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hn{constructor(e){this.Ds=e}next(){return this.Ds+=2,this.Ds}static xs(){return new Hn(0)}static Cs(){return new Hn(-1)}}// Copyright 2024 Google LLC* @license
function Fd(n,e){let t=e;for(const r of n.stages)t=Og({serializer:n.serializer,serverTimestampBehavior:n.listenOptions?.serverTimestampBehavior},r,t);return t}function Zo(n,e){return Fd(n,[e]).length>0}function Ng(n,e){return Ue(n)?Zo(n,e):$o(n,e)}function Og(n,e,t){if(e instanceof zo)return(function(s,i,o){return o.filter((c=>c.isFoundDocument()&&`/${c.key.getCollectionPath().canonicalString()}`===i.Vr))})(0,e,t);if(e instanceof Yo)return(function(s,i,o){return o.filter((c=>{const u=ks(K(i.condition).evaluate(s,c));return u!==void 0&&Pt(u,ht)}))})(n,e,t);if(e instanceof Ko)return(function(s,i,o){return o.filter((c=>c.isFoundDocument()&&c.key.getCollectionPath().lastSegment()===i.collectionId))})(0,e,t);if(e instanceof Yc)return(function(s,i,o){return o.filter((c=>c.isFoundDocument()))})(0,0,t);if(e instanceof Qc)return(function(s,i,o){return o.filter((c=>c.isFoundDocument()&&i.mr.has(c.key.path.toStringWithLeadingSlash())))})(0,e,t);if(e instanceof lr)return(function(s,i,o){return o.slice(0,i.limit)})(0,e,t);if(e instanceof Xt)return(function(s,i,o){const c=i.orderings.map((u=>({ks:K(u.expr),direction:u.direction})));return[...o].sort(((u,h)=>{for(const{ks:f,direction:p}of c){const w=ks(f.evaluate(s,u)),b=ks(f.evaluate(s,h)),P=dt(w??Vr,b??Vr);if(P!==0)return p==="ascending"?P:-P}return 0}))})(n,e,t);throw new Error(`Unknown stage: ${e._name}`)}function Ic(n){const e=(function(r){for(let s=r.stages.length-1;s>=0;s--){const i=r.stages[s];if(i instanceof Xt)return i.orderings}throw new Error("Pipeline must contain at least one Sort stage")})(n);return(t,r)=>{for(const s of e){const i=ks(K(s.expr).evaluate({serializer:n.serializer},t)),o=ks(K(s.expr).evaluate({serializer:n.serializer},r)),c=dt(i||Vr,o||Vr);if(c!==0)return s.direction==="ascending"?c:-c}return 0}}function Ka(n){for(let e=n.stages.length-1;e>=0;e--){const t=n.stages[e];if(t instanceof lr)return{limit:t.limit}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kg{constructor(){this.changes=new pr((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Xe.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?V.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dg{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vg{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(r=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(r!==null&&Ss(r.mutation,s,gt.empty(),me.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,ne()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=ne()){const s=Tn();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,r).next((i=>{let o=Ir();return i.forEach(((c,u)=>{o=o.insert(c,u.overlayedDocument)})),o}))))}getOverlayedDocuments(e,t){const r=Tn();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,ne())))}populateOverlays(e,t,r){const s=[];return r.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((o,c)=>{t.set(o,c)}))}))}computeViews(e,t,r,s){let i=ct();const o=Ns(),c=(function(){return Ns()})();return t.forEach(((u,h)=>{const f=r.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof zn)?i=i.insert(h.key,h):f!==void 0?(o.set(h.key,f.mutation.getFieldMask()),Ss(f.mutation,h,f.mutation.getFieldMask(),me.now())):o.set(h.key,gt.empty())})),this.recalculateAndSaveOverlays(e,i).next((u=>(u.forEach(((h,f)=>o.set(h,f))),t.forEach(((h,f)=>c.set(h,new Dg(f,o.get(h)??null)))),c)))}recalculateAndSaveOverlays(e,t){const r=Ns();let s=new _e(((o,c)=>o-c)),i=ne();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((o=>{for(const c of o)c.keys().forEach((u=>{const h=t.get(u);if(h===null)return;let f=r.get(u)||gt.empty();f=c.applyToLocalView(h,f),r.set(u,f);const p=(s.get(c.batchId)||ne()).add(u);s=s.insert(c.batchId,p)}))})).next((()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),h=u.key,f=u.value,p=X2();f.forEach((w=>{if(!i.has(w)){const b=x2(t.get(w),r.get(w));b!==null&&p.set(w,b),i=i.add(w)}})),o.push(this.documentOverlayCache.saveOverlays(e,h,p))}return V.waitFor(o)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,s){return Ue(t)?this.getDocumentsMatchingPipeline(e,t,r,s):z7(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):z2(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next((i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):V.resolve(Tn());let c=Fs,u=i;return o.next((h=>V.forEach(h,((f,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),i.get(f)?V.resolve():this.remoteDocumentCache.getEntry(e,f).next((w=>{u=u.insert(f,w)}))))).next((()=>this.populateOverlays(e,h,i))).next((()=>this.computeViews(e,u,h,ne()))).next((f=>({batchId:c,changes:Q2(f)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new j(t)).next((r=>{let s=Ir();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let o=Ir();return this.indexManager.getCollectionParents(e,i).next((c=>V.forEach(c,(u=>{const h=(function(p,w){return new qr(w,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)})(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next((f=>{f.forEach(((p,w)=>{o=o.insert(p,w)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s)))).next((o=>this.retrieveMatchingLocalDocuments(i,o,(c=>$o(t,c)))))}getDocumentsMatchingPipeline(e,t,r,s){if(bn(t)==="collection_group"){const i=Jc(t);let o=Ir();return this.indexManager.getCollectionParents(e,i).next((c=>V.forEach(c,(u=>{const h=(function(p,w){const b=p.stages.map((P=>P instanceof Ko?new zo(w.canonicalString(),{}):P));return new st(p.serializer,b)})(t,u.child(i));return this.getDocumentsMatchingPipeline(e,h,r,s).next((f=>{f.forEach(((p,w)=>{o=o.insert(p,w)}))}))})).next((()=>o))))}{let i;return this.getOverlaysForPipeline(e,t,r.largestBatchId).next((o=>{switch(i=o,bn(t)){case"collection":return this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s);case"documents":let c=ne();for(const u of wc(t))c=c.add(j.fromPath(u));return this.remoteDocumentCache.getEntries(e,c);case"database":return this.remoteDocumentCache.getAllEntries(e);default:throw new U("invalid-argument",`Invalid pipeline source to execute offline: ${rn(t)}`)}})).next((o=>this.retrieveMatchingLocalDocuments(i,o,(c=>Zo(t,c)))))}}retrieveMatchingLocalDocuments(e,t,r){e.forEach(((i,o)=>{const c=o.getKey();t.get(c)===null&&(t=t.insert(c,Xe.newInvalidDocument(c)))}));let s=Ir();return t.forEach(((i,o)=>{const c=e.get(i);c!==void 0&&Ss(c.mutation,o,gt.empty(),me.now()),r(o)&&(s=s.insert(i,o))})),s}getOverlaysForPipeline(e,t,r){switch(bn(t)){case"collection":return this.documentOverlayCache.getOverlaysForCollection(e,de.fromString(Qo(t)),r);case"collection_group":throw new U("invalid-argument",`Unexpected collection group pipeline: ${rn(t)}`);case"documents":return this.documentOverlayCache.getOverlays(e,wc(t).map((s=>j.fromPath(s))));case"database":return this.documentOverlayCache.getAllOverlays(e,r);default:throw new U("invalid-argument",`Failed to get overlays for pipeline: ${rn(t)}`)}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lg{constructor(e){this.serializer=e,this.Hs=new Map,this.Js=new Map}getBundleMetadata(e,t){return V.resolve(this.Hs.get(t))}saveBundleMetadata(e,t){return this.Hs.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:$t(s.createTime)}})(t)),V.resolve()}getNamedQuery(e,t){return V.resolve(this.Js.get(t))}saveNamedQuery(e,t){return this.Js.set(t.name,(function(s){return{name:s.name,query:Sg(s.bundledQuery),readTime:$t(s.readTime)}})(t)),V.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xg{constructor(){this.overlays=new _e(j.comparator),this.Ys=new Map}getOverlay(e,t){return V.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Tn();return V.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}getAllOverlays(e,t){const r=Tn();return this.overlays.forEach(((s,i)=>{i.largestBatchId>t&&r.set(s,i)})),V.resolve(r)}saveOverlays(e,t,r){return r.forEach(((s,i)=>{this.Hr(e,t,i)})),V.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Ys.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Ys.delete(r)),V.resolve()}getOverlaysForCollection(e,t,r){const s=Tn(),i=t.length+1,o=new j(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const u=c.getNext().value,h=u.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return V.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new _e(((h,f)=>h-f));const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let f=i.get(h.largestBatchId);f===null&&(f=Tn(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=Tn(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach(((h,f)=>c.set(h,f))),!(c.size()>=s)););return V.resolve(c)}Hr(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Ys.get(s.largestBatchId).delete(r.key);this.Ys.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new vg(t,r));let i=this.Ys.get(t);i===void 0&&(i=ne(),this.Ys.set(t,i)),this.Ys.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mg{constructor(){this.sessionToken=ke.EMPTY_BYTE_STRING}getSessionToken(e){return V.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,V.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ou{constructor(){this.Zs=new Oe(He.Xs),this.e_=new Oe(He.t_)}isEmpty(){return this.Zs.isEmpty()}addReference(e,t){const r=new He(e,t);this.Zs=this.Zs.add(r),this.e_=this.e_.add(r)}n_(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.r_(new He(e,t))}i_(e,t){e.forEach((r=>this.removeReference(r,t)))}s_(e){const t=new j(new de([])),r=new He(t,e),s=new He(t,e+1),i=[];return this.e_.forEachInRange([r,s],(o=>{this.r_(o),i.push(o.key)})),i}__(){this.Zs.forEach((e=>this.r_(e)))}r_(e){this.Zs=this.Zs.delete(e),this.e_=this.e_.delete(e)}o_(e){const t=new j(new de([])),r=new He(t,e),s=new He(t,e+1);let i=ne();return this.e_.forEachInRange([r,s],(o=>{i=i.add(o.key)})),i}containsKey(e){const t=new He(e,0),r=this.Zs.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class He{constructor(e,t){this.key=e,this.a_=t}static Xs(e,t){return j.comparator(e.key,t.key)||ie(e.a_,t.a_)}static t_(e,t){return ie(e.a_,t.a_)||j.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ug{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.gs=1,this.u_=new Oe(He.Xs)}checkEmpty(e){return V.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.gs;this.gs++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Rg(i,t,r,s);this.mutationQueue.push(o);for(const c of s)this.u_=this.u_.add(new He(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return V.resolve(o)}lookupMutationBatch(e,t){return V.resolve(this.c_(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.l_(r),i=s<0?0:s;return V.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return V.resolve(this.mutationQueue.length===0?xc:this.gs-1)}getAllMutationBatches(e){return V.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new He(t,0),s=new He(t,Number.POSITIVE_INFINITY),i=[];return this.u_.forEachInRange([r,s],(o=>{const c=this.c_(o.a_);i.push(c)})),V.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Oe(ie);return t.forEach((s=>{const i=new He(s,0),o=new He(s,Number.POSITIVE_INFINITY);this.u_.forEachInRange([i,o],(c=>{r=r.add(c.a_)}))})),V.resolve(this.E_(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;j.isDocumentKey(i)||(i=i.child(""));const o=new He(new j(i),0);let c=new Oe(ie);return this.u_.forEachWhile((u=>{const h=u.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(c=c.add(u.a_)),!0)}),o),V.resolve(this.E_(c))}E_(e){const t=[];return e.forEach((r=>{const s=this.c_(r);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){q(this.h_(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.u_;return V.forEach(t.mutations,(s=>{const i=new He(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.u_=r}))}bs(e){}containsKey(e,t){const r=new He(t,0),s=this.u_.firstAfterOrEqual(r);return V.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,V.resolve()}h_(e,t){return this.l_(e)}l_(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}c_(e){const t=this.l_(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fg{constructor(e){this.T_=e,this.docs=(function(){return new _e(j.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,o=this.T_(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return V.resolve(r?r.document.mutableCopy():Xe.newInvalidDocument(t))}getEntries(e,t){let r=ct();return t.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Xe.newInvalidDocument(s))})),V.resolve(r)}getAllEntries(e){let t=ct();return this.docs.forEach(((r,s)=>{t=t.insert(r,s.document)})),V.resolve(t)}getDocumentsMatchingQuery(e,t,r,s){let i,o;Ue(t)?(i=de.fromString(Qo(t)),o=f=>Zo(t,f)):(i=t.path,o=f=>$o(t,f));let c=ct();const u=new j(i.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(u);for(;h.hasNext();){const{key:f,value:{document:p}}=h.getNext();if(!i.isPrefixOf(f.path))break;f.path.length>i.length+1||m7(p7(p),r)<=0||(s.has(p.key)||o(p))&&(c=c.insert(p.key,p.mutableCopy()))}return V.resolve(c)}getAllFromCollectionGroup(e,t,r,s){W(9500)}P_(e,t){return V.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new Bg(this)}getSize(e){return V.resolve(this.size)}}class Bg extends kg{constructor(e){super(),this.zs=e}applyChanges(e){const t=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?t.push(this.zs.addEntry(e,s)):this.zs.removeEntry(r)})),V.waitFor(t)}getFromCache(e,t){return this.zs.getEntry(e,t)}getAllFromCache(e,t){return this.zs.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $g{constructor(e){this.persistence=e,this.R_=new pr((t=>Md(t)),Ud),this.lastRemoteSnapshotVersion=Q.min(),this.highestTargetId=0,this.I_=0,this.A_=new ou,this.targetCount=0,this.V_=Hn.xs()}forEachTarget(e,t){return this.R_.forEach(((r,s)=>t(s))),V.resolve()}getLastRemoteSnapshotVersion(e){return V.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return V.resolve(this.I_)}allocateTargetId(e){return this.highestTargetId=this.V_.next(),V.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.I_&&(this.I_=t),V.resolve()}Ms(e){this.R_.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.V_=new Hn(t),this.highestTargetId=t),e.sequenceNumber>this.I_&&(this.I_=e.sequenceNumber)}addTargetData(e,t){return this.Ms(t),this.targetCount+=1,V.resolve()}updateTargetData(e,t){return this.Ms(t),V.resolve()}removeTargetData(e,t){return this.R_.delete(t.target),this.A_.s_(t.targetId),this.targetCount-=1,V.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.R_.forEach(((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.R_.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)})),V.waitFor(i).next((()=>s))}getTargetCount(e){return V.resolve(this.targetCount)}getTargetData(e,t){const r=this.R_.get(t)||null;return V.resolve(r)}addMatchingKeys(e,t,r){return this.A_.n_(t,r),V.resolve()}removeMatchingKeys(e,t,r){this.A_.i_(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((o=>{i.push(s.markPotentiallyOrphaned(e,o))})),V.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.A_.s_(t),V.resolve()}getMatchingKeysForTargetId(e,t){const r=this.A_.o_(t);return V.resolve(r)}containsKey(e,t){return V.resolve(this.A_.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bd{constructor(e,t){this.d_={},this.overlays={},this.f_=new Do(0),this.m_=!1,this.m_=!0,this.p_=new Mg,this.referenceDelegate=e(this),this.g_=new $g(this),this.indexManager=new Pg,this.remoteDocumentCache=(function(s){return new Fg(s)})((r=>this.referenceDelegate.y_(r))),this.serializer=new Cg(t),this.w_=new Lg(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.m_=!1,Promise.resolve()}get started(){return this.m_}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new xg,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.d_[e.toKey()];return r||(r=new Ug(t,this.referenceDelegate),this.d_[e.toKey()]=r),r}getGlobalsCache(){return this.p_}getTargetCache(){return this.g_}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.w_}runTransaction(e,t,r){H("MemoryPersistence","Starting transaction:",e);const s=new Hg(this.f_.next());return this.referenceDelegate.b_(),r(s).next((i=>this.referenceDelegate.v_(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}S_(e,t){return V.or(Object.values(this.d_).map((r=>()=>r.containsKey(e,t))))}}class Hg extends _7{constructor(e){super(),this.currentSequenceNumber=e}}class au{constructor(e){this.persistence=e,this.D_=new ou,this.x_=null}static C_(e){return new au(e)}get F_(){if(this.x_)return this.x_;throw W(60996)}addReference(e,t,r){return this.D_.addReference(r,t),this.F_.delete(r.toString()),V.resolve()}removeReference(e,t,r){return this.D_.removeReference(r,t),this.F_.add(r.toString()),V.resolve()}markPotentiallyOrphaned(e,t){return this.F_.add(t.toString()),V.resolve()}removeTarget(e,t){this.D_.s_(t.targetId).forEach((s=>this.F_.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.F_.add(i.toString())))})).next((()=>r.removeTargetData(e,t)))}b_(){this.x_=new Set}v_(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return V.forEach(this.F_,(r=>{const s=j.fromPath(r);return this.O_(e,s).next((i=>{i||t.removeEntry(s,Q.min())}))})).next((()=>(this.x_=null,t.apply(e))))}updateLimboDocument(e,t){return this.O_(e,t).next((r=>{r?this.F_.delete(t.toString()):this.F_.add(t.toString())}))}y_(e){return 0}O_(e,t){return V.or([()=>V.resolve(this.D_.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.S_(e,t)])}}class Eo{constructor(e,t){this.persistence=e,this.M_=new pr((r=>I7(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=$4(this,t)}static C_(e,t){return new Eo(e,t)}b_(){}v_(e){return V.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}lr(e){const t=this.Ls(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((s=>r+s))))}Ls(e){let t=0;return this.Er(e,(r=>{t++})).next((()=>t))}Er(e,t){return V.forEach(this.M_,((r,s)=>this.Us(e,r,s).next((i=>i?V.resolve():t(s)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.P_(e,(o=>this.Us(e,o,t).next((c=>{c||(r++,i.removeEntry(o,Q.min()))})))).next((()=>i.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.M_.set(t,e.currentSequenceNumber),V.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.M_.set(r,e.currentSequenceNumber),V.resolve()}removeReference(e,t,r){return this.M_.set(r,e.currentSequenceNumber),V.resolve()}updateLimboDocument(e,t){return this.M_.set(t,e.currentSequenceNumber),V.resolve()}y_(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Ki(e.data.value)),t}Us(e,t,r){return V.or([()=>this.persistence.S_(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.M_.get(t);return V.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cu{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.wo=r,this.bo=s}static vo(e,t){let r=ne(),s=ne();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new cu(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qg(n,e){return j.comparator(n.key,e.key)}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jg{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gg{constructor(){this.So=!1,this.Do=!1,this.xo=100,this.Co=(function(){return Cp()?8:E7(Ze())>0?6:4})()}initialize(e,t){this.Fo=e,this.indexManager=t,this.So=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.Oo(e,t).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.Mo(e,t,s,r).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new jg;return this.No(e,t,o).next((c=>{if(i.result=c,this.Do)return this.Lo(e,t,o,c.size)}))})).next((()=>i.result))}Lo(e,t,r,s){return Ue(t)?V.resolve():r.documentReadCount<this.xo?(wr()<=oe.DEBUG&&H("QueryEngine","SDK will not create cache indexes for query:",bs(t),"since it only creates cache indexes for collection contains","more than or equal to",this.xo,"documents"),V.resolve()):(wr()<=oe.DEBUG&&H("QueryEngine","Query:",bs(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Co*s?(wr()<=oe.DEBUG&&H("QueryEngine","The SDK decides to create cache indexes for query:",bs(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Bt(t))):V.resolve())}Oo(e,t){if(Ue(t))return V.resolve(null);let r=t;if(Gl(r))return V.resolve(null);let s=Bt(r);return this.indexManager.getIndexType(e,s).next((i=>i===0?null:(r.limit!==null&&i===1&&(r=mc(r,null,"F"),s=Bt(r)),this.indexManager.getDocumentsMatchingTarget(e,s).next((o=>{const c=ne(...o);return this.Fo.getDocuments(e,c).next((u=>this.indexManager.getMinOffset(e,s).next((h=>{const f=this.Bo(r,u);return this.Uo(r,f,c,h.readTime)?this.Oo(e,mc(r,null,"F")):this.ko(e,f,r,h)}))))})))))}Mo(e,t,r,s){return(Ue(t)?(function(o){for(const c of o.stages){if(c instanceof lr||c instanceof oh)return!1;if(c instanceof Yo){if(c.condition instanceof Rd&&c.condition._expr.name==="exists"&&c.condition._expr.params[0]instanceof jr&&c.condition._expr.params[0].fieldName===Mt)continue;return!1}}return!0})(t):Gl(t))||s.isEqual(Q.min())?V.resolve(null):this.Fo.getDocuments(e,r).next((i=>{const o=this.Bo(t,i);return this.Uo(t,o,r,s)?V.resolve(null):(wr()<=oe.DEBUG&&H("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),ah(t)),this.ko(e,o,t,f7(s,Fs)).next((c=>c)))}))}Bo(e,t){let r,s;return Ue(e)?(r=new Oe(qg),s=i=>Zo(e,i)):(r=new Oe(Bc(e)),s=i=>$o(e,i)),t.forEach(((i,o)=>{s(o)&&(r=r.add(o))})),r}Uo(e,t,r,s){if(Ue(e))return(function(c){return c.stages.some((u=>u instanceof lr||u instanceof oh))})(e);if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}No(e,t,r){return wr()<=oe.DEBUG&&H("QueryEngine","Using full collection scan to execute query:",ah(t)),this.Fo.getDocumentsMatchingQuery(e,t,Vn.min(),r)}ko(e,t,r,s){return this.Fo.getDocumentsMatchingQuery(e,r,s).next((i=>(t.forEach((o=>{i=i.insert(o.key,o)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uu="LocalStore",Wg=3e8;class zg{constructor(e,t,r,s){this.persistence=e,this.qo=t,this.serializer=s,this.$o=new _e(ie),this.Ko=new pr((i=>Md(i)),Ud),this.Wo=new Map,this.Qo=e.getRemoteDocumentCache(),this.g_=e.getTargetCache(),this.w_=e.getBundleCache(),this.Go(r)}Go(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Vg(this.Qo,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Qo.setIndexManager(this.indexManager),this.qo.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.$o)))}}function Kg(n,e,t,r){return new zg(n,e,t,r)}async function $d(n,e){const t=X(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,t.Go(e),t.mutationQueue.getAllMutationBatches(r)))).next((i=>{const o=[],c=[];let u=ne();for(const h of s){o.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of i){c.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(r,u).next((h=>({zo:h,removedBatchIds:o,addedBatchIds:c})))}))}))}function Yg(n,e){const t=X(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=e.batch.keys(),i=t.Qo.newChangeBuffer({trackRemovals:!0});return(function(c,u,h,f){const p=h.batch,w=p.keys();let b=V.resolve();return w.forEach((P=>{b=b.next((()=>f.getEntry(u,P))).next((L=>{const x=h.docVersions.get(P);q(x!==null,48541),L.version.compareTo(x)<0&&(p.applyToRemoteDocument(L,h),L.isValidDocument()&&(L.setReadTime(h.commitVersion),f.addEntry(L)))}))})),b.next((()=>c.mutationQueue.removeMutationBatch(u,p)))})(t,r,e,i).next((()=>i.apply(r))).next((()=>t.mutationQueue.performConsistencyCheck(r))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(c){let u=ne();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(u=u.add(c.batch.mutations[h].key));return u})(e)))).next((()=>t.localDocuments.getDocuments(r,s)))}))}function Hd(n){const e=X(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.g_.getLastRemoteSnapshotVersion(t)))}function Qg(n,e){const t=X(n),r=e.snapshotVersion;let s=t.$o;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const o=t.Qo.newChangeBuffer({trackRemovals:!0});s=t.$o;const c=[];e.targetChanges.forEach(((f,p)=>{const w=s.get(p);if(!w)return;c.push(t.g_.removeMatchingKeys(i,f.removedDocuments,p).next((()=>t.g_.addMatchingKeys(i,f.addedDocuments,p))));let b=w.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?b=b.withResumeToken(ke.EMPTY_BYTE_STRING,Q.min()).withLastLimboFreeSnapshotVersion(Q.min()):f.resumeToken.approximateByteSize()>0&&(b=b.withResumeToken(f.resumeToken,r)),s=s.insert(p,b),(function(L,x,z){return L.resumeToken.approximateByteSize()===0||x.snapshotVersion.toMicroseconds()-L.snapshotVersion.toMicroseconds()>=Wg?!0:z.addedDocuments.size+z.modifiedDocuments.size+z.removedDocuments.size>0})(w,b,f)&&c.push(t.g_.updateTargetData(i,b))}));let u=ct(),h=ne();if(e.documentUpdates.forEach((f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))})),c.push(Xg(i,o,e.documentUpdates).next((f=>{u=f.jo,h=f.Ho}))),!r.isEqual(Q.min())){const f=t.g_.getLastRemoteSnapshotVersion(i).next((p=>t.g_.setTargetsMetadata(i,i.currentSequenceNumber,r)));c.push(f)}return V.waitFor(c).next((()=>o.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,u,h))).next((()=>u))})).then((i=>(t.$o=s,i)))}function Xg(n,e,t){let r=ne(),s=ne();return t.forEach((i=>r=r.add(i))),e.getEntries(n,r).next((i=>{let o=ct();return t.forEach(((c,u)=>{const h=i.get(c);u.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual(Q.min())?(e.removeEntry(c,u.readTime),o=o.insert(c,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),o=o.insert(c,u)):H(uu,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",u.version)})),{jo:o,Ho:s}}))}function Jg(n,e){const t=X(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=xc),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}function Zg(n,e){const t=X(n);return t.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return t.g_.getTargetData(r,e).next((i=>i?(s=i,V.resolve(s)):t.g_.allocateTargetId(r).next((o=>(s=new Jt(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.g_.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=t.$o.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.$o=t.$o.insert(r.targetId,r),t.Ko.set(e,r.targetId)),r}))}async function Tc(n,e,t){const r=X(n),s=r.$o.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,(o=>r.persistence.referenceDelegate.removeTarget(o,s)))}catch(o){if(!Hr(o))throw o;H(uu,`Failed to update sequence numbers for target ${e}: ${o}`)}r.$o=r.$o.remove(e),r.Ko.delete(s.target)}function ch(n,e,t){const r=X(n);let s=Q.min(),i=ne();return r.persistence.runTransaction("Execute query","readwrite",(o=>(function(u,h,f){const p=X(u),w=p.Ko.get(f);return w!==void 0?V.resolve(p.$o.get(w)):p.g_.getTargetData(h,f)})(r,o,Ue(e)?e:Bt(e)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.g_.getMatchingKeysForTargetId(o,c.targetId).next((u=>{i=u}))})).next((()=>r.qo.getDocumentsMatchingQuery(o,e,t?s:Q.min(),t?i:ne()))).next((c=>(e3(r,c),{documents:c,Jo:i})))))}function e3(n,e){e.forEach(((t,r)=>{const s=r.key.getCollectionGroup(),i=n.Wo.get(s)||Q.min();r.readTime.compareTo(i)>0&&n.Wo.set(s,r.readTime)}))}class uh{constructor(){this.activeTargetIds=s4()}na(e){this.activeTargetIds=this.activeTargetIds.add(e)}ra(e){this.activeTargetIds=this.activeTargetIds.delete(e)}ta(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class t3{constructor(){this.Ua=new uh,this.ka={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Ua.na(e),this.ka[e]||"not-current"}updateQueryState(e,t,r){this.ka[e]=t}removeLocalQueryTarget(e){this.Ua.ra(e)}isLocalQueryTarget(e){return this.Ua.activeTargetIds.has(e)}clearQueryState(e){delete this.ka[e]}getAllActiveQueryTargets(){return this.Ua.activeTargetIds}isActiveQueryTarget(e){return this.Ua.activeTargetIds.has(e)}start(){return this.Ua=new uh,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}function Ya(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n3{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.qa=0,this.$a=null,this.Ka=!0}Wa(){this.qa===0&&(this.Qa("Unknown"),this.$a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.$a=null,this.Ga("Backend didn't respond within 10 seconds."),this.Qa("Offline"),Promise.resolve()))))}za(e){this.state==="Online"?this.Qa("Unknown"):(this.qa++,this.qa>=1&&(this.ja(),this.Ga(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.Qa("Offline")))}set(e){this.ja(),this.qa=0,e==="Online"&&(this.Ka=!1),this.Qa(e)}Qa(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}Ga(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Ka?(an(t),this.Ka=!1):H("OnlineStateTracker",t)}ja(){this.$a!==null&&(this.$a.cancel(),this.$a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jt="RemoteStore";class r3{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ha=[],this.Ja=new Map,this.Ya=new Map,this.Za=new Map,this.Xa=new Hn(1e3),this.eu=new Hn(1001),this.tu=new Set,this.nu=[],this.ru=i,this.ru.bt((o=>{r.enqueueAndForget((async()=>{gr(this)&&(H(jt,"Restarting streams for network reachability change."),await(async function(u){const h=X(u);h.tu.add(4),await pi(h),h.iu.set("Unknown"),h.tu.delete(4),await ea(h)})(this))}))})),this.iu=new n3(r,s)}}async function ea(n){if(gr(n))for(const e of n.nu)await e(!0)}async function pi(n){for(const e of n.nu)await e(!1)}function Ac(n,e){return n.Ya.get(e)||void 0}function qd(n,e){const t=X(n),r=Ac(t,e.targetId);if(r!==void 0&&t.Ja.has(r))return;const s=(function(c,u){const h=Ac(c,u);h!==void 0&&c.Za.delete(h);const f=(function(w,b){return b%2!=0?w.eu.next():w.Xa.next()})(c,u);return c.Ya.set(u,f),c.Za.set(f,u),f})(t,e.targetId);H(jt,"remoteStoreListen mapping SDK target ID to remote",e.targetId,s);const i=new Jt(e.target,s,e.purpose,e.sequenceNumber,e.snapshotVersion,e.lastLimboFreeSnapshotVersion,e.resumeToken);t.Ja.set(s,i),fu(t)?du(t):Kr(t).Fn()&&hu(t,i)}function lu(n,e){const t=X(n),r=Kr(t),s=Ac(t,e);H(jt,"remoteStoreUnlisten removing mapping of SDK target ID to remote",e,s),t.Ja.delete(s),t.Ya.delete(e),t.Za.delete(s),r.Fn()&&jd(t,s),t.Ja.size===0&&(r.Fn()?r.Nn():gr(t)&&t.iu.set("Unknown"))}function hu(n,e){if(n.su.We(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(Q.min())>0){const t=n.Za.get(e.targetId);if(t===void 0)return void H(jt,"SDK target ID not found for remote ID: "+e.targetId);const r=n.remoteSyncer.getRemoteKeysForTarget(t).size;e=e.withExpectedCount(r)}Kr(n).jn(e)}function jd(n,e){n.su.We(e),Kr(n).Hn(e)}function du(n){n.su=new a4({getRemoteKeysForTarget:e=>{const t=n.Za.get(e);return t!==void 0?n.remoteSyncer.getRemoteKeysForTarget(t):ne()},dt:e=>n.Ja.get(e)||null,Tt:()=>n.datastore.serializer.databaseId}),Kr(n).start(),n.iu.Wa()}function fu(n){return gr(n)&&!Kr(n).Cn()&&n.Ja.size>0}function gr(n){return X(n).tu.size===0}function Gd(n){n.su=void 0}async function s3(n){n.iu.set("Online")}async function i3(n){n.Ja.forEach(((e,t)=>{hu(n,e)}))}async function o3(n,e){Gd(n),fu(n)?(n.iu.za(e),du(n)):n.iu.set("Unknown")}async function a3(n,e,t){if(n.iu.set("Online"),e instanceof Z2&&e.state===2&&e.cause)try{await(async function(s,i){const o=i.cause;for(const c of i.targetIds){if(s.Ja.has(c)){const u=s.Za.get(c);u!==void 0&&(await s.remoteSyncer.rejectListen(u,o),s.Ya.delete(u),s.Za.delete(c)),s.Ja.delete(c)}s.su.removeTarget(c)}})(n,e)}catch(r){H(jt,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await yo(n,r)}else if(e instanceof Qi?n.su.et(e):e instanceof J2?n.su.ot(e):n.su.rt(e),!t.isEqual(Q.min()))try{const r=await Hd(n.localStore);t.compareTo(r)>=0&&await(function(i,o){const c=i.su.Rt(o);c.targetChanges.forEach(((h,f)=>{if(h.resumeToken.approximateByteSize()>0){const p=i.Ja.get(f);p&&i.Ja.set(f,p.withResumeToken(h.resumeToken,o))}})),c.targetMismatches.forEach(((h,f)=>{const p=i.Ja.get(h);if(!p)return;i.Ja.set(h,p.withResumeToken(ke.EMPTY_BYTE_STRING,p.snapshotVersion)),jd(i,h);const w=new Jt(p.target,h,f,p.sequenceNumber);hu(i,w)}));const u=(function(f,p){const w=new Map;p.targetChanges.forEach(((P,L)=>{const x=f.Za.get(L);x!==void 0&&w.set(x,P)}));let b=new _e(ie);return p.targetMismatches.forEach(((P,L)=>{const x=f.Za.get(P);x!==void 0&&(b=b.insert(x,L))})),new li(p.snapshotVersion,w,b,p.documentUpdates,p.augmentedDocumentUpdates,p.resolvedLimboDocuments)})(i,c);return i.remoteSyncer.applyRemoteEvent(u)})(n,t)}catch(r){H(jt,"Failed to raise snapshot:",r),await yo(n,r)}}async function yo(n,e,t){if(!Hr(e))throw e;n.tu.add(1),await pi(n),n.iu.set("Offline"),t||(t=()=>Hd(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{H(jt,"Retrying IndexedDB access"),await t(),n.tu.delete(1),await ea(n)}))}function Wd(n,e){return e().catch((t=>yo(n,t,e)))}async function ta(n){const e=X(n),t=qn(e);let r=e.Ha.length>0?e.Ha[e.Ha.length-1].batchId:xc;for(;c3(e);)try{const s=await Jg(e.localStore,r);if(s===null){e.Ha.length===0&&t.Nn();break}r=s.batchId,u3(e,s)}catch(s){await yo(e,s)}zd(e)&&Kd(e)}function c3(n){return gr(n)&&n.Ha.length<10}function u3(n,e){n.Ha.push(e);const t=qn(n);t.Fn()&&t.Jn&&t.Yn(e.mutations)}function zd(n){return gr(n)&&!qn(n).Cn()&&n.Ha.length>0}function Kd(n){qn(n).start()}async function l3(n){qn(n).er()}async function h3(n){const e=qn(n);for(const t of n.Ha)e.Yn(t.mutations)}async function d3(n,e,t){const r=n.Ha.shift(),s=iu.from(r,e,t);await Wd(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await ta(n)}async function f3(n,e){e&&qn(n).Jn&&await(async function(r,s){if((function(o){return Z7(o)&&o!==D.ABORTED})(s.code)){const i=r.Ha.shift();qn(r).Mn(),await Wd(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await ta(r)}})(n,e),zd(n)&&Kd(n)}async function lh(n,e){const t=X(n);t.asyncQueue.verifyOperationInProgress(),H(jt,"RemoteStore received new credentials");const r=gr(t);t.tu.add(3),await pi(t),r&&t.iu.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.tu.delete(3),await ea(t)}async function p3(n,e){const t=X(n);e?(t.tu.delete(2),await ea(t)):e||(t.tu.add(2),await pi(t),t.iu.set("Unknown"))}function Kr(n){return n._u||(n._u=(function(t,r,s){const i=X(t);return i.nr(),new O4(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Qt:s3.bind(null,n),zt:i3.bind(null,n),Ht:o3.bind(null,n),zn:a3.bind(null,n)}),n.nu.push((async e=>{e?(n._u.Mn(),fu(n)?du(n):n.iu.set("Unknown")):(await n._u.stop(),Gd(n))}))),n._u}function qn(n){return n.ou||(n.ou=(function(t,r,s){const i=X(t);return i.nr(),new k4(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Qt:()=>Promise.resolve(),zt:l3.bind(null,n),Ht:f3.bind(null,n),Zn:h3.bind(null,n),Xn:d3.bind(null,n)}),n.nu.push((async e=>{e?(n.ou.Mn(),await ta(n)):(await n.ou.stop(),n.Ha.length>0&&(H(jt,`Stopping write stream with ${n.Ha.length} pending writes`),n.Ha=[]))}))),n.ou}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pu{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new nn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const o=Date.now()+r,c=new pu(e,t,o,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new U(D.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function mu(n,e){if(an("AsyncQueue",`${e}: ${n}`),Hr(n))return new U(D.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sr{static emptySet(e){return new sr(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||j.comparator(t.key,r.key):(t,r)=>j.comparator(t.key,r.key),this.keyedMap=Ir(),this.sortedSet=new _e(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,r)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof sr)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new sr;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hh{constructor(){this.au=new _e(j.comparator)}track(e){const t=e.doc.key,r=this.au.get(t);r?e.type!==0&&r.type===3?this.au=this.au.insert(t,e):e.type===3&&r.type!==1?this.au=this.au.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.au=this.au.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.au=this.au.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.au=this.au.remove(t):e.type===1&&r.type===2?this.au=this.au.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.au=this.au.insert(t,{type:2,doc:e.doc}):W(63341,{ft:e,uu:r}):this.au=this.au.insert(t,e)}cu(){const e=[];return this.au.inorderTraversal(((t,r)=>{e.push(r)})),e}}class Ur{constructor(e,t,r,s,i,o,c,u,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,s,i){const o=[];return t.forEach((c=>{o.push({type:0,doc:c})})),new Ur(e,t,sr.emptySet(t),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Jo(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class m3{constructor(){this.lu=void 0,this.Eu=[]}hu(){return this.Eu.some((e=>e.Tu()))}}class g3{constructor(){this.queries=dh(),this.onlineState="Unknown",this.Pu=new Set}terminate(){(function(t,r){const s=X(t),i=s.queries;s.queries=dh(),i.forEach(((o,c)=>{for(const u of c.Eu)u.onError(r)}))})(this,new U(D.ABORTED,"Firestore shutting down"))}}function dh(){return new pr((n=>xd(n)),Jo)}async function gu(n,e){const t=X(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.hu()&&e.Tu()&&(r=2):(i=new m3,r=e.Tu()?0:1);try{switch(r){case 0:i.lu=await t.onListen(s,!0);break;case 1:i.lu=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const c=mu(o,`Initialization of query '${Ue(e.query)?rn(e.query):bs(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.Eu.push(e),e.Ru(t.onlineState),i.lu&&e.Iu(i.lu)&&Eu(t)}async function _u(n,e){const t=X(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const o=i.Eu.indexOf(e);o>=0&&(i.Eu.splice(o,1),i.Eu.length===0?s=e.Tu()?0:1:!i.hu()&&e.Tu()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function _3(n,e){const t=X(n);let r=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const c of o.Eu)c.Iu(s)&&(r=!0);o.lu=s}}r&&Eu(t)}function E3(n,e,t){const r=X(n),s=r.queries.get(e);if(s)for(const i of s.Eu)i.onError(t);r.queries.delete(e)}function Eu(n){n.Pu.forEach((e=>{e.next()}))}var Rc;(function(n){n.Default="default",n.Cache="cache"})(Rc||(Rc={}));class yu{constructor(e,t,r){this.query=e,this.Au=t,this.Vu=!1,this.du=null,this.onlineState="Unknown",this.options=r||{}}Iu(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Ur(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Vu?this.fu(e)&&(this.Au.next(e),t=!0):this.mu(e,this.onlineState)&&(this.pu(e),t=!0),this.du=e,t}onError(e){this.Au.error(e)}Ru(e){this.onlineState=e;let t=!1;return this.du&&!this.Vu&&this.mu(this.du,e)&&(this.pu(this.du),t=!0),t}mu(e,t){if(!e.fromCache||!this.Tu())return!0;const r=t!=="Offline";return(!this.options.waitForSyncWhenOnline||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}fu(e){if(e.docChanges.length>0)return!0;const t=this.du&&this.du.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}pu(e){e=Ur.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Vu=!0,this.Au.next(e)}Tu(){return this.options.source!==Rc.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yd{constructor(e){this.key=e}}class Qd{constructor(e){this.key=e}}class y3{constructor(e,t){this.query=e,this.Ou=t,this.Mu=null,this.hasCachedResults=!1,this.current=!1,this.Nu=ne(),this.mutatedKeys=ne(),this.Lu=Ue(e)?Ic(e):Bc(e),this.Bu=new sr(this.Lu)}get Uu(){return this.Ou}ku(e,t){const r=t?t.qu:new hh,s=t?t.Bu:this.Bu;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,c=!1;const[u,h]=this.$u(this.query,s);e.inorderTraversal(((p,w)=>{const b=s.get(p),P=Ng(this.query,w)?w:null,L=!!b&&this.mutatedKeys.has(b.key),x=!!P&&(P.hasLocalMutations||this.mutatedKeys.has(P.key)&&P.hasCommittedMutations);let z=!1;b&&P?b.data.isEqual(P.data)?L!==x&&(r.track({type:3,doc:P}),z=!0):this.Ku(b,P)||(r.track({type:2,doc:P}),z=!0,(u&&this.Lu(P,u)>0||h&&this.Lu(P,h)<0)&&(c=!0)):!b&&P?(r.track({type:0,doc:P}),z=!0):b&&!P&&(r.track({type:1,doc:b}),z=!0,(u||h)&&(c=!0)),z&&(P?(o=o.add(P),i=x?i.add(p):i.delete(p)):(o=o.delete(p),i=i.delete(p)))}));const f=this.Wu(this.query);if(f)if(Ue(this.query)){const p=[];o.forEach((P=>p.push(P)));const w=Fd(this.query,p);let b=new sr(Ic(this.query));for(const P of w)b=b.add(P);o.forEach((P=>{b.has(P.key)||(i=i.delete(P.key),r.track({type:1,doc:P}))})),o=b}else{const p=this.Qu(this.query);for(;o.size>f;){const w=p==="F"?o.last():o.first();o=o.delete(w.key),i=i.delete(w.key),r.track({type:1,doc:w})}}return{Bu:o,qu:r,Uo:c,mutatedKeys:i}}Wu(e){return Ue(e)?Ka(e)?.limit:e.limit||void 0}Qu(e){if(Ue(e)){const t=Ka(e);return t&&t.limit<0?"L":"F"}return e.limitType}$u(e,t){if(Ue(e)){const r=Ka(e)?.limit;return[t.size===r?t.last():null,null]}return[e.limitType==="F"&&t.size===this.Wu(this.query)?t.last():null,e.limitType==="L"&&t.size===this.Wu(this.query)?t.first():null]}Ku(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.Bu;this.Bu=e.Bu,this.mutatedKeys=e.mutatedKeys;const o=e.qu.cu();o.sort(((f,p)=>(function(b,P){const L=x=>{switch(x){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return W(20277,{ft:x})}};return L(b)-L(P)})(f.type,p.type)||this.Lu(f.doc,p.doc))),this.Gu(r),s=s??!1;const c=t&&!s?this.zu():[],u=this.Nu.size===0&&this.current&&!s?1:0,h=u!==this.Mu;return this.Mu=u,o.length!==0||h?{snapshot:new Ur(this.query,e.Bu,i,o,e.mutatedKeys,u===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),ju:c}:{ju:c}}Ru(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Bu:this.Bu,qu:new hh,mutatedKeys:this.mutatedKeys,Uo:!1},!1)):{ju:[]}}Hu(e){return!this.Ou.has(e)&&!!this.Bu.has(e)&&!this.Bu.get(e).hasLocalMutations}Gu(e){e&&(e.addedDocuments.forEach((t=>this.Ou=this.Ou.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Ou=this.Ou.delete(t))),this.current=e.current)}zu(){if(!this.current)return[];const e=this.Nu;this.Nu=ne(),this.Bu.forEach((r=>{this.Hu(r.key)&&(this.Nu=this.Nu.add(r.key))}));const t=[];return e.forEach((r=>{this.Nu.has(r)||t.push(new Qd(r))})),this.Nu.forEach((r=>{e.has(r)||t.push(new Yd(r))})),t}Ju(e){this.Ou=e.Jo,this.Nu=ne();const t=this.ku(e.documents);return this.applyChanges(t,!0)}Yu(){return Ur.fromInitialDocuments(this.query,this.Bu,this.mutatedKeys,this.Mu===0,this.hasCachedResults)}}const wu="SyncEngine";class w3{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class I3{constructor(e){this.key=e,this.Zu=!1}}class T3{constructor(e,t,r,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Xu={},this.ec=new pr((c=>xd(c)),Jo),this.tc=new Map,this.nc=new Set,this.rc=new _e(j.comparator),this.sc=new Map,this._c=new ou,this.oc={},this.ac=new Map,this.uc=Hn.Cs(),this.onlineState="Unknown",this.cc=void 0}get isPrimaryClient(){return this.cc===!0}}async function A3(n,e,t=!0){const r=nf(n);let s;const i=r.ec.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Yu()):s=await Xd(r,e,t,!0),s}async function R3(n,e){const t=nf(n);await Xd(t,e,!0,!1)}async function Xd(n,e,t,r){const s=await Zg(n.localStore,Ue(e)?e:Bt(e)),i=s.targetId,o=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await v3(n,e,i,o==="current",s.resumeToken)),n.isPrimaryClient&&t&&qd(n.remoteStore,s),c}async function v3(n,e,t,r,s){n.lc=(p,w,b)=>(async function(L,x,z,te){let re=x.view.ku(z);re.Uo&&(re=await ch(L.localStore,x.query,!1).then((({documents:A})=>x.view.ku(A,re))));const he=te&&te.targetChanges.get(x.targetId),Ve=te&&te.targetMismatches.get(x.targetId)!=null,Ee=x.view.applyChanges(re,L.isPrimaryClient,he,Ve);return ph(L,x.targetId,Ee.ju),Ee.snapshot})(n,p,w,b);const i=await ch(n.localStore,e,!0),o=new y3(e,i.Jo),c=o.ku(i.documents),u=hi.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),h=o.applyChanges(c,n.isPrimaryClient,u);ph(n,t,h.ju);const f=new w3(e,t,o);return n.ec.set(e,f),n.tc.has(t)?n.tc.get(t).push(e):n.tc.set(t,[e]),h.snapshot}async function C3(n,e,t){const r=X(n),s=r.ec.get(e),i=r.tc.get(s.targetId);if(i.length>1)return r.tc.set(s.targetId,i.filter((o=>!Jo(o,e)))),void r.ec.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Tc(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),t&&lu(r.remoteStore,s.targetId),vc(r,s.targetId)})).catch($r)):(vc(r,s.targetId),await Tc(r.localStore,s.targetId,!0))}async function S3(n,e){const t=X(n),r=t.ec.get(e),s=t.tc.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),lu(t.remoteStore,r.targetId))}async function P3(n,e,t){const r=L3(n);try{const s=await(function(o,c){const u=X(o),h=me.now(),f=c.reduce(((b,P)=>b.add(P.key)),ne());let p,w;return u.persistence.runTransaction("Locally write mutations","readwrite",(b=>{let P=ct(),L=ne();return u.Qo.getEntries(b,f).next((x=>{P=x,P.forEach(((z,te)=>{te.isValidDocument()||(L=L.add(z))}))})).next((()=>u.localDocuments.getOverlayedDocuments(b,P))).next((x=>{p=x;const z=[];for(const te of c){const re=V7(te,p.get(te.key).overlayedDocument);re!=null&&z.push(new zn(te.key,re,N2(re.value.mapValue),St.exists(!0)))}return u.mutationQueue.addMutationBatch(b,h,z,c)})).next((x=>{w=x;const z=x.applyToLocalDocumentSet(p,L);return u.documentOverlayCache.saveOverlays(b,x.batchId,z)}))})).then((()=>({batchId:w.batchId,changes:Q2(p)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),(function(o,c,u){let h=o.oc[o.currentUser.toKey()];h||(h=new _e(ie)),h=h.insert(c,u),o.oc[o.currentUser.toKey()]=h})(r,s.batchId,t),await mi(r,s.changes),await ta(r.remoteStore)}catch(s){const i=mu(s,"Failed to persist write");t.reject(i)}}async function Jd(n,e){const t=X(n);try{const r=await Qg(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const o=t.sc.get(i);o&&(q(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.Zu=!0:s.modifiedDocuments.size>0?q(o.Zu,14607):s.removedDocuments.size>0&&(q(o.Zu,42227),o.Zu=!1))})),await mi(t,r,e)}catch(r){await $r(r)}}function fh(n,e,t){const r=X(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.ec.forEach(((i,o)=>{const c=o.view.Ru(e);c.snapshot&&s.push(c.snapshot)})),(function(o,c){const u=X(o);u.onlineState=c;let h=!1;u.queries.forEach(((f,p)=>{for(const w of p.Eu)w.Ru(c)&&(h=!0)})),h&&Eu(u)})(r.eventManager,e),s.length&&r.Xu.zn(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function b3(n,e,t){const r=X(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.sc.get(e),i=s&&s.key;if(i){let o=new _e(j.comparator);o=o.insert(i,Xe.newNoDocument(i,Q.min()));const c=ne().add(i),u=new li(Q.min(),new Map,new _e(ie),o,ct(),c);await Jd(r,u),r.rc=r.rc.remove(i),r.sc.delete(e),Iu(r)}else await Tc(r.localStore,e,!1).then((()=>vc(r,e,t))).catch($r)}async function N3(n,e){const t=X(n),r=e.batch.batchId;try{const s=await Yg(t.localStore,e);ef(t,r,null),Zd(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await mi(t,s)}catch(s){await $r(s)}}async function O3(n,e,t){const r=X(n);try{const s=await(function(o,c){const u=X(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let f;return u.mutationQueue.lookupMutationBatch(h,c).next((p=>(q(p!==null,37113),f=p.keys(),u.mutationQueue.removeMutationBatch(h,p)))).next((()=>u.mutationQueue.performConsistencyCheck(h))).next((()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,c))).next((()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f))).next((()=>u.localDocuments.getDocuments(h,f)))}))})(r.localStore,e);ef(r,e,t),Zd(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await mi(r,s)}catch(s){await $r(s)}}function Zd(n,e){(n.ac.get(e)||[]).forEach((t=>{t.resolve()})),n.ac.delete(e)}function ef(n,e,t){const r=X(n);let s=r.oc[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.oc[r.currentUser.toKey()]=s}}function vc(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.tc.get(e))n.ec.delete(r),t&&n.Xu.Ec(r,t);n.tc.delete(e),n.isPrimaryClient&&n._c.s_(e).forEach((r=>{n._c.containsKey(r)||tf(n,r)}))}function tf(n,e){n.nc.delete(e.path.canonicalString());const t=n.rc.get(e);t!==null&&(lu(n.remoteStore,t),n.rc=n.rc.remove(e),n.sc.delete(t),Iu(n))}function ph(n,e,t){for(const r of t)r instanceof Yd?(n._c.addReference(r.key,e),k3(n,r)):r instanceof Qd?(H(wu,"Document no longer in limbo: "+r.key),n._c.removeReference(r.key,e),n._c.containsKey(r.key)||tf(n,r.key)):W(19791,{hc:r})}function k3(n,e){const t=e.key,r=t.path.canonicalString();n.rc.get(t)||n.nc.has(r)||(H(wu,"New document in limbo: "+t),n.nc.add(r),Iu(n))}function Iu(n){for(;n.nc.size>0&&n.rc.size<n.maxConcurrentLimboResolutions;){const e=n.nc.values().next().value;n.nc.delete(e);const t=new j(de.fromString(e)),r=n.uc.next();n.sc.set(r,new I3(t)),n.rc=n.rc.insert(t,r),qd(n.remoteStore,new Jt(Bt(Bo(t.path)),r,"TargetPurposeLimboResolution",Do.ce))}}async function mi(n,e,t){const r=X(n),s=[],i=[],o=[];r.ec.isEmpty()||(r.ec.forEach(((c,u)=>{o.push(r.lc(u,e,t).then((h=>{if((h||t)&&r.isPrimaryClient){const f=h?!h.fromCache:t?.targetChanges.get(u.targetId)?.current;r.sharedClientState.updateQueryState(u.targetId,f?"current":"not-current")}if(h){s.push(h);const f=cu.vo(u.targetId,h);i.push(f)}})))})),await Promise.all(o),r.Xu.zn(s),await(async function(u,h){const f=X(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(p=>V.forEach(h,(w=>V.forEach(w.wo,(b=>f.persistence.referenceDelegate.addReference(p,w.targetId,b))).next((()=>V.forEach(w.bo,(b=>f.persistence.referenceDelegate.removeReference(p,w.targetId,b)))))))))}catch(p){if(!Hr(p))throw p;H(uu,"Failed to update sequence numbers: "+p)}for(const p of h){const w=p.targetId;if(!p.fromCache){const b=f.$o.get(w),P=b.snapshotVersion,L=b.withLastLimboFreeSnapshotVersion(P);f.$o=f.$o.insert(w,L)}}})(r.localStore,i))}async function D3(n,e){const t=X(n);if(!t.currentUser.isEqual(e)){H(wu,"User change. New user:",e.toKey());const r=await $d(t.localStore,e);t.currentUser=e,(function(i,o){i.ac.forEach((c=>{c.forEach((u=>{u.reject(new U(D.CANCELLED,o))}))})),i.ac.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await mi(t,r.zo)}}function V3(n,e){const t=X(n),r=t.sc.get(e);if(r&&r.Zu)return ne().add(r.key);{let s=ne();const i=t.tc.get(e);if(!i)return s;for(const o of i??[]){const c=t.ec.get(o);s=s.unionWith(c.view.Uu)}return s}}function nf(n){const e=X(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Jd.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=V3.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=b3.bind(null,e),e.Xu.zn=_3.bind(null,e.eventManager),e.Xu.Ec=E3.bind(null,e.eventManager),e}function L3(n){const e=X(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=N3.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=O3.bind(null,e),e}class wo{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Ho(e.databaseInfo.databaseId),this.sharedClientState=this.Rc(e),this.persistence=this.Ic(e),await this.persistence.start(),this.localStore=this.Ac(e),this.gcScheduler=this.Vc(e,this.localStore),this.indexBackfillerScheduler=this.dc(e,this.localStore)}Vc(e,t){return null}dc(e,t){return null}Ac(e){return Kg(this.persistence,new Gg,e.initialUser,this.serializer)}Ic(e){return new Bd(au.C_,this.serializer)}Rc(e){return new t3}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}wo.provider={build:()=>new wo};class x3 extends wo{constructor(e){super(),this.cacheSizeBytes=e}Vc(e,t){q(this.persistence.referenceDelegate instanceof Eo,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new F4(r,e.asyncQueue,t)}Ic(e){const t=this.cacheSizeBytes!==void 0?at.withCacheSize(this.cacheSizeBytes):at.DEFAULT;return new Bd((r=>Eo.C_(r,t)),this.serializer)}}class Cc{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>fh(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=D3.bind(null,this.syncEngine),await p3(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new g3})()}createDatastore(e){const t=Ho(e.databaseInfo.databaseId),r=N4(e.databaseInfo);return L4(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,s,i,o,c){return new r3(r,s,i,o,c)})(this.localStore,this.datastore,e.asyncQueue,(t=>fh(this.syncEngine,t,0)),(function(){return Jl.C()?new Jl:new C4})())}createSyncEngine(e,t){return(function(s,i,o,c,u,h,f){const p=new T3(s,i,o,c,u,h);return f&&(p.cc=!0),p})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await(async function(t){const r=X(t);H(jt,"RemoteStore shutting down."),r.tu.add(5),await pi(r),r.ru.shutdown(),r.iu.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}Cc.provider={build:()=>new Cc};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tu{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.mc(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.mc(this.observer.error,e):an("Uncaught Error in snapshot listener:",e.toString()))}gc(){this.muted=!0}mc(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jn="FirestoreClient";class M3{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=s,this.user=Qe.UNAUTHENTICATED,this.clientId=Lc.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async o=>{H(jn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(r,(o=>(H(jn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new nn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=mu(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function Qa(n,e){n.asyncQueue.verifyOperationInProgress(),H(jn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await $d(e.localStore,s),r=s)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function mh(n,e){n.asyncQueue.verifyOperationInProgress();const t=await U3(n);H(jn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>lh(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>lh(e.remoteStore,s))),n._onlineComponents=e}async function U3(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){H(jn,"Using user provided OfflineComponentProvider");try{await Qa(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===D.FAILED_PRECONDITION||s.code===D.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;kt("Error using user provided cache. Falling back to memory cache: "+t),await Qa(n,new wo)}}else H(jn,"Using default OfflineComponentProvider"),await Qa(n,new x3(void 0));return n._offlineComponents}async function rf(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(H(jn,"Using user provided OnlineComponentProvider"),await mh(n,n._uninitializedComponentsProvider._online)):(H(jn,"Using default OnlineComponentProvider"),await mh(n,new Cc))),n._onlineComponents}function F3(n){return rf(n).then((e=>e.syncEngine))}async function Io(n){const e=await rf(n),t=e.eventManager;return t.onListen=A3.bind(null,e.syncEngine),t.onUnlisten=C3.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=R3.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=S3.bind(null,e.syncEngine),t}function B3(n,e,t,r){const s=new Tu(r),i=new yu(e,s,t);return n.asyncQueue.enqueueAndForget((async()=>gu(await Io(n),i))),()=>{s.gc(),n.asyncQueue.enqueueAndForget((async()=>_u(await Io(n),i)))}}function sf(n,e,t={}){const r=new nn;return n.asyncQueue.enqueueAndForget((async()=>(function(i,o,c,u,h){const f=new Tu({next:w=>{f.gc(),o.enqueueAndForget((()=>_u(i,p)));const b=w.docs.has(c);!b&&w.fromCache?h.reject(new U(D.UNAVAILABLE,"Failed to get document because the client is offline.")):b&&w.fromCache&&u&&u.source==="server"?h.reject(new U(D.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(w)},error:w=>h.reject(w)}),p=new yu(Bo(c.path),f,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return gu(i,p)})(await Io(n),n.asyncQueue,e,t,r))),r.promise}function $3(n,e,t={}){const r=new nn;return n.asyncQueue.enqueueAndForget((async()=>(function(i,o,c,u,h){const f=new Tu({next:w=>{f.gc(),o.enqueueAndForget((()=>_u(i,p))),w.fromCache&&u.source==="server"?h.reject(new U(D.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(w)},error:w=>h.reject(w)}),p=new yu(c instanceof Os?Ag(c):c,f,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return gu(i,p)})(await Io(n),n.asyncQueue,e,t,r))),r.promise}function H3(n,e){const t=new nn;return n.asyncQueue.enqueueAndForget((async()=>P3(await F3(n),e,t))),t.promise}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gh="AsyncQueue";class _h{constructor(e=Promise.resolve()){this.qc=[],this.$c=!1,this.Kc=[],this.Wc=null,this.Qc=!1,this.Gc=!1,this.zc=[],this.xn=new ld(this,"async_queue_retry"),this.jc=()=>{const r=Ya();r&&H(gh,"Visibility state changed to "+r.visibilityState),this.xn.gn()},this.Hc=e;const t=Ya();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.jc)}get isShuttingDown(){return this.$c}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Jc(),this.Yc(e)}enterRestrictedMode(e){if(!this.$c){this.$c=!0,this.Gc=e||!1;const t=Ya();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.jc)}}enqueue(e){if(this.Jc(),this.$c)return new Promise((()=>{}));const t=new nn;return this.Yc((()=>this.$c&&this.Gc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.qc.push(e),this.Zc())))}async Zc(){if(this.qc.length!==0){try{await this.qc[0](),this.qc.shift(),this.xn.reset()}catch(e){if(!Hr(e))throw e;H(gh,"Operation failed with retryable error: "+e)}this.qc.length>0&&this.xn.mn((()=>this.Zc()))}}Yc(e){const t=this.Hc.then((()=>(this.Qc=!0,e().catch((r=>{throw this.Wc=r,this.Qc=!1,an("INTERNAL UNHANDLED ERROR: ",Eh(r)),r})).then((r=>(this.Qc=!1,r))))));return this.Hc=t,t}enqueueAfterDelay(e,t,r){this.Jc(),this.zc.indexOf(e)>-1&&(t=0);const s=pu.createAndSchedule(this,e,t,r,(i=>this.Xc(i)));return this.Kc.push(s),s}Jc(){this.Wc&&W(47125,{el:Eh(this.Wc)})}verifyOperationInProgress(){}async tl(){let e;do e=this.Hc,await e;while(e!==this.Hc)}nl(e){for(const t of this.Kc)if(t.timerId===e)return!0;return!1}rl(e){return this.tl().then((()=>{this.Kc.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.Kc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.tl()}))}il(e){this.zc.push(e)}Xc(e){const t=this.Kc.indexOf(e);this.Kc.splice(t,1)}}function Eh(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class Gt extends jo{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new _h,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new _h(e),this._firestoreClient=void 0,await e}}}function hE(n,e,t){t||(t=$s);const r=ii(n,"firestore");if(r.isInitialized(t)){const s=r.getImmediate({identifier:t}),i=r.getOptions(t);if(kn(i,e))return s;throw new U(D.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new U(D.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<fd)throw new U(D.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return e.host&&Gn(e.host)&&No(e.host),r.initialize({options:e,instanceIdentifier:t})}function dE(n,e){const t=typeof n=="object"?n:Dc(),r=typeof n=="string"?n:$s,s=ii(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=n2("firestore");i&&H4(s,...i)}return s}function gi(n){if(n._terminated)throw new U(D.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||q3(n),n._firestoreClient}function q3(n){const e=n._freezeSettings(),t=M4(n._databaseId,n._app?.options.appId||"",n._persistenceKey,n._app?.options.apiKey,e);n._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new M3(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(s){const i=s?._online.build();return{_offline:s?._offline.build(i),_online:i}})(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j3{convertValue(e,t="none"){switch(De(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ye(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(xn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw W(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Wn(e,((s,i)=>{r[s]=this.convertValue(i,t)})),r}convertVectorValue(e){const t=e.fields?.[qs].arrayValue?.values?.map((r=>ye(r.doubleValue)));return new ut(t)}convertGeoPoint(e){return new Ht(ye(e.latitude),ye(e.longitude))}convertArray(e,t){return(e.values||[]).map((r=>this.convertValue(r,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const r=ci(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Dr(e));default:return null}}convertTimestamp(e){const t=Ln(e);return new me(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=de.fromString(e);q(od(r),9688,{name:e});const s=new Hs(r.get(1),r.get(3)),i=new j(r.popFirst(5));return s.isEqual(t)||an(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Au extends j3{constructor(e){super(),this.firestore=e}convertBytes(e){return new Tt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ge(this.firestore,null,t)}}const yh="@firebase/firestore",wh="4.16.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ih(n){return(function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1})(n,["next","error","complete"])}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class of{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new ge(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new G3(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(e){if(this._document){const t=this._document.data.field(Fn("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class G3 extends of{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function af(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new U(D.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Ru{}class cf extends Ru{}function fE(n,e,...t){let r=[];e instanceof Ru&&r.push(e),r=r.concat(t),(function(i){const o=i.filter((u=>u instanceof vu)).length,c=i.filter((u=>u instanceof na)).length;if(o>1||o>0&&c>0)throw new U(D.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const s of r)n=s._apply(n);return n}class na extends cf{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new na(e,t,r)}_apply(e){const t=this._parse(e);return uf(e._query,t),new Kn(e.firestore,e.converter,pc(e._query,t))}_parse(e){const t=Go(e.firestore);return(function(i,o,c,u,h,f,p){let w;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new U(D.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Ah(p,f);const P=[];for(const L of p)P.push(Th(u,i,L));w={arrayValue:{values:P}}}else w=Th(u,i,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Ah(p,f),w=Y4(c,o,p,f==="in"||f==="not-in");return be.create(h,f,w)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function pE(n,e,t){const r=e,s=Fn("where",n);return na._create(s,r,t)}class vu extends Ru{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new vu(e,t)}_parse(e){const t=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return t.length===1?t[0]:Dt.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let o=s;const c=i.getFlattenedFilters();for(const u of c)uf(o,u),o=pc(o,u)})(e._query,t),new Kn(e.firestore,e.converter,pc(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Cu extends cf{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Cu(e,t)}_apply(e){const t=(function(s,i,o){if(s.startAt!==null)throw new U(D.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new U(D.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Ks(i,o)})(e._query,this._field,this._direction);return new Kn(e.firestore,e.converter,Y7(e._query,t))}}function mE(n,e="asc"){const t=e,r=Fn("orderBy",n);return Cu._create(r,t)}function Th(n,e,t){if(typeof(t=J(t))=="string"){if(t==="")throw new U(D.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!z2(e)&&t.indexOf("/")!==-1)throw new U(D.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(de.fromString(t));if(!j.isDocumentKey(r))throw new U(D.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Ml(n,new j(r))}if(t instanceof ge)return Ml(n,t._key);throw new U(D.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ko(t)}.`)}function Ah(n,e){if(!Array.isArray(n)||n.length===0)throw new U(D.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function uf(n,e){const t=(function(s,i){for(const o of s)for(const c of o.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null})(n.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new U(D.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new U(D.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function lf(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class Ts{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class ir extends of{constructor(e,t,r,s,i,o){super(e,t,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Zi(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Fn("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new U(D.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=ir._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}ir._jsonSchemaVersion="firestore/documentSnapshot/1.0",ir._jsonSchema={type:Ne("string",ir._jsonSchemaVersion),bundleSource:Ne("string","DocumentSnapshot"),bundleName:Ne("string"),bundle:Ne("string")};class Zi extends ir{data(e={}){return super.data(e)}}class or{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Ts(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new Zi(this._firestore,this._userDataWriter,r.key,r,new Ts(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new U(D.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map((c=>{Ue(s._snapshot.query)?Ic(s._snapshot.query):Bc(s.query._query);const u=new Zi(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Ts(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}}))}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>i||c.type!==3)).map((c=>{const u=new Zi(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Ts(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return c.type!==0&&(h=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),f=o.indexOf(c.doc.key)),{type:W3(c.type),doc:u,oldIndex:h,newIndex:f}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new U(D.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=or._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Lc.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function W3(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return W(61501,{type:n})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */or._jsonSchemaVersion="firestore/querySnapshot/1.0",or._jsonSchema={type:Ne("string",or._jsonSchemaVersion),bundleSource:Ne("string","QuerySnapshot"),bundleName:Ne("string"),bundle:Ne("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gE(n){n=Je(n,ge);const e=Je(n.firestore,Gt),t=gi(e);return sf(t,n._key).then((r=>Su(e,n,r)))}function _E(n){n=Je(n,ge);const e=Je(n.firestore,Gt),t=gi(e);return sf(t,n._key,{source:"server"}).then((r=>Su(e,n,r)))}function EE(n){n=Je(n,Kn);const e=Je(n.firestore,Gt),t=gi(e),r=new Au(e);return af(n._query),$3(t,n._query).then((s=>new or(e,r,n,s)))}function yE(n,e,t){n=Je(n,ge);const r=Je(n.firestore,Gt),s=lf(n.converter,e,t),i=Go(r);return ra(r,[_d(i,"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,St.none())])}function wE(n,e,t,...r){n=Je(n,ge);const s=Je(n.firestore,Gt),i=Go(s);let o;return o=typeof(e=J(e))=="string"||e instanceof qo?K4(i,"updateDoc",n._key,e,t,r):z4(i,"updateDoc",n._key,e),ra(s,[o.toMutation(n._key,St.exists(!0))])}function IE(n){return ra(Je(n.firestore,Gt),[new Fc(n._key,St.none())])}function TE(n,e){const t=Je(n.firestore,Gt),r=q4(n),s=lf(n.converter,e),i=Go(n.firestore);return ra(t,[_d(i,"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,St.exists(!1))]).then((()=>r))}function AE(n,...e){n=J(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||Ih(e[r])||(t=e[r++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(Ih(e[r])){const h=e[r];e[r]=h.next?.bind(h),e[r+1]=h.error?.bind(h),e[r+2]=h.complete?.bind(h)}let i,o,c;if(n instanceof ge)o=Je(n.firestore,Gt),c=Bo(n._key.path),i={next:h=>{e[r]&&e[r](Su(o,n,h))},error:e[r+1],complete:e[r+2]};else{const h=Je(n,Kn);o=Je(h.firestore,Gt),c=h._query;const f=new Au(o);i={next:p=>{e[r]&&e[r](new or(o,f,h,p))},error:e[r+1],complete:e[r+2]},af(n._query)}const u=gi(o);return B3(u,c,s,i)}function ra(n,e){const t=gi(n);return H3(t,e)}function Su(n,e,t){const r=t.docs.get(e._key),s=new Au(n);return new ir(n,s,e._key,r,new Ts(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){t7(fr),cr(new Dn("firestore",((r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),c=new Gt(new s7(r.getProvider("auth-internal")),new a7(o,r.getProvider("app-check-internal")),C7(o,s),o);return i={useFetchStreams:t,...i},c._setSettings(i),c}),"PUBLIC").setMultipleInstances(!0)),tn(yh,wh,e),tn(yh,wh,"esm2020")})();function hf(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const z3=hf,df=new si("auth","Firebase",hf());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const To=new Oc("@firebase/auth");function K3(n,...e){To.logLevel<=oe.WARN&&To.warn(`Auth (${fr}): ${n}`,...e)}function eo(n,...e){To.logLevel<=oe.ERROR&&To.error(`Auth (${fr}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bt(n,...e){throw bu(n,...e)}function lt(n,...e){return bu(n,...e)}function Pu(n,e,t){const r={...z3(),[e]:t};return new si("auth","Firebase",r).create(e,{appName:n.name})}function ot(n){return Pu(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function sa(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&bt(n,"argument-error"),Pu(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function bu(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return df.create(n,...e)}function $(n,e,...t){if(!n)throw bu(e,...t)}function Zt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw eo(e),new Error(e)}function un(n,e){n||Zt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ti(){return typeof self<"u"&&self.location?.href||""}function Nu(){return Rh()==="http:"||Rh()==="https:"}function Rh(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Y3(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Nu()||Ap()||"connection"in navigator)?navigator.onLine:!0}function Q3(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _i{constructor(e,t){this.shortDelay=e,this.longDelay=t,un(t>e,"Short delay should be less than long delay!"),this.isMobile=wp()||Rp()}get(){return Y3()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ou(n,e){un(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ff{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Zt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Zt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Zt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const X3={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const J3=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Z3=new _i(3e4,6e4);function Fe(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function Be(n,e,t,r,s={}){return pf(n,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const c=Fr({...o,key:n.config.apiKey}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const h={method:e,headers:u,...i};return Tp()||(h.referrerPolicy="strict-origin-when-cross-origin"),n.emulatorConfig&&Gn(n.emulatorConfig.host)&&(h.credentials="include"),ff.fetch()(await mf(n,n.config.apiHost,t,c),h)})}async function pf(n,e,t){n._canInitEmulator=!1;const r={...X3,...e};try{const s=new t9(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw As(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[u,h]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw As(n,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw As(n,"email-already-in-use",o);if(u==="USER_DISABLED")throw As(n,"user-disabled",o);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Pu(n,f,h);bt(n,f)}}catch(s){if(s instanceof Kt)throw s;bt(n,"network-request-failed",{message:String(s)})}}async function hn(n,e,t,r,s={}){const i=await Be(n,e,t,r,s);return"mfaPendingCredential"in i&&bt(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function mf(n,e,t,r){const s=`${e}${t}?${r}`,i=n,o=i.config.emulator?Ou(n.config,s):`${n.config.apiScheme}://${s}`;return J3.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function e9(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class t9{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(lt(this.auth,"network-request-failed")),Z3.get())})}}function As(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=lt(n,e,r);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vh(n){return n!==void 0&&n.getResponse!==void 0}function Ch(n){return n!==void 0&&n.enterprise!==void 0}class gf{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return e9(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function n9(n){return(await Be(n,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function _f(n,e){return Be(n,"GET","/v2/recaptchaConfig",Fe(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function r9(n,e){return Be(n,"POST","/v1/accounts:delete",e)}async function s9(n,e){return Be(n,"POST","/v1/accounts:update",e)}async function Ao(n,e){return Be(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ds(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function i9(n,e=!1){const t=J(n),r=await t.getIdToken(e),s=ia(r);$(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i?.sign_in_provider;return{claims:s,token:r,authTime:Ds(Xa(s.auth_time)),issuedAtTime:Ds(Xa(s.iat)),expirationTime:Ds(Xa(s.exp)),signInProvider:o||null,signInSecondFactor:i?.sign_in_second_factor||null}}function Xa(n){return Number(n)*1e3}function ia(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return eo("JWT malformed, contained fewer than 3 sections"),null;try{const s=e2(t);return s?JSON.parse(s):(eo("Failed to decode base64 JWT payload"),null)}catch(s){return eo("Caught error parsing JWT payload as JSON",s?.toString()),null}}function Sh(n){const e=ia(n);return $(e,"internal-error"),$(typeof e.exp<"u","internal-error"),$(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Kt&&o9(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function o9({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a9{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sc{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ds(this.lastLoginAt),this.creationTime=Ds(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ni(n){const e=n.auth,t=await n.getIdToken(),r=await hr(n,Ao(e,{idToken:t}));$(r?.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=s.providerUserInfo?.length?yf(s.providerUserInfo):[],o=c9(n.providerData,i),c=n.isAnonymous,u=!(n.email&&s.passwordHash)&&!o?.length,h=c?u:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Sc(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(n,f)}async function Ef(n){const e=J(n);await ni(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function c9(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function yf(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function u9(n,e){const t=await pf(n,{},async()=>{const r=Fr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,o=await mf(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:r};return n.emulatorConfig&&Gn(n.emulatorConfig.host)&&(u.credentials="include"),ff.fetch()(o,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function l9(n,e){return Be(n,"POST","/v2/accounts:revokeToken",Fe(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){$(e.idToken,"internal-error"),$(typeof e.idToken<"u","internal-error"),$(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Sh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){$(e.length!==0,"internal-error");const t=Sh(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:($(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await u9(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,o=new Sr;return r&&($(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&($(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&($(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Sr,this.toJSON())}_performRefresh(){return Zt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function En(n,e){$(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Ot{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new a9(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Sc(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await hr(this,this.stsTokenManager.getToken(this.auth,e));return $(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return i9(this,e)}reload(){return Ef(this)}_assign(e){this!==e&&($(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Ot({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){$(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await ni(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Pe(this.auth.app))return Promise.reject(ot(this.auth));const e=await this.getIdToken();return await hr(this,r9(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,o=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,h=t.createdAt??void 0,f=t.lastLoginAt??void 0,{uid:p,emailVerified:w,isAnonymous:b,providerData:P,stsTokenManager:L}=t;$(p&&L,e,"internal-error");const x=Sr.fromJSON(this.name,L);$(typeof p=="string",e,"internal-error"),En(r,e.name),En(s,e.name),$(typeof w=="boolean",e,"internal-error"),$(typeof b=="boolean",e,"internal-error"),En(i,e.name),En(o,e.name),En(c,e.name),En(u,e.name),En(h,e.name),En(f,e.name);const z=new Ot({uid:p,auth:e,email:s,emailVerified:w,displayName:r,isAnonymous:b,photoURL:o,phoneNumber:i,tenantId:c,stsTokenManager:x,createdAt:h,lastLoginAt:f});return P&&Array.isArray(P)&&(z.providerData=P.map(te=>({...te}))),u&&(z._redirectEventId=u),z}static async _fromIdTokenResponse(e,t,r=!1){const s=new Sr;s.updateFromServerResponse(t);const i=new Ot({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await ni(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];$(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?yf(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!i?.length,c=new Sr;c.updateFromIdToken(r);const u=new Ot({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Sc(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(u,h),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ph=new Map;function en(n){un(n instanceof Function,"Expected a class definition");let e=Ph.get(n);return e?(un(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Ph.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wf{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}wf.type="NONE";const Pc=wf;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function to(n,e,t){return`firebase:${n}:${e}:${t}`}class Pr{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=to(this.userKey,s.apiKey,i),this.fullPersistenceKey=to("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Ao(this.auth,{idToken:e}).catch(()=>{});return t?Ot._fromGetAccountInfoResponse(this.auth,t,e):null}return Ot._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Pr(en(Pc),e,r);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||en(Pc);const o=to(r,e.config.apiKey,e.name);let c=null;for(const h of t)try{const f=await h._get(o);if(f){let p;if(typeof f=="string"){const w=await Ao(e,{idToken:f}).catch(()=>{});if(!w)break;p=await Ot._fromGetAccountInfoResponse(e,w,f)}else p=Ot._fromJSON(e,f);h!==i&&(c=p),i=h;break}}catch{}const u=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Pr(i,e,r):(i=u[0],c&&await i._set(o,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new Pr(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bh(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Rf(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(If(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Cf(e))return"Blackberry";if(Sf(e))return"Webos";if(Tf(e))return"Safari";if((e.includes("chrome/")||Af(e))&&!e.includes("edge/"))return"Chrome";if(vf(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function If(n=Ze()){return/firefox\//i.test(n)}function Tf(n=Ze()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Af(n=Ze()){return/crios\//i.test(n)}function Rf(n=Ze()){return/iemobile/i.test(n)}function vf(n=Ze()){return/android/i.test(n)}function Cf(n=Ze()){return/blackberry/i.test(n)}function Sf(n=Ze()){return/webos/i.test(n)}function ku(n=Ze()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function h9(n=Ze()){return ku(n)&&!!window.navigator?.standalone}function d9(){return vp()&&document.documentMode===10}function Pf(n=Ze()){return ku(n)||vf(n)||Sf(n)||Cf(n)||/windows phone/i.test(n)||Rf(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bf(n,e=[]){let t;switch(n){case"Browser":t=bh(Ze());break;case"Worker":t=`${bh(Ze())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${fr}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f9{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((o,c)=>{try{const u=e(i);o(u)}catch(u){c(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function p9(n,e={}){return Be(n,"GET","/v2/passwordPolicy",Fe(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const m9=6;class g9{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??m9,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _9{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Nh(this),this.idTokenSubscription=new Nh(this),this.beforeStateQueue=new f9(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=df,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=en(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Pr.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Ao(this,{idToken:e}),r=await Ot._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Pe(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(o,o))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,o=r?._redirectEventId,c=await this.tryRedirectSignIn(e);(!i||i===o)&&c?.user&&(r=c.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(i){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return $(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ni(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Q3()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Pe(this.app))return Promise.reject(ot(this));const t=e?J(e):null;return t&&$(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&$(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Pe(this.app)?Promise.reject(ot(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Pe(this.app)?Promise.reject(ot(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(en(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await p9(this),t=new g9(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new si("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await l9(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&en(e)||this._popupRedirectResolver;$(t,this,"argument-error"),this.redirectPersistenceManager=await Pr.create(this,[en(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if($(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{o=!0,u()}}else{const u=e.addObserver(t);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return $(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=bf(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(Pe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&K3(`Error while retrieving App Check token: ${e.error}`),e?.token}}function je(n){return J(n)}class Nh{constructor(e){this.auth=e,this.observer=null,this.addObserver=Dp(t=>this.observer=t)}get next(){return $(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ei={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function E9(n){Ei=n}function Du(n){return Ei.loadJS(n)}function y9(){return Ei.recaptchaV2Script}function w9(){return Ei.recaptchaEnterpriseScript}function I9(){return Ei.gapiScript}function Nf(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const T9=500,A9=6e4,qi=1e12;class R9{constructor(e){this.auth=e,this.counter=qi,this._widgets=new Map}render(e,t){const r=this.counter;return this._widgets.set(r,new S9(e,this.auth.name,t||{})),this.counter++,r}reset(e){const t=e||qi;this._widgets.get(t)?.delete(),this._widgets.delete(t)}getResponse(e){const t=e||qi;return this._widgets.get(t)?.getResponse()||""}async execute(e){const t=e||qi;return this._widgets.get(t)?.execute(),""}}class v9{constructor(){this.enterprise=new C9}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class C9{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class S9{constructor(e,t,r){this.params=r,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const s=typeof e=="string"?document.getElementById(e):e;$(s,"argument-error",{appName:t}),this.container=s,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=P9(50);const{callback:e,"expired-callback":t}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,t)try{t()}catch{}this.isVisible&&this.execute()},A9)},T9))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function P9(n){const e=[],t="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let r=0;r<n;r++)e.push(t.charAt(Math.floor(Math.random()*t.length)));return e.join("")}const b9="recaptcha-enterprise",Vs="NO_RECAPTCHA",Oh="onFirebaseAuthREInstanceReady";class Qt{constructor(e){this.type=b9,this.auth=je(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{_f(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const h=new gf(u);return i.tenantId==null?i._agentRecaptchaConfig=h:i._tenantRecaptchaConfigs[i.tenantId]=h,o(h.siteKey)}}).catch(u=>{c(u)})})}function s(i,o,c){const u=window.grecaptcha;Ch(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(h=>{o(h)}).catch(()=>{o(Vs)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new v9().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{r(this.auth).then(async c=>{if(!t&&Ch(window.grecaptcha)&&Qt.scriptInjectionDeferred)await Qt.scriptInjectionDeferred.promise,s(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=w9();u.length!==0&&(u+=c+`&onload=${Oh}`),Qt.scriptInjectionDeferred=new i2,window[Oh]=()=>{Qt.scriptInjectionDeferred?.resolve()},Du(u).then(()=>Qt.scriptInjectionDeferred?.promise).then(()=>{s(c,i,o)}).catch(h=>{o(h)})}}).catch(c=>{o(c)})})}}Qt.scriptInjectionDeferred=null;async function ms(n,e,t,r=!1,s=!1){const i=new Qt(n);let o;if(s)o=Vs;else try{o=await i.verify(t)}catch{o=await i.verify(t,!0)}const c={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const u=c.phoneEnrollmentInfo.phoneNumber,h=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:h,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function On(n,e,t,r,s){if(s==="EMAIL_PASSWORD_PROVIDER")if(n._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await ms(n,e,t,t==="getOobCode");return r(n,i)}else return r(n,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await ms(n,e,t,t==="getOobCode");return r(n,o)}else return Promise.reject(i)});else if(s==="PHONE_PROVIDER")if(n._getRecaptchaConfig()?.isProviderEnabled("PHONE_PROVIDER")){const i=await ms(n,e,t);return r(n,i).catch(async o=>{if(n._getRecaptchaConfig()?.getProviderEnforcementState("PHONE_PROVIDER")==="AUDIT"&&(o.code==="auth/missing-recaptcha-token"||o.code==="auth/invalid-app-credential")){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${t} flow.`);const c=await ms(n,e,t,!1,!0);return r(n,c)}return Promise.reject(o)})}else{const i=await ms(n,e,t,!1,!0);return r(n,i)}else return Promise.reject(s+" provider is not supported.")}async function N9(n){const e=je(n),t=await _f(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new gf(t);e.tenantId==null?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,r.isAnyProviderEnabled()&&new Qt(e).verify()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function O9(n,e){const t=ii(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(kn(i,e??{}))return s;bt(s,"already-initialized")}return t.initialize({options:e})}function k9(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(en);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function bc(n,e,t){const r=je(n);$(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Of(e),{host:o,port:c}=D9(e),u=c===null?"":`:${c}`,h={url:`${i}//${o}${u}/`},f=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){$(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),$(kn(h,r.config.emulator)&&kn(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,Gn(o)?No(`${i}//${o}${u}`):V9()}function Of(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function D9(n){const e=Of(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:kh(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:kh(o)}}}function kh(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function V9(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oa{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Zt("not implemented")}_getIdTokenResponse(e){return Zt("not implemented")}_linkToIdToken(e,t){return Zt("not implemented")}_getReauthenticationResolver(e){return Zt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function L9(n,e){return Be(n,"POST","/v1/accounts:resetPassword",Fe(n,e))}async function x9(n,e){return Be(n,"POST","/v1/accounts:update",e)}async function M9(n,e){return Be(n,"POST","/v1/accounts:signUp",e)}async function U9(n,e){return Be(n,"POST","/v1/accounts:update",Fe(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function F9(n,e){return hn(n,"POST","/v1/accounts:signInWithPassword",Fe(n,e))}async function aa(n,e){return Be(n,"POST","/v1/accounts:sendOobCode",Fe(n,e))}async function B9(n,e){return aa(n,e)}async function $9(n,e){return aa(n,e)}async function H9(n,e){return aa(n,e)}async function q9(n,e){return aa(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function j9(n,e){return hn(n,"POST","/v1/accounts:signInWithEmailLink",Fe(n,e))}async function G9(n,e){return hn(n,"POST","/v1/accounts:signInWithEmailLink",Fe(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ri extends oa{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new ri(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new ri(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return On(e,t,"signInWithPassword",F9,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return j9(e,{email:this._email,oobCode:this._password});default:bt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return On(e,r,"signUpPassword",M9,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return G9(e,{idToken:t,email:this._email,oobCode:this._password});default:bt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function br(n,e){return hn(n,"POST","/v1/accounts:signInWithIdp",Fe(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const W9="http://localhost";class Wt extends oa{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Wt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):bt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const o=new Wt(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return br(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,br(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,br(e,t)}buildRequest(){const e={requestUri:W9,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Fr(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dh(n,e){return Be(n,"POST","/v1/accounts:sendVerificationCode",Fe(n,e))}async function z9(n,e){return hn(n,"POST","/v1/accounts:signInWithPhoneNumber",Fe(n,e))}async function K9(n,e){const t=await hn(n,"POST","/v1/accounts:signInWithPhoneNumber",Fe(n,e));if(t.temporaryProof)throw As(n,"account-exists-with-different-credential",t);return t}const Y9={USER_NOT_FOUND:"user-not-found"};async function Q9(n,e){const t={...e,operation:"REAUTH"};return hn(n,"POST","/v1/accounts:signInWithPhoneNumber",Fe(n,t),Y9)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ls extends oa{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new Ls({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new Ls({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return z9(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return K9(e,{idToken:t,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return Q9(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:s}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:s}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:t,verificationCode:r,phoneNumber:s,temporaryProof:i}=e;return!r&&!t&&!s&&!i?null:new Ls({verificationId:t,verificationCode:r,phoneNumber:s,temporaryProof:i})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function X9(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function J9(n){const e=_s(Es(n)).link,t=e?_s(Es(e)).deep_link_id:null,r=_s(Es(n)).deep_link_id;return(r?_s(Es(r)).link:null)||r||t||e||n}class ca{constructor(e){const t=_s(Es(e)),r=t.apiKey??null,s=t.oobCode??null,i=X9(t.mode??null);$(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=J9(e);try{return new ca(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln{constructor(){this.providerId=ln.PROVIDER_ID}static credential(e,t){return ri._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=ca.parseLink(t);return $(r,"argument-error"),ri._fromEmailAndCode(e,r.code,r.tenantId)}}ln.PROVIDER_ID="password";ln.EMAIL_PASSWORD_SIGN_IN_METHOD="password";ln.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yr{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qr extends Yr{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class ve extends Qr{static credentialFromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;return $("providerId"in t&&"signInMethod"in t,"argument-error"),Wt._fromParams(t)}credential(e){return this._credential({...e,nonce:e.rawNonce})}_credential(e){return $(e.idToken||e.accessToken,"argument-error"),Wt._fromParams({...e,providerId:this.providerId,signInMethod:this.providerId})}static credentialFromResult(e){return ve.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return ve.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r,oauthTokenSecret:s,pendingToken:i,nonce:o,providerId:c}=e;if(!r&&!s&&!t&&!i||!c)return null;try{return new ve(c)._credential({idToken:t,accessToken:r,nonce:o,pendingToken:i})}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At extends Qr{constructor(){super("facebook.com")}static credential(e){return Wt._fromParams({providerId:At.PROVIDER_ID,signInMethod:At.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return At.credentialFromTaggedObject(e)}static credentialFromError(e){return At.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return At.credential(e.oauthAccessToken)}catch{return null}}}At.FACEBOOK_SIGN_IN_METHOD="facebook.com";At.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt extends Qr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Wt._fromParams({providerId:Rt.PROVIDER_ID,signInMethod:Rt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Rt.credentialFromTaggedObject(e)}static credentialFromError(e){return Rt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Rt.credential(t,r)}catch{return null}}}Rt.GOOGLE_SIGN_IN_METHOD="google.com";Rt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt extends Qr{constructor(){super("github.com")}static credential(e){return Wt._fromParams({providerId:vt.PROVIDER_ID,signInMethod:vt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return vt.credentialFromTaggedObject(e)}static credentialFromError(e){return vt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return vt.credential(e.oauthAccessToken)}catch{return null}}}vt.GITHUB_SIGN_IN_METHOD="github.com";vt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct extends Qr{constructor(){super("twitter.com")}static credential(e,t){return Wt._fromParams({providerId:Ct.PROVIDER_ID,signInMethod:Ct.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Ct.credentialFromTaggedObject(e)}static credentialFromError(e){return Ct.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Ct.credential(t,r)}catch{return null}}}Ct.TWITTER_SIGN_IN_METHOD="twitter.com";Ct.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kf(n,e){return hn(n,"POST","/v1/accounts:signUp",Fe(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await Ot._fromIdTokenResponse(e,r,s),o=Vh(r);return new zt({user:i,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=Vh(r);return new zt({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function Vh(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Z9(n){if(Pe(n.app))return Promise.reject(ot(n));const e=je(n);if(await e._initializationPromise,e.currentUser?.isAnonymous)return new zt({user:e.currentUser,providerId:null,operationType:"signIn"});const t=await kf(e,{returnSecureToken:!0}),r=await zt._fromIdTokenResponse(e,"signIn",t,!0);return await e._updateCurrentUser(r.user),r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ro extends Kt{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Ro.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new Ro(e,t,r,s)}}function Df(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Ro._fromErrorAndOperation(n,i,e,r):i})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vf(n){return new Set(n.map(({providerId:e})=>e).filter(e=>!!e))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function e8(n,e){const t=J(n);await ua(!0,t,e);const{providerUserInfo:r}=await s9(t.auth,{idToken:await t.getIdToken(),deleteProvider:[e]}),s=Vf(r||[]);return t.providerData=t.providerData.filter(i=>s.has(i.providerId)),s.has("phone")||(t.phoneNumber=null),await t.auth._persistUserIfCurrent(t),t}async function Lf(n,e,t=!1){const r=await hr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return zt._forOperation(n,"link",r)}async function ua(n,e,t){await ni(e);const r=Vf(e.providerData),s=n===!1?"provider-already-linked":"no-such-provider";$(r.has(t)===n,e.auth,s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xf(n,e,t=!1){const{auth:r}=n;if(Pe(r.app))return Promise.reject(ot(r));const s="reauthenticate";try{const i=await hr(n,Df(r,s,e,n),t);$(i.idToken,r,"internal-error");const o=ia(i.idToken);$(o,r,"internal-error");const{sub:c}=o;return $(n.uid===c,r,"user-mismatch"),zt._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&bt(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mf(n,e,t=!1){if(Pe(n.app))return Promise.reject(ot(n));const r="signIn",s=await Df(n,r,e),i=await zt._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function Vu(n,e){return Mf(je(n),e)}async function Uf(n,e){const t=J(n);return await ua(!1,t,e.providerId),Lf(t,e)}async function RE(n,e){return xf(J(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function t8(n,e){return hn(n,"POST","/v1/accounts:signInWithCustomToken",Fe(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function n8(n,e){if(Pe(n.app))return Promise.reject(ot(n));const t=je(n),r=await t8(t,{token:e,returnSecureToken:!0}),s=await zt._fromIdTokenResponse(t,"signIn",r);return await t._updateCurrentUser(s.user),s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function la(n,e,t){$(t.url?.length>0,n,"invalid-continue-uri"),$(typeof t.dynamicLinkDomain>"u"||t.dynamicLinkDomain.length>0,n,"invalid-dynamic-link-domain"),$(typeof t.linkDomain>"u"||t.linkDomain.length>0,n,"invalid-hosting-link-domain"),e.continueUrl=t.url,e.dynamicLinkDomain=t.dynamicLinkDomain,e.linkDomain=t.linkDomain,e.canHandleCodeInApp=t.handleCodeInApp,t.iOS&&($(t.iOS.bundleId.length>0,n,"missing-ios-bundle-id"),e.iOSBundleId=t.iOS.bundleId),t.android&&($(t.android.packageName.length>0,n,"missing-android-pkg-name"),e.androidInstallApp=t.android.installApp,e.androidMinimumVersionCode=t.android.minimumVersion,e.androidPackageName=t.android.packageName)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lu(n){const e=je(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function r8(n,e,t){const r=je(n),s={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};t&&la(r,s,t),await On(r,s,"getOobCode",$9,"EMAIL_PASSWORD_PROVIDER")}async function s8(n,e,t){await L9(J(n),{oobCode:e,newPassword:t}).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Lu(n),r})}async function i8(n,e){await U9(J(n),{oobCode:e})}async function o8(n,e,t){if(Pe(n.app))return Promise.reject(ot(n));const r=je(n),o=await On(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",kf,"EMAIL_PASSWORD_PROVIDER").catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&Lu(n),u}),c=await zt._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(c.user),c}function a8(n,e,t){return Pe(n.app)?Promise.reject(ot(n)):Vu(J(n),ln.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Lu(n),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function c8(n,e,t){const r=je(n),s={requestType:"EMAIL_SIGNIN",email:e,clientType:"CLIENT_TYPE_WEB"};function i(o,c){$(c.handleCodeInApp,r,"argument-error"),c&&la(r,o,c)}i(s,t),await On(r,s,"getOobCode",H9,"EMAIL_PASSWORD_PROVIDER")}function u8(n,e){return ca.parseLink(e)?.operation==="EMAIL_SIGNIN"}async function l8(n,e,t){if(Pe(n.app))return Promise.reject(ot(n));const r=J(n),s=ln.credentialWithLink(e,t||ti());return $(s._tenantId===(r.tenantId||null),r,"tenant-id-mismatch"),Vu(r,s)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function h8(n,e){return Be(n,"POST","/v1/accounts:createAuthUri",Fe(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function d8(n,e){const t=Nu()?ti():"http://localhost",r={identifier:e,continueUri:t},{signinMethods:s}=await h8(J(n),r);return s||[]}async function f8(n,e){const t=J(n),s={requestType:"VERIFY_EMAIL",idToken:await n.getIdToken()};e&&la(t.auth,s,e);const{email:i}=await B9(t.auth,s);i!==n.email&&await n.reload()}async function p8(n,e,t){const r=J(n),i={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:await n.getIdToken(),newEmail:e};t&&la(r.auth,i,t);const{email:o}=await q9(r.auth,i);o!==n.email&&await n.reload()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function m8(n,e){return Be(n,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function g8(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const r=J(n),i={idToken:await r.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},o=await hr(r,m8(r.auth,i));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const c=r.providerData.find(({providerId:u})=>u==="password");c&&(c.displayName=r.displayName,c.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function _8(n,e){const t=J(n);return Pe(t.auth.app)?Promise.reject(ot(t.auth)):Ff(t,e,null)}function E8(n,e){return Ff(J(n),null,e)}async function Ff(n,e,t){const{auth:r}=n,i={idToken:await n.getIdToken(),returnSecureToken:!0};e&&(i.email=e),t&&(i.password=t);const o=await hr(n,x9(r,i));await n._updateTokensIfNecessary(o,!0)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function y8(n){if(!n)return null;const{providerId:e}=n,t=n.rawUserInfo?JSON.parse(n.rawUserInfo):{},r=n.isNewUser||n.kind==="identitytoolkit#SignupNewUserResponse";if(!e&&n?.idToken){const s=ia(n.idToken)?.firebase?.sign_in_provider;if(s){const i=s!=="anonymous"&&s!=="custom"?s:null;return new Nr(r,i)}}if(!e)return null;switch(e){case"facebook.com":return new w8(r,t);case"github.com":return new I8(r,t);case"google.com":return new T8(r,t);case"twitter.com":return new A8(r,t,n.screenName||null);case"custom":case"anonymous":return new Nr(r,null);default:return new Nr(r,e,t)}}class Nr{constructor(e,t,r={}){this.isNewUser=e,this.providerId=t,this.profile=r}}class Bf extends Nr{constructor(e,t,r,s){super(e,t,r),this.username=s}}class w8 extends Nr{constructor(e,t){super(e,"facebook.com",t)}}class I8 extends Bf{constructor(e,t){super(e,"github.com",t,typeof t?.login=="string"?t?.login:null)}}class T8 extends Nr{constructor(e,t){super(e,"google.com",t)}}class A8 extends Bf{constructor(e,t,r){super(e,"twitter.com",t,r)}}function R8(n){const{user:e,_tokenResponse:t}=n;return e.isAnonymous&&!t?{providerId:null,isNewUser:!1,profile:null}:y8(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ji(n,e){return J(n).setPersistence(e)}function v8(n,e,t,r){return J(n).onIdTokenChanged(e,t,r)}function C8(n,e,t){return J(n).beforeAuthStateChanged(e,t)}function vE(n,e,t,r){return J(n).onAuthStateChanged(e,t,r)}function CE(n){return J(n).signOut()}function S8(n,e){return je(n).revokeAccessToken(e)}async function P8(n){return J(n).delete()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lh(n,e){return Be(n,"POST","/v2/accounts/mfaEnrollment:start",Fe(n,e))}const vo="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $f{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(vo,"1"),this.storage.removeItem(vo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b8=1e3,N8=10;class Hf extends $f{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Pf(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);d9()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,N8):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},b8)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Hf.type="LOCAL";const qf=Hf;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jf extends $f{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}jf.type="SESSION";const xu=jf;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function O8(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ha{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new ha(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(o).map(async h=>h(t.origin,i)),u=await O8(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ha.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function da(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k8{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,u)=>{const h=da("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(p){const w=p;if(w.data.eventId===h)switch(w.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(w.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Se(){return window}function D8(n){Se().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mu(){return typeof Se().WorkerGlobalScope<"u"&&typeof Se().importScripts=="function"}async function V8(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function L8(){return navigator?.serviceWorker?.controller||null}function x8(){return Mu()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gf="firebaseLocalStorageDb",M8=1,Co="firebaseLocalStorage",Wf="fbase_key";class yi{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function fa(n,e){return n.transaction([Co],e?"readwrite":"readonly").objectStore(Co)}function U8(){const n=indexedDB.deleteDatabase(Gf);return new yi(n).toPromise()}function zf(){const n=indexedDB.open(Gf,M8);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Co,{keyPath:Wf})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Co)?e(r):(r.close(),await U8(),e(await zf()))})})}async function xh(n,e,t){const r=fa(n,!0).put({[Wf]:e,value:t});return new yi(r).toPromise()}async function F8(n,e){const t=fa(n,!1).get(e),r=await new yi(t).toPromise();return r===void 0?null:r.value}function Mh(n,e){const t=fa(n,!0).delete(e);return new yi(t).toPromise()}const B8=800,$8=3;class Kf{constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=zf(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>$8)throw r;this.dbPromise&&((await this.dbPromise).close(),this.dbPromise=null)}}async initializeServiceWorkerMessaging(){return Mu()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ha._getInstance(x8()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await V8(),!this.activeServiceWorker)return;this.sender=new k8(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||L8()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await xh(e,vo,"1"),await Mh(e,vo)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>xh(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>F8(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Mh(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=fa(s,!1).getAll();return new yi(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),B8)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Kf.type="LOCAL";const Yf=Kf;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uh(n,e){return Be(n,"POST","/v2/accounts/mfaSignIn:start",Fe(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ja=Nf("rcb"),H8=new _i(3e4,6e4);class q8{constructor(){this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!Se().grecaptcha?.render}load(e,t=""){return $(j8(t),e,"argument-error"),this.shouldResolveImmediately(t)&&vh(Se().grecaptcha)?Promise.resolve(Se().grecaptcha):new Promise((r,s)=>{const i=Se().setTimeout(()=>{s(lt(e,"network-request-failed"))},H8.get());Se()[Ja]=()=>{Se().clearTimeout(i),delete Se()[Ja];const c=Se().grecaptcha;if(!c||!vh(c)){s(lt(e,"internal-error"));return}const u=c.render;c.render=(h,f)=>{const p=u(h,f);return this.counter++,p},this.hostLanguage=t,r(c)};const o=`${y9()}?${Fr({onload:Ja,render:"explicit",hl:t})}`;Du(o).catch(()=>{clearTimeout(i),s(lt(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){return!!Se().grecaptcha?.render&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function j8(n){return n.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(n)}class G8{async load(e){return new R9(e)}clearedOneInstance(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xs="recaptcha",W8={theme:"light",type:"image"};class Fh{constructor(e,t,r={...W8}){this.parameters=r,this.type=xs,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=je(e),this.isInvisible=this.parameters.size==="invisible",$(typeof document<"u",this.auth,"operation-not-supported-in-this-environment");const s=typeof t=="string"?document.getElementById(t):t;$(s,this.auth,"argument-error"),this.container=s,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new G8:new q8,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),t=this.getAssertedRecaptcha(),r=t.getResponse(e);return r||new Promise(s=>{const i=o=>{o&&(this.tokenChangeListeners.delete(i),s(o))};this.tokenChangeListeners.add(i),this.isInvisible&&t.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){$(!this.parameters.sitekey,this.auth,"argument-error"),$(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),$(typeof document<"u",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return t=>{if(this.tokenChangeListeners.forEach(r=>r(t)),typeof e=="function")e(t);else if(typeof e=="string"){const r=Se()[e];typeof r=="function"&&r(t)}}}assertNotDestroyed(){$(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const t=document.createElement("div");e.appendChild(t),e=t}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){$(Nu()&&!Mu(),this.auth,"internal-error"),await z8(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await n9(this.auth);$(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return $(this.recaptcha,this.auth,"internal-error"),this.recaptcha}}function z8(){let n=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}n=()=>e(),window.addEventListener("load",n)}).catch(e=>{throw n&&window.removeEventListener("load",n),e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qf{constructor(e,t){this.verificationId=e,this.onConfirmation=t}confirm(e){const t=Ls._fromVerification(this.verificationId,e);return this.onConfirmation(t)}}async function K8(n,e,t){if(Pe(n.app))return Promise.reject(ot(n));const r=je(n),s=await Xf(r,e,J(t));return new Qf(s,i=>Vu(r,i))}async function Y8(n,e,t){const r=J(n);await ua(!1,r,"phone");const s=await Xf(r.auth,e,J(t));return new Qf(s,i=>Uf(r,i))}async function Xf(n,e,t){if(!n._getRecaptchaConfig())try{await N9(n)}catch{console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let r;if(typeof e=="string"?r={phoneNumber:e}:r=e,"session"in r){const s=r.session;if("phoneNumber"in r){$(s.type==="enroll",n,"internal-error");const i={idToken:s.credential,phoneEnrollmentInfo:{phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await On(n,i,"mfaSmsEnrollment",async(h,f)=>{if(f.phoneEnrollmentInfo.captchaResponse===Vs){$(t?.type===xs,h,"argument-error");const p=await Za(h,f,t);return Lh(h,p)}return Lh(h,f)},"PHONE_PROVIDER").catch(h=>Promise.reject(h))).phoneSessionInfo.sessionInfo}else{$(s.type==="signin",n,"internal-error");const i=r.multiFactorHint?.uid||r.multiFactorUid;$(i,n,"missing-multi-factor-info");const o={mfaPendingCredential:s.credential,mfaEnrollmentId:i,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await On(n,o,"mfaSmsSignIn",async(f,p)=>{if(p.phoneSignInInfo.captchaResponse===Vs){$(t?.type===xs,f,"argument-error");const w=await Za(f,p,t);return Uh(f,w)}return Uh(f,p)},"PHONE_PROVIDER").catch(f=>Promise.reject(f))).phoneResponseInfo.sessionInfo}}else{const s={phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await On(n,s,"sendVerificationCode",async(u,h)=>{if(h.captchaResponse===Vs){$(t?.type===xs,u,"argument-error");const f=await Za(u,h,t);return Dh(u,f)}return Dh(u,h)},"PHONE_PROVIDER").catch(u=>Promise.reject(u))).sessionInfo}}finally{t?._reset()}}async function Za(n,e,t){$(t.type===xs,n,"argument-error");const r=await t.verify();$(typeof r=="string",n,"argument-error");const s={...e};if("phoneEnrollmentInfo"in s){const i=s.phoneEnrollmentInfo.phoneNumber,o=s.phoneEnrollmentInfo.captchaResponse,c=s.phoneEnrollmentInfo.clientType,u=s.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(s,{phoneEnrollmentInfo:{phoneNumber:i,recaptchaToken:r,captchaResponse:o,clientType:c,recaptchaVersion:u}}),s}else if("phoneSignInInfo"in s){const i=s.phoneSignInInfo.captchaResponse,o=s.phoneSignInInfo.clientType,c=s.phoneSignInInfo.recaptchaVersion;return Object.assign(s,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:i,clientType:o,recaptchaVersion:c}}),s}else return Object.assign(s,{recaptchaToken:r}),s}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wi(n,e){return e?en(e):($(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uu extends oa{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return br(e,this._buildIdpRequest())}_linkToIdToken(e,t){return br(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return br(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Q8(n){return Mf(n.auth,new Uu(n),n.bypassAuthState)}function X8(n){const{auth:e,user:t}=n;return $(t,e,"internal-error"),xf(t,new Uu(n),n.bypassAuthState)}async function J8(n){const{auth:e,user:t}=n;return $(t,e,"internal-error"),Lf(t,new Uu(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jf{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Q8;case"linkViaPopup":case"linkViaRedirect":return J8;case"reauthViaPopup":case"reauthViaRedirect":return X8;default:bt(this.auth,"internal-error")}}resolve(e){un(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){un(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Z8=new _i(2e3,1e4);async function e_(n,e,t){if(Pe(n.app))return Promise.reject(lt(n,"operation-not-supported-in-this-environment"));const r=je(n);sa(n,e,Yr);const s=wi(r,t);return new Rn(r,"signInViaPopup",e,s).executeNotNull()}async function t_(n,e,t){const r=J(n);sa(r.auth,e,Yr);const s=wi(r.auth,t);return new Rn(r.auth,"linkViaPopup",e,s,r).executeNotNull()}class Rn extends Jf{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Rn.currentPopupAction&&Rn.currentPopupAction.cancel(),Rn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return $(e,this.auth,"internal-error"),e}async onExecution(){un(this.filter.length===1,"Popup operations only handle one event");const e=da();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(lt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(lt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Rn.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(lt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Z8.get())};e()}}Rn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const n_="pendingRedirect",no=new Map;class r_ extends Jf{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=no.get(this.auth._key());if(!e){try{const r=await s_(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}no.set(this.auth._key(),e)}return this.bypassAuthState||no.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function s_(n,e){const t=t6(e),r=e6(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}async function Zf(n,e){return e6(n)._set(t6(e),"true")}function i_(n,e){no.set(n._key(),e)}function e6(n){return en(n._redirectPersistence)}function t6(n){return to(n_,n.config.apiKey,n.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function o_(n,e,t){return a_(n,e,t)}async function a_(n,e,t){if(Pe(n.app))return Promise.reject(ot(n));const r=je(n);sa(n,e,Yr),await r._initializationPromise;const s=wi(r,t);return await Zf(s,r),s._openRedirect(r,e,"signInViaRedirect")}function c_(n,e,t){return u_(n,e,t)}async function u_(n,e,t){const r=J(n);sa(r.auth,e,Yr),await r.auth._initializationPromise;const s=wi(r.auth,t);await ua(!1,r,e.providerId),await Zf(s,r.auth);const i=await h_(r);return s._openRedirect(r.auth,e,"linkViaRedirect",i)}async function l_(n,e){return await je(n)._initializationPromise,n6(n,e,!1)}async function n6(n,e,t=!1){if(Pe(n.app))return Promise.reject(ot(n));const r=je(n),s=wi(r,e),o=await new r_(r,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}async function h_(n){const e=da(`${n.uid}:::`);return n._redirectEventId=e,await n.auth._setRedirectUser(n),await n.auth._persistUserIfCurrent(n),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const d_=600*1e3;class f_{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!p_(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!r6(e)){const r=e.error.code?.split("auth/")[1]||"internal-error";t.onError(lt(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=d_&&this.cachedEventUids.clear(),this.cachedEventUids.has(Bh(e))}saveEventToCache(e){this.cachedEventUids.add(Bh(e)),this.lastProcessedEventTime=Date.now()}}function Bh(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function r6({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function p_(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return r6(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function m_(n,e={}){return Be(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g_=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,__=/^https?/;async function E_(n){if(n.config.emulator)return;const{authorizedDomains:e}=await m_(n);for(const t of e)try{if(y_(t))return}catch{}bt(n,"unauthorized-domain")}function y_(n){const e=ti(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!__.test(t))return!1;if(g_.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const w_=new _i(3e4,6e4);function $h(){const n=Se().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function I_(n){return new Promise((e,t)=>{function r(){$h(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{$h(),t(lt(n,"network-request-failed"))},timeout:w_.get()})}if(Se().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(Se().gapi?.load)r();else{const s=Nf("iframefcb");return Se()[s]=()=>{gapi.load?r():t(lt(n,"network-request-failed"))},Du(`${I9()}?onload=${s}`).catch(i=>t(i))}}).catch(e=>{throw ro=null,e})}let ro=null;function T_(n){return ro=ro||I_(n),ro}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const A_=new _i(5e3,15e3),R_="__/auth/iframe",v_="emulator/auth/iframe",C_={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},S_=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function P_(n){const e=n.config;$(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Ou(e,v_):`https://${n.config.authDomain}/${R_}`,r={apiKey:e.apiKey,appName:n.name,v:fr},s=S_.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${Fr(r).slice(1)}`}async function b_(n){const e=await T_(n),t=Se().gapi;return $(t,n,"internal-error"),e.open({where:document.body,url:P_(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:C_,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=lt(n,"network-request-failed"),c=Se().setTimeout(()=>{i(o)},A_.get());function u(){Se().clearTimeout(c),s(r)}r.ping(u).then(u,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N_={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},O_=500,k_=600,D_="_blank",V_="http://localhost";class Hh{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function L_(n,e,t,r=O_,s=k_){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u={...N_,width:r.toString(),height:s.toString(),top:i,left:o},h=Ze().toLowerCase();t&&(c=Af(h)?D_:t),If(h)&&(e=e||V_,u.scrollbars="yes");const f=Object.entries(u).reduce((w,[b,P])=>`${w}${b}=${P},`,"");if(h9(h)&&c!=="_self")return x_(e||"",c),new Hh(null);const p=window.open(e||"",c,f);$(p,n,"popup-blocked");try{p.focus()}catch{}return new Hh(p)}function x_(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M_="__/auth/handler",U_="emulator/auth/handler",F_=encodeURIComponent("fac");async function qh(n,e,t,r,s,i){$(n.config.authDomain,n,"auth-domain-config-required"),$(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:fr,eventId:s};if(e instanceof Yr){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",kp(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))o[f]=p}if(e instanceof Qr){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(o.scopes=f.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await n._getAppCheckToken(),h=u?`#${F_}=${encodeURIComponent(u)}`:"";return`${B_(n)}?${Fr(c).slice(1)}${h}`}function B_({config:n}){return n.emulator?Ou(n,U_):`https://${n.authDomain}/${M_}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ec="webStorageSupport";class $_{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=xu,this._completeRedirectFn=n6,this._overrideRedirectResult=i_}async _openPopup(e,t,r,s){un(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await qh(e,t,r,ti(),s);return L_(e,i,da())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await qh(e,t,r,ti(),s);return D8(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(un(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await b_(e),r=new f_(e);return t.register("authEvent",s=>($(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(ec,{type:ec},s=>{const i=s?.[0]?.[ec];i!==void 0&&t(!!i),bt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=E_(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Pf()||Tf()||ku()}}const H_=$_;var jh="@firebase/auth",Gh="1.13.3";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q_{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){$(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j_(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function G_(n){cr(new Dn("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;$(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:bf(n)},h=new _9(r,s,i,u);return k9(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),cr(new Dn("auth-internal",e=>{const t=je(e.getProvider("auth").getImmediate());return(r=>new q_(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),tn(jh,Gh,j_(n)),tn(jh,Gh,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const W_=300,z_=s2("authIdTokenMaxAge")||W_;let Wh=null;const K_=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>z_)return;const s=t?.token;Wh!==s&&(Wh=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function se(n=Dc()){const e=ii(n,"auth");if(e.isInitialized())return e.getImmediate();const t=O9(n,{popupRedirectResolver:H_,persistence:[Yf,qf,xu]}),r=s2("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=K_(i.toString());C8(t,o,()=>o(t.currentUser)),v8(t,c=>o(c))}}const s=t2("auth");return s&&bc(t,`http://${s}`),t}function Y_(){return document.getElementsByTagName("head")?.[0]??document}E9({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=lt("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",Y_().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});G_("Browser");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const s6="firebasestorage.googleapis.com",i6="storageBucket",Q_=120*1e3,X_=600*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Te extends Kt{constructor(e,t,r=0){super(tc(e),`Firebase Storage: ${t} (${tc(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,Te.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return tc(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var Ie;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(Ie||(Ie={}));function tc(n){return"storage/"+n}function Fu(){const n="An unknown error occurred, please check the error payload for server response.";return new Te(Ie.UNKNOWN,n)}function J_(n){return new Te(Ie.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function Z_(n){return new Te(Ie.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function e5(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new Te(Ie.UNAUTHENTICATED,n)}function t5(){return new Te(Ie.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function n5(n){return new Te(Ie.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function r5(){return new Te(Ie.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function s5(){return new Te(Ie.CANCELED,"User canceled the upload/download.")}function i5(n){return new Te(Ie.INVALID_URL,"Invalid URL '"+n+"'.")}function o5(n){return new Te(Ie.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function a5(){return new Te(Ie.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+i6+"' property when initializing the app?")}function c5(){return new Te(Ie.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function u5(){return new Te(Ie.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function l5(n){return new Te(Ie.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function Nc(n){return new Te(Ie.INVALID_ARGUMENT,n)}function o6(){return new Te(Ie.APP_DELETED,"The Firebase app was deleted.")}function h5(n){return new Te(Ie.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Ms(n,e){return new Te(Ie.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function gs(n){throw new Te(Ie.INTERNAL_ERROR,"Internal error: "+n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=Et.makeFromUrl(e,t)}catch{return new Et(e,"")}if(r.path==="")return r;throw o5(e)}static makeFromUrl(e,t){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i(he){he.path.charAt(he.path.length-1)==="/"&&(he.path_=he.path_.slice(0,-1))}const o="(/(.*))?$",c=new RegExp("^gs://"+s+o,"i"),u={bucket:1,path:3};function h(he){he.path_=decodeURIComponent(he.path)}const f="v[A-Za-z0-9_]+",p=t.replace(/[.]/g,"\\."),w="(/([^?#]*).*)?$",b=new RegExp(`^https?://${p}/${f}/b/${s}/o${w}`,"i"),P={bucket:1,path:3},L=t===s6?"(?:storage.googleapis.com|storage.cloud.google.com)":t,x="([^?#]*)",z=new RegExp(`^https?://${L}/${s}/${x}`,"i"),re=[{regex:c,indices:u,postModify:i},{regex:b,indices:P,postModify:h},{regex:z,indices:{bucket:1,path:2},postModify:h}];for(let he=0;he<re.length;he++){const Ve=re[he],Ee=Ve.regex.exec(e);if(Ee){const A=Ee[Ve.indices.bucket];let g=Ee[Ve.indices.path];g||(g=""),r=new Et(A,g),Ve.postModify(r);break}}if(r==null)throw i5(e);return r}}class d5{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function f5(n,e,t){let r=1,s=null,i=null,o=!1,c=0;function u(){return c===2}let h=!1;function f(...x){h||(h=!0,e.apply(null,x))}function p(x){s=setTimeout(()=>{s=null,n(b,u())},x)}function w(){i&&clearTimeout(i)}function b(x,...z){if(h){w();return}if(x){w(),f.call(null,x,...z);return}if(u()||o){w(),f.call(null,x,...z);return}r<64&&(r*=2);let re;c===1?(c=2,re=0):re=(r+Math.random())*1e3,p(re)}let P=!1;function L(x){P||(P=!0,w(),!h&&(s!==null?(x||(c=2),clearTimeout(s),p(0)):x||(c=1)))}return p(0),i=setTimeout(()=>{o=!0,L(!0)},t),L}function p5(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function m5(n){return n!==void 0}function g5(n){return typeof n=="object"&&!Array.isArray(n)}function Bu(n){return typeof n=="string"||n instanceof String}function zh(n){return $u()&&n instanceof Blob}function $u(){return typeof Blob<"u"}function Kh(n,e,t,r){if(r<e)throw Nc(`Invalid value for '${n}'. Expected ${e} or greater.`);if(r>t)throw Nc(`Invalid value for '${n}'. Expected ${t} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hu(n,e,t){let r=e;return t==null&&(r=`https://${e}`),`${t}://${r}/v0${n}`}function a6(n){const e=encodeURIComponent;let t="?";for(const r in n)if(n.hasOwnProperty(r)){const s=e(r)+"="+e(n[r]);t=t+s+"&"}return t=t.slice(0,-1),t}var ar;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(ar||(ar={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _5(n,e){const t=n>=500&&n<600,s=[408,429].indexOf(n)!==-1,i=e.indexOf(n)!==-1;return t||s||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E5{constructor(e,t,r,s,i,o,c,u,h,f,p,w=!0,b=!1){this.url_=e,this.method_=t,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=c,this.errorCallback_=u,this.timeout_=h,this.progressCallback_=f,this.connectionFactory_=p,this.retry=w,this.isUsingEmulator=b,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((P,L)=>{this.resolve_=P,this.reject_=L,this.start_()})}start_(){const e=(r,s)=>{if(s){r(!1,new Gi(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const o=c=>{const u=c.loaded,h=c.lengthComputable?c.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,h)};this.progressCallback_!==null&&i.addUploadProgressListener(o),i.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(o),this.pendingConnection_=null;const c=i.getErrorCode()===ar.NO_ERROR,u=i.getStatus();if(!c||_5(u,this.additionalRetryCodes_)&&this.retry){const f=i.getErrorCode()===ar.ABORT;r(!1,new Gi(!1,null,f));return}const h=this.successCodes_.indexOf(u)!==-1;r(!0,new Gi(h,i))})},t=(r,s)=>{const i=this.resolve_,o=this.reject_,c=s.connection;if(s.wasSuccessCode)try{const u=this.callback_(c,c.getResponse());m5(u)?i(u):i()}catch(u){o(u)}else if(c!==null){const u=Fu();u.serverResponse=c.getErrorText(),this.errorCallback_?o(this.errorCallback_(c,u)):o(u)}else if(s.canceled){const u=this.appDelete_?o6():s5();o(u)}else{const u=r5();o(u)}};this.canceled_?t(!1,new Gi(!1,null,!0)):this.backoffId_=f5(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&p5(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Gi{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function y5(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function w5(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function I5(n,e){e&&(n["X-Firebase-GMPID"]=e)}function T5(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function A5(n,e,t,r,s,i,o=!0,c=!1){const u=a6(n.urlParams),h=n.url+u,f=Object.assign({},n.headers);return I5(f,e),y5(f,t),w5(f,i),T5(f,r),new E5(h,n.method,f,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,s,o,c)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function R5(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function v5(...n){const e=R5();if(e!==void 0){const t=new e;for(let r=0;r<n.length;r++)t.append(n[r]);return t.getBlob()}else{if($u())return new Blob(n);throw new Te(Ie.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function C5(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function S5(n){if(typeof atob>"u")throw l5("base-64");return atob(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ft={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class nc{constructor(e,t){this.data=e,this.contentType=t||null}}function P5(n,e){switch(n){case Ft.RAW:return new nc(c6(e));case Ft.BASE64:case Ft.BASE64URL:return new nc(u6(n,e));case Ft.DATA_URL:return new nc(N5(e),O5(e))}throw Fu()}function c6(n){const e=[];for(let t=0;t<n.length;t++){let r=n.charCodeAt(t);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const i=r,o=n.charCodeAt(++t);r=65536|(i&1023)<<10|o&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function b5(n){let e;try{e=decodeURIComponent(n)}catch{throw Ms(Ft.DATA_URL,"Malformed data URL.")}return c6(e)}function u6(n,e){switch(n){case Ft.BASE64:{const s=e.indexOf("-")!==-1,i=e.indexOf("_")!==-1;if(s||i)throw Ms(n,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case Ft.BASE64URL:{const s=e.indexOf("+")!==-1,i=e.indexOf("/")!==-1;if(s||i)throw Ms(n,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=S5(e)}catch(s){throw s.message.includes("polyfill")?s:Ms(n,"Invalid character found")}const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}class l6{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw Ms(Ft.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=t[1]||null;r!=null&&(this.base64=k5(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function N5(n){const e=new l6(n);return e.base64?u6(Ft.BASE64,e.rest):b5(e.rest)}function O5(n){return new l6(n).contentType}function k5(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class An{constructor(e,t){let r=0,s="";zh(e)?(this.data_=e,r=e.size,s=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=s}size(){return this.size_}type(){return this.type_}slice(e,t){if(zh(this.data_)){const r=this.data_,s=C5(r,e,t);return s===null?null:new An(s)}else{const r=new Uint8Array(this.data_.buffer,e,t-e);return new An(r,!0)}}static getBlob(...e){if($u()){const t=e.map(r=>r instanceof An?r.data_:r);return new An(v5.apply(null,t))}else{const t=e.map(o=>Bu(o)?P5(Ft.RAW,o).data:o.data_);let r=0;t.forEach(o=>{r+=o.byteLength});const s=new Uint8Array(r);let i=0;return t.forEach(o=>{for(let c=0;c<o.length;c++)s[i++]=o[c]}),new An(s,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function h6(n){let e;try{e=JSON.parse(n)}catch{return null}return g5(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D5(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function V5(n,e){const t=e.split("/").filter(r=>r.length>0).join("/");return n.length===0?t:n+"/"+t}function d6(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L5(n,e){return e}class rt{constructor(e,t,r,s){this.server=e,this.local=t||e,this.writable=!!r,this.xform=s||L5}}let Wi=null;function x5(n){return!Bu(n)||n.length<2?n:d6(n)}function f6(){if(Wi)return Wi;const n=[];n.push(new rt("bucket")),n.push(new rt("generation")),n.push(new rt("metageneration")),n.push(new rt("name","fullPath",!0));function e(i,o){return x5(o)}const t=new rt("name");t.xform=e,n.push(t);function r(i,o){return o!==void 0?Number(o):o}const s=new rt("size");return s.xform=r,n.push(s),n.push(new rt("timeCreated")),n.push(new rt("updated")),n.push(new rt("md5Hash",null,!0)),n.push(new rt("cacheControl",null,!0)),n.push(new rt("contentDisposition",null,!0)),n.push(new rt("contentEncoding",null,!0)),n.push(new rt("contentLanguage",null,!0)),n.push(new rt("contentType",null,!0)),n.push(new rt("metadata","customMetadata",!0)),Wi=n,Wi}function M5(n,e){function t(){const r=n.bucket,s=n.fullPath,i=new Et(r,s);return e._makeStorageReference(i)}Object.defineProperty(n,"ref",{get:t})}function U5(n,e,t){const r={};r.type="file";const s=t.length;for(let i=0;i<s;i++){const o=t[i];r[o.local]=o.xform(r,e[o.server])}return M5(r,n),r}function p6(n,e,t){const r=h6(e);return r===null?null:U5(n,r,t)}function F5(n,e,t,r){const s=h6(e);if(s===null||!Bu(s.downloadTokens))return null;const i=s.downloadTokens;if(i.length===0)return null;const o=encodeURIComponent;return i.split(",").map(h=>{const f=n.bucket,p=n.fullPath,w="/b/"+o(f)+"/o/"+o(p),b=Hu(w,t,r),P=a6({alt:"media",token:h});return b+P})[0]}function B5(n,e){const t={},r=e.length;for(let s=0;s<r;s++){const i=e[s];i.writable&&(t[i.server]=n[i.local])}return JSON.stringify(t)}class m6{constructor(e,t,r,s){this.url=e,this.method=t,this.handler=r,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function g6(n){if(!n)throw Fu()}function $5(n,e){function t(r,s){const i=p6(n,s,e);return g6(i!==null),i}return t}function H5(n,e){function t(r,s){const i=p6(n,s,e);return g6(i!==null),F5(i,s,n.host,n._protocol)}return t}function _6(n){function e(t,r){let s;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?s=t5():s=e5():t.getStatus()===402?s=Z_(n.bucket):t.getStatus()===403?s=n5(n.path):s=r,s.status=t.getStatus(),s.serverResponse=r.serverResponse,s}return e}function q5(n){const e=_6(n);function t(r,s){let i=e(r,s);return r.getStatus()===404&&(i=J_(n.path)),i.serverResponse=s.serverResponse,i}return t}function j5(n,e,t){const r=e.fullServerUrl(),s=Hu(r,n.host,n._protocol),i="GET",o=n.maxOperationRetryTime,c=new m6(s,i,H5(n,t),o);return c.errorHandler=q5(e),c}function G5(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function W5(n,e,t){const r=Object.assign({},t);return r.fullPath=n.path,r.size=e.size(),r.contentType||(r.contentType=G5(null,e)),r}function z5(n,e,t,r,s){const i=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function c(){let re="";for(let he=0;he<2;he++)re=re+Math.random().toString().slice(2);return re}const u=c();o["Content-Type"]="multipart/related; boundary="+u;const h=W5(e,r,s),f=B5(h,t),p="--"+u+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+f+`\r
--`+u+`\r
Content-Type: `+h.contentType+`\r
\r
`,w=`\r
--`+u+"--",b=An.getBlob(p,r,w);if(b===null)throw c5();const P={name:h.fullPath},L=Hu(i,n.host,n._protocol),x="POST",z=n.maxUploadRetryTime,te=new m6(L,x,$5(n,t),z);return te.urlParams=P,te.headers=o,te.body=b.uploadData(),te.errorHandler=_6(e),te}class K5{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=ar.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=ar.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=ar.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,r,s,i){if(this.sent_)throw gs("cannot .send() more than once");if(Gn(e)&&r&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(t,e,!0),i!==void 0)for(const o in i)i.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,i[o].toString());return s!==void 0?this.xhr_.send(s):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw gs("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw gs("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw gs("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw gs("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class Y5 extends K5{initXhr(){this.xhr_.responseType="text"}}function E6(){return new Y5}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dr{constructor(e,t){this._service=e,t instanceof Et?this._location=t:this._location=Et.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new dr(e,t)}get root(){const e=new Et(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return d6(this._location.path)}get storage(){return this._service}get parent(){const e=D5(this._location.path);if(e===null)return null;const t=new Et(this._location.bucket,e);return new dr(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw h5(e)}}function Q5(n,e,t){n._throwIfRoot("uploadBytes");const r=z5(n.storage,n._location,f6(),new An(e,!0),t);return n.storage.makeRequestWithTokens(r,E6).then(s=>({metadata:s,ref:n}))}function X5(n){n._throwIfRoot("getDownloadURL");const e=j5(n.storage,n._location,f6());return n.storage.makeRequestWithTokens(e,E6).then(t=>{if(t===null)throw u5();return t})}function J5(n,e){const t=V5(n._location.path,e),r=new Et(n._location.bucket,t);return new dr(n.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Z5(n){return/^[A-Za-z]+:\/\//.test(n)}function eE(n,e){return new dr(n,e)}function y6(n,e){if(n instanceof qu){const t=n;if(t._bucket==null)throw a5();const r=new dr(t,t._bucket);return e!=null?y6(r,e):r}else return e!==void 0?J5(n,e):n}function tE(n,e){if(e&&Z5(e)){if(n instanceof qu)return eE(n,e);throw Nc("To use ref(service, url), the first argument must be a Storage instance.")}else return y6(n,e)}function Yh(n,e){const t=e?.[i6];return t==null?null:Et.makeFromBucketSpec(t,n)}function nE(n,e,t,r={}){n.host=`${e}:${t}`;const s=Gn(e);s&&No(`https://${n.host}/b`),n._isUsingEmulator=!0,n._protocol=s?"https":"http";const{mockUserToken:i}=r;i&&(n._overrideAuthToken=typeof i=="string"?i:o2(i,n.app.options.projectId))}class qu{constructor(e,t,r,s,i,o=!1){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._isUsingEmulator=o,this._bucket=null,this._host=s6,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Q_,this._maxUploadRetryTime=X_,this._requests=new Set,s!=null?this._bucket=Et.makeFromBucketSpec(s,this._host):this._bucket=Yh(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Et.makeFromBucketSpec(this._url,e):this._bucket=Yh(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Kh("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Kh("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(Pe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new dr(this,e)}_makeRequest(e,t,r,s,i=!0){if(this._deleted)return new d5(o6());{const o=A5(e,this._appId,r,s,t,this._firebaseVersion,i,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,s).getPromise()}}const Qh="@firebase/storage",Xh="0.14.3";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const w6="storage";function SE(n,e,t){return n=J(n),Q5(n,e,t)}function PE(n){return n=J(n),X5(n)}function bE(n,e){return n=J(n),tE(n,e)}function NE(n=Dc(),e){n=J(n);const r=ii(n,w6).getImmediate({identifier:e}),s=n2("storage");return s&&rE(r,...s),r}function rE(n,e,t,r={}){nE(n,e,t,r)}function sE(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),s=n.getProvider("app-check-internal");return new qu(t,r,s,e,fr)}function iE(){cr(new Dn(w6,sE,"PUBLIC").setMultipleInstances(!0)),tn(Qh,Xh,""),tn(Qh,Xh,"esm2020")}iE();var Rr;(function(n){n.IndexedDbLocal="INDEXED_DB_LOCAL",n.InMemory="IN_MEMORY",n.BrowserLocal="BROWSER_LOCAL",n.BrowserSession="BROWSER_SESSION"})(Rr||(Rr={}));var wn;(function(n){n.APPLE="apple.com",n.FACEBOOK="facebook.com",n.GAME_CENTER="gc.apple.com",n.GITHUB="github.com",n.GOOGLE="google.com",n.MICROSOFT="microsoft.com",n.PLAY_GAMES="playgames.google.com",n.TWITTER="twitter.com",n.YAHOO="yahoo.com",n.PASSWORD="password",n.PHONE="phone"})(wn||(wn={}));const OE=So("FirebaseAuthentication",{web:()=>tp(()=>Promise.resolve().then(()=>oE),void 0,import.meta.url).then(n=>new n.FirebaseAuthenticationWeb)});class ue extends Po{constructor(){super(),this.lastConfirmationResult=new Map;const e=se();e.onAuthStateChanged(t=>this.handleAuthStateChange(t)),e.onIdTokenChanged(t=>void this.handleIdTokenChange(t))}async applyActionCode(e){const t=se();return i8(t,e.oobCode)}async createUserWithEmailAndPassword(e){const t=se(),r=await o8(t,e.email,e.password);return this.createSignInResult(r,null)}async confirmPasswordReset(e){const t=se();return s8(t,e.oobCode,e.newPassword)}async confirmVerificationCode(e){const{verificationCode:t,verificationId:r}=e,s=this.lastConfirmationResult.get(r);if(!s)throw new Error(ue.ERROR_CONFIRMATION_RESULT_MISSING);const i=await s.confirm(t);return this.createSignInResult(i,null)}async deleteUser(){const t=se().currentUser;if(!t)throw new Error(ue.ERROR_NO_USER_SIGNED_IN);return P8(t)}async fetchSignInMethodsForEmail(e){const t=se();return{signInMethods:await d8(t,e.email)}}async getPendingAuthResult(){throw this.unimplemented("Not implemented on web.")}async getCurrentUser(){const e=se();return{user:this.createUserResult(e.currentUser)}}async getIdToken(e){const t=se();if(!t.currentUser)throw new Error(ue.ERROR_NO_USER_SIGNED_IN);return{token:await t.currentUser.getIdToken(e?.forceRefresh)||""}}async getIdTokenResult(e){const t=se();if(!t.currentUser)throw new Error(ue.ERROR_NO_USER_SIGNED_IN);const r=await t.currentUser.getIdTokenResult(e?.forceRefresh);return Object.assign(Object.assign({},r),{authTime:Date.parse(r.authTime),expirationTime:Date.parse(r.expirationTime),issuedAtTime:Date.parse(r.issuedAtTime)})}async getRedirectResult(){const e=se(),t=await l_(e),r=t?ve.credentialFromResult(t):null;return this.createSignInResult(t,r)}async getTenantId(){return{tenantId:se().tenantId}}async isSignInWithEmailLink(e){const t=se();return{isSignInWithEmailLink:u8(t,e.emailLink)}}async linkWithApple(e){const t=new ve(wn.APPLE);this.applySignInOptions(e||{},t);const r=await this.linkCurrentUserWithPopupOrRedirect(t,e?.mode),s=ve.credentialFromResult(r);return this.createSignInResult(r,s)}async linkWithEmailAndPassword(e){const t=ln.credential(e.email,e.password),r=await this.linkCurrentUserWithCredential(t);return this.createSignInResult(r,t)}async linkWithEmailLink(e){const t=ln.credentialWithLink(e.email,e.emailLink),r=await this.linkCurrentUserWithCredential(t);return this.createSignInResult(r,t)}async linkWithFacebook(e){const t=new At;this.applySignInOptions(e||{},t);const r=await this.linkCurrentUserWithPopupOrRedirect(t,e?.mode),s=At.credentialFromResult(r);return this.createSignInResult(r,s)}async linkWithGameCenter(){throw this.unimplemented("Not implemented on web.")}async linkWithGithub(e){const t=new vt;this.applySignInOptions(e||{},t);const r=await this.linkCurrentUserWithPopupOrRedirect(t,e?.mode),s=vt.credentialFromResult(r);return this.createSignInResult(r,s)}async linkWithGoogle(e){const t=new Rt;this.applySignInOptions(e||{},t);const r=await this.linkCurrentUserWithPopupOrRedirect(t,e?.mode),s=Rt.credentialFromResult(r);return this.createSignInResult(r,s)}async linkWithMicrosoft(e){const t=new ve(wn.MICROSOFT);this.applySignInOptions(e||{},t);const r=await this.linkCurrentUserWithPopupOrRedirect(t,e?.mode),s=ve.credentialFromResult(r);return this.createSignInResult(r,s)}async linkWithOpenIdConnect(e){const t=new ve(e.providerId);this.applySignInOptions(e,t);const r=await this.linkCurrentUserWithPopupOrRedirect(t,e.mode),s=ve.credentialFromResult(r);return this.createSignInResult(r,s)}async linkWithPhoneNumber(e){const r=se().currentUser;if(!r)throw new Error(ue.ERROR_NO_USER_SIGNED_IN);if(!e.phoneNumber)throw new Error(ue.ERROR_PHONE_NUMBER_MISSING);if(!e.recaptchaVerifier||!(e.recaptchaVerifier instanceof Fh))throw new Error(ue.ERROR_RECAPTCHA_VERIFIER_MISSING);try{const s=await Y8(r,e.phoneNumber,e.recaptchaVerifier),{verificationId:i}=s;this.lastConfirmationResult.set(i,s);const o={verificationId:i};this.notifyListeners(ue.PHONE_CODE_SENT_EVENT,o)}catch(s){const i={message:this.getErrorMessage(s)};this.notifyListeners(ue.PHONE_VERIFICATION_FAILED_EVENT,i)}}async linkWithPlayGames(){throw this.unimplemented("Not implemented on web.")}async linkWithTwitter(e){const t=new Ct;this.applySignInOptions(e||{},t);const r=await this.linkCurrentUserWithPopupOrRedirect(t,e?.mode),s=Ct.credentialFromResult(r);return this.createSignInResult(r,s)}async linkWithYahoo(e){const t=new ve(wn.YAHOO);this.applySignInOptions(e||{},t);const r=await this.linkCurrentUserWithPopupOrRedirect(t,e?.mode),s=ve.credentialFromResult(r);return this.createSignInResult(r,s)}async reload(){const t=se().currentUser;if(!t)throw new Error(ue.ERROR_NO_USER_SIGNED_IN);return Ef(t)}async revokeAccessToken(e){const t=se();return S8(t,e.token)}async sendEmailVerification(e){const r=se().currentUser;if(!r)throw new Error(ue.ERROR_NO_USER_SIGNED_IN);return f8(r,e?.actionCodeSettings)}async sendPasswordResetEmail(e){const t=se();return r8(t,e.email,e.actionCodeSettings)}async sendSignInLinkToEmail(e){const t=se();return c8(t,e.email,e.actionCodeSettings)}async setLanguageCode(e){const t=se();t.languageCode=e.languageCode}async setPersistence(e){const t=se();switch(e.persistence){case Rr.BrowserLocal:await ji(t,qf);break;case Rr.BrowserSession:await ji(t,xu);break;case Rr.IndexedDbLocal:await ji(t,Yf);break;case Rr.InMemory:await ji(t,Pc);break}}async setTenantId(e){const t=se();t.tenantId=e.tenantId}async signInAnonymously(){const e=se(),t=await Z9(e);return this.createSignInResult(t,null)}async signInWithApple(e){const t=new ve(wn.APPLE);this.applySignInOptions(e||{},t);const r=await this.signInWithPopupOrRedirect(t,e?.mode),s=ve.credentialFromResult(r);return this.createSignInResult(r,s)}async signInWithCustomToken(e){const t=se(),r=await n8(t,e.token);return this.createSignInResult(r,null)}async signInWithEmailAndPassword(e){const t=se(),r=await a8(t,e.email,e.password);return this.createSignInResult(r,null)}async signInWithEmailLink(e){const t=se(),r=await l8(t,e.email,e.emailLink);return this.createSignInResult(r,null)}async signInWithFacebook(e){const t=new At;this.applySignInOptions(e||{},t);const r=await this.signInWithPopupOrRedirect(t,e?.mode),s=At.credentialFromResult(r);return this.createSignInResult(r,s)}async signInWithGithub(e){const t=new vt;this.applySignInOptions(e||{},t);const r=await this.signInWithPopupOrRedirect(t,e?.mode),s=vt.credentialFromResult(r);return this.createSignInResult(r,s)}async signInWithGoogle(e){const t=new Rt;this.applySignInOptions(e||{},t);const r=await this.signInWithPopupOrRedirect(t,e?.mode),s=Rt.credentialFromResult(r);return this.createSignInResult(r,s)}async signInWithMicrosoft(e){const t=new ve(wn.MICROSOFT);this.applySignInOptions(e||{},t);const r=await this.signInWithPopupOrRedirect(t,e?.mode),s=ve.credentialFromResult(r);return this.createSignInResult(r,s)}async signInWithOpenIdConnect(e){const t=new ve(e.providerId);this.applySignInOptions(e,t);const r=await this.signInWithPopupOrRedirect(t,e.mode),s=ve.credentialFromResult(r);return this.createSignInResult(r,s)}async signInWithPhoneNumber(e){if(!e.phoneNumber)throw new Error(ue.ERROR_PHONE_NUMBER_MISSING);if(!e.recaptchaVerifier||!(e.recaptchaVerifier instanceof Fh))throw new Error(ue.ERROR_RECAPTCHA_VERIFIER_MISSING);const t=se();try{const r=await K8(t,e.phoneNumber,e.recaptchaVerifier),{verificationId:s}=r;this.lastConfirmationResult.set(s,r);const i={verificationId:s};this.notifyListeners(ue.PHONE_CODE_SENT_EVENT,i)}catch(r){const s={message:this.getErrorMessage(r)};this.notifyListeners(ue.PHONE_VERIFICATION_FAILED_EVENT,s)}}async signInWithPlayGames(){throw this.unimplemented("Not implemented on web.")}async signInWithGameCenter(){throw this.unimplemented("Not implemented on web.")}async signInWithTwitter(e){const t=new Ct;this.applySignInOptions(e||{},t);const r=await this.signInWithPopupOrRedirect(t,e?.mode),s=Ct.credentialFromResult(r);return this.createSignInResult(r,s)}async signInWithYahoo(e){const t=new ve(wn.YAHOO);this.applySignInOptions(e||{},t);const r=await this.signInWithPopupOrRedirect(t,e?.mode),s=ve.credentialFromResult(r);return this.createSignInResult(r,s)}async signOut(){await se().signOut()}async unlink(e){const t=se();if(!t.currentUser)throw new Error(ue.ERROR_NO_USER_SIGNED_IN);const r=await e8(t.currentUser,e.providerId);return{user:this.createUserResult(r)}}async updateEmail(e){const r=se().currentUser;if(!r)throw new Error(ue.ERROR_NO_USER_SIGNED_IN);return _8(r,e.newEmail)}async updatePassword(e){const r=se().currentUser;if(!r)throw new Error(ue.ERROR_NO_USER_SIGNED_IN);return E8(r,e.newPassword)}async updateProfile(e){const r=se().currentUser;if(!r)throw new Error(ue.ERROR_NO_USER_SIGNED_IN);return g8(r,{displayName:e.displayName,photoURL:e.photoUrl})}async useAppLanguage(){se().useDeviceLanguage()}async useEmulator(e){const t=se(),r=e.port||9099,s=e.scheme||"http";e.host.includes("://")?bc(t,`${e.host}:${r}`):bc(t,`${s}://${e.host}:${r}`)}async verifyBeforeUpdateEmail(e){const r=se().currentUser;if(!r)throw new Error(ue.ERROR_NO_USER_SIGNED_IN);return p8(r,e?.newEmail,e?.actionCodeSettings)}handleAuthStateChange(e){const r={user:this.createUserResult(e)};this.notifyListeners(ue.AUTH_STATE_CHANGE_EVENT,r,!0)}async handleIdTokenChange(e){if(!e)return;const r={token:await e.getIdToken(!1)};this.notifyListeners(ue.ID_TOKEN_CHANGE_EVENT,r,!0)}applySignInOptions(e,t){if(e.customParameters){const r={};e.customParameters.map(s=>{r[s.key]=s.value}),t.setCustomParameters(r)}if(e.scopes)for(const r of e.scopes)t.addScope(r)}signInWithPopupOrRedirect(e,t){const r=se();return t==="redirect"?o_(r,e):e_(r,e)}linkCurrentUserWithPopupOrRedirect(e,t){const r=se();if(!r.currentUser)throw new Error(ue.ERROR_NO_USER_SIGNED_IN);return t==="redirect"?c_(r.currentUser,e):t_(r.currentUser,e)}linkCurrentUserWithCredential(e){const t=se();if(!t.currentUser)throw new Error(ue.ERROR_NO_USER_SIGNED_IN);return Uf(t.currentUser,e)}requestAppTrackingTransparencyPermission(){throw this.unimplemented("Not implemented on web.")}checkAppTrackingTransparencyPermission(){throw this.unimplemented("Not implemented on web.")}createSignInResult(e,t){const r=this.createUserResult(e?.user||null),s=this.createCredentialResult(t),i=this.createAdditionalUserInfoResult(e);return{user:r,credential:s,additionalUserInfo:i}}createCredentialResult(e){if(!e)return null;const t={providerId:e.providerId};return e instanceof Wt&&(t.accessToken=e.accessToken,t.idToken=e.idToken,t.secret=e.secret),t}createUserResult(e){return e?{displayName:e.displayName,email:e.email,emailVerified:e.emailVerified,isAnonymous:e.isAnonymous,metadata:this.createUserMetadataResult(e.metadata),phoneNumber:e.phoneNumber,photoUrl:e.photoURL,providerData:this.createUserProviderDataResult(e.providerData),providerId:e.providerId,tenantId:e.tenantId,uid:e.uid}:null}createUserMetadataResult(e){const t={};return e.creationTime&&(t.creationTime=Date.parse(e.creationTime)),e.lastSignInTime&&(t.lastSignInTime=Date.parse(e.lastSignInTime)),t}createUserProviderDataResult(e){return e.map(t=>({displayName:t.displayName,email:t.email,phoneNumber:t.phoneNumber,photoUrl:t.photoURL,providerId:t.providerId,uid:t.uid}))}createAdditionalUserInfoResult(e){if(!e)return null;const t=R8(e);if(!t)return null;const{isNewUser:r,profile:s,providerId:i,username:o}=t,c={isNewUser:r};return i!==null&&(c.providerId=i),s!==null&&(c.profile=s),o!=null&&(c.username=o),c}getErrorMessage(e){return e instanceof Object&&"message"in e&&typeof e.message=="string"?e.message:JSON.stringify(e)}}ue.AUTH_STATE_CHANGE_EVENT="authStateChange";ue.ID_TOKEN_CHANGE_EVENT="idTokenChange";ue.PHONE_CODE_SENT_EVENT="phoneCodeSent";ue.PHONE_VERIFICATION_FAILED_EVENT="phoneVerificationFailed";ue.ERROR_NO_USER_SIGNED_IN="No user is signed in.";ue.ERROR_PHONE_NUMBER_MISSING="phoneNumber must be provided.";ue.ERROR_RECAPTCHA_VERIFIER_MISSING="recaptchaVerifier must be provided and must be an instance of RecaptchaVerifier.";ue.ERROR_CONFIRMATION_RESULT_MISSING="No confirmation result with this verification id was found.";const oE=Object.freeze(Object.defineProperty({__proto__:null,FirebaseAuthenticationWeb:ue},Symbol.toStringTag,{value:"Module"}));export{RE as A,E8 as B,rc as C,_8 as D,ln as E,OE as F,Rt as G,IE as H,bE as I,SE as J,PE as K,TE as L,uE as M,wE as N,Ua as O,up as P,Po as W,tp as _,se as a,NE as b,_E as c,q4 as d,l_ as e,vE as f,dE as g,gE as h,hE as i,o8 as j,f8 as k,CE as l,a8 as m,Vu as n,AE as o,e_ as p,o_ as q,So as r,yE as s,r8 as t,fE as u,mE as v,pE as w,cE as x,EE as y,lE as z};
