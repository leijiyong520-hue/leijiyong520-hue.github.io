(function(){function b(k,h){try{k.innerHTML=h||""
}catch(m){try{k.textContent=h||""
}catch(m){}return
}try{var e=k.querySelectorAll?k.querySelectorAll("script"):[];
for(var g=0;
g<e.length;
g++){var d=e[g];
var n=document.createElement("script");
try{for(var f=0;
f<(d.attributes?d.attributes.length:0);
f++){var l=d.attributes[f];
try{n.setAttribute(l.name,l.value)
}catch(m){}}}catch(m){}try{n.text=d.text||d.textContent||""
}catch(m){}try{d.parentNode&&d.parentNode.replaceChild(n,d)
}catch(m){}}}catch(m){}}function c(){var j=document.querySelectorAll(".html-block[data-html]");
for(var g=0;
g<j.length;
g++){try{var h=j[g];
var f=h.getAttribute("data-html")||"";
var d=null;
try{if(h.shadowRoot){d=h.shadowRoot
}else{if(h.attachShadow){d=h.attachShadow({mode:"open"})
}}}catch(e){}b(d||h,f)
}catch(e){}}}try{if(document.readyState==="loading"){onloadHack(function(){c()
})
}else{c()
}}catch(a){try{c()
}catch(a){}}})();
(function(){function d(i,h){i.classList.add(h)
}function g(i,h){i.classList.remove(h)
}function f(j){var i=j.querySelector("nav");
if(!i){return false
}try{return window.getComputedStyle(i).display!=="none"
}catch(h){return false
}}function b(k){var h=k.querySelector(".ez-toc-toggle");
if(!h){return
}var i=f(k);
try{h.setAttribute("aria-expanded",String(i))
}catch(j){}}function e(i){if(!i||i.getAttribute("data-toc-runtime-bound")==="1"){return
}i.setAttribute("data-toc-runtime-bound","1");
var h=i.querySelector(".ez-toc-toggle");
if(!h){b(i);
return
}b(i);
h.addEventListener("click",function(l){try{l.preventDefault();
l.stopPropagation()
}catch(k){}var j=f(i);
g(i,"toc-is-expanded");
g(i,"toc-is-collapsed");
if(j){d(i,"toc-is-collapsed")
}else{d(i,"toc-is-expanded")
}b(i)
})
}function a(){var j=document.querySelectorAll(".contentEditRichText_editorContainer .table-of-contents");
for(var k=0;
k<j.length;
k++){try{e(j[k])
}catch(h){}}}try{if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",a)
}else{a()
}}catch(c){try{a()
}catch(c){}}})();
(function(){function b(){var e=document.querySelectorAll(".contentEditRichText_editorContainer .html-image-inner");
for(var f=0;
f<e.length;
f++){(function(h){var g=h.querySelector("img");
if(!g){h.className=h.className.replace(/\bmedia-loading\b/g,"").trim();
h.className+=" media-error";
return
}if(g.complete){if(g.naturalWidth>0){h.className=h.className.replace(/\bmedia-loading\b/g,"").trim()
}else{h.className=h.className.replace(/\bmedia-loading\b/g,"").trim();
h.className+=" media-error"
}return
}g.addEventListener("load",function(){h.className=h.className.replace(/\bmedia-loading\b/g,"").trim()
});
g.addEventListener("error",function(){h.className=h.className.replace(/\bmedia-loading\b/g,"").trim();
h.className+=" media-error"
})
})(e[f])
}}function c(){var f=document.querySelectorAll(".contentEditRichText_editorContainer .html-video-inner");
for(var e=0;
e<f.length;
e++){(function(g){var j=g.querySelector("video");
var i=g.querySelector("iframe");
if(!j&&!i){g.className=g.className.replace(/\bmedia-loading\b/g,"").trim();
g.className+=" media-error";
return
}if(j){if(j.readyState>=2){g.className=g.className.replace(/\bmedia-loading\b/g,"").trim();
return
}j.addEventListener("loadeddata",function(){g.className=g.className.replace(/\bmedia-loading\b/g,"").trim()
});
j.addEventListener("canplay",function(){g.className=g.className.replace(/\bmedia-loading\b/g,"").trim()
});
j.addEventListener("error",function(){g.className=g.className.replace(/\bmedia-loading\b/g,"").trim();
g.className+=" media-error"
})
}if(i){var h=setTimeout(function(){if(g.className.indexOf("media-loading")>=0){g.className=g.className.replace(/\bmedia-loading\b/g,"").trim();
g.className+=" media-error"
}},15000);
i.addEventListener("load",function(){clearTimeout(h);
g.className=g.className.replace(/\bmedia-loading\b/g,"").trim()
});
i.addEventListener("error",function(){clearTimeout(h);
g.className=g.className.replace(/\bmedia-loading\b/g,"").trim();
g.className+=" media-error"
})
}})(f[e])
}}function d(){b();
c()
}try{if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",d)
}else{d()
}}catch(a){try{d()
}catch(a){}}})();