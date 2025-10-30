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
//second attempt below
// 

//Try2
import wixUsers from 'wix-users';
import wixData from 'wix-data';
import wixWindow from 'wix-window';
import wixLocation from 'wix-location';

$w.onReady(async function () {
    // Wait for page + menu to fully load
    //await wixWindow.waitForViewportEnter();

    const siteMenu = $w('#siteMenu1');
    let items = siteMenu.items; // always fresh
    const user = wixUsers.currentUser;

    console.log("Original Menu Items:", items.map(i => i.label));

    // Define what each user type should not see
    const guestExclude = ["Admin", "Projects", "About"];
    const memberExclude = ["Admin"]; // regular members hide Admin
    const webmasterEmail = "ibarwick@me.com"; // your admin email

    // ---- Guest ----
    if (!user.loggedIn) {
        console.log("Guest detected — filtering menu...");
        const filtered = items.filter(item => !guestExclude.includes(item.label));
        siteMenu.items = filtered;
        $w('#textUserName').text = "Welcome, Guest!";
        console.log("Guest menu:", filtered.map(i => i.label));
        console.log("Menu labels:", items.map(i => `"${i.label}"`).join(", "));
        return; // exit early
    }

    // ---- Logged in ----
    try {
        const member = await wixData.get("Members/PrivateMembersData", user.id);
        const email = member.loginEmail;
        const name = member.name || member.nickname || email;

        if (email === webmasterEmail) {
            // Webmaster sees all
            $w('#textUserName').text = `Welcome back, WebMaster Ian`;
            siteMenu.items = items; // show all
            console.log("Webmaster menu:", items.map(i => i.label));
            console.log("Menu labels:", items.map(i => `"${i.label}"`).join(", "));
        } else {
            // Regular member hides Admin
            const filtered = items.filter(item => !memberExclude.includes(item.label));
            siteMenu.items = filtered;
            $w('#textUserName').text = `Welcome back, ${name}!`;
            console.log("Member menu:", filtered.map(i => i.label));
            console.log("Menu labels:", items.map(i => `"${i.label}"`).join(", "));
        }
    } catch (err) {
        console.error("Error getting member data:", err);
        const filtered = items.filter(item => !guestExclude.includes(item.label));
        siteMenu.items = filtered;
        $w('#textUserName').text = "Welcome!";
        console.log("Fallback guest menu:", filtered.map(i => i.label));
        console.log("Menu labels:", items.map(i => `"${i.label}"`).join(", "));
    }
});