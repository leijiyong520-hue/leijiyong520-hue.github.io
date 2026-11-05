/**
 * Layui
 * Classic modular front-end UI library
 * MIT Licensed
 */

;!function(win){
    "use strict";

    var doc = win.document;
    var config = {
        modules: {}, // 模块物理路径
        status: {}, // 模块加载状态
        timeout: 10, // 符合规范的模块请求最长等待秒数
        event: {} // 模块自定义事件
    };

    var Layui = function(){
        this.v = '2.8.3'; // Layui 版本号
    };

    // 识别预先可能定义的指定全局对象
    var GLOBAL = win.LAYUI_GLOBAL || {};

    // 获取 layui 所在目录
    var getPath = function(){
        var jsPath = doc.currentScript ? doc.currentScript.src : function(){
            var js = doc.scripts;
            var last = js.length - 1;
            var src;
            for(var i = last; i > 0; i--){
                if(js[i].readyState === 'interactive'){
                    src = js[i].src;
                    break;
                }
            }
            return src || js[last].src;
        }();

        return config.dir = GLOBAL.dir || jsPath.substring(0, jsPath.lastIndexOf('/') + 1);
    }();

    // 异常提示
    var error = function(msg, type){
        type = type || 'log';
        win.console && console[type] && console[type]('layui error hint: ' + msg);
    };

    var isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]';

    // 内置模块
    var modules = config.builtin = {
        lay: 'lay', // 基础 DOM 操作
        laypage: 'laypage', // 分页
        rate: 'rate',  // 评分组件
        all: 'all',
        'layui.all': 'layui.all' // 聚合标识（功能性的，非真实模块）
    };

    // 记录基础数据
    Layui.prototype.cache = config;

    // 定义模块
    Layui.prototype.define = function(deps, factory){
        var that = this;
        var type = typeof deps === 'function';
        var callback = function(){
            var setApp = function(app, exports){
                layui[app] = exports;
                config.status[app] = true;
            };
            typeof factory === 'function' && factory(function(app, exports){
                setApp(app, exports);
                config.callback[app] = function(){
                    factory(setApp);
                }
            });
            return this;
        };

        type && (
            factory = deps,
                deps = []
        );

        that.use(deps, callback, null, 'define');
        return that;
    };

    // 使用特定模块
    Layui.prototype.use = function(apps, callback, exports, from){
        var that = this;
        var dir = config.dir = config.dir ? config.dir : getPath;
        var head = doc.getElementsByTagName('head')[0];

        apps = function(){
            if(typeof apps === 'string'){
                return [apps];
            }
            // 当第一个参数为 function 时，则自动加载所有内置模块，且执行的回调即为该 function 参数；
            else if(typeof apps === 'function'){
                callback = apps;
                return ['all'];
            }
            return apps;
        }();

        // 如果页面已经存在 jQuery 1.7+ 库且所定义的模块依赖 jQuery，则不加载内部 jquery 模块
        if(win.jQuery && jQuery.fn.on){
            that.each(apps, function(index, item){
                if(item === 'jquery'){
                    apps.splice(index, 1);
                }
            });
            layui.jquery = layui.$ = jQuery;
        }

        var item = apps[0];
        var timeout = 0;

        exports = exports || [];

        // 静态资源host
        config.host = config.host || (dir.match(/\/\/([\s\S]+?)\//)||['//'+ location.host +'/'])[0];

        // 加载完毕
        function onScriptLoad(e, url){
            var readyRegExp = navigator.platform === 'PLaySTATION 3' ? /^complete$/ : /^(complete|loaded)$/
            if (e.type === 'load' || (readyRegExp.test((e.currentTarget || e.srcElement).readyState))) {
                config.modules[item] = url;
                head.removeChild(node);
                (function poll() {
                    if(++timeout > config.timeout * 1000 / 4){
                        return error(item + ' is not a valid module', 'error');
                    }
                    config.status[item] ? onCallback() : setTimeout(poll, 4);
                }());
            }
        }

        // 回调
        function onCallback(){
            exports.push(layui[item]);
            apps.length > 1 ?
                that.use(apps.slice(1), callback, exports, from)
                : ( typeof callback === 'function' && function(){
                    // 保证文档加载完毕再执行回调
                    if(layui.jquery && typeof layui.jquery === 'function' && from !== 'define'){
                        return layui.jquery(function(){
                            callback.apply(layui, exports);
                        });
                    }
                    callback.apply(layui, exports);
                }() );
        }

        // 如果引入了聚合板，内置的模块则不必重复加载
        // 内置模块已经在本文件末尾同步定义，直接执行回调，避免进入轮询和脚本异步加载流程
        if( apps.length === 0 || (modules[item] && config.status[item]) || (layui['layui.all'] && modules[item]) ){
            return onCallback(), that;
        }

        /*
         * 获取加载的模块 URL
         * 如果是内置模块，则按照 dir 参数拼接模块路径
         * 如果是扩展模块，则判断模块路径值是否为 {/} 开头，
         * 如果路径值是 {/} 开头，则模块路径即为后面紧跟的字符。
         * 否则，则按照 base 参数拼接模块路径
        */

        var url = ( modules[item] ? (dir + 'modules/')
                : (/^\{\/\}/.test(that.modules[item]) ? '' : (config.base || ''))
        ) + (that.modules[item] || item) + '.js';
        url = url.replace(/^\{\/\}/, '');

        // 如果扩展模块（即：非内置模块）对象已经存在，则不必再加载
        if(!config.modules[item] && layui[item]){
            config.modules[item] = url; // 并记录起该扩展模块的 url
        }

        // 首次加载模块
        if(!config.modules[item]){
            var node = doc.createElement('script');

            node.async = true;
            node.charset = 'utf-8';
            node.src = url + function(){
                var version = config.version === true
                    ? (config.v || (new Date()).getTime())
                    : (config.version||'');
                return version ? ('?v=' + version) : '';
            }();

            head.appendChild(node);

            if(node.attachEvent && !(node.attachEvent.toString && node.attachEvent.toString().indexOf('[native code') < 0) && !isOpera){
                node.attachEvent('onreadystatechange', function(e){
                    onScriptLoad(e, url);
                });
            } else {
                node.addEventListener('load', function(e){
                    onScriptLoad(e, url);
                }, false);
            }

            config.modules[item] = url;
        } else { // 缓存
            (function poll() {
                if(++timeout > config.timeout * 1000 / 4){
                    return error(item + ' is not a valid module', 'error');
                }
                (typeof config.modules[item] === 'string' && config.status[item])
                    ? onCallback()
                    : setTimeout(poll, 4);
            }());
        }

        return that;
    };

    // 弃用原有的指定模块，以便重新扩展新的同名模块
    Layui.prototype.disuse = function(apps){
        var that = this;
        apps = that.isArray(apps) ? apps : [apps];
        that.each(apps, function (index, item) {
            if (!config.status[item]) {
                // return error('module ' + item + ' is not exist');
            }
            delete that[item];
            delete modules[item];
            delete that.modules[item];
            delete config.status[item];
            delete config.modules[item];
        });
        return that;
    };

    // 获取节点的 style 属性值
    Layui.prototype.getStyle = function(node, name){
        var style = node.currentStyle ? node.currentStyle : win.getComputedStyle(node, null);
        return style[style.getPropertyValue ? 'getPropertyValue' : 'getAttribute'](name);
    };

    // css 外部加载器
    Layui.prototype.link = function(href, fn, cssname){
        var that = this;
        var head = doc.getElementsByTagName('head')[0];
        var link = doc.createElement('link');

        if(typeof fn === 'string') cssname = fn;

        var app = (cssname || href).replace(/\.|\//g, '');
        var id = link.id = 'layuicss-'+ app;
        var STAUTS_NAME = 'creating';
        var timeout = 0;

        link.rel = 'stylesheet';
        link.href = href + (config.debug ? '?v='+new Date().getTime() : '');
        link.media = 'all';

        if(!doc.getElementById(id)){
            head.appendChild(link);
        }

        if(typeof fn !== 'function') return that;

        // 轮询 css 是否加载完毕
        (function poll(status) {
            var delay = 100;
            var getLinkElem = doc.getElementById(id); // 获取动态插入的 link 元素

            // 如果轮询超过指定秒数，则视为请求文件失败或 css 文件不符合规范
            if(++timeout > config.timeout * 1000 / delay){
                return error(href + ' timeout');
            }

            // css 加载就绪
            if(parseInt(that.getStyle(getLinkElem, 'width')) === 1989){
                // 如果参数来自于初始轮询（即未加载就绪时的），则移除 link 标签状态
                if(status === STAUTS_NAME) getLinkElem.removeAttribute('lay-status');
                // 如果 link 标签的状态仍为「创建中」，则继续进入轮询，直到状态改变，则执行回调
                getLinkElem.getAttribute('lay-status') === STAUTS_NAME ? setTimeout(poll, delay) : fn();
            } else {
                getLinkElem.setAttribute('lay-status', STAUTS_NAME);
                setTimeout(function(){
                    poll(STAUTS_NAME);
                }, delay);
            }
        }());

        // 轮询css是否加载完毕
        /*
        (function poll() {
          if(++timeout > config.timeout * 1000 / 100){
            return error(href + ' timeout');
          };
          parseInt(that.getStyle(doc.getElementById(id), 'width')) === 1989 ? function(){
            fn();
          }() : setTimeout(poll, 100);
        }());
        */

        return that;
    };

    // css 内部加载器
    Layui.prototype.addcss = function(firename, fn, cssname){
        return layui.link(config.dir + 'css/' + firename, fn, cssname);
    };

    // 存储模块的回调
    config.callback = {};

    // 重新执行模块的工厂函数
    Layui.prototype.factory = function(modName){
        if(layui[modName]){
            return typeof config.callback[modName] === 'function'
                ? config.callback[modName]
                : null;
        }
    };

    // 图片预加载
    Layui.prototype.img = function(url, callback, error) {
        var img = new Image();
        img.src = url;
        if(img.complete){
            return callback(img);
        }
        img.onload = function(){
            img.onload = null;
            typeof callback === 'function' && callback(img);
        };
        img.onerror = function(e){
            img.onerror = null;
            typeof error === 'function' && error(e);
        };
    };

    // 全局配置
    Layui.prototype.config = function(options){
        options = options || {};
        for(var key in options){
            config[key] = options[key];
        }
        return this;
    };

    // 记录全部模块
    Layui.prototype.modules = function(){
        var clone = {};
        for(var o in modules){
            clone[o] = modules[o];
        }
        return clone;
    }();

    // 拓展模块
    Layui.prototype.extend = function(options){
        var that = this;

        // 验证模块是否被占用
        options = options || {};
        for(var o in options){
            if(that[o] || that.modules[o]){
                error(o+ ' Module already exists', 'error');
            } else {
                that.modules[o] = options[o];
            }
        }

        return that;
    };

    // location.hash 路由解析
    Layui.prototype.router = Layui.prototype.hash = function(hash){
        var that = this;
        var hash = hash || location.hash;
        var data = {
            path: [],
            search: {},
            hash: (hash.match(/[^#](#.*$)/) || [])[1] || ''
        };

        if(!/^#\//.test(hash)) return data; // 禁止非路由规范

        hash = hash.replace(/^#\//, '');
        data.href = '/' + hash;
        hash = hash.replace(/([^#])(#.*$)/, '$1').split('/') || [];

        // 提取 Hash 结构
        that.each(hash, function(index, item){
            /^\w+=/.test(item) ? function(){
                item = item.split('=');
                data.search[item[0]] = item[1];
            }() : data.path.push(item);
        });

        return data;
    };

    // URL 解析
    Layui.prototype.url = function(href){
        var that = this;
        var data = {
            // 提取 url 路径
            pathname: function(){
                var pathname = href
                    ? function(){
                        var str = (href.match(/\.[^.]+?\/.+/) || [])[0] || '';
                        return str.replace(/^[^\/]+/, '').replace(/\?.+/, '');
                    }()
                    : location.pathname;
                return pathname.replace(/^\//, '').split('/');
            }(),

            // 提取 url 参数
            search: function(){
                var obj = {};
                var search = (href
                        ? function(){
                            var str = (href.match(/\?.+/) || [])[0] || '';
                            return str.replace(/\#.+/, '');
                        }()
                        : location.search
                ).replace(/^\?+/, '').split('&'); // 去除 ?，按 & 分割参数

                // 遍历分割后的参数
                that.each(search, function(index, item){
                    var _index = item.indexOf('=')
                        ,key = function(){ // 提取 key
                        if(_index < 0){
                            return item.substr(0, item.length);
                        } else if(_index === 0){
                            return false;
                        } else {
                            return item.substr(0, _index);
                        }
                    }();
                    // 提取 value
                    if(key){
                        obj[key] = _index > 0 ? item.substr(_index + 1) : null;
                    }
                });

                return obj;
            }(),

            // 提取 Hash
            hash: that.router(function(){
                return href
                    ? ((href.match(/#.+/) || [])[0] || '/')
                    : location.hash;
            }())
        };

        return data;
    };

    // 本地持久存储
    Layui.prototype.data = function(table, settings, storage){
        table = table || 'layui';
        storage = storage || localStorage;

        if(!win.JSON || !win.JSON.parse) return;

        // 如果 settings 为 null，则删除表
        if(settings === null){
            return delete storage[table];
        }

        settings = typeof settings === 'object'
            ? settings
            : {key: settings};

        try {
            var data = JSON.parse(storage[table]);
        } catch(e) {
            var data = {};
        }

        if('value' in settings) data[settings.key] = settings.value;
        if(settings.remove) delete data[settings.key];
        storage[table] = JSON.stringify(data);

        return settings.key ? data[settings.key] : data;
    };

    // 本地临时存储
    Layui.prototype.sessionData = function(table, settings){
        return this.data(table, settings, sessionStorage);
    }

    // 设备信息
    Layui.prototype.device = function(key){
        var agent = navigator.userAgent.toLowerCase();

        // 获取版本号
        var getVersion = function(label){
            var exp = new RegExp(label + '/([^\\s\\_\\-]+)');
            label = (agent.match(exp)||[])[1];
            return label || false;
        };

        // 返回结果集
        var result = {
            os: function(){ // 底层操作系统
                if(/windows/.test(agent)){
                    return 'windows';
                } else if(/linux/.test(agent)){
                    return 'linux';
                } else if(/iphone|ipod|ipad|ios/.test(agent)){
                    return 'ios';
                } else if(/mac/.test(agent)){
                    return 'mac';
                }
            }(),
            ie: function(){ // ie 版本
                return (!!win.ActiveXObject || "ActiveXObject" in win) ? (
                    (agent.match(/msie\s(\d+)/) || [])[1] || '11' // 由于 ie11 并没有 msie 的标识
                ) : false;
            }(),
            weixin: getVersion('micromessenger')  // 是否微信
        };

        // 任意的 key
        if(key && !result[key]){
            result[key] = getVersion(key);
        }

        // 移动设备
        result.android = /android/.test(agent);
        result.ios = result.os === 'ios';
        result.mobile = (result.android || result.ios) ? true : false;

        return result;
    };

    // 提示
    Layui.prototype.hint = function(){
        return {
            error: error
        };
    };

    // typeof 类型细分 -> string/number/boolean/undefined/null、object/array/function/…
    Layui.prototype._typeof = Layui.prototype.type = function(operand){
        if(operand === null) return String(operand);

        // 细分引用类型
        return (typeof operand === 'object' || typeof operand === 'function') ? function(){
            var type = Object.prototype.toString.call(operand).match(/\s(.+)\]$/) || []; // 匹配类型字符
            var classType = 'Function|Array|Date|RegExp|Object|Error|Symbol'; // 常见类型字符

            type = type[1] || 'Object';

            // 除匹配到的类型外，其他对象均返回 object
            return new RegExp('\\b('+ classType + ')\\b').test(type)
                ? type.toLowerCase()
                : 'object';
        }() : typeof operand;
    };

    // 对象是否具备数组结构（此处为兼容 jQuery 对象）
    Layui.prototype._isArray = Layui.prototype.isArray = function(obj){
        var that = this;
        var len;
        var type = that.type(obj);

        if(!obj || (typeof obj !== 'object') || obj === win) return false;

        len = 'length' in obj && obj.length; // 兼容 ie
        return type === 'array' || len === 0 || (
            typeof len === 'number' && len > 0 && (len - 1) in obj // 兼容 jQuery 对象
        );
    };

    // 遍历
    Layui.prototype.each = function(obj, fn){
        var key;
        var that = this;
        var callFn = function(key, obj){ // 回调
            return fn.call(obj[key], key, obj[key])
        };

        if(typeof fn !== 'function') return that;
        obj = obj || [];

        // 优先处理数组结构
        if(that.isArray(obj)){
            for(key = 0; key < obj.length; key++){
                if(callFn(key, obj)) break;
            }
        } else {
            for(key in obj){
                if(callFn(key, obj)) break;
            }
        }

        return that;
    };

    // 将数组中的成员对象按照某个 key 的 value 值进行排序
    Layui.prototype.sort = function(arr, key, desc, notClone){
        var that = this;
        var clone = notClone ? (arr || []) : JSON.parse(
            JSON.stringify(arr || [])
        );

        // 若未传入 key，则直接返回原对象
        if(that.type(arr) === 'object' && !key){
            return clone;
        } else if(typeof arr !== 'object'){ // 若 arr 非对象
            return [clone];
        }

        // 开始排序
        clone.sort(function(o1, o2){
            var v1 = o1[key];
            var v2 = o2[key];

            /*
             * 特殊数据
             * 若比较的成员均非对象
             */

            // 若比较的成员均为数字
            if(!isNaN(o1) && !isNaN(o2)) return o1 - o2;
            // 若比较的成员只存在某一个非对象
            if(!isNaN(o1) && isNaN(o2)){
                if(key && typeof o2 === 'object'){
                    v1 = o1;
                } else {
                    return -1;
                }
            } else if (isNaN(o1) && !isNaN(o2)){
                if(key && typeof o1 === 'object'){
                    v2 = o2;
                } else {
                    return 1;
                }
            }

            /*
             * 正常数据
             * 即成员均为对象，也传入了对比依据： key
             * 若 value 为数字，按「大小」排序；若 value 非数字，则按「字典序」排序
             */

            // value 是否为数字
            var isNum = [!isNaN(v1), !isNaN(v2)];

            // 若为数字比较
            if(isNum[0] && isNum[1]){
                if(v1 && (!v2 && v2 !== 0)){ // 数字 vs 空
                    return 1;
                } else if((!v1 && v1 !== 0) && v2){ // 空 vs 数字
                    return -1;
                } else { // 数字 vs 数字
                    return v1 - v2;
                }
            }

            /**
             * 字典序排序
             */

            // 若为非数字比较
            if(!isNum[0] && !isNum[1]){
                // 字典序比较
                if(v1 > v2){
                    return 1;
                } else if (v1 < v2) {
                    return -1;
                } else {
                    return 0;
                }
            }

            // 若为混合比较
            if(isNum[0] || !isNum[1]){ // 数字 vs 非数字
                return -1;
            } else if(!isNum[0] || isNum[1]) { // 非数字 vs 数字
                return 1;
            }

        });

        desc && clone.reverse(); // 倒序
        return clone;
    };

    // 阻止事件冒泡
    Layui.prototype.stope = function(thisEvent){
        thisEvent = thisEvent || win.event;
        try { thisEvent.stopPropagation() } catch(e){
            thisEvent.cancelBubble = true;
        }
    };

    // 字符常理
    var EV_REMOVE = 'LAYUI-EVENT-REMOVE';

    // 自定义模块事件
    Layui.prototype.onevent = function(modName, events, callback){
        if(typeof modName !== 'string'
            || typeof callback !== 'function') return this;

        return Layui.event(modName, events, null, callback);
    };

    // 执行自定义模块事件
    Layui.prototype.event = Layui.event = function(modName, events, params, fn){
        var that = this;
        var result = null;
        var filter = (events || '').match(/\((.*)\)$/)||[]; // 提取事件过滤器字符结构，如：select(xxx)
        var eventName = (modName + '.'+ events).replace(filter[0], ''); // 获取事件名称，如：form.select
        var filterName = filter[1] || ''; // 获取过滤器名称,，如：xxx
        var callback = function(_, item){
            var res = item && item.call(that, params);
            res === false && result === null && (result = false);
        };

        // 如果参数传入特定字符，则执行移除事件
        if(params === EV_REMOVE){
            delete (that.cache.event[eventName] || {})[filterName];
            return that;
        }

        // 添加事件
        if(fn){
            config.event[eventName] = config.event[eventName] || {};

            if (filterName) {
                // 带filter不支持重复事件
                config.event[eventName][filterName] = [fn];
            } else {
                // 不带filter处理的是所有的同类事件，应该支持重复事件
                config.event[eventName][filterName] = config.event[eventName][filterName] || [];
                config.event[eventName][filterName].push(fn);
            }
            return this;
        }

        // 执行事件回调
        layui.each(config.event[eventName], function(key, item){
            // 执行当前模块的全部事件
            if(filterName === '{*}'){
                layui.each(item, callback);
                return;
            }

            // 执行指定事件
            key === '' && layui.each(item, callback);
            (filterName && key === filterName) && layui.each(item, callback);
        });

        return result;
    };

    // 新增模块事件
    Layui.prototype.on = function(events, modName, callback){
        var that = this;
        return that.onevent.call(that, modName, events, callback);
    }

    // 移除模块事件
    Layui.prototype.off = function(events, modName){
        var that = this;
        return that.event.call(that, modName, events, EV_REMOVE);
    };

    // 防抖
    Layui.prototype.debounce = function (func, wait) {
        var timeout;
        return function () {
            var context = this;
            var args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                func.apply(context, args);
            }, wait);
        }
    };

    // 节流
    Layui.prototype.throttle = function (func, wait) {
        var cooldown = false;
        return function () {
            var context = this;
            var args = arguments;
            if (!cooldown) {
                func.apply(context, args);
                cooldown = true;
                setTimeout(function () {
                    cooldown = false;
                }, wait);
            }
        }
    };

    // exports layui
    win.layui = new Layui();

}(window); // gulp build: layui-footer
// 内置模块同步实现：避免首次使用时再创建异步 script 节点
// 内置模块：lay（同步内联）

/** lay 基础模块 | MIT Licensed */

;!function(window){ // gulp build: lay-header
    "use strict";

    var MOD_NAME = 'lay'; // 模块名
    var document = window.document;

    // 元素查找
    var lay = function(selector){
        return new Class(selector);
    };

    // 构造器
    var Class = function(selector){
        var that = this;
        var elem = typeof selector === 'object' ? function(){
            // 仅适配简单元素对象
            return layui.isArray(selector) ? selector : [selector];
        }() : (
            this.selector = selector,
                document.querySelectorAll(selector || null)
        );

        lay.each(elem, function(index, item){
            that.push(elem[index]);
        });
    };

    /*
      lay 对象操作
    */

    Class.fn = Class.prototype = [];
    Class.fn.constructor = Class;

    // 普通对象深度扩展
    lay.extend = function(){
        var ai = 1;
        var length;
        var args = arguments;
        var clone = function(target, obj){
            target = target || (layui.type(obj) === 'array' ? [] : {}); // 目标对象
            for(var i in obj){
                // 若值为普通对象，则进入递归，继续深度合并
                target[i] = (obj[i] && obj[i].constructor === Object)
                    ? clone(target[i], obj[i])
                    : obj[i];
            }
            return target;
        };

        args[0] = typeof args[0] === 'object' ? args[0] : {};
        length = args.length

        for(; ai < length; ai++){
            if(typeof args[ai] === 'object'){
                clone(args[0], args[ai]);
            }
        }
        return args[0];
    };

    // ie 版本
    lay.ie = function(){
        var agent = navigator.userAgent.toLowerCase();
        return (!!window.ActiveXObject || "ActiveXObject" in window) ? (
            (agent.match(/msie\s(\d+)/) || [])[1] || '11' // 由于 ie11 并没有 msie 的标识
        ) : false;
    }();


    /**
     * 获取 layui 常见方法，以便用于组件单独版
     */

    lay.layui = layui || {};
    lay.getPath = layui.cache.dir; // 获取当前 JS 所在目录
    lay.stope = layui.stope; // 中止冒泡
    lay.each = function(){ // 遍历
        layui.each.apply(layui, arguments);
        return this;
    };


    // 数字前置补零
    lay.digit = function(num, length){
        if(!(typeof num === 'string' || typeof num === 'number')) return '';

        var str = '';
        num = String(num);
        length = length || 2;
        for(var i = num.length; i < length; i++){
            str += '0';
        }
        return num < Math.pow(10, length) ? str + num : num;
    };

    // 创建元素
    lay.elem = function(elemName, attr){
        var elem = document.createElement(elemName);
        lay.each(attr || {}, function(key, value){
            elem.setAttribute(key, value);
        });
        return elem;
    };

    // 当前页面是否存在滚动条
    lay.hasScrollbar = function(){
        return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
    };

    // 元素定位
    lay.position = function(elem, elemView, obj){
        if(!elemView) return;
        obj = obj || {};

        // 如果绑定的是 document 或 body 元素，则直接获取鼠标坐标
        if(elem === document || elem === lay('body')[0]){
            obj.clickType = 'right';
        }

        // 绑定绑定元素的坐标
        var rect = obj.clickType === 'right' ? function(){
                var e = obj.e || window.event || {};
                return {
                    left: e.clientX
                    ,top: e.clientY
                    ,right: e.clientX
                    ,bottom: e.clientY
                }
            }() : elem.getBoundingClientRect()
            ,elemWidth = elemView.offsetWidth // 控件的宽度
            ,elemHeight = elemView.offsetHeight // 控件的高度

            // 滚动条高度
            ,scrollArea = function(type){
                type = type ? 'scrollLeft' : 'scrollTop';
                return document.body[type] | document.documentElement[type];
            }

            // 窗口宽高
            ,winArea = function(type){
                return document.documentElement[type ? 'clientWidth' : 'clientHeight']
            }, margin = 5, left = rect.left, top = rect.bottom;

        // 相对元素居中
        if(obj.align === 'center'){
            left = left - (elemWidth - elem.offsetWidth)/2;
        } else if(obj.align === 'right'){
            left = left - elemWidth + elem.offsetWidth;
        }

        // 判断右侧是否超出边界
        if(left + elemWidth + margin > winArea('width')){
            left = winArea('width') - elemWidth - margin; // 如果超出右侧，则将面板向右靠齐
        }
        // 左侧是否超出边界
        if(left < margin) left = margin;

        // 判断底部和顶部是否超出边界
        if(top + elemHeight + margin > winArea()){
            // 优先顶部是否有足够区域显示完全
            if(rect.top > elemHeight + margin){
                top = rect.top - elemHeight - margin*2; // 顶部有足够的区域显示
            } else {
                // 如果面板是鼠标右键弹出，且顶部没有足够区域显示，则将面板向底部靠齐
                if(obj.clickType === 'right'){
                    top = winArea() - elemHeight - margin*2;
                    if(top < 0) top = 0; // 不能溢出窗口顶部
                } else {
                    top = margin; // 位置计算逻辑完备性处理
                }
            }
        }

        // 定位类型
        var position = obj.position;
        if(position) elemView.style.position = position;

        // 设置坐标
        elemView.style.left = left + (position === 'fixed' ? 0 : scrollArea(1)) + 'px';
        elemView.style.top = top + (position === 'fixed' ? 0 : scrollArea()) + 'px';

        // 防止页面无滚动条时，又因为弹出面板而出现滚动条导致的坐标计算偏差
        if(!lay.hasScrollbar()){
            var rect1 = elemView.getBoundingClientRect();
            // 如果弹出面板的溢出窗口底部，则表示将出现滚动条，此时需要重新计算坐标
            if(!obj.SYSTEM_RELOAD && (rect1.bottom + margin) > winArea()){
                obj.SYSTEM_RELOAD = true;
                setTimeout(function(){
                    lay.position(elem, elemView, obj);
                }, 50);
            }
        }
    };

    // 获取元素上的属性配置项
    lay.options = function(elem, opts){
        opts = typeof opts === 'object' ? opts : {attr: opts};

        if(elem === document) return {};

        var othis = lay(elem);
        var attrName = opts.attr || 'lay-options';
        var attrValue = othis.attr(attrName);

        try {
            return new Function('return '+ (attrValue || '{}'))();
        } catch(ev) {
            layui.hint().error(opts.errorText || [
                attrName + '="'+ attrValue + '"',
                '\n parseerror: '+ ev
            ].join('\n'), 'error');
            return {};
        }
    };

    // 元素是否属于顶级元素（document 或 body）
    lay.isTopElem = function(elem){
        var topElems = [document, lay('body')[0]]
            ,matched = false;
        lay.each(topElems, function(index, item){
            if(item === elem){
                return matched = true
            }
        });
        return matched;
    };


    /*
     * lay 元素操作
     */


    // 追加字符
    Class.addStr = function(str, new_str){
        str = str.replace(/\s+/, ' ');
        new_str = new_str.replace(/\s+/, ' ').split(' ');
        lay.each(new_str, function(ii, item){
            if(!new RegExp('\\b'+ item + '\\b').test(str)){
                str = str + ' ' + item;
            }
        });
        return str.replace(/^\s|\s$/, '');
    };

    // 移除值
    Class.removeStr = function(str, new_str){
        str = str.replace(/\s+/, ' ');
        new_str = new_str.replace(/\s+/, ' ').split(' ');
        lay.each(new_str, function(ii, item){
            var exp = new RegExp('\\b'+ item + '\\b')
            if(exp.test(str)){
                str = str.replace(exp, '');
            }
        });
        return str.replace(/\s+/, ' ').replace(/^\s|\s$/, '');
    };

    // 查找子元素
    Class.fn.find = function(selector){
        var that = this;
        var elem = [];
        var isObject = typeof selector === 'object';

        this.each(function(i, item){
            var children = isObject && item.contains(selector)
                ? selector
                : item.querySelectorAll(selector || null);

            lay.each(children, function(index, child){
                elem.push(child);
            });
        });

        return lay(elem);
    };

    // 元素遍历
    Class.fn.each = function(fn){
        return lay.each.call(this, this, fn);
    };

    // 添加 className
    Class.fn.addClass = function(className, type){
        return this.each(function(index, item){
            item.className = Class[type ? 'removeStr' : 'addStr'](item.className, className)
        });
    };

    // 移除 className
    Class.fn.removeClass = function(className){
        return this.addClass(className, true);
    };

    // 是否包含 css 类
    Class.fn.hasClass = function(className){
        var has = false;
        this.each(function(index, item){
            if(new RegExp('\\b'+ className +'\\b').test(item.className)){
                has = true;
            }
        });
        return has;
    };

    // 添加或获取 css style
    Class.fn.css = function(key, value){
        var that = this;
        var parseValue = function(v){
            return isNaN(v) ? v : (v +'px');
        };
        return (typeof key === 'string' && value === undefined) ? function(){
            if(that.length > 0) return that[0].style[key];
        }() : that.each(function(index, item){
            typeof key === 'object' ? lay.each(key, function(thisKey, thisValue){
                item.style[thisKey] = parseValue(thisValue);
            }) : item.style[key] = parseValue(value);
        });
    };

    // 添加或获取宽度
    Class.fn.width = function(value){
        var that = this;
        return value === undefined ? function(){
            if(that.length > 0) return that[0].offsetWidth; // 此处还需做兼容
        }() : that.each(function(index, item){
            that.css('width', value);
        });
    };

    // 添加或获取高度
    Class.fn.height = function(value){
        var that = this;
        return value === undefined ? function(){
            if(that.length > 0) return that[0].offsetHeight; // 此处还需做兼容
        }() : that.each(function(index, item){
            that.css('height', value);
        });
    };

    // 添加或获取属性
    Class.fn.attr = function(key, value){
        var that = this;
        return value === undefined ? function(){
            if(that.length > 0) return that[0].getAttribute(key);
        }() : that.each(function(index, item){
            item.setAttribute(key, value);
        });
    };

    // 移除属性
    Class.fn.removeAttr = function(key){
        return this.each(function(index, item){
            item.removeAttribute(key);
        });
    };

    // 设置或获取 HTML 内容
    Class.fn.html = function(html){
        var that = this;
        return html === undefined ? function(){
            if(that.length > 0) return that[0].innerHTML;
        }() : this.each(function(index, item){
            item.innerHTML = html;
        });
    };

    // 设置或获取值
    Class.fn.val = function(value){
        var that = this;
        return value === undefined ? function(){
            if(that.length > 0) return that[0].value;
        }() : this.each(function(index, item){
            item.value = value;
        });
    };

    // 追加内容
    Class.fn.append = function(elem){
        return this.each(function(index, item){
            typeof elem === 'object'
                ? item.appendChild(elem)
                :  item.innerHTML = item.innerHTML + elem;
        });
    };

    // 移除内容
    Class.fn.remove = function(elem){
        return this.each(function(index, item){
            elem ? item.removeChild(elem) : item.parentNode.removeChild(item);
        });
    };

    // 事件绑定
    Class.fn.on = function(eventName, fn){
        return this.each(function(index, item){
            item.attachEvent ? item.attachEvent('on' + eventName, function(e){
                e.target = e.srcElement;
                fn.call(item, e);
            }) : item.addEventListener(eventName, fn, false);
        });
    };

    // 解除事件
    Class.fn.off = function(eventName, fn){
        return this.each(function(index, item){
            item.detachEvent
                ? item.detachEvent('on'+ eventName, fn)
                : item.removeEventListener(eventName, fn, false);
        });
    };

    // export
    window.lay = lay;

    // 输出为 layui 模块
    if(window.layui && layui.define){
        layui.define(function(exports){
            exports(MOD_NAME, lay);
        });
    }

}(window, window.document); // gulp build: lay-footer

// 内置模块：laypage（同步内联）
/**
 * laypage 分页组件
 */

layui.define(function(exports){
    "use strict";

    var doc = document
        ,id = 'getElementById'
        ,tag = 'getElementsByTagName'

        //字符常量
        ,MOD_NAME = 'laypage', DISABLED = 'layui-disabled'

        //构造器
        ,Class = function(options){
            var that = this;
            that.config = options || {};
            that.config.index = ++laypage.index;
            that.render(true);
        };

    //判断传入的容器类型
    Class.prototype.type = function(){
        var config = this.config;
        if(typeof config.elem === 'object'){
            return config.elem.length === undefined ? 2 : 3;
        }
    };

    // 分页视图
    Class.prototype.view = function(){
        var that = this;
        var config = that.config;

        // 连续页码个数
        var groups = config.groups = 'groups' in config
            ? (Number(config.groups) || 0)
            : 5;

        // 排版
        config.layout = typeof config.layout === 'object'
            ? config.layout
            : ['prev', 'page', 'next'];

        config.count = Number(config.count) || 0; // 数据总数
        config.curr = Number(config.curr) || 1; // 当前页

        // 每页条数的选择项
        config.limits = typeof config.limits === 'object'
            ? config.limits
            : [10, 20, 30, 40, 50];

        // 默认条数
        config.limit = Number(config.limit) || 10;

        //总页数
        config.pages = Math.ceil(config.count/config.limit) || 1;

        // 当前页不能超过总页数
        if(config.curr > config.pages){
            config.curr = config.pages;
        } else if(config.curr < 1) { // 当前分页不能小于 1
            config.curr = 1;
        }

        //连续分页个数不能低于 0 且不能大于总页数
        if(groups < 0){
            groups = 1;
        } else if (groups > config.pages){
            groups = config.pages;
        }

        config.prev = 'prev' in config ? config.prev : '&#x4E0A;&#x4E00;&#x9875;'; //上一页文本
        config.next = 'next' in config ? config.next : '&#x4E0B;&#x4E00;&#x9875;'; //下一页文本

        //计算当前组
        var index = config.pages > groups
            ? Math.ceil( (config.curr + (groups > 1 ? 1 : 0)) / (groups > 0 ? groups : 1) )
            : 1

            //视图片段
            ,views = {
                //上一页
                prev: function(){
                    return config.prev
                        ? '<a class="layui-laypage-prev'+ (config.curr == 1 ? (' ' + DISABLED) : '') +'" data-page="'+ (config.curr - 1) +'">'+ config.prev +'</a>'
                        : '';
                }()

                //页码
                ,page: function(){
                    var pager = [];

                    //数据量为0时，不输出页码
                    if(config.count < 1){
                        return '';
                    }

                    //首页
                    if(index > 1 && config.first !== false && groups !== 0){
                        pager.push('<a class="layui-laypage-first" data-page="1"  title="&#x9996;&#x9875;">'+ (config.first || 1) +'</a>');
                    }

                    //计算当前页码组的起始页
                    var halve = Math.floor((groups-1)/2) //页码数等分
                        ,start = index > 1 ? config.curr - halve : 1
                        ,end = index > 1 ? (function(){
                        var max = config.curr + (groups - halve - 1);
                        return max > config.pages ? config.pages : max;
                    }()) : groups;

                    //防止最后一组出现“不规定”的连续页码数
                    if(end - start < groups - 1){
                        start = end - groups + 1;
                    }

                    //输出左分割符
                    if(config.first !== false && start > 2){
                        pager.push('<span class="layui-laypage-spr">&#x2026;</span>')
                    }

                    //输出连续页码
                    for(; start <= end; start++){
                        if(start === config.curr){
                            //当前页
                            pager.push('<span class="layui-laypage-curr"><em class="layui-laypage-em" '+ (/^#/.test(config.theme) ? 'style="background-color:'+ config.theme +';"' : '') +'></em><em>'+ start +'</em></span>');
                        } else {
                            pager.push('<a data-page="'+ start +'">'+ start +'</a>');
                        }
                    }

                    //输出输出右分隔符 & 末页
                    if(config.pages > groups && config.pages > end && config.last !== false){
                        if(end + 1 < config.pages){
                            pager.push('<span class="layui-laypage-spr">&#x2026;</span>');
                        }
                        if(groups !== 0){
                            pager.push('<a class="layui-laypage-last" title="&#x5C3E;&#x9875;"  data-page="'+ config.pages +'">'+ (config.last || config.pages) +'</a>');
                        }
                    }

                    return pager.join('');
                }()

                //下一页
                ,next: function(){
                    return config.next
                        ? '<a class="layui-laypage-next'+ (config.curr == config.pages ? (' ' + DISABLED) : '') +'" data-page="'+ (config.curr + 1) +'">'+ config.next +'</a>'
                        : '';
                }()

                //数据总数
                ,count: '<span class="layui-laypage-count">共 '+ config.count +' 条</span>'

                //每页条数
                ,limit: function(){
                    var options = ['<span class="layui-laypage-limits"><select lay-ignore>'];
                    layui.each(config.limits, function(index, item){
                        options.push(
                            '<option value="'+ item +'"'
                            +(item === config.limit ? 'selected' : '')
                            +'>'+ item +' 条/页</option>'
                        );
                    });
                    return options.join('') +'</select></span>';
                }()

                //刷新当前页
                ,refresh: ['<a data-page="'+ config.curr +'" class="layui-laypage-refresh">'
                    ,'<i class="layui-icon layui-icon-refresh"></i>'
                    ,'</a>'].join('')

                //跳页区域
                ,skip: function(){
                    return ['<span class="layui-laypage-skip">&#x5230;&#x7B2C;'
                        ,'<input type="text" min="1" value="'+ config.curr +'" class="layui-input">'
                        ,'&#x9875;<button type="button" class="layui-laypage-btn">&#x786e;&#x5b9a;</button>'
                        ,'</span>'].join('');
                }()
            };

        return ['<div class="layui-box layui-laypage layui-laypage-'+ (config.theme ? (
            /^#/.test(config.theme) ? 'molv' : config.theme
        ) : 'default') +'" id="layui-laypage-'+ config.index +'">'
            ,function(){
                var plate = [];
                layui.each(config.layout, function(index, item){
                    if(views[item]){
                        plate.push(views[item])
                    }
                });
                return plate.join('');
            }()
            ,'</div>'].join('');
    };

    //跳页的回调
    Class.prototype.jump = function(elem, isskip){
        if(!elem) return;
        var that = this
            ,config = that.config
            ,childs = elem.children
            ,btn = elem[tag]('button')[0]
            ,input = elem[tag]('input')[0]
            ,select = elem[tag]('select')[0]
            ,skip = function(){
            var curr = Number(input.value.replace(/\s|\D/g, ''));
            if(curr){
                config.curr = curr;
                that.render();
            }
        };

        if(isskip) return skip();

        //页码
        for(var i = 0, len = childs.length; i < len; i++){
            if(childs[i].nodeName.toLowerCase() === 'a'){
                laypage.on(childs[i], 'click', function(){
                    var curr = Number(this.getAttribute('data-page'));
                    if(curr < 1 || curr > config.pages) return;
                    config.curr = curr;
                    that.render();
                });
            }
        }

        //条数
        if(select){
            laypage.on(select, 'change', function(){
                var value = this.value;
                if(config.curr*value > config.count){
                    config.curr = Math.ceil(config.count/value);
                }
                config.limit = value;
                that.render();
            });
        }

        //确定
        if(btn){
            laypage.on(btn, 'click', function(){
                skip();
            });
        }
    };

    //输入页数字控制
    Class.prototype.skip = function(elem){
        if(!elem) return;
        var that = this, input = elem[tag]('input')[0];
        if(!input) return;
        laypage.on(input, 'keyup', function(e){
            var value = this.value
                ,keyCode = e.keyCode;
            if(/^(37|38|39|40)$/.test(keyCode)) return;
            if(/\D/.test(value)){
                this.value = value.replace(/\D/, '');
            }
            if(keyCode === 13){
                that.jump(elem, true)
            }
        });
    };

    //渲染分页
    Class.prototype.render = function(load){
        var that = this
            ,config = that.config
            ,type = that.type()
            ,view = that.view();

        if(type === 2){
            config.elem && (config.elem.innerHTML = view);
        } else if(type === 3){
            config.elem.html(view);
        } else {
            if(doc[id](config.elem)){
                doc[id](config.elem).innerHTML = view;
            }
        }

        config.jump && config.jump(config, load);

        var elem = doc[id]('layui-laypage-' + config.index);
        that.jump(elem);

        if(config.hash && !load){
            location.hash = '!'+ config.hash +'='+ config.curr;
        }

        that.skip(elem);
    };

    //外部接口
    var laypage = {
        //分页渲染
        render: function(options){
            var o = new Class(options);
            return o.index;
        }
        ,index: layui.laypage ? (layui.laypage.index + 10000) : 0
        ,on: function(elem, even, fn){
            elem.attachEvent ? elem.attachEvent('on'+ even, function(e){ //for ie
                e.target = e.srcElement;
                fn.call(elem, e);
            }) : elem.addEventListener(even, fn, false);
            return this;
        }
    }

    exports(MOD_NAME, laypage);
});

// 内置模块：rate（同步内联）
/**
 * rate 评分评星组件
 */

layui.define(['jquery', 'lay'],function(exports){
    "use strict";

    var $ = layui.jquery;
    var lay = layui.lay;

    // 外部接口
    var rate = {
            config: {}
            ,index: layui.rate ? (layui.rate.index + 10000) : 0

            //设置全局项
            ,set: function(options){
                var that = this;
                that.config = $.extend({}, that.config, options);
                return that;
            }

            //事件
            ,on: function(events, callback){
                return layui.onevent.call(this, MOD_NAME, events, callback);
            }
        }

        // 操作当前实例
        ,thisRate = function(){
            var that = this
                ,options = that.config;

            return {
                setvalue: function(value){
                    that.setvalue.call(that, value);
                }
                ,config: options
            }
        }

        //字符常量
        ,MOD_NAME = 'rate',ELEM_VIEW = 'layui-rate', ICON_RATE = 'layui-icon-rate', ICON_RATE_SOLID = 'layui-icon-rate-solid', ICON_RATE_HALF = 'layui-icon-rate-half'

        ,ICON_SOLID_HALF = 'layui-icon-rate-solid layui-icon-rate-half',  ICON_SOLID_RATE = 'layui-icon-rate-solid layui-icon-rate',  ICON_HALF_RATE = 'layui-icon-rate layui-icon-rate-half'

        //构造器
        ,Class = function(options){
            var that = this;
            that.index = ++rate.index;
            that.config = $.extend({}, that.config, rate.config, options);
            that.render();
        };

    //默认配置
    Class.prototype.config = {
        length: 5  //初始长度
        ,text: false  //是否显示评分等级
        ,readonly: false  //是否只读
        ,half: false  //是否可以半星
        ,value: 0 //星星选中个数
        ,theme: ''
    };

    //评分渲染
    Class.prototype.render = function(){
        var that = this;
        var options = that.config;

        // 若 elem 非唯一，则拆分为多个实例
        var elem = $(options.elem);
        if(elem.length > 1){
            layui.each(elem, function(){
                rate.render($.extend({}, options, {
                    elem: this
                }));
            });
            return that;
        }

        // 合并 lay-options 属性上的配置信息
        $.extend(options, lay.options(elem[0]));

        // 自定义主题
        var style = options.theme ? ('style="color: '+ options.theme + ';"') : '';

        options.elem = $(options.elem);

        //最大值不能大于总长度
        if(options.value > options.length){
            options.value = options.length;
        }

        //如果没有选择半星的属性，却给了小数的数值，统一向上或向下取整
        if(parseInt(options.value) !== options.value){
            if(!options.half){
                options.value = (Math.ceil(options.value) - options.value) < 0.5 ? Math.ceil(options.value): Math.floor(options.value)
            }
        }

        //组件模板
        var temp = '<ul class="layui-rate" '+ (options.readonly ? 'readonly' : '') +'>';
        for(var i = 1;i <= options.length;i++){
            var item = '<li class="layui-inline"><i class="layui-icon '
                + (i>Math.floor(options.value)?ICON_RATE:ICON_RATE_SOLID)
                + '" '+ style +'></i></li>';

            if(options.half&&parseInt(options.value) !== options.value&&i == Math.ceil(options.value)){
                temp = temp + '<li><i class="layui-icon layui-icon-rate-half" '+ style +'></i></li>';
            }else{
                temp = temp +item;
            }
        }
        temp += '</ul>' + (options.text ? ('<span class="layui-inline">'+ options.value + '星') : '') + '</span>';

        //开始插入替代元素
        var othis = options.elem
            ,hasRender = othis.next('.' + ELEM_VIEW);

        //生成替代元素
        hasRender[0] && hasRender.remove(); //如果已经渲染，则Rerender

        that.elemTemp = $(temp);

        options.span = that.elemTemp.next('span');

        options.setText && options.setText(options.value);

        othis.html(that.elemTemp);

        othis.addClass("layui-inline");

        //如果不是只读，那么进行触控事件
        if(!options.readonly) that.action();

    };

    //评分重置
    Class.prototype.setvalue = function(value){
        var that = this
            ,options = that.config ;

        options.value = value ;
        that.render();
    };

    //li触控事件
    Class.prototype.action = function(){
        var that = this
            ,options = that.config
            ,_ul = that.elemTemp
            ,wide = _ul.find("i").width();

        _ul.children("li").each(function(index){
            var ind = index + 1
                ,othis = $(this);

            //点击
            othis.on('click', function(e){
                //将当前点击li的索引值赋给value
                options.value = ind;
                if(options.half){
                    //获取鼠标在li上的位置
                    var x = e.pageX - $(this).offset().left;
                    if(x <= wide / 2){
                        options.value = options.value - 0.5;
                    }
                }

                if(options.text)  _ul.next("span").text(options.value + "星");

                options.choose && options.choose(options.value);
                options.setText && options.setText(options.value);
            });

            //移入
            othis.on('mousemove', function(e){
                _ul.find("i").each(function(){
                    $(this).addClass(ICON_RATE).removeClass(ICON_SOLID_HALF)
                });
                _ul.find("i:lt(" + ind + ")").each(function(){
                    $(this).addClass(ICON_RATE_SOLID).removeClass(ICON_HALF_RATE)
                });
                // 如果设置可选半星，那么判断鼠标相对li的位置
                if(options.half){
                    var x = e.pageX - $(this).offset().left;
                    if(x <= wide / 2){
                        othis.children("i").addClass(ICON_RATE_HALF).removeClass(ICON_RATE_SOLID)
                    }
                }
            })

            //移出
            othis.on('mouseleave', function(){
                _ul.find("i").each(function(){
                    $(this).addClass(ICON_RATE).removeClass(ICON_SOLID_HALF)
                });
                _ul.find("i:lt(" + Math.floor(options.value) + ")").each(function(){
                    $(this).addClass(ICON_RATE_SOLID).removeClass(ICON_HALF_RATE)
                });
                //如果设置可选半星，根据分数判断是否有半星
                if(options.half){
                    if(parseInt(options.value) !== options.value){
                        _ul.children("li:eq(" + Math.floor(options.value) + ")").children("i").addClass(ICON_RATE_HALF).removeClass(ICON_SOLID_RATE)
                    }
                }
            })

        })
    };

    //事件处理
    Class.prototype.events = function(){
        var that = this
            ,options = that.config;
    };

    //核心入口
    rate.render = function(options){
        var inst = new Class(options);
        return thisRate.call(inst);
    };

    exports(MOD_NAME, rate);
})

// 内置模块：all（同步内联）
/**
 * 用于加载所有内置模块
 * MIT Licensed
 */

layui.define(function(){
    var mods = []
        ,builtin = layui.cache.builtin;
    layui.each(builtin, function(modName){
        (modName === 'all' || modName === 'layui.all') || mods.push(modName);
    });
    layui.cache.startTime = new Date().getTime();

    return mods;
}(), function(exports){
    "use strict";

    var MOD_NAME = 'all'

        //外部接口
        ,all = {
            config: {}
            ,time: function(){
                var time = new Date().getTime() - layui.cache.startTime;
                delete layui.cache.startTime;
                return time;
            }()
        };

    exports(MOD_NAME, all);
});

// 内置模块：layui.all（同步内联）
/**
 * 用于打包聚合版，该文件不会存在于构建后的目录
 */

layui.define(function(exports){
    var cache = layui.cache;
    layui.config({
        dir: cache.dir.replace(/lay\/dest\/$/, '')
    });
    exports('layui.all', layui.v);
});

