import dom from './dom.js'

const weather = (() => {
    const API_KEY = '62021590287540d6818114957232210';

    async function getLocationData(input, units) {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${input}&days=3`, { mode: 'cors' })
            const locationData = await response.json();

            if (response.status >= 400) {
                return locationData;
            }
            else {
                return (processData(locationData));
            }
        }
        catch (error) {
            return { cod: error.name, message: error.message };
        }
    }

    async function processData(data) {
        console.log(data);

        const { location, current, forecast } = data;
        const processedData = {
            city: location.name,
            country: location.country,
            localTime: dom.formatDate(location.localtime
            ),
            current: {
                weatherIcon: current.condition.code,
                temp: current.temp_c,
                icon: current.condition.icon,
                cloudiness: current.cloud,
                weatherDesc: current.condition.text,
                feelsLike: Math.round(current.feelslike_c),
                humidity: current.humidity,
                windSpeed: Math.round(current.wind_kph),
                windDegree: current.wind_degree,
                uvi: current.uv,
                visibility: current.vis_km,
            },
            forecast: {
                chanceOfRain: forecast.forecastday[0].day.daily_chance_of_rain,
                sunrise: dom.convertTimeTo24HourFormat(forecast.forecastday[0].astro.sunrise),
                sunset: dom.convertTimeTo24HourFormat(forecast.forecastday[0].astro.sunset),
                moonPhase: forecast.forecastday[0].astro.moon_phase,
            },
            daily: [],
        }

        //Assign values to upcoming 3 days forecast
        for (let i = 0; i < 3; i++) {
            processedData.daily[i] = {
                day: dom.formatDateToDay(forecast.forecastday[i].date),
                dayIcon: forecast.forecastday[i].day.condition.icon,
                dayTemp: Math.round(forecast.forecastday[i].day.avgtemp_c),
                nightTemp: Math.round(forecast.forecastday[i].day.mintemp_c),
                weatherDesc: forecast.forecastday[i].day.condition.text,
            }
        }

        return processedData;
    }

    function getWindDescription(windSpeed, units) {
        let speed = windSpeed;
        if (units === "imperial") {
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



    return {
        getLocationData, getWindDescription
    }

})();

export default weather



