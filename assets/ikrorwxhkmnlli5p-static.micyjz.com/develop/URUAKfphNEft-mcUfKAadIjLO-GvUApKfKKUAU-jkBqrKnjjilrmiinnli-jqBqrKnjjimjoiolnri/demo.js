(function (window, $, undefined) {
    var _block_namespaces_ = window._block_namespaces_ || (window._block_namespaces_ = {});
    var name = "blockCon23404";
    var blockCon23404 = _block_namespaces_[name] || (_block_namespaces_[name] = {});
    $.extend(blockCon23404, {
        "init": init
    })

    async function init(nodeObj) {
        if (!!!nodeObj) {
            return;
        }
        
        var $selector = $('div[data-settingid=' + nodeObj.settingId + ']');
        
        if (leadComponentSite.slickSourceImport) {
            await leadComponentSite.slickSourceImport.leadInit({})
        }

        // 后续代码
        var index = 0;
        
        // 计算元素数量
        var mainImgCount = $selector.find('.blockCon23404 .MainImgSlick li').length;
        
        // 右侧背景轮播
        var option1 = {
            dots: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: $selector.find('.blockCon23404 .leftSlick'),
            speed: 300,
            fade: true,
            cssEase: 'linear',
            arrows: false,
            adaptiveHeight: true,
            responsive: [{
                breakpoint: 1050,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: mainImgCount > 1, // 只有元素数量大于显示数量时才显示轮播点
                    fade: false,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    dotsClass: 'docts_23404',
                    customPaging: function (i, num) {
                        return (
                            `<button></button>`
                        )
                    },
                }
            }],
        }
        $selector.find('.blockCon23404 .MainImgSlick').leadSlick(option1);
        
        // 左侧文字
        var option2 = {
            dots: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: $selector.find('.blockCon23404 .MainImgSlick'),
            speed: 300,
            arrows: false,
            adaptiveHeight: true,
        }
        $selector.find('.blockCon23404 .leftSlick').leadSlick(option2);
        $selector.find('.blockCon23404 .MainImgSlick').leadSlick('slickGoTo', 0);
        $selector.find('.blockCon23404 .leftSlick').leadSlick('slickGoTo', 0);
        $selector.find(".beforeInit").removeClass("beforeInit");
        
        var timer = null;
        $selector.find('.rightViceImg li').on('mouseover', function (el) {
            index = $(this).attr('data-id');
            // console.log(index);
            clearTimeout(timer);
            timer = null;
            timer = setTimeout(() => {
                $selector.find('.blockCon23404 .MainImgSlick').leadSlick('slickGoTo', parseInt(index))
            }, 150)

        })

        $('.siteblocks-VkpUAKfrhFDO-20220617094502 .siteblocks-setting-operateTools .moduleWidth .confirmBtn').click(function () {
            $selector.find('.blockCon23404 .MainImgSlick').leadSlick('unslick');
            $selector.find('.blockCon23404 .leftSlick').leadSlick('unslick');
            $selector.find('.blockCon23404 .MainImgSlick').leadSlick(option1);
            $selector.find('.blockCon23404 .leftSlick').leadSlick(option2);
            // 触发resize;
            var myEvent = new Event('resize');
            window.dispatchEvent(myEvent);
            $selector.find('.blockCon23404 .MainImgSlick').leadSlick('slickGoTo', 0)
            $selector.find('.blockCon23404 .leftSlick').leadSlick('slickGoTo', 0)
        })

    }
})(window, jQuery);