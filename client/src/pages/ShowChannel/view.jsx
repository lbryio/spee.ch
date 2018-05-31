import React from 'react';
import PageLayout from '@components/PageLayout';
import ErrorPage from '@pages/ErrorPage';
import ChannelClaimsDisplay from '@containers/ChannelClaimsDisplay';

class ShowChannel extends React.Component {
  render () {
    const { channel } = this.props;
    if (channel) {
      const { name, longId, shortId } = channel;
      return (
        <PageLayout pageTitle={name} pageUri={channel}>
          <h2>channel name: {name}</h2>
          <p className={'fine-print'}>full channel id: {longId}</p>
          <p className={'fine-print'}>short channel id: {shortId}</p>
          <ChannelClaimsDisplay />
        </PageLayout>
      );
    };
    return (
      <ErrorPage error={'loading channel data...'} />
    );
  }
};

export default ShowChannel;
