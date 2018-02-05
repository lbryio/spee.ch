import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from 'components/ProgressBar';
import Request from 'utils/request';
import { LOCAL_CHECK, SEARCHING, UNAVAILABLE, AVAILABLE } from 'constants/asset_display_states';

class AssetDisplay extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error : null,
      status: LOCAL_CHECK,
    };
    this.isLocalFileAvailableOnServer = this.isLocalFileAvailableOnServer.bind(this);
    this.triggerGetAssetOnServer = this.triggerGetAssetOnServer.bind(this);
  }
  componentDidMount () {
    const that = this;
    this.isLocalFileAvailableOnServer()
      .then(isAvailable => {
        if (!isAvailable) {
          console.log('file is not yet available');
          that.setState({status: SEARCHING});
          return that.triggerGetAssetOnServer();
        }
      })
      .then(() => {
        that.setState({status: AVAILABLE});
      })
      .catch(error => {
        that.setState({
          status: UNAVAILABLE,
          error : error.message,
        });
      });
  }
  isLocalFileAvailableOnServer () {
    console.log(`checking if file is available for ${this.props.name}#${this.props.claimId}`);
    const url = `/api/file-is-available/${this.props.name}/${this.props.claimId}`;
    return new Promise((resolve, reject) => {
      Request(url)
        .then(({success, message, data: isAvailable}) => {
          if (success) {
            console.log('/api/file-is-available response:', isAvailable);
            return resolve(isAvailable);
          }
          reject(new Error(message));
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  triggerGetAssetOnServer () {
    console.log(`getting claim for ${this.props.name}#${this.props.claimId}`);
    const url = `/api/claim-get/${this.props.name}/${this.props.claimId}`;
    return new Promise((resolve, reject) => {
      Request(url)
        .then(({success, message}) => {
          console.log('/api/claim-get response:', success, message);
          if (success) {
            return resolve(true);
          }
          reject(new Error(message));
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  render () {
    return (
      <div id="asset-display-component">
        {(this.state.status === LOCAL_CHECK) &&
        <div>
          <p>Checking to see if Spee.ch has your asset locally...</p>
        </div>
        }
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
            switch (this.props.contentType) {
              case 'image/jpeg':
              case 'image/jpg':
              case 'image/png':
                return (
                  <img className="asset" src={this.props.src} alt={this.props.name}/>
                );
              case 'image/gif':
                return (
                  <img className="asset" src={this.props.src} alt={this.props.name}/>
                );
              case 'video/mp4':
                return (
                  <video id="video" className="asset" controls poster={this.props.thumbnail}>
                    <source src={this.props.src}/>
                    <p>Your browser does not support the <code>video</code> element.</p>
                  </video>
                );
              default:
                return (
                  <p>Unsupported file type</p>
                );
            }
          })()
        }
      </div>
    );
  }
};

AssetDisplay.propTypes = {
  name       : PropTypes.string.isRequired,
  claimId    : PropTypes.string.isRequired,
  src        : PropTypes.string.isRequired,
  contentType: PropTypes.string.isRequired,
  fileExt    : PropTypes.string.isRequired,
  thumbnail  : PropTypes.string,
};

export default AssetDisplay;
