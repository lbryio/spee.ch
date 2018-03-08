import React from 'react';
import SEO from 'components/SEO/index';
import ErrorPage from 'components/ErrorPage/index';
import NavBar from 'containers/NavBar/index';
import ChannelClaimsDisplay from 'containers/ChannelClaimsDisplay/index';

class ShowChannel extends React.Component {
  render () {
    const { channel } = this.props;
    if (channel) {
      const { name, longId, shortId } = channel;
      return (
        <div>
          <SEO pageTitle={name} channel={channel} />
          <NavBar />
          <div className='row row--tall row--padded'>
            <div className='column column--10'>
              <h2>channel name: {name}</h2>
              <p className={'fine-print'}>full channel id: {longId}</p>
              <p className={'fine-print'}>short channel id: {shortId}</p>
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
