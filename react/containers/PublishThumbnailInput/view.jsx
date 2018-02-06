import React from 'react';

class PublishThumbnailInput extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      videoPreviewSrc: null,
      thumbnailError : null,
      thumbnailInput : '',
    }
    this.handleInput = this.handleInput.bind(this);
    this.updateVideoThumb = this.updateVideoThumb.bind(this);
  }
  handleInput (event) {
    const value = event.target.value;
    this.setState({thumbnailInput: value});
  }
  urlIsAnImage (url) {
    return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }
  testImage (url) {
    return new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      xhttp.open('HEAD', url, true);
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4) {
          if (xhttp.status === 200) {
            resolve();
          } else {
            reject();
          }
        }
      };
      xhttp.send();
    });
  }
  updateVideoThumb (event) {
    const imageUrl = event.target.value;
    if (this.urlIsAnImage(imageUrl)) {
      this.testImage(imageUrl, 3000)
        .then(() => {
          console.log('thumbnail is a valid image');
          this.props.onThumbnailChange('thumbnail', imageUrl);
          this.setState({thumbnailError: null});
        })
        .catch(error => {
          console.log('encountered an error loading thumbnail image url:', error);
          this.props.onThumbnailChange('thumbnail', null);
          this.setState({thumbnailError: 'That is an invalid image url'});
        });
    } else {
      this.props.onThumbnailChange('thumbnail', null);
      this.setState({thumbnailError: null});
    }
  }
  render () {
    return (
      <div>
        <div className="column column--3 column--sml-10">
          <label className="label">Thumbnail:</label>
        </div><div className="column column--6 column--sml-10">
          <div className="input-text--primary">
            <p className="info-message-placeholder info-message--failure">{this.state.thumbnailError}</p>
            <input
              type="text" id="claim-thumbnail-input"
              className="input-text input-text--full-width"
              placeholder="https://spee.ch/xyz/example.jpg"
              value={this.state.thumbnailInput}
              onChange={ (event) => {
                this.handleInput(event);
                this.updateVideoThumb(event);
              }} />
          </div>
        </div>
      </div>
    );
  }
}

export default PublishThumbnailInput;
