// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Flashcard flip functionality for mobile
document.addEventListener('DOMContentLoaded', () => {
    const flashcards = document.querySelectorAll('.flashcard');
    
    // Add click event for mobile devices
    flashcards.forEach(card => {
        card.addEventListener('click', function() {
            // Toggle flipped class for mobile
            if (window.innerWidth <= 768 || ('ontouchstart' in window)) {
                this.classList.toggle('flipped');
            }
        });
    });
});


// Image Slider for Projects with Enhanced Animations
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const categoryBtns = document.querySelectorAll('.category-btn');
let currentSlide = 0;
let isAnimating = false;
let slideDirection = 'next';

function showSlide(index, direction = 'next') {
    if (isAnimating) return;
    isAnimating = true;
    
    slides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev-animation');
        if (i === index) {
            setTimeout(() => {
                slide.classList.add('active');
                if (direction === 'prev') {
                    slide.classList.add('prev-animation');
                }
                setTimeout(() => {
                    isAnimating = false;
                }, 800);
            }, 50);
        }
    });
}

function nextSlide() {
    if (isAnimating) return;
    slideDirection = 'next';
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide, 'next');
}

function prevSlide() {
    if (isAnimating) return;
    slideDirection = 'prev';
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide, 'prev');
}

// Enhanced button event listeners with haptic feedback simulation
nextBtn.addEventListener('click', () => {
    nextBtn.style.transform = 'translateY(-50%) scale(0.95)';
    setTimeout(() => {
        nextBtn.style.transform = 'translateY(-50%) scale(1.1)';
    }, 100);
    nextSlide();
});

prevBtn.addEventListener('click', () => {
    prevBtn.style.transform = 'translateY(-50%) scale(0.95)';
    setTimeout(() => {
        prevBtn.style.transform = 'translateY(-50%) scale(1.1)';
    }, 100);
    prevSlide();
});

// Project Category Filtering
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const category = btn.dataset.category;
        filterProjects(category);
    });
});

function filterProjects(category) {
    if (isAnimating) return;
    
    const visibleSlides = [];
    slides.forEach((slide, index) => {
        const slideCategory = slide.dataset.category;
        if (category === 'all' || slideCategory === category) {
            visibleSlides.push(index);
        }
    });
    
    if (visibleSlides.length > 0) {
        currentSlide = visibleSlides[0];
        showSlide(currentSlide);
    }
}

// Auto slide with pause on hover
let autoSlideInterval = setInterval(nextSlide, 5000);

const projectsSection = document.querySelector('.projects');
projectsSection.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

projectsSection.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(nextSlide, 5000);
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Initialize first slide
showSlide(0);

// Contact Form Validation
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = this.elements[0].value.trim();
    const email = this.elements[1].value.trim();
    const message = this.elements[2].value.trim();

    let valid = true;

    if (name === '') {
        alert('Please enter your name.');
        valid = false;
    }

    if (email === '') {
        alert('Please enter your email.');
        valid = false;
    } else if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        valid = false;
    }

    if (message === '') {
        alert('Please enter your message.');
        valid = false;
    }

    if (valid) {
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    }
});

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Scroll-triggered Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    document.querySelectorAll('.section-title').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    document.querySelectorAll('.project-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    document.querySelectorAll('.about-text').forEach(el => {
        el.classList.add('slide-in-left');
        observer.observe(el);
    });

    document.querySelectorAll('.skills').forEach(el => {
        el.classList.add('slide-in-right');
        observer.observe(el);
    });
}

// Particle Animation System
function createParticles() {
    const projectsSection = document.querySelector('.projects');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    projectsSection.appendChild(particlesContainer);

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 25000);
    }

    // Create particles periodically
    setInterval(createParticle, 2000);
    
    // Create initial particles
    for (let i = 0; i < 5; i++) {
        setTimeout(createParticle, i * 400);
    }
}

// Enhanced Project Card Interactions
function initProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add subtle rotation and glow effect
            card.style.transform = 'translateY(-15px) scale(1.02) rotateY(5deg)';
            card.style.boxShadow = '0 30px 60px rgba(0,0,0,0.3), 0 0 30px rgba(52, 152, 219, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
        
        // Add click ripple effect
        card.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(52, 152, 219, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 10;
            `;
            
            card.style.position = 'relative';
            card.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple animation keyframes
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Smooth scrolling enhancement for navigation
function enhanceNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
}

// Performance optimization for animations
function optimizeAnimations() {
    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.documentElement.style.setProperty('--animation-duration', '0.3s');
    }
    
    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
        const projectsSection = document.querySelector('.projects');
        if (document.hidden) {
            projectsSection.style.animationPlayState = 'paused';
        } else {
            projectsSection.style.animationPlayState = 'running';
        }
    });
}

// Initialize all enhancements
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    createParticles();
    initProjectInteractions();
    enhanceNavigation();
    optimizeAnimations();
});

// Add loading animation for images
document.querySelectorAll('.project-card img').forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
    });
    
    img.style.opacity = '0';
    img.style.transform = 'scale(1.1)';
    img.style.transition = 'all 0.5s ease';
});