import { combineReducers } from 'redux';
import PublishReducer from 'reducers/publish';
import ChannelReducer from 'reducers/channel';
import ShowReducer from 'reducers/show';

export default combineReducers({
  channel: ChannelReducer,
  publish: PublishReducer,
  show   : ShowReducer,
});
