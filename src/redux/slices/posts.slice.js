import { createSlice } from '@reduxjs/toolkit';

const postsState = {
  posts: [],
  loading: false
};

const postsSlice = createSlice({
  name: 'posts',
  initialState: postsState,
  reducers: {
    
   
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
  },
});

export const postsActions = postsSlice.actions;
export default postsSlice.reducer;
