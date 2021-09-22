import { all, fork, takeLatest, delay } from 'redux-saga/effects';
import { axios } from 'axios';

function logInAPI(data) {
  return axios.post('/api/login', data);
}

function* logIn(action) {
  try {
    // 서버가 없으니 주석
    // const result = yield call(logInAPI, action.data);
    yield delay(1000);
    yield pust({
      type: 'LOG_IN_SUCCESS',
      data: result.data
    });
  } catch (err) {
    yield put({
      type: 'LOG_IN_FAILURE',
      data: err.response.data
    });
  }
}

function logOutAPI(data) {
  return axios.post('/api/logout', data);
}

function* logOut(action) {
  try {
    // 서버가 없으니 주석
    // const result = yield call(logOutAPI, action.data);
    yield delay(1000);
    yield pust({
      type: 'LOG_OUT_SUCCESS',
      data: result.data
    });
  } catch (err) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: err.response.data
    });
  }
}

function addPostAPI(data) {
  return axios.post('/api/post', data);
}

function* addPost(action) {
  try {
    // 서버가 없으니 주석
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    yield pust({
      type: 'ADD_POST_SUCCESS',
      data: result.data
    });
  } catch (err) {
    yield put({
      type: 'ADD_POST_FAILURE',
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

function* watchAddPost() {
  yield takeLatest('ADD_POST_REQUEST', addPost);
}

export default function* rootSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchAddPost),
  ]);
}