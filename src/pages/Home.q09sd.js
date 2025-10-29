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

$w.onReady(function () {
    let items = $w('#siteMenu1').items;
    const user = wixUsers.currentUser;

    if (!user.loggedIn) {
        items = items.filter(item => item.label !== "Dashboard");
    }

    $w('#siteMenu1').items = items;
    console.log("Is user logged in?", user.loggedIn);
    if (user.loggedIn) {
        const contact = await wixCRM.getContact(user.id);
        console.log("Contact info:", contact);

        // For example:
        console.log("First Name:", contact.firstName);
        console.log("Last Name:", contact.lastName);
    }
});