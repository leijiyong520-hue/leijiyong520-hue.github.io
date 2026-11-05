(function(d,e,f){var c=d.phoenixSite.phoenixCompSettings||(d.phoenixSite.phoenixCompSettings={});
var b="langBar";
var a=c[b]||(c[b]={});
e.extend(a,{langBarSublist:function(k,j,m){if(j&&j=="17"){var h=e(".style17 .lang-dropdown .lang-item").length;
var i=e(".style17 .lang-dropdown .lang-item").outerWidth();
var g=2*i;
e("#"+k+"-lang-drop-menu").css("width",g);
e("#"+k+"-lang-drop-menu").css("display","none");
e(d).resize(function(){var o=e(".style17 .lang-dropdown .lang-item").length;
var p=e(".style17 .lang-dropdown .lang-item").outerWidth();
var n=2*p;
e("#"+k+"-lang-drop-menu").css("width",n);
e("#"+k+"-lang-drop-menu").css("display","none")
})
}var l=false;
if(j&&j=="20"){e("#"+k+"-lang-front-icon").parent().bind("click",function(){l=!l;
if(l){e("#"+k+"-lang-drop-menu").slideDown()
}else{l=false;
e("#"+k+"-lang-drop-menu").slideUp()
}})
}else{e("#"+k+"-lang-drop-arrow").parent().bind("click",function(){if(j&&j=="17"){var n=e(d).width();
var o=e(".sitewidget-langBar .lang-bar.style17 .lang-dropdown").offset().left;
if((n-o)>o){e(".sitewidget-langBar .lang-bar.style17 .lang-dropdown .lang-menu").css("left",0)
}else{e(".sitewidget-langBar .lang-bar.style17 .lang-dropdown .lang-menu").css("right",0)
}}if(e("#"+k+"-lang-drop-menu").parents("#backstage-footArea").length>0){e("#"+k+"-lang-drop-menu").addClass("at-foot")
}else{e("#"+k+"-lang-drop-menu").removeClass("at-foot")
}l=!l;
if(l){if(j&&(j=="17"||j=="19")){e("#"+k+"-lang-drop-menu").css("display","flex")
}else{if(j&&j=="21"){e("#"+k+"-lang-drop-menu").css("width","370px");
e("#"+k+"-lang-drop-menu").css("opacity","1")
}else{e("#"+k+"-lang-drop-menu").slideDown()
}}if(j&&(j=="9"||j=="10"||j=="11"||j=="15"||j=="16")){if(navigator.appName=="Microsoft Internet Explorer"){e("#component_"+k).parents(".outerContainer").addClass("langBarOuterzi101")
}}if(j&&j=="16"||j&&j=="17"||j&&j=="18"){if(j&&j=="16"){e("#lang-dropdown-front-icon-in").addClass("imgOn")
}e("#"+k+"-lang-drop-arrow").addClass("imgOn")
}}else{l=false;
if(j&&(j=="17"||j=="19")){e("#"+k+"-lang-drop-menu").css("display","none")
}else{if(j&&j=="21"){e("#"+k+"-lang-drop-menu").css("width","0");
e("#"+k+"-lang-drop-menu").css("opacity","0")
}else{e("#"+k+"-lang-drop-menu").slideUp()
}}if(j&&(j=="9"||j=="10"||j=="11"||j=="15"||j=="16")){if(navigator.appName=="Microsoft Internet Explorer"){e("#component_"+k).parents(".outerContainer").removeClass("langBarOuterzi101")
}}if(j&&j=="16"||j&&j=="17"||j&&j=="18"){if(j&&j=="16"){e("#lang-dropdown-front-icon-in").removeClass("imgOn")
}e("#"+k+"-lang-drop-arrow").removeClass("imgOn")
}}})
}if(j&&j!=="21"){e(m).mouseleave(function(){l=false;
if(j&&(j=="17"||j=="19")){e("#"+k+"-lang-drop-menu").css("display","none")
}else{e("#"+k+"-lang-drop-menu").slideUp()
}if(j&&(j=="9"||j=="10"||j=="11"||j=="15"||j=="16")){if(navigator.appName=="Microsoft Internet Explorer"){e("#component_"+k).parents(".outerContainer").removeClass("langBarOuterzi101")
}}if(j&&j=="16"||j&&j=="17"||j&&j=="18"){e("#lang-dropdown-front-icon-in").removeClass("imgOn");
e("#"+k+"-lang-drop-arrow").removeClass("imgOn")
}})
}else{e("#"+k+"-menu-close-button").bind("click",function(){e("#"+k+"-lang-drop-menu").css("width","0");
e("#"+k+"-lang-drop-menu").css("opacity","0")
})
}}})
})(this,jQuery);