import React from 'react';
import { Link } from 'react-router-dom';
import Label from '@components/Label';
import RowLabeled from '@components/RowLabeled';
import Row from '@components/Row';
import SpaceBetween from '@components/SpaceBetween';

const AssetShareButtons = ({ host, name, shortId }) => {
  return (
    <SpaceBetween >
      <a
        className='link--primary'
        target='_blank'
        href={`https://twitter.com/intent/tweet?text=${host}/${shortId}/${name}`}
      >
        twitter
      </a>
      <a
        className='link--primary'
        target='_blank'
        href={`https://www.facebook.com/sharer/sharer.php?u=${host}/${shortId}/${name}`}
      >
        facebook
      </a>
      <a
        className='link--primary'
        target='_blank'
        href={`http://tumblr.com/widgets/share/tool?canonicalUrl=${host}/${shortId}/${name}`}
      >
        tumblr
      </a>
      <a
        className='link--primary'
        target='_blank'
        href={`https://www.reddit.com/submit?url=${host}/${shortId}/${name}&title=${name}`}
      >
        reddit
      </a>
    </SpaceBetween>
  );
};

const ClickToCopy = ({id, value, copyToClipboard}) => {
  return (
    <input
      id={id}
      value={value}
      onClick={copyToClipboard}
      type='text'
      className='click-to-copy'
      readOnly
      spellCheck='false'
    />
  );
};

class AssetInfo extends React.Component {
  constructor (props) {
    super(props);
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }
  copyToClipboard (event) {
    console.log('event:', event);
    console.log('event.target:', event.target);
    console.log('event.target.id:', event.target.id);
    const elementToCopy = event.target.id;
    const element = document.getElementById(elementToCopy);
    element.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      this.setState({error: 'Oops, unable to copy'});
    }
  }
  render () {
    const { asset: { shortId, claimData : { channelName, certificateId, description, name, claimId, fileExt, contentType, thumbnail, host } } } = this.props;
    return (
      <div>
        {channelName && (
          <Row>
            <RowLabeled
              label={
                <Label value={'Channel:'} />
              }
              content={
                <span className='text'>
                  <Link to={`/${channelName}:${certificateId}`}>{channelName}</Link>
                </span>
              }
            />
          </Row>
        )}

        <Row>
          <RowLabeled
            label={
              <Label value={'Share:'} />
            }
            content={
              <AssetShareButtons
                host={host}
                name={name}
                shortId={shortId}
              />
            }
          />
        </Row>

        <Row>
          <RowLabeled
            label={
              <Label value={'Link:'} />
            }
            content={
              <ClickToCopy
                id={'short-link'}
                value={`${host}/${shortId}/${name}.${fileExt}`}
                copyToClipboard={this.copyToClipboard}
              />
            }
          />
        </Row>

        <Row>
          <RowLabeled
            label={
              <Label value={'Embed:'} />
            }
            content={
              <div>
                {(contentType === 'video/mp4') ? (
                  <ClickToCopy
                    id={'embed-text-video'}
                    value={`<video width="100%" controls poster="${thumbnail}" src="${host}/${claimId}/${name}.${fileExt}"/></video>`}
                    copyToClipboard={this.copyToClipboard}
                  />
                ) : (
                  <ClickToCopy
                    id={'embed-text-image'}
                    value={`<img src="${host}/${claimId}/${name}.${fileExt}"/>`}
                    copyToClipboard={this.copyToClipboard}
                  />
                )}
              </div>
            }
          />
        </Row>

        <Row>
          <SpaceBetween>
            <Link
              className='link--primary'
              to={`/${shortId}/${name}.${fileExt}`}
            >
              Direct Link
            </Link>
            <a
              className={'link--primary'}
              href={`${host}/${claimId}/${name}.${fileExt}`}
              download={name}
            >
              Download
            </a>
            <a
              className={'link--primary'}
              target='_blank'
              href='https://lbry.io/dmca'
            >
              Report
            </a>
          </SpaceBetween>
        </Row>

        {description && (
          <Row>
            <p>{description}</p>
          </Row>
        )}

        <Row>
          <p>
            Hosted via the <a className={'link--primary'} href={'https://lbry.io/get'} target={'_blank'}>LBRY</a> blockchain
          </p>
        </Row>

      </div>
    );
  }
};

export default AssetInfo;
