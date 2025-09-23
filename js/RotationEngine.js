/**
 * RotationEngine - Handles all cube rotation logic and animations
 */
export class RotationEngine {
    constructor(cubeState) {
        this.cubeState = cubeState;
        this.rotating = false;
        this.rotCubies = [];
        this.rotation = null;
        this.rotType = null;
        this.rotBack = false;
        this.plane = null;

        this.rotations = {
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
                "cubies": this.cubeState?.cubies || ["flu", "fld", "fru", "frd", "blu", "bld", "bru", "brd"],
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
                "cubies": this.cubeState?.cubies || ["flu", "fld", "fru", "frd", "blu", "bld", "bru", "brd"],
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
                "cubies": this.cubeState?.cubies || ["flu", "fld", "fru", "frd", "blu", "bld", "bru", "brd"],
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
    }

    /**
     * Set the rotation plane element
     * @param {HTMLElement} plane - The plane element for rotations
     */
    setPlane(plane) {
        this.plane = plane;
        // Add transition end event listener
        this.plane.addEventListener("transitionend", () => this.endRotation(), false);
        // Also support webkit for older browsers
        this.plane.addEventListener("webkitTransitionEnd", () => this.endRotation(), false);
    }

    /**
     * Get a cubie element by name
     * @param {string} cubieName - The name of the cubie
     * @returns {HTMLElement} The cubie element
     */
    getCubie(cubieName) {
        const cube = document.getElementById("cube");
        return cube?.getElementsByClassName(cubieName)[0];
    }

    /**
     * Attach cubies to the rotation plane
     */
    attachToPlane() {
        if (!this.plane) return;
        
        for (const cubie of this.rotCubies) {
            this.plane.appendChild(cubie);
        }
    }

    /**
     * Detach cubies from the rotation plane back to the cube
     */
    detachFromPlane() {
        const cube = document.getElementById("cube");
        if (!cube) return;

        for (const cubie of this.rotCubies) {
            cube.appendChild(cubie);
        }
    }

    /**
     * Start a rotation animation
     */
    startRotation() {
        if (this.rotating) return;

        this.rotCubies = [];
        for (const cubieName of this.rotation.cubies) {
            const cubie = this.getCubie(cubieName);
            if (cubie) {
                this.rotCubies.push(cubie);
            }
        }

        this.rotating = true;
        this.attachToPlane();
        
        if (this.plane) {
            this.plane.className = `moving ${this.rotType}${this.rotBack ? "-back" : ""}`;
        }
    }

    /**
     * Calculate new coloring after rotation
     * @returns {Object} New coloring mapping
     */
    makeNewColoring() {
        const newColoring = this.cubeState.clone(this.cubeState.getCurrentColoring());
        
        for (const side in this.rotation.recolor) {
            if (!this.rotBack) {
                newColoring[this.rotation.recolor[side]] = this.cubeState.coloring[side];
            } else {
                newColoring[side] = this.cubeState.coloring[this.rotation.recolor[side]];
            }
        }
        
        return newColoring;
    }

    /**
     * End the rotation animation and update colors
     */
    endRotation() {
        if (!this.rotating) return;

        this.detachFromPlane();
        
        if (this.plane) {
            this.plane.className = "";
        }

        this.cubeState.updateColoring(this.makeNewColoring());

        this.rotating = false;
        this.rotCubies = [];
    }

    /**
     * Execute a rotation move
     * @param {string} move - The move notation (e.g., "f", "f'", "u", "x")
     */
    rotate(move) {
        if (this.rotating) return;

        this.rotType = move[0];
        this.rotation = this.rotations[this.rotType];
        this.rotBack = (move[1] === "'");

        if (!this.rotation) {
            console.warn(`Unknown rotation: ${move}`);
            return;
        }

        console.log(`Executing rotation: ${move}`);
        this.startRotation();
    }

    /**
     * Check if currently rotating
     * @returns {boolean} True if rotation is in progress
     */
    isRotating() {
        return this.rotating;
    }
}