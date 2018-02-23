import React from 'react';
import Helmet from 'react-helmet';

const { site: { title, host }, claim: { defaultThumbnail, defaultDescription } } = require('../../../config/speechConfig.js');

const determineOgThumbnailContentType = (thumbnail) => {
  if (thumbnail) {
    const fileExt = thumbnail.substring(thumbnail.lastIndexOf('.'));
    switch (fileExt) {
      case 'jpeg':
      case 'jpg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'gif':
        return 'image/gif';
      case 'mp4':
        return 'video/mp4';
      default:
        return 'image/jpeg';
    }
  }
  return '';
};

class OpenGraphTags extends React.Component {
  render () {
    const { claimData } = this.props.asset;
    const { contentType } = claimData;
    const embedUrl = `${host}/${claimData.claimId}/${claimData.name}`;
    const showUrl = `${host}/${claimData.claimId}/${claimData.name}`;
    const source = `${host}/${claimData.claimId}/${claimData.name}.${claimData.fileExt}`;
    const ogTitle = claimData.title || claimData.name;
    const ogDescription = claimData.description || defaultDescription;
    const ogThumbnailContentType = determineOgThumbnailContentType(claimData.thumbnail);
    const ogThumbnail = claimData.thumbnail || defaultThumbnail;
    return (
      <div>
        <Helmet>
          {/* basic open graph tags */}
          <meta property='og:title' content={ogTitle} />
          <meta property='og:url' content={showUrl} />
          <meta property='og:site_name' content={title} />
          <meta property='og:description' content={ogDescription} />
          <meta property='og:image:width' content='600' />
          <meta property='og:image:height' content='315' />
          {/* basic twitter tags */}
          <meta name='twitter:site' content='@spee_ch' />
        </Helmet>
        { contentType === 'video/mp4' || contentType === 'video/webm' ? (
          <Helmet>
            {/* video open graph tags */}
            <meta property='og:video' content={source} />
            <meta property='og:video:secure_url' content={source} />
            <meta property='og:video:type' content={contentType} />
            <meta property='og:image' content={ogThumbnail} />
            <meta property='og:image:type' content={ogThumbnailContentType} />
            <meta property='og:type' content='video' />
            {/* video twitter tags */}
            <meta name='twitter:card' content='player' />
            <meta name='twitter:player' content={embedUrl} />
            <meta name='twitter:player:width' content='600' />
            <meta name='twitter:text:player_width' content='600' />
            <meta name='twitter:player:height' content='337' />
            <meta name='twitter:player:stream' content={source} />
            <meta name='twitter:player:stream:content_type' content={contentType} />
          </Helmet>
        ) : (
          <Helmet>
            {/* image open graph tags */}
            <meta property='og:image' content={source} />
            <meta property='og:image:type' content={contentType} />
            <meta property='og:type' content='article' />
            {/* image twitter tags */}
            <meta name='twitter:card' content='summary_large_image' />
          </Helmet>
        )}
      </div>
    );
  }
};

export default OpenGraphTags;
