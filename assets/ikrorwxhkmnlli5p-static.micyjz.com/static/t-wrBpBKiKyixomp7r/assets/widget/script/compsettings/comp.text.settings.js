(function(c,d,f){var b=c.phoenixSite.phoenixCompSettings||(c.phoenixSite.phoenixCompSettings={});
var a="text";
var e=b[a]||(b[a]={});
d.extend(e,{textAnimateControl:function(l,k){if(d(l+" .sitewidget-bd").css("animation")==f){}else{if(k==""){}else{d(l+" .sitewidget-bd").css("visibility","hidden")
}}var g=false;
var i=d(l+" .sitewidget-bd").offset();
var h=i.top;
var j=d(c).scrollTop();
var m=d(c).height();
if(h>=j+m){d(c).scroll(function(){j=d(c).scrollTop();
if(h<j+m){if(g==false){d(l+" .sitewidget-bd").addClass(k);
g=true
}}});
d(c).on("section.loaded.element",function(o,n){if(g==false&&n.element==".sitewidget-text"){d(l+" .sitewidget-bd").addClass(k);
g=true
}})
}else{if(g==false){d(l+" .sitewidget-bd").addClass(k);
g=true
}}d(l+" .sitewidget-bd").on("webkitAnimationStart mozAnimationStart MSAnimationStart oanimationstart animationstart",function(){d(l+" .sitewidget-bd").css("visibility","visible")
});
d(l+" .sitewidget-bd").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){d(l+" .sitewidget-bd").removeClass("animated bounceInDown bounceInLeft bounceInRight bounceInUp fadeInDownBig fadeInLeftBig fadeInRightBig fadeInUpBig zoomInDown zoomInLeft zoomInRight zoomInUp")
})
}})
})(this,jQuery);