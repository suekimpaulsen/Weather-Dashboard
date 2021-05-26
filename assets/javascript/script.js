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


 
function getWeather(cityName) {
     var currentDayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=de7012882f4c3c7eb567c8837eb90a14";
     fetch(currentDayURL)
     .then(function(response) {
         return response.json();
     })
      .then(function(data) {
          console.log(data);
          //append to .currentweather
          var currentTitle = document.createElement("h2")
          var weatherIcon = document.createElement("img")
          var temperature = document.createElement("p")
          var humidity = document.createElement("p")
          var windSpeed = document.createElement("p")

          $(currentTitle).attr("id", "city-name")
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

          $(".currentWeather").html("").append(currentTitle, weatherIcon, temperature, windSpeed, humidity)


      })
    
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=de7012882f4c3c7eb567c8837eb90a14";
    fetch(forecastURL)
     .then(function(response) {
         return response.json();
     })
     .then(function(data) {
         console.log(data);
         $(".forecast").html("")
         for (i = 0; i < 5; i++) {
             var card = $("<div>");
             card.addClass("card text-white bg-secondary mb-3 p-2")
             $(".forecast").append(card)

             var forecastTitle = document.createElement("h5")
             var weatherIcon = document.createElement("img")
             var temperature = document.createElement("p")
             var humidity = document.createElement("p")
             var windSpeed = document.createElement("p")


            //  $(forecastTitle).text(data.name)
             $(weatherIcon).addClass("weather-icon-small")
             .attr("src", "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png")
             .attr("alt", data.list[i].weather[0].description);
             $(temperature).html("Temp: " + data.list[i].main.temp + "°F")
             $(humidity).html("Humidity: " + data.list[i].main.humidity + "%")
             $(windSpeed).html("Wind: " + data.list[i].wind.speed + "MPH")
             card.append(card, forecastTitle, temperature, humidity, windSpeed)

         }

     })
}

// UV Index
function callUV(lat, lon) {
    var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat "&lon=" + lon + "&appid=de7012882f4c3c7eb567c8837eb90a14"
    fetch(uvURL)
     .then(function(response) {
        return response.json();
     })
     .then(function(data) {
        console.log(data)
     })

}
// uvURL = https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}