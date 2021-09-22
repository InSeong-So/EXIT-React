import { applyMiddleware, createStore, compose } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from '../reducers';

const configureStore = (context) => {
  const middlewares = [];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(
      applyMiddleware(...middlewares),
    );
  const store = createStore(reducer, enhancer);
  return store;
};

// 개발시 debug가 true라면 좀 더 상세하게 에러를 보여준다.
const wrapper = createWrapper(configureStore, { debug: process.env.NODE_ENV === 'development' });

export default wrapper;
