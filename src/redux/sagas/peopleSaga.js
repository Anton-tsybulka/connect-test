import { all, put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

const urlPeople = 'https://jsonplaceholder.typicode.com/users';
const urlImg = 'https://jsonplaceholder.typicode.com/photos';

const getPeople = () =>
   axios
      .get(urlPeople)
      .then((result) => result.data)
      .catch((error) => {
         throw error;
      });

const getImages = () =>
   axios
      .get(urlImg)
      .then((result) => result.data)
      .catch((error) => {
         throw error;
      });

function* fetchPeople() {
   try {
      const [listPeople, listImages] = yield all([
         call(getPeople),
         call(getImages)
      ]);
      yield put({ type: 'GET_PEOPLE_SUCCESS', payload: { listPeople, listImages } });
   } catch (error) {
      yield put({ type: 'PEOPLE_FAILED', message: error.message });
   }
};

function* fetchChangeInputValue(action) {
   try {
      yield put({ type: 'CHANGE_INPUTVALUE_SUCCESS', payload: action.payload });
   } catch (error) {
      yield put({ type: 'PEOPLE_FAILED', message: error.message });
   }
}

function* getPeopleSaga() {
   yield takeEvery('GET_PEOPLE_REQUESTED', fetchPeople);
};

function* changeInputValue() {
   yield takeEvery('CHANGE_INPUTVALUE_REQUESTED', fetchChangeInputValue)
}

export { getPeopleSaga, changeInputValue };