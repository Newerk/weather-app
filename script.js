//make sure to account for errors that can occur, and properly display them for the user to fix

const delay = (time) => {
    return new Promise(resolve => {
        setTimeout(resolve, time)
    })
}



const searchBar = document.getElementById('search-bar');
searchBar.addEventListener('click', () => {
    searchBar.value = "";
})
searchBar.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        document.querySelector('.search').classList.add('reposition');
        document.getElementById('content-title').style.visibility = 'hidden';
        delay(100)
            .then(() => {
                document.querySelector('.header').setAttribute('style', 'background-color: coral')
            })
            .then(() => document.getElementById('header-title').style.opacity = 1);
        searchBar.blur();

        return getApiLocationData(searchBar.value).then(data => console.log(data));
    }
})

async function getApiLocationData(users_search) {
    let resolve = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${users_search}&APPID=964b5caa1339284c9d19f376183c77de&units=imperial`);
    let weatherData = await resolve.json();
    return weatherData;
}

//plays while waiting for api information to load, and stops AFTER the information is returned
async function loadingAnimation() {

};
