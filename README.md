# آلة حاسبة علمية | Scientific Calculator

A professional, modern, and realistic scientific calculator with an elegant UI built using semantic HTML, CSS, and vanilla JavaScript.

## Features

### Display
- Large, readable display showing current input and previous operation
- Real-time calculation feedback
- Support for decimal numbers

### Number Buttons
- Digits 0–9
- Decimal point support

### Basic Operations
- Addition (+)
- Subtraction (−)
- Multiplication (×)
- Division (÷)

### Scientific Functions
- **Trigonometric**: sin, cos, tan (in degrees)
- **Logarithmic**: log (base 10), ln (natural log)
- **Power/Root**: √ (square root), x² (square)
- **Constants**: π (pi)

### Utility Buttons
- **C**: Clear all
- **DEL**: Delete last character
- **=**: Calculate result

### Keyboard Support
- Numbers (0-9) and decimal point
- Operators (+, -, *, /)
- Enter or = for equals
- Backspace for delete
- Escape for clear

## Design Features

### Visual Design
- **Professional Logo**: Custom SVG calculator logo with gradient effects
- **Animated Background**: Dynamic multi-gradient background with pulse effects
- **Realistic Calculator**: White body with professional button styling and 3D effects
- **LED Display**: Dark display with neon green text and glow effects
- **Smooth Animations**: Logo floating, gradient shifts, and button ripple effects

### Color Scheme (Enhanced & Realistic)
- **Number Buttons**: Light gray (#f3f4f6) with subtle shadows
- **Operator Buttons**: Orange (#ff9500) - iOS calculator inspired
- **Scientific Functions**: Indigo (#4f46e5) with professional appearance
- **Utility Buttons**: Red (#dc2626) for clear and delete
- **Equals Button**: Green (#16a34a) spanning full width
- **Display**: Dark background with bright green (#00ff88) LED-style text

### Interactive Features
- 3D button press effects with realistic shadows
- Ripple animation on button click
- Hover effects with elevation changes
- Smooth transitions and cubic-bezier easing
- Touch-optimized for mobile devices

### Accessibility
- High contrast ratios for readability
- Large, touch-friendly button sizes
- Clear visual feedback for all interactions
- Responsive design for all screen sizes

## Usage

Simply open `index.html` in a web browser to use the calculator.

### File Structure
```
├── index.html      # Main HTML structure with logo and title
├── style.css       # Enhanced styling with animations and design tokens
├── main.js         # Calculator logic and event handlers
├── logo.svg        # Professional calculator logo
└── README.md       # Documentation (this file)
```

## Browser Compatibility

Works in all modern browsers that support:
- CSS Grid
- CSS Custom Properties (Variables)
- ES6 JavaScript

## Customization

All design tokens (colors, spacing, shadows, etc.) are defined as CSS variables in `style.css` under the `:root` selector. You can easily customize the appearance by modifying these values.

## Future Enhancements

The calculator structure is ready for additional features:
- More scientific functions (factorial, inverse trig functions, etc.)
- Memory functions (M+, M-, MR, MC)
- History of calculations
- Theme switching (light/dark mode)
- Advanced parentheses support
- Scientific notation