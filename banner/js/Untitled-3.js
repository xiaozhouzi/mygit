window.onload=function(){
	var next=document.getElementById("next");
	var prev=document.getElementById("prev");
	var img=document.getElementById("img");
	var index=1;
	var light=document.getElementById("buttons").getElementsByTagName("span");
	var active=false;
	var timer;
	var content=document.getElementById("content");
	//小数字亮起
	function showbutton(){
		for(var i=0;i<light.length;i++){
			if(light[i].className=="on"){
				light[i].className="";
				break;
				}
			}
		light[index-1].className="on";	
		}
	function play(){
		timer=setInterval(function(){
			next.onclick()
			},2000)
		}
	function stop(){
		clearInterval(timer);
		}
		//动画开始
	function animate(offset){
		active=true;
		var newleft=parseInt(img.style.left)+offset;
		var time=300;//动画总时间
		var interval=10;//动画间隔时间
		var speed=offset/(time/interval);//动画位移量
		function go(){
		if((speed<0&&parseInt(img.style.left)>newleft)||(speed>0&&parseInt(img.style.left)<newleft)){
			img.style.left=parseInt(img.style.left)+speed+"px";
			setTimeout(go,interval);
			}
		else{
			active=false;
			img.style.left=newleft+"px";
			if(parseInt(img.style.left)<-3000){
				img.style.left=-600+"px";
				}
			else if(parseInt(img.style.left)>-600){
				img.style.left=-3000+"px";
				}
			}
			}
		go();
		}	
	next.onclick=function(){
		if(active==false){
		animate(-600);
		}
		index+=1;
		if(index>5){
			index=1;
			}
		showbutton();
			}
	prev.onclick=function(){
		if(active==false){
        animate(600);
		}
		index-=1;
		if(index<1){
			index=5;
			}
		showbutton();
		}
	for(var i=0;i<light.length;i++){
		light[i].onclick=function(){
			if(this.className=="on"){
				return;
				}
			var myIndex=parseInt(this.getAttribute("index"));
			var offset=-600*(myIndex-index);
			animate(offset);
			index=myIndex;
			showbutton();
			}
		}
		content.onmouseover=stop;
		content.onmouseout=play;
		play();
	}