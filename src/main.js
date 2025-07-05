import { gsap } from "gsap";

import { CustomEase } from "gsap/CustomEase";
// CustomBounce requires CustomEase
import { CustomBounce } from "gsap/CustomBounce";
// CustomWiggle requires CustomEase
import { CustomWiggle } from "gsap/CustomWiggle";
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/EasePack";
    
import { Draggable } from "gsap/Draggable";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { EaselPlugin } from "gsap/EaselPlugin";
import { Flip } from "gsap/Flip";
import { GSDevTools } from "gsap/GSDevTools";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { MotionPathHelper } from "gsap/MotionPathHelper";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { Observer } from "gsap/Observer";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { PhysicsPropsPlugin } from "gsap/PhysicsPropsPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// ScrollSmoother requires ScrollTrigger
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";

// Register all GSAP plugins
gsap.registerPlugin(
    Draggable,
    DrawSVGPlugin,
    EaselPlugin,
    Flip,
    GSDevTools,
    InertiaPlugin,
    MotionPathHelper,
    MotionPathPlugin,
    MorphSVGPlugin,
    Observer,
    Physics2DPlugin,
    PhysicsPropsPlugin,
    PixiPlugin,
    ScrambleTextPlugin,
    ScrollTrigger,
    ScrollSmoother,
    ScrollToPlugin,
    SplitText,
    TextPlugin,
    RoughEase,
    ExpoScaleEase,
    SlowMo,
    CustomEase,
    CustomBounce,
    CustomWiggle
);

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

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('nav__toggle--open');
            navMenu.classList.toggle('nav__menu--open');
        });
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

    // Enhanced Interconnected Nodes System
    console.log('Found particles:', particles.length);
    if (particles.length > 0) {
        // Create SVG canvas for connection lines
        const heroSection = document.querySelector('.hero');
        const svgCanvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgCanvas.style.position = 'absolute';
        svgCanvas.style.top = '0';
        svgCanvas.style.left = '0';
        svgCanvas.style.width = '100%';
        svgCanvas.style.height = '100%';
        svgCanvas.style.zIndex = '4';
        svgCanvas.style.pointerEvents = 'none';
        heroSection.appendChild(svgCanvas);

        // Store particle data
        const particleData = [];

        // Initialize particles
        particles.forEach((particle, index) => {
            const heroRect = heroSection.getBoundingClientRect();
            
            let x, y;
            
            // Create more spaced out distribution with wider gaps
            const cols = Math.ceil(Math.sqrt(particles.length * 2)); // More horizontal spread
            const rows = Math.ceil(particles.length / cols);
            
            const col = index % cols;
            const row = Math.floor(index / cols);
            
            // Create wider grid spacing with padding from edges
            const paddingX = heroRect.width * 0.1; // 10% padding from edges
            const paddingY = heroRect.height * 0.1;
            const usableWidth = heroRect.width - (paddingX * 2);
            const usableHeight = heroRect.height - (paddingY * 2);
            
            const baseX = paddingX + (col / (cols - 1)) * usableWidth;
            const baseY = paddingY + (row / (rows - 1)) * usableHeight;
            
            // Larger random offset for more natural spacing
            const randomOffsetX = (Math.random() - 0.5) * (usableWidth / cols * 1.2);
            const randomOffsetY = (Math.random() - 0.5) * (usableHeight / rows * 1.2);
            
            x = Math.max(paddingX, Math.min(heroRect.width - paddingX, baseX + randomOffsetX));
            y = Math.max(paddingY, Math.min(heroRect.height - paddingY, baseY + randomOffsetY));
            
            // Debug logging for positioning
            console.log(`Particle ${index}: x=${x}, y=${y}, heroWidth=${heroRect.width}`);
            
            gsap.set(particle, {
                x: x,
                y: y,
                scale: Math.random() * 0.5 + 0.7,
                opacity: Math.random() * 0.4 + 0.6,
                visibility: 'visible',
                position: 'absolute',
                left: 0,
                top: 0
            });

            // Store particle data for connections
            particleData.push({
                element: particle,
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                connections: []
            });

            // Create subtle floating animation
            gsap.to(particle, {
                x: `+=${Math.random() * 100 - 50}`,
                y: `+=${Math.random() * 100 - 50}`,
                duration: Math.random() * 15 + 10,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: Math.random() * 5
            });

            // Add subtle pulsing effect
            gsap.to(particle, {
                scale: `+=${Math.random() * 0.3 + 0.1}`,
                opacity: `+=${Math.random() * 0.3 + 0.1}`,
                duration: Math.random() * 4 + 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: Math.random() * 2
            });
        });

        // Create connection lines between nearby particles
        const updateConnections = () => {
            // Clear existing lines
            svgCanvas.innerHTML = '';
            
            particleData.forEach((particle, i) => {
                // Update particle position from DOM
                const rect = particle.element.getBoundingClientRect();
                const heroRect = heroSection.getBoundingClientRect();
                particle.x = rect.left - heroRect.left + rect.width / 2;
                particle.y = rect.top - heroRect.top + rect.height / 2;

                // Check connections to other particles
                for (let j = i + 1; j < particleData.length; j++) {
                    const other = particleData[j];
                    const distance = Math.sqrt(
                        Math.pow(particle.x - other.x, 2) + 
                        Math.pow(particle.y - other.y, 2)
                    );

                    // Connect particles within connection distance
                    if (distance < 150) {
                        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                        line.setAttribute('x1', particle.x);
                        line.setAttribute('y1', particle.y);
                        line.setAttribute('x2', other.x);
                        line.setAttribute('y2', other.y);
                        
                        // Calculate opacity based on distance
                        const opacity = (150 - distance) / 150 * 0.4;
                        line.setAttribute('stroke', `rgba(255, 255, 255, ${opacity})`);
                        line.setAttribute('stroke-width', '1');
                        line.style.filter = `drop-shadow(0 0 3px rgba(255, 255, 255, ${opacity * 0.5}))`;
                        
                        svgCanvas.appendChild(line);
                    }
                }
            });

            requestAnimationFrame(updateConnections);
        };

        // Start connection animation
        updateConnections();

        // Mouse interaction with network
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            const heroRect = heroSection.getBoundingClientRect();
            mouseX = e.clientX - heroRect.left;
            mouseY = e.clientY - heroRect.top;

            // Create temporary connections to mouse
            if (mouseX >= 0 && mouseX <= heroRect.width && mouseY >= 0 && mouseY <= heroRect.height) {
                particleData.forEach((particle) => {
                    const distance = Math.sqrt(
                        Math.pow(mouseX - particle.x, 2) + Math.pow(mouseY - particle.y, 2)
                    );
                    
                    if (distance < 100) {
                        // Create mouse connection line
                        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                        line.setAttribute('x1', particle.x);
                        line.setAttribute('y1', particle.y);
                        line.setAttribute('x2', mouseX);
                        line.setAttribute('y2', mouseY);
                        
                        const opacity = (100 - distance) / 100 * 0.6;
                        line.setAttribute('stroke', `rgba(221, 65, 36, ${opacity})`);
                        line.setAttribute('stroke-width', '2');
                        line.style.filter = `drop-shadow(0 0 5px rgba(221, 65, 36, ${opacity}))`;
                        
                        svgCanvas.appendChild(line);

                        // Attract particle slightly to mouse
                        const force = (100 - distance) / 100 * 0.3;
                        gsap.to(particle.element, {
                            scale: 1 + force * 0.5,
                            duration: 0.2,
                            ease: "power2.out"
                        });
                    }
                });
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

    // Observe other elements for animation
    const animateElements = document.querySelectorAll('.about-section__content, .brand-card-enhanced, .tool-card-enhanced, .engagement-detail, .metric-card');
    animateElements.forEach(el => {
        // Skip headings since we handle them separately
        if (!el.querySelector('h3')) {
            observer.observe(el);
        }
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

    console.log('GSAP loaded and configured with all plugins');
});