"use strict";
window.$_ = function (e){
	let qs;
	e = e.trim();
	if (!e.includes(" ") && e.charAt(0) == "#") {
		qs = document.querySelector(e);
	}else{
		qs = document.querySelectorAll(e);
	}
	return qs == null ? undefined : qs;
}
window.Z={
	
	width : document.body.offsetWidth,
	height: document.body.offsetHeight,
	
	toHTTPS(){
		if(location.protocol=="http:"){			
			location.protocol="https:";
		}
	},
	loadImg(URL){
		let hide=document.createElement("div");
		for(var i=0;i<URL.length;i++){
			let img=document.createElement("img");
			img.src=URL[i].url;
			hide.appendChild(img);
		}
		document.body.appendChild(hide);
		document.body.removeChild(hide);
	},
	isNumber(num){
		if(num.length==0) return false;
		for(let i of num){
			i=parseInt(i);
			if(isNaN(i)){
				return false;
			}
		}
		return true;
	},
	isSpace(str){
		for(var i of str){
			if(i!=' ') {
				return false;
			}
		}
		return true;
	},
	random(a,b){
		return Math.floor(Math.random()*(b+1)+a);
	},
	randColor(element){
		var randR=this.random(0,255);
		var randG=this.random(0,255);
		var randB=this.random(0,255);
		element.style.backgroundColor="rgb("+randR+","+randG+","+randB+")";
		return ;
	},

	ourRequest: null,
	ourData:	null,
	XMLHttpRequest(URL,method){
		this.ourRequest=new XMLHttpRequest();
		this.ourRequest.onreadystatechange=function (){
			if(this.readyState==4 && this.status==200){
				Z.ourData=JSON.parse(this.responseText);
				method();
			}
		}
		this.ourRequest.open('GET',URL,true);
		this.ourRequest.send();
	},
	getYear(){
		return new Date().getFullYear();
	},
	getMonth(){
		return new Date().getMonth()+1;
	},
	getDay(){
		return new Date().getDay();
	},
	getDate(){
		return new Date().getDate();
	},
	getHours(){
		return new Date().getHours();
	},
	getMinutes(){
		return new Date().getMinutes();
	},
	getSeconds(){
		return new Date().getSeconds();
	},
	checkTime(i){
		if(i<10) i="0"+i;
		return i;
	},
	getWeekName(){
		let weeks=new Array("日","一","二","三","四","五","六");
		return weeks[this.getDay()];
	},
	createCheckFoemat(){
		var c={};
		c.isNumber=function (num){
			if(isNaN(num)){
				return false;
			}
			return true;
		}
		c.isSpace=function isSpace(str){
			for(var i of str){
				if(i!=' ') {
					return false;
				}
			}
			return true;
		}
		return c;
	}
}