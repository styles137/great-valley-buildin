// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

$w.onReady(function () {
    // When the image is clicked...
    $w('#swatch1').onClick(() => {
        // Change the URL of the iframe
        $w('#iFrameSwatch').src = "https://www.gvbg.org/swatch1"; // Replace with your target URL
    });

    // When the image is clicked...
    $w('#swatch2').onClick(() => {
        // Change the URL of the iframe
        $w('#iFrameSwatch').src = "https://www.gvbg.org/swatch2"; // Replace with your target URL
    });

    // When the image is clicked...
    $w('#swatch3').onClick(() => {
        // Change the URL of the iframe
        $w('#iFrameSwatch').src = "https://www.gvbg.org/swatch3"; // Replace with your target URL
    });

    // When the image is clicked...
    $w('#swatch4').onClick(() => {
        // Change the URL of the iframe
        $w('#iFrameSwatch').src = "https://www.gvbg.org/swatch4"; // Replace with your target URL
    });

    //When the swatch is clicked
    // [1, 2, 3, 4].forEach(num => {
    //     $w(`#swatch${num}`).onClick(() => {
    //         $w('#iFrameSwatch').src = `https://www.gvbg.org/Swatch${num}`;
    //     });
    // });
});
