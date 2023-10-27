import { format, parseISO, parse } from 'date-fns';

const dom = (() => {
    const mainContainer = document.querySelector('.main-container');
    const error = document.querySelector('.error');

    function toggleLoader(state) {
        const loader = document.querySelector('.loader');

        if (state === 'loading') {
            mainContainer.classList.add('hide');
            loader.classList.remove('hide');

        }
        else {
            loader.classList.add('hide');
            mainContainer.classList.remove('hide');
        }
    }

    function handleWeatherData(data, units) {
        //Error handling
        if (data.error) {
            mainContainer.className = 'main-container hide';
            error.className = 'error';
            error.textContent = data.error.message.charAt(0).toUpperCase(0) + data.error.message.slice(1)
        }
        //Location was found
        else {
            mainContainer.className = 'main-container';
            error.className = 'error hide';
            error.textContent = '';

            setUnit(units);

            const { city, country, localTime, current, forecast, daily } = data;
            displayForecast(city, country, current, localTime, forecast, units);
            displayUpcomingForecast(daily, units)
        }
    }

    function setUnit(units) {
        const metricButton = document.querySelector('.metric-btn');
        const imperialButton = document.querySelector('.imperial-btn');

        if (units === "metric") {
            imperialButton.classList.remove('active');
            metricButton.classList.add('active');
            //Set units element to metric unit
        }
        else if (units === "imperial") {
            metricButton.classList.remove('active');
            imperialButton.classList.add('active')
            //Set units element to imperial unit
        }
    }

    function displayForecast(city, country, current, localTime, forecast, units) {
        const dataCity = document.querySelector('.data-city');
        const dataCountry = document.querySelector('.data-country');
        const time = document.querySelector('.data-time');
        const weatherIcon = document.querySelector('.weather-icon')
        const temp = document.querySelector('.data-temp');
        const tempDescription = document.querySelector('.data-temp-desc');
        const feelsLike = document.querySelector('.data-feels-like');
        const windArrow = document.getElementById('arrow-icon');
        const windSpeed = document.querySelector('.data-wind-speed');
        const windUnit = document.querySelector('.data-wind-unit');
        const humidity = document.querySelector('.data-humidity');
        const cloudiness = document.querySelector('.data-cloud');
        const uvi = document.querySelector('.data-uvi');
        const rainChance = document.querySelector('.data-rain-chance');
        const visibility = document.querySelector('.data-visibility');
        const sunrise = document.querySelector('.data-sunrise');
        const sunset = document.querySelector('.data-sunset');
        const moonPhase = document.querySelector('.data-moon-phase');

        dataCity.textContent = city;
        dataCountry.textContent = country;
        //time.textContent = localTime;
        temp.textContent = current.temp;
        tempDescription.textContent = current.weatherDesc;
        feelsLike.textContent = current.feelsLike;
        windArrow.style.transform = `rotate(${current.windDegree}deg)`;
        windSpeed.textContent = current.windSpeed;
        units === 'metric' ? windUnit.textContent = 'm/s' : windUnit.textContent = 'mph';
        humidity.textContent = current.humidity;
        cloudiness.textContent = current.humidity;
        visibility.textContent = current.visibility;
        uvi.textContent = current.uvi;
        rainChance.textContent = forecast.chanceOfRain;
        sunrise.textContent = forecast.sunrise;
        sunset.textContent = forecast.sunset;
        moonPhase.textContent = forecast.moonPhase;

        //use converting functions for weather icon
        weatherIcon.className = `weather-icon ${convertToIcon(current.weatherIcon)}`
    }

    function convertToIcon(iconCode) {
        switch (iconCode) {
            case 1000:
                return 'fa-regular fa-sun';
            case 1003:
                return 'fa-solid fa-cloud-sun';
            case 1006:
            case 1009:
                return 'fa-solid fa-cloud';
            case 1030:
            case 1135:
                return 'fa-solid fa-smog';
            case 1063:
            case 1150:
            case 1153:
            case 1183:
            case 1204:
            case 1207:
            case 1240:
                return "fa-solid fa-cloud-rain";
            case 1195:
                return "fa-solid fa-cloud-showers-heavy";
            case 1180:
            case 1186:
            case 1192:
                return "fa-solid fa-cloud-sun-rain";
            case 1225:
            case 1237:
                return "fa-solid fa-cloud-meatball";
            case 1273:
            case 1276:
            case 1279:
            case 1282:
                return "fa-solid fa-poo-storm";
            case 1204:
            case 1213:
            case 1216:
            case 1219:
            case 1222:
            case 1225:
            case 1237:
                return "fa-regular fa-snowflake"
            default:
                return 'fa-solid fa-smog';
        }
    }

    function formatDate(originalDate) {
        const date = parseISO(originalDate);
        const formattedDate = format(new Date(date), "EEEE d MMMM yyyy | HH:mm");
        return formattedDate;
    }

    function convertTimeTo24HourFormat(time) {
        const timeFormatPattern = 'hh:mm a';

        const parsedTime = parse(time, timeFormatPattern, new Date());
        return format(parsedTime, 'HH:mm');
    }

    function formatDateToDay(date) {
        const formattedDate = format(new Date(date), "EEEE");
        return formattedDate;
    }

    function displayUpcomingForecast(daily, units) {

    }

    return {
        toggleLoader, handleWeatherData, formatDate, convertTimeTo24HourFormat, formatDateToDay
    }

})();

export default dom;