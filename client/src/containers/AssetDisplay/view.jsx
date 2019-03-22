import React from 'react';
import Row from '@components/Row';
import ProgressBar from '@components/ProgressBar';
import { LOCAL_CHECK, UNAVAILABLE, ERROR, AVAILABLE } from '../../constants/asset_display_states';
import createCanonicalLink from '@globalutils/createCanonicalLink';
import FileViewer from '@components/FileViewer';
import isBot from 'isbot';
import Img from 'react-image';

class AvailableContent extends React.Component {
  render () {
    const {contentType, sourceUrl, name, thumbnail} = this.props;
    switch (contentType) {
      case 'image/jpeg':
      case 'image/jpg':
      case 'image/png':
      case 'image/gif':
      case 'image/svg+xml':
        return (
          <Img
            src={[
              sourceUrl,
              '/assets/img/default_thumb.jpg',
            ]}
            alt={name}
            className={'asset-image'}
          />
        );
      case 'video/mp4':
        return (
          <video
            className='asset-video'
            controls poster={!!thumbnail && thumbnail || '/assets/img/default_thumb.jpg'}
          >
            <source
              src={!!sourceUrl && sourceUrl}
            />
            <p>Your browser does not support the <code>video</code> element.</p>
          </video>
        );
      case 'text/markdown':

        return (
          (isBot(window.navigator.userAgent))
            ? (
              <img
                className='asset-image'
                src={'/assets/img/default_thumb.jpg'}
                alt={'markdown available on page load'}
              />
            )
            : <div className={'asset-document'}><FileViewer sourceUrl={!!sourceUrl && sourceUrl}/></div>
        );
      default:
        return (
          <Img
            src={[
              thumbnail,
              '/assets/img/default_thumb.jpg',
            ]}
            alt={name}
            className={'asset-image'}
          />
        );
    }
  }
}

class AssetDisplay extends React.Component {
  componentDidMount () {
    const { asset: { claimData: { name, claimId } } } = this.props;
    this.props.onFileRequest(name, claimId);
  }
  render () {
    const { status, error, asset } = this.props;
    const { name, claimData: { claimId, contentType, thumbnail, outpoint, pending } } = asset;
    // the outpoint is added to force the browser to re-download the asset after an update
    // issue: https://github.com/lbryio/spee.ch/issues/607
    let fileExt;
    if (typeof contentType === 'string') {
      fileExt = contentType.split('/')[1] || 'jpg';
    }
    const sourceUrl = `${createCanonicalLink({ asset: asset.claimData })}.${fileExt}?outpoint=${outpoint}`;
    return (
      <div className={'asset-display'}>
        {(status === LOCAL_CHECK) &&
        <div>
          <p>Checking to see if Spee.ch has your asset locally...</p>
        </div>
        }
        {(status === UNAVAILABLE) &&
        <div>
          <p>Sit tight, we're searching the LBRY blockchain for your asset!</p>
          <ProgressBar size={12} />
          <p>Curious what magic is happening here? <a className='link--primary' target='blank' href='https://lbry.com/faq/what-is-lbry'>Learn more.</a></p>
        </div>
        }
        {(status === ERROR) && (
          pending ? (
            <div>
              <p>This content is pending confirmation on the LBRY blockchain. It should be available in the next few minutes, please check back or refresh.</p>
            </div>
          ) : (
            <div>
              <Row>
                <p>Unfortunately, we couldn't download your asset from LBRY.  You can help us out by sharing the following error message in the <a className='link--primary' href='https://chat.lbry.com' target='_blank'>LBRY discord</a>.</p>
              </Row>
              <Row>
                <p id='error-message'><i>{error}</i></p>
              </Row>
            </div>
          )
        )}
        {(status === AVAILABLE) &&
        <AvailableContent
          contentType={contentType}
          sourceUrl={sourceUrl}
          name={name}
          thumbnail={thumbnail}
        />
        }
      </div>
    );
  }
}

export default AssetDisplay;
