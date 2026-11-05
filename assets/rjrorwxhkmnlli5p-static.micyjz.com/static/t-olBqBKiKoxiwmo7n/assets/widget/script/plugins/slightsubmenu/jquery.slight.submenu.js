(function(c,b,a,d){c.fn.slightSubmenu=function(e){var g=c.fn.slightSubmenu.defaults;
var f=c.extend(true,{},g,e);
this.each(function(){var j=[];
var l=c(this).is("ul")?c(this):c("ul",this).first();
var m=l.find("> li");
l.addClass(f.topUlClass);
m.addClass(f.topLiClass);
if(f.applyInlineCss){l.css(f.topContainerInlineCss);
m.css(f.directLiInlineCss)
}var h=f.handlerGenerateButtonMarkup(f.buttonClass);
m.each(function(){var p=c(this);
var n=c("ul:first",this);
if(n.length){n.addClass(f.submenuUlClass);
p.addClass(f.topLiWithUlClass);
n.hide(0);
n.addClass(f.submenuUlClass);
var o=c(h);
if(f.applyInlineCss){o.css(f.buttonInlineCss);
n.css(f.submenuUlInlineCss)
}j.push(o[0]);
if(f.prependButtons){p.prepend(o)
}else{n.before(o)
}}if(!p.find(">ul").length){p.addClass("hasNoUlChild")
}});
var i=function(o){o.removeClass(f.buttonSubmenuOpenedClass);
if(f.applyInlineCss){var n={};
c.each(f.buttonActiveInlineCss,function(p){n[p]=""
});
o.css(n)
}};
c(".sitewidget-all .slight-submenu-wrap>li>.slight-submenu-button").mouseup(function(){var n=false;
try{n=k(c(this))
}catch(o){console.log(o)
}if(!n){c(".slight-submenu-button").removeClass("opened");
c(".slight-submenu-wrap li").removeClass("submenuUlShow");
c(".slight-submenu-ul").slideUp()
}});
function k(p){var o=false;
var n=0;
q(p);
function q(s){if(o||n>=10){return
}n++;
var t=s.hasClass("sitewidget-prodGroupCategory");
if(t){var r=s.hasClass("notCollapseSwitch");
if(r){o=true
}else{o=false
}}else{return q(s.parent())
}}return o
}c(j).on(f.buttonActivateEvents,function(q){var r=c(this);
var n=r.parents("li").eq(0).find("ul:first");
if(n.is(":animated")||n.find("> li").is(":animated")){return
}if(c.inArray(q.type,f.buttonCloseNotSubmenuEvents.split(/\s+/))<=-1&&n.is(":visible")){i(r);
f.handlerForceClose(n,f.submenuOpeneTime);
return
}n=n||r.parents("li").eq(0).find("ul:first");
if(!f.multipleSubmenusOpenedAllowed){var p=n[0];
var o=n.parents("ul").eq(0).find("> li").find("ul:first").filter(function(s,t){return t!==p&&c(t).is(":visible")
});
if(o.length){i(r);
o.parent().find("."+f.buttonSubmenuOpenedClass).removeClass(f.buttonSubmenuOpenedClass);
f.handlerForceClose(o,f.submenuOpeneTime)
}}r.addClass(f.buttonSubmenuOpenedClass);
if(f.applyInlineCss){r.css(f.buttonActiveInlineCss)
}if(!n.is(":visible")){f.handlerButtonIn(n,f.submenuOpeneTime)
}})
});
return this
};
c.fn.slightSubmenu.handlerButtonIn=function(e,f){e.show(f);
e.parent("li").addClass("submenuUlShow")
};
c.fn.slightSubmenu.handlerForceClose=function(e,f){e.hide(f);
e.parent("li").removeClass("submenuUlShow")
};
c.fn.slightSubmenu.handlerGenerateButtonMarkup=function(e){return'<span class="'+e+'">&nbsp;</span>'
};
c.fn.slightSubmenu.defTopContainerInlineCss={position:"relative"};
c.fn.slightSubmenu.defDirectLiInlineCss={};
c.fn.slightSubmenu.defSubmenuUlInlineCss={};
c.fn.slightSubmenu.defButtonActiveInlineCss={};
c.fn.slightSubmenu.defButtonInlineCss={background:"#ccc",display:"inline",marginLeft:"8px",width:"10px",height:"18px",position:"absolute",cursor:"pointer"};
c.fn.slightSubmenu.defaults={buttonActivateEvents:"click mouseenter",buttonCloseNotSubmenuEvents:"mouseenter",multipleSubmenusOpenedAllowed:true,prependButtons:false,applyInlineCss:false,topUlClass:"slight-submenu-master-ul",topLiClass:"",topLiWithUlClass:"li-with-ul",buttonClass:"slight-submenu-button",buttonSubmenuOpenedClass:"opened",submenuOpeneTime:400,submenuUlClass:"slight-submenu-ul",directLiInlineCss:c.fn.slightSubmenu.defDirectLiInlineCss,submenuUlInlineCss:c.fn.slightSubmenu.defSubmenuUlInlineCss,topContainerInlineCss:c.fn.slightSubmenu.defTopContainerInlineCss,buttonInlineCss:c.fn.slightSubmenu.defButtonInlineCss,buttonActiveInlineCss:c.fn.slightSubmenu.defButtonActiveInlineCss,handlerButtonIn:c.fn.slightSubmenu.handlerButtonIn,handlerForceClose:c.fn.slightSubmenu.handlerForceClose,handlerGenerateButtonMarkup:c.fn.slightSubmenu.handlerGenerateButtonMarkup}
})(jQuery,window,document);