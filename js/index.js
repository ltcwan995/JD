//功能分析
//在页面加载完成所有功能
window.onload= function () {
    search();
    banner();
    downTime();
};
//第一个功能：
//当页面滚动时，搜索栏的背景色的透明度发生变化，
// 当滚动距离超过轮播图时，搜索栏的背景色的透明度不再发生变化，
// 固定在0.85；
function search(){
    //获取dom元素
    var search = document.querySelector(".jd_header_box");
    var banner = document.querySelector(".jd_banner");
    var height = banner.offsetHeight;
    var opacity = 0;
    //绑定页面滚动事件
    window.onscroll= function () {
        var top = document.body.scrollTop;
        if(top<height){
            //搜索栏的背景色的透明度发生变化
            opacity = top/height*0.85;
        }else{
            opacity = 0.85;
        }
        search.style.background="rgba(201,21,35,"+opacity+")"
    }

}
//第二个功能：
//轮播图
//1、自动轮播（定时器，过渡）
//2、小圆点随着图片滚动（监听图片显示的当前索引，设置小圆点样式）
//3、图片能滑动（touch，不要过渡）
//4、滑动不超过一定的距离，吸附回去，左右都是一样的（过渡，定位）
//5、滑动超过一定的距离（1/3的banner的宽度），滚动上上一张/下一张（过渡，定位）
function banner(){
    //发现有一些方法是公共的：
    // 添加过渡chinasofti.addTransition
    // 移除过渡chinasofti.removeTransition
    //定位盒子chinasofti.setTranslateX
    //获取dom元素
    var banner = document.querySelector(".jd_banner");
    var width = banner.offsetWidth;
    //imageBox 是要移动的ul
    var imageBox = document.querySelector("ul:nth-child(1)");
    var pointBox = document.querySelector("ul:last-child");
    //points是li标签的集合
    var points = pointBox.querySelectorAll("li");
    //1、自动轮播（定时器，过渡）
    var index = 1;
    var timer = setInterval(function () {
        index++;
        chinasofti.addTransition(imageBox);
        chinasofti.setTranslateX(imageBox,-index*width);
    },5000);
    //2、小圆点随着图片滚动（监听图片显示的当前索引，设置小圆点样式）
    chinasofti.addEvent(imageBox, function () {
        if(index>=9){
            index=1;
            chinasofti.removeTransition(imageBox);
            chinasofti.setTranslateX(imageBox,-index*width);
        }else if(index<=0){
            index = 8;
            chinasofti.removeTransition(imageBox)
            chinasofti.setTranslateX(imageBox,-index*width);
        }
        setPoint();//设置小圆点样式
    })
    function setPoint(){
        for(var i=0;i<points.length;i++){
            points[i].className="";
        }
        points[index-1].className="now";
    }
    //3、图片能滑动（touch，不要过渡）
    var startX = 0;
    var moveX = 0 ;
    var distanceX = 0;
    var isMove = false;
    imageBox.addEventListener("touchstart", function () {
        //记录手指触摸到移动设备上的x轴坐标
        startX = event.touches[0].clientX;
    });
    imageBox.addEventListener("touchmove", function () {
        //记录手指在移动设备上滑动的x轴坐标
        clearInterval(timer);
        isMove = true;
        moveX = event.touches[0].clientX;
        distanceX = moveX - startX;
        //distanceX>0,右滑
        //distanceX<0,左滑
        chinasofti.removeTransition(imageBox);
        chinasofti.setTranslateX(imageBox,-index*width+distanceX);
    });
    imageBox.addEventListener("touchend", function () {

//5、滑动超过一定的距离（1/3的banner的宽度），滚动上一张/下一张（过渡，定位）
        if(Math.abs(distanceX)>width/3&&isMove){
            //distanceX>0,右滑
            if(distanceX>0){
                index--;
            }else if(distanceX<0){
                //distanceX<0,左滑
                index++;
            }
            chinasofti.addTransition(imageBox);
            chinasofti.setTranslateX(imageBox,-index*width);
        }else if(Math.abs(distanceX)<width/3&&isMove){
            //4、滑动不超过一定的距离，吸附回去，左右都是一样的（过渡，定位）
            chinasofti.addTransition(imageBox);
            chinasofti.setTranslateX(imageBox,-index*width);
        }
        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = false;
        timer = setInterval(function () {
            index++;
            chinasofti.addTransition(imageBox);
            chinasofti.setTranslateX(imageBox,-index*width);
        },5000);
    });
}

//第三个功能
//倒计时
var time=10*60*60;
function downTime(){
    //功能分析:
    //1、需要倒计时的时间，自己可以定义
    //2、倒计时  定时器
    //3、把时间渲染都盒子中
    //获取dom元素
    var skTime = document.querySelector(".skTime");
    var spans = skTime.querySelectorAll("span");
    var timer = setInterval(function () {
        time--;
   window.localStorage.setItem("left",time);
   var leftTime=leftTime=window.localStorage.getItem("left");
        if(time<0){
            clearInterval(timer);
            return false;
        }
        var h = Math.floor(leftTime/3600);
        var m = Math.floor(leftTime%3600/60);
        var s = leftTime%60;
        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;

        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;

        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;
        return  leftTime;
    },1000)
    return timer;
}