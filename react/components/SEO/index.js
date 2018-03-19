import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = ({ site }) => {
  const { defaultDescription, defaultThumbnail, description: siteDescription, host: siteHost, title: siteTitle, twitter: siteTwitter } = site;
  return {
    defaultDescription,
    defaultThumbnail,
    siteDescription,
    siteHost,
    siteTitle,
    siteTwitter,
  };
};

export default connect(mapStateToProps, null)(View);
