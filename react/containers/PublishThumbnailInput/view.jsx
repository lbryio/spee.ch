import React from 'react';

class PublishThumbnailInput extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      videoPreviewSrc: null,
    }
    this.urlIsAnImage = this.urlIsAnImage.bind(this);
    this.testImage = this.testImage.bind(this);
    this.updateVideoThumb = this.updateVideoThumb.bind(this);
  }
  urlIsAnImage (url) {
    return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }
  testImage (url, timeoutT) {
    return new Promise(function (resolve, reject) {
      const timeout = timeoutT || 5000;
      let timer;
      let img = new Image();
      img.onerror = img.onabort = function () {
        clearTimeout(timer);
        reject('error');
      };
      img.onload = function () {
        clearTimeout(timer);
        resolve('success');
      };
      timer = setTimeout(function () {
        // reset .src to invalid URL so it stops previous
        // loading, but doesn't trigger new load
        img.src = '//!!!!/test.jpg';
        reject('timeout');
      }, timeout);
      img.src = url;
    });
  }
  updateVideoThumb (event) {
    var imageUrl = event.target.value;
    const that = this;
    if (this.urlIsAnImage(imageUrl)) {
      this.testImage(imageUrl, 3000)
        .then(function (result) {
          if (result === 'success') {
            that.props.onThumbnailChange('thumbnail', imageUrl);
          } else if (result === 'timeout') {
            console.log('could not resolve the provided thumbnail image url');
          }
        })
        .catch(error => {
          console.log('encountered an error loading thumbnail image url:', error);
        });
    }
  }
  render () {
    return (
      <div>
        <div className="column column--3 column--sml-10">
          <label className="label">Thumbnail:</label>
        </div><div className="column column--6 column--sml-10">
          <div className="input-text--primary">
            <input type="text" id="claim-thumbnail-input" className="input-text input-text--full-width" placeholder="https://spee.ch/xyz/example.jpg" value={this.props.thumbnail} onInput={this.updateVideoThumb} />
          </div>
        </div>
      </div>
    );
  }
}

export default PublishThumbnailInput;
