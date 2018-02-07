import React from 'react';
import ErrorPage from 'components/ErrorPage';
import NavBar from 'containers/NavBar';
import ChannelClaimsDisplay from 'containers/ChannelClaimsDisplay';
import request from 'utils/request';

class ShowChannel extends React.Component {
  componentDidMount () {
    this.getAndStoreChannelData(this.props.requestName, this.props.requestId);
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.requestName !== this.props.requestName || nextProps.requestId !== this.props.requestId) {
      this.getAndStoreChannelData(nextProps.requestName, nextProps.requestId);
    }
  }
  getAndStoreChannelData (name, id) {
    if (!id) id = 'none';
    const url = `/api/channel/data/${name}/${id}`;
    return request(url)
      .then(({ success, message, data }) => {
        console.log('api/channel/data/ response:', data);
        if (!success) {
          return this.props.onShowChannelError(message);
        }
        this.props.onChannelDataUpdate(data.channelName, data.longChannelClaimId, data.shortChannelClaimId);
      })
      .catch((error) => {
        return this.props.onShowChannelError(error.message);
      });
  }
  componentWillUnmount () {
    this.props.onChannelDataClear();
  }
  render () {
    const { error, name, longId, shortId } = this.props;
    if (error) {
      return (
        <ErrorPage error={error}/>
      );
    };
    return (
      <div>
        <NavBar/>
        <div className="row row--tall row--padded">
          <div className="column column--10">
            <h2>channel name: {name ? name : 'loading...'}</h2>
            <p className={'fine-print'}>full channel id: {longId ? longId : 'loading...'}</p>
            <p className={'fine-print'}>short channel id: {shortId ? shortId : 'loading...'}</p>
          </div>
          <div className="column column--10">
            {(name && longId) && <ChannelClaimsDisplay />}
          </div>
        </div>
      </div>
    );
  }
};

export default ShowChannel;
