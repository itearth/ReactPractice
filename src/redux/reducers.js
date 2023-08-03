import { FETCH_QUOTE } from './actions';

const initialState = {
  quote: '',
};

const quoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUOTE:
      
      const quotes = [
        "Be yourself; everyone else is already taken. - Oscar Wilde",
        "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe. - Albert Einstein",
        "Life is what happens when you're busy making other plans. - John Lennon",
      ];
      const randomIndex = Math.floor(Math.random() * quotes.length);
      return {
        ...state,
        quote: quotes[randomIndex],
      };
    default:
      return state;
  }
};

export default quoteReducer;
