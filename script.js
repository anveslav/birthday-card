// DOM Elements
const magic8Ball = document.getElementById('magic8Ball');
const ballText = document.getElementById('ballText');
const giftButton = document.getElementById('giftButton');
const modalOverlay = document.getElementById('modalOverlay');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');
const revealButton = document.getElementById('revealButton');
const destinationReveal = document.getElementById('destinationReveal');

// State
let fortuneRevealed = false;
let isShaking = false;

// Fortune messages for the magic 8-ball
const fortuneMessage = "Cбудется сто проц!!!";

// Initialize the app
function init() {
    setupEventListeners();
    createFloatingParticles();
}

// Event Listeners
function setupEventListeners() {
    // Magic 8-Ball interactions
    if (magic8Ball) {
        magic8Ball.addEventListener('click', handleMagic8BallClick);
        
        // Add hover effects
        magic8Ball.addEventListener('mouseenter', () => {
            if (!isShaking) {
                magic8Ball.style.transform = 'scale(1.05) translateY(-5px)';
            }
        });

        magic8Ball.addEventListener('mouseleave', () => {
            if (!isShaking) {
                magic8Ball.style.transform = 'scale(1) translateY(0)';
            }
        });
    }

    // Gift button
    if (giftButton) {
        giftButton.addEventListener('click', openModal);
    }

    // Modal interactions
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', handleModalOverlayClick);
    }

    // Reveal button
    if (revealButton) {
        revealButton.addEventListener('click', revealDestination);
    }
}

// Magic 8-Ball functionality
function handleMagic8BallClick() {
    if (!isShaking && !fortuneRevealed) {
        shakeBall();
    }
}

function shakeBall() {
    isShaking = true;
    magic8Ball.style.pointerEvents = 'none';
    
    // Add shaking animation
    magic8Ball.style.animation = 'shake 0.5s ease-in-out';
    
    // Change text to indicate loading
    if (ballText) {
        ballText.textContent = '...';
        ballText.style.opacity = '0.5';
    }

    setTimeout(() => {
        // Remove shake animation
        magic8Ball.style.animation = '';
        
        // Reveal the fortune with animation
        revealFortune();
        
        isShaking = false;
        fortuneRevealed = true;
        magic8Ball.style.pointerEvents = 'auto';
        
        // Show gift button with delay
        setTimeout(() => {
            showGiftButton();
        }, 1500);
    }, 1000);
}

function revealFortune() {
    if (ballText) {
        ballText.style.opacity = '0';
        
        setTimeout(() => {
            ballText.textContent = fortuneMessage;
            ballText.style.fontSize = '0.7rem';
            ballText.style.opacity = '1';
            ballText.style.animation = 'pulse 1s ease-in-out';
            
            // Add glow effect to the ball
            magic8Ball.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.6)';
            
            // Update instruction text
            const instruction = document.querySelector('.magic-instruction');
            if (instruction) {
                instruction.textContent = 'Я отправил запрос во Вселенную! ✨';
                instruction.style.color = 'rgba(255, 215, 0, 0.8)';
            }
        }, 300);
    }
}

function showGiftButton() {
    if (giftButton) {
        giftButton.style.display = 'block';
        giftButton.style.opacity = '0';
        giftButton.style.transform = 'translateY(20px) scale(0.8)';
        
        setTimeout(() => {
            giftButton.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            giftButton.style.opacity = '1';
            giftButton.style.transform = 'translateY(0) scale(1)';
        }, 100);
    }
}

// Modal functionality
function openModal() {
    if (modalOverlay) {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function handleModalOverlayClick(e) {
    if (e.target === modalOverlay) {
        closeModal();
    }
}

// Destination reveal functionality
function revealDestination() {
    const mysteryBox = document.querySelector('.mystery-box');
    
    if (mysteryBox) {
        mysteryBox.style.opacity = '0';
        mysteryBox.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            mysteryBox.style.display = 'none';
            if (destinationReveal) {
                destinationReveal.style.display = 'block';
                destinationReveal.style.opacity = '0';
                
                // Плавно показываем блок с назначением
                setTimeout(() => {
                    destinationReveal.style.transition = 'opacity 0.5s ease-in-out';
                    destinationReveal.style.opacity = '1';
                }, 50);
            }
            
            // Trigger confetti effect
            createConfettiEffect();
            
        }, 300);
    }
}

// Create floating particles effect
function createFloatingParticles() {
    const particlesContainer = document.querySelector('.floating-particles');
    if (!particlesContainer) return;
    
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning and animation
        const size = Math.random() * 4 + 2;
        const animationDuration = Math.random() * 10 + 5;
        const opacity = Math.random() * 0.5 + 0.1;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(255,255,255,${opacity}) 0%, transparent 70%);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatRandom ${animationDuration}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// Confetti effect for destination reveal
function createConfettiEffect() {
    const confettiContainer = document.createElement('div');
    confettiContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 10000;
    `;
    
    document.body.appendChild(confettiContainer);
    
    const colors = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4ecdc4', '#45b7d1', '#96ceb4'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 10 + 5;
        const startX = Math.random() * window.innerWidth;
        const fallDuration = Math.random() * 2 + 2;
        const rotationDuration = Math.random() * 2 + 1;
        
        confetti.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${startX}px;
            top: -20px;
            animation: 
                confettiFall ${fallDuration}s ease-in forwards,
                confettiRotate ${rotationDuration}s linear infinite;
        `;
        
        confettiContainer.appendChild(confetti);
    }
    
    // Clean up confetti after animation
    setTimeout(() => {
        if (document.body.contains(confettiContainer)) {
            document.body.removeChild(confettiContainer);
        }
    }, 4000);
}

// Add CSS animations dynamically
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* МАКСИМАЛЬНОЕ отключение всех рамок */
        *, *::before, *::after {
            outline: none !important;
            outline-width: 0 !important;
            outline-style: none !important;
            outline-color: transparent !important;
            border: none !important;
            box-shadow: none !important;
            -webkit-appearance: none !important;
            -moz-appearance: none !important;
            appearance: none !important;
        }
        
        *:focus, *:focus-within, *:focus-visible, *:active, *:hover, *:visited, *:target {
            outline: none !important;
            outline-width: 0 !important;
            outline-style: none !important;
            outline-color: transparent !important;
            border: none !important;
            box-shadow: none !important;
            -webkit-focus-ring-color: transparent !important;
        }
        
        /* Убираем ВСЕ возможные рамки для шара */
        #magic8Ball, .magic-8-ball, .magic-8-ball *, .ball-surface, .ball-window {
            outline: none !important;
            border: none !important;
            box-shadow: none !important;
            -webkit-tap-highlight-color: transparent !important;
            -webkit-focus-ring-color: transparent !important;
            -moz-outline: none !important;
            -webkit-appearance: none !important;
            -moz-appearance: none !important;
        }
        
        /* Отключаем tabindex и фокус */
        [tabindex] {
            outline: none !important;
            -webkit-tap-highlight-color: transparent !important;
        }
        
        /* Убираем желтую рамку в Chrome/Safari */
        input, button, select, textarea, div, span, a {
            outline: none !important;
            -webkit-tap-highlight-color: transparent !important;
            -webkit-user-select: none !important;
            -webkit-focus-ring-color: transparent !important;
        }
        
        /* Отключаем выделение текста */
        * {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
            -webkit-tap-highlight-color: transparent !important;
            -webkit-touch-callout: none !important;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
            10% { transform: translateX(-3px) translateY(-2px) rotate(-1deg); }
            20% { transform: translateX(3px) translateY(2px) rotate(1deg); }
            30% { transform: translateX(-3px) translateY(2px) rotate(-1deg); }
            40% { transform: translateX(3px) translateY(-2px) rotate(1deg); }
            50% { transform: translateX(-2px) translateY(-3px) rotate(-0.5deg); }
            60% { transform: translateX(2px) translateY(3px) rotate(0.5deg); }
            70% { transform: translateX(-2px) translateY(1px) rotate(-0.5deg); }
            80% { transform: translateX(2px) translateY(-1px) rotate(0.5deg); }
            90% { transform: translateX(-1px) translateY(-2px) rotate(-0.25deg); }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        @keyframes floatRandom {
            0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
            25% { transform: translateY(-20px) translateX(10px) rotate(90deg); }
            50% { transform: translateY(-10px) translateX(-15px) rotate(180deg); }
            75% { transform: translateY(-30px) translateX(5px) rotate(270deg); }
        }
        
        @keyframes confettiFall {
            to {
                transform: translateY(${window.innerHeight + 100}px);
                opacity: 0;
            }
        }
        
        @keyframes confettiRotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    addDynamicStyles();
    init();
});

// Handle visibility change for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when tab becomes visible
        document.body.style.animationPlayState = 'running';
    }
});

// Touch event handling for mobile
let touchStartTime = 0;

if (magic8Ball) {
    magic8Ball.addEventListener('touchstart', (e) => {
        touchStartTime = Date.now();
        e.preventDefault();
    });

    magic8Ball.addEventListener('touchend', (e) => {
        const touchDuration = Date.now() - touchStartTime;
        if (touchDuration < 500 && !isShaking && !fortuneRevealed) {
            handleMagic8BallClick();
        }
        e.preventDefault();
    });
}

// Preload assets and optimize performance
function preloadAssets() {
    // Preload any fonts or images if needed
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Dancing+Script:wght@700&display=swap';
    link.as = 'style';
    document.head.appendChild(link);
}

// Call preload function
preloadAssets();