var he=Object.defineProperty,ue=Object.defineProperties;var pe=Object.getOwnPropertyDescriptors;var E=Object.getOwnPropertySymbols;var V=Object.prototype.hasOwnProperty,K=Object.prototype.propertyIsEnumerable;var Q=(e,o,n)=>o in e?he(e,o,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[o]=n,S=(e,o)=>{for(var n in o||(o={}))V.call(o,n)&&Q(e,n,o[n]);if(E)for(var n of E(o))K.call(o,n)&&Q(e,n,o[n]);return e},T=(e,o)=>ue(e,pe(o));var J=(e,o)=>{var n={};for(var i in e)V.call(e,i)&&o.indexOf(i)<0&&(n[i]=e[i]);if(e!=null&&E)for(var i of E(e))o.indexOf(i)<0&&K.call(e,i)&&(n[i]=e[i]);return n};import{q as ge,j as oe,r as u,p as _,d,a as fe,c as be,b as xe,g as ye,s as Se,e as we,u as P,f as $e,N as G,h as ve,O as Ie,i as ze,C as ke,T as Ce,m as ne,D as Ee,k as re,l as Te,n as Re,o as Le,R as Ae,t as H,v as De,w as Oe,L as A,x as He,y as Fe,Q as Me,z as je,A as Ne,B as R,E as Be,F as Ge,M as _e}from"./vendor.3b567599.js";const Pe=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const m of s.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&i(m)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerpolicy&&(s.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?s.credentials="include":r.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}};Pe();const{styled:l,css:z,globalCss:We,keyframes:ie,getCssText:Jt,theme:Ue,createTheme:Xt,config:qe}=ge({theme:{colors:{"bloo-light-30":"#D6F5FF","bloo-light-20":"#7DD8FF","bloo-light-10":"#0072B1","bloo-light-primary":"#0093ED","bloo-dark-30":"#00314D","bloo-dark-20":"#044468","bloo-dark-10":"#52C1FF","bloo-dark-primary":"#03A4FF",white1:"#ffffff",black1:"#000000",error:"#ff5b5b",shadowLight:"hsl(206 22% 7% / 35%)",shadowDark:"hsl(206 22% 7% / 20%)"},space:{1:"5px",2:"10px",3:"15px",4:"20px",5:"25px",6:"35px",7:"45px",8:"65px",9:"80px"},sizes:{1:"5px",2:"10px",3:"15px",4:"20px",5:"25px",6:"35px",7:"45px",8:"65px",9:"80px"},fontSizes:{1:"0.75rem",2:"0.875rem",3:"1rem",4:"1.125rem",5:"1.25rem",6:"1.5rem",7:"1.625rem",8:"2rem",9:"2.25rem",10:"2.5rem",11:"2.75rem",12:"3rem",13:"3.5rem",14:"4rem"},radii:{1:"4px",2:"6px",3:"8px",4:"10px",5:"12px",6:"14px",7:"16px",8:"18px",9:"20px",10:"24px",pill:"999px"},zIndices:{1:"100",2:"200",3:"300",4:"400",max:"999"},fonts:{default:"'Poppins', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';"},fontWeights:{light:300,regular:400,medium:500,semibold:600,bold:700,extrabold:800},borderStyles:{},borderWidths:{},letterSpacings:{},lineHeights:{},shadows:{headerShadow:"0 0 5px rgba(0, 0, 0, 0.13)"},transitions:{}},utils:{w:e=>({width:e}),h:e=>({height:e}),m:e=>({margin:e}),mt:e=>({marginBlockStart:e}),mr:e=>({marginInlineEnd:e}),mb:e=>({marginBlockEnd:e}),ml:e=>({marginInlineStart:e}),mx:e=>({marginInline:e}),my:e=>({marginBlock:e}),p:e=>({padding:e}),pt:e=>({paddingBlockStart:e}),pr:e=>({paddingInlineEnd:e}),pb:e=>({paddingBlockEnd:e}),pl:e=>({paddingInlineStart:e}),px:e=>({paddingInline:e}),py:e=>({paddingBlock:e}),gapy:e=>({rowGap:e}),gapx:e=>({columnGap:e}),rt:e=>({borderTopLeftRadius:e,borderTopRightRadius:e}),rb:e=>({borderBottomLeftRadius:e,borderBottomRightRadius:e}),rl:e=>({borderTopLeftRadius:e,borderBottomLeftRadius:e}),rr:e=>({borderTopRightRadius:e,borderBottomRightRadius:e}),linearGradient:e=>({backgroundImage:`linear-gradient(${e})`})}}),Ye=We({":root":{fontSize:"16px"},"*, *::before, *::after":{boxSizing:"border-box"},"*":{margin:0},html:{w:320,h:550},"html, body":{fontFamily:"-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"},body:{lineHeight:1.5,"-webkit-font-smoothing":"antialiased"},"img, picture, video, canvas, svg":{display:"block",maxWidth:"100%"},"input, button, textarea, select":{font:"inherit"},"p, h1, h2, h3, h4, h5, h6":{overflowWrap:"break-word"},a:{textDecoration:"none"}});function w(e){const o=qe.themeMap[e];return Object.fromEntries(Object.entries(Ue[o]).map(([n])=>[n,{[e]:`$${n}`}]))}const k=l("div",{width:320,height:550}),F=z({variants:{fontSize:{xs:{fontSize:"$1",lineHeight:"1rem"},sm:{fontSize:"$2",lineHeight:"1.25rem"},base:{fontSize:"$3",lineHeight:"1.5rem"},lg:{fontSize:"$4",lineHeight:"1.75rem"},xl:{fontSize:"$5",lineHeight:"1.75rem"},"2xl":{fontSize:"$6",lineHeight:"2rem"},"3xl":{fontSize:"1.875rem",lineHeight:"2.25rem"},"4xl":{fontSize:"$9",lineHeight:"2.5rem"},"5xl":{fontSize:"$12",lineHeight:1},"6xl":{fontSize:"3.75rem",lineHeight:1},"7xl":{fontSize:"4.5rem",lineHeight:1},"8xl":{fontSize:"6rem",lineHeight:1},"9xl":{fontSize:"8rem",lineHeight:1}},color:w("color"),weight:w("fontWeight")},defaultVariants:{fontSize:"base"}}),c=l("span",F),t=oe.exports.jsx,a=oe.exports.jsxs,W=z({$$borderSize:"2px","&:focus-visible":{outline:"none"},"&::placeholder":{color:"hsla(203, 100%, 46%, 0.5)"},variants:{color:w("color"),variant:{outlined:{border:"none",boxShadow:"inset 0 0 0 $$borderSize currentColor",transition:"all 150ms ease"},unstyled:{border:"none"}},size:{base:{height:"2.5rem"},lg:{height:"3rem"}}},compoundVariants:[{variant:"outlined",size:"base",css:{borderRadius:"$3","input&, & > input":{px:"$3"}}},{variant:"outlined",size:"lg",css:{$$borderSize:"2px",borderRadius:"$7","input&, & > input":{px:"$4"}}}],defaultVariants:{variant:"unstyled",size:"base"}}),D=l("input",F,W,{flexGrow:1,backgroundColor:"transparent",fontWeight:"$medium",'&[type="time"]::-webkit-calendar-picker-indicator, &[type="date"]::-webkit-calendar-picker-indicator':{ml:"$1",filter:"invert(54%) sepia(47%) saturate(6519%) hue-rotate(177deg) brightness(95%) contrast(105%)"}}),Qe=l("textarea",F,W,{width:"100%"});u.exports.forwardRef((e,o)=>t("div",{children:t(Qe,T(S({},e),{ref:o,onInput:n=>{n.currentTarget.style.height="inherit",n.currentTarget.style.height=`${n.currentTarget.scrollHeight}px`,e.onInput&&e.onInput(n)}}))}));const M=z({$$onPressScale:.98,background:"none",border:"none",fontWeight:"$bold",borderRadius:"$3",cursor:"pointer",userSelect:"none",display:"grid",placeItems:"center",transition:"all 150ms ease","&:active":{transform:"scale($$onPressScale)"},variants:{size:{sm:{px:"1rem",height:"2rem",fontSize:"$1",fontWeight:"$bold",lineHeight:1,borderRadius:"$2"},base:{padding:"0.5rem 1.5rem",fontSize:"$3"}},variant:{primary:{color:"$white1",backgroundColor:"$bloo-light-primary","&:hover":{backgroundColor:"$bloo-dark-primary"},"&:active":{backgroundColor:"$bloo-light-10"},"&:focus-within":{outline:"2px solid $bloo-dark-30"}},unstyled:{color:"$bloo-light-primary","&:hover":{color:"$bloo-light-10"}}}},defaultVariants:{variant:"unstyled",size:"base"}}),O=l("button",M),I=l("div",{});function C(){return t(Ve,{children:t(Ke,{})})}const Ve=l("div",{backgroundColor:"$bloo-dark-primary",p:"0.75rem 1.5rem",borderRadius:"$3"}),Ke=l("div",{backgroundColor:"$white1",height:"0.5rem",width:"2.25rem",borderRadius:"$2"}),Je=z({display:"flex",variants:{gap:w("gap"),gapX:w("columnGap"),gapY:w("rowGap"),direction:{row:{flexDirection:"row"},column:{flexDirection:"column"},rowReverse:{flexDirection:"row-reverse"},columnReverse:{flexDirection:"column-reverse"}},align:{start:{alignItems:"flex-start"},center:{alignItems:"center"},end:{alignItems:"flex-end"},stretch:{alignItems:"stretch"},baseline:{alignItems:"baseline"}},justify:{start:{justifyContent:"flex-start"},center:{justifyContent:"center"},end:{justifyContent:"flex-end"},between:{justifyContent:"space-between"}}},defaultVariants:{direction:"row",align:"stretch",justify:"start"}}),p=l("div",Je),se=_(e=>{e.createdAt=d(e.createdAt).toDate()});_(e=>{e.createdAt=d(e.createdAt).toDate()});const ae=_(e=>{e.createdAt=d(e.createdAt).toDate(),e.startTime=d(e.startTime).toDate(),e.endTime=d(e.endTime).toDate()}),x=fe.create({baseURL:"https://ops-api-production.up.railway.app/api/"}),Xe=e=>x.post("users/login",e).then(o=>o.data),Ze="auth-storage",et={getItem:async e=>(chrome.storage.sync.get(e),await ye(e)||null),setItem:async(e,o)=>{chrome.storage.sync.set({[e]:JSON.parse(o)}),await Se(e,o)},removeItem:async e=>{chrome.storage.local.remove(e),await we(e)}},b=be(xe((e,o)=>({user:null,signout:n=>{e({user:null}),n&&n()},signin:n=>Xe(n).then(i=>(e({user:i}),i)),_hasHydrated:!1,setHasHydrated:n=>e({_hasHydrated:n})}),{name:Ze,getStorage:()=>et,onRehydrateStorage:()=>e=>e==null?void 0:e.setHasHydrated(!0)}));function tt(){var q,Y;const e=b(f=>f.signin),o=b(f=>f.user),n=P(),[i,r]=u.exports.useReducer(f=>!f,!1),{register:s,handleSubmit:m,formState:{errors:g}}=$e(),[h,$]=u.exports.useState(!0),[y,j]=u.exports.useState(0);u.exports.useEffect(()=>{chrome.storage.sync.get().then(f=>{f.examId&&j(f.examId),$(!1)})},[]);const me=async f=>{try{await e(f).then(()=>{n("/exams")})}catch{alert("Your email or password is incorrect.")}};return h?t("div",{children:"loading"}):o?y?t(G,{to:`/exams/${y}`,state:{from:location},replace:!0}):t(G,{to:"/exams",state:{from:location},replace:!0}):t(k,{children:a(p,{direction:"column",align:"center",justify:"center",gap:"5",css:{mx:"auto",position:"relative",h:"100%",w:"fit-content"},children:[t(I,{css:{position:"absolute",top:"1.5rem",left:"0"},children:t(C,{})}),a(I,{css:{w:"100%",pt:"$9"},children:[t(c,{as:"h1",fontSize:"3xl",color:"bloo-light-primary",weight:"extrabold",children:"Log in"}),t(c,{as:"h4",fontSize:"base",color:"bloo-dark-primary",weight:"semibold",children:"Sign in to continue!"})]}),a(nt,{onSubmit:m(me),children:[t(X,{label:"Institutional Email",error:(q=g.email)==null?void 0:q.message,children:t(D,S({variant:"outlined",color:"bloo-light-primary",placeholder:"john.doe@cit.edu",fontSize:"sm",type:"email"},s("email",{required:"required",pattern:{value:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,message:"invalid email"}})))}),t(X,{label:"Password",error:(Y=g.password)==null?void 0:Y.message,children:a(ot,{variant:"outlined",color:"bloo-light-primary",children:[t(D,S({type:i?"text":"password",fontSize:"sm",css:{color:"inherit"}},s("password",{required:"required"}))),t(O,{type:"button",variant:"unstyled",size:"sm",css:{px:0,width:"2rem",outline:"none"},onClick:r,children:i?"Hide":"Show"})]})}),t(O,{variant:"primary",children:"Log in"})]})]})})}const ot=l("div",W,{display:"flex",alignItems:"center",pr:"$2"}),nt=l("form",{display:"flex",flexDirection:"column",gap:"$3"}),rt=z({display:"grid",gridTemplateAreas:'"label" "input"',rowGap:"$1",width:"100%","fieldset&":{border:"none",p:0,m:0},[`& label${c}`]:{gridArea:"label"},[`& ${D}`]:{gridArea:"input"},variants:{variant:{error:{"& *":{color:"$error"}}}}});function X({label:e,error:o,children:n}){const i=Boolean(o);return a("fieldset",{className:rt({variant:i?"error":void 0}),children:[t(c,{fontSize:"sm",color:"bloo-light-10",as:"label",children:e}),n,i?t(c,{fontSize:"xs",color:"error",as:"small",css:{wordWrap:"break-word"},children:o}):null]})}function N({children:e}){const o=b(i=>i.user),n=ve();return o?e:t(G,{to:"/login",state:{from:n},replace:!0})}const it=ie({"0%":{opacity:0},"100%":{opacity:1}}),st=ie({"0%":{opacity:0,transform:"translate(-50%, -48%) scale(.96)"},"100%":{opacity:1,transform:"translate(-50%, -50%) scale(1)"}}),at=l(Ie,{backgroundColor:ze.blackA9,position:"fixed",inset:0,"@media (prefers-reduced-motion: no-preference)":{animation:`${it} 150ms cubic-bezier(0.16, 1, 0.3, 1)`},zIndex:"$max"});function lt(n){var i=n,{children:e}=i,o=J(i,["children"]);return a(Ae,T(S({},o),{children:[t(at,{}),e]}))}const ct=l(ke,{backgroundColor:"white",borderRadius:6,boxShadow:"hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",position:"fixed",top:"40%",left:"50%",transform:"translate(-50%, -50%)",width:"90vw",maxHeight:"85vh",padding:"1rem",zIndex:"$max","@media (prefers-reduced-motion: no-preference)":{animation:`${st} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,willChange:"transform"},"&:focus":{outline:"none"}}),dt=l(Ce,F,{margin:0,fontWeight:500,color:ne.mauve12,fontSize:"1rem"});l(Ee,{margin:"10px 0 20px",color:ne.mauve11,fontSize:15,lineHeight:1.5});const mt=l(re,M);l(re,M,{background:"none",border:"none",cursor:"pointer"});l(Te,{background:"none",border:"none",borderRadius:5,color:Re.slate11,padding:5,cursor:"pointer",transition:"background-color 200ms ease","&:hover":{backgroundColor:Le.blue3}});const ht=lt,ut=mt,pt=ct,gt=dt,ft=(e={})=>x.get("classes",{params:e}).then(o=>o.data).then(o=>o.map(se)),bt=e=>x.get(`classes/${e}`).then(o=>o.data).then(se),xt=e=>x.post("classes/enrol",e),U="classes";function yt({options:e,params:o}={}){return H([U,o],()=>ft(o),e)}function St(e,o){return H([U,e],()=>bt(e),o)}function wt({options:e}={}){const o=Oe();return De(i=>xt(i),T(S({},e||{}),{onSuccess:(i,r,s)=>{o.invalidateQueries(U),e!=null&&e.onSuccess&&e.onSuccess(i,r,s)}}))}function $t({classData:e}){return t(I,{css:{backgroundColor:"$bloo-light-30",p:"1rem",w:"100%",borderRadius:"5px"},children:a(c,{color:"bloo-light-primary",weight:"extrabold",fontSize:"3xl",children:[e.courseCode," - ",e.section]})})}function vt(){const[e,o]=u.exports.useState(!1),[n,i]=u.exports.useState(""),r=b(h=>h.user),{data:s,isLoading:m}=yt({params:{examineeId:r==null?void 0:r.id},options:{enabled:Boolean(r==null?void 0:r.id)}}),{mutate:g}=wt();return a(k,{css:{py:"1.5rem",px:"1.5rem"},children:[a(It,{children:[t(C,{}),a(p,{gap:"2",children:[t(A,{to:"/classes",children:t(c,{color:"bloo-light-primary",children:"Classes"})}),t(A,{to:"/exams",children:t(c,{color:"bloo-light-primary",children:"Exams"})})]})]}),a(zt,{children:[a(p,{justify:"between",children:[t(c,{as:"h1",color:"bloo-light-primary",fontSize:"2xl",children:"Classes"}),a(ht,{open:e,onOpenChange:o,children:[t(ut,{size:"sm",variant:"primary",children:"Enroll"}),a(pt,{children:[t(gt,{fontSize:"lg",color:"bloo-light-primary",weight:"bold",css:{mb:"$6"},children:"Enrol to Class"}),a("form",{onSubmit:h=>{h.preventDefault(),g({examineeId:r==null?void 0:r.id,code:n}),o(!1)},children:[t(c,{as:"label",color:"bloo-light-primary",fontSize:"sm",children:"Class Code"}),a(p,{gap:"3",children:[t(D,{value:n,onChange:h=>i(h.currentTarget.value),variant:"outlined",color:"bloo-light-primary",css:{width:150,flexShrink:1}}),t(O,{variant:"primary",size:"base",css:{fontSize:"$1"},children:"Enrol"})]})]})]})]})]}),t(p,{direction:"column",css:{mt:"$4"},children:s!=null&&s.length?s.map(h=>t($t,{classData:h},h.id)):t(c,{color:"bloo-light-primary",children:"You are not enrolled in any class."})})]})]})}const It=l("header",{display:"flex",justifyContent:"space-between",w:"100%"}),zt=l("main",{mt:"$5"}),kt=(e={})=>x.get("exams",{params:e}).then(o=>o.data).then(o=>o.map(ae)),Ct=e=>x.get(`exams/${e}`).then(o=>o.data).then(ae),le="exams";function Et({options:e,params:o}={}){return H([le,o],()=>kt(o),e)}function Tt(e,o){return H([le,e],()=>Ct(e),o)}function ce(e,o){const n=d(o).diff(d(e))/2,i=d(Date()).diff(e);return n>i}function Rt(e,o){const[n,i]=u.exports.useState(()=>d(e).unix()-d().unix()),r=u.exports.useRef();u.exports.useEffect(()=>{const $=setInterval(()=>i(y=>y-1),1e3);return r.current=$,()=>clearInterval(r.current||$)},[]),u.exports.useEffect(()=>{n<=0&&(clearInterval(r.current),o())},[n,o]);const s=Math.floor(n/60/60),m=Math.floor(n/60%60),g=Math.floor(n%60);return n<=0?null:`${s||""}:${m||""}:${g||""}`}d.extend(He);const de="h:mm A",B="ddd, MMM D h:mm A";function Z(e){return d(e).format(de)}function Lt(e){return d(e).fromNow()}function At(e,o){const n=d(e),i=d(o);return n.isSame(i,"date")?`${n.format(B)} - ${i.format(de)}`:`${n.format(B)} - ${i.format(B)}`}function ee({exam:e}){const o=b(s=>s.user),n=P(),i=async()=>{const s=new URL(e.link),m=!ce(e.startTime,e.endTime);chrome.storage.sync.set({settled:!1,examId:e.id,examineeId:o==null?void 0:o.id,url:`${s.origin}${s.pathname}`,isLate:m}),chrome.alarms.create("finish-exam",{when:+new Date(e.endTime)})},r=e.status==="ONGOING";return a(p,{justify:"between",direction:"column",css:{backgroundColor:"$bloo-light-30",p:"1rem",w:"100%",borderRadius:"8px"},gap:"2",children:[r?t(I,{css:{backgroundColor:"$bloo-light-10",borderRadius:"8px",p:".25rem",w:"fit-content"},children:t(c,{color:"white1",weight:"semibold",fontSize:"lg",children:e.name})}):a(p,{direction:"row",justify:"between",align:"center",children:[t(c,{color:"bloo-light-primary",weight:"bold",fontSize:"lg",children:e.name}),t(Dt,{label:new Date(e.startTime).toLocaleString("en-us",{weekday:"long"})})]}),r?a(p,{gap:"2",justify:"between",align:"end",direction:"row",children:[a(p,{gap:"1",direction:"column",children:[t(c,{color:"bloo-light-primary",fontSize:"sm",weight:"semibold",children:"Time Left"}),t(c,{color:"bloo-light-20",fontSize:"sm",weight:"semibold",children:Rt(e.endTime,()=>{n("/exams")})})]}),t("a",{href:e.link,target:"_blank",rel:"noopener noreferrer",className:M({variant:"primary",size:"sm"}),onClick:i,children:"Start Exam"})]}):a(c,{color:"bloo-light-20",fontSize:"sm",weight:"semibold",children:[Z(e.startTime)," - ",Z(e.endTime)]})]})}function Dt({label:e}){return t(I,{css:{h:"fit-content",backgroundColor:"$white1",border:"1px solid $bloo-light-10",borderRadius:"999px",px:".45rem"},children:t(c,{color:"bloo-light-10",weight:"semibold",fontSize:"xs",children:e})})}function Ot(){const e=b(s=>s.user),{data:o,isLoading:n}=Et({params:{examineeId:e==null?void 0:e.id},options:{enabled:Boolean(e==null?void 0:e.id)}});if(n)return t("div",{children:"loading..."});const i=o==null?void 0:o.filter(s=>s.status==="ONGOING"),r=o==null?void 0:o.filter(s=>s.status==="UPCOMING");return a(k,{css:{py:"1.5rem",px:"1.5rem"},children:[a(Ht,{children:[t(C,{}),a(p,{gap:"2",children:[t(A,{to:"/classes",children:t(c,{color:"bloo-light-primary",children:"Classes"})}),t(A,{to:"/exams",children:t(c,{color:"bloo-light-primary",children:"Exams"})})]})]}),a(Ft,{children:[t(c,{as:"h1",color:"bloo-light-primary",fontSize:"2xl",css:{mb:"1rem"},children:"Exams"}),a(p,{direction:"column",gap:"2",css:{py:"$4"},children:[t(te,{children:"Ongoing"}),i!=null&&i.length?i.map(s=>t(ee,{exam:s},s.id)):t(c,{color:"bloo-light-primary",children:"No ongoing exams right now."}),t(te,{children:"Upcoming"}),r!=null&&r.length?r.map(s=>t(ee,{exam:s},s.id)):t(c,{color:"bloo-light-primary",children:" No exams upcoming."})]})]})]})}const Ht=l("header",{display:"flex",justifyContent:"space-between",w:"100%"}),Ft=l("main",{mt:"$5"}),te=l("div",{color:"$bloo-light-20",fontSize:"large",fontWeight:"$bold"});function Mt(){return a(k,{css:{py:"1.5rem",px:"1.5rem"},children:[t(jt,{children:t(C,{})}),a(Nt,{children:[t(Gt,{children:"Welcome to OPS!"}),t(c,{as:"p",fontSize:"sm",color:"bloo-dark-primary",css:{paddingBlock:"1rem"},children:"It seems like you have not authorized this extension to work in incognito. Please follow the instructions below to allow incognito access."}),a(Bt,{children:[a(v,{children:["On your web browser, navigate to the ",t("b",{children:"Extensions"})," settings page"," ",t("u",{children:"chrome://extensions"}),"."]}),a(v,{children:["Find the ",t("b",{children:"OPS"})," browser extension."]}),a(v,{children:["Click on ",t("b",{children:"Details"}),"."]}),a(v,{children:["Find ",t("b",{children:" Allow in Incognito "})," option and turn it on."]}),t(v,{children:"Reopen the browser extension."})]})]})]})}const jt=l("header",{display:"flex",justifyContent:"space-between",w:"100%"}),Nt=l("main",{mt:"$5"}),Bt=l("ol",{display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"space-between",gapy:"$1",w:"100%"}),v=l("li",{fontSize:"$3",color:"$bloo-light-primary"}),Gt=l("h1",{color:"$bloo-dark-20"}),_t=e=>x.post("activities",e);function Pt(){const e=b(j=>j.user),o=Fe(),n=o.examId?parseInt(o.examId,10):0,i=P(),{data:r,status:s}=Tt(n,{enabled:Boolean(n)}),{data:m}=St(r==null?void 0:r.classId,{enabled:Boolean(r==null?void 0:r.classId)});if(s!=="success"||!e)return t("div",{children:"loading"});const g=ce(r.startTime,r.endTime),h=new Date,y=d(h).isAfter(r.endTime)?`Exam has ended 
    ${Lt(r.endTime)}.
        Finish this exam to start another.`:`You still have 
    ${d(r.endTime).diff(h,"minutes")}
     minutes left to continue taking the exam. Finish now?`;return a(k,{css:{py:"1.5rem",px:"1.5rem"},children:[t(Wt,{children:t(C,{})}),a(p,{direction:"column",css:{h:"100%"},gap:"1",children:[t(c,{as:"p",color:"bloo-light-20",css:{alignSelf:"start",marginTop:"1rem",marginBottom:"0.75rem"},children:"You are currently taking ..."}),t(c,{as:"h1",color:"bloo-light-primary",fontSize:"4xl",children:r.name}),r.description?t(L,{title:"Description",detail:r.description}):null,t(L,{title:"Schedule",detail:At(r.startTime.toJSON(),r.endTime.toJSON())}),m?t(L,{title:"Section",detail:m.section}):null,t(L,{title:"Platform",detail:Ut[r.platform]}),t(c,{as:"p",fontSize:"sm",color:"bloo-dark-primary",weight:"semibold",css:{textAlign:"center",marginTop:"2rem"},children:y}),t(O,{variant:"primary",size:"base",onClick:()=>{_t({name:"FINISHED_EXAM",description:g?"quickly finished the exam.":"has finished the exam",examId:n,examineeId:e.id,isSuspicious:g}).then(()=>{chrome.storage.sync.clear(),i("/exams")})},children:"Finish Exam"})]})]})}const Wt=l("header",{display:"flex",justifyContent:"space-between",w:"100%"});function L({detail:e,title:o}){return a(p,{direction:"column",css:{maxWidth:"40ch"},children:[t(c,{color:"bloo-light-primary",children:o}),t(c,{color:"bloo-light-primary",weight:"bold",children:e})]})}const Ut={TEAMS:"Microsoft Teams",GOOGLE_FORMS:"Google Forms",MOODLE:"Moodle"},qt=new Me;function Yt(){Ye();const[e,o]=u.exports.useState(!0),[n,i]=u.exports.useState(!1),r=b(s=>s._hasHydrated);return u.exports.useEffect(()=>{chrome.extension.isAllowedIncognitoAccess().then(s=>{i(s),o(!1)})},[]),!r||e?t("p",{children:"Loading..."}):n?t(je,{client:qt,children:a(Ne,{children:[t(R,{path:"/",element:t(tt,{})}),t(R,{path:"classes",element:t(N,{children:t(vt,{})})}),t(R,{path:"exams",element:t(N,{children:t(Ot,{})})}),t(R,{path:"exams/:examId",element:t(N,{children:t(Pt,{})})})]})}):t(Mt,{})}Be.render(t(Ge.StrictMode,{children:t(_e,{children:t(Yt,{})})}),document.getElementById("root"));
