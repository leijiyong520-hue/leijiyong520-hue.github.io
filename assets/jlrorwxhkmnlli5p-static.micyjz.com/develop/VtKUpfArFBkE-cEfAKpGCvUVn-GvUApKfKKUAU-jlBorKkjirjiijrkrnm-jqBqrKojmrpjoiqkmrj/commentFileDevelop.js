(function(window, $, undefined) {
    var phoenixSite = window.phoenixSite || (window.phoenixSite = {});
    var commentFileDevelop = phoenixSite.commentFileDevelop || (phoenixSite.commentFileDevelop = {});
    var _options = {};
    var isFrontend = window.$_phoenix == undefined;
    $.extend(commentFileDevelop, {
        init: function(option) {
            $.extend(_options, option);
            var _this = $('.'+_options.className+' .evaluation-proddesc-container');
            var commentStar = $(".comment-star-class", _this);
            var starList = $(".comment-star-desc",_this);
            var customerList = $(".customerName",_this);
            commentFileDevelop.commentAssess(commentStar);
            commentFileDevelop.commentAns();
            commentFileDevelop.commentAdd(_this);
            commentFileDevelop.commentUpFile();
            commentFileDevelop.commentAssess2(starList);
            commentFileDevelop.commentSetCustomer(customerList);
        },
        reloadInit: function(){
            var _this = $('.'+_options.className+' .evaluation-proddesc-container');
            var starList = $(".comment-star-desc",_this);
            commentFileDevelop.commentAssess2(starList);
            commentFileDevelop.commentOptions.dataArr = [];
        },
        getUserReview: function(replaceClass, pageNum, prodId) {
            if (pageNum == undefined || pageNum == 0) {
                pageNum = '1';
            }
            var url = "/phoenix/admin/comment/subList?productId=" + prodId +'&pageNum='+pageNum;
            var ajaxOption = {
                url: url,
                type: 'get',
                cache: false,
                dataType: 'html'
            }
            $.ajax(ajaxOption).done(function(response, textStatus, jqXHR) {
                $('.'+replaceClass+ " #sub_list_block").html(response);

                commentFileDevelop.reloadInit();
            }).always(function(response, textStatus, jqXHR) {});
        },
        commentAns: function() {
            var _this = $('.' + _options.className);
            var ans = $(".comment-answer", _this);
            var ansshow = $(".commentans", _this)[0];
            ans.unbind('click').bind("click", function() {
                if (ansshow.style.display == "none") {
                    ansshow.style.display = "block";
                } else {
                    ansshow.style.display = "none";
                }
            });
        },
        commentAdd: function(_this) {
            for (var i = 0; i < 5; i++) {
                $(".commentans-mark ul li a", _this).parent().attr("class", "fullStar");
            }
            $(".commentans-mark ul li a", _this).unbind('click').bind("click", function() {
                // 判断是全星点还是半星点，修改当前标签的父标签li的class为对应的星星图像
                if (parseInt($(this).html()) % 2 == 1) {
                    $(this).parent().attr("class", "fullStar");
                    $(".comment-star-up", _this).html(((parseInt($(this).html()) + 1) / 2));
                } else {
                    $(this).parent().attr("class", "fullStar");
                    $(".comment-star-up", _this).html((parseInt($(this).html()) / 2));
                }
                // 对前方的星星进行处理，遍历前方的li使背景图均变为全星
                var prev = $(this).parent();
                for (var i = 0; i <= (parseInt($(this).html()) / 2) - 1; i++) {
                    prev.prev().attr("class", "fullStar");
                    prev = prev.prev();
                }
                // 对后方星星进行处理，遍历后面的li使背景图均变为空星
                var after = $(this).parent();
                for (var i = 0; i <= (5 - parseInt($(this).html()) / 2) - 1; i++) {
                    after.next().attr("class", "emptyStar");
                    after = after.next();
                }

                // 提示文字隐藏
                $("#commentForm .commentans_RequireEmptyT").css("display","none");
            });
            $(".commentans-clear", _this).unbind('click').bind("click", function() {
                for (var i = 0; i < 5; i++) {
                    $(".commentans-mark ul li a", _this).parent().attr("class", "emptyStar");
                    $(".comment-star-up", _this).html(0);
                }
            });
        },
        commentAssess: function(star) {
            var commentAssessLength = star.length;
            for (var i = 0; i < commentAssessLength; i++) {
                //var starNum = star[i].innerHTML;
                var NumDE = $(star[i]).attr('attr-num');
                var eng = NumDE.indexOf(',');
                var lng = NumDE.indexOf('.');
                if (NumDE.indexOf(',') > -1) { //德语金额处理‘.’改为‘,’
                    var starNum = NumDE.replace(",", '.');
                } else {
                    var starNum = $(star[i]).attr('attr-num');
                }
                for (var j = 0; j < Math.floor(Number(starNum)); j++) {
                    var pb = document.createElement("b");
                    pb.style.display = "inline-block";
                    pb.style.width = 15 + "px";
                    pb.style.height = 15 + "px";
                    pb.style.marginRight = 3 + "px";
                    pb.className = "fullStar"
                    star[i].appendChild(pb);
                }
                if (eng > -1 || lng > -1) {
                    var pb = document.createElement("b");
                    pb.style.display = "inline-block";
                    pb.style.width = 15 + "px";
                    pb.style.height = 15 + "px";
                    pb.style.marginRight = 3 + "px";
                    pb.className="halfStar"
                    star[i].appendChild(pb);
                }
                var endStarNum = 5 - Math.ceil(Number(starNum));
                for (var k = 0; k < endStarNum; k++) {
                    var pb = document.createElement("b");
                    pb.style.display = "inline-block";
                    pb.style.width = 15 + "px";
                    pb.style.height = 15 + "px";
                    pb.style.marginRight = 3 + "px";
                    pb.className="emptyStar"
                    star[i].appendChild(pb);
                }
                return;
                //之前星级处理已废除
                if (starNum * 2 % 2 == 0 || (starNum - parseInt(starNum) <= 0.22)) {
                    star[i].innerHTML = " ";
                    for (var j = 0; j < parseInt(starNum); j++) {
                        var pb = document.createElement("b");
                        pb.style.display = "inline-block";
                        pb.style.width = 15 + "px";
                        pb.style.height = 16 + "px";
                        pb.style.marginRight = 3 + "px";
                        pb.className='fullStar'
                        star[i].appendChild(pb);
                    }
                    var endStarNum = 5 - starNum;
                    for (var k = 0; k < endStarNum; k++) {
                        var pb = document.createElement("b");
                        pb.style.display = "inline-block";
                        pb.style.width = 15 + "px";
                        pb.style.height = 16 + "px";
                        pb.style.marginRight = 3 + "px";
                        pb.className="starEmpty"
                        star[i].appendChild(pb);
                    }
                } else if (starNum * 2 % 2 == 1 || (starNum - parseInt(starNum) <= 0.72 && starNum - parseInt(starNum) >= 0.28)) {
                    star[i].innerHTML = " ";
                    var starNums = parseInt(starNum);
                    for (var j = 0; j < starNums; j++) {
                        var pb = document.createElement("b");
                        pb.style.display = "inline-block";
                        pb.style.width = 15 + "px";
                        pb.style.height = 16 + "px";
                        pb.style.marginRight = 3 + "px";
                        pb.className='fullStar'
                        star[i].appendChild(pb);
                    }
                    var pb = document.createElement("b");
                    pb.style.display = "inline-block";
                    pb.style.width = 15 + "px";
                    pb.style.height = 16 + "px";
                    pb.style.marginRight = 3 + "px";
                    pb.className='halfStar'
                    star[i].appendChild(pb);
                    var endStarNum = 5 - starNums - 1;
                    for (var k = 0; k < endStarNum; k++) {
                        var pb = document.createElement("b");
                        pb.style.display = "inline-block";
                        pb.style.width = 15 + "px";
                        pb.style.height = 15 + "px";
                        pb.style.marginRight = 3 + "px";
                        pb.className="emptyStar";
                        star[i].appendChild(pb);
                    }
                } else if (starNum - parseInt(starNum) >= 0.78) {
                    star[i].innerHTML = " ";
                    starNum++;
                    for (var j = 0; j < parseInt(starNum); j++) {
                        var pb = document.createElement("b");
                        pb.style.display = "inline-block";
                        pb.style.width = 15 + "px";
                        pb.style.height = 16 + "px";
                        pb.style.marginRight = 3 + "px";
                        pb.className='fullStar';
                        star[i].appendChild(pb);
                    }
                    var endStarNum = 5 - parseInt(starNum);
                    for (var k = 0; k < endStarNum; k++) {
                        var pb = document.createElement("b");
                        pb.style.display = "inline-block";
                        pb.style.width = 15 + "px";
                        pb.style.height = 16 + "px";
                        pb.style.marginRight = 3 + "px";
                        pb.className="emptyStar";
                        star[i].appendChild(pb);
                    }
                }
            }
        },
        commentAssess2: function(star) {
            var commentAssessLength = star.length;
            for (var i = 0; i < commentAssessLength; i++) {
                //var starNum = star[i].innerHTML;
                var starNum = $(star[i]).text();

                star[i].innerHTML = " ";
                for (var j = 0; j < Math.ceil(Number(starNum)); j++) {
                    var pb = document.createElement("b");
                    pb.style.display = "inline-block";
                    pb.style.width = 15 + "px";
                    pb.style.height = 15 + "px";
                    pb.style.marginRight = 3 + "px";
                    pb.className='fullStar';
                    star[i].appendChild(pb);
                }
                var endStarNum = 5 - Math.ceil(Number(starNum));
                for (var k = 0; k < endStarNum; k++) {
                    var pb = document.createElement("b");
                    pb.style.display = "inline-block";
                    pb.style.width = 15 + "px";
                    pb.style.height = 15 + "px";
                    pb.style.marginRight = 3 + "px";
                    star[i].appendChild(pb);
                    pb.className="emptyStar";
                }
            }
        },
        commentOptions: {
            dataArr: []
        },
        commentUpFile: function() {
            var _this = $('.' + _options.className);
            var oAdd = $(".comment-label", _this); //添加图片
            var oSubmit = $(".commentans-submit", _this); //提交
            var oInput = $(".commentans-inputimg", _this)[0]; //文件输入框
            var form = $(".commentForm", _this)[0]; //form保单
            var Ctitle = $(".commentans-title", _this); //标题
            var Ccontent = $(".commentans-content", _this); //内容
            var Cstar = $(".comment-star-up", _this)[0]; //评价星级
            var commentRequireT = $(".commentRequireT", _this)[0]; //标题验证
            var commentRequireC = $(".commentRequireC", _this)[0]; //内容验证
            var commentRequireEmptyC = $(".commentRequireEmptyC", _this)[0]; //标题判空验证
            var commentRequireEmptyT = $(".commentRequireEmptyT", _this)[0]; //内容盘空验证
            var commentFlag = 1; //提交状态吗
            var commentCovercolor = $(".comment-covercolor", _this)[0]; //遮罩层
            var commentCover = $(".comment-cover", _this)[0]; //提交等待
            var commentsuccess = $(".comment-success", _this)[0]; //成功遮罩层
            var commentfalse = $(".comment-false", _this)[0]; //失败遮罩层
            var commentFalseSpan = $(".comment-false-span", _this)[0]; //失败内容输出
            var commentRequirema = $(".commentRequirema", _this)[0]; //验证码cuowu提示
            var commentclickre = $(".commentclickre", _this); //点击验证码
            var commentinputrequired = $(".commentinputrequired", _this); //验证码输入框
            var fileimage = $(".file-image", _this); //选择图片显示
            var commentsiximg = $(".comment-siximg", _this)[0]; //选择图片显示
            var result;
           //  var dataArr = commentFileDevelop.commentOptions.dataArr; // 储存所选图片的结果(文件名和base64数据)
            var fd; //FormData方式发送请求
            if (typeof FileReader === 'undefined') {
                console.log("抱歉，你的浏览器不支持 FileReader");
                oInput.setAttribute('disabled', 'disabled');
            } else if (oInput) {
                oInput.addEventListener('change', readFile, false);
            } //handler
            function readFile() {
                var iLen = this.files.length;
                var numimg = document.getElementById('file-image').children;
                var index = 0;
                for (var i = 0; i < iLen; i++) {
                    var reader = new FileReader();
                    reader.index = i;
                    //fd.append(i,this.files[i]);
                    reader.readAsDataURL(this.files[i]); //转成base64
                    reader.fileName = this.files[i].name;
                    reader.onload = function(e) {
                        var imgMsg = {
                            name: this.fileName, //获取文件名
                            base64: this.result //reader.readAsDataURL方法执行完后，base64数据储存在reader.result里
                        }
                        if (commentFileDevelop.commentOptions.dataArr.length < 6) {
                            commentFileDevelop.commentOptions.dataArr.push(imgMsg);
                            //console.log(dataArr.length);
                        }
                        result = '<div class="comment-delete1"></div><div class="comment-back"></div><div class="result"><img src="' + this.result + '" alt=""/></div>';
                        var div = document.createElement('div');

                        //console.log(numimg.length);
                        div.innerHTML = result;
                        div['className'] = 'comment-img-float';
                        div['index'] = index;
                        if (numimg.length < 6) {
                            document.getElementById('file-image').appendChild(div);
                            commentsiximg.innerHTML = numimg.length + "/6";
                        }
                        var img = div.getElementsByTagName('img')[0];
                        img.style.width = 35 + "px";
                        img.style.height = 35 + "px";

                        div.onclick = function() {
                            this.remove(); // 在页面中删除该图片元素
                            delete commentFileDevelop.commentOptions.dataArr[this.index]; // 删除dataArr对应的数据
                            commentsiximg.innerHTML = (numimg.length) + "/6";
                        }
                        index++;
                    }
                }
            }
            oAdd.unbind('click').bind("click",  function() {
                oInput.value = ""; // 先将oInput值清空，否则选择图片与上次相同时change事件不会触发
            });
            //输入框判空处理以及字符限制
            Ctitle.on("blur", function() {
                if ($(".commentans-title").val().length > 80) {
                    //console.log("请输入1~80个字符");
                    commentRequireT.style.display = "block";
                    Ctitle[0].style.borderColor = "#f00";
                    commentRequireEmptyT.style.display = "none";
                    commentFlag = 0;
                } else {
                    commentRequireT.style.display = "none";
                    commentRequireEmptyT.style.display = "none";
                    commentFlag = 1;
                    Ctitle[0].style.borderColor = "#ccc";
                }
            });
            Ccontent.on("blur", function() {
                if ($(".commentans-content").val().length > 3000 || ($(".commentans-content").val().length < 1 && $(".commentans-content").val().length > 0)) {
                    //console.log("请输入1~3000个字符");
                    commentRequireC.style.display = "block";
                    commentFlag = 0;
                    commentRequireEmptyC.style.display = "none";
                    Ccontent[0].style.borderColor = "#f00";
                } else {
                    commentRequireC.style.display = "none";
                    commentRequireEmptyC.style.display = "none";
                    commentFlag = 1;
                    Ccontent[0].style.borderColor = "#ccc";
                }
            });
            oSubmit.unbind('click').bind("click",  function(e) {
                oData = new FormData(form);
                oData.append("commentStar", Cstar.innerHTML);
                e.preventDefault();
                console.log();
                if (parseFloat($(Cstar).text()) <=0 ) {
                    $("#commentForm .commentans_RequireEmptyT").css("display","inline-block");
                }else if (!Ctitle[0].value) {
                    //console.log("标题不能为空！");
                    commentRequireEmptyT.style.display = "block";
                    Ctitle[0].style.borderColor = "#f00";
                } else if (!Ccontent[0].value) {
                    //console.log("内容不能为空！");
                    commentRequireEmptyC.style.display = "block";
                    Ccontent[0].style.borderColor = "#f00";
                } else if (commentFlag == 1) {
                    var submitArr = [];
                    for (var i = 0; i < commentFileDevelop.commentOptions.dataArr.length; i++) {
                        if (commentFileDevelop.commentOptions.dataArr[i]) {
                            submitArr.push(commentFileDevelop.commentOptions.dataArr[i]);
                        }
                    }
                    //base64转成blob
                    function dataURLtoBlob(dataurl) {
                        var arr = dataurl.split(','),
                            mime = arr[0].match(/:(.*?);/)[1],
                            bstr = atob(arr[1]),
                            n = bstr.length,
                            u8arr = new Uint8Array(n);
                        while (n--) {
                            u8arr[n] = bstr.charCodeAt(n);
                        }
                        return new Blob([u8arr], {
                            type: mime
                        });
                    }
                    for (var i = 0; i < submitArr.length; i++) {
                        blobs = dataURLtoBlob(submitArr[i].base64);
                        oData.append("fileData", blobs, submitArr[i].name);
                    }
                    var oReq = new XMLHttpRequest();
                    oReq.open("POST", "/phoenix/admin/comment", true);
                    oReq.onreadystatechange = function() {
                        if (oReq.readyState == 4 && oReq.status == 200) {
                            var resData = JSON.parse(oReq.responseText);
                            if (resData.success) {
                                commentCover.style.display = "none";
                                commentsuccess.style.display = "block";
                                setTimeout(function() {
                                    commentsuccess.style.display = "none";
                                    commentCovercolor.style.display = "none";
                                }, 1000);
                                Ctitle[0].value = " ";
                                Ccontent[0].value = " ";
                                commentinputrequired[0].value = "";
                                fileimage[0].innerHTML = " ";
                                commentRequirema.style.display = "none";
                                commentFileDevelop.getUserReview(_options.className, _options.pageNum, _options.prodId);
                                $(".commentclickre", _this).trigger("click");
                            } else if (resData.error.typeError) {
                                commentCover.style.display = "none";
                                commentfalse.style.display = "block";
                                commentFalseSpan.innerHTML = "评论类型有误";
                                setTimeout(function() {
                                    commentfalse.style.display = "none";
                                    commentCovercolor.style.display = "none";
                                }, 1000);
                                commentRequirema.style.display = "none";
                            } else if (resData.error.uploadFailed) {
                                commentCover.style.display = "none";
                                commentfalse.style.display = "block";
                                commentFalseSpan.innerHTML = "上传文件失败";
                                setTimeout(function() {
                                    commentfalse.style.display = "none";
                                    commentCovercolor.style.display = "none";
                                }, 1000);
                                commentRequirema.style.display = "none";
                            } else if (resData.error.notImage) {
                                commentCover.style.display = "none";
                                commentfalse.style.display = "block";
                                commentFalseSpan.innerHTML = "文件类型错误";
                                setTimeout(function() {
                                    commentfalse.style.display = "none";
                                    commentCovercolor.style.display = "none";
                                }, 1000);
                                commentRequirema.style.display = "none";
                            } else if (resData.error.noVerifyCode) {
                                commentCover.style.display = "none";
                                commentCovercolor.style.display = "none";
                                //commentfalse.style.display="block";
                                commentRequirema.style.display = "inline-block";
                                commentclickre.onclick = function() {
                                    phoenixSite.faptcha.reload("component_${settingId!}");
                                    return false;
                                }
                                commentinputrequired[0].value = "";
                                $(".commentclickre", _this).trigger("click");
                            }
                        } else {
                            //console.log("error");
                        }
                    }
                    oReq.send(oData);
                    commentCover.style.display = "block";
                    commentCovercolor.style.display = "block";
                }
            });
        },
        commentSetCustomer: function(customerList) {
            // 是否开启隐藏评价人 TODO
            var _isFlayHide = $(".customerName.hideFlagName");
            if(_isFlayHide.length > 0){
                $(customerList).each(function() {
                    var _custName = $(this).text().trim();
                    var _custLenght = _custName.length;
                    if (_custLenght >= 2) {
                        var _startStr = _custName.substring(0,1);
                        var _endStr = _custName.substring(_custLenght-1,_custLenght);
                        _custName = _startStr + "***" + _endStr;
                    } else {
                        _custName +="***";
                    }
                    $(this).text(_custName);
                });
            }
        }
    });
})(window, jQuery)