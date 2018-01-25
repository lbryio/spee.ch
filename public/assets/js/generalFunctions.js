// Create new error objects, that prototypically inherit from the Error constructor
function FileError(message) {
  this.name = 'FileError';
  this.message = message || 'Default Message';
  this.stack = (new Error()).stack;
}
FileError.prototype = Object.create(Error.prototype);
FileError.prototype.constructor = FileError;

function NameError(message) {
  this.name = 'NameError';
  this.message = message || 'Default Message';
  this.stack = (new Error()).stack;
}
NameError.prototype = Object.create(Error.prototype);
NameError.prototype.constructor = NameError;

function ChannelNameError(message) {
    this.name = 'ChannelNameError';
    this.message = message || 'Default Message';
    this.stack = (new Error()).stack;
}
ChannelNameError.prototype = Object.create(Error.prototype);
ChannelNameError.prototype.constructor = ChannelNameError;

function ChannelPasswordError(message) {
    this.name = 'ChannelPasswordError';
    this.message = message || 'Default Message';
    this.stack = (new Error()).stack;
}
ChannelPasswordError.prototype = Object.create(Error.prototype);
ChannelPasswordError.prototype.constructor = ChannelPasswordError;

function AuthenticationError(message) {
    this.name = 'AuthenticationError';
    this.message = message || 'Default Message';
    this.stack = (new Error()).stack;
}
AuthenticationError.prototype = Object.create(Error.prototype);
AuthenticationError.prototype.constructor = AuthenticationError;

function showAssetDetails(event) {
    var thisAssetHolder = document.getElementById(event.target.id);
    var thisAssetImage = thisAssetHolder.firstElementChild;
    var thisAssetDetails = thisAssetHolder.lastElementChild;
    thisAssetImage.style.opacity = 0.2;
    thisAssetDetails.setAttribute('class', 'grid-item-details flex-container--column flex-container--center-center');
}

function hideAssetDetails(event) {
    var thisAssetHolder = document.getElementById(event.target.id);
    var thisAssetImage = thisAssetHolder.firstElementChild;
    var thisAssetDetails = thisAssetHolder.lastElementChild;
    thisAssetImage.style.opacity = 1;
    thisAssetDetails.setAttribute('class', 'hidden');
}
