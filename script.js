

const apiKey="92a8b1733403f5452f781200db8f59de";

async function getWeather(){

const city=document.getElementById("city").value;

const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

const data=await fetch(url).then(res=>res.json());

document.getElementById("cityName").innerText=data.name;

document.getElementById("temp").innerText=Math.round(data.main.temp)+"°C";

document.getElementById("desc").innerText=data.weather[0].description;

document.getElementById("humidity").innerText=data.main.humidity+"%";

document.getElementById("wind").innerText=data.wind.speed+" km/h";

document.getElementById("feels").innerText=Math.round(data.main.feels_like)+"°C";

document.getElementById("icon").src=
`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

showWeatherAnimation(data.weather[0].main);

getForecast(city);

}

async function getForecast(city){

const url=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

const data=await fetch(url).then(res=>res.json());

const forecast=document.getElementById("forecast");

forecast.innerHTML="";

for(let i=0;i<5;i++){

const item=data.list[i*8];

const day=document.createElement("div");

day.className="day";

day.innerHTML=`
<p>${new Date(item.dt_txt).toLocaleDateString("en",{weekday:"short"})}</p>
<img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png">
<p>${Math.round(item.main.temp)}°C</p>
`;

forecast.appendChild(day);

}

}

function toggleTheme(){

document.body.classList.toggle("dark");

}

function showWeatherAnimation(weather){

document.getElementById("rain").style.display="none";
document.getElementById("snow").style.display="none";
document.getElementById("sun").style.display="none";

if(weather==="Rain"){

const rain=document.getElementById("rain");
rain.style.display="block";
rain.innerHTML="";

for(let i=0;i<120;i++){

const drop=document.createElement("div");
drop.className="raindrop";

drop.style.left=Math.random()*100+"vw";
drop.style.animationDuration=(0.5+Math.random())+"s";

rain.appendChild(drop);

}

}

else if(weather==="Snow"){

const snow=document.getElementById("snow");
snow.style.display="block";
snow.innerHTML="";

for(let i=0;i<60;i++){

const flake=document.createElement("div");
flake.className="snowflake";
flake.innerHTML="❄";

flake.style.left=Math.random()*100+"vw";
flake.style.animationDuration=(4+Math.random()*3)+"s";

snow.appendChild(flake);

}

}

else if(weather==="Clear"){

document.getElementById("sun").style.display="block";

}

}

