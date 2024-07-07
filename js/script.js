const city = $('.city-input');
const apiKey = '0b2d18998cc2c1478342de38040d8e6f';
const $submitBtn = $('#submit-btn');

function getCurrentReport(cityName) {
    const currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
  console.log(currentURL)
    return $.get(currentURL)
  }

  function outputCurrentWeather(currentData) {
    const $selectedCityOutput = $('.selected-city-output');
  
    $selectedCityOutput.html(`
       <h1 class="selected-city"></h1>
        <p>Temp: ${currentData.main.temp} &deg;</p>
        <p>Wind: ${currentData.main.wind}</p>
        <p>Humidity: ${currentData.main.humidity}</p>
        
    `)
  
    return currentData.coord;
  }



  $submitBtn.on('click', function () {
    outputCurrentWeather(city)
})