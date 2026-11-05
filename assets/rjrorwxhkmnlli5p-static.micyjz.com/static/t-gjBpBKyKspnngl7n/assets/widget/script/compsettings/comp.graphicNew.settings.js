(function(d,e,f){var c=d.phoenixSite.phoenixCompSettings||(d.phoenixSite.phoenixCompSettings={});
var b="graphicNew";
var a=c[b]||(c[b]={});
e.extend(a,{graphicAnimateControl:function(l,j){if(!!!e(l+" .sitewidget-graphic").length){return
}if(e(l+" .sitewidget-graphic").css("animation")==f){}else{if(j==""){}else{e(l+" .sitewidget-graphic").css("visibility","hidden")
}}tableScroll(l+" .sitewidget-graphic");
var g=false;
var i=e(l+" .sitewidget-graphic").offset();
var h=i.top;
var k=e(d).scrollTop();
var m=e(d).height();
if(h>=k+m){e(d).scroll(function(){k=e(d).scrollTop();
if(h<k+m){if(g==false){e(l+" .sitewidget-graphic").addClass(j);
g=true
}}});
e(d).on("section.loaded.element",function(o,n){if(g==false&&n.element==".sitewidget-graphic"){e(l+" .sitewidget-graphic").addClass(j);
g=true
}})
}else{if(g==false){e(l+" .sitewidget-graphic").addClass(j);
g=true
}}e(l+" .sitewidget-graphic").on("webkitAnimationStart mozAnimationStart MSAnimationStart oanimationstart animationstart",function(){e(l+" .sitewidget-graphic").css("visibility","visible")
});
e(l+" .sitewidget-graphic").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){e(l+" .sitewidget-graphic").removeClass("animated bounceInDown bounceInLeft bounceInRight bounceInUp fadeInDownBig fadeInLeftBig fadeInRightBig fadeInUpBig zoomInDown zoomInLeft zoomInRight zoomInUp")
})
}})
})(this,jQuery);