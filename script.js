// API_KEY = 3a67fd692d1169f9b84b94cd248afc04
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// all cities API = https://api.api-ninjas.com/v1/city?name={NAME_OF_THE_CITY}

const WEATHER_API_KEY = `3a67fd692d1169f9b84b94cd248afc04`;
const CITIES_API_KEY = `/JAp/1r/P9Ebnw/S9TKm9w==9YpL1BYbxAlxkUND`;

const allWeathers = [
  "images/clear.png",
  "images/clouds.png",
  "images/drizzle.png",
  "images/mist.png",
  "images/rain.png",
  "images/snow.png",
];
const $weatherImage = document.getElementById("weather-image");
const $searchForm = document.getElementById("search-form");
const $searchText = document.getElementById("search-field");
const $wind = document.getElementById("wind");
const $humidity = document.getElementById("humidity");
const $city = document.getElementById("city");
const $temp = document.getElementById("temp");
let $resultBox = document.getElementById("result-box");
// upcoming suggestions will be stored here
let allSuggestions = [];

$searchText.addEventListener("focus", (event) => {
  console.log("object");
});

$searchText.addEventListener("focusout", (event) => {
  console.log("fffffffffffffffffffffffffff");
  if ($resultBox.firstChild !== null) {
    $resultBox.firstChild.addEventListener("mouseout", () => {
      $resultBox.firstChild.style.display = "none";
    });
  }
});

const allCities = (nameOfTheCity) => {
  //   let suggestedCities = [];
  const url = `https://api.api-ninjas.com/v1/city?name=${nameOfTheCity}`;
  return fetch(url, {
    headers: {
      "X-Api-Key": CITIES_API_KEY,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      data.map((city) => {
        console.log(city.name);
        console.log(allSuggestions);
        allSuggestions.push(city.name);
        console.log("======", allSuggestions);
      });
    });
};
console.log("====><>    ", allSuggestions);

$searchText.addEventListener("keyup", (e) => {
  let result = [];
  const inputText = $searchText.value;
  if (inputText.length) {
    result = allSuggestions.filter((keyword) => {
      return keyword.toLowerCase().includes(inputText.toLowerCase());
    });
    console.log(result);
  }
  allCities(inputText);
  displayContent(result);
});

function displayContent(result) {
  const uniqueSuggestions = new Set(allSuggestions);

  const content = Array.from(uniqueSuggestions)
    .map((city) => {
      return `<li onclick=selectInput(this)> ${city}</li>`;
    })
    .join(" ");
  $resultBox.innerHTML = `<ul> ${content}</ul>`;
}
function selectInput(city) {
  $searchText.value = city.innerHTML;
  $resultBox.innerHTML = "";
}

$searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData($searchForm);
  const cityName = formData.get("search");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${WEATHER_API_KEY}`;

  // fetching data
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.cod === 200) {
        changeValues($wind, data.wind["speed"]);
        changeValues($humidity, data.main["humidity"]);
        changeValues($city, data.name);
        changeValues($temp, data.main["temp"]);

        const weatherMain = data.weather[0].main.toLowerCase();
        console.log(weatherMain);
        switch (weatherMain) {
          case "clear":
            console.log('clear');
            $weatherImage.setAttribute('src', 'images/clear.png')
            break;
          case "clouds":
            $weatherImage.setAttribute('src', 'images/clouds.png')
            break;
          case "drizzle":
            $weatherImage.setAttribute('src', 'images/drizzle.png')
            break;
          case "haze":
            $weatherImage.setAttribute('src', 'images/mist.png')
            break;
          case "rain":
            $weatherImage.setAttribute('src', 'images/rain.png')
            break;
          case "snow":
            $weatherImage.setAttribute('src', 'images/snow.png')
            break;
          default:
            $weatherImage.setAttribute('src', '')
        }

        /* 
        
        





        */
      }
      console.log(data);
    });
});
const changeValues = (valueVarName, updatedValue = "") => {
  valueVarName.innerText = updatedValue;
};

/* 

{
    "coord": {
        "lon": 90.4074,
        "lat": 23.7104
    },
    "weather": [
        {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 305.14,
        "feels_like": 312.14,
        "temp_min": 305.14,
        "temp_max": 305.14,
        "pressure": 1006,
        "humidity": 70
    },
    "visibility": 3500,
    "wind": {
        "speed": 0,
        "deg": 0
    },
    "clouds": {
        "all": 75
    },
    "dt": 1695713855,
    "sys": {
        "type": 1,
        "id": 9145,
        "country": "BD",
        "sunrise": 1695685686,
        "sunset": 1695729105
    },
    "timezone": 21600,
    "id": 1185241,
    "name": "Dhaka",
    "cod": 200
}


*/
