/**
 * Created by Administrator on 2016/10/1.
 */
window.onload=function () {
    var divs = document.querySelectorAll('.photo_box div');
    for(var i=0;i<divs.length;i++){
        divs[i].style.transform="rotate("+~~(Math.random()*80-40)+"deg)";
    }
    var audio=document.querySelector('audio');
    var btn = document.querySelector('.btn');
    var flag=true;
    btn.onclick=function () {
        if(flag) {
            btn.style["animation-play-state"] = 'paused';
            flag = !flag;
            audio.volume=0;
        }else {
            btn.style["animation-play-state"] = 'running';
            flag=!flag;
            audio.volume=1;
        }
    }
}