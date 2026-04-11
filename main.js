// ========================================
// Krishal Modi Portfolio - main.js
// ========================================

// ---- Mobile Menu ----
function closeMenu() {
    var menuToggle = document.getElementById('menu-toggle');
    var menuContainer = document.querySelector('.nav-menu-container');
    if (menuToggle) menuToggle.checked = false;
    if (menuContainer) menuContainer.classList.remove('active');
    document.body.style.overflow = '';
}

// ---- Navbar Scroll Effect ----
var navbarTicking = false;
function updateNavbar() {
    var navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    navbarTicking = false;
}
window.addEventListener('scroll', function() {
    if (!navbarTicking) {
        requestAnimationFrame(updateNavbar);
        navbarTicking = true;
    }
}, { passive: true });

// ---- Active Nav Link on Scroll ----
function setActiveNavLink() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-link');
    var current = '';
    sections.forEach(function(section) {
        if (window.scrollY >= section.offsetTop - 150) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}
window.addEventListener('scroll', setActiveNavLink, { passive: true });

// ---- Back to Top Button ----
function updateBackToTop() {
    var btn = document.getElementById('backToTop');
    if (btn) {
        if (window.scrollY > 400) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    }
}
window.addEventListener('scroll', updateBackToTop, { passive: true });

// ---- Orientation Change ----
window.addEventListener('orientationchange', function() {
    setTimeout(function() {
        var mt = document.getElementById('menu-toggle');
        if (mt && mt.checked) closeMenu();
    }, 500);
});

// ========================================
// DOMContentLoaded - single handler
// ========================================
document.addEventListener('DOMContentLoaded', function() {

    // ---- Nav link animation stagger ----
    var navLinksArray = document.querySelectorAll('.nav-link');
    navLinksArray.forEach(function(link, index) {
        link.style.animationDelay = (0.1 * index) + 's';
    });

    // ---- Smooth Scrolling ----
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            var target = document.querySelector(targetId);
            if (target) {
                var headerOffset = 80;
                var offsetPosition = target.offsetTop - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                closeMenu();
            }
        });
    });

    // ---- Mobile Menu Toggle ----
    var menuToggle = document.getElementById('menu-toggle');
    var menuContainer = document.querySelector('.nav-menu-container');

    if (menuToggle && menuContainer) {
        menuToggle.addEventListener('change', function() {
            if (this.checked) {
                menuContainer.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                menuContainer.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        menuContainer.addEventListener('click', function(e) {
            if (e.target === this) closeMenu();
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuToggle && menuToggle.checked) closeMenu();
    });

    var resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            if (window.innerWidth > 768 && menuToggle && menuToggle.checked) closeMenu();
        }, 250);
    }, { passive: true });

    // ---- Set initial states ----
    setActiveNavLink();
    updateBackToTop();

    // ---- Footer Year ----
    var yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ========================================
    // QUALIFICATION TABS
    // ========================================
    (function() {
        var qTabBtns = document.querySelectorAll('.qualification-tabs .tab-btn');
        var qTabContents = document.querySelectorAll('.qualification-section .tab-content');

        qTabBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                qTabBtns.forEach(function(b) { b.classList.remove('active'); });
                qTabContents.forEach(function(c) { c.classList.remove('active'); });

                btn.classList.add('active');
                var tabId = btn.getAttribute('data-tab') + '-tab';
                var target = document.getElementById(tabId);
                if (target) target.classList.add('active');

                // Re-animate language progress fills
                if (btn.getAttribute('data-tab') === 'languages') {
                    var fills = document.querySelectorAll('.progress-fill');
                    fills.forEach(function(fill) {
                        var w = fill.style.width;
                        fill.style.width = '0';
                        setTimeout(function() { fill.style.width = w; }, 100);
                    });
                }
            });
        });
    })();

    // ========================================
    // SKILL BARS - Animation on Scroll
    // ========================================
    (function() {
        var allSkillItems = document.querySelectorAll('.skill-item');

        function animateBar(item) {
            var bar = item.querySelector('.skill-progress');
            if (!bar) return;
            var level = bar.getAttribute('data-level');
            bar.style.transition = 'none';
            bar.style.width = '0';
            void bar.offsetWidth;
            bar.style.transition = 'width 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            bar.style.width = level;
        }

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    animateBar(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        allSkillItems.forEach(function(item) { observer.observe(item); });

        // ---- Skill Tab Filtering ----
        var skillTabBtns = document.querySelectorAll('.skill-tab-btn');

        skillTabBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                skillTabBtns.forEach(function(b) { b.classList.remove('active'); });
                btn.classList.add('active');

                var category = btn.getAttribute('data-skill-tab');

                allSkillItems.forEach(function(item) {
                    var isMatch = (category === 'all') || (item.getAttribute('data-category') === category);
                    if (isMatch) {
                        item.classList.remove('hidden');
                        setTimeout(function() { animateBar(item); }, 60);
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    })();

    // ========================================
    // TYPING ANIMATION
    // ========================================
    (function() {
        var typingEl = document.getElementById('typing-text');
        if (!typingEl) return;

        var titles = [
            'Backend Developer',
            'Java & Spring Boot Enthusiast',
            'Machine Learning Explorer',
            'Problem Solver'
        ];
        var titleIndex = 0;
        var charIndex = 0;
        var isDeleting = false;

        function typeEffect() {
            var current = titles[titleIndex];
            if (isDeleting) {
                typingEl.textContent = current.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingEl.textContent = current.substring(0, charIndex + 1);
                charIndex++;
            }

            var speed = isDeleting ? 40 : 80;

            if (!isDeleting && charIndex === current.length) {
                speed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                speed = 400;
            }

            setTimeout(typeEffect, speed);
        }

        typeEffect();
    })();

    // ========================================
    // PROJECT CARDS - Scroll Animation
    // ========================================
    (function() {
        var projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(function(card, index) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) ' + (index * 0.1) + 's';
        });

        function animateProjects() {
            projectCards.forEach(function(card) {
                var pos = card.getBoundingClientRect().top;
                if (pos < window.innerHeight / 1.3) {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }
            });
        }

        animateProjects();
        window.addEventListener('scroll', animateProjects, { passive: true });
    })();

    // ========================================
    // SCROLL REVEAL - General Elements
    // ========================================
    (function() {
        var revealElements = document.querySelectorAll(
            '.block-item, .about-text, .contact-method'
        );
        var revealObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach(function(el) {
            el.classList.add('reveal-on-scroll');
            revealObserver.observe(el);
        });
    })();

    // ========================================
    // CONTACT SECTION
    // ========================================
    (function() {
        var contactMethods = document.querySelectorAll('.contact-method');
        contactMethods.forEach(function(method) {
            method.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(15px) scale(1.02)';
            });
            method.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0) scale(1)';
            });
        });

        var emailBtn = document.querySelector('.email-btn');
        if (emailBtn) {
            emailBtn.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                var self = this;
                setTimeout(function() { self.style.transform = 'scale(1)'; }, 150);
            });
        }

        var contactObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        var contactSection = document.querySelector('.contact-section');
        var contactInfo = document.querySelector('.contact-info');
        if (contactSection) contactObserver.observe(contactSection);
        if (contactInfo) contactObserver.observe(contactInfo);
    })();

}); // end DOMContentLoaded
