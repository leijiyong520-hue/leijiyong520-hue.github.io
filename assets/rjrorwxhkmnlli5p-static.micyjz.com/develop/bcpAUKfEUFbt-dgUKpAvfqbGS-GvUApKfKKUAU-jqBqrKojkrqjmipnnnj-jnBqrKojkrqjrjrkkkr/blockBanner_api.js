/**
 * Block Banner 公用模板
 *
 * 统一处理 banner 区块中视频（mp4/m3u8/YouTube/Bilibili）与图片的轮播逻辑。
 *
 * 全局 API：
 * - window.blockBannerFunc(props, el) — 初始化轮播与视频
 * - window.blockBannerUtils — 区块侧脚本可复用的工具：waitFor、detectIframePlatform、
 *   normalizeSlides、resolveContainer
 *
 * @param {Object} props - 配置参数
 * @param {HTMLElement} el - banner 容器元素
 */
(function (window, $, undefined) {

	// ========================================================================
	// 兼容性工具 (Compat)
	// ========================================================================

	var Compat = {
			_ua: navigator.userAgent.toLowerCase(),

			isWeixin: function () {
					return /micromessenger/i.test(this._ua);
			},

			isWeixinWork: function () {
					return /wxwork/i.test(this._ua);
			},

			isSafari: function () {
					return /safari/i.test(this._ua) && !/chrome|chromium|crios/i.test(this._ua);
			},

			isHuaweiBrowser: function () {
					return /huaweibrowser/i.test(this._ua);
			},

			isBaiduBrowser: function () {
					return /baiduboxapp|baidubrowser|bdbrowser_i18n|flyflow/i.test(this._ua);
			},

			isX5Kernel: function () {
					return /mqq|mqqbrowser|tbs|x5/i.test(this._ua) ||
								 this.isWeixin() || this.isWeixinWork() || this.isBaiduBrowser();
			},

			isIOS: function () {
					return /iphone|ipad|ipod/i.test(this._ua);
			},

			isAndroid: function () {
					return /android/i.test(this._ua);
			},

			supportsHlsNative: function () {
					var video = document.createElement('video');
					return !!(video.canPlayType && video.canPlayType('application/vnd.apple.mpegurl'));
			},

			isM3u8: function (url) {
					if (!url) return false;
					return /(\.m3u8)(\?.*)?$/i.test(url) || url.indexOf('mediaType=m3u8') > -1;
			},

			/**
			 * 为 video 元素设置内联播放属性，阻止 X5/百度浏览器的全屏劫持。
			 *
			 * 百度浏览器（X5 内核）特殊策略：
			 *   - 检测到外部域名视频时会强制全屏并置顶播放
			 *   - x5-video-player-type="h5-page" 启用同层播放，视频保持在文档流内
			 *   - x5-video-player-fullscreen="false" 禁止 X5 自动全屏
			 *   - x5-video-orientation="portrait" 锁定竖屏，避免横屏劫持
			 *   - x5-playsinline 额外的 X5 内联播放标记
			 *   - x-webkit-airplay="allow" 兼容部分 WebKit 内核
			 *   - 以上属性必须在播放前设置，播放后设置无效
			 */
			applyVideoAttrs: function (videoEl) {
					videoEl.setAttribute('playsinline', '');
					videoEl.setAttribute('webkit-playsinline', '');
					videoEl.setAttribute('x5-playsinline', '');
					videoEl.setAttribute('x5-video-player-type', 'h5-page');
					videoEl.setAttribute('x5-video-player-fullscreen', 'false');
					videoEl.setAttribute('x5-video-orientation', 'portrait');
					videoEl.setAttribute('x-webkit-airplay', 'allow');
					videoEl.setAttribute('t7-video-player-type', 'inline');

					if (this.isBaiduBrowser() && this.isAndroid()) {
							videoEl.style.objectFit = 'contain';
							this._applyBaiduContainment(videoEl);
					}
			},

			/**
			 * 百度浏览器专用：防止视频被置顶到页面外部。
			 * 通过定位约束和层级管理把视频锁定在容器内。
			 */
			_applyBaiduContainment: function (videoEl) {
					var container = videoEl.closest('.block-banner-item');
					if (!container) return;

					container.style.position = 'relative';
					container.style.overflow = 'hidden';
					container.style.zIndex = '1';

					videoEl.style.position = 'relative';
					videoEl.style.zIndex = '1';
					videoEl.style.maxHeight = '100%';

					videoEl.addEventListener('playing', function () {
							videoEl.style.position = 'relative';
							videoEl.style.top = '0';
							videoEl.style.left = '0';
							videoEl.style.width = '100%';
							videoEl.style.height = '100%';
							videoEl.style.zIndex = '1';
					});
			},

			/**
			 * 安全播放：处理 autoplay 策略限制，先尝试播放，被阻止时静音重试。
			 * 百度浏览器下追加延迟重试以规避其异步劫持。
			 */
			safePlay: function (videoEl) {
					if (!videoEl || !videoEl.play) return Promise.resolve();

					var self = this;
					var playPromise = videoEl.play();
					if (playPromise !== undefined) {
							return playPromise.catch(function (err) {
									if (err.name === 'NotAllowedError') {
											videoEl.muted = true;
											return videoEl.play();
									}
									throw err;
							}).then(function () {
									if (self.isBaiduBrowser()) {
											self._guardBaiduPlayback(videoEl);
									}
							});
					}
					return Promise.resolve();
			},

			/**
			 * 百度浏览器播放后守卫：延迟检查视频是否被劫持置顶，
			 * 若检测到位置异常则强制重新约束。
			 */
			_guardBaiduPlayback: function (videoEl) {
					setTimeout(function () {
							var container = videoEl.closest('.block-banner-item');
							if (!container) return;
							var rect = videoEl.getBoundingClientRect();
							var containerRect = container.getBoundingClientRect();
							if (rect.top < containerRect.top - 2 || rect.left < containerRect.left - 2) {
									videoEl.style.position = 'relative';
									videoEl.style.top = '0';
									videoEl.style.left = '0';
									videoEl.style.width = '100%';
									videoEl.style.height = '100%';
									videoEl.style.zIndex = '1';
									videoEl.style.transform = 'none';
							}
					}, 300);
			},

			/**
			 * 微信/X5 内核 WebView 就绪后执行回调。
			 * 百度浏览器同样使用 X5 内核，需走相同的就绪等待路径。
			 */
			wxReady: function (callback) {
					if (!this.isWeixin() && !this.isWeixinWork() && !this.isBaiduBrowser()) {
							callback();
							return;
					}
					if (typeof WeixinJSBridge !== 'undefined') {
							callback();
					} else {
							var called = false;
							var wrappedCallback = function () {
									if (called) return;
									called = true;
									callback();
							};
							document.addEventListener('WeixinJSBridgeReady', wrappedCallback, false);
							setTimeout(wrappedCallback, 2000);
					}
			}
	};

	// ========================================================================
	// 封面图管理器 (CoverManager)
	// ========================================================================

	function CoverManager() {}

	CoverManager.prototype = {
			show: function (slideEl) {
					var cover = slideEl.querySelector('.block-banner-cover');
					if (cover) {
							cover.classList.remove('bb-hidden');
					}
			},

			hide: function (slideEl) {
					var cover = slideEl.querySelector('.block-banner-cover');
					if (cover) {
							cover.classList.add('bb-hidden');
					}
			},

			isVisible: function (slideEl) {
					var cover = slideEl.querySelector('.block-banner-cover');
					return cover && !cover.classList.contains('bb-hidden');
			},

			/**
			 * 绑定视频错误/加载事件，失败时回退到封面图
			 * @param {function(): boolean} [isActiveSlide] - 当前是否为轮播激活帧；未传则仅依据 _bbKeepCover（不推荐多视频场景）
			 */
			bindFallback: function (slideEl, isActiveSlide) {
					var self = this;
					var video = slideEl.querySelector('.block-banner-video');
					if (!video) return;

					video.addEventListener('error', function () {
							self.show(slideEl);
					});

					video.addEventListener('stalled', function () {
							if (video.readyState < 2) {
									self.show(slideEl);
							}
					});

					video.addEventListener('canplay', function () {
							if (slideEl._bbKeepCover) {
									return;
							}
							// 非当前帧也会因 preload 触发 canplay，不能在这里藏封面，否则未展示的 slide 会误加 bb-hidden
							if (typeof isActiveSlide === 'function' && !isActiveSlide()) {
									return;
							}
							self.hide(slideEl);
					});
			}
	};

	// ========================================================================
	// 视频播放管理器 (VideoManager)
	// ========================================================================

	function VideoManager(coverMgr) {
			this.coverMgr = coverMgr;
			this._hlsInstances = {};
	}

	VideoManager.prototype = {

			getSlideType: function (slideEl) {
					return (slideEl.getAttribute('data-slide-type') || 'image').toLowerCase();
			},

			getVideoFormat: function (slideEl) {
					var fmt = slideEl.getAttribute('data-video-format');
					if (fmt) return fmt.toLowerCase();
					var video = slideEl.querySelector('.block-banner-video');
					if (video && video.src) {
							return Compat.isM3u8(video.src) ? 'm3u8' : 'mp4';
					}
					return 'mp4';
			},

			// ---- Play ----

			playVideo: function (slideEl) {
					var type = this.getSlideType(slideEl);
					switch (type) {
							case 'video':
									this._playNativeVideo(slideEl);
									break;
							case 'youtube':
									this._playYoutube(slideEl);
									break;
							case 'bilibili':
									this._playBilibili(slideEl);
									break;
					}
			},

		_playNativeVideo: function (slideEl) {
				var self = this;
				var video = slideEl.querySelector('.block-banner-video');
				if (!video) return;

				if (!video.paused && !video.ended) return;

				Compat.applyVideoAttrs(video);

					var format = this.getVideoFormat(slideEl);
					if (format === 'm3u8') {
							this._playM3u8(slideEl, video);
					} else {
							Compat.wxReady(function () {
									Compat.safePlay(video).then(function () {
											self.coverMgr.hide(slideEl);
									}).catch(function () {
											self.coverMgr.show(slideEl);
									});
							});
					}
			},

			_playM3u8: function (slideEl, videoEl) {
					var self = this;
					var src = videoEl.getAttribute('src') || videoEl.getAttribute('data-src');
					if (!src) return;

					if (Compat.supportsHlsNative()) {
							videoEl.src = src;
							Compat.wxReady(function () {
									Compat.safePlay(videoEl).then(function () {
											self.coverMgr.hide(slideEl);
									}).catch(function () {
											self.coverMgr.show(slideEl);
									});
							});
							return;
					}

					if (typeof Hls === 'undefined') {
							if (leadComponentSite && leadComponentSite.hlsSourceImport) {
									leadComponentSite.hlsSourceImport.init({
											callback: function () {
													self._attachHls(slideEl, videoEl, src);
											}
									});
							}
							return;
					}

					this._attachHls(slideEl, videoEl, src);
			},

			_attachHls: function (slideEl, videoEl, src) {
					var self = this;
					var slideId = slideEl.getAttribute('data-bb-id');

					if (this._hlsInstances[slideId]) {
							this._hlsInstances[slideId].destroy();
					}

					if (typeof Hls !== 'undefined' && Hls.isSupported()) {
							var hls = new Hls();
							this._hlsInstances[slideId] = hls;
							hls.loadSource(src);
							hls.attachMedia(videoEl);
							hls.on(Hls.Events.MANIFEST_PARSED, function () {
									Compat.wxReady(function () {
											Compat.safePlay(videoEl).then(function () {
													self.coverMgr.hide(slideEl);
											}).catch(function () {
													self.coverMgr.show(slideEl);
											});
									});
							});
							hls.on(Hls.Events.ERROR, function (event, data) {
									if (data.fatal) {
											self.coverMgr.show(slideEl);
									}
							});
					}
			},

		_playYoutube: function (slideEl) {
				var iframe = slideEl.querySelector('.block-banner-iframe');
				if (!iframe) return;

				iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
				iframe.setAttribute('allowfullscreen', '');

				var dataSrc = iframe.getAttribute('data-src');
				if (dataSrc && !iframe.src) {
						if (dataSrc.indexOf('//') === 0) {
								dataSrc = 'https:' + dataSrc;
						}
						var sep = dataSrc.indexOf('?') > -1 ? '&' : '?';
						iframe.src = dataSrc + sep + 'autoplay=1&enablejsapi=1&mute=1';
					} else if (iframe.contentWindow) {
							try {
									iframe.contentWindow.postMessage(
											JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
											'*'
									);
							} catch (e) {}
					}
					this.coverMgr.hide(slideEl);
			},

			_playBilibili: function (slideEl) {
					var iframe = slideEl.querySelector('.block-banner-iframe');
					if (!iframe) return;

					var dataSrc = iframe.getAttribute('data-src');
					if (dataSrc && !iframe.src) {
							var sep = dataSrc.indexOf('?') > -1 ? '&' : '?';
							iframe.src = dataSrc + sep + 'autoplay=1&muted=1';
					}
					this.coverMgr.hide(slideEl);
			},

			// ---- Pause ----

			pauseVideo: function (slideEl) {
					var type = this.getSlideType(slideEl);
					switch (type) {
							case 'video':
									this._pauseNativeVideo(slideEl);
									break;
							case 'youtube':
									this._pauseYoutube(slideEl);
									break;
							case 'bilibili':
									this._pauseBilibili(slideEl);
									break;
					}
			},

			_pauseNativeVideo: function (slideEl) {
					var video = slideEl.querySelector('.block-banner-video');
					if (video) {
							try { video.pause(); } catch (e) {}
					}
			},

			_pauseYoutube: function (slideEl) {
					var iframe = slideEl.querySelector('.block-banner-iframe');
					if (iframe && iframe.contentWindow) {
							try {
									iframe.contentWindow.postMessage(
											JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
											'*'
									);
							} catch (e) {}
					}
			},

			_pauseBilibili: function (slideEl) {
					var iframe = slideEl.querySelector('.block-banner-iframe');
					if (iframe && iframe.contentWindow) {
							try {
									iframe.contentWindow.postMessage(
											JSON.stringify({ event: 'command', func: 'pause', args: [] }),
											'*'
									);
							} catch (e) {}
					}
			},

			// ---- Reset (回到未播放状态) ----

			resetVideo: function (slideEl) {
					var type = this.getSlideType(slideEl);
					switch (type) {
							case 'video':
									this._resetNativeVideo(slideEl);
									break;
							case 'youtube':
									this._resetYoutube(slideEl);
									break;
							case 'bilibili':
									this._resetBilibili(slideEl);
									break;
					}
					this.coverMgr.show(slideEl);
			},

			_resetNativeVideo: function (slideEl) {
					var video = slideEl.querySelector('.block-banner-video');
					if (!video) return;
					try { video.pause(); } catch (e) {}
					video.currentTime = 0;

					var slideId = slideEl.getAttribute('data-bb-id');
					if (this._hlsInstances[slideId]) {
							this._hlsInstances[slideId].destroy();
							delete this._hlsInstances[slideId];
					}
			},

			_resetYoutube: function (slideEl) {
					var iframe = slideEl.querySelector('.block-banner-iframe');
					if (!iframe) return;
					if (iframe.contentWindow) {
							try {
									iframe.contentWindow.postMessage(
											JSON.stringify({ event: 'command', func: 'stopVideo', args: [] }),
											'*'
									);
							} catch (e) {}
					}
					var dataSrc = iframe.getAttribute('data-src');
					if (dataSrc) {
							iframe.removeAttribute('src');
					}
			},

			_resetBilibili: function (slideEl) {
					var iframe = slideEl.querySelector('.block-banner-iframe');
					if (!iframe) return;
					var dataSrc = iframe.getAttribute('data-src');
					if (dataSrc) {
							iframe.removeAttribute('src');
					}
			},

			// ---- Video ended callback ----

			onVideoEnded: function (slideEl, callback) {
					var type = this.getSlideType(slideEl);
					if (type !== 'video') return;
					var video = slideEl.querySelector('.block-banner-video');
					if (!video) return;

					video.loop = false;

					var handler = function () {
							video.removeEventListener('ended', handler);
							callback();
					};
					video.addEventListener('ended', handler);
			},

			/**
			 * 单视频循环播放
			 */
			setLoop: function (slideEl, loop) {
					var video = slideEl.querySelector('.block-banner-video');
					if (video) {
							video.loop = !!loop;
					}
			},

			destroy: function () {
					var self = this;
					Object.keys(this._hlsInstances).forEach(function (key) {
							try { self._hlsInstances[key].destroy(); } catch (e) {}
					});
					this._hlsInstances = {};
			}
	};

	// ========================================================================
	// 切换控制器 (SlideController)
	// ========================================================================

	function SlideController(opts) {
			this.$el = opts.$el;
			this.videoMgr = opts.videoMgr;
			this.coverMgr = opts.coverMgr;
			this.mode = opts.mode || 'auto';
			this.imageDuration = opts.imageDuration || 3500;
			this.videoPlayTrigger = opts.videoPlayTrigger || 'auto';
			this.loop = opts.loop !== false;
			this.isEditor = !!window._isEditor;

			this._autoTimer = null;
			this._slideItems = [];
			this._currentIndex = 0;
			this._destroyed = false;
	}

	SlideController.prototype = {

		init: function () {
				this._collectSlideItems();
				this._bindSlickEvents();

				if (this._slideItems.length > 0) {
						var self = this;
						setTimeout(function () {
								self._activateSlide(0);
						}, 50);
				}
		},

			_collectSlideItems: function () {
					var items = this.$el.find('.block-banner-item').not('.slick-cloned .block-banner-item');
					var self = this;
					this._slideItems = [];

					items.each(function (i) {
							var el = this;
							if (!el.getAttribute('data-bb-id')) {
									el.setAttribute('data-bb-id', 'bb_' + Date.now() + '_' + i);
							}
							self._slideItems.push(el);
							self.coverMgr.bindFallback(el, function () {
									// 与 self._currentIndex 比较不可靠：Slick 在 infinite 等模式下
									// currentSlide 是含克隆的列表下标，与 _slideItems 的 0..n-1 常不一致，
									// 会导致切换后误判「非当前帧」或反过来。以 DOM 上的 slick-active 为准。
									var $slide = $(el).closest('.slick-slide');
									if ($slide.length) {
											return $slide.hasClass('slick-active');
									}
									var idx = self._slideItems.indexOf(el);
									return idx >= 0 && idx === self._currentIndex;
							});
					});
			},

			_bindSlickEvents: function () {
				var self = this;

				this.$el.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
					self._deactivateSlide(currentSlide);
				});

				this.$el.on('afterChange', function (event, slick, currentSlide) {
					self._currentIndex = currentSlide;
					self._activateSlide(currentSlide);
				});

				// 手动模式绑定 hover/click 触发
				if (this.videoPlayTrigger === 'hover') {
					this.$el.on('mouseenter', '.block-banner-item', function () {
						var idx = $(this).closest('.slick-slide').data('slick-index');
						if (idx === self._currentIndex) {
								self._triggerVideoPlay(this);
						}
					});
				} else if (this.videoPlayTrigger === 'click') {
					this.$el.on('click', '.block-banner-cover', function (e) {
						var slideEl = $(this).closest('.block-banner-item')[0];
						if (!slideEl) return;
						e.stopPropagation();

						var type = self.videoMgr.getSlideType(slideEl);
						if (type === 'video') {
								var video = slideEl.querySelector('.block-banner-video');
								if (video && !video.paused && !video.ended) {
										self.videoMgr.pauseVideo(slideEl);
										self.coverMgr.show(slideEl);
										return;
								}
						}

						self._triggerVideoPlay(slideEl);
					});
				}
			},

		_getSlideEl: function (index) {
				var slickSlides = this.$el.find('.slick-slide:not(.slick-cloned)');
				var targetSlide = slickSlides.eq(index);
				if (targetSlide.length) {
						var item = targetSlide.find('.block-banner-item')[0];
						if (item) return item;
				}
				return this._slideItems[index] || null;
		},

			// ---- Activate / Deactivate ----

			_activateSlide: function (index) {
					var slideEl = this._getSlideEl(index);
					if (!slideEl || this.isEditor) return;

					var type = this.videoMgr.getSlideType(slideEl);

					if (type === 'image') {
							this._startImageTimer();
					} else {
							if (this.videoPlayTrigger === 'auto') {
									this._triggerVideoPlay(slideEl);
							} else {
									slideEl._bbKeepCover = true;
									this.coverMgr.show(slideEl);
									// hover/click 模式下，仍需在手动模式下不自动切换
							}
					}
			},

			_deactivateSlide: function (index) {
					this._clearAutoTimer();

					var slideEl = this._getSlideEl(index);
					if (!slideEl) return;

					var type = this.videoMgr.getSlideType(slideEl);
					if (type !== 'image') {
							if (slideEl._bbVideoEndedShowCover) {
									var v = slideEl.querySelector('.block-banner-video');
									if (v) {
											v.removeEventListener('ended', slideEl._bbVideoEndedShowCover);
									}
									slideEl._bbVideoEndedShowCover = null;
							}
							this.videoMgr.resetVideo(slideEl);
							slideEl._bbKeepCover = false;
					}
			},

			_triggerVideoPlay: function (slideEl) {
					var self = this;
					slideEl._bbKeepCover = false;

					var totalSlides = this._slideItems.length;
					var isOnlyOneVideo = (totalSlides === 1) &&
							this.videoMgr.getSlideType(slideEl) === 'video';

					if (isOnlyOneVideo) {
							this.videoMgr.setLoop(slideEl, true);
							this.videoMgr.playVideo(slideEl);
							return;
					}

					this.videoMgr.playVideo(slideEl);

					if (this.mode === 'auto') {
							var type = this.videoMgr.getSlideType(slideEl);
							if (type === 'video') {
									this.videoMgr.onVideoEnded(slideEl, function () {
											if (!self._destroyed) {
													self._slickNext();
											}
									});
							} else if (type === 'youtube' || type === 'bilibili') {
									// iframe 视频无精确 ended 事件，不自动切换，由用户手动或后续扩展
							}
					}

					// click 模式：原生视频播完后恢复封面（移除 bb-hidden），便于再次点击播放
					if (this.videoPlayTrigger === 'click') {
							var vtype = this.videoMgr.getSlideType(slideEl);
							if (vtype === 'video') {
									var videoEl = slideEl.querySelector('.block-banner-video');
									if (videoEl) {
											if (slideEl._bbVideoEndedShowCover) {
													videoEl.removeEventListener('ended', slideEl._bbVideoEndedShowCover);
											}
											slideEl._bbVideoEndedShowCover = function () {
													slideEl._bbVideoEndedShowCover = null;
													if (!self._destroyed) {
															slideEl._bbKeepCover = true;
															self.coverMgr.show(slideEl);
													}
											};
											videoEl.addEventListener('ended', slideEl._bbVideoEndedShowCover);
									}
							}
					}
			},

			// ---- Image timer ----

			_startImageTimer: function () {
					if (this.mode !== 'auto') return;
					this._clearAutoTimer();

					var self = this;
					this._autoTimer = setTimeout(function () {
							if (!self._destroyed) {
									self._slickNext();
							}
					}, this.imageDuration);
			},

			_clearAutoTimer: function () {
					if (this._autoTimer) {
							clearTimeout(this._autoTimer);
							this._autoTimer = null;
					}
			},

			_slickNext: function () {
					if (this.$el.slickEditor) {
							this.$el.slickEditor('slickNext');
					} else if (this.$el.leadSlick) {
							this.$el.leadSlick('slickNext');
					}
			},

			destroy: function () {
					this._destroyed = true;
					this._clearAutoTimer();
					var i;
					for (i = 0; i < this._slideItems.length; i++) {
							var se = this._slideItems[i];
							if (se && se._bbVideoEndedShowCover) {
									var vv = se.querySelector('.block-banner-video');
									if (vv) {
											vv.removeEventListener('ended', se._bbVideoEndedShowCover);
									}
									se._bbVideoEndedShowCover = null;
							}
					}
					this.videoMgr.destroy();
					this.$el.off('beforeChange afterChange mouseenter');
					this.$el.off('click', '.block-banner-cover');
			}
	};

	// ========================================================================
	// 区块公共工具（供各站点区块脚本复用）
	// ========================================================================

	/**
	 * 等待 window 上某路径的全局对象就绪（点号路径，如 'blockBannerFunc'）。
	 */
	function blockBannerWaitFor(path, maxWait, interval) {
			maxWait = maxWait || 3000;
			interval = interval || 100;
			return new Promise(function (resolve, reject) {
					var startTime = Date.now();
					function check() {
							var obj = window;
							var keys = path.split('.');
							for (var i = 0; i < keys.length; i++) {
									if (obj == null || !(keys[i] in obj)) {
											obj = null;
											break;
									}
									obj = obj[keys[i]];
							}
							if (obj != null) {
									resolve(obj);
							} else if (Date.now() - startTime < maxWait) {
									setTimeout(check, interval);
							} else {
									reject(new Error('waitFor ' + path + ' timeout (' + maxWait + 'ms)'));
							}
					}
					check();
			});
	}

	/**
	 * 判断 iframe src 属于哪种第三方平台，
	 * 用于给未在 HTML 端标记 data-slide-type 的 iframe slide 补标。
	 */
	function blockBannerDetectIframePlatform(src) {
			if (!src) return '';
			if (src.indexOf('youtube.com') !== -1 || src.indexOf('youtu.be') !== -1) return 'youtube';
			if (src.indexOf('bilibili.com') !== -1) return 'bilibili';
			return '';
	}

	/**
	 * 对容器内的 slide 做一轮校验/补全，确保 blockBannerFunc 能正确识别。
	 * 运行时兜底：处理动态数据未预期到的边界情况。
	 */
	function blockBannerNormalizeSlides($container) {
			$container.children('.block-banner-item').each(function () {
					var $item = $(this);
					var slideType = ($item.attr('data-slide-type') || '').toLowerCase();

					if (slideType === 'video') {
							var $video = $item.find('.block-banner-video');
							if ($video.length) {
									var src = $video.attr('src') || $video.attr('data-src') || '';
									if (!$item.attr('data-video-format')) {
											var isM3u8 = /(\.m3u8)(\?.*)?$/i.test(src) || src.indexOf('mediaType=m3u8') > -1;
											$item.attr('data-video-format', isM3u8 ? 'm3u8' : 'mp4');
									}
							}
					}

					if (!slideType) {
							var $iframe = $item.find('iframe, .block-banner-iframe');
							var $video2 = $item.find('video, .block-banner-video');
							if ($iframe.length) {
									var iframeSrc = $iframe.attr('data-src') || $iframe.attr('src') || '';
									var platform = blockBannerDetectIframePlatform(iframeSrc);
									$item.attr('data-slide-type', platform || 'video');
									if (!$iframe.hasClass('block-banner-iframe')) {
											$iframe.addClass('block-banner-iframe');
									}
							} else if ($video2.length) {
									$item.attr('data-slide-type', 'video');
									if (!$video2.hasClass('block-banner-video')) {
											$video2.addClass('block-banner-video');
									}
							} else {
									$item.attr('data-slide-type', 'image');
							}
					}

					if (slideType === 'youtube' || slideType === 'bilibili' || (!slideType && $item.find('.block-banner-iframe').length)) {
							var $iframe2 = $item.find('.block-banner-iframe');
							if ($iframe2.length && !$iframe2.attr('data-src') && $iframe2.attr('src')) {
									$iframe2.attr('data-src', $iframe2.attr('src'));
									$iframe2.removeAttr('src');
							}
					}

					if ((slideType === 'video' || slideType === 'youtube' || slideType === 'bilibili') && !$item.find('.block-banner-cover').length) {
							var posterUrl = '';
							var $v = $item.find('.block-banner-video');
							if ($v.length) {
									posterUrl = $v.attr('poster') || '';
							}
							if (!posterUrl) {
									var $img = $item.find('.block-banner-img, .block-banner-poster-img img');
									if ($img.length) posterUrl = $img.attr('src') || '';
							}
							if (posterUrl) {
									var coverHtml = '<div class="block-banner-cover" style="background-image:url(' + posterUrl + ')">' +
											'<div class="block-banner-play-btn"></div></div>';
									$item.prepend(coverHtml);
							}
					}
			});
	}

	/**
	 * 根据 settingId / classer 解析轮播容器 jQuery 对象。
	 */
	function blockBannerResolveContainer(nodeObj) {
			if (!nodeObj) return null;
			var settingId = nodeObj.settingId || '';
			var classer = nodeObj.classer;
			var $wrap = $('#siteblocks-setting-wrap-' + settingId);
			if (!$wrap.length) $wrap = $(document);

			var $container = $wrap.find('#block-banner-' + settingId);
			if (classer) {
					$container = $wrap.find('.' + classer);
			}
			if (!$container.length) {
					$container = $wrap.find('.block-banner-container');
			}

			return $container.length ? $container : null;
	}

	window.blockBannerUtils = {
			waitFor: blockBannerWaitFor,
			detectIframePlatform: blockBannerDetectIframePlatform,
			normalizeSlides: blockBannerNormalizeSlides,
			resolveContainer: blockBannerResolveContainer
	};

	// ========================================================================
	// 主函数 blockBannerFunc
	// ========================================================================

	window.blockBannerFunc = async function (props, el) {
			props = props || {};
			if(!el) {
					console.error('dom 未传参', props, el)
					return;
			}
			var defaults = {
					mode: 'auto',
					imageDuration: 3500,
					videoPlayTrigger: 'auto',
					loop: true,
					transitionSpeed: 500,
					arrows: true,
					dots: true,
					arrowIcon: '',
					padSettings: null,
					phoneSettings: null
			};

			var settings = $.extend({}, defaults, props);

			// 加载 slick 依赖
			if (leadComponentSite && leadComponentSite.slickSourceImport) {
					await leadComponentSite.slickSourceImport.leadInit({});
			}

			var $el = $(el);
			var isEditor = !!$el.data('gjsType');

			// 如果已初始化 slick，先销毁
			if ($el.find('.slick-list').length > 0) {
					try {
							if ($el.slickEditor) {
									$el.slickEditor('unslick');
							} else if ($el.leadSlick) {
									$el.leadSlick('unslick');
							}
					} catch (e) {}
			}

			// 构建 slick 配置
			var arrowSvg = settings.arrowIcon ||
					'<svg xmlns="//www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="currentColor">' +
					'<path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>';
					
			var slickOpts = {
					arrows: settings.arrows,
					dots: settings.dots,
					autoplay: false, // 自动切换由 SlideController 管理
					infinite: settings.loop,
					speed: settings.transitionSpeed,
					slidesToShow: 1,
					slidesToScroll: 1,
					fade: true,
					draggable: !isEditor,
					swipe: !isEditor,
					nextArrow: '<button type="button" class="slick-next">' + arrowSvg + '</button>',
					prevArrow: '<button type="button" class="slick-prev">' + arrowSvg + '</button>',
					dotsClass: 'slick-dots',
					lazyLoad: 'ondemand',
					responsive: []
			};

			// 响应式配置
			if (settings.padSettings || settings.phoneSettings) {
					var padCfg = $.extend({}, settings, settings.padSettings || {});
					var phoneCfg = $.extend({}, settings, settings.phoneSettings || {});

					slickOpts.responsive = [
							{
									breakpoint: 993,
									settings: {
											arrows: padCfg.arrows,
											dots: padCfg.dots,
											speed: padCfg.transitionSpeed
									}
							},
							{
									breakpoint: 480,
									settings: {
											arrows: phoneCfg.arrows,
											dots: phoneCfg.dots,
											speed: phoneCfg.transitionSpeed
									}
							}
					];
			}

			// 为每个 slide item 标记 data-bb-id
			$el.find('.block-banner-item').each(function (i) {
					if (!this.getAttribute('data-bb-id')) {
							this.setAttribute('data-bb-id', 'bb_' + Date.now() + '_' + i);
					}
					var type = (this.getAttribute('data-slide-type') || 'image').toLowerCase();
					if (type === 'video') {
							var video = this.querySelector('.block-banner-video');
							if (video) {
									Compat.applyVideoAttrs(video);
									video.muted = true;
							}
					}
			});

			// 初始化 leadSlick（$.fn.leadSlick，兼容原 Slick 配置与方法名）
			var slickFn = $el.slickEditor ? 'slickEditor' : 'leadSlick';
			$el[slickFn](slickOpts);

			// 初始化管理器
			var coverMgr = new CoverManager();
			var videoMgr = new VideoManager(coverMgr);
			var controller = new SlideController({
					$el: $el,
					videoMgr: videoMgr,
					coverMgr: coverMgr,
					mode: isEditor ? 'manual' : settings.mode,
					imageDuration: settings.imageDuration,
					videoPlayTrigger: isEditor ? 'click' : settings.videoPlayTrigger,
					loop: settings.loop,
					isEditor: isEditor
			});

			controller.init();

			// 事件通信
			if (leadComponentSite && leadComponentSite.globalMinimumUnitEvent) {
					leadComponentSite.globalMinimumUnitEvent.emit('bannerInit', $el.attr('id'));

					$el.on('afterChange', function (event, slick, currentSlide) {
							leadComponentSite.globalMinimumUnitEvent.emit('bannerSlideChange', {
									bannerId: $el.attr('id'),
									fromIndex: controller._currentIndex,
									toIndex: currentSlide
							});
					});

					// 响应 tab 切换重新布局
					leadComponentSite.globalMinimumUnitEvent.on('tabChange', function (tabContentId) {
							if ($el.closest('#' + tabContentId).length) {
									try {
											$el[slickFn]('setPosition');
									} catch (e) {}
							}
					});
			}

			// resize 处理
			var resizeTimer = null;
			function onResize() {
					clearTimeout(resizeTimer);
					resizeTimer = setTimeout(function () {
							try { $el[slickFn]('setPosition'); } catch (e) {}
					}, 150);
			}
			window.addEventListener('resize', onResize);

			// 暴露 destroy 方法
			el._bbDestroy = function () {
					controller.destroy();
					window.removeEventListener('resize', onResize);
					try { $el[slickFn]('unslick'); } catch (e) {}
			};
	};

})(window, jQuery);