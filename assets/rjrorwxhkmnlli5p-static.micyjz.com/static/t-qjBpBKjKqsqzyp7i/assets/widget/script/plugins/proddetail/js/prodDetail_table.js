function tableScroll(f){if(f&&f.indexOf("sitewidget-graphicNew")===-1){var h=$(f);
prodDetailRichTextTableScroll(h);
var b=h.find("table").not(".tinymce-render-box table").not(".contentEditRichText_editorContainer table");
var a;
var e="8.0";
var c=navigator.userAgent.toLowerCase();
var d=c.indexOf("msie")>-1;
var g;
if(d){g=c.match(/msie ([\d.]+)/)[1]
}if(!b.length){return
}b.each(function(o){var l=$(this);
var t=l.width();
var s=l.height();
var u=l.parent(".inner").length;
var v=l.parents(".sliderTable").length;
if(!u&&!v){l.wrap('<div class="sliderTable mt10 mb10 sliderTable-index'+o+'"><div class="inner"></div></div>')
}else{if(u&&!v){l.parent(".inner").wrap('<div class="sliderTable mt10 mb10 sliderTable-index'+o+'"></div>')
}else{if(!u&&v){l.wrap('<div class="inner"></div>')
}}}if(l.parents(".sliderTable").hasClass("change-to-org")||s<=12){return
}if(!l.parent(".inner").siblings(".inner-zoom").length){l.parent(".inner").after('<span class="inner-zoom hide"><i class="fa fa-search-plus"></i></span>')
}var n=l.parents(".sliderTable-index"+o);
var w=0;
if(h.find(".detial-cont-tabscont").length&&!h.parents(".sitewidget-bd").hasClass("prodDetail-tab-hover-event")){w=20
}else{if(h.find(".detial-cont-notabscont").length){w=30
}}var p=h.width()-w;
var m=1;
var j=$(".prodDailTableResponsePC").length;
var k=$(".prodDailTableResponseMo").length;
function q(i){if(i==1){l.css("width","max-content")
}else{l.css("width","100%")
}}q(j);
if(p<=380){m=p/(t+10);
l.parent(".inner").siblings(".inner-zoom").removeClass("hide");
n.css({height:m*s+10,overflow:"hidden"});
l.parent(".inner").css({height:m*s+4,overflow:"hidden"});
l.css({transform:"scale("+m+")","transform-origin":"left top"});
q(k)
}n.find(".inner-zoom").unbind("click").bind("click",function(){n.addClass("change-to-org");
n.removeAttr("style");
l.parent(".inner").removeAttr("style");
l.removeAttr("style");
$(this).remove();
q(k)
});
var r=$(".prodDailTableIconDisplay").length;
if(r==0){n.find(".inner-zoom").click()
}})
}}function prodDetailRichTextTableScroll(a){a.find(".contentEditRichText_editorContainer .tableWrapper > table").not(".contentEditRichText_editorContainer section table").each(function(){var l=$(this);
var f=l.parent(".tableWrapper");
var h=l.closest(".detial-cont-prodescription");
var i=h.closest(".sitewidget-proddetail").closest(".backstage-stwidgets-settingwrap");
if(!f.length||!h.length||!i.children(".prodDailTableIconDisplay").length||f.data("prodDetailRichTextTableZoom")||f.data("prodDetailRichTextTableExpanded")||!l.is(":visible")){return
}var j=h.find(".detial-cont-tabscont").length&&!h.parents(".sitewidget-bd").hasClass("prodDetail-tab-hover-event")?20:(h.find(".detial-cont-notabscont").length?30:0);
var b=h.width()-j;
var k=Math.min(b,f.width());
var g=l.outerWidth();
var c=l.outerHeight();
if(b>380||k<=0||g<=k||c<=12){return
}var d=f[0].style;
var e=k/g;
d.setProperty("--prod-detail-table-scale",e);
d.setProperty("--prod-detail-table-height",Math.max(c*e+10,50)+"px");
f.data("prodDetailRichTextTableZoom",true).addClass("prod-detail-rich-table-zoom");
$('<span class="prod-detail-rich-table-zoom-icon"><i class="fa fa-search-plus"></i></span>').appendTo(f).one("click",function(){f.removeData("prodDetailRichTextTableZoom").data("prodDetailRichTextTableExpanded",true).removeClass("prod-detail-rich-table-zoom");
d.removeProperty("--prod-detail-table-scale");
d.removeProperty("--prod-detail-table-height");
$(this).remove()
})
})
};