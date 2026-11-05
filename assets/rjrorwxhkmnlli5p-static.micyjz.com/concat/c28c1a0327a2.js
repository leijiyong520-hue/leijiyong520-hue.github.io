/* /assets/widget/script/plugins/gallery/colorbox/jquery.colorbox.js,/assets/script/phoenix/phoenix_form_popup.js,/assets/script/phoenix/phoenix_picture_popup.js *//* /assets/widget/script/plugins/gallery/colorbox/jquery.colorbox.js *//*!
	Colorbox v1.5.10 - 2014-06-26
	jQuery lightbox and modal window plugin
	(c) 2014 Jack Moore - http://www.jacklmoore.com/colorbox
	license: http://www.opensource.org/licenses/mit-license.php
*/
(function(N,l,ab){var P={html:false,photo:false,iframe:false,inline:false,transition:"elastic",speed:300,fadeOut:300,width:false,initialWidth:"600",innerWidth:false,maxWidth:false,height:false,initialHeight:"450",innerHeight:false,maxHeight:false,scalePhotos:true,scrolling:true,opacity:0.9,preloading:true,className:false,overlayClose:true,escKey:true,arrowKey:true,top:false,bottom:false,left:false,right:false,fixed:false,data:undefined,closeButton:true,fastIframe:true,open:false,reposition:true,loop:true,slideshow:false,slideshowAuto:true,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",photoRegex:/\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,retinaImage:false,retinaUrl:false,retinaSuffix:"@2x.$1",current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",returnFocus:true,trapFocus:true,onOpen:false,onLoad:false,onComplete:false,onCleanup:false,onClosed:false,rel:function(){return this.rel
},href:function(){return N(this).attr("href")
},title:function(){return this.title
}},x="colorbox",X="cbox",s=X+"Element",aa=X+"_open",e=X+"_load",Y=X+"_complete",w=X+"_cleanup",ah=X+"_closed",i=X+"_purge",V,al,am,d,L,q,b,U,c,af,S,k,h,p,v,ac,u,W,z,C,J=N("<a/>"),aj,an,n,g,a,M,o,E,ad,R,A,Q,ai="div",H=0,ae={},ag;
function K(ao,ar,aq){var ap=l.createElement(ao);
if(ar){ap.id=X+ar
}if(aq){ap.style.cssText=aq
}return N(ap)
}function t(){return ab.innerHeight?ab.innerHeight:N(ab).height()
}function B(ap,ao){if(ao!==Object(ao)){ao={}
}this.cache={};
this.el=ap;
this.value=function(aq){var ar;
if(this.cache[aq]===undefined){ar=N(this.el).attr("data-cbox-"+aq);
if(ar!==undefined){this.cache[aq]=ar
}else{if(ao[aq]!==undefined){this.cache[aq]=ao[aq]
}else{if(P[aq]!==undefined){this.cache[aq]=P[aq]
}}}}return this.cache[aq]
};
this.get=function(aq){var ar=this.value(aq);
return N.isFunction(ar)?ar.call(this.el,this):ar
}
}function G(ap){var ao=c.length,aq=(M+ap)%ao;
return(aq<0)?ao+aq:aq
}function T(ao,ap){return Math.round((/%/.test(ao)?((ap==="x"?af.width():t())/100):1)*parseInt(ao,10))
}function D(ap,ao){return ap.get("photo")||ap.get("photoRegex").test(ao)
}function F(ap,ao){return ap.get("retinaUrl")&&ab.devicePixelRatio>1?ao.replace(ap.get("photoRegex"),ap.get("retinaSuffix")):ao
}function ak(ao){if("contains" in al[0]&&!al[0].contains(ao.target)&&ao.target!==V[0]){ao.stopPropagation();
al.focus()
}}function m(ao){if(m.str!==ao){al.add(V).removeClass(m.str).addClass(ao);
m.str=ao
}}function O(ao){M=0;
if(ao&&ao!==false&&ao!=="nofollow"){c=N("."+s).filter(function(){var ap=N.data(this,x);
var aq=new B(this,ap);
return(aq.get("rel")===ao)
});
M=c.index(aj.el);
if(M===-1){c=c.add(aj.el);
M=c.length-1
}}else{c=N(aj.el)
}}function I(ao){N(l).trigger(ao);
J.triggerHandler(ao)
}var y=(function(){var ap,at=X+"Slideshow_",ax="click."+X,av;
function aq(){clearTimeout(av)
}function aw(){if(aj.get("loop")||c[M+1]){aq();
av=setTimeout(Q.next,aj.get("slideshowSpeed"))
}}function ao(){ac.html(aj.get("slideshowStop")).unbind(ax).one(ax,au);
J.bind(Y,aw).bind(e,aq);
al.removeClass(at+"off").addClass(at+"on")
}function au(){aq();
J.unbind(Y,aw).unbind(e,aq);
ac.html(aj.get("slideshowStart")).unbind(ax).one(ax,function(){Q.next();
ao()
});
al.removeClass(at+"on").addClass(at+"off")
}function ar(){ap=false;
ac.hide();
aq();
J.unbind(Y,aw).unbind(e,aq);
al.removeClass(at+"off "+at+"on")
}return function(){if(ap){if(!aj.get("slideshow")){J.unbind(w,ar);
ar()
}}else{if(aj.get("slideshow")&&c[1]){ap=true;
J.one(w,ar);
if(aj.get("slideshowAuto")){ao()
}else{au()
}ac.show()
}}}
}());
function f(ap){var ao;
if(!R){ao=N(ap).data(x);
aj=new B(ap,ao);
O(aj.get("rel"));
if(!E){E=ad=true;
m(aj.get("className"));
al.css({visibility:"hidden",display:"block",opacity:""});
S=K(ai,"LoadedContent","width:0; height:0; overflow:hidden; visibility:hidden");
d.css({width:"",height:""}).append(S);
an=L.height()+U.height()+d.outerHeight(true)-d.height();
n=q.width()+b.width()+d.outerWidth(true)-d.width();
g=S.outerHeight(true);
a=S.outerWidth(true);
var au=T(aj.get("initialWidth"),"x");
var aq=T(aj.get("initialHeight"),"y");
var at=aj.get("maxWidth");
var ar=aj.get("maxHeight");
aj.w=(at!==false?Math.min(au,T(at,"x")):au)-a-n;
aj.h=(ar!==false?Math.min(aq,T(ar,"y")):aq)-g-an;
S.css({width:"",height:aj.h});
Q.position();
I(aa);
aj.get("onOpen");
C.add(p).hide();
al.focus();
if(aj.get("trapFocus")){if(l.addEventListener){l.addEventListener("focus",ak,true);
J.one(ah,function(){l.removeEventListener("focus",ak,true)
})
}}if(aj.get("returnFocus")){J.one(ah,function(){N(aj.el).focus()
})
}}V.css({opacity:parseFloat(aj.get("opacity"))||"",cursor:aj.get("overlayClose")?"pointer":"",visibility:"visible"}).show();
if(aj.get("closeButton")){z.html(aj.get("close")).appendTo(d)
}else{z.appendTo("<div/>")
}Z()
}}function r(){if(!al&&l.body){ag=false;
af=N(ab);
al=K(ai).attr({id:x,"class":N.support.opacity===false?X+"IE":"",role:"dialog",tabindex:"-1"}).hide();
V=K(ai,"Overlay").hide();
h=N([K(ai,"LoadingOverlay")[0],K(ai,"LoadingGraphic")[0]]);
am=K(ai,"Wrapper");
d=K(ai,"Content").append(p=K(ai,"Title"),v=K(ai,"Current"),W=N('<button type="button"/>').attr({id:X+"Previous"}),u=N('<button type="button"/>').attr({id:X+"Next"}),ac=K("button","Slideshow"),h);
z=N('<button type="button"/>').attr({id:X+"Close"});
am.append(K(ai).append(K(ai,"TopLeft"),L=K(ai,"TopCenter"),K(ai,"TopRight")),K(ai,false,"clear:left").append(q=K(ai,"MiddleLeft"),d,b=K(ai,"MiddleRight")),K(ai,false,"clear:left").append(K(ai,"BottomLeft"),U=K(ai,"BottomCenter"),K(ai,"BottomRight"))).find("div div").css({"float":"left"});
k=K(ai,false,"position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;");
C=u.add(W).add(v).add(ac);
N(l.body).append(V,al.append(am,k))
}}function j(){function ao(ap){if(!(ap.which>1||ap.shiftKey||ap.altKey||ap.metaKey||ap.ctrlKey)){ap.preventDefault();
f(this)
}}if(al){if(!ag){ag=true;
u.click(function(){Q.next()
});
W.click(function(){Q.prev()
});
z.click(function(){Q.close()
});
V.click(function(){if(aj.get("overlayClose")){Q.close()
}});
N(l).bind("keydown."+X,function(aq){var ap=aq.keyCode;
if(E&&aj.get("escKey")&&ap===27){aq.preventDefault();
Q.close()
}if(E&&aj.get("arrowKey")&&c[1]&&!aq.altKey){if(ap===37){aq.preventDefault();
W.click()
}else{if(ap===39){aq.preventDefault();
u.click()
}}}});
if(N.isFunction(N.fn.on)){N(l).on("click."+X,"."+s,ao)
}else{N("."+s).live("click."+X,ao)
}}return true
}return false
}if(N[x]){return
}N(r);
Q=N.fn[x]=N[x]=function(ao,ar){var ap;
var aq=this;
ao=ao||{};
if(N.isFunction(aq)){aq=N("<a/>");
ao.open=true
}else{if(!aq[0]){return aq
}}if(!aq[0]){return aq
}r();
if(j()){if(ar){ao.onComplete=ar
}aq.each(function(){var at=N.data(this,x)||{};
N.data(this,x,N.extend(at,ao))
}).addClass(s);
ap=new B(aq[0],ao);
if(ap.get("open")){f(aq[0])
}}return aq
};
Q.position=function(aq,at){var aw,ay=0,ap=0,au=al.offset(),ao,ar;
af.unbind("resize."+X);
al.css({top:-90000,left:-90000});
ao=af.scrollTop();
ar=af.scrollLeft();
if(aj.get("fixed")){au.top-=ao;
au.left-=ar;
al.css({position:"fixed"})
}else{ay=ao;
ap=ar;
al.css({position:"absolute"})
}if(aj.get("right")!==false){ap+=Math.max(af.width()-aj.w-a-n-T(aj.get("right"),"x"),0)
}else{if(aj.get("left")!==false){ap+=T(aj.get("left"),"x")
}else{ap+=Math.round(Math.max(af.width()-aj.w-a-n,0)/2)
}}if(aj.get("bottom")!==false){ay+=Math.max(t()-aj.h-g-an-T(aj.get("bottom"),"y"),0)
}else{if(aj.get("top")!==false){ay+=T(aj.get("top"),"y")
}else{ay+=Math.round(Math.max(t()-aj.h-g-an,0)/2)
}}al.css({top:au.top,left:au.left,visibility:"visible"});
am[0].style.width=am[0].style.height="9999px";
function ax(){L[0].style.width=U[0].style.width=d[0].style.width=(parseInt(al[0].style.width,10)-n)+"px";
d[0].style.height=q[0].style.height=b[0].style.height=(parseInt(al[0].style.height,10)-an)+"px"
}aw={width:aj.w+a+n,height:aj.h+g+an,top:ay,left:ap};
if(aq){var av=0;
N.each(aw,function(az){if(aw[az]!==ae[az]){av=aq;
return
}});
aq=av
}ae=aw;
if(!aq){al.css(aw)
}al.dequeue().animate(aw,{duration:aq||0,complete:function(){ax();
ad=false;
am[0].style.width=(aj.w+a+n)+"px";
am[0].style.height=(aj.h+g+an)+"px";
if(aj.get("reposition")){setTimeout(function(){af.bind("resize."+X,Q.position)
},1)
}if(at){at()
}},step:ax})
};
Q.resize=function(ap){var ao;
if(E){ap=ap||{};
if(ap.width){aj.w=T(ap.width,"x")-a-n
}if(ap.innerWidth){aj.w=T(ap.innerWidth,"x")
}S.css({width:aj.w});
if(ap.height){aj.h=T(ap.height,"y")-g-an
}if(ap.innerHeight){aj.h=T(ap.innerHeight,"y")
}if(!ap.innerHeight&&!ap.height){ao=S.scrollTop();
S.css({height:"auto"});
aj.h=S.height()
}S.css({height:aj.h});
if(ao){S.scrollTop(ao)
}Q.position(aj.get("transition")==="none"?0:aj.get("speed"))
}};
Q.prep=function(ap){if(!E){return
}var at,aq=aj.get("transition")==="none"?0:aj.get("speed");
S.remove();
S=K(ai,"LoadedContent").append(ap);
function ao(){aj.w=aj.w||S.width();
aj.w=aj.mw&&aj.mw<aj.w?aj.mw:aj.w;
return aj.w
}function ar(){aj.h=aj.h||S.height();
aj.h=aj.mh&&aj.mh<aj.h?aj.mh:aj.h;
return aj.h
}S.hide().appendTo(k.show()).css({width:ao(),overflow:aj.get("scrolling")?"auto":"hidden"}).css({height:ar()}).prependTo(d);
k.hide();
N(o).css({"float":"none"});
m(aj.get("className"));
at=function(){var aw=c.length,av,au;
if(!E){return
}function ax(){if(N.support.opacity===false){al[0].style.removeAttribute("filter")
}}au=function(){clearTimeout(A);
h.hide();
I(Y);
aj.get("onComplete")
};
p.html(aj.get("title")).show();
S.show();
if(aw>1){if(typeof aj.get("current")==="string"){v.html(aj.get("current").replace("{current}",M+1).replace("{total}",aw)).show()
}u[(aj.get("loop")||M<aw-1)?"show":"hide"]().html(aj.get("next"));
W[(aj.get("loop")||M)?"show":"hide"]().html(aj.get("previous"));
y();
if(aj.get("preloading")){N.each([G(-1),G(1)],function(){var ay,az=c[this],aA=new B(az,N.data(az,x)),aB=aA.get("href");
if(aB&&D(aA,aB)){aB=F(aA,aB);
ay=l.createElement("img");
ay.src=aB
}})
}}else{C.hide()
}if(aj.get("iframe")){av=l.createElement("iframe");
N(av).attr("allow","autoplay");
if("frameBorder" in av){av.frameBorder=0
}if("allowTransparency" in av){av.allowTransparency="true"
}if(!aj.get("scrolling")){av.scrolling="no"
}N(av).attr({src:aj.get("href"),name:(new Date()).getTime(),"class":X+"Iframe",allowFullScreen:true}).one("load",au).appendTo(S);
J.one(i,function(){av.src="//about:blank"
});
if(aj.get("fastIframe")){N(av).trigger("load")
}}else{au()
}if(aj.get("transition")==="fade"){al.fadeTo(aq,1,ax)
}else{ax()
}};
if(aj.get("transition")==="fade"){al.fadeTo(aq,0,function(){Q.position(0,at)
})
}else{Q.position(aq,at)
}};
function Z(){var ar,at,aq=Q.prep,ap,au=++H;
ad=true;
o=false;
I(i);
I(e);
aj.get("onLoad");
aj.h=aj.get("height")?T(aj.get("height"),"y")-g-an:aj.get("innerHeight")&&T(aj.get("innerHeight"),"y");
aj.w=aj.get("width")?T(aj.get("width"),"x")-a-n:aj.get("innerWidth")&&T(aj.get("innerWidth"),"x");
aj.mw=aj.w;
aj.mh=aj.h;
if(aj.get("maxWidth")){aj.mw=T(aj.get("maxWidth"),"x")-a-n;
aj.mw=aj.w&&aj.w<aj.mw?aj.w:aj.mw
}if(aj.get("maxHeight")){aj.mh=T(aj.get("maxHeight"),"y")-g-an;
aj.mh=aj.h&&aj.h<aj.mh?aj.h:aj.mh
}ar=aj.get("href");
A=setTimeout(function(){h.show()
},100);
if(aj.get("inline")){var ao=N(ar);
ap=N("<div>").hide().insertBefore(ao);
J.one(i,function(){ap.replaceWith(ao)
});
aq(ao)
}else{if(aj.get("iframe")){aq(" ")
}else{if(aj.get("html")){aq(aj.get("html"))
}else{if(D(aj,ar)){ar=F(aj,ar);
o=new Image();
N(o).addClass(X+"Photo").bind("error",function(){aq(K(ai,"Error").html(aj.get("imgError")))
}).one("load",function(){if(au!==H){return
}setTimeout(function(){var av;
N.each(["alt","longdesc","aria-describedby"],function(ax,ay){var aw=N(aj.el).attr(ay)||N(aj.el).attr("data-"+ay);
if(aw){o.setAttribute(ay,aw)
}});
if(aj.get("retinaImage")&&ab.devicePixelRatio>1){o.height=o.height/ab.devicePixelRatio;
o.width=o.width/ab.devicePixelRatio
}if(aj.get("scalePhotos")){at=function(){o.height-=o.height*av;
o.width-=o.width*av
};
if(aj.mw&&o.width>aj.mw){av=(o.width-aj.mw)/o.width;
at()
}if(aj.mh&&o.height>aj.mh){av=(o.height-aj.mh)/o.height;
at()
}}if(aj.h){o.style.marginTop=Math.max(aj.mh-o.height,0)/2+"px"
}if(c[1]&&(aj.get("loop")||c[M+1])){o.style.cursor="pointer";
o.onclick=function(){Q.next()
}
}o.style.width=o.width+"px";
o.style.height=o.height+"px";
aq(o)
},1)
});
o.src=ar
}else{if(ar){k.load(ar,aj.get("data"),function(aw,av){if(au===H){aq(av==="error"?K(ai,"Error").html(aj.get("xhrError")):N(this).contents())
}})
}}}}}}Q.next=function(){if(!ad&&c[1]&&(aj.get("loop")||c[M+1])){M=G(1);
f(c[M])
}};
Q.prev=function(){if(!ad&&c[1]&&(aj.get("loop")||M)){M=G(-1);
f(c[M])
}};
Q.close=function(){if(E&&!R){R=true;
E=false;
I(w);
aj.get("onCleanup");
af.unbind("."+X);
V.fadeTo(aj.get("fadeOut")||0,0);
al.stop().fadeTo(aj.get("fadeOut")||0,0,function(){al.hide();
V.hide();
I(i);
S.remove();
setTimeout(function(){R=false;
I(ah);
aj.get("onClosed")
},1)
})
}};
Q.remove=function(){if(!al){return
}al.stop();
N[x].close();
al.stop(false,true).remove();
V.remove();
R=false;
al=null;
N("."+s).removeData(x).removeClass(s);
N(l).unbind("click."+X).unbind("keydown."+X)
};
Q.element=function(){return N(aj.el)
};
Q.settings=P
}(jQuery,document,window));;/* /assets/script/phoenix/phoenix_form_popup.js *//**
 * 链接组件弹窗表单
 */
(function(window, $, undefined){
	// 前台全局命名空间
    var phoenixSite = window.phoenixSite || (window.phoenixSite = {});
    var name = "linkPopUp";
    var form = phoenixSite[name] || (phoenixSite[name] = {});
	var popAjaxLoading = false;
    form.version = "1.0.0";
    // 弹窗方法
    $.extend(form, {
    	popup: function(formId, formName, redirectUrl, pageId, resultPage,style=''){
			if (popAjaxLoading) return;
			popAjaxLoading = true;
    		var curBackendPageId;
    		if(!!!redirectUrl){
    			curBackendPageId = phoenixSite.page._pId;
    		}
    		 var productId = "";
    		 var articleId = "";
    		 var skuParam = "";
    		 var quantity = "";
    		 var inquireParam = {};
    		 var inquireParams;
    		 var array = new Array();
    		 var productIdHidden = $(".linkPopupForm_idHidden_product");
    		 var articleIdHidden = $(".linkPopupForm_idHidden_article");
    		 if (productIdHidden.length>=1) {
    			 productId = $(productIdHidden).attr("value");
    			 skuParam = $(".linkPopupForm_skuHidden").attr("value");
    			 quantity = $(".order-quan-input").attr("value");
    			 var inquireParam = {
    					 'prodId': productId,
    					 'skuParam': skuParam,
    					 'quantity': quantity
    			 };
    			 array.push(inquireParam);
    			 inquireParams = $.toJSON(array);
    		 }
    		 if (articleIdHidden.length>=1) {
    			 articleId = $(articleIdHidden).attr("value");
    		 }
    		 var date = new Date();
		     var currentdate = date.getTime().toString();
		     if(!!!redirectUrl){
		    	 var data = {
		     			'formId': formId,
		     			'formName': formName,
		     			'resultPage': resultPage,
		     			'productId': productId,
		     			'articleId': articleId,
		     			'inquireParams': inquireParams,
		     			'cur_backend_pageId': curBackendPageId,
		     			'currentdate': "t_" + currentdate,
					 	'style':JSON.stringify(style),
		              }
		     }else{
		    	 var data = {
			     			'formId': formId,
			     			'formName': formName,
			     			'resultPage': resultPage,
			     			'productId': productId,
			     			'articleId': articleId,
			     			'inquireParams': inquireParams,
			     			'redirectUrl': redirectUrl,
			     			'cur_backend_pageId': pageId,
			     			'currentdate': "t_" + currentdate,
					 		'style': JSON.stringify(style),
				 }
		     }
             var _options = {
                 url: '/phoenix/admin/linkForm/popup',
                 type: 'post',
                 data: data,
                 done: function(xhr){
	    			 $('#link_form_popup_div').remove();
	                 $('body').append(xhr);
	                 $("#link_form_popup_div").fadeIn();
					 popAjaxLoading = false;
	               //模拟添加按钮消除手机端因为绝对定位或是固定定位软键盘弹起产生的定位影响
					if($(".pop-inquire .pop-main .control-group.submitGroup").length>0 && $("#formsubmitClone").length == 0){
	             		var submitGroupAdd = $(".pop-inquire .pop-main .control-group.submitGroup").clone();
	                 	$(".pop-inquire .pop-box").append(submitGroupAdd);
	                 	if($(".pop-inquire .pop-box>.submitGroup").find("button").length == 1){
	                 		$(".pop-inquire .pop-box>.submitGroup").find("button").eq(0).attr("id","formsubmitClone");
	                 	}
	                 	if($(".pop-inquire .pop-box>.submitGroup").find("button").length == 2){
	                 		$(".pop-inquire .pop-box>.submitGroup").find("button").eq(0).attr("id","formsubmitClone");
	                 		$(".pop-inquire .pop-box>.submitGroup").find("button").eq(1).attr("id","formresetClone")
	                 	}
	             	}
                 },
				 fail: function(xhr, textStatus, errorThrown){
					 // 请求失败时的处理逻辑
					 console.log("请求失败: " + textStatus + ", " + errorThrown);
					 popAjaxLoading = false;
				 }
             }
             phoenixSite.ajax(_options);
           //按钮点击委托
             //提交
             $(document).on("click","#formsubmitClone",function(ev){
             	$(".form_inquire_popup #formsubmit").click();
             })
             //重置
             $(document).on("click","#formresetClone",function(ev){
             	$(".form_inquire_popup #formreset").click();
             })
    	}
    })
})(window, jQuery);;/* /assets/script/phoenix/phoenix_picture_popup.js */"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * 链接组件弹窗表单
 */
(function (window, $, undefined) {
	// 前台全局命名空间
	var phoenixSite = window.phoenixSite || (window.phoenixSite = {});
	var name = "linkPopUp";
	var picture = phoenixSite[name] || (phoenixSite[name] = {});
	picture.version = "1.0.0"; // 弹窗方法

	$.extend(picture, {
		popPicUp: function popPicUp(picUrl) {
			var popImgBox = '<div class="imgPopBox">';
			popImgBox += '<div class="imgPopWrap">';
			popImgBox += '<div class="imgPopMain">';
			popImgBox += '<div class="imgLoading">';
			popImgBox += '</div>';
			popImgBox += '<span class="imgPopClose hide">';
			popImgBox += '<i class="fa fa-close">';
			popImgBox += '</i>';
			popImgBox += '</span>';
			popImgBox += '<img src=' + picUrl + '>';
			popImgBox += '</img>';
			popImgBox += '</div>';
			popImgBox += '</div>';
			popImgBox += '</div>';
			$('body').append(popImgBox);
			$('body .imgPopBox img').on('load', function () {
				$(this).siblings('.imgLoading').eq(0).hide();
				$(this).siblings('.imgPopClose').eq(0).show();
			});
			/**
			 * NonameGesture v1.0.0
			 * 使用PointerEvent实现的手势库
			 * @param {HTMLElement} element 绑定事件的元素
			 * @param {object} options 配置项
			 */

			function NonameGesture(element, options) {
				this.element = element; // 绑定事件的元素

				this.options = options; // 配置项

				this.point1 = {
					x: 0,
					y: 0
				}; // 第一个触摸点位置

				this.point2 = {
					x: 0,
					y: 0
				}; // 第二个触摸点位置

				this.lastPoint1 = {
					x: 0,
					y: 0
				}; // 上一次第一个触摸点位置

				this.lastPoint2 = {
					x: 0,
					y: 0
				}; // 上一次第二个触摸点位置

				this.distance = {
					x: 0,
					y: 0
				}; // 移动距离

				this.lastDistance = {
					x: 0,
					y: 0
				}; // 上一次移动距离

				this.lastPointermove = {
					x: 0,
					y: 0
				}; // 上一次移动位置

				this.lastCenter = {
					x: 0,
					y: 0
				}; // 上一次中心位置

				this.tapCount = 0; // 点击计数器

				this.points = []; // 移动位置数组 长度20 用于计算是否触发swipe

				this.pointers = []; // 触摸点数组

				this.dragDirection = ''; // 拖拽方向

				this.isPointerdown = false; // 按下标识

				this.singleTapTimeout = null; // 单击延时器

				this.longTapTimeout = null; // 长按延时器
				// 绑定事件

				this.bindEventListener();
			}
			/**
			 * 处理pointerdown
			 * @param {PointerEvent} e
			 */


			NonameGesture.prototype.handlePointerdown = function (e) {
				// 如果是鼠标点击，只响应左键
				if (e.pointerType === 'mouse' && e.button !== 0) {
					return;
				}

				this.pointers.push(e);
				this.point1.x = this.pointers[0].clientX;
				this.point1.y = this.pointers[0].clientY;

				if (this.pointers.length === 1) {
					this.isPointerdown = true;
					this.element.setPointerCapture(e.pointerId);
					this.tapCount++;
					this.dragDirection = '';
					this.points.length = 0;
					clearTimeout(this.singleTapTimeout);
					this.distance.x = 0;
					this.distance.y = 0;
					this.lastDistance.x = 0;
					this.lastDistance.y = 0;
					this.lastPointermove.x = this.pointers[0].clientX;
					this.lastPointermove.y = this.pointers[0].clientY; // 双击两次距离不超过30

					if (this.tapCount > 1) {
						if (Math.abs(this.point1.x - this.lastPoint1.x) > 30 || Math.abs(this.point1.y - this.lastPoint1.y) > 30) {
							this.tapCount = 1;
						}
					}

					if (this.tapCount === 1) {
						// 按住500ms触发长按事件
						var that = this;
						this.longTapTimeout = setTimeout(function () {
							that.tapCount = 0;

							if (that.options.longTap) {
								that.options.longTap(e);
							}
						}, 500);
					}
				} else if (this.pointers.length === 2) {
					this.tapCount = 0;
					clearTimeout(this.longTapTimeout);
					this.point2.x = this.pointers[1].clientX;
					this.point2.y = this.pointers[1].clientY;
					this.lastPoint2.x = this.pointers[1].clientX;
					this.lastPoint2.y = this.pointers[1].clientY;
					this.lastDistance.x = this.distance.x;
					this.lastDistance.y = this.distance.y;
					var center = this.getCenter(this.point1, this.point2);
					this.lastCenter.x = center.x;
					this.lastCenter.y = center.y;
				}

				this.lastPoint1 = {
					x: this.pointers[0].clientX,
					y: this.pointers[0].clientY
				};

				if (this.options.pointerdown) {
					this.options.pointerdown(e);
				}
			};
			/**
			 * 处理pointermove
			 * @param {PointerEvent} e
			 */


			NonameGesture.prototype.handlePointermove = function (e) {
				if (!this.isPointerdown) {
					return;
				}

				this.handlePointers(e, 'update');
				var current1 = {
					x: this.pointers[0].clientX,
					y: this.pointers[0].clientY
				};

				if (this.pointers.length === 1) {
					this.distance.x = current1.x - this.point1.x + this.lastDistance.x;
					this.distance.y = current1.y - this.point1.y + this.lastDistance.y; // 偏移量大于10表示移动

					if (Math.abs(this.distance.x) > 10 || Math.abs(this.distance.y) > 10) {
						this.tapCount = 0;
						clearTimeout(this.longTapTimeout);

						if (this.dragDirection === '') {
							this.dragDirection = this.getDragDirection();
						}
					}

					this.points.unshift({
						x: current1.x,
						y: current1.y,
						timeStamp: e.timeStamp
					});

					if (this.points.length > 20) {
						this.points.pop();
					} // drag


					this.handleDrag(e, current1);
					this.lastPointermove.x = current1.x;
					this.lastPointermove.y = current1.y;
				} else if (this.pointers.length === 2) {
					var current2 = {
						x: this.pointers[1].clientX,
						y: this.pointers[1].clientY
					};
					var center = this.getCenter(current1, current2);
					e._centerX = center.x;
					e._centerY = center.y;
					e._lastCenterX = this.lastCenter.x;
					e._lastCenterY = this.lastCenter.y; // rotate

					this.handleRotate(e, current1, current2); // pinch

					this.handlePinch(e, current1, current2);
					this.lastPoint1.x = current1.x;
					this.lastPoint1.y = current1.y;
					this.lastPoint2.x = current2.x;
					this.lastPoint2.y = current2.y;
					this.lastCenter.x = center.x;
					this.lastCenter.y = center.y;
				}

				if (this.options.pointermove) {
					this.options.pointermove(e);
				} // 阻止默认行为，例如图片拖拽


				e.preventDefault();
			};
			/**
			 * 处理pointerup
			 * @param {PointerEvent} e
			 */


			NonameGesture.prototype.handlePointerup = function (e) {
				if (!this.isPointerdown) {
					return;
				}

				this.handlePointers(e, 'delete');

				if (this.pointers.length === 0) {
					this.isPointerdown = false;
					clearTimeout(this.longTapTimeout);

					if (this.tapCount === 0) {
						this.handleSwipe(e);
					} else {
						if (this.options.tap) {
							this.options.tap(e);
						}

						if (this.tapCount === 1) {
							this.singleTapTimeout = setTimeout(function () {
								this.tapCount = 0;

								if (this.options.singleTap) {
									this.options.singleTap(e);
								}
							}, 250);
						} else if (this.tapCount > 1) {
							this.tapCount = 0;

							if (this.options.doubleTap) {
								this.options.doubleTap(e);
							}
						}
					}
				} else if (this.pointers.length === 1) {
					this.point1.x = this.pointers[0].clientX;
					this.point1.y = this.pointers[0].clientY;
					this.lastPointermove.x = this.pointers[0].clientX;
					this.lastPointermove.y = this.pointers[0].clientY;
				}

				if (this.options.pointerup) {
					this.options.pointerup(e);
				}
			};
			/**
			 * 处理pointercancel
			 * @param {PointerEvent} e
			 */


			NonameGesture.prototype.handlePointercancel = function (e) {
				this.isPointerdown = false;
				this.tapCount = 0;
				clearTimeout(this.longTapTimeout);
				this.pointers.length = 0;

				if (this.options.pointercancel) {
					this.options.pointercancel(e);
				}
			};
			/**
			 * 更新或删除指针
			 * @param {PointerEvent} e
			 * @param {string} type update delete
			 */


			NonameGesture.prototype.handlePointers = function (e, type) {
				for (var i = 0; i < this.pointers.length; i++) {
					if (this.pointers[i].pointerId === e.pointerId) {
						if (type === 'update') {
							this.pointers[i] = e;
						} else if (type === 'delete') {
							this.pointers.splice(i, 1);
						}
					}
				}
			};
			/**
			 * 获取拖拽方向
			 * @returns
			 */


			NonameGesture.prototype.getDragDirection = function () {
				var dragDirection = '';

				if (Math.abs(this.distance.x) > Math.abs(this.distance.y)) {
					dragDirection = this.distance.x > 0 ? 'right' : 'left';
				} else {
					dragDirection = this.distance.y > 0 ? 'down' : 'up';
				}

				return dragDirection;
			};
			/**
			 * 处理拖拽
			 * @param {PointerEvent} e
			 * @param {object} a 第一个点的位置
			 */


			NonameGesture.prototype.handleDrag = function (e, a) {
				e._dragDirection = this.dragDirection;
				e._diffX = a.x - this.lastPointermove.x;
				e._diffY = a.y - this.lastPointermove.y;
				e._distanceX = a.x - this.point1.x + this.lastDistance.x;
				e._distanceY = a.y - this.point1.y + this.lastDistance.y;

				if (this.options.drag) {
					this.options.drag(e);
				}
			};
			/**
			 * 处理swipe
			 * @param {PointerEvent} e
			 */


			NonameGesture.prototype.handleSwipe = function (e) {
				var MIN_SWIPE_DISTANCE = 20;
				var x = 0,
					y = 0; // 如果200ms内移动距离大于20

				var _iterator = _createForOfIteratorHelper(this.points),
					_step;

				try {
					for (_iterator.s(); !(_step = _iterator.n()).done;) {
						var item = _step.value;

						if (e.timeStamp - item.timeStamp < 200) {
							x = e.clientX - item.x;
							y = e.clientY - item.y;
						} else {
							break;
						}

						;
					}
				} catch (err) {
					_iterator.e(err);
				} finally {
					_iterator.f();
				}

				if (Math.abs(x) > MIN_SWIPE_DISTANCE || Math.abs(y) > MIN_SWIPE_DISTANCE) {
					if (Math.abs(x) > Math.abs(y)) {
						e._swipeDirection = x > 0 ? 'right' : 'left';
					} else {
						e._swipeDirection = y > 0 ? 'down' : 'up';
					}

					if (this.options.swipe) {
						this.options.swipe(e);
					}
				}
			};
			/**
			 * 处理rotate
			 * @param {PointerEvent} e
			 * @param {object} a 第一个点的位置
			 * @param {object} b 第二个点的位置
			 */


			NonameGesture.prototype.handleRotate = function (e, a, b) {
				e._rotate = this.getAngle(a, b) - this.getAngle(this.lastPoint1, this.lastPoint2);

				if (this.options.rotate) {
					this.options.rotate(e);
				}
			};
			/**
			 * 处理pinch
			 * @param {PointerEvent} e
			 * @param {object} a 第一个点的位置
			 * @param {object} b 第二个点的位置
			 */


			NonameGesture.prototype.handlePinch = function (e, a, b) {
				e._scale = this.getDistance(a, b) / this.getDistance(this.lastPoint1, this.lastPoint2);

				if (this.options.pinch) {
					this.options.pinch(e);
				}
			};
			/**
			 * 鼠标滚轮缩放
			 * @param {WheelEvent} e
			 */


			NonameGesture.prototype.handleWheel = function (e) {
				e._scale = 1.1;

				if (e.deltaY > 0) {
					e._scale = 1 / 1.1;
				}

				if (this.options.wheel) {
					this.options.wheel(e);
				}
			};
			/**
			 * 绑定事件
			 */


			NonameGesture.prototype.bindEventListener = function () {
				this.handlePointerdown = this.handlePointerdown.bind(this);
				this.handlePointermove = this.handlePointermove.bind(this);
				this.handlePointerup = this.handlePointerup.bind(this);
				this.handlePointercancel = this.handlePointercancel.bind(this);
				this.handleWheel = this.handleWheel.bind(this);
				this.element.addEventListener('pointerdown', this.handlePointerdown);
				this.element.addEventListener('pointermove', this.handlePointermove);
				this.element.addEventListener('pointerup', this.handlePointerup);
				this.element.addEventListener('pointercancel', this.handlePointercancel);
				this.element.addEventListener('wheel', this.handleWheel);
			};
			/**
			 * 解绑事件
			 */


			NonameGesture.prototype.unbindEventListener = function () {
				this.element.removeEventListener('pointerdown', this.handlePointerdown);
				this.element.removeEventListener('pointermove', this.handlePointermove);
				this.element.removeEventListener('pointerup', this.handlePointerup);
				this.element.removeEventListener('pointercancel', this.handlePointercancel);
				this.element.removeEventListener('wheel', this.handleWheel);
			};
			/**
			 * 销毁
			 */


			NonameGesture.prototype.destroy = function () {
				this.unbindEventListener();
			};
			/**
			 * 获取旋转角度
			 * @param {object} a 第一个点的位置
			 * @param {object} b 第二个点的位置
			 * @returns
			 */


			NonameGesture.prototype.getAngle = function (a, b) {
				var x = a.x - b.x;
				var y = a.y - b.y;
				return Math.atan2(y, x) * 180 / Math.PI;
			};
			/**
			 * 获取两点距离
			 * @param {object} a 第一个点的位置
			 * @param {object} b 第二个点的位置
			 * @returns
			 */


			NonameGesture.prototype.getDistance = function (a, b) {
				var x = a.x - b.x;
				var y = a.y - b.y;
				return Math.hypot(x, y); // Math.sqrt(x * x + y * y);
			};
			/**
			 * 获取两点中心点
			 * @param {object} a 第一个点的位置
			 * @param {object} b 第二个点的位置
			 * @returns
			 */


			NonameGesture.prototype.getCenter = function (a, b) {
				var x = (a.x + b.x) / 2;
				var y = (a.y + b.y) / 2;
				return {
					x: x,
					y: y
				};
			};
			/**
			 * 获取图片缩放尺寸
			 * @param {number} naturalWidth 图片自然宽度
			 * @param {number} naturalHeight 图片自然高度
			 * @param {number} maxWidth 最大显示宽度
			 * @param {number} maxHeight 最大显示高度
			 * @returns
			 */


			NonameGesture.prototype.getImgSize = function (naturalWidth, naturalHeight, maxWidth, maxHeight) {
				var imgRatio = naturalWidth / naturalHeight;
				var maxRatio = maxWidth / maxHeight;
				var width, height; // 如果图片实际宽高比例 >= 显示宽高比例

				if (imgRatio >= maxRatio) {
					if (naturalWidth > maxWidth) {
						width = maxWidth;
						height = maxWidth / naturalWidth * naturalHeight;
					} else {
						width = naturalWidth;
						height = naturalHeight;
					}
				} else {
					if (naturalHeight > maxHeight) {
						width = maxHeight / naturalHeight * naturalWidth;
						height = maxHeight;
					} else {
						width = naturalWidth;
						height = naturalHeight;
					}
				}

				return {
					width: width,
					height: height
				};
			}; // 全局变量


			var result,
				maxScale,
				minScale = 0.5,
				x,
				y,
				scale = 1,
				_rotate = 0;
			var image = document.querySelector('.imgPopBox .imgPopMain img');
			image.addEventListener('load', init);

			function init() {
				var gesture = new NonameGesture(image, {
					doubleTap: function doubleTap(e) {
						var ratio = 1 / scale;

						if (scale <= 1) {
							ratio = maxScale / scale;
						}

						var origin = {
							x: (ratio - 1) * result.width * 0.5,
							y: (ratio - 1) * result.height * 0.5
						};
						x -= (ratio - 1) * (e.clientX - x) - origin.x;
						y -= (ratio - 1) * (e.clientY - y) - origin.y;
						scale *= ratio;
						image.style.transition = 'transform 300ms';
						image.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0px) scale(' + scale + ') rotate(' + _rotate + 'deg)';
					},
					drag: function drag(e) {
						x += e._diffX;
						y += e._diffY;
						image.style.transition = 'none';
						image.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0px) scale(' + scale + ') rotate(' + _rotate + 'deg)';
					},
					rotate: function rotate(e) {
						// transform-origin相对于视口左上角的坐标
						var origin = {
							x: result.width * 0.5 + x,
							y: result.height * 0.5 + y
						}; // 以双指中心为原点(0, 0)，计算transform-origin的相对坐标

						var a = {
							x: origin.x - e._centerX,
							y: e._centerY - origin.y
						}; // 计算点a绕双指中心(0, 0)旋转e._rotate度后点b的坐标

						var b = {
							x: (a.x - 0) * Math.cos(e._rotate * Math.PI / 180) + (a.y - 0) * Math.sin(e._rotate * Math.PI / 180) + 0,
							y: (a.x - 0) * Math.sin(e._rotate * Math.PI / 180) - (a.y - 0) * Math.cos(e._rotate * Math.PI / 180) + 0
						};
						_rotate = (_rotate + e._rotate) % 360;
						x -= a.x - b.x;
						y += a.y + b.y;
					},
					pinch: function pinch(e) {
						// 缩放比例，计算宽高width *= e._scale; height *= e._scale;
						var _scale = scale * e._scale;

						if (_scale > maxScale) {
							e._scale = maxScale / scale;
							scale = maxScale;
						} else if (_scale < minScale) {
							e._scale = minScale / scale;
							scale = minScale;
						} else {
							scale = _scale;
						} // 计算图片中心偏移量，默认transform-origin: 50% 50%
						// 如果transform-origin: 30% 40%，那origin.x = (e._scale - 1) * result.width * 0.3
						// origin.y = (e._scale - 1) * result.height * 0.4
						// 如果通过修改宽高或使用transform缩放，但将transform-origin设置为左上角时。
						// 可以不用计算origin，因为(e._scale - 1) * result.width * 0 = 0


						var origin = {
							x: (e._scale - 1) * result.width * 0.5,
							y: (e._scale - 1) * result.height * 0.5
						};
						x -= (e._scale - 1) * (e._centerX - x) - origin.x - (e._centerX - e._lastCenterX);
						y -= (e._scale - 1) * (e._centerY - y) - origin.y - (e._centerY - e._lastCenterY);
						image.style.transition = 'none';
						image.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0px) scale(' + scale + ') rotate(' + _rotate + 'deg)';
					},
					wheel: function wheel(e) {
						var _scale = scale * e._scale;

						if (_scale > maxScale) {
							e._scale = maxScale / scale;
							scale = maxScale;
						} else if (_scale < minScale) {
							e._scale = minScale / scale;
							scale = minScale;
						} else {
							scale = _scale;
						}

						var origin = {
							x: (e._scale - 1) * result.width * 0.5,
							y: (e._scale - 1) * result.height * 0.5
						}; // 以鼠标位置为中心，计算缩放偏移量

						x -= (e._scale - 1) * (e.clientX - x) - origin.x;
						y -= (e._scale - 1) * (e.clientY - y) - origin.y;
						image.style.transition = 'none';
						image.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0px) scale(' + scale + ') rotate(' + _rotate + 'deg)';
						e.preventDefault();
					}
				}); // 图片初始信息

				result = gesture.getImgSize(image.naturalWidth, image.naturalHeight, window.innerWidth * 0.9, window.innerHeight * 0.9);
				image.style.width = result.width + 'px';
				image.style.height = result.height + 'px';
				x = (window.innerWidth - result.width) * 0.5;
				y = (window.innerHeight - result.height) * 0.5;
				image.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0px) scale(1) rotate(' + _rotate + 'deg)';
				maxScale = Math.max(Math.round(image.naturalWidth / result.width), 3);
				$('.imgPopClose').on('click', function (e) {
					// e.stopPropagation();
					$('.imgPopBox').remove();
				});
			}
		}
	});
})(window, jQuery);;