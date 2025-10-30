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
    const siteMenu = $w('#siteMenu1');
    let items = siteMenu.items;
    const user = wixUsers.currentUser;

    console.log("Original Menu Items:", items.map(i => i.label));
    console.log("Menu labels (with quotes):", items.map(i => `"${i.label}"`).join(", "));

    // Define exclusions
    const guestExclude = ["Admin", "Projects", "About"];
    const memberExclude = ["Admin"];
    const webmasterEmail = "ibarwick@me.com";

    // --- Helper: Safe filter that ignores case + spaces ---
    const safeFilter = (items, excludeList) => {
        const normalizedExcludes = excludeList.map(e => e.trim().toLowerCase());
        return items.filter(item => {
            const label = item.label.trim().toLowerCase();
            return !normalizedExcludes.includes(label);
        });
    };

    // ---- Guest ----
    if (!user.loggedIn) {
        console.log("Guest detected — filtering menu...");
        const filtered = safeFilter(items, guestExclude);
        siteMenu.items = filtered;
        if ($w('#textUserName')) $w('#textUserName').text = "Welcome, Guest!";
        console.log("Guest menu:", filtered.map(i => i.label));
        return;
    }

    // ---- Logged in ----
    try {
        const member = wixData.get("Members/PrivateMembersData", user.id);
        const email = member.loginEmail;
        const name = member.name || member.nickname || email;

        if (email === webmasterEmail) {
            // Webmaster sees everything
            if ($w('#textUserName')) $w('#textUserName').text = `Welcome back, WebMaster Ian`;
            siteMenu.items = items;
            console.log("Webmaster menu:", items.map(i => i.label));
        } else {
            // Regular member — hide only Admin
            const filtered = safeFilter(items, memberExclude);
            siteMenu.items = filtered;
            if ($w('#textUserName')) $w('#textUserName').text = `Welcome back, ${name}!`;
            console.log("Member menu:", filtered.map(i => i.label));
        }
    } catch (err) {
        console.error("Error getting member data:", err);
        const filtered = safeFilter(items, guestExclude);
        siteMenu.items = filtered;
        if ($w('#textUserName')) $w('#textUserName').text = "Welcome!";
        console.log("Fallback guest menu:", filtered.map(i => i.label));
    }
});