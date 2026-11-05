(function (window, $, undefined) {
    var _block_namespaces_ = window._block_namespaces_ || (window._block_namespaces_ = {});
    var name = "blockCon3421";
    var blockCon3421 = _block_namespaces_[name] || (_block_namespaces_[name] = {});
    $.extend(blockCon3421, {
        "init": init
    })
    
    async function init(nodeObj) {
        if (!!!nodeObj) {
            return;
        }

        if (leadComponentSite.slickSourceImport) {
            await leadComponentSite.slickSourceImport.leadInit({})
        }

        var $selector = $('div[data-settingid=' + nodeObj.settingId + ']');
        
        $selector.find('.blockCon3421 .slick').leadSlick({
            dots: true,
            accessibility: false,
            arrows: false,
            autoplay: true,
        });
    }
})(window, jQuery);