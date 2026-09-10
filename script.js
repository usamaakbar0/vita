/* ============================================
   VITA RECRUITMENT - VANILLA JAVASCRIPT
   ============================================ */

// Mobile Menu Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Smooth scroll for anchor links (already in CSS with scroll-behavior: smooth)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations - reveal elements as they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards and content blocks as they scroll into view
document.querySelectorAll('.value-card, .team-card, .ct-trust__item, .ct-form-wrap, .hp-contact-details, .hp-contact-form-wrapper').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    const delay = (index % 3) * 0.15; // Stagger delay for grid items
    el.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`;
    observer.observe(el);
});

// Active navigation link highlighting
function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.style.color = 'var(--accent-red)';
        }
    });
}

// Initialize active nav on page load
window.addEventListener('load', updateActiveNav);

// WhatsApp button tracking (optional - for analytics)
const whatsappButton = document.querySelector('.whatsapp-button');
if (whatsappButton) {
    whatsappButton.addEventListener('click', function () {
        console.log('WhatsApp button clicked');
        // Track this event if using analytics
    });
}

// Accessibility: Add keyboard navigation
document.addEventListener('keydown', function (e) {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        if (navMenu && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }

    // Skip to main content on Alt + M
    if (e.altKey && e.key === 'm') {
        document.querySelector('main')?.focus();
    }
});

// Performance: Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle responsive adjustments on resize
window.addEventListener('resize', debounce(function () {
    // Any responsive adjustments needed
}, 250));

// Prefetch next page links for better performance
document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('a[href$=".html"]');
    const pageLinks = Array.from(links)
        .map(link => link.href)
        .filter(href => href && !href.includes('://') && !href.startsWith('javascript'));

    // Create link prefetch tags
    const uniqueLinks = [...new Set(pageLinks)].slice(0, 3); // Prefetch first 3 unique links
    uniqueLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        document.head.appendChild(link);
    });
});

// Add form validation
const formInputs = document.querySelectorAll('input[required], textarea[required], select[required]');
formInputs.forEach(input => {
    input.addEventListener('blur', function () {
        if (!this.value.trim()) {
            this.style.borderColor = '#D01022';
        } else {
            this.style.borderColor = 'var(--light-gray)';
        }
    });
});

// Console message - friendly greeting
console.log('%cWelcome to Vita Recruitment!', 'color: #D01022; font-size: 18px; font-weight: bold;');
console.log('%cBridging the gap between UK businesses and global talent', 'color: #1A1A40; font-size: 14px;');
