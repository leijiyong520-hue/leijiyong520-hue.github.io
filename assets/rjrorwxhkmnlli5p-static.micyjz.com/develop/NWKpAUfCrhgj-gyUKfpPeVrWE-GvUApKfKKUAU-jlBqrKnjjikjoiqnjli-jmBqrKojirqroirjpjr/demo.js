(function(window, $, undefined) {
    var _block_namespaces_ = window._block_namespaces_ || (window._block_namespaces_ = {});
    var name = "block22214";
    var block22214 = _block_namespaces_[name] || (_block_namespaces_[name] = {});
    $.extend(block22214, {
        "init": init
    })

    function init(nodeObj) {
        if (!!!nodeObj) {
            return;
        }

        var $selector = $('div[data-settingid=' + nodeObj.settingId + ']');

        // 计算当前图片数量
        var $slides = $selector.find('.leadong22214 .swiper-container .swiper-wrapper .swiper-slide');
        var totalSlides = $slides.length;

        // Swiper 配置（保持原有逻辑，只增加防止溢出隐藏的相关配置）
        var swiper = new Swiper22214(
            'div[data-settingid=' + nodeObj.settingId + ']' + ' .leadong22214 .swiper-container',
            {
                // 滚动条
                scrollbar: '.swiper-scrollbar',
                draggable: true,

                // 基础配置
                slidesPerView: 6,
                autoplay: 1000,
                speed: 400,

                // 关键配置：避免因“溢出检测”导致滚动条被隐藏
                watchOverflow: false,      // 即使内容未溢出也不要自动禁用
                observer: true,            // 监听自身变化
                observeParents: true,      // 监听父元素变化

                breakpoints: {
                    2100: {
                        slidesPerView: 5
                    },
                    1701: {
                        slidesPerView: 4
                    },
                    1120: {
                        slidesPerView: 3
                    },
                    510: {
                        slidesPerView: 1
                    }
                }
            }
        );

        // 简单防抖函数
        function debounce(func, wait) {
            var timeout;
            return function () {
                var context = this;
                var args = arguments;
                clearTimeout(timeout);
                timeout = setTimeout(function () {
                    func.apply(context, args);
                }, wait);
            };
        }

        // 窗口尺寸变化时，强制更新 swiper，避免切端后滚动条状态异常
        var handleResize = debounce(function () {
            if (swiper && typeof swiper.update === 'function') {
                swiper.update();
            }
        }, 300);

        $(window).on('resize', handleResize);
    }
})(window, jQuery);