// Wix Velo Parallax Effect - Fixed for Preview & Published
// Works with images, text, and boxes inside strips

// ====== CONFIGURATION ======
const parallaxConfig = {
    // Parallax movement elements - ONLY add IDs that exist on your page
    elements: [
        { id: 'backgroundImage1', speed: 0.5 },
        { id: 'backgroundImage2', speed: 0.5 },
        { id: 'middleLayer1', speed: 0.7 },
        { id: 'middleLayer2', speed: 0.7 },
        { id: 'foregroundElement1', speed: 0.9 },
        { id: 'foregroundElement2', speed: 0.9 },
    ],

    // Fade elements - Comment out if not using
    fadeElements: [
        // { id: 'fadeBox1', startFade: 0, endFade: 500 },
        // { id: 'fadeBox2', startFade: 300, endFade: 800 }
    ],

    // Scale elements - Comment out if not using
    scaleElements: [
        // { id: 'scaleImage1', startScale: 1.0, endScale: 1.2, scrollRange: 1000 }
    ]
};

// Storage
let elementData = [];
let fadeData = [];
let scaleData = [];
let isScrolling = false;
let isInitialized = false;

// Initialize on page ready
$w.onReady(function () {
    console.log("✓ Parallax script starting...");

    // Initialize all effects
    try {
        initParallaxElements();
        initFadeElements();
        initScaleElements();
        isInitialized = true;
        console.log("✓ All effects initialized");
    } catch (e) {
        console.log("✗ Initialization error:", e.message);
    }

    // Native JavaScript scroll event
    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', handleScroll, { passive: true });
        console.log("✓ Scroll listener attached");
    }
});

/**
 * Initialize parallax movement elements
 */
function initParallaxElements() {
    parallaxConfig.elements.forEach(config => {
        try {
            const element = $w(`#${config.id}`);

            // Store element data with initial Y position
            elementData.push({
                id: config.id,
                element: element,
                speed: config.speed,
                initialY: element.y,
                lastY: element.y
            });

            console.log(`✓ Parallax ready: ${config.id} (Y: ${element.y}, speed: ${config.speed})`);

        } catch (e) {
            console.log(`✗ Element #${config.id} not found - remove from config or add to page`);
        }
    });

    if (elementData.length === 0) {
        console.log("⚠ No parallax elements initialized!");
    }
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
            console.log(`✓ Fade ready: ${config.id} (${config.startFade}-${config.endFade}px)`);
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
            console.log(`✓ Scale ready: ${config.id} (${config.startScale}→${config.endScale})`);
        } catch (e) {
            console.log(`✗ Scale element #${config.id} not found`);
        }
    });
}

/**
 * Handle scroll event
 */
function handleScroll() {
    if (!isInitialized) return;

    if (!isScrolling) {
        window.requestAnimationFrame(updateAllEffects);
        isScrolling = true;
    }
}

/**
 * Update all effects
 */
function updateAllEffects() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    updateParallax(scrollY);
    updateFade(scrollY);
    updateScale(scrollY);

    isScrolling = false;
}

/**
 * Update parallax positions
 */
function updateParallax(currentScrollY) {
    elementData.forEach(data => {
        try {
            // Calculate parallax offset
            // speed = 0.5 means element moves at 50% of scroll speed (slower = background effect)
            // speed = 1.0 means no parallax (moves with page)
            const parallaxOffset = currentScrollY * (1 - data.speed);
            const newY = data.initialY + parallaxOffset;

            // Only update if changed significantly (performance)
            if (Math.abs(newY - data.lastY) > 1) {
                data.element.y = newY;
                data.lastY = newY;
            }

        } catch (e) {
            // Element might have been removed
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
            // Element might have been removed
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
            // Element might have been removed
        }
    });
}

/**
 * DEBUG: Check current state
 */
export function debugParallax() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    console.log("=== PARALLAX DEBUG ===");
    console.log(`Current scroll position: ${scrollY}px`);
    console.log(`Initialized: ${isInitialized}`);
    console.log(`Total parallax elements: ${elementData.length}`);

    elementData.forEach(data => {
        try {
            const currentY = data.element.y;
            const offset = currentY - data.initialY;
            console.log(`- ${data.id}: Y=${currentY.toFixed(1)}, Initial=${data.initialY}, Offset=${offset.toFixed(1)}, Speed=${data.speed}`);
        } catch (e) {
            console.log(`- ${data.id}: Error reading position`);
        }
    });
}

/**
 * TEST: Manually move an element
 */
export function testMove(elementId) {
    try {
        const element = $w(`#${elementId}`);
        const startY = element.y;
        console.log(`Moving ${elementId} from ${startY}...`);

        element.y = startY - 50;
        console.log(`✓ Moved to ${element.y}`);

        setTimeout(() => {
            element.y = startY;
            console.log(`✓ Reset to ${startY}`);
        }, 1500);

    } catch (e) {
        console.log(`✗ Cannot move #${elementId}:`, e.message);
    }
}

/**
 * Add parallax to new element
 */
export function addParallax(elementId, speed = 0.5) {
    try {
        const element = $w(`#${elementId}`);

        // Check if already exists
        if (elementData.find(d => d.id === elementId)) {
            console.log(`⚠ #${elementId} already has parallax`);
            return;
        }

        elementData.push({
            id: elementId,
            element: element,
            speed: speed,
            initialY: element.y,
            lastY: element.y
        });

        console.log(`✓ Added parallax to #${elementId} (speed: ${speed})`);
    } catch (e) {
        console.log(`✗ Cannot add parallax to #${elementId}:`, e.message);
    }
}

/**
 * Remove parallax from element
 */
export function removeParallax(elementId) {
    const index = elementData.findIndex(d => d.id === elementId);
    if (index !== -1) {
        const data = elementData[index];
        try {
            data.element.y = data.initialY;
        } catch (e) { }
        elementData.splice(index, 1);
        console.log(`✓ Removed parallax from #${elementId}`);
    }
}

/**
 * Change speed of existing element
 */
export function updateSpeed(elementId, newSpeed) {
    const data = elementData.find(d => d.id === elementId);
    if (data) {
        // Reset to initial position first
        try {
            data.element.y = data.initialY;
            data.speed = newSpeed;
            data.lastY = data.initialY;
            console.log(`✓ Updated #${elementId} speed to ${newSpeed}`);
        } catch (e) {
            console.log(`✗ Error updating #${elementId}`);
        }
    } else {
        console.log(`⚠ #${elementId} not found in parallax elements`);
    }
}

/**
 * Reset all elements to original positions
 */
export function resetAll() {
    console.log("Resetting all parallax elements...");
    elementData.forEach(d => {
        try {
            d.element.y = d.initialY;
            d.lastY = d.initialY;
        } catch (e) { }
    });
    console.log("✓ All elements reset");
}

/**
 * Disable all parallax (but keep elements visible)
 */
export function disableAll() {
    resetAll();
    elementData = [];
    fadeData = [];
    scaleData = [];
    isInitialized = false;
    console.log("✓ All parallax disabled");
}

// Button handlers (optional - create buttons with these IDs to use)
export function debugBtn_click(event) {
    debugParallax();
}

export function testBtn_click(event) {
    testMove('backgroundImage1');
}

export function resetBtn_click(event) {
    resetAll();
}