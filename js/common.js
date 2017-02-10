/**
 * Created by admin on 2016/10/9.
 */
//命名空间
window.chinasofti={};
//添加过渡
window.chinasofti.addTransition= function (obj) {
    obj.style.transition="all .2s";
    obj.style.webkitTransition="all .2s";
};
//移除过渡
window.chinasofti.removeTransition= function (obj) {
    obj.style.transition="none";
    obj.style.webkitTransition="none";
};
//盒子移动
window.chinasofti.setTranslateX= function (obj,translate) {
   obj.style.transform="translateX("+translate+"px)";
   obj.style.webkitTransform="translateX("+translate+"px)";
};
window.chinasofti.setTranslateY= function (obj,translate) {
    obj.style.transform="translateY("+translate+"px)";
    obj.style.webkitTransform="translateY("+translate+"px)";
};
//监听过渡结束事件
window.chinasofti.addEvent= function (obj,callback) {
    obj.addEventListener("transitionend",callback);
    obj.addEventListener("webkitTransitionend",callback);
};
//封装一个轻触事件
window.chinasofti.tap= function (obj,callback) {
    var start = 0;
    var end = 0;
    var isMove = false;
    obj.addEventListener("touchstart", function () {
        start = (new Date()).getTime();
    });
    obj.addEventListener("touchmove", function () {
        isMove = true;
    });
    obj.addEventListener("touchend", function () {
        end =  (new Date()).getTime();
        if(!isMove&&(end-start<150)){
            callback();
        }
        start = 0;
        end = 0;
        isMove = false;
    })
}