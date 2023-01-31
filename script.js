//make sure to account for errors that can occur, and properly display them for the user to fix

const delay = (time) => {
    return new Promise(resolve => {
        setTimeout(resolve, time)
    })
}



const searchBar = document.getElementById('search-bar');
searchBar.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        // getApiLocationData(searchBar.value).then(data => console.log(data))
        document.querySelector('.search').classList.add('reposition');
        document.getElementById('content-title').style.visibility = 'hidden';
        document.getElementById('header-title').style.opacity = 1;
        delay(100).then(() => {
            document.querySelector('.header').setAttribute('style', 'background-color: coral')
        });
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
