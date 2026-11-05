(function(d,e,f){var c=d.phoenixSite.phoenixCompSettings||(d.phoenixSite.phoenixCompSettings={});
var b="onlineService";
var a=c[b]||(c[b]={});
phoenixSite.sitewidgets.onlineServiceThumbToggle=function(){var h=function(){if(e(d).width()<768){if(!e(".onlineService-holder").length&&e(".sitewidget-onlineService").length){e("body").append('<div class="onlineService-holder pb56"></div>')
}}else{e("body").find(".onlineService-holder.pb56").remove()
}};
h();
var g=null;
e(d).resize(function(){if(g){clearTimeout(g)
}g=setTimeout(function(){h()
},200)
})
};
phoenixSite.sitewidgets.onlineServiceColorfulEffects=function(){e(".sitewidget-hdbg,.sitewidget-hdbg-cus").unbind("click").bind("click",function(){if(d.fbq){d.fbq("track","ViewContent")
}if(d.ttq){d.ttq.track("ViewContent")
}if(e(this).parents(".sitewidget-onlineService-left-colorful").length>0){e(".sitewidget-onlineService").animate({left:"-124px"},500,function(){e(".sitewidget-onlineService").css("z-index","99");
e(".sitewidget-onlineService .sideShowArrow").show()
})
}else{e(".sitewidget-onlineService").animate({right:"-124px"},500,function(){e(".sitewidget-onlineService").css("z-index","99");
e(".sitewidget-onlineService .sideShowArrow").show()
})
}});
e(".sideShowArrow").unbind("click").bind("click",function(){if(d.fbq){d.fbq("track","ViewContent")
}if(d.ttq){d.ttq.track("ViewContent")
}if(e(this).parents(".sitewidget-onlineService-left-colorful").length>0){e(".sitewidget-onlineService .sideShowArrow").hide();
e(".sitewidget-onlineService").animate({left:"0"},400,function(){e(".sitewidget-onlineService").removeAttr("style")
})
}else{e(".sitewidget-onlineService .sideShowArrow").hide();
e(".sitewidget-onlineService").animate({right:"0"},400,function(){e(".sitewidget-onlineService").removeAttr("style")
})
}});
e(".sitewidget-onlineService-togglebtn").unbind("click").bind("click",function(){e(this).next("ul").slideToggle(200);
e(this).find("i").toggleClass("i-changeup")
})
};
e.extend(a,{onlineServiceChange:function(i){phoenixSite.sitewidgets.onlineServiceThumbToggle();
phoenixSite.sitewidgets.onlineServiceColorfulEffects();
e(".onlineservice-fixed-blocks-items>a").unbind("click.onlineService").bind("click.onlineService",function(){if(d.fbq){d.fbq("track","ViewContent")
}if(d.ttq){d.ttq.track("ViewContent")
}var j=this;
e(".onlineservice-fixed-blocks-list").each(function(){});
if(e(j).find(".terminal").is(":hidden")){e(j).next("ul").slideToggle();
setTimeout(function(){e(j).next("ul").slideToggle()
},3000)
}});
e(i+" .onlineService_line").on("click",function(l){l.preventDefault();
if(d.fbq){d.fbq("track","ViewContent")
}if(d.ttq){d.ttq.track("ViewContent")
}var n=e(this).attr("data-line");
var m={number:n};
if(n==""){return
}var j='<iframe name="lineFrame" src="/phoenix/admin/linemessenger?number='+n+'" style="border: 0;margin-top: 100px;margin-left: 35px;width: 150px;"></iframe>';
var k='<div id="pop-online-qr"><a class="close" href="javascript:;"><i class="fa fa-times" aria-hidden="true"></i></a>'+j+"</div>";
if(e("#pop-online-tel").length>0){e("#pop-online-tel").remove()
}if(e("#pop-online-qr").length>0){e("#pop-online-qr").remove()
}e("body").append(k);
e("#pop-online-qr .close").on("click",function(){var o=e(this).parent();
o.animate({opacity:0},function(){o.remove()
})
})
});
e(i+" .sideArrow").on("click",function(){if(d.fbq){d.fbq("track","ViewContent")
}if(d.ttq){d.ttq.track("ViewContent")
}if(e(this).parent().hasClass("sitewidget-onlineService-left")){if(!e(this).hasClass("sideArrowShrink")){e(this).parents(".sitewidget-onlineService").animate({left:"-160px"},800,function(){e(this).css("left","0").find(".sitewidget-onlineService-wrap").hide().siblings(".sideArrow").addClass("sideArrowShrink")
})
}else{e(this).siblings(".sitewidget-onlineService-wrap").show().parents(".sitewidget-onlineService").animate({left:"0"},300,function(){e(this).find(".sideArrow").removeClass("sideArrowShrink")
})
}}else{if(!e(this).hasClass("sideArrowShrink")){e(this).parents(".sitewidget-onlineService").animate({right:"-160px"},800,function(){e(this).css("right","0").find(".sitewidget-onlineService-wrap").hide().siblings(".sideArrow").addClass("sideArrowShrink")
})
}else{e(this).siblings(".sitewidget-onlineService-wrap").show().parents(".sitewidget-onlineService").animate({right:"0"},300,function(){e(this).find(".sideArrow").removeClass("sideArrowShrink")
})
}}});
var h=null;
g();
e(d).resize(function(){if(h){clearTimeout(h)
}h=setTimeout(g,200)
});
function g(){if(e(d).width()<640){e(".sitewidget-onlineService-colorfullist > li >a,.sitewidget-onlineService-list > li >a span,.onlineservice-fixed-list > li a span").each(function(){if(e(this).text().length>10){if(e(this).hasClass("onlineService_t")&&e(this).find("i").length>0){var k=e(this).find("i");
var j=e(this).text().substring(0,9)+"...";
e(this).html(k).append(j)
}else{e(this).text(e(this).text().substring(0,9)+"...")
}}})
}}}})
})(this,jQuery);