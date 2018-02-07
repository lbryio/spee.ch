import { all } from 'redux-saga/effects';
import { watchNewAssetRequest, watchFileIsRequested } from './show';

export default function* rootSaga () {
  yield all([
    watchNewAssetRequest(),
    watchFileIsRequested(),
  ]);
}
