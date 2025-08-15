import { init, rotate } from './cube.js';

const createRotateButton = (rotationName, isBackward = false) => {
	const button = document.createElement('div');
	button.id = `${rotationName}${isBackward ? '-back' : ''}_rotate`;
	button.className = 'rotate_button';
	button.addEventListener('click', () => rotate(`${rotationName}${isBackward ? "'" : ''}`));

	const title = rotationName.toUpperCase() + (isBackward ? "'" : '');
	button.textContent = title;

	const container = isBackward ? document.getElementById('but_cont_back') : document.getElementById('but_cont');
	container.appendChild(button);
};

const setupControls = () => {
	const buttonNames = ['f', 'l', 'u', 'x', 'y', 'z'];
	for (const name of buttonNames) {
		createRotateButton(name, false);
		createRotateButton(name, true);
	}
};

// Modules are deferred; still use DOMContentLoaded for robustness
window.addEventListener('DOMContentLoaded', () => {
	init();
	setupControls();
});