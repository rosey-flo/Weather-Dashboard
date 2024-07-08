$(document).ready(function() {
    const $city = $('.city-input');
    const apiKey = '0b2d18998cc2c1478342de38040d8e6f';
    const $submitBtn = $('.submit-btn');

    function getCurrentReport(cityName) {
        const currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
        console.log(currentURL)
        return $.get(currentURL)
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

    function getForecastReport(locationData) {
        const forecaseURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${locationData.lat}&lon=${locationData.lon}&appid=${apiKey}&units=imperial`;
      
        return $.get(forecaseURL);
      }
      
      
      function outputForecastReport(forecastData) {
        const $forecastOutput = $('.forecast');
        // Filter out from the 40 weather objects you receive, the 5 noon time weather objects for the next 5 days
        const filtered = forecastData.list.filter(function (weatherObj) {
          if (weatherObj.dt_txt.includes('12')) return true;
        });
      
        filtered.forEach(function (weatherObj) {
          $forecastOutput.append(`
            <div>
              <h2>${weatherObj.dt_txt}</h2>
              <h3>Temp: ${weatherObj.main.temp}</h3>
              <img src="https://openweathermap.org/img/wn/${weatherObj.weather[0].icon}@2x.png" alt="weather icon image">
            </div>  
          `)
        })
      }
      
      $currentBtn.on('click', function () {
        getCurrentWeather(city)
          .then(outputCurrentWeather)
          .then(getForecastReport)
          .then(outputForecastReport);
      })
    })









//      $submitBtn.on('click', async function () {
//         const cityName = $city.val().trim();
//         if (cityName) {
//             const weatherData = await getCurrentReport(cityName);
//             if (weatherData) {
//                 outputCurrentWeather(weatherData)
//             }
//         }
//         else {
//             alert("Please Enter valid City Name");
//         }
       
        
//      })
// })
