// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

import wixWindow from 'wix-window';

$w.onReady(function () {
    $w('#BG1').onClick(() => {
        // Change background image dynamically
        $w('#Swatch1').background.src = "https://static.wixstatic.com/media/a4a336_1a1b2b1221744620b116a7b095ab7c71~mv2.jpg";
    });

    $w('#BG2').onClick(() => {
        // Change background image dynamically
        $w('#Swatch1').background.src = "https://static.wixstatic.com/media/a4a336_85df8842d3444e04a9405fb8a1d0e0c2~mv2.jpg";
    });

    $w('#BG3').onClick(() => {
        // Change background image dynamically
        $w('#Swatch1').background.src = "https://static.wixstatic.com/media/a4a336_54e2f8329fca4be5b7d3c0e0aa16eadc~mv2.jpg";
    });

    $w('#BG4').onClick(() => {
        // Change background image dynamically
        $w('#Swatch1').background.src = "https://static.wixstatic.com/media/a4a336_5d842850e8d34fb8a163b33172a1df09~mv2.jpg";
    });

    $w('#BG5').onClick(() => {
        // Change background image dynamically
        $w('#Swatch1').backgroundColor = "#718D9B";
    });

    $w('#BG6').onClick(() => {
        // Change background image dynamically
        $w('#Swatch1').backgroundColor = "#ffffff";
    });
});
