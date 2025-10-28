// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

$w.onReady(function () {
    // When the image is clicked...
    $w('#swatch1').onClick(() => {
        // Change the URL of the iframe
        $w('#iFrameSwatch').src = "Home"; // Replace with your target URL
    });
});
