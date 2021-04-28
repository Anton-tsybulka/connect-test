import { all } from 'redux-saga/effects';
import { getPeopleSaga, getImagesSaga, changeInputValue } from './peopleSaga';

export default function* rootSaga() {
   yield all([
      getPeopleSaga(),
      getImagesSaga(),
      changeInputValue(),
   ]);
}