// @ts-nocheck

window.onload = () => {
  initMap();
}

// weather
let API_KEY = "a8e71c9932b20c4ceb0aed183e6a83bb";

const getWeatherData = (newPostCode) => {
  const URL = "https://api.openweathermap.org/data/2.5/forecast";
  const FULL_URL = `${URL}?zip=${newPostCode},jp&appid=${API_KEY}`
  // console.log(FULL_URL)
  const weatherPromise = fetch(FULL_URL);
  return weatherPromise.then((response) => {
    return response.json();
  });
}

const searchZipcode = () => {
  const filtered = [];
  const postCode = document.getElementById("postcode").value;
  const newPostCode = `${postCode.substring(0,3)}-${postCode.substring(3,8)}`
  // console.log(newPostCode)
  getWeatherData(newPostCode)
  .then((response) => {
    filtered.push(response.list[1])
    filtered.push(response.list[9])
    filtered.push(response.list[17])
    // console.log(filtered)
    showWeatherForecast(filtered,response);
    initMap(response);
  }).catch ((err)=>{
    console.log(err)
  })
  
}

const showWeatherForecast = (filtered,response) => {
  let weatherHtml = '';
  let allDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  filtered.map((i, index) => {
    weatherHtml += `
    <div class="forecast">
        <div class="img-container">
          <img src='http://openweathermap.org/img/wn/${i['weather']['0']['icon']}@2x.png' alt="#">
        </div>
        <div class="weather-info">
          <div class="date-info">
            <h4 class="date">${(new Date(i['dt'] * 1000)).getUTCDate()} ${months[(new Date(i['dt'] * 1000)).getMonth()]} ${(new Date(i['dt'] * 1000)).getFullYear()}</h4>
            <h4 class="day">${allDays[(new Date(i['dt'] * 1000)).getDay()]}</h4>
          </div>
          <div class="weather">${i['weather']['0']['main']}</div>
          <div class="max-min">
            <h4 class="max">Max: ${Math.round(i['main']['temp_max']-273.15)}</h4>
            <h4 class="min">Min: ${Math.round(i['main']['temp_min']-273.15)}</h4>
          </div>
        </div>
      </div>
    `;
  })
  document.getElementById('city-name').innerHTML = response.city.name + ', ' + response.city.country
  document.querySelector('.forecast-container').innerHTML = weatherHtml;
}

const initMap = (response) => {

  if (!response) {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 35.6938, lng: 139.7034 },
      zoom: 11,
      disableDefaultUI: true,
    });
  } else {
    const myLatLng = { lat: response.city.coord.lat, lng: response.city.coord.lon }

    const map = new google.maps.Map(document.getElementById("map"), {
      center: myLatLng,
      zoom: 11,
      disableDefaultUI: true,
    });

    const marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: response.city.name
    });
  }
}

