// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

$w.onReady(function () {
    //When the swatch is clicked
    [1, 2, 3, 4].forEach(num => {
        $w(`#swatch${num}`).onClick(() => {
            $w('#iFrameSwatch').src = `https://www.gvbg.org/swatch${num}`;
        });
    });
});
