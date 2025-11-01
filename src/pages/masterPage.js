// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

import wixUsers from 'wix-users';
import wixData from 'wix-data'; // only if you need member info

$w.onReady(async function () {
    const user = wixUsers.currentUser;
    // default state: show guest, hide member
    $w('#guestMenu').show();
    $w('#memberMenu').hide();

    if (user.loggedIn) {
        // If you only need "logged in vs guest"
        $w('#guestMenu').hide();
        $w('#memberMenu').show();

        // If you need to check for specific admin email:
        try {
            const member = await wixData.get("Members/PrivateMembersData", user.id);
            if (member && member.loginEmail === 'ibarwick@me.com') {
                // show admin-specific menu if you have one
                // $w('#memberMenu').hide(); $w('#adminMenu').show();
            }
        } catch (e) {
            console.error('Member lookup failed', e);
        }
    }
});
