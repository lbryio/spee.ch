import { all } from 'redux-saga/effects';
import { watchNewAssetRequest, watchShowNewAsset, watchNewChannelRequest, watchFileIsRequested } from './show';

export default function* rootSaga () {
  yield all([
    watchNewAssetRequest(),
    watchShowNewAsset(),
    watchNewChannelRequest(),
    watchFileIsRequested(),
  ]);
}
