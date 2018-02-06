import React from 'react';

const ThumbnailPreview = ({dataUrl}) => {
  const divStyle = {
    width  : '30%',
    margin : '1%',
    display: 'inline-block',
    border : 'solid 1px black',
  }
  const imageStyle = {
    width  : '100%',
    display: 'block',
  }
  return (
    <div style={divStyle}>
      { dataUrl ? (
        <img style={imageStyle} src={dataUrl} alt='image preview here' />
      ) : (
        <p>loading...</p>
        )
      }
    </div>
  );
}

class PublishThumbnailInput extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: null,
    };
  }
  componentDidMount () {
    this.setClaimAndThumbailUrl(this.props.publishClaim);
    this.previewThumbnails(this.props.publishFile);
  }
  componentWillReceiveProps (nextProps) {
    // if (nextProps.publishFile !== this.publishFile) {
    //   this.createThumbnails(nextProps.publishFile);
    // }
    if (nextProps.publishClaim !== this.props.publishClaim) {
      console.log(nextProps.publishClaim, this.props.publishClaim);
      this.setClaimAndThumbailUrl(nextProps.publishClaim);
    }
  }
  previewThumbnails (videoFile) {
    console.log('video file:', videoFile);
    this.loadFileAndReturnThumbnails(videoFile)
      .then((thumbnail) => {
        console.log('thumbs:', thumbnail);
        this.selectVideoThumb(thumbnail);
        this.setPossibleThumbnailFiles(thumbnail, thumbnail, thumbnail);
      })
      .catch(error => {
        console.log('error:', error);
        this.setState({error: error.message});
      });
  }
  loadFileAndReturnThumbnails (file) {
    return new Promise((resolve, reject) => {
      var fileReader = new FileReader();
      fileReader.onload = () => {
        console.log('file loaded');
        const blob = new Blob([fileReader.result], {type: file.type});
        const url = URL.createObjectURL(blob);
        let video = document.createElement('video');
        const snapShot = (time) => {
          console.log('creating thubmnail @', time);
          // video.currentTime = time;
          let canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageDataUrl = canvas.toDataURL();
          const success = imageDataUrl.length > 1000;
          if (success) {
            return imageDataUrl;
          }
          return success;
        }
        const loadedata = () => {
          console.log('loadeddata');
          console.log('readyState', video.readyState);
          const duration = video.duration;
          console.log('readyState', duration);
          const thumb = snapShot(duration / 2);
          resolve(thumb);
        }
        video.addEventListener('loadeddata', loadedata);
        video.preload = 'metadata';
        video.src = url;
        // Load video in Safari / IE11
        video.muted = true;
        video.playsInline = true;
        video.play();
      };
      fileReader.readAsArrayBuffer(file);
    });
  }
  selectVideoThumb (dataUrl) {
    // update this.props.selectedFile
    this.props.onThumbnailFileSelect(dataUrl);
  }
  setPossibleThumbnailFiles (fileOne, fileTwo, fileThree) {
    console.log('updating thumbnail file options');
    this.props.onThumbnailFileOptionsChange(fileOne, fileTwo, fileThree);
  }
  setClaimAndThumbailUrl (claim) {
    // set thumbnail claim based on publish claim name
    const url = `${this.props.host}/${this.props.channel}/${claim}.jpeg`;
    this.props.onThumbnailClaimChange(claim, url);
  }
  render () {
    return (
      <div>
        <label className="label">Thumbnail:</label>
        <div>
            <p className="info-message-placeholder info-message--failure">{this.state.error}</p>
            {this.props.potentialFiles.map((file, index) => <ThumbnailPreview dataUrl={file} key={index}/>)}
        </div>
      </div>
    );
  }
}

export default PublishThumbnailInput;
