import { all, fork, takeLatest, delay, put } from 'redux-saga/effects';
import { axios } from 'axios';

import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
} from '../reducers/user';

function signupAPI(data) {
  return axios.post('/api/signup', data);
}

function loginAPI(data) {
  return axios.post('/api/Login', data);
}

function logoutAPI(data) {
  return axios.post('/api/Logout', data);
}

function* signup(action) {
  try {
    // 서버가 없으니 주석
    // const result = yield call(LoginAPI, action.data);
    yield delay(1000);
    yield put({
      type: SIGN_UP_SUCCESS,
      // data: result.data
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      data: err.response.data,
    });
  }
}

function* login(action) {
  try {
    // 서버가 없으니 주석
    // const result = yield call(LoginAPI, action.data);
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      // data: result.data
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      data: err.response.data,
    });
  }
}

function* logout(action) {
  try {
    // 서버가 없으니 주석
    // const result = yield call(LogoutAPI, action.data);
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
      // data: result.data
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      data: err.response.data,
    });
  }
}

function* follow(action) {
  try {
    // 서버가 없으니 주석
    // const result = yield call(followAPI, action.data);
    yield delay(1000);
    yield put({
      type: FOLLOW_SUCCESS,
      // data: result.data
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: FOLLOW_FAILURE,
      data: err.response.data,
    });
  }
}

function* unfollow(action) {
  try {
    // 서버가 없으니 주석
    // const result = yield call(unfollowAPI, action.data);
    yield delay(1000);
    yield put({
      type: UNFOLLOW_SUCCESS,
      // data: result.data
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: UNFOLLOW_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchSignup() {
  yield takeLatest(SIGN_UP_REQUEST, signup);
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnFollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

export default function* userSaga() {
  yield all([
    fork(watchSignup),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchFollow),
    fork(watchUnFollow),
  ]);
}
