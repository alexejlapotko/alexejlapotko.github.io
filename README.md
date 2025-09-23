# 3D Rubik's Cube

A fully interactive 3D Rubik's Cube implementation built with pure JavaScript and CSS3 transforms. Experience the classic puzzle in your browser with smooth animations and intuitive controls.

![3D Rubik's Cube](https://img.shields.io/badge/3D-Rubik's%20Cube-brightgreen)
![JavaScript](https://img.shields.io/badge/JavaScript-ES5-yellow)
![CSS3](https://img.shields.io/badge/CSS3-Transforms-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **Full 3D Visualization**: Realistic 3D cube with proper perspective and depth
- **Interactive Controls**: Click buttons to rotate cube faces (F, L, U, X, Y, Z)
- **Smooth Animations**: CSS3-powered transitions for fluid rotations
- **Color-Coded Faces**: Traditional Rubik's cube color scheme
- **Responsive Design**: Works on desktop and mobile browsers
- **Pure Vanilla JS**: No external dependencies required


## 🛠️ Development

### Prerequisites
- Modern web browser with CSS3 transform support
- Node.js and pnpm (for development and building)

### Quick Start
```bash
# Install dependencies
pnpm install

# Build CSS (required for first run)
pnpm run build

# For development (watches CSS changes)
pnpm run dev
```

### CSS Build Process
This project uses PostCSS with Autoprefixer for modern CSS support:
- **Source**: `cube.css` (modern CSS with custom properties)
- **Output**: `dist/cube.css` (browser-compatible, minified)
- **Features**: Automatic vendor prefixing, CSS custom properties, responsive design

### Available Scripts
```bash
# Development
pnpm run dev          # Watch CSS changes and rebuild automatically
pnpm run css:build    # Build CSS once
pnpm run css:watch    # Watch CSS changes (same as dev)

# Production
pnpm run build        # Build all assets for production

# Code Quality
pnpm run lint         # Lint JavaScript code
pnpm run lint:fix     # Auto-fix linting issues
pnpm run lint:check   # Check ESLint configuration
```



## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


---

**Happy Cubing!** 🎲✨