function toggleNavBarSelection (value) {
    const selectedOption = value;
    if (selectedOption === 'LOGOUT') {
        // remove session cookies
        clearUserCookies();
        // send logout request to server
        window.location.href = '/logout';
    } else if (selectedOption === 'VIEW') {
        // get channel info
        const channelName = getCookie('channel_name');
        const channelClaimId = getCookie('channel_claim_id');
        // redirect to channel page
        window.location.href = `/${channelName}:${channelClaimId}`;
    }
}