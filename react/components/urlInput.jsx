import React from 'react';

class UrlInput extends React.Component {
  constructor (props) {
    super(props);
    this.updateUrl = this.updateUrl.bind(this);
  }
  updateUrl (selectedOption) {
    const urlChannel = document.getElementById('url-channel');
    const urlNoChannelPlaceholder = document.getElementById('url-no-channel-placeholder');
    const urlChannelPlaceholder = document.getElementById('url-channel-placeholder');
    if (selectedOption === 'new' || selectedOption === 'login' || selectedOption === ''){
      urlChannel.hidden = true;
      urlNoChannelPlaceholder.hidden = true;
      urlChannelPlaceholder.hidden = false;
    } else if (selectedOption === 'anonymous'){
      urlChannel.hidden = true;
      urlNoChannelPlaceholder.hidden = false;
      urlChannelPlaceholder.hidden = true;
    } else {
      urlChannel.hidden = false;
      // show channel and short id
      const selectedChannel = getCookie('channel_name');
      const shortChannelId = getCookie('short_channel_id');
      urlChannel.innerText = `${selectedChannel}:${shortChannelId}`;
      urlNoChannelPlaceholder.hidden = true;
      urlChannelPlaceholder.hidden = true;
    }
  }
  render () {
    return (
      <div>
        <h3>url component</h3>
      </div>
    );
  }
}

module.exports = UrlInput;
