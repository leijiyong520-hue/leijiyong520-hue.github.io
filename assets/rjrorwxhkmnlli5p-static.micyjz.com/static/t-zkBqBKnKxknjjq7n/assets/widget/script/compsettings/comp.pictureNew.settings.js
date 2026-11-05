(function(h,e,f){var s=h.phoenixSite.phoenixCompSettings||(h.phoenixSite.phoenixCompSettings={});
var v="pictureNew";
var a=s[v]||(s[v]={});
a.version="1.0.0";
e.extend(a,{pictureLoadEffect:function(C,D,x,w,y){var z={},B,A;
if(typeof y=="unfefined"){y={}
}z.settingId=C;
z.widgetClass=D;
z.picLoadEffectValue=e.trim(x);
z.picHoverEffectValue=e.trim(w);
z=e.extend(true,z,y);
B=e("#picture-wrap-"+C);
A=B.find("img").eq(0);
if(!A.length){return
}z.pictureWrap=B;
z.supportAnimation=(B.css("animation")!="undefined");
z=e.extend(true,z,y);
A.phoenixPic(z)
}});
var c={threshold:0};
var g={threshold:150};
var p=0,q=-1,o=-1;
p=k(h.navigator.userAgent);
q=n(p);
o=r();
function u(w){return w||"javascript:void(0)"
}function r(){var w=e(h).width();
var x=-1;
if(w<1024&&w>=768){x=961
}else{if(w<768){x=0
}}return x
}function d(z,x){if(o==-1){x={}
}if(typeof x=="undefined"){x={}
}var y=x[o];
if(e.isEmptyObject(y)){var w=z.attr("phoenix-lazyload");
if(!!w){z.attr("src",u(w))
}return z
}z.attr("title",y.title||"");
z.attr("alt",y.alt||"");
y.picLink||z.parent("a").removeAttr("href");
if(!!!y.src){var w=z.attr("phoenix-lazyload");
if(!!w){z.attr("src",u(w))
}return z
}z.attr("src",u(y.src));
return z
}function k(A){var B=false,w=false,y=false,x=false,z=0;
y=/.*AppleWebKit.*Mobile.*/ig.test(A)||/.AppleWebKit/ig.test(A);
B=A.indexOf("iPad")>-1;
x=A.indexOf("iPhone")>-1;
w=A.indexOf("Android")>-1||A.indexOf("Linux")>-1;
if(B){z=1024
}else{if(w){if(y){z=420
}else{z=1024
}}else{if(x&&y){z=420
}else{z=-1
}}}return z
}function n(w){var x=-1;
if(w>961){x=961
}else{if(w>0){x=0
}}return x
}var b="phoenixPic",l=["scroll","resize"],j="pAnim",t="pApear";
function m(y,x){this.el=y;
var w=(x.container===f||x.container===h)?h:x.container;
x.container=w;
x.isFullPage=x.isFullPage===f?false:x.isFullPage;
this.opts=e.extend({events:l},x);
this._lazyLoad()
}var i=m.prototype;
i._lazyLoad=function(){var A=this,y=this.el,w=this.opts,D,H,x,F,C,G;
D=w.supportAnimation;
H=w.events;
G=x=w.container;
F=w.settingId;
C=w.isFullPage;
if(C){G=h
}var B=null;
e(h).on("resize",function(){if(B){clearTimeout(B)
}B=setTimeout(function(){o=r();
d(y,w)
},500)
});
e.each(H,function(K,J){var I=J+"."+F;
e(x).unbind(I).bind(I,function(){E()
})
});
this._onPreApear()._onAnim();
function E(){var J,I;
J=e.inviewport(y,e.extend({},c,{container:G}));
I=e.inviewport(y,e.extend({},g,{container:G}));
if(!D||(!!!w.picLoadEffectValue&&!!!w.picHoverEffectValue)){if(J||I){y.trigger(t);
A._animEnd()
}}else{if(J){y.trigger(j)
}if(I){y.trigger(t)
}}}E();
if(!!y.attr("src")&&y.attr("src").substr(-3,3)==="svg"){if(!!y.css("width")||y.css("width")=="0px"){var z=new Image();
z.src=y.attr("src");
if(z.complete){y.css("width",z.width+"px")
}else{z.onload=function(){y.css("width",z.width+"px")
}
}}}return this
};
i._onPreApear=function(){var w=this.el,x=this.opts,y,z;
y=x.settingId;
z="load."+y;
w.one(t,function(){if(!this.loaded){d(w,x).unbind(z).bind(z,function(){this.loaded=true;
e(this).css("visibility","visible")
});
return
}e(this).css("visibility","visible")
});
return this
};
i._onAnim=function(){var z=this,x=this.el,y=this.opts,B,A,w,C;
if(!y.supportAnimation){return this
}B=y.settingId;
A="load.anim-"+B;
x.one(j,function(){if(!this.loaded){d(x,y).unbind(A).bind(A,function(){this.loaded=true;
e(this).css("visibility","visible");
z._doAnim()
});
return
}e(this).css("visibility","visible");
z._doAnim()
});
w=y.picHoverEffectValue;
C="mouseenter."+B;
!!w&&y.pictureWrap.unbind(C).bind(C,function(){e(this).addClass(w)
});
return this
};
i._doAnim=function(){var w=this.el,x=this.opts,y;
if(!x.supportAnimation||w.data("imgAnimationed")){this._animEnd();
return this
}w.addClass(x.picLoadEffectValue).data("imgAnimationed",true);
y=x.pictureWrap;
y.on("webkitAnimationStart mozAnimationStart MSAnimationStart oanimationstart animationstart",function(){w.css("visibility","visible")
}).on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){e(this).removeClass("animated bounceInDown bounceInLeft bounceInRight bounceInUp fadeInDownBig fadeInLeftBig fadeInRightBig fadeInUpBig zoomInDown zoomInLeft zoomInRight zoomInUp")
}).on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){e(this).removeClass("animated bounce zoomIn pulse rotateIn swing fadeIn")
});
w.on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){e(this).removeClass("animated bounceInDown bounceInLeft bounceInRight bounceInUp fadeInDownBig fadeInLeftBig fadeInRightBig fadeInUpBig zoomInDown zoomInLeft zoomInRight zoomInUp");
e(this).removeClass("animated bounce zoomIn pulse rotateIn swing fadeIn")
});
this._animEnd();
return this
};
i._animEnd=function(){var y=this.el,z=this.opts,w=z.container,x=z.events,A=z.settingId;
e.each(x,function(D,C){var B=C+"."+A;
e(w).unbind(B)
});
return this
};
i._update=function(){this._lazyLoad();
return this
};
i._unbind=function(){var y=this.el,z=this.opts,w=z.container,x=z.events,A=z.settingId;
e.each(x,function(D,C){var B=C+"."+A;
e(w).unbind(B)
});
return this
};
e.fn.phoenixPic=function(w){return this.each(function(){var x=e(this);
var y=x.data(b);
if(x.data(b)){y._unbind();
y.opts=e.extend(y.opts,w);
y._update()
}else{x.data(b,new m(x,w))
}})
}
})(this,jQuery,void 0);