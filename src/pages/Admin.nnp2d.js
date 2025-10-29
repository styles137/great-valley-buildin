// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world
import wixData from 'wix-data';

$w.onReady(function () {
    // When the image is clicked...
    $w('#swatch1').onClick(() => {
        // Change the URL of the iframe
        $w('#iFrameSwatch').src = "https://www.gvbg.org/swatch1"; // Replace with your target URL
        //Modify BG Color 
        $w('#swatchBG').style.backgroundColor = "#718d9b"; // Replace with color
    });

    // When the image is clicked...
    $w('#swatch2').onClick(() => {
        // Change the URL of the iframe
        $w('#iFrameSwatch').src = "https://www.gvbg.org/swatch2"; // Replace with your target URL
        //Modify BG Color 
        $w('#swatchBG').style.backgroundColor = "#718d9b"; // Replace with color
    });

    // When the image is clicked...
    $w('#swatch3').onClick(() => {
        // Change the URL of the iframe
        $w('#iFrameSwatch').src = "https://www.gvbg.org/swatch3"; // Replace with your target URL
        //Modify BG Color 
        $w('#swatchBG').style.backgroundColor = "#718d9b"; // Replace with color
    });

    // When the image is clicked...
    $w('#swatch4').onClick(() => {
        // Change the URL of the iframe
        $w('#iFrameSwatch').src = "https://www.gvbg.org/swatch4"; // Replace with your target URL
        //Modify BG Color 
        $w('#swatchBG').style.backgroundColor = "#718d9b"; // Replace with color
    });

    //When the swatch is clicked
    // [1, 2, 3, 4].forEach(num => {
    //     $w(`#swatch${num}`).onClick(() => {
    //         $w('#iFrameSwatch').src = `https://www.gvbg.org/Swatch${num}`;
    //     });
    // });

    // Load the current setting
    const settings = wixData.get("SiteSettings", "globalSettings");
    $w('#contactUsSwitch').checked = settings.pageEnabled;

    // Handle switch toggle
    $w('#contactUsSwitch').onChange(async (event) => {
        const checked = event.target.checked;

        // Update the collection
        await wixData.update("SiteSettings", {
            _id: "globalSettings",
            pageEnabled: checked
        });

        console.log("Page enabled set to:", checked);
    });
});
