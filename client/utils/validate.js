export const validateChannelSelection = (publishInChannel, selectedChannel, loggedInChannel) => {
  if (publishInChannel && (selectedChannel !== loggedInChannel.name)) {
    throw new Error('Log in to a channel or select Anonymous');
  }
};

export const validatePublishParams = (file, claim, urlError) => {
  if (!file) {
    throw new Error('Please choose a file');
  }
  if (!claim) {
    throw new Error('Please enter a URL');
  }
  if (urlError) {
    throw new Error('Fix the url');
  }
};
