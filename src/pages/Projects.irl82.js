// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

$w.onReady(function () {
    // Load GSAP + ScrollTrigger
    const gsapURL = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
    const scrollTriggerURL = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js";

    Promise.all([
        import(gsapURL),
        import(scrollTriggerURL)
    ])
        .then(([gsap, ScrollTrigger]) => {
            // Register plugin
            gsap.gsap.registerPlugin(ScrollTrigger.ScrollTrigger);

            // Fade in sections as you scroll
            gsap.gsap.utils.toArray(".fadeIn").forEach(section => {
                gsap.gsap.from(section, {
                    opacity: 0,
                    y: 50,
                    duration: 1.4,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            });

            // Smooth scrolling mimic (optional)
            let scrollTarget = 0;
            let scrollCurrent = 0;
            const scrollEase = 0.08;

            function smoothScroll() {
                scrollCurrent += (scrollTarget - scrollCurrent) * scrollEase;
                window.scrollTo(0, scrollCurrent);
                requestAnimationFrame(smoothScroll);
            }

            window.addEventListener("scroll", () => {
                scrollTarget = window.scrollY;
            });

            smoothScroll();
        })
        .catch(err => console.error("Error loading GSAP:", err));
});
