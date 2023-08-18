import {combineReducers} from '@reduxjs/toolkit';

import quoteReducer from './slices/code.slice';
import postsReducer from './slices/posts.slice';

const rootReducer = combineReducers({
  quoteState: quoteReducer,
  postsState: postsReducer
});

export default rootReducer;