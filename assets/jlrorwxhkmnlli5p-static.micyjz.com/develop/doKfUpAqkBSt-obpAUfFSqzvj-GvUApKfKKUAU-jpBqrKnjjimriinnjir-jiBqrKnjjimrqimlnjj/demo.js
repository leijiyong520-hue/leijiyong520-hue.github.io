(function(window, $, undefined) {
    var _block_namespaces_ = window._block_namespaces_ || (window._block_namespaces_ = {});
    var name = "blockCon15184";
    var blockCon15184 = _block_namespaces_[name] || (_block_namespaces_[name] = {});
    $.extend(blockCon15184, {
        "init": init
    });

    function init(nodeObj) {
        if (!!!nodeObj)
            return;
        var $selector = $("div[data-settingid=" + nodeObj.settingId + "]");
        $selector.find('style[styleDefault-block]').remove();
        
        var carouselLineLength = $selector.find(".description-item").length;

        function imgListInit() {
            for (var i = 0; i < 4; i++)
                $selector.find(".img-tiem").eq(i).attr("data-pos", i + 1);
            var activityIndex = $selector.find(".img-tiem[data-pos='2']").index();
            $selector.find(".description-item").eq(activityIndex).addClass("activity");
        }

        $selector.find('.blockCon15184 .img-ul-box .img-container').each(function() {
            if ($(this).find('.banner-name').text().trim() == '' && $(this).find('.banner-docs').text().trim() == '') {
                $(this).css('padding', '0');
                $(this).find('.banner-name').css('margin-bottom', '0');
            }
        })

        function imgNext(that) {
            var imgArr = [];
            $.each($selector.find(".img-tiem"), function() {
                imgArr.push($(this).attr("data-pos"))
            });
            imgArr.push(imgArr[0]);
            imgArr.splice(0, 1);
            $.each($selector.find(".img-tiem"), function(index) {
                $(this).attr("data-pos", imgArr[index])
            });
            activityIndex = $selector.find(".img-tiem[data-pos='2']").index();
            console.log(activityIndex);
            if (that)
                that.attr("disabled", true);
            setTimeout(function() {
                $selector.find(".next").removeAttr("disabled")
            }, 1E3)
        }

        function imgPrev(that) {
            var imgArr = [];
            $.each($selector.find(".img-tiem"), function() {
                imgArr.push($(this).attr("data-pos"))
            });
            imgArr.splice(0, 0, imgArr[imgArr.length - 1]);
            imgArr.splice(imgArr.length - 1, 1);
            $.each($selector.find(".img-tiem"), function(index) {
                $(this).attr("data-pos", imgArr[index])
            });
            activityIndex = $selector.find(".img-tiem[data-pos='2']").index();
            that.attr("disabled", true);
            setTimeout(function() {
                $selector.find(".prev").removeAttr("disabled")
            }, 1E3)
        }

        function dosMove(direction) {
            $selector.find(".description-item").removeClass("activity");
            $selector.find(".description-item").eq(activityIndex).addClass("activity");
        }
        imgListInit();
        $selector.find(".next").on("click", function() {
            imgNext($(this));
            dosMove($(this))
        });
        $selector.find(".prev").on("click", function() {
            imgPrev($(this));
            dosMove($(this))
        });

        $selector.find(".description-item").on("click", function() {
            var dosIndex = $(this).data("index");
            if (!$(this).hasClass("activity")) {
                $selector.find(".img-tiem").attr("data-pos", 4);
                $selector.find(".img-tiem").eq(dosIndex).attr("data-pos", 2);
                if (dosIndex == 0) {
                    $selector.find(".img-tiem").eq(carouselLineLength - 1).attr("data-pos", 1);
                    $selector.find(".img-tiem").eq(dosIndex + 1).attr("data-pos", 3)
                } else if (dosIndex == carouselLineLength - 1) {
                    $selector.find(".img-tiem").eq(dosIndex - 1).attr("data-pos", 1);
                    $selector.find(".img-tiem").eq(0).attr("data-pos", 3)
                } else {
                    $selector.find(".img-tiem").eq(dosIndex - 1).attr("data-pos", 1);
                    $selector.find(".img-tiem").eq(dosIndex + 1).attr("data-pos", 3)
                }
                $selector.find(".description-item").removeClass("activity");
                $selector.find(".description-item").eq(dosIndex).addClass("activity");
            }
        })
        $selector.find('.img-tiem').each(function() {
            if ($(this).find('.banner-name').length == 0 && $(this).find('.banner-docs').length == 0) {
                $(this).find('.img-container').hide();
            }
        })
    }
})(window, jQuery);