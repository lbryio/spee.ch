import { all } from 'redux-saga/effects';
import { watchFileIsRequested } from './show';

export default function* rootSaga () {
  yield all([
    watchFileIsRequested(),
  ]);
}
