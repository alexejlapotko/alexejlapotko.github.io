/**
 * CubeState - Manages the state and coloring of the Rubik's cube
 */
export class CubeState {
    constructor() {
        this.cubies = ["flu", "fld", "fru", "frd", "blu", "bld", "bru", "brd"];
        this.sidesPositions = ["f", "b", "l", "r", "u", "d"];
        this.coloring = {};
        this.initializeColoring();
    }

    /**
     * Initialize the default coloring for all sides
     */
    initializeColoring() {
        // This will be populated as sides are created
        this.coloring = {};
    }

    /**
     * Get a side element by name
     * @param {string} sideName - The name of the side
     * @returns {HTMLElement} The side element
     */
    getSide(sideName) {
        const cube = document.getElementById("cube");
        return cube?.getElementsByClassName(`${sideName} side`)[0];
    }

    /**
     * Update the color of a specific side
     * @param {string} sideName - The name of the side to update
     * @param {string} newColor - The new color to apply
     */
    updateColor(sideName, newColor) {
        const side = this.getSide(sideName);
        if (!side) return;

        // Remove old color class
        if (this.coloring[sideName]) {
            side.classList.remove(`${this.coloring[sideName]}-color`);
        }
        
        // Add new color class
        side.classList.add(`${newColor}-color`);
        this.coloring[sideName] = newColor;
    }

    /**
     * Update multiple colors at once
     * @param {Object} newColoring - Object mapping side names to colors
     */
    updateColoring(newColoring) {
        for (const side in newColoring) {
            if (this.coloring[side] !== newColoring[side]) {
                this.updateColor(side, newColoring[side]);
            }
        }
    }

    /**
     * Set the initial color for a side (used during cube creation)
     * @param {string} sideName - The name of the side
     * @param {string} color - The color to set
     */
    setInitialColor(sideName, color) {
        this.coloring[sideName] = color;
    }

    /**
     * Get the current coloring state
     * @returns {Object} Current coloring mapping
     */
    getCurrentColoring() {
        return { ...this.coloring };
    }

    /**
     * Deep clone an object
     * @param {Object} obj - Object to clone
     * @returns {Object} Cloned object
     */
    clone(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        const temp = obj.constructor();
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                temp[key] = this.clone(obj[key]);
            }
        }
        return temp;
    }
}