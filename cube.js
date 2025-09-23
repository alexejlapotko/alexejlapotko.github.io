const container = document.getElementById("container");
let cube, plane;

const cubies = ["flu", "fld", "fru", "frd", "blu", "bld", "bru", "brd"];
const sidesPositions = ["f", "b", "l", "r", "u", "d"];
	
/* coloring */
	
const coloring = {};

const getSide = (sideName) => {
	return cube.getElementsByClassName(`${sideName} side`)[0];
};

const updateColor = (sideName, newColor) => {
	const side = getSide(sideName);
	side.classList.remove(`${coloring[sideName]}-color`);
	side.classList.add(`${newColor}-color`);
	coloring[sideName] = newColor;
};



const updateColoring = (newColoring) => {
	for (const side in newColoring) {
		if (coloring[side] !== newColoring[side]) {
			updateColor(side, newColoring[side]);
		}
	}
};
	
/* rotation */

const rotations = {
	"f" : {
		cubies: ["flu", "fld", "fru", "frd"],
		recolor: {
			"flu": "fru", "fru": "frd", "frd": "fld", "fld": "flu",
			"lfu": "ufr", "ufl": "rfu", "ufr": "rfd", "rfu": "dfr",
			"rfd": "dfl", "dfr": "lfd", "dfl": "lfu", "lfd": "ufl"
		}
	},
	"l": {
		cubies: ["flu", "fld", "blu", "bld"],
		recolor: {
			"lbu": "lfu", "lfu": "lfd", "lfd": "lbd", "lbd": "lbu",
			"bld": "ubl", "blu": "ufl", "ubl": "flu", "ufl": "fld",
			"flu": "dfl", "fld": "dbl", "dfl": "bld", "dbl": "blu"
		}
	},
	"u": {
		cubies: ["flu", "fru", "blu", "bru"],
		recolor: {
			"ubl": "ubr", "ubr": "ufr", "ufr": "ufl", "ufl": "ubl",
			"rbu": "fru", "rfu": "flu", "fru": "lfu", "flu": "lbu",
			"lfu": "blu", "lbu": "bru", "blu": "rbu", "bru": "rfu"
		}	
	},
	"x": {
		cubies,
		recolor: {
			"lbu": "lfu", "lfu": "lfd", "lfd": "lbd", "lbd": "lbu",
			"bld": "ubl", "blu": "ufl", "ubl": "flu", "ufl": "fld",
			"flu": "dfl", "fld": "dbl", "dfl": "bld", "dbl": "blu",
			"rbu": "rfu", "rfu": "rfd", "rfd": "rbd", "rbd": "rbu",
			"brd": "ubr", "bru": "ufr", "ubr": "fru", "ufr": "frd",
			"fru": "dfr", "frd": "dbr", "dfr": "brd", "dbr": "bru"
		}
	},
	"y": {
		cubies,
		recolor: {
			"ubl": "ubr", "ubr": "ufr", "ufr": "ufl", "ufl": "ubl",
			"rbu": "fru", "rfu": "flu", "fru": "lfu", "flu": "lbu",
			"lfu": "blu", "lbu": "bru", "blu": "rbu", "bru": "rfu",
			"dbl": "dbr", "dbr": "dfr", "dfr": "dfl", "dfl": "dbl",
			"rbd": "frd", "rfd": "fld", "frd": "lfd", "fld": "lbd",
			"lfd": "bld", "lbd": "brd", "bld": "rbd", "brd": "rfd"
		}
	},
	"z": {
		cubies,
		recolor: {
			"flu": "fru", "fru": "frd", "frd": "fld", "fld": "flu",
			"lfu": "ufr", "ufl": "rfu", "ufr": "rfd", "rfu": "dfr",
			"rfd": "dfl", "dfr": "lfd", "dfl": "lfu", "lfd": "ufl",
			"blu": "bru", "bru": "brd", "brd": "bld", "bld": "blu",
			"lbu": "ubr", "ubl": "rbu", "ubr": "rbd", "rbu": "dbr",
			"rbd": "dbl", "dbr": "lbd", "dbl": "lbu", "lbd": "ubl"
		}
	}
}

let rotation, rotType, rotBack;
let rotating = false;
let rotCubies = [];

const getCubie = (cubieName) => {
	return cube.getElementsByClassName(cubieName)[0];
};

const attachToPlane = () => {
	for (let index = 0; index < rotCubies.length; index++) {
		plane.appendChild(rotCubies[index]);
	}
};

const detachToPlane = () => {
	for (let index = 0; index < rotCubies.length; index++) {
		cube.appendChild(rotCubies[index]);
	}
};

const startRotation = () => {
	rotCubies = [];
	for (let index = 0; index < rotation.cubies.length; index++) {
		rotCubies.push(getCubie(rotation.cubies[index]));
	}

	rotating = true;
	
	attachToPlane();
	plane.className = `moving ${rotType}${rotBack ? "-back" : ""}`;
};

const clone = (obj) => {
    if(obj == null || typeof(obj) !== 'object')
        return obj;

    const temp = obj.constructor(); // changed

    for(const key in obj) {
        if(obj.hasOwnProperty(key)) {
            temp[key] = clone(obj[key]);
        }
    }
    return temp;
};

const makeNewColoring = () => {
	const newColoring = clone(coloring);
	for (const side in rotation.recolor) {
		if (!rotBack) {
			newColoring[rotation.recolor[side]] = coloring[side];
		} else {
			newColoring[side] = coloring[rotation.recolor[side]];
		}
	}
	return newColoring;
};

const endRotation = () => {
	detachToPlane();
	plane.className = "";
	
	updateColoring(makeNewColoring());
	
	rotating = false;
	rotCubies = [];
};

const rotate = (move) => {	
	[rotType] = move;
	rotation = rotations[rotType];
	rotBack = (move[1] === "'");
	
	console.log(`rotation ${move}`);
	if (!rotating) startRotation(move);
};

/* initialization */

const getSideName = (cubieName, sidePosition) => {
	if (cubieName.indexOf(sidePosition) > -1) {
		const res = cubieName.replace(sidePosition, "");
		return sidePosition + res;
	}
};

const createSide = (cubie, cubieName, sidePosition) => {
	const sideName = getSideName(cubieName, sidePosition);

	const side = document.createElement("div");
	
	if (typeof sideName !== "undefined")
		side.className = sideName;
	side.classList.add("side");
	side.classList.add(`${sidePosition}-plane`);
	if (typeof sideName !== "undefined") {
		coloring[sideName] = sidePosition;
		side.classList.add(`${sidePosition}-color`);
	}
	
	//side.innerHTML = `<div><span>${sideName}</span></div>`;
	side.innerHTML = "<div></div>";
	
	cubie.appendChild(side);
};

const createCubie = (cubieName) => {
	const cubie = document.createElement("div");
	cubie.className = `${cubieName} cubie`;
	
	for (let index = 0; index < sidesPositions.length; index++) {
		createSide(cubie, cubieName, sidesPositions[index]);
	}

	cube.appendChild(cubie);
};

const createPlane = () => {
	plane = document.createElement("div");
	plane.id = "plane";
	
	cube.appendChild(plane);
	
	plane.addEventListener("webkitTransitionEnd", endRotation, false);
};

const init = () => {
	cube = document.createElement("div");
	cube.id = "cube";
	container.appendChild(cube);
	
	/*cube.addEventListener("mousedown", mousedown, false);
	cube.addEventListener("mouseup", mouseup, false);
	cube.addEventListener("mousemove", mousemove, false);
	
	const body = document.getElementsByTagName("body")[0];
	body.addEventListener("mouseup", mouseup, false);
	body.addEventListener("mousemove", mousemove, false);*/

	for (let index = 0; index < cubies.length; index++) {
		createCubie(cubies[index]);
	}

	createPlane();
};

// Export functions for module usage
export { rotate, init };

// Initialize the cube when module is loaded
init();

/* turning */

// Mouse interaction variables (currently unused)
// let turning = false;
// let curX, curY;
// let deltaX = 0, deltaY = 0;

// Mouse interaction functions (currently unused)
// const mousedown = (e) => {
// 	turning = true;
// 	if (typeof curX !== "undefined") {
// 		deltaX = curX - e.pageX;
// 		deltaY = curY - e.pageY;
// 	}
// };

// const mouseup = () => {
// 	turning = false;
// };
		
// const mousemove = (e) => {
// 	if (turning) {
// 		curX = e.pageX;
// 		curY = e.pageY;
// 		
// 		const x = -(e.pageY - deltaY) * 0.7;
// 		const y = -(e.pageX - deltaX) * 0.7;
// 		turn(x, y);
// 	}
// };

// Mouse turning function (currently unused)
// const turn = (newX, newY) => {
// 	cube.style.webkitTransform = `rotateX(${newX}deg) rotateY(${newY}deg)`;
// };