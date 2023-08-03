export const FETCH_QUOTE = 'FETCH_QUOTE';
export const ADD_QUOTE = 'ADD_QUOTE';

export const fetchQuote = () => ({
  type: FETCH_QUOTE,
});

export const addQuote = (quoteData) => ({
  type: ADD_QUOTE,
  payload: quoteData,
});
