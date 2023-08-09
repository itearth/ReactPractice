import { createSlice } from '@reduxjs/toolkit';

const quoteState = {
  quotes: []
};

const quoteSlice = createSlice({
  name: 'quotes',
  initialState: quoteState,
  reducers: {
    // setQuote: (state, action) => {
    //   state.quotes = action.payload;
    // },
    // clearQuote: (state) => {
    //   state.quotes = quoteState.quotes;
    // },
    addQuote: (state, action) => {
      //state.quotes.push(action.payload);
      console.log(action.payload);
    },
    // saveQuote: (state, action) =>{
    //   state.quotes.push(action.payload);
    // },
    // add quote
    //delete quote
    //edit quote
  },
});

export const quoteActions = quoteSlice.actions;
export default quoteSlice.reducer;
