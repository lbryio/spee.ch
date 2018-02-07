import React from 'react';
import NavBar from 'containers/NavBar';
import ChannelClaimsDisplay from 'containers/ChannelClaimsDisplay';
import request from 'utils/request';

class ShowChannel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: null,
    };
  }
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
        console.log('api/channel-data response:', data);
        if (!success) {
          return this.setState({error: message});
        }
        this.setState({error: null}); // note: store this error at app level also
        this.props.onChannelDataUpdate(data.channelName, data.longChannelClaimId, data.shortChannelClaimId);
      })
      .catch((error) => {
        this.setState({error: error.message});
      });
  }
  componentWillUnmount () {
    this.props.onChannelDataClear();
  }
  render () {
    return (
      <div>
        <NavBar/>
        {this.state.error ? (
          <div className="row row--tall row--padded">
            <div className="column column--10">
              <p>{this.state.error}</p>
            </div>
          </div>
        ) : (
          <div className="row row--tall row--padded">
            <div className="column column--10">
              <h2>channel name: {this.props.name ? this.props.name : 'loading...'}</h2>
              <p>full channel id: {this.props.longId ? this.props.longId : 'loading...'}</p>
              <p>short channel id: {this.props.shortId ? this.props.shortId : 'loading...'}</p>
            </div>
            <div className="column column--10">
              {(this.props.name && this.props.longId) && <ChannelClaimsDisplay />}
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default ShowChannel;
