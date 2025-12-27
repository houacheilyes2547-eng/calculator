// ============================================
// DARK MODE LOGIC
// ============================================

/**
 * Smart Dark Mode Implementation
 * - Detects system preference using prefers-color-scheme
 * - Allows manual override with toggle button
 * - Saves user preference to localStorage
 * - Applies theme instantly on page load (no flash)
 */

// Initialize dark mode on page load
function initializeDarkMode() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply saved preference or follow system preference
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    } else {
        document.body.classList.remove('dark-mode');
        updateThemeIcon(false);
    }
}

// Toggle dark mode manually
function toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    updateThemeIcon(isDarkMode);
}

// Update theme toggle icon
function updateThemeIcon(isDarkMode) {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = isDarkMode ? '☀️' : '🌙';
    }
}

// Listen for system theme changes (only if no manual preference saved)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        if (e.matches) {
            document.body.classList.add('dark-mode');
            updateThemeIcon(true);
        } else {
            document.body.classList.remove('dark-mode');
            updateThemeIcon(false);
        }
    }
});

// Initialize dark mode as early as possible
initializeDarkMode();

// ============================================
// TAB NAVIGATION LOGIC
// ============================================

/**
 * Tab switching between Calculator and Unit Converter
 * - Preserves calculator state when switching tabs
 * - Updates active tab styling
 */

function initializeTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const calculatorSection = document.getElementById('calculatorSection');
    const converterSection = document.getElementById('converterSection');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            
            // Update active button state
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show/hide sections
            if (targetTab === 'calculator') {
                calculatorSection.classList.remove('hidden');
                converterSection.classList.add('hidden');
            } else if (targetTab === 'converter') {
                calculatorSection.classList.add('hidden');
                converterSection.classList.remove('hidden');
            }
        });
    });
}

// ============================================
// UNIT CONVERSION LOGIC
// ============================================

/**
 * Unit Conversion System
 * Supports: Length, Weight, Temperature, Time
 */

// Conversion formulas for all supported units
const conversionFormulas = {
    length: {
        meter: { meter: 1, kilometer: 0.001, centimeter: 100 },
        kilometer: { meter: 1000, kilometer: 1, centimeter: 100000 },
        centimeter: { meter: 0.01, kilometer: 0.00001, centimeter: 1 }
    },
    weight: {
        gram: { gram: 1, kilogram: 0.001 },
        kilogram: { gram: 1000, kilogram: 1 }
    },
    temperature: {
        // Temperature requires special formulas
        celsius: {
            celsius: (val) => val,
            fahrenheit: (val) => (val * 9/5) + 32
        },
        fahrenheit: {
            celsius: (val) => (val - 32) * 5/9,
            fahrenheit: (val) => val
        }
    },
    time: {
        second: { second: 1, minute: 1/60, hour: 1/3600 },
        minute: { second: 60, minute: 1, hour: 1/60 },
        hour: { second: 3600, minute: 60, hour: 1 }
    }
};

// Unit options for each category
const unitOptions = {
    length: [
        { value: 'meter', label: 'متر / Meter' },
        { value: 'kilometer', label: 'كيلومتر / Kilometer' },
        { value: 'centimeter', label: 'سنتيمتر / Centimeter' }
    ],
    weight: [
        { value: 'gram', label: 'جرام / Gram' },
        { value: 'kilogram', label: 'كيلوجرام / Kilogram' }
    ],
    temperature: [
        { value: 'celsius', label: 'مئوية / Celsius' },
        { value: 'fahrenheit', label: 'فهرنهايت / Fahrenheit' }
    ],
    time: [
        { value: 'second', label: 'ثانية / Second' },
        { value: 'minute', label: 'دقيقة / Minute' },
        { value: 'hour', label: 'ساعة / Hour' }
    ]
};

// Update unit dropdowns based on selected category
function updateUnitDropdowns(category) {
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');
    const options = unitOptions[category];
    
    // Clear existing options
    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';
    
    // Add new options
    options.forEach(option => {
        const fromOption = document.createElement('option');
        fromOption.value = option.value;
        fromOption.textContent = option.label;
        fromUnit.appendChild(fromOption);
        
        const toOption = document.createElement('option');
        toOption.value = option.value;
        toOption.textContent = option.label;
        toUnit.appendChild(toOption);
    });
    
    // Set default "to" unit to second option if available
    if (options.length > 1) {
        toUnit.selectedIndex = 1;
    }
}

// Perform unit conversion
function convertUnits() {
    const category = document.getElementById('category').value;
    const inputValue = parseFloat(document.getElementById('inputValue').value) || 0;
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const resultElement = document.getElementById('conversionResult');
    
    let result;
    
    // Special handling for temperature (uses functions)
    if (category === 'temperature') {
        const formula = conversionFormulas[category][fromUnit][toUnit];
        result = formula(inputValue);
    } else {
        // For other categories (uses multiplication factors)
        const formula = conversionFormulas[category][fromUnit][toUnit];
        result = inputValue * formula;
    }
    
    // Format result to avoid excessive decimal places
    if (Math.abs(result) < 0.0001 && result !== 0) {
        resultElement.textContent = result.toExponential(4);
    } else {
        resultElement.textContent = result.toFixed(6).replace(/\.?0+$/, '');
    }
}

// Clear converter inputs
function clearConverter() {
    document.getElementById('inputValue').value = '0';
    document.getElementById('conversionResult').textContent = '0';
}

// Initialize unit converter
function initializeConverter() {
    const categorySelect = document.getElementById('category');
    const inputValue = document.getElementById('inputValue');
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');
    const clearBtn = document.getElementById('clearConverter');
    
    // Initialize with default category
    updateUnitDropdowns(categorySelect.value);
    
    // Event listeners
    categorySelect.addEventListener('change', (e) => {
        updateUnitDropdowns(e.target.value);
        convertUnits();
    });
    
    inputValue.addEventListener('input', convertUnits);
    fromUnit.addEventListener('change', convertUnits);
    toUnit.addEventListener('change', convertUnits);
    clearBtn.addEventListener('click', clearConverter);
    
    // Perform initial conversion
    convertUnits();
}

// ============================================
// CALCULATOR LOGIC (ORIGINAL - UNCHANGED)
// ============================================

/**
 * Calculator class - handles all calculator operations
 * This logic remains unchanged from the original implementation
 */

class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        if (this.currentOperand === '0') return;
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') this.currentOperand = '0';
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand + ' ' + operation;
        this.currentOperand = '0';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '−':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    scientificFunction(func) {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        
        let result;
        switch (func) {
            case 'sin':
                result = Math.sin(current * Math.PI / 180);
                break;
            case 'cos':
                result = Math.cos(current * Math.PI / 180);
                break;
            case 'tan':
                result = Math.tan(current * Math.PI / 180);
                break;
            case 'log':
                result = Math.log10(current);
                break;
            case 'ln':
                result = Math.log(current);
                break;
            case 'sqrt':
                result = Math.sqrt(current);
                break;
            case 'power':
                result = Math.pow(current, 2);
                break;
            case 'pi':
                result = Math.PI;
                break;
            default:
                return;
        }
        this.currentOperand = result.toString();
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.currentOperand;
        this.previousOperandElement.innerText = this.previousOperand;
    }
}

// Initialize Calculator
const previousOperandElement = document.getElementById('previousOperand');
const currentOperandElement = document.getElementById('currentOperand');
const calculator = new Calculator(previousOperandElement, currentOperandElement);

// Number Buttons
document.querySelectorAll('[data-number]').forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.dataset.number);
        calculator.updateDisplay();
    });
});

// Operator Buttons
document.querySelectorAll('[data-operator]').forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.dataset.operator);
        calculator.updateDisplay();
    });
});

// Action Buttons
document.querySelectorAll('[data-action]').forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        
        if (action === 'clear') {
            calculator.clear();
        } else if (action === 'delete') {
            calculator.delete();
        } else if (action === 'equals') {
            calculator.compute();
        } else {
            calculator.scientificFunction(action);
        }
        
        calculator.updateDisplay();
    });
});

// Keyboard Support for Calculator
document.addEventListener('keydown', (e) => {
    // Only handle keyboard input when calculator tab is active
    const calculatorSection = document.getElementById('calculatorSection');
    if (calculatorSection.classList.contains('hidden')) return;
    
    if (e.key >= '0' && e.key <= '9' || e.key === '.') {
        calculator.appendNumber(e.key);
        calculator.updateDisplay();
    }
    
    if (e.key === 'Enter' || e.key === '=') {
        calculator.compute();
        calculator.updateDisplay();
    }
    
    if (e.key === 'Backspace') {
        calculator.delete();
        calculator.updateDisplay();
    }
    
    if (e.key === 'Escape') {
        calculator.clear();
        calculator.updateDisplay();
    }
    
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        const operatorMap = {
            '+': '+',
            '-': '−',
            '*': '×',
            '/': '÷'
        };
        calculator.chooseOperation(operatorMap[e.key]);
        calculator.updateDisplay();
    }
});

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize all features when DOM is ready
 * - Dark mode system
 * - Theme toggle button
 * - Tab navigation
 * - Unit converter
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme toggle button
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleDarkMode);
    }
    
    // Initialize tab navigation
    initializeTabNavigation();
    
    // Initialize unit converter
    initializeConverter();
});