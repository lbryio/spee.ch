import Request from 'utils/request';
import request from '../utils/request';

export function getChannelData (name, id) {
  console.log('getting and storing channel data for channel:', name, id);
  if (!id) id = 'none';
  const url = `/api/channel/data/${name}/${id}`;
  return request(url);
};

export function getChannelClaims (name, longId, page) {
  console.log('getting and storing channel claims for channel:', name, longId);
  if (!page) page = 1;
  const url = `/api/channel/claims/${name}/${longId}/${page}`;
  return Request(url);
    // .then(({ success, message, data }) => {
    //   console.log('api/channel-claims response:', data);
    //   if (!success) {
    //     return this.setState({error: message});
    //   }
    //   this.setState({error: null}); // move this error to redux state
    //   this.props.onChannelClaimsDataUpdate(data.claims, data.currentPage, data.totalPages, data.totalResults);
    // })
    // .catch((error) => {
    //   this.setState({error: error.message});
    // });
};
