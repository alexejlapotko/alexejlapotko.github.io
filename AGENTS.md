# AGENTS.md

## Environment Setup

### Prerequisites
- Node.js (for development tools)
- pnpm package manager

### Installation
```bash
pnpm install
```

## Code Quality & Testing

### Linting
```bash
# Check code quality
pnpm run lint

# Auto-fix linting issues
pnpm run lint:fix

# Check ESLint configuration
pnpm run lint:check
```

### Manual Testing
1. Open `index.html` in a web browser
2. Test all rotation buttons (F, F', L, L', U, U', X, X', Y, Y', Z, Z')
3. Verify smooth animations and proper cube rotations
4. Check color consistency after multiple moves
5. Test on different browsers (Chrome, Firefox, Safari, Edge)

### Browser Testing
- Test in multiple browsers for CSS3 transform compatibility
- Verify animations work smoothly
- Check responsive behavior on different screen sizes
- Test touch interactions on mobile devices

### Performance Checks
- Monitor animation smoothness during rotations
- Check for memory leaks during extended use
- Verify CSS3 transforms perform well across devices