// Uses jQuery library to make AJAX requests to the OpenWeather API and display weather information for a given city
// API key, uses the jQuery library to wait until the DOM is fully loaded before running any code
$(document).ready(function() {
    
    // Variable APIKey holds API key for the OpenWeather API
    var APIKey = "1763fe6138140963ea58871931876d27";
  
    // Function displayCurrentWeather that takes a city parameter.
    function displayCurrentWeather(city) {
      // queryURL variable holds API query URL for current weather conditions for given city parameter
      var queryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        APIKey +
        "&units=metric";
  
      // make AJAX request to OpenWeather API using queryURL variable and GET method
      // Also uses then function to handle response from API
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function(response) {
        // Create jQuery elements - display city name, date, and weather icon
        var cityName = $("<h2>").text(response.name);
        var currentDate = $("<h2>").text(
          moment().format("dddd, MMMM Do YYYY")
        );
        var weatherIcon = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/wn/" +
            response.weather[0].icon +
            "@2x.png"
        );
  
        // Create jQuery elements - display temperature, humidity, and wind speed
        var temperature = $("<p>").text("Temperature: " + response.main.temp + " °C");
        var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
        var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed + " m/s");
  
        // Empties contents of #today element and appends jQuery elements for city, current date, weather icon, temperature, humidity, wind speed etc
        $("#today").empty();
        $("#today").append(cityName, currentDate, weatherIcon, temperature, humidity, windSpeed);
  
        // Variable display UV index for the current weather for given city
        var latitude = response.coord.lat;
        var longitude = response.coord.lon;
        var uvIndexURL =
          "https://api.openweathermap.org/data/2.5/uvi?lat=" +
          latitude +
          "&lon=" +
          longitude +
          "&appid=" +
          APIKey;
  
        // Makes another AJAX request to OpenWeather API using GET and then
        $.ajax({
          url: uvIndexURL,
          method: "GET",
        }).then(function(response) {
          // display UV index
          var uvIndex = $("<p>").text("UV Index: " + response.value);
  
          // Creates jQuery element, append UV index to the current weather section
          $("#today").append(uvIndex);
        });
      });
    }
  
    // Function to make AJAX request - display 5-day forecast for a given city
    function displayForecast(city) {
      var queryURL =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&appid=" +
        APIKey +
        "&units=metric";
  
      // make AJAX request to OpenWeather API
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function(response) {
         // Once response is received, function clears out contents of #forecast element using empty() method
        $("#forecast").empty();
        // Iterates through list property of response, which contains array of objects representing forecast for each hour over 5-day period
        for (var i = 0; i < response.list.length; i++) {
          if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {
           // Create a card for each day of the 5-day forecast
            var card = $("<div>").addClass("card bg-primary text-white");
        
            // create the date for the card
            var date = $("<h5>").addClass("card-header").text(moment(response.list[i].dt_txt).format("dddd, MMMM Do"));
        
            // create the weather icon for the card
            var icon = $("<img>").attr(
              "src",
              "http://openweathermap.org/img/wn/" +
                response.list[i].weather[0].icon +
                "@2x.png"
            );
          }
        }
      })}})        