import { all, fork, takeLatest, delay, put } from 'redux-saga/effects';
import { axios } from 'axios';

function logInAPI(data) {
  return axios.post('/api/login', data);
}

function logOutAPI(data) {
  return axios.post('/api/logout', data);
}

function* logIn(action) {
  try {
    // 서버가 없으니 주석
    // const result = yield call(logInAPI, action.data);
    yield delay(1000);
    yield put({
      type: 'LOG_IN_SUCCESS',
      // data: result.data
      data: action.data
    });
  } catch (err) {
    yield put({
      type: 'LOG_IN_FAILURE',
      data: err.response.data
    });
  }
}

function* logOut(action) {
  try {
    // 서버가 없으니 주석
    // const result = yield call(logOutAPI, action.data);
    yield delay(1000);
    yield put({
      type: 'LOG_OUT_SUCCESS',
      // data: result.data
      data: action.data
    });
  } catch (err) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: err.response.data
    });
  }
}

function* watchLogIn() {
  yield takeLatest('LOG_IN_REQUEST', logIn);
}

function* watchLogOut() {
  yield takeLatest('LOG_OUT_REQUEST', logOut);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
  ])
}