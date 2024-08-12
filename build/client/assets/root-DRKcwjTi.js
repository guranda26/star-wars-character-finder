import{u as f,d as x,r as a,j as e,O as S}from"./index-CnyKaqKf.js";import{c as g,a as o,s as j,b as w,P as M}from"./charactersApi-COnzliUl.js";import{f as L,_ as R,M as k,L as I,S as O,h as _}from"./components-DFP-gKeE.js";import{u as P}from"./index-D9_Irmw9.js";/**
 * @remix-run/react v2.11.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let l="positions";function b({getKey:t,...d}){let{isSpaMode:u}=L(),i=f(),m=x();P({getKey:t,storageKey:l});let p=a.useMemo(()=>{if(!t)return null;let s=t(i,m);return s!==i.key?s:null},[]);if(u)return null;let h=((s,y)=>{if(!window.history.state||!window.history.state.key){let r=Math.random().toString(32).slice(2);window.history.replaceState({key:r},"")}try{let n=JSON.parse(sessionStorage.getItem(s)||"{}")[y||window.history.state.key];typeof n=="number"&&window.scrollTo(0,n)}catch(r){console.error(r),sessionStorage.removeItem(s)}}).toString();return a.createElement("script",R({},d,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${h})(${JSON.stringify(l)}, ${JSON.stringify(p)})`}}))}const c=g({reducer:{[o.reducerPath]:o.reducer,selectedItems:j},middleware:t=>t().concat(o.middleware)});w(c.dispatch);function T(){return[{title:"My Page Title"},{name:"description",content:"My page description"}]}function $(){return e.jsxs("html",{lang:"en",children:[e.jsxs("head",{children:[e.jsx(k,{}),e.jsx(I,{})]}),e.jsxs("body",{children:[e.jsx(M,{store:c,children:e.jsx(S,{})}),e.jsx(b,{}),e.jsx(O,{}),e.jsx(_,{})]})]})}export{$ as default,T as meta};
