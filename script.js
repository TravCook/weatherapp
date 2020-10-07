var dataF
var uvIndx
var lat
var lon
var city
var temp
var windSpeed
var windchill
var feelsLike
var tempHigh
var symbol
var tempLow
var humidity
var sunrise
var sunset
var humanSunrise
var humanSunset
var weatherSymbol
var fivedayData = []
var apiKey = "166a433c57516f51dfab1f7edaed8413"
pageload()
function pageload(){
city = localStorage.getItem("city")
$.ajax({ //this calls for the single day forcast
  url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey,
  method: "GET"
}).then(function(response){
     lon = (response.coord.lon)
     lat = (response.coord.lat)
    weatherSymbol = (response.weather[0].icon)
    temp = (response.main.temp)
    windSpeed = (response.wind.speed)
    feelsLike = (response.main.feels_like)
    tempHigh = (response.main.temp_max)
    symbol = (response.weather.main)
    tempLow = (response.main.temp_min)
    humidity = (response.main.humidity)
    sunrise = (response.sys.sunrise)
    sunset = (response.sys.sunset)
    var sunrisemilli = (sunrise*1000);
    var sunriseObject = new Date(sunrisemilli);
     humanSunrise = sunriseObject.toLocaleString();
    var sunsetmilli = (sunset*1000);
    var sunsetObject = new Date(sunsetmilli);
     humanSunset = sunsetObject.toLocaleString();
    renderWeatherinfo();
})
}
$(".searchButton").on("click", function(event){  //this handles the entire search of the city
  event.preventDefault();
  city = (event.target.parentElement[0].value);
$.ajax({ //this calls for the single day forcast
  url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey,
  method: "GET"
}).then(function(response){
  console.log(response)
     lon = (response.coord.lon)
     lat = (response.coord.lat)
    weatherSymbol = (response.weather[0].icon)
    temp = (response.main.temp)
    windSpeed = (response.wind.speed)
    feelsLike = (response.main.feels_like)
    tempHigh = (response.main.temp_max)
    symbol = (response.weather.main)
    tempLow = (response.main.temp_min)
    humidity = (response.main.humidity)
    var sunrisemilli = (sunrise*1000);
    var sunriseObject = new Date(sunrisemilli);
     humanSunrise = sunriseObject.toLocaleString();
    var sunsetmilli = (sunset*1000);
    var sunsetObject = new Date(sunsetmilli);
     humanSunset = sunsetObject.toLocaleString();
    renderWeatherinfo();
    localStorage.setItem("city", city)
})
$.ajax({ //this calls for the 5 day forecast
  url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minute,hourly,alerts&appid=" + apiKey,
}).then(function(response){
  uvIndx = (response.daily[0].uvi)
  for(i=1;i<6;i++){
  var day = (response.daily[i])
  fivedayData.push(day)
  }
  fivedayForecast();
  renderWeatherinfo();
})
});

// renderpreviouslySearched();



function dateConverter(data){
  var datemilli = (data*1000);
    var dateObject = new Date(datemilli);
     humandate1 = dateObject.toLocaleString();
     return humandate1;
}

// function renderpreviouslySearched(){
//   var lastSearchedButton = $("<button>");
//   lastSearchedButton.addClass("btn-primary lastsearchedButton")
//   lastSearchedButton.text(city)
//   $("#lastSearched").append(lastSearchedButton)
// }
function renderWeatherinfo(event){
  tempConverter(temp)
  $("#temp").text(dataF.toFixed(2) + "°")
  $("#wind").text(windSpeed + "Knots")
  tempConverter(feelsLike)
  $("#feelsLike").text(dataF.toFixed(2) + "°")
  tempConverter(tempHigh)
  $("#tempHigh").text(dataF.toFixed(2) + "°")
  tempConverter(tempLow)
  $("#tempLow").text(dataF.toFixed(2) + "°")
  $("#humidity").text(humidity + "%")
  $("#sunrise").text(humanSunrise)
  $("#sunset").text(humanSunset)
  $("#weatherSymbol").attr("src", "http://openweathermap.org/img/w/" + weatherSymbol + ".png");
  windChillMath(temp)
  $("#windChill").text(windchillfinal.toFixed(2) + "°")
  $("#uvIndx").text(uvIndx)
  if(uvIndx <= 2.99 ){
    $("#uvIndx").addClass("low")
  }else if (uvIndx >=3.99 && uvIndx <= 5.99){
    $("#uvIndx").addClass("moderate")
  }else if (uvIndx >=6.99 && uvIndx <= 7.99){
    $("#uvIndx").addClass("high")
  }else if (uvIndx >=8.99 && uvIndx <= 10.99){
    $("#uvIndx").addClass("veryHigh")
  }else if (uvIndx >= 11){
    $("#uvIndx").addClass("extreme")
  }else{
    console.log("UV index too high")
  }
}
function windChillMath(data){
   var tempWind = tempConverter(data)
   windchill = (tempWind - (windSpeed*.07))
   windchillfinal = tempWind - windchill
   return windchillfinal
}
function tempConverter(data){
  dataF = (data - 273.15) * 1.80 + 32
  return dataF
}
function fivedayForecast(){
  var date1 = dateConverter(fivedayData[0].dt)
  $("#day1date").text(date1)
  var date2 = dateConverter(fivedayData[1].dt)
  $("#day2date").text(date2)
  var date3 = dateConverter(fivedayData[2].dt)
  $("#day3date").text(date3)
  var date4 = dateConverter(fivedayData[3].dt)
  $("#day4date").text(date4)
  var date5 = dateConverter(fivedayData[4].dt)
  $("#day5date").text(date5)
  var day1symbol = fivedayData[0].weather[0].icon
  $("#day1symbol").attr("src", "http://openweathermap.org/img/w/" + day1symbol + ".png")
  var day2symbol = fivedayData[1].weather[0].icon
  $("#day2symbol").attr("src", "http://openweathermap.org/img/w/" + day2symbol + ".png")
  var day3symbol = fivedayData[2].weather[0].icon
  $("#day3symbol").attr("src", "http://openweathermap.org/img/w/" + day3symbol + ".png")
  var day4symbol = fivedayData[3].weather[0].icon
  $("#day4symbol").attr("src", "http://openweathermap.org/img/w/" + day4symbol + ".png")
  var day5symbol = fivedayData[4].weather[0].icon
  $("#day5symbol").attr("src", "http://openweathermap.org/img/w/" + day5symbol + ".png")
  var day1temp = fivedayData[0].temp.day
  var day1final = tempConverter(day1temp)
  $("#day1temp").text(day1final.toFixed(2)+"°")
  var day2temp = fivedayData[1].temp.day
  var day2final = tempConverter(day2temp)
  $("#day2temp").text(day2final.toFixed(2)+"°")
  var day3temp = fivedayData[2].temp.day
  var day3final = tempConverter(day3temp)
  $("#day3temp").text(day3final.toFixed(2)+"°")
  var day4temp = fivedayData[3].temp.day
  var day4final = tempConverter(day4temp)
  $("#day4temp").text(day4final.toFixed(2)+"°")
  var day5temp = fivedayData[4].temp.day
  var day5final = tempConverter(day5temp)
  $("#day5temp").text(day5final.toFixed(2)+"°")
  var day1humid = fivedayData[0].humidity
  $("#day1humid").text(day1humid + "% Humidity")
  var day2humid = fivedayData[1].humidity
  $("#day2humid").text(day2humid + "% Humidity")
  var day3humid = fivedayData[2].humidity
  $("#day3humid").text(day3humid + "% Humidity")
  var day4humid = fivedayData[3].humidity
  $("#day4humid").text(day4humid + "% Humidity")
  var day5humid = fivedayData[4].humidity
  $("#day5humid").text(day5humid + "% Humidity")
  console.log(fivedayData)


}