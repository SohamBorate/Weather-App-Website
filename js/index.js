const locationInput = document.querySelector("#locationInput")
const searchBtn = document.querySelector("#searchBtn")
const weatherCard = document.querySelector("#weather-card");
const weatherLocation = document.querySelector("#weather-location");
const weatherDesc = document.querySelector("#weather-desc");
const weatherTemp = document.querySelector("#weather-temp");
const weatherFeelsLike = document.querySelector("#weather-feelsLike");
const weatherHumid = document.querySelector("#weather-humid");
const weatherIcon = document.querySelector("#weather-icon");
const apiProxy = "https://weatherbyboru.vercel.app"

const updateWeather = (location, desc, temp, feelsLike, humid, icon) => {
    weatherLocation.innerHTML = location;
    weatherDesc.innerHTML = desc;
    weatherTemp.innerHTML = temp;
    weatherFeelsLike.innerHTML = feelsLike;
    weatherHumid.innerHTML = humid;
    weatherIcon.src = icon;
}

const loadWeatherData = (query) => {
    let url = apiProxy + "/api/weather?location=" + query;
    updateWeather("Loading...", "", "", "", "", "");
    weatherCard.style.display = "Block";
    let request = fetch(url);
    request.then((response) => {
        if (response.status !== 200) {
            console.log("Looks like there was a problem. Status Code: " + response.status);
            updateWeather("Error", "Code " + response.status, "", "", "", "");
            return;
        }
        response.json().then(function(data) {
            if (data.cod === 200) {
                let location = data.name;
                let desc = data.weather[0].main;
                let temp = data.main.temp + " °C";
                let feelsLike = "Feels like " + data.main.feels_like + "°C";
                let humid = "Humidity " + data.main.humidity + "%";
                let icon = apiProxy + "/api/weather-icon/" + data.weather[0].icon + "@2x.png";
                updateWeather(location, desc, temp, feelsLike, humid, icon);
            } else {
                updateWeather("Error", "Code " + data.cod, data.message, "", "", "");
            }
        });
    });
    request.catch((err) => {
        console.log("Fetch Error: ", err);
    });
};

searchBtn.addEventListener("click", () => {
    if (locationInput.value.toLowerCase() !== "") {
        loadWeatherData(locationInput.value.toLowerCase())
    }
});

weatherCard.style.display = "None";