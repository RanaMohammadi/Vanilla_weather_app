function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  let minute = date.getMinutes();
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  return `${days[day]} ${hour}:${minute}`;
}

function getForecast(coordinates) {
  let apiKey = "cf8403573358fa943fb21dc8f32d6370";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}
    `;
  axios.get(apiUrl).then(displayDailyForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#windSpeed");
  let visibilityElement = document.querySelector("#visibility");
  let feelsLikeEelement = document.querySelector("#feelsLike");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  visibilityElement.innerHTML = Math.floor(response.data.visibility / 1000);
  feelsLikeEelement.innerHTML = Math.round(response.data.main.feels_like);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = "cf8403573358fa943fb21dc8f32d6370";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric
&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  search(searchInputElement.value);
  let searchForm = document.querySelector("#form-container");
  searchForm.innerHTML = "";
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayDailyForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let dailyForecastElement = document.querySelector("#daily-forecast");
  let dailyForecast = `<div class="row">`;
  let days = ["Tue", "Wed", "Thu", "Fri"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      dailyForecast =
        dailyForecast +
        `<div class="col-2">
                        <div class="forecast-date">${formatDay(
                          forecastDay.dt
                        )}</div>
                        <img src="http://openweathermap.org/img/wn/${
                          forecastDay.weather[0].icon
                        }@2x.png" width="42"/>
                        <div class="forecast-temperature">
                            <span class="forecast-temperature-max">${Math.round(
                              forecastDay.temp.max
                            )}°</span>
                            <span class="forecast-temperature-min">${Math.round(
                              forecastDay.temp.min
                            )}°</span>
                        </div>
                    </div>`;
    }
  });
  dailyForecast = dailyForecast + "</div>";
  dailyForecastElement.innerHTML = dailyForecast;
}

function handleSearch(event) {
  event.preventDefault();
  let searchForm = document.querySelector("#form-container");
  searchForm.innerHTML = `<form id="search-form">
              <div class="input-group mb-3">
                <input
                  type="search"
                  class="form-control"
                  placeholder="Search any city"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  id="search-input"
                />
                <button
                  class="btn btn-outline-secondary"
                  type="submit"
                  id="button-addon2"
                >
                  Search
                </button>
              </div>
            </form>`;
  let form = document.querySelector("#search-form");
  form.addEventListener("submit", handleSubmit);
}

search("Stockholm");

let searchIcon = document.querySelector("#search-icon");
searchIcon.addEventListener("click", handleSearch);
