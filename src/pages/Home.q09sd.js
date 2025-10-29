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

$w.onReady(async function () {
    const user = wixUsers.currentUser;

    if (user.loggedIn) {
        const userId = user.id;

        const results = await wixData.get("Members/PrivateMembersData", userId);
        if (results) {
            const name = results.firstName || results.nickname || results.loginEmail;
            $w('#textUserName').text = `Welcome, ${name}!`;
        }
    } else {
        $w('#textUserName').text = "Welcome, Guest!";
    }
});