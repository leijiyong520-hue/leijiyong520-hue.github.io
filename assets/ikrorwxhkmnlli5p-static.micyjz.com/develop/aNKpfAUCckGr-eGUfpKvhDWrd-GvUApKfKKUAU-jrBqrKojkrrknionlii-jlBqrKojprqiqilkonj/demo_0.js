(function(window, $, undefined) {
    var _block_namespaces_ = window._block_namespaces_ || (window._block_namespaces_ = {});
    var name = "blockCon27562_0";
    var blockCon27562_0 = _block_namespaces_[name] || (_block_namespaces_[name] = {});
    $.extend(blockCon27562_0, {
        "init": init
    })

    async function init(nodeObj) {
        if (!!!nodeObj) {
            return;
        }
        
        if (typeof leadComponentSite !== 'undefined' && leadComponentSite.slickSourceImport) {
            await leadComponentSite.slickSourceImport.leadInit({});
        }

        var $selector = $('div[data-settingid=' + nodeObj.settingId + ']');
        
        $selector.find('.LA27562 .list').leadSlick({
            dots: false,
            infinite: false,
            arrows: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: $selector.find('.LA27562 .Left'),
            nextArrow: $selector.find('.LA27562 .Right'),
            responsive: [{ 
                breakpoint: 800,
                settings: {
                    dots: false,
                    arrows: true,
                    slidesToShow: 1,
                }
            }]
        });
    }
})(window, jQuery);