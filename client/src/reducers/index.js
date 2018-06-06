import { combineReducers } from 'redux';

import PublishReducer from './publish';
import ChannelReducer from './channel';
import ShowReducer from './show';
import SiteReducer from './site';
import ChannelCreateReducer from './channelCreate';

export default combineReducers({
  channel      : ChannelReducer,
  channelCreate: ChannelCreateReducer,
  publish      : PublishReducer,
  show         : ShowReducer,
  site         : SiteReducer,
});
