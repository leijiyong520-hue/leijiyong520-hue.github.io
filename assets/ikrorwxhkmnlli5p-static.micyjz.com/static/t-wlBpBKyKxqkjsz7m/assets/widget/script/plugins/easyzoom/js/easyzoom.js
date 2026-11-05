(function(g){var a,h,b,i,d,c;
var f={loadingNotice:"Loading image",errorNotice:"The image could not be loaded",errorDuration:2500,preventClicks:true,onShow:undefined,onHide:undefined};
function e(k,j){this.$target=g(k);
this.opts=g.extend({},f,j);
if(this.isOpen===undefined){this._init()
}return this
}e.prototype._init=function(){var j=this;
this.$link=this.$target.find("a");
this.$image=this.$target.find("img");
this.$flyout=g('<div class="easyzoom-flyout" />');
this.$notice=g('<div class="easyzoom-notice" />');
this.$target.on("mouseenter.easyzoom touchstart.easyzoom",function(k){j.isMouseOver=true;
if(!k.originalEvent.touches||k.originalEvent.touches.length===1){k.preventDefault();
j.show(k,true)
}}).on("mousemove.easyzoom touchmove.easyzoom",function(k){if(j.isOpen){k.preventDefault();
j._move(k)
}}).on("mouseleave.easyzoom touchend.easyzoom",function(){j.isMouseOver=false;
if(j.isOpen){j.hide()
}});
if(this.opts.preventClicks){this.$target.on("click.easyzoom","a",function(k){k.preventDefault()
})
}};
e.prototype.show=function(o,p){var k,n,j,m;
var l=this;
if(!this.isReady){this._load(this.$link.attr("href"),function(){if(l.isMouseOver||!p){l.show(o)
}});
return
}this.$target.append(this.$flyout);
k=this.$target.width();
n=this.$target.height();
j=this.$flyout.width();
m=this.$flyout.height();
a=this.$zoom.width()-j;
h=this.$zoom.height()-m;
b=a/k;
i=h/n;
this.isOpen=true;
if(this.opts.onShow){this.opts.onShow.call(this)
}if(o){this._move(o)
}};
e.prototype._load=function(j,l){var k=new Image();
this.$target.addClass("is-loading").append(this.$notice.text(this.opts.loadingNotice));
this.$zoom=g(k);
k.onerror=g.proxy(function(){var m=this;
this.$notice.text(this.opts.errorNotice);
this.$target.removeClass("is-loading").addClass("is-error");
this.detachNotice=setTimeout(function(){m.$notice.detach();
m.detachNotice=null
},this.opts.errorDuration)
},this);
k.onload=g.proxy(function(){if(!k.width){return
}this.isReady=true;
this.$notice.detach();
this.$flyout.html(this.$zoom);
this.$target.removeClass("is-loading").addClass("is-ready");
l()
},this);
k.style.position="absolute";
k.src=j
};
e.prototype._move=function(n){if(n.type.indexOf("touch")===0){var l=n.touches||n.originalEvent.touches;
d=l[0].pageX;
c=l[0].pageY
}else{d=n.pageX||d;
c=n.pageY||c
}var o=this.$target.offset();
var m=c-o.top;
var k=d-o.left;
var j=Math.ceil(m*i);
var p=Math.ceil(k*b);
if(p<0||j<0||p>a||j>h){this.hide()
}else{this.$zoom.css({top:""+(j*-1)+"px",left:""+(p*-1)+"px"})
}};
e.prototype.hide=function(){if(this.isOpen){this.$flyout.detach();
this.isOpen=false;
if(this.opts.onHide){this.opts.onHide.call(this)
}}};
e.prototype.swap=function(k,l,j){this.hide();
this.isReady=false;
if(this.detachNotice){clearTimeout(this.detachNotice)
}if(this.$notice.parent().length){this.$notice.detach()
}if(g.isArray(j)){j=j.join()
}this.$target.removeClass("is-loading is-ready is-error");
this.$image.attr({src:k,srcset:j});
this.$link.attr("href",l)
};
e.prototype.teardown=function(){this.hide();
this.$target.removeClass("is-loading is-ready is-error").off(".easyzoom");
if(this.detachNotice){clearTimeout(this.detachNotice)
}delete this.$link;
delete this.$zoom;
delete this.$image;
delete this.$notice;
delete this.$flyout;
delete this.isOpen;
delete this.isReady
};
g.fn.easyZoom=function(j){return this.each(function(){var k=g.data(this,"easyZoom");
if(!k){g.data(this,"easyZoom",new e(this,j))
}else{if(k.isOpen===undefined){k._init()
}}})
};
if(typeof define==="function"&&define.amd){define(function(){return e
})
}else{if(typeof module!=="undefined"&&module.exports){module.exports=e
}}})(jQuery);