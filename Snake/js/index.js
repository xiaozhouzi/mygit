/**
 * Created by Administrator on 2016/10/2.
 */
    var sence=document.querySelector('#sence');
    var sence2=document.querySelector('#sence2');
    var load=document.querySelector('.loading');
    var y=document.querySelector('.y');
    var flashBox=document.querySelector('.flash-box');
    var loadW=load.offsetWidth;
    var yW=y.offsetWidth;
    var speed=10;
    var l=0;
    var snake=null;
    var t=setInterval(function () {
        l=l+speed;
        y.style.left=l+"px";
        if(l>=loadW-yW){
            clearInterval(t);
            flashBox.style.display="none";
        }
    },50)
//显示个性装扮
    var dressupBtn=document.querySelector('.dressup-btn');
    var dressupBox=document.querySelector('.dressup-box');
    var backBtn=document.querySelector('.back-btn');
    var wujinBtn=document.querySelector('.wujin');
    var row=20;
    var col=20;
    var dict={};
    var score=0;
    var dir=39;
    var time=300;
    var game=true;
    var t1=null;
    var food=null;
    var divs=[];
    dressupBtn.onclick=function () {
        dressupBox.style.display="block";
    }
    backBtn.onclick=function () {
        dressupBox.style.display="none";
    }
    //主界面部分
    var senceBox=document.querySelector('.sence-box');
    //开始游戏按钮
    wujinBtn.onclick=function () {
        senceBox.style.display='none';
        newGame();
    }
    //游戏主逻辑
//绘制界面
    for(var i=0;i<col;i++){
        for(var j=0;j<row;j++){
            //背景放格子
            var div=document.createElement('div');
            div.className="b";
            sence.appendChild(div);
            //添加圆形格子
            var div2=document.createElement('div');
            div2.className="block";
            div2.id=j+'_'+i;
            sence2.appendChild(div2);
            divs.push(div2);
        }
    }//绘制格子完成
    function newGame() {
        dict = {};
        t1 = setInterval(move, time);
        score = 0;
        dir = 39;
        time = 300;
        game = true;
        snake = [{x: 3, y: 1}, {x: 4, y: 1}, {x: 5, y: 1}, {x: 6, y: 1}];
        //清空整个页面
        for(var i=0;i<divs.length;i++){
            divs[i].className='block';
        }
        food = dropFood();//暂时调用生成食物
        //绘制蛇
        for (var i = 0; i < snake.length; i++) {
            var ge = snake[i].x + '_' + snake[i].y;
            document.getElementById(ge).className = 'block s1';
            dict[ge] = true;
        }//绘制蛇完成
    }
    document.onkeydown=function(e) {
        if (!game) {
            return;
        }
        if (Math.abs(e.keyCode - dir) == 2) {
            return;
        }
        dir = e.keyCode;//保存方向
        e.preventDefault();
    }
        function move() {
            var oH=snake[snake.length-1];
            if(dir==39){
                var nH={x:oH.x+1,y:oH.y}
            }
            if(dir==40){
                var nH={x:oH.x,y:oH.y+1}
            }
            if(dir==37){
                var nH={x:oH.x-1,y:oH.y}
            }
            if(dir==38){
                var nH={x:oH.x,y:oH.y-1}
            }
            if(nH.x<0||nH.x>=col||nH.y<0||nH.y>=row||dict[nH.x+'_'+nH.y]){
                gameover();
                return;
            }
            document.getElementById(nH.x+'_'+nH.y).className="block s2";
            snake.push(nH);
            //吃食物
            if(nH.x==food.x&&nH.y==food.y){
                food=dropFood();
                score+=10;
                if (score>50){
                    time-=50;
                }
                if(score>100){
                    time-=120;
                }
                document.querySelector('.score-box span').innerHTML=score;
            }
            else{
                var dH=snake.shift();
                document.getElementById(dH.x+'_'+dH.y).className="block";
                delete dict[dH.x+'_'+dH.y];
            }
            //给蛇穿衣服
            for(var i=0;i<snake.length;i++){
                if(i%2==0){
                    document.getElementById(snake[i].x+'_'+snake[i].y).className='block s1';
                }else{
                    document.getElementById(snake[i].x+'_'+snake[i].y).className='block s2';
                }
            }
            document.getElementById(nH.x+'_'+nH.y).className='block sh';
            dict[nH.x+'_'+nH.y]=true;
        }

    function  gameover(){
        clearInterval(t1);
        num.innerHTML="您的得分为"+score;
        game=false;
        winBox.style.display="block";
        }
    function dropFood() {
            var food = {
                x: ~~(Math.random() * col),
            y:~~(Math.random() * row)
        }
            ;
            while (dict[food.x + '_' + food.y]) {
                food = {
                    x: ~~(Math.random() * col),
                y:~~(Math.random() * row)
            };
            }
            document.getElementById(food.x+'_'+food.y).className='block f';
            return food;
        }
    var winBox=document.querySelector('.win-box');
    var num=document.querySelector('.num');
    var turnBtn=document.querySelector('.turn');
    turnBtn.onclick=function () {
        winBox.style.display="none";
        newGame();
    }
    var backupBtn=document.querySelector('.backup');
    backupBtn.onclick=function () {
        winBox.style.display="none";
        senceBox.style.display="block";
    }