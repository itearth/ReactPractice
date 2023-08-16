import { createSlice } from '@reduxjs/toolkit';

const quoteState = {
  quotes: [],
};

const quoteSlice = createSlice({
  name: 'quotes',
  initialState: quoteState,
  reducers: {
    
    addQuote: (state, action) => {
      state.quotes.push(action.payload);
      //console.log(action.payload);
    },
    editQuote: (state, action) => {
      const { index, updatedQuote } = action.payload;
      state.quotes[index] = updatedQuote;
    },
    deleteQuote: (state, action) => {
      const indexToDelete = action.payload;
      state.quotes.splice(indexToDelete, 1);
    },
    // updateQuote: (state, action) => {
    //   const { index, updatedQuote } = action.payload;
    //   state.quotes[index] = updatedQuote;
    // },
   
    // add quote
    //delete quote
    //edit quote
  },
});

export const quoteActions = quoteSlice.actions;
export default quoteSlice.reducer;
