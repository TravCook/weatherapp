// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
//  THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
//  THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
//  THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
//  THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
//  THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
//  THEN I am presented with the last searched city forecast
var city

$("#searchBox").on("click", function(event){  //this handles the entire search of the city
  event.preventDefault();
  city = (event.target.parentElement[0].value);
var apiKey = "166a433c57516f51dfab1f7edaed8413"
$.ajax({ //this calls for the single day forcast
  url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey,
  method: "GET"
}).then(function(response){
    console.log(response)
    var lon = (response.coord.lon)
    var lat = (response.coord.lat)
$.ajax({ //this calls for the 5 day forecast
  url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minute,hourly,alerts&appid=" + apiKey,
}).then(function(response){
  console.log(response)
  var date = (response.daily[0].sunrise) //these lines log the date and the time of sunrise
  var datemilli = date*1000;
  var dateObject = new Date(datemilli);
  var humanDateFormat = dateObject.toLocaleString();
  console.log(humanDateFormat)
})
});
renderpreviouslySearched()
});

function renderpreviouslySearched(){
  var lastSearchedButton = $("<button>");
  lastSearchedButton.addClass("btn-primary lastsearchedButton")
  lastSearchedButton.text(city)
  $("#lastSearched").append(lastSearchedButton)
}
function renderWeatherinfo(){
  
}