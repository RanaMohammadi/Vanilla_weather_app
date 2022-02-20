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
function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#windSpeed");
  let visibilityElement = document.querySelector("#visibility");
  let dateElement = document.querySelector("#date");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  visibilityElement.innerHTML = Math.floor(response.data.visibility / 1000);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}
let city = "Malmo";
let apiKey = "cf8403573358fa943fb21dc8f32d6370";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric
&appid=${apiKey}`;
axios.get(apiUrl).then(displayTemperature);
