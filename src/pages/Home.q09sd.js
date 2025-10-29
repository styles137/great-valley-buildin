// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

$w.onReady(function () {
    $w('#siteMenu1').onReady(() => {
        const items = $w('#siteMenu1').items; // get all menu items

        // Filter out or hide a specific page by label or link
        const filteredItems = items.filter(item => item.label !== "Admin");

        // Apply filtered list back to menu
        $w('#siteMenu1').items = filteredItems;
    });
});