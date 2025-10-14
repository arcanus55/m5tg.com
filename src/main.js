gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
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

    const dropdownToggles = document.querySelectorAll('.nav__dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.closest('.nav__dropdown');

            if (window.innerWidth <= 900) {
                dropdown.classList.toggle('active');
            }
        });
    });

    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('nav__toggle--open');
            navMenu.classList.toggle('nav__menu--open');
            document.body.classList.toggle('menu-open');
        });

        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('nav__menu--open')) {
                if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                    navToggle.classList.remove('nav__toggle--open');
                    navMenu.classList.remove('nav__menu--open');
                    document.body.classList.remove('menu-open');
                }
                if (e.target.classList.contains('nav__link') && !e.target.classList.contains('nav__dropdown-toggle')) {
                    navToggle.classList.remove('nav__toggle--open');
                    navMenu.classList.remove('nav__menu--open');
                    document.body.classList.remove('menu-open');
                }
            }
        });

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

    const nav = document.querySelector('.nav');
    const scrollProgress = document.getElementById('scrollProgress');
    let ticking = false;

    function updateScrollElements() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }

        if (scrollProgress) {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = currentScrollY / docHeight;
            scrollProgress.style.transform = `scaleX(${scrollPercent})`;
        }

        ticking = false;
    }

    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollElements);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestScrollUpdate, { passive: true });

    const heroBackground = document.querySelector('.hero-background');
    const heroOverlay = document.querySelector('.hero-overlay');
    const heroContent = document.querySelector('.hero__content');

    if (heroBackground) {
        gsap.to(heroBackground, {
            yPercent: -15,
            ease: "none",
            force3D: true,
            scrollTrigger: {
                trigger: ".hero",
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
                invalidateOnRefresh: true
            }
        });

        gsap.to(heroOverlay, {
            yPercent: -20,
            ease: "none",
            force3D: true,
            scrollTrigger: {
                trigger: ".hero",
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
                invalidateOnRefresh: true
            }
        });

        gsap.to(heroContent, {
            yPercent: -10,
            ease: "none",
            force3D: true,
            scrollTrigger: {
                trigger: ".hero",
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
                invalidateOnRefresh: true
            }
        });
    }

    gsap.fromTo('.about-section__content h3',
        {
            opacity: 0,
            y: 20
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            force3D: true,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#about",
                start: "top 80%",
                once: true
            }
        }
    );

    gsap.fromTo('.brand-card-clean .brand-logo',
        {
            opacity: 0,
            x: -50
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            force3D: true,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#brands",
                start: "top 80%",
                once: true
            }
        }
    );

    gsap.fromTo('.brand-card-clean .brand-name',
        {
            opacity: 0,
            x: 50
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            force3D: true,
            stagger: 0.2,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#brands",
                start: "top 80%",
                once: true
            }
        }
    );

    gsap.fromTo('.tool-card-clean .tool-logo',
        {
            opacity: 0,
            x: -50
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            force3D: true,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#tools",
                start: "top 80%",
                once: true
            }
        }
    );

    gsap.fromTo('.tool-card-clean .tool-name',
        {
            opacity: 0,
            x: 50
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            force3D: true,
            stagger: 0.2,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#tools",
                start: "top 80%",
                once: true
            }
        }
    );

    gsap.fromTo('.engagement-detail',
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
            force3D: true,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#engagement",
                start: "top 80%",
                once: true
            }
        }
    );

    gsap.fromTo('.metric-card',
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
            force3D: true,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".engagement-metrics",
                start: "top 80%",
                once: true
            }
        }
    );

    gsap.fromTo('.about-section__content',
        {
            opacity: 0,
            y: 30
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            force3D: true,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#about",
                start: "top 75%",
                once: true
            }
        }
    );

    gsap.fromTo('.forward-text',
        {
            x: -100,
            opacity: 0
        },
        {
            x: 0,
            opacity: 1,
            duration: 0.6,
            force3D: true,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".contact",
                start: "top 70%",
                once: true
            }
        }
    );

    const heroTitleLines = document.querySelectorAll('.hero__title-line');
    if (heroTitleLines.length > 0) {
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
                force3D: true,
                stagger: 0.3,
                ease: "power3.out",
                delay: 0.5
            }
        );
    }

    gsap.fromTo('.subbrand-logo',
        {
            opacity: 0,
            y: 20
        },
        {
            opacity: 0.9,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            delay: 1.5
        }
    );

    gsap.fromTo('.timeline-stage',
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
            force3D: true,
            stagger: 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: ".timeline",
                start: "top 80%",
                once: true
            }
        }
    );

    const metrics = document.querySelectorAll('.metric-value');

    ScrollTrigger.create({
        trigger: ".engagement-metrics",
        start: "top 80%",
        once: true,
        onEnter: () => {
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
                        onUpdate: function() {
                            metric.textContent = Math.round(obj.value) + text.replace(/^\d+/, '');
                        }
                    });
                } else if (text.includes('-')) {
                    const [start, end] = text.split('-').map(n => parseInt(n.trim()));
                    const obj = { start: 0, end: 0 };

                    gsap.to(obj, {
                        start: start,
                        end: end,
                        duration: 1.5,
                        ease: "power2.out",
                        onUpdate: function() {
                            metric.textContent = Math.round(obj.start) + '-' + Math.round(obj.end);
                        }
                    });
                }
            });
        }
    });

    const brandLogos = document.querySelectorAll('.brand-card__logo');
    brandLogos.forEach((logo, index) => {
        const logoText = logo.querySelector('.brand-card__logo-text');
        const logoMark = logo.querySelector('.brand-card__logo-mark');

        logo.addEventListener('click', () => {
            gsap.to(logo, {
                scale: 0.95,
                duration: 0.1,
                force3D: true,
                yoyo: true,
                repeat: 1,
                ease: "power2.out"
            });

            gsap.to(logoMark, {
                rotationZ: "+=360",
                duration: 0.8,
                force3D: true,
                ease: "back.out(1.7)"
            });
        });

        logo.addEventListener('mouseenter', () => {
            gsap.to(logoText, {
                letterSpacing: "0.02em",
                duration: 0.3,
                ease: "power2.out"
            });

            gsap.to(logoMark, {
                y: -2,
                duration: 0.3,
                force3D: true,
                ease: "back.out(1.7)"
            });
        });

        logo.addEventListener('mouseleave', () => {
            gsap.to(logoText, {
                letterSpacing: "0em",
                duration: 0.3,
                ease: "power2.out"
            });

            gsap.to(logoMark, {
                y: 0,
                duration: 0.3,
                force3D: true,
                ease: "power2.out"
            });
        });
    });

    const toolsGrid = document.querySelector('.tools__grid');
    const prevBtn = document.querySelector('.tools__nav--prev');
    const nextBtn = document.querySelector('.tools__nav--next');

    if (toolsGrid && prevBtn && nextBtn) {
        const scrollAmount = 344;

        prevBtn.addEventListener('click', () => {
            toolsGrid.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', () => {
            toolsGrid.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        const updateButtonStates = () => {
            const scrollLeft = toolsGrid.scrollLeft;
            const maxScroll = toolsGrid.scrollWidth - toolsGrid.clientWidth;

            prevBtn.style.opacity = scrollLeft <= 0 ? '0.3' : '1';
            prevBtn.style.pointerEvents = scrollLeft <= 0 ? 'none' : 'auto';

            nextBtn.style.opacity = scrollLeft >= maxScroll - 5 ? '0.3' : '1';
            nextBtn.style.pointerEvents = scrollLeft >= maxScroll - 5 ? 'none' : 'auto';
        };

        toolsGrid.addEventListener('scroll', updateButtonStates);
        updateButtonStates();
    }
});
