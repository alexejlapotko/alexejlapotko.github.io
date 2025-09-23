/**
 * RubiksCube - Main class that orchestrates all cube components
 */
import { CubeState } from './CubeState.js';
import { RotationEngine } from './RotationEngine.js';
import { CubeRenderer } from './CubeRenderer.js';
import { CubeControls } from './CubeControls.js';

export class RubiksCube {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            throw new Error(`Container with id "${containerId}" not found`);
        }

        // Initialize components
        this.cubeState = new CubeState();
        this.rotationEngine = new RotationEngine(this.cubeState);
        this.renderer = new CubeRenderer(this.cubeState);
        this.controls = new CubeControls(this.rotationEngine);

        this.initialize();
    }

    /**
     * Initialize the Rubik's cube
     */
    initialize() {
        try {
            // Render the cube
            this.renderer.initialize(this.container);

            // Setup rotation engine with the plane
            const plane = this.renderer.getPlane();
            this.rotationEngine.setPlane(plane);

            // Setup controls
            const cube = this.renderer.getCube();
            this.controls.initialize(cube);

            console.log("Rubik's Cube initialized successfully");
        } catch (error) {
            console.error("Failed to initialize Rubik's Cube:", error);
            throw error;
        }
    }

    /**
     * Execute a move on the cube
     * @param {string} move - The move notation (e.g., "f", "f'", "u", "x")
     */
    executeMove(move) {
        this.controls.executeMove(move);
    }

    /**
     * Execute a sequence of moves
     * @param {string[]} moves - Array of move notations
     * @param {number} delay - Delay between moves in milliseconds
     */
    async executeMoveSequence(moves, delay = 300) {
        for (const move of moves) {
            if (this.controls.isBusy()) {
                // Wait for current operation to complete
                await this.waitForIdle();
            }
            this.executeMove(move);
            if (delay > 0) {
                await this.sleep(delay);
            }
        }
    }

    /**
     * Wait for the cube to be idle (not rotating or turning)
     * @returns {Promise} Promise that resolves when cube is idle
     */
    waitForIdle() {
        return new Promise((resolve) => {
            const checkIdle = () => {
                if (!this.controls.isBusy()) {
                    resolve();
                } else {
                    setTimeout(checkIdle, 50);
                }
            };
            checkIdle();
        });
    }

    /**
     * Sleep for specified milliseconds
     * @param {number} ms - Milliseconds to sleep
     * @returns {Promise} Promise that resolves after delay
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Get the current state of the cube
     * @returns {Object} Current cube state
     */
    getState() {
        return {
            coloring: this.cubeState.getCurrentColoring(),
            isRotating: this.rotationEngine.isRotating(),
            isTurning: this.controls.turning
        };
    }

    /**
     * Reset the cube to solved state
     */
    reset() {
        // This would require implementing a reset mechanism
        // For now, we'll just log that it's not implemented
        console.log("Reset functionality not yet implemented");
    }

    /**
     * Destroy the cube and clean up resources
     */
    destroy() {
        // Clean up event listeners and DOM elements
        if (this.container) {
            this.container.innerHTML = '';
        }
        console.log("Rubik's Cube destroyed");
    }
}