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

$w.onReady(async function () {
    const user = wixUsers.currentUser;

    // Get current site menu items
    let items = $w('#siteMenu1').items;

    // Filter out one of them (e.g., hide "Admin")
    items = items.filter(item => item.label !== "Admin");
    // Apply back to the site menu
    $w('#siteMenu1').items = items;


    //Exclude viewing these pages
    const exclude = ["Admin", "home", "projects", "about", "fog", "clouds", "net", "waves", "fonts"];

    if (user.loggedIn) {
        const userId = user.id;

        try {
            // "Members/PrivateMembersData" is a special built-in collection
            const member = await wixData.get("Members/PrivateMembersData", userId);
            console.log("Results:", member.name, member.nickname, member.loginEmail);
            if (member.loginEmail == 'ibarwick@me.com') {
                // Try to find the most relevant name field
                const name = member.name || member.nickname || member.loginEmail;
                $w('#textUserName').text = `Welcome back, WebMaster Ian`;
            }
            else if (member) {
                // Try to find the most relevant name field
                const name = member.name || member.nickname || member.loginEmail;
                $w('#textUserName').text = `Welcome back, ${name}!`;
                // Filter out one of them (e.g., hide "Admin")
                items = items.filter(item => item.label !== "Admin");
                items = items.filter(item => item.label !== "home");
                items = items.filter(item => item.label !== "fog");
                items = items.filter(item => item.label !== "projects");
                //items = items.filter(item => !exclude.includes(item.label));
                // Apply back to the site menu
                $w('#siteMenu1').items = items;
            } else {
                $w('#textUserName').text = "Welcome back!";
                // Filter out one of them (e.g., hide "Admin")
                items = items.filter(item => item.label !== "Admin");
                items = items.filter(item => item.label !== "home");
                items = items.filter(item => item.label !== "fog");
                items = items.filter(item => item.label !== "projects");
                //items = items.filter(item => !exclude.includes(item.label));
                // Apply back to the site menu
                $w('#siteMenu1').items = items;
            }
        } catch (err) {
            console.error("Error getting member data:", err);
            $w('#textUserName').text = "Welcome!";
            items = items.filter(item => item.label !== "Admin");
            items = items.filter(item => item.label !== "home");
            items = items.filter(item => item.label !== "fog");
            items = items.filter(item => item.label !== "projects");
            //items = items.filter(item => !exclude.includes(item.label));
            // Apply back to the site menu
            $w('#siteMenu1').items = items;
        }
    } else {
        $w('#textUserName').text = "Welcome, Guest!";
        items = items.filter(item => item.label !== "Admin");
        items = items.filter(item => item.label !== "home");
        items = items.filter(item => item.label !== "fog");
        items = items.filter(item => item.label !== "projects");
        //items = items.filter(item => !exclude.includes(item.label));
        // Apply back to the site menu
        $w('#siteMenu1').items = items;
    }
});