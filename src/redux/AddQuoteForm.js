import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addQuote } from './actions'; 

const AddQuoteForm = ({ onClose }) => {
  const dispatch = useDispatch();
  
  const [quoteData, setQuoteData] = useState({
    quote: '',
    name: '',
    timestamp: '',
    country: '',
    type: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addQuote(quoteData)); // Implement the addQuote action
    onClose();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setQuoteData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="add-quote-form">
      <h2>Add New Quote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Quote:</label>
          <textarea
            name="quote"
            value={quoteData.quote}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={quoteData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Timestamp:</label>
          <input
            type="text"
            name="timestamp"
            value={quoteData.timestamp}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={quoteData.country}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Type of Quote:</label>
          <input
            type="text"
            name="type"
            value={quoteData.type}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Ok</button>
      </form>
    </div>
  );
};

export default AddQuoteForm;
