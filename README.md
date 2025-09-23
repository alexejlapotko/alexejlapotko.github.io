# 3D Rubik's Cube - ES6+ Version

A modern 3D Rubik's Cube implementation using ES6+ JavaScript features.

## ES6+ Features Used

### Modern JavaScript Syntax
- **const/let**: Replaced all `var` declarations with `const` for immutable values and `let` for mutable variables
- **Arrow Functions**: Converted function declarations to arrow functions for cleaner syntax
- **Template Literals**: Used template literals (backticks) for string interpolation instead of concatenation
- **Enhanced Object Literals**: Used shorthand property names where applicable
- **Strict Equality**: Used `===` and `!==` instead of `==` and `!=`

### ES6 Modules
- **Export/Import**: The main cube functionality is exported as ES6 modules
- **Module Type**: HTML uses `type="module"` for script tags
- **Import Statements**: Button functionality imports the `rotate` function from the cube module

### Modern Development Setup
- **package.json**: Configured with `"type": "module"` for ES6 module support
- **ESLint**: Configured to enforce ES6+ standards and best practices
- **Development Scripts**: Added npm scripts for development server, linting, and formatting

## Running the Project

### Development Server
```bash
npm start
# or
npm run dev
```

### Code Quality
```bash
# Lint the code
npm run lint

# Format the code
npm run format
```

## Browser Compatibility

This project uses ES6+ features and requires a modern browser that supports:
- ES6 Modules
- Arrow functions
- Template literals
- const/let declarations
- Modern CSS3 transforms

## File Structure

- `cube.js` - Main cube logic with ES6+ syntax and module exports
- `index.html` - HTML with ES6 module imports
- `cube.css` - Styling (unchanged)
- `package.json` - Modern JavaScript project configuration
- `.eslintrc.json` - ESLint configuration for ES6+ standards