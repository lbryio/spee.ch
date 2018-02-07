import React from 'react';
import ProgressBar from 'components/ProgressBar/index';
import { LOCAL_CHECK, UNAVAILABLE, ERROR, AVAILABLE } from 'constants/asset_display_states';

class AssetDisplay extends React.Component {
  componentDidMount () {
    this.props.onFileRequest(this.props.claimData.name, this.props.claimData.claimId);
  }
  componentWillReceiveProps (nextProps) {
    // if (nextProps.name !== this.props.name && nextProps.claimId !== this.props.claimId) {
    //   this.props.onCheckServerForFile(nextProps.name, nextProps.claimId);
    // }
  }
  render () {
    const status = this.props.status;
    const error = this.props.error;
    const { name, claimId, contentType, fileExt, thumbnail } = this.props.claimData;
    return (
      <div id="asset-display-component">
        {(status === LOCAL_CHECK) &&
        <div>
          <p>Checking to see if Spee.ch has your asset locally...</p>
        </div>
        }
        {(status === UNAVAILABLE) &&
        <div>
          <p>Sit tight, we're searching the LBRY blockchain for your asset!</p>
          <ProgressBar size={12}/>
          <p>Curious what magic is happening here? <a className="link--primary" target="blank" href="https://lbry.io/faq/what-is-lbry">Learn more.</a></p>
        </div>
        }
        {(status === ERROR) &&
        <div>
          <p>Unfortunately, we couldn't download your asset from LBRY.  You can help us out by sharing the below error message in the <a className="link--primary" href="https://discord.gg/YjYbwhS" target="_blank">LBRY discord</a>.</p>
          <i><p id="error-message">{error}</p></i>
        </div>
        }
        {(status === AVAILABLE) &&
        (() => {
          switch (contentType) {
            case 'image/jpeg':
            case 'image/jpg':
            case 'image/png':
              return (
                <img
                  className="asset"
                  src={`/${claimId}/${name}.${fileExt}`}
                  alt={name}/>
              );
            case 'image/gif':
              return (
                <img
                  className="asset"
                  src={`/${claimId}/${name}.${fileExt}`}
                  alt={name}
                />
              );
            case 'video/mp4':
              return (
                <video id="video" className="asset" controls poster={thumbnail}>
                  <source
                    src={`/${claimId}/${name}.${fileExt}`}
                  />
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

export default AssetDisplay;
