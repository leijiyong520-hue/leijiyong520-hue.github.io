(function(e,g,h){var f=e.phoenixSite||(e.phoenixSite={});
var d=f.prodSubscription||(f.prodSubscription={});
var a={};
var c=e.$_phoenix==h;
var b={};
g.extend(d,{queryLoading:false,init:function(i){g.extend(a,i);
b={};
setTimeout(function(){d.queryData()
},10)
},queryData:function(){if(d.queryLoading){return
}var m=this;
var j=g("."+a.widgetClass+' input[id="skuValueId"]').val();
if(j){d.queryLoading=true;
var l=b["prod_detail_"+j];
if(l!=h){if(l!=""){g("."+a.widgetClass+" #prod_subscription").html(l);
f.payCoinExchange.handleElement(g("."+a.widgetClass+" .plan_price"));
var i=g("."+a.widgetClass+" #cur_subscription_style").attr("data-style");
if(i=="style1"){m.firstStyleBindFrontendEvent()
}else{if(i=="style2"){m.secondStyleBindFrontendEvent()
}else{if(i=="style3"){m.thirdStyleBindFrontendEvent()
}}}}else{m.removeSubscribeInputValue()
}d.queryLoading=false
}else{var k={productId:a.productId,skuValueId:j,widgetClass:a.widgetClass};
g.ajax({url:"/phoenix/admin/prod/sellingPlanList",type:"GET",data:k,success:function(n){if(n&&n!=""){g("."+a.widgetClass+" #prod_subscription").html(n);
f.payCoinExchange.handleElement(g("."+a.widgetClass+" .plan_price"));
var o=g("."+a.widgetClass+" #cur_subscription_style").attr("data-style");
if(o=="style1"){m.firstStyleBindFrontendEvent()
}else{if(o=="style2"){m.secondStyleBindFrontendEvent()
}else{if(o=="style3"){m.thirdStyleBindFrontendEvent()
}}}}else{m.removeSubscribeInputValue()
}b["prod_detail_"+j]=n;
d.queryLoading=false
},error:function(n){d.queryLoading=false;
m.removeSubscribeInputValue()
}})
}}else{d.queryLoading=false;
m.removeSubscribeInputValue()
}},removeSubscribeInputValue:function(){g("."+a.widgetClass+" #prod_subscription").html("");
g("."+a.widgetClass+" input[name='data-pluginType']").val("");
g("."+a.widgetClass+" input[name='pluginType']").val("");
g("."+a.widgetClass+" input[name='data-subscribeId']").val("");
g("."+a.widgetClass+" input[name='subscribeId']").val("")
},firstStyleBindFrontendEvent:function(){g("."+a.widgetClass+" .prod_order_subscription_main_1 .prod_order_subscription_options").click(function(){g(this).siblings().removeClass("subscription_active gbBdColor0");
g(this).addClass("subscription_active gbBdColor0");
g("."+a.widgetClass+" input[name='data-pluginType']").val(g(this).attr("data-pluginType"));
g("."+a.widgetClass+" input[name='data-subscribeId']").val(g(this).attr("data-subscribeId"));
g("."+a.widgetClass+" input[name='pluginType']").val(g(this).attr("data-pluginType"));
g("."+a.widgetClass+" input[name='subscribeId']").val(g(this).attr("data-subscribeId"))
});
g("."+a.widgetClass+" .prod_order_subscription_main_1 .prod_order_subscription_options").each(function(){if(g(this).hasClass("subscription_active")){g("."+a.widgetClass+" input[name='data-pluginType']").val(g(this).attr("data-pluginType"));
g("."+a.widgetClass+" input[name='data-subscribeId']").val(g(this).attr("data-subscribeId"));
g("."+a.widgetClass+" input[name='pluginType']").val(g(this).attr("data-pluginType"));
g("."+a.widgetClass+" input[name='subscribeId']").val(g(this).attr("data-subscribeId"))
}});
function i(){var j=g("."+a.widgetClass+" #prod_subscription").width();
g("."+a.widgetClass+" .prod_order_subscription_main_1").removeClass("row1 row2 row4");
if(j>=760){g("."+a.widgetClass+" .prod_order_subscription_main_1").addClass("row4")
}else{if(j<760&&j>280){g("."+a.widgetClass+" .prod_order_subscription_main_1").addClass("row2")
}else{if(j<=280){g("."+a.widgetClass+" .prod_order_subscription_main_1").addClass("row1")
}}}}i();
e.onresize=function(){i()
}
},secondStyleBindFrontendEvent:function(){j();
g("."+a.widgetClass+" .prod_order_subscription_main_2 .subscription_label>.subscription_label_left").click(function(){g(this).parents(".prod_order_subscription_options").siblings().removeClass("subscription_active gbBdColor0");
g(this).parents(".prod_order_subscription_options").siblings().find(".subscription_label .subscription_label_left .subscription_label_left_input.subscription_s_radio").removeClass("s_radio_active gbBdColor0");
g(this).parents(".prod_order_subscription_options").addClass("subscription_active gbBdColor0");
g(this).parents(".prod_order_subscription_options").find(".subscription_label .subscription_label_left .subscription_label_left_input.subscription_s_radio").addClass("s_radio_active gbBdColor0");
if(g(this).attr("data-pluginType")=="SUBSCRIBE"){g(this).parents(".prod_order_subscription_options").find(".subscription_plan").removeClass("hide");
g("."+a.widgetClass+" input[name='data-pluginType']").val("SUBSCRIBE");
g("."+a.widgetClass+" input[name='pluginType']").val("SUBSCRIBE");
i()
}else{g(this).parents(".prod_order_subscription_options").siblings().find(".subscription_plan").addClass("hide");
g("."+a.widgetClass+" input[name='data-pluginType']").val("");
g("."+a.widgetClass+" input[name='data-subscribeId']").val("");
g("."+a.widgetClass+" input[name='pluginType']").val("");
g("."+a.widgetClass+" input[name='subscribeId']").val("");
g("."+a.widgetClass+" #times_price_value").html("")
}});
function j(){g("."+a.widgetClass+' .subscription_label_left_input.subscription_s_radio[data-name="payMethod"]').each(function(){if(g(this).hasClass("s_radio_active")){if(g(this).attr("data-plan")){g("."+a.widgetClass+" input[name='data-pluginType']").val("SUBSCRIBE");
g("."+a.widgetClass+" input[name='pluginType']").val("SUBSCRIBE");
i()
}else{g("."+a.widgetClass+" input[name='data-pluginType']").val("");
g("."+a.widgetClass+" input[name='data-subscribeId']").val("");
g("."+a.widgetClass+" input[name='pluginType']").val("");
g("."+a.widgetClass+" input[name='subscribeId']").val("");
g("."+a.widgetClass+" #times_price_value").html("")
}}})
}function i(){g("."+a.widgetClass+" .plan_price").bind("DOMNodeInserted",function(k){b={}
});
g("."+a.widgetClass+' .subscription_label_left_input.subscription_s_radio[data-name="planRadio"]').parent().each(function(k){if(k==0){g(this).parent().siblings().find("div[data-name=planRadio]").removeClass("s_radio_active gbBdColor0");
g(this).find("div[data-name=planRadio]").addClass("s_radio_active gbBdColor0");
g("."+a.widgetClass+" input[name='data-subscribeId']").val(g(this).attr("data-subscribeId"));
g("."+a.widgetClass+" input[name='subscribeId']").val(g(this).attr("data-subscribeId"));
g("."+a.widgetClass+" #times_price_value").html(g(this).find(".plan_price").html())
}});
g("."+a.widgetClass+" div[data-name=planRadio]").parent().click(function(){g(this).parent().siblings().find("div[data-name=planRadio]").removeClass("s_radio_active gbBdColor0");
g(this).find("div[data-name=planRadio]").addClass("s_radio_active gbBdColor0");
g("."+a.widgetClass+" input[name='data-subscribeId']").val(g(this).attr("data-subscribeId"));
g("."+a.widgetClass+" input[name='subscribeId']").val(g(this).attr("data-subscribeId"));
g("."+a.widgetClass+" #times_price_value").html(g(this).find(".plan_price").html())
})
}},thirdStyleBindFrontendEvent:function(){j();
g("."+a.widgetClass+" .prod_order_subscription_main_3 .subscription_label>.subscription_label_left").click(function(){g(this).parents(".prod_order_subscription_options").siblings().removeClass("subscription_active gbBdColor0");
g(this).parents(".prod_order_subscription_options").siblings().find(".subscription_label .subscription_label_left .subscription_label_left_input.subscription_s_radio").removeClass("s_radio_active gbBdColor0");
g(this).parents(".prod_order_subscription_options").addClass("subscription_active gbBdColor0");
g(this).parents(".prod_order_subscription_options").find(".subscription_label .subscription_label_left .subscription_label_left_input.subscription_s_radio").addClass("s_radio_active gbBdColor0");
if(g(this).attr("data-pluginType")=="SUBSCRIBE"){g(this).parents(".prod_order_subscription_options").find(".subscription_plan").removeClass("hide");
g("."+a.widgetClass+" input[name='data-pluginType']").val("SUBSCRIBE");
g("."+a.widgetClass+" input[name='pluginType']").val("SUBSCRIBE");
i()
}else{g(this).parents(".prod_order_subscription_options").siblings().find(".subscription_plan").addClass("hide");
g("."+a.widgetClass+" input[name='data-pluginType']").val("");
g("."+a.widgetClass+" input[name='data-subscribeId']").val("");
g("."+a.widgetClass+" input[name='pluginType']").val("");
g("."+a.widgetClass+" input[name='subscribeId']").val("");
g("."+a.widgetClass+" #times_price_value").html("")
}});
function j(){g("."+a.widgetClass+' .subscription_label_left_input.subscription_s_radio[data-name="payMethod"]').each(function(){if(g(this).hasClass("s_radio_active")){if(g(this).attr("data-plan")){g("."+a.widgetClass+" input[name='data-pluginType']").val("SUBSCRIBE");
g("."+a.widgetClass+" input[name='pluginType']").val("SUBSCRIBE");
i()
}else{g("."+a.widgetClass+" input[name='data-pluginType']").val("");
g("."+a.widgetClass+" input[name='data-subscribeId']").val("");
g("."+a.widgetClass+" input[name='pluginType']").val("");
g("."+a.widgetClass+" input[name='subscribeId']").val("")
}}})
}function i(){g("."+a.widgetClass+" .plan_price").bind("DOMNodeInserted",function(l){b={}
});
var k=g("."+a.widgetClass+" #subscribe_sel");
g("."+a.widgetClass+" #subscribe_sel option").each(function(l){var m=g(this);
if(m.attr("value")==k.val()){g("."+a.widgetClass+" input[name='data-subscribeId']").val(m.attr("data-subscribeId"));
g("."+a.widgetClass+" input[name='subscribeId']").val(m.attr("data-subscribeId"));
g("."+a.widgetClass+" #times_price_value").html(m.find(".plan_price").html());
g("."+a.widgetClass+" #subscribe_sel_price .plan_price").each(function(){if(g(this).attr("data-index")==m.attr("data-index")){g("."+a.widgetClass+" #times_price_value").html(g(this).html())
}})
}});
g("."+a.widgetClass+" #subscribe_sel").change(function(){var l=g(this);
g("."+a.widgetClass+" #subscribe_sel option").each(function(){var m=g(this);
if(m.attr("value")==l.val()){g("."+a.widgetClass+" input[name='data-subscribeId']").val(m.attr("data-subscribeId"));
g("."+a.widgetClass+" input[name='subscribeId']").val(m.attr("data-subscribeId"));
g("."+a.widgetClass+" #subscribe_sel_price .plan_price").each(function(){if(g(this).attr("data-index")==m.attr("data-index")){g("."+a.widgetClass+" #times_price_value").html(g(this).html())
}})
}})
})
}}})
})(window,jQuery);