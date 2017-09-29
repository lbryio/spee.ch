function sendAuthRequest (channelName, password, url) {
    const params = `username=${channelName}&password=${password}`;
    return postRequest(url, params);
}