/**
 * @author miaov
 */
function getStyle(obj, attr)//读取样式
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[attr];
	}
	else
	{
		return getComputedStyle(obj, false)[attr];
	}
}

function startMove(obj, attr, iTarget, fn)//运动
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		//1.取当前的值
		var iCur=0;
		
		if(attr=='opacity')
		{
			iCur=parseInt(parseFloat(getStyle(obj, attr))*100);
		}
		else
		{
			iCur=parseInt(getStyle(obj, attr));
		}
		
		//2.算速度
		var iSpeed=(iTarget-iCur)/8;
		iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
		
		//3.检测停止
		if(iCur==iTarget)
		{
			clearInterval(obj.timer);
			
			if(fn)
			{
				fn();
			}
		}
		else
		{
			if(attr=='opacity')
			{
				obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
				obj.style.opacity=(iCur+iSpeed)/100;
			}
			else
			{
				obj.style[attr]=iCur+iSpeed+'px';
			}
		}
	}, 30)
}
function getByClass(oParent, sClass)//获取class
{
	var aEle=oParent.getElementsByTagName('*');
	var aResult=[];
	var i=0;
	
	for(i=0;i<aEle.length;i++)
	{
		if(aEle[i].className==sClass)
		{
			aResult.push(aEle[i]);
		}
	}
	
	return aResult;
}
window.onload=function()
{
	var oDiv=getByClass(document,'banner')[0];
	var aBtn=document.getElementById('btn').getElementsByTagName('span');
	var oPrev=getByClass(oDiv,'prev')[0];
	var oNext=getByClass(oDiv,'next')[0];
	var aLi=document.getElementById('Big').getElementsByTagName('li');
	var iNow=0;
	var iMinZindex=2;
	var timer=null;
	
	aLi[0].style.zIndex=2;
	aBtn[0].style.background='#E85003';
	fnSetTime();
	
	oDiv.onmouseover=function()
	{
		clearInterval(timer);
		startMove(oPrev,'opacity', 100);
		startMove(oNext,'opacity', 100);
	}
	oDiv.onmouseout=function()
	{
		fnSetTime()
		startMove(oPrev,'opacity', 0);
		startMove(oNext,'opacity', 0);
	}
	for(i=0;i<aBtn.length;i++)//按钮
	{
		aBtn[i].index=i;
		aBtn[i].onclick=function()
		{
			if(this.index==iNow)return;
			iNow=this.index;
			ab()
		}
	}
	oPrev.onclick=function()//上一张
	{
		for(i=0;i<aLi.length;i++)
		{
		aLi[i].style.left='';
		aLi[i].style.right=0+'px';
		}
		if(iNow==0)
		{
			iNow=aLi.length;
		}
		iNow--;
		ab();
	}
	oNext.onclick=function()//下一张
	{
		for(i=0;i<aLi.length;i++)
		{
		aLi[i].style.right='';
		aLi[i].style.left=0+'px';
		}
		aLi[iNow].style.left=0;
		if(iNow==aLi.length-1)
		{
			iNow=-1;
		}
		iNow++;
		ab();
	}
	function fnSetTime()//自动播放
	{
		timer=setInterval(function(){
		for(i=0;i<aLi.length;i++)
		{
		aLi[i].style.right='';
		aLi[i].style.left=0+'px';
		}
		aLi[iNow].style.left=0;
		if(iNow==aLi.length-1)
		{
			iNow=-1;
		}
		iNow++;
		ab();
		},3000);	
	}
	
	function ab()
	{
		for(i=0;i<aBtn.length;i++)
		{
			aBtn[i].style.background='#FFF';
		}
		aBtn[iNow].style.background='#E85003';
		aLi[iNow].style.zIndex=iMinZindex++;
		aLi[iNow].style.width=0;
		startMove(aLi[iNow],'width',1980);
	}
	
	var oDiv2=document.getElementById('main-left');
	var aLi2=oDiv2.getElementsByTagName('li');
	oDiv2.onmouseover=function()
	{
		
	}
	for(i=0;i<aLi2.length;i++)
	{
		aLi2[i].onmouseover=function()
		{
			startMove(this, 'opacity',100)
		}
		aLi2[i].onmouseout=function()
		{
			startMove(this, 'opacity',60)
		}
	}
}