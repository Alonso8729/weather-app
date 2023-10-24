
const dom = (() => {
    const mainContainer = document.querySelector('.main-container');

    function toggleLoader(state) {
        const loader = document.querySelector('.loader');

        if (state === 'loading') {
            loader.classList.remove('hide');
            mainContainer.classList.add('hide');
        }
        else {
            mainContainer.classList.remove('hide');
            loader.classList.add('hide');
        }
    }


})();

export default dom;