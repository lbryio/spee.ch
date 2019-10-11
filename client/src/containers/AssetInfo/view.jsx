import React from 'react';
import { Link } from 'react-router-dom';
import Label from '@components/Label';
import RowLabeled from '@components/RowLabeled';
import SpaceBetween from '@components/SpaceBetween';
import AssetShareButtons from '@components/AssetShareButtons';
import ClickToCopy from '@components/ClickToCopy';
import siteConfig from '@config/siteConfig.json';
import createCanonicalLink from '@globalutils/createCanonicalLink';
import AssetInfoFooter from '@components/AssetInfoFooter/index';
import { createPermanentURI } from '@clientutils/createPermanentURI';
import ReactMarkdown from 'react-markdown';

const { details: { host } } = siteConfig;
const { serving } = siteConfig;
const { markdownSettings: { escapeHtmlDescriptions, skipHtmlDescriptions, allowedTypesDescriptions } } = serving;
class AssetInfo extends React.Component {
  render () {
    const { editable, asset } = this.props;
    const { claimViews, claimData } = asset;
    const {
      channelName,
      claimId,
      channelShortId,
      description,
      name,
      fileExt,
      contentType,
      host,
      certificateId,
      license,
      licenseUrl,
      transactionTime
    } = claimData;

    const canonicalUrl = createCanonicalLink({ asset: { ...claimData, shortId: asset.shortId }});
    const assetCanonicalUrl = `${host}${canonicalUrl}`;
    // Todo Issue #882 centralize all this media type detection
    // Todo get markdown settings from siteConfig
    const embedable = contentType.split('/')[0] === 'image' || contentType === 'video/mp4';

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
        { description && (
          <RowLabeled
            label={<Label value={'Description'} />}
            content={
              <div className='asset-info__description'>
                <ReactMarkdown
                  className={'markdown-preview'}
                  escapeHtml={escapeHtmlDescriptions}
                  skipHtml={skipHtmlDescriptions}
                  allowedTypes={allowedTypesDescriptions}
                  source={description}
                />
              </div>
            }
          />
        )}
        {editable && (
          <RowLabeled
            label={<Label value={'Edit'} />}
            content={<Link className='link--primary' to={`/edit${canonicalUrl}`}>{name}</Link>}
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
        <SpaceBetween>
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
          {license && (
            <RowLabeled
              label={
                <Label value={'License'} />
              }
              content={
                <div className='text'>
                  {licenseUrl ? (
                    <a className={'link--primary'} href={licenseUrl} target={'_blank'}>{license}</a>
                  ) : (
                    <span>{license}</span> )}
                </div>
              }
            />
          )}
        </SpaceBetween>
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
        {embedable && (
          <RowLabeled
            label={
              <Label value={'Embed'} />
            }
            content={
              <div>
                {(contentType === 'video/mp4') ? (
                  <ClickToCopy
                    id={'embed-text-video'}
                    value={`<iframe src="${host}/video-embed${canonicalUrl}" allowfullscreen="true" style="border:0"></iframe>`}
                  />
                ) : (
                  <ClickToCopy
                    id={'embed-text-image'}
                    value={`<img alt="${name}" src="${assetCanonicalUrl}.${fileExt}" />`}
                  />
                )}
              </div>
            }
          />
        )}
        <RowLabeled
          label={
            <Label value={'LBRY URI'} />
          }
          content={
            <ClickToCopy
              id={'lbry-permanent-url'}
              value={`${createPermanentURI(asset)}`}
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
            download={`${name}.${fileExt}`}
          >
            Download
          </a>
          <a
            className={'link--primary'}
            href={`https://open.lbry.com/${createPermanentURI(asset)}`}
            download={name}
          >
            LBRY URL
          </a>
          <a
            className={'link--primary'}
            target='_blank'
           href={`https://lbry.com/dmca/${claimId}`}
          >
            Report
          </a>
        </SpaceBetween>
        <AssetInfoFooter />
      </div>
    );
  }
};

export default AssetInfo;
