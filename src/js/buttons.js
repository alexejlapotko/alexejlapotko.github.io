import { rotate } from "./cube.js";

function createRotateButton(rotName, forward, targetContainer) {
	const button = document.createElement("div");
	button.id = `${rotName}${forward ? "-back" : ""}_rotate`;
	button.className = "rotate_button";
	button.addEventListener("click", () => {
		rotate(rotName + (forward ? "'" : ""));
	}, false);

	const title = `${rotName.toUpperCase()}${forward ? "'" : ""}`;
	button.innerHTML = title;

	targetContainer.appendChild(button);
}

const BUTTON_NAMES = ["f", "l", "u", "x", "y", "z"];

export function initButtons() {
	const frontContainer = document.getElementById("but_cont");
	const backContainer = document.getElementById("but_cont_back");

	if (!frontContainer || !backContainer) {
		return;
	}

	for (let index = 0; index < BUTTON_NAMES.length; index++) {
		const buttonName = BUTTON_NAMES[index];
		createRotateButton(buttonName, false, frontContainer);
		createRotateButton(buttonName, true, backContainer);
	}
}
