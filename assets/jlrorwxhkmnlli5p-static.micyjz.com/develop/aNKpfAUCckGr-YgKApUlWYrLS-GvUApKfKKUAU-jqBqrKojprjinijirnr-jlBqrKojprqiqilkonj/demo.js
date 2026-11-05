(function (window, $, undefined) {
    var _block_namespaces_ = window._block_namespaces_ || (window._block_namespaces_ = {});
    var name = "blockCon27562";
    var blockCon27562 = _block_namespaces_[name] || (_block_namespaces_[name] = {});
    $.extend(blockCon27562, {
        "init": init
    });

    function getUtils() {
        return window.blockBannerUtils;
    }

    async function bootstrap($container, props) {
        var U = getUtils();
        if (!U) {
            console.error('blockBannerUtils 未定义，请先加载公共插件');
            return;
        }
        U.normalizeSlides($container);
        var blockBannerFunc;
        try {
            blockBannerFunc = await U.waitFor('blockBannerFunc', 5000);
        } catch (err) {
            console.error(err.message);
            return;
        }
        blockBannerFunc(props, $container[0]);
    }

    async function initWithProps(nodeObj, props) {
        var U = getUtils();
        if (!U) return;
        // 前台 #siteblocks-setting-wrap-{set} 缺失时，共享 resolveContainer 会回退 $(document)
        // 命中同页第一个 .vertical-center-slick-XXXX —— 多实例/同类名冲突会初始化到错误容器。
        // 这里按 data-settingid 精确定位当前实例容器，拿不到再走共享兜底。
        var $container = null;
        if (nodeObj && nodeObj.settingId) {
            var $wrap = $('div[data-settingid=' + nodeObj.settingId + ']');
            var cls = nodeObj.classer || 'vertical-center-slick-8000';
            $container = $wrap.find('.' + cls);
        }
        if (!$container || !$container.length) {
            $container = U.resolveContainer(nodeObj);
        }
        if (!$container || !$container.length) return;
        await bootstrap($container, props);
    }

    /**
     * 场景一：自动切换 + 视频自动播放
     * 图片按 imageDuration 自动轮播，视频切入后自动播放，
     * 播放结束自动切到下一帧。
     */
    function initAutoAuto(nodeObj, len) {
        return initWithProps(nodeObj, {
            mode: 'auto',
            imageDuration: 3500,
            videoPlayTrigger: 'auto',
            loop: true,
            arrows: false,
            dots: len > 1 ? true : false,
            phoneSettings: {
                arrows: false
            }
        });
    }

    /**
     * 场景二：自动切换 + 视频悬浮播放
     * 图片按 imageDuration 自动轮播，视频切入后展示封面，
     * 鼠标悬浮时播放、移开暂停。
     */
    function initAutoHover(nodeObj) {
        return initWithProps(nodeObj, {
            mode: 'auto',
            imageDuration: 3500,
            videoPlayTrigger: 'hover',
            loop: true,
            arrows: true,
            dots: true,
            phoneSettings: {
                arrows: false
            }
        });
    }

    /**
     * 场景三：手动切换 + 视频自动播放
     * 仅通过箭头/指示点手动切换，视频切入后自动播放。
     */
    function initManualAuto(nodeObj) {
        return initWithProps(nodeObj, {
            mode: 'manual',
            videoPlayTrigger: 'auto',
            loop: false,
            arrows: false,
            dots: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            fade: false,
            phoneSettings: {
                arrows: false
            }
        });
    }

    /**
     * 场景四：手动切换 + 视频点击播放
     * 仅通过箭头/指示点手动切换，视频切入后展示封面，
     * 用户点击播放按钮后才开始播放。
     */
    function initManualClick(nodeObj) {
        return initWithProps(nodeObj, {
            mode: 'manual',
            videoPlayTrigger: 'click',
            loop: true,
            arrows: false,
            dots: false,
            phoneSettings: {
                arrows: false
            }
        });
    }

    /**
     * 场景四：手动切换 + 视频悬浮播放
     * 通过箭头/指示点等手动换页；视频切入后先显示封面，
     * 鼠标悬浮在当前帧上时播放（与场景二的区别：场景二整轮自动切图）。
     */
    function initManualHover(nodeObj, len) {
        return initWithProps(nodeObj, {
            mode: 'manual',
            videoPlayTrigger: 'hover',
            loop: false,
            arrows: false,
            dots: len > 2 ? true : false,
            slidesToShow: 2,
            slidesToScroll: 1,
            fade: false,
            phoneSettings: {
                slidesToShow: 1,
                dots: len > 1 ? true : false,
            }
        });
    }

    function init(nodeObj) {
        if (!!!nodeObj) {
            return;
        }

        var $selector = $('div[data-settingid=' + nodeObj.settingId + ']');
        // 前台 collect 可能多次执行 init()，重复初始化会让 slick 内部状态错乱（同类视频区块已踩坑）。
        // 用 data 标志位防重入；编辑器(_isEditor)下不设防，保证编辑实时重渲染。
        if (!window._isEditor && $selector.data('blockCon27562-inited')) {
            return;
        }
        if (!window._isEditor) {
            $selector.data('blockCon27562-inited', true);
        }
        $selector.find('style[styleDefault-block]').remove(); // 初始化移除默认样式

        var len = $selector.find('.vBanner-item').length;
        initAutoAuto(nodeObj, len);
    }
})(window, jQuery);