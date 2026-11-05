(function (window, $, undefined) {
    var _block_namespaces_ = window._block_namespaces_ || (window._block_namespaces_ = {});
    var name = "blockCon6089";
    var skyblock = _block_namespaces_[name] || (_block_namespaces_[name] = {});
    $.extend(skyblock, {
        "init": innit
    });

    function innit(nodeObj) {
        if (!!!nodeObj) {
            return;
        }

        var $selector = $('div[data-settingid=' + nodeObj.settingId + ']');

        var scrollItem = $selector.find('.skyinfinite-scroll-warp .sky-left-scroll');
        scrollItem.skyNoIntervalRoll();

        $selector.find('.blockCon6089').addClass('active');
    }
})(window, jQuery);