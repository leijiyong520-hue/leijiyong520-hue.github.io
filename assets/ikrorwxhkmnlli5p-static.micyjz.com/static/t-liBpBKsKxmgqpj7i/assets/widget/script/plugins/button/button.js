function addFavorite2(){var a=window.location;
var d=document.title;
var b=navigator.userAgent.toLowerCase();
if(b.indexOf("360se")>-1){alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！")
}else{if(b.indexOf("msie 8")>-1){window.external.AddToFavoritesBar(a,d)
}else{if(document.all){try{window.external.addFavorite(a,d)
}catch(c){alert("您的浏览器不支持,请按 Ctrl+D 手动收藏!")
}}else{if(window.sidebar){window.sidebar.addPanel(d,a,"")
}else{alert("您的浏览器不支持,请按 Ctrl+D 手动收藏!")
}}}}};