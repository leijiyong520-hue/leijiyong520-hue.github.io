(function (window, $, undefined) {
    var _block_namespaces_ = window._block_namespaces_ || (window._block_namespaces_ = {});
    var name = "style1";
    var style1 = _block_namespaces_[name] || (_block_namespaces_[name] = {});
    $.extend(style1, {
        "init": init
    })

    function init(nodeObj) {
        if (!!!nodeObj) {
            return;
        }
        var $selector = $('div[data-settingid=' + nodeObj.settingId + ']');

        // 根据有无下级导航插入箭头
        var timer = setInterval(function () {
            if ($('.videoTypeOne .slight-submenu-button').length > 0) {
                clearInterval(timer);
                var length = $('.on').length;
                if (length > 1) {
                    for (var i = 0; i < length; i++) {
                        if (i != length - 1) {
                            $('.artLi.on').eq(0).removeClass('on');
                        }
                    }
                }
                $('.videoTypeOne .slight-submenu-button').each(function () {
                    $(this).addClass('submenu_1');
                    $(this).append('<svg class="block-icongengduo" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="//www.w3.org/2000/svg"><rect width="12" height="12" fill="white"/><path d="M3.66102 11C3.47299 11 3.34764 10.9373 3.22228 10.812C2.97157 10.5613 3.03425 10.1852 3.28496 9.93448L7.29633 6.29917C7.42169 6.17382 7.48436 6.04846 7.48436 5.92311C7.48436 5.79775 7.42169 5.6724 7.29633 5.54704L3.22228 2.09977C2.97157 1.84906 2.90889 1.47299 3.1596 1.22228C3.41031 0.971569 3.78638 0.908892 4.03709 1.1596L8.04846 4.60688C8.42453 4.92026 8.67524 5.42169 8.67524 5.92311C8.67524 6.42453 8.48721 6.86327 8.11114 7.23934L4.09977 10.8746C3.97441 10.9373 3.78638 11 3.66102 11V11Z" fill="#666666" fill-opacity="0.5"/></svg>');
                })
            }
        })

        $('.videoTypeOne').parents('.sitewidget-bd').prev('.sitewidget-hd').find('.click').click(function () {
            $(this).parent('.sitewidget-hd').next('.sitewidget-bd').find('>ul').toggle();
            $(this).toggleClass('active');
        })

        // 当不存在箭头时，给一个间距
        var times = setInterval(function () {
            if ($('.videoTypeOne .slight-submenu-button').length > 0) {
                clearInterval(times);
                $('.videoTypeOne.artLi').each(function () {

                    // 处理阿拉伯问题
                    if ($('.arabic-exclusive').length != 0) {
                        if ($(this).find('.slight-submenu-button').length == 0) {
                            $(this).find('a').css('padding-right', '23px');
                        } else {
                            $(this).find('a').css('padding-right', '6px');
                        }
                    } else {
                        if ($(this).find('.slight-submenu-button').length == 0) {
                            $(this).find('a').css('padding-left', '23px');
                        } else {
                            $(this).find('a').css('padding-left', '6px');
                        }
                    }
                })
            }
        })

        // 二级与三级导航出现提示线
        $(".videoTypeOne.artLi a").hover(function () {
            if ($(this).next('.submenu_1').length == 0 && $(this).siblings('ul').length == 0) {
                $(this).find('.line').height(parseInt($(this).css('font-size')));
                if (!$(this).parent().hasClass('on') && $(this).next('.slight-submenu-button').length == 0) {
                    $(this).find('.line').show();
                }
                $(this).find('.line').css('backgroundColor', $(this).css('color'));
            }
            // $(this).siblings('.submenu_1').find('svg path').css('fill',$(this).css('color'));
        }, function () {
            if (!$(this).parent().hasClass('on')) {
                $(this).find('.line').hide();
            }
            // $(this).siblings('.submenu_1').find('svg path').css('fill','');
        })

        // 设置当前选中项的线条颜色
        setTimeout(function () {
            $('.videoTypeOne.artLi.on').each(function () {
                var height = parseInt($(this).css('font-size'));
                var color = $(this).find('a').css('color')
                if ($(this).find('a').siblings('.slight-submenu-button').length == 0) {
                    $(this).find('a .line').css({
                        'height': height,
                        'display': 'block',
                        'backgroundColor': color
                    })
                }
            })
        })
    }
})(window, jQuery);