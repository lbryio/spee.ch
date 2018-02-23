import React from 'react';
import SEO from 'components/SEO';
import ErrorPage from 'components/ErrorPage';
import NavBar from 'containers/NavBar';
import ChannelClaimsDisplay from 'containers/ChannelClaimsDisplay';
import { createPageTitle } from 'utils/pageTitle';
import { createChannelCanonicalLink } from 'utils/canonicalLink';
import { createChannelMetaTags } from 'utils/metaTags';

class ShowChannel extends React.Component {
  render () {
    const { channel } = this.props;
    if (channel) {
      const { name, longId, shortId } = channel;
      const pageTitle = createPageTitle(`${name}`);
      const canonicalLink = createChannelCanonicalLink(channel);
      const metaTags = createChannelMetaTags(channel);
      return (
        <div>
          <SEO pageTitle={pageTitle} canonicalLink={canonicalLink} metaTags={metaTags} />
          <NavBar />
          <div className='row row--tall row--padded'>
            <div className='column column--10'>
              <h2>channel name: {name || 'loading...'}</h2>
              <p className={'fine-print'}>full channel id: {longId || 'loading...'}</p>
              <p className={'fine-print'}>short channel id: {shortId || 'loading...'}</p>
            </div>
            <div className='column column--10'>
              <ChannelClaimsDisplay />
            </div>
          </div>
        </div>
      );
    };
    return (
      <ErrorPage error={'loading channel data...'} />
    );
  }
};

export default ShowChannel;
