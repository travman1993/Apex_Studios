/**
 * Apex Studio Website
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavigation();
    initAnimations();
    initPortfolioFilter();
    initPortfolioModals();
    initTestimonialSlider();
    initFaqAccordion();
    initContactForm();
    initQuoteForm();
    initStatCounters();
    initSmoothScroll();
});

/**
 * Navigation & Header functionality
 */
function initNavigation() {
    const header = document.querySelector('.header');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks && navLinks.classList.contains('show') && !e.target.closest('nav') && !e.target.closest('#menuToggle')) {
            navLinks.classList.remove('show');
        }
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (header && window.scrollY > 50) {
            header.classList.add('scrolled');
        } else if (header) {
            header.classList.remove('scrolled');
        }
    });
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            item.classList.add('active');
        }
    });
}

/**
 * Scroll animations
 */
function initAnimations() {
    // Fade-in elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        fadeElements.forEach(element => {
            observer.observe(element);
        });
    }
}

/**
 * Portfolio filtering functionality
 */
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length && portfolioItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter value
                const filterValue = button.getAttribute('data-filter');
                
                // Filter portfolio items
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

/**
 * Portfolio modal functionality
 */
function initPortfolioModals() {
    const modalTriggers = document.querySelectorAll('.portfolio-view-btn');
    const modals = document.querySelectorAll('.portfolio-modal');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    
    if (modalTriggers.length && modals.length) {
        // Open modal when clicking on view button
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = trigger.getAttribute('href').substring(1);
                const modal = document.getElementById(modalId);
                
                if (modal) {
                    modal.style.display = 'flex';
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                    
                    // Add animation classes
                    setTimeout(() => {
                        modal.classList.add('show');
                    }, 10);
                }
            });
        });
        
        // Close modal when clicking on close button
        modalCloseButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.portfolio-modal');
                modal.classList.remove('show');
                
                // Remove display after animation completes
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto'; // Re-enable scrolling
                }, 300);
            });
        });
        
        // Close modal when clicking outside content
        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                    
                    // Remove display after animation completes
                    setTimeout(() => {
                        modal.style.display = 'none';
                        document.body.style.overflow = 'auto'; // Re-enable scrolling
                    }, 300);
                }
            });
        });
    }
}

/**
 * Testimonial slider functionality
 */
function initTestimonialSlider() {
    const sliderContainer = document.querySelector('.testimonial-slider');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    
    if (sliderContainer && slides.length > 1) {
        let currentSlide = 0;
        
        // Hide all slides except the first one
        slides.forEach((slide, index) => {
            if (index !== 0) {
                slide.style.display = 'none';
            }
        });
        
        // Show next slide
        const showNextSlide = () => {
            slides[currentSlide].style.display = 'none';
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].style.display = 'block';
        };
        
        // Show previous slide
        const showPrevSlide = () => {
            slides[currentSlide].style.display = 'none';
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            slides[currentSlide].style.display = 'block';
        };
        
        // Event listeners for navigation buttons
        if (nextButton) {
            nextButton.addEventListener('click', showNextSlide);
        }
        
        if (prevButton) {
            prevButton.addEventListener('click', showPrevSlide);
        }
        
        // Auto-rotate slides every 5 seconds
        setInterval(showNextSlide, 5000);
    }
}

/**
 * FAQ accordion functionality
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const toggle = item.querySelector('.faq-toggle');
            
            // Initialize height for CSS transitions
            answer.style.maxHeight = '0px';
            
            question.addEventListener('click', () => {
                // Toggle active class
                item.classList.toggle('active');
                
                // Toggle plus/minus icon
                if (toggle) {
                    toggle.textContent = item.classList.contains('active') ? '−' : '+';
                }
                
                // Toggle answer visibility with smooth animation
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    answer.style.maxHeight = '0px';
                }
                
                // Close other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = '0px';
                        
                        const otherToggle = otherItem.querySelector('.faq-toggle');
                        if (otherToggle) {
                            otherToggle.textContent = '+';
                        }
                    }
                });
            });
        });
    }
}

/**
 * Contact form functionality
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic form validation
            const name = contactForm.querySelector('#contactName').value.trim();
            const email = contactForm.querySelector('#contactEmail').value.trim();
            const subject = contactForm.querySelector('#contactSubject').value.trim();
            const message = contactForm.querySelector('#contactMessage').value.trim();
            
            if (!name || !email || !subject || !message) {
                showFormMessage(contactForm, 'Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormMessage(contactForm, 'Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual form submission in production)
            showFormMessage(contactForm, 'Sending message...', 'info');
            
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Show success message
                showFormMessage(contactForm, 'Message sent successfully! We\'ll get back to you soon.', 'success');
            }, 1500);
        });
    }
}

/**
 * Quote form functionality
 */
function initQuoteForm() {
    const quoteForm = document.getElementById('quoteForm');
    
    if (quoteForm) {
        // Pre-fill service selection from URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const serviceParam = urlParams.get('service');
        
        if (serviceParam) {
            const serviceSelect = document.getElementById('serviceType');
            if (serviceSelect) {
                for (let i = 0; i < serviceSelect.options.length; i++) {
                    if (serviceSelect.options[i].value === serviceParam) {
                        serviceSelect.selectedIndex = i;
                        break;
                    }
                }
            }
        }
        
        // Form submission
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic form validation (simplified for demo)
            const requiredFields = quoteForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValid) {
                showFormMessage(quoteForm, 'Please fill in all required fields.', 'error');
                return;
            }
            
            // Validate email
            const email = quoteForm.querySelector('#email').value.trim();
            if (!isValidEmail(email)) {
                showFormMessage(quoteForm, 'Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual form submission in production)
            showFormMessage(quoteForm, 'Submitting your request...', 'info');
            
            setTimeout(() => {
                // Reset form
                quoteForm.reset();
                
                // Show success message
                showFormMessage(quoteForm, 'Quote request submitted successfully! We\'ll get back to you within 24 hours.', 'success');
            }, 1500);
        });
    }
}

/**
 * Statistics counter animation
 */
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    if (statNumbers.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const target = parseInt(element.getAttribute('data-count'), 10);
                    let count = 0;
                    const duration = 2000; // ms
                    const increment = Math.ceil(target / (duration / 16)); // 16ms is roughly one frame
                    
                    const counter = setInterval(() => {
                        count += increment;
                        if (count >= target) {
                            element.textContent = target;
                            clearInterval(counter);
                        } else {
                            element.textContent = count;
                        }
                    }, 16);
                    
                    observer.unobserve(element);
                }
            });
        }, {
            threshold: 0.5
        });
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }
}

/**
 * Smooth scrolling functionality
 */
function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Only prevent default if it's not a modal link
            if (!link.classList.contains('portfolio-view-btn')) {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    const navLinks = document.querySelector('.nav-links');
                    if (navLinks && navLinks.classList.contains('show')) {
                        navLinks.classList.remove('show');
                    }
                    
                    // Calculate header height for offset
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    
                    // Scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Helper functions
 */

// Display form message
function showFormMessage(form, message, type = 'info') {
    let messageElement = form.querySelector('.form-message');
    
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'form-message';
        form.appendChild(messageElement);
    }
    
    // Set message content and type
    messageElement.textContent = message;
    messageElement.className = `form-message ${type}`;
    
    // Clear error message after 5 seconds
    if (type === 'error') {
        setTimeout(() => {
            messageElement.textContent = '';
            messageElement.className = 'form-message';
        }, 5000);
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}