// Interactive Background with "SA God" letters
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Letter particles
    class LetterParticle {
        constructor(x, y, letter) {
            this.x = x;
            this.y = y;
            this.letter = letter;
            this.baseX = x;
            this.baseY = y;
            this.size = Math.random() * 40 + 25; // Bigger letters
            // Split screen: left half green, right half yellow
            this.color = x < canvas.width / 2 ? '#00ff00' : '#ffff00';
            this.angle = Math.random() * Math.PI * 2;
            this.speed = Math.random() * 0.025 + 0.015; // Faster movement
            this.floatRadius = Math.random() * 100 + 80; // Much larger floating area
            this.opacity = Math.random() * 0.4 + 0.15; // Higher opacity
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.04; // Faster rotation
            this.pulsePhase = Math.random() * Math.PI * 2;
            this.pulseSpeed = Math.random() * 0.05 + 0.02; // Faster pulse
            this.velocityX = (Math.random() - 0.5) * 2; // Add velocity
            this.velocityY = (Math.random() - 0.5) * 2;
        }
        
        update(mouseX, mouseY) {
            // Floating animation with rotation
            this.angle += this.speed;
            this.rotation += this.rotationSpeed;
            this.pulsePhase += this.pulseSpeed;
            
            const pulseFactor = 1 + Math.sin(this.pulsePhase) * 0.2;
            const currentFloatRadius = this.floatRadius * pulseFactor;
            
            this.x = this.baseX + Math.cos(this.angle) * currentFloatRadius;
            this.y = this.baseY + Math.sin(this.angle) * currentFloatRadius;
            
            // Mouse interaction - stronger effect
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) { // Larger interaction radius
                const force = (150 - distance) / 150;
                this.x -= dx * force * 0.8; // Stronger repel
                this.y -= dy * force * 0.8;
                
                // Remove color changing - keep letters white
                if (distance < 80) {
                    this.opacity = Math.min(0.9, this.opacity + 0.15);
                    this.size = Math.min(80, this.size + 2); // Grow when near cursor
                } else {
                    this.size = Math.max(25, this.size - 1); // Shrink back
                }
            } else {
                this.opacity = Math.max(0.15, this.opacity - 0.005);
            }
            
            // Update color based on current position
            if (this.x < canvas.width / 2) {
                this.color = '#00ff00'; // Green for left half
            } else {
                this.color = '#ffff00'; // Yellow for right half
            }
            
            // Keep particles on screen with wrapping
            if (this.baseX < -100) this.baseX = canvas.width + 100;
            if (this.baseX > canvas.width + 100) this.baseX = -100;
            if (this.baseY < -100) this.baseY = canvas.height + 100;
            if (this.baseY > canvas.height + 100) this.baseY = -100;
            
            // Return to base position slowly
            this.baseX += (Math.random() - 0.5) * 0.3;
            this.baseY += (Math.random() - 0.5) * 0.3;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            
            // Draw shadow/outline for better visibility
            ctx.shadowColor = this.color === '#000' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            
            // Apply rotation
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            
            ctx.fillStyle = this.color;
            ctx.font = `bold ${this.size}px 'Courier New', monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.letter, 0, 0);
            
            ctx.restore();
        }
    }
    
    // Create more letter particles for fuller effect
    const letters = ['S', 'A', ' ', 'G', 'o', 'd'];
    const particles = [];
    
    function createParticles() {
        const letters = ['S', 'A', 'G', 'O', 'D'];
        const particleCount = window.innerWidth < 768 ? 40 : (window.innerWidth < 480 ? 25 : 80);
        
        particles.length = 0;
        for (let i = 0; i < particleCount; i++) {
            const letter = letters[Math.floor(Math.random() * letters.length)];
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            particles.push(new LetterParticle(x, y, letter));
        }
    }
    createParticles();
    
    // Handle window resize for mobile
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createParticles(); // Recreate particles for new screen size
    });
    
    // Mouse position
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    
    canvas.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Touch support for mobile
    canvas.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
        }
    });
    
    canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
        }
    });
    
    // Animation loop with enhanced background
    function animate() {
        // Full black background
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update(mouseX, mouseY);
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Recreate particles on window resize
    window.addEventListener('resize', createParticles);
    
    // Add smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add subtle hover effects
    const allLinks = document.querySelectorAll('.link, .show-link');
    
    allLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.2s ease';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.2s ease';
        });
    });

    // Add click tracking for analytics (optional)
    const trackableLinks = document.querySelectorAll('a[target="_blank"]');
    
    trackableLinks.forEach(link => {
        link.addEventListener('click', function() {
            // You can add analytics tracking here
            console.log('Link clicked:', this.href);
        });
    });
});
