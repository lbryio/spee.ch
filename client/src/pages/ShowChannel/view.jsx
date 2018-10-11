import React from 'react';
import PageLayout from '@components/PageLayout';
import ErrorPage from '@pages/ErrorPage';
import ChannelInfoDisplay from '@components/ChannelInfoDisplay';
import ChannelClaimsDisplay from '@containers/ChannelClaimsDisplay';
import Row from '@components/Row';

class ShowChannel extends React.Component {
  render () {
    const { channel, homeChannel } = this.props;
    if (channel) {
      const { name, longId, shortId } = channel;
      return (
        <PageLayout
          pageTitle={name}
          channel={channel}
        >
          {!homeChannel && (
            <Row>
              <ChannelInfoDisplay
                name={name}
                longId={longId}
                shortId={shortId}
              />
            </Row>
          )}
          <ChannelClaimsDisplay />
        </PageLayout>
      );
    }
    return (
      <ErrorPage error={'loading channel data...'} />
    );
  }
};

export default ShowChannel;
