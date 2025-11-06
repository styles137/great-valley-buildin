// Wix Velo Parallax - CSS Transform Method
// Works with ALL element types, even inside strips/containers!

// ====== CONFIGURATION ======
//Test Github connection to monday.com
const parallaxConfig = {
    elements: [
        { id: 'backgroundImage1', speed: 2.5 },   // Slower = background effect
        { id: 'backgroundImage2', speed: 2.5 },
        { id: 'middleLayer1', speed: 4.7 },
        { id: 'middleLayer2', speed: 4.7 },
        { id: 'foregroundElement1', speed: 8.9 }, // Faster = subtle parallax
        { id: 'foregroundElement2', speed: 8.9 },
    ]
};

let elementData = [];
let isScrolling = false;

$w.onReady(function () {
    console.log("✓ Parallax script starting (CSS Transform method)");

    // Initialize elements
    initParallax();

    // Add scroll listener
    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', handleScroll, { passive: true });
        console.log("✓ Scroll listener active");

        // Force initial update
        setTimeout(() => {
            handleScroll();
        }, 100);
    }
});

/**
 * Initialize parallax elements
 */
function initParallax() {
    parallaxConfig.elements.forEach(config => {
        try {
            const element = $w(`#${config.id}`);

            elementData.push({
                id: config.id,
                element: element,
                speed: config.speed,
                lastTransform: 0
            });

            console.log(`✓ Ready: ${config.id} (speed: ${config.speed})`);

        } catch (e) {
            console.log(`✗ Not found: #${config.id}`);
        }
    });

    if (elementData.length > 0) {
        console.log(`✓ Initialized ${elementData.length} parallax elements`);
    } else {
        console.log("⚠ No elements initialized - check element IDs!");
    }
}

/**
 * Handle scroll event
 */
function handleScroll() {
    if (!isScrolling) {
        window.requestAnimationFrame(updateParallax);
        isScrolling = true;
    }
}

/**
 * Update parallax using CSS transforms
 */
function updateParallax() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Debug: Log every 100px of scroll
    if (scrollY % 100 < 10) {
        console.log(`📜 Scroll: ${scrollY}px, updating ${elementData.length} elements`);
    }

    elementData.forEach(data => {
        try {
            // Calculate transform based on scroll and speed
            // Lower speed = slower movement (background layers)
            // Higher speed = faster movement (foreground)
            const translateY = scrollY * (1 - data.speed);

            // Only update if change is significant
            if (Math.abs(translateY - data.lastTransform) > 0.5) {
                // Use CSS transform for smooth parallax
                data.element.style.transform = `translateY(${translateY}px)`;
                data.lastTransform = translateY;

                // Debug: Log first update
                if (scrollY > 50 && scrollY < 150) {
                    console.log(`  ↕ ${data.id}: translateY(${translateY.toFixed(1)}px)`);
                }
            }

        } catch (e) {
            console.log(`Error updating ${data.id}:`, e.message);
        }
    });

    isScrolling = false;
}

/**
 * DEBUG: Show current state
 */
export function debugParallax() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    console.log("=== PARALLAX DEBUG ===");
    console.log(`Scroll position: ${scrollY}px`);
    console.log(`Active elements: ${elementData.length}`);

    elementData.forEach(data => {
        try {
            const currentTransform = data.element.style.transform || 'none';
            console.log(`- ${data.id}: transform="${currentTransform}", speed=${data.speed}, lastTransform=${data.lastTransform.toFixed(1)}`);
        } catch (e) {
            console.log(`- ${data.id}: Error`);
        }
    });

    console.log("Scroll down and run debugParallax() again to see changes");
}

/**
 * TEST: Force transform an element
 */
export function testTransform(elementId) {
    try {
        const element = $w(`#${elementId}`);
        console.log(`Testing ${elementId}...`);

        // Try to transform
        element.style.transform = 'translateY(-100px)';
        console.log(`✓ Applied transform: translateY(-100px)`);

        setTimeout(() => {
            element.style.transform = 'translateY(0px)';
            console.log(`✓ Reset transform`);
        }, 1500);

    } catch (e) {
        console.log(`✗ Cannot transform #${elementId}:`, e.message);
    }
}

/**
 * Add parallax to new element
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
            lastTransform: 0
        });

        console.log(`✓ Added parallax to #${elementId} (speed: ${speed})`);
        handleScroll();

    } catch (e) {
        console.log(`✗ Cannot add parallax to #${elementId}`);
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
            data.element.style.transform = 'translateY(0px)';
        } catch (e) { }
        elementData.splice(index, 1);
        console.log(`✓ Removed parallax from #${elementId}`);
    }
}

/**
 * Update speed
 */
export function updateSpeed(elementId, newSpeed) {
    const data = elementData.find(d => d.id === elementId);
    if (data) {
        data.speed = newSpeed;
        console.log(`✓ Speed updated for #${elementId}: ${newSpeed}`);
        handleScroll();
    }
}

/**
 * Reset all transforms
 */
export function resetAll() {
    console.log("Resetting all parallax...");
    elementData.forEach(d => {
        try {
            d.element.style.transform = 'translateY(0px)';
            d.lastTransform = 0;
        } catch (e) { }
    });
    console.log("✓ All transforms reset");
}

/**
 * Disable all parallax
 */
export function disableAll() {
    resetAll();
    elementData = [];
    console.log("✓ Parallax disabled");
}

/**
 * Enable/Disable parallax toggle
 */
export function toggleParallax() {
    if (elementData.length > 0) {
        disableAll();
    } else {
        initParallax();
    }
}

// Optional button handlers
export function debugBtn_click(event) {
    debugParallax();
}

export function testBtn_click(event) {
    testTransform('backgroundImage1');
}

export function resetBtn_click(event) {
    resetAll();
}

export function toggleBtn_click(event) {
    toggleParallax();
}

// Auto-test on load (will show in console if working)
setTimeout(() => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollY === 0) {
        console.log("💡 TIP: Scroll down the page to see parallax effect!");
        console.log("💡 Or create a button with ID 'testBtn' to test movement");
    }
}, 2000);