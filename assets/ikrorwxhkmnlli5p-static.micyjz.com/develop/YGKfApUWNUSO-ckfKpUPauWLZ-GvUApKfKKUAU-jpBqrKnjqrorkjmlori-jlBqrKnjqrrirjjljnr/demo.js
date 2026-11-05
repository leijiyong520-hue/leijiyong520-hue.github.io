(function (window, $, undefined) {
    var _block_namespaces_ = window._block_namespaces_ || (window._block_namespaces_ = {});
    var name = "video_pic_swiper_default";
    var video_pic_swiper_default = _block_namespaces_[name] || (_block_namespaces_[name] = {});
    var time = null;
    var waitDeal = 3500;//默认等待秒数
    $.extend(video_pic_swiper_default, {
      "init": init
    })
    function init(nodeObj){
        if (!!!nodeObj) {
            return;
        }
        var $selector = $('div[data-settingid=' + nodeObj.settingId + ']');
        $selector.find('style[styleDefault-block]').remove();//初始化移除默认样式
          function replaceAttr($selector, tags = []) {
                if (!tags.length) return;
                try {
                tags.forEach(function (item) {
                    $selector.find(item.tag).each(function () {
                    var _this = $(this);
                    item.attrs.forEach(function (attr) {
                        var smallimage = _this.attr(attr);
                        if (smallimage && smallimage.length) {
                        smallimage = smallimage.replace(/\-[0-9]+\-[0-9]+/g, "");
                        _this.attr(attr, smallimage);
                        }
                    });
                    });
                });
                } catch (e) {
                console.log(e);
                }
        }
        //后续代码;
        onloadHack(function(){
             // 例子
                var replaceTags = [
                    {
                    tag: "img",
                    attrs: ["src"],
                    },
                    {
                        tag: "source",
                        attrs: ['srcset']
                    }
                ];
              replaceAttr($selector, replaceTags);
             $selector.find('.vBanner-item .videoSrc').each(function(index,item){
                var videoSrc = $(item).attr('data-src');
                $(item).parent().find("video source").attr("src",videoSrc);
        
            });
            $selector.find('.vBanner-item picture img').each(function(index,item){
                var pcImgSrc =  $(item).attr('data-src');
                $(item).attr("src",pcImgSrc);
            });
            $selector.find('.vBanner-item picture source').each(function(index,item){
                 var mbImgSrc =  $(item).attr('data-srcset');
                 $(item).attr("srcset",mbImgSrc);
            });
            $selector.find('.vertical-center-slick-9844').slick({
                dots: true,
                vertical: false,
                arrows:false,
                // adaptiveHeight:true,
                fade:true,
                // appendDots:$('.custome-dots'),
                autoplay:false,
                autoplaySpeed: 4000,
                lazyLoad:true,
                // centerMode: true,
            })
            time = null;
            clearTimeout(time);
            if(isVideoIem(0).isVideo){
                // 初始化 如果第一项是视频，就进行自动播放
                ctrlVideo({
                    element:'my-9844-video-0',
                })
            }else{//后一项为非视频，则等待3秒后跳转下一页
                time = setTimeout(function(){
                    $selector.find('.vertical-center-slick-9844').slick('slickNext');
                    clearTimeout(time)
                },waitDeal)
            }

        })
        $selector.find('.vertical-center-slick-9844').on('init', function(slick){
            setTimeout(function(){
                $selector.find(".iframeAuto").hide();
            },500)
            
        });
        
        $selector.find('.vertical-center-slick-9844').on('beforeChange', function(event, slick, currentSlide, nextSlide){
            clearTimeout(time);
            time = null;
            if(isVideoIem(currentSlide).isVideo){
                //当前项如果是视频 暂停
                ctrlVideo({
                    element:isVideoIem(currentSlide).videoId,
                    isStop:true
                })
            }else{
                time = setTimeout(function(){
                    $selector.find('.vertical-center-slick-9844').slick('slickNext');
                    clearTimeout(time)
                },waitDeal)
            }
            if(isVideoIem(nextSlide).isVideo){
                //后一项如果是视频 播放
                ctrlVideo({
                    element:isVideoIem(nextSlide).videoId
                })
                if(time){
                    clearTimeout(time);
                }
            }
            else{
                time = setTimeout(function(){
                    $selector.find('.vertical-center-slick-9844').slick('slickNext');
                    time = null;
                    clearTimeout(time);
                },waitDeal)
            }
        });
        
        if(checkIsWeixin()){

            var thisIndex = $selector.find('.vertical-center-slick-9844 .slick-current').attr('data-index');


            if (checkIsWeixin()) {
                var thisIndex = $selector.find('.vertical-center-slick-9844 .slick-current').attr('data-index');

                if (isVideoIem(thisIndex).isVideo) {
                    if (checkIsWeixin()) {
                        var video = document.getElementById('video-element'); // 替换为您的视频元素ID
                        if (video) {
                            video.play(); // 在微信浏览器中手动触发播放
                        } else {
                        }
                    } else {
                        setTimeout(function() {
                            $selector.find('.vertical-center-slick-9844').slick('slickNext');
                        }, 10000);
                    }
                }
            }
            
        }

        // $selector.find('.vBanner-item').each(function() {
        //     var that = $(this);
        //     that.find('.vbabber-cover').click(function() {
        //         that.find('.vjs-big-play-button').trigger('click');
        //     })
        // })
    }
    //判断当前项是否是视频，并返回视频元素的id
    function isVideoIem(index){
        return {
            isVideo:Boolean($('.block23084 .vertical-center-slick-9844 .vBanner-item[data-index='+index+']').find('.vBanner-video-default').length),
            videoId:$('.block23084 .vertical-center-slick-9844 .vBanner-item[data-index='+index+']').find('video').attr('id')
        }
    }
    //是否暂停
    function ctrlVideo(options){
        if(!options.element) return;
        var myPlayer = null;
        if(window.navigator.userAgent.toLowerCase().indexOf('micromessenger') == -1){
                myPlayer = videojs(options.element,{
                    // fluid:true,
                    autoplay:true,
                    // loop:true,
                    controls:false,
                    preload:false
                });
        }else{
           myPlayer = videojs(options.element,{
                // fluid:true,
                autoplay:true,
                // loop:true,
                controls:true,
                preload:false
            });
            $('.block23084 .vertical-center-slick-9844 .vBanner-item .vBanner-video-default .video-js').css('z-index','1000')
        }
        setTimeout(function(){
            $('.block23084 .vertical-center-slick-9844  .photoImg').hide();
        },1000)
        var isM3u8Video = $('#'+options.element).find('source').attr('src').indexOf('mediaType=m3u8') > -1?true:false;
        if(options.isStop){
            myPlayer.pause();
        }else{
            if(isM3u8Video){
                try{
                    myPlayer.play()
                }catch(e){
                    myPlayer.load()
                }
                
            }else{
                try{
                    myPlayer.load().then(function(e){
                        
                    }).catch(function(e){
                    })
                }catch(e){
                    myPlayer.play()
                }
            }
            
        }
        
        myPlayer.on('ended',function(){
            $('.block23084 .vertical-center-slick-9844').slick('slickNext')
            if ($(".vBanner-item").length === 1){
                myPlayer.play()
            }
        })
        // 播放失败处理
        myPlayer.on('error', function (e) {
               let videJsDom=$(e.target);
               let coverImg=videJsDom.find('video').data('cover-img');
               videJsDom.find('.vjs-modal-dialog-content').css('background-image','url("'+coverImg+'")')
           });
    }
    function checkIsWeixin(){
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            return true;
        } else {
            return false;
        }
    }
    //js加载完加载
    
    



})(window, jQuery);