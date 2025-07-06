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
                // Close if clicking on a menu link
                if (e.target.classList.contains('nav__link')) {
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

    // Create gears for MachVive hero section with delay to ensure proper sizing
    const machviveHero = document.querySelector('.machvive-hero');
    if (machviveHero) {
        // Wait for layout to be complete before creating gears
        setTimeout(() => {
            // Get container dimensions more reliably
            const containerWidth = machviveHero.offsetWidth;
            const containerHeight = machviveHero.offsetHeight;
            const machviveHubX = containerWidth / 2;
            const machviveHubY = containerHeight / 2;
            
            console.log('Creating gears with dimensions:', containerWidth, 'x', containerHeight);
        
        // Create 6 gears for MachVive hero
        for (let i = 0; i < 6; i++) {
            const gear = document.createElement('div');
            
            let x, y, size;
            
            // Position gears around the content with safer coordinates
            if (i < 3) {
                // Orbital gears - keep them closer to center
                const angle = (i / 3) * 2 * Math.PI;
                const radius = Math.min(containerWidth, containerHeight) * 0.25; // Adaptive radius
                x = machviveHubX + Math.cos(angle) * radius;
                y = machviveHubY + Math.sin(angle) * radius;
                size = 80;
            } else {
                // Floating gears - position more conservatively
                const positions = [
                    { x: machviveHubX - containerWidth * 0.3, y: machviveHubY - containerHeight * 0.2 },
                    { x: machviveHubX + containerWidth * 0.3, y: machviveHubY + containerHeight * 0.2 },
                    { x: machviveHubX, y: machviveHubY - containerHeight * 0.3 }
                ];
                const pos = positions[i - 3];
                x = Math.max(50, Math.min(containerWidth - 50, pos.x)); // Keep within bounds
                y = Math.max(50, Math.min(containerHeight - 50, pos.y)); // Keep within bounds
                size = 60;
            }
            
            // Ensure gears are properly styled and visible
            gear.style.cssText = `
                position: absolute;
                left: 0px;
                top: 0px;
                width: ${size}px;
                height: ${size}px;
                z-index: 5;
                opacity: 1;
                pointer-events: none;
                will-change: transform;
            `;
            
            gear.className = 'js-gear';
            
            // Create the same SVG gear
            const teethCount = Math.floor(size / 6);
            const innerRadius = size * 0.25;
            const outerRadius = size * 0.40;
            const toothRadius = size * 0.48;
            const toothWidth = 0.4;
            
            let gearPath = '';
            for (let tooth = 0; tooth < teethCount; tooth++) {
                const baseAngle = (tooth / teethCount) * 2 * Math.PI;
                const toothAngle = (toothWidth / teethCount) * 2 * Math.PI;
                
                const angle1 = baseAngle - toothAngle/2;
                const angle2 = baseAngle - toothAngle/4;
                const angle3 = baseAngle + toothAngle/4;
                const angle4 = baseAngle + toothAngle/2;
                
                const x1 = size/2 + outerRadius * Math.cos(angle1);
                const y1 = size/2 + outerRadius * Math.sin(angle1);
                const x2 = size/2 + toothRadius * Math.cos(angle2);
                const y2 = size/2 + toothRadius * Math.sin(angle2);
                const x3 = size/2 + toothRadius * Math.cos(angle3);
                const y3 = size/2 + toothRadius * Math.sin(angle3);
                const x4 = size/2 + outerRadius * Math.cos(angle4);
                const y4 = size/2 + outerRadius * Math.sin(angle4);
                
                if (tooth === 0) {
                    gearPath += `M ${x1} ${y1}`;
                }
                gearPath += ` L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4}`;
            }
            gearPath += ' Z';
            
            // Technical blueprint gear with neutral MachFiveGroup palette - EXACT COPY
            gear.innerHTML = `
                <svg width="${size}" height="${size}" style="position: absolute; top: 0; left: 0;">
                    <!-- Blueprint background circle -->
                    <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 2}" 
                            fill="none" 
                            stroke="rgba(200, 200, 200, 0.15)" 
                            stroke-width="1" 
                            stroke-dasharray="2,2"/>
                    
                    <!-- Main gear teeth - clean technical lines -->
                    <path d="${gearPath}" 
                          fill="none" 
                          stroke="rgba(220, 220, 220, 0.9)" 
                          stroke-width="2"
                          stroke-linejoin="round"/>
                    
                    <!-- Gear body outline -->
                    <circle cx="${size/2}" cy="${size/2}" r="${outerRadius}" 
                            fill="none" 
                            stroke="rgba(180, 180, 180, 0.7)" 
                            stroke-width="1.5"/>
                    
                    <!-- Technical construction lines -->
                    <g stroke="rgba(150, 150, 150, 0.4)" stroke-width="0.5" fill="none" opacity="0.8">
                        <!-- Centerlines -->
                        <line x1="${size/2 - outerRadius * 1.2}" y1="${size/2}" x2="${size/2 + outerRadius * 1.2}" y2="${size/2}"/>
                        <line x1="${size/2}" y1="${size/2 - outerRadius * 1.2}" x2="${size/2}" y2="${size/2 + outerRadius * 1.2}"/>
                        
                        <!-- Pitch circles -->
                        <circle cx="${size/2}" cy="${size/2}" r="${outerRadius * 0.8}" stroke-dasharray="3,3"/>
                        <circle cx="${size/2}" cy="${size/2}" r="${outerRadius * 0.6}" stroke-dasharray="2,2"/>
                    </g>
                    
                    <!-- Mounting hole pattern -->
                    <g stroke="rgba(200, 200, 200, 0.8)" stroke-width="1" fill="none">
                        ${Array.from({length: 6}, (_, idx) => {
                            const angle = (idx / 6) * 2 * Math.PI;
                            const boltX = size/2 + (innerRadius * 0.8) * Math.cos(angle);
                            const boltY = size/2 + (innerRadius * 0.8) * Math.sin(angle);
                            return `
                                <circle cx="${boltX}" cy="${boltY}" r="3"/>
                                <circle cx="${boltX}" cy="${boltY}" r="1.5" stroke-dasharray="1,1"/>
                            `;
                        }).join('')}
                    </g>
                    
                    <!-- Center bore -->
                    <circle cx="${size/2}" cy="${size/2}" r="${innerRadius}" 
                            fill="none" 
                            stroke="rgba(220, 220, 220, 0.9)" 
                            stroke-width="2"/>
                    
                    <!-- Keyway -->
                    <rect x="${size/2 - 2}" y="${size/2 - innerRadius}" width="4" height="${innerRadius * 0.3}" 
                          fill="none" 
                          stroke="rgba(180, 180, 180, 0.7)" 
                          stroke-width="1"/>
                    
                    <!-- Hub detail -->
                    <circle cx="${size/2}" cy="${size/2}" r="${innerRadius * 0.7}" 
                            fill="none" 
                            stroke="rgba(160, 160, 160, 0.6)" 
                            stroke-width="1"/>
                    
                    <!-- Technical annotations -->
                    <g stroke="rgba(170, 170, 170, 0.6)" stroke-width="0.5" fill="none">
                        <!-- Dimension lines -->
                        <line x1="${size/2 - outerRadius}" y1="${size/2 + outerRadius * 1.3}" x2="${size/2 + outerRadius}" y2="${size/2 + outerRadius * 1.3}"/>
                        <line x1="${size/2 - outerRadius}" y1="${size/2 + outerRadius * 1.25}" x2="${size/2 - outerRadius}" y2="${size/2 + outerRadius * 1.35}"/>
                        <line x1="${size/2 + outerRadius}" y1="${size/2 + outerRadius * 1.25}" x2="${size/2 + outerRadius}" y2="${size/2 + outerRadius * 1.35}"/>
                    </g>
                    
                    <!-- Energy core - subtle neutral accent -->
                    <circle cx="${size/2}" cy="${size/2}" r="${innerRadius * 0.4}" 
                            fill="rgba(255, 255, 255, 0.05)" 
                            stroke="rgba(240, 240, 240, 0.8)" 
                            stroke-width="1.5">
                        <animate attributeName="stroke-opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite"/>
                    </circle>
                    
                    <!-- Center point -->
                    <circle cx="${size/2}" cy="${size/2}" r="2" 
                            fill="rgba(230, 230, 230, 0.9)"/>
                    
                    <!-- Gear specifications text -->
                    <text x="${size/2}" y="${size/2 + outerRadius * 1.6}" 
                          font-family="monospace" 
                          font-size="8" 
                          fill="rgba(180, 180, 180, 0.7)" 
                          text-anchor="middle">
                        ${teethCount}T | M${Math.round(size/10)}
                    </text>
                    
                    <!-- Drawing title block -->
                    <g transform="translate(${size * 0.05}, ${size * 0.85})">
                        <rect width="${size * 0.4}" height="${size * 0.12}" 
                              fill="none" 
                              stroke="rgba(160, 160, 160, 0.5)" 
                              stroke-width="0.5"/>
                        <text x="${size * 0.02}" y="${size * 0.06}" 
                              font-family="monospace" 
                              font-size="6" 
                              fill="rgba(190, 190, 190, 0.8)">
                            GEAR-${String(i).padStart(2, '0')}
                        </text>
                    </g>
                </svg>
            `;
            
            // Position with GSAP
            gsap.set(gear, {
                x: x,
                y: y,
                transformOrigin: 'center center'
            });
            
            // Add rotation animation
            gsap.to(gear, {
                rotation: 360,
                duration: 15 + i * 3,
                repeat: -1,
                ease: "none"
            });
            
            machviveHero.appendChild(gear);
        }

        // Create energy beam canvas for MachVive hero
        const machviveSvgCanvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        machviveSvgCanvas.style.position = 'absolute';
        machviveSvgCanvas.style.top = '0';
        machviveSvgCanvas.style.left = '0';
        machviveSvgCanvas.style.width = '100%';
        machviveSvgCanvas.style.height = '100%';
        machviveSvgCanvas.style.zIndex = '4';
        machviveSvgCanvas.style.pointerEvents = 'none';
        machviveHero.appendChild(machviveSvgCanvas);

        // Store gear data for MachVive
        const machviveGearData = [];
        const machviveGears = machviveHero.querySelectorAll('div[style*="position: absolute"]');
        
        machviveGears.forEach((gear, index) => {
            if (gear.innerHTML.includes('svg')) {
                const transform = gear.style.transform;
                const translateMatch = transform.match(/translate3d\(([^,]+),\s*([^,]+),/);
                if (translateMatch) {
                    const x = parseFloat(translateMatch[1]);
                    const y = parseFloat(translateMatch[2]);
                    const size = parseInt(gear.style.width);
                    
                    machviveGearData.push({
                        element: gear,
                        x: x + size/2,
                        y: y + size/2,
                        size: size,
                        type: index < 3 ? 'orbital' : 'floating'
                    });
                }
            }
        });

        // Energy beam system for MachVive
        let machviveFrameCount = 0;
        const updateMachviveEnergyBeams = () => {
            machviveFrameCount++;
            
            if (machviveFrameCount % 3 === 0) {
                machviveSvgCanvas.innerHTML = '';
                
                // Technical connection lines from orbital gears to hub
                machviveGearData.forEach((gear) => {
                    if (gear.type === 'orbital') {
                        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                        line.setAttribute('x1', gear.x);
                        line.setAttribute('y1', gear.y);
                        line.setAttribute('x2', machviveHubX);
                        line.setAttribute('y2', machviveHubY);
                        line.setAttribute('stroke', `rgba(200, 200, 200, 0.6)`);
                        line.setAttribute('stroke-width', '1.5');
                        
                        line.style.strokeDasharray = '5 3';
                        line.style.strokeDashoffset = (machviveFrameCount * 0.2) % 8;
                        
                        machviveSvgCanvas.appendChild(line);
                    }
                });
                
                // Mechanical linkage beams between gears
                for (let i = 0; i < machviveGearData.length; i++) {
                    const gear1 = machviveGearData[i];
                    
                    for (let j = i + 1; j < machviveGearData.length; j++) {
                        const gear2 = machviveGearData[j];
                        const distance = Math.sqrt(
                            Math.pow(gear1.x - gear2.x, 2) + 
                            Math.pow(gear1.y - gear2.y, 2)
                        );
                        
                        if (distance < 350 && Math.random() < 0.25) {
                            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                            line.setAttribute('x1', gear1.x);
                            line.setAttribute('y1', gear1.y);
                            line.setAttribute('x2', gear2.x);
                            line.setAttribute('y2', gear2.y);
                            
                            line.setAttribute('stroke', `rgba(160, 160, 160, 0.4)`);
                            line.setAttribute('stroke-width', '1');
                            line.style.strokeDasharray = '3 2';
                            
                            machviveSvgCanvas.appendChild(line);
                        }
                    }
                }
            }

            requestAnimationFrame(updateMachviveEnergyBeams);
        };

        updateMachviveEnergyBeams();
        }, 500); // Wait 500ms for layout to complete
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