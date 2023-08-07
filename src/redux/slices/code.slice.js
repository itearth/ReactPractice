import { createSlice } from '@reduxjs/toolkit';

const quoteState = {
  quote: {
    text: '',
    name: '',
    timestamp: '',
    country: '',
    type: '',
  },
};

const quoteSlice = createSlice({
  name: 'quote',
  initialState: quoteState,
  reducers: {
    setQuote: (state, action) => {
      state.quote = action.payload;
    },
    clearQuote: (state) => {
      state.quote = quoteState.quote;
    },
  },
});

export const quoteActions = quoteSlice.actions;
export default quoteSlice.reducer;
