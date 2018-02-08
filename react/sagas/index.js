import { all } from 'redux-saga/effects';
import { watchNewAssetRequest, watchShowNewAsset, watchFileIsRequested } from './show';

export default function* rootSaga () {
  yield all([
    watchNewAssetRequest(),
    watchShowNewAsset(),
    watchFileIsRequested(),
  ]);
}
