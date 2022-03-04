
console.log(`>>>>>>>>>> Twitter Login Blocker running`);

const htmlElement = document.querySelector("html");
const layersElement = document.querySelector("div#layers");

const isLoginLayer = function(node) {
    const spans = node.querySelectorAll('span')
    return [...spans].filter(e => e.textContent === 'Log in').length > 0
}

const htmlCallback = function(mutationsList) {
    for(const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            mutation.target.style.overflow = null;
        }
    }
};

const layersCallback = function(mutationsList) {
    for(const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            [...mutation.addedNodes]
                .filter(node => isLoginLayer(node))
                .forEach(node => node.style.display = 'none');
        }
    }
};

const htmlObserver = new MutationObserver(htmlCallback);
htmlObserver.observe(
    htmlElement,
    { attributes: true }
);

const layersObserver = new MutationObserver(layersCallback);
layersObserver.observe(
    layersElement,
    { childList: true }
);
