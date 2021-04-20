import { put, call, takeEvery } from 'redux-saga/effects';
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
      const people = yield call(getPeople);
      yield put({ type: 'GET_PEOPLE_SUCCESS', payload: people });
   } catch (error) {
      yield put({ type: 'PEOPLE_FAILED', message: error.message });
   }
};

function* fetchImages() {
   try {
      const images = yield call(getImages);
      yield put({ type: 'GET_IMG_SUCCESS', payload: images });
   } catch (error) {
      yield put({ type: 'PEOPLE_FAILED', message: error.message });
   }
};

function* getPeopleSaga() {
   yield takeEvery('GET_PEOPLE_REQUESTED', fetchPeople);
};

function* getImagesSaga() {
   yield takeEvery('GET_IMG_REQUESTED', fetchImages);
};

export { getPeopleSaga, getImagesSaga };