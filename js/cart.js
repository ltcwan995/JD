/**
 * Created by admin on 2016/10/11.
 */
window.onload= function () {
    delBtn();
};
function delBtn(){
    //分析功能：
    // 1、点击删除按钮，mask显示
    //2、点击删除按钮，delete_up逆时针旋转30deg
    //3、点击取消按钮，mask隐藏，delete_up顺时针旋转到0deg
    //获取dom元素
    var delbtn = document.querySelectorAll(".delete_btn");
    console.log(delbtn);
    var mask = document.querySelector(".jd_mask");
    var cancel = document.querySelector(".cancel");
    //var yes = document.querySelector(".yes")
    var index = 0;
    for(var i=0;i<delbtn.length;i++){
            delbtn[i].index=i;
        delbtn[i].onclick= function () {
            mask.style.display="block";
            this.querySelector(".delete_up").style.transform="rotate(-30deg)";
            this.querySelector(".delete_up").style.webkitTransform="rotate(-30deg)";
            index = this.index;
        }
    }
    cancel.onclick= function () {
        mask.style.display="none";
        delbtn[index].querySelector(".delete_up").style.transform="rotate(0deg)";
        delbtn[index].querySelector(".delete_up").style.webkitTransform="rotate(0deg)";
    }
    //yes.onclick= function () {
    //    mask.style.display="none";
    //    delbtn[index].querySelector(".delete_up").style.transform="rotate(0deg)";
    //    delbtn[index].querySelector(".delete_up").style.webkitTransform="rotate(0deg)";
    //    document.body.removeChild(document.querySelectorAll(".jd_product")[index]);
    //}

}
