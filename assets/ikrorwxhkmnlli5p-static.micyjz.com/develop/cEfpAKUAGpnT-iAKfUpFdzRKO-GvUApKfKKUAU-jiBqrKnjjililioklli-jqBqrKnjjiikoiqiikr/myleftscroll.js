;(function($){
  $.fn.skyNoIntervalRoll = function(options){
    // 默认配置
    var defaults = {
      responsive: [
        {
          breakpoint: 900,
          slidesToShow: 4
        },
        {
          breakpoint: 412,
          slidesToShow: 2
        }
      ],
      speed: 0.5, // 滚动速度（像素/帧）
      pauseOnHover: true
    };
    
    // 合并配置
    var settings = $.extend({}, defaults, options);
    var $self = this;
    var animationId = null;
    var isPaused = false;
    
    // 获取当前屏幕宽度下的slidesToShow
    function getSlidesToShow(containerWidth) {
      var slidesToShow = Infinity; // 默认显示所有
      
      // 按breakpoint升序排序（从小到大）
      var responsive = settings.responsive.sort(function(a, b) {
        return a.breakpoint - b.breakpoint;
      });
      
      console.log('响应式配置:', responsive); // 调试用
      console.log('当前宽度:', containerWidth); // 调试用
      
      // 遍历响应式配置
      for (var i = 0; i < responsive.length; i++) {
        if (containerWidth <= responsive[i].breakpoint) {
          slidesToShow = responsive[i].slidesToShow;
          console.log('匹配规则: 断点', responsive[i].breakpoint, '显示', slidesToShow, '个'); // 调试用
          break;
        }
      }
      
      return slidesToShow;
    }
    
    // 计算li宽度（响应式）
    function calculateItemWidth($container, $listItems, slidesToShow) {
      var containerWidth = $container.width();
      var gap = 10; // li的margin-right
      
      console.log('计算宽度: slidesToShow=', slidesToShow, '容器宽度=', containerWidth); // 调试用
      
      if (slidesToShow === Infinity || slidesToShow >= $listItems.length) {
        // 显示所有项目
        var width = $listItems.eq(0).outerWidth(true);
        console.log('显示所有项目，宽度=', width);
        return width;
      } else {
        // 计算每个项目的宽度
        var totalGapWidth = gap * (slidesToShow - 1);
        var availableWidth = containerWidth - totalGapWidth;
        var calculatedWidth = availableWidth / slidesToShow;
        console.log('计算后宽度: 总间隙=', totalGapWidth, '可用宽度=', availableWidth, '项目宽度=', calculatedWidth);
        return calculatedWidth;
      }
    }
    
    // 设置li的响应式宽度
    function setResponsiveItemWidth($listItems, itemWidth) {
      $listItems.each(function() {
        var $li = $(this);
        var computedWidth = itemWidth - parseInt($li.css('margin-right') || 0) - 
                           parseInt($li.css('margin-left') || 0);
        
        console.log('设置li宽度:', computedWidth, '原始宽度:', itemWidth); // 调试用
        
        $li.css({
          'width': computedWidth + 'px',
          'flex': '0 0 ' + computedWidth + 'px',
          'box-sizing': 'border-box' // 确保padding和border包含在宽度内
        });
      });
    }
    
    // 保存原始HTML
    function saveOriginalHTML($container) {
      if (!$container.data('originalHTML')) {
        var $ul = $container.find('.roll__list');
        if ($ul.length > 0) {
          $container.data('originalHTML', $ul.html());
          console.log('保存原始HTML成功，项目数:', $ul.find('li').length);
        }
      }
    }
    
    // 核心滚动函数
    function myroll($container, force) {
      if (!force && $container.hasClass('inited')) {
        return;
      }
      
      $container.addClass('inited');
      
      // 保存原始HTML
      saveOriginalHTML($container);
      
      // 获取原始列表项
      var $ul = $container.find('.roll__list');
      var $listItems = $ul.find('li');
      
      if ($listItems.length === 0) {
        console.warn('没有找到列表项');
        return;
      }
      
      var containerWidth = $container.width();
      console.log('容器实际宽度:', containerWidth, '元素宽度:', $container.width());
      
      // 获取当前应该显示的数量
      var slidesToShow = getSlidesToShow(containerWidth);
      console.log('容器宽度:', containerWidth, '显示数量:', slidesToShow);
      $container.data('currentSlidesToShow', slidesToShow);
      
      // 计算每个li的宽度
      var liWidth = calculateItemWidth($container, $listItems, slidesToShow);
      $container.data('liWidth', liWidth);
      
      var itemsCount = $listItems.length;
      console.log('原始项目数量:', itemsCount, '计算出的li宽度:', liWidth);
      
      // 设置li的响应式宽度
      setResponsiveItemWidth($listItems, liWidth);
      
      // 清理旧的结构
      $container.find('.wrapsky').remove();
      
      // 将原始列表恢复到正常流
      $ul.css({
        'position': 'relative',
        'left': '0',
        'display': 'flex',
        'flex-wrap': 'nowrap',
        'will-change': 'transform',
        'width': 'auto',
        'gap': '10px'
      });
      
      // 计算需要复制的份数
      var visibleWidth = containerWidth;
      var totalItemsWidth = liWidth * itemsCount;
      var ulNum = Math.ceil(visibleWidth / totalItemsWidth) + 1;
      console.log('需要复制份数:', ulNum, '可见宽度:', visibleWidth, '总项目宽度:', totalItemsWidth);
      
      // 复制所有列表项
      var originalItemsHTML = '';
      $listItems.each(function() {
        originalItemsHTML += $(this).prop('outerHTML');
      });
      
      var duplicatedHTML = originalItemsHTML;
      for (var i = 0; i < ulNum; i++) {
        duplicatedHTML += originalItemsHTML;
      }
      
      $ul.html(duplicatedHTML);
      
      // 重新获取所有li（包括复制的）
      $listItems = $ul.find('li');
      setResponsiveItemWidth($listItems, liWidth);
      
      // 计算总宽度
      var totalItems = itemsCount * (ulNum + 1);
      var totalWidth = liWidth * totalItems;
      
      $ul.css('width', totalWidth + 'px');
      console.log('总项目数:', totalItems, '总宽度:', totalWidth);
      
      // 将列表包裹在一个容器中
      $ul.wrap('<div class="wrapsky"></div>');
      var $warpsky = $container.find('.wrapsky');
      $warpsky.css({
        'display': 'flex',
        'overflow': 'hidden',
        'width': '100%'
      });
      
      // 设置初始位置
      var offset = 0;
      
      // 停止之前的动画
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
      
      // 动画函数
      function animate() {
        if (isPaused) {
          animationId = requestAnimationFrame(animate);
          return;
        }
        
        offset -= settings.speed;
        
        // 重置位置实现无缝滚动
        if (Math.abs(offset) >= liWidth * itemsCount) {
          offset = 0;
        }
        
        $ul.css('transform', 'translateX(' + offset + 'px)');
        animationId = requestAnimationFrame(animate);
      }
      
      // 存储动画控制函数
      $container.data('animateFunction', animate);
      
      // 开始动画
      animate();
      
      // 鼠标悬停控制
      if (settings.pauseOnHover) {
        $container.off('mouseenter.skyroll mouseleave.skyroll')
          .on('mouseenter.skyroll', function(){
            isPaused = true;
          })
          .on('mouseleave.skyroll', function(){
            isPaused = false;
          });
      }
    }
    
    // 检查是否需要重新初始化（响应式变化）
    function checkResponsiveChange($container) {
      var containerWidth = $container.width();
      var currentSlidesToShow = $container.data('currentSlidesToShow');
      var newSlidesToShow = getSlidesToShow(containerWidth);
      
      console.log('检查响应式变化: 当前=', currentSlidesToShow, '新=', newSlidesToShow);
      return currentSlidesToShow !== newSlidesToShow;
    }
    
    // 初始化函数
    function init(force) {
      console.log('初始化插件，目标元素数量:', $self.length);
      $self.each(function(index) {
        console.log('初始化第', index + 1, '个元素');
        var $container = $(this);
        myroll($container, force);
      });
    }
    
    // 销毁函数
    function destroy() {
      $self.each(function() {
        var $container = $(this);
        
        // 停止动画
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
        
        // 移除事件监听
        $container.off('mouseenter.skyroll mouseleave.skyroll');
        
        // 清理DOM
        $container.find('.wrapsky').remove();
        
        // 恢复原始HTML
        var originalHTML = $container.data('originalHTML');
        if (originalHTML) {
          var $ul = $('<ul class="roll__list">' + originalHTML + '</ul>').appendTo($container);
          $ul.css({
            'position': '',
            'left': '',
            'display': '',
            'flex-wrap': '',
            'will-change': '',
            'width': '',
            'transform': '',
            'gap': ''
          });
        }
        
        $container.removeClass('inited').removeData('currentSlidesToShow liWidth');
      });
      
      // 移除窗口resize事件
      $(window).off('resize.skyroll');
    }
    
    // 初始化
    if (this.length > 0) {
      init();
    }
    
    // 窗口大小改变时的优化处理
    var resizeTimer;
    $(window).on('resize.skyroll', function() {
      console.log('窗口大小改变');
      // 防抖处理，避免频繁触发
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        $self.each(function() {
          var $container = $(this);
          if ($container.hasClass('inited')) {
            // 检查是否需要重新初始化（响应式变化）
            if (checkResponsiveChange($container)) {
              console.log('检测到响应式变化，重新初始化');
              var originalHTML = $container.data('originalHTML');
              $container.removeClass('inited');
              $container.find('.wrapsky').remove();
              
              if (originalHTML) {
                var $ul = $('<ul class="roll__list">' + originalHTML + '</ul>').appendTo($container);
              }
              
              myroll($container, true);
            } else {
              console.log('无响应式变化，只更新尺寸');
              // 只是窗口大小变化，不需要重新初始化整个结构
              var $ul = $container.find('.roll__list');
              var $listItems = $ul.find('li');
              var containerWidth = $container.width();
              var slidesToShow = getSlidesToShow(containerWidth);
              var liWidth = calculateItemWidth($container, $listItems, slidesToShow);
              
              $container.data('currentSlidesToShow', slidesToShow);
              $container.data('liWidth', liWidth);
              
              setResponsiveItemWidth($listItems, liWidth);
              
              // 重新计算并设置总宽度
              var totalWidth = liWidth * $listItems.length;
              $ul.css('width', totalWidth + 'px');
            }
          }
        });
      }, 250);
    });
    
    // 返回公共方法
    return {
      init: function(force) { 
        init(force); 
        return this; 
      },
      destroy: destroy,
      pause: function() { isPaused = true; },
      play: function() { isPaused = false; },
      refresh: function() { 
        $self.each(function() {
          var $container = $(this);
          if ($container.hasClass('inited')) {
            $container.removeClass('inited');
            $container.find('.wrapsky').remove();
            var originalHTML = $container.data('originalHTML');
            if (originalHTML) {
              var $ul = $('<ul class="roll__list">' + originalHTML + '</ul>').appendTo($container);
            }
            myroll($container, true);
          }
        });
      }
    };
  };
})(jQuery);