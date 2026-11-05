(function (window, $, undefined) {
    /** 模板只保留分页字段与本实例选项，移动排列由 CDN 公共模块管理。 */
    var MOBILE_LIST = {
        loadSelector: 'input[type="hidden"][name="loadMethod"]',
        flatLoad: '1',
        arrangementSelector: 'input[type="hidden"][name="mobileArrangement"]',
        rootSelector: '.dynamic-list-container',
        configSelector: '.prodlist-site-footer',
        listSelector: '.block-prodlist-container-replace',
        itemSelector: '.list-item-container',
        maxColumns: 4,
        fallbackColumns: 2,
        fallbackVariable: '--list-columns'
    };
    var _block_namespaces_ = window._block_namespaces_ || (window._block_namespaces_ = {});
    var name = "prodlist_mini";
    var prodlist_mini = _block_namespaces_[name] || (_block_namespaces_[name] = {});
    var controllers = {};
    $.extend(prodlist_mini, {
        "init": init,
        "prodLabelPublic": prodLabelPublic,
        "destroy": destroy
    })

    function init(nodeObj) {
        nodeObj = nodeObj || {};
        var nodeId = String(nodeObj.nodeId || '');
        var $selector = $('[data-new-auto-uuid="' + nodeId + '"]');
        if (!nodeId || !$selector.length) return;
        destroy(nodeId);
        if (window.leadComponentSite && window.leadComponentSite.productCompareSourceImport) {
            window.leadComponentSite.productCompareSourceImport.register($selector[0]);
        }
        var props = {
            "elem": $selector.find('.prodlist-laypage-normal'),
            "count": $selector.find('input[name="totalRow"]').val(),
            "limit": $selector.find('input[name="pageSize"]').val(),
            "curr": $selector.find('input[name="pageNumber"]').val(),
            "productGroupId": $selector.find('input[name="productGroupId"]').val(),
            "groups": 3,
            "prev": '<svg t="1695375002869" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="//www.w3.org/2000/svg" p-id="10982" width="16" height="16"><path d="M415.58 512l378.48 378.48a59.46 59.46 0 1 1-84.12 84.12L289.4 554a59.46 59.46 0 0 1 0-84L710 49.4a59.46 59.46 0 1 1 84 84.12L415.64 512z" p-id="10983"></path></svg>',
            "next": '<svg t="1695375051749" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="//www.w3.org/2000/svg" p-id="11228" width="16" height="16"><path d="M608.42 512l-378.48-378.48a59.46 59.46 0 1 1 84.12-84.12L734.6 470a59.46 59.46 0 0 1 0 84L314 974.6a59.46 59.46 0 1 1-84-84.12L608.36000001 512z" p-id="11229"></path></svg>',
            "theme": "#1E9FFF",
            "productId": $selector.find('input[name="productId"]').val(),
            "dataType": $selector.find('input[name="dataType"]').val(),
            "infoId": $selector.find('input[name="infoId"]').val(),
        };
        var ajaxUrl = '/phoenix2/composite/render/v1/pageRender/node/' + nodeObj.pageId + '/' + nodeObj.relationId + '/' + nodeObj.relationType +'/'+nodeObj.appId+ '/'+ nodeObj.nodeId + '/' + nodeObj.dataBlockUuid
        var productTag = $selector.find('input[name="productTag"]').val()
        var activeProductFilter = null;
        var requestSequence = 0;
        var currentRequest = null;
        var unregister = null;

        /**
         * 使用当前产品列表版本的真实参数刷新节点。
         * @description 普通分页与自定义筛选共用该请求，筛选条件统一放入 extraParamJson 应用上下文
         * @param context 当前页码、每页数量及可选筛选对象
         * @returns jqXHR Promise，供分页错误处理和筛选桥等待刷新完成
         * @boundary 页码非法时回退第一页；新请求会取消旧请求并忽略迟到响应
         * @risk extraParamJson 只承载本次刷新需要覆盖的上下文，不能复制其他产品列表版本的参数
         */
        function refreshProductList(context) {
            context = context || {};
            if (Object.prototype.hasOwnProperty.call(context, 'filter')) {
                activeProductFilter = context.filter || null;
            }
            var pageNo = parseInt(context.pageNo, 10);
            var pageSize = parseInt(context.pageSize, 10);
            if (!pageNo || pageNo < 1) pageNo = 1;
            if (!pageSize || pageSize < 1) pageSize = parseInt(props.limit, 10) || 10;

            var isPreview = window.location.toString().indexOf('ptk') > 0;
            var currentData = {
                appVersion: nodeObj.appVersion,
                appIsDev: nodeObj.appIsDev,
                pageNum: pageNo,
                pageSize: pageSize,
                renderMode: isPreview ? '0' : ''
            };
            if (activeProductFilter) {
                currentData.extraParamJson = JSON.stringify({ productFilterJson: activeProductFilter });
            }
            if (props.productGroupId && props.productGroupId != '-1') {
                currentData.productGroupId = props.productGroupId;
            }
            if (props.dataType == '3') {
                currentData.productId = props.productId;
                currentData.infoId = props.infoId;
            }

            var sequence = ++requestSequence;
            if (currentRequest && currentRequest.readyState !== 4 && typeof currentRequest.abort === 'function') {
                currentRequest.abort();
            }
            currentRequest = $.ajax({
                url: ajaxUrl,
                data: currentData,
                dataType: 'html'
            });
            return currentRequest.then(function (data) {
                if (sequence !== requestSequence) return data;
                var $response = $('<div></div>').append($.parseHTML(data, document, true));
                var $nextContainer = $response.find(MOBILE_LIST.listSelector).first();
                if (!$nextContainer.length) {
                    throw new Error('产品列表刷新结果缺少替换容器');
                }
                if (mobileListArrangement) mobileListArrangement.suspend();
                $selector.find(MOBILE_LIST.listSelector).filter(function () {
                    return $(this).closest(MOBILE_LIST.rootSelector)[0] === $selector[0];
                }).first().html($nextContainer.html());
                // 分页模板位于列表容器之外，复用当前响应仅同步两枚配置隐藏域，不执行页脚脚本。
                var $config = findListConfig($selector);
                var $nextConfig = findListConfig($nextContainer.closest(MOBILE_LIST.rootSelector));
                var configInputs = MOBILE_LIST.loadSelector + ',' + MOBILE_LIST.arrangementSelector;
                $config.children(configInputs).remove();
                $config.append($nextConfig.children(configInputs));
                props.count = readResponseValue($response, 'totalRow') || props.count;
                props.limit = readResponseValue($response, 'pageSize') || props.limit;
                props.curr = readResponseValue($response, 'pageNumber') || pageNo;
                props.elem = $selector.find('.prodlist-laypage-normal');
                rateCallBack(rateData);
                if (productTag && productTag == '1') prodLabelPublic(nodeObj, '.list-item-container');
                callImgFunc();
                paginationBack(props);
                if (mobileListArrangement) mobileListArrangement.sync();
                return { totalRow: props.count };
            });
        }

        /**
         * 读取刷新响应中的原有分页隐藏域。
         * @description 优先读取响应 HTML，未返回时回退当前节点，避免引入新字段约定
         * @param $response node-render 返回内容的临时容器
         * @param fieldName 原脚本已有的隐藏域名称
         * @returns 隐藏域字符串值，不存在时返回空字符串
         * @boundary 只允许调用方传入 totalRow、pageSize、pageNumber
         * @risk 隐藏域若被目标版本移除，分页继续沿用刷新前数值
         */
        function readResponseValue($response, fieldName) {
            return String($response.find('input[name="' + fieldName + '"]').val() ||
                $selector.find('input[name="' + fieldName + '"]').val() || '');
        }

        /**
         * 提供筛选服务所需的产品列表基础范围。
         * @description 仅从原脚本已有的 dataType、productGroupId、productId、infoId 推导 DTO 字段
         * @returns 产品筛选 GraphQL conditionDto 可识别的基础范围
         * @boundary 非关联产品不返回关联 ID；无产品分类时不返回 prodCateIdByPage
         * @risk 不得读取当前版本 HTML 未提供的隐藏域或拼装额外请求参数
         */
        function getPrimaryCondition() {
            var condition = {
                prodType: String(props.dataType || '0')
            };
            if (props.productGroupId && props.productGroupId != '-1') {
                condition.prodCateIdByPage = String(props.productGroupId);
            }
            if (props.dataType == '3') {
                condition.prodRelatedId = String(props.productId || '');
                condition.articleRelatedId = String(props.infoId || '');
                condition.currentPageIdForRelated = String(nodeObj.pageId || '');
            }
            return condition;
        }

        function paginationBack(props) {
            try {
                layui && layui.use(function () {
                    var laypage = layui.laypage;
                    var layPageObject = Object.assign({}, props, {
                        jump: function (obj, first) {
                            //首次不执行
                            if (!first) {
                                if(nodeObj.pageRefreshType == '0' && !activeProductFilter) {
                                    var paginationUrl = $selector.find('[name="paginationUrl"]').val()
                                    if(paginationUrl) {
                                        var totalPageUrl = paginationUrl.replace(/PAGE_NUM/g, obj.curr)
                                        window.location.href = totalPageUrl;
                                    }
                                } else {
                                    var pageRequest = refreshProductList({
                                        pageNo: obj.curr,
                                        pageSize: obj.limit
                                    });
                                    if (pageRequest && typeof pageRequest.fail === 'function') {
                                        pageRequest.fail(function (error) {
                                            if (error && error.statusText === 'abort') return;
                                            if (window.console) window.console.error('产品列表分页刷新失败', error);
                                        });
                                    }
                                }
                            }
                        }
                    })
                    laypage.render(layPageObject);
                });
            } catch (e) {
                console.log(e)
            }
        }
        paginationBack(props)
        var rateData = {
            "elem": ".prodlist-rate-normal",
            "value": 5,
            "theme": "#333333"
        };
        // 星级
        function rateCallBack(rateData) {
            try {
                layui.use(function () {
                    var rate = layui.rate;
                    $selector.find(rateData.elem).each(function () {
                        var value = $(this).attr('star-id') || 5
                        var id = '#' + $selector.attr('id') + ' #' + $(this).attr('id')
                        // 渲染
                        rate.render(Object.assign({}, {
                            ...rateData,
                            readonly: true
                        }, {
                            value: value,
                            elem: id
                        }));
                    })
                });
            } catch (e) {
                console.log(e)
            }
        }
        rateCallBack(rateData);
        


        if(productTag && productTag == '1') prodLabelPublic(nodeObj, '.list-item-container');

        // 产品图片执行逻辑
        function callImgFunc() {
            $selector.find('.list-item-container').each(function(index, element) {
                var that = this
                var imgEl = $(that).find('div[data-block-uuid="prodListPhoto"]')
                if(window._block_namespaces_['swiperPhotoImg29074_style1']) window._block_namespaces_['swiperPhotoImg29074_style1'].init({
                    'encodeId':imgEl.find('input[name="prodListPid"]').val(),
                    'nodeId':imgEl.find('input[name="prodImgnodeId"]').val(),
                    "pageNodeId":imgEl.attr('id'),
                    "selectorUuid": "[data-new-auto-uuid=" + nodeObj.nodeId + "]" + ' .prodListPhoto:eq(' + index + ')',
                    "thumbsVideoPlayWay": imgEl.find('input[name="thumbsVideoPlayWay"]').val(),
                })
            })
        }
        callImgFunc()
        var listResponsiveSource = window.leadComponentSite && window.leadComponentSite.listResponsiveSourceImport;
        var mobileListArrangement = listResponsiveSource ? listResponsiveSource.create($selector[0], MOBILE_LIST) : null;
        if (mobileListArrangement) mobileListArrangement.sync();
       

        var adapter = {
            id: nodeId,
            element: $selector[0],
            getCondition: getPrimaryCondition,
            refresh: function (context) {
                context = context || {};
                return refreshProductList({
                    pageNo: context.pageNo || 1,
                    pageSize: props.limit,
                    filter: Object.prototype.hasOwnProperty.call(context, 'filter') ? context.filter : activeProductFilter
                });
            }
        };
        if (window.PhoenixProductFilterBridge) {
            unregister = window.PhoenixProductFilterBridge.registerProductList(adapter);
        } else {
            (window.__phoenixProductListAdapterQueue ||
                (window.__phoenixProductListAdapterQueue = [])).push(adapter);
        }
        controllers[nodeId] = {
            destroy: function () {
                if (mobileListArrangement) mobileListArrangement.destroy();
                requestSequence += 1;
                if (currentRequest && currentRequest.readyState !== 4 && typeof currentRequest.abort === 'function') {
                    currentRequest.abort();
                }
                adapter.element = null;
                if (typeof unregister === 'function') unregister();
                var queue = window.__phoenixProductListAdapterQueue;
                var queueIndex = Array.isArray(queue) ? queue.indexOf(adapter) : -1;
                if (queueIndex >= 0) queue.splice(queueIndex, 1);
            }
        };

       leadComponentSite.globalMinimumUnitEvent.off('prodImgListInit');
       leadComponentSite.globalMinimumUnitEvent.on('prodImgListInit', function() {
           if(productTag && productTag == '1') {
              if($selector.find('.hasImgLabelInit').length == 0 || $selector.find('.hasNameLabelInit').length == 0) prodLabelPublic(nodeObj, '.list-item-container');
           }
       })

    }

    /**
     * 注销指定产品列表的筛选适配器并取消请求。
     * @description 相同节点重新初始化或被删除时复用，防止旧实例覆盖新结果
     * @param nodeId 原脚本已有的产品列表节点 ID
     * @returns 无返回值
     * @boundary 节点尚未注册时直接返回
     * @risk 销毁后必须重新执行 init 才能再次参与筛选联动
     */
    function destroy(nodeId) {
        var key = String(nodeId || '');
        if (!controllers[key]) return;
        controllers[key].destroy();
        delete controllers[key];
    }

    /**
     * 查找本实例当前用于输出列表配置的容器。
     * @description 原分页业务替换响应后重新查询隐藏域，移动排列独立由公共模块读取
     * @param $scope 当前列表组件根节点
     * @returns 本实例配置容器，缺失时返回空集合
     * @boundary 最近列表根必须属于当前实例，嵌套或邻居列表不参与读取
     * @risk 配置只能读取容器的直接隐藏域，不缓存 DOM 或回退到初始化参数
     */
    function findListConfig($scope) {
        return $scope.find(MOBILE_LIST.configSelector).filter(function () {
            return $(this).closest(MOBILE_LIST.rootSelector)[0] === $scope[0];
        }).first();
    }


    // 产品标签
    function prodLabelPublic(nodeObj, selectCls){
        var $selector = $("[data-new-auto-uuid=" + nodeObj.nodeId + "]");
        var _prodTag = $selector.find('[name="productTag"]').val();
        if(_prodTag && _prodTag == '0'){
            return;
        }

        var $li = $selector.find(selectCls);
            
        var isFrontend = window.$_phoenix == undefined;
        var str = "";
        $li.each(function(i,data){
            var elPid = $(this).find('[name="prodListPid"]')
            var pid = elPid.val()
            i===$li.length-1?str+=pid:str+=pid+","
            $(this).find('.prodListImg_box').addClass('hasImgLabelInit')
            $(this).find('.prodNameText').addClass('hasNameLabelInit')
        })
        if(str.length>0) {
            var url='/prod/label/get'
            if(isFrontend){
                url='/phoenix/admin/prod/label/get'
            } else {
                url='/prod/label/get'
            }
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                data: {
                    ids:str
                },
                success: function(res){
                    $li.each(function(){
                        var that = this
                        var elPid = $(that).find('[name="prodListPid"]')
                        var pid =  elPid.val()
                        if(res && res[pid] && res[pid].length > 0){
                            res[pid].forEach(function (dataItem,i) {
                                //判断是自定义标签
                                var longNum=res[pid].length
                                if(dataItem['labelDivision']==="1") {
                                    
                                    // if(dataItem['labelType']==='0'){
                                    //     $(that).find('.imgBox a').css({
                                    //         'opacity': dataItem['transparency'],
                                    //         "display":'inline-block'
                                    //     })
                                    // }
                                    //判断是文本
                                    var html=''
                                    if(dataItem['showType']==="0"){
                                        if(dataItem['showPositon']==="0"){
                                            //创建dom
                                            var tempDom = '<div class="prodlistAsync_label prodlistAsync_label_text_tl paragraph1"><div></div></div>';

                                            if($(that).find('.prodListImg_box .prodlistAsync_label_text_tl').length) {
                                                $(that).find('.prodListImg_box .prodlistAsync_label_text_tl').remove()
                                            }
                                            $(that).find('.prodListImg_box').prepend(tempDom);

                                            var $tlDom = $(that).find('.prodListImg_box .prodlistAsync_label_text_tl')
                                            $tlDom.addClass('show')
                                            $tlDom.find('span').css('color',dataItem['fontColor'])
                                            if(dataItem['labelType']==='1'){
                                                html="<div class='discount'>"
                                                if(dataItem['discountOff']&&dataItem['discountOff'].length>0){
                                                    html += "<span>" + dataItem['discountOff'] + "</span>"
                                                    html +="<br>"
                                                }
                                                if(dataItem['discountContext']&&dataItem['discountContext'].length>0){
                                                    html += "<span class='currencySymbol'>Save "+dataItem['discountSymbol']+"</span>"
                                                    html += "<span class='needExchangeValue' exchangevalue='"+dataItem['discountContext']+"'>"+dataItem['discountContext']+"</span>"
                                                }
                                                html+='</div>'
                                                $tlDom.html(html)
                                            }else{
                                                $tlDom.find('div').html(dataItem['labelName'])
                                            }
                                            var top=$tlDom.width()/1.414 - 6 +"px"
                                            var left=$tlDom.width()/2.828 - 2
                                            $tlDom.css({
                                                "left":"-"+left+"px",
                                                "top":top,
                                                'font-size': '10px',
                                                "boxShadow": "0px -100px 0px 100px " + dataItem['backgroundColor'],
                                                "backgroundColor": dataItem['backgroundColor'],
                                                "zIndex":longNum-i
                                            });
                                        }else if(dataItem['showPositon']==="1"){
                                            var tempDom = '<div class="prodlistAsync_label prodlistAsync_label_text_tr paragraph1"><div></div></div>';

                                            if($(that).find('.prodListImg_box .prodlistAsync_label_text_tr').length) {
                                                $(that).find('.prodListImg_box .prodlistAsync_label_text_tr').remove()
                                            }

                                            $(that).find('.prodListImg_box').prepend(tempDom);
                                            var $trDom = $(that).find('.prodListImg_box .prodlistAsync_label_text_tr');
                                            $trDom.addClass('show')
                                            $trDom.find('span').css('color',dataItem['fontColor'])
                                            if(dataItem['labelType']==='1'){
                                                html = "<div class='discount'>"
                                                if(dataItem['discountOff']&&dataItem['discountOff'].length>0){
                                                    html += "<span>" + dataItem['discountOff'] + "</span>"
                                                    html +="<br>"
                                                }
                                                if(dataItem['discountContext']&&dataItem['discountContext'].length>0){
                                                    html += "<span class='currencySymbol'>Save "+dataItem['discountSymbol']+"</span>"
                                                    html += "<span class='needExchangeValue' exchangevalue='"+dataItem['discountContext']+"'>"+dataItem['discountContext']+"</span>"
                                                }
                                                html+="</div>"
                                                $trDom.html(html)
                                            }else{
                                                $trDom.find('div').html(dataItem['labelName'])
                                            }
                                            $trDom.css({
                                                "right":'-5px',
                                                "top":"-5px",
                                                'font-size': '10px',
                                                "boxShadow": "0px -100px 0px 100px " + dataItem['backgroundColor'],
                                                "backgroundColor": dataItem['backgroundColor'],
                                                "zIndex":longNum-i
                                            });
                                        }else if(dataItem['showPositon']==="2"){
                                            var tempDom = '<div class="prodlistAsync_label prodlistAsync_label_text_t paragraph1"></div>';
                                            if($(that).find('.prodListImg_box .prodlistAsync_label_text_t').length) {
                                                $(that).find('.prodListImg_box .prodlistAsync_label_text_t').remove()
                                            }

                                            $(that).find('.prodListImg_box').prepend(tempDom);
                                            var $tDom = $(that).find('.prodListImg_box>.prodlistAsync_label_text_t');
                                            $tDom.css('flex-direction','column')
                                            !$tDom.hasClass('show')?$tDom.addClass('show'):null
                                            if(dataItem['labelType']==='1'){
                                                var $tdivItem = document.createElement('div')
                                                $tdivItem.setAttribute("class","discount");
                                                if(dataItem['discountOff']&&dataItem['discountOff'].length>0){
                                                    html += "<span style='padding:0 5px'>" + dataItem['discountOff'] + "</span>"
                                                }
                                                if(dataItem['discountContext']&&dataItem['discountContext'].length>0){
                                                    html += "<span class='currencySymbol'>Save "+dataItem['discountSymbol']+"</span>"
                                                    html += "<span class='needExchangeValue' style='padding-right:5px' exchangevalue='"+dataItem['discountContext']+"'>"+dataItem['discountContext']+"</span>"
                                                }
                                                $tdivItem.innerHTML=html
                                                $tdivItem.style.backgroundColor=dataItem['backgroundColor']
                                                $tdivItem.style.color=dataItem['fontColor']
                                                $tDom.append($tdivItem)
                                                $tDom.css("zIndex",longNum-i)
                                            }else{
                                                var $tspanItem = document.createElement('div')
                                                $tspanItem.innerHTML = dataItem['labelName'];
                                                $tspanItem.style.backgroundColor=dataItem['backgroundColor']
                                                $tspanItem.style.color=dataItem['fontColor']
                                                $tDom.append($tspanItem)
                                                $tDom.css("zIndex",longNum-i)
                                            }
                                            $tDom.each(function (index,element) {
                                                if($(element).children().length>1){
                                                    var widthSon=0
                                                    $(element).children().each(function (i,ele) {
                                                        widthSon+=$(ele).width()+2
                                                        widthSon+=13
                                                    })
                                                    var fatherwidth=$(that).width()
                                                    if(widthSon>fatherwidth){
                                                        $(element).css('flex-direction','column')
                                                        $($(element).children()[0]).css('margin-bottom','3px')
                                                    }else{
                                                        $(element).css('flex-direction','row')
                                                    }
                                                }else{
                                                    $(element).css('flex-direction','row')
                                                }
                                            })
                                        }else if(dataItem['showPositon']==="4"){
                                            
                                            var tempDom = '<div class="inlineLabel"></div>';
                                            if($(that).find('.prodNameText .inlineLabel').length) {
                                                $(that).find('.prodNameText .inlineLabel').remove()
                                            }

                                            $(that).find('.prodNameText').prepend(tempDom);

                                            var $txtDom =$(that).find('.inlineLabel')
                                            !$txtDom.hasClass('show') ? $txtDom.addClass('show'): null
                                            $txtDom.addClass('discount')
                                            if(dataItem['labelType']==='1'){
                                                if(dataItem['discountOff']&&dataItem['discountOff'].length>0){
                                                    html += "<span style='padding: 0 5px'>" + dataItem['discountOff'] + "</span>"
                                                }
                                                if(dataItem['discountContext']&&dataItem['discountContext'].length>0){
                                                    html += "<span class='currencySymbol'>Save "+dataItem['discountSymbol']+"</span>"
                                                    html += "<span class='needExchangeValue' style='padding-right: 5px' exchangevalue='"+dataItem['discountContext']+"'>"+dataItem['discountContext']+"</span>"
                                                }
                                                $txtDom.html(html)
                                            }else{
                                                $txtDom.html(dataItem['labelName'])
                                            }
                                            $txtDom.css({
                                                'backgroundColor': dataItem['backgroundColor'],
                                                'color': dataItem['fontColor'],
                                                "zIndex":longNum-i,
                                                'display': 'inline-flex'
                                        
                                            });
                                        }
                                    }else{
                                        if(dataItem['showPositon']==="0"){
                                            var tempDom = '<div class="prodlistAsync_label_img_tl"><img src="" /></div>';
                                            if($(that).find('.prodListImg_box .prodlistAsync_label_img_tl').length) {
                                                $(that).find('.prodListImg_box .prodlistAsync_label_img_tl').remove()
                                            }

                                            $(that).find('.prodListImg_box').prepend(tempDom);

                                            var $itlDom = $(that).find('.prodListImg_box .prodlistAsync_label_img_tl')
                                            $itlDom.addClass('show')
                                            $itlDom.find('img').attr('src',dataItem['picUrl'])
                                            $itlDom.css("zIndex",longNum-i)
                                        }else if(dataItem['showPositon']==="1"){
                                            var tempDom = '<div class="prodlistAsync_label_img_tr "><img src="" /></div>';
                                            if($(that).find('.prodListImg_box .prodlistAsync_label_img_tr').length) {
                                                $(that).find('.prodListImg_box .prodlistAsync_label_img_tr').remove()
                                            }
                                            $(that).find('.prodListImg_box').prepend(tempDom);

                                            var $itrDom = $(that).find('.prodListImg_box .prodlistAsync_label_img_tr');
                                            $itrDom.addClass('show')
                                            $itrDom.find('img').attr('src',dataItem['picUrl'])
                                            $itrDom.css("zIndex",longNum-i)
                                        }else if(dataItem['showPositon']==="3") {
                                            var tempDom = '<div class="prodlistAsync_label_img_r"></div>';
                                            if($(that).find('.prodListImg_box .prodlistAsync_label_img_r').length == 0) {
                                                $(that).find('.prodListImg_box').prepend(tempDom);
                                            }

                                            var $irDom = $(that).find('.prodListImg_box .prodlistAsync_label_img_r')
                                            !$irDom.hasClass('show')?$irDom.addClass('show'):null
                                            if($irDom.find('img[data-labelId="'+ dataItem['labelId'] +'"]').length == 0) {
                                                var $imgItem = document.createElement('img')
                                                $imgItem.setAttribute('src',dataItem['picUrl'])
                                                $imgItem.setAttribute('data-labelId',dataItem['labelId'])
                                                $irDom.append($imgItem)
                                            }
                                            
                                            $irDom.css("zIndex",longNum-i)
                                        }
                                    }
                                }else {
                                    var tempDom = '<div class="prodlistAsync_label_img_r paragraph1"></div>';
                                    if($(that).find('.prodListImg_box .prodlistAsync_label_img_r').length == 0) {
                                        $(that).find('.prodListImg_box').prepend(tempDom);
                                    }

                                    var $irDom = $(that).find('.prodListImg_box .prodlistAsync_label_img_r')
                                    !$irDom.hasClass('show') ? $irDom.addClass('show') : null
                                    if($irDom.find('img[data-labelId="'+ dataItem['labelId'] +'"]').length == 0) {
                                        var $imgItem = document.createElement('img')
                                        $imgItem.setAttribute('src',dataItem['picUrl'])
                                        $imgItem.setAttribute('data-labelId',dataItem['labelId'])
                                        $irDom.append($imgItem)
                                    }
                                    $irDom.css("zIndex",longNum-i)
                                }
                            })
                        }
                    })

                }
            });
        }
            
    }
    
})(window, jQuery);