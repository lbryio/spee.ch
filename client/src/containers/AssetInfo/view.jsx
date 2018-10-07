import React from 'react';
import { Link } from 'react-router-dom';
import Label from '@components/Label';
import RowLabeledAlt from '@components/RowLabeledAlt';
import Row from '@components/Row';
import SpaceBetween from '@components/SpaceBetween';
import AssetShareButtons from '@components/AssetShareButtons';
import HorizontalSplit from '@components/HorizontalSplit';
import ClickToCopy from '@components/ClickToCopy';

class AssetInfo extends React.Component {
  render () {
    const { asset: { shortId, claimData : { channelName, certificateId, description, name, claimId, fileExt, contentType, thumbnail, host } } } = this.props;
    return (
      <div className='asset-information-wrap'>
        <HorizontalSplit
          leftSide={
            <div className='asset-description'>
              {description && (
                <p>{description}</p>
              )}
            </div>
          }
          rightSide={
            <div className='asset-information'>
              {channelName && (
                <Row>
                  <RowLabeledAlt
                    label={
                      <Label value={'Channel'} />
                    }
                    content={
                      <span className='text'>
                        <Link className='link--brand' to={`/${channelName}:${certificateId}`}>{channelName}</Link>
                      </span>
                    }
                  />
                </Row>
              )}

              <Row>
                <RowLabeledAlt
                  label={
                    <Label value={'Share'} />
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
                <RowLabeledAlt
                  label={
                    <Label value={'Link'} />
                  }
                  content={
                    <ClickToCopy
                      id={'short-link'}
                      value={`${host}/${shortId}/${name}`}
                    />
                  }
                />
              </Row>

              <Row>
                <RowLabeledAlt
                  label={
                    <Label value={'Embed'} />
                  }
                  content={
                    <div>
                      {(contentType === 'video/mp4') ? (
                        <ClickToCopy
                          id={'embed-text-video'}
                          value={`<video width="100%" controls poster="${thumbnail}" src="${host}/${claimId}/${name}.${fileExt}"/></video>`}
                        />
                      ) : (
                        <ClickToCopy
                          id={'embed-text-image'}
                          value={`<img src="${host}/${claimId}/${name}.${fileExt}"/>`}
                        />
                      )}
                    </div>
                  }
                />
              </Row>

              <Row>
                <SpaceBetween>
                  <a
                    className='link--brand'
                    href={`${host}/${claimId}/${name}.${fileExt}`}
                  >
                    Direct Link
                  </a>
                  <a
                    className={'link--brand'}
                    href={`${host}/${claimId}/${name}.${fileExt}`}
                    download={name}
                  >
                    Download
                  </a>
                  <a
                    className={'link--brand'}
                    target='_blank'
                    href='https://lbry.io/dmca'
                  >
                    Report
                  </a>
                </SpaceBetween>
              </Row>

              <Row>
                <p>
                  Hosted via the <a className={'link--brand'} href={'https://lbry.io/get'} target={'_blank'}>LBRY</a> blockchain
                </p>
              </Row>

            </div>
          }
        />


      </div>
    );
  }
};

export default AssetInfo;
