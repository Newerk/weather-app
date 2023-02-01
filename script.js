//make sure to account for errors that can occur, and properly display them for the user to fix

const searchWrapper = document.querySelector('.search');
const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');

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
        console.log(getApiLocationData(searchBar.value).then(loadWeatherInformation()))

    }
})

searchBar.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        updateContentArea();
        console.log(getApiLocationData(searchBar.value).then(loadWeatherInformation()))

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
    const deg = '\u{00B0}'; //degrees in unicode
    const weatherInfo = document.getElementById('weather-info');

    let getLocation = await getApiLocationData(searchBar.value)
        .then((data) => console.log(`${data.name}`));

    let getTemp = await getApiLocationData(searchBar.value)
        .then((data) => console.log(`Temperature is: ${data.main.temp}${deg}`));

    let getFeelsLike = await getApiLocationData(searchBar.value)
        .then((data) => console.log(`Feels like: ${data.main.feels_like}${deg}`));

    let getHumidity = await getApiLocationData(searchBar.value)
        .then((data) => console.log(`Humidity: ${data.main.humidity}`));

    weatherInfo.setAttribute('style',
        `display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: auto 1fr repeat(2, auto);
        height: 70vh;
        width: 30rem;
        background-color: red;`)
};

//plays while waiting for loadWeatherInformation() to finish gathering all the date, and stops AFTER the information is returned
async function playLoadingAnimation() { }
