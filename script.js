// ========================================
// PERSONAL PORTFOLIO WEBSITE - SCRIPT
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initLoadingPage();
    initLoginModal();
    initNavigation();
    initDateTime();
    initThemeToggle();
    initMusicPlayer();
    initWhatsAppForm();
    initScrollAnimations();
    initMascotInteraction();
    initMobileEnhancements();
});

// ========================================
// 1. LOADING PAGE (3 seconds)
// ========================================
function initLoadingPage() {
    const loadingPage = document.getElementById('loading-page');
    const loginModal = document.getElementById('login-modal');
    const mainContent = document.getElementById('main-content');

    // Show loading page first
    setTimeout(() => {
        // Hide loading page
        loadingPage.classList.add('hidden');
        
        // Show login modal after loading
        setTimeout(() => {
            loginModal.classList.add('active');
        }, 300);
    }, 3000); // 3 seconds loading
}

// ========================================
// 2. LOGIN MODAL - Interactive
// ========================================
function initLoginModal() {
    const loginForm = document.getElementById('login-form');
    const loginModal = document.getElementById('login-modal');
    const mainContent = document.getElementById('main-content');
    const userNameInput = document.getElementById('user-name');
    const userEmailInput = document.getElementById('user-email');
    const mascotSpeech = document.querySelector('.mascot-speech');
    const welcomeName = document.getElementById('welcome-name');
    const displayName = document.getElementById('display-name');
    const footerName = document.getElementById('footer-name');

    // Update mascot speech on input
    userNameInput.addEventListener('input', function() {
        if (this.value.length > 0) {
            mascotSpeech.textContent = `Ohh, ${this.value}! Nama yang bagus! 😄`;
        } else {
            mascotSpeech.textContent = 'Hai! Siapa nama kamu? 😄';
        }
    });

    userEmailInput.addEventListener('focus', function() {
        mascotSpeech.textContent = 'Email-nya juga donk, biar bisa kenalan! 📧';
    });

    userEmailInput.addEventListener('input', function() {
        if (this.value.length > 0) {
            mascotSpeech.textContent = 'Wah, hampir selesai! Klik masuk sekarang! 🎉';
        }
    });

    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = userNameInput.value.trim();
        const email = userEmailInput.value.trim();

        if (name && email) {
            // Hide modal
            loginModal.classList.remove('active');
            
            // Update user info
            welcomeName.textContent = name;
            displayName.textContent = name;
            footerName.textContent = name;
            
            // Show main content
            mainContent.classList.remove('hidden');
            setTimeout(() => {
                mainContent.classList.add('visible');
            }, 100);

            // Show welcome notification
            showNotification(`Welcome, ${name}! Senang bisa kenal denganmu! 🎉`);
        }
    });
}

// ========================================
// 3. NAVIGATION
// ========================================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Smooth scroll to section
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Update active link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');

            // Close mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Update active link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ========================================
// 4. REAL TIME DATE & TIME
// ========================================
function initDateTime() {
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');

    function updateDateTime() {
        const now = new Date();
        
        // Time
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
        
        // Date
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = now.toLocaleDateString('id-ID', options);
        dateElement.textContent = formattedDate;
    }

    // Update every second
    updateDateTime();
    setInterval(updateDateTime, 1000);
}

// ========================================
// 5. THEME TOGGLE (Light/Dark)
// ========================================
function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = themeBtn.querySelector('i');

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeBtn.classList.add('active');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeBtn.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            this.classList.remove('active');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            this.classList.add('active');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// ========================================
// 6. BACKGROUND MUSIC (Gen Z style)
// ========================================
function initMusicPlayer() {
    const musicBtn = document.getElementById('music-toggle');
    const musicIcon = musicBtn.querySelector('i');
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;

    // Set initial volume
    bgMusic.volume = 0.3;

    musicBtn.addEventListener('click', function() {
        if (isPlaying) {
            bgMusic.pause();
            musicIcon.classList.remove('fa-pause');
            musicIcon.classList.add('fa-music');
            this.classList.remove('active');
            showNotification('Music paused 🎵');
        } else {
            bgMusic.play()
                .then(() => {
                    musicIcon.classList.remove('fa-music');
                    musicIcon.classList.add('fa-pause');
                    this.classList.add('active');
                    showNotification('Music playing 🔥');
                })
                .catch(error => {
                    console.log('Audio autoplay blocked:', error);
                    showNotification('Klik lagi untuk memutar musik 🎵');
                });
        }
        isPlaying = !isPlaying;
    });

    // Try to autoplay on first interaction
    document.addEventListener('click', function firstInteraction() {
        bgMusic.play().catch(() => {});
        document.removeEventListener('click', firstInteraction);
    }, { once: true });
}

// ========================================
// 7. WHATSAPP MESSAGE FORM
// ========================================
function initWhatsAppForm() {
    const whatsappForm = document.getElementById('whatsapp-form');
    const msgName = document.getElementById('msg-name');
    const msgContent = document.getElementById('msg-content');

    whatsappForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = msgName.value.trim();
        const message = msgContent.value.trim();

        if (name && message) {
            // Format message for WhatsApp
            const phoneNumber = '6288211971675'; // Format without +
            const formattedMessage = `Halo Fadil! 👋\n\n*Nama:* ${name}\n*Pesan:* ${message}\n\n---\nDikirim dari website portofolio`;
            
            // Encode message
            const encodedMessage = encodeURIComponent(formattedMessage);
            
            // Create WhatsApp URL
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');

            // Show notification
            showNotification('Pesan akan dibuka di WhatsApp! 📱');

            // Reset form
            msgName.value = '';
            msgContent.value = '';
        }
    });
}

// ========================================
// 8. SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.about-card, .social-card, .message-form, .message-info');

    // Add initial class
    animatedElements.forEach(el => {
        el.classList.add('scroll-animate');
    });

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Show all elements immediately if reduced motion is preferred
        animatedElements.forEach(el => {
            el.classList.add('visible');
        });
        return;
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
}

// ========================================
// 9. MASCOT INTERACTION
// ========================================
function initMascotInteraction() {
    const mascots = document.querySelectorAll('.mascot, .mascot-bounce, .mascot-float');
    const speeches = [
        'Halo lagi! 🙋',
        'Lagi ngapain nih? 👀',
        'Cek sosmed aku dong! 📱',
        'Keren abis! 😎',
        'Lets gooo! 🚀',
        'Semangat terus! 💪',
        'Jangan lupa pesan! 💬'
    ];

    mascots.forEach(mascot => {
        // Support both click and touch events
        const handleInteraction = function(e) {
            e.preventDefault();
            const randomSpeech = speeches[Math.floor(Math.random() * speeches.length)];
            showNotification(randomSpeech);
            
            // Bounce animation
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 10);
        };

        mascot.addEventListener('click', handleInteraction);
        mascot.addEventListener('touchend', handleInteraction);
    });
}

// ========================================
// 10. MOBILE ENHANCEMENTS
// ========================================
function initMobileEnhancements() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });

    // Close mobile menu on resize to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 767) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Prevent scroll on mobile when menu is open
    navMenu.addEventListener('touchmove', function(e) {
        if (navMenu.classList.contains('active')) {
            e.preventDefault();
        }
    }, { passive: false });

    // Add active class to nav-link on click for mobile
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Improve touch response for buttons
    const buttons = document.querySelectorAll('.btn, .btn-submit, .btn-whatsapp, .social-card');
    buttons.forEach(btn => {
        btn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        }, { passive: true });
        
        btn.addEventListener('touchend', function() {
            this.style.transform = '';
        }, { passive: true });
    });

    // Handle landscape orientation
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            window.scrollTo(window.scrollX, window.scrollY);
        }, 100);
    });

    // Prevent double-tap zoom on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea');
    let lastTouchEnd = 0;
    
    interactiveElements.forEach(el => {
        el.addEventListener('touchend', function(e) {
            const now = new Date().getTime();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, { passive: false });
    });
}

// ========================================
// 11. NOTIFICATION SYSTEM
// ========================================
function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-bell"></i>
        <span>${message}</span>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        left: 20px;
        background: linear-gradient(135deg, var(--accent-blue), var(--accent-green));
        color: white;
        padding: 15px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 9999;
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
        font-weight: 500;
        font-size: 0.9rem;
        max-width: calc(100% - 40px);
        margin: 0 auto;
    `;

    // Add to body
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    @media (max-width: 480px) {
        .notification {
            left: 10px !important;
            right: 10px !important;
            font-size: 0.85rem !important;
            padding: 12px 15px !important;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// BONUS: Konami Code Easter Egg
// ========================================
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', function(e) {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            showNotification('🎉 EASTER EGG FOUND! Kamu hebat! 🎉');
            konamiIndex = 0;
            
            // Add rainbow effect to page
            document.body.style.animation = 'rainbow 2s linear infinite';
            const rainbowStyle = document.createElement('style');
            rainbowStyle.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(rainbowStyle);
            
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
        }
    } else {
        konamiIndex = 0;
    }
});

// ========================================
// BONUS: Right Click Customization
// ========================================
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    showNotification('© 2024 Dibuat dengan ❤️ oleh Fadil 😄');
});
