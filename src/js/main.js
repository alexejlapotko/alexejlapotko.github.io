import { initCube } from "./cube.js";
import { initButtons } from "./buttons.js";

function boot() {
	initCube();
	initButtons();
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", boot);
} else {
	boot();
}
