var APIKey = "1763fe6138140963ea58871931876d27";

$(document).ready(function () {
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
    }).then(function (response) {
      // Create jQuery elements - display city name, date, and weather icon
      var cityName = $("<h2>").text(response.name);
      var currentDate = $("<h2>").text(moment().format("dddd, MMMM Do YYYY"));
      var weatherIcon = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/" +
          response.weather[0].icon +
          "@2x.png"
      );

      // Create jQuery elements - display temperature, humidity, and wind speed
      var temperature = $("<p>").text(
        "Temperature: " + response.main.temp + " °C"
      );
      var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
      var windSpeed = $("<p>").text(
        "Wind Speed: " + response.wind.speed + " m/s"
      );

      // Empties contents of #today element and appends jQuery elements for city, current date, weather icon, temperature, humidity, wind speed etc
      $("#today").empty();
      $("#today").append(
        cityName,
        currentDate,
        weatherIcon,
        temperature,
        humidity,
        windSpeed
      );

      // Add class to the div containing the current weather information
      var currentWeatherCard = $("<div>").addClass("current-weather-card");
      currentWeatherCard.append(
        cityName,
        currentDate,
        weatherIcon,
        temperature,
        humidity,
        windSpeed
      );
      $("#today").empty().append(currentWeatherCard);

      // Call the function to display the 5-day forecast
      displayForecast(city);
    });
  }

  $("#search-button").on("click", function (event) {
    event.preventDefault();
    var city = $("#search-input").val().trim();
    displayCurrentWeather(city);
  });
});

// Function to make AJAX request - display 5-day forecast for a given city
function displayForecast(city) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    APIKey +
    "&units=metric";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    // Empties contents of #forecast element
    $("#forecast").empty();

    // Loops through the 5-day forecast data and creates a new card for each day
    for (var i = 0; i < response.list.length; i += 8) {
      // Create jQuery elements to display the forecast for a single day
      var card = $("<div>").addClass("card bg-primary text-white");
      var cardBody = $("<div>").addClass("card-body p-2");

      // create the date for the card
      var date = $("<h5>")
        .addClass("card-header")
        .text(moment(response.list[i].dt_txt).format("dddd, MMMM Do"));

      // create the weather icon for the card
      var icon = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/" +
          response.list[i].weather[0].icon +
          "@2x.png"
      );

      var temperature = $("<p>").text(
        "Temperature: " + response.list[i].main.temp + " °C"
      );
      var humidity = $("<p>").text(
        "Humidity: " + response.list[i].main.humidity + "%"
      );
      var windSpeed = $("<p>").text(
        "Wind Speed: " + response.list[i].wind.speed + " m/s"
      );

      card.append(date, icon, temperature, humidity, windSpeed);
      $("#forecast").append(card);
    }
  });
}
