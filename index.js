let tempValue;
let weather = {
    apiKey: "7d3b37abeeff859ad858ef8fcf74a272",
    fetchWeather: function (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`)
        .then((response) => {
            if (!response.ok) {
                    throw new Error('City not found or invalid input');
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data))
            .catch((error) => {
                console.error('Error fetching weather data:', error);
                this.displayError();
            });
        },
        displayError: function () {
            // Display an alert when there's an error
            alert('Ops! City not found, please re-enter correct city/zip-code');
        },
        displayWeather: function (data) {
            const { name } = data;
            const { icon, description } = data.weather[0];
            const { temp, humidity } = data.main;
            const { speed } = data.wind;
            
            document.querySelector(".city").innerText = "Weather in " + name;
            document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
            document.querySelector(".description").innerText = description;
            tempValue = Math.round(temp - 273);
            document.querySelector(".temp").innerText = tempValue + "°C";
            document.querySelector(".humidity").innerText = "Humidity: " + humidity + " %";
            document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/h";
            document.querySelector(".weather").classList.remove("loading");
            document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;
            document.body.style.backgroundPosition = "center";
        document.body.style.backgroundSize = "cover";
    },
    search: function () {
        const city = document.querySelector(".searchBar").value;
        this.fetchWeather(city);
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".searchBar").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        weather.search();
    }
});

const switchInput = document.getElementById("switch-toggle");
let temp1 = document.getElementById("temp")
switchInput.addEventListener("change", function () {
    if (this.checked) {
        checkedValue=true;
        let tempInFor = Math.round((tempValue * 9/5) + 32);
        temp1.innerText = tempInFor + "°F"
    } else {
        checkedValue=false;
        temp1.innerText = tempValue + "°C"
    }
});