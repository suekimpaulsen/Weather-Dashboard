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
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=de7012882f4c3c7eb567c8837eb90a14";
}

