(function(window, $, undefined) {
    var _block_namespaces_ = window._block_namespaces_ || (window._block_namespaces_ = {});
    var name = "block81291";
    var block81291 = _block_namespaces_[name] || (_block_namespaces_[name] = {});
    $.extend(block81291, {
        "init": init
    })

    function init(nodeObj) {
        if (!!!nodeObj) {
            return;
        }
        var $selector = $('div[data-settingid=' + nodeObj.settingId + ']');
        // 后续代码


        $selector.find(".pageWrapper").eq(0).siblings(".pageWrapper").find(".pageCont").hide();
        $selector.find(".pageWrapper").eq(0).find(".icon").addClass("pageActive");
        $selector.find(".titleBox").addClass("titleActive");
        $selector.find(".pageBox").addClass("titleActive");
        //初始化箭头方向
        $selector.find(".pageWrapper").each(function(e) {
            if ($selector.find(".pageWrapper").eq(e).find(".icon").hasClass("pageActive")) {
                $selector.find(".pageWrapper").eq(e).find(".icon").css("transform", "rotate(90deg)");

            } else {
                $selector.find(".pageWrapper").eq(e).find(".icon").css("transform", "rotate(0deg)");

            }
        });
        move();
        //页签点击出现和隐藏
        $selector.find(".pageWrapper").each(function(e) {
            $selector.find(".pageWrapper").eq(e).find(".pageTitle").click(function() {
                if ($selector.find(".pageWrapper").eq(e).find(".pageCont").is(":hidden")) {
                    $selector.find(".pageWrapper").eq(e).find(".pageCont").slideDown(300);
                    $selector.find(".pageWrapper").eq(e).find(".icon").addClass("pageActive");
                    $selector.find(".pageWrapper").eq(e).find(".icon").css("transform", "rotate(-90deg)");
                    $selector.find(".titleBox").addClass("titleActive");
                    $selector.find(".pageBox").addClass("titleActive");
                    $selector.find(".pageWrapper").eq(e).siblings(".pageWrapper").find(".pageCont").slideUp(300);
                    $selector.find(".pageWrapper").eq(e).siblings(".pageWrapper").find(".icon").removeClass("pageActive");
                    $selector.find(".pageWrapper").eq(e).siblings(".pageWrapper").find(".icon").css("transform", "rotate(0deg)")
                    move();
                } else {
                    $selector.find(".pageWrapper").eq(e).find(".pageCont").slideUp(300);
                    $selector.find(".pageWrapper").eq(e).find(".icon").removeClass("pageActive");
                    $selector.find(".pageWrapper").eq(e).find(".icon").css("transform", "rotate(90deg)");
                    move();
                    $selector.find(".titleBox").removeClass("titleActive");
                    $selector.find(".pageBox").removeClass("titleActive");
                }

            })
            //点击箭头按钮页签出现隐藏
            $selector.find(".pageWrapper").eq(e).find(".icon").click(function() {
                if ($selector.find(".pageWrapper").eq(e).find(".pageCont").is(":hidden")) {
                    $selector.find(".pageWrapper").eq(e).find(".pageCont").slideDown(300);
                    $selector.find(".pageWrapper").eq(e).find(".icon").addClass("pageActive");
                    $selector.find(".pageWrapper").eq(e).find(".icon").css("transform", "rotate(-90deg)");
                    $selector.find(".titleBox").addClass("titleActive");
                    $selector.find(".pageBox").addClass("titleActive");
                    $selector.find(".pageWrapper").eq(e).siblings(".pageWrapper").find(".pageCont").slideUp(300);
                    $selector.find(".pageWrapper").eq(e).siblings(".pageWrapper").find(".icon").removeClass("pageActive");
                    $selector.find(".pageWrapper").eq(e).siblings(".pageWrapper").find(".icon").css("transform", "rotate(0deg)")
                    move();
                } else {
                    $selector.find(".pageWrapper").eq(e).find(".pageCont").slideUp(300);
                    $selector.find(".pageWrapper").eq(e).find(".icon").removeClass("pageActive");
                    $selector.find(".pageWrapper").eq(e).find(".icon").css("transform", "rotate(90deg)");
                    move();
                    $selector.find(".titleBox").removeClass("titleActive");
                    $selector.find(".pageBox").removeClass("titleActive");
                }

            })
        })
        //鼠标悬浮箭头方向判断
        function move() {
            $selector.find(".pageWrapper").each(function(e) {
                if ($selector.find(".pageWrapper").eq(e).find(".icon").hasClass("pageActive")) {

                    $selector.find(".pageWrapper").eq(e).find(".pageTitle").mouseover(function() {
                        $selector.find(".pageWrapper").eq(e).find(".icon").css("transform", "rotate(-90deg)");
                    })
                    $selector.find(".pageWrapper").eq(e).find(".pageTitle").mouseout(function() {
                        $selector.find(".pageWrapper").eq(e).find(".icon").css("transform", "rotate(90deg)");
                    })
                } else {

                    $selector.find(".pageWrapper").eq(e).find(".pageTitle").mouseover(function() {
                        $selector.find(".pageWrapper").eq(e).find(".icon").css("transform", "rotate(90deg)");
                    })
                    $selector.find(".pageWrapper").eq(e).find(".pageTitle").mouseout(function() {
                        $selector.find(".pageWrapper").eq(e).find(".icon").css("transform", "rotate(0deg)");
                    })
                }
                //悬浮按钮箭头方向
                if ($selector.find(".pageWrapper").eq(e).find(".icon").hasClass("pageActive")) {

                    $selector.find(".pageWrapper").eq(e).find(".icon").mouseover(function() {
                        $selector.find(".pageWrapper").eq(e).find(".icon").css("transform", "rotate(-90deg)");
                    })
                    $selector.find(".pageWrapper").eq(e).find(".icon").mouseout(function() {
                        $selector.find(".pageWrapper").eq(e).find(".icon").css("transform", "rotate(90deg)");
                    })
                } else {

                    $selector.find(".pageWrapper").eq(e).find(".icon").mouseover(function() {
                        $selector.find(".pageWrapper").eq(e).find(".icon").css("transform", "rotate(90deg)");
                    })
                    $selector.find(".pageWrapper").eq(e).find(".icon").mouseout(function() {
                        $selector.find(".pageWrapper").eq(e).find(".icon").css("transform", "rotate(0deg)");
                    })
                }
            });
        }


    }
})(window, jQuery);