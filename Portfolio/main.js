 function closeMenu() {
            const menuToggle = document.getElementById('menu-toggle');
            const menuContainer = document.querySelector('.nav-menu-container');
            
            menuToggle.checked = false;
            menuContainer.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Enhanced scroll effect with throttling
        let ticking = false;

        function updateNavbar() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            ticking = false;
        }

        function requestNavbarUpdate() {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestNavbarUpdate);

        // Active section highlighting
        function setActiveNavLink() {
            const sections = document.querySelectorAll('.content-section');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', setActiveNavLink);

        // Enhanced initialization
        document.addEventListener('DOMContentLoaded', function() {
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach((link, index) => {
                link.style.animationDelay = `${0.1 * index}s`;
            });
            
            // Improved smooth scrolling
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const target = document.querySelector(targetId);
                    
                    if (target) {
                        const headerOffset = 80;
                        const elementPosition = target.offsetTop;
                        const offsetPosition = elementPosition - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });

                        // Close mobile menu if open
                        closeMenu();
                    }
                });
            });
            
            // Enhanced mobile menu toggle
            const menuToggle = document.getElementById('menu-toggle');
            const menuContainer = document.querySelector('.nav-menu-container');
            
            menuToggle.addEventListener('change', function() {
                if (this.checked) {
                    menuContainer.classList.add('active');
                    document.body.style.overflow = 'hidden';
                } else {
                    menuContainer.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
            
            // Close menu when clicking outside or on overlay
            menuContainer.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeMenu();
                }
            });

            // Close menu on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && menuToggle.checked) {
                    closeMenu();
                }
            });

            // Handle window resize
            let resizeTimeout;
            window.addEventListener('resize', function() {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(function() {
                    if (window.innerWidth > 768 && menuToggle.checked) {
                        closeMenu();
                    }
                }, 250);
            });

            // Set initial active section
            setActiveNavLink();
        });

        // Prevent menu from staying open on orientation change
        window.addEventListener('orientationchange', function() {
            setTimeout(function() {
                if (document.getElementById('menu-toggle').checked) {
                    closeMenu();
                }
            }, 500);
        });


















         // Resume download functionality
        function downloadResume() {
            // Replace 'path/to/your/resume.pdf' with the actual path to your resume file
            const resumeUrl = './resources/Krishal-Modi.pdf';
            
            // Create a temporary anchor element to trigger download
            const link = document.createElement('a');
            link.href = resumeUrl;
            link.download = 'Krishal-Modi-Resume.pdf'; // The name for the downloaded file
            
            // Append to body, click, and remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        // Add smooth scrolling for better user experience
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Add parallax effect to floating elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-tech');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });












































document.addEventListener('DOMContentLoaded', function() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    const animateOnScroll = () => {
        skillCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                const progressBar = card.querySelector('.skill-progress');
                const level = progressBar.getAttribute('data-level');
                progressBar.style.setProperty('--level', level);
                card.classList.add('in-view');
            }
        });
    };
    
    // Run immediately on load
    animateOnScroll();
    
    // Run on scroll with immediate execution
    window.addEventListener('scroll', function() {
        animateOnScroll();
    }, { passive: true });
});
























































document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Function to handle tab switching
    function switchTab(tabId) {
        // Remove active class from all buttons and contents
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
        if (activeBtn) activeBtn.classList.add('active');
        
        // Show corresponding content
        const activeContent = document.getElementById(`${tabId}-tab`);
        if (activeContent) activeContent.classList.add('active');
        
        // Trigger animations for the newly shown content
        animateContent(tabId);
    }
    
    // Function to animate content based on tab
    function animateContent(tabId) {
        switch(tabId) {
            case 'education':
                animateTimeline();
                break;
            case 'courses':
                animateCourses();
                break;
            case 'achievements':
                animateAchievements();
                break;
            case 'languages':
                animateLanguages();
                break;
        }
    }
    
    // Add click event to tabs
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            switchTab(tabId);
            
            // For mobile, scroll to top of section after tab change
            if (window.innerWidth <= 768) {
                document.getElementById('qualification').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animation functions
    function animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        resetAndAnimateElements(timelineItems, 'fadeInUp', 0.3);
        
        // Animate timeline line
        const timelineLine = document.querySelector('.timeline');
        if (timelineLine) {
            timelineLine.style.setProperty('--line-animation', 'none');
            void timelineLine.offsetWidth; // Trigger reflow
            timelineLine.style.setProperty('--line-animation', 'lineGrow 1.5s ease-out');
        }
        
        // Animate dots
        const dots = document.querySelectorAll('.timeline-dot');
        dots.forEach(dot => {
            dot.style.animation = 'none';
            void dot.offsetWidth;
            dot.style.animation = 'pulse 2s infinite';
        });
    }
    
    function animateCourses() {
        const courseCards = document.querySelectorAll('.course-card');
        resetAndAnimateElements(courseCards, 'fadeInUp', 0.2);
    }
    
    function animateAchievements() {
        const achievementCards = document.querySelectorAll('.achievement-card');
        resetAndAnimateElements(achievementCards, 'fadeInRight', 0.3);
    }
    
    function animateLanguages() {
        const languageProgresses = document.querySelectorAll('.language-progress');
        resetAndAnimateElements(languageProgresses, 'fadeInUp', 0.2);
        
        // Animate progress bars
        const progressFills = document.querySelectorAll('.progress-fill');
        setTimeout(() => {
            progressFills.forEach(fill => {
                const targetWidth = fill.style.width;
                fill.style.width = '0';
                setTimeout(() => {
                    fill.style.width = targetWidth;
                }, 100);
            });
        }, 500);
    }
    
    // Helper function to reset and animate elements
    function resetAndAnimateElements(elements, animation, delayIncrement) {
        elements.forEach((el, index) => {
            el.style.animation = 'none';
            void el.offsetWidth; // Trigger reflow
            el.style.animation = `${animation} 0.5s forwards ${index * delayIncrement + 0.2}s`;
        });
    }
    
    // Initialize first tab
    switchTab('education');
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Re-trigger animations on resize
            const activeTab = document.querySelector('.tab-btn.active');
            if (activeTab) {
                const tabId = activeTab.getAttribute('data-tab');
                animateContent(tabId);
            }
        }, 250);
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeTab = document.querySelector('.tab-content.active').id.replace('-tab', '');
                animateContent(activeTab);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const qualificationSection = document.querySelector('.qualification-section');
    if (qualificationSection) {
        observer.observe(qualificationSection);
    }
    
    // Create floating particles for background
    function createParticles() {
        const particlesContainer = document.querySelector('.bg-particles');
        const colors = ['rgba(0, 171, 124, 0.3)', 'rgba(59, 130, 246, 0.3)', 'rgba(255, 255, 255, 0.1)'];
        const particleCount = window.innerWidth < 768 ? 10 : 15;
        
        // Clear existing particles
        particlesContainer.querySelectorAll('.particle').forEach(p => p.remove());
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            const size = Math.random() * 5 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Apply properties
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.background = color;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Initialize particles
    createParticles();
    
    // Adjust particles on resize
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(createParticles, 250);
    });
});











































document.addEventListener('DOMContentLoaded', function() {
    // Animation for project cards on scroll
    const projectCards = document.querySelectorAll('.project-card');
    
    const animateOnScroll = () => {
        projectCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) ${index * 0.1}s`;
    });
    
    // Run on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Add ripple effect to buttons
    const projectLinks = document.querySelectorAll('.project-link');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
});

















// Contact & Footer JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Back to Top Button Functionality
    const backToTopButton = document.getElementById('backToTop');
    
    // Show/Hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    // Smooth scroll to top when button is clicked
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Contact Method Hover Effects
    const contactMethods = document.querySelectorAll('.contact-method');
    // Contact & Footer JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Back to Top Button Functionality
    const backToTopButton = document.getElementById('backToTop');
    
    // Show/Hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    // Smooth scroll to top when button is clicked
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Contact Method Hover Effects
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach(method => {
        method.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(15px) scale(1.02)';
        });
        
        method.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });

    // Intersection Observer for Contact Section Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe contact section elements
    const contactSection = document.querySelector('.contact-section');
    const contactInfo = document.querySelector('.contact-info');
    
    if (contactSection) {
        observer.observe(contactSection);
    }
    
    if (contactInfo) {
        observer.observe(contactInfo);
    }

    // Social Links Click Analytics (Optional)
    const socialLinks = document.querySelectorAll('.social-links a, .social-icons a');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.querySelector('i').className;
            console.log(`Social link clicked: ${platform}`);
            // Add analytics tracking here if needed
        });
    });

    // Email Button Click Handler
    const emailBtn = document.querySelector('.email-btn');
    
    if (emailBtn) {
        emailBtn.addEventListener('click', function() {
            // Add a click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }

    // Animated Shapes Movement
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach((shape, index) => {
        // Random movement for each shape
        setInterval(() => {
            const randomX = Math.random() * 20 - 10; // -10 to 10
            const randomY = Math.random() * 20 - 10; // -10 to 10
            
            shape.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + (index * 500)); // Stagger the intervals
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Form Validation (if you add a form later)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Dynamic year update in footer
    const currentYear = new Date().getFullYear();
    const copyrightYear = document.querySelector('.footer-bottom p');
    
    if (copyrightYear && copyrightYear.textContent.includes('2024')) {
        copyrightYear.textContent = copyrightYear.textContent.replace('2024', currentYear);
    }

    // Lazy loading for better performance
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Keyboard accessibility for interactive elements
    const interactiveElements = document.querySelectorAll('.email-btn, .social-links a, .social-icons a, .contact-method');
    
    interactiveElements.forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Performance optimization: Debounced scroll handler
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

    // Parallax effect for floating shapes (optional)
    const parallaxElements = document.querySelectorAll('.floating-shape');
    
    const handleParallax = debounce(() => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        parallaxElements.forEach((element, index) => {
            const speed = parallaxSpeed * (index + 1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }, 10);

    window.addEventListener('scroll', handleParallax);

    // Mobile menu toggle (if needed)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Console log for debugging
    console.log('Contact & Footer JavaScript loaded successfully!');
    
    // Optional: Add contact form functionality
    function initContactForm() {
        const contactForm = document.querySelector('#contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(this);
                const formObject = {};
                
                formData.forEach((value, key) => {
                    formObject[key] = value;
                });
                
                // Basic validation
                if (!formObject.name || !formObject.email || !formObject.message) {
                    alert('Please fill in all required fields.');
                    return;
                }
                
                if (!validateEmail(formObject.email)) {
                    alert('Please enter a valid email address.');
                    return;
                }
                
                // Here you would typically send the data to your server
                console.log('Form submitted:', formObject);
                alert('Thank you for your message! I will get back to you soon.');
                
                // Reset form
                this.reset();
            });
        }
    }
    
    // Initialize contact form if it exists
    initContactForm();
});
});