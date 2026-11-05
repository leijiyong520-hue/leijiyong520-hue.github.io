/*! lg-zoom - v1.1.0 - 2017-08-08
* http://sachinchoolur.github.io/lightGallery
* Copyright (c) 2017 Sachin N; Licensed GPLv3 */
(function(a,b){if(typeof define==="function"&&define.amd){define(["$"],function(c){return(b(c))
})
}else{if(typeof exports==="object"){module.exports=b(require("$"))
}else{b($)
}}}(this,function(a){(function(){var c=function(){var e=false;
var f=navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
if(f&&parseInt(f[2],10)<54){e=true
}return e
};
var d={scale:1,zoom:true,actualSize:true,enableZoomAfter:300,useLeftForZoom:c()};
var b=function(e){this.core=a(e).data("lightGallery");
this.core.s=a.extend({},d,this.core.s);
if(this.core.s.zoom&&this.core.doCss()){this.init();
this.zoomabletimeout=false;
this.pageX=a(window).width()/2;
this.pageY=(a(window).height()/2)+a(window).scrollTop()
}return this
};
b.prototype.init=function(){var k=this;
var f='<span id="lg-zoom-in" class="lg-icon"></span><span id="lg-zoom-out" class="lg-icon"></span>';
if(k.core.s.actualSize){f+='<span id="lg-actual-size" class="lg-icon"></span>'
}if(k.core.s.useLeftForZoom){k.core.$outer.addClass("lg-use-left-for-zoom")
}else{k.core.$outer.addClass("lg-use-transition-for-zoom")
}this.core.$outer.find(".lg-toolbar").append(f);
k.core.$el.on("onSlideItemLoad.lg.tm.zoom",function(o,n,m){var l=k.core.s.enableZoomAfter+m;
if(a("body").hasClass("lg-from-hash")&&m){l=0
}else{a("body").removeClass("lg-from-hash")
}k.zoomabletimeout=setTimeout(function(){k.core.$slide.eq(n).addClass("lg-zoomable")
},l+30)
});
var j=1;
var i=function(q){var p=k.core.$outer.find(".lg-current .lg-image");
var o;
var n;
var m=(a(window).width()-p.prop("offsetWidth"))/2;
var s=((a(window).height()-p.prop("offsetHeight"))/2)+a(window).scrollTop();
o=k.pageX-m;
n=k.pageY-s;
var l=(q-1)*(o);
var r=(q-1)*(n);
p.css("transform","scale3d("+q+", "+q+", 1)").attr("data-scale",q);
if(k.core.s.useLeftForZoom){p.parent().css({left:-l+"px",top:-r+"px"}).attr("data-x",l).attr("data-y",r)
}else{p.parent().css("transform","translate3d(-"+l+"px, -"+r+"px, 0)").attr("data-x",l).attr("data-y",r)
}};
var e=function(){if(j>1){k.core.$outer.addClass("lg-zoomed")
}else{k.resetZoom()
}if(j<1){j=1
}i(j)
};
var h=function(r,p,n,q){var m=p.prop("offsetWidth");
var l;
if(k.core.s.dynamic){l=k.core.s.dynamicEl[n].width||p[0].naturalWidth||m
}else{l=k.core.$items.eq(n).attr("data-width")||p[0].naturalWidth||m
}var o;
if(k.core.$outer.hasClass("lg-zoomed")){j=1
}else{if(l>m){o=l/m;
j=o||2
}}if(q){k.pageX=a(window).width()/2;
k.pageY=(a(window).height()/2)+a(window).scrollTop()
}else{k.pageX=r.pageX||r.originalEvent.targetTouches[0].pageX;
k.pageY=r.pageY||r.originalEvent.targetTouches[0].pageY
}e();
setTimeout(function(){k.core.$outer.removeClass("lg-grabbing").addClass("lg-grab")
},10)
};
var g=false;
k.core.$el.on("onAferAppendSlide.lg.tm.zoom",function(n,l){var m=k.core.$slide.eq(l).find(".lg-image");
m.on("dblclick",function(o){h(o,m,l)
});
m.on("touchstart",function(o){if(!g){g=setTimeout(function(){g=null
},300)
}else{clearTimeout(g);
g=null;
h(o,m,l)
}o.preventDefault()
})
});
a(window).on("resize.lg.zoom scroll.lg.zoom orientationchange.lg.zoom",function(){k.pageX=a(window).width()/2;
k.pageY=(a(window).height()/2)+a(window).scrollTop();
i(j)
});
a("#lg-zoom-out").on("click.lg",function(){if(k.core.$outer.find(".lg-current .lg-image").length){j-=k.core.s.scale;
e()
}});
a("#lg-zoom-in").on("click.lg",function(){if(k.core.$outer.find(".lg-current .lg-image").length){j+=k.core.s.scale;
e()
}});
a("#lg-actual-size").on("click.lg",function(l){h(l,k.core.$slide.eq(k.core.index).find(".lg-image"),k.core.index,true)
});
k.core.$el.on("onBeforeSlide.lg.tm",function(){j=1;
k.resetZoom()
});
k.zoomDrag();
k.zoomSwipe()
};
b.prototype.resetZoom=function(){this.core.$outer.removeClass("lg-zoomed");
this.core.$slide.find(".lg-img-wrap").removeAttr("style data-x data-y");
this.core.$slide.find(".lg-image").removeAttr("style data-scale");
this.pageX=a(window).width()/2;
this.pageY=(a(window).height()/2)+a(window).scrollTop()
};
b.prototype.zoomSwipe=function(){var j=this;
var h={};
var f={};
var g=false;
var e=false;
var i=false;
j.core.$slide.on("touchstart.lg",function(l){if(j.core.$outer.hasClass("lg-zoomed")){var k=j.core.$slide.eq(j.core.index).find(".lg-object");
i=k.prop("offsetHeight")*k.attr("data-scale")>j.core.$outer.find(".lg").height();
e=k.prop("offsetWidth")*k.attr("data-scale")>j.core.$outer.find(".lg").width();
if((e||i)){l.preventDefault();
h={x:l.originalEvent.targetTouches[0].pageX,y:l.originalEvent.targetTouches[0].pageY}
}}});
j.core.$slide.on("touchmove.lg",function(n){if(j.core.$outer.hasClass("lg-zoomed")){var k=j.core.$slide.eq(j.core.index).find(".lg-img-wrap");
var m;
var l;
n.preventDefault();
g=true;
f={x:n.originalEvent.targetTouches[0].pageX,y:n.originalEvent.targetTouches[0].pageY};
j.core.$outer.addClass("lg-zoom-dragging");
if(i){l=(-Math.abs(k.attr("data-y")))+(f.y-h.y)
}else{l=-Math.abs(k.attr("data-y"))
}if(e){m=(-Math.abs(k.attr("data-x")))+(f.x-h.x)
}else{m=-Math.abs(k.attr("data-x"))
}if((Math.abs(f.x-h.x)>15)||(Math.abs(f.y-h.y)>15)){if(j.core.s.useLeftForZoom){k.css({left:m+"px",top:l+"px"})
}else{k.css("transform","translate3d("+m+"px, "+l+"px, 0)")
}}}});
j.core.$slide.on("touchend.lg",function(){if(j.core.$outer.hasClass("lg-zoomed")){if(g){g=false;
j.core.$outer.removeClass("lg-zoom-dragging");
j.touchendZoom(h,f,e,i)
}}})
};
b.prototype.zoomDrag=function(){var k=this;
var i={};
var g={};
var f=false;
var h=false;
var e=false;
var j=false;
k.core.$slide.on("mousedown.lg.zoom",function(m){var l=k.core.$slide.eq(k.core.index).find(".lg-object");
j=l.prop("offsetHeight")*l.attr("data-scale")>k.core.$outer.find(".lg").height();
e=l.prop("offsetWidth")*l.attr("data-scale")>k.core.$outer.find(".lg").width();
if(k.core.$outer.hasClass("lg-zoomed")){if(a(m.target).hasClass("lg-object")&&(e||j)){m.preventDefault();
i={x:m.pageX,y:m.pageY};
f=true;
k.core.$outer.scrollLeft+=1;
k.core.$outer.scrollLeft-=1;
k.core.$outer.removeClass("lg-grab").addClass("lg-grabbing")
}}});
a(window).on("mousemove.lg.zoom",function(o){if(f){var l=k.core.$slide.eq(k.core.index).find(".lg-img-wrap");
var n;
var m;
h=true;
g={x:o.pageX,y:o.pageY};
k.core.$outer.addClass("lg-zoom-dragging");
if(j){m=(-Math.abs(l.attr("data-y")))+(g.y-i.y)
}else{m=-Math.abs(l.attr("data-y"))
}if(e){n=(-Math.abs(l.attr("data-x")))+(g.x-i.x)
}else{n=-Math.abs(l.attr("data-x"))
}if(k.core.s.useLeftForZoom){l.css({left:n+"px",top:m+"px"})
}else{l.css("transform","translate3d("+n+"px, "+m+"px, 0)")
}}});
a(window).on("mouseup.lg.zoom",function(l){if(f){f=false;
k.core.$outer.removeClass("lg-zoom-dragging");
if(h&&((i.x!==g.x)||(i.y!==g.y))){g={x:l.pageX,y:l.pageY};
k.touchendZoom(i,g,e,j)
}h=false
}k.core.$outer.removeClass("lg-grabbing").addClass("lg-grab")
})
};
b.prototype.touchendZoom=function(o,h,i,g){var n=this;
var j=n.core.$slide.eq(n.core.index).find(".lg-img-wrap");
var l=n.core.$slide.eq(n.core.index).find(".lg-object");
var q=(-Math.abs(j.attr("data-x")))+(h.x-o.x);
var p=(-Math.abs(j.attr("data-y")))+(h.y-o.y);
var k=(n.core.$outer.find(".lg").height()-l.prop("offsetHeight"))/2;
var e=Math.abs((l.prop("offsetHeight")*Math.abs(l.attr("data-scale")))-n.core.$outer.find(".lg").height()+k);
var m=(n.core.$outer.find(".lg").width()-l.prop("offsetWidth"))/2;
var f=Math.abs((l.prop("offsetWidth")*Math.abs(l.attr("data-scale")))-n.core.$outer.find(".lg").width()+m);
if((Math.abs(h.x-o.x)>15)||(Math.abs(h.y-o.y)>15)){if(g){if(p<=-e){p=-e
}else{if(p>=-k){p=-k
}}}if(i){if(q<=-f){q=-f
}else{if(q>=-m){q=-m
}}}if(g){j.attr("data-y",Math.abs(p))
}else{p=-Math.abs(j.attr("data-y"))
}if(i){j.attr("data-x",Math.abs(q))
}else{q=-Math.abs(j.attr("data-x"))
}if(n.core.s.useLeftForZoom){j.css({left:q+"px",top:p+"px"})
}else{j.css("transform","translate3d("+q+"px, "+p+"px, 0)")
}}};
b.prototype.destroy=function(){var e=this;
e.core.$el.off(".lg.zoom");
a(window).off(".lg.zoom");
e.core.$slide.off(".lg.zoom");
e.core.$el.off(".lg.tm.zoom");
e.resetZoom();
clearTimeout(e.zoomabletimeout);
e.zoomabletimeout=false
};
a.fn.lightGallery.modules.zoom=b
})()
}));