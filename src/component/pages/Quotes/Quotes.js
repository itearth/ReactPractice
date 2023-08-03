// QuoteGenerator.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuote } from '../../../redux/actions';
import Navbar from '../../generics/Navbar/Navbar';
import AddQuoteForm from '../../../redux/AddQuoteForm'; 
import styles from '../Quotes/Quotes.module.css';

const QuoteGenerator = () => {
  const quote = useSelector((state) => state.quote);
  const dispatch = useDispatch();

  const [isAddQuoteOpen, setIsAddQuoteOpen] = useState(false);

  const handleNewQuote = () => {
    dispatch(fetchQuote());
  };

  const handleAddQuoteOpen = () => {
    setIsAddQuoteOpen(true);
  };

  const handleAddQuoteClose = () => {
    setIsAddQuoteOpen(false);
  };

  return (
    <div>
      <Navbar />
      
      
      <button
        className={styles['add-quote-button']}
        onClick={handleAddQuoteOpen}
      >
        Add Quote
      </button>
      
      {isAddQuoteOpen && (
        <AddQuoteForm onClose={handleAddQuoteClose} isOpen={isAddQuoteOpen} />
      )}

      <blockquote>
        <p>{quote}</p>
      </blockquote>
    </div>
  );
};

export default QuoteGenerator;
