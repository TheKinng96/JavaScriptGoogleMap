let newPostCode,postCode;window.onload=(()=>{initMap()});const input=document.getElementById("postcode");input.addEventListener("keyup",function(e){13===e.keyCode&&(e.preventDefault(),document.getElementById("postcode-submit").click())});let API_KEY="a8e71c9932b20c4ceb0aed183e6a83bb";const getWeatherData=e=>{return fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${e},jp&appid=${API_KEY}`).then(e=>e.json())},searchZipcode=()=>{const e=[];return 7==(postCode=document.getElementById("postcode").value).length?newPostCode=`${postCode.substring(0,3)}-${postCode.substring(3,8)}`:8==postCode.length?newPostCode=postCode:document.getElementById("city-name").innerHTML="Please enter a valid Japan zip-code",getWeatherData(newPostCode).then(t=>{e.push(t.list[1]),e.push(t.list[9]),e.push(t.list[17]),console.log(t),showWeatherForecast(e,t),initMap(t)}).catch(e=>{console.log(e)}),{newPostCode:newPostCode,postCode:postCode}},showWeatherForecast=(e,t)=>{console.log(newPostCode);let a="",o=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],n=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];e.map((e,t)=>{a+=`\n    <div class="forecast">\n        <div class="img-container">\n          <img src='http://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png' alt="#">\n        </div>\n        <div class="weather-info">\n          <div class="date-info">\n            <h4 class="date">${new Date(1e3*e.dt).getUTCDate()} ${n[new Date(1e3*e.dt).getMonth()]} ${new Date(1e3*e.dt).getFullYear()}</h4>\n            <h4 class="day">${o[new Date(1e3*e.dt).getDay()]}</h4>\n          </div>\n          <div class="weather">${e.weather[0].main}</div>\n          <div class="max-min">\n            <h4 class="max">Max: ${Math.round(e.main.temp_max-273.15)}°</h4>\n            <h4 class="min">Min: ${Math.round(e.main.temp_min-273.15)}°</h4>\n          </div>\n        </div>\n      </div>\n    `});let s=`\n    <h4>Here are more info for 〒${newPostCode}</h4>\n    <div id="free-space">\n      <a href="https://www.google.co.jp/maps/dir//${t.city.name}/@${t.city.coord.lat},${t.city.coord.lon}/data=!4m2!4m1!3e2"><i class="fas fa-walking"></i></a>\n      <a href="https://www.google.co.jp/maps/dir//${t.city.name}/@${t.city.coord.lat},${t.city.coord.lon}/data=!4m2!4m1!3e0" class="car"><i class="fas fa-car"></i></a>\n      <a href="https://www.google.co.jp/maps/dir//${t.city.name}/@${t.city.coord.lat},${t.city.coord.lon}/data=!4m2!4m1!3e3"><i class="fas fa-subway"></i></a>\n      <a href="https://www.tripadvisor.com/Search?q=${t.city.name}%20${newPostCode}%20japan"><i class="fab fa-tripadvisor"></i></a>\n      <a href="https://www.booking.com/searchresults.en-gb.html?label=gen173nr-1FCAEoggI46AdIM1gEaHWIAQGYAQm4ARfIAQzYAQHoAQH4AQuIAgGoAgO4Ar6tqPcFwAIB0gIkMDFkZWQ4YWUtZGRmNS00Y2QxLWIwZjEtMGYxMTlhMDI3Y2Mz2AIG4AIB&sid=b6e90b8429233c9ab0cd383ab0af44bf&sb=1&sb_lp=1&src=index&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Findex.en-gb.html%3Flabel%3Dgen173nr-1FCAEoggI46AdIM1gEaHWIAQGYAQm4ARfIAQzYAQHoAQH4AQuIAgGoAgO4Ar6tqPcFwAIB0gIkMDFkZWQ4YWUtZGRmNS00Y2QxLWIwZjEtMGYxMTlhMDI3Y2Mz2AIG4AIB%3Bsid%3Db6e90b8429233c9ab0cd383ab0af44bf%3Bsb_price_type%3Dtotal%3Bsrpvid%3Df9f02dea561c012b%26%3B&ss=${t.city.name}+${postCode}%2C+Japan&is_ski_area=0&ssne=${t.city.name}+20${postCode}&ssne_untouched=${t.city.name}+20${postCode}&checkin_year=&checkin_month=&checkout_year=&checkout_month=&group_adults=2&group_children=0&no_rooms=1&b_h4u_keep_filters=&from_sf=1&ss_raw=${t.city.name}+${postCode}&ac_click_type=g&ac_position=0&dest_id=ChIJCwbzN300-F8RluwcLDXII_k&dest_type=region&place_id=ChIJCwbzN300-F8RluwcLDXII_k&place_id_lat=${t.city.coord.lat}&place_id_lon=${t.city.coord.lon}&place_types=postal_code%2Cgeocode&search_pageview_id=8b8fa72ebbc80057&search_selected=true"><i class="fas fa-bed"></i></a>\n      <a href="https://tabelog.com/en/rstLst/?n=${t.city.name}&maxLat=${t.city.coord.lat}&minLat=${t.city.coord.lat-.314265}&maxLon=${t.city.coord.lon}&minLon=${t.city.coord.lon-.314265}&lat=${t.city.coord.lat}&lon=${t.city.coord.lon}&zoom=15"><i class="fas fa-utensils"></i></a>\n      <a href="https://www.google.com/search?sxsrf=ALeKk00PQ3SjtRihTxdquQqLnFpAacdiQg%3A1592525550113&ei=7gLsXv3CBoiF0wSe4Lm4Ag&q=news+${t.city.name}+japan+${postCode}&oq=${t.city.name}+japan+${postCode}&gs_lcp=CgZwc3ktYWIQAzoHCCMQsAIQJ1Df8zxYur89YJvLPWgDcAB4AIABqAGIAZoIkgEDMC45mAEAoAEBqgEHZ3dzLXdpeg&sclient=psy-ab&ved=0ahUKEwj98db9y4zqAhWIwpQKHR5wDicQ4dUDCAw&uact=5"><i class="far fa-newspaper"></i></a>\n      <a href="https://en.wikipedia.org/w/index.php?cirrusUserTesting=glent_m0&search=${t.city.name}&title=Special%3ASearch&go=Go&ns0=1" ><i class="fab fa-wikipedia-w"></i></a>\n      <a class="twitter-share-button"\n        href="https://twitter.com/intent/tweet?text=${t.city.name}%20is%20awesome"\n        data-size="large">\n        <i class="fab fa-twitter-square"></i></a>\n    </div>\n  `;document.getElementById("city-name").innerHTML=t.city.name+", "+t.city.country,document.querySelector(".forecast-container").innerHTML=a,document.querySelector(".free-space-container").innerHTML=s,document.getElementById("postcode").value=""},initMap=e=>{if(e){const t={lat:e.city.coord.lat,lng:e.city.coord.lon},a=new google.maps.Map(document.getElementById("map"),{center:t,zoom:11,disableDefaultUI:!0});new google.maps.Marker({position:t,map:a,title:e.city.name})}else new google.maps.Map(document.getElementById("map"),{center:{lat:35.6938,lng:139.7034},zoom:11,disableDefaultUI:!0})};