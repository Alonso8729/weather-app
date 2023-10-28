import dom from './dom.js';
import weather from './weather.js';

const events = (() => {
    function clickListener() {
        const searchBox = document.getElementById('search-box');
        const nav = document.querySelector('.nav');
        let input;
        let unitType;

        nav.addEventListener('click', async (event) => {
            const { target } = event;

            if (target.getAttribute('id') === 'search-icon') {
                event.preventDefault();
                input = searchBox.value;
                load(input, unitType);
                console.log(input, unitType);
            } else if (target.classList.contains('metric-btn')) {
                unitType = 'metric';
                load(input, unitType);
                console.log(input, unitType);
            } else if (target.classList.contains('imperial-btn')) {
                unitType = 'imperial';
                load(input, unitType);
                console.log(input, unitType);
            }
        });
    }

    async function load(input = 'haifa', units = 'metric') {
        dom.toggleLoader('loading');
        const data = await weather.getLocationData(input, units);
        dom.handleWeatherData(data, units);
        dom.toggleLoader('done');
    }

    return {
        clickListener,
        load,
    };
})();

export default events;
