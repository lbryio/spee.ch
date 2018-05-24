export const validateChannelSelection = (publishInChannel, selectedChannel, loggedInChannel) => {
  if (publishInChannel && (selectedChannel !== loggedInChannel.name)) {
    throw new Error('Log in to a channel or select Anonymous');
  }
};

export const validateNoPublishErrors = ({file, url, channel}) => {
  if (file || url || channel) {
    throw new Error('Fix the errors identified in red');
  }
};

export const validateCreateChannelNameInput = ({value, error}) => {
  if (!value) {
    throw new Error('Please enter a channel name');
  }
  if (error) {
    throw new Error(error);
  }
};

export const validateCreateChannelPasswordInput = ({value, error}) => {
  if (!value) {
    throw new Error('Please enter a password');
  }
  if (error) {
    throw new Error(error);
  }
};
