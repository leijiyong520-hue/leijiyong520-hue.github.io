(function(d,e,f){var c=d.phoenixSite.phoenixCompSettings||(d.phoenixSite.phoenixCompSettings={});
var b="navigation_style";
var a=c[b]||(c[b]={});
e.extend(a,{navigationOverView:function(k){if(e(d).width()>=990){var g=e(k).width();
var i=e(k+" .navnew");
var j=0;
i.find(">li").each(function(l,m){j+=e(this).width()
});
if(j>=g-2){try{if(d.datalazyloadDefaultOptions&&d.datalazyloadDefaultOptions.hasCLSOptimizeAuth=="true"){i.removeClass("navnew-item-overview")
}else{i.addClass("navnew-item-overview")
}}catch(h){i.addClass("navnew-item-overview")
}}}},navigationStyle:function(k,i,n,o,r,j,l,q){a.navigationOverView(k);
var m=null;
var s=d.$_phoenix==f;
e(d).resize(function(){if(e(d).width()>=990&&s){if(m){clearTimeout(m)
}m=setTimeout(function(){a.navigationOverView(k)
},300)
}});
phoenixSite.sitewidgets.addMarkWithUrl(k+" a");
e(k+" .smsmart a[data-currentIndex]").each(function(t,u){if(e(u).attr("data-currentIndex")!=""||e(u).hasClass("on")){e(u).parents("li").addClass("on");
e(u).parents(".nav-sub1-item").addClass("on");
e(u).parents(".nav-sub-item").eq(0).find(".nav-sub1-item").addClass("on");
e(u).parents(".nav-sub2-item").addClass("on")
}});
e(k+' [data-visible="0"]').remove();
e(k+" ul").each(function(t,u){if(e(u).find("li").size()==0){e(u).remove()
}});
var p=parseInt(e(".navnew-item").css("padding-bottom"))+10;
if((i&&i=="navnew-substyle2")||(n&&n=="navnew-wide-substyle2")){e(k+" .navnew .navnew-sub2").each(function(){var t=e(this).html();
e(this).addClass("navnew-sub-remove").after('<ol class="navnew-sub2 smsmart-nowrap smsmart-nowrap-cus">'+t+"</ol>");
e(".navnew-sub-remove").remove()
})
}if((i&&i=="navnew-substyle2")||(n&&n=="navnew-wide-substyle2")){e(k+" .navnew").smartmenusUpdate({subMenusMinWidth:"100%",subMenusMaxWidth:"100%",showFunction:function(v,t){var u=0;
var z=v.find(".nav-sub-item");
var x=v.find(".nav-sub-item").length;
z.each(function(B,A){if(e(A).hasClass("hide")){u+=1
}});
if(v.hasClass("navnew-sub1")&&x!=u){var y='<div class="navigation-opacity-backlayer" style="background-color:'+v.css("background-color")+';"></div>';
var w=v.parents(".sitewidget-navigation_style").parents(".outerContainer");
if(!w.find(".navigation-opacity-backlayer").length){w.css("position","relative").append(y);
setTimeout(function(){w.find(".navigation-opacity-backlayer").css({bottom:-v.outerHeight(),height:v.outerHeight()});
w.find(".navigation-opacity-backlayer").show()
},100)
}else{setTimeout(function(){w.css("position","relative").find(".navigation-opacity-backlayer").css({bottom:-v.outerHeight(),height:v.outerHeight()});
w.find(".navigation-opacity-backlayer").show()
},100)
}v.css("background-color","transparent")
}v.css({left:""});
v.show(0,t);
v.find(".navLv2 a").css({width:"200px",padding:0,overflow:"hidden","white-space":"normal","word-break":"break-all"});
setTimeout(function(){var A=v.closest(".navnew-item");
var K=A.find(".navnew-link .text-width").offset().left;
var F=v.siblings(".navnew-link").find(".icon");
if(!!F&&F.width()>0){K=F.offset().left
}var J=parseFloat(v.find(".navnew-sub1-link").css("padding-left").replace(/px/,""));
var B=Math.round(K-A.offset().left-J);
var C=parseFloat(v.css("margin-left").replace(/px/,""));
var D=parseFloat(v.find(".navnew-sub1-link").css("padding-left").replace(/px/,""));
v.css({"padding-left":B+"px"});
v.find(".navLv2").css({width:"200px","margin-bottom":"5px","margin-right":"10px","margin-left":"10px"});
var G=(B<0?0:B)+parseFloat(v.css("padding-right").replace(/px/,""))+v.find("li").length*20;
v.find(".navnew-sub1-item").each(function(L,M){G+=e(this).width()
});
var E=0;
if(v.siblings(".navnew-link").length>0){E=e(d).width()-(v.siblings(".navnew-link").offset().left+G)
}if(v.parent().hasClass("smsmart-nowrap-content")){E=e(d).width()-(v.parent().siblings(".navnew-link").offset().left+G)
}var C=E>=0?E="":E+"px";
var H="";
try{H=v.parents(".smsmart").offset().left
}catch(I){}v.css({width:G+"px","min-width":"","margin-left":C,"max-width":e(d).width(),"margin-left":0,display:"flex","flex-wrap":"wrap",left:"50%",transform:"translateX(-50%)",overflow:"hidden","box-sizing":"border-box",height:"auto"});
if(B<0){v.css({"padding-left":D+B+C+"px"})
}},0)
},hideFunction:function(u,t){if(u.hasClass("navnew-sub1")){u.parents(".sitewidget-navigation_style").parents(".outerContainer").css("position","").find(".navigation-opacity-backlayer").hide();
u.removeAttr("style")
}u.hide(0,t)
}})
}else{if((i&&i=="navnew-substyle3")||(n&&n=="navnew-wide-substyle3")){e(k+" .navnew .subNav-list-whiteSpace").each(function(){var t=parseInt(e(this).attr("subnavlistsize"));
var u=e(this).width();
if(t>8){e(this).addClass("subNav-whiteSpace-columns fix");
e(this).find(">li").width(u);
e(this).css({"column-count":Math.ceil(t/8)}).width(u*Math.ceil(t/8))
}else{e(this).css("min-width","10em")
}});
e(k+" .navnew .subNav-list-floor").each(function(){e(this).parent("li").addClass("mainNav-list-static").append(e(this).siblings(".navnew-separator"));
var t=Math.floor(e(k).width()/230);
e(this).find(".navnew-sub1-item").each(function(u){e(this).removeAttr("style");
if(e(this).index()%t==0){e(this).css("border-left-width",0)
}});
e(this).find(".navnew-sub2").each(function(){e(this).after("<ol class='navnew-sub2'></ol>");
e(this).next("ol.navnew-sub2").html(e(this).html());
e(this).remove()
})
});
e(k+" .navnew").smartmenusUpdate({subMenusMinWidth:"",subMenusMaxWidth:"",showFunction:function(u,t){if(u.hasClass("subNav-list-floor")){var v=Math.floor(e(k).width()/230);
u.find(".navnew-sub1-item").each(function(w){e(this).removeAttr("style");
if(e(this).index()%v==0){e(this).css("border-left-width",0)
}})
}u.fadeIn(400,t)
},hideFunction:function(u,t){u.fadeOut(200,t)
}})
}else{if((i&&i=="navnew-substyle4")||(n&&n=="navnew-wide-substyle4")){e(k+" .navnew").smartmenusUpdate({subMenusMinWidth:"100%",subMenusMaxWidth:"100%",showFunction:function(u,t){u.show(600,t)
},hideFunction:function(u,t){u.hide(200,t)
}})
}else{if((i&&i=="navnew-substyle5")||(n&&n=="navnew-wide-substyle5")){e(k+" .navnew").smartmenusUpdate({subMenusMinWidth:"100%",subMenusMaxWidth:"100%",showFunction:function(u,t){u.show(600,t)
},hideFunction:function(u,t){u.hide(200,t)
}})
}else{if((i&&i=="navnew-substyle6")||(n&&n=="navnew-wide-substyle6")){e(k+" .navnew").smartmenusUpdate({subMenusMinWidth:"100%",subMenusMaxWidth:"100%",showFunction:function(A,u){var v=A.closest(".navnew-item");
var D=v.find(".navnew-link .text-width").offset().left;
var z=A.siblings(".navnew-link").find(".icon");
if(!!z&&z.width()>0){D=z.offset().left
}var x=Math.round(D-v.offset().left);
A.css("padding-left",x+"px");
var B=0;
var y=A.find(".nav-sub-item");
var t=A.find(".nav-sub-item").length;
y.each(function(F,E){if(e(E).hasClass("hide")){B+=1
}});
if(A.hasClass("navnew-sub1")&&t!=B){var C='<div class="navigation-opacity-backlayer" style="background-color:'+A.css("background-color")+';"></div>';
var w=A.parents(".sitewidget-navigation_style").parents(".outerContainer");
if(!w.find(".navigation-opacity-backlayer").length){w.css("position","relative").append(C);
w.find(".navigation-opacity-backlayer").css({bottom:-A.outerHeight(),height:A.outerHeight()});
w.find(".navigation-opacity-backlayer").show()
}else{w.css("position","relative").find(".navigation-opacity-backlayer").css({bottom:-A.outerHeight(),height:A.outerHeight()});
w.find(".navigation-opacity-backlayer").show()
}A.css("background-color","transparent")
}A.show(0,u)
},hideFunction:function(u,t){if(u.hasClass("navnew-sub1")){u.parents(".sitewidget-navigation_style").parents(".outerContainer").css("position","").find(".navigation-opacity-backlayer").hide();
u.removeAttr("style")
}u.hide(0,t)
}});
e(k+" .nav-sub1").mouseover(function(){e(this).siblings("img").css("display","none");
e(this).siblings("img").removeAttr("style")
});
e(k+" .navnew-substyle6 .navnew-sub1-item").mouseover(function(){e(this).siblings().find("img").removeAttr("style");
e(this).find("img").removeAttr("style")
});
e(k+" .navnew-substyle6 .navnew-item").mouseleave(function(){e(this).find(".nav-sub-list6 .nav-sub-item:first-child>img").css("display","block")
})
}else{if((i&&i=="navnew-substyle8")||(n&&n=="navnew-wide-substyle8")){e(k+" .navnew").smartmenusUpdate({subMenusMinWidth:"100%",subMenusMaxWidth:"100%",showFunction:function(u,t){u.show(600,t)
},hideFunction:function(u,t){u.hide(200,t)
}})
}else{if((i&&i=="navnew-substyle9")||(n&&n=="navnew-wide-substyle9")){e(k+" .navnew.navnew-substyle9>li").each(function(){if(e(this).is(".navnew-item.navLv1")&&e(this).find(".nav-sub-item-bd-item.navnew-sub2-item").length==0){e(this).css("position","relative").find(".navnew-sub1").addClass("no-tow-list");
e(this).find(".navnew-sub1-item.nav-sub-item-hd.on").removeClass("on")
}else{if(e(this).is(".navnew-item.navLv1")){e(this).css("position","static")
}}});
e(k+" .navnew").on("mouseenter","li",function(){if(e(this).is(".navnew-item.navLv1")&&e(this).find(".nav-sub-item-bd-item.navnew-sub2-item").length==0){e(this).find(".navnew-sub1-item.nav-sub-item-hd.on").removeClass("on")
}else{if(e(this).is(".navnew-item.navLv1")){e(this).css("position","static")
}}if(e(this).is(".nav-sub-item")){e(this).addClass("on").siblings().removeClass("on");
e(this).find(".navnew-sub1-item").addClass("on").find("a").addClass("active");
e(this).siblings(".nav-sub-item").find(".navnew-sub1-item").removeClass("on").find("a").removeClass("active")
}});
e(k+" .navnew").smartmenusUpdate({subMenusMinWidth:"100%",subMenusMaxWidth:"100%",showFunction:function(u,t){u.show(0,t)
},hideFunction:function(u,t){u.hide(0,t)
}})
}else{if((i&&i=="navnew-substyle1")||(n&&n=="navnew-wide-substyle1")){p=p
}else{p=0
}_subMenusMinWidth="11em";
_subMenusMaxWidth="40em";
if(r&&r=="1"){_subMenusMinWidth=j;
_subMenusMaxWidth=j
}e(k+" .navnew").smartmenusUpdate({mainMenuSubOffsetY:p,subMenusMinWidth:_subMenusMinWidth,subMenusMaxWidth:_subMenusMaxWidth,showFunction:function(u,t){if(i=="navnew-substyle1"||n=="navnew-wide-substyle1"){u.slideDown(250,t)
}else{u.addClass("transform-start");
setTimeout(function(){u.addClass("transform-org")
},100);
u.fadeIn(600,t)
}},hideFunction:function(u,t){if(i=="navnew-substyle1"||n=="navnew-wide-substyle1"){u.slideUp(150,t)
}else{u.removeClass("transform-start transform-org").fadeOut(0,t)
}}})
}}}}}}}if((i&&i=="navnew-substyle1")||(n&&n=="navnew-wide-substyle1")){var h='<span class="sub-nav-arrow"></span>';
e(k+" .navnew.navnew-wide-substyle1>li>ul").prepend(h);
var g=e(k+" .navnew.navnew-wide-substyle1>li>ul").css("background-color");
e(k+" .navnew.navnew-wide-substyle1>li>ul>span.sub-nav-arrow").css("border-bottom-color",g)
}if(o=="2"){e(k+" .navnew-thumb").click(function(){var t=e(this);
t.siblings(".navnew").slideToggle();
t.children(".navnew-thumb-fix").toggleClass("open");
if(t.children(".navnew-thumb-fix").hasClass("open")){e(k+".sitewidget-navnew ul li a[href*='#']").unbind("click").bind("click",function(){t.siblings(".navnew").slideToggle();
t.children(".navnew-thumb-fix").toggleClass("open")
})
}})
}else{e(k+" .navnew-thumb-switch").unbind("click").bind("click",function(){var w=d.$_phoenix==f;
var x=e(this);
var v=e(d).height();
var u=e(d).width();
var t=null;
if(e(this).hasClass("open")){e("html, body").removeClass("ofh");
x.css("position","absolute");
x.parent(".sitewidget-navnew").removeClass("open");
x.removeClass("open");
if(t){clearTimeout(backstageEffect.resizeTimer)
}t=setTimeout(function(){x.parent(".sitewidget-navnew").removeAttr("style")
},400)
}else{e("html, body").addClass("ofh");
x.parent(".sitewidget-navnew").css("height",v);
x.parent(".sitewidget-navnew").addClass("open");
x.addClass("open");
if(w){setTimeout(function(){x.css("position","absolute")
},400)
}e(k+".sitewidget-navnew.open ul li a[href*='#']").unbind("click").bind("click",function(){e("html, body").removeClass("ofh");
x.css("position","absolute");
if(t){clearTimeout(backstageEffect.resizeTimer)
}})
}})
}e(k+" .navnew .navnew-item").each(function(u,v){var x=e(v).find(".nav-sub-item");
if(x&&x.length){var t=0;
var w=x.length;
x.each(function(z,y){if(e(y).hasClass("hide")){t+=1
}});
if(w==t){e(v).find(".sub-arrow").addClass("hide");
e(v).find(".navnew-sub1").addClass("hide");
e(v).find(".navnew-link").mouseleave(function(){e(this).removeClass("highlighted")
})
}}})
}})
})(this,jQuery);