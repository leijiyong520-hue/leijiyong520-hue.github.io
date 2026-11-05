(function (window, $, undefined) {
    var _block_namespaces_ = window._block_namespaces_ || (window._block_namespaces_ = {});
    var name = "swiperPhotoImg29074_style1";
    var swiperPhotoImg29074_style1 = _block_namespaces_[name] || (_block_namespaces_[name] = {});
    $.extend(swiperPhotoImg29074_style1, {
        "init": init
    })

    function init(nodeObj) {
        
        if (!!!nodeObj) {
            return;
        }
        var $selector = $(nodeObj.selectorUuid);
        var nodeId = nodeObj.nodeId;

        function videoFun() {
            console.log('213123')
            var photoBox = $selector.find(".prodListImg_box");
            // 播放按钮
            const videoBtn = $selector.find(".playVideo")
            // 内链标签
            const innerLinkEl = $selector.find(".innerLink")
            // 内链播放
            const innerPlayEl = innerLinkEl.find("video")
            // 外链标签
            const waiLinkEl = $selector.find(".waiLink")
            // 内链播放
            const waiLinkPlayEl = waiLinkEl.find("iframe")
            // 播放方式
            const thumbsVideoPlayWay = 'dialog'
            // 默认容器
            var videoContainer = {
                container: innerLinkEl,
                playEl: innerPlayEl
            }
            // 关闭按钮
            const closeVideoPlay = $selector.find(".closeVideoPayl")
            const video_container_box = $selector.find(".video_container_box")
            var url = '/phoenix/admin/video/purl';

            /**
             * 检测图片是否有效（能打开）
             */
            function checkImgExists(imgurl) {
                return new Promise(function(resolve, reject) {
                    var ImgObj = new Image()
                    ImgObj.src = imgurl
                    ImgObj.onload = function(res) {
                        resolve(res)
                    }
                    ImgObj.onerror = function(err) {
                        reject(err)
                    }
                })
            }
            /**
             * 获取内链mp4缩略图
             */
            function getvideoMp4Thumbs(mp4Link) {
                return mp4Link + "?vframe/jpg/offset/1"
            }

            function getInnerThumb(urlLink) {
                if(!urlLink) return;
                const _urlLink = urlLink.toLocaleLowerCase();
                if (_urlLink.indexOf('.mp4') != -1) {
                    return getvideoMp4Thumbs(urlLink)
                }
            }
            /**
             * 获取youtube缩略图
             */
            function getvideoYoutobeThumbs(mp4Link) {
                const matchList = mp4Link.match(/live\/(.*)\?/);
                if(matchList && matchList[1]){
                    return `//i.ytimg.com/vi/${matchList[1]}/maxresdefault.jpg`
                }
                const matchList2 = mp4Link.match(/watch.*=(.*)/)
                if(matchList2 && matchList2[1]){
                    return `//i.ytimg.com/vi/${matchList2[1]}/maxresdefault.jpg`
                }
            }

            function getWaiThumb(urlLink){
                if(!urlLink) return;
                const isYoutube = urlLink.indexOf('youtube') != -1;
                if(isYoutube){
                    return getvideoYoutobeThumbs(urlLink);
                }
            }

            function playVideoIframe() {
                videoContainer.container.removeClass('hide');

                var html = `
                <div class="lead-preview-box lead-preview-video-box">
                    <div class="lead-preview-close">
                    <svg class="lead-preview-icon" xmlns="//www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="#ffffff" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path></svg>
                    </div>
                    <div class="lead-preview-bx-img prodImg">
                    ${video_container_box.html()}
                    </div>
                </div>
                `;
                document.body.insertAdjacentHTML('beforeend', html);
                var orginSrc = videoContainer.playEl.attr('data-src');
                var className = videoContainer.playEl.prop('tagName').toLowerCase()
                 if (orginSrc && !$('.lead-preview-video-box ' + className).attr('src')) {
                    $('.lead-preview-video-box ' + className).attr('src', orginSrc);
                }


                // $('.lead-preview-video-box .innerLink').removeClass('hide')
                $('.lead-preview-close').on('click', function() {
                    // $('.lead-preview-box video')[0].pause()
                    $('.lead-preview-box').remove();
                })
            }



            /**
             * 设置视频缩略图
             */
            function setThumbFun(thumbImg) {
                if (!thumbImg) return;
                console.log('视频的缩略图链接',thumbImg);

                checkImgExists(thumbImg).then(()=>{
                    const $thumbEl = $selector.find(".video-cover-image");
                    $thumbEl.attr("src",thumbImg);
                }).catch(()=>{
                    //fail callback
                    console.log('无效链接或者当前网络无法打开',thumbImg)
                })
            }
            
            // 开启视频播放
            videoBtn.unbind("click").bind("click", function () {
                var orginSrc = videoContainer.playEl.attr('data-src');
                if(!orginSrc) {
                    $.ajax({
                        url: url,
                        type: 'get',
                        data: {
                            "pid": nodeObj.encodeId
                        },
                        success: function (xhr) {
                            try {
                                // 缩略图
                                let thumbImg = '';
                                const srcVideoObj = JSON.parse(xhr);
                                if (srcVideoObj) {
                                    if (srcVideoObj.mp4Url) {
                                        videoContainer.container = innerLinkEl;
                                        videoContainer.playEl = innerPlayEl;
                                        innerPlayEl.attr('data-src', srcVideoObj.mp4Url);

                                        thumbImg = getInnerThumb(srcVideoObj.mp4Url);
                                    } else if (srcVideoObj.vedioUrl) {
                                        // 是否外链
                                        var isWaiLink = srcVideoObj.thirdLink && srcVideoObj.thirdLink === "1";
                                        if (isWaiLink) {
                                            if(srcVideoObj.vedioUrl.includes('.mp4')) {
                                                videoContainer.playEl = innerPlayEl
                                                videoContainer.container = innerLinkEl
                                                thumbImg = getInnerThumb(srcVideoObj.vedioUrl);
                                            } else {
                                                videoContainer.container = waiLinkEl;
                                                videoContainer.playEl = waiLinkPlayEl;
                                                thumbImg = getWaiThumb(srcVideoObj.vedioUrl);
                                            }
                                            
                                            videoContainer.playEl.attr('data-src', srcVideoObj.vedioUrl);


                                        } else {
                                            videoContainer.container = innerLinkEl;
                                            videoContainer.playEl = innerPlayEl;
                                            innerPlayEl.attr('data-src', srcVideoObj.vedioUrl);

                                            thumbImg = getInnerThumb(srcVideoObj.vedioUrl);
                                        }
                                    }
                                    setThumbFun(thumbImg);
                                    playVideoIframe()
                                }
                            } catch (e) {
                                console.log(e);
                            }
                        }
                    });
                } else {
                    playVideoIframe()
                }

                
            })
            // 关闭视频播放
            closeVideoPlay.unbind("click").bind("click", function () {
                innerLinkEl.addClass('hide');
                waiLinkEl.addClass('hide');
                closeVideoPlay.addClass('hide');
                video_container_box.addClass('hide');
                photoBox.removeClass('playVideoMode');
            })
        }
        videoFun();        
    }

    


})(window, jQuery);