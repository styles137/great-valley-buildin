// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

// $w.onReady(function () {
//     // Get current site menu items
//     let items = $w('#siteMenu1').items;

//     // Filter out one of them (e.g., hide "Admin")
//     items = items.filter(item => item.label !== "Admin");

//     // Apply back to the site menu
//     $w('#siteMenu1').items = items;
// });

//If you want to hide a page like "Dashboard" only for guests:
import wixUsers from 'wix-users';
import wixData from 'wix-data';
import { itemVariants } from 'wix-restaurants.v2';
import wixWindow from 'wix-window';

$w.onReady(async function () {
    const user = wixUsers.currentUser;

    const isMobileDevice = wixWindow.formFactor === "Mobile" || /Mobi|Android/i.test(navigator.userAgent);

    if (isMobileDevice) {
        // Hide specific elements for mobile
        $w('#homeMovingLayer').hide();
        $w('#textUserName').hide();
        //$w('#textUserName').collapse();

        console.log("Mobile device detected — elements hidden");
    } else {
        //$w('#textUserName').style.color = "#ffffff";
        //$w('#textUserName').html = '<p style="color:#ffffff;">Welcome back!</p>';
        console.log("Desktop or tablet — all visible");
    }

    // Get current site menu items
    let items = $w('#siteMenu1').items;
    let webmasterItems = $w('#siteMenu1').items;
    console.log("Items:", items);

    // Filter out one of them (e.g., hide "Admin")
    items = items.filter(item => item.label !== "Home");
    items = items.filter(item => item.label !== "Projects");
    items = items.filter(item => item.label !== "About");
    items = items.filter(item => item.label !== "Fog");
    items = items.filter(item => item.label !== "Net");
    items = items.filter(item => item.label !== "Waves");
    items = items.filter(item => item.label !== "Clouds");
    items = items.filter(item => item.label !== "Net");
    items = items.filter(item => item.label !== "Admin");

    console.log("Items:", items);
    // Apply back to the site menu
    $w('#siteMenu1').items = items;


    //Exclude viewing these pages
    const exclude = ["Admin", "Home", "Projects", "About", "Fog", "Clouds", "Net", "Waves", "Wonts"];

    if (user.loggedIn) {
        const userId = user.id;

        try {
            // "Members/PrivateMembersData" is a special built-in collection
            const member = await wixData.get("Members/PrivateMembersData", userId);
            console.log("Results:", member.name, member.nickname, member.loginEmail);
            if (member.loginEmail == 'ibarwick@me.com') {
                // Try to find the most relevant name field
                const name = member.name || member.nickname || member.loginEmail;
                console.log("Items1:", items);
                //$w('#textUserName').style.color = "#ffffff";
                //$w('#textUserName').html = '<p style="color:#ffffff;">Welcome back!</p>';
                //$w('#textUserName').text = `Welcome back, WebMaster Ian`;
                $w('#siteMenu1').items = webmasterItems;
            }
            else if (member) {
                // Try to find the most relevant name field
                const name = member.name || member.nickname || member.loginEmail;
                //$w('#textUserName').html = '<p style="color:#ffffff;">Welcome back!</p>';
                //$w('#textUserName').style.color = "#ffffff";
                //$w('#textUserName').text = `Welcome back, ${name}!`;
                // Filter out one of them (e.g., hide "Admin")
                // items = items.filter(item => item.label !== "Admin");
                // items = items.filter(item => item.label !== "home");
                // items = items.filter(item => item.label !== "fog");
                //items = items.filter(item => item.label !== "Projects");
                console.log("Items2:", items);
                //items = items.filter(item => !exclude.includes(item.label));
                // Apply back to the site menu
                $w('#siteMenu1').items = items;
            } else {
                //$w('#textUserName').html = '<p style="color:#ffffff;">Welcome back!</p>';
                //$w('#textUserName').style.color = "#ffffff";
                //$w('#textUserName').text = "Welcome back!";
                // Filter out one of them (e.g., hide "Admin")
                // items = items.filter(item => item.label !== "Admin");
                // items = items.filter(item => item.label !== "home");
                // items = items.filter(item => item.label !== "fog");
                //items = items.filter(item => item.label !== "Projects");
                console.log("Items3:", items);
                //items = items.filter(item => !exclude.includes(item.label));
                // Apply back to the site menu
                $w('#siteMenu1').items = items;
            }
        } catch (err) {
            console.error("Error getting member data:", err);
            //$w('#textUserName').html = '<p style="color:#ffffff;">Welcome back!</p>';
            //$w('#textUserName').style.color = "#ffffff";
            //$w('#textUserName').text = "Welcome!";
            // items = items.filter(item => item.label !== "Admin");
            // items = items.filter(item => item.label !== "home");
            // items = items.filter(item => item.label !== "fog");
            //items = items.filter(item => item.label !== "Projects");
            console.log("Items4:", items);
            //items = items.filter(item => !exclude.includes(item.label));
            // Apply back to the site menu
            $w('#siteMenu1').items = items;
        }
    } else {
        //$w('#textUserName').html = '<p style="color:#ffffff;">Welcome back!</p>';
        //$w('#textUserName').style.color = "#ffffff";
        //$w('#textUserName').text = "Welcome, Guest!";
        // items = items.filter(item => item.label !== "Admin");
        // items = items.filter(item => item.label !== "home");
        // items = items.filter(item => item.label !== "fog");
        //items = items.filter(item => item.label !== "Projects");
        console.log("Items5:", items);
        //items = items.filter(item => !exclude.includes(item.label));
        // Apply back to the site menu
        $w('#siteMenu1').items = items;
    }


});
//second attempt below
//

//Try2
// import wixUsers from 'wix-users';
// import wixData from 'wix-data';
// import wixWindow from 'wix-window';
// import wixLocation from 'wix-location';

// $w.onReady(async function () {
//     const siteMenu = $w('#siteMenu1');
//     let items = siteMenu.items;
//     const user = wixUsers.currentUser;

//     console.log("Original Menu Items:", items.map(i => i.label));
//     console.log("Menu labels (with quotes):", items.map(i => `"${i.label}"`).join(", "));

//     // Define exclusions
//     const guestExclude = ["Admin", "Projects", "About"];
//     const memberExclude = ["Admin"];
//     const webmasterEmail = "ibarwick@me.com";

//     // --- Helper: Safe filter that ignores case + spaces ---
//     const safeFilter = (items, excludeList) => {
//         const normalizedExcludes = excludeList.map(e => e.trim().toLowerCase());
//         return items.filter(item => {
//             const label = item.label.trim().toLowerCase();
//             return !normalizedExcludes.includes(label);
//         });
//     };

//     // ---- Guest ----
//     if (!user.loggedIn) {
//         console.log("Guest detected — filtering menu...");
//         const filtered = safeFilter(items, guestExclude);
//         siteMenu.items = filtered;
//         if ($w('#textUserName')) $w('#textUserName').text = "Welcome, Guest!";
//         console.log("Guest menu:", filtered.map(i => i.label));
//         return;
//     }

//     // ---- Logged in ----
//     try {
//         const member = wixData.get("Members/PrivateMembersData", user.id);
//         const email = member.loginEmail;
//         const name = member.name || member.nickname || email;

//         if (email === webmasterEmail) {
//             // Webmaster sees everything
//             if ($w('#textUserName')) $w('#textUserName').text = `Welcome back, WebMaster Ian`;
//             siteMenu.items = items;
//             console.log("Webmaster menu:", items.map(i => i.label));
//         } else {
//             // Regular member — hide only Admin
//             const filtered = safeFilter(items, memberExclude);
//             siteMenu.items = filtered;
//             if ($w('#textUserName')) $w('#textUserName').text = `Welcome back, ${name}!`;
//             console.log("Member menu:", filtered.map(i => i.label));
//         }
//     } catch (err) {
//         console.error("Error getting member data:", err);
//         const filtered = safeFilter(items, guestExclude);
//         siteMenu.items = filtered;
//         if ($w('#textUserName')) $w('#textUserName').text = "Welcome!";
//         console.log("Fallback guest menu:", filtered.map(i => i.label));
//     }
// });

//****Home page HTML code in editor*/
// <!-- Moving Fog Background -->
// <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/vanta/dist/vanta.fog.min.js"></script>

// <div id="vanta-bg"
//      style="width:100vw; height:100vh; position:fixed; top:0; left:0; z-index:-1; opacity:0.7;">
// </div>

// <script>
// VANTA.FOG({
//   el: "#vanta-bg",
//   mouseControls: true,
//   touchControls: true,
//   highlightColor: 0xffffff,
//   midtoneColor: 0x718d9b,
//   lowlightColor: 0x95baba,
//   baseColor: 0x162d3a,
//   blurFactor: 0.7,
//   speed: 1.5,
// });
// </script>