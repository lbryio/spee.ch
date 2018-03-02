import React from 'react';

function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString = atob(dataURI.split(',')[1]);
  // separate out the mime component
  let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  // write the bytes of the string to a typed array
  let ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], {type: mimeString});
}

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
    this.handleVideoLoadedData = this.handleVideoLoadedData.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.createThumbnail = this.createThumbnail.bind(this);
  }
  componentDidMount () {
    const { file } = this.props;
    this.setVideoSource(file);
  }
  componentWillReceiveProps (nextProps) {
    // if file changes
    if (nextProps.file && nextProps.file !== this.props.file) {
      const { file } = nextProps;
      this.setVideoSource(file);
    };
  }
  setVideoSource (file) {
    const previewReader = new FileReader();
    previewReader.readAsDataURL(file);
    previewReader.onloadend = () => {
      console.log('preview reader complete');
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
  createThumbnail () {
    // take a snapshot
    let video = document.getElementById('video-thumb-player');
    let canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL();
    const snapshot = dataURItoBlob(dataUrl)
    // set the thumbnail in redux store
    if (snapshot) {
      this.props.onNewThumbnail(snapshot);
    }
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
            onSeeked={this.createThumbnail}
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
              <p className='info-message' >loading... </p>
            )
          }
        </div>
      </div>
    );
  }
}

export default PublishThumbnailInput;
