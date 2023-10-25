import dom from './dom.js';

const events = (() => {

    function clickListener() {
        const searchBox = document.getElementById('search-box');
        const nav = document.querySelector('.nav');

        nav.addEventListener('click', async (event) => {
            const { target } = event;
            let input;
            let unitType

            if (target.getAttribute('id') === 'search-icon') {
                event.preventDefault();
                input = searchBox.value;
                load(input, unitType);
            }
            else if (target.classList.contains('metric-btn')) {
                unitType = "metric";
                load(input, unitType);
            }
            else if (target.classList.contains('imperial-btn')) {
                unitType = "imperial";
                load(input, unitType);
            }

        })

        async function load(input, unit) {

        }
    }

    return {
        clickListener, load
    };

})();

export default events;