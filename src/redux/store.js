// store.js
import { applyMiddleware, createStore,  } from 'redux';
import rootReducer from './reducer/index';
import { thunk } from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
