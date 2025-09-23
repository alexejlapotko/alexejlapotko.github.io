/**
 * CubeRenderer - Handles the 3D rendering and DOM creation of the cube
 */
export class CubeRenderer {
    constructor(cubeState) {
        this.cubeState = cubeState;
        this.container = null;
        this.cube = null;
        this.plane = null;
    }

    /**
     * Initialize the cube renderer with a container element
     * @param {HTMLElement} container - The container element
     */
    initialize(container) {
        this.container = container;
        this.createCube();
        this.createAllCubies();
        this.createPlane();
    }

    /**
     * Create the main cube element
     */
    createCube() {
        this.cube = document.createElement("div");
        this.cube.id = "cube";
        this.container.appendChild(this.cube);
    }

    /**
     * Create a side element for a cubie
     * @param {HTMLElement} cubie - The cubie element
     * @param {string} cubieName - The name of the cubie
     * @param {string} sidePosition - The position of the side (f, b, l, r, u, d)
     */
    createSide(cubie, cubieName, sidePosition) {
        const sideName = this.getSideName(cubieName, sidePosition);
        const side = document.createElement("div");

        if (sideName) {
            side.className = sideName;
            // Set initial coloring
            this.cubeState.setInitialColor(sideName, sidePosition);
            side.classList.add(`${sidePosition}-color`);
        }

        side.classList.add("side");
        side.classList.add(`${sidePosition}-plane`);

        // Create inner div for styling
        const innerDiv = document.createElement("div");
        side.appendChild(innerDiv);

        cubie.appendChild(side);
    }

    /**
     * Get the side name based on cubie name and side position
     * @param {string} cubieName - The name of the cubie
     * @param {string} sidePosition - The position of the side
     * @returns {string|undefined} The side name or undefined if not applicable
     */
    getSideName(cubieName, sidePosition) {
        if (cubieName.includes(sidePosition)) {
            const res = cubieName.replace(sidePosition, "");
            return sidePosition + res;
        }
        return undefined;
    }

    /**
     * Create a single cubie element
     * @param {string} cubieName - The name of the cubie
     */
    createCubie(cubieName) {
        const cubie = document.createElement("div");
        cubie.className = `${cubieName} cubie`;

        // Create all six sides for the cubie
        for (const sidePosition of this.cubeState.sidesPositions) {
            this.createSide(cubie, cubieName, sidePosition);
        }

        this.cube.appendChild(cubie);
    }

    /**
     * Create all cubies for the cube
     */
    createAllCubies() {
        for (const cubieName of this.cubeState.cubies) {
            this.createCubie(cubieName);
        }
    }

    /**
     * Create the rotation plane element
     */
    createPlane() {
        this.plane = document.createElement("div");
        this.plane.id = "plane";
        this.cube.appendChild(this.plane);
    }

    /**
     * Get the plane element
     * @returns {HTMLElement} The plane element
     */
    getPlane() {
        return this.plane;
    }

    /**
     * Get the cube element
     * @returns {HTMLElement} The cube element
     */
    getCube() {
        return this.cube;
    }
}