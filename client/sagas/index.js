import { all } from 'redux-saga/effects';
import { watchHandleShowPageUri } from './show_uri';
import { watchNewAssetRequest } from './show_asset';
import { watchNewChannelRequest, watchUpdateChannelClaims } from './show_channel';
import { watchFileIsRequested } from './file';
import { watchPublishStart } from './publish';

export default function * rootSaga () {
  yield all([
    watchHandleShowPageUri(),
    watchNewAssetRequest(),
    watchNewChannelRequest(),
    watchUpdateChannelClaims(),
    watchFileIsRequested(),
    watchPublishStart(),
  ]);
}
