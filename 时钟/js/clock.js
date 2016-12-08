/**
 * Created by Administrator on 2016/10/23.
 */
window.onload=function () {
    var ddd=document.querySelector('#draw');
    var ctx=ddd.getContext('2d');
    var myWidth=ctx.canvas.width;
    var myHeight=ctx.canvas.height;
    var r=myWidth/2;
    var rem=myWidth/200;
    function drawBackground() {
        ctx.save();
        ctx.translate(r,r);
        ctx.beginPath();
        ctx.lineWidth=10*rem;
        ctx.arc(0,0,r-ctx.lineWidth/2,0,2*Math.PI,false);
        ctx.stroke();
        ctx.closePath();
        var hourNum=[3,4,5,6,7,8,9,10,11,12,1,2];
        ctx.font="18px Arial";
        ctx.textAlign='center';
        ctx.textBaseline='middle';
        hourNum.forEach(function (number, i) {
            var rad=2*Math.PI/12*i;
            var x=Math.cos(rad)*(r-30);
            var y=Math.sin(rad)*(r-30);
            ctx.fillText(number,x,y);
        })
        for(var i=0;i<60;i++){
            var rad_2=2*Math.PI/60*i;
            var x=Math.cos(rad_2)*(r-18);
            var y=Math.sin(rad_2)*(r-18);
            ctx.beginPath();
            if(i%5==0){
                ctx.fillStyle='#000';
                ctx.arc(x,y,2,0,2*Math.PI,false);
            }else{
                ctx.fillStyle='#ccc';
                ctx.arc(x,y,2,0,2*Math.PI,false);
            }

            ctx.fill();
        }
    }
    function drawHour(hour,minute) {
        ctx.save();
        ctx.beginPath();
        var rad=2*Math.PI/12*hour;
        var mrad=2*Math.PI/12/60*minute;
        ctx.rotate(rad+mrad);
        ctx.lineWidth=6;
        ctx.lineCap='round';
        ctx.moveTo(0,10);
        ctx.lineTo(0,-r/2);
        ctx.stroke();
        ctx.restore();
    }
    function drawMinute(minute,second) {
        ctx.save();
        ctx.beginPath();
        var rad=2*Math.PI/60*minute;
        var srad=2*Math.PI/60/60*second;
        ctx.rotate(rad+srad);
        ctx.lineWidth=3;
        ctx.lineCap='round';
        ctx.moveTo(0,10);
        ctx.lineTo(0,-r+30);
        ctx.stroke();
        ctx.restore();
    }
    function drawSecond(second) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle='#c14543';
        var rad=2*Math.PI/60*second;
        ctx.rotate(rad);
        ctx.moveTo(-2,20);
        ctx.lineTo(2,20);
        ctx.lineTo(1,-r+18);
        ctx.lineTo(-1,-r+18);
        ctx.fill();
        ctx.restore();
    }
    function test() {
        ctx.beginPath();
        ctx.fillStyle='#fff'
        ctx.arc(0,0,5,0,2*Math.PI,false);
        ctx.fill();
    }
    function drawDot() {
        ctx.beginPath();
        ctx.fillStyle='#fff';
        ctx.arc(0,0,3,0,2*Math.PI,false);
        ctx.fill();
    }
    function draw() {
        ctx.clearRect(0,0,myWidth,myHeight);
        var now=new Date();
        var hour=now.getHours();
        var minute=now.getMinutes();
        var second=now.getSeconds();
        drawBackground();
        drawHour(hour,minute);
        drawMinute(minute,second);
        drawSecond(second);
        test();
        ctx.restore();
    }
    draw();
    setInterval(draw,1000);
}