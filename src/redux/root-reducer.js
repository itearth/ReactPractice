import {combineReducers} from '@reduxjs/toolkit';

import counterReducer from './slices/code.slice';

const rootReducer = combineReducers({
  quoteState: counterReducer
});

export default rootReducer;