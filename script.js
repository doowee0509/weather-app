var api = config.API
var unit = "imperial"
var place = "Denver"
var tempUnit = " °F"
var spdUnit = " miles/hour"
function changeMode() {
    if (unit === "imperial") {
        unit = "metric"
        tempUnit = " °C"
        spdUnit = " meter/sec"
        document.getElementById("units").innerHTML = tempUnit
    }
    else {
        unit = "imperial"
        tempUnit = " °F"
        spdUnit = " miles/hour"
        document.getElementById("units").innerHTML = tempUnit
    }
    weather.search();
}
let weather = {
    apiKey: api,
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=" + unit + "&appid=" +
            this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + tempUnit;
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + spdUnit;
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/2000x1000/?" + name + "')";
    },
    search: function () {
        this.fetchWeather(place);
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            place = document.querySelector(".search-bar").value
            weather.search();
        }
    });

weather.fetchWeather(place);