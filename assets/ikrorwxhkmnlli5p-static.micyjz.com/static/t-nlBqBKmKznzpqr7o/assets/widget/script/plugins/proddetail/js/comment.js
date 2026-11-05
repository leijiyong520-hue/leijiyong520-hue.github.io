(function(d,f,g){var e=d.phoenixSite||(d.phoenixSite={});
var b=e.commentListProd||(e.commentListProd={});
var a={};
var c=d.$_phoenix==g;
f.extend(b,{init:function(i){f.extend(a,i);
var l=f("."+a.className+".evaluation-proddesc-container");
console.log(l,a);
var h=f(".comment-star-class",l);
var k=f(".comment-star-desc",l);
var j=f(".customerName",l);
b.commentAssess(h);
b.commentAns();
b.commentAdd(l);
b.commentUpFile();
b.commentAssess2(k);
b.commentSetCustomer(j)
},reloadInit:function(){var i=f("."+a.className+".evaluation-proddesc-container");
var h=f(".comment-star-desc",i);
b.commentAssess2(h);
b.commentOptions.dataArr=[]
},getUserReview:function(h,l,k){if(l==g||l==0){l="1"
}var i="/phoenix/admin/comment/subList?productId="+k+"&pageNum="+l;
var j={url:i,type:"get",cache:false,dataType:"html"};
f.ajax(j).done(function(m,o,n){f("."+h+" #sub_list").html(m);
b.reloadInit()
}).always(function(m,o,n){})
},commentAns:function(){var j=f("."+a.className);
var h=f(".comment-answer",j);
var i=f(".commentans",j)[0];
h.unbind("click").bind("click",function(){if(i.style.display=="none"){i.style.display="block";
try{e.faptcha.reload("component_"+a.settingId)
}catch(k){console.log(k)
}}else{i.style.display="none"
}})
},commentAdd:function(j){for(var h=0;
h<5;
h++){f(".commentans-mark ul li a",j).parent().attr("class","fullStar")
}f(".commentans-mark ul li a",j).unbind("click").bind("click",function(){if(parseInt(f(this).html())%2==1){f(this).parent().attr("class","fullStar");
f(".comment-star-up",j).html(((parseInt(f(this).html())+1)/2))
}else{f(this).parent().attr("class","fullStar");
f(".comment-star-up",j).html((parseInt(f(this).html())/2))
}var l=f(this).parent();
for(var k=0;
k<=(parseInt(f(this).html())/2)-1;
k++){l.prev().attr("class","fullStar");
l=l.prev()
}var m=f(this).parent();
for(var k=0;
k<=(5-parseInt(f(this).html())/2)-1;
k++){m.next().attr("class","emptyStar");
m=m.next()
}f("#commentForm .commentans_RequireEmptyT").css("display","none")
});
f(".commentans-clear",j).unbind("click").bind("click",function(){for(var k=0;
k<5;
k++){f(".commentans-mark ul li a",j).parent().attr("class","emptyStar");
f(".comment-star-up",j).html(0)
}})
},commentAssess:function(r){var v=r.length;
for(var p=0;
p<v;
p++){var t=f(r[p]).attr("attr-num");
var l=t.indexOf(",");
var s=t.indexOf(".");
if(t.indexOf(",")>-1){var q=t.replace(",",".")
}else{var q=f(r[p]).attr("attr-num")
}for(var o=0;
o<Math.floor(Number(q));
o++){var u=document.createElement("b");
u.style.display="inline-block";
u.style.width=15+"px";
u.style.height=15+"px";
u.style.marginRight=3+"px";
u.className="fullStar";
r[p].appendChild(u)
}if(l>-1||s>-1){var u=document.createElement("b");
u.style.display="inline-block";
u.style.width=15+"px";
u.style.height=15+"px";
u.style.marginRight=3+"px";
u.className="halfStar";
r[p].appendChild(u)
}var h=5-Math.ceil(Number(q));
for(var n=0;
n<h;
n++){var u=document.createElement("b");
u.style.display="inline-block";
u.style.width=15+"px";
u.style.height=15+"px";
u.style.marginRight=3+"px";
u.className="emptyStar";
r[p].appendChild(u)
}return;
if(q*2%2==0||(q-parseInt(q)<=0.22)){r[p].innerHTML=" ";
for(var o=0;
o<parseInt(q);
o++){var u=document.createElement("b");
u.style.display="inline-block";
u.style.width=15+"px";
u.style.height=16+"px";
u.style.marginRight=3+"px";
u.className="fullStar";
r[p].appendChild(u)
}var h=5-q;
for(var n=0;
n<h;
n++){var u=document.createElement("b");
u.style.display="inline-block";
u.style.width=15+"px";
u.style.height=16+"px";
u.style.marginRight=3+"px";
u.className="starEmpty";
r[p].appendChild(u)
}}else{if(q*2%2==1||(q-parseInt(q)<=0.72&&q-parseInt(q)>=0.28)){r[p].innerHTML=" ";
var m=parseInt(q);
for(var o=0;
o<m;
o++){var u=document.createElement("b");
u.style.display="inline-block";
u.style.width=15+"px";
u.style.height=16+"px";
u.style.marginRight=3+"px";
u.className="fullStar";
r[p].appendChild(u)
}var u=document.createElement("b");
u.style.display="inline-block";
u.style.width=15+"px";
u.style.height=16+"px";
u.style.marginRight=3+"px";
u.className="halfStar";
r[p].appendChild(u);
var h=5-m-1;
for(var n=0;
n<h;
n++){var u=document.createElement("b");
u.style.display="inline-block";
u.style.width=15+"px";
u.style.height=15+"px";
u.style.marginRight=3+"px";
u.className="emptyStar";
r[p].appendChild(u)
}}else{if(q-parseInt(q)>=0.78){r[p].innerHTML=" ";
q++;
for(var o=0;
o<parseInt(q);
o++){var u=document.createElement("b");
u.style.display="inline-block";
u.style.width=15+"px";
u.style.height=16+"px";
u.style.marginRight=3+"px";
u.className="fullStar";
r[p].appendChild(u)
}var h=5-parseInt(q);
for(var n=0;
n<h;
n++){var u=document.createElement("b");
u.style.display="inline-block";
u.style.width=15+"px";
u.style.height=16+"px";
u.style.marginRight=3+"px";
u.className="emptyStar";
r[p].appendChild(u)
}}}}}},commentAssess2:function(r){var q=r.length;
for(var p=0;
p<q;
p++){var l=f(r[p]).text();
r[p].innerHTML=" ";
for(var n=0;
n<Math.ceil(Number(l));
n++){var o=document.createElement("b");
o.style.display="inline-block";
o.style.width=15+"px";
o.style.height=15+"px";
o.style.marginRight=3+"px";
o.className="fullStar";
r[p].appendChild(o)
}var h=5-Math.ceil(Number(l));
for(var m=0;
m<h;
m++){var o=document.createElement("b");
o.style.display="inline-block";
o.style.width=15+"px";
o.style.height=15+"px";
o.style.marginRight=3+"px";
r[p].appendChild(o);
o.className="emptyStar"
}}},commentOptions:{dataArr:[]},commentUpFile:function(){var A=f("."+a.className);
var q=f(".comment-label",A);
var l=f(".commentans-submit",A);
var o=f(".commentans-inputimg",A)[0];
var j=f(".commentForm",A)[0];
var w=f(".commentans-title",A);
var z=f(".commentans-content",A);
var k=f(".comment-star-up",A)[0];
var y=f(".commentRequireT",A)[0];
var F=f(".commentRequireC",A)[0];
var n=f(".commentRequireEmptyC",A)[0];
var G=f(".commentRequireEmptyT",A)[0];
var D=1;
var r=f(".comment-covercolor",A)[0];
var u=f(".comment-cover",A)[0];
var h=f(".comment-success",A)[0];
var v=f(".comment-false",A)[0];
var m=f(".comment-false-span",A)[0];
var B=f(".commentRequirema",A)[0];
var p=f(".commentclickre",A);
var C=f(".commentinputrequired",A);
var E=f(".file-image",A);
var s=f(".comment-siximg",A)[0];
var t;
var x;
if(typeof FileReader==="undefined"){console.log("抱歉，你的浏览器不支持 FileReader");
o.setAttribute("disabled","disabled")
}else{if(o){o.addEventListener("change",i,false)
}}function i(){var I=this.files.length;
var L=document.getElementById("file-image").children;
var J=0;
for(var K=0;
K<I;
K++){var H=new FileReader();
H.index=K;
H.readAsDataURL(this.files[K]);
H.fileName=this.files[K].name;
H.onload=function(O){var N={name:this.fileName,base64:this.result};
if(b.commentOptions.dataArr.length<6){b.commentOptions.dataArr.push(N)
}t='<div class="comment-delete1"></div><div class="comment-back"></div><div class="result"><img src="'+this.result+'" alt=""/></div>';
var P=document.createElement("div");
P.innerHTML=t;
P.className="comment-img-float";
P.index=J;
if(L.length<6){document.getElementById("file-image").appendChild(P);
s.innerHTML=L.length+"/6"
}var M=P.getElementsByTagName("img")[0];
M.style.width=35+"px";
M.style.height=35+"px";
P.onclick=function(){this.remove();
delete b.commentOptions.dataArr[this.index];
s.innerHTML=(L.length)+"/6"
};
J++
}
}}q.unbind("click").bind("click",function(){o.value=""
});
w.on("blur",function(){if(f(".commentans-title").val().length>80){y.style.display="block";
w[0].style.borderColor="#f00";
G.style.display="none";
D=0
}else{y.style.display="none";
G.style.display="none";
D=1;
w[0].style.borderColor="#ccc"
}});
z.on("blur",function(){if(f(".commentans-content").val().length>3000||(f(".commentans-content").val().length<1&&f(".commentans-content").val().length>0)){F.style.display="block";
D=0;
n.style.display="none";
z[0].style.borderColor="#f00"
}else{F.style.display="none";
n.style.display="none";
D=1;
z[0].style.borderColor="#ccc"
}});
l.unbind("click").bind("click",function(K){oData=new FormData(j);
oData.append("commentStar",k.innerHTML);
K.preventDefault();
console.log();
if(parseFloat(f(k).text())<=0){f("#commentForm .commentans_RequireEmptyT").css("display","inline-block")
}else{if(!w[0].value){G.style.display="block";
w[0].style.borderColor="#f00"
}else{if(!z[0].value){n.style.display="block";
z[0].style.borderColor="#f00"
}else{if(D==1){var J=[];
for(var I=0;
I<b.commentOptions.dataArr.length;
I++){if(b.commentOptions.dataArr[I]){J.push(b.commentOptions.dataArr[I])
}}function H(O){var M=O.split(","),Q=M[0].match(/:(.*?);/)[1],N=atob(M[1]),R=N.length,P=new Uint8Array(R);
while(R--){P[R]=N.charCodeAt(R)
}return new Blob([P],{type:Q})
}for(var I=0;
I<J.length;
I++){blobs=H(J[I].base64);
oData.append("fileData",blobs,J[I].name)
}var L=new XMLHttpRequest();
L.open("POST","/phoenix/admin/comment",true);
L.onreadystatechange=function(){if(L.readyState==4&&L.status==200){var M=JSON.parse(L.responseText);
if(M.success){u.style.display="none";
h.style.display="block";
setTimeout(function(){h.style.display="none";
r.style.display="none"
},1000);
w[0].value=" ";
z[0].value=" ";
C[0].value="";
E[0].innerHTML=" ";
B.style.display="none";
b.getUserReview(a.className,a.pageNum,a.prodId);
f(".commentclickre",A).trigger("click")
}else{if(M.error.typeError){u.style.display="none";
v.style.display="block";
m.innerHTML="评论类型有误";
setTimeout(function(){v.style.display="none";
r.style.display="none"
},1000);
B.style.display="none"
}else{if(M.error.uploadFailed){u.style.display="none";
v.style.display="block";
m.innerHTML="上传文件失败";
setTimeout(function(){v.style.display="none";
r.style.display="none"
},1000);
B.style.display="none"
}else{if(M.error.notImage){u.style.display="none";
v.style.display="block";
m.innerHTML="文件类型错误";
setTimeout(function(){v.style.display="none";
r.style.display="none"
},1000);
B.style.display="none"
}else{if(M.error.noVerifyCode){u.style.display="none";
r.style.display="none";
B.style.display="inline-block";
p.onclick=function(){try{e.faptcha.reload("component_"+a.settingId)
}catch(N){console.log(N)
}return false
};
C[0].value="";
f(".commentclickre",A).trigger("click")
}}}}}}else{}};
L.send(oData);
u.style.display="block";
r.style.display="block"
}}}}})
},commentSetCustomer:function(i){var h=f(".customerName.hideFlagName");
if(h.length>0){f(i).each(function(){var m=f(this).text().trim();
var l=m.length;
if(l>=2){var j=m.substring(0,1);
var k=m.substring(l-1,l);
m=j+"***"+k
}else{m+="***"
}f(this).text(m)
})
}}})
})(window,jQuery);