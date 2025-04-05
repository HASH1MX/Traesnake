// Snake Game JavaScript

// Game constants
const GRID_SIZE = 20; // Size of each grid cell in pixels
const GRID_WIDTH = 400 / GRID_SIZE; // Number of cells horizontally
const GRID_HEIGHT = 400 / GRID_SIZE; // Number of cells vertically
const INITIAL_SNAKE_LENGTH = 3; // Starting length of the snake
const GAME_SPEED = 150; // Milliseconds between game updates (lower = faster)
const ANIMATION_SPEED = 0.15; // Animation interpolation speed (higher = faster)
const OBSTACLE_COUNT = 5; // Number of obstacles to generate

// Game variables
let canvas, ctx;
let snake = [];
let food = {};
let obstacles = []; // Array to store obstacle positions
let direction = 'right';
let nextDirection = 'right';
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let lastUpdateTime = 0;
let timeSinceLastUpdate = 0;
let animationFrameId;
let isGameRunning = false;
let gameOverScreen;
let soundsEnabled = true;

// Animation variables
let snakePositions = []; // For interpolation

// Sound effects (will be loaded later)
let eatSound, gameOverSound, moveSound;

// DOM elements
let scoreElement, highScoreElement, finalScoreElement;
let startButton, restartButton;
let upButton, downButton, leftButton, rightButton;

// Initialize the game
function init() {
    // Get DOM elements
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');
    gameOverScreen = document.getElementById('game-over');
    scoreElement = document.getElementById('score');
    highScoreElement = document.getElementById('high-score');
    finalScoreElement = document.getElementById('final-score');
    startButton = document.getElementById('start-btn');
    restartButton = document.getElementById('restart-btn');
    upButton = document.getElementById('up-btn');
    downButton = document.getElementById('down-btn');
    leftButton = document.getElementById('left-btn');
    rightButton = document.getElementById('right-btn');
    
    // Set high score display
    highScoreElement.textContent = highScore;
    
    // Add event listeners
    document.addEventListener('keydown', handleKeyPress);
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', restartGame);
    
    // Touch controls with visual feedback
    upButton.addEventListener('click', () => {
        upButton.classList.add('pressed');
        changeDirection('up');
        setTimeout(() => upButton.classList.remove('pressed'), 150);
    });
    downButton.addEventListener('click', () => {
        downButton.classList.add('pressed');
        changeDirection('down');
        setTimeout(() => downButton.classList.remove('pressed'), 150);
    });
    leftButton.addEventListener('click', () => {
        leftButton.classList.add('pressed');
        changeDirection('left');
        setTimeout(() => leftButton.classList.remove('pressed'), 150);
    });
    rightButton.addEventListener('click', () => {
        rightButton.classList.add('pressed');
        changeDirection('right');
        setTimeout(() => rightButton.classList.remove('pressed'), 150);
    });
    
    // Load sounds
    loadSounds();
    
    // Draw initial game state
    drawGrid();
    drawInstructions();
}

// Load sound effects
function loadSounds() {
    eatSound = new Audio('sounds/eat.mp3');
    gameOverSound = new Audio('sounds/game-over.mp3');
    moveSound = new Audio('sounds/move.mp3');
}

// Start the game
function startGame() {
    if (isGameRunning) return;
    
    // Reset game state
    snake = [];
    obstacles = [];
    score = 0;
    direction = 'right';
    nextDirection = 'right';
    scoreElement.textContent = '0';
    gameOverScreen.style.display = 'none';
    lastUpdateTime = 0;
    timeSinceLastUpdate = 0;
    
    // Create initial snake
    for (let i = INITIAL_SNAKE_LENGTH - 1; i >= 0; i--) {
        snake.push({ x: i, y: 0 });
    }
    
    // Initialize snake positions for smooth animation
    snakePositions = snake.map(segment => ({
        x: segment.x * GRID_SIZE,
        y: segment.y * GRID_SIZE,
        targetX: segment.x * GRID_SIZE,
        targetY: segment.y * GRID_SIZE
    }));
    
    // Create first food
    createFood();
    
    // Create obstacles
    createObstacles();
    
    // Start game loop with requestAnimationFrame
    isGameRunning = true;
    startButton.textContent = 'Game Running';
    lastUpdateTime = performance.now();
    animationFrameId = requestAnimationFrame(animationLoop);
}

// Restart the game
function restartGame() {
    gameOverScreen.style.display = 'none';
    startGame();
}

// Animation loop using requestAnimationFrame
function animationLoop(timestamp) {
    if (!isGameRunning) return;
    
    // Calculate delta time
    const deltaTime = timestamp - lastUpdateTime;
    lastUpdateTime = timestamp;
    
    // Accumulate time since last game update
    timeSinceLastUpdate += deltaTime;
    
    // Update game state at fixed intervals
    if (timeSinceLastUpdate >= GAME_SPEED) {
        update();
        timeSinceLastUpdate = 0;
    }
    
    // Update visual positions with interpolation
    updateSnakePositions(deltaTime);
    
    // Draw the game
    draw();
    
    // Continue the animation loop
    animationFrameId = requestAnimationFrame(animationLoop);
}

// Update snake visual positions with interpolation
function updateSnakePositions(deltaTime) {
    // Ensure snakePositions array is initialized and has the correct length
    if (snakePositions.length !== snake.length) {
        snakePositions = snake.map(segment => ({
            x: segment.x * GRID_SIZE,
            y: segment.y * GRID_SIZE,
            targetX: segment.x * GRID_SIZE,
            targetY: segment.y * GRID_SIZE
        }));
    }
    
    // Update each segment's position with smooth interpolation
    for (let i = 0; i < snake.length; i++) {
        const targetX = snake[i].x * GRID_SIZE;
        const targetY = snake[i].y * GRID_SIZE;
        
        // Update target positions
        snakePositions[i].targetX = targetX;
        snakePositions[i].targetY = targetY;
        
        // Interpolate current position towards target
        snakePositions[i].x += (targetX - snakePositions[i].x) * ANIMATION_SPEED * (deltaTime / 16);
        snakePositions[i].y += (targetY - snakePositions[i].y) * ANIMATION_SPEED * (deltaTime / 16);
    }
}

// Update game state
function update() {
    // Update direction
    direction = nextDirection;
    
    // Calculate new head position
    const head = { ...snake[0] };
    switch (direction) {
        case 'up': head.y--; break;
        case 'down': head.y++; break;
        case 'left': head.x--; break;
        case 'right': head.x++; break;
    }
    
    // Check for collisions
    if (isCollision(head)) {
        gameOver();
        return;
    }
    
    // Add new head
    snake.unshift(head);
    
    // Check if snake ate food
    if (head.x === food.x && head.y === food.y) {
        // Increase score
        score++;
        scoreElement.textContent = score;
        
        // Play eat sound
        if (soundsEnabled && eatSound) {
            eatSound.currentTime = 0;
            eatSound.play().catch(e => console.log('Error playing sound:', e));
        }
        
        // Create new food
        createFood();
    } else {
        // Remove tail if no food was eaten
        snake.pop();
    }
}

// Draw the game
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    drawGrid();
    
    // Draw obstacles
    drawObstacles();
    
    // Draw snake using interpolated positions
    snake.forEach((segment, index) => {
        // Save the current context state
        ctx.save();
        
        // Use interpolated position for smoother movement
        const x = snakePositions[index] ? snakePositions[index].x : segment.x * GRID_SIZE;
        const y = snakePositions[index] ? snakePositions[index].y : segment.y * GRID_SIZE;
        const radius = GRID_SIZE / 5; // Rounded corner radius
        
        // Determine segment type and set appropriate style
        if (index === 0) {
            // Head segment with gradient
            const gradient = ctx.createRadialGradient(
                x + GRID_SIZE/2, y + GRID_SIZE/2, GRID_SIZE/6,
                x + GRID_SIZE/2, y + GRID_SIZE/2, GRID_SIZE/1.2
            );
            gradient.addColorStop(0, '#a5d6a7');
            gradient.addColorStop(1, '#66bb6a');
            ctx.fillStyle = gradient;
        } else {
            // Body segments with gradient based on position
            const hue = 120; // Base green hue
            const saturation = 70; // Vibrant but not too bright
            const lightness = Math.max(70 - (index * 1.5), 50); // Gradient from lighter to darker
            ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
            
            // Add subtle shadow for 3D effect
            ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
            ctx.shadowBlur = 3;
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;
        }
        
        // Check if segment is crossing a border and draw accordingly
        drawSegmentWithBorderCrossing(x, y, radius, index === 0 ? segment : null);
        
        // Restore the context state
        ctx.restore();
    });
    
    // Draw food
    drawFood();
}

// Draw snake tongue based on direction
function drawSnakeTongue(head) {
    const tongueLength = GRID_SIZE * 0.6; // Length of the tongue
    const tongueWidth = GRID_SIZE / 15; // Width of the tongue
    const forkLength = GRID_SIZE * 0.2; // Length of the fork
    const forkAngle = Math.PI / 6; // Angle of the fork (30 degrees)
    
    // Calculate the starting position of the tongue based on direction
    let startX, startY;
    let angleOffset = 0;
    
    switch (direction) {
        case 'up':
            startX = head.x * GRID_SIZE + GRID_SIZE / 2;
            startY = head.y * GRID_SIZE;
            angleOffset = -Math.PI / 2; // -90 degrees
            break;
        case 'down':
            startX = head.x * GRID_SIZE + GRID_SIZE / 2;
            startY = head.y * GRID_SIZE + GRID_SIZE;
            angleOffset = Math.PI / 2; // 90 degrees
            break;
        case 'left':
            startX = head.x * GRID_SIZE;
            startY = head.y * GRID_SIZE + GRID_SIZE / 2;
            angleOffset = Math.PI; // 180 degrees
            break;
        case 'right':
            startX = head.x * GRID_SIZE + GRID_SIZE;
            startY = head.y * GRID_SIZE + GRID_SIZE / 2;
            angleOffset = 0; // 0 degrees
            break;
    }
    
    // Calculate the end point of the tongue
    const endX = startX + Math.cos(angleOffset) * tongueLength;
    const endY = startY + Math.sin(angleOffset) * tongueLength;
    
    // Calculate the fork points
    const fork1X = endX + Math.cos(angleOffset + forkAngle) * forkLength;
    const fork1Y = endY + Math.sin(angleOffset + forkAngle) * forkLength;
    const fork2X = endX + Math.cos(angleOffset - forkAngle) * forkLength;
    const fork2Y = endY + Math.sin(angleOffset - forkAngle) * forkLength;
    
    // Draw the tongue
    ctx.save();
    ctx.strokeStyle = '#ff0000'; // Bright red color
    ctx.lineWidth = tongueWidth;
    ctx.lineCap = 'round';
    
    // Draw the main part of the tongue
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    
    // Draw the fork
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(fork1X, fork1Y);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(fork2X, fork2Y);
    ctx.stroke();
    
    ctx.restore();
}

// Draw snake eyes based on direction
function drawSnakeEyes(head) {
    const eyeSize = GRID_SIZE / 4.5;
    const eyeOffset = GRID_SIZE / 3;
    const pupilSize = eyeSize / 2;
    
    let leftEyeX, leftEyeY, rightEyeX, rightEyeY;
    let pupilOffsetX = 0, pupilOffsetY = 0;
    
    switch (direction) {
        case 'up':
            leftEyeX = head.x * GRID_SIZE + eyeOffset;
            leftEyeY = head.y * GRID_SIZE + eyeOffset;
            rightEyeX = head.x * GRID_SIZE + GRID_SIZE - eyeOffset - eyeSize;
            rightEyeY = head.y * GRID_SIZE + eyeOffset;
            pupilOffsetY = -pupilSize / 3; // Look up
            break;
        case 'down':
            leftEyeX = head.x * GRID_SIZE + eyeOffset;
            leftEyeY = head.y * GRID_SIZE + GRID_SIZE - eyeOffset - eyeSize;
            rightEyeX = head.x * GRID_SIZE + GRID_SIZE - eyeOffset - eyeSize;
            rightEyeY = head.y * GRID_SIZE + GRID_SIZE - eyeOffset - eyeSize;
            pupilOffsetY = pupilSize / 3; // Look down
            break;
        case 'left':
            leftEyeX = head.x * GRID_SIZE + eyeOffset;
            leftEyeY = head.y * GRID_SIZE + eyeOffset;
            rightEyeX = head.x * GRID_SIZE + eyeOffset;
            rightEyeY = head.y * GRID_SIZE + GRID_SIZE - eyeOffset - eyeSize;
            pupilOffsetX = -pupilSize / 3; // Look left
            break;
        case 'right':
            leftEyeX = head.x * GRID_SIZE + GRID_SIZE - eyeOffset - eyeSize;
            leftEyeY = head.y * GRID_SIZE + eyeOffset;
            rightEyeX = head.x * GRID_SIZE + GRID_SIZE - eyeOffset - eyeSize;
            rightEyeY = head.y * GRID_SIZE + GRID_SIZE - eyeOffset - eyeSize;
            pupilOffsetX = pupilSize / 3; // Look right
            break;
    }
    
    // Draw eye whites (circles)
    ctx.fillStyle = 'white';
    
    // Left eye
    ctx.beginPath();
    ctx.arc(leftEyeX + eyeSize/2, leftEyeY + eyeSize/2, eyeSize/2, 0, Math.PI * 2);
    ctx.fill();
    
    // Right eye
    ctx.beginPath();
    ctx.arc(rightEyeX + eyeSize/2, rightEyeY + eyeSize/2, eyeSize/2, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw pupils (smaller circles)
    ctx.fillStyle = '#333';
    
    // Left pupil
    ctx.beginPath();
    ctx.arc(
        leftEyeX + eyeSize/2 + pupilOffsetX, 
        leftEyeY + eyeSize/2 + pupilOffsetY, 
        pupilSize, 0, Math.PI * 2
    );
    ctx.fill();
    
    // Right pupil
    ctx.beginPath();
    ctx.arc(
        rightEyeX + eyeSize/2 + pupilOffsetX, 
        rightEyeY + eyeSize/2 + pupilOffsetY, 
        pupilSize, 0, Math.PI * 2
    );
    ctx.fill();
    
    // Add shine to eyes
    ctx.fillStyle = 'white';
    
    // Left eye shine
    ctx.beginPath();
    ctx.arc(
        leftEyeX + eyeSize/2 + pupilOffsetX/2 - pupilSize/2, 
        leftEyeY + eyeSize/2 + pupilOffsetY/2 - pupilSize/2, 
        pupilSize/3, 0, Math.PI * 2
    );
    ctx.fill();
    
    // Right eye shine
    ctx.beginPath();
    ctx.arc(
        rightEyeX + eyeSize/2 + pupilOffsetX/2 - pupilSize/2, 
        rightEyeY + eyeSize/2 + pupilOffsetY/2 - pupilSize/2, 
        pupilSize/3, 0, Math.PI * 2
    );
    ctx.fill();
}

// Draw the food
function drawFood() {
    // Save context state
    ctx.save();
    
    // Create a radial gradient for the food
    const centerX = food.x * GRID_SIZE + GRID_SIZE / 2;
    const centerY = food.y * GRID_SIZE + GRID_SIZE / 2;
    const radius = GRID_SIZE / 2;
    
    const gradient = ctx.createRadialGradient(
        centerX - radius/3, centerY - radius/3, radius/6,
        centerX, centerY, radius
    );
    
    gradient.addColorStop(0, '#ffffff'); // White center
    gradient.addColorStop(0.7, '#c8e6c9'); // Light green
    gradient.addColorStop(1, '#81c784'); // Medium green edge
    
    ctx.fillStyle = gradient;
    
    // Add glow effect
    ctx.shadowColor = 'rgba(129, 199, 132, 0.7)';
    ctx.shadowBlur = 10;
    
    // Draw a circle for the food
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.85, 0, Math.PI * 2);
    ctx.fill();
    
    // Add shine effect
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(centerX - radius/3, centerY - radius/3, radius/4, 0, Math.PI * 2);
    ctx.fill();
    
    // Restore context state
    ctx.restore();
}

// Draw obstacles
function drawObstacles() {
    // Save context state
    ctx.save();
    
    // Set obstacle style
    ctx.fillStyle = '#388e3c'; // Dark green color for obstacles
    ctx.shadowColor = 'rgba(46, 125, 50, 0.5)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    // Draw each obstacle
    obstacles.forEach(obstacle => {
        const x = obstacle.x * GRID_SIZE;
        const y = obstacle.y * GRID_SIZE;
        
        // Draw obstacle as a solid square
        ctx.fillRect(x, y, GRID_SIZE, GRID_SIZE);
        
        // Add some texture/pattern to make obstacles look more interesting
        ctx.fillStyle = '#222222'; // Slightly darker for texture
        
        // Draw a small pattern inside the obstacle
        const patternSize = GRID_SIZE / 5;
        ctx.fillStyle = '#2e7d32'; // Darker green for inner pattern
        ctx.fillRect(x + patternSize, y + patternSize, 
                    GRID_SIZE - patternSize * 2, GRID_SIZE - patternSize * 2);
    });
    
    // Restore context state
    ctx.restore();
}

// Draw grid lines
function drawGrid() {
    ctx.strokeStyle = '#e8f5e9';
    ctx.lineWidth = 0.5;
    
    // Draw vertical lines
    for (let x = 0; x <= canvas.width; x += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    // Draw horizontal lines
    for (let y = 0; y <= canvas.height; y += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

// Draw instructions on the canvas
function drawInstructions() {
    ctx.fillStyle = '#2e7d32';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Press Start to Play', canvas.width / 2, canvas.height / 2 - 30);
    
    ctx.font = '16px Arial';
    ctx.fillText('Use Arrow Keys or Buttons to Move', canvas.width / 2, canvas.height / 2 + 10);
    ctx.fillText('Collect Food to Grow', canvas.width / 2, canvas.height / 2 + 40);
}

// Create food at random position
function createFood() {
    // Generate random position
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * GRID_WIDTH),
            y: Math.floor(Math.random() * GRID_HEIGHT)
        };
    } while (isFoodOnSnake(newFood) || isPositionOnObstacle(newFood));
    
    food = newFood;
}

// Create obstacles at random positions
function createObstacles() {
    obstacles = [];
    
    // Generate OBSTACLE_COUNT obstacles
    for (let i = 0; i < OBSTACLE_COUNT; i++) {
        let newObstacle;
        let attempts = 0;
        const maxAttempts = 50; // Prevent infinite loop
        
        do {
            newObstacle = {
                x: Math.floor(Math.random() * GRID_WIDTH),
                y: Math.floor(Math.random() * GRID_HEIGHT)
            };
            attempts++;
            
            // If we've tried too many times, break to prevent infinite loop
            if (attempts > maxAttempts) break;
            
        } while (isPositionOnSnake(newObstacle) || 
                 (food.x === newObstacle.x && food.y === newObstacle.y) || 
                 isPositionOnObstacle(newObstacle));
        
        // Only add the obstacle if we found a valid position
        if (attempts <= maxAttempts) {
            obstacles.push(newObstacle);
        }
    }
}

// Check if a position is on any obstacle
function isPositionOnObstacle(pos) {
    return obstacles.some(obstacle => obstacle.x === pos.x && obstacle.y === pos.y);
}

// Check if a position is on the snake
function isPositionOnSnake(pos) {
    return snake.some(segment => segment.x === pos.x && segment.y === pos.y);
}

// Check if food position overlaps with snake
function isFoodOnSnake(pos) {
    return snake.some(segment => segment.x === pos.x && segment.y === pos.y);
}

// Check for collisions with walls, obstacles, or self
function isCollision(pos) {
    // Teleport at borders instead of collision
    if (pos.x < 0) {
        pos.x = GRID_WIDTH - 1;
    } else if (pos.x >= GRID_WIDTH) {
        pos.x = 0;
    }
    
    if (pos.y < 0) {
        pos.y = GRID_HEIGHT - 1;
    } else if (pos.y >= GRID_HEIGHT) {
        pos.y = 0;
    }
    
    // Check obstacle collisions
    if (isPositionOnObstacle(pos)) {
        return true;
    }
    
    // Check self collision (skip the tail as it will move)
    for (let i = 0; i < snake.length - 1; i++) {
        if (snake[i].x === pos.x && snake[i].y === pos.y) {
            return true;
        }
    }
    
    return false;
}

// Handle keyboard input
function handleKeyPress(e) {
    // Prevent scrolling with arrow keys
    if ([37, 38, 39, 40].includes(e.keyCode)) {
        e.preventDefault();
    }
    
    // Change direction based on key press
    switch (e.keyCode) {
        case 38: // Up arrow
        case 87: // W key
            upButton.classList.add('pressed');
            changeDirection('up');
            break;
        case 40: // Down arrow
        case 83: // S key
            downButton.classList.add('pressed');
            changeDirection('down');
            break;
        case 37: // Left arrow
        case 65: // A key
            leftButton.classList.add('pressed');
            changeDirection('left');
            break;
        case 39: // Right arrow
        case 68: // D key
            rightButton.classList.add('pressed');
            changeDirection('right');
            break;
        case 32: // Space bar
            if (!isGameRunning) {
                startGame();
            }
            break;
    }
    
    // Remove the pressed class after a short delay
    setTimeout(() => {
        upButton.classList.remove('pressed');
        downButton.classList.remove('pressed');
        leftButton.classList.remove('pressed');
        rightButton.classList.remove('pressed');
    }, 150);
}

// Change snake direction
function changeDirection(newDirection) {
    // Prevent 180-degree turns
    if (
        (direction === 'up' && newDirection === 'down') ||
        (direction === 'down' && newDirection === 'up') ||
        (direction === 'left' && newDirection === 'right') ||
        (direction === 'right' && newDirection === 'left')
    ) {
        return;
    }
    
    nextDirection = newDirection;
    
    // Play move sound
    if (isGameRunning && soundsEnabled && moveSound) {
        moveSound.currentTime = 0;
        moveSound.play().catch(e => console.log('Error playing sound:', e));
    }
}

// Game over
function gameOver() {
    cancelAnimationFrame(animationFrameId);
    isGameRunning = false;
    startButton.textContent = 'Start Game';
    
    // Play game over sound
    if (soundsEnabled && gameOverSound) {
        gameOverSound.play().catch(e => console.log('Error playing sound:', e));
    }
    
    // Update high score
    if (score > highScore) {
        highScore = score;
        highScoreElement.textContent = highScore;
        localStorage.setItem('snakeHighScore', highScore);
    }
    
    // Show game over screen
    finalScoreElement.textContent = score;
    gameOverScreen.style.display = 'block';
}

// Initialize the game when the page loads
window.addEventListener('load', init);