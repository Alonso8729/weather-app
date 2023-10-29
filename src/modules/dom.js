/* eslint-disable no-duplicate-case */
import { format, parse } from 'date-fns';

const dom = (() => {
    const mainContainer = document.querySelector('.main-container');
    const error = document.querySelector('.error');

    function toggleLoader(state) {
        const loader = document.querySelector('.loader');

        if (state === 'loading') {
            mainContainer.classList.add('hide');
            loader.classList.remove('hide');
        } else {
            loader.classList.add('hide');
            mainContainer.classList.remove('hide');
        }
    }

    function handleWeatherData(data, units) {
        //Error handling
        if (data.error) {
            mainContainer.className = 'main-container hide';
            error.className = 'error';
            error.textContent =
                data.error.message.charAt(0).toUpperCase(0) +
                data.error.message.slice(1);
        }
        //Location was found
        else {
            mainContainer.className = 'main-container';
            error.className = 'error hide';
            error.textContent = '';

            setUnit(units);

            const { city, country, localTime, current, forecast, daily } = data;
            displayForecast(city, country, current, localTime, forecast, units);
            displayUpcomingForecast(daily);
        }
    }

    function setUnit(units) {
        const metricButton = document.querySelector('.metric-btn');
        const imperialButton = document.querySelector('.imperial-btn');

        if (units === 'metric') {
            imperialButton.classList.remove('active');
            metricButton.classList.add('active');
        } else if (units === 'imperial') {
            metricButton.classList.remove('active');
            imperialButton.classList.add('active');
        }
    }

    function displayForecast(
        city,
        country,
        current,
        localTime,
        forecast,
        units,
    ) {
        const dataCity = document.querySelector('.data-city');
        const dataCountry = document.querySelector('.data-country');
        const time = document.querySelector('.data-time');
        const weatherIcon = document.querySelector('.weather-icon');
        const temp = document.querySelector('.data-temp');
        const tempDescription = document.querySelector('.data-temp-desc');
        const feelsLike = document.querySelector('.data-feels-like');
        const windDesc = document.querySelector('.data-wind');
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
        time.textContent = localTime;
        temp.textContent = current.temp;
        tempDescription.textContent = current.weatherDesc;
        feelsLike.textContent = current.feelsLike;
        windArrow.style.transform = `rotate(${current.windDegree}deg)`;
        windSpeed.textContent = current.windSpeed;
        units === 'metric'
            ? (windUnit.textContent = 'm/s')
            : (windUnit.textContent = 'mph');
        humidity.textContent = current.humidity;
        cloudiness.textContent = current.humidity;
        units === 'metric'
            ? (visibility.textContent = `${current.visibility}km`)
            : (visibility.textContent = `${current.visibility}m/s`);
        uvi.textContent = current.uvi;
        rainChance.textContent = forecast.chanceOfRain;
        sunrise.textContent = forecast.sunrise;
        sunset.textContent = forecast.sunset;
        moonPhase.textContent = forecast.moonPhase;

        //use converting functions for weather icon
        weatherIcon.className = `weather-icon ${convertToIcon(
            current.weatherIcon,
        )}`;
        windDesc.textContent = getWindDescription(current.windSpeed, units);
        uvi.className = `${getUviColor(current.uvi)}`;
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
                return 'fa-solid fa-cloud-rain';
            case 1195:
                return 'fa-solid fa-cloud-showers-heavy';
            case 1180:
            case 1186:
            case 1192:
                return 'fa-solid fa-cloud-sun-rain';
            case 1225:
            case 1237:
                return 'fa-solid fa-cloud-meatball';
            case 1273:
            case 1276:
            case 1279:
            case 1282:
                return 'fa-solid fa-cloud-bolt';
            case 1204:
            case 1213:
            case 1216:
            case 1219:
            case 1222:
            case 1225:
            case 1237:
                return 'fa-regular fa-snowflake';
            default:
                return 'fa-solid fa-smog';
        }
    }

    function formatDate(originalDate) {
        const date = parse(originalDate, 'yyyy-MM-dd H:mm', new Date());
        const formattedDate = format(date, 'eeee d MMMM yyyy | HH:mm');
        return formattedDate;
    }

    function convertTimeTo24HourFormat(time) {
        const timeFormatPattern = 'hh:mm a';

        const parsedTime = parse(time, timeFormatPattern, new Date());
        return format(parsedTime, 'HH:mm');
    }

    function formatDateToDay(date) {
        const formattedDate = format(new Date(date), 'EEEE');
        return formattedDate;
    }

    function displayUpcomingForecast(daily) {
        const daysList = document.querySelector('.forecast-list');
        daysList.textContent = '';
        for (let i = 0; i < 3; i++) {
            //Declare variables
            const dayElement = document.createElement('div');
            const dayHeading = document.createElement('div');
            const dailyMain = document.createElement('div');
            const dailyWeatherDesc = document.createElement('div');
            const dayData = document.createElement('span');
            const dataIcon = document.createElement('i');
            const dayTemp = document.createElement('span');
            const nightTemp = document.createElement('span');
            const dayDegree = document.createElement('span');
            const nightDegree = document.createElement('span');
            const slash = document.createElement('span');

            //Add classes
            dayElement.classList.add('day-element');
            dayHeading.classList.add('daily-heading');
            dailyMain.classList.add('daily-main');
            dailyWeatherDesc.classList.add('daily-weather-desc');
            dayData.classList.add('data-day');
            dataIcon.classList.add('data-icon');
            dayTemp.classList.add('data-day-temp');
            nightTemp.classList.add('data-night-temp');
            dayDegree.classList.add('daily-day-degree');
            nightDegree.classList.add('daily-night-degree');
            slash.classList.add('daily-slash');

            //Add text content
            dayData.textContent = daily[i].day;
            dailyWeatherDesc.textContent = daily[i].weatherDesc;
            dataIcon.className = `data-icon ${convertToIcon(daily[i].dayIcon)}`;
            dayTemp.textContent = daily[i].dayTemp;
            nightTemp.textContent = daily[i].nightTemp;
            dayDegree.textContent = '°';
            nightDegree.textContent = '°';
            slash.textContent = '/';

            //Appending
            dayHeading.appendChild(dayData);
            dailyMain.appendChild(dataIcon);
            dailyMain.appendChild(dayTemp);
            dailyMain.appendChild(dayDegree);
            dailyMain.appendChild(slash);
            dailyMain.appendChild(nightTemp);
            dailyMain.appendChild(nightDegree);

            dayElement.appendChild(dayHeading);
            dayElement.appendChild(dailyMain);

            daysList.appendChild(dayElement);
        }
    }
    function getWindDescription(windSpeed, units) {
        let speed = windSpeed;
        if (units === 'imperial') {
            speed *= 0.44704;
        }
        let windDesc;
        if (windSpeed < 0.5) {
            windDesc = 'Calm';
        } else if (speed < 1.6) {
            windDesc = 'Light air';
        } else if (speed < 3.4) {
            windDesc = 'Light breeze';
        } else if (speed < 5.6) {
            windDesc = 'Gentle breeze';
        } else if (speed < 8) {
            windDesc = 'Moderate breeze';
        } else if (speed < 10.8) {
            windDesc = 'Fresh breeze';
        } else if (speed < 13.9) {
            windDesc = 'Strong breeze';
        } else if (speed < 17.2) {
            windDesc = 'High wind';
        } else if (speed < 20.8) {
            windDesc = 'Gale';
        } else if (speed < 24.5) {
            windDesc = 'Strong gale';
        } else if (speed < 28.5) {
            windDesc = 'Storm';
        } else if (speed < 32.7) {
            windDesc = 'Violent storm';
        } else if (speed >= 32.7) {
            windDesc = 'Hurricane';
        }
        return windDesc;
    }

    function getUviColor(uvi) {
        let color = '';
        if (uvi <= 2) {
            color = 'data-uvi uvi-green';
        } else if (uvi <= 5) {
            color = 'data-uvi uvi-yellow';
        } else if (uvi <= 7) {
            color = 'data-uvi uvi-orange';
        } else if (uvi > 7) {
            color = 'data-uvi uvi-red';
        }
        return color;
    }

    return {
        toggleLoader,
        handleWeatherData,
        formatDate,
        convertTimeTo24HourFormat,
        formatDateToDay,
    };
})();

export default dom;
