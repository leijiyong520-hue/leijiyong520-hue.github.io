(function (window, $, undefined) {
  var phoenixSite = window.phoenixSite || (window.phoenixSite = {});
  var prodDescribe = phoenixSite.prodDescribe || (phoenixSite.prodDescribe = {});
  var _options = {};
  $.extend(prodDescribe, {
    init: function (initData) {
      $.extend(_options, initData);
      var _this = this;
      var $selector = $('.prod_des_' + initData.className);

      if (initData.cssId == '1') {
        $selector.find(' .prod_des_tabs_list .prod_describe_new_title').unbind('click').bind('click', function (e) {
          // var top1 = $(this).offset().top;
          // if ($(this).hasClass('tab_active')) {
          //   if ($(window).width() < 768) {
          //     $selector.find(' .prod_describe_new_title').removeClass('tab_active');
          //     $selector.find(' .prod_describe_new').removeClass('prod_new_active');
          //   }
          // } else {
          //   /*  点击页签跳转锚点位置 */
          //   var $target = $('#anchor');
          //   var $tabs = $('.prod_des_tabs_list');
          //   if($target.length && $tabs.length) {
          //     var offset = $tabs.outerHeight();
          //     var top = $target.offset().top - offset;
          //     $('html, body').animate({scrollTop: top}, 400)
          //   }
          //   $selector.find(' .prod_describe_new_title').removeClass('tab_active');
          //   $(this).addClass('tab_active');
          //   $selector.find(' .prod_describe_new').removeClass('prod_new_active');
          //   $selector.find(' #prod_describe_new_' + $(this).attr('id').split('_')[1]).addClass('prod_new_active');
          //   // if ($(window).width() > 768) {
          //   //   // var activeMargin = $(this).closest('.prod_describe_new_item').width() * $(this).closest('.prod_describe_new_item').index()
          //   //   var activeMargin = $(this).closest('.prod_describe_new_item').offset().left - $(this).closest('.prod_describe_new_item').parent().offset().left
          //   //   $selector.find('.prod_new_active').css('margin-left', '-' + activeMargin + 'px')
          //   // } else {
          //   //   $selector.find('.prod_new_active').css('margin-left', '0px')
          //   // }
          // }
          var top1 = $(this).offset().top;
          if ($(this).hasClass('tab_active')) {
            if ($(window).width() < 768) {
              $selector.find(' .prod_describe_new_title').removeClass('tab_active');
              $selector.find(' .prod_describe_new').removeClass('prod_new_active');
            }
          } else {
            /*  点击页签跳转锚点位置 */
            var $target = $('#anchor');
            var $tabs = $('.prod_des_tabs_list');
            if($target.length && $tabs.length) {
              var offset = $tabs.outerHeight();
              // 增加prod_describe_new_title的高度
              var titleHeight = $('.prod_describe_new_title').outerHeight() || 0;
              var top = $target.offset().top - offset - 100;
              $('html, body').animate({scrollTop: top}, 400)
            }
            $selector.find(' .prod_describe_new_title').removeClass('tab_active');
            $(this).addClass('tab_active');
            $selector.find(' .prod_describe_new').removeClass('prod_new_active');
            $selector.find(' #prod_describe_new_' + $(this).attr('id').split('_')[1]).addClass('prod_new_active');
          }
          // 移动端页签切换内容长度变化差距太大 页面会滑倒底部 滚动条处理;
          if ($(window).width() < 768){
              if((top1 - $(this).offset().top) > 50){
                $(window).scrollTop($(this).offset().top - 150);
              }
          }

          function scrollToSection(sectionEl, offset = 0) {
            if (sectionEl) {
              // 偏移量，单位为像素
              const yPosition =
                sectionEl.getBoundingClientRect().top + window.pageYOffset - offset;

              // 使用 requestAnimationFrame 确保平滑滚动
              window.requestAnimationFrame(() => {
                window.scrollTo({
                  top: yPosition,
                  behavior: "smooth",
                });
              });
            }
          }

          if ($(window).width() > 768) {
            const _scrollDomEl = $(this).parents(".prod_des_tabs_list_pc").get(0);
            if (_scrollDomEl) {
              var _topMargin = this.getBoundingClientRect().top;
              scrollToSection(_scrollDomEl, _topMargin);
            }
          }
          $selector.find(".slick-initialized").each(function(){
            try{
              $(this).slick('setPosition');
            }catch{

            }
          })
           $(window).resize()
          // $(window).resize();
        })
        _this.handleMobAndPc(initData)
        _this.handleCss2Hover(initData)
        $(window).resize(function () {
          _this.handleMobAndPc(initData)
          if (initData.cssId == '1') _this.handleCss2Hover(initData)
          if (initData.cssId == '2' || initData.cssId == '3') {
            _this.handleHoverAndScroll(initData)
          }
        })
      }

      if (initData.cssId == '2' || initData.cssId == '3') {
        _this.handleHoverAndScroll(initData)
      }

      if (initData.cssId == '3') {
        if ($(window).width() < 768) {
          if ($selector.find(' .prod_describe_new_title').length < 3) {
            var tabalign = $selector.find(' .prod_des_tabs_list_pc').data('tabalign')
            if (tabalign == '0') {
              $selector.find(' .prod_des_tabs_list').css('justify-content', 'left')
            } else if (tabalign == '1') {
              $selector.find(' .prod_des_tabs_list').css('justify-content', 'center')
            } else if (tabalign == '2') {
              $selector.find(' .prod_des_tabs_list').css('justify-content', 'right')
            }
          }
        }
      }

      setTimeout(function () {
        _this.initIframeSrc();
        _this.initProdM3u8Video();
      }, 2000)
    },
    handleMobAndPc: function (initData) {
      // var $selector = $('.prod_des_' + initData.className);
      // if ($(window).width() > 768) {
      //   $selector.length && $selector[0].style.setProperty('--content-width', $selector.width() + 'px')
      //   var percent = $selector.find('.prod_describe_new_item').length == 0 ? 100 : parseInt(100 / $selector.find('.prod_describe_new_item').length)
      //   $selector.length && $selector[0].style.setProperty('--tab-max-width', percent + '%')      
      //   // var activeMargin = $selector.find('.prod_new_active').closest('.prod_describe_new_item').width() * $selector.find('.prod_new_active').closest('.prod_describe_new_item').index()
      //   var activeMargin = $selector.find('.prod_new_active').closest('.prod_describe_new_item').offset().left - $selector.find('.prod_new_active').closest('.prod_describe_new_item').parent().offset().left
      //   $selector.find('.prod_new_active').css('margin-left', '-' + activeMargin + 'px')
      // } else {
      //   $selector.find('.prod_new_active').css('margin-left', '0px')
      // }
      var $selector = $('.prod_des_' + initData.className);
      if ($(window).width() > 768) {
        if($selector.find('.prod_des_style2_pc .prod_describe_new_content').eq(0).is(':empty')) {
          $selector.find('.prod_des_style2_mob .prod_describe_new_content').each(function (index) {
            var element = $(this);
            var targetElement = $selector.find('.prod_des_style2_pc .prod_describe_new_content').eq(index);
            // 将当前元素的 HTML 内容插入到目标元素后面
            targetElement.html(element.html());
            element.empty()
          });
        }
        $selector.find(' .prod_des_style2_pc').show()
        $selector.find(' .prod_des_style2_mob').hide()
      } else {
        if($selector.find('.prod_des_style2_mob .prod_describe_new_content').eq(0).is(':empty')) {
          $selector.find('.prod_des_style2_pc .prod_describe_new_content').each(function (index) {
            var element = $(this);
            var targetElement = $selector.find('.prod_des_style2_mob .prod_describe_new_content').eq(index);
            // 将当前元素的 HTML 内容插入到目标元素后面
            // targetElement.html(element.html());
            // 获取原始元素（假设 element 是 jQuery 对象）
            const originalElement = element[0]; // 转为原生 DOM 节点
            const clonedNode = element.cloneNode(true); // 深度克隆，包括 Shadow 树

            // 清空目标元素并追加克隆节点
            targetElement.empty().append(clonedNode);
            element.empty()
          });
        }
        
        $selector.find(' .prod_des_style2_pc').hide()
        $selector.find(' .prod_des_style2_mob').show()
      }

    },
    handleCss2Hover: function (initData) {
      var $selector = $('.prod_des_' + initData.className);
      var conWidth = $(' div[classattr=' + initData.className + ']').width()
      var offset = $selector.find(' .prod_des_tabs_list_pc').data('offset')
      var hover = $selector.find(' .prod_des_tabs_list_pc').data('hover')
      var targetTop = $selector.find(' .prod_des_tabs_list_pc').offset()?.top - offset; // 获取目标元素距离顶部的距离减去偏移量

      if (hover != '1') {
        var index = 0 // 记录当前页签索引
        $(window).scroll(function () {
          var scrollTop = $(window).scrollTop(); // 获取滚动条距离顶部的距离
          // 页签悬浮的代码在这里
          if (scrollTop > targetTop) {
            if ($(window).width() >= 768) {
              $selector.find(' .prod_describe_new_title').addClass('prod_floating');
              $selector.find(' .prod_describe_new_title').css('width',$selector.find(' .prod_describe_new_item').width() - 80 + 'px');
              $selector.find(' .detial-cont-prodescription_pc').addClass('prod_floating_mt');
            }
            // if ($(window).width() < 768) {
            //   // 响应宽度
            //   $selector.find('.prod_floating').css('min-width', 'auto')
            //   $selector.find('.prod_floating').css('width', '100%')
            // } else {
            //   $selector.find('.prod_floating').css('min-width', conWidth + 'px')
            //   $selector.find('.prod_floating').css('max-width', conWidth + 'px')
            // }
          } else {
            $selector.find(' .prod_describe_new_title').removeClass('prod_floating');
            $selector.find(' .prod_describe_new_title').css('width','auto');
            $selector.find(' .detial-cont-prodescription_pc').removeClass('prod_floating_mt');
            // $selector.find('.prod_des_tabs_list_pc').css('width', 'auto')
            // $selector.find('.prod_des_tabs_list_pc').css('min-width', 'auto')
            // $selector.find('.prod_des_tabs_list_pc').css('max-width', 'auto')
          }
        });
      }
    },
    handleHoverAndScroll: function (initData) {
      var $selector = $('.prod_des_' + initData.className);
      var conWidth = $(' div[classattr=' + initData.className + ']').width()
      var offset = 0
      var hover = $selector.find(' .prod_des_tabs_list_pc').data('hover')
      var mobhover = $selector.find(' .prod_des_tabs_list_pc').data('mobhover')
      if ($(window).width() > 768) {
        offset = $selector.find(' .prod_des_tabs_list_pc').data('offset')
      } else {
        offset = $selector.find(' .prod_des_tabs_list_pc').data('moboffset')
      }
      var targetTop = $selector.find(' .prod_des_tabs_list_pc').offset().top - offset; // 获取目标元素距离顶部的距离减去偏移量

      var maxWidth = 188;

      $selector.find('.prod_describe_new_title').each(function () {
        var element = $(this);
        var textWidth = element.find('span').width();
        if (textWidth < maxWidth) {
          element.css('min-width', textWidth + 30)
        } else {
          element.css('min-width', maxWidth)
        }
      });


      // 点击切换页签不触发滚动的事件 标志
      var scrollFlag = true

      var tabHeight = $selector.find(' .prod_des_tabs_list_pc').data('height')
      var index = 0 // 记录当前页签索引F



      $selector.find(' .prod_des_tabs_list .prod_describe_new_title').unbind('click').bind('click', function (e) {
        var _that = $(this)

        scrollFlag = false
        index = $(this).attr('id').split('_')[1]

        // +2px 防止因为微小误差 触发scroll方法后导致页签定位不准
        var scrollTop1 = $selector.find(' #prod_describe_new_' + $(this).attr('id').split('_')[1]).offset().top - offset - tabHeight + 2

        if (initData.cssId == '2') {
          // 滚动到指定位置
          $selector.find(' .prod_describe_new_title').removeClass('tab_active');
          _that.addClass('tab_active');
          $('html, body').animate({
            scrollTop: scrollTop1
          }, 400, function (e) {
            // 避免scroll事件触发导致的scrollTop的微量差距影响
            setTimeout(function () {
              scrollFlag = true
            }, 200)
          });
        } else if (initData.cssId == '3') {
          $('html, body').animate({
            scrollTop: scrollTop1
          }, 400, function (e) {
            // 滚动到指定位置
            $selector.find(' .prod_describe_new_title').removeClass('tab_active');
            _that.addClass('tab_active');
            // 避免scroll事件触发导致的scrollTop的微量差距影响
            setTimeout(function () {
              scrollFlag = true
            }, 200)
          });
        }

        if ($(window).width() < 768) {
          // 响应宽度
          $selector.find('.prod_floating').css('min-width', 'auto')
          $selector.find('.prod_floating').css('width', '100%')

          // 移动端页签滑动到指定位置
          // var offsetVal = 188 * index - 40
          // 如果是最后一个元素
          // if ($selector.find(' .prod_describe_new_title').length == Number(index) + 1) {

          // } else {
          //   $selector.find(' .prod_floating').animate({
          //     // left: '-' + offsetVal,
          //     transform:'translateX(25%)'
          //   }, 500);
          // }


        } else {
          $selector.find('.prod_floating').css('min-width', conWidth + 'px')
          $selector.find('.prod_floating').css('max-width', conWidth + 'px')
        }

        if (($(window).width() > 768 && hover != '1') || ($(window).width() < 768 && mobhover != '1')) {
          $selector.find(' .prod_des_tabs_list_pc').addClass('prod_floating');
          if ($(window).width() > 768) {
            $selector.find('.prod_floating').css('min-width', conWidth + 'px')
            $selector.find('.prod_floating').css('max-width', conWidth + 'px')
          } else {
            // $selector.find(' .prod_left_flag').addClass('prod_left');
            // $selector.find(' .prod_right_flag').addClass('prod_right');
            $selector.find('.prod_floating').css('min-width', 'auto')
            $selector.find('.prod_floating').css('width', '100%')
          }
          $selector.find(' .detial-cont-prodescription_pc').addClass('prod_floating_mt');
        }
      })



      $(window).scroll(function () {

        if (scrollFlag == true) {
          var scrollTop = $(window).scrollTop(); // 获取滚动条距离顶部的距离
          if (($(window).width() > 768 && hover != '1') || ($(window).width() < 768 && mobhover != '1')) {
            // 页签悬浮的代码在这里
            if (scrollTop > targetTop) {
              $selector.find(' .prod_des_tabs_list_pc').addClass('prod_floating');
              if ($(window).width() > 768) {
                $selector.find('.prod_floating').css('min-width', conWidth + 'px')
                $selector.find('.prod_floating').css('max-width', conWidth + 'px')
              } else {
                // $selector.find(' .prod_left_flag').addClass('prod_left');
                // $selector.find(' .prod_right_flag').addClass('prod_right');
                $selector.find('.prod_floating').css('min-width', 'auto')
                $selector.find('.prod_floating').css('width', '100%')


              }
              $selector.find(' .detial-cont-prodescription_pc').addClass('prod_floating_mt');
            } else {
              $selector.find(' .prod_des_tabs_list_pc').removeClass('prod_floating');
              $selector.find(' .detial-cont-prodescription_pc').removeClass('prod_floating_mt');
              $selector.find('.prod_des_tabs_list_pc').css('width', 'auto')
              $selector.find('.prod_des_tabs_list_pc').css('min-width', 'auto')
              $selector.find('.prod_des_tabs_list_pc').css('max-width', 'auto')
              // $selector.find(' .prod_left_flag').removeClass('prod_left');
              // $selector.find(' .prod_right_flag').removeClass('prod_right');
            }
          }

          // 随着页面滚动到对应页签内容 当前选中页签变化
          var targetTop0 = $selector.find(' #prod_describe_new_0').offset().top + $selector.find(' #prod_describe_new_0').height() - offset - tabHeight;
          var targetTop1 = $selector.find(' #prod_describe_new_1').offset().top + $selector.find(' #prod_describe_new_1').height() - offset - tabHeight;
          var targetTop2 = $selector.find(' #prod_describe_new_2').offset().top + $selector.find(' #prod_describe_new_2').height() - offset - tabHeight;
          var targetTop3 = $selector.find(' #prod_describe_new_3').offset().top + $selector.find(' #prod_describe_new_3').height() - offset - tabHeight;
          var targetTop4 = $selector.find(' #prod_describe_new_4').offset().top + $selector.find(' #prod_describe_new_4').height() - offset - tabHeight;
          if (scrollTop <= targetTop0) {
            if (!$selector.find(' .prod_describe_new_title').eq(0).hasClass('tab_active')) {
              $selector.find(' .prod_describe_new_title').removeClass('tab_active');
              $selector.find(' .prod_describe_new_title').eq(0).addClass('tab_active');
              // if ($(window).width() < 768) {
              //   // 移动端页签滑动到指定位置
              //   var offsetVal = 0
              //   $selector.find(' .prod_floating').animate({
              //     // left: '-' + offsetVal
              //     transform:'translateX(25%)',
              //   }, 500);
              // }
            }
          } else if (targetTop0 <= scrollTop && scrollTop < targetTop1) {
            if (!$selector.find(' .prod_describe_new_title').eq(1).hasClass('tab_active')) {
              $selector.find(' .prod_describe_new_title').removeClass('tab_active');
              $selector.find(' .prod_describe_new_title').eq(1).addClass('tab_active');
              if ($(window).width() < 768) {
                // 移动端页签滑动到指定位置
                // var offsetVal = 148
                // if ($selector.find(' .prod_describe_new_title').length == 1) {

                // } else {
                //   $selector.find(' .prod_floating').animate({
                //     // left: '-' + offsetVal,
                //     transform:'translateX(25%)',
                //     right: 'auto'
                //   }, 500);
                // }

              }
            }
          } else if (targetTop1 <= scrollTop && scrollTop < targetTop2) {
            if (!$selector.find(' .prod_describe_new_title').eq(2).hasClass('tab_active')) {
              $selector.find(' .prod_describe_new_title').removeClass('tab_active');
              $selector.find(' .prod_describe_new_title').eq(2).addClass('tab_active');
              if ($(window).width() < 768) {
                // 移动端页签滑动到指定位置
                // var offsetVal = 188 * 2 - 40
                // if ($selector.find(' .prod_describe_new_title').length == 2) {

                // } else {
                //   $selector.find(' .prod_floating').animate({
                //     // left: '-' + offsetVal,
                //     transform:'translateX(25%)',
                //     right: 'auto'
                //   }, 500);
                // }
              }
            }
          } else if (targetTop2 <= scrollTop && scrollTop < targetTop3) {
            if (!$selector.find(' .prod_describe_new_title').eq(3).hasClass('tab_active')) {
              $selector.find(' .prod_describe_new_title').removeClass('tab_active');
              $selector.find(' .prod_describe_new_title').eq(3).addClass('tab_active');
              if ($(window).width() < 768) {
                // 移动端页签滑动到指定位置
                // var offsetVal = 188 * 3 - 40
                // if ($selector.find(' .prod_describe_new_title').length == 3) {

                // } else {
                //   $selector.find(' .prod_floating').animate({
                //     // left: '-' + offsetVal,
                //     transform:'translateX(25%)',
                //     right: 'auto'
                //   }, 500);
                // }
              }
            }
          } else {
            if (!$selector.find(' .prod_describe_new_title').eq(4).hasClass('tab_active')) {
              $selector.find(' .prod_describe_new_title').removeClass('tab_active');
              $selector.find(' .prod_describe_new_title').eq(4).addClass('tab_active');
              if ($(window).width() < 768) {
                // 移动端页签滑动到指定位置
                // var offsetVal = 188 * 4 - 40
                // if ($selector.find(' .prod_describe_new_title').length == 4) {

                // } else {
                //   $selector.find(' .prod_floating').animate({
                //     // left: '-' + offsetVal,
                //     transform:'translateX(25%)',
                //     right: 'auto'
                //   }, 500);
                // }
              }
            }
          }

        }
      });
    },
    initIframeSrc: function () {
      $('.prod_des_' + _options.className + ' iframe').each(function (item) {
        if ($(this).attr('data-src') && !$(this).attr('src')) {
          var src = $(this).attr('data-src');
          $(this).attr('src', src);
        };
      });
    },
    initProdM3u8Video: function () {
      try {
        if ($('.prod_des_' + _options.className + ' video[data-pro-m3u8="1"]').length > 0) {
          function generateRandomString(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
              result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
          }
          $.getScript(phoenixSite.page.cdnUrl + "/static/assets/widget/script/plugins/videojs/video.min.js", function () {
            var newM3u8 = window.newM3u8 || (window.newM3u8 = {});
            $('.prod_des_' + _options.className + ' video[data-pro-m3u8="1"]').each(function (i) {
              var tempVideo = $(this);
              var onlyId = tempVideo.attr('id') + generateRandomString(8);
              tempVideo.attr('id', onlyId);
              if (newM3u8[onlyId]) {
                videojs(onlyId).dispose()
              }
              newM3u8[onlyId] = videojs(onlyId, {
                autoplay: false,
                loop: false,
                controls: true,
                muted: false,
                sources: [{
                  src: tempVideo.attr('data-src'),
                  type: tempVideo.attr('data-type')
                }]
              })
            })
          })
        }
      } catch (e) { }
    },
  });
})(window, jQuery);