import React from 'react';
import PageLayout from '@components/PageLayout';
import ErrorPage from '@pages/ErrorPage';
import ChannelInfoDisplay from '@components/ChannelInfoDisplay';
import ChannelClaimsDisplay from '@containers/ChannelClaimsDisplay';

class ShowChannel extends React.Component {
  render () {
    const { channel } = this.props;
    if (channel) {
      const { name, longId, shortId } = channel;
      return (
        <PageLayout
          pageTitle={name}
          channel={channel}
          content={
            <div>
              <ChannelInfoDisplay
                name={name}
                longId={longId}
                shortId={shortId}
              />
              <ChannelClaimsDisplay />
            </div>
          }
        />
      );
    }
    return (
      <ErrorPage error={'loading channel data...'} />
    );
  }
};

export default ShowChannel;
