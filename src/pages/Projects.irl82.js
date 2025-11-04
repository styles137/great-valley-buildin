// Wix Velo Parallax Effect - Works with Strips & Containers
// IMPORTANT: Test on PUBLISHED site, not Preview mode!

// ====== CONFIGURATION ======
const parallaxConfig = {
    // Parallax movement elements
    elements: [
        { id: 'backgroundImage1', speed: 0.5 },  // 0.5 = moves at half scroll speed
        { id: 'backgroundImage2', speed: 0.5 },
        { id: 'middleLayer1', speed: 0.7 },      // 0.7 = moves at 70% scroll speed
        { id: 'middleLayer2', speed: 0.7 },
        { id: 'foregroundElement1', speed: 0.9 }, // 0.9 = subtle parallax
        { id: 'foregroundElement2', speed: 0.9 },
    ],

    // Fade elements (hide/show based on scroll)
    fadeElements: [
        { id: 'fadeBox1', startFade: 0, endFade: 500 },
        { id: 'fadeBox2', startFade: 300, endFade: 800 }
    ],

    // Scale elements (zoom in/out based on scroll)
    scaleElements: [
        { id: 'scaleImage1', startScale: 1.0, endScale: 1.2, scrollRange: 1000 }
    ]
};

// Storage
let elementData = [];
let fadeData = [];
let scaleData = [];
let isScrolling = false;
let scrollY = 0;

// Initialize on page ready
$w.onReady(function () {
    console.log("✓ Parallax script loaded");

    // Initialize all effects
    initParallaxElements();
    initFadeElements();
    initScaleElements();

    // Native JavaScript scroll event
    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', handleScroll, { passive: true });
        console.log("✓ Scroll listener attached");
        console.log("⚠ Remember: Test on PUBLISHED site for full functionality!");
    }

    // Delay initial update to ensure elements are positioned
    setTimeout(() => {
        requestAnimationFrame(updateAllEffects);
    }, 100);
});

/**
 * Initialize parallax movement elements
 */
function initParallaxElements() {
    parallaxConfig.elements.forEach(config => {
        try {
            const element = $w(`#${config.id}`);

            // Get initial position - use getBoundingClientRect for accuracy
            let initialTop = 0;
            element.getBoundingClientRect()
                .then(rect => {
                    initialTop = rect.top + window.scrollY;
                    console.log(`✓ Parallax: ${config.id} at ${initialTop}px (speed: ${config.speed})`);
                })
                .catch(() => {
                    // Fallback to element.y
                    initialTop = element.y;
                    console.log(`✓ Parallax: ${config.id} using element.y (speed: ${config.speed})`);
                });

            elementData.push({
                id: config.id,
                element: element,
                speed: config.speed,
                initialY: element.y,  // Store the element's Y relative to container
                initialTop: initialTop,
                lastTransform: 0
            });

        } catch (e) {
            console.log(`✗ Element #${config.id} not found`);
        }
    });
}

/**
 * Initialize fade elements
 */
function initFadeElements() {
    parallaxConfig.fadeElements.forEach(config => {
        try {
            const element = $w(`#${config.id}`);
            fadeData.push({
                id: config.id,
                element: element,
                startFade: config.startFade,
                endFade: config.endFade,
                isVisible: true
            });
            console.log(`✓ Fade: ${config.id} (${config.startFade}-${config.endFade}px)`);
        } catch (e) {
            console.log(`✗ Fade element #${config.id} not found`);
        }
    });
}

/**
 * Initialize scale elements
 */
function initScaleElements() {
    parallaxConfig.scaleElements.forEach(config => {
        try {
            const element = $w(`#${config.id}`);
            scaleData.push({
                id: config.id,
                element: element,
                startScale: config.startScale,
                endScale: config.endScale,
                scrollRange: config.scrollRange,
                initialWidth: element.width,
                initialHeight: element.height,
                lastScale: config.startScale
            });
            console.log(`✓ Scale: ${config.id} (${config.startScale}→${config.endScale})`);
        } catch (e) {
            console.log(`✗ Scale element #${config.id} not found`);
        }
    });
}

/**
 * Handle scroll event
 */
function handleScroll() {
    scrollY = window.pageYOffset || document.documentElement.scrollTop;

    if (!isScrolling) {
        window.requestAnimationFrame(updateAllEffects);
        isScrolling = true;
    }
}

/**
 * Update all effects
 */
function updateAllEffects() {
    updateParallax(scrollY);
    updateFade(scrollY);
    updateScale(scrollY);

    isScrolling = false;
}

/**
 * Update parallax positions - ENHANCED VERSION
 */
function updateParallax(currentScrollY) {
    elementData.forEach(data => {
        try {
            // Calculate how much to offset based on scroll and speed
            // Speed closer to 0 = slower movement (background effect)
            // Speed closer to 1 = normal scroll (no parallax)
            // Speed > 1 = faster than scroll (not recommended for most cases)

            const parallaxAmount = currentScrollY * (1 - data.speed);
            const newY = data.initialY + parallaxAmount;

            // Only update if change is significant (performance)
            if (Math.abs(newY - data.element.y) > 0.5) {
                data.element.y = newY;
                data.lastTransform = parallaxAmount;
            }

        } catch (e) {
            console.log(`Error updating ${data.id}:`, e.message);
        }
    });
}

/**
 * Update fade effects
 */
function updateFade(currentScrollY) {
    fadeData.forEach(data => {
        try {
            const shouldBeVisible = currentScrollY >= data.startFade && currentScrollY <= data.endFade;

            if (shouldBeVisible && !data.isVisible) {
                data.element.expand();
                data.isVisible = true;
            } else if (!shouldBeVisible && data.isVisible) {
                data.element.collapse();
                data.isVisible = false;
            }
        } catch (e) {
            // Element removed
        }
    });
}

/**
 * Update scale effects
 */
function updateScale(currentScrollY) {
    scaleData.forEach(data => {
        try {
            const progress = Math.min(Math.max(currentScrollY / data.scrollRange, 0), 1);
            const scale = data.startScale + (data.endScale - data.startScale) * progress;

            if (Math.abs(scale - data.lastScale) > 0.01) {
                data.element.width = data.initialWidth * scale;
                data.element.height = data.initialHeight * scale;
                data.lastScale = scale;
            }
        } catch (e) {
            // Element removed
        }
    });
}

/**
 * DEBUG: Log current scroll and element positions
 */
export function debugParallax() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    console.log("=== DEBUG INFO ===");
    console.log(`Current scroll: ${currentScroll}px`);

    elementData.forEach(data => {
        try {
            console.log(`${data.id}: Y=${data.element.y}, InitialY=${data.initialY}, Speed=${data.speed}`);
        } catch (e) {
            console.log(`${data.id}: Error reading position`);
        }
    });
}

/**
 * TEST: Force move an element to verify it's not locked
 */
export function testMove(elementId) {
    try {
        const element = $w(`#${elementId}`);
        const originalY = element.y;
        element.y = originalY + 100;
        console.log(`✓ Moved #${elementId} from ${originalY} to ${element.y}`);

        setTimeout(() => {
            element.y = originalY;
            console.log(`✓ Reset #${elementId} back to ${originalY}`);
        }, 1000);
    } catch (e) {
        console.log(`✗ Cannot test #${elementId}:`, e.message);
    }
}

/**
 * Add parallax to element dynamically
 */
export function addParallax(elementId, speed = 0.5) {
    try {
        const element = $w(`#${elementId}`);

        if (elementData.find(d => d.id === elementId)) {
            console.log(`⚠ #${elementId} already has parallax`);
            return;
        }

        elementData.push({
            id: elementId,
            element: element,
            speed: speed,
            initialY: element.y,
            initialTop: 0,
            lastTransform: 0
        });

        console.log(`✓ Added parallax to #${elementId} (speed: ${speed})`);
        requestAnimationFrame(updateAllEffects);
    } catch (e) {
        console.log(`✗ Cannot add parallax to #${elementId}:`, e.message);
    }
}

/**
 * Update speed for existing element
 */
export function updateSpeed(elementId, newSpeed) {
    const data = elementData.find(d => d.id === elementId);
    if (data) {
        data.speed = newSpeed;
        console.log(`✓ Updated speed for #${elementId} to ${newSpeed}`);
        requestAnimationFrame(updateAllEffects);
    } else {
        console.log(`⚠ #${elementId} not found in parallax elements`);
    }
}

/**
 * Remove all effects and reset
 */
export function resetAll() {
    elementData.forEach(d => {
        try {
            d.element.y = d.initialY;
        } catch (e) { }
    });
    console.log("✓ Reset all elements to initial positions");
}

// Add button click handler for testing (optional)
// Create a button with ID "debugBtn" to use this
export function debugBtn_click(event) {
    debugParallax();
}

// Test move button (create button with ID "testBtn")
export function testBtn_click(event) {
    testMove('backgroundImage1');
}