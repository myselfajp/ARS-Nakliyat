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

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class when scrolling
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Add animation on scroll for service cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card, .trust-item, .gallery-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Mobile menu toggle (for future implementation)
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('active');
}

// Console info
console.log('ARS Nakliye Website - Developed with care');

// ==========================================
// Hero Slider Functionality
// ==========================================
let currentHeroSlideIndex = 1;
let heroSlideInterval;

// Initialize hero slider
document.addEventListener('DOMContentLoaded', function () {
    showHeroSlide(currentHeroSlideIndex);
    startHeroAutoSlide();

    // Pause auto-slide on hover
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', () => {
            clearInterval(heroSlideInterval);
        });
        heroSlider.addEventListener('mouseleave', () => {
            startHeroAutoSlide();
        });
    }
});

function changeHeroSlide(n) {
    showHeroSlide(currentHeroSlideIndex += n);
    resetHeroAutoSlide();
}

function currentHeroSlide(n) {
    showHeroSlide(currentHeroSlideIndex = n);
    resetHeroAutoSlide();
}

function showHeroSlide(n) {
    const slides = document.getElementsByClassName("hero-slide");
    const dots = document.getElementsByClassName("hero-dot");

    if (!slides.length) return;

    if (n > slides.length) {
        currentHeroSlideIndex = 1;
    }
    if (n < 1) {
        currentHeroSlideIndex = slides.length;
    }

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }

    // Remove active from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    // Show current slide
    slides[currentHeroSlideIndex - 1].classList.add("active");
    if (dots[currentHeroSlideIndex - 1]) {
        dots[currentHeroSlideIndex - 1].classList.add("active");
    }
}

function startHeroAutoSlide() {
    heroSlideInterval = setInterval(() => {
        currentHeroSlideIndex++;
        showHeroSlide(currentHeroSlideIndex);
    }, 7000); // Change slide every 7 seconds
}

function resetHeroAutoSlide() {
    clearInterval(heroSlideInterval);
    startHeroAutoSlide();
}

// Keyboard navigation for hero slider
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        changeHeroSlide(-1);
    } else if (event.key === 'ArrowRight') {
        changeHeroSlide(1);
    }
});

