// @ts-nocheck
const filtered = [];
// weather
let API_KEY = "a8e71c9932b20c4ceb0aed183e6a83bb";

const getWeatherData = (newPostCode) => {
  const URL = "https://api.openweathermap.org/data/2.5/forecast";
  const FULL_URL = `${URL}?zip=${newPostCode},jp&appid=${API_KEY}`
  console.log(FULL_URL)
  const weatherPromise = fetch(FULL_URL);
  return weatherPromise.then((response) => {
    return response.json();
  });
}

const searchZipcode = () => {

  const postCode = document.getElementById("postcode").value;
  const newPostCode = `${postCode.substring(0,3)}-${postCode.substring(3,8)}`
  // console.log(newPostCode)
  getWeatherData(newPostCode)
  .then((response) => {
    filtered.push(response.list[1])
    filtered.push(response.list[9])
    filtered.push(response.list[17])
    console.log(filtered)
    showWeatherForecast(filtered);
  }).catch ((err)=>{
    console.log(err)
  })
  
}

const showWeatherForecast = (filtered) => {
  let weatherHtml = '';
  let PNGurl = 'http://openweathermap.org/img/wn/'
  filtered.map((i, index) => {
    weatherHtml += `
    <div class="forecast">
        <div class="img-container">
          <img src='http://openweathermap.org/img/wn/${i['weather']['0']['icon']}@2x.png' alt="#">
        </div>
        <div class="weather-info">
          <div class="date-info">
            <h4 class="date">${new Date(i['dt']).toLocaleDateString("sg")}</h4>
            <h4 class="day">Tues</h4>
          </div>
          <div class="weather">${i['weather']['0']['main']}</div>
          <div class="max-min">
            <h4 class="max">Max: ${Math.round(i['main']['temp_max']-273.15)}</h4>
            <h4 class="min">Min: ${Math.round(i['main']['temp_min']-273.15)}</h4>
          </div>
        </div>
      </div>
    `
  })
  document.querySelector('.forecast-container').innerHTML = weatherHtml;
}

