(function(c,d,f){var b=c.phoenixSite.phoenixCompSettings||(c.phoenixSite.phoenixCompSettings={});
var a="title";
var e=b[a]||(b[a]={});
d.extend(e,{titleAnimateControl:function(l,j){if(d("#component_"+l+" .sitewidget-title").css("animation")=="undefined"){}else{if(j==""){}else{d("#component_"+l+" .sitewidget-title").css("visibility","hidden")
}}var g=false;
var i=d("#component_"+l+" .sitewidget-title").offset();
var h=i.top;
var k=d(c).scrollTop();
var m=d(c).height();
if(h>=k+m){d(c).scroll(function(){k=d(c).scrollTop();
if(h<k+m){if(g==false){d("#component_"+l+" .sitewidget-title").addClass(j);
g=true
}}});
d(c).on("section.loaded.element",function(o,n){if(g==false&&n.element==".sitewidget-title"){d("#component_"+l+" .sitewidget-title").addClass(j);
g=true
}})
}else{if(g==false){d("#component_"+l+" .sitewidget-title").addClass(j);
g=true
}}d("#component_"+l+" .sitewidget-title").on("webkitAnimationStart mozAnimationStart MSAnimationStart oanimationstart animationstart",function(){d("#component_"+l+" .sitewidget-title").css("visibility","visible")
});
d("#component_"+l+" .sitewidget-title").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){d("#component_"+l+" .sitewidget-title").removeClass("animated bounceInDown bounceInLeft bounceInRight bounceInUp fadeInDownBig fadeInLeftBig fadeInRightBig fadeInUpBig zoomInDown zoomInLeft zoomInRight zoomInUp")
})
}})
})(this,jQuery);