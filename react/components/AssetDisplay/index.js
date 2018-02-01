import React from 'react';
import ProgressBar from 'components/ProgressBar';
import Request from 'utils/request';

const LOCAL_CHECK = 'LOCAL_CHECK';
const SEARCHING = 'SEARCHING';
const UNAVAILABLE = 'UNAVAILABLE';
const AVAILABLE = 'AVAILABLE';

class AssetDisplay extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error      : null,
      status     : LOCAL_CHECK,
      thumbnail  : this.props.thumbnail,
      src        : `/${this.props.claimId}}/${this.props.name}.${this.props.fileExt}`,
      name       : this.props.name,
      claimId    : this.props.claimId,
      fileExt    : this.props.fileExt,
      contentType: this.props.contentType,
    };
    this.checkIfLocalFileAvailable = this.checkIfLocalFileAvailable.bind(this);
    this.triggerGetAssetOnSpeech = this.triggerGetAssetOnSpeech.bind(this);
  }
  componentDidMount () {
    const that = this;
    this.checkIfLocalFileAvailable()
      .then(isAvailable => {
        if (!isAvailable) {
          console.log('file is not yet available');
          that.setState({status: SEARCHING});
          return that.triggerGetAssetOnSpeech();
        }
      })
      .then(() => {
        that.setState({status: AVAILABLE});
        that.addPlayPauseToVideoToBody();
      })
      .catch(error => {
        that.setState({
          status: UNAVAILABLE,
          error : error.message,
        });
      });
  }
  checkIfLocalFileAvailable () {
    console.log(`checking if file is available for ${this.props.name}#${this.props.claimId}`);
    const url = `/api/file-is-available/${this.props.name}/${this.props.claimId}`;
    return new Promise((resolve, reject) => {
      Request(url)
        .then(isAvailable => {
          console.log('/api/file-is-available response:', isAvailable);
          resolve(isAvailable);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  triggerGetAssetOnSpeech () {
    console.log(`getting claim for ${this.props.name}#${this.props.claimId}`)
    const url = `/api/claim-get/${this.props.name}/${this.props.claimId}`;
    return new Promise((resolve, reject) => {
      Request(url)
        .then(response => {
          console.log('/api/claim-get response:', response);
          resolve(true);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  addPlayPauseToVideoToBody () {
    const that = this;
    const video = document.getElementById('video');
    if (video) {
      // add event listener for click
      video.addEventListener('click', () => {
        that.playOrPause(video);
      });
      // add event listener for space bar
      document.body.onkeyup = (event) => {
        if (event.keyCode === 32) {
          that.playOrPause(video);
        }
      };
    }
  }
  playOrPause (video) {
    if (video.paused === true) {
      video.play();
    } else {
      video.pause();
    }
  }
  render () {
    return (
      <div id="asset-display-component">
        {(this.state.status === SEARCHING) &&
          <div>
            <p>Sit tight, we're searching the LBRY blockchain for your asset!</p>
            <ProgressBar size={12}/>
            <p>Curious what magic is happening here? <a className="link--primary" target="blank" href="https://lbry.io/faq/what-is-lbry">Learn more.</a></p>
          </div>
        }
        {(this.state.status === UNAVAILABLE) &&
          <div>
            <p>Unfortunately, we couldn't download your asset from LBRY.  You can help us out by sharing the below error message in the <a className="link--primary" href="https://discord.gg/YjYbwhS" target="_blank">LBRY discord</a>.</p>
            <i><p id="error-message">{this.state.error}</p></i>
          </div>
        }
        {(this.state.status === AVAILABLE) &&
          (() => {
            switch (this.state.contentType) {
              case 'image/jpeg':
              case 'image/jpg':
              case 'image/png':
                return (
                  <img className="asset" src={this.state.src} alt={this.state.name}/>
                );
              case 'image/gif':
                return (
                  <img className="asset" src={this.state.src} alt={this.state.name}/>
                );
              case 'video/mp4':
                return (
                  <video id="video" className="asset" controls poster={this.state.thumbnail}>
                    <source src={this.state.src}/>
                    <p>Your browser does not support the <code>video</code> element.</p>
                  </video>
                );
              default:
                return (
                  <p>unsupported file type</p>
                );
            }
          })()
        }
      </div>
    );
  }
};

// required props
// name
// claimId
// thumbnail
// contentType
// file extension

export default AssetDisplay;
