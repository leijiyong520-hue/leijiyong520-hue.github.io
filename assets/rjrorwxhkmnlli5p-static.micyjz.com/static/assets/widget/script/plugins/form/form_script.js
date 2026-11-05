(function(window,$,undefined){var phoenixSite=window.phoenixSite||(window.phoenixSite={});
var form=phoenixSite.form||(phoenixSite.form={});
var _options={};
var isFrontend=window.$_phoenix==undefined;
var opColor=phoenixSite.opColor||(phoenixSite.opColor={});
!phoenixSite.opColor.getOppositeColor&&$.extend(opColor,{getOppositeColor:function(colorVal){var sColorChange=[];
var reg=/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
if(undefined==colorVal){return
}if(/^(rgba|RGBA|rgb|RGB)/.test(colorVal)){var aColor=colorVal.replace(/(?:\(|\)|rgba|RGBA|rgb|RGB)*/g,"").split(",");
for(var i=0;
i<3;
i++){sColorChange.push(aColor[i])
}}else{if(reg.test(colorVal)){var sColor=colorVal.toLowerCase();
if(sColor.length===4){var sColorNew="#";
for(var i=1;
i<4;
i+=1){sColorNew+=sColor.slice(i,i+1).concat(sColor.slice(i,i+1))
}sColor=sColorNew
}for(var i=1;
i<7;
i+=2){sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)))
}}}var rgb={r:sColorChange[0],g:sColorChange[1],b:sColorChange[2]};
var fontColor=(0.213*rgb.r+0.715*rgb.g+0.072*rgb.b)<100?"#FFF":"#000";
return fontColor
}});
$.extend(form,{init:function(options){$.extend(_options,options);
var _options=options;
var $_widgetClass=$("."+_options.widgetClass);
var bdArea=$_widgetClass.find(".sitewidget-bd");
$(function(){tableScroll("."+_options.widgetClass+".sitewidget-bd")
});
var hasProduct=false;
var showCode=_options.isShow;
var verifyCodeRes;
if(_options.products){hasProduct=true
}var widget=_options.widgetClass;
(function(settingId){$("#component_"+settingId+"").find("input").each(function(){var this_=$(this);
this_.on("focus",function(){if(!$("#component_"+settingId+"").find(".refreshImg").attr("isFocused")){phoenixSite.faptcha.reload("component_"+settingId+"");
$("#component_"+settingId+"").find(".refreshImg").attr("isFocused","true")
}})
})
})(_options.settingId);
$("."+widget+" form").find(".error-tip-msg").html(_options.component_phoenix_from_max_upload);
if($("."+widget).find("form.form-line-5").length>0&&$("."+widget+" :file").length>0){var $fileList=$("."+widget+" :file");
$fileList.each(function(){var _id=$(this).attr("id");
var $div=$("<div>").addClass("other-form-file-list").attr("id","other-file-list-"+_id);
$div.append('<p class="error-tip-msg hide">'+_options.component_phoenix_from_max_upload+"</p>");
$("."+widget).find("form.form-line-5").find("fieldset").append($div)
});
$("."+widget+" .other-form-file-list:eq(0)").addClass("first-file-list")
}var titleText=$("."+widget+" .sitewidget-bd").find("legend").text();
$("."+widget+" .sitewidget-bd").find("legend").hide();
if(titleText&&titleText!=""){var htmlTit="<h2>"+titleText+"</h2>";
$("."+widget+" .sitewidget-hd").append(htmlTit)
}if(_options.component_isFixed&&_options.component_isFixed=="1"||_options.component_isFixed&&_options.component_isFixed=="3"){if(titleText){$(".form_fixed_button span").text(titleText);
$(".form_fixed_button_1 span").text(titleText)
}else{var shop_order_message_text=$(".form_fixed_button .shop_order_message").text();
var shop_order_message_text_1=$(".form_fixed_button_1 .shop_order_message").text();
$(".form_fixed_button span").text(shop_order_message_text);
$(".form_fixed_button_1 span").text(shop_order_message_text_1)
}}$("."+widget+" form").attr("action",_options._menu_prefix+"/phoenix/admin/form");
$("."+widget+" form").attr("method","post");
$("."+widget+" form").attr("target","coreIframe");
$("."+widget+" form").attr("enctype","multipart/form-data");
$("."+widget+" form").attr("novalidate","true");
$("."+widget+" form").attr("success",function(){});
$("."+widget+" form fieldset").prepend('<input type="hidden" name="resultPage" value="'+_options.component_page_id+'" >');
$("."+widget+" form fieldset").prepend('<input type="hidden" name="encodeFormId" value="'+_options.component_form_id+'" >');
$("."+widget+" form fieldset").append('<input type="hidden" id="paramsJson" name="paramsJson" value="" >');
$("."+widget+" form fieldset").append('<input type="hidden" id="resultFlag" name="resultFlag" value="'+_options.component_resultFlag+'" >');
$("."+widget+" form fieldset").append('<input type="hidden" name="componentPk" value="component_'+_options.settingId+'" >');
$("."+widget+" form fieldset").append('<input type="hidden" class="landedPage" name="landedPage" value="" >');
var localStorage_landedPage=localStorage.getItem("landedPage");
if(localStorage_landedPage!=undefined){$(".landedPage").each(function(){$(this).val(localStorage_landedPage)
})
}if(_options.component_showProd&&_options.component_showProd=="1"){if(_options.productId){$("."+widget+" form fieldset").append('<input type="hidden" name="relationId" value="'+_options.encypt_productId_resultId+'" >')
}if(_options.infoId){$("."+widget+" form fieldset").append('<input type="hidden" name="relationId" value="'+_options.encypt_infoId_resultId+'" >');
$("."+widget+" form fieldset").append('<input type="hidden" name="isArticle" value="1" >')
}else{if(_options.isArticle&&_options.article){$("."+widget+" form fieldset").append('<input type="hidden" name="relationId" value="'+_options.encodePkId+'" >');
$("."+widget+" form fieldset").append('<input type="hidden" name="isArticle" value="1" >')
}}if($("#productInfo").find("input[name='id']").length>0&&$("."+widget+" form fieldset").find("input[name='relationId']").length==0){var relationId=$("#productInfo").find("input[name='id']").val();
$("."+widget+" form fieldset").append('<input type="hidden" name="relationId" value="'+relationId+'" >')
}}$("."+widget+" form fieldset").append('<input type="hidden" name="pageId" value="'+_options.attr_backend_pageId+'" >');
$("."+widget+" form fieldset").append('<input type="hidden" name="Referer" value="'+_options.refererPage+'" >');
var parentPageUrl="";
var urlParams=new URLSearchParams(window.location.search);
var parentUrlParam=urlParams.get("parentUrl")||urlParams.get("currentPageUrl");
if(parentUrlParam){parentPageUrl=decodeURIComponent(parentUrlParam)
}else{try{if(window.parent&&window.parent!==window){parentPageUrl=window.parent.location.href
}else{parentPageUrl=window.location.href
}}catch(e){parentPageUrl=window.location.href
}}parentPageUrl=encodeURI(parentPageUrl);
$("."+widget+" form fieldset").append('<input type="hidden" name="currentPageUrl" value="'+parentPageUrl+'" >');
$("."+widget+" form .control-group:last").before($("."+widget+" #imgVarifyCode"));
if(_options.component_isFixed&&_options.component_isFixed=="1"||_options.component_isFixed&&_options.component_isFixed=="3"){$("."+widget+" form fieldset").after($("."+widget+" form .submitGroup"))
}if(_options.component_showProd&&_options.component_showProd=="1"&&_options.products){var jsonData=eval(_options.productsJson);
if($("."+widget+".new-inquire-table .cus-message-input").length&&jsonData.length){$($("."+widget+".new-inquire-table .cus-message-input").each(function(){var fieldKey=$(this).attr("name");
var index=$(this).attr("data-index");
var keyLabel=$(this).attr("data-label");
jsonData[index][fieldKey]={keyLabel:keyLabel,keyValue:""};
if(jsonData[index]["prodNewFlag"]==undefined){jsonData[index]["prodNewFlag"]="1"
}}))
}if($("."+widget+".new-inquire-table.sitewidget-inquire-table tbody>tr").length&&jsonData.length){$("."+widget+".new-inquire-table.sitewidget-inquire-table tbody>tr").each(function(_index){var sortNum={};
if(Object.keys(sortNum).length===0){$(".new-inquire-table.sitewidget-inquire-table th[data-key]").each(function(index,item){var key=$(item).attr("data-key");
sortNum[key]=index+1
})
}jsonData[_index]["sortNum"]=sortNum;
if(jsonData[_index]["prodNewFlag"]==undefined){jsonData[_index]["prodNewFlag"]="1"
}})
}$("."+widget+" input[name='paramsJson']").val(JSON.stringify(jsonData))
}$("."+widget+" input, ."+widget+" textarea").bind("blur",function(){if($(this).attr("id")&&$(this).attr("id").indexOf("extend")!="-1"){$(this).val($.trim($(this).val()));
checkInputLength(this)
}});
$("."+widget+" [required]").bind("blur",function(){checkEmpty(this)
});
$("."+widget+" .mailInput").bind("blur",function(){$(this).val($.trim($(this).val()));
checkMail(this)
});
$("."+widget+" .phoneInput").attr("oninput","");
$("."+widget+" .phoneInputprepend").attr("oninput","");
$("."+widget+" .phoneInput").bind("blur",function(){if($(this).siblings(".phoneInputprepend").length>0){checkPhone(this,$("."+widget+" .phoneInputprepend .phoneInputprepend"))
}else{checkPhone(this)
}});
$("."+widget+" .phoneInputprepend").bind("blur",function(){checkPhone2($("."+widget+" .phoneInputprepend .phoneInput"),this)
});
var thisWidget=$("."+widget);
var countrySelect=thisWidget.find("select[title='country']");
var countryAreachoose=thisWidget.find(".areachoose");
var countryPlaceholder="";
var form_no_search_option=thisWidget.find("#noSearchOption").val();
$("."+widget+" select.areachoose[required]").on("select2:close",function(){setTimeout(function(){checkEmpty(this)
}.bind(this),100)
});
function initSelect2(element,placeholder){if(element.length>0&&!element.hasClass("select2-hidden-accessible")&&typeof $.fn.select2!=="undefined"){try{var originalId=element.attr("id");
var tempId=originalId+"_"+thisWidget.attr("class").replace(/\s+/g,"_")+"_"+new Date().getTime();
element.attr("id",tempId);
element.select2({placeholder:placeholder||"Please select",language:{noResults:function(){return""
}},width:"100%",dropdownAutoWidth:true});
element.attr("id",originalId)
}catch(e){console.error("Select2 initialization error:",e)
}}}function destroySelect2(element){if(element.length>0&&element.hasClass("select2-hidden-accessible")){try{var originalId=element.attr("id");
var tempId=originalId+"_destroy_"+new Date().getTime();
element.attr("id",tempId);
element.select2("destroy");
element.attr("id",originalId)
}catch(e){console.error("Select2 destroy error:",e)
}}}if(isFrontend){if(countrySelect.length>0||countryAreachoose.length>0){var menuPrefix="";
var currentUrl=window.location.href;
var regex=/^https?:\/\/[^\/]+\/([^\/\.]+)(?:\/|$)/;
var match=currentUrl.match(regex);
if(match){menuPrefix=match[1]
}else{menuPrefix=""
}$.ajax({url:"/phoenix/admin/user/getCountries",type:"post",dataType:"json",data:{menuPrefix:menuPrefix},success:function(res){if(res.countriesList&&res.countriesList.length>0){countryPlaceholder=res.defaultDesc!=""?res.defaultDesc:"please select";
var options='<option value="">'+countryPlaceholder+"</option>";
if(!res.isTw&&res.lanCode){$.each(res.countriesList,function(i,obj){options+='<option value="'+obj.nameCN+'" data-key="'+obj.key+'">'+obj.nameCN+"</option>"
})
}else{if(!res.lanCode){$.each(res.countriesList,function(i,obj){options+='<option value="'+obj.nameEN+'" data-key="'+obj.key+'">'+obj.nameEN+"</option>"
})
}else{if(res.isTw){$.each(res.countriesList,function(i,obj){options+='<option value="'+obj.nameTW+'" data-key="'+obj.key+'">'+obj.nameTW+"</option>"
})
}}}countryAreachoose.html(options);
destroySelect2(countryAreachoose);
initSelect2(countryAreachoose,countryPlaceholder)
}}})
}}countrySelect.add(countryAreachoose).on("select2:select",function(){bdArea.find(".formplaceholder_option").remove();
if(thisWidget.find(".province").length>0){destroySelect2(thisWidget.find(".province"));
thisWidget.find(".province").remove();
if(thisWidget.find(".city").length>0){destroySelect2(thisWidget.find(".city"));
thisWidget.find(".city").remove()
}}var selectedOption=$(this).find("option:selected");
if(selectedOption.length>0){selectedOption.val(selectedOption.text())
}if($(this).val()){var _this=this;
$.ajax({url:"/phoenix/admin/user/getAllCountry",type:"post",dataType:"json",data:{province:$(this).find("option:selected").data("key")},success:function(res){if(res.provinceList&&res.provinceList.length>0){var selectDom='<select class="areachoose province"><option value="">'+countryPlaceholder+"</option>";
if(!res.isTw){$.each(res.provinceList,function(i,obj){selectDom+='<option value="'+obj.parameterValue+'" data-key="'+obj.parameterKey+'">'+obj.parameterValue+"</option>"
})
}else{$.each(res.provinceList,function(i,obj){selectDom+='<option value="'+obj.parameterValueTW+'" data-key="'+obj.parameterKey+'">'+obj.parameterValueTW+"</option>"
})
}selectDom+="</select>";
var select2Container=$(_this).next(".select2-container");
if(select2Container.length>0){select2Container.after(selectDom)
}else{$(_this).after(selectDom)
}var provinceSelect=select2Container.length>0?select2Container.next(".province"):$(_this).next(".province");
initSelect2(provinceSelect,countryPlaceholder)
}}})
}});
countrySelect.add(countryAreachoose).on("select2:clear",function(){bdArea.find(".formplaceholder_option").remove();
if(thisWidget.find(".province").length>0){destroySelect2(thisWidget.find(".province"));
thisWidget.find(".province").remove();
if(thisWidget.find(".city").length>0){destroySelect2(thisWidget.find(".city"));
thisWidget.find(".city").remove()
}}var selectedOption=$(this).find("option:selected");
if(selectedOption.length>0){selectedOption.val(selectedOption.text())
}});
thisWidget.on("select2:select",".province",function(){if(thisWidget.find(".city").length>0){destroySelect2(thisWidget.find(".city"));
thisWidget.find(".city").remove()
}var addVal="";
var countryVal=countrySelect.find("option:selected").text();
addVal+=countryVal;
if($(this).val()){var _this=this;
addVal+="_"+$(this).val();
if(countrySelect.find("option:selected").data("key")=="China"){$.ajax({url:"/phoenix/admin/user/getCity",type:"post",dataType:"json",data:{city:$(this).find("option:selected").data("key")},success:function(res){if(res.cityList&&res.cityList.length>0){var selectDom='<select class="areachoose city"><option value="">'+countryPlaceholder+"</option>";
if(!res.isTw){$.each(res.cityList,function(i,obj){selectDom+='<option value="'+obj.parameterValue+'" data-key="'+obj.parameterKey+'">'+obj.parameterValue+"</option>"
})
}else{$.each(res.cityList,function(i,obj){selectDom+='<option value="'+obj.parameterValueTW+'" data-key="'+obj.parameterKey+'">'+obj.parameterValueTW+"</option>"
})
}selectDom+="</select>";
var select2Container=$(_this).next(".select2-container");
if(select2Container.length>0){select2Container.after(selectDom)
}else{$(_this).after(selectDom)
}var citySelect=select2Container.length>0?select2Container.next(".city"):$(_this).next(".city");
initSelect2(citySelect,countryPlaceholder)
}}})
}}var countryOption=countrySelect.find("option:selected");
if(countryOption.length>0){countryOption.val(addVal);
countrySelect.trigger("change.select2")
}});
thisWidget.on("select2:clear",".province",function(){if(thisWidget.find(".city").length>0){destroySelect2(thisWidget.find(".city"));
thisWidget.find(".city").remove()
}var countryOption=countrySelect.find("option:selected");
if(countryOption.length>0){countryOption.val(countryOption.text());
countrySelect.trigger("change.select2")
}});
thisWidget.on("select2:select",".city",function(){var addVal="";
var countryVal=countrySelect.find("option:selected").text();
var privinceVal=thisWidget.find(".province").val();
addVal+=countryVal+"_"+privinceVal;
if($(this).val()){addVal+="_"+$(this).val()
}var countryOption=countrySelect.find("option:selected");
if(countryOption.length>0){countryOption.val(addVal);
countrySelect.trigger("change.select2")
}});
thisWidget.on("select2:clear",".city",function(){var addVal="";
var countryVal=countrySelect.find("option:selected").text();
var privinceVal=thisWidget.find(".province").val();
addVal+=countryVal+"_"+privinceVal;
var countryOption=countrySelect.find("option:selected");
if(countryOption.length>0){countryOption.val(addVal);
countrySelect.trigger("change.select2")
}});
if(hasProduct){$("."+widget+" .inquireDeleteBtn").click(function(){var position=$("."+widget+" #"+$(this).attr("value")).index();
$("."+widget+" #"+$(this).attr("value")).remove();
jsonData.splice(position,1);
$("."+widget+" #paramsJson").val(JSON.stringify(jsonData))
});
$("."+widget+" .proNum").each(function(){prodNumFunc(this)
});
$("."+widget+" .proNum").bind("change",function(){var value=$(this).val();
var unique_id=$(this).attr("unique_id");
var regex=/^[0-9]+$/;
if(!regex.test(value)){$("."+widget+" .proNum[unique_id='"+unique_id+"']").val(1)
}else{$("."+widget+" .proNum[unique_id='"+unique_id+"']").val(value)
}prodNumFunc(this);
try{initPrice()
}catch(err){console.error(err)
}try{addTablePriceData()
}catch(err){console.error(err)
}});
$("."+widget+" .cus-message-input").each(function(){cusKeysFunc(this)
});
$("."+widget+" .cus-message-input").bind("change",function(){cusKeysFunc(this)
});
$("."+widget+" .inquiry-minus").click(function(){var unique_id=$(this).siblings(".proNum").attr("unique_id");
var t_proNum=$("."+widget+" .proNum[unique_id='"+unique_id+"']");
var temp=+t_proNum.val()-1<1?1:+t_proNum.val()-1;
t_proNum.val(temp);
t_proNum.change()
});
$("."+widget+" .inquiry-plus").click(function(){var unique_id=$(this).siblings(".proNum").attr("unique_id");
var t_proNum=$("."+widget+" .proNum[unique_id='"+unique_id+"']");
t_proNum.val(+t_proNum.val()+1);
t_proNum.change()
})
}try{addTablePriceData()
}catch(err){console.error(err)
}$("."+widget+" #formreset").click(function(e){$("."+widget+" span#filename").empty();
$(".errgreater").remove();
$("."+widget+" form")[0].reset();
if(countrySelect.length>0&&countrySelect.hasClass("select2-hidden-accessible")){countrySelect.val("").trigger("change.select2")
}if(countryAreachoose.length>0&&countryAreachoose.hasClass("select2-hidden-accessible")){countryAreachoose.val("").trigger("change.select2")
}if(thisWidget.find(".province").length>0){thisWidget.find(".province").select2("destroy").remove()
}if(thisWidget.find(".city").length>0){thisWidget.find(".city").select2("destroy").remove()
}$("#formsubmit").removeClass("btn-disabeled")
});
if(isFrontend){var serialNumberDom=undefined;
var serialStatusDom=undefined;
function judgingCustomizedForms(){var sortMark=0;
$("."+widget+" form fieldset div label span:contains('Serial Number')").map(function(){if($(this).text()=="Serial Number"){sortMark=1;
serialNumberDom=$(this)
}});
$("."+widget+" form fieldset div label span:contains('Serial Number Status')").map(function(){if($(this).text()=="Serial Number Status"&&sortMark==1){serialStatusDom=$(this).parents(".control-group.control-multi-radio-inline");
serialStatusDom.css("display","none");
sortMark+=1
}});
fillingCustomeizedForms(sortMark);
return sortMark
}function fillingCustomeizedForms(flag){if(flag==2){var dateDom=$("."+widget+" form fieldset div label span:contains('Date of Installation')").parents(".control-group");
dateDom.find("input").attr({readonly:"readonly",onClick:"WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:'%y-%M-%d'})"});
dateDom.after($("#imgVarifyCode"))
}}var mark=judgingCustomizedForms();
$(document).on("keypress","."+widget+" form",function(event){if(event.keyCode=="13"&&event.target.nodeName!="TEXTAREA"){event.preventDefault();
$(this).find("#formsubmit").trigger("click")
}});
isLastData();
$("."+widget).find(".del-btn").on("click",function(){var num=0;
var needDeleteDom="";
if($(this).parents(".sitewidget-inquire-table").length>0){num=$("."+widget).find(".sitewidget-inquire-table").find("tbody").find("tr").length;
needDeleteDom=$(this).parent().parent().attr("id")
}else{if($(this).parents(".new_mobile_prod_inquiry_main").length>0){num=$("."+widget).find(".new_mobile_prod_inquiry_main").find(".new_mobile_prod_inquiry_item").length;
needDeleteDom=$(this).parents(".new_mobile_prod_inquiry_item").attr("data-unique_id")
}}if(num<=1){return
}else{$("."+widget).find(".sitewidget-inquire-table").find("tr#"+needDeleteDom).remove();
$("."+widget).find(".new_mobile_prod_inquiry_main").find('.new_mobile_prod_inquiry_item[data-unique_id="'+needDeleteDom+'"]').remove();
extraTableData();
isLastData()
}try{initPrice()
}catch(err){console.error(err)
}try{addTablePriceData()
}catch(err){console.error(err)
}});
function isLastData(){if($(".sitewidget-inquire-table").find("tbody").find("tr").length==1){$(".sitewidget-inquire-table").find("thead").find("tr").find(".optipn-title").css("display","none");
$(".sitewidget-inquire-table").find("tbody").find("tr").find(".optipn").css("display","none")
}if($(".new_mobile_prod_inquiry_main").find(".new_mobile_prod_inquiry_item").length==1){$(".new_mobile_prod_inquiry_main").find(".del-btn").css("display","none")
}}function extraTableData(){if($.trim($("#paramsJson").val())!=""){var jsonList=[];
var newList=[];
jsonList=JSON.parse($("#paramsJson").val());
$(".sitewidget-inquire-table").find("tbody").find("tr").each(function(){for(var i=0;
i<jsonList.length;
i++){if(jsonList[i].unique_id==$(this).attr("id")){newList.push(jsonList[i])
}}});
$("#paramsJson").val(JSON.stringify(newList))
}}function loadScript(src,callBack){$.ajax({url:window.location.protocol+src,type:"get",success:function(res){eval(res);
callBack()
}})
}function loadAnalytics(){var src;
if(window.MatomoTagManager){if(window.MatomoTagManager.containers.length>0){var tags=window.MatomoTagManager.containers[0].tags;
tags.forEach(function(item){if(item.name=="Analytics"){src=item.parameters.ldConfig.parameters.analyticsUrl||""
}})
}}if(!!src){var callBack=function(){if(window._ldDataLayer&&window._ldDataLayer.push){var p_sid=$.cookie("p_sid")||0;
var _eventUid=p_sid+"_"+_options.settingId+"_"+new Date().getTime();
window._ldDataLayer.push(["event","action_formSubmit","click","submit",$.trim($("."+widget+" .sitewidget-hd").text()),"",_eventUid]);
if($("."+widget+" form fieldset").find(".evuid").length>0){$("."+widget+" form fieldset").find(".evuid").remove()
}if($("."+widget+" form fieldset").find("._eventReferer").length>0){$("."+widget+" form fieldset").find("._eventReferer").remove()
}$("."+widget+" form fieldset").prepend('<input class="evuid" type="hidden" name="_eventUid" value="'+_eventUid+'">');
$("."+widget+" form fieldset").prepend('<input class="_eventReferer" type="hidden" name="_eventReferer" value="'+document.referrer+'">')
}};
loadScript(src,callBack)
}}$("."+widget+" #formsubmit").click(function(e){if(window._ldDataLayer&&window._ldDataLayer.push){var p_sid=$.cookie("p_sid")||0;
var _eventUid=p_sid+"_"+_options.settingId+"_"+new Date().getTime();
window._ldDataLayer.push(["event","action_formSubmit","click","submit",$.trim($("."+widget+" .sitewidget-hd").text()),"",_eventUid]);
if($("."+widget+" form fieldset").find(".evuid").length>0){$("."+widget+" form fieldset").find(".evuid").remove()
}if($("."+widget+" form fieldset").find("._eventReferer").length>0){$("."+widget+" form fieldset").find("._eventReferer").remove()
}$("."+widget+" form fieldset").prepend('<input class="evuid" type="hidden" name="_eventUid" value="'+_eventUid+'">');
$("."+widget+" form fieldset").prepend('<input class="_eventReferer" type="hidden" name="_eventReferer" value="'+document.referrer+'">')
}else{var src=$("script[src*='ltm-web.js']").attr("src");
if(src&&src!=""){loadScript(src,loadAnalytics)
}try{const regex=/(\/\/[^/]+)/;
const match=src.match(regex);
let timestamp=new Date().valueOf();
if(match){var url=match[0]+"/event-log?t="+timestamp;
$.ajax({url:url,type:"get"})
}}catch(error){console.log(error)
}}var _that=this;
if(mark==2){$.ajax({url:"/phoenix/admin/common/checkNo",type:"post",dataType:"text",data:{searchId:"aHKfpAUKBOje",conditions:"searchKeyword~!=!~"+serialNumberDom.parents(".control-group").find("input").val(),formPkId:$("."+widget+" form fieldset").find("input[name='encodeFormId']").val(),serialNumber:serialNumberDom.parents(".control-group").find("input").val(),formField:serialNumberDom.parents(".control-group").find("input").attr("name")},success:function(res){if(res=="1"){serialStatusDom.find("input[value='valid']").attr("checked","true")
}else{if(res=="0"){serialStatusDom.find("input[value='invalid']").attr("checked","true")
}else{if(res=="2"){serialStatusDom.find("input[value='repetitive']").attr("checked","true")
}else{return
}}}formSubmit(_that)
}})
}else{formSubmit(_that)
}});
function formSubmit(that){if($("."+widget+" #formsubmit").attr("disabled")){return
}var _that=that;
var executiveFlage=sublimeFlage();
var formSubmitname=$("#formsubmit").hasClass("btn-disabeled");
if(executiveFlage){var varifyResult=true;
$("."+widget+" input, ."+widget+" textarea").each(function(){if($(this).attr("id")&&$(this).attr("id").indexOf("extend")!="-1"){varifyResult=varifyResult&&checkInputLength(this)
}});
$("."+widget+" [required]").each(function(){varifyResult=varifyResult&&checkEmpty(this)
});
$("."+widget+" .mailInput").each(function(){varifyResult=varifyResult&&checkMail(this)
});
$("."+widget+" .phoneInput").each(function(){varifyResult=varifyResult&&checkPhone(this,$("."+widget+" .phoneInputprepend .phoneInputprepend"))
});
$("."+widget+" .phoneInputprepend").each(function(){varifyResult=varifyResult&&checkPhone2($("."+widget+" .phoneInputprepend .phoneInput"),this)
});
if(varifyResult){if(hasProduct){$.cookie("baksetProdArray",null,{path:"/"});
if(!!!localStorage){$("."+widget+" form").submit();
$(this).addClass("btn-disabeled");
return
}localStorage.setItem("baksetProdArray","")
}if(_options.component_trackCode&&_options.component_trackCode!=""){try{eval(_options.component_trackCode)
}catch(err){console.log(err)
}}var loadAdminate="";
$("."+widget+" #formsubmit").append(loadAdminate);
$("."+widget+" #formsubmit").html('<div id="loadSubmit"></div>');
$("."+widget+" #formsubmit").find("#loadSubmit").addClass("bea_style");
$("."+widget+" #formsubmit").attr("disabled","true");
$("."+widget+" #formsubmit").css("cursor","not-allowed");
$("."+widget+" form").submit();
$(this).addClass("btn-disabeled")
}}}function formSubmit_upload(){var fileDataMap=window.uploadedFiles||(window.uploadedFiles={});
var formData=new FormData();
formData.append("fileDataMap",JSON.stringify(fileDataMap));
for(var key in fileDataMap){if(fileDataMap[key].length>0){for(var i=0;
i<fileDataMap[key].length;
i++){formData.append(key,fileDataMap[key][i])
}}}$("."+widget).find("form").serializeArray().forEach(function(field){if(field.name!=="file"){formData.append(field.name,field.value)
}});
$.ajax({url:$("."+widget).find("form").attr("action"),type:"POST",data:formData,processData:false,contentType:false,success:function(response){},error:function(error){}})
}}function sublimeFlage(){var fileList=$("."+widget+" :file");
var flage=true;
fileList.each(function(i,v,fSZids){var fileItem=v;
var isIE=/msie/i.test(navigator.userAgent)&&!window.opera;
var fileSize=0;
var maxSize=0;
for(var j=0;
j<fileItem.files.length;
j++){var thisFileSize=fileItem.files[j].size;
if(thisFileSize>maxSize){maxSize=thisFileSize
}}if(isIE&&!fileItem.files.length>0){var filePath=fileItem.value;
var fileSystem=new ActiveXObject("Scripting.FileSystemObject");
var file=fileSystem.GetFile(filePath);
fileSize=file.Size
}else{if(fileItem.files.length>0){fileSize=fileItem.files[0].size
}}var sizes=fileSize/1024;
var errLenght=$(v).parent().find(".errgreater").length;
if(sizes>30000||(maxSize/1024)>30000){flage=false
}if((sizes>30000||(maxSize/1024)>30000)&&errLenght<1){$(v).parent().append("<p class='errormessage errgreater'>"+_options.component_phoenix_form_upload_limit+"</p>")
}else{if(sizes<30000){$(v).parent().find(".errgreater").remove()
}}});
return flage
}function initPrice(){var prodSubtotalNum=0;
var prodSubtotalCompany="";
$(".sitewidget-inquire table > tbody > tr").each(function(index,el){if($(el).find(".showProdTotalClassTd")){if($(el).find("td.showProdUnitPriceClassTd .Unit-Price").text()!="/"){$(el).find("td.showProdTotalClassTd .ProdTotalCompany").html($(el).find(".Company").html())
}else{$(el).find("td.showProdUnitPriceClassTd .Company").html("")
}if($(el).find("td input[type='number']")&&$(el).find("td.showProdUnitPriceClassTd .Unit-Price").html()!="/"){var PriceNum=Number(Number($(el).find(".Unit-Price").text()).toFixed(2));
var num=Number(Number($(el).find("td input[type='number']").val()).toFixed(2));
if($(el).find(".Unit-Price")&&$(el).find("td input.proNum")){var subtotalNum=(PriceNum*num).toFixed(2);
$(el).find("td.showProdTotalClassTd .subtotal").html(subtotalNum)
}}else{$(el).find("td.showProdTotalClassTd .subtotal").html("/")
}if($("#prodSubtotal")){if($(el).find(".showProdUnitPriceClassTd .Company").html()!=""){prodSubtotalCompany=$(el).find(".showProdUnitPriceClassTd .Company").html()
}if($(el).find("td input[type='number']")){var PriceNums=Number(Number($(el).find(".Unit-Price").text()).toFixed(2));
var nums=Number(Number($(el).find("td input[type='number']").val()).toFixed(2));
if($(el).find(".Unit-Price")&&$(el).find("td input.proNum")&&$(el).find(".Unit-Price").html()!="/"){var subtotalNums=(PriceNums*nums).toFixed(2)
}else{var subtotalNums=0
}}prodSubtotalNum+=Number(subtotalNums)
}}});
$("#prodSubtotal").find(".Company").html(prodSubtotalCompany);
$("#prodSubtotal").find(".subtotal").html(prodSubtotalNum.toFixed(2))
}function addTablePriceData(){if($.trim($("."+widget+"#paramsJson").val())!=""){var jsonList=[];
var newList=[];
jsonList=JSON.parse($("."+widget+"#paramsJson").val());
var uniqueMap=new Map();
$("."+widget+" .sitewidget-inquire-table").find("tbody").find("tr").each(function(index,el){for(var i=0;
i<jsonList.length;
i++){if(jsonList[i].unique_id==$(this).attr("id")){try{if($(el).find(".showProdUnitPriceClassTd")){jsonList[i].prodUnitPrice=$(el).find(".showProdUnitPriceClassTd").find(".Unit-Price").html()
}if($(el).find("showProdTotalClassTd")){jsonList[i].skuProdTotal=$(el).find(".showProdTotalClassTd").find(".subtotal").html()
}if($("#prodSubtotal")){jsonList[i].prodSubtotal=$("#prodSubtotal").find(".subtotal").html()
}uniqueMap.set(jsonList[i].unique_id,jsonList[i])
}catch(e){}}}});
newList=Array.from(uniqueMap.values());
$("."+widget+"#paramsJson").val(JSON.stringify(newList));
if(localStorage.getItem("baksetProdArray")){list=JSON.parse(localStorage.getItem("baksetProdArray"));
for(var i=0;
i<list.length;
i++){var seleteID=list[i].prodid+"_"+list[i].skuParam;
for(var j=0;
j<newList.length;
j++){if((newList[j].prodid+"_"+newList[j].skuParam)==seleteID){list[i].prodUnitPrice=newList[j].prodUnitPrice;
list[i].skuProdTotal=newList[j].skuProdTotal;
list[i].prodSubtotal=newList[j].prodSubtotal
}}}localStorage.setItem("baksetProdArray",JSON.stringify(list))
}}}function prodNumFunc(inputObj){var uid=$(inputObj).attr("unique_Id");
var position=$("."+widget+" #"+uid).index();
if(jsonData[position]!=undefined&&jsonData[position].quantity!=undefined){jsonData[position].quantity=$(inputObj).val()
}$("."+widget+" #paramsJson").val(JSON.stringify(jsonData))
}function cusKeysFunc(inputObj){var position=$(inputObj).attr("data-index");
var dataKey=$(inputObj).attr("name");
var keyLabel=$(inputObj).attr("data-label");
if(jsonData[position]!=undefined&&jsonData[position][dataKey]!=undefined){jsonData[position][dataKey]["keyLabel"]=keyLabel;
jsonData[position][dataKey]["keyValue"]=$(inputObj).val()
}$("."+widget+" #paramsJson").val(JSON.stringify(jsonData));
try{initPrice();
addTablePriceData()
}catch(err){console.error(err)
}}function checkMail(Object){if(!validateMail($(Object).val())){if(undefined==$(Object).next(".errormessage").html()){$(Object).after('<div class="errormessage" style="display:none;"></div>');
$(Object).removeClass("input-valid-bg")
}else{$(Object).removeClass("input-valid-bg");
$(Object).next(".errormessage").html("")
}$(Object).next(".errormessage").html(_options.component_phoenix_from_mailerror).show();
$(Object).addClass("input-valid-bg");
return false
}else{return true
}}function checkPhone(Object,Object2){if(!validatePhone($(Object).val())||!validatePhone($(Object2).val())){if(undefined==$(Object).next(".errormessage").html()){$(Object).after('<div class="errormessage" style="display:none;"></div>');
$(Object).removeClass("input-valid-bg")
}else{$(Object).next(".errormessage").html("");
$(Object).removeClass("input-valid-bg")
}if($(Object).next(".errormessage").html()==""){$(Object).next(".errormessage").html(_options.component_phoenix_from_Phoneerror).show();
$(Object).addClass("input-valid-bg")
}$(Object).next(".errormessage").html(_options.component_phoenix_from_phoneerror).show();
$(Object).addClass("input-valid-bg");
return false
}else{if(undefined==$(Object).next(".errormessage").html()){$(Object).after('<div class="errormessage" style="display:none;"></div>');
$(Object).removeClass("input-valid-bg")
}else{if(!$(Object).attr("required")){$(Object).next(".errormessage").html("");
$(Object).removeClass("input-valid-bg")
}}return true
}}function checkPhone2(Object,Object2){if(!validatePhone($(Object).val())||!validatePhone($(Object2).val())){if(undefined==$(Object).next(".errormessage").html()){$(Object).after('<div class="errormessage" style="display:none;"></div>');
$(Object).removeClass("input-valid-bg")
}else{$(Object).next(".errormessage").html("");
$(Object).removeClass("input-valid-bg")
}if($(Object).next(".errormessage").html()==""){$(Object).next(".errormessage").html(_options.component_phoenix_from_Phoneerror).show();
$(Object).addClass("input-valid-bg")
}$(Object).next(".errormessage").html(_options.component_phoenix_from_phoneerror).show();
$(Object).addClass("input-valid-bg");
return false
}else{if(undefined==$(Object).next(".errormessage").html()){$(Object).after('<div class="errormessage" style="display:none;"></div>');
$(Object).removeClass("input-valid-bg")
}else{if(!$(Object).attr("required")){$(Object).next(".errormessage").html("");
$(Object).removeClass("input-valid-bg")
}}return true
}}function checkEmpty(Object){var isverifyCode=($(Object).attr("id")=="faptcha_response_field");
var formAgreement=($(Object).attr("id")=="formbuilder_agreement");
if(isverifyCode){if(""==$.trim($(Object).val())){$(Object).parent().find(".errormessage").html(_options.component_phoenix_from_emptyerror).show();
$(Object).addClass("input-valid-bg");
return false
}else{$(Object).parent().find(".errormessage").html("").hide();
$(Object).removeClass("input-valid-bg");
return true
}}else{if(formAgreement){var objectSubParent=$(Object).parent().parent();
if(!$(Object).is(":checked")){if(undefined==objectSubParent.find(".errormessage").html()){objectSubParent.append('<div class="errormessage" style="display:none;"></div>');
$(Object).removeClass("input-valid-bg")
}if(objectSubParent.find(".errormessage").html()==""){objectSubParent.find(".errormessage").html(_options.component_phoenix_from_emptyerror).show();
$(Object).addClass("input-valid-bg")
}return false
}else{objectSubParent.find(".errormessage").html("").hide();
$(Object).removeClass("input-valid-bg");
return true
}}else{if($(Object).attr("type")=="radio"||$(Object).attr("type")=="checkbox"){var objectSubParent=$(Object).closest(".controls");
if(objectSubParent.length==0){objectSubParent=$(Object).parent().parent()
}var isChecked=$("."+widget+" [name='"+$(Object).attr("name")+"']:checked").length>0;
if(!isChecked){if(objectSubParent.find(".errormessage").length==0){objectSubParent.append('<div class="errormessage" style="display:none;"></div>');
$(Object).removeClass("input-valid-bg")
}if(objectSubParent.find(".errormessage").html()==""){objectSubParent.find(".errormessage").html(_options.component_phoenix_from_emptyerror).show();
$(Object).addClass("input-valid-bg")
}return false
}else{objectSubParent.find(".errormessage").html("").hide();
$(Object).removeClass("input-valid-bg");
return true
}}else{if(""==$.trim($(Object).val())){if($(Object).hasClass("areachoose")){if($(Object).parent().find(".errormessage").length==0){$(Object).parent().append('<div class="errormessage" style="display:none;"></div>');
$(Object).next(".select2").find(".select2-selection.select2-selection--single").removeClass("input-valid-bg")
}else{$(Object).parent().find(".errormessage").html("")
}if($(Object).parent().find(".errormessage").html()==""){$(Object).parent().find(".errormessage").html(_options.component_phoenix_from_emptyerror).show();
$(Object).next(".select2").find(".select2-selection.select2-selection--single").addClass("input-valid-bg")
}return false
}else{if(undefined==$(Object).next(".errormessage").html()){$(Object).after('<div class="errormessage" style="display:none;"></div>');
$(Object).removeClass("input-valid-bg")
}else{$(Object).next(".errormessage").html("")
}if($(Object).next(".errormessage").html()==""){$(Object).next(".errormessage").html(_options.component_phoenix_from_emptyerror).show();
$(Object).addClass("input-valid-bg")
}return false
}}else{if($(Object).val().length>900){if(undefined==$(Object).next(".errormessage").html()){$(Object).after('<div class="errormessage" style="display:none;"></div>');
$(Object).removeClass("input-valid-bg")
}else{$(Object).next(".errormessage").html("")
}if($(Object).next(".errormessage").html()==""){$(Object).next(".errormessage").html(_options.component_phoenix_form_length_error).show();
$(Object).addClass("input-valid-bg")
}return false
}else{if($(Object).hasClass("areachoose")){$(Object).parent().find(".errormessage").html("").hide();
$(Object).next(".select2").find(".select2-selection.select2-selection--single").removeClass("input-valid-bg");
return true
}else{$(Object).next(".errormessage").html("").hide();
$(Object).removeClass("input-valid-bg");
return true
}}}}}}}function checkInputLength(Object){if($(Object).val().length>900){if(undefined==$(Object).next(".errormessage").html()){$(Object).after('<div class="errormessage" style="display:none;"></div>');
$(Object).removeClass("input-valid-bg")
}else{$(Object).next(".errormessage").html("")
}if($(Object).next(".errormessage").html()==""){$(Object).next(".errormessage").html(_options.component_phoenix_form_length_error).show();
$(Object).addClass("input-valid-bg")
}return false
}else{$(Object).next(".errormessage").html("").hide();
$(Object).removeClass("input-valid-bg");
return true
}}function validateMail(mail){var patten=new RegExp(/^([a-zA-Z0-9_\-'])*([\.a-zA-Z0-9_\-'])+@([a-zA-Z0-9_\-'])+((\.[a-zA-Z0-9_\-']+)+)\s*$/);
if($.isEmptyObject(mail)||patten.test(mail)){return true
}else{return false
}}function validatePhone(Phone){var patten=new RegExp("([\\u4E00-\\u9FFF]+|[a-z]+)","g");
if($.isEmptyObject(Phone)||!patten.test(Phone)){return true
}else{return false
}}function formScriptEscapeHtml(text){return String(text==null?"":text).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")
}function splicingDetailHtml2Body(){$("."+widget+" .new_mobile_inquiry_view").off("click").on("click",function(){var markDom="";
var itemDom="";
var unique_id=$(this).attr("data-unique_id");
var data=$(this).parents(".new_mobile_prod_inquiry_item").find(".new_mobile_prod_inquiry_hidden_data").children();
var newQuantity=$(this).parents(".new_mobile_prod_inquiry_item").find(".mobile_prod_inquiry_item_r .mobile_prod_inquiry_item_r_inquiry_number .inquiry-quan-input").val();
data.each(function(){var key=$(this).attr("data-keys");
var keyType=$(this).attr("data-keyType");
var labelName=$(this).attr("data-name");
var rightDom=$(this).val();
if(key=="showProdProperty"||key=="showProdUnitPrice"){if($(this).attr("data-isflag")==0){return
}rightDom=$(this).html()
}else{if(key=="showProdNum"){var dataIndex=$(this).attr("data-index");
var tempQuantity=newQuantity||rightDom;
rightDom='<a href="javascript:;" class="inquiry-minus"> </a><input type="text" data-index="'+dataIndex+'" autocomplete="off" style="text-align: center; height: 1.8em !important;" class="inquiry-quan-input proNum" max="" min="0" value="'+tempQuantity+'" unique_id="'+unique_id+'"><a href="javascript:;" class="inquiry-plus"> </a>'
}else{if(key=="showProdImg"){rightDom='<img src="'+rightDom+'" alt="prod"/>'
}else{if(key=="showProdTotal"){var curPrice=$(this).attr("data-price");
var curSymbol=$(this).attr("data-symbol");
var curQuantity=newQuantity||$(this).attr("data-default-quantity");
rightDom='<span class="pop_symbol">'+curSymbol+'</span><span class="pop_subtotal">'+(curQuantity*curPrice).toFixed(2)+"</span>"
}else{if(key.indexOf("prodCustomField_")===0){rightDom=formScriptEscapeHtml(rightDom)
}else{if(key.indexOf("customField_")!=-1){var dataIndex=$(this).attr("data-index");
var name=key+"_"+dataIndex;
var tempValue=$("."+widget+" .sitewidget-inquire-table input[name='"+name+"']").val()||"";
if(keyType&&keyType==="1"){rightDom='<input class="cus-message-input" type="text" value="'+tempValue+'" data-index="'+dataIndex+'" name="'+name+'" data-label="'+labelName+'" maxlength="50" style="background-color: inherit; color: rgb(0, 0, 0);" >'
}if(keyType&&keyType==="2"){rightDom='<textarea class="cus-message-input" type="text" value="'+tempValue+'" data-index="'+dataIndex+'" name="'+name+'" data-label="'+labelName+'" maxlength="500" style="background-color: inherit; color: rgb(0, 0, 0);resize: vertical;" ></textarea>'
}}}}}}}itemDom+='<div class="new_prod_inquiry_popup_main_item"><div class="new_prod_inquiry_popup_main_item_l">'+(key.indexOf("prodCustomField_")===0?formScriptEscapeHtml($(this).attr("data-name")):$(this).attr("data-name"))+'</div><div class="new_prod_inquiry_popup_main_item_r">'+rightDom+"</div></div>"
});
markDom='<div class="'+widget+" new_prod_inquiry_mark new_prod_inquiry_mark_"+unique_id+'">    <div class="new_prod_inquiry_popup">      <div class="new_prod_inquiry_popup_header">        <div class="new_prod_inquiry_popup_title">'+_options.component_phoenix_view_details+'</div>        <div class="new_prod_inquiry_popup_close">          <svg t="1701408017807" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"            p-id="5257" width="20" height="20">            <path              d="M597.795527 511.488347 813.564755 295.718095c23.833825-23.833825 23.833825-62.47489 0.001023-86.307691-23.832801-23.832801-62.47489-23.833825-86.307691 0L511.487835 425.180656 295.717583 209.410404c-23.833825-23.833825-62.475913-23.833825-86.307691 0-23.832801 23.832801-23.833825 62.47489 0 86.308715l215.769228 215.769228L209.410915 727.258599c-23.833825 23.833825-23.833825 62.47489 0 86.307691 23.832801 23.833825 62.473867 23.833825 86.307691 0l215.768205-215.768205 215.769228 215.769228c23.834848 23.833825 62.475913 23.832801 86.308715 0 23.833825-23.833825 23.833825-62.47489 0-86.307691L597.795527 511.488347z"              fill="#343A56" p-id="5258"></path>          </svg>        </div>      </div>      <div class="new_prod_inquiry_popup_main">'+itemDom+"</div>    </div>  </div>";
$("body").append(markDom).attr("style","overflow: hidden !important;");
bindMobileEvent(unique_id)
})
}function bindMobileEvent(uid){var $popupMain=$("."+widget+".new_prod_inquiry_mark_"+uid);
$popupMain.find(".new_prod_inquiry_popup_close").click(function(){$popupMain.remove();
$("body").css("overflow","initial")
});
$popupMain.find(".proNum").each(function(){prodNumFunc(this)
});
$popupMain.find(".inquiry-minus").click(function(){var temp=+$popupMain.find(".proNum").val()-1<1?1:+$popupMain.find(".proNum").val()-1;
$popupMain.find(".proNum").val(temp);
$popupMain.find(".proNum").change()
});
$popupMain.find(".inquiry-plus").click(function(){$popupMain.find(".proNum").val(+$popupMain.find(".proNum").val()+1);
$popupMain.find(".proNum").change()
});
$popupMain.find(".proNum").bind("change",function(){var value=$(this).val();
var unique_id=$(this).attr("unique_id");
var regex=/^[0-9]+$/;
if(!regex.test(value)){$("."+widget+" .proNum[unique_id='"+unique_id+"']").val(1)
}else{$("."+widget+" .proNum[unique_id='"+unique_id+"']").val(value)
}var curVal=Number($(this).val());
var tpaiceText=$("."+widget).find('.new_mobile_prod_inquiry_main .new_mobile_prod_inquiry_item[data-unique_id="'+uid+'"]').find(".new_mobile_prod_inquiry_hidden_data .Unit-Price").text();
var temp_price=Number(tpaiceText).toFixed(2);
$popupMain.find(".pop_subtotal").text((curVal*temp_price).toFixed(2));
prodNumFunc(this);
try{initPrice()
}catch(err){console.error(err)
}try{addTablePriceData()
}catch(err){console.error(err)
}});
$popupMain.find(".cus-message-input").bind("change",function(){var value=$(this).val();
var name=$(this).attr("name");
$("."+widget+" .cus-message-input[name='"+name+"']").val(value);
cusKeysFunc(this)
})
}splicingDetailHtml2Body();
var OppositeColorNormal=phoenixSite.opColor.getOppositeColor(_options.component_bgcolor);
if(_options.component_fcolor){OppositeColorNormal=_options.component_fcolor
}if(_options.component_bgcolor){if(_options.component_formStyle&&_options.component_formStyle=="4"){bdArea.find(".control-group:not(.submitGroup)").css("background-color",_options.component_bgcolor);
bdArea.find("input:text").css("color",OppositeColorNormal);
bdArea.find("textarea").css("color",OppositeColorNormal)
}else{bdArea.find("input:text").css("background-color",_options.component_bgcolor).css("color",OppositeColorNormal);
bdArea.find("textarea").css("background-color",_options.component_bgcolor).css("color",OppositeColorNormal)
}if(_options.component_formStyle&&_options.component_formStyle=="9"){bdArea.find("input:password").css("background-color",_options.component_bgcolor).css("color",OppositeColorNormal)
}}if(_options.component_checkBgcolor){var OppositeColorCheck=phoenixSite.opColor.getOppositeColor(_options.component_checkBgcolor);
if(_options.component_fcolor){OppositeColorCheck=_options.component_fcolor
}if(_options.component_formStyle&&_options.component_formStyle=="9"){bdArea.find("input:text, input:password").add(bdArea.find("textarea")).bind("focus",function(){$(this).css("background-color",_options.component_checkBgcolor);
$(this).css("color",OppositeColorCheck)
}).bind("blur",function(){$(this).css("background-color",_options.component_bgcolor);
$(this).css("color",OppositeColorNormal)
})
}else{bdArea.find("input:text").add(bdArea.find("textarea")).bind("focus",function(){$(this).css("background-color",_options.component_checkBgcolor);
$(this).css("color",OppositeColorCheck)
}).bind("blur",function(){$(this).css("background-color",_options.component_bgcolor);
$(this).css("color",OppositeColorNormal)
})
}}if(_options.component_placeHoldercolor){bdArea.find(".formplaceholder").remove();
bdArea.find(".formplaceholder_option").remove();
bdArea.append('<style class="formplaceholder">.'+widget+" .sitewidget-bd input::-webkit-input-placeholder,."+widget+" .sitewidget-bd textarea::-webkit-input-placeholder,."+widget+" .select2-container--default .select2-selection--single .select2-selection__placeholder{color: "+_options.component_placeHoldercolor+"}</style>");
bdArea.append('<style class="formplaceholder_option">.'+widget+" .sitewidget-bd .areachoose>option{color: #555555!important;} ."+widget+" .sitewidget-bd .areachoose{color: "+_options.component_placeHoldercolor+"}</style>")
}if(_options.component_fcolor){bdArea.find("input:text").css("color",_options.component_fcolor);
bdArea.find("textarea").css("color",_options.component_fcolor)
}if(_options.component_formStyle&&_options.component_formStyle=="5"){$("."+widget+"form").addClass("form-horizontal");
$("."+widget+".control-label").each(function(){var _i=$(this).find("i");
$(this).append(_i)
})
}else{$("."+widget+".form-line-3 .control-group").each(function(i){if(i%3==0){$(this).addClass("nth-child-3n")
}newList[i].prodUnitPrice;
if($(this).hasClass("textarea")){$(this).next(".control-group").addClass("nth-child-3n")
}});
$("."+widget+".controls .uploadBtn").addClass("uploadBtn-control")
}form.handleSuspensionRight(options);
try{initPrice();
addTablePriceData()
}catch(err){console.error(err)
}$("."+widget+" #formsubmit").addClass("releaseClick")
},handleSuspensionRight:function(options){var _options=options;
var $_widgetClass=$("."+_options.widgetClass);
$_widgetClass.removeClass("fixed_window_top");
$_widgetClass.css("width","auto");
function scrollHandle(offsetTop,offsetWidth){var mt=0;
$("."+_options.widgetClass+".style3").parents(".outerContainer").prevAll(".outerContainer[autoHold]").each(function(){mt+=$(this).height()
});
if($("body header.headerFixedHover").length){mt+=$("body header.headerFixedHover").height()
}$("#backstage-headArea").find("div").each(function(){if($(this).css("position")=="fixed"&&$(this).css("display")!="none"){mt+=$(this).position().top+$(this).height()
}});
if($(document).scrollTop()>offsetTop){$("."+_options.widgetClass+".style3").addClass("fixed_window_top");
$("."+_options.widgetClass+".style3").css("width",offsetWidth);
$("."+_options.widgetClass+".style3").css("margin-top",mt)
}else{$("."+_options.widgetClass+".style3").removeClass("fixed_window_top");
$("."+_options.widgetClass+".style3").css("width","auto");
$("."+_options.widgetClass+".style3").css("margin-top","0")
}}suspensionFun();
function suspensionFun(){if(_options.component_isFixed&&_options.component_isFixed=="2"){var offsetTop=$_widgetClass.offset().top;
$(window).on("scroll",function(){var offsetWidth=$_widgetClass.width();
scrollHandle(offsetTop,offsetWidth)
})
}$(".form_fixed_button").css("cssText","opacity: 1 !important");
if(_options.component_isFixed&&_options.component_isFixed=="1"){if(_options.component_isFixedStyle&&_options.component_isFixedStyle=="1"){var fixedHeight=$_widgetClass.height()-36;
var _Btn_color=$_widgetClass.find("#formsubmit").css("background-color");
$_widgetClass.find(".form_fixed_button_1").css({"background-color":_Btn_color});
$_widgetClass.find(".form_fixed_button_1").click(function(){if(!$("."+_options.widgetClass+".isFixed_bottom_right_1").hasClass("large")){$("."+_options.widgetClass+".isFixed_bottom_right_1").animate({bottom:0}).addClass("large");
$(".sitewidget-onlineService, .sitewidget-follow, .sitewidget-share").addClass("z-index1-main")
}else{$("."+_options.widgetClass+".isFixed_bottom_right_1").animate({bottom:-fixedHeight}).removeClass("large");
$(".sitewidget-onlineService, .sitewidget-follow, .sitewidget-share").removeClass("z-index1-main")
}});
if(_options.component_isFixedDefault&&_options.component_isFixedDefault=="1"){$("."+_options.widgetClass+".isFixed_bottom_right_1").css({bottom:"0"}).addClass("large");
$(".sitewidget-onlineService, .sitewidget-follow, .sitewidget-share").addClass("z-index1-main")
}else{$("."+_options.widgetClass+".isFixed_bottom_right_1").css({bottom:-fixedHeight}).removeClass("large");
$(".sitewidget-onlineService, .sitewidget-follow, .sitewidget-share").removeClass("z-index1-main")
}}else{var _i=$('<i class="" style="font-family:Arial;" aria-hidden="true">×</i>');
$("."+_options.widgetClass+".isFixed_bottom_right .sitewidget-hd").append(_i);
var fixedHeight=$("."+_options.widgetClass+".isFixed_bottom_right").height();
$_widgetClass.find(".sitewidget-hd i").click(function(){$_widgetClass.slideUp();
$(".sitewidget-onlineService, .sitewidget-follow, .sitewidget-share").removeClass("z-index1-main")
});
$(".form_fixed_button").click(function(){$_widgetClass.slideDown();
$(".sitewidget-onlineService, .sitewidget-follow, .sitewidget-share").addClass("z-index1-main")
});
if(_options.component_isFixedDefault&&_options.component_isFixedDefault=="1"){$_widgetClass.show();
$(".sitewidget-onlineService, .sitewidget-follow, .sitewidget-share").addClass("z-index1-main")
}}var timerDelay=null;
var hasXIndex1Main=$(".sitewidget-onlineService, .sitewidget-follow, .sitewidget-share").hasClass("z-index1-main");
var windowWidthObj={};
var windowWidthChange="windowWidthChange_"+_options.settingId;
var handleFun="handle_"+_options.settingId;
windowWidthObj[windowWidthChange]=function(){var _isFixed=$(".sitewidget-inquire."+_options.widgetClass).attr("data-isFixed");
if(_isFixed=="1"){var _isFixedStyle=$(".sitewidget-inquire."+_options.widgetClass).attr("data-isFixedStyle");
$(".sitewidget-onlineService, .sitewidget-follow, .sitewidget-share").removeClass("z-index1-main");
if(_isFixedStyle=="1"){var hasBottemRight=$_widgetClass.hasClass("isFixed_bottom_right_1")
}else{var hasBottemRight=$_widgetClass.hasClass("isFixed_bottom_right")
}var windowWidth=$(window).width();
if(windowWidth<768&&hasBottemRight){if(_isFixedStyle=="1"){$_widgetClass.removeClass("isFixed_bottom_right_1").find(".form_fixed_button_1").hide()
}else{$_widgetClass.removeClass("isFixed_bottom_right hide").find(".sitewidget-hd i").hide();
$(".form_fixed_button").hide();
$_widgetClass.show()
}}else{if(windowWidth>=768&&!hasBottemRight){if(_isFixedStyle=="1"){$_widgetClass.addClass("isFixed_bottom_right_1").find(".form_fixed_button_1").show()
}else{$_widgetClass.addClass("isFixed_bottom_right hide").find(".sitewidget-hd i").show();
$(".form_fixed_button").show()
}if(hasXIndex1Main){$(".sitewidget-onlineService, .sitewidget-follow, .sitewidget-share").addClass("z-index1-main")
}}}}};
windowWidthObj[handleFun]=function(){if(timerDelay){clearTimeout(timerDelay)
}timerDelay=setTimeout(function(){windowWidthObj[windowWidthChange]()
},500)
};
$(window).on("resize.changeForm",windowWidthObj[handleFun]());
windowWidthObj[windowWidthChange]()
}if(_options.component_isFixed&&_options.component_isFixed=="3"){if(_options.component_isFixedStyle&&_options.component_isFixedStyle=="1"){var fixedHeight=$_widgetClass.height()-36;
var _Btn_color=$_widgetClass.find("#formsubmit").css("background-color");
$_widgetClass.find(".form_fixed_button_1").css({"background-color":_Btn_color});
$_widgetClass.find(".form_fixed_button_1").click(function(){if(!$("."+_options.widgetClass+".isFixed_bottom_left_1").hasClass("large")){$("."+_options.widgetClass+".isFixed_bottom_left_1").animate({bottom:0}).addClass("large");
$(".sitewidget-onlineService, .sitewidget-follow, .sitewidget-share").addClass("z-index1-main")
}else{$("."+_options.widgetClass+".isFixed_bottom_left_1").animate({bottom:-fixedHeight}).removeClass("large");
$(".sitewidget-onlineService, .sitewidget-follow, .sitewidget-share").removeClass("z-index1-main")
}});
if(_options.component_isFixedDefault&&_options.component_isFixedDefault=="1"){$("."+_options.widgetClass+".isFixed_bottom_left_1").css({bottom:"0"}).addClass("large");
$(".sitewidget-onlineService, .sitewidget-follow, .sitewidget-share").addClass("z-index1-main")
}else{$("."+_options.widgetClass+".isFixed_bottom_left_1").css({bottom:-fixedHeight}).removeClass("large");
$(".sitewidget-onlineService, .sitewidget-follow, .sitewidget-share").removeClass("z-index1-main")
}}else{var _i=$('<i class="" style="font-family:Arial;" aria-hidden="true">×</i>');
$("."+_options.widgetClass+".isFixed_bottom_left .sitewidget-hd").append(_i);
var fixedHeight=$("."+_options.widgetClass+".isFixed_bottom_left").height();
$_widgetClass.find(".sitewidget-hd i").click(function(){$_widgetClass.slideUp();
$(".sitewidget-onlineService, .sitewidget-follow, .sitewidget-share").removeClass("z-index1-main")
});
$(".form_fixed_button").click(function(){$_widgetClass.slideDown();
$(".sitewidget-onlineService, .sitewidget-follow, .sitewidget-share").addClass("z-index1-main")
});
if(_options.component_isFixedDefault&&_options.component_isFixedDefault=="1"){$_widgetClass.show();
$(".sitewidget-onlineService, .sitewidget-follow, .sitewidget-share").addClass("z-index1-main")
}}var timerDelay=null;
var hasXIndex1Main=$(".sitewidget-onlineService, .sitewidget-follow, .sitewidget-share").hasClass("z-index1-main");
var windowWidthObj={};
var windowWidthChange="windowWidthChange_"+_options.settingId;
var handleFun="handle_"+_options.settingId;
windowWidthObj[windowWidthChange]=function(){var _isFixed=$(".sitewidget-inquire."+_options.widgetClass).attr("data-isFixed");
if(_isFixed=="3"){var _isFixedStyle=$(".sitewidget-inquire."+_options.widgetClass).attr("data-isFixedStyle");
$(".sitewidget-onlineService, .sitewidget-follow, .sitewidget-share").removeClass("z-index1-main");
if(_isFixedStyle=="1"){var hasBottemRight=$_widgetClass.hasClass("isFixed_bottom_left_1")
}else{var hasBottemRight=$_widgetClass.hasClass("isFixed_bottom_left")
}var windowWidth=$(window).width();
if(windowWidth<768&&hasBottemRight){if(_isFixedStyle=="1"){$_widgetClass.removeClass("isFixed_bottom_left_1").find(".form_fixed_button_1").hide()
}else{$_widgetClass.removeClass("isFixed_bottom_left hide").find(".sitewidget-hd i").hide();
$(".form_fixed_button").hide();
$_widgetClass.show()
}}else{if(windowWidth>=768&&!hasBottemRight){if(_isFixedStyle=="1"){$_widgetClass.addClass("isFixed_bottom_left_1").find(".form_fixed_button_1").show()
}else{$_widgetClass.addClass("isFixed_bottom_left hide").find(".sitewidget-hd i").show();
$(".form_fixed_button").show()
}if(hasXIndex1Main){$(".sitewidget-onlineService, .sitewidget-follow, .sitewidget-share").addClass("z-index1-main")
}}}}};
windowWidthObj[handleFun]=function(){if(timerDelay){clearTimeout(timerDelay)
}timerDelay=setTimeout(function(){windowWidthObj[windowWidthChange]()
},500)
};
$(window).on("resize.changeForm",windowWidthObj[handleFun]());
windowWidthObj[windowWidthChange]()
}}}})
})(window,jQuery);