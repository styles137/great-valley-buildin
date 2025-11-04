// Import Wix modules
import wixWindow from 'wix-window';

// Configuration object - customize these values for your elements
const parallaxConfig = {
    // Slow moving background elements (move slower than scroll)
    slowElements: [
        { element: '#backgroundImage1', speed: 0.3 },
        { element: '#backgroundImage2', speed: 0.4 }
    ],
    // Medium speed elements
    mediumElements: [
        { element: '#middleLayer1', speed: 0.6 },
        { element: '#middleLayer2', speed: 0.7 }
    ],
    // Fast moving foreground elements (move faster than scroll)
    fastElements: [
        { element: '#foregroundElement1', speed: 1.2 },
        { element: '#foregroundElement2', speed: 1.4 }
    ],
    // Fade in/out elements based on scroll
    fadeElements: [
        { element: '#fadeBox1', startFade: 0, endFade: 500 },
        { element: '#fadeBox2', startFade: 300, endFade: 800 }
    ],
    // Scale elements on scroll
    scaleElements: [
        { element: '#scaleImage1', startScale: 1, endScale: 1.2, scrollRange: 1000 }
    ]
};

// Main parallax handler
$w.onReady(function () {
    // Initialize all elements
    initializeParallax();

    // Add scroll listener
    wixWindow.scrollTo(0, 0);
    $w('#page').onScroll((event) => {
        handleParallax(event.scrollY);
    });

    // Handle initial state
    handleParallax(0);
});

/**
 * Initialize parallax elements with starting positions
 */
function initializeParallax() {
    // Set initial transforms for all parallax elements
    const allElements = [
        ...parallaxConfig.slowElements,
        ...parallaxConfig.mediumElements,
        ...parallaxConfig.fastElements
    ];

    allElements.forEach(config => {
        try {
            $w(config.element).show();
        } catch (e) {
            console.log(`Element ${config.element} not found`);
        }
    });
}

/**
 * Main parallax effect handler
 * @param {number} scrollY - Current scroll position
 */
function handleParallax(scrollY) {
    // Handle slow moving elements
    parallaxConfig.slowElements.forEach(config => {
        moveElement(config.element, scrollY, config.speed);
    });

    // Handle medium speed elements
    parallaxConfig.mediumElements.forEach(config => {
        moveElement(config.element, scrollY, config.speed);
    });

    // Handle fast moving elements
    parallaxConfig.fastElements.forEach(config => {
        moveElement(config.element, scrollY, config.speed);
    });

    // Handle fade effects
    parallaxConfig.fadeElements.forEach(config => {
        fadeElement(config.element, scrollY, config.startFade, config.endFade);
    });

    // Handle scale effects
    parallaxConfig.scaleElements.forEach(config => {
        scaleElement(config.element, scrollY, config.startScale, config.endScale, config.scrollRange);
    });
}

/**
 * Move element based on scroll position and speed
 * @param {string} selector - Element selector
 * @param {number} scrollY - Current scroll position
 * @param {number} speed - Movement speed multiplier
 */
function moveElement(selector, scrollY, speed) {
    try {
        const element = $w(selector);
        const movement = scrollY * speed;

        // Apply transform for smooth parallax
        element.y = element.y + (movement - (element.customData || 0));
        element.customData = movement;

    } catch (e) {
        // Element not found or error occurred
    }
}

/**
 * Fade element based on scroll position
 * @param {string} selector - Element selector
 * @param {number} scrollY - Current scroll position
 * @param {number} startFade - Scroll position to start fading
 * @param {number} endFade - Scroll position to complete fade
 */
function fadeElement(selector, scrollY, startFade, endFade) {
    try {
        const element = $w(selector);

        if (scrollY < startFade) {
            element.style.opacity = "1";
        } else if (scrollY > endFade) {
            element.style.opacity = "0";
        } else {
            const range = endFade - startFade;
            const progress = (scrollY - startFade) / range;
            const opacity = 1 - progress;
            element.style.opacity = opacity.toString();
        }
    } catch (e) {
        // Element not found
    }
}

/**
 * Scale element based on scroll position
 * @param {string} selector - Element selector
 * @param {number} scrollY - Current scroll position
 * @param {number} startScale - Starting scale value
 * @param {number} endScale - Ending scale value
 * @param {number} scrollRange - Scroll distance for full scale effect
 */
function scaleElement(selector, scrollY, startScale, endScale, scrollRange) {
    try {
        const element = $w(selector);
        const progress = Math.min(scrollY / scrollRange, 1);
        const scale = startScale + (endScale - startScale) * progress;

        // Note: Wix has limited transform support, this uses size manipulation
        const originalWidth = element.customWidth || element.width;
        const originalHeight = element.customHeight || element.height;

        if (!element.customWidth) {
            element.customWidth = element.width;
            element.customHeight = element.height;
        }

        element.width = originalWidth * scale;
        element.height = originalHeight * scale;

    } catch (e) {
        // Element not found
    }
}

/**
 * Alternative parallax using Wix Effects API (if available)
 * Add this to elements directly in the Wix Editor
 */
export function setupWixParallaxEffects() {
    // For elements with Wix built-in effects:
    // 1. Select element in Wix Editor
    // 2. Click "Add Effect" (magic wand icon)
    // 3. Choose "Parallax" or "Reveal"
    // 4. Customize speed and direction

    console.log("Use Wix Editor effects panel for additional parallax options");
}

/**
 * Smooth scroll to section (bonus feature)
 * @param {string} elementId - Target element ID
 */
export function smoothScrollTo(elementId) {
    const element = $w(elementId);
    element.scrollTo();
}

/**
 * Advanced: Parallax based on element position in viewport
 */
export function viewportParallax() {
    $w('#page').onScroll(() => {
        const viewportHeight = wixWindow.viewportRect.height;

        parallaxConfig.slowElements.forEach(config => {
            try {
                const element = $w(config.element);
                const rect = element.getBoundingClientRect();
                const elementCenter = rect.top + (rect.height / 2);
                const viewportCenter = viewportHeight / 2;
                const distance = elementCenter - viewportCenter;
                const movement = distance * (config.speed - 1);

                element.style.transform = `translateY(${movement}px)`;
            } catch (e) {
                // Element not found
            }
        });
    });
}