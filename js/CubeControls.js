/**
 * CubeControls - Handles user input and cube manipulation
 */
export class CubeControls {
    constructor(rotationEngine) {
        this.rotationEngine = rotationEngine;
        this.turning = false;
        this.curX = 0;
        this.curY = 0;
        this.deltaX = 0;
        this.deltaY = 0;
        this.cube = null;
        
        // Button configuration
        this.buttonNames = ["f", "l", "u", "x", "y", "z"];
    }

    /**
     * Initialize controls with cube element
     * @param {HTMLElement} cube - The cube element
     */
    initialize(cube) {
        this.cube = cube;
        this.setupMouseControls();
        this.createRotationButtons();
    }

    /**
     * Setup mouse controls for cube rotation
     */
    setupMouseControls() {
        if (!this.cube) return;

        // Mouse event handlers
        this.cube.addEventListener("mousedown", (e) => this.handleMouseDown(e), false);
        this.cube.addEventListener("mouseup", () => this.handleMouseUp(), false);
        this.cube.addEventListener("mousemove", (e) => this.handleMouseMove(e), false);

        // Body event handlers for mouse release outside cube
        document.body.addEventListener("mouseup", () => this.handleMouseUp(), false);
        document.body.addEventListener("mousemove", (e) => this.handleMouseMove(e), false);
    }

    /**
     * Handle mouse down event
     * @param {MouseEvent} e - The mouse event
     */
    handleMouseDown(e) {
        this.turning = true;
        if (this.curX !== undefined) {
            this.deltaX = this.curX - e.pageX;
            this.deltaY = this.curY - e.pageY;
        }
    }

    /**
     * Handle mouse up event
     */
    handleMouseUp() {
        this.turning = false;
    }

    /**
     * Handle mouse move event
     * @param {MouseEvent} e - The mouse event
     */
    handleMouseMove(e) {
        if (this.turning) {
            this.curX = e.pageX;
            this.curY = e.pageY;

            const x = -(e.pageY - this.deltaY) * 0.7;
            const y = -(e.pageX - this.deltaX) * 0.7;
            this.turnCube(x, y);
        }
    }

    /**
     * Turn the cube to specified angles
     * @param {number} newX - X rotation angle
     * @param {number} newY - Y rotation angle
     */
    turnCube(newX, newY) {
        if (!this.cube) return;
        this.cube.style.transform = `rotateX(${newX}deg) rotateY(${newY}deg)`;
    }

    /**
     * Create rotation buttons
     */
    createRotationButtons() {
        const butCont = document.getElementById("but_cont");
        const butContBack = document.getElementById("but_cont_back");

        if (!butCont || !butContBack) return;

        for (const buttonName of this.buttonNames) {
            this.createRotateButton(buttonName, false, butCont);
            this.createRotateButton(buttonName, true, butContBack);
        }
    }

    /**
     * Create a single rotation button
     * @param {string} rotName - The rotation name
     * @param {boolean} reverse - Whether this is a reverse rotation
     * @param {HTMLElement} container - The container for the button
     */
    createRotateButton(rotName, reverse, container) {
        const button = document.createElement("div");
        button.id = `${rotName}${reverse ? "-back" : ""}_rotate`;
        button.className = "rotate_button";

        // Set button text
        let title = rotName.toUpperCase();
        if (reverse) title += "'";
        button.innerHTML = title;

        // Add click event listener
        button.addEventListener("click", () => {
            const move = rotName + (reverse ? "'" : "");
            this.rotationEngine.rotate(move);
        }, false);

        container.appendChild(button);
    }

    /**
     * Execute a rotation programmatically
     * @param {string} move - The move notation
     */
    executeMove(move) {
        this.rotationEngine.rotate(move);
    }

    /**
     * Check if the cube is currently being manipulated
     * @returns {boolean} True if turning or rotating
     */
    isBusy() {
        return this.turning || this.rotationEngine.isRotating();
    }
}