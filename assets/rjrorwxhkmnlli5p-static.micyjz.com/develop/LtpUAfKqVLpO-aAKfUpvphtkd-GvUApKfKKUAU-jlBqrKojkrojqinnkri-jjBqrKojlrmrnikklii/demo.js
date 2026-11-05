(function (window, $, undefined) {
    var _block_namespaces_ = window._block_namespaces_ || (window._block_namespaces_ = {});
    var name = "blockCon11104";
    var blockCon11104 = _block_namespaces_[name] || (_block_namespaces_[name] = {});
    $.extend(blockCon11104, {
        "init": init
    });

    async function init(nodeObj) {
        if (!!!nodeObj) {
            return;
        }

        if (leadComponentSite.slickSourceImport) {
            await leadComponentSite.slickSourceImport.leadInit({});
        }

        var $selector = $('div[data-settingid=' + nodeObj.settingId + ']');
        $selector.find('style[styleDefault-block]').remove(); // 初始化移除默认样式

        var $slider = $selector.find('.dance-ul');
        var lis = $slider.find('.dance-ul-li').length;

        $slider.leadSlick({
            lazyLoad: 'ondemand',
            slidesToScroll: 1,
            slidesToShow: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            arrows: false,
            infinite: true,
            vertical: true,
            verticalSwiping: true,
            dots: lis > 1,
            speed: 500
        });

        var refreshSlider = function () {
            if ($slider.hasClass('slick-initialized')) {
                try {
                    $slider.slick('refresh');
                } catch (e) {}
            }
        };

        $(window).on('resize.blockCon11104 orientationchange.blockCon11104', refreshSlider);
    }
})(window, jQuery);