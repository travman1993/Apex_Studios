/**
 * Apex Studio - Animation Effects
 * Advanced animations and effects for enhanced user experience
 */

// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all animations
  initParallaxEffects();
  initElementAnimations();
  initTextAnimations();
  initImageEffects();
  initButtonEffects();
  initNumberCounters();
  initScrollProgressBar();
});

/**
* Parallax scrolling effects for backgrounds and elements
*/
function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  if (parallaxElements.length) {
      window.addEventListener('scroll', () => {
          const scrollPosition = window.pageYOffset;
          
          parallaxElements.forEach(element => {
              const speed = element.getAttribute('data-parallax-speed') || 0.5;
              const direction = element.getAttribute('data-parallax-direction') || 'down';
              
              let yPos;
              if (direction === 'down') {
                  yPos = -(scrollPosition * speed);
              } else {
                  yPos = (scrollPosition * speed);
              }
              
              element.style.transform = `translateY(${yPos}px)`;
          });
      });
  }
  
  // Hero background parallax
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
      window.addEventListener('scroll', () => {
          const scrollPosition = window.pageYOffset;
          const heroHeight = heroSection.offsetHeight;
          
          // Only apply effect while the hero is visible
          if (scrollPosition < heroHeight) {
              const yPos = scrollPosition * 0.4;
              heroSection.style.backgroundPosition = `center ${yPos}px`;
          }
      });
  }
}

/**
* Element animations on scroll
*/
function initElementAnimations() {
  // Elements to animate when they enter the viewport
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  if (animatedElements.length) {
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  // Get animation type from data attribute or default to 'fade-in'
                  const animationType = entry.target.getAttribute('data-animation') || 'fade-in';
                  
                  // Add the animation class
                  entry.target.classList.add(animationType);
                  
                  // Optional: unobserve after animation is applied
                  if (entry.target.getAttribute('data-animate-once') !== 'false') {
                      observer.unobserve(entry.target);
                  }
              } else if (entry.target.getAttribute('data-animate-once') === 'false') {
                  // Remove animation class if element should animate every time
                  const animationType = entry.target.getAttribute('data-animation') || 'fade-in';
                  entry.target.classList.remove(animationType);
              }
          });
      }, {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
      });
      
      animatedElements.forEach(element => {
          observer.observe(element);
      });
  }
  
  // Staggered animations for groups of elements
  const staggeredGroups = document.querySelectorAll('[data-stagger-group]');
  
  if (staggeredGroups.length) {
      staggeredGroups.forEach(group => {
          const items = group.querySelectorAll('[data-stagger-item]');
          const baseDelay = parseInt(group.getAttribute('data-stagger-base-delay') || 0);
          const increment = parseInt(group.getAttribute('data-stagger-increment') || 100);
          
          items.forEach((item, index) => {
              item.style.animationDelay = `${baseDelay + (index * increment)}ms`;
          });
          
          const observer = new IntersectionObserver((entries) => {
              if (entries[0].isIntersecting) {
                  items.forEach(item => {
                      item.classList.add('animate');
                  });
                  
                  if (group.getAttribute('data-stagger-once') !== 'false') {
                      observer.unobserve(group);
                  }
              } else if (group.getAttribute('data-stagger-once') === 'false') {
                  items.forEach(item => {
                      item.classList.remove('animate');
                  });
              }
          }, {
              threshold: 0.1,
              rootMargin: '0px 0px -50px 0px'
          });
          
          observer.observe(group);
      });
  }
}

/**
* Text animation effects
*/
function initTextAnimations() {
  // Split text animations (letter by letter or word by word)
  const textAnimElements = document.querySelectorAll('.text-anim');
  
  if (textAnimElements.length) {
      textAnimElements.forEach(element => {
          const text = element.textContent;
          const type = element.getAttribute('data-text-anim') || 'letter'; // 'letter' or 'word'
          const delay = parseInt(element.getAttribute('data-text-delay') || 30);
          
          let html = '';
          
          if (type === 'letter') {
              // Split by letters
              for (let i = 0; i < text.length; i++) {
                  if (text[i] === ' ') {
                      html += ' ';
                  } else {
                      html += `<span style="animation-delay: ${i * delay}ms">${text[i]}</span>`;
                  }
              }
          } else {
              // Split by words
              const words = text.split(' ');
              for (let i = 0; i < words.length; i++) {
                  html += `<span style="animation-delay: ${i * delay}ms">${words[i]}</span> `;
              }
          }
          
          element.innerHTML = html;
          
          // Trigger animation when visible
          const observer = new IntersectionObserver((entries) => {
              if (entries[0].isIntersecting) {
                  element.classList.add('animate');
                  observer.unobserve(element);
              }
          }, {
              threshold: 0.1
          });
          
          observer.observe(element);
      });
  }
  
  // Typewriter effect
  const typewriterElements = document.querySelectorAll('.typewriter');
  
  if (typewriterElements.length) {
      typewriterElements.forEach(element => {
          const text = element.getAttribute('data-text') || element.textContent;
          const speed = parseInt(element.getAttribute('data-speed') || 100);
          const cursorSpeed = parseInt(element.getAttribute('data-cursor-speed') || 500);
          
          // Clear the original text
          element.textContent = '';
          
          // Add cursor element
          const cursor = document.createElement('span');
          cursor.className = 'typewriter-cursor';
          cursor.textContent = '|';
          cursor.style.animationDuration = `${cursorSpeed}ms`;
          element.appendChild(cursor);
          
          // Function to type text one character at a time
          const typeText = (text, i = 0) => {
              if (i < text.length) {
                  const char = document.createTextNode(text.charAt(i));
                  element.insertBefore(char, cursor);
                  setTimeout(() => typeText(text, i + 1), speed);
              }
          };
          
          // Start typing when element is visible
          const observer = new IntersectionObserver((entries) => {
              if (entries[0].isIntersecting) {
                  setTimeout(() => {
                      typeText(text);
                  }, 500); // Short delay before starting
                  observer.unobserve(element);
              }
          }, {
              threshold: 0.1
          });
          
          observer.observe(element);
      });
  }
}

/**
* Image animation effects
*/
function initImageEffects() {
  // Image reveal animations
  const revealImages = document.querySelectorAll('.image-reveal');
  
  if (revealImages.length) {
      revealImages.forEach(image => {
          // Create overlay element
          const overlay = document.createElement('div');
          overlay.className = 'reveal-overlay';
          
          // Get direction from data attribute
          const direction = image.getAttribute('data-reveal-direction') || 'left';
          overlay.setAttribute('data-direction', direction);
          
          // Wrap image in container
          const wrapper = document.createElement('div');
          wrapper.className = 'reveal-wrapper';
          
          // Set up DOM structure
          image.parentNode.insertBefore(wrapper, image);
          wrapper.appendChild(image);
          wrapper.appendChild(overlay);
          
          // Trigger animation when visible
          const observer = new IntersectionObserver((entries) => {
              if (entries[0].isIntersecting) {
                  wrapper.classList.add('animate');
                  observer.unobserve(wrapper);
              }
          }, {
              threshold: 0.2
          });
          
          observer.observe(wrapper);
      });
  }
  
  // Lazy load images with fade-in effect
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if (lazyImages.length) {
      const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  const img = entry.target;
                  img.src = img.getAttribute('data-src');
                  
                  img.onload = () => {
                      img.removeAttribute('data-src');
                      img.classList.add('loaded');
                  };
                  
                  imageObserver.unobserve(img);
              }
          });
      }, {
          threshold: 0.1,
          rootMargin: '0px 0px 200px 0px' // Load images before they appear in viewport
      });
      
      lazyImages.forEach(img => {
          imageObserver.observe(img);
      });
  }
}

/**
* Button and interactive element effects
*/
function initButtonEffects() {
  // Ripple effect for buttons
  const rippleButtons = document.querySelectorAll('.btn-ripple');
  
  if (rippleButtons.length) {
      rippleButtons.forEach(button => {
          button.addEventListener('click', function(e) {
              const rect = this.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              
              const ripple = document.createElement('span');
              ripple.className = 'ripple-effect';
              ripple.style.left = `${x}px`;
              ripple.style.top = `${y}px`;
              
              this.appendChild(ripple);
              
              setTimeout(() => {
                  ripple.remove();
              }, 600); // Match the animation duration
          });
      });
  }
  
  // Hover effect for service cards
  const serviceCards = document.querySelectorAll('.service-card');
  
  if (serviceCards.length) {
      serviceCards.forEach(card => {
          card.addEventListener('mouseenter', function() {
              this.classList.add('hover');
          });
          
          card.addEventListener('mouseleave', function() {
              this.classList.remove('hover');
          });
          
          // 3D tilt effect
          if (card.classList.contains('tilt-effect')) {
              card.addEventListener('mousemove', function(e) {
                  const rect = this.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  
                  const xPercent = x / rect.width;
                  const yPercent = y / rect.height;
                  
                  const rotateX = (0.5 - yPercent) * 10;
                  const rotateY = (xPercent - 0.5) * 10;
                  
                  this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
              });
              
              card.addEventListener('mouseleave', function() {
                  this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
              });
          }
      });
  }
}

/**
* Animated number counter effect
*/
function initNumberCounters() {
  const countElements = document.querySelectorAll('.count-up');
  
  if (countElements.length) {
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  const element = entry.target;
                  const target = parseInt(element.getAttribute('data-count'), 10);
                  const duration = parseInt(element.getAttribute('data-duration') || 2000, 10);
                  const formatter = element.getAttribute('data-formatter');
                  
                  let start = 0;
                  const increment = Math.ceil(target / (duration / 16));
                  const startTime = performance.now();
                  
                  const updateCount = (timestamp) => {
                      const elapsed = timestamp - startTime;
                      const progress = Math.min(elapsed / duration, 1);
                      const currentCount = Math.floor(progress * target);
                      
                      // Format the number if needed
                      if (formatter === 'comma') {
                          element.textContent = currentCount.toLocaleString();
                      } else if (formatter === 'percentage') {
                          element.textContent = `${currentCount}%`;
                      } else if (formatter === 'plus') {
                          element.textContent = `+${currentCount}`;
                      } else {
                          element.textContent = currentCount;
                      }
                      
                      if (progress < 1) {
                          requestAnimationFrame(updateCount);
                      }
                  };
                  
                  requestAnimationFrame(updateCount);
                  observer.unobserve(element);
              }
          });
      }, {
          threshold: 0.5
      });
      
      countElements.forEach(element => {
          observer.observe(element);
      });
  }
}

/**
* Scroll progress indicator
*/
function initScrollProgressBar() {
  const progressBar = document.querySelector('.scroll-progress');
  
  if (progressBar) {
      window.addEventListener('scroll', () => {
          const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
          const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrolled = (winScroll / height) * 100;
          
          progressBar.style.width = scrolled + '%';
      });
  }
  
  // Back to top button
  const backToTopBtn = document.querySelector('.back-to-top');
  
  if (backToTopBtn) {
      window.addEventListener('scroll', () => {
          if (window.pageYOffset > 300) {
              backToTopBtn.classList.add('show');
          } else {
              backToTopBtn.classList.remove('show');
          }
      });
      
      backToTopBtn.addEventListener('click', (e) => {
          e.preventDefault();
          window.scrollTo({
              top: 0,
              behavior: 'smooth'
          });
      });
  }
}

/**
* Portfolio image gallery with lightbox
*/
function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (galleryItems.length) {
      // Create lightbox elements
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      
      const lightboxContent = document.createElement('div');
      lightboxContent.className = 'lightbox-content';
      
      const lightboxImage = document.createElement('img');
      lightboxImage.className = 'lightbox-image';
      
      const lightboxClose = document.createElement('button');
      lightboxClose.className = 'lightbox-close';
      lightboxClose.innerHTML = '&times;';
      
      const lightboxCaption = document.createElement('div');
      lightboxCaption.className = 'lightbox-caption';
      
      const lightboxNav = document.createElement('div');
      lightboxNav.className = 'lightbox-nav';
      
      const prevBtn = document.createElement('button');
      prevBtn.className = 'lightbox-prev';
      prevBtn.innerHTML = '&#10094;';
      
      const nextBtn = document.createElement('button');
      nextBtn.className = 'lightbox-next';
      nextBtn.innerHTML = '&#10095;';
      
      // Assemble lightbox structure
      lightboxNav.appendChild(prevBtn);
      lightboxNav.appendChild(nextBtn);
      
      lightboxContent.appendChild(lightboxImage);
      lightboxContent.appendChild(lightboxCaption);
      lightboxContent.appendChild(lightboxClose);
      
      lightbox.appendChild(lightboxContent);
      lightbox.appendChild(lightboxNav);
      
      document.body.appendChild(lightbox);
      
      // Track current image
      let currentIndex = 0;
      
      // Open lightbox function
      const openLightbox = (index) => {
          currentIndex = index;
          const item = galleryItems[currentIndex];
          const imgSrc = item.getAttribute('data-lightbox') || item.querySelector('img').src;
          const caption = item.getAttribute('data-caption') || '';
          
          lightboxImage.src = imgSrc;
          lightboxCaption.textContent = caption;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
      };
      
      // Close lightbox function
      const closeLightbox = () => {
          lightbox.classList.remove('active');
          document.body.style.overflow = '';
      };
      
      // Navigate through images
      const showImage = (index) => {
          if (index < 0) {
              currentIndex = galleryItems.length - 1;
          } else if (index >= galleryItems.length) {
              currentIndex = 0;
          } else {
              currentIndex = index;
          }
          
          const item = galleryItems[currentIndex];
          const imgSrc = item.getAttribute('data-lightbox') || item.querySelector('img').src;
          const caption = item.getAttribute('data-caption') || '';
          
          lightboxImage.classList.add('fade-out');
          
          setTimeout(() => {
              lightboxImage.src = imgSrc;
              lightboxCaption.textContent = caption;
              lightboxImage.classList.remove('fade-out');
          }, 300);
      };
      
      // Event listeners
      galleryItems.forEach((item, index) => {
          item.addEventListener('click', () => {
              openLightbox(index);
          });
      });
      
      lightboxClose.addEventListener('click', closeLightbox);
      
      lightbox.addEventListener('click', (e) => {
          if (e.target === lightbox) {
              closeLightbox();
          }
      });
      
      prevBtn.addEventListener('click', () => {
          showImage(currentIndex - 1);
      });
      
      nextBtn.addEventListener('click', () => {
          showImage(currentIndex + 1);
      });
      
      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
          if (!lightbox.classList.contains('active')) return;
          
          if (e.key === 'Escape') {
              closeLightbox();
          } else if (e.key === 'ArrowLeft') {
              showImage(currentIndex - 1);
          } else if (e.key === 'ArrowRight') {
              showImage(currentIndex + 1);
          }
      });
  }
}

// Initialize lightbox if gallery is present
document.addEventListener('DOMContentLoaded', () => {
  initLightbox();
});
