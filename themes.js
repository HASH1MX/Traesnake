// Snake Game Themes

// Theme definitions with color schemes
const themes = {
    default: {
        name: 'Default',
        // Background colors
        bodyBackground: 'linear-gradient(135deg, #e8f5e9, #c8e6c9, #a5d6a7)',
        textColor: '#2e7d32',
        headingColor: '#2e7d32',
        
        // Game container
        gameContainerBackground: 'linear-gradient(135deg, #2e7d32, #66bb6a, #2e7d32)',
        
        // Canvas and border
        canvasBorder: 'linear-gradient(45deg, #2e7d32, #66bb6a, #2e7d32)',
        canvasBackground: 'rgba(255, 255, 255, 0.9)',
        canvasShadow: 'rgba(46, 125, 50, 0.7)',
        canvasShadowInner: 'rgba(46, 125, 50, 0.3)',
        canvasShadowGlow: 'rgba(46, 125, 50, 0.9)',
        canvasShadowInnerGlow: 'rgba(46, 125, 50, 0.5)',
        
        // Score container
        scoreBackground: 'rgba(129, 199, 132, 0.3)',
        scoreColor: '#2e7d32',
        
        // Controls
        controlBackground: 'linear-gradient(145deg, #81c784, #66bb6a)',
        controlHoverBackground: 'linear-gradient(145deg, #66bb6a, #81c784)',
        controlActiveBackground: 'linear-gradient(145deg, #4caf50, #66bb6a)',
        controlColor: 'white',
        
        // Buttons
        buttonBackground: 'linear-gradient(145deg, #66bb6a, #4caf50)',
        buttonHoverBackground: 'linear-gradient(145deg, #4caf50, #66bb6a)',
        buttonColor: 'white',
        
        // Game elements
        snakeHeadColor: '#388e3c',
        snakeBodyColor: '#66bb6a',
        foodColor: '#f44336',
        obstacleColor: '#795548',
        gridLineColor: 'rgba(46, 125, 50, 0.2)',
        
        // Game over screen
        gameOverBackground: 'linear-gradient(145deg, rgba(200, 230, 201, 0.95), rgba(165, 214, 167, 0.95))',
        gameOverColor: '#2e7d32',
        
        // Theme switcher
        themeSwitcherBackground: 'rgba(129, 199, 132, 0.3)',
        themeSwitcherColor: '#2e7d32'
    },
    
    cottonCandy: {
        name: 'Cotton Candy',
        // Background colors
        bodyBackground: 'linear-gradient(135deg, #f8bbd0, #e1bee7, #bbdefb)',
        textColor: '#ad1457',
        headingColor: '#ad1457',
        
        // Game container
        gameContainerBackground: 'linear-gradient(135deg, #ec407a, #f48fb1, #ec407a)',
        
        // Canvas and border
        canvasBorder: 'linear-gradient(45deg, #ec407a, #f48fb1, #ec407a)',
        canvasBackground: 'rgba(255, 255, 255, 0.9)',
        canvasShadow: 'rgba(236, 64, 122, 0.7)',
        canvasShadowInner: 'rgba(236, 64, 122, 0.3)',
        canvasShadowGlow: 'rgba(236, 64, 122, 0.9)',
        canvasShadowInnerGlow: 'rgba(236, 64, 122, 0.5)',
        
        // Score container
        scoreBackground: 'rgba(244, 143, 177, 0.3)',
        scoreColor: '#ad1457',
        
        // Controls
        controlBackground: 'linear-gradient(145deg, #f48fb1, #f06292)',
        controlHoverBackground: 'linear-gradient(145deg, #f06292, #f48fb1)',
        controlActiveBackground: 'linear-gradient(145deg, #ec407a, #f06292)',
        controlColor: 'white',
        
        // Buttons
        buttonBackground: 'linear-gradient(145deg, #f06292, #ec407a)',
        buttonHoverBackground: 'linear-gradient(145deg, #ec407a, #f06292)',
        buttonColor: 'white',
        
        // Game elements
        snakeHeadColor: '#c2185b',
        snakeBodyColor: '#f06292',
        foodColor: '#8e24aa',
        obstacleColor: '#ce93d8',
        gridLineColor: 'rgba(236, 64, 122, 0.2)',
        
        // Game over screen
        gameOverBackground: 'linear-gradient(145deg, rgba(248, 187, 208, 0.95), rgba(244, 143, 177, 0.95))',
        gameOverColor: '#ad1457',
        
        // Theme switcher
        themeSwitcherBackground: 'rgba(244, 143, 177, 0.3)',
        themeSwitcherColor: '#ad1457'
    },
    
    cyberpunk: {
        name: 'Cyberpunk',
        // Background colors
        bodyBackground: 'linear-gradient(135deg, #000000, #1a1a2e, #16213e)',
        textColor: '#00ffff',
        headingColor: '#ff00ff',
        
        // Game container
        gameContainerBackground: 'linear-gradient(135deg, #0d0d2b, #16213e, #0d0d2b)',
        
        // Canvas and border
        canvasBorder: 'linear-gradient(45deg, #ff00ff, #00ffff, #ff00ff)',
        canvasBackground: 'rgba(26, 26, 46, 0.9)',
        canvasShadow: 'rgba(0, 255, 255, 0.7)',
        canvasShadowInner: 'rgba(0, 255, 255, 0.3)',
        canvasShadowGlow: 'rgba(255, 0, 255, 0.9)',
        canvasShadowInnerGlow: 'rgba(255, 0, 255, 0.5)',
        
        // Score container
        scoreBackground: 'rgba(0, 255, 255, 0.2)',
        scoreColor: '#00ffff',
        
        // Controls
        controlBackground: 'linear-gradient(145deg, #ff00ff, #cc00cc)',
        controlHoverBackground: 'linear-gradient(145deg, #cc00cc, #ff00ff)',
        controlActiveBackground: 'linear-gradient(145deg, #990099, #cc00cc)',
        controlColor: '#00ffff',
        
        // Buttons
        buttonBackground: 'linear-gradient(145deg, #00ffff, #00cccc)',
        buttonHoverBackground: 'linear-gradient(145deg, #00cccc, #00ffff)',
        buttonColor: '#000000',
        
        // Game elements
        snakeHeadColor: '#ff00ff',
        snakeBodyColor: '#cc00cc',
        foodColor: '#ffff00',
        obstacleColor: '#ff9900',
        gridLineColor: 'rgba(0, 255, 255, 0.3)',
        
        // Game over screen
        gameOverBackground: 'linear-gradient(145deg, rgba(13, 13, 43, 0.95), rgba(22, 33, 62, 0.95))',
        gameOverColor: '#00ffff',
        
        // Theme switcher
        themeSwitcherBackground: 'rgba(0, 255, 255, 0.2)',
        themeSwitcherColor: '#00ffff'
    },
    
    neon: {
        name: 'Neon',
        // Background colors
        bodyBackground: 'linear-gradient(135deg, #000000, #121212, #000000)',
        textColor: '#39ff14',
        headingColor: '#39ff14',
        
        // Game container
        gameContainerBackground: 'linear-gradient(135deg, #121212, #1a1a1a, #121212)',
        
        // Canvas and border
        canvasBorder: 'linear-gradient(45deg, #39ff14, #00ffff, #39ff14)',
        canvasBackground: 'rgba(0, 0, 0, 0.9)',
        canvasShadow: 'rgba(57, 255, 20, 0.7)',
        canvasShadowInner: 'rgba(57, 255, 20, 0.3)',
        canvasShadowGlow: 'rgba(57, 255, 20, 0.9)',
        canvasShadowInnerGlow: 'rgba(57, 255, 20, 0.5)',
        
        // Score container
        scoreBackground: 'rgba(57, 255, 20, 0.2)',
        scoreColor: '#39ff14',
        
        // Controls
        controlBackground: 'linear-gradient(145deg, #39ff14, #32cd32)',
        controlHoverBackground: 'linear-gradient(145deg, #32cd32, #39ff14)',
        controlActiveBackground: 'linear-gradient(145deg, #228b22, #32cd32)',
        controlColor: '#000000',
        
        // Buttons
        buttonBackground: 'linear-gradient(145deg, #00ffff, #00cccc)',
        buttonHoverBackground: 'linear-gradient(145deg, #00cccc, #00ffff)',
        buttonColor: '#000000',
        
        // Game elements
        snakeHeadColor: '#39ff14',
        snakeBodyColor: '#32cd32',
        foodColor: '#ff00ff',
        obstacleColor: '#ff3300',
        gridLineColor: 'rgba(57, 255, 20, 0.3)',
        
        // Game over screen
        gameOverBackground: 'linear-gradient(145deg, rgba(18, 18, 18, 0.95), rgba(26, 26, 26, 0.95))',
        gameOverColor: '#39ff14',
        
        // Theme switcher
        themeSwitcherBackground: 'rgba(57, 255, 20, 0.2)',
        themeSwitcherColor: '#39ff14'
    }
};

// Current theme (default to 'default')
let currentTheme = 'default';

// Function to get the current theme object
function getCurrentTheme() {
    return themes[currentTheme];
}

// Function to set a new theme
function setTheme(themeName) {
    if (themes[themeName]) {
        currentTheme = themeName;
        applyTheme();
    }
}

// Function to apply the current theme to the DOM
function applyTheme() {
    const theme = getCurrentTheme();
    const root = document.documentElement;
    
    // Apply CSS variables
    root.style.setProperty('--body-background', theme.bodyBackground);
    root.style.setProperty('--text-color', theme.textColor);
    root.style.setProperty('--heading-color', theme.headingColor);
    
    root.style.setProperty('--game-container-background', theme.gameContainerBackground);
    
    root.style.setProperty('--canvas-border', theme.canvasBorder);
    root.style.setProperty('--canvas-background', theme.canvasBackground);
    root.style.setProperty('--canvas-shadow', theme.canvasShadow);
    root.style.setProperty('--canvas-shadow-inner', theme.canvasShadowInner);
    root.style.setProperty('--canvas-shadow-glow', theme.canvasShadowGlow);
    root.style.setProperty('--canvas-shadow-inner-glow', theme.canvasShadowInnerGlow);
    
    root.style.setProperty('--score-background', theme.scoreBackground);
    root.style.setProperty('--score-color', theme.scoreColor);
    
    root.style.setProperty('--control-background', theme.controlBackground);
    root.style.setProperty('--control-hover-background', theme.controlHoverBackground);
    root.style.setProperty('--control-active-background', theme.controlActiveBackground);
    root.style.setProperty('--control-color', theme.controlColor);
    
    root.style.setProperty('--button-background', theme.buttonBackground);
    root.style.setProperty('--button-hover-background', theme.buttonHoverBackground);
    root.style.setProperty('--button-color', theme.buttonColor);
    
    root.style.setProperty('--snake-head-color', theme.snakeHeadColor);
    root.style.setProperty('--snake-body-color', theme.snakeBodyColor);
    root.style.setProperty('--food-color', theme.foodColor);
    root.style.setProperty('--obstacle-color', theme.obstacleColor);
    root.style.setProperty('--grid-line-color', theme.gridLineColor);
    
    root.style.setProperty('--game-over-background', theme.gameOverBackground);
    root.style.setProperty('--game-over-color', theme.gameOverColor);
    
    root.style.setProperty('--theme-switcher-background', theme.themeSwitcherBackground);
    root.style.setProperty('--theme-switcher-color', theme.themeSwitcherColor);
    
    // Update theme dropdown to reflect current theme
    const themeDropdown = document.getElementById('theme-dropdown');
    if (themeDropdown) {
        themeDropdown.value = currentTheme;
    }
}

// Initialize theme system
function initThemes() {
    // Create theme dropdown if it doesn't exist
    if (!document.getElementById('theme-dropdown')) {
        createThemeDropdown();
    }
    
    // Apply default theme
    applyTheme();
}

// Create theme dropdown
function createThemeDropdown() {
    const themeContainer = document.createElement('div');
    themeContainer.id = 'theme-container';
    
    const themeDropdown = document.createElement('select');
    themeDropdown.id = 'theme-dropdown';
    
    // Add options for each theme
    Object.keys(themes).forEach(themeName => {
        const option = document.createElement('option');
        option.value = themeName;
        option.textContent = themes[themeName].name;
        themeDropdown.appendChild(option);
    });
    
    // Set event listener
    themeDropdown.addEventListener('change', (e) => {
        setTheme(e.target.value);
    });
    
    // Create label
    const label = document.createElement('label');
    label.htmlFor = 'theme-dropdown';
    label.textContent = 'Theme: ';
    
    // Append elements
    themeContainer.appendChild(label);
    themeContainer.appendChild(themeDropdown);
    
    // Insert after sound toggle button
    const soundToggle = document.getElementById('sound-toggle');
    if (soundToggle && soundToggle.parentNode) {
        soundToggle.parentNode.insertBefore(themeContainer, soundToggle.nextSibling);
    } else {
        // Fallback: insert at the beginning of body
        document.body.insertBefore(themeContainer, document.body.firstChild);
    }
}

// Export theme functions
window.snakeThemes = {
    getCurrentTheme,
    setTheme,
    initThemes
};