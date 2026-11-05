(function(window, $, undefined) {
    var _block_namespaces_ = window._block_namespaces_ || (window._block_namespaces_ = {});
    var name = "qin18264";
    var qin18264 = _block_namespaces_[name] || (_block_namespaces_[name] = {});
    $.extend(qin18264, {
        "init": innit
    })

    function innit(nodeObj) {
        if (!!!nodeObj) {
            return;
        }

        var $selector = $('div[data-settingid=' + nodeObj.settingId + ']');
        var liItem = $selector.find('.multiple-items li');
        
        //初始化
        $('.multiple-items').on('init', function(event, slick, direction){
            if(liItem.length <= 1) {
                $selector.find('.owl-nav').hide();
                $selector.find('.slick-dots').hide();
            }
        });

        if($(window).width() < 769) {
          getMaxHeight()
        }
        
         //尺寸切换
        $(window).resize(function() {
            if($(this).width() < 769) {
                $('.multiple-items').on('breakpoint', function(event, slick, direction){
                    getMaxHeight();
                    if(liItem.length <= 1) {
                        $selector.find('.slick-dots').hide();
                    }
                });
            }
        })
        function getMaxHeight() {
            //获取最大高度
            var maxHeight = 0;
            liItem.each(function(index,item) {
                $(this).find('.banner-description').height('auto')
                if($(this).find('.banner-description').outerHeight(true) > maxHeight) {
                    maxHeight = $(this).find('.banner-description').outerHeight(true);
                }
            })
            liItem.each(function() {
                $(this).find('.banner-description').innerHeight(maxHeight)
            })
        }
        //slick初始化
        $selector.find('.multiple-items').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: $selector.find(".owl-prev"),
            nextArrow: $selector.find(".owl-next"),
            arrows: true,
            infinite: false,
            responsive: [
                {
                    breakpoint: 769,
                    settings: {
                        arrows: false,
                        dots: true
                    }
                },
                {
                    breakpoint: 450,
                    settings: {
                        arrows: false,
                        dots: true
                    }
                }
            ]
        });

    }
})(window, jQuery);