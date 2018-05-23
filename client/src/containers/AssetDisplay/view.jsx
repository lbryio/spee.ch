import React from 'react';
import ProgressBar from '@components/ProgressBar';
import { LOCAL_CHECK, UNAVAILABLE, ERROR, AVAILABLE } from '../../constants/asset_display_states';

class AssetDisplay extends React.Component {
  componentDidMount () {
    const { asset: { claimData: { name, claimId } } } = this.props;
    this.props.onFileRequest(name, claimId);
  }
  render () {
    const { status, error, asset: { claimData: { name, claimId, contentType, fileExt, thumbnail } } } = this.props;
    return (
      <div id='asset-display-component'>
        {(status === LOCAL_CHECK) &&
        <div>
          <p>Checking to see if Spee.ch has your asset locally...</p>
        </div>
        }
        {(status === UNAVAILABLE) &&
        <div>
          <p>Sit tight, we're searching the LBRY blockchain for your asset!</p>
          <ProgressBar size={12} />
          <p>Curious what magic is happening here? <a className='link--primary' target='blank' href='https://lbry.io/faq/what-is-lbry'>Learn more.</a></p>
        </div>
        }
        {(status === ERROR) &&
        <div>
          <p>Unfortunately, we couldn't download your asset from LBRY.  You can help us out by sharing the below error message in the <a className='link--primary' href='https://chat.lbry.io' target='_blank'>LBRY discord</a>.</p>
          <i><p id='error-message'>{error}</p></i>
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
                  className='asset'
                  src={`/${claimId}/${name}.${fileExt}`}
                  alt={name} />
              );
            case 'image/gif':
              return (
                <img
                  className='asset'
                  src={`/${claimId}/${name}.${fileExt}`}
                  alt={name}
                />
              );
            case 'video/mp4':
              return (
                <video className='asset video' controls poster={thumbnail}>
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
