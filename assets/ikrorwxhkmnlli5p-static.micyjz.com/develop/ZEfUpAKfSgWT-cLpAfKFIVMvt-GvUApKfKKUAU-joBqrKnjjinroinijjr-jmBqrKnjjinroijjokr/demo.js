(function(window, $, undefined) {
    var _block_namespaces_ = window._block_namespaces_ || (window._block_namespaces_ = {});
    var name = "block8129";
    var block8129 = _block_namespaces_[name] || (_block_namespaces_[name] = {});
    $.extend(block8129, {
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
        $selector.find('style[styleDefault-block]').remove();//初始化移除默认样式
        // 后续代码
        
        $selector.find(".imgWrapper").leadSlick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            infinite: true,
            arrows: false,
            responsive: [{
                breakpoint: 899,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    variableWidth:true,
                },
                 breakpoint: 569,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    variableWidth:false,
                },

            }]
        });

        var imgLength = $selector.find('.imgWrapper .imgTile').length;
        if(imgLength == 1){
            $selector.find('.imgWrapper .slick-dots').css({
                'opacity': '0',
                'pointer-events': 'none'
            });
        } else {
            $selector.find('.imgWrapper .slick-dots').css({
                'opacity': '1',
                'pointer-events': 'auto'
            });
        }

        $(window).resize(function() {
            setTimeout(function() {
                $selector.find(".imgWrapper").leadSlick('setPosition');
                // 重新检查图片数量并设置轮播点透明度
                var imgLengthResize = $selector.find('.imgWrapper .imgTile').length;
                if(imgLengthResize == 1){
                    $selector.find('.imgWrapper .slick-dots').css({
                        'opacity': '0',
                        'pointer-events': 'none'
                    });
                } else {
                    $selector.find('.imgWrapper .slick-dots').css({
                        'opacity': '1',
                        'pointer-events': 'auto'
                    });
                }
            },100)
        })
    }
})(window, jQuery);