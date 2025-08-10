/**
 * MNL-AI Premium Website - Enhanced JavaScript v2.0
 * Modern interactions, smooth animations, perfect mobile UX
 * Built by Tristan Trinidad
 */

(function() {
    'use strict';
    
    // Global state
    let isLoading = true;
    let scrollY = 0;
    let ticking = false;
    
    // Wait for DOM to be ready
    function ready(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    ready(function() {
        console.log('🚀 MNL-AI v2.0 Script Loaded');
        initializeWebsite();
    });

    function initializeWebsite() {
        // Initialize all features
        setupLoadingScreen();
        setupThemeToggle();
        setupMobileMenu();
        setupScrollEffects();
        setupRevealAnimations();
        setupContactForm();
        setupSmoothScrolling();
        setupFloatingCTA();
        setupPremiumEffects();
        setupModal();
        setupCounterAnimations();
        
        // Mark as loaded
        setTimeout(() => {
            isLoading = false;
        }, 1000);
    }

    /* ==========================================================================
       Loading Screen
       ========================================================================== */
    
    function setupLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const body = document.body;
        
        if (!loadingScreen) return;
        
        // Hide loading screen after everything is loaded
        window.addEventListener('load', function() {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                body.classList.remove('loading');
                
                // Remove from DOM after transition
                setTimeout(() => {
                    if (loadingScreen.parentNode) {
                        loadingScreen.remove();
                    }
                }, 300);
            }, 500);
        });
    }

    /* ==========================================================================
       Enhanced Theme Toggle
       ========================================================================== */
    
    function setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        
        if (!themeToggle) {
            console.warn('Theme toggle not found');
            return;
        }

        // Get current theme
        const savedTheme = localStorage.getItem('mnl-theme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

        // Apply initial theme
        applyTheme(initialTheme);

        // Add click handler with enhanced animation
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Add switching animation
            themeToggle.classList.add('switching');
            
            setTimeout(() => {
                applyTheme(newTheme);
                localStorage.setItem('mnl-theme', newTheme);
                themeToggle.classList.remove('switching');
            }, 200);
        });

        function applyTheme(theme) {
            const html = document.documentElement;
            const icon = themeToggle.querySelector('.theme-icon');
            
            if (theme === 'dark') {
                html.setAttribute('data-theme', 'dark');
                if (icon) icon.textContent = '☀️';
                themeToggle.setAttribute('aria-label', 'Switch to light mode');
            } else {
                html.removeAttribute('data-theme');
                if (icon) icon.textContent = '🌙';
                themeToggle.setAttribute('aria-label', 'Switch to dark mode');
            }
        }
    }

    /* ==========================================================================
       Enhanced Mobile Menu
       ========================================================================== */
    
    function setupMobileMenu() {
        const mobileToggle = document.getElementById('mobile-toggle');
        const navMenu = document.getElementById('nav-menu');
        const body = document.body;
        
        if (!mobileToggle || !navMenu) {
            console.warn('Mobile menu elements not found');
            return;
        }

        // Toggle menu
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMenu();
        });

        // Close menu when clicking nav links
        const navLinks = navMenu.querySelectorAll('.nav-link, .cta-btn');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                if (navMenu.classList.contains('active')) {
                    closeMenu();
                }
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });

        function toggleMenu() {
            const isActive = navMenu.classList.contains('active');
            
            if (isActive) {
                closeMenu();
            } else {
                openMenu();
            }
        }

        function openMenu() {
            navMenu.classList.add('active');
            mobileToggle.classList.add('active');
            body.style.overflow = 'hidden';
            mobileToggle.setAttribute('aria-label', 'Close menu');
            mobileToggle.setAttribute('aria-expanded', 'true');
        }

        function closeMenu() {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            body.style.overflow = 'auto';
            mobileToggle.setAttribute('aria-label', 'Open menu');
            mobileToggle.setAttribute('aria-expanded', 'false');
        }
    }

    /* ==========================================================================
       Scroll Effects
       ========================================================================== */
    
    function setupScrollEffects() {
        const navbar = document.getElementById('navbar');
        
        function updateScrollPosition() {
            scrollY = window.pageYOffset;
            
            if (!ticking) {
                requestAnimationFrame(function() {
                    handleScrollEffects();
                    ticking = false;
                });
                ticking = true;
            }
        }

        function handleScrollEffects() {
            // Add scrolled class to navbar
            if (navbar) {
                if (scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
        }

        window.addEventListener('scroll', updateScrollPosition, { passive: true });
    }

    /* ==========================================================================
       Floating CTA Button
       ========================================================================== */
    
    function setupFloatingCTA() {
        const floatingCTA = document.getElementById('floating-cta');
        const heroSection = document.querySelector('.hero');
        
        if (!floatingCTA || !heroSection) return;

        function toggleFloatingCTA() {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            
            if (scrollY > heroBottom) {
                floatingCTA.classList.add('visible');
            } else {
                floatingCTA.classList.remove('visible');
            }
        }

        // Update on scroll
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    toggleFloatingCTA();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    /* ==========================================================================
       Enhanced Reveal Animations
       ========================================================================== */
    
    function setupRevealAnimations() {
        const revealElements = document.querySelectorAll('[data-reveal]');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        const delay = element.getAttribute('data-delay') || 0;
                        
                        setTimeout(function() {
                            element.classList.add('revealed');
                        }, parseFloat(delay) * 1000);
                        
                        observer.unobserve(element);
                    }
                });
            }, {
                rootMargin: '0px 0px -10% 0px',
                threshold: 0.1
            });

            revealElements.forEach(function(element) {
                observer.observe(element);
            });
        } else {
            // Fallback for older browsers
            revealElements.forEach(function(element) {
                element.classList.add('revealed');
            });
        }

        // Safety net - ensure all elements are visible after 3 seconds
        setTimeout(function() {
            revealElements.forEach(function(element) {
                if (!element.classList.contains('revealed')) {
                    element.classList.add('revealed');
                }
            });
        }, 3000);
    }

    /* ==========================================================================
       Counter Animations
       ========================================================================== */
    
    function setupCounterAnimations() {
        const trustNumbers = document.querySelectorAll('.trust-number, .stat-number');
        
        if (trustNumbers.length === 0) return;

        let hasAnimated = false;

        function animateCounters() {
            if (hasAnimated) return;
            hasAnimated = true;

            trustNumbers.forEach(function(number) {
                const finalText = number.textContent.trim();
                const numValue = parseInt(finalText.replace(/[^\d]/g, ''));
                
                if (isNaN(numValue)) return;
                
                const isPercentage = finalText.includes('%');
                const isPlus = finalText.includes('+');
                const isCurrency = finalText.includes('₱');
                const isK = finalText.toLowerCase().includes('k');
                
                let current = 0;
                const increment = numValue / 60;
                const duration = 2000;
                const startTime = Date.now();

                function updateCounter() {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function
                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    current = numValue * easeOutQuart;
                    
                    let displayValue = Math.floor(current);
                    let displayText = displayValue.toString();
                    
                    if (isCurrency && isK) {
                        displayText = '₱' + displayValue + 'k';
                    } else if (isCurrency) {
                        displayText = '₱' + displayValue;
                    } else if (isPercentage) {
                        displayText = displayValue + '%';
                    } else if (isPlus) {
                        displayText = displayValue + '+';
                    } else if (isK) {
                        displayText = displayValue + 'k';
                    }
                    
                    number.textContent = displayText;
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        number.textContent = finalText;
                    }
                }

                updateCounter();
            });
        }

        // Trigger animation when trust indicators are visible
        const firstTrustElement = document.querySelector('.trust-indicators, .about-stats');
        
        if (firstTrustElement && 'IntersectionObserver' in window) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        setTimeout(animateCounters, 500);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(firstTrustElement);
        } else {
            setTimeout(animateCounters, 1000);
        }
    }

    /* ==========================================================================
       Enhanced Contact Form
       ========================================================================== */
    
    function setupContactForm() {
        const form = document.getElementById('contact-form');
        const modal = document.getElementById('success-modal');
        
        if (!form) return;

        // Form validation rules
        const validationRules = {
            name: {
                required: true,
                minLength: 2,
                message: 'Please enter your full name'
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address'
            },
            message: {
                required: true,
                minLength: 10,
                message: 'Please tell us more about your project (minimum 10 characters)'
            }
        };

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm()) {
                return;
            }
            
            submitForm();
        });

        function validateForm() {
            let isValid = true;
            const formData = new FormData(form);
            
            // Remove existing error states
            form.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('error');
                const errorMsg = group.querySelector('.error-message');
                if (errorMsg) errorMsg.remove();
            });

            Object.keys(validationRules).forEach(fieldName => {
                const rule = validationRules[fieldName];
                const field = form.querySelector(`[name="${fieldName}"]`);
                const value = formData.get(fieldName);
                
                if (!field) return;
                
                const formGroup = field.closest('.form-group');
                let fieldValid = true;
                let errorMessage = '';

                // Required validation
                if (rule.required && (!value || value.trim().length === 0)) {
                    fieldValid = false;
                    errorMessage = rule.message;
                }

                // Pattern validation
                if (fieldValid && rule.pattern && !rule.pattern.test(value)) {
                    fieldValid = false;
                    errorMessage = rule.message;
                }

                // Min length validation
                if (fieldValid && rule.minLength && value.trim().length < rule.minLength) {
                    fieldValid = false;
                    errorMessage = rule.message;
                }

                if (!fieldValid) {
                    isValid = false;
                    formGroup.classList.add('error');
                    
                    const errorElement = document.createElement('div');
                    errorElement.className = 'error-message';
                    errorElement.textContent = errorMessage;
                    errorElement.style.cssText = `
                        color: var(--color-error);
                        font-size: var(--font-size-sm);
                        margin-top: var(--space-1);
                    `;
                    formGroup.appendChild(errorElement);
                    
                    field.addEventListener('input', function() {
                        formGroup.classList.remove('error');
                        if (errorElement.parentNode) {
                            errorElement.remove();
                        }
                    }, { once: true });
                }
            });

            return isValid;
        }

        function submitForm() {
            const submitButton = form.querySelector('button[type="submit"]');
            const originalHTML = submitButton.innerHTML;
            const formData = new FormData(form);
            const data = {};
            
            // Show loading state
            submitButton.innerHTML = `
                <div style="display: flex; align-items: center; gap: var(--space-2);">
                    <div style="width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top: 2px solid white; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                    <span>Sending...</span>
                </div>
            `;
            submitButton.disabled = true;

            // Convert FormData to object
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }

            // Send to server
            fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(function(result) {
                if (result.success) {
                    showSuccessModal();
                    form.reset();
                    
                    // Track successful submission
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'form_submit', {
                            event_category: 'Contact',
                            event_label: 'Contact Form'
                        });
                    }
                } else {
                    throw new Error(result.error || 'Something went wrong');
                }
            })
            .catch(function(error) {
                console.error('Form submission error:', error);
                showNotification('Sorry, there was an error sending your message. Please try again or email us directly.', 'error');
            })
            .finally(function() {
                submitButton.innerHTML = originalHTML;
                submitButton.disabled = false;
            });
        }
    }

    /* ==========================================================================
       Success Modal
       ========================================================================== */
    
    function setupModal() {
        const modal = document.getElementById('success-modal');
        const closeBtn = document.getElementById('modal-close');
        const okBtn = document.getElementById('modal-ok');
        
        if (!modal) return;

        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function openModal() {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Close button handlers
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        
        if (okBtn) {
            okBtn.addEventListener('click', closeModal);
        }

        // Close on overlay click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });

        // Make function globally available
        window.showSuccessModal = openModal;
    }

    /* ==========================================================================
       Smooth Scrolling
       ========================================================================== */
    
    function setupSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                if (!targetId) return;
                
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navbarHeight = 80;
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navMenu = document.getElementById('nav-menu');
                    const mobileToggle = document.getElementById('mobile-toggle');
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        mobileToggle.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    }
                }
            });
        });
    }

    /* ==========================================================================
       Premium Effects & Micro-interactions
       ========================================================================== */
    
    function setupPremiumEffects() {
        // Service card hover effects
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(function(card) {
            const icon = card.querySelector('.service-icon');
            
            card.addEventListener('mouseenter', function() {
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                    icon.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
                }
            });

            card.addEventListener('mouseleave', function() {
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });

        // Button magnetic effect
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        buttons.forEach(function(button) {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });

            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        // Add parallax effect to hero background elements
        const heroGradients = document.querySelectorAll('.hero-gradient-1, .hero-gradient-2');
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            heroGradients.forEach(function(gradient, index) {
                const speed = index === 0 ? 0.3 : 0.2;
                gradient.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
            });
        }, { passive: true });
    }

    /* ==========================================================================
       Notification System
       ========================================================================== */
    
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const icons = {
            success: '✅',
            error: '❌', 
            warning: '⚠️',
            info: 'ℹ️'
        };

        const colors = {
            success: '#10B981',
            error: '#EF4444',
            warning: '#F59E0B',
            info: '#3B82F6'
        };

        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--color-background);
            border: 1px solid var(--color-border);
            border-left: 4px solid ${colors[type]};
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-xl);
            padding: 16px;
            max-width: 400px;
            z-index: 1001;
            transform: translateX(100%);
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            font-size: 14px;
            line-height: 1.5;
        `;

        notification.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 12px;">
                <span style="font-size: 18px; flex-shrink: 0;">${icons[type]}</span>
                <span style="flex: 1;">${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="background: none; border: none; font-size: 18px; cursor: pointer; opacity: 0.6; margin-left: 8px; flex-shrink: 0;"
                        aria-label="Close notification">&times;</button>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        // Auto-hide after 5 seconds
        setTimeout(function() {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(function() {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }

    // Make notification function globally available
    window.showNotification = showNotification;

    /* ==========================================================================
       Performance & Accessibility
       ========================================================================== */
    
    // Optimize animations for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Skip to main content on Tab
        if (e.key === 'Tab' && !e.shiftKey && document.activeElement === document.body) {
            const mainContent = document.querySelector('main, .hero, #home');
            if (mainContent) {
                mainContent.focus();
                e.preventDefault();
            }
        }
    });

    // Add focus visible class for better keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('using-keyboard');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('using-keyboard');
    });

    // Error boundary for JavaScript errors
    window.addEventListener('error', function(e) {
        console.error('JavaScript Error:', e.error);
        // Don't break the user experience for non-critical errors
    });
    /* ==================== PORTFOLIO DATA ==================== */
    const PORTFOLIO = [
      {
        id: "realtyhub-website",
        type: "website",
        title: "RealtyHub — AI Website + Lead Capture",
        desc: "Property listing site with contact capture and automated follow-ups.",
        cover: "/public/img/portfolio/realtyhub-cover.webp",
        url: "#"
      },
      {
        id: "planmate-chatbot",
        type: "chatbot",
        title: "PlanMate — Insurance Chatbot",
        desc: "Qualifies leads in Messenger, sends to Sheets, books calls.",
        cover: "/public/img/portfolio/planmate-cover.webp",
        url: "#"
      },
      {
        id: "autoflow-n8n",
        type: "automation",
        title: "AutoFlow — n8n Workflow",
        desc: "Form → Sheets → GPT Tag → Email Confirmation + Telegram alert.",
        cover: "/public/img/portfolio/autoflow-cover.webp",
        url: "#"
      }
    ];

    const TOOLS = [
      { name: "n8n", logo: "/public/img/tools/n8n.svg" },
      { name: "Make.com", logo: "/public/img/tools/make.svg" },
      { name: "OpenAI", logo: "/public/img/tools/openai.svg" },
      { name: "Claude", logo: "/public/img/tools/claude.svg" },
      { name: "ManyChat", logo: "/public/img/tools/manychat.svg" },
      { name: "GoHighLevel", logo: "/public/img/tools/ghl.svg" },
      { name: "Railway", logo: "/public/img/tools/railway.svg" },
      { name: "GitHub", logo: "/public/img/tools/github.svg" },
      { name: "Google Sheets", logo: "/public/img/tools/sheets.svg" },
      { name: "Gmail", logo: "/public/img/tools/gmail.svg" },
      { name: "Framer Motion", logo: "/public/img/tools/framer.svg" },
      { name: "Stripe", logo: "/public/img/tools/stripe.svg" }
    ];

    function renderPortfolio(filter = "all") {
      const grid = document.getElementById("pf-grid");
      if (!grid) return;
      grid.innerHTML = "";
      const items = PORTFOLIO.filter(p => filter === "all" ? true : p.type === filter);
      items.forEach(p => {
        const el = document.createElement("article");
        el.className = "pf-card";
        el.innerHTML = \`
          <img src="\${p.cover}" alt="\${p.title}" loading="lazy">
          <div class="pf-card__body">
            <span class="pf-tag">\${p.type}</span>
            <h3 class="pf-title">\${p.title}</h3>
            <p class="pf-desc">\${p.desc}</p>
            <div class="pf-actions">
              <a class="btn-primary" href="\${p.url}" target="_blank" rel="noopener">View Live</a>
              <button class="btn-secondary" data-view="\${p.id}">Quick View</button>
            </div>
          </div>
        \`;
        grid.appendChild(el);
      });
    }

    function initPortfolioFilters() {
      const bar = document.getElementById("pf-filter");
      if (!bar) return;
      bar.addEventListener("click", (e) => {
        const btn = e.target.closest(".pf-chip");
        if (!btn) return;
        bar.querySelectorAll(".pf-chip").forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        renderPortfolio(btn.dataset.filter);
      });
    }

    function initPortfolioModal() {
      const modal = document.getElementById("pf-modal");
      if (!modal) return;
      const img = document.getElementById("pf-modal-image");
      const title = document.getElementById("pf-modal-title");
      const desc = document.getElementById("pf-modal-desc");
      const link = document.getElementById("pf-modal-link");
      document.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-view]");
        if (btn) {
          const item = PORTFOLIO.find(p => p.id === btn.dataset.view);
          if (!item) return;
          img.src = item.cover; img.alt = item.title;
          title.textContent = item.title;
          desc.textContent = item.desc;
          link.href = item.url || "#";
          modal.classList.add("is-open");
          modal.setAttribute("aria-hidden", "false");
        }
        if (e.target.matches("[data-modal-close]") || e.target.classList.contains("pf-modal__backdrop")) {
          modal.classList.remove("is-open");
          modal.setAttribute("aria-hidden", "true");
        }
      });
    }

    function renderTools() {
      const wrap = document.getElementById("tools-grid");
      if (!wrap) return;
      wrap.innerHTML = "";
      TOOLS.forEach(t => {
        const div = document.createElement("div");
        div.className = "tool";
        div.innerHTML = \`<img src="\${t.logo}" alt="\${t.name} logo" loading="lazy">\`;
        wrap.appendChild(div);
      });
    }

    function initWorkRoute() {
      document.addEventListener("click", (e) => {
        const a = e.target.closest("a[data-nav]");
        if (!a) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        const url = new URL(a.href, window.location.origin);
        if (url.pathname === "/work") {
          history.pushState({}, "", "/work");
          scrollToWork();
        } else {
          window.location.href = a.getAttribute("href");
        }
      });
      if (location.pathname === "/work") {
        scrollToWork();
      }
      window.addEventListener("popstate", () => {
        if (location.pathname === "/work") scrollToWork();
      });
      function scrollToWork() {
        const el = document.getElementById("work");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    // Boot our portfolio + tools without touching other initializers
    document.addEventListener("DOMContentLoaded", function() {
      renderPortfolio();
      initPortfolioFilters();
      initPortfolioModal();
      renderTools();
      initWorkRoute();
    });


    // Log successful initialization
    console.log('✅ MNL-AI Website fully initialized');

})();