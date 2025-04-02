// Game constants
const GRID_SIZE = 20;
const GAME_SPEED = 150; // milliseconds
const DIRECTIONS = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 }
};

// Game variables
let snake = [];
let food = {};
let direction = DIRECTIONS.RIGHT;
let nextDirection = DIRECTIONS.RIGHT;
let gameInterval;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameRunning = false;

// DOM elements
const gameBoard = document.getElementById('game-board');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const finalScoreElement = document.getElementById('final-score');
const gameOverElement = document.getElementById('game-over');
const restartButton = document.getElementById('restart-btn');
const upButton = document.getElementById('up-btn');
const downButton = document.getElementById('down-btn');
const leftButton = document.getElementById('left-btn');
const rightButton = document.getElementById('right-btn');

// Initialize the game
function initGame() {
    // Clear the game board
    gameBoard.innerHTML = '';
    
    // Create the grid cells
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        gameBoard.appendChild(cell);
    }
    
    // Initialize the snake
    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];
    
    // Set initial direction
    direction = DIRECTIONS.RIGHT;
    nextDirection = DIRECTIONS.RIGHT;
    
    // Generate food
    generateFood();
    
    // Reset score
    score = 0;
    scoreElement.textContent = score;
    highScoreElement.textContent = highScore;
    
    // Hide game over screen
    gameOverElement.classList.add('hidden');
    
    // Start the game loop
    if (gameInterval) clearInterval(gameInterval);
    gameRunning = true;
    gameInterval = setInterval(gameLoop, GAME_SPEED);
    
    // Render initial state
    render();
}

// Game loop
function gameLoop() {
    // Update direction
    direction = nextDirection;
    
    // Move the snake
    const head = { ...snake[0] };
    head.x += direction.x;
    head.y += direction.y;
    
    // Check for collisions
    if (isCollision(head)) {
        gameOver();
        return;
    }
    
    // Add new head
    snake.unshift(head);
    
    // Check if food is eaten
    if (head.x === food.x && head.y === food.y) {
        // Increase score
        score++;
        scoreElement.textContent = score;
        
        // Update high score if needed
        if (score > highScore) {
            highScore = score;
            highScoreElement.textContent = highScore;
            localStorage.setItem('snakeHighScore', highScore);
        }
        
        // Generate new food
        generateFood();
    } else {
        // Remove tail if no food eaten
        snake.pop();
    }
    
    // Render the game
    render();
}

// Check for collisions
function isCollision(position) {
    // Check wall collisions
    if (
        position.x < 0 ||
        position.y < 0 ||
        position.x >= GRID_SIZE ||
        position.y >= GRID_SIZE
    ) {
        return true;
    }
    
    // Check self collision
    for (let i = 1; i < snake.length; i++) {
        if (position.x === snake[i].x && position.y === snake[i].y) {
            return true;
        }
    }
    
    return false;
}

// Generate food at random position
function generateFood() {
    while (true) {
        food = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
        };
        
        // Make sure food doesn't spawn on snake
        let foodOnSnake = false;
        for (const segment of snake) {
            if (segment.x === food.x && segment.y === food.y) {
                foodOnSnake = true;
                break;
            }
        }
        
        if (!foodOnSnake) break;
    }
}

// Render the game
function render() {
    // Clear all cells
    const cells = gameBoard.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.remove('snake', 'snake-head', 'food');
    });
    
    // Render snake
    snake.forEach((segment, index) => {
        if (segment.x >= 0 && segment.x < GRID_SIZE && segment.y >= 0 && segment.y < GRID_SIZE) {
            const cellIndex = segment.y * GRID_SIZE + segment.x;
            if (cells[cellIndex]) {
                if (index === 0) {
                    cells[cellIndex].classList.add('snake-head');
                } else {
                    cells[cellIndex].classList.add('snake');
                }
            }
        }
    });
    
    // Render food
    const foodIndex = food.y * GRID_SIZE + food.x;
    if (cells[foodIndex]) {
        cells[foodIndex].classList.add('food');
    }
}

// Game over function
function gameOver() {
    gameRunning = false;
    clearInterval(gameInterval);
    finalScoreElement.textContent = score;
    gameOverElement.classList.remove('hidden');
}

// Handle keyboard input
function handleKeydown(e) {
    if (!gameRunning) return;
    
    switch (e.key) {
        case 'ArrowUp':
            if (direction !== DIRECTIONS.DOWN) {
                nextDirection = DIRECTIONS.UP;
            }
            break;
        case 'ArrowDown':
            if (direction !== DIRECTIONS.UP) {
                nextDirection = DIRECTIONS.DOWN;
            }
            break;
        case 'ArrowLeft':
            if (direction !== DIRECTIONS.RIGHT) {
                nextDirection = DIRECTIONS.LEFT;
            }
            break;
        case 'ArrowRight':
            if (direction !== DIRECTIONS.LEFT) {
                nextDirection = DIRECTIONS.RIGHT;
            }
            break;
    }
}

// Event listeners
document.addEventListener('keydown', handleKeydown);
restartButton.addEventListener('click', initGame);

// Touch controls
upButton.addEventListener('click', () => {
    if (direction !== DIRECTIONS.DOWN && gameRunning) {
        nextDirection = DIRECTIONS.UP;
    }
});

downButton.addEventListener('click', () => {
    if (direction !== DIRECTIONS.UP && gameRunning) {
        nextDirection = DIRECTIONS.DOWN;
    }
});

leftButton.addEventListener('click', () => {
    if (direction !== DIRECTIONS.RIGHT && gameRunning) {
        nextDirection = DIRECTIONS.LEFT;
    }
});

rightButton.addEventListener('click', () => {
    if (direction !== DIRECTIONS.LEFT && gameRunning) {
        nextDirection = DIRECTIONS.RIGHT;
    }
});

// Initialize the game when the page loads
window.addEventListener('load', () => {
    // Ensure game over screen is hidden on initial load
    gameOverElement.classList.add('hidden');
    initGame();
});