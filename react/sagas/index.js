import { all } from 'redux-saga/effects';
import { watchNewAssetRequest, watchNewChannelRequest } from './request';
import { watchFileIsRequested } from './file';
import { watchShowNewChannel } from './show_channel';
import { watchShowNewAsset } from './show_asset';

export default function* rootSaga () {
  yield all([
    watchNewAssetRequest(),
    watchNewChannelRequest(),
    watchShowNewAsset(),
    watchShowNewChannel(),
    watchFileIsRequested(),
  ]);
}
