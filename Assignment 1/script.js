document.addEventListener('DOMContentLoaded', () => {
    
    // ==================================================
    // 1. SYSTEM CONFIGURATION
    // ==================================================
    const CONFIG = {
        scrollSpeed: 1.5,
        scrollEase: 0.08,      // Inertia friction (Lower = smoother/heavier)
        tiltSensitivity: 15,   // Higher = less tilt
        particleCount: 80,
        skewIntensity: 0.15,   // How much the gallery warps on scroll
        encryptionSpeed: 50    // Speed of hacker text decode
    };

    // DOM Elements
    const body = document.body;
    const galleryWrapper = document.querySelector('.gallery-wrapper');
    const spotlight = document.getElementById('cursor-spotlight');
    const cards = document.querySelectorAll('.card-scene');
    
    // Canvas Elements
    const particleCanvas = document.getElementById('particle-canvas');
    const matrixCanvas = document.getElementById('matrix-canvas');
    const ctxParticles = particleCanvas.getContext('2d');
    const ctxMatrix = matrixCanvas.getContext('2d');

    // State Variables
    let currentScroll = 0;
    let targetScroll = 0;
    let maxScroll = 0;
    let mouseX = 0;
    let mouseY = 0;
    let isMatrixMode = false;
    
    // Easter Egg Buffer
    let keyBuffer = '';
    const secretCode = 'MATRIX';

    // ==================================================
    // 2. INITIALIZATION
    // ==================================================
    function init() {
        resizeCanvases();
        calculateDimensions();
        createParticles();

        // Remove Holographic Loader after 2.5s
        setTimeout(() => {
            body.classList.remove('is-loading');
        }, 2500);
    }

    function calculateDimensions() {
        maxScroll = galleryWrapper.scrollWidth - window.innerWidth;
        targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
    }

    function resizeCanvases() {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
        if (isMatrixMode) setupMatrix();
    }

    window.addEventListener('resize', () => {
        calculateDimensions();
        resizeCanvases();
    });

    // ==================================================
    // 3. FIX: GLITCH-FREE TEXT DECRYPTION
    // ==================================================
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+";

    function runDecryptionEffect(container) {
        // 1. Find the inner formatting tag (b, strong, etc.) to target text directly
        // This prevents overwriting the container and losing the font style
        const targetElement = container.querySelector('b, strong, i, em, mark, small, del, ins, sub, sup') || container;

        // 2. Get cleaned text (no newlines/indentation) from dataset or innerText
        const originalText = targetElement.dataset.value || targetElement.innerText.trim();
        
        // Cache the clean text so we never lose it
        if (!targetElement.dataset.value) targetElement.dataset.value = originalText;

        let iterations = 0;
        
        // Stop any running animation on this element
        if (targetElement.interval) clearInterval(targetElement.interval);

        targetElement.interval = setInterval(() => {
            targetElement.innerText = originalText
                .split("")
                .map((letter, index) => {
                    // 3. CRITICAL FIX: Preserve spaces, don't scramble them
                    if (letter === " ") return " "; 
                    
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("");

            if (iterations >= originalText.length) {
                clearInterval(targetElement.interval);
                targetElement.innerText = originalText; // Ensure exact finish
            }

            iterations += 1 / 3; 
        }, CONFIG.encryptionSpeed);
    }

    // ==================================================
    // 4. MAIN ANIMATION LOOP (PHYSICS ENGINE)
    // ==================================================
    function animate() {
        // A. Inertia Scroll
        const previousScroll = currentScroll;
        currentScroll += (targetScroll - currentScroll) * CONFIG.scrollEase;
        
        // B. Warp Drive (Calculate Velocity)
        const scrollVelocity = currentScroll - previousScroll;
        // Clamp skew between -10 and 10 degrees
        const skewAmount = Math.max(-10, Math.min(10, scrollVelocity * CONFIG.skewIntensity));
        
        // Apply Transform (Translate + Skew)
        galleryWrapper.style.transform = `translate3d(${-currentScroll}px, 0, 0) skewX(${-skewAmount}deg)`;

        // C. Spotlight Tracking
        spotlight.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

        // D. Background Visuals
        if (isMatrixMode) {
            drawMatrix();
        } else {
            ctxParticles.clearRect(0, 0, window.innerWidth, window.innerHeight);
            particles.forEach(p => { p.update(); p.draw(); });
        }

        requestAnimationFrame(animate);
    }

    // ==================================================
    // 5. GLOBAL EVENT LISTENERS
    // ==================================================
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Hijack Vertical Scroll for Horizontal Gallery
    window.addEventListener('wheel', (e) => {
        if (window.innerWidth > 768) {
            targetScroll += e.deltaY * CONFIG.scrollSpeed;
            targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
        }
    });

    // Keyboard Inputs (X-Ray & Matrix)
    window.addEventListener('keydown', (e) => {
        const isEditing = e.target.isContentEditable;
        
        // Toggle X-Ray (Spacebar) - Disable if user is typing
        if (e.code === 'Space' && !isEditing) {
            e.preventDefault();
            body.classList.toggle('x-ray-mode');
        }

        // Matrix Easter Egg Code
        const char = e.key.toUpperCase();
        if (/^[A-Z]$/.test(char)) {
            keyBuffer += char;
            if (keyBuffer.length > secretCode.length) keyBuffer = keyBuffer.slice(-secretCode.length);
            if (keyBuffer === secretCode) {
                toggleMatrixMode();
                keyBuffer = '';
            }
        }
    });

    function toggleMatrixMode() {
        isMatrixMode = !isMatrixMode;
        body.classList.toggle('theme-matrix');
        if (isMatrixMode) {
            setupMatrix();
        } else {
            ctxMatrix.clearRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        }
    }

    // ==================================================
    // 6. CARD INTERACTIONS
    // ==================================================
    cards.forEach(cardScene => {
        const cardObject = cardScene.querySelector('.card-object');
        const editableArea = cardScene.querySelector('.visual-preview');
        const glare = cardScene.querySelector('.card-glare');
        
        // Update dataset when user manually edits text (Keeps hacker effect in sync)
        editableArea.addEventListener('input', (e) => {
            const targetElement = editableArea.querySelector('b, strong, i, em, mark, small, del, ins, sub, sup') || editableArea;
            targetElement.dataset.value = targetElement.innerText.trim();
        });

        // Hover Start
        cardScene.addEventListener('mouseenter', () => {
            // Trigger Decryption if not editing
            if (document.activeElement !== editableArea) {
                runDecryptionEffect(editableArea);
            }
            cardObject.style.transition = 'none'; // Instant movement for Tilt
        });

        // Hover Move (Tilt + Glare Calculation)
        cardScene.addEventListener('mousemove', (e) => {
            if (cardObject.classList.contains('is-flipped')) return;

            const rect = cardScene.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const xVal = e.clientX - centerX;
            const yVal = e.clientY - centerY;

            // 1. Calculate Tilt
            const rotateX = yVal / -CONFIG.tiltSensitivity;
            const rotateY = xVal / CONFIG.tiltSensitivity;

            cardObject.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

            // 2. Calculate Hyper-Real Glare Position
            // Map mouse position (0-100%) to background position
            const mouseXPct = ((e.clientX - rect.left) / rect.width) * 100;
            const mouseYPct = ((e.clientY - rect.top) / rect.height) * 100;
            
            if (glare) {
                glare.style.backgroundPosition = `${mouseXPct}% ${mouseYPct}%`;
            }
        });

        // Hover End
        cardScene.addEventListener('mouseleave', () => {
            if (cardObject.classList.contains('is-flipped')) return;
            // Restore smooth transition for reset
            cardObject.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
            cardObject.style.transform = 'rotateX(0) rotateY(0) scale(1)';
        });

        // Click to Flip
        cardScene.addEventListener('click', (e) => {
            if (editableArea.contains(e.target) || e.target === editableArea) return;
            
            const isFlipped = cardObject.classList.toggle('is-flipped');
            cardObject.style.transition = 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            cardObject.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
        });

        // Prevent Enter key (Newlines) in editable area
        editableArea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                editableArea.blur();
            }
        });
    });

    // ==================================================
    // 7. BACKGROUND FX LOGIC (UNCHANGED)
    // ==================================================
    const particles = [];
    const symbols = ['{', '}', ';', '</>', '*', '||', '&&', '[]'];
    
    class Particle {
        constructor() {
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight;
            this.size = Math.random() * 15 + 8;
            this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.3 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Mouse Repulsion
            const dx = this.x - mouseX;
            const dy = this.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 150) {
                const force = (150 - distance) / 150;
                this.x += (dx / distance) * force * 5;
                this.y += (dy / distance) * force * 5;
            }
            
            // Wrap Screen
            if (this.x > window.innerWidth) this.x = 0;
            if (this.x < 0) this.x = window.innerWidth;
            if (this.y > window.innerHeight) this.y = 0;
            if (this.y < 0) this.y = window.innerHeight;
        }
        draw() {
            ctxParticles.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctxParticles.font = `${this.size}px 'Fira Code'`;
            ctxParticles.fillText(this.symbol, this.x, this.y);
        }
    }

    function createParticles() {
        for (let i = 0; i < CONFIG.particleCount; i++) particles.push(new Particle());
    }

    let matrixColumns = [];
    const fontSize = 16;
    
    function setupMatrix() {
        const columns = matrixCanvas.width / fontSize;
        matrixColumns = [];
        for (let x = 0; x < columns; x++) matrixColumns[x] = 1;
    }

    function drawMatrix() {
        ctxMatrix.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctxMatrix.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        ctxMatrix.fillStyle = '#0F0';
        ctxMatrix.font = fontSize + 'px monospace';
        for (let i = 0; i < matrixColumns.length; i++) {
            const text = String.fromCharCode(0x30A0 + Math.random() * 96);
            ctxMatrix.fillText(text, i * fontSize, matrixColumns[i] * fontSize);
            if (matrixColumns[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) matrixColumns[i] = 0;
            matrixColumns[i]++;
        }
    }

    // Start Engine
    init();
    animate();
});