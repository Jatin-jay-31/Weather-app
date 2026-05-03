let start = document.querySelector('#start')
let reset = document.querySelector('.reset')
let temperature = document.querySelector('#temp')
let City = document.querySelector('#city')
let weatherIcon = document.querySelector('#weathericon')
let windSpeed = document.querySelector('#windspeed')
let humidity = document.querySelector('#humidity')
let box1 = document.querySelector('.box1')
let box2 = document.querySelector('.box2')
let box3 = document.querySelector('.box3')
let input = document.querySelector('#cityInput');
let errorCode=document.querySelector("#errorcode")
let search = document.querySelector('.material-symbols-outlined')
const url = 'https://api.openweathermap.org/data/2.5/weather?'
const apiKey = '033659cb10215eb143151f3afcbf4195'

function changeIcon(value) {
    let icon = {
        Clear: '/images/clear.png',
        Clouds: '/images/clouds.png',
        Drizzle: '/images/drizzle.png',
        Haze: '/images/haze.png',
        Mist: '/images/mist.png',
        Rain: '/images/rain.png',
        Snow: '/images/snow.png',
        Thunderstorm: '/images/thunderstorm.png'
    }
    return icon[value]
}
start.addEventListener('click', () => {
    box1.classList.add('hide');
    box2.classList.remove('hide');
})
async function weatherInfo(city) {
    try {
        const newUrl = `${url}q=${city}&appid=${apiKey}`
        let response = await fetch(newUrl)
        if (!response.ok) {
            throw new Error("Cant fetch data", response.status)
        }
        else {
            let result = await response.json()
            if (result.cod !== 200 || input.value.trim() == "" ) {
                box2.classList.add('hide');
                box3.classList.remove('hide');
            }
            else {
                let temp = Math.floor((result.main.temp) - 273.15)
                weatherIcon.src = changeIcon(result.weather[0].main)
                temperature.innerHTML = `${temp}°C`
                windSpeed.innerHTML = `${result.wind.speed}km/h`
                humidity.innerHTML = `${result.main.humidity}%`
                City.innerHTML = result.name
            }

        }

    }
    catch (error) {
        box2.classList.add('hide');
        box3.classList.remove('hide');
    }
    input.value=""
}

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        let value = input.value
        weatherInfo(value)

    }
})
search.addEventListener('click', (e) => {
    let value = input.value
    weatherInfo(value)

}
)
reset.addEventListener('click', () => {
    box3.classList.add('hide');
    box1.classList.remove('hide');
    weatherIcon.src='/images/clear.png'
    temperature.innerHTML = '0°C'
    windSpeed.innerHTML = '0km/h'
    humidity.innerHTML = '0%'
    City.innerHTML = 'Delhi'
})