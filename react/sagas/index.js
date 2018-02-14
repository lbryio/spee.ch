import { all } from 'redux-saga/effects';
import { watchNewAssetRequest } from './show_asset';
import { watchNewChannelRequest, watchUpdateChannelClaims } from './show_channel';
import { watchFileIsRequested } from './file';

export default function* rootSaga () {
  yield all([
    watchNewAssetRequest(),
    watchNewChannelRequest(),
    watchUpdateChannelClaims(),
    watchFileIsRequested(),
  ]);
}
