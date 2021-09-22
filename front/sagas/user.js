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

function signUpAPI(data) {
  return axios.post('/api/signup', data);
}

function loginAPI(data) {
  return axios.post('/api/Login', data);
}

function logoutAPI(data) {
  return axios.post('/api/Logout', data);
}

function* signUp(action) {
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

function* Login(action) {
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

function* Logout(action) {
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

function* watchSignup() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, Login);
}

function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, Logout);
}

export default function* userSaga() {
  yield all([fork(watchSignup), fork(watchLogin), fork(watchLogout)]);
}
