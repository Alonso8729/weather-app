import dom from './dom.js'

const weather = (() => {
    const API_KEY = '62021590287540d6818114957232210'

    async function getLocationData(input, units) {
        try {
            const response = await fetch(
                `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${input}&days=3`,
                { mode: 'cors' }
            )
            const locationData = await response.json()

            if (response.status >= 400) {
                return locationData
            } else {
                return processData(locationData, units)
            }
        } catch (error) {
            return { cod: error.name, message: error.message }
        }
    }

    async function processData(data, units) {
        const { location, current, forecast } = data
        const processedData = {
            city: location.name,
            country: location.country,
            localTime: dom.formatDate(location.localtime),
            current: {
                weatherIcon: current.condition.code,
                temp:
                    units === 'metric'
                        ? Math.round(current.temp_c)
                        : Math.round(current.temp_f),
                icon: current.condition.icon,
                cloudiness: current.cloud,
                weatherDesc: current.condition.text,
                feelsLike:
                    units === 'metric'
                        ? Math.round(current.feelslike_c)
                        : Math.round(current.feelslike_f),
                humidity: current.humidity,
                windSpeed:
                    units === 'metric'
                        ? Math.round(current.wind_kph)
                        : Math.round(current.wind_mph),
                windDegree: current.wind_degree,
                uvi: current.uv,
                visibility:
                    units === 'metric' ? current.vis_km : current.vis_miles
            },
            forecast: {
                chanceOfRain: forecast.forecastday[0].day.daily_chance_of_rain,
                sunrise: dom.convertTimeTo24HourFormat(
                    forecast.forecastday[0].astro.sunrise
                ),
                sunset: dom.convertTimeTo24HourFormat(
                    forecast.forecastday[0].astro.sunset
                ),
                moonPhase: forecast.forecastday[0].astro.moon_phase
            },
            daily: []
        }

        //Assign values to upcoming 3 days forecast
        for (let i = 0; i < 3; i++) {
            processedData.daily[i] = {
                day: dom.formatDateToDay(forecast.forecastday[i].date),
                dayIcon: forecast.forecastday[i].day.condition.code,
                dayTemp:
                    units === 'metric'
                        ? Math.round(forecast.forecastday[i].day.avgtemp_c)
                        : Math.round(forecast.forecastday[i].day.avgtemp_f),
                nightTemp:
                    units === 'metric'
                        ? Math.round(forecast.forecastday[i].day.mintemp_c)
                        : Math.round(forecast.forecastday[i].day.mintemp_f),
                weatherDesc: forecast.forecastday[i].day.condition.text
            }
        }

        return processedData
    }

    return {
        getLocationData
    }
})()

export default weather
