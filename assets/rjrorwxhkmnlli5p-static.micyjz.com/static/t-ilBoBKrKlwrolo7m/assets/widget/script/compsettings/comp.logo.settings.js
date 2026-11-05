(function(h,e,f){var q=h.phoenixSite.phoenixCompSettings||(h.phoenixSite.phoenixCompSettings={});
var t="logo";
var d=q[t]||(q[t]={});
d.version="1.0.0";
e.extend(d,{logoLoadEffect:function(A,B,v,u,w){var x={},z,y;
if(typeof w=="unfefined"){w={}
}x.settingId=A;
x.widgetClass=B;
x.picLoadEffectValue=e.trim(v);
x.picHoverEffectValue=e.trim(u);
x=e.extend(true,x,w);
z=e("#picture-wrap-"+A);
y=z.find("img");
if(!y.length){return
}x.pictureWrap=z;
x.supportAnimation=(z.css("animation")!="undefined");
x=e.extend(true,x,w);
y.phoenixLogo(x)
}});
var b={threshold:0};
var g={threshold:150};
var o=0,p=-1;
o=k(h.navigator.userAgent);
p=m(o);
function s(u){return u||"javascript:void(0)"
}function c(x,v){if(p==-1){v={}
}if(typeof v=="undefined"){v={}
}var w=v[p];
if(e.isEmptyObject(w)){var u=x.attr("phoenix-lazyload");
if(!!u){x.attr("src",s(u))
}return x
}x.attr("title",w.title||"");
x.attr("alt",w.alt||"");
w.picLink||x.parent("a").removeAttr("href");
if(!!!w.src){var u=x.attr("phoenix-lazyload");
if(!!u){x.attr("src",s(u))
}return x
}x.attr("phoenix-lazyload",s(w.src));
x.attr("src",s(w.src));
return x
}function k(y){var z=false,u=false,w=false,v=false,x=0;
w=/.*AppleWebKit.*Mobile.*/ig.test(y)||/.AppleWebKit/ig.test(y);
z=y.indexOf("iPad")>-1||e(h).width()===1024;
v=y.indexOf("iPhone")>-1;
u=y.indexOf("Android")>-1||y.indexOf("Linux")>-1;
if(z){x=1024
}else{if(u){if(w){x=420
}else{x=1024
}}else{if(v&&w){x=420
}else{x=-1
}}}return x
}function m(u){var v=-1;
if(u>961){v=961
}else{if(u>0){v=0
}}return v
}var a="phoenixLogo",l=["scroll","resize"],j="pAnim",r="pApear";
function n(w,v){this.el=w;
var u=(v.container===f||v.container===h)?h:v.container;
v.container=u;
v.isFullPage=v.isFullPage===f?false:v.isFullPage;
this.opts=e.extend({events:l},v);
this._lazyLoad()
}var i=n.prototype;
i._lazyLoad=function(){var y=this,w=this.el,u=this.opts,A,E,v,C,z,D;
A=u.supportAnimation;
E=u.events;
D=v=u.container;
C=u.settingId;
z=u.isFullPage;
if(z){D=h
}e.each(E,function(H,G){var F=G+"."+C;
e(v).unbind(F).bind(F,function(){B()
})
});
this._onPreApear()._onAnim();
function B(){var G,F;
G=e.inviewport(w,e.extend({},b,{container:D}));
F=e.inviewport(w,e.extend({},g,{container:D}));
if(!A||(!!!u.picLoadEffectValue&&!!!u.picHoverEffectValue)){if(G||F){w.trigger(r);
y._animEnd()
}}else{if(G){w.trigger(j)
}if(F){w.trigger(r)
}}}B();
if(!!w.attr("src")&&w.attr("src").substr(-3,3)==="svg"){if(!!w.css("width")||w.css("width")=="0px"){var x=new Image();
x.src=w.attr("src");
if(x.complete){w.css("width",x.width+"px")
}else{x.onload=function(){w.css("width",x.width+"px")
}
}}}return this
};
i._onPreApear=function(){var u=this.el,v=this.opts,w,x;
w=v.settingId;
x="load."+w;
u.one(r,function(){if(!this.loaded){c(u,v).unbind(x).bind(x,function(){this.loaded=true;
e(this).css("visibility","visible")
});
return
}e(this).css("visibility","visible")
});
return this
};
i._onAnim=function(){var x=this,v=this.el,w=this.opts,z,y,u,A;
if(!w.supportAnimation){return this
}z=w.settingId;
y="load.anim-"+z;
v.one(j,function(){if(!this.loaded){c(v,w).unbind(y).bind(y,function(){this.loaded=true;
e(this).css("visibility","visible");
x._doAnim()
});
return
}e(this).css("visibility","visible");
x._doAnim()
});
u=w.picHoverEffectValue;
A="mouseenter."+z;
!!u&&w.pictureWrap.unbind(A).bind(A,function(){e(this).addClass(u)
});
return this
};
i._doAnim=function(){var u=this.el,v=this.opts,w;
if(!v.supportAnimation||u.data("imgAnimationed")){this._animEnd();
return this
}u.addClass(v.picLoadEffectValue).data("imgAnimationed",true);
w=v.pictureWrap;
w.on("webkitAnimationStart mozAnimationStart MSAnimationStart oanimationstart animationstart",function(){u.css("visibility","visible")
}).on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){e(this).removeClass("animated bounceInDown bounceInLeft bounceInRight bounceInUp fadeInDownBig fadeInLeftBig fadeInRightBig fadeInUpBig zoomInDown zoomInLeft zoomInRight zoomInUp")
}).on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){e(this).removeClass("animated bounce zoomIn pulse rotateIn swing fadeIn")
});
u.on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){e(this).removeClass("animated bounceInDown bounceInLeft bounceInRight bounceInUp fadeInDownBig fadeInLeftBig fadeInRightBig fadeInUpBig zoomInDown zoomInLeft zoomInRight zoomInUp");
e(this).removeClass("animated bounce zoomIn pulse rotateIn swing fadeIn")
});
this._animEnd();
return this
};
i._animEnd=function(){var w=this.el,x=this.opts,u=x.container,v=x.events,y=x.settingId;
e.each(v,function(B,A){var z=A+"."+y;
e(u).unbind(z)
});
return this
};
i._update=function(){this._lazyLoad();
return this
};
i._unbind=function(){var w=this.el,x=this.opts,u=x.container,v=x.events,y=x.settingId;
e.each(v,function(B,A){var z=A+"."+y;
e(u).unbind(z)
});
return this
};
e.fn.phoenixLogo=function(u){return this.each(function(){var v=e(this);
var w=v.data(a);
if(v.data(a)){w._unbind();
w.opts=e.extend(w.opts,u);
w._update()
}else{v.data(a,new n(v,u))
}})
}
})(this,jQuery,void 0);