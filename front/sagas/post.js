import { all, fork, takeLatest, call, put, throttle } from 'redux-saga/effects';
import axios from 'axios';

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
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  generateDummyPost,
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_TO_ME } from '../reducers/user';

function loadPostAPI(data) {
  return axios.post('/load', data);
}

function addPostAPI(data) {
  return axios.post('/post', { content: data });
}

function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data);
}

function removePostAPI(data) {
  return axios.post('/remove', data);
}

function* loadPost(action) {
  try {
    // const result = yield call(loadPostAPI, action.data);
    yield put({
      type: LOAD_POST_SUCCESS,
      // data: result.data
      data: generateDummyPost(10),
    });
  } catch (err) {
    yield put({
      type: LOAD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (err) {
    console.log(action);
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function* removePost(action) {
  try {
    // const result = yield call(removePostAPI, action.data);
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

function* watchLoadPost() {
  yield throttle(5000, LOAD_POST_REQUEST, loadPost);
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
  yield all([
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
  ]);
}
