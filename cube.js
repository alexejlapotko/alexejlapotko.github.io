var container = document.getElementById("container"),
	cube,
	plane;

var cubies = ["flu", "fld", "fru", "frd", "blu", "bld", "bru", "brd"];
var sidesPositions = ["f", "b", "l", "r", "u", "d"];
	
/* coloring */
	
var coloring = {};

function getSide(sideName) {
	return cube.getElementsByClassName(sideName + " side")[0];
}

function updateColor(sideName, newColor) {
	var side = getSide(sideName);
	side.classList.remove(coloring[sideName] + "-color");
	side.classList.add(newColor + "-color");
	coloring[sideName] = newColor;
}



function updateColoring(newColoring) {
	for (side in newColoring)
		if (coloring[side] != newColoring[side])
			updateColor(side, newColoring[side]);
}
	
/* rotation */

var rotations = {
	"f" : {
		"cubies" : ["flu", "fld", "fru", "frd"],
		"recolor": {
			"flu": "fru", "fru": "frd", "frd": "fld", "fld": "flu",
			"lfu": "ufr", "ufl": "rfu", "ufr": "rfd", "rfu": "dfr",
			"rfd": "dfl", "dfr": "lfd", "dfl": "lfu", "lfd": "ufl"
		}
	},
	"l": {
		"cubies" : ["flu", "fld", "blu", "bld"],
		"recolor": {
			"lbu": "lfu", "lfu": "lfd", "lfd": "lbd", "lbd": "lbu",
			"bld": "ubl", "blu": "ufl", "ubl": "flu", "ufl": "fld",
			"flu": "dfl", "fld": "dbl", "dfl": "bld", "dbl": "blu"
		}
	},
	"u": {
		"cubies" : ["flu", "fru", "blu", "bru"],
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
}

var rotation,
	rotType, rotBack,
	rotating = false,
	rotCubies = [];

function getCubie(cubieName) {
	return cube.getElementsByClassName(cubieName)[0];
}

function attachToPlane() {
	for (var index = 0; index < rotCubies.length; index++) {
		plane.appendChild(rotCubies[index]);
	}
}

function detachToPlane() {
	for (var index = 0; index < rotCubies.length; index++) {
		cube.appendChild(rotCubies[index]);
	}
}

function startRotation() {
	rotCubies = [];
	for (var index = 0; index < rotation.cubies.length; index++)
		rotCubies.push(getCubie(rotation.cubies[index]));

	rotating = true;
	
	attachToPlane();
	plane.className = "moving " + rotType + (rotBack ? "-back" : "");
}

function clone(obj) {
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = obj.constructor(); // changed

    for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
            temp[key] = clone(obj[key]);
        }
    }
    return temp;
}

function makeNewColoring() {
	var newColoring = clone(coloring);
	for (var side in rotation.recolor)
	if (!rotBack)
		newColoring[rotation.recolor[side]] = coloring[side];
	else newColoring[side] = coloring[rotation.recolor[side]];
	return newColoring;
}

function endRotation() {
	detachToPlane();
	plane.className = "";
	
	updateColoring(makeNewColoring());
	
	rotating = false;
	rotCubies = [];
}

function rotate(move) {	
	rotType = move[0];
	rotation = rotations[rotType];
	rotBack = (move[1] == "'");
	
	console.log("rotation " + move);
	if (!rotating) startRotation(move);
}

/* initialization */

function getSideName(cubieName, sidePosition) {
	if (cubieName.indexOf(sidePosition) > -1) {
		var res = cubieName.replace(sidePosition, "");
		return sidePosition + res;
	}
}

function createSide(cubie, cubieName, sidePosition) {
	var sideName = getSideName(cubieName, sidePosition);

	var side = document.createElement("div");
	
	if (typeof sideName !== "undefined")
		side.className = sideName;
	side.classList.add("side");
	side.classList.add(sidePosition + "-plane");
	if (typeof sideName !== "undefined") {
		coloring[sideName] = sidePosition;
		side.classList.add(sidePosition + "-color");
	}
	
	//side.innerHTML = "<div><span>" + sideName + "</span></div>";
	side.innerHTML = "<div></div>";
	
	cubie.appendChild(side);
}

function createCubie(cubieName) {
	var cubie = document.createElement("div");
	cubie.className = cubieName + " cubie";
	
	for (var index = 0; index < sidesPositions.length; index++)
		createSide(cubie, cubieName, sidesPositions[index]);

	cube.appendChild(cubie);
}

function createPlane() {
	plane = document.createElement("div");
	plane.id = "plane";
	
	cube.appendChild(plane);
	
	plane.addEventListener("webkitTransitionEnd", endRotation, false);
}

function init() {
	cube = document.createElement("div");
	cube.id = "cube";
	container.appendChild(cube);
	
	/*cube.addEventListener("mousedown", mousedown, false);
	cube.addEventListener("mouseup", mouseup, false);
	cube.addEventListener("mousemove", mousemove, false);
	
	var body = document.getElementsByTagName("body")[0];
	body.addEventListener("mouseup", mouseup, false);
	body.addEventListener("mousemove", mousemove, false);*/

	for (var index = 0; index < cubies.length; index++)
		createCubie(cubies[index]);

	createPlane();
}

init();

/* turning */

var turning = false,
	curX, curY,
	deltaX = 0, deltaY = 0;

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
		
		var x = -(e.pageY - deltaY) * 0.7,
			y = -(e.pageX - deltaX) * 0.7;
		turn(x, y);
	}
}

function turn(newX, newY) {
	cube.style.webkitTransform = "rotateX(" + newX + "deg) rotateY(" + newY + "deg)";
}