const $cityInput = $('.city-input');
const apiKey = '0b2d18998cc2c1478342de38040d8e6f';
const $submitBtn = $('.submit-btn');
const $cityBtns = $('.city-btns .btn')


function getSelectedCity(cityName) {
  const cityURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

  return $.get(cityURL)
}

function outputCurrentWeather(currentData) {
  const $selectedCityOutput = $('.selected-city-output');
  console.log("weather", currentData)
  $selectedCityOutput.html(`
        <h1 class="selected-city">${currentData.name}</h1>
            <p>Temp: ${currentData.main.temp} &deg;</p>
            <p>Wind: ${currentData.wind.speed}</p>
            <p>Humidity: ${currentData.main.humidity}</p>
        `)

  return currentData.coord;
}

function getForecastedWeather(locationData) {
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${locationData.lat}&lon=${locationData.lon}&appid=${apiKey}&units=imperial`;

  return $.get(forecastURL);
}

function outputForecastReport(WeatherData) {
  const $forecastOutput = $('.forecast-container');
  // Filter weather data to only output each retrieved weather data from each day at 12:00 pm
  const filtered = WeatherData.list.filter(function (weatherObj) {
    if (weatherObj.dt_txt.includes('12:00')) return true;
  });

  $forecastOutput.empty(); // Clear previous forecasts

  filtered.forEach(function (weatherObj) {
    const date = new Date(weatherObj.dt_txt);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

    $forecastOutput.append(`
            <div class="card-body">
              <p><strong>${formattedDate}</strong></p>
              <p>Temp: ${weatherObj.main.temp}</p>
              <p>Wind: ${weatherObj.wind.speed} MPH</p>
              <p>Humidity: ${weatherObj.main.humidity}</p>
              <img src="https://openweathermap.org/img/wn/${weatherObj.weather[0].icon}@2x.png" alt="weather icon image">
            </div>  
          `)
  })
}

$cityBtns.on('click', function () {
  const cityName = $(this).text().toLowerCase(); // Extract city name from button text
  getSelectedCity(cityName)
    .then(outputCurrentWeather)
    .then(getForecastedWeather)
    .then(outputForecastReport);
});

$submitBtn.on('click', function () {
  const cityName = $cityInput.val();
  getSelectedCity(cityName)
    .then(outputCurrentWeather)
    .then(getForecastedWeather)
    .then(outputForecastReport);
})
