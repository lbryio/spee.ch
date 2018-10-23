import React from 'react';
import { Link } from 'react-router-dom';
import Label from '@components/Label';
import RowLabeledAlt from '@components/RowLabeledAlt';
import Row from '@components/Row';
import SpaceBetween from '@components/SpaceBetween';
import AssetShareButtons from '@components/AssetShareButtons';
import HorizontalSplit from '@components/HorizontalSplit';
import ClickToCopy from '@components/ClickToCopy';
import * as Icon from 'react-feather';

class AssetInfo extends React.Component {
  render () {
    const { asset: { shortId, claimData: { channelName, certificateId, description, name, address, claimId, fileExt, contentType, thumbnail, host } } } = this.props;
    return (
      <div className='asset-information-wrap'>
        <HorizontalSplit
          leftSide={
            <div>
              {description && (
                <p className='asset-description'>{description}</p>
              )}
            </div>
          }
          rightSide={
            <div className='asset-information'>
              <div className='tablet-inline-row'>
                {channelName && (
                  <Row>
                    <RowLabeledAlt
                      label={
                        <Label value={'Channel'} />
                      }
                      content={
                        <span className='text'>
                          <Link className='link--brand link--hover' to={`/${channelName}:${certificateId}`}>{channelName}</Link>
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
              </div>
              <div className='tablet-inline-row'>
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
              </div>

              <Row>
                <SpaceBetween>
                  <a
                    className={'link--brand link--icon direct'}
                    href={`${host}/${claimId}/${name}.${fileExt}`}
                  >
                    <div className='link-text'>Direct Link</div>
                    <div className='icon-wrap'>
                      <Icon.ArrowRightCircle />
                    </div>

                  </a>
                  <a
                    className={'link--brand link--icon download'}
                    href={`${host}/${claimId}/${name}.${fileExt}`}
                    download={name}
                  >
                    <div className='link-text'>Download</div>
                    <div className='icon-wrap'>
                      <Icon.ArrowDownCircle />
                    </div>
                  </a>
                  <a
                    className={'link--brand link--icon report'}
                    target='_blank'
                    href='https://lbry.io/dmca'
                  >
                    <div className='link-text'>Report</div>
                    <div className='icon-wrap'>
                      <Icon.AlertCircle />
                    </div>
                  </a>
                </SpaceBetween>
              </Row>

              <div className='asset-footer'>
                <Row>
                  <p>
                    Hosted via the <a className={'link--brand link--hover'} href={'https://lbry.io/get'} target={'_blank'}>LBRY</a> blockchain
                  </p>
                </Row>
                {address && (
                  <div className='claim-address'>
                    <RowLabeledAlt
                      label={
                        <Label value={'Claim Address'} />
                      }
                      content={
                        <a className={'link--brand link--hover'} href={'https://lbry.io/get'} target={'_blank'}>{address}</a>
                      }
                    />
                  </div>
                )}
              </div>

            </div>
          }
        />

      </div>
    );
  }
};

export default AssetInfo;
