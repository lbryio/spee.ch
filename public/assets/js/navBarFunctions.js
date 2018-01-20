function toggleNavBarSelection (value) {
    const selectedOption = value;
    if (selectedOption === 'LOGOUT') {
        // remove session cookies
        clearUserCookies();
        // send logout request to server
        window.location.href = '/logout';
    } else if (selectedOption === 'VIEW') {
        // get channel info
        const channelName = getCookie('CHANNEL_NAME');
        const channelClaimId = getCookie('CHANNEL_LONG_ID');
        // redirect to channel page
        window.location.href = `/${channelName}:${channelClaimId}`;
    }
}
