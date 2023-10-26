import { fromUnixTime, format, parseISO } from 'date-fns'

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
            current: {
                cloud: current.cloud
            }
        }


    }

    function formatDate(originalDate) {
        const date = parseISO(originalDate);
        const formattedDate = format(new Date(date),"EEEE d MMMM yyyy | HH:mm");
        return formattedDate;
    }

    return {
        getLocationData,
    }

})();

export default weather



