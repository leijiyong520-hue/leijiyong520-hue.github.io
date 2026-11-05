(function(window, $, undefined) {
    var _block_namespaces_ = window._block_namespaces_ || (window._block_namespaces_ = {});
    var name = "style14";
    var style14 = _block_namespaces_[name] || (_block_namespaces_[name] = {});
    $.extend(style14, {
        "init": init
    })

    function init(nodeObj) {
        if (!!!nodeObj) {
            return;
        }
        console.log("style14");
        var $selector = $('div[data-settingid=' + nodeObj.settingId + ']');
        onloadHack(function() {
            // setSubListItemClick();
            // addClassNoChid();
        });


        // 下拉
        function setSubListItemClick() {
            $("ul.submenu-default-simple .artTwo .slight-submenu-button").click(function() {
                var _hasClassName = $(this).hasClass("on");
                if (_hasClassName) {
                    $(this).next().hide();
                    $(this).removeClass("on");
                } else {
                    $(this).next().show();
                    $(this).addClass("on");
                }
            });
        }

        // 添加class
        function addClassNoChid() {
            $("ul.submenu-default-simple ul.slight-submenu-ul li").each(function() {
                var _hasUl = $(this).children("ul");
                // console.log(_hasUl);
                
                if ($(_hasUl).length > 0) {
                    console.log($(_hasUl));
                    $(this).addClass("aaaa");
                }
            })
        }

    }
})(window, jQuery);