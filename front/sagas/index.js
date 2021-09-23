import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import userSaga from './user';
import postSaga from './post';

// 기초 도메인 설정
axios.defaults.baseURL = 'http://localhost:3001';

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}
