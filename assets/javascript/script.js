var searchBtn = $("#search-button");
var inputEl = $(".form-control");
var cityName = ""
var searchHistory = JSON.parse(localStorage.getItem("search"));
if(!searchHistory){
  var searchHistory = [];
}else{
  generateHistory();
}

// Search Function
function searchCity() {
    var cityName = inputEl.val();
    getWeather(cityName);
    localStorage.setItem("search", JSON.stringify(searchHistory));
    generateHistory();
    console.log(cityName)
    console.log(searchHistory)
}
searchBtn.on("click", searchCity)


 
function getWeather(cityName) {
     var currentDayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=de7012882f4c3c7eb567c8837eb90a14";
     fetch(currentDayURL)
     .then(function(response) {
         return response.json();
     })
      .then(function(data) {
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
          
          callUV(data.coord.lat, data.coord.lon);

      })
    
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=de7012882f4c3c7eb567c8837eb90a14";
    fetch(forecastURL)
     .then(function(response) {
         return response.json();
     })
     .then(function(data) {
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
    var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=de7012882f4c3c7eb567c8837eb90a14"
    fetch(uvURL)
     .then(function(response) {
        return response.json();
     })
     .then(function(data) {
        // data.current.uvi
        var uvEl = document.createElement("p")
        $(uvEl).text("UV index: ")
        var uvColor = document.createElement("button")
        $(uvColor).attr("type", "button")
        .addClass("btn btn-sm").html(data.current.uvi)

        if (data.current.uvi >= 0 && data.current.uvi < 3) {
            $(uvColor).addClass("bg-green")
        }
        else if (data.current.uvi >=3 && data.current.uvi < 6) {
            $(uvColor).addClass("bg-yellow")
        }
        else if (data.current.uvi >= 6 && data.current.uvi < 8) {
            $(uvColor).addClass("bg-orange")
        }
        else if (data.current.uvi >= 8 && data.current.uvi < 11) {
            $(uvColor).addClass("bg-red")
        }
        else {
            $(uvColor).addClass("bg-violet")
        }
        $(".currentWeather").append(uvEl)
        uvEl.append(uvColor)
     })

}

function generateHistory() {
    for(i = 0; i < searchHistory.length; i++) {
        var historyEl = document.createElement("li")
        $(historyEl).addClass("list-group-item").text(searchHistory[i])
        $("ul").append(historyEl)
    }
}

