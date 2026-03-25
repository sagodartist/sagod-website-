// Interactive Background with "SA God" letters - iOS Compatible Version
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');
    
    // Simple iOS detection
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    // Set canvas size - simplified for iOS
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Recreate particles on resize
        if (particles) {
            particles = createParticles();
        }
    }
    
    // Initialize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Simplified Letter particles for iOS compatibility
    class LetterParticle {
        constructor(x, y, letter) {
            this.x = x;
            this.y = y;
            this.baseX = x;
            this.baseY = y;
            this.letter = letter;
            this.fontSize = Math.random() * 40 + 20; // Smaller range for performance
            this.speed = Math.random() * 2 + 1;
            this.floatRadius = Math.random() * 80 + 30; // Smaller radius
            this.angle = Math.random() * Math.PI * 2;
            this.color = Math.random() > 0.5 ? '#00ff00' : '#ffff00';
            this.opacity = Math.random() * 0.5 + 0.3;
        }

        update(mouseX, mouseY) {
            this.angle += this.speed * 0.01;
            this.x = this.baseX + Math.cos(this.angle) * this.floatRadius;
            this.y = this.baseY + Math.sin(this.angle) * this.floatRadius;

            // Simple mouse/touch interaction
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                const force = (1 - distance / 100) * 20;
                const angle = Math.atan2(dy, dx);
                this.x -= Math.cos(angle) * force;
                this.y -= Math.sin(angle) * force;
            }

            // Return to base position
            const returnForceX = (this.baseX - this.x) * 0.02;
            const returnForceY = (this.baseY - this.y) * 0.02;
            this.x += returnForceX;
            this.y += returnForceY;
        }

        draw() {
            ctx.save();
            ctx.font = `bold ${this.fontSize}px Arial`;
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fillText(this.letter, this.x, this.y);
            ctx.restore();
        }
    }

    // Create simplified particles for iOS
    function createParticles() {
        const letters = ['S', 'A', 'G', 'O', 'D'];
        
        // Very low particle count for iOS
        const particleCount = isIOS ? 30 : 50;
        
        const particles = [];
        for (let i = 0; i < particleCount; i++) {
            const letter = letters[Math.floor(Math.random() * letters.length)];
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            particles.push(new LetterParticle(x, y, letter));
        }
        return particles;
    }

    let particles = createParticles();

    // Simple mouse/touch position
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    // Mouse events
    canvas.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Simple touch events for iOS
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (e.touches.length > 0) {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
        }
    });

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (e.touches.length > 0) {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
        }
    });

    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
    });

    // Simple animation loop
    function animate() {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update(mouseX, mouseY);
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }

    animate();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Listen Now button functionality
    document.querySelector('.listen-now-btn').addEventListener('click', function() {
        document.getElementById('music').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

    // Image fallback function for gallery
    function tryImageFallback(img, fallback1, fallback2) {
        if (!img.attempted) {
            img.attempted = true;
            img.src = fallback1;
            img.onerror = function() {
                img.src = fallback2;
                img.onerror = function() {
                    img.style.display = 'none';
                    img.nextElementSibling.style.display = 'flex';
                };
            };
        } else {
            img.style.display = 'none';
            img.nextElementSibling.style.display = 'flex';
        }
    }
});
