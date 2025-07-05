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

    // Parallax effect for hero background using GSAP
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        gsap.to(heroBackground, {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                start: "top bottom",
                end: "bottom top",
                scrub: true
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

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.about-section__content, .brand-card-enhanced, .tool-card-enhanced, .engagement-detail, .metric-card');
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