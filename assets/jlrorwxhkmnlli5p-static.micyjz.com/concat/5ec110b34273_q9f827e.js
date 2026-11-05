/** page_editor_view_new/frontend/348144/934514/20261023104139/46560138/5/46560138/page_editor.js **/
(function(window, $, undefined) {
          var _page_editor = window._page_editor_namespaces_ || (window._page_editor_namespaces_ = {});
          var name = "pRpKtvPbfVNI_main";
          window._page_editor_id = name
          var pageVariable = _page_editor_namespaces_[name] || (_page_editor_namespaces_[name] = {});

          $.extend(pageVariable, {
              "init": init,
          })
          function init() {
            
          }
          window["leadgjsSlickSlider_ion2f82vbm"] = function () {
            var props = {"ion2f82vbm":{"sliderOption":{"compntSeetings":{"infinite":true,"autoplay":false,"autoplaySpeed":3,"arrows":true,"dots":true,"speed":500,"fade":false},"compntPadSeetings":{},"compntPhoneSeetings":{},"slider":true},"changeFlag":true}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (async function(e){try{let t=function(){var e=c.slickEditor("slickCurrentSlide"),t=c.slickEditor("getSlick").slideCount;c.find(".slick-prev-arrows").prop("disabled",0===e),c.find(".slick-next-arrows").prop("disabled",e===t-1)},n=function(){var e;try{const t=window.parent;if(t&&t.grapesEditor){const n=(null==(e=t.grapesEditor.getWrapper().find(`#${s}`))?void 0:e.at(0))||{};if(n){const e=n.findType("blockContainer");e&&e.length>0&&e.forEach((e=>{e.view&&e.view.handleBgRatio&&e.view.handleBgRatio()}))}}}catch(t){}};if(!window.$(this).attr("id"))return;window.leadComponentSite.slickSourceImport&&await window.leadComponentSite.slickSourceImport.init({});const o=JSON.parse(JSON.stringify(e.sliderOption));let{compntSeetings:a,compntPadSeetings:i,compntPhoneSeetings:l}=o;if(!a)return;i=i?{...a,...i}:a,l=l?{...a,...l}:a;const s=window.$(this).attr("id"),r=null==a?void 0:a.arrows,c=window.$(`#${s}`),d="gjs-slick-slider"==c.data("gjsType"),u={dotsClass:"slick-dots lead-slider-dots",arrows:!1,autoplay:!d&&((null==a?void 0:a.autoplay)??(null==a?void 0:a.autoPlay)),autoplaySpeed:null!=(null==a?void 0:a.autoplaySpeed)?1e3*(null==a?void 0:a.autoplaySpeed):1e3*((null==a?void 0:a.speedNum)||3),infinite:!d&&(null==a?void 0:a.infinite),draggable:!d,centerMode:!d&&(null==a?void 0:a.centerMode),centerPadding:d?"0px":(null==a?void 0:a.centerPadding)||"0px",accessibility:!d,speed:(null==a?void 0:a.speed)||500,slider:!0,fade:(null==a?void 0:a.fade)||!1,dots:null==a?void 0:a.dots,slide:".gjs-slick-slider-item",arrowIcon:null==a?void 0:a.arrowIcon};u.responsive=[{breakpoint:window.MEDIA_WIDTH.PAD,settings:{autoplay:!d&&((null==i?void 0:i.autoplay)??(null==i?void 0:i.autoPlay)),autoplaySpeed:(null==i?void 0:i.autoplaySpeed)?1e3*((null==i?void 0:i.speedNum)||3):1e3*(null==i?void 0:i.autoplaySpeed),infinite:!d&&(null==i?void 0:i.infinite),dots:null==i?void 0:i.dots}},{breakpoint:window.MEDIA_WIDTH.MOBILE,settings:{autoplay:!d&&((null==l?void 0:l.autoplay)??(null==l?void 0:l.autoPlay)),autoplaySpeed:(null==l?void 0:l.autoplaySpeed)?1e3*((null==l?void 0:l.speedNum)||3):1e3*(null==l?void 0:l.autoplaySpeed),infinite:!d&&(null==l?void 0:l.infinite),dots:null==l?void 0:l.dots}}],window.$(`#${s}`).removeClass("slider-default-class"),c.find(".slick-list").length>0&&c.slickEditor("unslick"),c.slickEditor(u),leadComponentSite.globalMinimumUnitEvent.emit("slickInit",c.attr("id")),c.find(".slick-arrow").remove(),r&&(a.infinite?(c.find(".slick-prev-arrows").prop("disabled",!1),c.find(".slick-next-arrows").prop("disabled",!1)):(t(),c.on("afterChange",(function(e,n,o,a){t()})))),n()}catch(t){}}.bind(el))(props[el.id]);
            }
          };
          window["leadgjsSlickSlider_ion2f82vbm"]();
          window["leadblockContainer_io0i25hnmg"] = function () {
            var props = {"io0i25hnmg":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.$(this).hasClass("motion-animation")&&window.globalMotionPrivate(e.animationJSON,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadblockContainer_io0i25hnmg"]();
          window["leadsectionBg_ioo1mbbzfq"] = function () {
            var props = {"ioo1mbbzfq":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"iofi2p7olk":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"iotpoqza6s":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){const t=this,{bgMouseEffectSeeting:n}=e||{},{isMouseEffect:o,mouseEffectSpeed:a,isFixedScroll:i}=n||{};o&&"0"!==o&&document.addEventListener("mousemove",(e=>{const{clientX:n,clientY:o}=e,i=window.innerWidth,l=window.innerHeight,s=(n-i/2)/(20/a),r=(o-l/2)/(20/a);t.style.setProperty("--translateX",`${s}px`),t.style.setProperty("--translateY",`${r}px`)}))}.bind(el))(props[el.id]);
            }
          };
          window["leadsectionBg_ioo1mbbzfq"]();
          window["leadsectionColor_io0zkvokql"] = function () {
            var props = {"io0zkvokql":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"ioqqme46tw":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"iomf3431fo":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"io0g4y3hzxg":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"iozmplajsq":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){const t=this,{bgMouseEffectSeeting:n}=e||{},{isMouseEffect:o,mouseEffectSpeed:a}=n||{};o&&"0"!==o&&document.addEventListener("mousemove",(e=>{const{clientX:n,clientY:o}=e,i=window.innerWidth,l=window.innerHeight,s=(n-i/2)/(20/a),r=(o-l/2)/(20/a);t.style.setProperty("--translateX",`${s}px`),t.style.setProperty("--translateY",`${r}px`)}))}.bind(el))(props[el.id]);
            }
          };
          window["leadsectionColor_io0zkvokql"]();
          window["leadrowContainer_ioqzq9ng2k"] = function () {
            var props = {"ioqzq9ng2k":{"sliderOption":{"compntSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"compntPadSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"styleModel":{"bgModel":true,"otherModel":{"all":true}},"compntPhoneSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"sliderType":"slick"},"isSlider":false,"changeFlag":false}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){e.isSlider&&window.rowSliderFunc&&window.rowSliderFunc(e,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadrowContainer_ioqzq9ng2k"]();
          window["leadcolumn_iod73s2gmy"] = function () {
            var props = {"iod73s2gmy":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.$(this).hasClass("motion-animation")&&window.globalMotionPrivate(e.animationJSON,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadcolumn_iod73s2gmy"]();
          window["leadtext_iocec7xjqu"] = function () {
            var props = {"iocec7xjqu":{"animationJSON":null},"iowv6x1o4p":{"animationJSON":null},"i3kavq":{"animationJSON":null},"idvx7l":{"animationJSON":null},"iove94facn":{"animationJSON":null},"io08v9bghk":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.globalMotionPrivate(e.animationJSON,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadtext_iocec7xjqu"]();
          window["leadbutton_iomb1i0yzaj"] = function () {
            var props = {"iomb1i0yzaj":{"animationJSON":null},"iokv8bqkl8i":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.globalMotionPrivate(e.animationJSON,this),window.buttonTypeFunc&&window.buttonTypeFunc(this)}.bind(el))(props[el.id]);
            }
          };
          window["leadbutton_iomb1i0yzaj"]();
          window["leadleadSliderIcon_io0ze36b53"] = function () {
            var items = document.querySelectorAll('#io0ze36b53, #iolkd375kz');
            for (var i = 0, len = items.length; i < len; i++) {
              (function(){
                var e=this;window.$(e).on("click",(function(){let t=window.$(e).parent().find(">.row-container").attr("id");window.$(e).parent().hasClass("gjs-slick-slider")&&(t=window.$(e).parent().attr("id"));let n=window.$("#"+t);window.$(e).hasClass("slick-prev-arrows")&&n.slickEditor("slickPrev"),window.$(e).hasClass("slick-next-arrows")&&n.slickEditor("slickNext")}))
              }.bind(items[i]))();
            }
          };
          window["leadleadSliderIcon_io0ze36b53"]();
      if(window.baseFuncNameList && window.baseFuncNameList.length > 0) {
        window.baseFuncNameList = window.baseFuncNameList.concat('leadgjsSlickSlider_ion2f82vbm','leadblockContainer_io0i25hnmg','leadsectionBg_ioo1mbbzfq','leadsectionColor_io0zkvokql','leadcolumn_iod73s2gmy','leadtext_iocec7xjqu','leadbutton_iomb1i0yzaj','leadleadSliderIcon_io0ze36b53')
      } else {
        window.baseFuncNameList = ['leadgjsSlickSlider_ion2f82vbm','leadblockContainer_io0i25hnmg','leadsectionBg_ioo1mbbzfq','leadsectionColor_io0zkvokql','leadcolumn_iod73s2gmy','leadtext_iocec7xjqu','leadbutton_iomb1i0yzaj','leadleadSliderIcon_io0ze36b53'];
      };window["leadblockContainer_iob5mkq4rn"] = function () {
            var props = {"iob5mkq4rn":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.$(this).hasClass("motion-animation")&&window.globalMotionPrivate(e.animationJSON,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadblockContainer_iob5mkq4rn"]();
          window["leadsectionBg_ioyd37ploc"] = function () {
            var props = {"ioyd37ploc":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"iopivyvshl":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"ioqb5v3qk8":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"iozc8wsx7u":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"io8o5oxx47":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){const t=this,{bgMouseEffectSeeting:n}=e||{},{isMouseEffect:o,mouseEffectSpeed:a,isFixedScroll:i}=n||{};o&&"0"!==o&&document.addEventListener("mousemove",(e=>{const{clientX:n,clientY:o}=e,i=window.innerWidth,l=window.innerHeight,s=(n-i/2)/(20/a),r=(o-l/2)/(20/a);t.style.setProperty("--translateX",`${s}px`),t.style.setProperty("--translateY",`${r}px`)}))}.bind(el))(props[el.id]);
            }
          };
          window["leadsectionBg_ioyd37ploc"]();
          window["leadsectionColor_iomn5qt4o1"] = function () {
            var props = {"iomn5qt4o1":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"ioxha7zwyi":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"ioj1p1i0anj":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"iouoo0n4ro":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"iobuqmobq9i":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"ioxscaj38k":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"iotg3vy7i4":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){const t=this,{bgMouseEffectSeeting:n}=e||{},{isMouseEffect:o,mouseEffectSpeed:a}=n||{};o&&"0"!==o&&document.addEventListener("mousemove",(e=>{const{clientX:n,clientY:o}=e,i=window.innerWidth,l=window.innerHeight,s=(n-i/2)/(20/a),r=(o-l/2)/(20/a);t.style.setProperty("--translateX",`${s}px`),t.style.setProperty("--translateY",`${r}px`)}))}.bind(el))(props[el.id]);
            }
          };
          window["leadsectionColor_iomn5qt4o1"]();
          window["leadrowContainer_iorbvrl17lg"] = function () {
            var props = {"iorbvrl17lg":{"sliderOption":{"compntSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"compntPadSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"styleModel":{"bgModel":true,"otherModel":{"all":true}},"compntPhoneSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"sliderType":"slick"},"isSlider":false,"changeFlag":false},"io17oknf9w":{"sliderOption":{"compntSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"compntPadSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"styleModel":{"bgModel":true,"otherModel":{"all":true}},"compntPhoneSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"sliderType":"slick"},"isSlider":false,"changeFlag":false}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){e.isSlider&&window.rowSliderFunc&&window.rowSliderFunc(e,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadrowContainer_iorbvrl17lg"]();
          window["leadcolumn_iouxojsrf7h"] = function () {
            var props = {"iouxojsrf7h":{"animationJSON":null},"io0ibxayz":{"animationJSON":null},"iocrbpj9ab":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.$(this).hasClass("motion-animation")&&window.globalMotionPrivate(e.animationJSON,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadcolumn_iouxojsrf7h"]();
          window["leadtext_ioo25cqczd"] = function () {
            var props = {"ioo25cqczd":{"animationJSON":null},"iokcxqufw2":{"animationJSON":null},"iotetuiwarf":{"animationJSON":null},"ioqarw8cy8":{"animationJSON":null},"iss3pb":{"animationJSON":null},"ilobpt":{"animationJSON":null},"iio27k":{"animationJSON":null},"iox9iftyn5g":{"animationJSON":null},"io0h77m058":{"animationJSON":null},"ipcorj":{"animationJSON":null},"iqfdvh":{"animationJSON":null},"iuwlg9":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.globalMotionPrivate(e.animationJSON,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadtext_ioo25cqczd"]();
          window["leadimages_ioqlziu9xc"] = function () {
            var props = {"ioqlziu9xc":{"animationJSON":null},"iombyjoj15":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.globalMotionPrivate(e.animationJSON,this),window.imageTypeFunc&&window.imageTypeFunc(this)}.bind(el))(props[el.id]);
            }
          };
          window["leadimages_ioqlziu9xc"]();
          window["leadbutton_ihifnx"] = function () {
            var props = {"ihifnx":{"animationJSON":null},"irxzig":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.globalMotionPrivate(e.animationJSON,this),window.buttonTypeFunc&&window.buttonTypeFunc(this)}.bind(el))(props[el.id]);
            }
          };
          window["leadbutton_ihifnx"]();
      if(window.baseFuncNameList && window.baseFuncNameList.length > 0) {
        window.baseFuncNameList = window.baseFuncNameList.concat('leadblockContainer_iob5mkq4rn','leadsectionBg_ioyd37ploc','leadsectionColor_iomn5qt4o1','leadcolumn_iouxojsrf7h','leadtext_ioo25cqczd','leadimages_ioqlziu9xc','leadbutton_ihifnx')
      } else {
        window.baseFuncNameList = ['leadblockContainer_iob5mkq4rn','leadsectionBg_ioyd37ploc','leadsectionColor_iomn5qt4o1','leadcolumn_iouxojsrf7h','leadtext_ioo25cqczd','leadimages_ioqlziu9xc','leadbutton_ihifnx'];
      };window["leadblockContainer_ioscte6fz2"] = function () {
            var props = {"ioscte6fz2":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.$(this).hasClass("motion-animation")&&window.globalMotionPrivate(e.animationJSON,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadblockContainer_ioscte6fz2"]();
          window["leadsectionBg_ioncrd916r"] = function () {
            var props = {"ioncrd916r":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"io5vs38eulh":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"io9kj229zi":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"iipjbrh":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"icd3n22":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"i11ta3p":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){const t=this,{bgMouseEffectSeeting:n}=e||{},{isMouseEffect:o,mouseEffectSpeed:a,isFixedScroll:i}=n||{};o&&"0"!==o&&document.addEventListener("mousemove",(e=>{const{clientX:n,clientY:o}=e,i=window.innerWidth,l=window.innerHeight,s=(n-i/2)/(20/a),r=(o-l/2)/(20/a);t.style.setProperty("--translateX",`${s}px`),t.style.setProperty("--translateY",`${r}px`)}))}.bind(el))(props[el.id]);
            }
          };
          window["leadsectionBg_ioncrd916r"]();
          window["leadsectionColor_io7lvhww95"] = function () {
            var props = {"io7lvhww95":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"ioq13tbxev":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"ioi7skbjppl":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"icrv5mx":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"ikk3rpj":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"ib7o4fn":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){const t=this,{bgMouseEffectSeeting:n}=e||{},{isMouseEffect:o,mouseEffectSpeed:a}=n||{};o&&"0"!==o&&document.addEventListener("mousemove",(e=>{const{clientX:n,clientY:o}=e,i=window.innerWidth,l=window.innerHeight,s=(n-i/2)/(20/a),r=(o-l/2)/(20/a);t.style.setProperty("--translateX",`${s}px`),t.style.setProperty("--translateY",`${r}px`)}))}.bind(el))(props[el.id]);
            }
          };
          window["leadsectionColor_io7lvhww95"]();
          window["leadtext_io22iei59t"] = function () {
            var props = {"io22iei59t":{"animationJSON":null},"ioaekyjq4e":{"animationJSON":null},"ioh3cu6bm2":{"animationJSON":null},"iotw7b30zpf":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.globalMotionPrivate(e.animationJSON,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadtext_io22iei59t"]();
          window["leadrowContainer_iofzefrbte"] = function () {
            var props = {"iofzefrbte":{"sliderOption":{"compntSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"compntPadSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"styleModel":{"bgModel":true,"otherModel":{"all":true}},"compntPhoneSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"sliderType":"slick"},"isSlider":false,"changeFlag":false},"ihblzbe":{"sliderOption":{"compntSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"compntPadSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"styleModel":{"bgModel":true,"otherModel":{"all":true}},"compntPhoneSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"sliderType":"slick"},"isSlider":false,"changeFlag":false},"iprfu7n":{"sliderOption":{"compntSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"compntPadSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"styleModel":{"bgModel":true,"otherModel":{"all":true}},"compntPhoneSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"sliderType":"slick"},"isSlider":false,"changeFlag":false},"listRowSettingContainer_72226230fd8b4bf29edb4716caddb54d":{"sliderOption":{"compntSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"compntPadSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"styleModel":{"bgModel":true,"otherModel":{"all":true}},"compntPhoneSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"sliderType":"slick"},"isSlider":false,"changeFlag":false}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){e.isSlider&&window.rowSliderFunc&&window.rowSliderFunc(e,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadrowContainer_iofzefrbte"]();
          window["leadcolumn_iojcjec7tek"] = function () {
            var props = {"iojcjec7tek":{"animationJSON":null},"i3m0jus":{"animationJSON":null},"iy2f1mb":{"animationJSON":null},"inlbxen":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.$(this).hasClass("motion-animation")&&window.globalMotionPrivate(e.animationJSON,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadcolumn_iojcjec7tek"]();
          window["leadtabContainer_iovqln1y4r"] = function () {
            var props = {"iovqln1y4r":{"classactive":"tab-active","selectortab":"aria-controls","changeTabWay":"click","changeFlag":false}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.editorTabFunc&&window.editorTabFunc(e,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadtabContainer_iovqln1y4r"]();
      if(window.baseFuncNameList && window.baseFuncNameList.length > 0) {
        window.baseFuncNameList = window.baseFuncNameList.concat('leadblockContainer_ioscte6fz2','leadsectionBg_ioncrd916r','leadsectionColor_io7lvhww95','leadtext_io22iei59t','leadcolumn_iojcjec7tek','leadtabContainer_iovqln1y4r')
      } else {
        window.baseFuncNameList = ['leadblockContainer_ioscte6fz2','leadsectionBg_ioncrd916r','leadsectionColor_io7lvhww95','leadtext_io22iei59t','leadcolumn_iojcjec7tek','leadtabContainer_iovqln1y4r'];
      };window["leadblockContainer_io7wwteh8hi"] = function () {
            var props = {"io7wwteh8hi":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.$(this).hasClass("motion-animation")&&window.globalMotionPrivate(e.animationJSON,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadblockContainer_io7wwteh8hi"]();
          window["leadsectionBg_io2ek84yah"] = function () {
            var props = {"io2ek84yah":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"inrjsi":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"io10kn7rbq":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"iaex8w":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"i72hy8":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"ioafa0n491":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"iklhqd":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"i2ihuo":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"ij9oku":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"idsgfv":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"inilp1":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"irra8m":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){const t=this,{bgMouseEffectSeeting:n}=e||{},{isMouseEffect:o,mouseEffectSpeed:a,isFixedScroll:i}=n||{};o&&"0"!==o&&document.addEventListener("mousemove",(e=>{const{clientX:n,clientY:o}=e,i=window.innerWidth,l=window.innerHeight,s=(n-i/2)/(20/a),r=(o-l/2)/(20/a);t.style.setProperty("--translateX",`${s}px`),t.style.setProperty("--translateY",`${r}px`)}))}.bind(el))(props[el.id]);
            }
          };
          window["leadsectionBg_io2ek84yah"]();
          window["leadsectionColor_iop0tbmtsn"] = function () {
            var props = {"iop0tbmtsn":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"i2w5ie":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"iol2xwy8od":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"ivh0ir":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"iymbeg":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"i14f87":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"ioo6bvi3br":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"i7eeft":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"i45jgm":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"i552lk":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"i0cshm":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"if5t6u":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"ixvbt5":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"igrrdr":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"irxyae":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){const t=this,{bgMouseEffectSeeting:n}=e||{},{isMouseEffect:o,mouseEffectSpeed:a}=n||{};o&&"0"!==o&&document.addEventListener("mousemove",(e=>{const{clientX:n,clientY:o}=e,i=window.innerWidth,l=window.innerHeight,s=(n-i/2)/(20/a),r=(o-l/2)/(20/a);t.style.setProperty("--translateX",`${s}px`),t.style.setProperty("--translateY",`${r}px`)}))}.bind(el))(props[el.id]);
            }
          };
          window["leadsectionColor_iop0tbmtsn"]();
          window["leadrowContainer_ioyk3m6hvj"] = function () {
            var props = {"ioyk3m6hvj":{"sliderOption":{"compntSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"compntPadSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"styleModel":{"bgModel":true,"otherModel":{"all":true}},"compntPhoneSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"sliderType":"slick"},"isSlider":false,"changeFlag":false},"izwxmc":{"sliderOption":{"compntSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"compntPadSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"styleModel":{"bgModel":true,"otherModel":{"all":true}},"compntPhoneSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"sliderType":"slick"},"isSlider":false,"changeFlag":false},"idinem":{"sliderOption":{"compntSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"compntPadSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"styleModel":{"bgModel":true,"otherModel":{"all":true}},"compntPhoneSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"sliderType":"slick"},"isSlider":false,"changeFlag":false},"iltret":{"sliderOption":{"compntSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"compntPadSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"styleModel":{"bgModel":true,"otherModel":{"all":true}},"compntPhoneSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"sliderType":"slick"},"isSlider":false,"changeFlag":false}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){e.isSlider&&window.rowSliderFunc&&window.rowSliderFunc(e,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadrowContainer_ioyk3m6hvj"]();
          window["leadcolumn_ioer6kkpj"] = function () {
            var props = {"ioer6kkpj":{"animationJSON":null},"idyy3v":{"animationJSON":null},"ioma7sew78":{"animationJSON":null},"iszg9f":{"animationJSON":null},"ixu6t7":{"animationJSON":null},"i22rmh":{"animationJSON":null},"i1k8qh":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.$(this).hasClass("motion-animation")&&window.globalMotionPrivate(e.animationJSON,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadcolumn_ioer6kkpj"]();
          window["leadtext_iocxqgizjr"] = function () {
            var props = {"iocxqgizjr":{"animationJSON":null},"ioyc1se8xx":{"animationJSON":null},"iir7sf":{"animationJSON":null},"i6ck2f":{"animationJSON":null},"ioh6aixbpd":{"animationJSON":null},"ioy3s9zit6":{"animationJSON":null},"iex1k9":{"animationJSON":null},"i5d9rc":{"animationJSON":null},"iti05o":{"animationJSON":null},"ik90o8":{"animationJSON":null},"itov8f":{"animationJSON":null},"iosou8":{"animationJSON":null},"ir63k4":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.globalMotionPrivate(e.animationJSON,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadtext_iocxqgizjr"]();
          window["leadtabContainer_iohx4xk99y"] = function () {
            var props = {"iohx4xk99y":{"classactive":"tab-active","selectortab":"aria-controls","changeTabWay":"hover","changeFlag":true}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.editorTabFunc&&window.editorTabFunc(e,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadtabContainer_iohx4xk99y"]();
          window["leadimages_idls1h"] = function () {
            var props = {"idls1h":{"animationJSON":null},"iznubs":{"animationJSON":null},"iaazp9":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.globalMotionPrivate(e.animationJSON,this),window.imageTypeFunc&&window.imageTypeFunc(this)}.bind(el))(props[el.id]);
            }
          };
          window["leadimages_idls1h"]();
          window["leadbutton_idpk1i"] = function () {
            var props = {"idpk1i":{"animationJSON":null},"iiptbo":{"animationJSON":null},"ibtwik":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.globalMotionPrivate(e.animationJSON,this),window.buttonTypeFunc&&window.buttonTypeFunc(this)}.bind(el))(props[el.id]);
            }
          };
          window["leadbutton_idpk1i"]();
      if(window.baseFuncNameList && window.baseFuncNameList.length > 0) {
        window.baseFuncNameList = window.baseFuncNameList.concat('leadblockContainer_io7wwteh8hi','leadsectionBg_io2ek84yah','leadsectionColor_iop0tbmtsn','leadcolumn_ioer6kkpj','leadtext_iocxqgizjr','leadtabContainer_iohx4xk99y','leadimages_idls1h','leadbutton_idpk1i')
      } else {
        window.baseFuncNameList = ['leadblockContainer_io7wwteh8hi','leadsectionBg_io2ek84yah','leadsectionColor_iop0tbmtsn','leadcolumn_ioer6kkpj','leadtext_iocxqgizjr','leadtabContainer_iohx4xk99y','leadimages_idls1h','leadbutton_idpk1i'];
      };window["leadblockContainer_irmh"] = function () {
            var props = {"irmh":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.$(this).hasClass("motion-animation")&&window.globalMotionPrivate(e.animationJSON,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadblockContainer_irmh"]();
          window["leadrowContainer_idxg9"] = function () {
            var props = {"idxg9":{"sliderOption":{"compntSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"compntPadSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"styleModel":{"bgModel":true,"otherModel":{"all":true}},"compntPhoneSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"sliderType":"slick"},"isSlider":false,"changeFlag":false}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){e.isSlider&&window.rowSliderFunc&&window.rowSliderFunc(e,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadrowContainer_idxg9"]();
          window["leadsectionBg_ik5pef"] = function () {
            var props = {"ik5pef":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"i8pwl5":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){const t=this,{bgMouseEffectSeeting:n}=e||{},{isMouseEffect:o,mouseEffectSpeed:a,isFixedScroll:i}=n||{};o&&"0"!==o&&document.addEventListener("mousemove",(e=>{const{clientX:n,clientY:o}=e,i=window.innerWidth,l=window.innerHeight,s=(n-i/2)/(20/a),r=(o-l/2)/(20/a);t.style.setProperty("--translateX",`${s}px`),t.style.setProperty("--translateY",`${r}px`)}))}.bind(el))(props[el.id]);
            }
          };
          window["leadsectionBg_ik5pef"]();
          window["leadsectionColor_i0mda6"] = function () {
            var props = {"i0mda6":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"iyt023":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"ie33ai":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"i3to7o":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){const t=this,{bgMouseEffectSeeting:n}=e||{},{isMouseEffect:o,mouseEffectSpeed:a}=n||{};o&&"0"!==o&&document.addEventListener("mousemove",(e=>{const{clientX:n,clientY:o}=e,i=window.innerWidth,l=window.innerHeight,s=(n-i/2)/(20/a),r=(o-l/2)/(20/a);t.style.setProperty("--translateX",`${s}px`),t.style.setProperty("--translateY",`${r}px`)}))}.bind(el))(props[el.id]);
            }
          };
          window["leadsectionColor_i0mda6"]();
          window["leadcolumn_i78xqe"] = function () {
            var props = {"i78xqe":{"animationJSON":null},"irgcj":{"animationJSON":null},"innrpm":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.$(this).hasClass("motion-animation")&&window.globalMotionPrivate(e.animationJSON,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadcolumn_i78xqe"]();
          window["leadtext_i9qjjm"] = function () {
            var props = {"i9qjjm":{"animationJSON":null},"i9as66":{"animationJSON":null},"ig3pg":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.globalMotionPrivate(e.animationJSON,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadtext_i9qjjm"]();
          window["leadbutton_isi4zh"] = function () {
            var props = {"isi4zh":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.globalMotionPrivate(e.animationJSON,this),window.buttonTypeFunc&&window.buttonTypeFunc(this)}.bind(el))(props[el.id]);
            }
          };
          window["leadbutton_isi4zh"]();
      if(window.baseFuncNameList && window.baseFuncNameList.length > 0) {
        window.baseFuncNameList = window.baseFuncNameList.concat('leadblockContainer_irmh','leadsectionBg_ik5pef','leadsectionColor_i0mda6','leadcolumn_i78xqe','leadtext_i9qjjm','leadbutton_isi4zh')
      } else {
        window.baseFuncNameList = ['leadblockContainer_irmh','leadsectionBg_ik5pef','leadsectionColor_i0mda6','leadcolumn_i78xqe','leadtext_i9qjjm','leadbutton_isi4zh'];
      };window["leadblockContainer_iool9e677p"] = function () {
            var props = {"iool9e677p":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.$(this).hasClass("motion-animation")&&window.globalMotionPrivate(e.animationJSON,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadblockContainer_iool9e677p"]();
          window["leadsectionBg_iocrqk7ong"] = function () {
            var props = {"iocrqk7ong":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"ijlq9u":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"ifmw46":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"iyx7fn":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"i9dmn4":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"i0x6ox":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"i38mtq":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"i2z8q7":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"i835x4":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"isli7j":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"iolbud":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"iyolyj":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"ii8652f":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"ikwa6kz":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"i2stu1l":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"itwkve":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){const t=this,{bgMouseEffectSeeting:n}=e||{},{isMouseEffect:o,mouseEffectSpeed:a,isFixedScroll:i}=n||{};o&&"0"!==o&&document.addEventListener("mousemove",(e=>{const{clientX:n,clientY:o}=e,i=window.innerWidth,l=window.innerHeight,s=(n-i/2)/(20/a),r=(o-l/2)/(20/a);t.style.setProperty("--translateX",`${s}px`),t.style.setProperty("--translateY",`${r}px`)}))}.bind(el))(props[el.id]);
            }
          };
          window["leadsectionBg_iocrqk7ong"]();
          window["leadsectionColor_iohaygg8v"] = function () {
            var props = {"iohaygg8v":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"i0qgvb":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"io8fti":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"il8o3p":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"ixc8ln":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"i0gtis":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"imp9to":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"i05apm":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"icdq88":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"ivpkvp":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"i8bbrt":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"ixnhpn":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"i0k1lb2":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"iihrx44":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"i0cnxqj":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"imyqma":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"iosqqgacg2":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"im9mfj":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){const t=this,{bgMouseEffectSeeting:n}=e||{},{isMouseEffect:o,mouseEffectSpeed:a}=n||{};o&&"0"!==o&&document.addEventListener("mousemove",(e=>{const{clientX:n,clientY:o}=e,i=window.innerWidth,l=window.innerHeight,s=(n-i/2)/(20/a),r=(o-l/2)/(20/a);t.style.setProperty("--translateX",`${s}px`),t.style.setProperty("--translateY",`${r}px`)}))}.bind(el))(props[el.id]);
            }
          };
          window["leadsectionColor_iohaygg8v"]();
          window["leadtext_io6jzhwwfcl"] = function () {
            var props = {"io6jzhwwfcl":{"animationJSON":null},"ionc9gu9kh":{"animationJSON":null},"ioji9o2cdhk":{"animationJSON":null},"iojfyacm2d":{"animationJSON":null},"imuls2":{"animationJSON":null},"ibj7zi":{"animationJSON":null},"ilibp1":{"animationJSON":null},"ifcjrf":{"animationJSON":null},"i5vdeoq":{"animationJSON":null},"idtacmj":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.globalMotionPrivate(e.animationJSON,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadtext_io6jzhwwfcl"]();
          window["leadrowContainer_i9c70b"] = function () {
            var props = {"i9c70b":{"sliderOption":{"compntSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"compntPadSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"styleModel":{"bgModel":true,"otherModel":{"all":true}},"compntPhoneSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"sliderType":"slick"},"isSlider":false,"changeFlag":false},"itne0x":{"sliderOption":{"compntSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"compntPadSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"styleModel":{"bgModel":true,"otherModel":{"all":true}},"compntPhoneSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"sliderType":"slick"},"isSlider":false,"changeFlag":false},"i2gcye":{"sliderOption":{"compntSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"compntPadSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"styleModel":{"bgModel":true,"otherModel":{"all":true}},"compntPhoneSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"sliderType":"slick"},"isSlider":false,"changeFlag":false},"ip8pbh":{"sliderOption":{"compntSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"compntPadSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"styleModel":{"bgModel":true,"otherModel":{"all":true}},"compntPhoneSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"sliderType":"slick"},"isSlider":false,"changeFlag":false},"iokh5z7":{"sliderOption":{"compntSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"compntPadSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"styleModel":{"bgModel":true,"otherModel":{"all":true}},"compntPhoneSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"sliderType":"slick"},"isSlider":false,"changeFlag":false}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){e.isSlider&&window.rowSliderFunc&&window.rowSliderFunc(e,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadrowContainer_i9c70b"]();
          window["leadcolumn_i1miel"] = function () {
            var props = {"i1miel":{"animationJSON":null},"iuczqi":{"animationJSON":null},"iuk0ok":{"animationJSON":null},"iufi7l":{"animationJSON":null},"ipg933":{"animationJSON":null},"i8jfqf":{"animationJSON":null},"i877x9":{"animationJSON":null},"i52pfgw":{"animationJSON":null},"i0yzg6d":{"animationJSON":null},"i42x4k":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.$(this).hasClass("motion-animation")&&window.globalMotionPrivate(e.animationJSON,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadcolumn_i1miel"]();
          window["leadiconContainer_ixtoqb"] = function () {
            var props = {"ixtoqb":{"animationJSON":null},"iro9m8":{"animationJSON":null},"itjsc3":{"animationJSON":null},"iih9vrh":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.globalMotionPrivate(e.animationJSON,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadiconContainer_ixtoqb"]();
          window["leadimages_io8rgumuda"] = function () {
            var props = {"io8rgumuda":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.globalMotionPrivate(e.animationJSON,this),window.imageTypeFunc&&window.imageTypeFunc(this)}.bind(el))(props[el.id]);
            }
          };
          window["leadimages_io8rgumuda"]();
      if(window.baseFuncNameList && window.baseFuncNameList.length > 0) {
        window.baseFuncNameList = window.baseFuncNameList.concat('leadblockContainer_iool9e677p','leadsectionBg_iocrqk7ong','leadsectionColor_iohaygg8v','leadtext_io6jzhwwfcl','leadcolumn_i1miel','leadiconContainer_ixtoqb','leadimages_io8rgumuda')
      } else {
        window.baseFuncNameList = ['leadblockContainer_iool9e677p','leadsectionBg_iocrqk7ong','leadsectionColor_iohaygg8v','leadtext_io6jzhwwfcl','leadcolumn_i1miel','leadiconContainer_ixtoqb','leadimages_io8rgumuda'];
      };window["leadblockContainer_iok67l2cqdh"] = function () {
            var props = {"iok67l2cqdh":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.$(this).hasClass("motion-animation")&&window.globalMotionPrivate(e.animationJSON,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadblockContainer_iok67l2cqdh"]();
          window["leadsectionBg_ib3nzhc"] = function () {
            var props = {"ib3nzhc":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"i5hipti":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"iodrfh1":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"ifr9anf":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"i87ygdy":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){const t=this,{bgMouseEffectSeeting:n}=e||{},{isMouseEffect:o,mouseEffectSpeed:a,isFixedScroll:i}=n||{};o&&"0"!==o&&document.addEventListener("mousemove",(e=>{const{clientX:n,clientY:o}=e,i=window.innerWidth,l=window.innerHeight,s=(n-i/2)/(20/a),r=(o-l/2)/(20/a);t.style.setProperty("--translateX",`${s}px`),t.style.setProperty("--translateY",`${r}px`)}))}.bind(el))(props[el.id]);
            }
          };
          window["leadsectionBg_ib3nzhc"]();
          window["leadsectionColor_iofji0r6qu"] = function () {
            var props = {"iofji0r6qu":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"iov057fi1c":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"iownf1ozfx":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"iodq9s2y0tl":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"io7ba268yf":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"io2xnbqml2":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"ioy3kxuaop":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"io2cfa1k07":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"ioglboghdx":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){const t=this,{bgMouseEffectSeeting:n}=e||{},{isMouseEffect:o,mouseEffectSpeed:a}=n||{};o&&"0"!==o&&document.addEventListener("mousemove",(e=>{const{clientX:n,clientY:o}=e,i=window.innerWidth,l=window.innerHeight,s=(n-i/2)/(20/a),r=(o-l/2)/(20/a);t.style.setProperty("--translateX",`${s}px`),t.style.setProperty("--translateY",`${r}px`)}))}.bind(el))(props[el.id]);
            }
          };
          window["leadsectionColor_iofji0r6qu"]();
          window["leadrowContainer_ion9yy0dex"] = function () {
            var props = {"ion9yy0dex":{"sliderOption":{"compntSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"compntPadSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"styleModel":{"bgModel":true,"otherModel":{"all":true}},"compntPhoneSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"sliderType":"slick"},"isSlider":false,"changeFlag":false},"ior7l8squn":{"sliderOption":{"compntSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"compntPadSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"styleModel":{"bgModel":true,"otherModel":{"all":true}},"compntPhoneSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"sliderType":"slick"},"isSlider":false,"changeFlag":false}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){e.isSlider&&window.rowSliderFunc&&window.rowSliderFunc(e,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadrowContainer_ion9yy0dex"]();
          window["leadcolumn_iopudkym7d"] = function () {
            var props = {"iopudkym7d":{"animationJSON":null},"iog7uumrxd":{"animationJSON":null},"ioqneoimej":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.$(this).hasClass("motion-animation")&&window.globalMotionPrivate(e.animationJSON,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadcolumn_iopudkym7d"]();
          window["leadtext_iobmg3w61zl"] = function () {
            var props = {"iobmg3w61zl":{"animationJSON":null},"iopi08rllp":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.globalMotionPrivate(e.animationJSON,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadtext_iobmg3w61zl"]();
          window["leadcoverType_iole8msqdrg"] = function () {
            var items = document.querySelectorAll('#iole8msqdrg, #ioj50k1v3ql, #iorb6xjkbsf, #iofpo6tgud');
            for (var i = 0, len = items.length; i < len; i++) {
              (function(){
                window.videoCoverFunc&&window.videoCoverFunc(this)
              }.bind(items[i]))();
            }
          };
          window["leadcoverType_iole8msqdrg"]();
          window["leadvideoType_iocu2c4wyu"] = function () {
            var items = document.querySelectorAll('#iocu2c4wyu, #ioqbmqv6fv, #iosbgdamvr, #iobtqfpzg');
            for (var i = 0, len = items.length; i < len; i++) {
              (function(){
                window.videoScriptFunc&&window.videoScriptFunc(this)
              }.bind(items[i]))();
            }
          };
          window["leadvideoType_iocu2c4wyu"]();
      if(window.baseFuncNameList && window.baseFuncNameList.length > 0) {
        window.baseFuncNameList = window.baseFuncNameList.concat('leadblockContainer_iok67l2cqdh','leadsectionBg_ib3nzhc','leadsectionColor_iofji0r6qu','leadcolumn_iopudkym7d','leadtext_iobmg3w61zl','leadcoverType_iole8msqdrg','leadvideoType_iocu2c4wyu')
      } else {
        window.baseFuncNameList = ['leadblockContainer_iok67l2cqdh','leadsectionBg_ib3nzhc','leadsectionColor_iofji0r6qu','leadcolumn_iopudkym7d','leadtext_iobmg3w61zl','leadcoverType_iole8msqdrg','leadvideoType_iocu2c4wyu'];
      };window["leadblockContainer_iovv9dxjwc"] = function () {
            var props = {"iovv9dxjwc":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.$(this).hasClass("motion-animation")&&window.globalMotionPrivate(e.animationJSON,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadblockContainer_iovv9dxjwc"]();
          window["leadsectionBg_io0pkkm8dd"] = function () {
            var props = {"io0pkkm8dd":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"ionfar5tjjg":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"iozjdp3nvz":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){const t=this,{bgMouseEffectSeeting:n}=e||{},{isMouseEffect:o,mouseEffectSpeed:a,isFixedScroll:i}=n||{};o&&"0"!==o&&document.addEventListener("mousemove",(e=>{const{clientX:n,clientY:o}=e,i=window.innerWidth,l=window.innerHeight,s=(n-i/2)/(20/a),r=(o-l/2)/(20/a);t.style.setProperty("--translateX",`${s}px`),t.style.setProperty("--translateY",`${r}px`)}))}.bind(el))(props[el.id]);
            }
          };
          window["leadsectionBg_io0pkkm8dd"]();
          window["leadsectionColor_iokyxesgzy"] = function () {
            var props = {"iokyxesgzy":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"iom89dmxse":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"iov6vywobu":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"iokk3w3y6c":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"iojy3umeu2":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"iooi4nokul":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"ioqnv19vdck":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"ioior7t6qc":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"iovcw2v3tfl":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"io698w6bew":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"i4fn96":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"ids2pa":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){const t=this,{bgMouseEffectSeeting:n}=e||{},{isMouseEffect:o,mouseEffectSpeed:a}=n||{};o&&"0"!==o&&document.addEventListener("mousemove",(e=>{const{clientX:n,clientY:o}=e,i=window.innerWidth,l=window.innerHeight,s=(n-i/2)/(20/a),r=(o-l/2)/(20/a);t.style.setProperty("--translateX",`${s}px`),t.style.setProperty("--translateY",`${r}px`)}))}.bind(el))(props[el.id]);
            }
          };
          window["leadsectionColor_iokyxesgzy"]();
          window["leadtext_ioakjrqft9"] = function () {
            var props = {"ioakjrqft9":{"animationJSON":null},"iokvudqxgqi":{"animationJSON":null},"ioysro37xt":{"animationJSON":null},"io89scsk12":{"animationJSON":null},"ioemrdmk65":{"animationJSON":null},"iouha41lkh":{"animationJSON":null},"io1oq4b08ak":{"animationJSON":null},"iozufpfcua":{"animationJSON":null},"ioqy9pvrb7":{"animationJSON":null},"io1wqk4lgfl":{"animationJSON":null},"iole9rynia":{"animationJSON":null},"ikuszl":{"animationJSON":null},"inpsr4":{"animationJSON":null},"io9wp6":{"animationJSON":null},"i5iujo":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.globalMotionPrivate(e.animationJSON,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadtext_ioakjrqft9"]();
          window["leadrowContainer_iorn0h7jgk"] = function () {
            var props = {"iorn0h7jgk":{"sliderOption":{"compntSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"compntPadSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"styleModel":{"bgModel":true,"otherModel":{"all":true}},"compntPhoneSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"sliderType":"slick"},"isSlider":false,"changeFlag":false}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){e.isSlider&&window.rowSliderFunc&&window.rowSliderFunc(e,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadrowContainer_iorn0h7jgk"]();
          window["leadcolumn_iof7kmqee9"] = function () {
            var props = {"iof7kmqee9":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.$(this).hasClass("motion-animation")&&window.globalMotionPrivate(e.animationJSON,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadcolumn_iof7kmqee9"]();
          window["leadaccordionContainer_iom21lzzsv"] = function () {
            var props = {"iom21lzzsv":{"classactive":"accordion-active","selectoraccordion":"aria-controls","cpmSetting":{"defaultStyle":"first","closeWay":"close","position":"row","iconOpenClass":"icon iconfont_phoenix lead_icon icon-angle-up","iconCloseClass":"icon iconfont_phoenix lead_icon icon-angle-down"},"changeFlag":true}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.editorAccordionFunc&&window.editorAccordionFunc(e,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadaccordionContainer_iom21lzzsv"]();
      if(window.baseFuncNameList && window.baseFuncNameList.length > 0) {
        window.baseFuncNameList = window.baseFuncNameList.concat('leadblockContainer_iovv9dxjwc','leadsectionBg_io0pkkm8dd','leadsectionColor_iokyxesgzy','leadtext_ioakjrqft9','leadcolumn_iof7kmqee9','leadaccordionContainer_iom21lzzsv')
      } else {
        window.baseFuncNameList = ['leadblockContainer_iovv9dxjwc','leadsectionBg_io0pkkm8dd','leadsectionColor_iokyxesgzy','leadtext_ioakjrqft9','leadcolumn_iof7kmqee9','leadaccordionContainer_iom21lzzsv'];
      };window["leadblockContainer_ioa84gat0v"] = function () {
            var props = {"ioa84gat0v":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.$(this).hasClass("motion-animation")&&window.globalMotionPrivate(e.animationJSON,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadblockContainer_ioa84gat0v"]();
          window["leadsectionBg_ioj02sqg9ah"] = function () {
            var props = {"ioj02sqg9ah":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"iotre8kyyd":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"iowd13srsz":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"ioje17mdlv":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"iou3mz07mb":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"iow014ar2j":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"io1g9xu583":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"io6n9vm8l4h":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"iok6f8h06y":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"ioi1f3phbl":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"iohlk2ae3e":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"io602ezps1":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"iozkdfkpqqk":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){const t=this,{bgMouseEffectSeeting:n}=e||{},{isMouseEffect:o,mouseEffectSpeed:a,isFixedScroll:i}=n||{};o&&"0"!==o&&document.addEventListener("mousemove",(e=>{const{clientX:n,clientY:o}=e,i=window.innerWidth,l=window.innerHeight,s=(n-i/2)/(20/a),r=(o-l/2)/(20/a);t.style.setProperty("--translateX",`${s}px`),t.style.setProperty("--translateY",`${r}px`)}))}.bind(el))(props[el.id]);
            }
          };
          window["leadsectionBg_ioj02sqg9ah"]();
          window["leadsectionColor_io5wmfw11o"] = function () {
            var props = {"io5wmfw11o":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"ioncytbqwl":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"io6ftxlr2p":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"iomyyvr3jg":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"io2sagf9sx":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"iocseyey2h":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"io9xljkpik":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"ioblqza6fo":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"ionun1ie5f":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"io0vtn2ndc":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"ioxqwh1lqok":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"io7s8s6f01":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"io5kf7q6q":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"ioul37cvll":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"io4gb6sk96":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){const t=this,{bgMouseEffectSeeting:n}=e||{},{isMouseEffect:o,mouseEffectSpeed:a}=n||{};o&&"0"!==o&&document.addEventListener("mousemove",(e=>{const{clientX:n,clientY:o}=e,i=window.innerWidth,l=window.innerHeight,s=(n-i/2)/(20/a),r=(o-l/2)/(20/a);t.style.setProperty("--translateX",`${s}px`),t.style.setProperty("--translateY",`${r}px`)}))}.bind(el))(props[el.id]);
            }
          };
          window["leadsectionColor_io5wmfw11o"]();
          window["leadrowContainer_io32izrxo6"] = function () {
            var props = {"io32izrxo6":{"sliderOption":{"compntSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"compntPadSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"styleModel":{"bgModel":true,"otherModel":{"all":true}},"compntPhoneSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"sliderType":"slick"},"isSlider":false,"changeFlag":false},"iop9rqvfff":{"sliderOption":{"compntSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"compntPadSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"styleModel":{"bgModel":true,"otherModel":{"all":true}},"compntPhoneSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"sliderType":"slick"},"isSlider":false,"changeFlag":false},"io2qi302qz":{"sliderOption":{"compntSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"compntPadSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"styleModel":{"bgModel":true,"otherModel":{"all":true}},"compntPhoneSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"sliderType":"slick"},"isSlider":false,"changeFlag":false},"ioblgzuqxb":{"sliderOption":{"compntSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"compntPadSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"styleModel":{"bgModel":true,"otherModel":{"all":true}},"compntPhoneSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"sliderType":"slick"},"isSlider":false,"changeFlag":false}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){e.isSlider&&window.rowSliderFunc&&window.rowSliderFunc(e,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadrowContainer_io32izrxo6"]();
          window["leadcolumn_iogwh71r8u"] = function () {
            var props = {"iogwh71r8u":{"animationJSON":null},"io1u03frsv":{"animationJSON":null},"iov9vtv992":{"animationJSON":null},"iolofjxvc9":{"animationJSON":null},"iob8ahtvir":{"animationJSON":null},"ioxkx7mbqxf":{"animationJSON":null},"io9zyvr61w":{"animationJSON":null},"io58vux5ou":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.$(this).hasClass("motion-animation")&&window.globalMotionPrivate(e.animationJSON,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadcolumn_iogwh71r8u"]();
          window["leadimages_iodfo43pfi"] = function () {
            var props = {"iodfo43pfi":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.globalMotionPrivate(e.animationJSON,this),window.imageTypeFunc&&window.imageTypeFunc(this)}.bind(el))(props[el.id]);
            }
          };
          window["leadimages_iodfo43pfi"]();
          window["leadtext_iosp2vxlqi"] = function () {
            var props = {"iosp2vxlqi":{"animationJSON":null},"ioyv78ft4n":{"animationJSON":null},"iouoectt0h":{"animationJSON":null},"ij9pi1j":{"animationJSON":null},"iop9h5tr48":{"animationJSON":null},"ic1iwsn":{"animationJSON":null},"iot2rq7piz":{"animationJSON":null},"iqm81sp":{"animationJSON":null},"io9e7pofa4":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.globalMotionPrivate(e.animationJSON,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadtext_iosp2vxlqi"]();
          window["leadiconContainer_iofvpmjbf9"] = function () {
            var props = {"iofvpmjbf9":{"animationJSON":null},"iocu1vhm9p":{"animationJSON":null},"ions3t5cpq":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.globalMotionPrivate(e.animationJSON,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadiconContainer_iofvpmjbf9"]();
          window["leadbutton_iovd0y95we"] = function () {
            var props = {"iovd0y95we":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.globalMotionPrivate(e.animationJSON,this),window.buttonTypeFunc&&window.buttonTypeFunc(this)}.bind(el))(props[el.id]);
            }
          };
          window["leadbutton_iovd0y95we"]();
      if(window.baseFuncNameList && window.baseFuncNameList.length > 0) {
        window.baseFuncNameList = window.baseFuncNameList.concat('leadblockContainer_ioa84gat0v','leadsectionBg_ioj02sqg9ah','leadsectionColor_io5wmfw11o','leadcolumn_iogwh71r8u','leadimages_iodfo43pfi','leadtext_iosp2vxlqi','leadiconContainer_iofvpmjbf9','leadbutton_iovd0y95we')
      } else {
        window.baseFuncNameList = ['leadblockContainer_ioa84gat0v','leadsectionBg_ioj02sqg9ah','leadsectionColor_io5wmfw11o','leadcolumn_iogwh71r8u','leadimages_iodfo43pfi','leadtext_iosp2vxlqi','leadiconContainer_iofvpmjbf9','leadbutton_iovd0y95we'];
      };window["leadblockContainer_iomek6sxiu"] = function () {
            var props = {"iomek6sxiu":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.$(this).hasClass("motion-animation")&&window.globalMotionPrivate(e.animationJSON,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadblockContainer_iomek6sxiu"]();
          window["leadsectionBg_iol7oqr94w"] = function () {
            var props = {"iol7oqr94w":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"iovukvwhmn":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"ioyfo4olue":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}},"ioj92bmlxh":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1,"isFixedScroll":"scroll","positionY":50}}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){const t=this,{bgMouseEffectSeeting:n}=e||{},{isMouseEffect:o,mouseEffectSpeed:a,isFixedScroll:i}=n||{};o&&"0"!==o&&document.addEventListener("mousemove",(e=>{const{clientX:n,clientY:o}=e,i=window.innerWidth,l=window.innerHeight,s=(n-i/2)/(20/a),r=(o-l/2)/(20/a);t.style.setProperty("--translateX",`${s}px`),t.style.setProperty("--translateY",`${r}px`)}))}.bind(el))(props[el.id]);
            }
          };
          window["leadsectionBg_iol7oqr94w"]();
          window["leadsectionColor_iov3csz0jv"] = function () {
            var props = {"iov3csz0jv":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"io3mj9jgt2":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"io3j61j1wy":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"ioizej1s5b":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"ioc35zth0f":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}},"io2z9kpu66":{"bgMouseEffectSeeting":{"isMouseEffect":"0","mouseEffectSpeed":1}}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){const t=this,{bgMouseEffectSeeting:n}=e||{},{isMouseEffect:o,mouseEffectSpeed:a}=n||{};o&&"0"!==o&&document.addEventListener("mousemove",(e=>{const{clientX:n,clientY:o}=e,i=window.innerWidth,l=window.innerHeight,s=(n-i/2)/(20/a),r=(o-l/2)/(20/a);t.style.setProperty("--translateX",`${s}px`),t.style.setProperty("--translateY",`${r}px`)}))}.bind(el))(props[el.id]);
            }
          };
          window["leadsectionColor_iov3csz0jv"]();
          window["leadrowContainer_ioig2888dg"] = function () {
            var props = {"ioig2888dg":{"sliderOption":{"compntSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"compntPadSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"styleModel":{"bgModel":true,"otherModel":{"all":true}},"compntPhoneSeetings":{"infinite":false,"autoplay":false,"autoplaySpeed":5,"slidesToShow":1,"slidesToScroll":1,"arrowIcon":"<span class=\"icon iconfont_phoenix icon-jiantouzuo-5 lead_icon\" data-gjs-type=\"leadIcon\"></span>","dots":true,"arrows":true,"speed":500,"fade":false},"sliderType":"slick"},"isSlider":false,"changeFlag":false}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){e.isSlider&&window.rowSliderFunc&&window.rowSliderFunc(e,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadrowContainer_ioig2888dg"]();
          window["leadcolumn_io6g9lfpku"] = function () {
            var props = {"io6g9lfpku":{"animationJSON":null},"iokd679czr":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.$(this).hasClass("motion-animation")&&window.globalMotionPrivate(e.animationJSON,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadcolumn_io6g9lfpku"]();
          window["leadtext_iomobpzque"] = function () {
            var props = {"iomobpzque":{"animationJSON":null},"iobid0z19xj":{"animationJSON":null},"i50z2o":{"animationJSON":null},"iosgs0yrd5":{"animationJSON":null},"io2d4iqs5qk":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.globalMotionPrivate(e.animationJSON,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadtext_iomobpzque"]();
          window["leadiconContainer_ioxzikob0g"] = function () {
            var props = {"ioxzikob0g":{"animationJSON":null},"iomd3ak1ol":{"animationJSON":null}};
            var ids = Object.keys(props).map(id => '#' + id).join(',');
            var els = document.querySelectorAll(ids);
            for (var i = 0, len = els.length; i < len; i++) {
              var el = els[i];
              (function(e){window.globalMotionPrivate&&!window.$(this).data("gjsType")&&e.animationJSON&&window.globalMotionPrivate(e.animationJSON,this)}.bind(el))(props[el.id]);
            }
          };
          window["leadiconContainer_ioxzikob0g"]();
      if(window.baseFuncNameList && window.baseFuncNameList.length > 0) {
        window.baseFuncNameList = window.baseFuncNameList.concat('leadblockContainer_iomek6sxiu','leadsectionBg_iol7oqr94w','leadsectionColor_iov3csz0jv','leadcolumn_io6g9lfpku','leadtext_iomobpzque','leadiconContainer_ioxzikob0g')
      } else {
        window.baseFuncNameList = ['leadblockContainer_iomek6sxiu','leadsectionBg_iol7oqr94w','leadsectionColor_iov3csz0jv','leadcolumn_io6g9lfpku','leadtext_iomobpzque','leadiconContainer_ioxzikob0g'];
      };
          if (window.funcNameList && window.funcNameList.length > 0) {
            var resultObject = (function(funcNameList) {
              var obj = {};
              for (var i = 0; i < funcNameList.length; i++) {
                var key = funcNameList[i];
                obj[key] = window[key];
              }
              return obj;
            })(window.funcNameList);

            $.extend(pageVariable, {
              "init": init
            }, resultObject);
          }

      })(window, jQuery);
      
    (function(window, $, undefined) {
      $(function(){
        window._page_editor_namespaces_["pRpKtvPbfVNI_main"].init();
        if (window.funcNameList && window.funcNameList.length > 0) {
          for (var i = 0; i < funcNameList.length; i++) {
            var key = funcNameList[i];
            window._page_editor_namespaces_["pRpKtvPbfVNI_main"][key]();
          }
        }
      });
    })(window, jQuery);

     
      try{
var encypt_productId_resultId = "";
     var encypt_infoId_resultId = "";
    var options = {
            widgetClass: 'sitewidget-form-20240823151243',
            settingId: 'pPUiTLgEejKO',
            productId: '',
            infoId: '',
            encypt_infoId_resultId:encypt_infoId_resultId,
            isArticle: '',
            article: '',
            isShow: 'true',
            encypt_productId_resultId: encypt_productId_resultId,
            encodePkId: '',
            productsJson: '',
            attr_backend_pageId: 'woApYlWFPbRZ',
            refererPage: '',
            _menu_prefix: '',
            component_isFixed:'0',
            component_isFixedStyle:'0',
            component_isFixedDefault:'0',
            component_page_id:'woApYlWFPbRZ',
            component_form_id:'pgpKAZOdDcej',
            component_resultFlag:'0',
            component_showProd:'0',
            component_trackCode:'',
            component_bgcolor:'inherit',
            component_checkBgcolor:'',
            component_placeHoldercolor:'',
            component_fcolor:'',
            component_formStyle:'0',
            component_phoenix_form_upload_limit:"Attachment can&#39;t exceed 30M",
            component_phoenix_from_emptyerror:"This field is required",
            component_phoenix_form_length_error:"The length of this field is invalid",
            component_phoenix_from_mailerror:"invalid email address",
            component_phoenix_from_phoneerror:"Please enter the correct phone number",
            component_phoenix_view_details:"View Details",
    };
    if (phoenixSite.form && phoenixSite.form !== 'undefined' && typeof phoenixSite.form.init == "function") {
        phoenixSite.form.init(options);
    }
    $("#component_pPUiTLgEejKO").find("input.timePicker").each(function(){
        var this_ = $(this);
        this_.attr("placeholder","Select time");
        this_.addClass("inited");
        this_.datepicker({
			dateFormat: 'yyyy/mm/dd',
			autoClose: true
		});
    })
    $("#component_pPUiTLgEejKO .timePickers .timePicker").on("blur",function(){
       if($(this).index() == 0){
            var minDate = $(this).val();
            if(minDate){
                $(this).parent().find(".timePicker").eq(1).datepicker({
                    minDate:new Date(minDate),
                    dateFormat: 'yyyy/mm/dd',
                    autoClose: true
                });
            }else{
                $(this).parent().find(".timePicker").eq(1).datepicker({
                    dateFormat: 'yyyy/mm/dd',
                    autoClose: true
                });
            }
       }
       if($(this).index() == 1){
            var maxDate = $(this).val();
            if(maxDate){
                $(this).parent().find(".timePicker").eq(0).datepicker({
                    maxDate:new Date(maxDate),
                    dateFormat: 'yyyy/mm/dd',
                    autoClose: true
                });
            }else{
                $(this).parent().find(".timePicker").eq(0).datepicker({
                    dateFormat: 'yyyy/mm/dd',
                    autoClose: true
                });
            }
       }
    })
    $("#component_pPUiTLgEejKO .phoneInputprepend").each(function (indexMu,elMu) {
        var twoId = $(elMu).find('input:eq(1)').attr("id")
        var twoName = $(elMu).find('input:eq(1)').attr("name")
        $(elMu).find('input:eq(0)').attr("id",twoId)
        $(elMu).find('input:eq(0)').attr("name",twoName)
    })
    
    $("#component_pPUiTLgEejKO select[multiple]").each(function (indexMu,elMu) {
        var thisId = $(elMu).attr("id")
        var multipleHtml = ''
        multipleHtml += '<div class="multiple-select '+ thisId +'"><span class="placeholder">'+"Please select"+'</span></div>'
        multipleHtml += '<div class="multiple-parent '+ thisId +'"><ul>'
        $(elMu).find("option").each(function (index,el) {
            multipleHtml += '<li>'
            multipleHtml += '<input type="checkbox" name="showData" /><label>'+ $(el).html() +'</label>'
            multipleHtml += '</li>'
        })

        multipleHtml += '</ul></div>'

        $(elMu).parent().append(multipleHtml)
        $("#component_pPUiTLgEejKO .multiple-select."+thisId+" ").on("click",function () {
            if ($("#component_pPUiTLgEejKO .multiple-parent."+thisId+"").css("display") == "none") {
                $("#component_pPUiTLgEejKO .multiple-parent."+thisId+"").css("display", "block")
            } else {
                $("#component_pPUiTLgEejKO .multiple-parent."+thisId+"").css("display", "none")
            }
        })

        $("#component_pPUiTLgEejKO .multiple-parent."+thisId+"").on("click", "li", function (e) {
            e.stopPropagation()
            e.preventDefault()
            var $label = $(this).children("label")
            var input = this.getElementsByTagName("input")[0]
            if (input.checked) {
                input.checked = false
            } else {
                input.checked = true
            }
            //获取所有选项的值
            var contents = [];
            $("#component_pPUiTLgEejKO .multiple-parent."+thisId+" li").each(function (index, elem) {
                if (!$(elem).hasClass("group")) {
                    var ck = $(elem).find("input")[0].checked
                    if (ck) {
                        var html = $(elem).children("label").html();
                        contents.push(html);
                    }
                }
            })
            if (contents.length > 0) {
                $("#component_pPUiTLgEejKO .multiple-select."+thisId+"").empty();
                for (var i = 0; i < contents.length; i++) {
                    var span = "<span class='select-content'><span class='select-value'>"+contents[i]+"</span><span class='select-delete'>&times;</span></span>"
                    $("#component_pPUiTLgEejKO .multiple-select."+thisId+"").append(span)
                }
            } else {
                $("#component_pPUiTLgEejKO .multiple-select."+thisId+"").empty();
                var span = "<span class='placeholder'>"+"Please select"+"</span>"
                $("#component_pPUiTLgEejKO .multiple-select."+thisId+"").append(span)
            }


            $(elMu).val(contents)
        });

        $("#component_pPUiTLgEejKO .multiple-select."+thisId+"").on("click", ".select-delete", function (e) {
            e.stopPropagation()
            var value = $(this).parent().children(".select-value").html();
            $("#component_pPUiTLgEejKO .multiple-parent."+thisId+" ul li").each(function (index, elem) {
                if ($(elem).children("label").html() == value) {
                    elem.getElementsByTagName("input")[0].checked = false;
                }
            })
            $(this).parent().remove();
            var len = $("#component_pPUiTLgEejKO .multiple-select."+thisId+"").children().length;
            if (len == 0) {
                var span = "<span class='placeholder'>"+"Please select"+"</span>"
                $("#component_pPUiTLgEejKO .multiple-select."+thisId+"").append(span)
            }

            var contents = [];
            $("#component_pPUiTLgEejKO .multiple-parent."+thisId+" li").each(function (index, elem) {
                if (!$(elem).hasClass("group")) {
                    var ck = $(elem).find("input")[0].checked
                    if (ck) {
                        var html = $(elem).children("label").html();
                        contents.push(html);
                    }
                }
            })
            $(elMu).val(contents)
        })
    })
}catch(e){try{console && console.log && console.log(e);}catch(e){}}try{
(function(window,jQuery,undefined){
				// 组件包裹框注册
				$(function(){
					$_phoenix.pagefunc.component_management.setup('pPUiTLgEejKO',{title: '在线表单'});
					var widget = "sitewidget-form-20240823151243";
				});
			})(window,jQuery)
}catch(e){try{console && console.log && console.log(e);}catch(e){}}
      
         const defaultSettings = {
  root: null,
  rootMargin: "0px",
  threshold: [0],
  onFinish: function() {},
  onStart: function() {}
};

class Animation {
  constructor(selector, options = {}) {
      this.nodes = typeof selector === 'string' ? document.querySelectorAll(selector) : [selector];
      this.settings = { ...defaultSettings, ...options };

      const observerOptions = {
          root: this.settings.root,
          rootMargin: this.settings.rootMargin,
          threshold: this.settings.threshold
      };

      const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
              if (entry.intersectionRatio > 0) {
                  const target = entry.target;
                  this.settings.onStart();
                  const iterationCount = Number(target.getAttribute("data-lead-iteration-count")) || 1;
                  const iterationCompleted = Number(target.getAttribute("data-lead-iteration-completed")) || 2;

                  if (iterationCompleted >= iterationCount) {
                      observer.unobserve(target);
                  }

                  target.classList.add("lead-animate", "lead-animate-opacity");
                  target.setAttribute("data-lead-iteration-completed", iterationCompleted + 1);
              }
          });
      }, observerOptions);

      const onFinish = this.settings.onFinish;

      this.nodes.forEach((node) => {
          observer.observe(node);
          node.addEventListener("animationend", (event) => {
              event.target.classList.remove("lead-animate");
              onFinish();
          });
      });
  }
}

const animate = new Animation(".lead-animated");


      
  (function(window, undefined) {
    window.onbeforeunload = function() {
      console.log('User is leaving the page...');
      window?.parent?.postMessage('onbeforeunload','*');
    };
  })(window);

    