import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../generics/Navbar/Navbar';
import styles from './QuotePage.module.css';
//import { useDispatch } from 'react-redux';
import { quoteActions } from '../../../redux/slices/code.slice';

const QuotePage = () => {
  const dispatch = useDispatch();
  const quoteData = useSelector((state) => state.quoteState.quotes);

  const [showForm, setShowForm] = useState(false);
  const [quote, setQuote] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [type, setType] = useState('');

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newQuote = {
      quote,
      name,
      country,
      type,
    };

    dispatch(quoteActions.addQuote(newQuote)); 

    // Clear form inputs
    setQuote('');
    setName('');
    setCountry('');
    setType('');

    setShowForm(false);     //To hide the form
  };

  const handleCloseForm = () => {
    setShowForm(false);    //to close the form
  };

  const [editIndex, setEditIndex] = useState(-1);

  const handleEdit = (index) => {
    setEditIndex(index); // Set the index of the quote to be edited
    setShowForm(true); // Show the form for editing
  };

  const handleDelete = (index) => {
    dispatch(quoteActions.deleteQuote(index));
  };

    return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <button className={styles.btnSuccess} onClick={toggleForm}>
          Add Quote
        </button>

        {showForm && (
          <div className={styles.popup}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <label htmlFor="quote">Quote</label>
              <input type="text" id="quote" name="quote" placeholder="Enter the quote"  value={quote}
  onChange={(event) => setQuote(event.target.value)}/>
              
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Enter your name"  value={name}
  onChange={(event) => setName(event.target.value)}/>
              
              <label htmlFor="country">Country</label>
              <select id="country" name="country"  value={country}
  onChange={(event) => setCountry(event.target.value)}>
                <option value="">Select a country</option>
                <option value="us">United States</option>
                <option value="ca">Canada</option>
                <option value="au">Australia</option>
                <option value="uk">United Kingdom</option>
                <option value="in">India</option>
                <option value="jp">Japan</option>
              </select>
              
              <label htmlFor="type">Type</label>
              <select id="type" name="type"  value={type}
  onChange={(event) => setType(event.target.value)}>
              <option value="">Select any type</option>
                <option value="inspirational">Inspirational</option>
                <option value="funny">Funny</option>
                <option value="study">Study</option>
                <option value="life">Life</option>
                <option value="gym">Gym</option>
                <option value="courage">Courage</option>
              </select>
              
              <div className={styles.buttonContainer}>
              <button type="submit" className={styles.saveButton}>
                  Save
                </button>
                <button type="button" onClick={handleCloseForm} className={styles.closeButton}>
                  Close
                </button>
            </div>

            </form>
          </div>
        )}

 <div className={styles.savedQuotes}>
         {quoteData.map((quote, index) => (
           <div key={index} className={styles.savedQuote}>
             <p>{quote.quote}</p>
             <p>{quote.name}</p>
             <p>{quote.country}</p>
             <p>{quote.type}</p>
             <div>
             <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
            </div>
          ))}
        </div> 

      </div>  
    </div>
  );
}

export default QuotePage;

























