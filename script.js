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
const fortuneMessage = "Сбудется сто проц";

// Initialize the app
function init() {
    setupEventListeners();
    createFloatingParticles();
}

// Event Listeners
function setupEventListeners() {
    // Magic 8-Ball interactions
    magic8Ball.addEventListener('click', handleMagic8BallClick);
    magic8Ball.addEventListener('keydown', handleMagic8BallKeydown);

    // Gift button
    giftButton.addEventListener('click', openModal);

    // Modal interactions
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', handleModalOverlayClick);
    document.addEventListener('keydown', handleEscapeKey);

    // Reveal button
    revealButton.addEventListener('click', revealDestination);

    // Add hover sound effects (visual feedback)
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

// Magic 8-Ball functionality
function handleMagic8BallClick() {
    if (!isShaking && !fortuneRevealed) {
        shakeBall();
    }
}

function handleMagic8BallKeydown(e) {
    if ((e.key === 'Enter' || e.key === ' ') && !isShaking && !fortuneRevealed) {
        e.preventDefault();
        shakeBall();
    }
}

function shakeBall() {
    isShaking = true;
    magic8Ball.style.pointerEvents = 'none';
    
    // Add shaking animation
    magic8Ball.style.animation = 'shake 0.5s ease-in-out';
    
    // Change text to indicate loading
    ballText.textContent = '...';
    ballText.style.opacity = '0.5';

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
        instruction.textContent = 'Твоя судьба раскрыта! ✨';
        instruction.style.color = 'rgba(255, 215, 0, 0.8)';
    }, 300);
}

function showGiftButton() {
    giftButton.style.display = 'block';
    giftButton.style.opacity = '0';
    giftButton.style.transform = 'translateY(20px) scale(0.8)';
    
    setTimeout(() => {
        giftButton.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        giftButton.style.opacity = '1';
        giftButton.style.transform = 'translateY(0) scale(1)';
    }, 100);
}

// Modal functionality
function openModal() {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus management for accessibility
    setTimeout(() => {
        modalClose.focus();
    }, 300);
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Return focus to gift button
    giftButton.focus();
}

function handleModalOverlayClick(e) {
    if (e.target === modalOverlay) {
        closeModal();
    }
}

function handleEscapeKey(e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
}

// Destination reveal functionality
function revealDestination() {
    const mysteryBox = document.querySelector('.mystery-box');
    
    mysteryBox.style.opacity = '0';
    mysteryBox.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        mysteryBox.style.display = 'none';
        destinationReveal.style.display = 'block';
        
        // Trigger confetti effect
        createConfettiEffect();
        
    }, 300);
}

// Create floating particles effect
function createFloatingParticles() {
    const particlesContainer = document.querySelector('.floating-particles');
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
        document.body.removeChild(confettiContainer);
    }, 4000);
}

// Add CSS animations dynamically
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
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
    optimizeForMobile();
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
let touchStartY = 0;
let touchStartX = 0;

magic8Ball.addEventListener('touchstart', (e) => {
    touchStartTime = Date.now();
    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
    e.preventDefault();
    e.stopPropagation();
});

magic8Ball.addEventListener('touchend', (e) => {
    const touchDuration = Date.now() - touchStartTime;
    const touchEndY = e.changedTouches[0].clientY;
    const touchEndX = e.changedTouches[0].clientX;
    const touchDistanceY = Math.abs(touchEndY - touchStartY);
    const touchDistanceX = Math.abs(touchEndX - touchStartX);
    const totalTouchDistance = Math.sqrt(touchDistanceX * touchDistanceX + touchDistanceY * touchDistanceY);
    
    // Only trigger if it's a tap (not a scroll) and within time limit
    if (touchDuration < 500 && totalTouchDistance < 15 && !isShaking && !fortuneRevealed) {
        handleMagic8BallClick();
    }
    e.preventDefault();
    e.stopPropagation();
});

// Prevent zoom on double tap for mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Add mobile-specific optimizations
function optimizeForMobile() {
    // Force hardware acceleration
    document.body.style.transform = 'translateZ(0)';
    document.body.style.webkitTransform = 'translateZ(0)';
    
    // Improve scrolling performance
    document.body.style.webkitOverflowScrolling = 'touch';
    
    // Add touch event listeners for better mobile interaction
    document.addEventListener('touchmove', function(e) {
        // Allow scrolling but prevent other touch behaviors
        if (e.target.closest('.magic-8-ball') || e.target.closest('.gift-button')) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Improve button touch handling
    const giftBtn = document.getElementById('giftButton');
    if (giftBtn) {
        giftBtn.addEventListener('touchstart', function(e) {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        giftBtn.addEventListener('touchend', function(e) {
            this.style.transform = '';
        });
    }
}

// Detect mobile device
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Enhanced mobile modal handling
function openModal() {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // On mobile, prevent background scrolling
    if (isMobileDevice()) {
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${window.scrollY}px`;
    }
    
    // Focus management for accessibility
    setTimeout(() => {
        modalClose.focus();
    }, 300);
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Restore mobile scrolling
    if (isMobileDevice()) {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        if (scrollY) {
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }
    
    // Return focus to gift button
    giftButton.focus();
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