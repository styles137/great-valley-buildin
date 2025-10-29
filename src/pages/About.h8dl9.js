// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(async function () {
    const settings = await wixData.get("SiteSettings", "globalSettings");

    if (!settings.pageEnabled) {
        // Option 1: Redirect visitors
        //wixLocation.to("/home");

        // Option 2: Hide content instead (if you prefer)
        $w('#image4').hide("");
    }
});

