import React from 'react';

class PublishThumbnailInput extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      videoSource   : null,
      error         : null,
      sliderMinRange: 1,
      sliderMaxRange: null,
      sliderValue   : null,
    };
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleVideoLoadedData = this.handleVideoLoadedData.bind(this);
    this.setThumbnailWithSnapshot = this.setThumbnailWithSnapshot.bind(this);
  }
  componentDidMount () {
    this.setThumbnailClaimAndUrl();
    this.setVideoSource();
  }
  setThumbnailClaimAndUrl () {
    const { claim, host, thumbnailChannel } = this.props;
    const url = `${host}/${thumbnailChannel}/${claim}-thumb.png`;
    this.props.onThumbnailChange(`${claim}-thumb`, url);
  }
  setVideoSource () {
    const { file } = this.props;
    const previewReader = new FileReader();
    previewReader.readAsDataURL(file);
    previewReader.onloadend = () => {
      this.setState({videoSource: previewReader.result});
    };
  }
  handleVideoLoadedData (event) {
    const duration = event.target.duration;
    // set the slider
    this.setState({
      sliderMaxRange: duration * 100,
      sliderValue   : duration * 100 / 2,
    });
    // update the current time of the video
    let video = document.getElementById('video-thumb-player');
    video.currentTime = duration / 2;
  }
  handleSliderChange (event) {
    const value = parseInt(event.target.value);
    // update the slider value
    this.setState({
      sliderValue: value,
    });
    // update the current time of the video
    let video = document.getElementById('video-thumb-player');
    video.currentTime = value / 100;
  }
  setThumbnailWithSnapshot () {
    // take a snapshot
    const snapshot = this.takeSnapShot();
    // set the thumbnail in redux store
    if (snapshot) this.props.onThumbnailFileSelect(snapshot);
  }
  takeSnapShot () {
    let video = document.getElementById('video-thumb-player');
    let canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL();
    return imageDataUrl;
  }
  render () {
    const { error, videoSource, sliderMinRange, sliderMaxRange, sliderValue } = this.state;
    return (
      <div>
        <div>
          { error ? (
            <p className='info-message--failure'>{error}</p>
          ) : (
            <p className='info-message'>Use slider to set thumbnail:</p>
          )}
          <video
            id='video-thumb-player'
            preload='metadata'
            muted
            style={{display: 'none'}}
            playsInline
            onLoadedData={this.handleVideoLoadedData}
            src={videoSource}
            onTimeUpdate={this.setThumbnailWithSnapshot}
          />
          {
            sliderValue ? (
              <div className='slide-container'>
                <input
                  type='range'
                  min={sliderMinRange}
                  max={sliderMaxRange}
                  value={sliderValue}
                  className='slider'
                  onChange={this.handleSliderChange}
                />
              </div>
            ) : (
              <p>loading slider... </p>
            )
          }
        </div>
      </div>
    );
  }
}

export default PublishThumbnailInput;
