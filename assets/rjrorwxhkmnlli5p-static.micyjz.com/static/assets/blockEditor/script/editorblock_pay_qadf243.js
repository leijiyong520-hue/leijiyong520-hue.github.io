(async function (window, $, undefined) {

        // 下单函数引入方式
        if(leadComponentSite.blockPaySourceImport) {
            await leadComponentSite.blockPaySourceImport.init({})
        }

// 询价
    $('body').off('click', '.block-editor-inquire').on('click', '.block-editor-inquire', function () {
        var prodId = $(this).attr('prodId');
        var quantity = $(this).attr('minorderquantity');
        if (quantity == undefined || quantity == '') {
            quantity = "1"
        }
        var inquireParam = {
            prodId: prodId,
            selectParam: '',
            quantity: quantity
        };
        var arrayInquire = new Array();
        arrayInquire.push(inquireParam);
        $(this).parents('.prodlist-site-buttons-container').find('input[name=inquireParams]').val(JSON.stringify(arrayInquire));
        $(this).parents('.prodlist-site-buttons-container').find('#prodInquire').submit();
    });
//点击加入询盘栏事件
    $('body').off('click', '.block-editor-add-basket').on('click', '.block-editor-add-basket', function () {
        var prodIds = $(this).attr('prodId');
        var skuValueId = $.trim($(this).attr('skuValueId'));
        var prodPhotoUrl = !!$("img[bigimgonly=attr_BigImgOnly_leadong]").attr("src") ? $("img[bigimgonly=attr_BigImgOnly_leadong]").attr("src") : $(this).attr('prodPhotoUrl');
        var prodName = $(this).attr('prodName');
        const params = {
            prodIds: prodIds,
            prodId: prodIds,
            prodName: prodName,
            skuImgUrl: prodPhotoUrl,
            skuValueId: skuValueId,
            quantity: 1
        }
        if (window.leadProductBaseEvents) {
            window.leadProductBaseEvents.inquireBasket(params);
        }
    });
// 添加到购物车
    $('body').off('click', '.editor-prodlist-addcart').on('click', '.editor-prodlist-addcart', function () {
        var that = $(this);
        // 暂时只设下单为1
        var quantity = $(this).attr('minorderquantity');
        if (quantity == undefined || quantity == '') {
            quantity = "1"
        }
        var prodIds = that.attr('prodId');
        var skuValueId = $.trim(that.attr('skuValueId'));
        const params = {
            prodIds: prodIds,
            prodId: prodIds,
            quantity:quantity,
            skuValueId: skuValueId,
            pluginType: "",
            subscribeId: ""
        }
        if (window.leadProductBaseEvents) {
            window.leadProductBaseEvents.addToCart(params);
        }
    });

})(window, jQuery);