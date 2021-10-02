let current_day = document.getElementById("current-day");
let next_day = document.getElementById("next-day");
let third_day = document.getElementById("third-day");

let num_date = document.getElementById("num-date");

let dayList =["Sunday","Monday","Tuesday","Wednesday", "Thursday","Friday","Saturday"];

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


let firstData =document.getElementById("firstData");


let data;

let next;

let third;

let search;


let div =document.createElement("div");

let country =document.getElementById("country");
let submit =document.getElementById("submit");

let nexDay =document.getElementById("nexDay");
let thirdDay =document.getElementById("thirdDay");

let input =document.getElementById("input");


console.log(country.value);


firstData.appendChild(div);

makeCall("Cairo");

let today = new Date();

let day =today.getDay();
console.log(day);
console.log(dayList[day]);
current_day.innerHTML = dayList[day];

if(day == 6){

  next_day.innerHTML = dayList[0];
  third_day.innerHTML = dayList[1];

}else{

  day = ++day;
console.log(day);
next_day.innerHTML = dayList[day];

if(day ==6 ){
  

third_day.innerHTML = dayList[0];
}else{
  day = ++day;
  next_day.innerHTML = dayList[day]
}

}

let x = ((today.getDate()) + " " + monthNames[today.getMonth()]) ;
console.log(x);

num_date.innerHTML = x;


async function makeCall(kelma){

  let result = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=37056e15bb3a4af89ef11928212709&q=${kelma}&aqi=no`
  );


  if(result.status==200){
   data =  await result.json();

    console.log(data.location.name);
    console.log(data.current.temp_c);

    console.log(data);

    console.log(data.location)

    
  displayData();
  }

  }

  async function nextCall(kelma,nexDay){

    let result = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=37056e15bb3a4af89ef11928212709&q=${kelma}&days=${nexDay}&aqi=no&alerts=no`
    );
  

    if(result.status==200){
      next =  await result.json();
  
      console.log(next);
      console.log(next.forecast.forecastday[1].day.mintemp_c);

      displayData();
    }
  
    }


    
    country.addEventListener('keyup',function(){

        inputValue();
   
  });

 async function inputValue(){
  let x =  await makeCall(country.value)

   
 makeCall(x);


  
}


nextCall("Cairo",5);

  
  


 function displayData(){

   

        str= ` <div class="content">
        <div class="contry">
            <h3>${data.location.name}</h3>
        </div>
        <div class="d-flex justify-content-between">
            <div class="temp fa-6x">
                <p>${data.current.temp_c}<sup>o</sup>C</p>
            </div>
            <div class="tem-img mt-5 me-5">
                <img src="https:${data.current.condition.icon}" alt="">
            </div>
        </div>
        <div class="over">
            <p>${data.current.condition.text}</p>
        </div>
       <div class="spans">
            <span>
                <img src="images/icon-umberella.png" alt=""> <span>20%</span>
                
            </span>
            <span>
                <img src="images/icon-wind.png" alt=""> <span>18Km/h</span>
                
            </span>
            <span>
                <img src="images/icon-compass.png" alt=""> <span>East</span>
                
            </span>
       </div>
    </div>`;

    div.innerHTML =str;


    strnext =` <div class="row">
    <div class="tem-img mt-4">
        <img src="https:${next.forecast.forecastday[1].day.condition.icon}" alt="">
    </div>
    
    <div class="temp fa-2x">
        <p>${next.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup> C</p>
    </div>
    <p>${next.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></p>
    </div>
    <div class="over">
    <p>${next.forecast.forecastday[1].day.condition.text}</p>
    </div>`;
    
   nexDay.innerHTML = strnext;

    third =`
    <div class="row">
    <div class="tem-img mt-4">
        <img src="https:${next.forecast.forecastday[2].day.condition.icon}" alt="">
    </div>
    
    <div class="temp fa-2x">
        <p>${next.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup> C</p>
    </div>
    <p>${next.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></p>
    </div>
    <div class="over">
    <p>${next.forecast.forecastday[2].day.condition.text}</p>
    </div>
    `
      thirdDay.innerHTML =third;

  }


  


  submit.addEventListener('click',function(){
    makeCall(country.value);
    nextCall(country.value,5)
    
   
  })





