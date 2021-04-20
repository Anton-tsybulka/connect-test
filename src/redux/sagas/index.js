import { all } from 'redux-saga/effects';
import { getPeopleSaga, getImagesSaga } from './peopleSaga';

export default function* rootSaga() {
   yield all([
      getPeopleSaga(),
      getImagesSaga()
   ]);
}