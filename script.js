
  const getLocationBtn = document.getElementById('getLocation');
const temperatureDiv = document.getElementById('temperature');
const locationDiv = document.getElementById('location');
const weatherIconDiv = document.getElementById('weather-icon');
const lastUpdatedDiv = document.getElementById('last-updated');
const errorDiv = document.getElementById('error');
const unitSelect = document.getElementById('unit');

let unit = 'metric'; // Default is Celsius

unitSelect.addEventListener('change', () => {
  unit = unitSelect.value;
  getWeather(); // Update weather based on unit change
});

getLocationBtn.addEventListener('click', getWeather);

function getWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showWeather, showError);
  } else {
    errorDiv.textContent = "Geolocation is not supported by this browser.";
  }
}

function showWeather(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  const apiKey = '5a4e1249629bf9175b13729909ca6fec'; // استخدم API مفتوح للطقس مثل OpenWeatherMap
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const temp = data.main.temp;
      const weather = data.weather[0].description;
      const icon = data.weather[0].icon;
      const location = data.name;

      temperatureDiv.textContent = `Temperature: ${temp}°`;
      locationDiv.textContent = `Location: ${location}`;
      weatherIconDiv.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">`;
      lastUpdatedDiv.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
      errorDiv.textContent = '';
    })
    .catch(() => {
      errorDiv.textContent = "Unable to retrieve weather data.";
    });
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      errorDiv.textContent = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      errorDiv.textContent = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      errorDiv.textContent = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      errorDiv.textContent = "An unknown error occurred.";
      break;
  }
}
