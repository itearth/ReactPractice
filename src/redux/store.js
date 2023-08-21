import { createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';

import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './root-reducer';

const composedEnhancer = composeWithDevTools();

//const store = createStore(rootReducer, composedEnhancer);
const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware], // Apply Redux Thunk middleware
});
// const store = configureStore({
//   reducer: rootReducer, // Pass the combined reducer here
// });

export default store;