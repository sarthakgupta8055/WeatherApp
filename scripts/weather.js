'use strict';
console.log("js Loaded");
var searchInput=document.getElementById('inputSearch');
var btnNearMe=document.getElementById('btnNearMe');
var btnSearch=document.getElementById('btnSearch');
let icon = document.getElementById("icon");
var latitude=0;
var longitude=0;
var generatedData;
const key='41573cdedb62ca7cdb2ea7a2f456b3b0';
btnNearMe.addEventListener("click",locateMe);
btnSearch.addEventListener("click",checkWeather);
function locateMe() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }	
}
var x = document.getElementById("disp");
function showPosition(position) {
	//console.log(position);
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
	checkWeather();
}
function checkWeather() {
	if(latitude == 0 && longitude == 0){
		console.log(searchInput.value);
		let Link = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid="+key;
		var httpRequest = new XMLHttpRequest();
	    httpRequest.open("GET", Link, true); // true for asynchronous 
	    httpRequest.send();
	    httpRequest.onreadystatechange = () => { 
        if (httpRequest.readyState == 4 && httpRequest.status == 200){
             generatedData = httpRequest.responseText;
             extractData();
           }
    	}		
	}
	else{
		let Link = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" 
		+ longitude 	+ "&appid=" + key;
		var httpRequest = new XMLHttpRequest();
	    httpRequest.open("GET", Link, true); // true for asynchronous 
	    httpRequest.send();
	    httpRequest.onreadystatechange = () => { 
        if (httpRequest.readyState == 4 && httpRequest.status == 200){
             generatedData=httpRequest.responseText;
	    	 extractData();
           }
    	}
	}
}
function extractData() {
	var data=JSON.parse(generatedData);
	console.log(data);
	var temp=data.main.temp - 273;
	temp=Number(temp).toFixed(2);
	var name=data.name;
	var humidity=data.main.humidity;
	var enviornment=data.weather[0].description;
	icon.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
	display(temp,humidity,name,enviornment);
	console.log("Temp: " + temp+"°");
	console.log("Name: " + name);
}
function display(temp,humidity,name,enviornment) {

	document.getElementById('location').innerHTML=(name);
	document.getElementById('humidity').innerHTML=(humidity + "%");
	document.getElementById('temp').innerHTML=(temp + "Celsius");
	document.getElementById('weather').innerHTML=(enviornment);	
}