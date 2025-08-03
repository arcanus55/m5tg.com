// Use GSAP from CDN (global variables)
// Register plugins that are available
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Initialize your existing JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Use GSAP for smooth scroll instead of native scrollTo
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: targetSection.offsetTop - 80,
                        autoKill: false
                    },
                    ease: "power2.out"
                });
            }
        });
    });

    // Dropdown menu functionality
    const dropdownToggles = document.querySelectorAll('.nav__dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.closest('.nav__dropdown');
            
            // On mobile, toggle the active class
            if (window.innerWidth <= 900) {
                dropdown.classList.toggle('active');
            }
        });
    });

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('nav__toggle--open');
            navMenu.classList.toggle('nav__menu--open');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking on overlay or menu links
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('nav__menu--open')) {
                // Close if clicking outside the menu or on a menu link
                if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                    navToggle.classList.remove('nav__toggle--open');
                    navMenu.classList.remove('nav__menu--open');
                    document.body.classList.remove('menu-open');
                }
                // Close if clicking on a menu link (but not dropdown toggles)
                if (e.target.classList.contains('nav__link') && !e.target.classList.contains('nav__dropdown-toggle')) {
                    navToggle.classList.remove('nav__toggle--open');
                    navMenu.classList.remove('nav__menu--open');
                    document.body.classList.remove('menu-open');
                }
            }
        });

        // Prevent body scroll when menu is open
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (document.body.classList.contains('menu-open')) {
                        document.body.style.overflow = 'hidden';
                    } else {
                        document.body.style.overflow = '';
                    }
                }
            });
        });
        observer.observe(document.body, { attributes: true });
    }

    // Navbar scroll effect
    const nav = document.querySelector('.nav');
    let lastScrollY = window.scrollY;

    function updateNavbar() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }
        
        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', updateNavbar);

    // Scroll Progress Bar
    const updateScrollProgress = () => {
        const scrollProgress = document.getElementById('scrollProgress');
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        
        if (scrollProgress) {
            scrollProgress.style.transform = `scaleX(${scrollPercent})`;
        }
    };

    window.addEventListener('scroll', updateScrollProgress);

    // Enhanced Multi-Layer Parallax System
    const heroBackground = document.querySelector('.hero-background');
    const heroOverlay = document.querySelector('.hero-overlay');
    const heroContent = document.querySelector('.hero__content');
    const particles = document.querySelectorAll('.particle');

    if (heroBackground) {
        // Background moves slower (furthest layer)
        gsap.to(heroBackground, {
            yPercent: -15,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5
            }
        });

        // Overlay moves at medium speed (middle layer)
        gsap.to(heroOverlay, {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                start: "top bottom", 
                end: "bottom top",
                scrub: 1
            }
        });

        // Content moves fastest (foreground layer)
        gsap.to(heroContent, {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                start: "top bottom",
                end: "bottom top", 
                scrub: 0.5
            }
        });
    }



    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Use GSAP for fade-in animation
                gsap.fromTo(entry.target, 
                    { 
                        opacity: 0, 
                        y: 30 
                    },
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 0.8, 
                        ease: "power2.out" 
                    }
                );
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Subtle animation for section headings
    const sectionHeadings = document.querySelectorAll('.about-section__content h3');
    sectionHeadings.forEach((heading, index) => {
        gsap.fromTo(heading, 
            { 
                opacity: 0, 
                y: 20 
            },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.6, 
                ease: "power2.out",
                scrollTrigger: {
                    trigger: heading,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // Staggered reveals for cards
    const staggeredElements = document.querySelectorAll('.brand-card-enhanced, .tool-card-enhanced, .engagement-detail, .metric-card');
    staggeredElements.forEach((el, index) => {
        gsap.fromTo(el, 
            { 
                opacity: 0, 
                y: 40,
                scale: 0.95
            },
            { 
                opacity: 1, 
                y: 0,
                scale: 1,
                duration: 0.6, 
                delay: index * 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // Observe other elements for animation
    const animateElements = document.querySelectorAll('.about-section__content');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Contact section text reveal animation
    const forwardText = document.querySelector('.forward-text');
    if (forwardText) {
        const contactObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Use GSAP for text reveal animation
                    gsap.fromTo(entry.target, 
                        { 
                            x: -100,
                            opacity: 0
                        },
                        { 
                            x: 0,
                            opacity: 1,
                            duration: 0.6,
                            ease: "power2.out"
                        }
                    );
                    entry.target.classList.add('animate');
                    contactObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        contactObserver.observe(forwardText);
    }

    // Hero Title Animation on Load
    const heroTitleLines = document.querySelectorAll('.hero__title-line');
    if (heroTitleLines.length > 0) {
        // Enhanced title entrance
        gsap.fromTo(heroTitleLines, 
            {
                opacity: 0,
                y: 100,
                rotationX: 90
            },
            {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 1.2,
                stagger: 0.3,
                ease: "power3.out",
                delay: 0.5
            }
        );

        // Add subtle floating animation to hero content
        gsap.to(heroContent, {
            y: "+=10",
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    // Enhanced Background Gradient Animation
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        // Create dynamic gradient shift
        gsap.to(heroSection, {
            "--gradient-rotation": "360deg",
            duration: 20,
            repeat: -1,
            ease: "none"
        });
    }

    // Enhanced animations for timeline stages
    const timelineStages = document.querySelectorAll('.timeline-stage');
    timelineStages.forEach((stage, index) => {
        gsap.fromTo(stage,
            {
                opacity: 0,
                y: 50,
                scale: 0.8
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                delay: index * 0.1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: stage,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // Animated Counters for Metrics
    const animateCounters = () => {
        const metrics = document.querySelectorAll('.metric-value');
        
        metrics.forEach(metric => {
            const text = metric.textContent;
            const isNumber = /^\d+/.test(text);
            
            if (isNumber) {
                const finalNumber = parseInt(text);
                const obj = { value: 0 };
                
                gsap.to(obj, {
                    value: finalNumber,
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: metric,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    },
                    onUpdate: function() {
                        metric.textContent = Math.round(obj.value) + text.replace(/^\d+/, '');
                    }
                });
            } else if (text.includes('-')) {
                // Handle ranges like "2-4" or "3-12"
                const [start, end] = text.split('-').map(n => parseInt(n.trim()));
                const obj = { start: 0, end: 0 };
                
                gsap.to(obj, {
                    start: start,
                    end: end,
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: metric,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    },
                    onUpdate: function() {
                        metric.textContent = Math.round(obj.start) + '-' + Math.round(obj.end);
                    }
                });
            }
        });
    };
    
    // Initialize counter animations
    animateCounters();

    // Interactive Brand Logo Animations
    const brandLogos = document.querySelectorAll('.brand-card__logo');
    brandLogos.forEach((logo, index) => {
        const logoText = logo.querySelector('.brand-card__logo-text');
        const logoMark = logo.querySelector('.brand-card__logo-mark');
        
        // Add click animation
        logo.addEventListener('click', () => {
            gsap.to(logo, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.out"
            });
            
            // Add sparkle effect
            gsap.to(logoMark, {
                rotationZ: "+=360",
                duration: 0.8,
                ease: "back.out(1.7)"
            });
        });
        
        // Enhanced hover entrance animation
        logo.addEventListener('mouseenter', () => {
            gsap.to(logoText, {
                letterSpacing: "0.02em",
                duration: 0.3,
                ease: "power2.out"
            });
            
            gsap.to(logoMark, {
                y: -2,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
        });
        
        // Reset on mouse leave
        logo.addEventListener('mouseleave', () => {
            gsap.to(logoText, {
                letterSpacing: "0em",
                duration: 0.3,
                ease: "power2.out"
            });
            
            gsap.to(logoMark, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    console.log('GSAP loaded and configured with all plugins');
});