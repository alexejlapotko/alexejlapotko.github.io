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

## 🎮 Controls

The cube supports standard Rubik's cube notation:

### Face Rotations
- **F** - Front face clockwise
- **F'** - Front face counter-clockwise
- **L** - Left face clockwise  
- **L'** - Left face counter-clockwise
- **U** - Up face clockwise
- **U'** - Up face counter-clockwise

### Cube Rotations
- **X** - Rotate entire cube around X-axis
- **X'** - Rotate entire cube around X-axis (reverse)
- **Y** - Rotate entire cube around Y-axis
- **Y'** - Rotate entire cube around Y-axis (reverse)
- **Z** - Rotate entire cube around Z-axis
- **Z'** - Rotate entire cube around Z-axis (reverse)

## 🚀 Quick Start

### Option 1: Direct Download
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start solving the cube!

### Option 2: Local Development
```bash
# Clone the repository
git clone <your-repo-url>
cd rubiks-cube-3d

# Install development dependencies (optional)
pnpm install

# Open in browser
open index.html
```

### Option 3: Live Demo
Visit the [GitHub Pages deployment](https://your-username.github.io/your-repo-name) to try it online.

## 📁 Project Structure

```
rubiks-cube-3d/
├── index.html          # Main HTML file with cube interface
├── cube.js             # Core cube logic and rotation algorithms
├── cube.css            # 3D styling and animations
├── package.json        # Project metadata and scripts
├── DEPLOYMENT.md       # GitHub Pages deployment guide
└── README.md           # This file
```

## 🛠️ Development

### Prerequisites
- Modern web browser with CSS3 transform support
- Node.js and pnpm (for linting, optional)

### Available Scripts
```bash
# Lint JavaScript code
pnpm run lint

# Auto-fix linting issues
pnpm run lint:fix

# Check ESLint configuration
pnpm run lint:check
```

### Browser Compatibility
- ✅ Chrome 12+
- ✅ Firefox 16+
- ✅ Safari 9+
- ✅ Edge 12+

## 🎨 Customization

### Colors
The cube uses CSS classes for coloring. Modify the color scheme in `cube.css`:
```css
.red-color { background-color: #ff0000; }
.green-color { background-color: #00ff00; }
.blue-color { background-color: #0000ff; }
/* ... etc */
```

### Cube Size
Adjust the cube dimensions in `cube.css`:
```css
#cube {
    width: 200px;  /* Change cube size */
    height: 200px;
}

#cube .cubie {
    width: 100px;  /* Adjust individual cubie size */
    height: 100px;
}
```

### Animation Speed
Modify transition timing in `cube.css`:
```css
.cubie {
    transition: transform 0.5s ease-in-out; /* Adjust duration */
}
```

## 🏗️ Architecture

### Core Components

1. **Cube Structure** (`cube.js`)
   - 8 corner pieces (cubies) with proper positioning
   - Face definitions and color mapping
   - Rotation algorithms for each move

2. **3D Rendering** (`cube.css`)
   - CSS3 transforms for 3D positioning
   - Perspective and transform-style preservation
   - Smooth transition animations

3. **User Interface** (`index.html`)
   - Control buttons for each rotation
   - Event handling for user interactions
   - Dynamic button generation

### Rotation Algorithm
The cube uses a sophisticated rotation system:
- Each move affects specific cubies and their orientations
- Color recoloring ensures visual consistency
- Smooth CSS transitions provide fluid animations

## 🤝 Contributing

Contributions are welcome! Here are some ways you can help:

1. **Bug Reports**: Found an issue? Open a GitHub issue
2. **Feature Requests**: Have an idea? Let's discuss it
3. **Code Contributions**: Submit a pull request
4. **Documentation**: Help improve the docs

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the classic Rubik's Cube puzzle invented by Ernő Rubik
- Built with modern web technologies for educational purposes
- Thanks to the web development community for CSS3 transform techniques

## 📞 Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/your-username/your-repo-name/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/your-username/your-repo-name/discussions)
- 📧 **Contact**: [Your Email](mailto:your-email@example.com)

---

**Happy Cubing!** 🎲✨