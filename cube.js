/* Modern ES module for the 3D Rubik's cube */

let container;
let cube;
let plane;

const cubies = ["flu", "fld", "fru", "frd", "blu", "bld", "bru", "brd"];
const sidesPositions = ["f", "b", "l", "r", "u", "d"];

/* coloring */

const coloring = {};

function getSide(sideName) {
	return cube.getElementsByClassName(sideName + " side")[0];
}

function updateColor(sideName, newColor) {
	const side = getSide(sideName);
	side.classList.remove(coloring[sideName] + "-color");
	side.classList.add(newColor + "-color");
	coloring[sideName] = newColor;
}

function updateColoring(newColoring) {
	for (const side of Object.keys(newColoring)) {
		if (coloring[side] !== newColoring[side]) {
			updateColor(side, newColoring[side]);
		}
	}
}

/* rotation */

const rotations = {
	"f": {
		"cubies": ["flu", "fld", "fru", "frd"],
		"recolor": {
			"flu": "fru", "fru": "frd", "frd": "fld", "fld": "flu",
			"lfu": "ufr", "ufl": "rfu", "ufr": "rfd", "rfu": "dfr",
			"rfd": "dfl", "dfr": "lfd", "dfl": "lfu", "lfd": "ufl"
		}
	},
	"l": {
		"cubies": ["flu", "fld", "blu", "bld"],
		"recolor": {
			"lbu": "lfu", "lfu": "lfd", "lfd": "lbd", "lbd": "lbu",
			"bld": "ubl", "blu": "ufl", "ubl": "flu", "ufl": "fld",
			"flu": "dfl", "fld": "dbl", "dfl": "bld", "dbl": "blu"
		}
	},
	"u": {
		"cubies": ["flu", "fru", "blu", "bru"],
		"recolor": {
			"ubl": "ubr", "ubr": "ufr", "ufr": "ufl", "ufl": "ubl",
			"rbu": "fru", "rfu": "flu", "fru": "lfu", "flu": "lbu",
			"lfu": "blu", "lbu": "bru", "blu": "rbu", "bru": "rfu"
		}
	},
	"x": {
		"cubies": cubies,
		"recolor": {
			"lbu": "lfu", "lfu": "lfd", "lfd": "lbd", "lbd": "lbu",
			"bld": "ubl", "blu": "ufl", "ubl": "flu", "ufl": "fld",
			"flu": "dfl", "fld": "dbl", "dfl": "bld", "dbl": "blu",
			"rbu": "rfu", "rfu": "rfd", "rfd": "rbd", "rbd": "rbu",
			"brd": "ubr", "bru": "ufr", "ubr": "fru", "ufr": "frd",
			"fru": "dfr", "frd": "dbr", "dfr": "brd", "dbr": "bru"
		}
	},
	"y": {
		"cubies": cubies,
		"recolor": {
			"ubl": "ubr", "ubr": "ufr", "ufr": "ufl", "ufl": "ubl",
			"rbu": "fru", "rfu": "flu", "fru": "lfu", "flu": "lbu",
			"lfu": "blu", "lbu": "bru", "blu": "rbu", "bru": "rfu",
			"dbl": "dbr", "dbr": "dfr", "dfr": "dfl", "dfl": "dbl",
			"rbd": "frd", "rfd": "fld", "frd": "lfd", "fld": "lbd",
			"lfd": "bld", "lbd": "brd", "bld": "rbd", "brd": "rfd"
		}
	},
	"z": {
		"cubies": cubies,
		"recolor": {
			"flu": "fru", "fru": "frd", "frd": "fld", "fld": "flu",
			"lfu": "ufr", "ufl": "rfu", "ufr": "rfd", "rfu": "dfr",
			"rfd": "dfl", "dfr": "lfd", "dfl": "lfu", "lfd": "ufl",
			"blu": "bru", "bru": "brd", "brd": "bld", "bld": "blu",
			"lbu": "ubr", "ubl": "rbu", "ubr": "rbd", "rbu": "dbr",
			"rbd": "dbl", "dbr": "lbd", "dbl": "lbu", "lbd": "ubl"
		}
	}
};

let rotation;
let rotType;
let rotBack;
let rotating = false;
let rotCubies = [];

function getCubie(cubieName) {
	return cube.getElementsByClassName(cubieName)[0];
}

function attachToPlane() {
	for (const node of rotCubies) {
		plane.appendChild(node);
	}
}

function detachToPlane() {
	for (const node of rotCubies) {
		cube.appendChild(node);
	}
}

function startRotation() {
	rotCubies = rotation.cubies.map(getCubie);
	rotating = true;
	attachToPlane();
	plane.className = "moving " + rotType + (rotBack ? "-back" : "");
}

function makeNewColoring() {
	const newColoring = { ...coloring };
	for (const side in rotation.recolor) {
		if (!rotBack) newColoring[rotation.recolor[side]] = coloring[side];
		else newColoring[side] = coloring[rotation.recolor[side]];
	}
	return newColoring;
}

function endRotation() {
	detachToPlane();
	plane.className = "";
	updateColoring(makeNewColoring());
	rotating = false;
	rotCubies = [];
}

export function rotate(move) {
	rotType = move[0];
	rotation = rotations[rotType];
	rotBack = (move[1] === "'");
	if (!rotating) startRotation();
}

/* initialization */

function getSideName(cubieName, sidePosition) {
	if (cubieName.indexOf(sidePosition) > -1) {
		const res = cubieName.replace(sidePosition, "");
		return sidePosition + res;
	}
}

function createSide(cubie, cubieName, sidePosition) {
	const sideName = getSideName(cubieName, sidePosition);
	const side = document.createElement("div");
	if (typeof sideName !== "undefined") side.className = sideName;
	side.classList.add("side");
	side.classList.add(sidePosition + "-plane");
	if (typeof sideName !== "undefined") {
		coloring[sideName] = sidePosition;
		side.classList.add(sidePosition + "-color");
	}
	side.innerHTML = "<div></div>";
	cubie.appendChild(side);
}

function createCubie(cubieName) {
	const cubie = document.createElement("div");
	cubie.className = cubieName + " cubie";
	for (const pos of sidesPositions) createSide(cubie, cubieName, pos);
	cube.appendChild(cubie);
}

function createPlane() {
	plane = document.createElement("div");
	plane.id = "plane";
	cube.appendChild(plane);
	plane.addEventListener("transitionend", endRotation, false);
	plane.addEventListener("webkitTransitionEnd", endRotation, false);
}

export function init() {
	container = document.getElementById("container");
	cube = document.createElement("div");
	cube.id = "cube";
	container.appendChild(cube);
	for (const name of cubies) createCubie(name);
	createPlane();
}

/* optional turning support */
let turning = false;
let curX;
let curY;
let deltaX = 0;
let deltaY = 0;

function mousedown(e) {
	turning = true;
	if (typeof curX !== "undefined") {
		deltaX = curX - e.pageX;
		deltaY = curY - e.pageY;
	}
}

function mouseup() {
	turning = false;
}

function mousemove(e) {
	if (turning) {
		curX = e.pageX;
		curY = e.pageY;
		const x = -(e.pageY - deltaY) * 0.7;
		const y = -(e.pageX - deltaX) * 0.7;
		turn(x, y);
	}
}

function turn(newX, newY) {
	cube.style.transform = "rotateX(" + newX + "deg) rotateY(" + newY + "deg)";
	cube.style.webkitTransform = "rotateX(" + newX + "deg) rotateY(" + newY + "deg)";
}