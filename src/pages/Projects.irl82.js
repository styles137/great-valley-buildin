// Import Wix modules
import wixWindow from 'wix-window';

// Configuration object - customize these values for your elements
const parallaxConfig = {
    // Slow moving background elements (move slower than scroll)
    slowElements: [
        { element: 'backgroundImage1', speed: 0.3, initialY: 0 },
        { element: 'backgroundImage2', speed: 0.4, initialY: 0 }
    ],
    // Medium speed elements
    mediumElements: [
        { element: 'middleLayer1', speed: 0.6, initialY: 0 },
        { element: 'middleLayer2', speed: 0.7, initialY: 0 }
    ],
    // Fast moving foreground elements (move faster than scroll)
    fastElements: [
        { element: 'foregroundElement1', speed: 1.2, initialY: 0 },
        { element: 'foregroundElement2', speed: 1.4, initialY: 0 }
    ],
    // Fade in/out elements based on scroll
    fadeElements: [
        { element: 'fadeBox1', startFade: 0, endFade: 500 },
        { element: 'fadeBox2', startFade: 300, endFade: 800 }
    ],
    // Scale elements on scroll
    scaleElements: [
        { element: 'scaleImage1', startScale: 1, endScale: 1.2, scrollRange: 1000 }
    ]
};

let lastScrollY = 0;

// Main parallax handler
$w.onReady(function () {
    console.log("Parallax script loaded");

    // Store initial positions
    initializeParallax();

    // Add scroll listener using wixWindow
    wixWindow.onScroll((event) => {
        handleParallax(event.scrollY);
    });

    // Handle initial state
    handleParallax(0);
});

/**
 * Initialize parallax elements with starting positions
 */
function initializeParallax() {
    // Store initial Y positions for all parallax elements
    const allElements = [
        ...parallaxConfig.slowElements,
        ...parallaxConfig.mediumElements,
        ...parallaxConfig.fastElements
    ];

    allElements.forEach(config => {
        try {
            const element = $w(`#${config.element}`);
            config.initialY = element.y;
            console.log(`Initialized ${config.element} at Y: ${config.initialY}`);
        } catch (e) {
            console.log(`Element #${config.element} not found - skipping`);
        }
    });

    // Initialize scale elements
    parallaxConfig.scaleElements.forEach(config => {
        try {
            const element = $w(`#${config.element}`);
            config.initialWidth = element.width;
            config.initialHeight = element.height;
            console.log(`Initialized scale for ${config.element}`);
        } catch (e) {
            console.log(`Scale element #${config.element} not found - skipping`);
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
        moveElement(config, scrollY);
    });

    // Handle medium speed elements
    parallaxConfig.mediumElements.forEach(config => {
        moveElement(config, scrollY);
    });

    // Handle fast moving elements
    parallaxConfig.fastElements.forEach(config => {
        moveElement(config, scrollY);
    });

    // Handle fade effects
    parallaxConfig.fadeElements.forEach(config => {
        fadeElement(config, scrollY);
    });

    // Handle scale effects
    parallaxConfig.scaleElements.forEach(config => {
        scaleElement(config, scrollY);
    });

    lastScrollY = scrollY;
}

/**
 * Move element based on scroll position and speed
 * @param {object} config - Element configuration object
 * @param {number} scrollY - Current scroll position
 */
function moveElement(config, scrollY) {
    try {
        const element = $w(`#${config.element}`);

        // Calculate movement based on speed
        // Speed < 1 = slower than scroll (background)
        // Speed > 1 = faster than scroll (foreground)
        const movement = scrollY * (1 - config.speed);
        const newY = config.initialY + movement;

        element.y = newY;

    } catch (e) {
        // Element not found - silently skip
    }
}

/**
 * Fade element based on scroll position
 * @param {object} config - Element configuration with startFade and endFade
 * @param {number} scrollY - Current scroll position
 */
function fadeElement(config, scrollY) {
    try {
        const element = $w(`#${config.element}`);

        if (scrollY < config.startFade) {
            element.hide();
        } else if (scrollY > config.endFade) {
            element.hide();
        } else {
            element.show();
            const range = config.endFade - config.startFade;
            const progress = (scrollY - config.startFade) / range;
            const opacity = 1 - progress;

            // Wix doesn't support opacity directly, so we hide/show
            // For smoother fading, use Wix's built-in effects in the editor
            if (opacity < 0.5) {
                element.hide();
            } else {
                element.show();
            }
        }
    } catch (e) {
        // Element not found
    }
}

/**
 * Scale element based on scroll position
 * @param {object} config - Element configuration
 * @param {number} scrollY - Current scroll position
 */
function scaleElement(config, scrollY) {
    try {
        const element = $w(`#${config.element}`);
        const progress = Math.min(scrollY / config.scrollRange, 1);
        const scale = config.startScale + (config.endScale - config.startScale) * progress;

        // Scale using width and height
        element.width = config.initialWidth * scale;
        element.height = config.initialHeight * scale;

    } catch (e) {
        // Element not found
    }
}

/**
 * Smooth scroll to section
 * Call this from button clicks: onClick event -> smoothScrollToElement('targetElementId')
 * @param {string} elementId - Target element ID (without #)
 */
export function smoothScrollToElement(elementId) {
    try {
        const element = $w(`#${elementId}`);
        wixWindow.scrollTo(0, element.y - 100, {
            duration: 800
        });
    } catch (e) {
        console.log(`Cannot scroll to #${elementId}`);
    }
}

/**
 * Enable parallax on specific element
 * @param {string} elementId - Element ID without #
 * @param {number} speed - Parallax speed (0.1 to 2.0)
 */
export function addParallaxToElement(elementId, speed) {
    try {
        const element = $w(`#${elementId}`);
        const initialY = element.y;

        parallaxConfig.mediumElements.push({
            element: elementId,
            speed: speed,
            initialY: initialY
        });

        console.log(`Added parallax to #${elementId} with speed ${speed}`);
    } catch (e) {
        console.log(`Cannot add parallax to #${elementId}`);
    }
}

/**
 * Disable parallax effect
 */
export function disableParallax() {
    // Clear all configs
    parallaxConfig.slowElements = [];
    parallaxConfig.mediumElements = [];
    parallaxConfig.fastElements = [];
    parallaxConfig.fadeElements = [];
    parallaxConfig.scaleElements = [];

    console.log("Parallax disabled");
}

/**
 * Reset all elements to original positions
 */
export function resetParallax() {
    const allElements = [
        ...parallaxConfig.slowElements,
        ...parallaxConfig.mediumElements,
        ...parallaxConfig.fastElements
    ];

    allElements.forEach(config => {
        try {
            const element = $w(`#${config.element}`);
            element.y = config.initialY;
        } catch (e) {
            // Element not found
        }
    });

    console.log("Parallax positions reset");
}