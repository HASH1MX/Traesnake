// Snake Game JavaScript

// Game constants
const GRID_SIZE = 20; // Size of each grid cell in pixels
const GRID_WIDTH = 400 / GRID_SIZE; // Number of cells horizontally
const GRID_HEIGHT = 400 / GRID_SIZE; // Number of cells vertically
const INITIAL_SNAKE_LENGTH = 3; // Starting length of the snake
const GAME_SPEED = 150; // Milliseconds between game updates (lower = faster)

// Game variables
let canvas, ctx;
let snake = [];
let food = {};
let direction = 'right';
let nextDirection = 'right';
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameInterval;
let isGameRunning = false;
let gameOverScreen;
let soundsEnabled = true;

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
    
    // Touch controls
    upButton.addEventListener('click', () => changeDirection('up'));
    downButton.addEventListener('click', () => changeDirection('down'));
    leftButton.addEventListener('click', () => changeDirection('left'));
    rightButton.addEventListener('click', () => changeDirection('right'));
    
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
    score = 0;
    direction = 'right';
    nextDirection = 'right';
    scoreElement.textContent = '0';
    gameOverScreen.style.display = 'none';
    
    // Create initial snake
    for (let i = INITIAL_SNAKE_LENGTH - 1; i >= 0; i--) {
        snake.push({ x: i, y: 0 });
    }
    
    // Create first food
    createFood();
    
    // Start game loop
    isGameRunning = true;
    startButton.textContent = 'Game Running';
    gameInterval = setInterval(gameLoop, GAME_SPEED);
}

// Restart the game
function restartGame() {
    gameOverScreen.style.display = 'none';
    startGame();
}

// Main game loop
function gameLoop() {
    update();
    draw();
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
    
    // Draw snake
    snake.forEach((segment, index) => {
        // Use different color for head
        if (index === 0) {
            ctx.fillStyle = '#e74c3c'; // Red for head
        } else {
            // Gradient from dark to light green for body
            const greenValue = Math.floor(150 - (index * 3));
            ctx.fillStyle = `rgb(46, ${Math.max(greenValue, 100)}, 113)`;
        }
        
        ctx.fillRect(
            segment.x * GRID_SIZE, 
            segment.y * GRID_SIZE, 
            GRID_SIZE, 
            GRID_SIZE
        );
        
        // Draw eyes on the head
        if (index === 0) {
            drawSnakeEyes(segment);
        }
    });
    
    // Draw food
    drawFood();
}

// Draw snake eyes based on direction
function drawSnakeEyes(head) {
    ctx.fillStyle = 'white';
    
    const eyeSize = GRID_SIZE / 5;
    const eyeOffset = GRID_SIZE / 3;
    
    let leftEyeX, leftEyeY, rightEyeX, rightEyeY;
    
    switch (direction) {
        case 'up':
            leftEyeX = head.x * GRID_SIZE + eyeOffset;
            leftEyeY = head.y * GRID_SIZE + eyeOffset;
            rightEyeX = head.x * GRID_SIZE + GRID_SIZE - eyeOffset - eyeSize;
            rightEyeY = head.y * GRID_SIZE + eyeOffset;
            break;
        case 'down':
            leftEyeX = head.x * GRID_SIZE + eyeOffset;
            leftEyeY = head.y * GRID_SIZE + GRID_SIZE - eyeOffset - eyeSize;
            rightEyeX = head.x * GRID_SIZE + GRID_SIZE - eyeOffset - eyeSize;
            rightEyeY = head.y * GRID_SIZE + GRID_SIZE - eyeOffset - eyeSize;
            break;
        case 'left':
            leftEyeX = head.x * GRID_SIZE + eyeOffset;
            leftEyeY = head.y * GRID_SIZE + eyeOffset;
            rightEyeX = head.x * GRID_SIZE + eyeOffset;
            rightEyeY = head.y * GRID_SIZE + GRID_SIZE - eyeOffset - eyeSize;
            break;
        case 'right':
            leftEyeX = head.x * GRID_SIZE + GRID_SIZE - eyeOffset - eyeSize;
            leftEyeY = head.y * GRID_SIZE + eyeOffset;
            rightEyeX = head.x * GRID_SIZE + GRID_SIZE - eyeOffset - eyeSize;
            rightEyeY = head.y * GRID_SIZE + GRID_SIZE - eyeOffset - eyeSize;
            break;
    }
    
    // Draw eyes
    ctx.fillRect(leftEyeX, leftEyeY, eyeSize, eyeSize);
    ctx.fillRect(rightEyeX, rightEyeY, eyeSize, eyeSize);
}

// Draw the food
function drawFood() {
    ctx.fillStyle = '#f1c40f'; // Yellow color for food
    
    // Draw a circle for the food
    ctx.beginPath();
    ctx.arc(
        food.x * GRID_SIZE + GRID_SIZE / 2,
        food.y * GRID_SIZE + GRID_SIZE / 2,
        GRID_SIZE / 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

// Draw grid lines
function drawGrid() {
    ctx.strokeStyle = '#ecf0f1';
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
    ctx.fillStyle = '#2c3e50';
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
    } while (isFoodOnSnake(newFood));
    
    food = newFood;
}

// Check if food position overlaps with snake
function isFoodOnSnake(pos) {
    return snake.some(segment => segment.x === pos.x && segment.y === pos.y);
}

// Check for collisions with walls or self
function isCollision(pos) {
    // Check wall collisions
    if (pos.x < 0 || pos.x >= GRID_WIDTH || pos.y < 0 || pos.y >= GRID_HEIGHT) {
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
            changeDirection('up');
            break;
        case 40: // Down arrow
        case 83: // S key
            changeDirection('down');
            break;
        case 37: // Left arrow
        case 65: // A key
            changeDirection('left');
            break;
        case 39: // Right arrow
        case 68: // D key
            changeDirection('right');
            break;
        case 32: // Space bar
            if (!isGameRunning) {
                startGame();
            }
            break;
    }
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
    clearInterval(gameInterval);
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