/*! LAB.js (LABjs :: Loading And Blocking JavaScript)
 v2.0.3 (c) Kyle Simpson
 MIT License
 https://github.com/getify/LABjs/blob/master/LAB.src.js
 */
;
if(typeof $LAB=="undefined"||!!!$LAB){(function(s){var w=s.$LAB,k="UseLocalXHR",r="AlwaysPreserveOrder",o="AllowDuplicates",n="CacheBust",m="Debug",f="BasePath",t=/^[^?#]*\//.exec(location.href)[0],D=/^\w+\:\/\/\/?[^\/]+/.exec(t)[0],g=document.head||document.getElementsByTagName("head"),i=(s.opera&&Object.prototype.toString.call(s.opera)=="[object Opera]")||("MozAppearance" in document.documentElement.style),c=function(){},p=c,B=document.createElement("script"),a=typeof B.preload=="boolean",y=a||(B.readyState&&B.readyState=="uninitialized"),z=!y&&B.async===true,A=!y&&!z&&!i;
if(s.console&&s.console.log){if(!s.console.error){s.console.error=s.console.log
}c=function(E){s.console.log(E)
};
p=function(F,E){s.console.error(F,E)
}
}function v(E){return Object.prototype.toString.call(E)=="[object Function]"
}function C(E){return Object.prototype.toString.call(E)=="[object Array]"
}function h(G,F){var E=/^\w+\:\/\//;
if(/^\/\/\/?/.test(G)){G=location.protocol+G
}else{if(!E.test(G)&&G.charAt(0)!="/"){G=(F||"")+G
}}return E.test(G)?G:((G.charAt(0)=="/"?D:t)+G)
}function j(F,G){for(var E in F){if(F.hasOwnProperty(E)){G[E]=F[E]
}}return G
}function b(F){var G=false;
for(var E=0;
E<F.scripts.length;
E++){if(F.scripts[E].ready&&F.scripts[E].exec_trigger){G=true;
F.scripts[E].exec_trigger();
F.scripts[E].exec_trigger=null
}}return G
}function d(G,F,E,H){G.onload=G.onreadystatechange=function(){if((G.readyState&&G.readyState!="complete"&&G.readyState!="loaded")||F[E]){return
}G.onload=G.onreadystatechange=null;
H()
}
}function x(E){E.ready=E.finished=true;
for(var F=0;
F<E.finished_listeners.length;
F++){E.finished_listeners[F]()
}E.ready_listeners=[];
E.finished_listeners=[]
}function e(E){var F=l(E);
return F.href.replace(F.protocol+"//"+F.host,"")
}function l(E){var F=document.createElement("div"),G=E.split("&").join("&amp;").split("<").join("&lt;").split('"').join("&quot;");
F.innerHTML='<a href="'+G+'">x</a>';
var H=F.firstChild;
return{href:H.href,href:H.href,hostname:H.hostname,host:H.host,protocol:H.protocol}
}function u(G,H,F,I,E){setTimeout(function(){var J,L=H.real_src,K;
if("item" in g){if(!g[0]){setTimeout(arguments.callee,25);
return
}g=g[0]
}J=document.createElement("script");
if(H.type){J.type=H.type
}if(H.charset){J.charset=H.charset
}if(E){if(y){if(G[m]){c("start script preload: "+L)
}F.elem=J;
if(a){J.preload=true;
J.onpreload=I
}else{J.onreadystatechange=function(){if(J.readyState=="loaded"){I()
}}
}J.src=L
}else{if(E&&L.indexOf(D)==0&&G[k]){K=new XMLHttpRequest();
if(G[m]){c("start script preload (xhr): "+L)
}K.onreadystatechange=function(){if(K.readyState==4){K.onreadystatechange=function(){};
F.text=K.responseText+"\n//@ sourceURL="+L;
I()
}};
K.open("GET",L);
K.send()
}else{if(G[m]){c("start script preload (cache): "+L)
}J.type="text/cache-script";
d(J,F,"ready",function(){g.removeChild(J);
I()
});
J.src=L;
g.insertBefore(J,g.firstChild)
}}}else{if(z){if(G[m]){c("start script load (ordered async): "+L)
}J.async=false;
d(J,F,"finished",I);
J.src=L;
g.insertBefore(J,g.firstChild)
}else{if(G[m]){c("start script load: "+L)
}d(J,F,"finished",I);
J.src=L;
g.insertBefore(J,g.firstChild)
}}},0)
}function q(){var G={},L=y||A,E=[],F={},I;
G[k]=true;
G[r]=false;
G[o]=false;
G[n]=false;
G[m]=false;
G[f]="";
function K(O,Q,N){var M;
function P(){if(M!=null){M=null;
x(N)
}}if(F[Q.script_uri].finished){return
}if(!O[o]){F[Q.script_uri].finished=true
}M=N.elem||document.createElement("script");
if(Q.type){M.type=Q.type
}if(Q.charset){M.charset=Q.charset
}d(M,N,"finished",P);
if(N.elem){N.elem=null
}else{if(N.text){M.onload=M.onreadystatechange=null;
M.text=N.text
}else{M.src=Q.real_src
}}g.insertBefore(M,g.firstChild);
if(N.text){P()
}}function H(O,S,R,M){var N,Q,P=function(){S.ready_cb(S,function(){K(O,S,N)
})
},T=function(){S.finished_cb(S,R)
};
S.src=h(S.src,O[f]);
S.script_uri=e(S.src);
S.real_src=S.src+(O[n]?((/\?.*$/.test(S.src)?"&_":"?_")+~~(Math.random()*1000000000)+"="):"");
if(!F[S.script_uri]){F[S.script_uri]={items:[],finished:false}
}Q=F[S.script_uri].items;
if(O[o]||Q.length==0){N=Q[Q.length]={ready:false,finished:false,ready_listeners:[P],finished_listeners:[T]};
u(O,S,N,((M)?function(){N.ready=true;
for(var U=0;
U<N.ready_listeners.length;
U++){N.ready_listeners[U]()
}N.ready_listeners=[]
}:function(){x(N)
}),M)
}else{N=Q[0];
if(N.finished){T()
}else{N.finished_listeners.push(T)
}}}function J(){var P,T=j(G,{}),M=[],O=0,Q=false,S;
function V(X,W){if(T[m]){c("script preload finished: "+X.real_src)
}X.ready=true;
X.exec_trigger=W;
N()
}function U(Y,X){if(T[m]){c("script execution finished: "+Y.real_src)
}Y.ready=Y.finished=true;
Y.exec_trigger=null;
for(var W=0;
W<X.scripts.length;
W++){if(!X.scripts[W].finished){return
}}X.finished=true;
N()
}function N(){while(O<M.length){if(v(M[O])){if(T[m]){c("$LAB.wait() executing: "+M[O])
}try{M[O++]()
}catch(W){if(T[m]){p("$LAB.wait() error caught: ",W)
}}continue
}else{if(!M[O].finished){if(b(M[O])){continue
}break
}}O++
}if(O==M.length){Q=false;
S=false
}}function R(){if(!S||!S.scripts){M.push(S={scripts:[],finished:true})
}}P={script:function(){for(var W=0;
W<arguments.length;
W++){(function(aa,Y){var Z;
if(!C(aa)){Y=[aa]
}for(var X=0;
X<Y.length;
X++){R();
aa=Y[X];
if(v(aa)){aa=aa()
}if(!aa){continue
}if(C(aa)){Z=[].slice.call(aa);
Z.unshift(X,1);
[].splice.apply(Y,Z);
X--;
continue
}if(typeof aa=="string"){aa={src:aa}
}aa=j(aa,{ready:false,ready_cb:V,finished:false,finished_cb:U});
S.finished=false;
S.scripts.push(aa);
H(T,aa,S,(L&&Q));
Q=true;
if(T[r]){P.wait()
}}})(arguments[W],arguments[W])
}return P
},wait:function(){if(arguments.length>0){for(var W=0;
W<arguments.length;
W++){M.push(arguments[W])
}S=M[M.length-1]
}else{S=false
}N();
return P
}};
return{script:P.script,wait:P.wait,setOptions:function(W){j(W,T);
return P
}}
}I={setGlobalDefaults:function(M){j(M,G);
return I
},setOptions:function(){return J().setOptions.apply(null,arguments)
},script:function(){return J().script.apply(null,arguments)
},wait:function(){return J().wait.apply(null,arguments)
},queueScript:function(){E[E.length]={type:"script",args:[].slice.call(arguments)};
return I
},queueWait:function(){E[E.length]={type:"wait",args:[].slice.call(arguments)};
return I
},runQueue:function(){var O=I,M=E.length,N=M,P;
for(;
--N>=0;
){P=E.shift();
O=O[P.type].apply(null,P.args)
}return O
},noConflict:function(){s.$LAB=w;
return I
},sandbox:function(){return q()
}};
return I
}s.$LAB=q();
(function(G,E,F){if(document.readyState==null&&document[G]){document.readyState="loading";
document[G](E,F=function(){document.removeEventListener(E,F,false);
document.readyState="complete"
},false)
}})("addEventListener","DOMContentLoaded")
})(this)
}(function(b,d){var c=0;
var e=["ms","moz","webkit","o"];
for(var a=0;
a<e.length&&!b.requestAnimationFrame;
++a){b.requestAnimationFrame=b[e[a]+"RequestAnimationFrame"];
b.cancelAnimationFrame=b[e[a]+"CancelAnimationFrame"]||b[e[a]+"CancelRequestAnimationFrame"]
}if(!b.requestAnimationFrame){b.requestAnimationFrame=function(j,g){var f=new Date().getTime();
var h=Math.max(0,16-(f-c));
var i=b.setTimeout(function(){j(f+h)
},h);
c=f+h;
return i
}
}if(!b.cancelAnimationFrame){b.cancelAnimationFrame=function(f){clearTimeout(f)
}
}})(window);
/*! loadCSS. [c]2017 Filament Group, Inc. MIT License */
;
(function(a){if(!a.preloadCSS){a.preloadCSS=function(){};
var b=preloadCSS.relpreload={};
b.support=(function(){var d;
try{d=a.document.createElement("link").relList.supports("preload")
}catch(f){d=false
}return function(){return d
}
})();
b.supportPreload=b.support();
b.bindMediaToggle=function(e){var f=e.media||"all";
function d(){if(e.addEventListener){e.removeEventListener("load",d)
}else{if(e.attachEvent){e.detachEvent("onload",d)
}}e.setAttribute("onload",null);
e.media=f
}if(e.addEventListener){e.addEventListener("load",d)
}else{if(e.attachEvent){e.attachEvent("onload",d)
}}setTimeout(function(){e.rel="stylesheet";
e.media="only x"
});
setTimeout(d,3000)
};
b.poly=function(){if(b.supportPreload){return
}var d=a.document.getElementsByTagName("link");
if(!!!d.length){return
}for(var e=0;
e<d.length;
e++){var f=d[e];
if(f.rel==="preload"&&f.getAttribute("as")==="style"&&!f.getAttribute("data-loadcss")){f.setAttribute("data-loadcss",true);
b.bindMediaToggle(f)
}}};
if(!b.supportPreload){b.poly();
var c=a.setInterval(b.poly,500);
if(a.addEventListener){a.addEventListener("load",function(){b.poly();
a.clearInterval(c)
})
}else{if(a.attachEvent){a.attachEvent("onload",function(){b.poly();
a.clearInterval(c)
})
}}}if(typeof exports!=="undefined"){exports.preloadCSS=preloadCSS
}else{a.preloadCSS=preloadCSS
}}}(typeof global!=="undefined"?global:this));
(function(e,g,i,a){var f=g.LABHelper||{};
var d={threshold:0,container:g};
function b(j){var l;
try{l=j.getBoundingClientRect()
}catch(k){}if(!l){return h()
}if(!(l.width&&l.height)){l={top:l.top,right:l.right,bottom:l.bottom,left:l.left,width:l.right-l.left,height:l.bottom-l.top}
}return l
}function h(){return{top:0,bottom:0,left:0,right:0,width:0,height:0}
}function c(k,l){var n=e(k);
if(!!!n.length){return false
}if(typeof l=="undefined"){l=d
}var j=l.threshold;
var o=e(g).height();
var m=b(n[0]);
if((m.top-j<=o)&&(m.bottom+j>=0)){return true
}}e.extend(f,{isElementInViewport:c,inviewport:c});
g.LABHelper=f
})(jQuery,window,document);
if(typeof window.LABHelper!="undefined"&&(typeof window.LABHelper.loadCss=="undefined"||!!!window.LABHelper.loadCss)){(function(d,g,h,b){if(typeof d=="undefined"||!!!d){return
}var e=g.LABHelper||{};
var f=e._lazy_css_||[];
function i(m){if(typeof m=="undefined"){return
}var n=m.url;
if(!!!n){return
}var A=a(n);
if(f[A]){return
}var p=typeof m.callback=="function"?m.callback:function(){};
var o=function(){p()
};
var u=m.id,v=h.createElement("link"),q="onload" in v;
var z=+navigator.userAgent.replace(/.*(?:AppleWebKit|AndroidWebKit)\/?(\d+).*/i,"$1")<536;
var t=m.crossorigin;
var r=m.preload;
if(typeof r=="undefined"||z||!q){r=false
}v.rel=r?"preload":"stylesheet";
if(r){v.as="style"
}v.type="text/css";
v.href=n;
if(typeof u!=="undefined"){v.id=u
}if(t!==void 0){v.setAttribute("crossorigin",t)
}var B=m.isBefore;
if(typeof B=="undefined"){B=true
}var w=m.isReplace;
if(typeof B=="undefined"){w=false
}var k=m.isBaseStatic;
if(typeof k=="undefined"){k="false"
}var s=m.select;
var l=null;
if(k=="true"){l=d("style[data-inline=true][data-type=inlineHeadStyle][data-static=true]")[0]
}if(l==null){l=d("style[data-inline=true][data-type=inlineThemeStyle]")[0]||d("style[data-inline=true][data-type=inlineHeadStyle][data-static=true]")[0]||d("style[data-inline=true][data-type=inlineHeadStyle][data-static=false]")[0]
}if(l==null){l=d("style[emptyrender=true]")[0]||d("style[data-inline=true][data-type=inlineCombineStyle]")[0]||d("style")[0]
}if(l==null){h.getElementsByTagName("head")[0].appendChild(v)
}else{B?d(l).before(v):d(v).insertAfter(l);
l=null
}f[A]={load:true};
if(z||!q){setTimeout(function(){y(v,o,0)
},1);
return
}if(q){v.onload=x;
v.onerror=function(){x()
}
}else{v.onreadystatechange=function(){if(/loaded|complete/.test(v.readyState)){x()
}}
}function x(){v.onload=v.onerror=v.onreadystatechange=null;
if(r){v.rel="stylesheet";
v.setAttribute("data-loadcss",true)
}v=null;
o()
}function y(G,H,F){var E=G.sheet,C;
F+=1;
if(F>protectNum){C=true;
G=null;
H();
return
}if(z){if(E){C=true
}}else{if(E){try{if(E.cssRules){C=true
}}catch(D){if(D.name==="NS_ERROR_DOM_SECURITY_ERR"){C=true
}}}}setTimeout(function(){if(C){H()
}else{y(G,H,F)
}},20)
}}function a(k){var l=c(k);
return l.href.replace(l.protocol+"//"+l.host,"")
}function c(k){var l=h.createElement("div"),m=k.split("&").join("&amp;").split("<").join("&lt;").split('"').join("&quot;");
l.innerHTML='<a href="'+m+'">x</a>';
var n=l.firstChild;
return{href:n.href,href:n.href,hostname:n.hostname,host:n.host,protocol:n.protocol}
}function j(){var k=d("script[type=text\\/preload-style]");
if(!!!k.length){return
}k.each(function(){var n=d(this);
var l={};
var m=preloadCSS.relpreload.supportPreload;
l.select=n;
l.isReplace=true;
l.preload=m;
l.url=n.attr("href");
l.callback=function(){};
e.loadCss(l)
})
}d.extend(e,{loadCss:i,loadHackStyle:j});
g.LABHelper=e
})(jQuery,window,document)
}(function(h,k,p,i){var e=function(t){if(!!k.__datalazyload__debug__){console&&console.log&&console.log(t)
}};
var g=k.LABHelper,f=k.requestAnimationFrame;
var n=g.mobileLazyload||{};
var b={decodeHTML:function(t){if(!!!t){return t
}t=t.replace(/&lt;\/template&gt\;/ig,"</template>");
t=t.replace(/&lt;template([^>]*?)&gt\;/ig,"<template$1>");
return t
},parseJson:function(u){u=h.trim(u);
try{u=h.parseJSON(u)
}catch(t){u=""
}return u
}};
var r={init:function(){var t=h("div[data-type=outerContainer][data-type-ext=module_outerContainer][moduleid]");
if(!!!t.length){return
}t.each(function(){var u=h(this);
r.load(u)
})
},load:function(u){if(!!!u.length){return
}var x=u.attr("moduleId");
e("siteModuleDatalazyload moduleId::"+x);
var y=h("script[type=text\\/x-delay-script][data-jsLazyload=true][data-moduleId="+x+"]"),w="";
if(!!y.length){w=y.html()
}var z=function(){f(function(){h.globalEval(w)
})
};
var v=k.datalazyloadDefaultOptions;
if(typeof v!="undefined"&&(v.isPcOptViewer==="true")){var t=setInterval(function(){if(!!!u.find("div.PDataLazyLoad_Module[data-lazyload-type]").length){clearInterval(t);
e("siteModuleDatalazyload delay callback! moduleId:: "+x);
z()
}},1000);
return
}e("siteModuleDatalazyload callback! moduleId:: "+x);
z()
}};
h.extend(n,{initSiteModule:r.init});
var a=[];
var d={};
h.extend(n,{getDelayIds:function(){var v=h("script[type=text\\/x-delay-ids][data-type=delayIds][data-device=pc]");
if(!!!v.length){return
}var u=b.parseJson(v.attr("data-delayIds"));
if(!!!u||!h.isArray(u)){return
}try{u=l(u)
}catch(t){}a=u
},getMobileHideIds:function(){var u=h("script[type=text\\/x-mobile-hidden-ids][data-ids]");
if(!!!u.length){return
}var t=b.parseJson(u.attr("data-ids"));
if(!!!t||!h.isArray(t)){return
}__pDatalazyload__mobileHeadHideIds=t
}});
function l(u){var w=[];
if(!h.isArray(u)){return w
}for(var v=0,t=u.length;
v<t;
v++){var x=u[v];
if(h.inArray(x,w)==-1){w.push(x)
}}return w
}h.extend(n,{loadAboveTheFold:function(){if(!!!a.length){return
}e("loadAboveTheFold::"+a);
h.each(a,function(t,u){f(function(){var x=h("#component-initial-setting-wrap-"+u+"[data-initial=true]");
if(!!x.length){var w=h("div.PDataLazyLoad_Module[data-lazyload-type][data-settingId="+u+"]");
n.loadAboveTheFoldInitModule(w,x,u);
return
}var v=h("div.PDataLazyLoad_Module[data-lazyload-type][data-lazyload-type=dynamic][data-settingId="+u+"]");
if(!!v.length){n.loadDynamicModule(v,u);
return
}var y=h("script[type=text\\/x-delay-script][data-jsLazyload=true][data-id="+u+"]");
if(!!!y.length){return
}n.loadAboveTheFoldModule(y,u)
})
});
setTimeout(function(){h("style[data-type=aboveTheFoldHeight]").remove();
h("body").css({"padding-top":h(".header-item").height()+"px"})
},6000)
},getHeights:function(){h('div[data-type="siteblocks"], div[data-type="outerContainer"]').each(function(){if(!n.seeDom(this)){return false
}var t=h(this).find("div.PDataLazyLoad_Module[data-lazyload-type][data-settingId]");
t.each(function(){var u=h(this),v=u.attr("data-settingId");
if(h.inArray(v,a)>-1){e("getHeights outerContainer! skip:: "+v);
return false
}u.data("preLoadBelowTheFold",true);
n.loadModule(u,false);
e("getHeights outerContainer! settingId:: "+v)
})
})
},seeDom:function(x){var w=h(x);
var t=h(k).height();
var u=w.offset().top;
var v=w.height();
if(u<t&&u+v>0){return true
}else{return false
}},loadAboveTheFoldModule:function(u,t){u.each(function(x,w){var v=h(w);
n.loadCss(t,v.attr("data-cssdepand"));
var y=function(){h.globalEval(v.html())
};
var z=function(){f(function(){y();
h(k).triggerHandler("scroll."+t);
h(k).triggerHandler("fullPageReBuild")
})
};
n.loadJs(t,t,v.attr("data-jsdepand"),z)
})
},loadAboveTheFoldInitModule:function(u,v,w){if(!!!u.length){v.remove();
return
}var t=v.attr("data-initialtime")||"0";
setTimeout(function(){v.remove();
n.loadModule(u,true)
},5000)
},loadDynamicModule:function(w,x){var v=w,u=w.data("uuid");
var t=w.find("template[data-lazyload-template=true][data-settingId="+x+"][data-uuid="+u+"]");
if(!!!t.length){return
}if(v.data("dynamic-js-lazyload")==true){f(function(){var z=t.html();
var y=b.decodeHTML(z);
v.replaceWith(y);
h(k).triggerHandler("scroll."+x);
h(k).triggerHandler("fullPageReBuild")
})
}}});
var o=["scroll","resize"];
var m="pDataLazyload";
var s=true;
var c=null;
h.extend(n,{loadBelowTheFold:function(){e("bigRenderDatalazyload loadBelowTheFold! ");
h.each(o,function(w,u){var t=u+"."+m;
h(k).unbind(t).bind(t,n.check)
})
},triggerLoadBelowTheFold:function(t){var v=false;
setTimeout(function(){e("bigRenderDatalazyload triggerLoadBelowTheFold!");
h(k).trigger("scroll.pDataLazyload");
v=true
},t);
var u=0;
c=setInterval(function(){if(!v){return
}h(k).trigger("scroll.pDataLazyload");
u++;
e("bigRenderDatalazyload autoTriggerLoadBelowTheFold! "+u);
if(u>=10){clearInterval(c)
}},10000)
},unbind:function(){h.each(o,function(w,u){var t=u+"."+m;
h(k).unbind(t,n.check);
e("bigRenderDatalazyload checkInviewport unbind!")
})
},check:function(){f(function(){if(!s){return
}s=false;
setTimeout(function(){f(function(){s=true;
n.checkInviewport()
})
},100)
})
},checkInviewport:function(){e("bigRenderDatalazyload checkInviewport!");
var t=h("div.PDataLazyLoad_Module[data-lazyload-type][data-settingId]");
if(!!!t.length){n.unbind();
return
}t.each(function(){var u=h(this);
f(function(){n.loadModule(u,false)
})
})
}});
function j(u,t){var v={threshold:"5",container:k};
var w=false;
if(!!u.parents("#backstage-bodyArea").length&&u.data("lazyload-force-inviewport")==="true"){w=true;
e("bigRenderDatalazyload fullPage isInviewport. "+t)
}else{if(u.data("lazyload-alias")=="onlineService"||!!u.data("direct-render")){w=true;
e("bigRenderDatalazyload directRender isInviewport. "+t)
}else{if(!!u.data("preLoadBelowTheFold")){w=true;
e("bigRenderDatalazyload preLoadBelowTheFold isInviewport. "+t)
}else{w=g.isElementInViewport(u,v)
}}}return w
}h.extend(n,{loadModule:function(x,z){var w=x,v=w.data("lazyload-uuid"),A=w.data("settingid");
if(!!w.data("_bigRender_loading")||!!w.data("_bigRender_loaded")){e("bigRenderDatalazyload loading or loaded. "+v);
return
}if(!z&&w.attr("data-isAboveTheFold")=="true"){e("bigRenderDatalazyload isAboveTheFold waitting. "+v);
return
}var y=h("#component-initial-setting-wrap-"+A+"[data-initial=true]");
if(y.length){e("bigRenderDatalazyload isAboveTheFold waitting initial. "+v);
return
}var t=w.data("uuid");
if(w.data("lazyload-from")!=="template"||!!!t){return
}if(!j(w,v)){e("bigRenderDatalazyload is not inviewport. "+v);
return
}var u=w.find("template[data-lazyload-template=true][data-settingId="+A+"][data-uuid="+t+"]");
if(!!!u.length){e("bigRenderDatalazyload template is not find. "+v);
return
}w.data("_bigRender_loading",true);
if(w.data("dynamic-js-lazyload")==true){f(function(){n.insertScript(w,A,v,u.html());
f(function(){h(k).triggerHandler("scroll."+A);
h(k).triggerHandler("fullPageReBuild")
})
});
return
}f(function(){n.insertTxt(w,A,v,u.html());
var B=h("script[type=text\\/x-delay-script][data-jsLazyload=true][data-id="+A+"]");
f(function(){B.each(function(F,E){var D={};
var C=h(E);
if(!!C.length){D.js_depand=C.attr("data-jsdepand");
D.css_depand=C.attr("data-cssdepand");
D._func_=C.html()
}n.loadCss(v,D.css_depand);
var G=typeof D._func_!="undefined"?function(){h.globalEval(D._func_)
}:function(){};
callback=function(){f(function(){G()
})
};
n.loadJs(v,A,D.js_depand,callback)
})
});
if(!!!h("body").data("isLoadUnAboveTheFold")&&!z){e("isLoadUnAboveTheFold "+v);
h("body").data("isLoadUnAboveTheFold",true);
setTimeout(function(){h("style[data-type=unAboveTheFoldHeight]").remove()
},3000)
}})
}});
h.extend(n,{loadCss:function(t,u){u=b.parseJson(u);
if(!!!u||!h.isArray(u)){return
}e(t+", css_depand::"+u);
h.each(u,function(y,w){var x={};
var z=preloadCSS.relpreload.supportPreload;
x.preload=z;
x.url=w;
x.callback=function(){};
g.loadCss(x)
})
},loadJs:function(u,x,t,y){var v=function(){h(k).triggerHandler("scroll."+x);
h(k).triggerHandler("fullPageReBuild");
try{if(phoenixSite&&phoenixSite.bindColorBox){phoenixSite.bindColorBox(phoenixSite)
}}catch(z){console.log(z)
}try{if(deleteStyleInline&&typeof deleteStyleInline=="function"){deleteStyleInline()
}}catch(z){}try{if(loadTemplateImgBySettingId&&typeof loadTemplateImgBySettingId=="function"){loadTemplateImgBySettingId(x)
}}catch(z){}};
t=b.parseJson(t);
if(!!!t||!h.isArray(t)){e("js_depand empty callback "+u);
y();
v();
return
}e(u+", js_depand::"+t);
var w={AlwaysPreserveOrder:true};
$LAB.setOptions(w).script(t).wait(function(){e("callback "+u);
y();
v()
})
}});
h.extend(n,{insertTxt:function(u,x,t,w,y){y=(typeof y=="undefined")?false:y;
u.data("_bigRender_loaded",true);
var v=b.decodeHTML(w);
u.replaceWith(v);
e("bigRenderDatalazyload "+(y?"insertScript":"insertTxt")+"! "+t);
u.removeClass("dataLazyloadLoding");
setTimeout(function(){n.triggerEvent(x)
},500)
},insertScript:function(u,w,t,v){n.insertTxt(u,w,t,v,true)
},triggerEvent:function(t){h(p).triggerHandler("dataLazyload-"+t);
e("bigRenderDatalazyload triggerEvent! "+t)
}});
function q(){var t=h("script[type=text\\/x-async-script][data-type=x-async]");
if(!!!t.length){return
}t.each(function(){var v=h(this);
var x=v.data("until")||"onload";
var w=v.data("time")||0;
var u=function(){e("delayAsyncScript::"+x+"::"+w);
h.globalEval(v.html())
};
if(x=="ready"){f(function(){setTimeout(u,w)
});
return
}onloadHack(function(){f(function(){setTimeout(u,w)
})
})
})
}h(function(){q()
});
k.mobileLazyload=n
})(jQuery,window,document);