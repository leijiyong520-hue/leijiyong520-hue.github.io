/**
 * 产品详情
 */
(function (window, $, undefined) {
    var phoenixSite = window.phoenixSite || (window.phoenixSite = {});
    var prodDetail = phoenixSite.prodDetail || (phoenixSite.prodDetail = {});
    var _options = {};
    var savediscount = '';
    var savePercent = '';
    var currentsavediscount = '';
    var currentsavePercent = '';
    var player;
    var isFrontend = window.$_phoenix == undefined;
    $.extend(prodDetail, {
        init: function (option) {
            //初始化 组合购买(非sku商品)，sku产品初始化隐藏组合购买
            if (isFrontend && $("#skuValueId").val() != '') {
                prodDetail.queryCombPurchase('', option)
                // 非sku商品，详情页展示skuCode
                if (option.skuValueMap && option.skuValueMap != "{}") {
                    if ((JSON.parse(option.skuValueMap)[""] || {})["skuCode"]) {
                        $("." + option.widgetClass + " .sku-code").removeClass('hide')
                        $("." + option.widgetClass + " .sku-code .codeValue").text(JSON.parse(option.skuValueMap)[""]["skuCode"])
                    }
                    $("." + option.widgetClass + " .skuState").removeClass('hide')
                    $("." + option.widgetClass + " .skuStateBottonLabel").removeClass('hide')
                    var optionelement = JSON.parse(option.skuValueMap)['']
                    prodDetail.initSkuStateEvent(optionelement,option.widgetClass);
                    prodDetail.getDiscountActivity(optionelement, option.widgetClass);
                }
            }

            if (option['encodeProductId'].length > 0 && option.prodDetailShowStyle != '13' && option.prodDetailShowStyle != '14'){
                prodDetail.initLabel(option)
            }
            // 只在第一张产品图显示视频播放按钮
            if (option.prodDetailShowStyle === "2" || option.prodDetailShowStyle === "4") {
                if ($("." + option.widgetClass + ' .video_play_icon').length) {
                    $("." + option.widgetClass + ' .video_play_icon').each(function (index) {
                        if (index > 0) {
                            $(this).addClass("hide_video_play")
                        }
                    })
                }
            }
            if (option.prodDetailShowStyle == '9' || option.prodDetailShowStyle == '5' || option.prodDetailShowStyle == '7' || option.prodDetailShowStyle == '13' || option.prodDetailShowStyle == '14'){
                prodDetail.initVideoPlay(option)
            }

            // 页面初始化完成后，给所有视频添加poster参数
            if ($("." + option.widgetClass + ' .proddetails-detial-wrap video').length) {
                $("." + option.widgetClass + ' .proddetails-detial-wrap video').each(function (index) {
                    if (!$(this).attr('poster')) {
                        $(this).attr('poster', $(this)[0].src + '?vframe/jpg/offset/1');
                    }
                })
            }
            //星级评价
            var commentStar = document.getElementsByClassName("comment-star");
            var commentAssessLength = commentStar.length;

            var imgFull = "//a0.leadongcdn.cn/cloud/ikBqiKimRikSmimijljo/full1.png";
            var imgHalf = "//a0.leadongcdn.cn/cloud/ipBqiKimRikSmimiqljo/half1.png";
            var imgEmpty = "//a0.leadongcdn.cn/cloud/iqBqjKlqRikSmriijnjn/empty1.png";
            for (var i = 0; i < commentAssessLength; i++) {
                var starNum = commentStar[i].innerHTML;
                commentStar[i].innerHTML = " ";
                if (starNum * 2 % 2 == 0) {
                    for (var j = 0; j < starNum; j++) {
                        var pb = document.createElement("b");
                        pb.style.backgroundImage = "url(" + imgFull + ")";
                        pb.style.display = "inline-block";
                        pb.style.width = 15 + "px";
                        pb.style.height = 15 + "px";
                        commentStar[i].appendChild(pb);
                    }
                    var endStarNum = 5 - starNum;
                    for (var k = 0; k < endStarNum; k++) {
                        var pb = document.createElement("b");
                        pb.style.backgroundImage = "url(" + imgEmpty + ")";
                        pb.style.display = "inline-block";
                        pb.style.width = 15 + "px";
                        pb.style.height = 15 + "px";
                        commentStar[i].appendChild(pb);
                    }
                } else {
                    var starNums = parseInt(starNum);
                    for (var j = 0; j < starNums; j++) {
                        var pb = document.createElement("b");
                        pb.style.backgroundImage = "url(" + imgFull + ")";
                        pb.style.display = "inline-block";
                        pb.style.width = 15 + "px";
                        pb.style.height = 15 + "px";
                        commentStar[i].appendChild(pb);
                    }
                    var pb = document.createElement("b");
                    //这里半星改为一星
                    pb.style.backgroundImage = "url(" + imgHalf + ")";
                    pb.style.display = "inline-block";
                    pb.style.width = 15 + "px";
                    pb.style.height = 15 + "px";
                    commentStar[i].appendChild(pb);
                    var endStarNum = 5 - starNums - 1;
                    for (var k = 0; k < endStarNum; k++) {
                        var pb = document.createElement("b");
                        pb.style.backgroundImage = "url(" + imgEmpty + ")";
                        pb.style.display = "inline-block";
                        pb.style.width = 15 + "px";
                        pb.style.height = 15 + "px";
                        commentStar[i].appendChild(pb);
                    }
                }
            }
            $.extend(_options, option);
            prodDetail.bindEvent();
            // debugger
            //产品详情页面 对应的分类高亮
            prodDetail.categoryCurrentCheck();
            prodDetail.prodDetailIframe();
            if (isFrontend) {
                //产品详情描述标签悬浮效果
                setTimeout(function () {
                    prodDetail.tabfixShow();
                }, 2000);

                //sku关联图片预加载
                $("." + _options.widgetClass).append("<div class='skuvalue-img-wrap' style='height:0; width:0; overflow:hidden;'></div>");
                try {
                    if (option.skuValueMap) {
                        var skuValueMapData = $.parseJSON(option.skuValueMap);
                        var length = 0;
                        for (var n in skuValueMapData) {
                            length++;
                            if (skuValueMapData.length == 1 && skuValueMapData[n].stock == 0) {
                                $('.' + _widgetClass + ' #placeOrder').addClass("disabled");
                                $('.' + _widgetClass + ' #addToCart').addClass("disabled");
                            }
                            if (skuValueMapData[n].relationImage) {
                                $("." + _options.widgetClass + " .skuvalue-img-wrap").append("<img style='height:0; width:0; overflow:hidden;' src='" + skuValueMapData[n].relationImage + "' />");
                            }
                        }
                        if (length == 1) {
                            for (var n in skuValueMapData) {
                                if (skuValueMapData[n].stock == 0) {
                                    var perfix = phoenixSite.message(phoenixSite.lanEdition, "phoenix_product_stock");
                                    if(phoenixSite.lanEdition == 'EN_US'){
                                        $(".stock").html( ' <span class="stockValue">0</span> ' + ($("#productUnit").val() ? $("#productUnit").val() : '') + ' ' + perfix );
                                    }else{
                                        $(".stock").html(perfix + ' <span class="stockValue">0</span> ' + ($("#productUnit").val() ? $("#productUnit").val() : ''));
                                    }
                                    $('.' + _options.widgetClass + ' #placeOrder').addClass("disabled");
                                    $('.' + _options.widgetClass + ' #addToCart').addClass("disabled");
                                }
                            }
                        }
                    }
                } catch (e) {
                    try {
                        console && console.log && console.log(e);
                    } catch (e) {
                    }
                }
                // 默认选中规格
                // if ($("." + _options.widgetClass + " #prodPropDefaultSet")[0] != undefined && $("." + _options.widgetClass + " #prodPropDefaultSet").val() == '1') {
                //     // $("." + _options.widgetClass + " .skuParams").each(function (i, n) {
                //     //     if ($(n).find("a.radio-choose-btn")[0] != undefined) {
                //     //         if (!($(n).find("a.radio-choose-btn").eq(0).hasClass('choosed'))) {
                //     //             $($(n).find("a.radio-choose-btn")[0]).trigger("click");
                //     //         }
                //     //     }
                //     // });
                // } else {
                //     // $("." + _options.widgetClass + " .skuParams").each(function (i, n) {
                //     //     if ($(n).find("a.radio-choose-btn")[0] != undefined) {
                //     //         if (($(n).find("a.radio-choose-btn").eq(0).hasClass('choosed'))) {
                //     //             $($(n).find("a.radio-choose-btn")[0]).trigger("click");
                //     //         }
                //     //     }
                //     // });
                // }
                //
                if (!$("." + _options.widgetClass + " .skuParams").length && $("." + _options.widgetClass + " .prodDetail-wholeSale-price").length) {
                    // var comparePrice = parseFloat($("#prodPrice .needExchangeValue").attr("exchangevalue"));

                    var oldm = $("#prodPrice .needExchangeValue").attr("exchangevalue");
                    var index = oldm.indexOf(',')
                    var newm = oldm.replace(",", '.');
                    var comparePrice = parseFloat(newm);
                    getWholeIsShow(_options)
                    // $('.' + _options.widgetClass + ' .prodDetail-wholeSale-price .hide').show();
                    prodDetail.wholeSalePriceEvent(_options.widgetClass, comparePrice, index);
                }

                function getWholeIsShow(_options) {
                    var _widgetClass = _options.widgetClass;
                    //  调用接口
                    $.ajax({
                        url: "/phoenix/admin/prod/wholesalePrice",
                        type: "get",
                        success: function (response, textStatus, jqXHR) {
                            try {
                                response = JSON.parse(response);
                                if (response.wholesalePriceShow) {
                                    $(".prodDetail-wholeSale-price #wholesalePriceShow").val(response.wholesalePriceShow);
                                    var ishow = response.wholesalePriceShow;

                                    if (ishow == "1") {  //批发价可见
                                        $('.' + _widgetClass + ' .prodDetail-wholeSale-price .hide').show();
                                        $('.' + _widgetClass + ' .prodDetail-wholeSale-price .wholeSignIn').hide();
                                        $('.' + _widgetClass + ' .prodDetail-wholeSale-price .wholeTitle').hide();
                                    } else if (ishow = "0") { //批发价不可见
                                        $('.' + _widgetClass + ' .prodDetail-wholeSale-price .hide').hide();
                                        $('.' + _widgetClass + ' .prodDetail-wholeSale-price .wholeSignIn').show();
                                        $('.' + _widgetClass + ' .prodDetail-wholeSale-price .wholeTitle').show();
                                    }
                                }
                            } catch (error) {

                            }
                        }
                    });
                }


            }
            ;
            // 禁用所有无库存sku
            prodDetail.disabledSku()
            // 默认选中有效规格值
            if ($("." + _options.widgetClass + " #prodPropDefaultSet")[0] != undefined && $("." + _options.widgetClass + " #prodPropDefaultSet").val() == '1') {
                prodDetail.autoChooseSku()
            }
            //按钮点击委托
            //提交
            $(document).on("click", "#formsubmitClone", function (ev) {
                $(".form_inquire_popup #formsubmit").click();
            })
            //重置
            $(document).on("click", "#formresetClone", function (ev) {
                $(".form_inquire_popup #formreset").click();
            })
            $(document).on("click", ".pdfDownLoad", function () {
                window.pageYoffset = 0;
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
                html2canvas($("#backstage-bodyArea")[0], {
                    scale: 1.3,
                    useCORS: true,
                    allowTaint: false
                }).then(function (canvas) {
                    var contentWidth = canvas.width;
                    var contentHeight = canvas.height;

                    //一页pdf显示html页面生成的canvas高度;
                    var pageHeight = contentWidth / 592.28 * 841.89;
                    //未生成pdf的html页面高度
                    var leftHeight = contentHeight;
                    //页面偏移
                    var position = 0;
                    //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
                    var imgWidth = 595.28;
                    var imgHeight = 592.28 / contentWidth * contentHeight;

                    var pageData = canvas.toDataURL('image/jpeg', 1.0);

                    var pdf = new jsPDF('', 'pt', 'a4');

                    //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
                    //当内容未超过pdf一页显示的范围，无需分页
                    if (leftHeight < pageHeight) {
                        pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
                    } else {
                        while (leftHeight > 0) {
                            pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                            leftHeight -= pageHeight;
                            position -= 841.89;
                            //避免添加空白页
                            if (leftHeight > 0) {
                                pdf.addPage();
                            }
                        }
                    }
                    var pdfName = $(".this-description-name").text()
                    pdfName = pdfName.replace(/\./g, '')
                    pdf.save(pdfName + ".pdf");
                });
            })

            //评论跳转
            $(document).on("click", "." + option.widgetClass + " .showStarPlace", function (e) {
                if ($(".sitewidget-commentList").length > 0) {
                    $("html,body").animate({
                        scrollTop: $(".sitewidget-commentList").offset().top - 30
                    }, 300);
                }
            })
            // 产品详情音频
            if(_options.prodDetailShowStyle=='7') {
                initAudio(_options)
            }
            // 节流
            var flag = true;
            $(window).resize(function(){
                if(flag) {
                    setTimeout(function(){
                        flag = true;
                        initAudio(_options)
                    },1000)
                }
                flag = false
            });
            try {
                _options.templateSaveJson = decode(_options.templateSaveJsonEncode)
                if(_options.templateSaveJson != ""){
                    var templateObj = JSON.parse(decode(_options.templateSaveJsonEncode)).basicSaveJson.templateObj
                    if(templateObj.appName == "3D模型展示模板" ||
                        templateObj.appId == "kmKUAfpwcaKo" ||
                        templateObj.appId == "VGKpfUANUQWO" ||
                        templateObj.appId == "hbKAfUpcHump" ||
                        templateObj.appId == "hGpKfAUYSFbE"){
                        if(_options.templateSaveJson || _options.templateSaveJsonEncode){
                            initThreeD(_options);
                        }else{
                            console.log("3d模板数据初始化有误");
                        }
                    }else{
                        console.log("非3D模型展示模板");
                    }
                }
            }catch(error){
                console.log(error,"3d模板数据有误");
            }

        },
        insertAfter: function (newElement, targetElement) {
            var parent = targetElement.parentNode;
            if (parent.lastChild == targetElement) {
                // 如果最后的节点是目标元素，则直接添加。因为默认是最后
                parent.appendChild(newElement);
            } else {
                parent.insertBefore(newElement, targetElement.nextSibling);
                //如果不是，则插入在目标元素的下一个兄弟节点 的前面。也就是目标元素的后面
            }
        },
        // 满减优惠活动
        getDiscountActivity: function(optionelement, _widgetClass) {
            $("." + _widgetClass + " .prod-discount-main .discount-tips").empty();
            var mobile_view = false;
            if ($(window).width() < 569) {
                mobile_view = true;
            }
            // var skuValueMap = JSON.parse(option.skuValueMap);
            // var skuValueMap = {
            //     hasScheme: '1',
            //     schemeDesc: [ "满<strong>100</strong>打<strong>1</strong>折",
            //     "满<strong>200</strong>打<strong>2</strong>折", "满<strong>1200</strong>打<strong>5</strong>折", "满<strong>2000</strong>打<strong>7</strong>折"]
            // };
            var hasScheme = optionelement.hasScheme;
            var schemeDesc = optionelement.schemeDesc;
            if (hasScheme == '1') {
                $("." + _widgetClass + " .prod-discount-main").show();
            } else {
                $("." + _widgetClass + " .prod-discount-main").hide();
            }
            if (schemeDesc && schemeDesc.length && hasScheme == '1') {
                schemeDesc.forEach(function (item, index) {
                    if (index < 2) {
                        if (mobile_view) {
                            if (index == 0) {
                                $("." + _widgetClass + " .prod-discount-main .discount-tips").append('<div class="discount-content-mobile"><p class="discount-content">'+item+'</p></div>');
                            }
                            if (index == 1) {
                                $("." + _widgetClass + " .prod-discount-main .discount-tips").append('<div class="discount-content-mobile"><p class="discount-content">'+item+'</p><span class="discount-more"><i class="fa fa-chevron-down discount-icon" aria-hidden="true"></i></span></div>');
                            }
                        } else {
                            $("." + _widgetClass + " .prod-discount-main .discount-tips").append('<p class="discount-content">'+item+'</p>');
                        }
                    } else {
                        if (index == 2) {
                            if (mobile_view) {
                                $("." + _widgetClass + " .prod-discount-main .discount-tips").append('<div class="discount-more-module hide"><div class="discount-more-content"><div class="module-close"><i class="fa fa-times-circle" aria-hidden="true"></i></div></div></div>');
                            } else {
                                $("." + _widgetClass + " .prod-discount-main .discount-tips").append('<span class="discount-more"><i class="fa fa-chevron-down discount-icon" aria-hidden="true"></i></span><div class="discount-more-main discount-more-content hide"></div>');
                            }
                        }
                        if (mobile_view) {
                            $("." + _widgetClass + " .prod-discount-main").find(".discount-more-content").append('<div class="discount-content-item"><p class="discount-content">'+item+'</p></div>')
                        } else {
                            $("." + _widgetClass + " .prod-discount-main").find(".discount-more-content").append('<p class="discount-content">'+item+'</p>')
                        }
                    }
                })
                if (!mobile_view) {
                    $(document).bind("click",function(e){
                        var target = $(e.target);
                        if(target.closest(".discount-content").length == 0 && target.closest(".discount-icon").length == 0){
                            $("." + _widgetClass).find(".discount-more-content").hide();
                            $("." + _widgetClass + " .prod-discount-main").find(".discount-more i.fa").removeClass("overturn");
                        }
                    })
                    $("." + _widgetClass + " .prod-discount-main .discount-more").unbind('click').bind('click', function (){
                        $("." + _widgetClass + " .prod-discount-main").find(".discount-more-content").toggle();
                        $("." + _widgetClass + " .prod-discount-main").find(".discount-more i.fa").toggleClass("overturn");
                    })
                } else {
                    $("." + _widgetClass + " .prod-discount-main .discount-more").unbind('click').bind('click', function (){
                        $("." + _widgetClass + " .prod-discount-main").find(".discount-more-module").show();
                        $("body.frontend-body-canvas").addClass("discount-module-hidden");
                        // 排除风格12影响的样式
                        $("." + _widgetClass + " .newStyle7").find(".proddetail-bigpic").addClass("rm-zindex");
                        //移动端快速联系遮挡兼容
                        if($('.sitewidget-onlineService')){
                            var mrg13 = 0;
                            $('.sitewidget-onlineService').outerHeight();
                            if($('.sitewidget-onlineService').hasClass('sitewidgetOnlineServiceStyle13')){
                                mrg13 = 3;
                            }
                            if($('.sitewidget-onlineService').find('.onlineservice-cont').length == 0 ){
                                $("." + _widgetClass + " .prod-discount-main").find(".discount-more-module .discount-more-content").css('bottom',$('.sitewidget-onlineService').height() + mrg13);
                            }
                        }

                    })
                    $("." + _widgetClass + " .discount-more-module .module-close").unbind('click').bind('click', function (){
                        $("." + _widgetClass + " .prod-discount-main").find(".discount-more-module").hide();
                        $("body.frontend-body-canvas").removeClass("discount-module-hidden");
                        $("." + _widgetClass + " .newStyle7").find(".proddetail-bigpic").removeClass("rm-zindex");
                    })
                }
            }
        },
        queryCombPurchase: function (skuValueId, option) {
            if ($("#prodCombine").val() != '1') {
                return
            }
            var data = {}
            if (option) {
                data = {
                    "skuValueId": skuValueId,
                    "prodId": option.productId,
                    "orderModuleFlag": option.orderModuleFlag,
                    "cartModuleFlag": option.cartModuleFlag,
                    "widgetClass": option.widgetClass,
                    "phoenix_shopingcart_notice": option.phoenix_shopingcart_notice || ''
                }
            } else {
                data = {
                    "skuValueId": skuValueId,
                    "prodId": _options.productId,
                    "orderModuleFlag": _options.orderModuleFlag,
                    "cartModuleFlag": _options.cartModuleFlag,
                    "widgetClass": _options.widgetClass,
                    "phoenix_shopingcart_notice": _options.phoenix_shopingcart_notice || ''
                }
            }
            var params = {
                url: "/phoenix/admin/prod/combine",
                type: "get",
                data: data,
                done: function (xhr) {
                    if (xhr != '' && $("#isSkuProd").val() == 1) {
                        $("." + _options.widgetClass + ' #combPurchaseWrap').removeClass('hide').html(xhr)
                    }
                }
            };
            phoenixSite.ajax(params);
        },
        toDecimal2: function (x) {
            var f = parseFloat(x);
            if (isNaN(f)) {
                return false;
            }
            var f = Math.round(x * 100) / 100;
            var s = f.toString();
            var rs = s.indexOf('.');

            if (rs < 0) {
                rs = s.length;
                s += '.';
            }

            while (s.length <= rs + 2) {
                s += '0';
            }

            return s;
        },
        wholeSalePriceEvent: function (obj, currentPrice, index) {
            var _this = this;
            //计算区间价格
            var objList = $('.' + obj + ' .prodDetail-wholeSale-price ul li');
            //币种汇率
            var cookieObject = phoenixSite.payCoinExchange.getCurrencyCookie();

            var defaultRate = cookieObject['defaultRate'], type = cookieObject['type'], unit = cookieObject['unit'],
                symbol = cookieObject['symbol'], rate = cookieObject['rate'];

            objList.each(function (i) {
                if (i > 0) {
                    //订货数量展示
                    if (!$(this).hasClass("load-changed")) {
                        var $thisGradient = $(this).find('.gradient .gradientNum');
                        var $nextGradient = objList.eq(i + 1).find('.gradient .gradientNum');

                        var thisGradientText = $thisGradient.text();
                        var nextGradientText = parseInt($nextGradient.text()) - 1;

                        if (i != (objList.length - 1) && thisGradientText != nextGradientText) {
                            thisGradientText += nextGradientText ? (' - ' + nextGradientText) : '';
                            $thisGradient.text(thisGradientText);
                            $thisGradient.siblings('.symbol').remove();
                        } else if (thisGradientText == nextGradientText) {
                            $thisGradient.siblings('.symbol').remove();
                        }

                        $(this).addClass("load-changed");
                    }

                    //订货价格展示
                    var $oferPrice = $(this).find('.offer .salePrice');
                    var _gradient = parseFloat($(this).attr("gradient"));
                    var _offerPrice = parseFloat($oferPrice.attr("offer"));
                    var _currentPrice = currentPrice ? parseFloat(currentPrice) : 0;

                    if (index > -1) {//德语金额处理‘.’改为‘,’
                        var newPrice = _this.toDecimal2(_currentPrice + _offerPrice);
                        var _currentPrice = newPrice.replace(".", ',');
                    } else {
                        var _currentPrice = _this.toDecimal2(_currentPrice + _offerPrice);
                    }
                    $oferPrice.text((_currentPrice * rate).toFixed(2));
                    $oferPrice.attr("exchangevalue", _currentPrice);
                    if (parseFloat($('.' + _options.widgetClass + ' .order-quan-input').val()) >= _gradient) {
                        $('.' + _options.widgetClass + ' #prodDiscountPriceCurrent .needExchangeValue').attr("exchangevalue", _currentPrice);
                        phoenixSite.payCoinExchange.handleElement($('.' + _options.widgetClass + ' #prodDiscountPriceCurrent'));
                    }
                }
            });

            $('.' + obj + ' .prodDetail-wholeSale-price a').removeClass('disabled');
            $('.' + obj + ' .prodDetail-wholeSale-price a').unbind('click').bind('click', function () {
                $(this).siblings("ul").toggle();
                var icon = $(this).find(".fa");
                if (icon.hasClass("fa-caret-down")) {
                    icon.addClass("fa-caret-up").removeClass("fa-caret-down");
                } else if (icon.hasClass("fa-caret-up")) {
                    icon.addClass("fa-caret-down").removeClass("fa-caret-up");
                }
            })
        },
        //产品详情描述标签悬浮效果
        tabfixShow: function () {

            var pageScrollTabChange = function () {
                // 是否有偏移
                var proTabScroll = false;
                // 是否点击页签
                var clickLable = false;
                //当前产品详情组件
                var thisWidgetClass = _options.widgetClass;
                var proddetailWrap = $("." + thisWidgetClass + " .sitewidget-bd");
                var isPic12 = $('.sitewidget-proddetail-12').length
                var proddetailWrapOffset = proddetailWrap.offset();

                //当前标签卡
                //.detial-cont-prodescription .detial-cont-tabslabel 产品描述标签卡效果
                //.detial-cont-divsions .detial-scrollLabel-wrap 产品描述平铺效果

                var tabsLabel = $(".detial-cont-prodescription .detial-cont-tabslabel,.detial-cont-divsions .detial-scrollLabel-wrap");
                var tabsLabelOffset = tabsLabel.offset();
                var tabsLabelHeight = tabsLabel.outerHeight();

                //悬浮模块
                var containerHolding = $(".outerContainer.holding");
                // 悬浮区块页头
                var has_blockHeadFixed = $(".has_blockHeadFixed");
                var needToFloat = false;
                var dist = tabsLabelOffset ? tabsLabelOffset.top : 0;
                var fixedTop='0';
                if(containerHolding.length){
                    fixedTop=containerHolding.height();
                }else if(has_blockHeadFixed.length){
                    fixedTop=has_blockHeadFixed.height();
                }
                if (proddetailWrap.find('.detial-cont-divsions .detial-scrollLabel-wrap').hasClass('detial-scroll-hide')) {
                    proddetailWrap.find('.detial-cont-divsions .detial-scrollLabel-wrap').remove();
                }

                if ((proddetailWrap.find('.detial-cont-divsions .detial-scrollLabel-wrap').length || proddetailWrap.hasClass("proddetail-tabfix-show")) && $(window).width() >= 980) {
                    //位置控制
                    if (proddetailWrap.find('.detial-cont-divsions .detial-scrollLabel-wrap').length) {
                        tabsLabel.css({
                            "left": !isPic12?proddetailWrap.hasClass("prodDetail-tab-hover-event") ? Math.round(proddetailWrapOffset.left) : Math.round(proddetailWrapOffset.left):'auto',
                            "top": fixedTop,
                            "z-index": "3",
                            "width": !isPic12?proddetailWrap.hasClass("prodDetail-tab-hover-event") ? parseInt(proddetailWrap.width()) : (parseInt(proddetailWrap.width()) - 2):$('.detial-cont-divsions').width(),
                        });

                    } else {
                        tabsLabel.css({
                            "left": !isPic12?proddetailWrap.hasClass("prodDetail-tab-hover-event") ? Math.round(proddetailWrapOffset.left) : (Math.round(proddetailWrapOffset.left) + 1):'auto',
                            "top": fixedTop,
                            "z-index": "3",
                            "width": !isPic12?proddetailWrap.hasClass("prodDetail-tab-hover-event") ? parseInt(proddetailWrap.width()) : (parseInt(proddetailWrap.width()) - 2):$('.detial-cont-divsions').width()
                        });
                    }
                    if (containerHolding.length) {
                        dist = dist - containerHolding.height();
                    }
                    var rmScrollTimer = null;
                    //点击跳转位置控制
                    var clickFlag = 0;

                    tabsLabel.find("li").on('click', function () {
                        if(clickFlag < 1) {
                            clickFlag += 1;
                            dist = parseInt(dist);
                            //悬浮模块
                            var _containerHolding = $(".outerContainer.holding");
                            // 悬浮区块页头
                            var _has_blockHeadFixed = $(".has_blockHeadFixed");
                            var _fixedTop=0;
                            if(_containerHolding.length){
                                _fixedTop=_containerHolding.height();
                            }else if(_has_blockHeadFixed.length){
                                _fixedTop=_has_blockHeadFixed.height();
                            }
                            var prodDetailTabOffset = $("input[name=prodDetailTabOffset]").val();
                            if (proddetailWrap.find('.detial-cont-divsions .detial-scrollLabel-wrap').length) {
                                var _this = this;
                                var index = $(this).index();
                                var contOffset = tabsLabel.siblings('.detial-cont-notabscont').find('.prodDescriptContWrap').eq(index).offset();
                                var noTabDist = contOffset.top - (_fixedTop + tabsLabelHeight + 10);
                                $(this).addClass("on").siblings().removeClass('on');
                                if (rmScrollTimer) {
                                    clearTimeout(rmScrollTimer);
                                }
                                rmScrollTimer = setTimeout(function () {
                                    $(_this).addClass("on").siblings().removeClass("on");
                                    clickLable = false;
                                }, 500);
                                if ($(window).scrollTop() >= dist && $(".tabs-label-scrolling").length) {
                                    proTabScroll = true;
                                    thisActiveIndex = index;
                                    noTabDist = contOffset.top - (_fixedTop + tabsLabelHeight + 10) - Number(prodDetailTabOffset);
                                }
                                clickLable = true;
                                $(window).scrollTop(noTabDist);
                            } else {
                                if (prodDetailTabOffset == undefined || !prodDetailTabOffset || prodDetailTabOffset == '0') {
                                    $(window).scrollTop(dist);
                                }
                            }
                            clickFlag = 0
                        }
                    });

                    //页面滚动处理
                    var prodDescriptContOffset = [];
                    tabsLabel.siblings('.detial-cont-notabscont').find('.prodDescriptContWrap').each(function (i) {
                        //悬浮模块
                        var _containerHolding = $(".outerContainer.holding");
                        // 悬浮区块页头
                        var _has_blockHeadFixed = $(".has_blockHeadFixed");
                        var _fixedTop=0;
                        if(_containerHolding.length){
                            _fixedTop=_containerHolding.height();
                        }else if(_has_blockHeadFixed.length){
                            _fixedTop=_has_blockHeadFixed.height();
                        }
                        var contOffset = tabsLabel.siblings('.detial-cont-notabscont').find('.prodDescriptContWrap').eq(i).offset();
                        var noTabDist = contOffset.top - (_fixedTop + tabsLabelHeight + 10);
                        prodDescriptContOffset.push(noTabDist);
                    });
                    var scrollTimer = null;
                    var checkContOffset = function (allOffset, position) {
                        var index = 0;
                        for (var i = 0; i < allOffset.length; i++) {
                            if (position >= allOffset[i]) {
                                index = i;
                            }
                        }
                        if (!proTabScroll && !clickLable) {
                            tabsLabel.find('li').eq(index).addClass('on').siblings().removeClass('on');
                        }
                    }
                    proTabScroll = false;
                    needToFloat = true;
                    if(isPic12) {
                        dist = $('.pc-proddetail-bigpic').height()+$('.pc-proddetail-bigpic').offset().top-$('.detial-cont-notabscont').height() - $('.detial-scrollLabel-wrap').outerHeight()
                    }
                    $(window).bind("scroll", function () {
                        proTabScroll = false;
                        if (needToFloat) {
                            if ($(this).scrollTop() >= parseInt(dist)) {
                                //悬浮模块
                                var _containerHolding = $(".outerContainer.holding");
                                // 悬浮区块页头
                                var _has_blockHeadFixed = $(".has_blockHeadFixed");
                                var _fixedTop=0;
                                if(_containerHolding.length){
                                    _fixedTop=_containerHolding.height();
                                }else if(_has_blockHeadFixed.length){
                                    _fixedTop=_has_blockHeadFixed.height();
                                }
                                if (tabsLabel.css("position") != "fixed") {
                                    // tabsLabel.after("<div class='tabsLabelHolder' style=height:" + (proddetailWrap.hasClass("prodDetail-tab-hover-event") ? tabsLabelHeight : (tabsLabelHeight + 1)) + "px;margin-top:" + _fixedTop + "px></div>");
                                    tabsLabel.after("<div class='tabsLabelHolder' style=height:" + (proddetailWrap.hasClass("prodDetail-tab-hover-event") ? tabsLabelHeight : (tabsLabelHeight + 1)) + "px></div>");
                                    tabsLabel.css("position", "fixed");
                                    tabsLabel.addClass('tabs-label-scrolling');
                                }
                                if (proddetailWrap.find('.detial-cont-divsions .detial-scrollLabel-wrap').length) {
                                    var _scrollTop = $(this).scrollTop();
                                    if (scrollTimer) {
                                        clearTimeout(scrollTimer);
                                    }
                                    scrollTimer = setTimeout(function () {
                                        checkContOffset(prodDescriptContOffset, _scrollTop);
                                    }, 300)
                                }
                                if (proddetailWrap.find('.detial-cont-divsions .tabs-label-scrolling').length) {
                                    tabsLabel.css("top", _fixedTop + 'px');
                                }
                            } else {
                                tabsLabel.css("position", "static")
                                tabsLabel.next(".tabsLabelHolder").remove();
                                tabsLabel.removeClass('tabs-label-scrolling');
                            }
                        }
                    })
                } else {
                    //$(window).unbind("scroll");
                    needToFloat = false;
                    tabsLabel.removeAttr("style");
                    tabsLabel.next(".tabsLabelHolder").remove();
                }
            }

            //页面滚动方法执行
            var winResize = null;
            pageScrollTabChange();
            $(window).resize(function () {
                if (winResize) {
                    clearTimeout(winResize);
                }
                winResize = setTimeout(function () {
                    pageScrollTabChange();
                }, 100);
            })
        },
        proitemWidth: function () {
            var _widgetClass = _options.widgetClass;

            var $proitemspecificslist = $(".pro-itemspecifics-list");
            if($('.' + _widgetClass).attr('fieldAlignStyle') == '2'){
                proitemspecificslist.children().attr('style', '');
                return;
            }
            var $listwidth = $proitemspecificslist.width();
            if ($listwidth >= 720) {
                $proitemspecificslist.children().css("width", "33%")
            } else if ($listwidth >= 520) {
                $proitemspecificslist.children().css("width", "calc(50% - 25px)")
            } else {
                $proitemspecificslist.children().css("width", "99%")
            }
        },
        categoryCurrentCheck: function () {
            if ($(".sitewidget-proddetail").length && $(".sitewidget-prodGroupCategory").length && $(".sitewidget-position").length) {
                var positionLink = $(".sitewidget-position .sitewidget-bd a:last");
                var cateLink = $.trim(positionLink.attr("href"));
                $(".sitewidget-prodGroupCategory .sitewidget-bd li").each(function () {
                    if ($.trim($(this).find("a").attr("href")) == cateLink) {
                        $(this).addClass("on");
                        return;
                    }
                });
            }
        },
        bindEvent: function () {
            prodDetail.proitemWidth();
            $(window).resize(function () {
                prodDetail.proitemWidth();
            })

            var optionMap;
            var totalStock;
            var perfix = phoenixSite.message(phoenixSite.lanEdition, "phoenix_product_stock");
            var suffix = phoenixSite.message(phoenixSite.lanEdition, "phoenix_product_stock_unit");
            if (!!_options.skuValueMap) {
                optionMap = $.parseJSON(_options.skuValueMap);
                if (!$.isEmptyObject(optionMap)) {
                    var hasStock = false;
                    for (var key in optionMap) {
                        if (!!optionMap[key].stock) {
                            hasStock = true;
                            totalStock = parseInt(optionMap[key].stock);
                        }
                    }
                    if (hasStock) {
                        if (!$(".sitewidget-proddetail .proddetail-wrap").hasClass("proddetail-pic600")) {
                            //$(".stock").html('<td>' + perfix + ': </td><td class="stockValue">' + totalStock + '</td>');
                        } else {
                            $(".sitewidget-proddetail .proddetail-wrap .stockValue").remove();
                            //$(".stock").html('<th>' + perfix + ': </th>').after('<tr class="stockValue"><td>' + totalStock + '</td></tr>');
                        }
                        if(phoenixSite.lanEdition == 'EN_US'){
                            $(".stock").html( ' <span class="stockValue">' + totalStock + '</span> ' + ($("#productUnit").val() ? $("#productUnit").val() : '') + ' ' + perfix );
                        }else{
                            $(".stock").html(perfix + ' <span class="stockValue">' + totalStock + '</span> ' + ($("#productUnit").val() ? $("#productUnit").val() : ''));
                        }
                    } else {
                        $(".stock").html('');
                    }
                }
            }

            Array.prototype.indexOf2 = function (val) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i] == val)
                        return i;
                }
                return -1;
            };
            Array.prototype.remove = function (val) {
                var index = this.indexOf2(val);
                while (index > -1) {
                    this.splice(index, 1);
                    index = this.indexOf2(val);
                }
            };
            // 处理无图sku
            var prodSkuDom = $("#thumblist").children().clone();
            $("." + _options.widgetClass + " .skuParams .description-btn-wrap a").bind('click', function () {
                if (!$(this).attr('attr-img') && !$(this).attr('attr-img').length && prodSkuDom.length) {
                    $("." + _options.widgetClass + " #thumblist").empty().append(prodSkuDom);
                    // 风格6图片预览
                    try {
                        if (_options.prodDetailShowStyle == "6" && _options.prodImgZoomSize != '' && _options.prodImgZoomSize == '0') {
                            var thumblistClone = $("#thumblist").clone(false);
                            $("." + _options.widgetClass + " #thumblist").remove();
                            $("." + _options.widgetClass + " .thumblist-scroll").append(thumblistClone);
                            setTimeout(function() {
                                new Viewer(document.querySelector("#thumblist"), {
                                    url: 'data-original'
                                });
                            }, 200);
                        };
                    } catch (error) {
                        console.log(error);
                    }
                    $("." + _options.widgetClass + " #thumblist").find("li").eq(0).find("a").addClass("zoomThumbActive");
                    if ($("#thumblist").find("li").find("a.zoomThumbActive").parents(".prod-video-content").length) {
                        $("#thumblist").find("li").find("a.zoomThumbActive").parents(".prod-video-content").addClass("zoomActive")
                    };
                    $("." + _options.widgetClass + " #thumblist").find("li").eq(0).siblings().find("a").removeClass("zoomThumbActive");
                    var imgSrc = $("." + _options.widgetClass + " #thumblist li:not('.prod-video-content'):nth-of-type(1)").find("img").attr("src");
                    if (imgSrc) {
                        var re = new RegExp("(.*)-(.*)-(.*)", "ig");
                        var r = re.exec(imgSrc);
                        var Imgtype = '-800-800.' + imgSrc.replace(/^.+\./, '');
                        var src = r[1] + Imgtype;
                        $("." + _options.widgetClass + " img[bigimgonly=attr_BigImgOnly_leadong]").attr("src", src);
                        if (_options.prodDetailShowStyle == "6") {
                            $("." + _options.widgetClass + " img[bigimgonly=attr_BigImgOnly_leadong]").attr({"replace-original": src, "data-original": src});
                        };
                    } else {
                        if ($("." + _options.widgetClass).find(".prodetail-video-wrap img.offsetimg").length > 0) {
                            var prewImgUrl = $("." + _options.widgetClass).find(".prodetail-video-wrap img.offsetimg").attr("src");
                            $("." + _options.widgetClass + " img[bigimgonly=attr_BigImgOnly_leadong]").attr("src", prewImgUrl);
                            $("." + _options.widgetClass + " .pro_pic_small img.video-preview-image").attr("src", prewImgUrl);
                            $("." + _options.widgetClass + " .pro_pic_small img.video-preview-image").attr("org-src", prewImgUrl);
                            setTimeout(function() {
                                $('.' + _options.widgetClass +' li.prod-video-content .diolag-module-bg').unbind("click").bind("click", function(e) {
                                    e.stopPropagation();
                                    prodDetail.startPlayVideo($('.' + _options.widgetClass + ' .prodetail-video-wrap').attr("data-video-url"));
                                });
                            }, 1000);
                        }
                    }
                    prodDetail.bindImgEvent(_options.prodImgZoomSize)
                }
            })
            if (_options.prodDetailSkuStyle == '0') {
                var skuChooseItemTip = $(".skuParams .sku-choose-btn cite:first").html() || "请选择";
                $(".sku-choose-btn cite").click(function () {
                    var parntsObj = $(this).parents(".sku-choose-btn");
                    $(this).closest("tr").siblings(".skuParams").find(".sku-choose-btn").removeAttr("style").find(".sku-choose-item").css("display", "none");
                    (parntsObj.css("z-index") == '3') ? parntsObj.removeAttr("style") : parntsObj.css("z-index", "3");
                    $(this).siblings(".sku-choose-item").slideToggle("fast");
                })
                $(".sku-choose-btn .sku-choose-item a").click(function () {
                    var curThis = this;
                    setTimeout(function () {
                        if ($(curThis).hasClass("disable")) {
                            return;
                        }
                        var curHtml = "";
                        if ($(curThis).hasClass("choosed")) curHtml = $(curThis).find("span").html();
                        var parentObj = $(curThis).closest(".sku-choose-btn");
                        parentObj.find("cite").html(curHtml || skuChooseItemTip);
                        parentObj.removeAttr("style");
                        parentObj.find(".sku-choose-item").removeAttr("style");

                    }, 0);
                });
            }
            var _widgetClass = _options.widgetClass;
            $("." + _widgetClass + " .alfProdDataildad").click(function () {
                $(this).find('a').trigger('click');
                return false
            })
            $("." + _widgetClass + " .radio-choose-btn").click(function (event) {
                $("." + _widgetClass).find(".discount-more-main.discount-more-content").hide();
                $("." + _widgetClass + " .prod-discount-main").find(".discount-more i.fa").removeClass("overturn");
                var _this = $(this);
                if (_this.hasClass("disable") || _this.hasClass("default-disabled") ) {
                    event.preventDefault(); // 阻止默认事件
                    event.stopPropagation(); // 阻止冒泡
                    // if (!$("." + _widgetClass + " input[name='notifyStatus']") || $("." + _widgetClass + " input[name='notifyStatus']").val() != '1') {
                    //     return false
                    // }
                    // if (!$("." + _widgetClass + " input[name='outStockNotifyFlag']") || $("." + _widgetClass + " input[name='outStockNotifyFlag']").val() != '1') {
                    //     return false
                    // }
                }
                //移除组合购买的内容
                $("." + _widgetClass + " #combPurchaseWrap").empty().addClass('hide')

                //移除skuCode的展示
                $("." + _widgetClass + " .sku-code").addClass('hide')
                $("." + _widgetClass + " .skuState").addClass('hide')
                $("." + _widgetClass + " .skuStateBottonLabel").addClass('hide')
                if (_this.hasClass('alfProdDatail')) {
                    if (_this.hasClass("choosed")) {
                        _this.removeClass("choosed");
                        _this.parent().removeClass('choosed')
                    } else {
                        _this.addClass("choosed")
                        _this.parent().addClass("choosed")
                        _this.parent().siblings().removeClass('choosed')
                        _this.parent().siblings().find('a').removeClass("choosed");
                        _this.parent().parent().parent().find('span.order-error-msg').hide();
                    }
                } else {
                    if (_this.hasClass("choosed")) {
                        _this.removeClass("choosed");
                    } else {
                        _this.addClass("choosed").siblings().removeClass("choosed");
                        _this.parent().parent().find('span.order-error-msg').hide();
                    }
                }
                var _changImg = "";
                if (!optionMap) {
                    _changImg = _this.children('img');
                } else {
                    var value_key = "";
                    var skuBox = _this.parents(".skuParams");
                    $("." + _widgetClass + " .radio-choose-btn").removeClass("disable");
                    $("." + _widgetClass + " [name='skuValueId']").val("");
                    var skuParamsLen = $("." + _options.widgetClass + " .skuParams").length;
                    var skuParamsArr = [];
                    var skuParamsArrInner = [];
                    for (var i = 0; i < skuParamsLen; i++) {
                        skuParamsArrInner = [];
                        for (var j = 0; j < $("." + _options.widgetClass + " .skuParams").eq(i).find(".description-btn-wrap a").length; j++) {
                            skuParamsArrInner.push($("." + _options.widgetClass + " .skuParams").eq(i).find(".description-btn-wrap a").eq(j).attr("value"));
                        }
                        skuParamsArr.push(skuParamsArrInner);
                    }
                    function doExchange(arr) {
                        var len = arr.length;
                        // 当数组大于等于2个的时候
                        if (len >= 2) {
                            // 第一个数组的长度
                            var len1 = arr[0].length;
                            // 第二个数组的长度
                            var len2 = arr[1].length;
                            // 2个数组产生的组合数
                            var lenBoth = len1 * len2;
                            //  申明一个新数组,做数据暂存
                            var items = new Array(lenBoth);
                            // 申明新数组的索引
                            var index = 0;
                            // 2层嵌套循环,将组合放到新数组中
                            for (var i = 0; i < len1; i++) {
                                for (var j = 0; j < len2; j++) {
                                    items[index] = arr[0][i] + "~!!~" + arr[1][j];
                                    index++;
                                }
                            }
                            // 将新组合的数组并到原数组中
                            var newArr = new Array(len - 1);
                            for (var i = 2; i < arr.length; i++) {
                                newArr[i - 1] = arr[i];
                            }
                            newArr[0] = items;
                            // 执行回调
                            return doExchange(newArr);
                        } else {
                            return arr[0];
                        }
                    }

                    //doExchange(skuParamsArr);
                    var skuParamsArrAll = doExchange(skuParamsArr);
                    //对数组的后面做截取"~!!~"处理
                    //for(var i=0;i<skuParamsArrAll.length;i++){
                    //skuParamsArrAll[i] = skuParamsArrAll[i].substring(0,skuParamsArrAll[i].length-4);
                    //}
                    var skuParamsArrAll2 = skuParamsArrAll;
                    for (var key in optionMap) {
                        for (var a = 0; a < skuParamsArrAll2.length; a++) {
                            if (skuParamsArrAll2[a] == key) {
                                skuParamsArrAll.remove(key);
                            }
                        }
                    }
                    //以上是后台没有传过来的sku


                    var chooseSku = [];//已选择的项集合
                    var disableClickSku = [];//库存为零或者没有sku项的集合
                    var disTemp = [];//
                    var ableClickSku = [];//可以点击的
                    var optionMapArr = [];//含当前选中的所有项
                    //便利所有选中的，存入chooseSku
                    $("." + _widgetClass + " .radio-choose-btn.choosed").each(function () {
                        chooseSku.push($(this).attr("value"));
                    });
                    $("." + _widgetClass + " .radio-choose-btn.choosed").each(function () {
                        var targetArea = $(this).parents(".skuParams").siblings(".skuParams");
                        var value = $(this).attr("value");
                        var denialItem = new Array();//禁止点击
                        optionMapArr = [];
                        disableClickSku = [];
                        ableClickSku = [];
                        $("." + _widgetClass + " .radio-choose-btn", targetArea).each(function () {
                            denialItem.push($(this).attr("value"));
                        })
                        for (var key in optionMap) {
                            optionMapArr.push(key);
                        }
                        for (var key in optionMap) {
                            for (var i = 0; i < chooseSku.length; i++) {
                                if (-1 == key.indexOf(chooseSku[i])) {
                                    optionMapArr.remove(key);
                                }
                            }
                        }
                        //此处只使用indexof方法判断是否为匹配的sku不准确
                        //key由[pkid]_[index]形式组成，当index足够多时，例如 QRKUAfpAUpiQ_10 和 QRKUAfpAUpiQ_1 就冲突了
                        //所以此处判断取的下一位字符是否为数字，为数字则并非准确匹配
                        for (var key in optionMap) {
                            if (-1 != key.indexOf(value)) {
                                var index = key.indexOf(value);
                                var length = value.length;
                                var reg = /^[0-9]$/;
                                var nextChar = key.substr(index + length, 1);
                                if (!reg.test(nextChar)) {
                                    if (optionMap[key].stock != 0) {
                                        key.split("~!!~").forEach(function (key) {
                                            denialItem.remove(key);
                                        })
                                    }
                                }

                            }
                        }
                        for (var i = 0; i < optionMapArr.length; i++) {
                            for (var key in optionMap) {
                                if (key == optionMapArr[i]) {
                                    if (optionMap[key].stock === 0) {
                                        disableClickSku.push(key);
                                    } else {
                                        ableClickSku.push(key);
                                    }
                                }
                            }
                        }
                        //debugger
                        //后台没有传过来的sku，一定是禁止点击的，所以给添加到disableClickSku中去
                        for (var i = 0; i < skuParamsArrAll.length; i++) {
                            disableClickSku.push(skuParamsArrAll[i]);
                        }
                        //遍历所有库存为零的sku，
                        for (var i = 0; i < disableClickSku.length; i++) {
                            disTemp = [];
                            disableClickSku[i].split("~!!~").forEach(function (key) {
                                disTemp.push(key);
                            })
                            //如果这条sku剩下没有选择的属性在其他有库存的sku中不存在，则禁止点击
                            if (disTemp.length > 2 && chooseSku.length != disTemp.length) {
                                var isAble = 0;
                                for (var j = 0; j < ableClickSku.length; j++) {
                                    ableClickSku[j].split("!!").forEach(function(item) {
                                        if (item == disTemp[0]){
                                            isAble = 1;
                                        }
                                    });
                                    // if (-1 != ableClickSku[j].indexOf(disTemp[chooseSku.length])) {
                                    //     isAble = 1;
                                    // }
                                }
                                if (isAble == 0) {
                                    var flag = 0;
                                    for (var k = 0; k < denialItem.length; k++) {
                                        if (denialItem[k] == disTemp[chooseSku.length]) {
                                            flag = 1;
                                        }
                                    }
                                    if (flag == 0) {
                                        denialItem.push(disTemp[chooseSku.length]);
                                    }
                                }
                            }
                            //当还剩下最后一个未选则时，找出这一个未选择的，如果这个未选择的在其他有库存的sku中不存在，则禁止点击
                            if (chooseSku.length + 1 == disTemp.length) {
                                for (var a = 0; a < chooseSku.length; a++) {
                                    disTemp.remove(chooseSku[a]);
                                }
                                var isAble = 0;
                                for (var j = 0; j < ableClickSku.length; j++) {
                                    if (-1 != ableClickSku[j].indexOf(disTemp[0])) {
                                        isAble = 1;
                                    }
                                }
                                if (isAble == 0) {
                                    var flag = 0;
                                    for (var k = 0; k < denialItem.length; k++) {
                                        if (denialItem[k] == disTemp[0]) {
                                            flag = 1;
                                        }
                                    }
                                    if (flag == 0) {
                                        denialItem.push(disTemp[0]);
                                    }
                                }
                            }
                        }

                        /*待注释待注释待注释待注释待注释待注释待注释待注释待注释待注释待注释*/
                        var disableClickSku2 = [];
                        for (var key in optionMap) {
                            if (optionMap[key].stock == 0) {
                                disableClickSku2.push(key);
                            }
                        }
                        //后台没有传过来的sku，一定是禁止点击的，所以给添加到disableClickSku中去
                        for (var i = 0; i < skuParamsArrAll.length; i++) {
                            disableClickSku2.push(skuParamsArrAll[i]);
                        }
                        for (var i = 0; i < disableClickSku2.length; i++) {
                            disTemp = [];
                            disableClickSku2[i].split("~!!~").forEach(function (key) {
                                disTemp.push(key);
                            })
                            //当选中数与sku个数相同，说明全选，则旁边的项如果sku库存为零，禁止点击
                            // debugger
                            var sameChooseArr = [];
                            if (chooseSku.length == disTemp.length) {
                                var sameChoose = 0;
                                for (var m = 0; m < chooseSku.length; m++) {
                                    for (var n = 0; n < disTemp.length; n++) {
                                        if (chooseSku[m] == disTemp[n]) {
                                            sameChoose++;
                                            sameChooseArr.push(chooseSku[m]);
                                        }
                                    }
                                }
                                if (sameChoose + 1 == chooseSku.length) {
                                    for (var o = 0; o < sameChooseArr.length; o++) {
                                        if (disTemp.indexOf(sameChooseArr[o]) != -1) {
                                            disTemp.remove(sameChooseArr[o]);
                                        }
                                    }
                                    denialItem.push(disTemp[0]);
                                }
                            }
                            if (disTemp.length == 1) {
                                denialItem.push(disTemp[0]);
                            }

                        }
                        //一条sku没有任何值的时候
                        denialItem.forEach(function (key) {
                            if (($("." + _widgetClass + " input[name='notifyStatus']") && $("." + _widgetClass + " input[name='notifyStatus']").val() == '1')
                                && ($("." + _widgetClass + " input[name='outStockNotifyFlag']") && $("." + _widgetClass + " input[name='outStockNotifyFlag']").val() == '1')) {
                                return
                            }
                            $(".radio-choose-btn[value='" + key + "']").addClass("disable");
                            $(".radio-choose-btn[value='" + key + "']").parent().addClass("disable");
                        })
                    })
                    //一条sku没有任何值的时候
                    var disableClickSku3 = [];
                    var denialItem2 = [];
                    for (var key in optionMap) {
                        if (optionMap[key].stock == 0) {
                            disableClickSku3.push(key);
                        }
                    }
                    //后台没有传过来的sku，一定是禁止点击的，所以给添加到disableClickSku中去
                    for (var i = 0; i < skuParamsArrAll.length; i++) {
                        disableClickSku3.push(skuParamsArrAll[i]);
                    }
                    for (var i = 0; i < disableClickSku3.length; i++) {
                        disTemp = [];
                        disableClickSku3[i].split("~!!~").forEach(function (key) {
                            disTemp.push(key);
                        })
                        if (disTemp.length == 1) {
                            denialItem2.push(disTemp[0]);
                        }
                    }
                    denialItem2.forEach(function (key) {
                        if (($("." + _widgetClass + " input[name='notifyStatus']") && $("." + _widgetClass + " input[name='notifyStatus']").val() == '1')
                            && ($("." + _widgetClass + " input[name='outStockNotifyFlag']") && $("." + _widgetClass + " input[name='outStockNotifyFlag']").val() == '1')) {
                            return
                        }
                        $(".radio-choose-btn[value='" + key + "']").addClass("disable").removeClass("choosed");
                        $(".radio-choose-btn[value='" + key + "']").parent().addClass("disable");
                    })

                    var choosedSize = $("." + _widgetClass + " .radio-choose-btn.choosed").length;
                    var $discount = $('.labelclass .discount')
                    if (choosedSize < $("." + _widgetClass + ' .skuParams').length) {
                        if (!!totalStock || 0 == totalStock) {
                            if (!$(".sitewidget-proddetail ." + _widgetClass + " .proddetail-wrap").hasClass("proddetail-pic600")) {
                                //$(".stock").html('<td>' + perfix + ': </td><td class="stockValue">' + totalStock + '</td>');
                            } else {
                                $(".sitewidget-proddetail ." + _widgetClass + " .proddetail-wrap .stockValue").remove();
                                //$(".stock").html('<th>' + perfix + ': </th>').after('<tr class="stockValue"><td>' + totalStock + '</td></tr>');
                            }
                            if(phoenixSite.lanEdition == 'EN_US'){
                                $("." + _widgetClass + " .stock").html( ' <span class="stockValue">' + totalStock + '</span> ' + ($("." + _widgetClass + " #productUnit").val() ? $("." + _widgetClass + " #productUnit").val() : '') + ' ' + perfix );
                            }else{
                                $("." + _widgetClass + " .stock").html(perfix + ' <span class="stockValue">' + totalStock + '</span> ' + ($("." + _widgetClass + " #productUnit").val() ? $("." + _widgetClass + " #productUnit").val() : ''));
                            }
                        } else {
                            $("." + _widgetClass + " .stock").html('');
                        }
                        $('.' + _widgetClass + ' #prodDiscountPriceCurrent').hide();
                        $('.' + _widgetClass + ' #prodDiscountPrice').show();
                        $('.' + _widgetClass + ' #prodPriceCurrent').hide();
                        $('.' + _widgetClass + ' #prodPrice').show();
                        $('.' + _widgetClass + ' .order-quan-input').change();
                        //prodDiscountPrice show的时候，换原标签中的原值
                        if ($discount.length) {
                            $discount.each(function(){
                                var $this=$(this)
                                $this.find('.off').html(savePercent)
                                $this.find('.savediscount').html(savediscount)
                            })
                        }

                        //批发模块价格展示
                        $('.' + _widgetClass + ' .prodDetail-wholeSale-price .hide').hide();
                        // 活动内容不显示
                        $("." + _widgetClass + " .prod-discount-main").hide();
                    } else {
                        $("." + _widgetClass + " .radio-choose-btn.choosed").each(function () {
                            if (!!value_key) {
                                value_key += "~!!~";
                            }
                            value_key += $(this).attr("value");
                        })
                        var option = optionMap[value_key];
                        if (!!option) {
                            if (!!option.relationImage) {
                                var picSize = _options.picSize;
                                var picMap = {
                                    0: "-460-460",
                                    1: "-300-300",
                                    2: "-400-400",
                                    3: "-350-350"
                                }
                                if (!!picSize && "1" != picSize) {
                                    if (_options.prodDetailShowStyle == '4') {
                                        option.relationImage300 = option.relationImage;
                                    } else {
                                        option.relationImage300 = option.relationImage300.replace("-300-300", "-800-800");
                                    }
                                }
                                _changImg = $("<img src='" + option.relationImage + "' normalimgurl='" + option.relationImage + "' imgurl='" + option.relationImage300 + "' alt=''>");
                                $("#skuImgUrl").val(option.relationImage);
                            }else{
                                $("#skuImgUrl").val("");

                            }
                            $("[name='skuValueId']").val(option.skuValueId);

                            //查询组合购买的list
                            prodDetail.queryCombPurchase(option.skuValueId)

                            //显示skuCode
                            if (option.skuCode) {
                                $("." + _widgetClass + " .sku-code").removeClass('hide')
                                $("." + _widgetClass + " .sku-code .codeValue").text(option.skuCode)
                            }
                            $("." + _widgetClass + " .skuState").removeClass('hide')
                            $("." + _widgetClass + " .skuStateBottonLabel").removeClass('hide')
                            prodDetail.initSkuStateEvent(option,_widgetClass)
                            prodDetail.getDiscountActivity(option,_widgetClass)
                            if (!!option.stock || 0 == option.stock) {
                                if (!$(".sitewidget-proddetail .proddetail-wrap").hasClass("proddetail-pic600")) {
                                    //$(".stock").html('<td>' + perfix + ': </td><td class="stockValue">' + option.stock + '</td>');
                                } else {
                                    $(".sitewidget-proddetail .proddetail-wrap .stockValue").remove();
                                    //$(".stock").html('<th>' + perfix + ': </th>').after('<tr class="stockValue"><td>' + option.stock + '</td></tr>');
                                }
                                if(phoenixSite.lanEdition == 'EN_US'){
                                    $(".stock").html( ' <span class="stockValue">' + option.stock + '</span> ' + ($("#productUnit").val() ? $("#productUnit").val() : '') + ' ' + perfix );
                                }else{
                                    $(".stock").html(perfix + ' <span class="stockValue">' + option.stock + '</span> ' + ($("#productUnit").val() ? $("#productUnit").val() : ''));
                                }
                                $('.' + _widgetClass + ' .order-quan-input').change();
                            } else {
                                $(".sitewidget-proddetail .proddetail-wrap .stockValue").remove();
                                $(".stock").html("");
                                $('.' + _widgetClass + ' .order-quan-input').change();
                            }

                            $('.' + _widgetClass + ' #prodPriceCurrent .needExchangeValue').attr("exchangevalue", option.comparePrice);
                            if (!isFrontend) {
                                $('.' + _widgetClass + ' #prodPriceCurrent .needExchangeValue').text(option.comparePrice);
                            }
                            phoenixSite.payCoinExchange.handleElement($('.' + _widgetClass + ' #prodPriceCurrent'));
                            $('.' + _widgetClass + ' #prodDiscountPriceCurrent .needExchangeValue').attr("exchangevalue", option.price);
                            if (!isFrontend) {
                                $('.' + _widgetClass + ' #prodDiscountPriceCurrent .needExchangeValue').text(option.price);
                            }
                            phoenixSite.payCoinExchange.handleElement($('.' + _widgetClass + ' #prodDiscountPriceCurrent'));

                            $('.' + _widgetClass + ' #prodDiscountPriceCurrent').show();
                            $('.' + _widgetClass + ' #prodDiscountPrice').hide();
                            $('.' + _widgetClass + ' #prodPriceCurrent').show();
                            $('.' + _widgetClass + ' #prodPrice').hide();
                            currentsavediscount=parseFloat((Number(option.comparePrice)-Number(option.price)).toFixed(4))
                            currentsavePercent=parseFloat((currentsavediscount * 100 / option.comparePrice).toFixed(0)) + '%OFF'
                            if ($discount.length) {
                                $discount.each(function(){
                                    var $this=$(this)
                                    $this.find('.off').html(currentsavePercent)
                                    $this.find('.savediscount').html(currentsavediscount)
                                })
                            }
                            //批发模块价格展示
                            // $('.' + _widgetClass + ' .prodDetail-wholeSale-price .hide').show();
                            getWholeIsShow();
                            prodDetail.wholeSalePriceEvent(_widgetClass, option.comparePrice);
                        }
                    }

                }
                function getWholeIsShow() {
                    //  调用接口
                    $.ajax({
                        url: "/phoenix/admin/prod/wholesalePrice",
                        type: "get",
                        success: function (response, textStatus, jqXHR) {
                            try {
                                response = JSON.parse(response);
                                if (response.wholesalePriceShow) {
                                    $(".prodDetail-wholeSale-price #wholesalePriceShow").val(response.wholesalePriceShow);
                                    var ishow = response.wholesalePriceShow;

                                    if (ishow == "1") {  //批发价可见
                                        $('.' + _widgetClass + ' .prodDetail-wholeSale-price .hide').show();
                                        $('.' + _widgetClass + ' .prodDetail-wholeSale-price .wholeSignIn').hide();
                                        $('.' + _widgetClass + ' .prodDetail-wholeSale-price .wholeTitle').hide();
                                    } else if (ishow = "0") { //批发价不可见
                                        $('.' + _widgetClass + ' .prodDetail-wholeSale-price .hide').hide();
                                        $('.' + _widgetClass + ' .prodDetail-wholeSale-price .wholeSignIn').show();
                                        $('.' + _widgetClass + ' .prodDetail-wholeSale-price .wholeTitle').show();
                                    }
                                }
                            } catch (error) {

                            }
                        }
                    });
                }

                if (!_changImg) {
                    var choosedSize = $("." + _widgetClass + " .radio-choose-btn.choosed").length;
                    if (_options.prodDetailShowStyle == '7' || _options.prodDetailShowStyle == '5' || _options.prodDetailShowStyle == '9' || _options.prodDetailShowStyle == '13' ){
                        if (!$("img[bigimgonly=attr_BigImgOnly_leadong]")) {
                            var imageWrap = $('.' + _widgetClass + ' .ms-slide .ms-slide-bgcont');
                            imageWrap.find("img").removeClass("transparent");
                            imageWrap.find(".skuChangImg").fadeOut(200, function () {
                                $(this).remove();
                            });
                        }
                    } else if(_options.prodDetailShowStyle == '14') {
                        if(!$("#skuImgUrl").val() && choosedSize > 1){
                            var imageWrap = $('.' + _widgetClass + ' .ms-slide .ms-slide-bgcont');
                            imageWrap.find("img").removeClass("transparent");
                            imageWrap.find(".skuChangImg").fadeOut(200, function () {
                                $(this).remove();
                            });
                        }

                    } else if (_options.prodDetailShowStyle == '4') {
                        var orgImg = $("." + _widgetClass + " .owl-item.active .prod-pic-item").find("img");
                        if (orgImg.attr("src") != orgImg.attr("org-src")) {
                            orgImg.attr("src", orgImg.attr("org-src"));
                            setTimeout(function () {
                                orgImg.parents(".owl-wrapper-outer.autoHeight").css("height", orgImg.height() + 10);
                            }, 1200);
                        }
                    }
                    event.preventDefault(); // 阻止默认事件
                    event.stopPropagation(); // 阻止冒泡
                    return;
                }

                if (_options.prodDetailShowStyle == '2' || _options.prodDetailShowStyle == '4') {
                    var imgWrap = $('.' + _widgetClass + " .owl-item.active a");
                    $('.' + _widgetClass + " .skuChangImgWrap").removeClass("skuChangImgWrap").find('>img').remove();
                    if (!imgWrap.hasClass('skuChangImgWrap')) {
                        imgWrap.addClass('skuChangImgWrap');
                        imgWrap.append('<img bigimgonly="attr_BigImgOnly_leadong" class="viewsImg" at="gg" src="' + _changImg.attr("imgUrl") + '" />');
                    } else {
                        imgWrap.find('>img').attr("src", _changImg.attr("imgUrl"));
                    }
                    setTimeout(function () {
                        $('.' + _widgetClass).find(".owl-wrapper-outer.autoHeight").height(imgWrap.find(">img").height() + 20);
                        setTimeout(function () {
                            $('.' + _widgetClass).find(".owl-wrapper-outer.autoHeight").height(imgWrap.find(">img").height() + 20);
                        }, 600);
                    }, 400)
                    //$('.' + _widgetClass + ' .prodpicBox .pic img').attr("src", _changImg.attr("imgUrl")).attr("alt", _changImg.attr('alt'));
                }
                    //  else if (_options.prodDetailShowStyle == '4') {
                    //      var thisImg = $("." + _widgetClass + " .owl-item.active .prod-pic-item").find("img");
                    //      thisImg.attr("src", _changImg.attr("imgUrl"));
                    //      setTimeout(function(){
                    //          thisImg.parents(".owl-wrapper-outer.autoHeight").css("height", thisImg.height() + 10);
                    //      }, 1200);
                //  }
                else if (_options.prodDetailShowStyle == '6') {
                    $('.' + _widgetClass + ' div.easyzoom a > img').attr("org-src", _changImg.attr("imgUrl")).attr("src", _changImg.attr("imgUrl")).attr("replace-original", _changImg.attr("imgUrl")).attr("data-original", _changImg.attr("imgUrl")).attr("alt", _changImg.attr("alt"));

                    //放大镜sku处理
                    $('.' + _widgetClass + ' #thumblist li.zoomThumbActive.hide').remove();
                    $('.' + _widgetClass + ' #thumblist .zoomThumbActive').removeClass('zoomThumbActive');
                    $('.' + _widgetClass + ' #thumblist').append('<li class="zoomThumbActive hide"><a class="light-item maplargepic400 cboxElement"></a></li>');
                    var indexWrap = $('.' + _widgetClass + ' #thumblist .zoomThumbActive');
                    var relString = {
                        gallery: 'gallerys',
                        smallimage: _changImg.attr("imgUrl"),
                        largeimage: _changImg.attr("imgUrl")
                    }
                    $('.' + _widgetClass + ' #thumblist .zoomThumbActive a')
                        .attr('href', _changImg.attr("imgUrl"))
                        .attr('rel', $.toJSON(relString).toString())
                        .attr('index', indexWrap.index());
                    $('.' + _widgetClass + ' div.easyzoom .light-item-big').attr('index', indexWrap.index());

                    prodDetail.bindImgEvent(_options.prodImgZoomSize);

                    var imageWrap = $('.' + _widgetClass + ' .ms-slide.ms-sl-selected .ms-slide-bgcont');
                    var MobileWrap = $('.prodetail-slider .owl-wrapper-outer .owl-wrapper a');
                    imageWrap.find("img").removeClass("transparent");
                    MobileWrap.find("img").removeClass("transparent");
                    if (!imageWrap.find(".skuChangImg").length) {
                        imageWrap.find("img").first().addClass("transparent");
                        imageWrap.append('<img bigimgonly="attr_BigImgOnly_leadong" class="skuChangImg viewsImg" style="width: 100%; height: auto; position: absolute; top: 50%; left: 0px; transform: translateY(-50%); z-index:3;" src="' + _changImg.attr("normalImgUrl") + '" />');
                        imageWrap.find("img[bigimgonly=attr_BigImgOnly_leadong]").attr({"replace-original": _changImg.attr("normalImgUrl"), "data-original": _changImg.attr("normalImgUrl")});
                    } else {
                        imageWrap.find("img").first().addClass("transparent");
                        imageWrap.find(".skuChangImg").attr("src", _changImg.attr("normalImgUrl"));
                    }
                    // 移动端
                    if ($('.' + _widgetClass + ' .pro_pic_small').css('display') != 'none') {
                        if (!MobileWrap.find(".skuChangImg").length) {
                            MobileWrap.find("img").first().addClass("transparent").attr("src", _changImg.attr("normalImgUrl"));
                            MobileWrap.first().append('<img bigimgonly="attr_BigImgOnly_leadong" class="skuChangImg viewsImg"style="width: 100%; height: auto; position: absolute; top: 50%; left: 0px; transform: translateY(-50%);" src="' + _changImg.attr("normalImgUrl") + '" />');
                            MobileWrap.find("img[bigimgonly=attr_BigImgOnly_leadong]").attr({"replace-original": _changImg.attr("normalImgUrl"), "data-original": _changImg.attr("normalImgUrl")});
                        }
                        else {
                            MobileWrap.find("img").first().addClass("transparent").attr("src", _changImg.attr("normalImgUrl"));
                            MobileWrap.find(".skuChangImg").attr("src", _changImg.attr("normalImgUrl"));
                        }
                        $('.' + _widgetClass + ' .prodetail-slider').data("owlCarousel").reinit({
                            items: 1,
                            autoPlay: false,
                        });
                    }
                } else if (_options.prodDetailShowStyle == '7' || _options.prodDetailShowStyle == '5' || _options.prodDetailShowStyle == '9' || _options.prodDetailShowStyle == '8' || _options.prodDetailShowStyle == '11' || _options.prodDetailShowStyle == '12' || _options.prodDetailShowStyle == '13' || _options.prodDetailShowStyle == '14') {
                    var imageWrap = $('.' + _widgetClass + ' .ms-slide.ms-sl-selected .ms-slide-bgcont');
                    var MobileWrap = $('.prodetail-slider .owl-wrapper-outer .owl-wrapper a');
                    $('.' + _widgetClass + ' div.easyzoom a').attr("href", _changImg.attr("normalImgUrl"));
                    $('.' + _widgetClass + ' div.easyzoom a > img').attr("src", _changImg.attr("imgUrl")).attr("alt", _changImg.attr("alt"));
                    imageWrap.find("img").removeClass("transparent");
                    MobileWrap.find("img").removeClass("transparent");
                    if (!imageWrap.find(".skuChangImg").length) {
                        imageWrap.find("img").first().addClass("transparent");
                        imageWrap.append('<img bigimgonly="attr_BigImgOnly_leadong" class="skuChangImg viewsImg" style="width: 100%; height: auto; position: absolute; top: 50%; left: 0px; transform: translateY(-50%); z-index:3;" src="' + _changImg.attr("normalImgUrl") + '" />');
                    } else {
                        imageWrap.find("img").first().addClass("transparent");
                        imageWrap.find(".skuChangImg").attr("src", _changImg.attr("normalImgUrl"));
                    }
                    // 移动端
                    if ($('.' + _widgetClass + ' .pro_pic_small').css('display') != 'none') {
                        if (!MobileWrap.find(".skuChangImg").length) {
                            MobileWrap.find("img").first().addClass("transparent").attr("src", _changImg.attr("normalImgUrl"));
                            MobileWrap.first().append('<img bigimgonly="attr_BigImgOnly_leadong" class="skuChangImg viewsImg"style="width: 100%; height: auto; position: absolute; top: 50%; left: 0px; transform: translateY(-50%);" src="' + _changImg.attr("normalImgUrl") + '" />');
                        }
                        else {
                            MobileWrap.find("img").first().addClass("transparent").attr("src", _changImg.attr("normalImgUrl"));
                            MobileWrap.find(".skuChangImg").attr("src", _changImg.attr("normalImgUrl"));
                        }
                        var $slider = $('.' + _widgetClass + ' .prodetail-slider');
                        if ($slider.length && $slider.data("owlCarousel")) {
                            $slider.data("owlCarousel").reinit({
                                items: 1,
                                autoPlay: false,
                            });
                        }
                    }

                } else {
                    $('.' + _widgetClass + ' div.easyzoom a').attr("href", _changImg.attr("normalImgUrl"));
                    $('.' + _widgetClass + ' div.easyzoom a > img').attr("src", _changImg.attr("imgUrl")).attr("alt", _changImg.attr("alt"));
                    if (_options.prodDetailShowStyle == '0' || _options.prodDetailShowStyle == '1' || _options.prodDetailShowStyle == '3' || _options.prodDetailShowStyle == '10') {
                        var MobileWrap = $('.prodetail-slider .owl-wrapper-outer .owl-wrapper a');
                        // 移动端处理
                        if ($('.' + _widgetClass + ' .pro_pic_small').css('display') != 'none') {
                            if (!MobileWrap.find(".skuChangImg").length) {
                                MobileWrap.find("img").first().addClass("transparent").attr("src", _changImg.attr("normalImgUrl"));
                                MobileWrap.first().append('<img bigimgonly="attr_BigImgOnly_leadong" class="skuChangImg viewsImg"style="width: 100%; height: auto; position: absolute; top: 50%; left: 0px; transform: translateY(-50%);" src="' + _changImg.attr("normalImgUrl") + '" />');
                            }
                            else {
                                MobileWrap.find("img").first().addClass("transparent").attr("src", _changImg.attr("normalImgUrl"));
                                MobileWrap.find(".skuChangImg").attr("src", _changImg.attr("normalImgUrl"));
                            }
                            $('.' + _widgetClass + ' .prodetail-slider').data("owlCarousel").reinit({
                                items: 1,
                                autoPlay: false,
                            });
                        }
                    }

                    //放大镜sku处理
                    $('.' + _widgetClass + ' #thumblist li.zoomThumbActive.hide').remove();
                    $('.' + _widgetClass + ' #thumblist .zoomThumbActive').removeClass('zoomThumbActive');
                    $('.' + _widgetClass + ' #thumblist').append('<li class="zoomThumbActive hide" largeimage=' + _changImg.attr("normalImgUrl") + '></li>');

                    prodDetail.bindImgEvent(_options.prodImgZoomSize);
                }
                event.preventDefault(); // 阻止默认事件
                event.stopPropagation(); // 阻止冒泡
            });
            // if (!!optionMap) {
            //     $(".skuParams").each(function(){
            //         if ($(".radio-choose-btn", this).length == 1) {
            //             $(".radio-choose-btn", this).click();
            //         }
            //     })
            // }
            //产品页签第一个没有值得时候默认显示第二个页签
            if(_options.prodDetailShowStyle != '12') {
                $('.' + _widgetClass + " .detial-cont-tabslabel li").each(function () {
                    if (!$(this).hasClass("on")) {
                        var prodDetailTabOffset = $("input[name=prodDetailTabOffset]").val();
                        if (!$(this).hasClass("on")) {
                            var thisIndex = $(this).index();
                            if ($('#prodDetailTabBtnsStyle').val() == '1') {
                                $(this).addClass("on").siblings().removeClass("on");
                            } else {
                                $(this).addClass("on").siblings().removeClass("on");
                            }
                            $('.' + _widgetClass + " .detial-cont-tabscont>div").eq(thisIndex).show().siblings().hide();
                            var iframeHeight = $('.' + _widgetClass + " .detial-cont-tabscont>div").eq(thisIndex).find("iframe").contents().find("body").height()
                            $('.' + _widgetClass + " .detial-cont-tabscont>div").eq(thisIndex).find("iframe").height(iframeHeight + 'px')

                            if (prodDetailTabOffset && $(".tabs-label-scrolling").length) {
                                $("html,body").animate({scrollTop: $('.' + _widgetClass + " .detial-cont-tabscont").offset().top - prodDetailTabOffset + "px"}, 500);
                            }
                            tableScroll("." + _widgetClass + " .detial-cont-prodescription");


                        } else {
                            return;
                        }
                        try{
                            $(window).resize()
                        }catch (e) {
                            console.log(e)
                        }

                    }
                    return false;
                })
            }

            //产品描述标签卡
            if(_options.prodDetailShowStyle != '12'){
                $('.' + _widgetClass + " .detial-cont-tabslabel li").click(function () {
                    var prodDetailTabOffset = $("input[name=prodDetailTabOffset]").val();
                    if (!$(this).hasClass("on")) {
                        var thisIndex = $(this).index();
                        if ($('#prodDetailTabBtnsStyle').val() == '1') {
                            $(this).addClass("on").siblings().removeClass("on");
                        } else {
                            $(this).addClass("on gbBgColor1").siblings().removeClass("on gbBgColor1");
                        }
                        $('.' + _widgetClass + " .detial-cont-tabscont>div").eq(thisIndex).show().siblings().hide();
                        var iframeHeight = $('.' + _widgetClass + " .detial-cont-tabscont>div").eq(thisIndex).find("iframe").contents().find("body").height()
                        $('.' + _widgetClass + " .detial-cont-tabscont>div").eq(thisIndex).find("iframe").height(iframeHeight + 'px')

                        // if (prodDetailTabOffset && $(".tabs-label-scrolling").length) {
                        //     $("html,body").animate({scrollTop: $('.' + _widgetClass + " .detial-cont-tabscont").offset().top - prodDetailTabOffset + "px"}, 500);
                        // }
                        tableScroll("." + _widgetClass + " .detial-cont-prodescription");

                        $('.' + _widgetClass + " .detial-cont-tabscont>div").find('.slick-slider').slick('setPosition');
                    } else {
                        return;
                    }
                    try{
                        $(window).resize()
                    }catch (e) {
                        console.log(e)
                    }


                });
            }
            //鼠标悬浮切换效果
            if ($("." + _widgetClass + " .prodDetail-tab-hover-event").length) {
                $(".detial-cont-tabslabel li").mouseenter(function () {
                    var prodDetailTabOffset = $("input[name=prodDetailTabOffset]").val();
                    if (!$(this).hasClass("on")) {
                        var thisIndex = $(this).index();
                        $(this).addClass("on").siblings().removeClass("on");
                        $(".detial-cont-tabscont>div").eq(thisIndex).show().siblings().hide();
                        var iframeHeight = $('.' + _widgetClass + " .detial-cont-tabscont>div").eq(thisIndex).find("iframe").contents().find("body").height()
                        $('.' + _widgetClass + " .detial-cont-tabscont>div").eq(thisIndex).find("iframe").height(iframeHeight + 'px')
                        if (prodDetailTabOffset && $(".tabs-label-scrolling").length) {
                            $("html,body").animate({scrollTop: $('.' + _widgetClass + " .detial-cont-tabscont").offset().top - prodDetailTabOffset + "px"}, 500);
                        }
                        tableScroll("." + _widgetClass + " .detial-cont-prodescription");
                    }
                    try{
                        $(window).resize()
                    }catch (e) {
                        console.log(e)
                    }
                });
            }

            //产品描述表格及图片处理
            if ($("." + _widgetClass + " .detial-cont-prodescription").length) {
                $(window).load(tableScroll("." + _widgetClass + " .detial-cont-prodescription"))
            }
            //只在前台调用
            if (isFrontend) {
                prodDetail.bindFrontendEvent();
            }
            //只在后台调用
            if (!isFrontend) {
                //短视频功能
                var hasVideo = $('.' + _options.widgetClass + ' .proddetail-wrap').eq(0).attr("hasprodvideo");
                if ((_options.prodDetailShowStyle == '0' || _options.prodDetailShowStyle == '1' || _options.prodDetailShowStyle == '2' || _options.prodDetailShowStyle == '3' || _options.prodDetailShowStyle == '4' || _options.prodDetailShowStyle == '5' || _options.prodDetailShowStyle == '6' || _options.prodDetailShowStyle == '7' || _options.prodDetailShowStyle == '8' || _options.prodDetailShowStyle == '9' || _options.prodDetailShowStyle == '10' || _options.prodDetailShowStyle == '11') && hasVideo === 'true') {
                    $(document).ready(function () {
                        $('.' + _options.widgetClass + ' .video_play_icon').show();
                    });

                }
            }
            prodDetail.bindImgEvent(_options.prodImgZoomSize);
            prodDetail.prodDesLenBeautiful();
            $(window).resize(function () {
                prodDetail.prodDesLenBeautiful();
            });
        },
        initSkuStateEvent: function(optionelement,_widgetClass){
            if(optionelement.hasState==='0'){
                var $skuState=$("." + _widgetClass + " .skuState")
                if(!$skuState.hasClass('hide')){
                    $skuState.addClass('hide')
                }
                var $skuStateBottonLabel=$("." + _widgetClass + " .skuStateBottonLabel")
                if(!$skuStateBottonLabel.hasClass('hide')){
                    $skuStateBottonLabel.addClass('hide')
                }
                return
            }
            var $label = $("." + _widgetClass + " .skuState .skuStateLabel span")
            var $absoluteLabel = $("." + _widgetClass + " .skuState .skuStateLabel .absoluteLabel")
            var $bottomLabel = $("." + _widgetClass + " .skuStateBottonLabel .bottomLabel");
            $label.text(optionelement.stateLabel)
            $absoluteLabel.text(optionelement.stateDesc)
            $bottomLabel.text(optionelement.stateDesc)
            var top=$('.skuStateLabel').height()
            if(top<33){top=33}
            if(optionelement.stateConfig && optionelement.stateConfig.desc && optionelement.stateConfig.desc.type==='1'){
                var style2=''
                if(optionelement.stateConfig.desc.bold==='1'){
                    style2+='font-weight:700;'
                }
                if(optionelement.stateConfig.desc.italic==='1'){
                    style2+='font-style:oblique;'
                }
                if(optionelement.stateConfig.desc.underLine==='1'){
                    style2+='text-decoration:underline;'
                }
                if(optionelement.stateConfig.desc.color.length>0){
                    style2+='color:'+optionelement.stateConfig.desc.color+';'
                }
                $absoluteLabel.attr('style',style2)
                $bottomLabel.attr('style',style2)
            }else{
                $bottomLabel.attr("style",'')
            }
            if(optionelement.stateConfig && optionelement.stateConfig.label && optionelement.stateConfig.label.type==='1'){
                var style1=''
                if(optionelement.stateConfig.label.bold==='1'){
                    style1+='font-weight:700;'
                }
                if(optionelement.stateConfig.label.italic==='1'){
                    style1+='font-style:oblique;'
                }
                if(optionelement.stateConfig.label.underLine==='1'){
                    style1+='text-decoration:underline;'
                }
                if(optionelement.stateConfig.label.color.length>0){
                    style1+='color:'+optionelement.stateConfig.label.color+';'
                }
                $label.attr('style',style1)
            }else{
                $label.attr("style",'')
            }
            if(optionelement.stateConfig && optionelement.stateConfig.desc && optionelement.stateConfig.desc.position==='1'){
                $label.unbind()
                if(!$absoluteLabel.hasClass('hide')){
                    $absoluteLabel.addClass('hide')
                }
                if($bottomLabel.hasClass('hide')){
                    $bottomLabel.removeClass('hide')
                }
            }else{
                if(!$bottomLabel.hasClass('hide')){
                    $bottomLabel.addClass('hide')
                }
                if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){
                    $label.unbind('click').bind('click',function (){
                        if($absoluteLabel.html().length>0){
                            if($absoluteLabel.hasClass('hide')){
                                $absoluteLabel.removeClass('hide')
                            }else{
                                $absoluteLabel.addClass('hide')
                            }
                            $absoluteLabel.css('top',top+'px')
                        }
                    })
                }else {
                    $label.unbind('mouseenter').bind('mouseenter',function (){
                        if($absoluteLabel.html().length>0){
                            $absoluteLabel.removeClass('hide')
                            $absoluteLabel.css('top',top+'px')
                        }
                    })

                    $label.unbind('mouseleave').bind('mouseleave',function (){
                        $absoluteLabel.addClass('hide')
                    })
                }
            }
        },

        // 产品详情图片事件绑定
        bindImgEvent: function (prodImgZoomSize) {
            var _widgetClass = _options.widgetClass;
            //滑动图片
            var slideVis = 0;
            if ($("." + _widgetClass + " .proddetail-wrap").hasClass("proddetail-pic300")) {
                slideVis = 4;
            } else if ($("." + _widgetClass + " .proddetail-wrap").hasClass("proddetail-pic460")) {
                slideVis = 6;
            } else if ($("." + _widgetClass + " .proddetail-wrap").hasClass("proddetail-pic400")) {
                slideVis = 5;
            } else if ($("." + _widgetClass + " .proddetail-wrap").hasClass("proddetail-pic350")) {
                slideVis = 4;
            }
            // $("." + _widgetClass + " .thumblist-scroll-btns").slide({
            //     titCell: "",
            //     mainCell: ".thumblist-scroll ul",
            //     autoPage: true,
            //     effect: "left",
            //     vis: slideVis,
            //     pnLoop: false,
            //     delayTime: 300
            // });
            //放大镜功能 Instantiate EasyZoom plugin
            if ($("." + _widgetClass + " .proddetail-wrap").hasClass("proddetail-zoomin")) {
                var $easyzoom = $('.easyzoom').easyZoom({
                    onShow: function () {
                        var flyoutImg = $(".easyzoom-flyout img").attr('src');
                        var zoomThumbActive = $("#thumblist .zoomThumbActive").attr("largeimage");

                        if (flyoutImg != zoomThumbActive) {
                            $(".easyzoom-flyout img").attr('src', zoomThumbActive);
                        }
                    }
                });
                // Get the instance API
                var api = $easyzoom.data('easyZoom');

                /*//图片预加载
                $('body>.proddetail-zoomin-picwrap').remove();
                $('body').append("<div class='proddetail-zoomin-picwrap'></div>");
                $("#thumblist li").each(function(){
                    var appendBigImgSrc = $(this).find("a").attr("largeimage");
                    var appendNormalImgSrc = $(this).find("a").attr("smallimage");
                    $(".proddetail-zoomin-picwrap").append("<img src=" + appendBigImgSrc + " />" + "<img src=" + appendNormalImgSrc + " />");
                });*/
            }
            //初始化图片索引
            $("#thumblist li a").each(function (index) {
                $(this).attr("index", index);
            });
            //lightbox功能 Jquery lightbox plugin
            if ($("." + _widgetClass + " .proddetail-wrap").hasClass("proddetail-lightbox")) {
                if (prodImgZoomSize != '' && prodImgZoomSize == '1') {
                    //全屏模式
                    addZoomDom();

                } else if (prodImgZoomSize != '' && prodImgZoomSize == '2') {
                    $(".proddetail-lightbox .light-item,.proddetail-lightbox .light-item-big,.proddetail-lightbox .pro_pic_small .prod-pic-item>a").unbind('click').bind("click", function (e) {
                        var imgSrc = $(this).find("img").attr("data-original");
                        var replaceOriginal = $(this).find("img").attr("replace-original");
                        try {
                            if(replaceOriginal!=undefined&&replaceOriginal!=null&&replaceOriginal!=""){
                                imgSrc = replaceOriginal;
                            }
                            if(imgSrc==undefined||imgSrc==null||imgSrc==""){//如果这个属性没取到或者未定义或者为null就取src,做个兼容
                                imgSrc = $(this).find("img").attr("src");
                            }
                        }catch (e){
                            console.log(e)
                        }

                        if (e && e.preventDefault) {
                            e.preventDefault();
                        } else {
                            window.event.returnValue = false;
                        }
                        var html = "<div class='maskDiv-proddetail'><div class='bgdiv'><div class='close-prodImg'>×</div><section>";
                        html += "<div class='parent'><div class='panzoom'><img src=" + imgSrc + "></div></div>";
                        html += "<div class='controls'><div class='controls-btn'><button class='zoom-in'>Zoom In</button><button class='zoom-out'>Zoom Out</button><input type='range' class='zoom-range'><button class='reset'>Reset</button><div id='quanpin'><i class='block-icon block-iconquanping'></i></div><div id='suoxiao'><i class='block-icon block-iconsuoxiao'></i></div></div></div>";
                        html += "</section></div></div>";
                        $("body").append(html).addClass("maskDiv-hidden");
                        var $section = $('.maskDiv-proddetail section');
                        //初始化
                        var $panzoom = $section.find('.panzoom').panzoom({
                            $zoomIn: $section.find(".zoom-in"),
                            $zoomOut: $section.find(".zoom-out"),
                            $zoomRange: $section.find(".zoom-range"),
                            $reset: $section.find(".reset"),
                            $quanpin: $section.find("#quanpin"),
                            $suoxiao: $section.find("#suoxiao")
                        });
                        //手势放大缩小
                        $panzoom.parent().on('mousewheel.focal', function (e) {
                            e.preventDefault();
                            var delta = e.delta || e.originalEvent.wheelDelta;
                            var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
                            $panzoom.panzoom('zoom', zoomOut, {
                                increment: 0.1,
                                animate: false,
                                focal: e
                            });
                        });
                        $(".maskDiv-proddetail,.bgdiv .controls-btn #quanpin").unbind("click").bind('click', function () {
                            $("#quanpin").hide();
                            $("#suoxiao").show();
                            $(".maskDiv-proddetail .close-prodImg").addClass("close-prodImg-quanpin");
                            $(".maskDiv-proddetail>.bgdiv .controls-btn").addClass("controls-quanpin");
                            $(".maskDiv-proddetail>.bgdiv").addClass("bgdiv-quanpin");
                            $(".maskDiv-proddetail").addClass("maskDiv-proddetail-quanpin");
                        });
                        $(".maskDiv-proddetail,.bgdiv .controls-btn #suoxiao").unbind("click").bind('click', function () {
                            $("#suoxiao").hide();
                            $("#quanpin").show();
                            $(".maskDiv-proddetail .close-prodImg").removeClass("close-prodImg-quanpin");
                            $(".maskDiv-proddetail>.bgdiv .controls-btn").removeClass("controls-quanpin");
                            $(".maskDiv-proddetail>.bgdiv").removeClass("bgdiv-quanpin");
                            $(".maskDiv-proddetail").removeClass("maskDiv-proddetail-quanpin");

                        });
                        $(".maskDiv-proddetail,.maskDiv-proddetail .close-prodImg").unbind("click").bind('click', function () {
                            $("body>.maskDiv-proddetail").remove();
                            $("body").removeClass("maskDiv-hidden");
                        })
                        $(".maskDiv-proddetail .bgdiv").unbind("click").bind('click', function (e) {
                            e.stopPropagation();
                        })
                        return false;
                    })
                } else {
                    $(".light-item-big").unbind('click').bind('click', function (e) {
                        e.preventDefault();
                        var imgSrc = $(".jqzoom.light-item-big").find("img").attr("src");
                        var replaceOriginal = $(".jqzoom.light-item-big").find("img").attr("replace-original");
                        var originalUrl = $(".jqzoom.light-item-big").find("img").attr("data-original");
                        if (imgSrc) {
                            var src = imgSrc;
                            var re = new RegExp("(.*)-(.*)-(.*)", "ig");
                            var r = re.exec(imgSrc);
                            if (r) {
                                var Imgtype = '.' + imgSrc.replace(/^.+\./, '');
                                src = r[1] + Imgtype;
                            }
                            $(".light-item-big").attr('href', src);
                            if (prodImgZoomSize != '' && prodImgZoomSize == '0') {
                                // 主图是否属于附图之一
                                var targetDom = $("#thumblist").find("img[src='"+originalUrl+"']");
                                $("#thumblist .light-item").find("img").each(function (index, item) {
                                    var isContain = isContainUrl($(this), imgSrc) || isContainUrl($(this), originalUrl) || isContainUrl($(this), replaceOriginal);
                                    if (isContain) {
                                        targetDom = $(this);
                                        return false;
                                    }
                                });
                                if (targetDom.length > 0 && $("#thumblist").find(".light-item").length > 1) {
                                    var targetIndex = targetDom.parents("a.light-item").attr("index");
                                    // 如果主图与附图存在相同的图片
                                    try {
                                        if (_options.prodDetailShowStyle == "6" && _options.prodImgZoomSize != '' && _options.prodImgZoomSize == '0') {
                                            var thumblistClone = $("." + _options.widgetClass + " #thumblist").clone(false);
                                            thumblistClone.addClass("hide");
                                            $("." + _options.widgetClass + " .proddetail-picshow").append(thumblistClone);
                                            setTimeout(function() {
                                                var prodDetailViewer = new Viewer($("." + _options.widgetClass + " .proddetail-picshow").find("#thumblist")[0], {
                                                    url: 'data-original',
                                                    hidden: function () {
                                                        prodDetailViewer.destroy();
                                                        $("." + _options.widgetClass + " .proddetail-picshow").find("#thumblist").remove();
                                                    }
                                                });
                                                prodDetailViewer.view(targetIndex);
                                            }, 200);
                                        };
                                    } catch (error) {
                                        console.log(error);
                                    }
                                } else {
                                    var	viewer2 = new Viewer(document.querySelector(".light-item-big"), {
                                        url: 'src',
                                        hidden: function () {
                                            viewer2.destroy();
                                        }
                                    });
                                    viewer2.view(0);
                                }
                            };
                            // $(".light-item-big").colorbox({
                            //     rel: 'group2',
                            //     fixed: true,
                            //     maxWidth: '100%',
                            //     maxHeight: '100%',
                            // });
                        }
                    })
                    $(".light-item:not('.prod-video-preview')").unbind('click').bind('click', function (e) {
                        e.preventDefault();
                    })
                }
            }

            function addZoomDom() {
                var Ohtml = '<div class="outer_bigImg" onselectstart="return false;">' +
                    '<div class="former_bigImg"></div>' +
                    '<div class="next_bigImg"></div>' +
                    '<div class="close_bigImg"></div>' +
                    '<div class="inner_bigImg">' +
                    '<img src="" alt="" class="hide" data-index="">' +
                    '</div>' +
                    '<div class="popover_bigImg">' +
                    '<div class="bottom_bigImg">' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                $('.frontend-body-canvas').append(Ohtml);
            }
            // 判断img的自定义属性是否包含指定url
            function isContainUrl(imgDom, targetUrl) {
                var isContainUrlBool = false;
                if (targetUrl) {
                    targetUrl = removeImgSuffix(targetUrl);
                };
                var attributes = imgDom[0].attributes;

                for (var i = 0; i < attributes.length; i++) {
                  var attribute = attributes[i];
                  var attributeValue = removeImgSuffix(attribute.value);

                  // 检查属性值中是否包含目标 URL
                  if (attributeValue && attributeValue.includes(targetUrl)) {
                    isContainUrlBool = true;
                    break;
                  }
                };
                if (isContainUrlBool) {
                    return true;
                } else {
                    return false;
                }
            }
            // 去除图片后缀
            function removeImgSuffix(imgSrc) {
                var re = new RegExp("(.*)-(.*)-(.*)", "ig");
                var r = re.exec(imgSrc);
                if (r) {
                    var Imgtype = '.' + imgSrc.replace(/^.+\./, '');
                    imgSrc = r[1] + Imgtype;
                }
                return imgSrc;
            };

            //图片传参效果
            $("#thumblist li a").unbind("mouseenter").bind("mouseenter", function () {
                $(".easyzoom a img").removeClass("video-preview-image");
                var parentDom = $(this).parents(".sitewidget-proddetail");
                if ($(this).attr("index") === "0") {
                    $(".proddetail-wrap .video_play_icon").show();
                    if (parentDom.find("#prod_video").length > 0) {
                        parentDom.find(".proddetail-picArea").hide();
                        parentDom.find(".prodetail-video-box").show();
                    }
                } else {
                    var videoHei = parseFloat(parentDom.find("#prod_video").css("height"));
                    $(".proddetail-wrap .video_play_icon").hide();
                    if (videoHei > 2) {
                        parentDom.find(".proddetail-picArea .proddetail-picshow .proddetail-showinner").css("height", (videoHei - 2) + "px");
                    }
                    parentDom.find(".proddetail-picArea").show();
                    parentDom.find(".prodetail-video-box").hide();
                };
                if ($(this).hasClass("light-item")) {
                    var jsonData = eval("(" + $(this).attr("rel") + ")");
                    $(".easyzoom a").attr('index', $(this).attr("index"));
                    $(".easyzoom a img").attr('src', jsonData["smallimage"]);
                    $(".easyzoom a img").attr('org-src', jsonData["smallimage"]);
                    try {
                        $(".easyzoom a img").attr('data-original', jsonData["largeimage"]);
                        $(".easyzoom a img").attr('replace-original', jsonData["largeimage"]);
                    }catch (e){
                        console.log(e)
                    }
                };
                if (!$(this).hasClass("zoomThumbActive")) {
                    var largeimage = $(this).attr("largeimage");
                    var smallimage = $(this).attr("smallimage");
                    var smallimageAlt = $(this).find("img").attr("alt");
                    var smallimageTitle = $(this).find("img").attr("title");
                    $(".easyzoom a").attr('index', $(this).attr("index"));
                    $(".easyzoom a img").attr('src', smallimage);
                    $(".easyzoom a img").attr('org-src', smallimage);
                    $(".easyzoom a img").attr('alt', smallimageAlt);
                    if(smallimageTitle){
                        $(".easyzoom a img").attr('title', smallimageTitle);
                    }else{
                        $(".easyzoom a img").removeAttr("title")
                    }
                    try {
                        $(".easyzoom a img").attr('data-original', largeimage);
                        $(".easyzoom a img").attr('replace-original', largeimage);
                    }catch (e){
                        console.log(e)
                    }
                    if(_options.prodDetailShowStyle == 0) {
                        $(this).addClass("zoomThumbActive  gbBdColor0  gbBdColor0hover needchangeColor").parent().siblings().find("a").removeClass("zoomThumbActive gbBdColor0");
                    } else  {
                        $(this).addClass("zoomThumbActive").parent().siblings().find("a").removeClass("zoomThumbActive");
                    }
                }
                //切换时关闭视频播放
                // 切换不关闭视频播放 SMTPHENIX-24148
                // prodDetail.closeProdDetailVieo();
            })
            $("#thumblist li.prod-video-content").unbind("mouseenter").bind("mouseenter", function () {
                var parentDom = $(this).parents(".sitewidget-proddetail");
                if ($(this).find(".light-item").attr("index") === "0") {
                    $(".proddetail-wrap .video_play_icon").show();
                    if (parentDom.find("#prod_video").length > 0) {
                        parentDom.find(".proddetail-picArea").hide();
                        parentDom.find(".prodetail-video-box").show();
                    }
                } else {
                    var videoHei = parseFloat(parentDom.find("#prod_video").css("height"));
                    $(".proddetail-wrap .video_play_icon").hide();
                    if (videoHei > 2) {
                        parentDom.find(".proddetail-picArea .proddetail-picshow .proddetail-showinner").css("height", (videoHei - 2) + "px");
                    }
                    parentDom.find(".proddetail-picArea").show();
                    parentDom.find(".prodetail-video-box").hide();
                };
                if ($(this).find(".light-item").hasClass("light-item")) {
                    var jsonData = eval("(" + $(this).find(".light-item").attr("rel") + ")");
                    $(".easyzoom a").attr('index', $(this).find(".light-item").attr("index"));
                    $(".easyzoom a img").attr('src', jsonData["smallimage"]);
                    $(".easyzoom a img").attr('org-src', jsonData["smallimage"]);
                    $(".easyzoom a img").addClass("video-preview-image");
                    $('.' + _options.widgetClass +' li.prod-video-content .diolag-module-bg').unbind("click").bind("click", function(e) {
                        e.stopPropagation();
                        prodDetail.startPlayVideo($('.' + _options.widgetClass + ' .prodetail-video-wrap').attr("data-video-url"));
                    });
                    return;
                }
                if (!$(this).find(".light-item").hasClass("zoomThumbActive")) {
                    var largeimage = $(this).find(".light-item").attr("largeimage");
                    var smallimage = $(this).find(".light-item").attr("smallimage");
                    $(".easyzoom a").attr('index', $(this).find(".light-item").attr("index"));
                    $(".easyzoom a img").attr('src', smallimage);
                    $(".easyzoom a img").attr('org-src', smallimage);
                    if(_options.prodDetailShowStyle == 0) {
                        $(this).find(".light-item").addClass("zoomThumbActive  gbBdColor0  gbBdColor0hover needchangeColor").parent().siblings().find("a").removeClass("zoomThumbActive gbBdColor0");
                        if ($("#thumblist").find("li").find("a.zoomThumbActive").parents(".prod-video-content").length) {
                            $("#thumblist").find("li").find("a.zoomThumbActive").parents(".prod-video-content").addClass("zoomActive")
                        };
                    } else  {
                        $(this).find(".light-item").addClass("zoomThumbActive").parent().siblings().find("a").removeClass("zoomThumbActive");
                        if ($("#thumblist").find("li").find("a.zoomThumbActive").parents(".prod-video-content").length) {
                            $("#thumblist").find("li").find("a.zoomThumbActive").parents(".prod-video-content").addClass("zoomActive")
                        };
                    }
                }
            })
        },
        changePrice: function () {
            //订货价格展示
            var quantity = parseFloat($('.' + _options.widgetClass + ' .order-quan-input').val());
            var _unitPrice = true;
            var _wholeSaleLen = $('.' + _options.widgetClass + " .prodDetail-wholeSale-price ul li").length;
            $('.' + _options.widgetClass + " .prodDetail-wholeSale-price ul li").each(function (i) {
                if (i > 0) {
                    var _gradient = parseFloat($(this).attr("gradient"));
                    var $oferPrice = $(this).find('.offer .salePrice').attr("exchangevalue");
                    var _currentPrice = parseFloat($oferPrice);
                    if (quantity >= _gradient) {
                        $('.' + _options.widgetClass + ' #prodDiscountPriceCurrent .needExchangeValue').attr("exchangevalue", _currentPrice);
                        phoenixSite.payCoinExchange.handleElement($('.' + _options.widgetClass + ' #prodDiscountPriceCurrent'));
                        _unitPrice = false;
                    }
                }
                if (_unitPrice && i == _wholeSaleLen - 2) {
                    var _originalPrice; //原价
                    if (!!_options.skuValueMap) {
                        var priceObj = JSON.parse(_options.skuValueMap);
                        var skuKeyTotal = getSkUVal();
                        if (priceObj[skuKeyTotal] && priceObj[skuKeyTotal].price) {
                            _originalPrice = priceObj[skuKeyTotal].price;
                        }
                        if (_originalPrice) {
                            var cookieObject = phoenixSite.payCoinExchange.getCurrencyCookie();
                            var defaultRate = cookieObject['defaultRate'],
                                type = cookieObject['type'],
                                unit = cookieObject['unit'],
                                symbol = cookieObject['symbol'],
                                rate = cookieObject['rate'];
                            $('.' + _options.widgetClass + ' #prodDiscountPriceCurrent .needExchangeValue').attr("exchangevalue", _originalPrice);
                            $('.' + _options.widgetClass + ' #prodDiscountPriceCurrent .needExchangeValue').text((_originalPrice * rate).toFixed(2));
                        }
                        _unitPrice = true;
                    }
                }
            });
            function getSkUVal() {
                var _skuKeyTotal = "";
                var _isAdd = false;
                $(".skuParams").find(".choosed a.description-choose-btns").each(function(item) {
                    if (_isAdd) {
                        _skuKeyTotal = (_skuKeyTotal).toString() + "~!!~";
                    }
                    _isAdd = true;
                    var _skuName = $(this).attr("value");
                    _skuKeyTotal = _skuKeyTotal + _skuName;
                });
                return _skuKeyTotal;
            }
        },
        prodVideoPlay: function () {
            if (!!!_options.encodeProductId) {
                return;
            }
            //产品短视频播放
            var hasVideo = $('.' + _options.widgetClass + ' .proddetail-wrap').eq(0).attr("hasprodvideo");
            if ((_options.prodDetailShowStyle == '0' || _options.prodDetailShowStyle == '1' || _options.prodDetailShowStyle == '2' || _options.prodDetailShowStyle == '3' || _options.prodDetailShowStyle == '4' || _options.prodDetailShowStyle == '5' || _options.prodDetailShowStyle == '6' || _options.prodDetailShowStyle == '7' || _options.prodDetailShowStyle == '8' || _options.prodDetailShowStyle == '9' || _options.prodDetailShowStyle == '10' || _options.prodDetailShowStyle == '11' || _options.prodDetailShowStyle == '12' || _options.prodDetailShowStyle == '13'|| _options.prodDetailShowStyle == '14') && hasVideo === 'true') {
                var video_url = "";
                var options = {
                    url: "/phoenix/admin/video/purl",
                    type: "get",
                    data: {
                        "pid": _options.encodeProductId
                    },
                    done: function (xhr) {
                        var res = JSON.parse(xhr);
                        if (res.hasOwnProperty('vedioUrl') && res.vedioUrl != '') {
                            //短视频链接存在（显示播放按钮）
                            video_url = res.vedioUrl;
                            // 如果当前为微信环境，并且后端返回值
                            if(is_weixin() == true && res.mp4Url){
                                video_url = res.mp4Url;
                            }
                            $(document).ready(function () {
                                // $('.' + _options.widgetClass + ' .video_play_icon').show();
                                $('.' + _options.widgetClass + ' .video_play_icon').eq(0).show();
                                $('.' + _options.widgetClass + ' .video_play_icon').eq(1).show();

                                $('.' + _options.widgetClass + ' .pro_pic_small .video_play_icon').show()
                                $('.' + _options.widgetClass + ' .prodetail-video-wrap').attr("data-thirdlink", res.thirdLink);
                                $('.' + _options.widgetClass + ' .prodetail-video-wrap').attr("data-video-url", video_url);
                                videoBtnBindEvent();
                                // 获取产品视频的第一帧
                                if (_options.prodDetailShowStyle == '6') {
                                    var offsetImg = video_url + '?vframe/jpg/offset/1';
                                    $('.' + _options.widgetClass + ' .prodetail-video-wrap').append("<input type='hidden' class='offsetimg hide' value='"+offsetImg+"' />");
                                    if (!($("." + _options.widgetClass + " #prodPropDefaultSet")[0] != undefined && $("." + _options.widgetClass + " #prodPropDefaultSet").val() == '1')) {
                                        prodDetail.showVframeImage(_options, true);
                                    }
                                }
                            });

                            // 判断当前是否为微信
                            function is_weixin(){
                                var ua = navigator.userAgent.toLowerCase();
                                if(ua.match(/MicroMessenger/i) == "micromessenger") {
                                    return true
                                }else{
                                    return false
                                }
                            }
                        } else {
                            //链接不存在
                            $(document).ready(function () {
                                $('.' + _options.widgetClass + ' .video_play_icon').hide();
                            });
                        }
                    }
                };

                phoenixSite.ajax(options);

                //短视频功能

                function videoBtnBindEvent() {
                    setTimeout(() => {
                        $('.' + _options.widgetClass +' li.prod-video-content .diolag-module-bg').unbind("click").bind("click", function(e) {
                            e.stopPropagation();
                            startPlayVideo();
                        })
                    }, 1000);
                    $('.' + _options.widgetClass + ' .video_play_icon').off("click").on("click", function () {
                        startPlayVideo();
                    });
                    $('.' + _options.widgetClass + ' .closeVideo').off("click").on("click", function () {
                        if (_options.prodDetailShowStyle == '12') {
                            if ( $(window).innerWidth() > 990) {
                                // $('.' + _options.widgetClass + ' .pc-proddetail-bigpic').show();
                                $('.' + _options.widgetClass + ' .pc-proddetail-bigpic').find('.pic-container').eq(0).children().each(function(index, ele) {
                                    $(ele).removeClass('hide')
                                })
                                $('.' + _options.widgetClass + ' .pc-proddetail-bigpic .video_play_icon').show()
                                // $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p').hide();
                                $('.' + _options.widgetClass + ' .phone-proddetail-bigpic').hide();
                            } else {
                                $('.' + _options.widgetClass + ' .pc-proddetail-bigpic').hide();
                                $('.' + _options.widgetClass + ' .phone-proddetail-bigpic').show();
                            }
                        } else if (_options.prodDetailShowStyle == '13' || _options.prodDetailShowStyle == '14') {
                            if ($(window).innerWidth() > 990) {
                                $('.' + _options.widgetClass + ' .proddetail-picArea').find('.ms-container').show();
                                $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p').hide();
                            } else {
                                if(_options.prodDetailShowStyle == '14') {
                                    $('.' + _options.widgetClass + ' .proddetail-picArea').find('.ms-container').show();
                                }
                                $('.' + _options.widgetClass + ' .proddetail-picArea').find('.prodetail-slider').show();
                                $('.' + _options.widgetClass + ' .proddetail-picArea').find('.video_play_icon').show();
                                $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-m').hide();
                            }
                        } else {
                            $('.' + _options.widgetClass + ' .proddetail-picArea').show();
                        }
                        $('.' + _options.widgetClass + ' .prodetail-video-wrap').empty();
                        $('.' + _options.widgetClass + ' .prodetail-video-box').hide();
                        player && player.dispose();
                    });
                }

                function startPlayVideo() {
                    if (video_url == '') {
                        return;
                    }
                    if (_options.prodDetailShowStyle == '12') {
                        if ($(window).innerWidth() > 990) {
                            $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p').show();
                        } else {
                            $('.' + _options.widgetClass + ' .prodetail-video-box').show();
                        }
                    } else if (_options.prodDetailShowStyle == '13' || _options.prodDetailShowStyle == '14') {
                        if ($(window).innerWidth() > 990) {
                            $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p').show();
                        } else {
                            $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-m').show();
                        }
                    } else {
                        $('.' + _options.widgetClass + ' .prodetail-video-box').show();
                    }
                    var thirdLink = $('.' + _options.widgetClass + ' .prodetail-video-wrap').data('thirdlink');
                    var isMute = $('.' + _options.widgetClass + ' .prodetail-video-wrap').data('mute') == '0' ? false : true;
                    var videoWidth = $('.' + _options.widgetClass + ' .proddetail-picArea').eq(0).width();
                    var videoHeight = $('.' + _options.widgetClass + ' .proddetail-picArea').eq(0).height();
                    if (_options.prodDetailShowStyle == '12' && $(window).innerWidth() > 990 ) {
                        videoWidth = $('.' + _options.widgetClass + ' .proddetail-picArea').eq(1).width() + 26;
                        videoHeight = $('.' + _options.widgetClass + ' .proddetail-picArea').eq(1).find('.pic-container').eq(0).height();
                    }
                    if (_options.prodDetailShowStyle == '13' || _options.prodDetailShowStyle == '14') {
                        if ($(window).innerWidth() > 990) {
                            videoWidth = $('.' + _options.widgetClass + ' .proddetail-picArea').eq(0).find('.ms-container').width();
                            videoHeight = $('.' + _options.widgetClass + ' .proddetail-picArea').eq(0).find('.ms-container').height();
                        } else {
                            videoHeight = $('.' + _options.widgetClass + ' .proddetail-picArea').eq(0).height();
                        }
                    }
                    var loadingDom = "<div style='    position: absolute;\n" +
                        "    top: 50%;\n" +
                        "    left: 50%;\n" +
                        "    transform: translate(calc(-50%), calc(-50% - 20px));\n" +
                        "    text-align: center;' id='loadingDom'><div class='load-img-contain' style='width: 30px; height: 30px;'></div><div style='margin-top: 5px;color: #898986;font-size:14px;'>Loading...</div></div>";
                    if (thirdLink == '1') {
                        if (video_url.indexOf("$$MIC_PRODUCT$$") != -1) {
                            var micUrl = video_url.replace("$$MIC_PRODUCT$$", "")
                            $.getScript(phoenixSite.page.cdnUrl + "/static/assets/widget/script/plugins/micVideo/player.js", function () {
                                var micVideoDom = '<div id="mic_video" style="width:' + videoWidth + 'px;height:' + videoHeight + 'px;"></div>'
                                if (_options.prodDetailShowStyle == '13') {
                                    if ($(window).innerWidth() > 990) {
                                        $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p .prodetail-video-wrap').append(micVideoDom);
                                    } else {
                                        $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-m .prodetail-video-wrap').append(micVideoDom);
                                    }
                                } else {
                                    $('.' + _options.widgetClass + ' .prodetail-video-wrap').append(micVideoDom);
                                }

                                if (_options.prodDetailShowStyle == '12') {
                                    if ( $(window).innerWidth() > 990) {
                                        $('.' + _options.widgetClass + ' .pc-proddetail-bigpic').find('.pic-container').eq(0).children().each(function(index, ele) {
                                            $(ele).addClass('hide')
                                        })
                                        $('.' + _options.widgetClass + ' .pc-proddetail-bigpic .video_play_icon').hide()
                                        $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p').show();
                                    } else {
                                        $('.' + _options.widgetClass + ' .phone-proddetail-bigpic').hide();
                                    }
                                } else if (_options.prodDetailShowStyle == '13' || _options.prodDetailShowStyle == '14') {
                                    if ($(window).innerWidth() > 990 || _options.prodDetailShowStyle == '14') {
                                        $('.' + _options.widgetClass + ' .proddetail-picArea').find('.ms-container').hide();
                                    } else {
                                        $('.' + _options.widgetClass + ' .proddetail-picArea').find('.prodetail-slider').hide();
                                        $('.' + _options.widgetClass + ' .proddetail-picArea').find('.video_play_icon').hide();


                                    }
                                } else {
                                    $('.' + _options.widgetClass + ' .proddetail-picArea').hide();
                                }

                                var mic_player = new VideoPlayer({
                                    el: "#mic_video", // 视频播放区域
                                    videoUrl: micUrl,
                                    autoplay: true, // 是否自动播放
                                    muted: isMute // 是否静音
                                });
                                mic_player.on("ended", function(){
                                    if (_options.prodDetailShowStyle == '12') {
                                        if ( $(window).innerWidth() > 990) {
                                            $('.' + _options.widgetClass + ' .pc-proddetail-bigpic').find('.pic-container').eq(0).children().each(function(index, ele) {
                                                $(ele).removeClass('hide');
                                            })
                                            $('.' + _options.widgetClass + ' .pc-proddetail-bigpic .video_play_icon').show();
                                            $('.' + _options.widgetClass + ' .phone-proddetail-bigpic').hide();
                                        } else {
                                            $('.' + _options.widgetClass + ' .pc-proddetail-bigpic').hide();
                                            $('.' + _options.widgetClass + ' .phone-proddetail-bigpic').show();
                                        }
                                    } else if (_options.prodDetailShowStyle == '13' || _options.prodDetailShowStyle == '14') {
                                        if ($(window).innerWidth() > 990) {
                                            $('.' + _options.widgetClass + ' .proddetail-picArea').find('.ms-container').show();
                                            $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p').hide();
                                        } else {
                                            if(_options.prodDetailShowStyle == '14') {
                                                $('.' + _options.widgetClass + ' .proddetail-picArea').find('.ms-container').show();
                                            }
                                            $('.' + _options.widgetClass + ' .proddetail-picArea').find('.prodetail-slider').show();
                                            $('.' + _options.widgetClass + ' .proddetail-picArea').find('.video_play_icon').show();
                                            $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-m').hide();
                                        }
                                    } else {
                                        $('.' + _options.widgetClass + ' .proddetail-picArea').show();
                                    }
                                    $('.' + _options.widgetClass + ' .prodetail-video-wrap').empty();
                                    $('.' + _options.widgetClass + ' .prodetail-video-box').hide();
                                });
                            })
                        } else {
                            var iframeDom = '<iframe frameborder="0" class="video-iframe" src="' + video_url + '" style="width:' + videoWidth + 'px;height:' + videoHeight + 'px;" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" oallowfullscreen="true" msallowfullscreen="true" allow="autoplay" allowtransparency id="proddetailContain"></iframe>';

                            if (_options.prodDetailShowStyle == '13' || _options.prodDetailShowStyle == '14') {
                                if ($(window).innerWidth() > 990) {
                                    if ($('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p .prodetail-video-wrap').find("iframe.video-iframe").length === 0) {
                                        $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p .prodetail-video-wrap').append(iframeDom);
                                        $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p .prodetail-video-wrap').append(loadingDom)
                                    }
                                } else {
                                    if ($('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-m .prodetail-video-wrap').find("iframe.video-iframe").length === 0) {
                                        $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-m .prodetail-video-wrap').append(iframeDom);
                                        $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-m .prodetail-video-wrap').append(loadingDom)
                                    }
                                }
                            } else {
                                if ($('.' + _options.widgetClass + ' .prodetail-video-wrap').find("iframe.video-iframe").length === 0) {
                                    $('.' + _options.widgetClass + ' .prodetail-video-wrap').append(iframeDom);
                                    $('.' + _options.widgetClass + ' .prodetail-video-wrap').append(loadingDom);
                                }
                            }


                            $("#proddetailContain").load(function () {
                                setTimeout(function () {
                                    $("#loadingDom").hide()
                                },300)
                            })
                            if (_options.prodDetailShowStyle == '12') {
                                if ( $(window).innerWidth() > 990) {
                                    $('.' + _options.widgetClass + ' .pc-proddetail-bigpic').find('.pic-container').eq(0).children().each(function(index, ele) {
                                        $(ele).addClass('hide')
                                    })
                                    $('.' + _options.widgetClass + ' .pc-proddetail-bigpic .video_play_icon').hide()
                                    $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p').show();
                                } else {
                                    $('.' + _options.widgetClass + ' .phone-proddetail-bigpic').hide();
                                }
                            } else if (_options.prodDetailShowStyle == '13' || _options.prodDetailShowStyle == '14') {
                                if ($(window).innerWidth() > 990 || _options.prodDetailShowStyle == '14') {
                                    $('.' + _options.widgetClass + ' .proddetail-picArea').find('.ms-container').hide();
                                } else {
                                    $('.' + _options.widgetClass + ' .proddetail-picArea').find('.prodetail-slider').hide();
                                    $('.' + _options.widgetClass + ' .proddetail-picArea').find('.video_play_icon').hide();
                                }
                            } else {
                                $('.' + _options.widgetClass + ' .proddetail-picArea').hide();
                            }
                        }
                        return;
                    }
                    var videoType = 'video/mp4';
                    if (video_url.lastIndexOf('?mediaType=m3u8') > -1) {
                        videoType = 'application/x-mpegurl';
                    }
                    var videoDom = '<video id="prod_video" class="video-js vjs-big-play-centered"></video>';
                    // proddetail-picArea
                    var height="";
                    if (_options.prodDetailShowStyle == '12') {
                        if ($(window).innerWidth() > 990) {
                            height = $('.' + _options.widgetClass + ' .pc-proddetail-bigpic').find('.pic-container').eq(0).height();
                            $('.' + _options.widgetClass + ' .pc-proddetail-bigpic').find('.pic-container').eq(0).children().each(function(index, ele) {
                                $(ele).addClass('hide')
                            })
                            $('.' + _options.widgetClass + ' .pc-proddetail-bigpic .video_play_icon').hide()
                            $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p').show();
                            window.scrollTo(0,0)
                        } else {
                            height = $('.' + _options.widgetClass + ' .proddetail-picArea').height();
                            $('.' + _options.widgetClass + ' .phone-proddetail-bigpic').hide();
                        }
                    } else if (_options.prodDetailShowStyle == '13' || _options.prodDetailShowStyle == '14') {
                        height = $('.' + _options.widgetClass + ' .proddetail-picArea').find('.ms-container').height();
                        if ($(window).innerWidth() > 990 || _options.prodDetailShowStyle == '14') {
                            $('.' + _options.widgetClass + ' .proddetail-picArea').find('.ms-container').hide();
                        } else {
                            height = $('.' + _options.widgetClass + ' .proddetail-picArea').height();
                            $('.' + _options.widgetClass + ' .proddetail-picArea').find('.prodetail-slider').hide();
                            $('.' + _options.widgetClass + ' .proddetail-picArea').find('.video_play_icon').hide();
                        }
                    } else {

                        height = $('.' + _options.widgetClass + ' .proddetail-picArea').height();
                        $('.' + _options.widgetClass + ' .proddetail-picArea').hide();
                    }
                    if (_options.prodDetailShowStyle == '12') {
                        if ($(window).innerWidth() > 990) {
                            $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p .prodetail-video-wrap').append(videoDom);
                            $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p .prodetail-video-wrap').append(loadingDom);

                        } else {
                            $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-m .prodetail-video-wrap').append(videoDom);
                            $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-m .prodetail-video-wrap').append(loadingDom);

                        }
                    } else if (_options.prodDetailShowStyle == '13' || _options.prodDetailShowStyle == '14') {
                        if ($(window).innerWidth() > 990) {
                            $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p .prodetail-video-wrap').append(videoDom);
                            $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p .prodetail-video-wrap').append(loadingDom);

                        } else {
                            $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-m .prodetail-video-wrap').append(videoDom);
                            $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-m .prodetail-video-wrap').append(loadingDom);
                        }
                    } else {
                        $('.' + _options.widgetClass + ' .prodetail-video-wrap').append(videoDom);
                        $('.' + _options.widgetClass + ' .prodetail-video-wrap').append(loadingDom);
                    }
                    $('.' + _options.widgetClass + ' .prodetail-video-wrap .video-js').height(height)
                    $.getScript(phoenixSite.page.cdnUrl + "/static/assets/widget/script/plugins/videojs/video.min.js", function () {
                        player = videojs('prod_video', {
                            muted: isMute,
                            autoplay: true,
                            loop: false,
                            controls: true,
                            width: videoWidth,
                            height: videoHeight,
                            sources: [{
                                src: video_url,
                                type: videoType
                            }]
                        }, function onPlayerReady() {
                            $("#prod_video_html5_api").attr("playsinline", true);
                            $("#prod_video_html5_api").attr("webkit-playsinline", true);
                            this.play();
                            setTimeout(function () {
                                $("#loadingDom").hide()
                            },300)
                            this.on('ended', function () {

                                $('.' + _options.widgetClass + ' .prodetail-video-wrap').empty();
                                $('.' + _options.widgetClass + ' .prodetail-video-box').hide();
                                if (_options.prodDetailShowStyle == '12') {
                                    if ( $(window).innerWidth() > 990) {
                                        $('.' + _options.widgetClass + ' .pc-proddetail-bigpic').find('.pic-container').eq(0).children().each(function(index, ele) {
                                            $(ele).removeClass('hide');
                                        })
                                        $('.' + _options.widgetClass + ' .pc-proddetail-bigpic .video_play_icon').show();
                                        $('.' + _options.widgetClass + ' .phone-proddetail-bigpic').hide();
                                    } else {
                                        $('.' + _options.widgetClass + ' .pc-proddetail-bigpic').hide();
                                        $('.' + _options.widgetClass + ' .phone-proddetail-bigpic').show();
                                    }
                                } else if (_options.prodDetailShowStyle == '13' || _options.prodDetailShowStyle == '14') {
                                    if ($(window).innerWidth() > 990) {
                                        $('.' + _options.widgetClass + ' .proddetail-picArea').find('.ms-container').show();
                                        $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p').hide();
                                    } else {
                                        if(_options.prodDetailShowStyle == '14') {
                                            $('.' + _options.widgetClass + ' .proddetail-picArea').find('.ms-container').show();

                                        }
                                        $('.' + _options.widgetClass + ' .proddetail-picArea').find('.prodetail-slider').show();
                                        $('.' + _options.widgetClass + ' .proddetail-picArea').find('.video_play_icon').show();
                                        $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-m').hide();
                                    }
                                } else {
                                    $('.' + _options.widgetClass + ' .proddetail-picArea').show();
                                }
                                this.dispose();
                            });
                        });

                    });
                }


            } else {

            }
        },
        startPlayVideo: function(video_url) {
            if (video_url == '') {
                return;
            }
            if (_options.prodDetailShowStyle == '12') {
                if ($(window).innerWidth() > 990) {
                    $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p').show();
                } else {
                    $('.' + _options.widgetClass + ' .prodetail-video-box').show();
                }
            } else if (_options.prodDetailShowStyle == '13' || _options.prodDetailShowStyle == '14') {
                if ($(window).innerWidth() > 990) {
                    $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p').show();
                } else {
                    $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-m').show();
                }
            } else {
                $('.' + _options.widgetClass + ' .prodetail-video-box').show();
            }
            var thirdLink = $('.' + _options.widgetClass + ' .prodetail-video-wrap').data('thirdlink');
            var isMute = $('.' + _options.widgetClass + ' .prodetail-video-wrap').data('mute') == '0' ? false : true;
            var videoWidth = $('.' + _options.widgetClass + ' .proddetail-picArea').eq(0).width();
            var videoHeight = $('.' + _options.widgetClass + ' .proddetail-picArea').eq(0).height();
            if (_options.prodDetailShowStyle == '12' && $(window).innerWidth() > 990 ) {
                videoWidth = $('.' + _options.widgetClass + ' .proddetail-picArea').eq(1).width() + 26;
                videoHeight = $('.' + _options.widgetClass + ' .proddetail-picArea').eq(1).find('.pic-container').eq(0).height();
            }
            if (_options.prodDetailShowStyle == '13' || _options.prodDetailShowStyle == '14') {
                if ($(window).innerWidth() > 990) {
                    videoWidth = $('.' + _options.widgetClass + ' .proddetail-picArea').eq(0).find('.ms-container').width();
                    videoHeight = $('.' + _options.widgetClass + ' .proddetail-picArea').eq(0).find('.ms-container').height();
                } else {
                    videoHeight = $('.' + _options.widgetClass + ' .proddetail-picArea').eq(0).height();
                }
            }
            var loadingDom = "<div style='    position: absolute;\n" +
                "    top: 50%;\n" +
                "    left: 50%;\n" +
                "    transform: translate(calc(-50%), calc(-50% - 20px));\n" +
                "    text-align: center;' id='loadingDom'><div class='load-img-contain' style='width: 30px; height: 30px;'></div><div style='margin-top: 5px;color: #898986;font-size:14px;'>Loading...</div></div>";
            if (thirdLink == '1') {
                if (video_url.indexOf("$$MIC_PRODUCT$$") != -1) {
                    var micUrl = video_url.replace("$$MIC_PRODUCT$$", "")
                    $.getScript(phoenixSite.page.cdnUrl + "/static/assets/widget/script/plugins/micVideo/player.js", function () {
                        var micVideoDom = '<div id="mic_video" style="width:' + videoWidth + 'px;height:' + videoHeight + 'px;"></div>'
                        if (_options.prodDetailShowStyle == '13') {
                            if ($(window).innerWidth() > 990) {
                                $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p .prodetail-video-wrap').append(micVideoDom);
                            } else {
                                $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-m .prodetail-video-wrap').append(micVideoDom);
                            }
                        } else {
                            $('.' + _options.widgetClass + ' .prodetail-video-wrap').append(micVideoDom);
                        }

                        if (_options.prodDetailShowStyle == '12') {
                            if ( $(window).innerWidth() > 990) {
                                $('.' + _options.widgetClass + ' .pc-proddetail-bigpic').find('.pic-container').eq(0).children().each(function(index, ele) {
                                    $(ele).addClass('hide')
                                })
                                $('.' + _options.widgetClass + ' .pc-proddetail-bigpic .video_play_icon').hide()
                                $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p').show();
                            } else {
                                $('.' + _options.widgetClass + ' .phone-proddetail-bigpic').hide();
                            }
                        } else if (_options.prodDetailShowStyle == '13' || _options.prodDetailShowStyle == '14') {
                            if ($(window).innerWidth() > 990 || _options.prodDetailShowStyle == '14') {
                                $('.' + _options.widgetClass + ' .proddetail-picArea').find('.ms-container').hide();
                            } else {
                                $('.' + _options.widgetClass + ' .proddetail-picArea').find('.prodetail-slider').hide();
                                $('.' + _options.widgetClass + ' .proddetail-picArea').find('.video_play_icon').hide();


                            }
                        } else {
                            $('.' + _options.widgetClass + ' .proddetail-picArea').hide();
                        }

                        var mic_player = new VideoPlayer({
                            el: "#mic_video", // 视频播放区域
                            videoUrl: micUrl,
                            autoplay: true, // 是否自动播放
                            muted: isMute // 是否静音
                        });
                        mic_player.on("ended", function(){
                            if (_options.prodDetailShowStyle == '12') {
                                if ( $(window).innerWidth() > 990) {
                                    $('.' + _options.widgetClass + ' .pc-proddetail-bigpic').find('.pic-container').eq(0).children().each(function(index, ele) {
                                        $(ele).removeClass('hide');
                                    })
                                    $('.' + _options.widgetClass + ' .pc-proddetail-bigpic .video_play_icon').show();
                                    $('.' + _options.widgetClass + ' .phone-proddetail-bigpic').hide();
                                } else {
                                    $('.' + _options.widgetClass + ' .pc-proddetail-bigpic').hide();
                                    $('.' + _options.widgetClass + ' .phone-proddetail-bigpic').show();
                                }
                            } else if (_options.prodDetailShowStyle == '13' || _options.prodDetailShowStyle == '14') {
                                if ($(window).innerWidth() > 990) {
                                    $('.' + _options.widgetClass + ' .proddetail-picArea').find('.ms-container').show();
                                    $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p').hide();
                                } else {
                                    if(_options.prodDetailShowStyle == '14') {
                                        $('.' + _options.widgetClass + ' .proddetail-picArea').find('.ms-container').show();
                                    }
                                    $('.' + _options.widgetClass + ' .proddetail-picArea').find('.prodetail-slider').show();
                                    $('.' + _options.widgetClass + ' .proddetail-picArea').find('.video_play_icon').show();
                                    $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-m').hide();
                                }
                            } else {
                                $('.' + _options.widgetClass + ' .proddetail-picArea').show();
                            }
                            $('.' + _options.widgetClass + ' .prodetail-video-wrap').empty();
                            $('.' + _options.widgetClass + ' .prodetail-video-box').hide();
                        });
                    })
                } else {
                    var iframeDom = '<iframe frameborder="0" class="video-iframe" src="' + video_url + '" style="width:' + videoWidth + 'px;height:' + videoHeight + 'px;" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" oallowfullscreen="true" msallowfullscreen="true" allow="autoplay" allowtransparency id="proddetailContain"></iframe>';

                    if (_options.prodDetailShowStyle == '13' || _options.prodDetailShowStyle == '14') {
                        if ($(window).innerWidth() > 990) {
                            if ($('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p .prodetail-video-wrap').find("iframe.video-iframe").length === 0) {
                                $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p .prodetail-video-wrap').append(iframeDom);
                                $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p .prodetail-video-wrap').append(loadingDom)
                            }
                        } else {
                            if ($('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-m .prodetail-video-wrap').find("iframe.video-iframe").length === 0) {
                                $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-m .prodetail-video-wrap').append(iframeDom);
                                $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-m .prodetail-video-wrap').append(loadingDom)
                            }
                        }
                    } else {
                        if ($('.' + _options.widgetClass + ' .prodetail-video-wrap').find("iframe.video-iframe").length === 0) {
                            $('.' + _options.widgetClass + ' .prodetail-video-wrap').append(iframeDom);
                            $('.' + _options.widgetClass + ' .prodetail-video-wrap').append(loadingDom);
                        }
                    }


                    $("#proddetailContain").load(function () {
                        setTimeout(function () {
                            $("#loadingDom").hide()
                        },300)
                    })
                    if (_options.prodDetailShowStyle == '12') {
                        if ( $(window).innerWidth() > 990) {
                            $('.' + _options.widgetClass + ' .pc-proddetail-bigpic').find('.pic-container').eq(0).children().each(function(index, ele) {
                                $(ele).addClass('hide')
                            })
                            $('.' + _options.widgetClass + ' .pc-proddetail-bigpic .video_play_icon').hide()
                            $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p').show();
                        } else {
                            $('.' + _options.widgetClass + ' .phone-proddetail-bigpic').hide();
                        }
                    } else if (_options.prodDetailShowStyle == '13' || _options.prodDetailShowStyle == '14') {
                        if ($(window).innerWidth() > 990 || _options.prodDetailShowStyle == '14') {
                            $('.' + _options.widgetClass + ' .proddetail-picArea').find('.ms-container').hide();
                        } else {
                            $('.' + _options.widgetClass + ' .proddetail-picArea').find('.prodetail-slider').hide();
                            $('.' + _options.widgetClass + ' .proddetail-picArea').find('.video_play_icon').hide();
                        }
                    } else {
                        $('.' + _options.widgetClass + ' .proddetail-picArea').hide();
                    }
                }
                return;
            }
            var videoType = 'video/mp4';
            if (video_url.lastIndexOf('?mediaType=m3u8') > -1) {
                videoType = 'application/x-mpegurl';
            }
            var videoDom = '<video id="prod_video" class="video-js vjs-big-play-centered"></video>';
            // proddetail-picArea
            var height="";
            if (_options.prodDetailShowStyle == '12') {
                if ($(window).innerWidth() > 990) {
                    height = $('.' + _options.widgetClass + ' .pc-proddetail-bigpic').find('.pic-container').eq(0).height();
                    $('.' + _options.widgetClass + ' .pc-proddetail-bigpic').find('.pic-container').eq(0).children().each(function(index, ele) {
                        $(ele).addClass('hide')
                    })
                    $('.' + _options.widgetClass + ' .pc-proddetail-bigpic .video_play_icon').hide()
                    $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p').show();
                    window.scrollTo(0,0)
                } else {
                    height = $('.' + _options.widgetClass + ' .proddetail-picArea').height();
                    $('.' + _options.widgetClass + ' .phone-proddetail-bigpic').hide();
                }
            } else if (_options.prodDetailShowStyle == '13' || _options.prodDetailShowStyle == '14') {
                height = $('.' + _options.widgetClass + ' .proddetail-picArea').find('.ms-container').height();
                if ($(window).innerWidth() > 990 || _options.prodDetailShowStyle == '14') {
                    $('.' + _options.widgetClass + ' .proddetail-picArea').find('.ms-container').hide();
                } else {
                    height = $('.' + _options.widgetClass + ' .proddetail-picArea').height();
                    $('.' + _options.widgetClass + ' .proddetail-picArea').find('.prodetail-slider').hide();
                    $('.' + _options.widgetClass + ' .proddetail-picArea').find('.video_play_icon').hide();
                }
            } else {

                height = $('.' + _options.widgetClass + ' .proddetail-picArea').height();
                $('.' + _options.widgetClass + ' .proddetail-picArea').hide();
            }
            if (_options.prodDetailShowStyle == '12') {
                if ($(window).innerWidth() > 990) {
                    $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p .prodetail-video-wrap').append(videoDom);
                    $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p .prodetail-video-wrap').append(loadingDom);

                } else {
                    $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-m .prodetail-video-wrap').append(videoDom);
                    $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-m .prodetail-video-wrap').append(loadingDom);

                }
            } else if (_options.prodDetailShowStyle == '13' || _options.prodDetailShowStyle == '14') {
                if ($(window).innerWidth() > 990) {
                    $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p .prodetail-video-wrap').append(videoDom);
                    $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p .prodetail-video-wrap').append(loadingDom);

                } else {
                    $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-m .prodetail-video-wrap').append(videoDom);
                    $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-m .prodetail-video-wrap').append(loadingDom);
                }
            } else {
                $('.' + _options.widgetClass + ' .prodetail-video-wrap').append(videoDom);
                $('.' + _options.widgetClass + ' .prodetail-video-wrap').append(loadingDom);
            }
            $('.' + _options.widgetClass + ' .prodetail-video-wrap .video-js').height(height)
            $.getScript(phoenixSite.page.cdnUrl + "/static/assets/widget/script/plugins/videojs/video.min.js", function () {
                player = videojs('prod_video', {
                    muted: isMute,
                    autoplay: true,
                    loop: false,
                    controls: true,
                    width: videoWidth,
                    height: videoHeight,
                    sources: [{
                        src: video_url,
                        type: videoType
                    }]
                }, function onPlayerReady() {
                    $("#prod_video_html5_api").attr("playsinline", true);
                    $("#prod_video_html5_api").attr("webkit-playsinline", true);
                    this.play();
                    setTimeout(function () {
                        $("#loadingDom").hide()
                    },300)
                    this.on('ended', function () {

                        $('.' + _options.widgetClass + ' .prodetail-video-wrap').empty();
                        $('.' + _options.widgetClass + ' .prodetail-video-box').hide();
                        if (_options.prodDetailShowStyle == '12') {
                            if ( $(window).innerWidth() > 990) {
                                $('.' + _options.widgetClass + ' .pc-proddetail-bigpic').find('.pic-container').eq(0).children().each(function(index, ele) {
                                    $(ele).removeClass('hide');
                                })
                                $('.' + _options.widgetClass + ' .pc-proddetail-bigpic .video_play_icon').show();
                                $('.' + _options.widgetClass + ' .phone-proddetail-bigpic').hide();
                            } else {
                                $('.' + _options.widgetClass + ' .pc-proddetail-bigpic').hide();
                                $('.' + _options.widgetClass + ' .phone-proddetail-bigpic').show();
                            }
                        } else if (_options.prodDetailShowStyle == '13' || _options.prodDetailShowStyle == '14') {
                            if ($(window).innerWidth() > 990) {
                                $('.' + _options.widgetClass + ' .proddetail-picArea').find('.ms-container').show();
                                $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p').hide();
                            } else {
                                if(_options.prodDetailShowStyle == '14') {
                                    $('.' + _options.widgetClass + ' .proddetail-picArea').find('.ms-container').show();

                                }
                                $('.' + _options.widgetClass + ' .proddetail-picArea').find('.prodetail-slider').show();
                                $('.' + _options.widgetClass + ' .proddetail-picArea').find('.video_play_icon').show();
                                $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-m').hide();
                            }
                        } else {
                            $('.' + _options.widgetClass + ' .proddetail-picArea').show();
                        }
                        this.dispose();
                    });
                });

            });
        },
        // 前台事件绑定
        bindFrontendEvent: function () {

            var _widgetClass = _options.widgetClass;
            var productId = _options.productId;
            var payModuleFlag = _options.payModuleFlag;
            var phoenix_error_standard_must_choosed = _options.phoenix_error_standard_must_choosed;
            var phoenix_order_sold_out = _options.phoenix_order_sold_out;
            var phoenix_shopingcart_notice = _options.phoenix_shopingcart_notice;
            var phoenix_error_buy_prod = _options.phoenix_error_buy_prod;
            var phoenix_error_no_stock = _options.phoenix_error_no_stock;
            var solutionName = _options.assign_prodTradEnabled4_solutionName;
            var prodDetailShowStyle = _options.prodDetailShowStyle;
            //产品询盘
            $("." + _widgetClass + " #prodInquire").unbind('click').bind('click', function () {
                var reg = /(^[1-9]\d*$)/;
                if (!!$('.order-quan-input').val() && $('.order-quan-input').val() != null && !reg.test($('.order-quan-input').val())) {
                    return false;
                }
                var isNewProd = "1" == $("#isSkuProd").val();
                var inquireParam = {};
                if (isNewProd) {
//                    var skuValueId = $("#skuValueId").val();
//                    if(skuValueId!=""){
////                    	inquireParam = {
////                            prodId: productId,
////                            skuParam: skuValueId,
////                            quantity: $('.' + _widgetClass + ' .order-quan-input').val()
////                        };
//                    }else{
                    var aChoosed = $("." + _widgetClass + " a.choosed");
                    var selectParam = {};
                    if (aChoosed[0] != undefined) {
                        aChoosed.each(function (i, n) {
                            var name = $(n).parents("tr").children('th').html();
                            var selectValue = $(n).attr('title');
                            selectParam[name] = selectValue;
                        });
                    }
                    var skuValueId = $("#skuValueId").val();
                    inquireParam = {
                        prodId: productId,
                        skuParam: skuValueId,
                        selectParam: $.toJSON(selectParam),
                        quantity: $('.' + _widgetClass + ' .order-quan-input').val()
                    };
//                    }
                } else {
                    var aChoosed = $("." + _widgetClass + " a.choosed");
                    var selectParam = {};
                    if (aChoosed[0] != undefined) {
                        aChoosed.each(function (i, n) {
                            var name = $(n).parents("tr").children('th').html();
                            var selectValue = $(n).attr('title');
                            selectParam[name] = selectValue;
                        });
                    }
                    var skuValueId = $("#skuValueId").val();
                    inquireParam = {
                        prodId: productId,
                        skuParam: skuValueId,
                        selectParam: $.toJSON(selectParam),
                        quantity: $('.' + _widgetClass + ' .order-quan-input').val()
                    };
                }
                var arrayInquire = new Array();
                arrayInquire.push(inquireParam);
                var inquireMutualType = $('.' + _widgetClass + ' input[name=inquireMutualType]').val();
                var inquireParams = $.toJSON(arrayInquire);
                if (inquireMutualType == '1') {
                    // 询盘跳转到新页面
                    $('.' + _widgetClass + ' input[name=inquireParams]').val(inquireParams);
                    $('.' + _widgetClass + " [id='prodInquire']").submit();
                } else {
                    var curBackendPageId = $('.' + _widgetClass + ' input[name=curBackendPageId]').val();
                    // 询盘使用弹出层
                    var data = {
                        'inquireParams': inquireParams,
                        'cur_backend_pageId': curBackendPageId,
                        'productId': productId
                    };
                    var isJumpToNew = $('.' + _widgetClass + ' input[name=isJumpToNew]').val();
                    if (isJumpToNew == '1') {
                        var redirectUrl = $('.' + _widgetClass + ' input[name=redirectUrl]').val();
                        data.redirectUrl = redirectUrl;
                    }
                    var _options = {
                        url: '/phoenix/admin/prod/inquire/popup',
                        type: 'post',
                        data: data,
                        done: function (xhr) {
                            $('#form_inquire_popup_div').remove();
                            $('body').append(xhr);
                            $("#form_inquire_popup_div").fadeIn();
                            //模拟添加按钮消除手机端因为绝对定位或是固定定位软键盘弹起产生的定位影响
                            if ($(".pop-inquire .pop-main .control-group.submitGroup").length > 0 && $("#formsubmitClone").length == 0) {
                                var submitGroupAdd = $(".pop-inquire .pop-main .control-group.submitGroup").clone();
                                $("#form_inquire_popup_div.pop-inquire .pop-box").append(submitGroupAdd);
                                if ($("#form_inquire_popup_div.pop-inquire .pop-box>.submitGroup").find("button").length == 1) {
                                    $("#form_inquire_popup_div.pop-inquire .pop-box>.submitGroup").find("button").eq(0).attr("id", "formsubmitClone");
                                }
                                if ($("#form_inquire_popup_div.pop-inquire .pop-box>.submitGroup").find("button").length == 2) {
                                    $("#form_inquire_popup_div.pop-inquire .pop-box>.submitGroup").find("button").eq(0).attr("id", "formsubmitClone");
                                    $("#form_inquire_popup_div.pop-inquire .pop-box>.submitGroup").find("button").eq(1).attr("id", "formresetClone")
                                }
                            }
                        }
                    };
                    phoenixSite.ajax(_options);
                }

            });

            //最小最大订货量
            var minOrderQuantity = $("#minOrderQuantity").val() ? $("#minOrderQuantity").val() : 0;
            var maxOrderQuantity = $("#maxOrderQuantity").val() ? $("#maxOrderQuantity").val() : 0;
            //这里修改个bug，当开启了批发模式后再关闭时，前台数量会默认带着批发的数量，这里加了一层判断，如果关闭批发模式，前台数量显示为1
            if (minOrderQuantity > 0 && $("." + _widgetClass + " .prodOrderQuantity").length > 0) {
                $('.' + _widgetClass + ' .order-minus').next('.order-quan-input').val(minOrderQuantity);
            }

            // 产品下订单功能
            if (($('.' + _widgetClass + ' #placeOrder')[0] != undefined) || (prodDetailShowStyle && prodDetailShowStyle =='12')) {
                $('.' + _widgetClass + ' .order-quan-input').change(function () {
                    var stock = $(".stockValue").text();
                    var quantity = $(this).val();

                    //判断输入的是否为正整数
                    var reg = /(^[1-9]\d*$)/;
                    var msg = 'Please enter positive integer.';

                    if (!reg.test(quantity)) {
                        if (!$(this).parent().next('.order-error-msg').length) {
                            $(this).parent().after('<span class="order-error-msg mt5" style="color:#E13D41">' + msg + '</span>');
                        }
                        $('.' + _widgetClass + ' #placeOrder').addClass("disabled");
                        $('.' + _widgetClass + ' #addToCart').addClass("disabled");
                        return;
                    } else {
                        $(this).parent().next('.order-error-msg').remove();
                    }
                    if (!!stock && quantity > parseInt(stock)) {
                        $('.' + _widgetClass + ' #placeOrder').addClass("disabled");
                        $('.' + _widgetClass + ' #addToCart').addClass("disabled");
                        $('.' + _widgetClass + ' #prodInquire').addClass("disabled");
                        $('.' + _widgetClass + ' #addToBasket').addClass("disabled");
                    } else {
                        $('.' + _widgetClass + ' #placeOrder').removeClass("disabled");
                        $('.' + _widgetClass + ' #addToCart').removeClass("disabled");
                        $('.' + _widgetClass + ' #prodInquire').removeClass("disabled");
                        $('.' + _widgetClass + ' #addToBasket').removeClass("disabled");
                    }
                    //这里修改个bug，当开启了批发模式后再关闭时，前台数量会默认带着批发的数量，这里加了一层判断，如果关闭批发模式，前台数量显示为1
                    if (minOrderQuantity > 0 && parseInt(quantity) <= minOrderQuantity && $("." + _widgetClass + " .prodOrderQuantity").length > 0) {
                        $(this).val(minOrderQuantity);
                        prodDetail.changePrice();
                        return;
                    }
                    //这里修改个bug，当开启了批发模式后再关闭时，前台数量会默认带着批发的数量，这里加了一层判断，如果关闭批发模式，前台数量显示为1
                    if (maxOrderQuantity > 0 && parseInt(quantity) >= maxOrderQuantity && $("." + _widgetClass + " .prodOrderQuantity").length > 0) {
                        $(this).val(maxOrderQuantity);
                        prodDetail.changePrice();
                        return;
                    }
                    if($(".prodOrderQuantity").length > 0) {
                        // b2b2c
                        if (minOrderQuantity > 0 && parseInt(quantity) <= minOrderQuantity && prodDetailShowStyle && prodDetailShowStyle == '12' && solutionName && solutionName == 'b2b2c') {
                            $(this).val(minOrderQuantity);
                            prodDetail.changePrice();
                            return;
                        }
                    }
                    if($(".prodOrderQuantity").length > 0) {
                        //b2b2c
                        if (maxOrderQuantity > 0 && parseInt(quantity) >= maxOrderQuantity && prodDetailShowStyle && prodDetailShowStyle == '12' && solutionName && solutionName == 'b2b2c') {
                            $(this).val(maxOrderQuantity);
                            prodDetail.changePrice();
                            return;
                        }
                    }
                    prodDetail.changePrice();
                });

//                $('.' + _widgetClass + ' .order-quan-input').on("keyup", function(){
//                    var $this = $(this);
//                    var timerDelay = null;
//                    if (timerDelay) {
//                        clearTimeout(timerDelay)
//                    }
//                    timerDelay = setTimeout(function(){
//                        $this.change();
//                    }, 1500);
//                });

                $('.' + _widgetClass + ' .order-quan-input').on("focusout", function () {
                    $(this).change();
                });
                $('.' + _widgetClass + ' .order-quan-input').on("blur", function () {
                    $(this).change();
                });


                ////单产品的buynow,(注意组合购买也有buynow功能,那里的逻辑部分是沿用这里的逻辑,如果后期这里的逻辑改了,最好也去看下组合购买是不是也要改,请见combPurchase.html)
                $('.' + _widgetClass + ' #placeOrder').unbind('click').bind('click', function () {
                    // fbq发起结账埋点
                    if (window.fbq && !window.fbAccessToken) {
                        window.fbq('track', 'InitiateCheckout')
                    }
                    // ttq发起结账埋点
                    if (window.ttq) {
                        window.ttq.track('InitiateCheckout')
                    }
                    //如果有支付系统，则产品价格不能为空
                    if (payModuleFlag == '1' && $('.' + _widgetClass + ' .prod-desc-discountprice')[0] == undefined) {
                        $('.' + _widgetClass + ' #addToCartErrorMsg').html(phoenix_error_buy_prod).show().fadeOut(5000);
                        return;
                    }
                    if ($(this).hasClass("disabled")) {
                        $('.' + _widgetClass + ' #addToCartErrorMsg').html(phoenix_error_no_stock).show().fadeOut(5000);
                        return;
                    }
                    // 如果产品中有产品规格的选项，则提交到购物车必须要选择产品规格
                    var standards = $('.' + _widgetClass + ' .description-btn-wrap');
                    if (standards.length > 0) {
                        var isShut = false;
                        standards.each(function (i, n) {
                            var standardChoosed = $(n).find('a.choosed');
                            var msgObj = $(n).parent().find('span.order-error-msg');
                            if (standardChoosed[0] == undefined) {
                                var noStock = $(n).find('div.choosed').find('a.disable');
                                var standardTh = $(n).parent().find('span.skuName');
                                if (standardTh.length == 0) {
                                    standardTh = $(n).parent().parent().find('th');
                                }
                                var itemName = standardTh.html().trim();
                                var index = itemName.lastIndexOf(':');
                                if (index == -1) {
                                    index = itemName.lastIndexOf('：');
                                }
                                if (index != -1) {
                                    itemName = itemName.substring(0, index);
                                }
                                var errorMsg = phoenix_error_standard_must_choosed;
                                if (msgObj.length == 0) {
                                    var tipHtml = '<span class="order-error-msg" style="color:#E13D41">' + errorMsg + ' ' + itemName + '</span>';
                                    // 无库存提示语
                                    if (noStock[0]) {
                                        tipHtml = '<span class="order-error-msg" style="color:#E13D41">' + phoenix_order_sold_out + '</span>';
                                    }
                                    $(n).parent().append(tipHtml);
                                } else {
                                    msgObj.show();
                                }
                                //$('.' + _widgetClass + ' #addToCartErrorMsg').html(errorMsg).show().fadeOut(5000);
                                isShut = true;
                                return false;
                            } else {
                                msgObj.hide();
                            }
                        });
                        if (isShut) {
                            return;
                        }
                    }

                    var aChoosed = $("." + _widgetClass + " a.choosed");
                    var selectParam = new Array();
                    if (aChoosed[0] != undefined) {
                        aChoosed.each(function (i, n) {
                            var data = {
                                'name': (_options.prodDetailShowStyle == '7') ? $(n).parent().parent().parent().children('th').find(".skuName").text() : $(n).parent().parent().parent().children('th').html(),
                                'value': $(n).attr('title'),
                                'typeId': $(n).attr('typeid'),
                                'valueId': $(n).attr('valueid'),
                                'quantity': $('.' + _widgetClass + ' .order-quan-input').val()
                            }
                            selectParam.push(data);
                        });
                    } else {
                        var data = {
                            'quantity': $('.' + _widgetClass + ' .order-quan-input').val()
                        }
                        selectParam.push(data);
                    }
                    $('.' + _widgetClass + ' input[name=quantity]').val($('.' + _widgetClass + ' .order-quan-input').val());
                    $('.' + _widgetClass + ' #prodPlaceOrder input[name=extendProp]').val($.toJSON(selectParam));

                    $('.' + _widgetClass + ' #prodPlaceOrder').submit();
                });


            }

            // 判断数量是否为正整数
            if (prodDetailShowStyle) {
                $('.' + _widgetClass + ' .order-quan-input').change(function () {
                    //判断输入的是否为正整数
                    var reg = /(^[1-9]\d*$)/;
                    var msg = 'Please enter positive integer.';
                    var quantity = $(this).val();

                    if (!reg.test(quantity)) {
                        if (!$(this).parent().next('.order-error-msg').length) {
                            $(this).parent().after('<span class="order-error-msg mt5" style="color:#E13D41">' + msg + '</span>');
                        }
                        // $('.' + _widgetClass + ' #placeOrder').prop('disabled', true);
                        // $('.' + _widgetClass + ' #addToCart').prop('disabled', true);
                        $('.' + _widgetClass + ' #prodInquire').prop('disabled', true);
                        $('.' + _widgetClass + ' #addToBasket').prop('disabled', true);
                        // $('.' + _widgetClass + ' #placeOrder').addClass('disabled');
                        // $('.' + _widgetClass + ' #addToCart').addClass('disabled');
                        $('.' + _widgetClass + ' #prodInquire').addClass('disabled');
                        $('.' + _widgetClass + ' #addToBasket').addClass('disabled');
                    } else {
                        if ($(this).parent().next('.order-error-msg').length > 0) {
                            $(this).parent().next('.order-error-msg').remove();
                        }
                        // $('.' + _widgetClass + ' #placeOrder').prop('disabled', false);
                        // $('.' + _widgetClass + ' #addToCart').prop('disabled', false);
                        $('.' + _widgetClass + ' #prodInquire').prop('disabled', false);
                        $('.' + _widgetClass + ' #addToBasket').prop('disabled', false);
                        // $('.' + _widgetClass + ' #placeOrder').removeClass('disabled');
                        // $('.' + _widgetClass + ' #addToCart').removeClass('disabled');
                        $('.' + _widgetClass + ' #prodInquire').removeClass('disabled');
                        $('.' + _widgetClass + ' #addToBasket').removeClass('disabled');
                    }
                })
            }

            //产品数量减
            if ($('.' + _widgetClass + ' .order-minus')[0] != undefined) {
                $('.' + _widgetClass + ' .order-minus').unbind('click').bind('click', function () {
                    var $prodQuantity = $(this).next('.order-quan-input');
                    if (!$prodQuantity.length) {
                        return;
                    }


                    var prodQuantity = $.trim($prodQuantity.val());
                    var isProdQuantity = false;
                    if (!!!prodQuantity || isNaN(prodQuantity)) {
                        isProdQuantity = false;
                    }
                    if (/\d+/.test(prodQuantity) && parseInt(prodQuantity) > 1) {
                        isProdQuantity = true;
                    }
                    if (!isProdQuantity) {
                        $prodQuantity.val('1');
                        return;
                    }
                    if($(".prodOrderQuantity").length > 0) {
                        //开启批发模式
                        if($("#minOrderQuantity").val()) {
                            if (prodDetailShowStyle && prodDetailShowStyle == '12' && solutionName && solutionName == 'b2b2c' && prodQuantity <= minOrderQuantity) {
                                $prodQuantity.change();
                                return
                            }
                        }
                    }
                    $prodQuantity.val(parseInt(prodQuantity) - 1);
                    $prodQuantity.change();
                });
            }

            //产品数量加
            if ($('.' + _widgetClass + ' .order-plus')[0] != undefined) {
                $('.' + _widgetClass + ' .order-plus').unbind('click').bind('click', function () {
                    var $prodQuantity = $(this).prev('.order-quan-input');
                    if (!$prodQuantity.length) {
                        return;
                    }
                    var prodQuantity = $.trim($prodQuantity.val());
                    var isProdQuantity = false;
                    if (!!!prodQuantity || isNaN(prodQuantity)) {
                        isProdQuantity = false;
                    }
                    if (/\d+/.test(prodQuantity) && parseInt(prodQuantity) > 0) {
                        isProdQuantity = true;
                    }
                    if (!isProdQuantity) {
                        $prodQuantity.val('1');
                        return;
                    }
                    if($(".prodOrderQuantity").length > 0) {
                        //开启批发模式
                        if($("#maxOrderQuantity").val()){
                            if (prodDetailShowStyle && prodDetailShowStyle == '12' && solutionName && solutionName == 'b2b2c' && prodQuantity >= maxOrderQuantity) {
                                $prodQuantity.change();
                                return
                            }
                        }

                    }
                    $prodQuantity.val(parseInt(prodQuantity) + 1);
                    $prodQuantity.change();
                });
            }

            // 添加到购物车功能 (注意组合购买也有购物车功能,那里的逻辑部分是沿用这里的逻辑,如果后期这里的逻辑改了,最好也去看下组合购买是不是也要改,请见combPurchase.html)
            if ($('.' + _widgetClass + ' #addToCart')[0] != undefined) {
                $('.' + _widgetClass + ' #addToCart').unbind('click').bind('click', function () {
                    // 互动统计
                    if (window._ldDataLayer && window._ldDataLayer.push) {
                        var p_sid = $.cookie('p_sid') || 0;
                        var theId = p_sid + "_" + productId + "_" + new Date().getTime();
                        window._ldDataLayer.push(["event", "action_shoppingCart", "click", "addToCart", theId]);
                    }
                    // fbq加入购物车埋点
                    if (window.fbq && !window.fbAccessToken) {
                        window.fbq('track', 'AddToCart')
                    }
                    // ttq加入购物车埋点
                    if (window.ttq) {
                        window.ttq.track('AddToCart')
                    }
                    //如果有支付系统，则产品价格不能为空
                    if (payModuleFlag == '1' && $('.' + _widgetClass + ' .prod-desc-discountprice')[0] == undefined) {
                        $('.' + _widgetClass + ' #addToCartErrorMsg').html(phoenix_error_buy_prod).show().fadeOut(5000);
                        return;
                    }
                    if ($(this).hasClass("disabled")) {
                        $('.' + _widgetClass + ' #addToCartErrorMsg').html(phoenix_error_no_stock).show().fadeOut(5000);
                        return;
                    }
                    // 如果产品中有产品规格的选项，则提交到购物车必须要选择产品规格
                    var standards = $('.' + _widgetClass + ' .description-btn-wrap');
                    if (standards.length > 0) {
                        var isShut = false;
                        standards.each(function (i, n) {
                            var standardChoosed = $(n).find('a.choosed');
                            var msgObj = $(n).parent().find('span.order-error-msg');
                            if (standardChoosed[0] == undefined) {
                                var noStock = $(n).find('div.choosed').find('a.disable');
                                var standardTh = $(n).parent().find('span.skuName');
                                if (standardTh.length == 0) {
                                    standardTh = $(n).parent().parent().find('th');
                                }
                                var itemName = standardTh.html().trim();
                                var index = itemName.lastIndexOf(':');
                                if (index == -1) {
                                    index = itemName.lastIndexOf('：');
                                }
                                if (index != -1) {
                                    itemName = itemName.substring(0, index);
                                }
                                var errorMsg = phoenix_error_standard_must_choosed;
                                if (msgObj.length == 0) {
                                    var tipHtml = '<span class="order-error-msg" style="color:#E13D41">' + errorMsg + ' ' + itemName + '</span>';
                                    // 无库存提示语
                                    if (noStock[0]) {
                                        tipHtml = '<span class="order-error-msg" style="color:#E13D41">' + phoenix_order_sold_out + '</span>';
                                    }
                                    $(n).parent().append(tipHtml);
                                } else {
                                    msgObj.show();
                                }
                                //$('.' + _widgetClass + ' #addToCartErrorMsg').html(errorMsg).show().fadeOut(5000);
                                isShut = true;
                                return false;
                            } else {
                                msgObj.hide();
                            }
                        });
                        if (isShut) {
                            return;
                        }
                    }
                    var _url = "/phoenix/admin/order/addToCart";
                    var isNewProd = "1" == $("#isSkuProd").val();
                    var type = "post";
                    var property = "";
                    if (isNewProd) {
                        property = $("#skuValueId").val();
                    } else {
                        var propertyIdArr = [];
                        var aChoosed = $("." + _widgetClass + " a.choosed");
                        if (aChoosed[0] != undefined) {
                            aChoosed.each(function (i, n) {
                                propertyIdArr.push($(n).attr('typeid') + "_" + $(n).attr('valueid'));
                            });
                        }
                        property = propertyIdArr.join(',');
                    }

                    // 暂时只设下单为1
                    var quantity = $('.' + _widgetClass + ' .order-quan-input').val();
                    var prodId = productId;
                    var data = {
                        'extendProp': property,
                        'quantity': quantity,
                        'prodIds': prodId,
                        'pluginType': $("input[name='data-pluginType']").val() || "",
                        'subscribeId': $("input[name='data-subscribeId']").val() || "",
                    };
                    var _options = {
                        url: _url,
                        type: type,
                        dataType: 'json',
                        data: data,
                        done: function (xhr) {
                            if (xhr.status == 'success') {
                                //添加动画
                                var msg = phoenix_shopingcart_notice;
                                $("<div class='add-cart-msg'>" + msg + "</div>").appendTo($('body'));
                                var popUpWin = $(".add-cart-msg");
                                $(popUpWin).fadeIn(500);
                                setTimeout(function () {
                                    $(popUpWin).fadeOut(500, function () {
                                        $(this).remove();
                                    });
                                }, 1500);
                                // 刷新购物车状态
                                if (xhr.addNewFlag != undefined) {
                                    $('.sitewidget-shoppingStatus span[data-attr=shoppingcartNum]').each(function (i, n) {
                                        // $(n).html(xhr.cartNum);
                                        var oldNum = $(n).html();
                                        oldNum = oldNum.replace(/\d+/, xhr.cartNum);
                                        $(n).html(oldNum);
                                    });
                                }
                                // 购物车浮层
                                showLayerShopcart();
                            } else {
                                $('.' + _widgetClass + ' #addToCartErrorMsg').html(xhr.reason).show().fadeOut(5000);
                            }
                        }
                    };
                    phoenixSite.ajax(_options);
                });
            }


            //产品短视频
            prodDetail.prodVideoPlay();
        },
        /* js控制产品属性名与属性值的长度美观*/
        prodDesLenBeautiful: function () {
            var _widgetClass = _options.widgetClass;
            if($('.' + _widgetClass).attr('data-fieldAlignStyle') == '2') {
                var prodInfoList  = $('.' + _widgetClass + ' .pro-info-list');
                if(prodInfoList.length > 0) {
                    var maxLen = 0;
                    prodInfoList.find('li').each(function (i, n) {
                        var prodLabel = $(this).find('label');
                        var prodP = $(this).find('p');
                        prodLabel.css({
                            'white-space':'nowrap',
                            'width':'auto'
                        });
                        prodP.css({
                            'flex': '1',
                            'word-break': 'break-word'
                        })
                        $(this).css({
                            'margin-left':'10px',
                            'width':'auto'
                        })
                    });
                }
                return;
            };
            var prodLiLabel = 0;
            var prodLiWidth = $('.' + _widgetClass + ' .pro-info-list').find("li").width();
            if ($('.' + _widgetClass + ' .pro-info-list').length > 0) {
                $('.' + _widgetClass + ' .pro-info-list').find("li").each(function (i, n) {
                    if ($(this).children("label").width() > prodLiLabel) {
                        prodLiLabel = $(this).children("label").width();
                    }
                });
            }
            if ($('.' + _widgetClass + ' .pro-itemspecifics-list').length > 0 && $('.' + _widgetClass + ' .pro-info-list').length == 0) {
                $('.' + _widgetClass + ' .prod-desc-money').find(".prod-desc-price-text").each(function (i, n) {
                    if ($(this).width() > prodLiLabel) {
                        prodLiLabel = $(this).width();
                    }
                });
                $('.' + _widgetClass + ' .this-description-table').find("th").width(prodLiLabel + 5);
            }
            var proInfoList = document.querySelector('.' + _widgetClass + ' .pro-info-list');
            if (proInfoList) {
                var liItems = proInfoList.querySelectorAll('li');
                if (liItems.length > 0) {
                    var label = liItems[0].querySelectorAll('label')[0];
                    if (label && label.style.width == '') {
                        $('.' + _widgetClass + ' .pro-info-list').find("li").children("label").width(prodLiLabel + 5);
                        $('.' + _widgetClass + ' .pro-info-list').find("li").children("em").width(prodLiWidth - (prodLiLabel + 5));
                        $('.' + _widgetClass + ' .prod-desc-money').find(".prod-desc-price-text").width(prodLiLabel + 5);
                        $('.' + _widgetClass + ' .this-description-table').find("th").width(prodLiLabel + 5);
                    }
                }
            }
        },
        // 产品详情的样式隔离
        prodDetailIframe: function () {
            //当前产品详情组件
            var thisWidgetClass2 = _options.widgetClass;
            var proddetailWrap2 = $("." + thisWidgetClass2 + " .sitewidget-bd");
            proddetailWrap2.find('.prodDescTemplate').hide();
            proddetailWrap2.find('.prodDescTemplate').remove();
        },
        initLabel: function (option) {
            var str = option['encodeProductId']
            var mainDom = $("." + option['widgetClass'] + " .sitewidget-bd .proddetail-wrap")

            if(option.isMobile) {
                mainDom = $("." + option['widgetClass'] + " .sitewidget-bd .proddetail-wrap .pro_pic_small")
            }
            var $pic = mainDom.find('.labelclass')
            var $title = $('.prodDetail-tts')
            var isFrontend = window.$_phoenix == undefined;
            var url = '/prod/label/get'
            if (isFrontend) {
                url = '/phoenix/admin/prod/label/'
            } else {
                url = '/prod/label/get'
            }
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                data: {
                    ids: str
                },
                success: function (res) {
                    res[str].forEach(function (dataItem, i) {
                        //判断是自定义标签
                        var longNum = res[str].length
                        if (dataItem['labelDivision'] === "1") {
                            if (dataItem['labelType'] === '0') {
                                $pic.find('a').css({ 'display': 'inline-block', 'opacity': dataItem['transparency'] })
                            } else if (dataItem['labelType'] === '1') {
                                savediscount = dataItem['discountContext'];
                                savePercent = dataItem['discountOff'];
                            }
                            //判断是文本
                            var html = ''
                            if (dataItem['showType'] === "0") {
                                if (dataItem['showPositon'] === "0") {
                                    var $tlDom = $pic.find('.prodDetail-ttl')
                                    $tlDom.addClass('show')
                                    $tlDom.find('div').css('color', dataItem['fontColor'])
                                    if (dataItem['labelType'] === '1') {
                                        html = "<div class='discount'>"
                                        if (dataItem['discountOff'] && dataItem['discountOff'].length > 0) {
                                            html += "<span class='off'>" + dataItem['discountOff'] + "</span>"
                                            html += "<br>"
                                        }
                                        if (dataItem['discountContext'] && dataItem['discountContext'].length > 0) {
                                            html += "<span class='currencySymbol'>Save " + dataItem['discountSymbol'] + "</span>"
                                            html += "<span class='needExchangeValue savediscount' exchangevalue='" + dataItem['discountContext'] + "'>" + dataItem['discountContext'] + "</span>"
                                        }
                                        html += '</div>'
                                        $tlDom.html(html);
                                    } else {
                                        $tlDom.find('div').html(dataItem['labelName'])
                                    }
                                    $tlDom.css({
                                        "boxShadow": "0px -100px 0px 100px " + dataItem['backgroundColor'],
                                        "zIndex": longNum - i,
                                        "backgroundColor": dataItem['backgroundColor']
                                    })
                                } else if (dataItem['showPositon'] === "1") {
                                    var $trDom = $pic.find('.prodDetail-ttr');
                                    $trDom.addClass('show')
                                    $trDom.find('div').css('color', dataItem['fontColor'])
                                    if (dataItem['labelType'] === '1') {
                                        html = "<div class='discount'>"
                                        if (dataItem['discountOff'] && dataItem['discountOff'].length > 0) {
                                            html += "<span class='off'>" + dataItem['discountOff'] + "</span>"
                                            html += "<br>"
                                        }
                                        if (dataItem['discountContext'] && dataItem['discountContext'].length > 0) {
                                            html += "<span class='currencySymbol'>Save " + dataItem['discountSymbol'] + "</span>"
                                            html += "<span class='needExchangeValue savediscount' exchangevalue='" + dataItem['discountContext'] + "'>" + dataItem['discountContext'] + "</span>"
                                        }
                                        html += "</div>"

                                        $trDom.html(html)
                                    } else {
                                        $trDom.find('div').html(dataItem['labelName'])
                                    }
                                    $trDom.css({
                                        "boxShadow": "0px -100px 0px 100px " + dataItem['backgroundColor'],
                                        "zIndex": longNum - i,
                                        "backgroundColor": dataItem['backgroundColor']
                                    })
                                } else if (dataItem['showPositon'] === "2") {
                                    var $tDom = $pic.find('.prodDetail-tt');
                                    !$tDom.hasClass('show') ? $tDom.addClass('show') : null
                                    if (dataItem['labelType'] === '1') {
                                        var $tspanItem = document.createElement('div')
                                        $tspanItem.setAttribute("class", "discount");
                                        if (dataItem['discountOff'] && dataItem['discountOff'].length > 0) {
                                            html += "<span class='off' style='padding:0 5px'>" + dataItem['discountOff'] + "</span>"
                                        }
                                        if (dataItem['discountContext'] && dataItem['discountContext'].length > 0) {
                                            html += "<span class='currencySymbol'>Save " + dataItem['discountSymbol'] + "</span>"
                                            html += "<span class='needExchangeValue savediscount' style='padding-right: 5px' exchangevalue='" + dataItem['discountContext'] + "'>" + dataItem['discountContext'] + "</span>"
                                        }
                                        $tspanItem.innerHTML = html
                                        $tspanItem.style.backgroundColor = dataItem['backgroundColor']
                                        $tspanItem.style.color = dataItem['fontColor']
                                        $tDom.append($tspanItem)
                                        $tDom.css("zIndex", longNum - i)
                                    } else {
                                        var $tspanItem1 = document.createElement('div')
                                        $tspanItem1.innerHTML = dataItem['labelName'];
                                        $tspanItem1.style.backgroundColor = dataItem['backgroundColor']
                                        $tspanItem1.style.color = dataItem['fontColor']
                                        $tDom.append($tspanItem1)
                                        $tDom.css("zIndex", longNum - i)
                                    }
                                } else if (dataItem['showPositon'] === "4") {
                                    !$title.hasClass('show') ? $title.addClass('show') : null
                                    $title.addClass('discount')
                                    $title.html(dataItem['labelName'])
                                    if (dataItem['labelType'] === '1') {
                                        if (dataItem['discountOff'] && dataItem['discountOff'].length > 0) {
                                            html += "<span class='off' style='padding: 0 5px'>" + dataItem['discountOff'] + "</span>"
                                        }
                                        if (dataItem['discountContext'] && dataItem['discountContext'].length > 0) {
                                            html += "<span class='currencySymbol'>Save " + dataItem['discountSymbol'] + "</span>"
                                            html += "<span class='needExchangeValue savediscount' style='padding-right: 5px' exchangevalue='" + dataItem['discountContext'] + "'>" + dataItem['discountContext'] + "</span>"
                                        }
                                        $title.html(html)
                                    } else {
                                        $title.html(dataItem['labelName'])
                                    }
                                    $title.css({
                                        'backgroundColor': dataItem['backgroundColor'],
                                        'color': dataItem['fontColor'],
                                        "zIndex": longNum - i
                                    });
                                }
                            } else {
                                if (dataItem['showPositon'] === "0") {
                                    var $itlDom = $pic.find('.prodDetail-itl')
                                    $itlDom.addClass('show')
                                    $itlDom.find('img').attr('src', dataItem['picUrl'])
                                    $itlDom.css("zIndex", longNum - i)
                                } else if (dataItem['showPositon'] === "1") {
                                    var $itrDom = $pic.find('.prodDetail-itr')
                                    $itrDom.addClass('show')
                                    $itrDom.find('img').attr('src', dataItem['picUrl'])
                                    $itrDom.css("zIndex", longNum - i)
                                } else if (dataItem['showPositon'] === "3") {
                                    var $irDom = $pic.find('.prodDetail-ir')
                                    !$irDom.hasClass('show') ? $irDom.addClass('show') : null
                                    var $imgItem = document.createElement('img')
                                    $imgItem.setAttribute('src', dataItem['picUrl'])
                                    $irDom.append($imgItem)
                                    $irDom.css("zIndex", longNum - i)
                                }
                            }
                        } else {
                            var $irDom = $pic.find('.prodDetail-ir')
                            !$irDom.hasClass('show') ? $irDom.addClass('show') : null
                            var $imgItem = document.createElement('img')
                            $imgItem.setAttribute('src', dataItem['picUrl'])
                            $irDom.append($imgItem)
                            $irDom.css("zIndex", longNum - i)
                        }

                    })
                    var $discount = $('.labelclass .discount')
                    if ($discount.length && currentsavePercent.length > 0) {
                        $discount.each(function () {
                            var $this = $(this)
                            $this.find('.off').html(currentsavePercent)
                            $this.find('.savediscount').html(currentsavediscount)
                        })
                    }


                }
            })
        },
        closeProdDetailVieo: function(){
            if (_options.prodDetailShowStyle == '12') {
                if ( $(window).innerWidth() > 990) {
                    // $('.' + _options.widgetClass + ' .pc-proddetail-bigpic').show();
                    $('.' + _options.widgetClass + ' .pc-proddetail-bigpic').find('.pic-container').eq(0).children().each(function(index, ele) {
                        $(ele).removeClass('hide')
                    })
                    $('.' + _options.widgetClass + ' .pc-proddetail-bigpic .video_play_icon').show()
                    // $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p').hide();
                    $('.' + _options.widgetClass + ' .phone-proddetail-bigpic').hide();
                } else {
                    $('.' + _options.widgetClass + ' .pc-proddetail-bigpic').hide();
                    $('.' + _options.widgetClass + ' .phone-proddetail-bigpic').show();
                }
            } else if (_options.prodDetailShowStyle == '13' || _options.prodDetailShowStyle == '14') {
                if ($(window).innerWidth() > 990) {
                    $('.' + _options.widgetClass + ' .proddetail-picArea').find('.ms-container').show();
                    $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-p').hide();
                } else {
                    if(_options.prodDetailShowStyle == '14') {
                        $('.' + _options.widgetClass + ' .proddetail-picArea').find('.ms-container').show();
                    }
                    $('.' + _options.widgetClass + ' .proddetail-picArea').find('.prodetail-slider').show();
                    $('.' + _options.widgetClass + ' .proddetail-picArea').find('.video_play_icon').show();
                    $('.' + _options.widgetClass + ' .prodetail-video-box.prodetail-video-box-m').hide();
                }
            } else {
                $('.' + _options.widgetClass + ' .proddetail-picArea').show();
            }
            $('.' + _options.widgetClass + ' .prodetail-video-wrap').empty();
            $('.' + _options.widgetClass + ' .prodetail-video-box').hide();
            if(player){
                player.dispose();
            }
        },
        disabledSku: function () {
            var skuParamsDom = $('.' + _options.widgetClass +' .skuParams a');
            // console.log();
            if (!!_options.skuValueMap) {
                var skuValueMap = $.parseJSON(_options.skuValueMap);
                var skuValueKeys = Object.keys(skuValueMap);
                if(!skuValueKeys.length) {
                    return
                }
                // Object.keys($.parseJSON(_options.skuValueMap))
                skuParamsDom.each(function () {
                    var value = $(this).attr('value')
                    var includeCurrentSku = skuValueKeys.filter(function (item) {
                        return item.includes(value);
                    })
                    var skuFlag = true;
                    includeCurrentSku.forEach(function (skuItem) {
                        if(skuValueMap[skuItem].stock != 0) {
                            skuFlag = false
                        }
                    })
                    if (skuFlag) {
                        if (($("." + _options.widgetClass + " input[name='notifyStatus']") && $("." + _options.widgetClass + " input[name='notifyStatus']").val() == '1')
                            && ($("." + _options.widgetClass + " input[name='outStockNotifyFlag']") && $("." + _options.widgetClass + " input[name='outStockNotifyFlag']").val() == '1')) {
                            return
                        }
                        $(this).addClass('default-disabled');
                        $(this).parent().addClass("disable");
                    }
                })
            }
        },
        autoChooseSku: function () {
            if (!!_options.skuValueMap) {
                var skuValueMap = $.parseJSON(_options.skuValueMap);
                var skuValueKeys = Object.keys(skuValueMap);
                var defaultChooseSku = ''
                var skuParamsDom = $('.' + _options.widgetClass +' .skuParams a');
                var isContinue = true;
                skuValueKeys.forEach(function(item){
                    // console.log()
                    if(skuValueMap[item]['stock'] !=0 && isContinue) {
                        defaultChooseSku = item
                        isContinue = false
                    }
                })
                if(defaultChooseSku && defaultChooseSku.length) {
                    // console.log("defaultChooseSku.....", defaultChooseSku)
                    var chooseSkuArray = defaultChooseSku.split('~!!~')
                    chooseSkuArray.forEach(function (sku) {
                        skuParamsDom.each(function () {
                            if($(this).attr('value')===sku) {
                                var that = $(this)
                                setTimeout(function(){
                                    that.trigger("click");
                                    prodDetail.showVframeImage(_options);
                                },500)
                            }
                        })
                    })
                } else {
                    prodDetail.showVframeImage(_options, true);
                }
            }
        },
        // 显示视频第一帧图片
        showVframeImage: function(_options, change) {
            var offsetImg = $('.' + _options.widgetClass + ' .prodetail-video-wrap').find("input.offsetimg").val();
            if ($('.' + _options.widgetClass + ' .prodetail-video-wrap').find("img.offsetimg").length === 0 && offsetImg) {
                setTimeout(function() {
                    $('.' + _options.widgetClass +' li.prod-video-content .diolag-module-bg').unbind("click").bind("click", function(e) {
                        e.stopPropagation();
                        prodDetail.startPlayVideo($('.' + _options.widgetClass + ' .prodetail-video-wrap').attr("data-video-url"));
                    });
                }, 1000);
                $('.' + _options.widgetClass + ' .prodetail-video-wrap').append("<img class='offsetimg hide' src='"+offsetImg+"' />");
                $('.' + _options.widgetClass + ' .prodetail-video-wrap').find("img.offsetimg").load(function() {
                    // 第一帧图片加载
                    try {
                        var jsonData = eval("(" + $(".thumblist-scroll #thumblist li.prod-video-content .light-item").attr("rel") + ")");
                        jsonData.largeimage = offsetImg;
                        jsonData.smallimage = offsetImg;
                        $(".thumblist-scroll #thumblist li.prod-video-content .light-item").attr("rel", JSON.stringify(jsonData));
                        $(".thumblist-scroll #thumblist li.prod-video-content .light-item").find("img").attr("src", offsetImg);
                        $(".thumblist-scroll #thumblist li.prod-video-content .light-item").attr("href", offsetImg);
                        if (change) {
                            $(".easyzoom img.video-preview-image").attr("src", offsetImg);
                            $(".pro_pic_small img.video-preview-image").attr("src", offsetImg);
                            $(".pro_pic_small img.video-preview-image").attr("org-src", offsetImg);
                        }
                    } catch (error) {
                        console.log(error)
                    }
                });
            }
        },
        initVideoPlay: function(option) {
            var parentDom = $("." + option.widgetClass);
            parentDom.find(".ms-thumb-frame").bind("click", function(){
                if (parentDom.find(".skuChangImg").length > 0 && parentDom.find(".ms-slide .ms-slide-bgcont .transparent").length > 0) {
                    parentDom.find(".skuChangImg").remove();
                    parentDom.find(".ms-slide .ms-slide-bgcont .transparent").removeClass("transparent");
                }
                var _index = $(this).index();
                if (_index === 0) {
                    $(".proddetail-wrap .video_play_icon").show();
                    if (parentDom.find("#prod_video").length > 0) {
                        parentDom.find(".ms-container").hide();
                        if ($(window).innerWidth() > 990) {
                            parentDom.find(".prodetail-video-box-m").hide();
                            parentDom.find(".master-slider .prodetail-video-box.prodetail-video-box-p").show();
                        } else {
                            parentDom.find(".prodetail-video-box-p").hide();
                            parentDom.find(".master-slider .prodetail-video-box.prodetail-video-box-m").show();
                        }
                    }
                } else {
                    var videoHei = parseFloat(parentDom.find("#prod_video").css("height"));
                    $(".proddetail-wrap .video_play_icon").hide();
                    if (videoHei > 2) {
                        parentDom.find(".proddetail-picArea .proddetail-picshow .proddetail-showinner").css("height", (videoHei - 2) + "px");
                    }
                    parentDom.find(".proddetail-picArea").show();
                    parentDom.find(".ms-container").show();
                    parentDom.find(".prodetail-video-box").hide();
                };
            })
        },
        changeVideoPreviewImg: function(option) {
            var maxHeight = 0;
            var imgWidth = 0;
            var parentDom = $("." + option.widgetClass);
            if (parentDom.find(".prod-pic-item.prod-video-preview-image").length) {
                var imgList = parentDom.find(".prodetail-slider .prod-pic-item:not('.prod-video-preview-image')>a img");
                if (imgList.length) {
                    imgList.each(function() {
                        var imgHeight = $(this).height();
                        if (imgHeight > maxHeight) {
                            maxHeight = imgHeight;
                            imgWidth = $(this).width();
                        }
                    });
                    parentDom.find(".prod-pic-item.prod-video-preview-image>a img").css({"width": imgWidth + "px", "height": maxHeight + "px"});
                }
            }
        }
    });
    var camera, scene, renderer, object, controls;
    function initThreeD(alloption) {
        console.log('alloption',alloption)
        if(!alloption.isShow3d){
            return
        }
        // try {
            if(alloption.templateSaveJson && alloption.templateSaveJson != ""){
                //风格12特殊判断
                if(alloption.prodDetailShowStyle == "12" && $("body").width() > 989){
                    var firstPicCotainerHeight = $('.'+ alloption.widgetClass +" .proddetail-picArea .pic-container").eq(0).height() - 46 + "px"
                    $('.'+ alloption.widgetClass +" .proddetail-picArea").css("top",firstPicCotainerHeight)
                    $('.'+ alloption.widgetClass +" .pc-proddetail-bigpic .threeDBox").css("padding-left","30px")
                    $('.'+ alloption.widgetClass +" .pc-proddetail-bigpic .threeDBox").css("padding-top","30px")
                }

                if( alloption.prodDetailShowStyle == "2" || alloption.prodDetailShowStyle == "3" || alloption.prodDetailShowStyle == "4" || alloption.prodDetailShowStyle == "5" || alloption.prodDetailShowStyle == "6" || alloption.prodDetailShowStyle == "9" || alloption.prodDetailShowStyle == "14"){
                    if($('.'+ alloption.widgetClass + ' .owl-controls').css('display') == 'none'){
                        $('.'+ alloption.widgetClass +" .switch3D").addClass('switch3D-alone')
                    }
                    //按钮单独调整 <div class="switch3D hide"> 移动到轮播图里
                    $('.'+ alloption.widgetClass +" .switch3D").appendTo('.'+ alloption.widgetClass + " .proddetail-picArea");

                }
                //暂时只处理风格1,2,9,后续子任务补上其他风格
                if(alloption.prodDetailShowStyle == "0" || alloption.prodDetailShowStyle == "1" || alloption.prodDetailShowStyle == "2" || alloption.prodDetailShowStyle == "3" || alloption.prodDetailShowStyle == "4" || alloption.prodDetailShowStyle == "5" || alloption.prodDetailShowStyle == "6" || alloption.prodDetailShowStyle == "7" || alloption.prodDetailShowStyle == "9" || alloption.prodDetailShowStyle == "10" || alloption.prodDetailShowStyle == "8" || alloption.prodDetailShowStyle == "11" || alloption.prodDetailShowStyle == "12" || alloption.prodDetailShowStyle == "13" || alloption.prodDetailShowStyle == "14"){
                    $('.'+ alloption.widgetClass +" .switch3D").removeClass("hide")
                }

                var options = {
                    dataJson:alloption.templateSaveJson,
                };
                //老3d 展示
                // var templateSaveData = JSON.parse(alloption.templateSaveJson)
                var templateSaveJsonEncode = JSON.parse(decode(alloption.templateSaveJsonEncode))

                if(!templateSaveJsonEncode.templateSaveJson.resourceContent.newThree || (templateSaveJsonEncode.templateSaveJson.resourceContent.newThree && templateSaveJsonEncode.templateSaveJson.resourceContent.newThree == "2")){
                    if(!templateSaveJsonEncode.templateSaveJson.resourceContent.newThree){
                        $.getScript(phoenixSite.page.cdnUrl + "/static/assets/widget/script/plugins/three/three.js", function () {
                            $.getScript(phoenixSite.page.cdnUrl + "/static/assets/widget/script/plugins/three/OBJLoader.js", function () {
                                $.getScript(phoenixSite.page.cdnUrl + "/static/assets/widget/script/plugins/three/STLLoader.js", function () {
                                    $.getScript(phoenixSite.page.cdnUrl + "/static/assets/widget/script/plugins/three/OrbitControls.js", function () {
                                        $.getScript(phoenixSite.page.cdnUrl + "/static/assets/widget/script/plugins/three/tween.js", function () {
                                            $.getScript(phoenixSite.page.cdnUrl + "/static/assets/widget/script/plugins/three/screenfull.js", function () {
                                                $('.' + alloption.widgetClass + " .switch3D").unbind("click").bind("click", function () {
                                                    if (alloption.prodDetailShowStyle == "12" && $("body").width() > 989) {
                                                        //loading 显示
                                                        $('.' + alloption.widgetClass + ' .pc-proddetail-bigpic').find("#threeDLoading").show()
                                                    }else{
                                                        //loading 显示
                                                        $('.' + alloption.widgetClass).find("#threeDLoading").show()
                                                    }
                                                    //3d 场景高度
                                                    //风格12特殊判断
                                                    if (alloption.prodDetailShowStyle == "12" && $("body").width() > 989) {
                                                        var threeDBoxHeight = $('.' + alloption.widgetClass + " .proddetail-picArea .pic-container").eq(0).height();
                                                        var threeDBoxWidth = $('.' + alloption.widgetClass + " .proddetail-picArea .pic-container").eq(0).width();
                                                    } else if (alloption.prodDetailShowStyle == "13" && $("body").width() > 1200) {
                                                        var threeDBoxHeight = $('.' + alloption.widgetClass + " .proddetail-picArea .master-slider").height()
                                                        var threeDBoxWidth = $('.' + alloption.widgetClass + " .proddetail-picArea .master-slider").width();
                                                    } else {
                                                        var threeDBoxHeight = $('.' + alloption.widgetClass + " .proddetail-picArea").height();
                                                        var threeDBoxWidth = $('.' + alloption.widgetClass + " .proddetail-picArea").width();
                                                    }
                                                    if (alloption.prodDetailShowStyle == "12" && $("body").width() > 989) {
                                                        $('.' + alloption.widgetClass + ' .pc-proddetail-bigpic' + " .threeDBox").css("height", threeDBoxHeight)
                                                        $('.' + alloption.widgetClass + ' .pc-proddetail-bigpic' + " .threeDBox").css("width", threeDBoxWidth)
                                                        $('.' + alloption.widgetClass + ' .pc-proddetail-bigpic' + " .threeDBox").removeClass("hide")
                                                        //切换按钮关闭
                                                        $('.' + alloption.widgetClass + ' .pc-proddetail-bigpic' + " .switch3D").hide()
                                                    }else{
                                                        $('.' + alloption.widgetClass + " .threeDBox").css("height", threeDBoxHeight)
                                                        $('.' + alloption.widgetClass + " .threeDBox").css("width", threeDBoxWidth)
                                                        $('.' + alloption.widgetClass + " .threeDBox").removeClass("hide")
                                                        //切换按钮关闭
                                                        $('.' + alloption.widgetClass + " .switch3D").hide()
                                                    }
                                                    initThreeDscene(options, alloption);
                                                })
                                                $('.' + alloption.widgetClass + " #threeDclose").unbind("click").bind("click", function () {
                                                    if(alloption.prodDetailShowStyle == "12" && $("body").width() > 989){
                                                        //清除3d场景
                                                        $('.' + alloption.widgetClass + ' .pc-proddetail-bigpic' + " #ThreeD_containter_main").find("canvas").remove()
                                                        $('.' + alloption.widgetClass + ' .pc-proddetail-bigpic' + " .threeDBox").addClass("hide")
                                                        //切换按钮展示
                                                        $('.' + alloption.widgetClass + ' .pc-proddetail-bigpic' + " .switch3D").show()
                                                    }else{
                                                        //清除3d场景
                                                        $('.' + alloption.widgetClass + " #ThreeD_containter_main").find("canvas").remove()
                                                        $('.' + alloption.widgetClass + " .threeDBox").addClass("hide")
                                                        //切换按钮展示
                                                        $('.' + alloption.widgetClass + " .switch3D").show()
                                                    }
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    }else{
                        //3D模型展示（嵌入）
                        $('.' + alloption.widgetClass + " .switch3D").unbind("click").bind("click", function () {
                            if (alloption.prodDetailShowStyle == "12" && $("body").width() > 989) {
                                var threeDBoxHeight = $('.' + alloption.widgetClass + " .proddetail-picArea .pic-container").eq(0).height();
                                var threeDBoxWidth = $('.' + alloption.widgetClass + " .proddetail-picArea .pic-container").eq(0).width();
                            } else if (alloption.prodDetailShowStyle == "13" && $("body").width() > 1200) {
                                var threeDBoxHeight = $('.' + alloption.widgetClass + " .proddetail-picArea .master-slider").height()
                                var threeDBoxWidth = $('.' + alloption.widgetClass + " .proddetail-picArea .master-slider").width();
                            } else {
                                var threeDBoxHeight = $('.' + alloption.widgetClass + " .proddetail-picArea").height();
                                var threeDBoxWidth = $('.' + alloption.widgetClass + " .proddetail-picArea").width();
                            }
                            if (alloption.prodDetailShowStyle == "12" && $("body").width() > 989) {
                                $('.' + alloption.widgetClass + ' .pc-proddetail-bigpic' + " .threeDBox").css("height", threeDBoxHeight)
                                $('.' + alloption.widgetClass + ' .pc-proddetail-bigpic' + " .threeDBox").css("width", threeDBoxWidth)
                                $('.' + alloption.widgetClass + ' .pc-proddetail-bigpic' + " .threeDBox").removeClass("hide")
                                //切换按钮关闭
                                $('.' + alloption.widgetClass + ' .pc-proddetail-bigpic' + " .switch3D").hide()
                                var modelSrc = templateSaveJsonEncode.templateSaveJson.resourceContent.threeDUrl;
                                $('.' + alloption.widgetClass + ' .pc-proddetail-bigpic' + " #ThreeD_containter_main").append(modelSrc)
                                $('.' + alloption.widgetClass + ' .pc-proddetail-bigpic').find("#threeDLoading").hide()
                            }else{
                                $('.' + alloption.widgetClass + " .threeDBox").css("height", threeDBoxHeight)
                                $('.' + alloption.widgetClass + " .threeDBox").css("width", threeDBoxWidth)
                                $('.' + alloption.widgetClass + " .threeDBox").removeClass("hide")
                                //切换按钮关闭
                                $('.' + alloption.widgetClass + " .switch3D").hide()
                                var modelSrc = templateSaveJsonEncode.templateSaveJson.resourceContent.threeDUrl;
                                $('.' + alloption.widgetClass + " #ThreeD_containter_main").append(modelSrc)
                                $('.' + alloption.widgetClass).find("#threeDLoading").hide()
                            }
                        })
                        $('.' + alloption.widgetClass + " #threeDclose").unbind("click").bind("click", function () {
                            if (alloption.prodDetailShowStyle == "12" && $("body").width() > 989) {
                                $('.' + alloption.widgetClass + ' .pc-proddetail-bigpic' + " .threeDBox").addClass("hide")
                                $('.' + alloption.widgetClass + ' .pc-proddetail-bigpic' + " #ThreeD_containter_main iframe").remove()
                                //切换按钮展示
                                $('.' + alloption.widgetClass + ' .pc-proddetail-bigpic' + " .switch3D").show()
                            }else{
                                $('.' + alloption.widgetClass + " .threeDBox").addClass("hide")
                                $('.' + alloption.widgetClass + " #ThreeD_containter_main iframe").remove()
                                //切换按钮展示
                                $('.' + alloption.widgetClass + " .switch3D").show()
                            }
                        })
                    }
                }else if (templateSaveJsonEncode.templateSaveJson.resourceContent.newThree && templateSaveJsonEncode.templateSaveJson.resourceContent.newThree == '1'){
                    //获取国际化文本
                    var fit = $('.'+alloption.widgetClass + " #adaptationWindow").val() || "Fit model to window";
                    var up_y = $('.'+alloption.widgetClass + " #yUp").val() || "Set Y axis as up vector";
                    var up_z = $('.'+alloption.widgetClass + " #zUp").val() || "Set Z axis as up vector";
                    var flip = $('.'+alloption.widgetClass + " #flipUp").val() || 'Flip up vector';
                    var fix_up_on = $('.'+alloption.widgetClass + " #upwardFixation").val() || "Fixed up vector";
                    var fix_up_off = $('.'+alloption.widgetClass + " #freeOrbit").val() || "Free orbit";
                    var light_mode = $('.'+alloption.widgetClass + " #lightMode").val() || "Light mode";
                    var dark_mode = $('.'+alloption.widgetClass + " #darkMode").val() || "Dark mode";
                    var m_d = $('.' + alloption.widgetClass + " #modelDisplay").val() || "Model Display";
                    var b_c = $('.' + alloption.widgetClass + " #backgroundColor").val() || "Background Color";
                    var e_m = $('.' + alloption.widgetClass + " #environment").val() || "Environment";
                    var s_e = $('.' + alloption.widgetClass + " #showEdges").val() || "Show Edges";
                    var e_c = $('.' + alloption.widgetClass + " #edgeColor").val() || "Edge Color";
                    var r_d = $('.' + alloption.widgetClass + " #restorDefault").val() || "Reset to Default";
                    var u_b_i = $('.'+alloption.widgetClass + " #backgroundImage").val() || "Use as background image";
                    var m_l = $('.'+alloption.widgetClass + " #modelLoading").val() || "Loading Model";
                    var d_c = $('.'+alloption.widgetClass + " #defaultColor").val() || "Default Color";
                    var i_s = $('.'+alloption.widgetClass + " #importSettings").val() || "Import Settings";

                    var ourterHtml = '<div class="new-threed-box" style="display: none">\n' +
                        '    <span class="close"><svg t="1720157704933" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5365" width="18" height="18"><path d="M558.096874 509.244236l278.304494-276.863678c13.159718-13.094226 13.226233-34.31248 0.132006-47.472198-13.123902-13.189394-34.305317-13.226233-47.465035-0.132006L510.692215 461.669708 234.740302 184.877661c-13.062504-13.093203-34.310434-13.159718-47.470151-0.066515-13.129019 13.093203-13.160741 34.342156-0.066515 47.501874l275.885398 276.725532L184.918593 785.733385c-13.160741 13.094226-13.226233 34.310434-0.134053 47.472198 6.54609 6.581905 15.172561 9.900487 23.799032 9.900487 8.56098 0 17.125029-3.252067 23.672142-9.768481l278.236955-276.761348 278.473339 279.31245c6.54609 6.582929 15.142885 9.871835 23.768333 9.871835 8.594749 0 17.155728-3.288906 23.701818-9.80532 13.123902-13.093203 13.159718-34.305317 0.066515-47.465035L558.096874 509.244236 558.096874 509.244236zM558.096874 509.244236" fill="#5a5a68" p-id="5366"></path></svg></span>\n' +
                        '    <div class="content"></div>\n' +
                        '</div>'
                    $('body').append(ourterHtml);

                    $('.' + alloption.widgetClass + " .switch3D").unbind("click").bind("click", function () {
                        if(!$(this).hasClass('.active-new')){
                            var modelSrc = JSON.parse(alloption.templateSaveJson).templateSaveJson.resourceContent.threeDUrl;

                            var llist = {
                                p_t:1,
                                l:{
                                    fit:fit,
                                    up_y:up_y,
                                    up_z:up_z,
                                    flip:flip,
                                    fix_up_on:fix_up_on,
                                    fix_up_off:fix_up_off,
                                    light_mode:light_mode,
                                    dark_mode:dark_mode,
                                    m_d:m_d,
                                    b_c:b_c,
                                    e_m:e_m,
                                    s_e:s_e,
                                    e_c:e_c,
                                    r_d:r_d,
                                    u_b_i:u_b_i,
                                    m_l:m_l,
                                    d_c:d_c,
                                    i_s:i_s
                                }
                            }
                            var iframe_baseSrc = `https://a0.leadongcdn.cn/build/package/onlineviewer/index.html?params=${encodeURIComponent(JSON.stringify(llist))}/#model=`
                            var tmp =  `<iframe src=${iframe_baseSrc}${modelSrc}></iframe>`;
                            $('.new-threed-box .content').html(tmp);
                            $('.new-threed-box').show();
                            $(this).addClass('active-new')
                        }

                    })
                    $(".new-threed-box .close").unbind("click").bind("click", function () {
                        $('.new-threed-box .content').html('');
                        $('.new-threed-box').hide();
                        $('.' + alloption.widgetClass + " .switch3D").removeClass('active-new');
                    })
                }else if (templateSaveJsonEncode.templateSaveJson.resourceContent.newThree && templateSaveJsonEncode.templateSaveJson.resourceContent.newThree == '2'){
                    //3D模型展示（后续）
                    /**
                     * 后续开发按照风格来，每个单独或者批量写
                     * */
                    var ourterHtml = '<div class="new-threed-iframe-box" style="display: none">\n' +
                        '    <span class="close"><svg t="1720157704933" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5365" width="18" height="18"><path d="M558.096874 509.244236l278.304494-276.863678c13.159718-13.094226 13.226233-34.31248 0.132006-47.472198-13.123902-13.189394-34.305317-13.226233-47.465035-0.132006L510.692215 461.669708 234.740302 184.877661c-13.062504-13.093203-34.310434-13.159718-47.470151-0.066515-13.129019 13.093203-13.160741 34.342156-0.066515 47.501874l275.885398 276.725532L184.918593 785.733385c-13.160741 13.094226-13.226233 34.310434-0.134053 47.472198 6.54609 6.581905 15.172561 9.900487 23.799032 9.900487 8.56098 0 17.125029-3.252067 23.672142-9.768481l278.236955-276.761348 278.473339 279.31245c6.54609 6.582929 15.142885 9.871835 23.768333 9.871835 8.594749 0 17.155728-3.288906 23.701818-9.80532 13.123902-13.093203 13.159718-34.305317 0.066515-47.465035L558.096874 509.244236 558.096874 509.244236zM558.096874 509.244236" fill="#5a5a68" p-id="5366"></path></svg></span>\n' +
                        '    <div class="content"></div>\n' +
                        '</div>'
                    //3d 场景高度
                    // $('.' + alloption.widgetClass + " .switch3D").unbind("click").bind("click", function () {
                    //     //风格12,13特殊判断
                    //     if (alloption.prodDetailShowStyle == "12" && $("body").width() > 1200) {
                    //         var threeDBoxHeight = $('.' + alloption.widgetClass + " .proddetail-picArea .pic-container").eq(0).height();
                    //         var threeDBoxWidth = $('.' + alloption.widgetClass + " .proddetail-picArea .pic-container").eq(0).width();
                    //     } else if (alloption.prodDetailShowStyle == "13" && $("body").width() > 1200) {
                    //         var threeDBoxHeight = $('.' + alloption.widgetClass + " .proddetail-picArea .master-slider").height()
                    //         var threeDBoxWidth = $('.' + alloption.widgetClass + " .proddetail-picArea .master-slider").width();
                    //     } else {
                    //         var threeDBoxHeight = $('.' + alloption.widgetClass + " .proddetail-picArea").height();
                    //         var threeDBoxWidth = $('.' + alloption.widgetClass + " .proddetail-picArea").width();
                    //     }
                    //
                    //     $('.' + alloption.widgetClass + " .threeDBox").css("height", threeDBoxHeight)
                    //     $('.' + alloption.widgetClass + " .threeDBox").css("width", threeDBoxWidth)
                    //     $('.' + alloption.widgetClass + " .threeDBox").removeClass("hide")
                    //     //切换按钮关闭
                    //     $('.' + alloption.widgetClass + " .switch3D").hide()
                    //     添加至第一张幻灯片位置
                    // })

                    // $selector.find('.bigBox').append(ourterHtml);
                    // $('.' + alloption.widgetClass + ' .switch3D').unbind("click").bind("click", function () {
                    //     if (!$(this).hasClass('.active-new')) {
                    //         var modelSrc = threeDData.templateSaveJson.resourceContent.threeDUrl;
                    //         $('.new-threed-iframe-box .content').html(modelSrc);
                    //         $('.new-threed-iframe-box').show();
                    //         $(this).addClass('active-new')
                    //     }
                    // })
                    // $('.' + alloption.widgetClass + " .new-threed-iframe-box .close").unbind("click").bind("click", function () {
                    //     $('.new-threed-iframe-box .content').html('');
                    //     $('.new-threed-iframe-box').hide();
                    //     $selector.find('.bigBox .switch3D').removeClass('active-new');
                    // })
                    // $('.' + alloption.widgetClass + ' .switch3D').removeClass('hide")
                }
                //新3d展示逻辑

                // console.log('--------',JSON.parse(alloption.templateSaveJson))

            }
        // }catch{
        //
        // }
    }
    //base64解密
    function decode(str) {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }
    function initThreeDscene(option,alloption) {

        //轮播图宽高
        var ContainterMainWidth;
        var ContainterMainHeight;

        var save3dDataUrl = JSON.parse(option.dataJson).templateSaveJson.resourceContent.threeDUrl;
        var save3dDataName = JSON.parse(option.dataJson).templateSaveJson.resourceContent.threeDName;
        var save3dDataNameSlider = JSON.parse(option.dataJson).templateSaveJson.resourceContent.threeDSlider;
        var save3dDataObjX = JSON.parse(option.dataJson).templateSaveJson.resourceContent.threeDX;
        var save3dDataObjY = JSON.parse(option.dataJson).templateSaveJson.resourceContent.threeDY;
        var save3dDataObjZ = JSON.parse(option.dataJson).templateSaveJson.resourceContent.threeDZ;
        var save3dDataThreeDrotationY = JSON.parse(option.dataJson).templateSaveJson.resourceContent.threeDrotationY;
        var threeLightSourceColor = JSON.parse(option.dataJson).templateSaveJson.resourceContent.threeLightSourceColor || '#FFFFFF';
        var threeLightSourceIntensity = JSON.parse(option.dataJson).templateSaveJson.resourceContent.threeLightSourceIntensity;
        let objName, texture;
        camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,10000);
        camera.position.z = 27 + Number(save3dDataNameSlider);
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff);
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambientLight);
        var threeLightSourceColorRGB = new THREE.Color(threeLightSourceColor);
        var pointLight = new THREE.PointLight(threeLightSourceColorRGB, threeLightSourceIntensity / 200);
        camera.add(pointLight);
        scene.add(camera);
        if(alloption.prodDetailShowStyle == "12" && $("body").width() > 989){
            ContainterMainWidth = $('.'+ alloption.widgetClass + ' .pc-proddetail-bigpic').find('#ThreeD_containter_main')[0].offsetWidth
            ContainterMainHeight = $('.'+ alloption.widgetClass + ' .pc-proddetail-bigpic').find('#ThreeD_containter_main')[0].offsetHeight
        }else{
            ContainterMainWidth = $('.'+ alloption.widgetClass).find('#ThreeD_containter_main')[0].offsetWidth
            ContainterMainHeight = $('.'+ alloption.widgetClass).find('#ThreeD_containter_main')[0].offsetHeight
        }
        if(alloption.prodDetailShowStyle == "12" && $("body").width() > 989){
            ContainterMainWidth = $('.'+ alloption.widgetClass + ' .pc-proddetail-bigpic').find('#ThreeD_containter_main')[0].offsetWidth
            ContainterMainHeight = $('.'+ alloption.widgetClass + ' .pc-proddetail-bigpic').find('#ThreeD_containter_main')[0].offsetHeight
        }else if(alloption.prodDetailShowStyle == "12" && $("body").width() <= 989) {
            ContainterMainWidth = $('.'+ alloption.widgetClass + ' .phone-proddetail-bigpic').find('#ThreeD_containter_main')[0].offsetWidth
            ContainterMainHeight = $('.'+ alloption.widgetClass + ' .phone-proddetail-bigpic').find('#ThreeD_containter_main')[0].offsetHeight
        }else if(alloption.prodDetailShowStyle == "13" && $("body").width() > 989) {
            ContainterMainWidth = $('.'+ alloption.widgetClass + ' .pro_pic_big').find('#ThreeD_containter_main')[0].offsetWidth
            ContainterMainHeight = $('.'+ alloption.widgetClass + ' .pro_pic_big').find('#ThreeD_containter_main')[0].offsetHeight
        }else if(alloption.prodDetailShowStyle == "13" && $("body").width() <= 989) {
            ContainterMainWidth = $('.'+ alloption.widgetClass + ' .pro_pic_small').find('#ThreeD_containter_main')[0].offsetWidth
            ContainterMainHeight = $('.'+ alloption.widgetClass + ' .pro_pic_small').find('#ThreeD_containter_main')[0].offsetHeight
        }else{
            ContainterMainWidth = $('.'+ alloption.widgetClass).find('#ThreeD_containter_main')[0].offsetWidth
            ContainterMainHeight = $('.'+ alloption.widgetClass).find('#ThreeD_containter_main')[0].offsetHeight
        }
        console.log(ContainterMainWidth, "---", ContainterMainHeight)
        console.log(scene)
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            precision: 'highp',
            preserveDrawingBuffer: true,
            alpha: true,
            logarithmicDepthBuffer: true,//消除摩尔纹
        });
        renderer.setSize(ContainterMainWidth, ContainterMainHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio * 4, 8));


        var directionalLights = []
        function loadDirectionalLight() {
            // 光线8向
            // 创建光源
            var lightColors = [0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff]; // 每个方向光的颜色
            // var lightColors = [0xff0000, 0xff8000, 0xffff00, 0x00ff00, 0x00ffff, 0x0000ff, 0x8000ff, 0xff00ff,
            //            0xff0000, 0xff8000, 0xffff00, 0x00ff00, 0x00ffff, 0x0000ff, 0x8000ff, 0xff00ff]; // 每个方向光的颜色

            for (var i = 0; i < 16; i++) {
                var directionalLight = new THREE.DirectionalLight(lightColors[i], 1); // 光强为1
                var angle = (i / 16) * Math.PI * 2; // 计算每个光源的角度
                var x = Math.sin(angle);
                var z = -Math.cos(angle);
                directionalLight.position.set(x, 1, z); // 设置每个光源的位置
                scene.add(directionalLight);
                directionalLights.push(directionalLight);
            }
        }


        function loadModel() {
            if (!object) {
                console.error("没有加载出模型Failed to load OBJ model.");
                return;
            }
            if(save3dDataUrl.indexOf(".stl") != -1){
                var material = new THREE.MeshPhysicalMaterial({
                    color: 0x808080,
                    metalness: 0.8, // 设置金属度为1，表示完全是金属材质
                    roughness: 0.1 // 设置粗糙度，数值越小，反射光越集中，看上去越光滑
                  });

                  mesh = new THREE.Mesh(object, material);
                  mesh.scale.set(12, 12, 12);
                  object = mesh
                  scene.add(mesh);
            } else {
                if(directionalLights.length > 0) {
                    for(var i = 0;i<directionalLights.length;i++) {
                        scene.remove(directionalLights[i]);
                    }
                }
                if (object) {
                    object.traverse(function (child) {
                        // if (child.isMesh) child.material.map = texture;
                    });
                }
                scene.add(object);
            }
            console.log("save3dDataObjX && save3dDataObjY", Number(save3dDataObjX), Number(save3dDataObjY))
            if (save3dDataObjX || save3dDataObjY) {
                object.position.set(Number(save3dDataObjX), Number(save3dDataObjY), Number(save3dDataObjZ));
                console.log("objectMsg", object)
            } else {
                object.position.set(0, 0, 0);
            }
            //初始角度
            object.rotation.y = (save3dDataThreeDrotationY * Math.PI) / 180;
            if(alloption.prodDetailShowStyle == "12" && $("body").width() > 989){
                $('.'+ alloption.widgetClass + ' .pc-proddetail-bigpic').find("#threeDLoading").hide()
            }else{
                $('.'+ alloption.widgetClass).find("#threeDLoading").hide()
            }
            if(alloption.prodDetailShowStyle == "12" && $("body").width() > 989){
                $('.'+ alloption.widgetClass + ' .pc-proddetail-bigpic').find("#threeDLoading").hide()
            }else if(alloption.prodDetailShowStyle == "12" && $("body").width() <= 989) {
                $('.'+ alloption.widgetClass + " .phone-proddetail-bigpic ").find("#threeDLoading").hide()
            }else if(alloption.prodDetailShowStyle == "13" && $("body").width() > 989) {
                $('.'+ alloption.widgetClass + " .pro_pic_big").find("#threeDLoading").hide()
            }else if(alloption.prodDetailShowStyle == "13" && $("body").width() <= 989) {
                $('.'+ alloption.widgetClass + " .pro_pic_small").find("#threeDLoading").hide()
            }else{
                $('.'+ alloption.widgetClass).find("#threeDLoading").hide()
            }
            setTimeout( function() {
                // canvasToImg()
            }, 1000);
            scene.traverse(function (obj) {

            })

        }

        var manager = new THREE.LoadingManager(loadModel);
        var textureLoader = new THREE.TextureLoader(manager);
        //texture = textureLoader.load(materialLink);

        texture = textureLoader.load("");


        // model

        function onProgress(xhr) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
            }
        }

        function onError() {
            console.error("载入模型失败Failed to load OBJ model.");
        }

        var loader;
        if(save3dDataUrl.indexOf(".stl") != -1){
            loader = new THREE.STLLoader(manager);
            loadDirectionalLight()
        } else {
            loader = new THREE.OBJLoader(manager);
        }
        loader.load(save3dDataUrl, function (obj) {
            object = obj;
        }, onProgress, onError);

        if(alloption.prodDetailShowStyle == "12" && $("body").width() > 989){
            $('.'+ alloption.widgetClass + " .pc-proddetail-bigpic #ThreeD_containter_main").append(renderer.domElement);
        }else if(alloption.prodDetailShowStyle == "12" && $("body").width() <= 989) {
            $('.'+ alloption.widgetClass + " .phone-proddetail-bigpic #ThreeD_containter_main").append(renderer.domElement);
        }else if(alloption.prodDetailShowStyle == "13" && $("body").width() > 989) {
            $('.'+ alloption.widgetClass + " .pro_pic_big #ThreeD_containter_main").append(renderer.domElement);
        }else if(alloption.prodDetailShowStyle == "13" && $("body").width() <= 989) {
            $('.'+ alloption.widgetClass + " .pro_pic_small #ThreeD_containter_main").append(renderer.domElement);
        }else{
            $('.'+ alloption.widgetClass + " #ThreeD_containter_main").append(renderer.domElement);
        }
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableZoom = true;
        controls.enabled = true;
        controls.enableDamping = true//惯性
        controls.dampingFactor = 0.2//阻力

        //tween*
        controls.enabled = true
        animate()
        //放大缩小 全屏控制器
        var zoomFlag = JSON.parse(option.dataJson).templateSaveJson.resourceContent.templateModule[0].moduleList[0].value
        var full_screenFlag = JSON.parse(option.dataJson).templateSaveJson.resourceContent.templateModule[0].moduleList[1].value
        bindEvent(zoomFlag,full_screenFlag,alloption)
    }
    function animate() {
        requestAnimationFrame(animate);
        controls.update();  // 更新控
        render();
        //TWEEN.update()
    }

    function render() {
        camera.lookAt(scene.position);
        // 防止模型被拉伸变形
        var canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
    }

    function bindEvent(zoomFlag,full_screenFlag,alloption) {
        var canvas = document.querySelector('.'+alloption.widgetClass+' #ThreeD_containter_main canvas')
        if(zoomFlag == 0){
            $('.'+alloption.widgetClass+' #ThreeD_containter_main #threeDControl .zoom-box').css("display","flex")
        }else{
            $('.'+alloption.widgetClass+' #ThreeD_containter_main #threeDControl .zoom-box').css("display","none")
        }
        if(full_screenFlag == 0){
            $('.'+alloption.widgetClass+' #ThreeD_containter_main #threeDControl .setting-box').css("display","flex")
        }else{
            $('.'+alloption.widgetClass+' #ThreeD_containter_main #threeDControl .setting-box').css("display","none")
        }
        //如果都是关闭，隐藏控制项
        if(zoomFlag == 1 && full_screenFlag == 1){
            $('.'+alloption.widgetClass+' #ThreeD_containter_main #threeDControl').addClass("hide")
        }
        $('.'+alloption.widgetClass+' #ThreeD_containter_main #threeDControl #zoom_amplify').unbind("click").bind("click",function(){
            controls.object.zoom = Math.max( controls.minZoom, Math.min( controls.maxZoom, controls.object.zoom * 1.1 ) );
        })
        $('.'+alloption.widgetClass+' #ThreeD_containter_main #threeDControl #zoom_reduce').unbind("click").bind("click",function(){
            controls.object.zoom = Math.max( controls.minZoom, Math.min( controls.maxZoom, controls.object.zoom / 1.1 ) );
        })
        $('.'+alloption.widgetClass+' #ThreeD_containter_main #threeDControl #full_screen').unbind("click").bind("click",function(){
           if (screenfull.isEnabled) {
               screenfull.toggle(canvas);
           }
        })
        $('.'+alloption.widgetClass+' #ThreeD_containter_main #threeDControl #full_screen')[0].addEventListener("click", function () {
            if (screenfull.isEnabled) {
                screenfull.toggle(canvas);
            }
        });
        canvas.addEventListener('mousedown', function(event) {
            // 阻止事件传递到父级幻灯片元素
            event.stopPropagation();
            // 在此处添加您的three.js mousedown事件处理程序
        });

    }
    function showLayerShopcart() {
        if (!!phoenixSite.shoppingcartStatus && typeof phoenixSite.shoppingcartStatus.showLayerShopcart == 'function') {
            phoenixSite.shoppingcartStatus.showLayerShopcart();
            $("body.frontend-body-canvas").addClass("body-over-hidden");
        }
    }
    function initAudio(options) {
        var width = $('.'+ options.widgetClass +" .audio-box").width();
        var audios = $('.'+ options.widgetClass +" .audio-container-box .audio-box audio");
        audios.each(function(){
            new kac($(this).get(0), width, 50,
                "", true, audios);
        })
    }
})(window, jQuery);
