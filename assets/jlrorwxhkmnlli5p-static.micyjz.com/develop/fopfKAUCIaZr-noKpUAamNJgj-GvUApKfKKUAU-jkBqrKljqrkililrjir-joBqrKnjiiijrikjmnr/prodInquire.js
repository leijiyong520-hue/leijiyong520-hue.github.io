(function (window, $, undefined) {
  var _block_namespaces_ = window._block_namespaces_ || (window._block_namespaces_ = {});
  var name = "prodInquire_style1";
  var prodInquire_style1 = _block_namespaces_[name] || (_block_namespaces_[name] = {});
  $.extend(prodInquire_style1, {
    "init": init
  })

  function init() {
    var paymentFun = function (paramsObj) {
      const {
        that,
        prodIds,
        skuValueId,
        quantity
      } = paramsObj;
      const params = {
        prodId:prodIds,
        skuParam:"",
        selectParam: "",
        quantity:quantity +''
      }
      console.log(params);
      if (window.leadProductBaseEvents) {
        // 询盘跳转到新页面
        that.find('input[name=inquireParams]').val(JSON.stringify([params]));
        that.find(".prodInquireForm").submit();                
        // window.leadProductBaseEvents.productInquire(params);
      }
    }

    $('body').off('click', '.prodInquire').on('click', '.prodInquire', function () {
      var that = $(this);
      var openDetail = that.find("[data-open_proddetail]");
      if(openDetail.length > 0){
          openDetail[0].click();
          return;
      }
      var skuValueIdStr = "";
      var skuValueIdHtml = that.find("[data-skuValueIdStr]");
      if(skuValueIdHtml && skuValueIdHtml.length > 0){
          skuValueIdStr = skuValueIdHtml.attr("data-skuValueIdStr");
      }
      var prodIds = that.attr("data-prodIds")
      var nodeId = that.attr("data-nodeId")
      var containerComponentType = that.attr("data-componentType")
      if (!prodIds || !nodeId) {
        console.log('缺少prodIds、nodeId参数');
        return;
      }
      // 产品列表
      if (containerComponentType && containerComponentType === 'dynamic-list-container') {
        paymentFun({
          that,
          prodIds,
          skuValueId: skuValueIdStr,
          quantity: 1
        })
      } else {
        var nodeExtendParams = _block_namespaces_[nodeId] || (_block_namespaces_[nodeId] = {});
        var skuParam = nodeExtendParams.getSkuParams && nodeExtendParams.getSkuParams({type:'tip'});
        var quantity = (nodeExtendParams.getQuantity && nodeExtendParams.getQuantity()) || 1;
        if (skuParam && quantity) {
          var { skuValueId } = skuParam;
          paymentFun({
            that,
            prodIds,
            skuValueId,
            quantity
          })
        }else if(skuValueIdStr && quantity){
          paymentFun({
            that,
            prodIds,
            skuValueId:skuValueIdStr,
            quantity
          })
        } else {
          console.log('缺少sku、quantity参数');
        }
      }
    })
  }
  onloadHack(function () {
    init()
  })
})(window, jQuery);