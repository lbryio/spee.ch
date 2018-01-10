module.exports = {
  replaceChannelSelectionInNavBar (loggedInChannel) {
    // remove the old channel option
    const oldChannel = document.getElementById('nav-bar-channel-select-channel-option');
    if (oldChannel) {
      oldChannel.parentNode.removeChild(oldChannel);
    }
    // create new channel option & select it
    const newChannelOption = document.createElement('option');
    newChannelOption.setAttribute('value', loggedInChannel);
    newChannelOption.setAttribute('id', 'nav-bar-channel-select-channel-option');
    newChannelOption.setAttribute('selected', '');
    newChannelOption.innerText = loggedInChannel;
    // add the new option
    const channelSelect = document.getElementById('nav-bar-channel-select');
    channelSelect.style.display = 'inline-block';
    channelSelect.insertBefore(newChannelOption, channelSelect.firstChild);
    // hide login
    const navBarLoginLink = document.getElementById('nav-bar-login-link');
    navBarLoginLink.style.display = 'none';
  },
}
