const logPrefix = '>>>>>>>>>> Twitter Login Blocker';
console.log(`${logPrefix} running`);

const htmlElement = document.querySelector("html");
const layersElement = document.querySelector("div#layers");

const isLoginLayer = function (node) {
    const spans = node.querySelectorAll('span')
    return [...spans].filter(e => e.textContent === 'Log in').length > 0
}

const htmlCallback = function (mutationsList) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            mutation.target.style.overflow = null;
        }
    }
};

const keepHiddenCallback = function (mutationsList) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            mutation.target.style.display = 'none';
        }
    }
};

const layersCallback = function (mutationsList) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList' || mutation.type === 'subtree') {
            const loginLayers = [...mutation.addedNodes]
                .filter(node => isLoginLayer(node))

            loginLayers.forEach(node => {
                console.log(`${logPrefix} login layer blocked`);
                const keepHiddenObserver = new MutationObserver(keepHiddenCallback);
                keepHiddenObserver.observe(node, {attributeFilter: ['style']});
                return node.style.display = 'none';
            });
        }
    }
};

const htmlObserver = new MutationObserver(htmlCallback);
htmlObserver.observe(htmlElement, {attributeFilter: ['style']});

const layersObserver = new MutationObserver(layersCallback);
layersObserver.observe(layersElement, {childList: true});
