// Wix Velo Parallax Effect with Fade & Scale
// Compatible with Wix Editor - Uses native scroll events

// ====== CONFIGURATION ======
const parallaxConfig = {
    // Parallax movement elements
    elements: [
        { id: 'backgroundImage1', speed: 0.3 },
        { id: 'backgroundImage2', speed: 0.3 },
        { id: 'middleLayer1', speed: 0.6 },
        { id: 'middleLayer2', speed: 0.6 },
        { id: 'foregroundElement1', speed: 0.8 },
        { id: 'foregroundElement2', speed: 0.8 },
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
    }

    // Initial update
    requestAnimationFrame(updateAllEffects);
});

/**
 * Initialize parallax movement elements
 */
function initParallaxElements() {
    parallaxConfig.elements.forEach(config => {
        try {
            const element = $w(`#${config.id}`);
            elementData.push({
                id: config.id,
                element: element,
                speed: config.speed,
                initialY: null,
                lastOffset: 0
            });
            console.log(`✓ Parallax: ${config.id} (speed: ${config.speed})`);
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
function updateParallax(scrollY) {
    elementData.forEach(data => {
        try {
            if (data.initialY === null) {
                data.initialY = data.element.y;
            }

            const offset = scrollY * (1 - data.speed);

            if (Math.abs(offset - data.lastOffset) > 0.5) {
                data.element.y = data.initialY + offset;
                data.lastOffset = offset;
            }
        } catch (e) {
            // Element removed
        }
    });
}

/**
 * Update fade effects
 */
function updateFade(scrollY) {
    fadeData.forEach(data => {
        try {
            if (scrollY < data.startFade || scrollY > data.endFade) {
                if (data.isVisible) {
                    data.element.collapse();
                    data.isVisible = false;
                }
            } else {
                if (!data.isVisible) {
                    data.element.expand();
                    data.isVisible = true;
                }
            }
        } catch (e) {
            // Element removed
        }
    });
}

/**
 * Update scale effects
 */
function updateScale(scrollY) {
    scaleData.forEach(data => {
        try {
            const progress = Math.min(Math.max(scrollY / data.scrollRange, 0), 1);
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
 * Add parallax to element
 * @param {string} elementId - Element ID without #
 * @param {number} speed - Speed (0.1 to 2.0)
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
            lastOffset: 0
        });

        console.log(`✓ Added parallax to #${elementId} (speed: ${speed})`);
        requestAnimationFrame(updateAllEffects);
    } catch (e) {
        console.log(`✗ Cannot add parallax to #${elementId}`);
    }
}

/**
 * Add fade effect to element
 * @param {string} elementId - Element ID without #
 * @param {number} startFade - Start scroll position
 * @param {number} endFade - End scroll position
 */
export function addFade(elementId, startFade, endFade) {
    try {
        const element = $w(`#${elementId}`);

        if (fadeData.find(d => d.id === elementId)) {
            console.log(`⚠ #${elementId} already has fade`);
            return;
        }

        fadeData.push({
            id: elementId,
            element: element,
            startFade: startFade,
            endFade: endFade,
            isVisible: true
        });

        console.log(`✓ Added fade to #${elementId} (${startFade}-${endFade}px)`);
        requestAnimationFrame(updateAllEffects);
    } catch (e) {
        console.log(`✗ Cannot add fade to #${elementId}`);
    }
}

/**
 * Add scale effect to element
 * @param {string} elementId - Element ID without #
 * @param {number} startScale - Starting scale (e.g., 1.0)
 * @param {number} endScale - Ending scale (e.g., 1.5)
 * @param {number} scrollRange - Scroll distance for effect
 */
export function addScale(elementId, startScale, endScale, scrollRange) {
    try {
        const element = $w(`#${elementId}`);

        if (scaleData.find(d => d.id === elementId)) {
            console.log(`⚠ #${elementId} already has scale`);
            return;
        }

        scaleData.push({
            id: elementId,
            element: element,
            startScale: startScale,
            endScale: endScale,
            scrollRange: scrollRange,
            initialWidth: element.width,
            initialHeight: element.height,
            lastScale: startScale
        });

        console.log(`✓ Added scale to #${elementId} (${startScale}→${endScale})`);
        requestAnimationFrame(updateAllEffects);
    } catch (e) {
        console.log(`✗ Cannot add scale to #${elementId}`);
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
            if (data.initialY !== null) {
                data.element.y = data.initialY;
            }
        } catch (e) { }
        elementData.splice(index, 1);
        console.log(`✓ Removed parallax from #${elementId}`);
    }
}

/**
 * Remove fade from element
 */
export function removeFade(elementId) {
    const index = fadeData.findIndex(d => d.id === elementId);
    if (index !== -1) {
        const data = fadeData[index];
        try {
            if (!data.isVisible) {
                data.element.expand();
            }
        } catch (e) { }
        fadeData.splice(index, 1);
        console.log(`✓ Removed fade from #${elementId}`);
    }
}

/**
 * Remove scale from element
 */
export function removeScale(elementId) {
    const index = scaleData.findIndex(d => d.id === elementId);
    if (index !== -1) {
        const data = scaleData[index];
        try {
            data.element.width = data.initialWidth;
            data.element.height = data.initialHeight;
        } catch (e) { }
        scaleData.splice(index, 1);
        console.log(`✓ Removed scale from #${elementId}`);
    }
}

/**
 * Update speed for parallax element
 */
export function updateSpeed(elementId, newSpeed) {
    const data = elementData.find(d => d.id === elementId);
    if (data) {
        data.speed = newSpeed;
        console.log(`✓ Updated speed for #${elementId} to ${newSpeed}`);
        requestAnimationFrame(updateAllEffects);
    }
}

/**
 * Reset all effects
 */
export function resetAll() {
    elementData.forEach(d => {
        try {
            if (d.initialY !== null) d.element.y = d.initialY;
        } catch (e) { }
    });
    scaleData.forEach(d => {
        try {
            d.element.width = d.initialWidth;
            d.element.height = d.initialHeight;
        } catch (e) { }
    });
    fadeData.forEach(d => {
        try {
            if (!d.isVisible) d.element.expand();
        } catch (e) { }
    });
    console.log("✓ Reset all effects");
}

/**
 * Disable all effects
 */
export function disableAll() {
    resetAll();
    elementData = [];
    fadeData = [];
    scaleData = [];
    console.log("✓ Disabled all effects");
}

// ====== USAGE EXAMPLES ======
/*
$w.onReady(function() {
    // Parallax
    addParallax('heroImage', 0.3);
    
    // Fade (visible between 200-800px scroll)
    addFade('fadeBox', 200, 800);
    
    // Scale (zoom from 1.0 to 1.5 over 1000px scroll)
    addScale('zoomImage', 1.0, 1.5, 1000);
});
*/