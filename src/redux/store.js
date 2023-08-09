import { createStore } from 'redux';
//import { configureStore } from '@reduxjs/toolkit';

import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './root-reducer';

const composedEnhancer = composeWithDevTools();

const store = createStore(rootReducer, composedEnhancer);
// const store = configureStore({
//   reducer: rootReducer, // Pass the combined reducer here
// });

export default store;