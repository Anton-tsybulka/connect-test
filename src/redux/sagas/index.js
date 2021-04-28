import { all } from 'redux-saga/effects';
import { getPeopleSaga, changeInputValue } from './peopleSaga';

export default function* rootSaga() {
   yield all([
      getPeopleSaga(),
      changeInputValue(),
   ]);
}