/**
 * Criminal Law Practice Website - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  initMobileNav();

  // Contact Form Handling
  initContactForm();

  // Smooth Scroll for anchor links
  initSmoothScroll();

  // Active nav link highlighting
  highlightActiveNavLink();
});

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
  const navToggle = document.querySelector('.nav__toggle');
  const navMenu = document.querySelector('.nav__menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      navToggle.setAttribute('aria-expanded',
        navMenu.classList.contains('active'));
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu when pressing Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/**
 * Contact Form Validation and Submission
 */
function initContactForm() {
  const form = document.querySelector('.contact-form');

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Basic validation
      const name = form.querySelector('[name="name"]');
      const email = form.querySelector('[name="email"]');
      const phone = form.querySelector('[name="phone"]');
      const message = form.querySelector('[name="message"]');

      let isValid = true;

      // Clear previous errors
      form.querySelectorAll('.form__error').forEach(el => el.remove());

      // Validate name
      if (!name.value.trim()) {
        showError(name, 'Please enter your name');
        isValid = false;
      }

      // Validate email
      if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
      }

      // Validate message
      if (!message.value.trim()) {
        showError(message, 'Please enter your message');
        isValid = false;
      }

      if (isValid) {
        // In a real implementation, you would submit to a server here
        // For now, show a success message
        showFormSuccess(form);
      }
    });
  }
}

/**
 * Show form field error
 */
function showError(input, message) {
  const error = document.createElement('div');
  error.className = 'form__error';
  error.style.color = '#dc3545';
  error.style.fontSize = '0.875rem';
  error.style.marginTop = '0.25rem';
  error.textContent = message;
  input.parentNode.appendChild(error);
  input.style.borderColor = '#dc3545';
}

/**
 * Show form success message
 */
function showFormSuccess(form) {
  const successMessage = document.createElement('div');
  successMessage.className = 'form__success';
  successMessage.style.padding = '1rem';
  successMessage.style.backgroundColor = '#d4edda';
  successMessage.style.color = '#155724';
  successMessage.style.borderRadius = '4px';
  successMessage.style.marginTop = '1rem';
  successMessage.innerHTML = `
    <strong>Thank you for contacting us!</strong><br>
    We will review your message and get back to you as soon as possible.
  `;

  form.reset();
  form.appendChild(successMessage);

  // Remove success message after 5 seconds
  setTimeout(() => {
    successMessage.remove();
  }, 5000);
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Highlight active navigation link based on current page
 */
function highlightActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav__link');

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage ||
        (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('nav__link--active');
    }
  });
}
