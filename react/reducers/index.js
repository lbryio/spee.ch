import { combineReducers } from 'redux';
import PublishReducer from 'reducers/publish';
import ChannelReducer from 'reducers/channel';

export default combineReducers({
  channel: ChannelReducer,
  publish: PublishReducer,
});
