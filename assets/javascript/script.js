var searchBtn = $("#search-button");
var inputEl = $(".form-control");
var cityName = "";
var searchHistory = JSON.parse(localStorage.getItem("search"));
if(!searchHistory){
  var searchHistory = [];
}else{
//   generateHistory();
    console.log("else")
}

// Search Function
function searchCity() {
    var cityName = inputEl.val();
    getWeather(cityName);
    localStorage.setItem("search", JSON.stringify(searchHistory));
    // generateHistory();
    console.log(cityName)
}
searchBtn.on("click", searchCity)

cityTitle = document.createElement("h2");
weatherIcon = document.createElement("img")
temperature = document.createElement("p")
humidity = document.createElement("p")
windSpeed = document.createElement("p")

function getWeather(cityName) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=de7012882f4c3c7eb567c8837eb90a14";
    fetch(apiURL)
     .then(function(response) {
         return response.json();
     })
      .then(function(data) {
          console.log(data);
          //append to .currentweather
          $(".currentWeather").append(cityTitle, weatherIcon, temperature, windSpeed, humidity)
          
          $(cityTitle).attr("id", "city-name")
          .addClass("city-name align-middle")
          .html(data.name)

          $(weatherIcon).addClass("weather-icon")
          .attr("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png")
          .attr("alt", data.weather[0].description);

          $(temperature).attr("id", "temperature")
          .html("Temperature: " + data.main.temp + "°F");
          
          $(humidity).attr("id", "humidity")
          .html("Humidity: " + data.main.humidity + "%");

          $(windSpeed).attr("id", "wind-speed")
          .html("Wind speed: " + data.wind.speed + "MPH");



      })
}

