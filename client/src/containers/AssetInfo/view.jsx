import React from 'react';
import { Link } from 'react-router-dom';
import Label from '@components/Label';
import RowLabeled from '@components/RowLabeled';
import Row from '@components/Row';
import SpaceBetween from '@components/SpaceBetween';
import AssetShareButtons from '@components/AssetShareButtons';
import ClickToCopy from '@components/ClickToCopy';

import siteConfig from '@config/siteConfig.json';
const { details: { host } } = siteConfig;
import createCanonicalLink from '../../../../utils/createCanonicalLink';

class AssetInfo extends React.Component {
  render () {
    const { editable, asset } = this.props;
    const { claimViews, claimData } = asset;
    const { channelName, claimId, channelShortId, description, name, fileExt, contentType, host } = claimData;

    const canonicalUrl = createCanonicalLink({ asset: { ...claimData, shortId: asset.shortId }});
    const assetCanonicalUrl = `${host}${canonicalUrl}`;

    let channelCanonicalUrl;
    if (channelName) {
      const channel = {
        name: channelName,
        shortId: channelShortId,
      };
      channelCanonicalUrl = `${createCanonicalLink({channel})}`;
    }
    return (
      <div>
        {editable && (
          <Row>
            <RowLabeled
              label={<Label value={'Edit:'} />}
              content={<Link to={`/edit${canonicalUrl}`}>{name}</Link>}
            />
          </Row>
        )}

        {channelName && (
          <Row>
            <RowLabeled
              label={
                <Label value={'Channel:'} />
              }
              content={
                <span className='text'>
                  <Link to={channelCanonicalUrl}>{channelName}</Link>
                </span>
              }
            />
          </Row>
        )}

        {claimViews ? (
          <Row>
            <RowLabeled
              label={
                <Label value={'Views:'} />
              }
              content={
                <span className='text'>
                  {claimViews}
                </span>
              }
            />
          </Row>
        ) : null}

        <Row>
          <RowLabeled
            label={
              <Label value={'Share:'} />
            }
            content={
              <AssetShareButtons
                name={name}
                assetUrl={assetCanonicalUrl}
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
                value={assetCanonicalUrl}
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
        </Row>

        <Row>
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
