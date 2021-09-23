import { all, fork, takeLatest, delay, put } from 'redux-saga/effects';
import { axios } from 'axios';
import shortId from 'shortid';

import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_TO_ME } from '../reducers/user';

function addPostAPI(data) {
  return axios.post('/api/post', data);
}

function addCommentAPI(data) {
  return axios.post('/api/comment', data);
}

function removePostAPI(data) {
  return axios.post('/api/remove', data);
}

function* addPost(action) {
  try {
    // 서버가 없으니 주석
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    const id = shortId.generate();
    yield put({
      type: ADD_POST_SUCCESS,
      // data: result.data
      data: {
        id,
        content: action.data,
      },
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: id,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function* addComment(action) {
  try {
    // 서버가 없으니 주석
    // const result = yield call(addCommentAPI, action.data);
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      // data: result.data
      data: action.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function* removePost(action) {
  try {
    console.log(action);
    // 서버가 없으니 주석
    // const result = yield call(removePostAPI, action.data);
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      // data: result.data
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_TO_ME,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment), fork(watchRemovePost)]);
}
