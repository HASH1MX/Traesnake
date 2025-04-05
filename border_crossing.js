// Border crossing effect for snake game

// Function to draw a snake segment with border crossing effect
function drawSegmentWithBorderCrossing(x, y, radius, headSegment) {
    // Calculate the canvas boundaries
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    // Create a more gradual transition zone for border crossing
    // This will make the snake appear to be passing through the wall
    const transitionZone = GRID_SIZE * 2; // Width of the transition zone
    
    // Calculate how far into the transition zone the segment is (0 to 1)
    let leftTransition = 0;
    let rightTransition = 0;
    let topTransition = 0;
    let bottomTransition = 0;
    
    // Check if segment is in transition zone near borders
    if (x < transitionZone) {
        leftTransition = x / transitionZone; // 0 at edge, 1 at inner boundary
    } else if (x > canvasWidth - transitionZone) {
        rightTransition = (canvasWidth - x) / transitionZone; // 0 at edge, 1 at inner boundary
    }
    
    if (y < transitionZone) {
        topTransition = y / transitionZone; // 0 at edge, 1 at inner boundary
    } else if (y > canvasHeight - transitionZone) {
        bottomTransition = (canvasHeight - y) / transitionZone; // 0 at edge, 1 at inner boundary
    }
    
    // Draw the main segment
    drawSnakeSegment(x, y, radius, headSegment);
    
    // Draw partial segments on the opposite sides with opacity based on transition
    if (leftTransition > 0) {
        // Draw segment appearing from right side with opacity
        ctx.save();
        ctx.globalAlpha = 1 - leftTransition; // More visible as it gets closer to the edge
        drawSnakeSegment(x + canvasWidth, y, radius, headSegment);
        ctx.restore();
    } else if (rightTransition > 0) {
        // Draw segment appearing from left side with opacity
        ctx.save();
        ctx.globalAlpha = 1 - rightTransition; // More visible as it gets closer to the edge
        drawSnakeSegment(x - canvasWidth, y, radius, headSegment);
        ctx.restore();
    }
    
    if (topTransition > 0) {
        // Draw segment appearing from bottom side with opacity
        ctx.save();
        ctx.globalAlpha = 1 - topTransition; // More visible as it gets closer to the edge
        drawSnakeSegment(x, y + canvasHeight, radius, headSegment);
        ctx.restore();
    } else if (bottomTransition > 0) {
        // Draw segment appearing from top side with opacity
        ctx.save();
        ctx.globalAlpha = 1 - bottomTransition; // More visible as it gets closer to the edge
        drawSnakeSegment(x, y - canvasHeight, radius, headSegment);
        ctx.restore();
    }
    
    // Handle corner cases (when crossing both horizontally and vertically)
    if (leftTransition > 0 && topTransition > 0) {
        ctx.save();
        ctx.globalAlpha = (1 - leftTransition) * (1 - topTransition); // Combined opacity
        drawSnakeSegment(x + canvasWidth, y + canvasHeight, radius, headSegment);
        ctx.restore();
    } else if (leftTransition > 0 && bottomTransition > 0) {
        ctx.save();
        ctx.globalAlpha = (1 - leftTransition) * (1 - bottomTransition); // Combined opacity
        drawSnakeSegment(x + canvasWidth, y - canvasHeight, radius, headSegment);
        ctx.restore();
    } else if (rightTransition > 0 && topTransition > 0) {
        ctx.save();
        ctx.globalAlpha = (1 - rightTransition) * (1 - topTransition); // Combined opacity
        drawSnakeSegment(x - canvasWidth, y + canvasHeight, radius, headSegment);
        ctx.restore();
    } else if (rightTransition > 0 && bottomTransition > 0) {
        ctx.save();
        ctx.globalAlpha = (1 - rightTransition) * (1 - bottomTransition); // Combined opacity
        drawSnakeSegment(x - canvasWidth, y - canvasHeight, radius, headSegment);
        ctx.restore();
    }
}

// Helper function to draw a single snake segment
function drawSnakeSegment(x, y, radius, headSegment) {
    // Draw rounded rectangle for segment
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + GRID_SIZE - radius, y);
    ctx.quadraticCurveTo(x + GRID_SIZE, y, x + GRID_SIZE, y + radius);
    ctx.lineTo(x + GRID_SIZE, y + GRID_SIZE - radius);
    ctx.quadraticCurveTo(x + GRID_SIZE, y + GRID_SIZE, x + GRID_SIZE - radius, y + GRID_SIZE);
    ctx.lineTo(x + radius, y + GRID_SIZE);
    ctx.quadraticCurveTo(x, y + GRID_SIZE, x, y + GRID_SIZE - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
    
    // Draw eyes and tongue if this is the head segment
    if (headSegment) {
        // We need to adjust the drawing functions to work with pixel coordinates
        drawSnakeEyesAtPosition(headSegment, x, y);
        drawSnakeTongueAtPosition(headSegment, x, y);
    }
}

// Draw snake eyes at specific pixel position
function drawSnakeEyesAtPosition(head, pixelX, pixelY) {
    const eyeSize = GRID_SIZE / 4.5;
    const eyeOffset = GRID_SIZE / 3;
    const pupilSize = eyeSize / 2;
    
    let leftEyeX, leftEyeY, rightEyeX, rightEyeY;
    let pupilOffsetX = 0, pupilOffsetY = 0;
    
    // Use the pixel coordinates instead of grid coordinates
    // Use the head's direction instead of the global direction
    const headDirection = direction; // Using the global direction since head doesn't contain direction info
    switch (headDirection) {
        case 'up':
            leftEyeX = pixelX + eyeOffset;
            leftEyeY = pixelY + eyeOffset;
            rightEyeX = pixelX + GRID_SIZE - eyeOffset - eyeSize;
            rightEyeY = pixelY + eyeOffset;
            pupilOffsetY = -pupilSize / 3; // Look up
            break;
        case 'down':
            leftEyeX = pixelX + eyeOffset;
            leftEyeY = pixelY + GRID_SIZE - eyeOffset - eyeSize;
            rightEyeX = pixelX + GRID_SIZE - eyeOffset - eyeSize;
            rightEyeY = pixelY + GRID_SIZE - eyeOffset - eyeSize;
            pupilOffsetY = pupilSize / 3; // Look down
            break;
        case 'left':
            leftEyeX = pixelX + eyeOffset;
            leftEyeY = pixelY + eyeOffset;
            rightEyeX = pixelX + eyeOffset;
            rightEyeY = pixelY + GRID_SIZE - eyeOffset - eyeSize;
            pupilOffsetX = -pupilSize / 3; // Look left
            break;
        case 'right':
            leftEyeX = pixelX + GRID_SIZE - eyeOffset - eyeSize;
            leftEyeY = pixelY + eyeOffset;
            rightEyeX = pixelX + GRID_SIZE - eyeOffset - eyeSize;
            rightEyeY = pixelY + GRID_SIZE - eyeOffset - eyeSize;
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

// Draw snake tongue at specific pixel position
function drawSnakeTongueAtPosition(head, pixelX, pixelY) {
    const tongueLength = GRID_SIZE * 0.6; // Length of the tongue
    const tongueWidth = GRID_SIZE / 15; // Width of the tongue
    const forkLength = GRID_SIZE * 0.2; // Length of the fork
    const forkAngle = Math.PI / 6; // Angle of the fork (30 degrees)
    
    // Calculate the starting position of the tongue based on direction
    let startX, startY;
    let angleOffset = 0;
    
    // Use the pixel coordinates instead of grid coordinates
    const headDirection = direction; // Using the global direction since head doesn't contain direction info
    switch (headDirection) {
        case 'up':
            startX = pixelX + GRID_SIZE / 2;
            startY = pixelY;
            angleOffset = -Math.PI / 2; // -90 degrees
            break;
        case 'down':
            startX = pixelX + GRID_SIZE / 2;
            startY = pixelY + GRID_SIZE;
            angleOffset = Math.PI / 2; // 90 degrees
            break;
        case 'left':
            startX = pixelX;
            startY = pixelY + GRID_SIZE / 2;
            angleOffset = Math.PI; // 180 degrees
            break;
        case 'right':
            startX = pixelX + GRID_SIZE;
            startY = pixelY + GRID_SIZE / 2;
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