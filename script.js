// Interactive Background with "SA God" letters
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');
    
    // Mobile performance detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowPerformance = isMobile && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    
    // Set canvas size with mobile optimizations
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Reduce particle count on mobile for better performance
        if (isMobile) {
            particles = createParticles();
        }
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Optimize canvas for mobile
    if (isMobile) {
        canvas.style.touchAction = 'none';
        ctx.imageSmoothingEnabled = false; // Better performance on mobile
    }
    
    // Letter particles
    class LetterParticle {
        constructor(x, y, letter) {
            this.x = x;
            this.y = y;
            this.baseX = x;
            this.baseY = y;
            this.letter = letter;
            this.fontSize = Math.random() * 80 + 8; // Much wider range: 8px to 88px
            this.speed = Math.random() * 3 + 0.5;
            this.floatRadius = Math.random() * 150 + 30;
            this.angle = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.03;
            this.rotation = 0;
            this.pulseSpeed = Math.random() * 0.03 + 0.01;
            this.pulseAngle = Math.random() * Math.PI * 2;
            this.mouseRadius = Math.random() * 100 + 150; 
            this.opacity = Math.random() * 0.7 + 0.1; // More opacity variety
            this.color = this.getRandomColor();
            this.glowIntensity = Math.random() * 40 + 5;
            this.wobbleSpeed = Math.random() * 0.02 + 0.01;
            this.wobbleAngle = 0;
            this.scaleDirection = Math.random() > 0.5 ? 1 : -1;
            this.interactionCount = 0;
        }

        getRandomColor() {
            const colors = ['#00ff00', '#ffff00'];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        update(mouseX, mouseY) {
            this.angle += this.speed * 0.01;
            this.wobbleAngle += this.wobbleSpeed;
            
            // Enhanced floating movement with wobble
            const wobbleX = Math.sin(this.wobbleAngle) * 20;
            const wobbleY = Math.cos(this.wobbleAngle * 1.5) * 15;
            
            this.x = this.baseX + Math.cos(this.angle) * this.floatRadius + wobbleX;
            this.y = this.baseY + Math.sin(this.angle) * this.floatRadius + wobbleY;
            this.rotation += this.rotationSpeed;
            this.pulseAngle += this.pulseSpeed;

            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.mouseRadius) {
                const force = (1 - distance / this.mouseRadius) * 50; 
                const angle = Math.atan2(dy, dx);
                this.x -= Math.cos(angle) * force;
                this.y -= Math.sin(angle) * force;
                
                // Add extra escape velocity and spin
                this.x -= Math.cos(angle) * 15;
                this.y -= Math.sin(angle) * 15;
                this.rotationSpeed += 0.01;
                this.interactionCount++;
                
                // Change color on interaction
                if (this.interactionCount % 10 === 0) {
                    this.color = this.getRandomColor();
                }
            }

            // Enhanced return force with damping
            const returnForceX = (this.baseX - this.x) * 0.02; 
            const returnForceY = (this.baseY - this.y) * 0.02;
            this.x += returnForceX;
            this.y += returnForceY;
            
            // Damping rotation speed
            this.rotationSpeed *= 0.98;

            // Dynamic color based on position and interaction
            const screenHalf = canvas.width / 2;
            if (this.x < screenHalf) {
                this.color = '#00ff00';
            } else {
                this.color = '#ffff00';
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            
            const pulseFactor = 1 + Math.sin(this.pulseAngle) * 0.15;
            const currentSize = this.fontSize * pulseFactor;
            
            ctx.font = `bold ${currentSize}px 'Brush Script MT', 'Comic Sans MS', cursive`;
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            
            // Enhanced glow effect
            ctx.shadowColor = this.color;
            ctx.shadowBlur = this.glowIntensity + Math.sin(this.pulseAngle * 2) * 10;
            ctx.shadowOffsetX = 3;
            ctx.shadowOffsetY = 3;
            
            // Add stroke for extra visibility
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 1;
            ctx.strokeText(this.letter, 0, 0);
            ctx.fillText(this.letter, 0, 0);
            ctx.restore();
        }
    }

    // Create particles
    function createParticles() {
        const letters = ['S', 'A', 'G', 'O', 'D'];
        const particleCount = window.innerWidth < 768 ? 150 : (window.innerWidth < 480 ? 100 : 250);
        
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

    // Handle window resize for mobile
    window.addEventListener('resize', () => {
        resizeCanvas();
        particles = createParticles();
    });

    // Mouse position
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    canvas.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Touch support for mobile with enhanced interactions
    canvas.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            e.preventDefault(); // Prevent scrolling when interacting with canvas
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
        }
    }, { passive: false });

    canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) {
            e.preventDefault(); // prevent scrolling when interacting with canvas
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
            
            // Add touch feedback - create small explosion at touch point
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            
            particles.forEach(particle => {
                const dx = particle.x - touchX;
                const dy = particle.y - touchY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    const force = (1 - distance / 150) * 80;
                    const angle = Math.atan2(dy, dx);
                    particle.x += Math.cos(angle) * force;
                    particle.y += Math.sin(angle) * force;
                    particle.rotationSpeed += 0.05;
                    particle.color = particle.getRandomColor();
                    particle.interactionCount += 3;
                }
            });
        }
    }, { passive: false });

    // Touch end event
    canvas.addEventListener('touchend', (e) => {
        // Reset any touch states if needed
    });

    // Click explosion effect
    canvas.addEventListener('click', (e) => {
        const clickX = e.clientX;
        const clickY = e.clientY;
        
        // Create explosion effect - push nearby particles away
        particles.forEach(particle => {
            const dx = particle.x - clickX;
            const dy = particle.y - clickY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 250) {
                const force = (1 - distance / 250) * 120;
                const angle = Math.atan2(dy, dx);
                particle.x += Math.cos(angle) * force;
                particle.y += Math.sin(angle) * force;
                particle.rotationSpeed += 0.08;
                particle.color = particle.getRandomColor();
                particle.interactionCount += 5;
            }
        });
        
        // Add more new particles at click location
        for (let i = 0; i < 12; i++) {
            const letters = ['S', 'A', 'G', 'O', 'D'];
            const letter = letters[Math.floor(Math.random() * letters.length)];
            const offsetX = (Math.random() - 0.5) * 80;
            const offsetY = (Math.random() - 0.5) * 80;
            particles.push(new LetterParticle(clickX + offsetX, clickY + offsetY, letter));
        }
        
        // Remove excess particles to maintain performance (increased limit)
        if (particles.length > 350) {
            particles.splice(0, particles.length - 350);
        }
    });

    // Animation loop
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

    // Play button functionality
    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Video player would open here');
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
