// @ts-nocheck

window.onload = () => {
  initMap();
}

let newPostCode;
let postCode;

const input = document.getElementById("postcode");
const errorMessage = document.getElementById('not');
const smallTitle = document.querySelector(".address h4");
const mainTitle = document.getElementById('city-name');
const forContainer = document.querySelector('.forecast-container');
const freeSpace = document.querySelector('.free-space-container');

input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("postcode-submit").click();
  }
});

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
  postCode = input.value;

  if (postCode.length == 7) {
    newPostCode = `${postCode.substring(0,3)}-${postCode.substring(3,8)}`;
  } else if (postCode.length == 8) {
    newPostCode = postCode;
  } else {
    mainTitle.innerHTML = "";
  }
  // console.log(newPostCode)
  getWeatherData(newPostCode)
  .then((response) => {

    filtered.push(response.list[1])
    filtered.push(response.list[9])
    filtered.push(response.list[17])
    // console.log(filtered)
    // console.log(response)

    showWeatherForecast(filtered,response);
    initMap(response);
    errorMessage.style.visibility = 'hidden';
    
  }).catch ((err)=>{
    console.log(err)
    if (postCode.length == 7 || postCode.length == 8 && postCode.includes('-')) {
      errorMessage.innerHTML = "It seems Japan does not have place with that zip... Try another please";
      errorMessage.style.visibility = 'visible';
      clearData();
    } else {
      errorMessage.innerHTML = "Wrong zipCode format, try something like 1000001 or 100-0001";
      errorMessage.style.visibility = 'visible';
      clearData();
    } 
    
  })
  return {newPostCode, postCode};
}

const showWeatherForecast = (filtered,response) => {
  console.log(newPostCode)
  let weatherHtml = '';
  let allDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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
            <h4 class="max">Max: ${Math.round(i['main']['temp_max']-273.15)}°</h4>
            <h4 class="min">Min: ${Math.round(i['main']['temp_min']-273.15)}°</h4>
          </div>
        </div>
      </div>
    `;
  })

  let newLink = `
    <h4>Here are more info for 〒${newPostCode}</h4>
    <div id="free-space">
      <a href="https://www.google.co.jp/maps/dir//${response.city.name}/@${response.city.coord.lat},${response.city.coord.lon}/data=!4m2!4m1!3e2" target="_blank"><i class="fas fa-walking"></i></a>
      <a href="https://www.google.co.jp/maps/dir//${response.city.name}/@${response.city.coord.lat},${response.city.coord.lon}/data=!4m2!4m1!3e0" class="car" target="_blank"><i class="fas fa-car"></i></a>
      <a href="https://www.google.co.jp/maps/dir//${response.city.name}/@${response.city.coord.lat},${response.city.coord.lon}/data=!4m2!4m1!3e3" target="_blank"><i class="fas fa-subway"></i></a>
      <a href="https://www.tripadvisor.com/Search?q=${response.city.name}%20${newPostCode}%20japan" target="_blank"><i class="fab fa-tripadvisor"></i></a>
      <a href="https://www.booking.com/searchresults.en-gb.html?label=gen173nr-1FCAEoggI46AdIM1gEaHWIAQGYAQm4ARfIAQzYAQHoAQH4AQuIAgGoAgO4Ar6tqPcFwAIB0gIkMDFkZWQ4YWUtZGRmNS00Y2QxLWIwZjEtMGYxMTlhMDI3Y2Mz2AIG4AIB&sid=b6e90b8429233c9ab0cd383ab0af44bf&sb=1&sb_lp=1&src=index&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Findex.en-gb.html%3Flabel%3Dgen173nr-1FCAEoggI46AdIM1gEaHWIAQGYAQm4ARfIAQzYAQHoAQH4AQuIAgGoAgO4Ar6tqPcFwAIB0gIkMDFkZWQ4YWUtZGRmNS00Y2QxLWIwZjEtMGYxMTlhMDI3Y2Mz2AIG4AIB%3Bsid%3Db6e90b8429233c9ab0cd383ab0af44bf%3Bsb_price_type%3Dtotal%3Bsrpvid%3Df9f02dea561c012b%26%3B&ss=${response.city.name}+${postCode}%2C+Japan&is_ski_area=0&ssne=${response.city.name}+20${postCode}&ssne_untouched=${response.city.name}+20${postCode}&checkin_year=&checkin_month=&checkout_year=&checkout_month=&group_adults=2&group_children=0&no_rooms=1&b_h4u_keep_filters=&from_sf=1&ss_raw=${response.city.name}+${postCode}&ac_click_type=g&ac_position=0&dest_id=ChIJCwbzN300-F8RluwcLDXII_k&dest_type=region&place_id=ChIJCwbzN300-F8RluwcLDXII_k&place_id_lat=${response.city.coord.lat}&place_id_lon=${response.city.coord.lon}&place_types=postal_code%2Cgeocode&search_pageview_id=8b8fa72ebbc80057&search_selected=true" target="_blank"><i class="fas fa-bed"></i></a>
      <a href="https://tabelog.com/en/rstLst/?n=${response.city.name}&maxLat=${response.city.coord.lat}&minLat=${response.city.coord.lat-0.314265}&maxLon=${response.city.coord.lon}&minLon=${response.city.coord.lon-0.314265}&lat=${response.city.coord.lat}&lon=${response.city.coord.lon}&zoom=15" target="_blank"><i class="fas fa-utensils"></i></a>
      <a href="https://www.google.com/search?sxsrf=ALeKk00PQ3SjtRihTxdquQqLnFpAacdiQg%3A1592525550113&ei=7gLsXv3CBoiF0wSe4Lm4Ag&q=${response.city.name}+japan+${postCode}&oq=${response.city.name}+japan+${postCode}&gs_lcp=CgZwc3ktYWIQAzoHCCMQsAIQJ1Df8zxYur89YJvLPWgDcAB4AIABqAGIAZoIkgEDMC45mAEAoAEBqgEHZ3dzLXdpeg&sclient=psy-ab&ved=0ahUKEwj98db9y4zqAhWIwpQKHR5wDicQ4dUDCAw&uact=5" target="_blank"><i class="fa fa-google"></i></a>
      <a href="https://en.wikipedia.org/w/index.php?cirrusUserTesting=glent_m0&search=${response.city.name}&title=Special%3ASearch&go=Go&ns0=1" target="_blank"><i class="fab fa-wikipedia-w"></i></a>
      <a class="twitter-share-button"
        href="https://twitter.com/intent/tweet?text=${response.city.name}%20is%20awesome"
        data-size="large" target="_blank">
        <i class="fab fa-twitter-square"></i></a>
    </div>
  `

  mainTitle.innerHTML = response.city.name + ', ' + response.city.country;
  forContainer.innerHTML = weatherHtml;
  freeSpace.innerHTML = newLink;
  input.value = '';
  smallTitle.style.visibility = 'visible';
  newPostCode = ''
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

const clearData =() =>{
  mainTitle.innerHTML = '';
  forContainer.innerHTML = '';
  freeSpace.innerHTML = '';
  input.value = '';
  smallTitle.style.visibility = 'visible'
}
