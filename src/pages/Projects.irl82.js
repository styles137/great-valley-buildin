// Import Wix modules
import wixWindowFrontend from 'wix-window-frontend';

// Configuration object - REPLACE these with your actual element IDs from Wix Editor
const parallaxConfig = {
    // Slow moving background elements (move slower than scroll)
    slowElements: [
        { element: 'backgroundImage1', speed: 0.3 },
        { element: 'backgroundImage2', speed: 0.4 }
    ],
    // Medium speed elements
    mediumElements: [
        { element: 'middleLayer1', speed: 0.6 },
        { element: 'middleLayer2', speed: 0.7 }
    ],
    // Fast moving foreground elements (move faster than scroll)
    fastElements: [
        { element: 'foregroundElement1', speed: 1.2 },
        { element: 'foregroundElement2', speed: 1.4 }
    ]
};

// Store initial data
let initialPositions = new Map();
let ticking = false;

// Main initialization
$w.onReady(function () {
    console.log("✓ Parallax script initialized");

    // Store initial positions of all elements
    initializeElements();

    // Set up scroll handling with requestAnimationFrame for smooth performance
    wixWindowFrontend.onScroll(() => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleParallax();
                ticking = false;
            });
            ticking = true;
        }
    });

    console.log("✓ Scroll listener attached");
});

/**
 * Initialize and store starting positions
 */
function initializeElements() {
    const allConfigs = [
        ...parallaxConfig.slowElements.map(c => ({ ...c, type: 'slow' })),
        ...parallaxConfig.mediumElements.map(c => ({ ...c, type: 'medium' })),
        ...parallaxConfig.fastElements.map(c => ({ ...c, type: 'fast' }))
    ];

    allConfigs.forEach(config => {
        try {
            const element = $w(`#${config.element}`);

            // Check if element exists and is visible
            if (element) {
                // Get bounding box to find actual position
                element.getBoundingClientRect().then(rect => {
                    const viewportOffset = wixWindowFrontend.scrollY;
                    const absoluteY = rect.top + viewportOffset;

                    initialPositions.set(config.element, {
                        y: absoluteY,
                        speed: config.speed,
                        element: element
                    });

                    console.log(`✓ Initialized ${config.element}`);
                }).catch(err => {
                    console.log(`✗ Could not get position for ${config.element}`);
                });
            }
        } catch (e) {
            console.log(`✗ Element #${config.element} not found in editor`);
        }
    });
}

/**
 * Handle parallax effect on scroll
 */
function handleParallax() {
    const scrollY = wixWindowFrontend.scrollY;

    initialPositions.forEach((data, elementId) => {
        try {
            // Calculate parallax offset
            // speed < 1 = moves slower (background effect)
            // speed > 1 = moves faster (foreground effect)
            const parallaxOffset = scrollY * (1 - data.speed);

            // Apply the transform
            data.element.y = data.y + parallaxOffset;

        } catch (e) {
            // Silently handle errors
        }
    });
}

/**
 * Add parallax to an element dynamically
 * Usage: Call this from a button or onReady with your element ID
 * Example: addParallax('myImage', 0.5);
 * 
 * @param {string} elementId - The ID of the element (without #)
 * @param {number} speed - Speed multiplier (0.1-2.0)
 * @param {string} layer - 'slow', 'medium', or 'fast'
 */
export function addParallax(elementId, speed = 0.5, layer = 'medium') {
    try {
        const element = $w(`#${elementId}`);

        element.getBoundingClientRect().then(rect => {
            const viewportOffset = wixWindowFrontend.scrollY;
            const absoluteY = rect.top + viewportOffset;

            initialPositions.set(elementId, {
                y: absoluteY,
                speed: speed,
                element: element
            });

            console.log(`✓ Added parallax to #${elementId} with speed ${speed}`);
        });

    } catch (e) {
        console.log(`✗ Cannot add parallax to #${elementId}: ${e.message}`);
    }
}

/**
 * Remove parallax from an element
 * @param {string} elementId - The ID of the element (without #)
 */
export function removeParallax(elementId) {
    if (initialPositions.has(elementId)) {
        const data = initialPositions.get(elementId);

        // Reset to original position
        try {
            data.element.y = data.y;
        } catch (e) {
            // Element may no longer exist
        }

        initialPositions.delete(elementId);
        console.log(`✓ Removed parallax from #${elementId}`);
    }
}

/**
 * Update parallax speed for an element
 * @param {string} elementId - The ID of the element (without #)
 * @param {number} newSpeed - New speed value
 */
export function updateSpeed(elementId, newSpeed) {
    if (initialPositions.has(elementId)) {
        const data = initialPositions.get(elementId);
        data.speed = newSpeed;
        console.log(`✓ Updated speed for #${elementId} to ${newSpeed}`);
    }
}

/**
 * Reset all elements to original positions
 */
export function resetAllParallax() {
    initialPositions.forEach((data, elementId) => {
        try {
            data.element.y = data.y;
        } catch (e) {
            // Element may no longer exist
        }
    });
    console.log("✓ Reset all parallax positions");
}

/**
 * Smooth scroll to element
 * @param {string} elementId - Target element ID (without #)
 * @param {number} offset - Additional offset in pixels (default: -100)
 */
export function scrollToElement(elementId, offset = -100) {
    try {
        $w(`#${elementId}`).scrollTo({
            offset: offset
        });
    } catch (e) {
        console.log(`✗ Cannot scroll to #${elementId}`);
    }
}

/**
 * Disable all parallax effects
 */
export function disableAllParallax() {
    initialPositions.clear();
    console.log("✓ All parallax effects disabled");
}

// Example usage - uncomment and modify:
/*
$w.onReady(function() {
    // Add parallax to specific elements
    addParallax('heroImage', 0.3);  // Slow background
    addParallax('titleText', 0.7);  // Medium speed
    addParallax('buttonGroup', 1.2); // Fast foreground

    // Or use button click handlers
    $w('#enableParallaxBtn').onClick(() => {
        addParallax('myImage', 0.5);
    });

    $w('#disableParallaxBtn').onClick(() => {
        disableAllParallax();
    });
});
*/

//Try to pull in scaling, etc from the below code:

// // Import Wix modules
// import wixWindow from 'wix-window';

// // Configuration object - customize these values for your elements
// const parallaxConfig = {
//     // Slow moving background elements (move slower than scroll)
//     slowElements: [
//         { element: 'backgroundImage1', speed: 0.3, initialY: 0 },
//         { element: 'backgroundImage2', speed: 0.4, initialY: 0 }
//     ],
//     // Medium speed elements
//     mediumElements: [
//         { element: 'middleLayer1', speed: 0.6, initialY: 0 },
//         { element: 'middleLayer2', speed: 0.7, initialY: 0 }
//     ],
//     // Fast moving foreground elements (move faster than scroll)
//     fastElements: [
//         { element: 'foregroundElement1', speed: 1.2, initialY: 0 },
//         { element: 'foregroundElement2', speed: 1.4, initialY: 0 }
//     ],
//     // Fade in/out elements based on scroll
//     fadeElements: [
//         { element: 'fadeBox1', startFade: 0, endFade: 500 },
//         { element: 'fadeBox2', startFade: 300, endFade: 800 }
//     ],
//     // Scale elements on scroll
//     scaleElements: [
//         { element: 'scaleImage1', startScale: 1, endScale: 1.2, scrollRange: 1000 }
//     ]
// };

// let lastScrollY = 0;

// // Main parallax handler
// $w.onReady(function () {
//     console.log("Parallax script loaded");

//     // Store initial positions
//     initializeParallax();

//     // Add scroll listener using wixWindow
//     wixWindow.onScroll((event) => {
//         handleParallax(event.scrollY);
//     });

//     // Handle initial state
//     handleParallax(0);
// });

// /**
//  * Initialize parallax elements with starting positions
//  */
// function initializeParallax() {
//     // Store initial Y positions for all parallax elements
//     const allElements = [
//         ...parallaxConfig.slowElements,
//         ...parallaxConfig.mediumElements,
//         ...parallaxConfig.fastElements
//     ];

//     allElements.forEach(config => {
//         try {
//             const element = $w(`#${config.element}`);
//             config.initialY = element.y;
//             console.log(`Initialized ${config.element} at Y: ${config.initialY}`);
//         } catch (e) {
//             console.log(`Element #${config.element} not found - skipping`);
//         }
//     });

//     // Initialize scale elements
//     parallaxConfig.scaleElements.forEach(config => {
//         try {
//             const element = $w(`#${config.element}`);
//             config.initialWidth = element.width;
//             config.initialHeight = element.height;
//             console.log(`Initialized scale for ${config.element}`);
//         } catch (e) {
//             console.log(`Scale element #${config.element} not found - skipping`);
//         }
//     });
// }

// /**
//  * Main parallax effect handler
//  * @param {number} scrollY - Current scroll position
//  */
// function handleParallax(scrollY) {
//     // Handle slow moving elements
//     parallaxConfig.slowElements.forEach(config => {
//         moveElement(config, scrollY);
//     });

//     // Handle medium speed elements
//     parallaxConfig.mediumElements.forEach(config => {
//         moveElement(config, scrollY);
//     });

//     // Handle fast moving elements
//     parallaxConfig.fastElements.forEach(config => {
//         moveElement(config, scrollY);
//     });

//     // Handle fade effects
//     parallaxConfig.fadeElements.forEach(config => {
//         fadeElement(config, scrollY);
//     });

//     // Handle scale effects
//     parallaxConfig.scaleElements.forEach(config => {
//         scaleElement(config, scrollY);
//     });

//     lastScrollY = scrollY;
// }

// /**
//  * Move element based on scroll position and speed
//  * @param {object} config - Element configuration object
//  * @param {number} scrollY - Current scroll position
//  */
// function moveElement(config, scrollY) {
//     try {
//         const element = $w(`#${config.element}`);

//         // Calculate movement based on speed
//         // Speed < 1 = slower than scroll (background)
//         // Speed > 1 = faster than scroll (foreground)
//         const movement = scrollY * (1 - config.speed);
//         const newY = config.initialY + movement;

//         element.y = newY;

//     } catch (e) {
//         // Element not found - silently skip
//     }
// }

// /**
//  * Fade element based on scroll position
//  * @param {object} config - Element configuration with startFade and endFade
//  * @param {number} scrollY - Current scroll position
//  */
// function fadeElement(config, scrollY) {
//     try {
//         const element = $w(`#${config.element}`);

//         if (scrollY < config.startFade) {
//             element.hide();
//         } else if (scrollY > config.endFade) {
//             element.hide();
//         } else {
//             element.show();
//             const range = config.endFade - config.startFade;
//             const progress = (scrollY - config.startFade) / range;
//             const opacity = 1 - progress;

//             // Wix doesn't support opacity directly, so we hide/show
//             // For smoother fading, use Wix's built-in effects in the editor
//             if (opacity < 0.5) {
//                 element.hide();
//             } else {
//                 element.show();
//             }
//         }
//     } catch (e) {
//         // Element not found
//     }
// }

// /**
//  * Scale element based on scroll position
//  * @param {object} config - Element configuration
//  * @param {number} scrollY - Current scroll position
//  */
// function scaleElement(config, scrollY) {
//     try {
//         const element = $w(`#${config.element}`);
//         const progress = Math.min(scrollY / config.scrollRange, 1);
//         const scale = config.startScale + (config.endScale - config.startScale) * progress;

//         // Scale using width and height
//         element.width = config.initialWidth * scale;
//         element.height = config.initialHeight * scale;

//     } catch (e) {
//         // Element not found
//     }
// }

// /**
//  * Smooth scroll to section
//  * Call this from button clicks: onClick event -> smoothScrollToElement('targetElementId')
//  * @param {string} elementId - Target element ID (without #)
//  */
// export function smoothScrollToElement(elementId) {
//     try {
//         const element = $w(`#${elementId}`);
//         wixWindow.scrollTo(0, element.y - 100, {
//             duration: 800
//         });
//     } catch (e) {
//         console.log(`Cannot scroll to #${elementId}`);
//     }
// }

// /**
//  * Enable parallax on specific element
//  * @param {string} elementId - Element ID without #
//  * @param {number} speed - Parallax speed (0.1 to 2.0)
//  */
// export function addParallaxToElement(elementId, speed) {
//     try {
//         const element = $w(`#${elementId}`);
//         const initialY = element.y;

//         parallaxConfig.mediumElements.push({
//             element: elementId,
//             speed: speed,
//             initialY: initialY
//         });

//         console.log(`Added parallax to #${elementId} with speed ${speed}`);
//     } catch (e) {
//         console.log(`Cannot add parallax to #${elementId}`);
//     }
// }

// /**
//  * Disable parallax effect
//  */
// export function disableParallax() {
//     // Clear all configs
//     parallaxConfig.slowElements = [];
//     parallaxConfig.mediumElements = [];
//     parallaxConfig.fastElements = [];
//     parallaxConfig.fadeElements = [];
//     parallaxConfig.scaleElements = [];

//     console.log("Parallax disabled");
// }

// /**
//  * Reset all elements to original positions
//  */
// export function resetParallax() {
//     const allElements = [
//         ...parallaxConfig.slowElements,
//         ...parallaxConfig.mediumElements,
//         ...parallaxConfig.fastElements
//     ];

//     allElements.forEach(config => {
//         try {
//             const element = $w(`#${config.element}`);
//             element.y = config.initialY;
//         } catch (e) {
//             // Element not found
//         }
//     });

//     console.log("Parallax positions reset");
// }