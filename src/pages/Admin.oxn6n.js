// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

$w.onReady(function () {
    $w('#AIAssistBtn').onClick(() => {
        // Change the URL of the iframe
        $w('#AIiFrame').src = "https://wix-ai-assistant-2f1a896a.base44.app/"; // Replace with your target URL
    });
});
