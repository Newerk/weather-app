//just for testing, will change once the search feature is fully implemented
let searchedLocation = 'Tampa';

async function getApiLocationData(users_search) {
    let resolve = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${users_search}&APPID=964b5caa1339284c9d19f376183c77de&units=imperial`);
    let weatherData = await resolve.json();
    return weatherData;
}

getApiLocationData(searchedLocation).then(data => console.log(data))