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
    var currentDayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=de7012882f4c3c7eb567c8837eb90a14";
    fetch(currentDayURL)
     .then(function(response) {
         return response.json();
     })
      .then(function(data) {
          console.log(data);
          //append to .currentweather
          $(".currentWeather").append(cityTitle, weatherIcon, temperature, windSpeed, humidity)
          
          $(cityTitle).attr("id", "city-name")
          .addClass("city-name align-middle")
          .text(data.name)

          $(weatherIcon).addClass("weather-icon")
          .attr("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png")
          .attr("alt", data.weather[0].description);

          $(temperature).attr("id", "temperature")
          .text("Temperature: " + data.main.temp + "°F");
          
          $(humidity).attr("id", "humidity")
          .text("Humidity: " + data.main.humidity + "%");

          $(windSpeed).attr("id", "wind-speed")
          .text("Wind speed: " + data.wind.speed + "MPH");

      })
    
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=de7012882f4c3c7eb567c8837eb90a14";
    fetch(forecastURL)
     .then(function(response) {
         return response.json();
     })
     .then(function(data) {
         console.log(data);
         $(".forecast").append(cityTitle, weatherIcon, temperature, humidity, windSpeed)

         $(cityTitle).text(data.name)
         $(temperature).text("Temp: " + data.list[i].main.temp + "°F")
         $(humidity).text("Humidity: " + data.list[i].main.humidity + "%")
         $(windSpeed).text("Wind: " + data.list[i].wind.speed + "MPH")

     })
}

