/**
 * Main application entry point
 */
import { RubiksCube } from './RubiksCube.js';

// Global cube instance
let cube = null;

/**
 * Initialize the application
 */
function initApp() {
    try {
        // Create the Rubik's cube
        cube = new RubiksCube('container');
        
        // Make cube available globally for debugging
        window.rubiksCube = cube;
        
        console.log('3D Rubik\'s Cube application started successfully');
    } catch (error) {
        console.error('Failed to initialize application:', error);
        
        // Show error message to user
        const container = document.getElementById('container');
        if (container) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #ff4444;">
                    <h2>Error Loading Cube</h2>
                    <p>Failed to initialize the 3D Rubik's Cube.</p>
                    <p>Please check the console for more details.</p>
                </div>
            `;
        }
    }
}

/**
 * Global function for backward compatibility with button clicks
 * @param {string} move - The move notation
 */
window.rotate = function(move) {
    if (cube) {
        cube.executeMove(move);
    } else {
        console.warn('Cube not initialized');
    }
};

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Export for potential external use
export { cube };