import { all } from 'redux-saga/effects';
import { watchNewAssetRequest, watchNewChannelRequest } from './request';
import { watchFileIsRequested } from './file';
import { watchShowNewChannel, watchShowNewChannelClaimsRequest } from './show_channel';

export default function* rootSaga () {
  yield all([
    watchNewAssetRequest(),
    watchNewChannelRequest(),
    watchShowNewChannel(),
    watchFileIsRequested(),
    watchShowNewChannelClaimsRequest(),
  ]);
}
