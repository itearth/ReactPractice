import {combineReducers} from '@reduxjs/toolkit';

import quoteReducer from './slices/code.slice';

const rootReducer = combineReducers({
  quoteState: quoteReducer
});

export default rootReducer;