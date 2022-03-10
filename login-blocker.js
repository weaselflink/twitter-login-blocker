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
			console.log(`${logPrefix} login layer kept hidden`);
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

const logPrefix = '>>>>>>>>>> Twitter Login Blocker';
console.log(`${logPrefix} running`);

function init() {
	console.log(`${logPrefix} init`);
	const layerElement = document.querySelector("div#layers");
	if (layerElement) {
		const layersObserver = new MutationObserver(layersCallback);
		layersObserver.observe(
			layerElement,
			{childList: true, subtree: true}
		);

		const htmlElement = document.querySelector("html");
		const htmlObserver = new MutationObserver(htmlCallback);
		htmlObserver.observe(
			htmlElement,
			{attributeFilter: ['style']}
		);
	} else {
		setTimeout(init, 200);
	}
}

setTimeout(init, 200);
