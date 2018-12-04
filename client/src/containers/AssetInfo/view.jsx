import React from 'react';
import { Link } from 'react-router-dom';
import Label from '@components/Label';
import RowLabeled from '@components/RowLabeled';
import SpaceBetween from '@components/SpaceBetween';
import AssetShareButtons from '@components/AssetShareButtons';
import ClickToCopy from '@components/ClickToCopy';
import HorizontalSplit from '@components/HorizontalSplit';
import siteConfig from '@config/siteConfig.json';
import createCanonicalLink from '../../../../utils/createCanonicalLink';
import AssetInfoFooter from '../../components/AssetInfoFooter/index';
const { details: { host } } = siteConfig;

class AssetInfo extends React.Component {
  render () {
    const { editable, asset } = this.props;
    const { claimViews, claimData } = asset;
    const { channelName, claimId, channelShortId, description, name, fileExt, contentType, host, certificateId } = claimData;

    const canonicalUrl = createCanonicalLink({ asset: { ...claimData, shortId: asset.shortId }});
    const assetCanonicalUrl = `${host}${canonicalUrl}`;

    let channelCanonicalUrl;
    if (channelName) {
      const channel = {
        name   : channelName,
        shortId: channelShortId,
      };
      channelCanonicalUrl = `${createCanonicalLink({channel})}`;
    }
    return (
      <div className='asset-info'>
        <HorizontalSplit
          leftSide={
            description && (
              <p className='asset-info__description'>{description}</p>
            )
          }
          rightSide={
            <div>
              {editable && (
                <RowLabeled
                  label={<Label value={'Edit:'} />}
                  content={<Link to={`/edit${canonicalUrl}`}>{name}</Link>}
                />
              )}
              {channelName && (
                <RowLabeled
                  label={
                    <Label value={'Channel'} />
                  }
                  content={
                    <span className='text'>
                      <Link className='link--primary' to={channelCanonicalUrl}>{channelName}</Link>
                    </span>
                  }
                />
              )}
              {claimViews ? (
                <RowLabeled
                  label={
                    <Label value={'Views'} />
                  }
                  content={
                    <span className='text'>
                      {claimViews}
                    </span>
                  }
                />
              ) : null}

              <RowLabeled
                label={
                  <Label value={'Share'} />
                }
                content={
                  <AssetShareButtons
                    name={name}
                    assetUrl={assetCanonicalUrl}
                  />
                }
              />

              <RowLabeled
                label={
                  <Label value={'Link'} />
                }
                content={
                  <ClickToCopy
                    id={'short-link'}
                    value={assetCanonicalUrl}
                  />
                }
              />

              <RowLabeled
                label={
                  <Label value={'Embed'} />
                }
                content={
                  <div>
                    {(contentType === 'video/mp4') ? (
                      <ClickToCopy
                        id={'embed-text-video'}
                        value={`<iframe src="${host}/video-embed${canonicalUrl}" allowfullscreen="true" style="border:0" /></iframe>`}
                      />
                    ) : (
                      <ClickToCopy
                        id={'embed-text-image'}
                        value={`<img src="${assetCanonicalUrl}.${fileExt}"/>`}
                      />
                    )}
                  </div>
                }
              />

              <RowLabeled
                label={
                  <Label value={'ID for Robots'} />
                }
                content={
                  <ClickToCopy
                    id={'lbry-permanent-url'}
                    value={`${channelName}#${certificateId}/${name}`}
                  />
                }
              />

              <SpaceBetween>
                <a
                  className='link--primary'
                  href={`${assetCanonicalUrl}.${fileExt}`}
                >
                  Direct Link
                </a>
                <a
                  className={'link--primary'}
                  href={`${assetCanonicalUrl}.${fileExt}`}
                  download={name}
                >
                  Download
                </a>
                <a
                  className={'link--primary'}
                  href={`https://open.lbry.io/${channelName}#${certificateId}/${name}`}
                  download={name}
                >
                  LBRY URL
                </a>
                <a
                  className={'link--primary'}
                  target='_blank'
                  href='https://lbry.io/dmca'
                >
                  Report
                </a>
              </SpaceBetween>
            </div>
          } />
        <AssetInfoFooter />
      </div>
    );
  }
};

export default AssetInfo;
