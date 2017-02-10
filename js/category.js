/**
 * Created by admin on 2016/10/10.
 */
window.onload= function () {
    leftSwipe();
}
//分析
//功能分析：
//1、可以滑动（touch  Y）
//2、往下滑动的时候到达一定距离不能滑动
//3、往上滑动的时候到达一定距离不能滑动
//4、当滑动超过了最大的定位距离时，定位回去
//5、当滑动超过了最小的定位距离时，定位回去
//6、点击ul的时候改变当前li的样式
//7、点击的时候，滑动的最顶部，在定位区间内
//8、如果没有在定位区间内，保持原位
//定位的位置：
//maxPosition = 0;
//minPosition = -(H-h);
//我希望有100px的缓冲距离
//distance =100;
//我需要记录当前位置：
//currY=0
//滑动的距离
//maxSwipe = maxPosition + distance
//minSwipe = minPosition - distance
function leftSwipe(){
    //获取dom元素
    var parentBox = document.querySelector(".jd_cate_left");
    var childBox = parentBox.querySelector("ul");
    var parentHeight = parentBox.offsetHeight;
    var childHeight = childBox.offsetHeight;
    //定位的位置：
    var maxPosition = 0;
    var minPosition = parentHeight - childHeight;
    //我希望有100px的缓冲距离
    var distance =100;
    //我需要记录当前位置：
    var currY=0;
    //滑动的距离
    var maxSwipe = maxPosition + distance;
    var minSwipe = minPosition - distance;
    //我需要记录当前滑动时的手指的起始位置和滑动位置
    var startY = 0;
    var moveY =0 ;
    var isMove = false;
    //console.log("滑动区间"+maxSwipe+"-"+minSwipe);
    //console.log("定位区间"+maxPosition+"-"+minPosition);
    //1、可以滑动（touch  Y）
    childBox.addEventListener('touchstart', function () {
        startY = event.touches[0].clientY;
    });
    childBox.addEventListener('touchmove', function () {
        isMove=true;
        moveY = event.touches[0].clientY;
        //盒子移动chinasofti.setTranslateY
        //如果是上滑动：负数
        //如果是下滑动：正数
        //清除过渡
        //2、往下滑动的时候到达一定距离不能滑动
        //3、往上滑动的时候到达一定距离不能滑动
        if((currY+moveY-startY>minSwipe)&&(currY+moveY-startY<maxSwipe))
        {
            chinasofti.removeTransition(childBox);
            chinasofti.setTranslateY(childBox,currY+moveY-startY);
        }
    });
    childBox.addEventListener('touchend', function () {

        //4、当滑动超过了最大的定位距离时，定位回去
        //5、当滑动超过了最小的定位距离时，定位回去
        if(isMove){
            if(currY+moveY-startY>maxPosition){
                currY = maxPosition
            }else if(currY+moveY-startY<minPosition){
                currY = minPosition
            }else{
                currY = currY+moveY-startY;
            }
            chinasofti.addTransition(childBox);
            chinasofti.setTranslateY(childBox,currY);
        }
        startY = 0;
        moveY =0 ;
        isMove = false;
    });

    //6、轻触ul的时候改变当前li的样式

    chinasofti.tap(childBox, function () {
        var currLi = event.target.parentNode;
        var liArr = childBox.children;
        //6、轻触ul的时候改变当前li的样式
        for(var i=0;i<liArr.length;i++){
            liArr[i].index = i;
            liArr[i].className = "";
        }
        currLi.className = "now";
        //7、轻触的时候，滑动的最顶部，在定位区间内
        //8、如果没有在定位区间内，保持原位
        //分析：点击第index个li,定位到-index*50
        var index = currLi.index;
        if((-index*50)>minPosition&&(-index*50)<maxPosition){
            currY = -index*50;
        }else if((-index*50)<minPosition){
            currY = minPosition;
        }
        chinasofti.addTransition(childBox);
        chinasofti.setTranslateY(childBox,currY);
    })


}