var searchBtn = $("#search-button");
var inputEl = $(".form-control");
var cityName = "";
var searchHistory = JSON.parse(localStorage.getItem("search"));
if(!searchHistory){
  var searchHistory = [];
}else{
  generateHistory();
}

// Search Function
