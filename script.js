//make sure to account for errors that can occur, and properly display them for the user to fix

const searchWrapper = document.querySelector('.search');
const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');
const apiLocation = document.getElementById('api-location');
const content = document.querySelector('.content');

const delay = (time) => {
    return new Promise(resolve => {
        setTimeout(resolve, time)
    })
}

searchBar.addEventListener('click', () => {
    searchBar.value = "";
})

searchBtn.addEventListener('click', (e) => {
    if (searchBar.value !== "" && searchBar.value !== "Search Location") {
        updateContentArea();
        getApiLocationData(searchBar.value).then(loadWeatherInformation())

    }
})

searchBar.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        updateContentArea();
        getApiLocationData(searchBar.value).then(loadWeatherInformation())

    }
})


function updateContentArea() {
    if (!searchWrapper.classList.contains('reposition')) {
        searchWrapper.classList.add('reposition');
        document.querySelector('.search').setAttribute('style', 'height: 0');
        document.querySelector('h2').remove();
        content.setAttribute('style', 'display: grid; grid-template-rows: 4rem 1fr; padding: 1rem 1rem 1rem 1rem;');
        updateHeader();
    }
}

function updateHeader() {
    delay(100)
        .then(() => {
            document.querySelector('.header').setAttribute('style', 'background-color: rgb(39, 157, 231)')
        })
        .then(() => {
            document.getElementById('header-logo').style.opacity = 1
        });
    searchBar.blur();
}

async function getApiLocationData(users_search) {
    let resolve = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${users_search}&APPID=964b5caa1339284c9d19f376183c77de&units=imperial`);
    let weatherData = await resolve.json();
    return weatherData;
}

//gathers all the object properties I want to use from the data loaded from the openweathermap API
async function loadWeatherInformation() {
    wipeWeatherInfo();

    const deg = '\u{00B0}'; //degrees in unicode

    try {


        let getLocation = await getApiLocationData(searchBar.value)
            .then((data) => data.name);

        let getIconURL = await getApiLocationData(searchBar.value)
            .then(data => `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);

        let getTemp = await getApiLocationData(searchBar.value)
            .then((data) => `${parseInt(data.main.temp)}${deg}F`);

        let getFeelsLike = await getApiLocationData(searchBar.value)
            .then((data) => `Feels like ${parseInt(data.main.feels_like)}${deg}F`);

        let getHumidity = await getApiLocationData(searchBar.value)
            .then((data) => `Humidity: ${data.main.humidity}%`);


        const location = document.createElement('div');
        location.id = 'location';
        location.textContent = getLocation;

        apiLocation.append(location);

        const icon = document.createElement('img');
        icon.id = 'icon';
        icon.src = getIconURL;

        const temp = document.createElement('div');
        temp.id = 'temp';
        temp.textContent = getTemp;

        const feelsLike = document.createElement('div');
        feelsLike.id = 'feels-like';
        feelsLike.textContent = getFeelsLike;

        const humidity = document.createElement('div');
        humidity.id = 'humidity';
        humidity.textContent = getHumidity;


        weatherInfo.append(icon, temp, feelsLike, humidity);

    } catch {
        const location = document.getElementById('api-location');
        location.textContent = 'Please enter a valid geographical location';
        location.style.fontSize = '1rem';
        apiLocation.append(location);
    }

};

function wipeWeatherInfo() {
    weatherInfo.innerHTML = '';
    apiLocation.innerHTML = '';
}

//plays while waiting for loadWeatherInformation() to finish gathering all the date, and stops AFTER the information is returned
async function playLoadingAnimation() { }
