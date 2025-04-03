// Snake Game Visual Effects

class ParticleSystem {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.particles = [];
    }
    
    createFoodParticles(x, y, color, count = 15) {
        for (let i = 0; i < count; i++) {
            this.particles.push(new Particle(
                x, 
                y, 
                Math.random() * 4 - 2, // velocityX
                Math.random() * 4 - 2, // velocityY
                Math.random() * 5 + 3, // size
                color || '#f1c40f',
                Math.random() * 500 + 500 // lifespan
            ));
        }
    }
    
    update(deltaTime) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.update(deltaTime);
            
            if (particle.isDead()) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    draw() {
        this.particles.forEach(particle => particle.draw(this.ctx));
    }
}

class Particle {
    constructor(x, y, velocityX, velocityY, size, color, lifespan) {
        this.x = x;
        this.y = y;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.size = size;
        this.color = color;
        this.lifespan = lifespan;
        this.age = 0;
        this.gravity = 0.05;
    }
    
    update(deltaTime) {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.velocityY += this.gravity;
        this.age += deltaTime;
        
        // Shrink as it ages
        this.size = Math.max(0, this.size - (deltaTime / 200));
    }
    
    draw(ctx) {
        const opacity = 1 - (this.age / this.lifespan);
        ctx.globalAlpha = opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
    
    isDead() {
        return this.age >= this.lifespan || this.size <= 0;
    }
}

class ScreenFlash {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.opacity = 0;
        this.color = 'white';
        this.active = false;
        this.duration = 300; // milliseconds
        this.currentTime = 0;
    }
    
    flash(color = 'white', duration = 300) {
        this.color = color;
        this.opacity = 0.3;
        this.active = true;
        this.duration = duration;
        this.currentTime = 0;
    }
    
    update(deltaTime) {
        if (!this.active) return;
        
        this.currentTime += deltaTime;
        this.opacity = 0.3 * (1 - (this.currentTime / this.duration));
        
        if (this.currentTime >= this.duration) {
            this.active = false;
            this.opacity = 0;
        }
    }
    
    draw() {
        if (!this.active || this.opacity <= 0) return;
        
        this.ctx.fillStyle = this.color;
        this.ctx.globalAlpha = this.opacity;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalAlpha = 1;
    }
}

// Export the effects classes
window.GameEffects = {
    ParticleSystem,
    ScreenFlash
};