import { combineReducers } from 'redux';
import PublishReducer from './publish';
import ChannelReducer from './channel';
import ShowReducer from './show';
import SiteReducer from './site';
import ChannelCreateReducer from './channelCreate';

const customizedReducers = (siteConfig) => {
  return combineReducers({
    channel      : ChannelReducer,
    channelCreate: ChannelCreateReducer,
    publish      : PublishReducer(siteConfig),
    show         : ShowReducer,
    site         : SiteReducer(siteConfig),
  })
};

export default customizedReducers;
