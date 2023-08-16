import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../generics/Navbar/Navbar';
import styles from './QuotePage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

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
  const [editingQuote, setEditingQuote] = useState(-1);
  //const[editIndex, setEditIndex] = useState(-1);

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
       backgroundColor: getRandomColor(),
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
    setEditingQuote(index)
    const quoteToEdit = quoteData[index];
    setQuote(quoteToEdit.quote);
    setName(quoteToEdit.name);
    setCountry(quoteToEdit.country);
    setType(quoteToEdit.type);
    setShowForm(true); // Show the form for editing
  };
  

  const handleDelete = (index) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this quote?");
    dispatch(quoteActions.deleteQuote(index));
  };
  
  const getRandomColor = () => {
    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;
  
    return randomColor;
  };


    return (
    <div>
      <Navbar />
      <div className={styles.container}>
      <button className={`${styles.btnSuccess} ${styles.fixedButton}`} onClick={toggleForm}>
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
 {quoteData.length === 0 ? (
            <div className={styles.noQuotesFound}>
           <div className={styles.noQuotesIcon}>😔</div>
  <div className={styles.noQuotesText}>
  Oops! No quotes found. Add a quote using the&nbsp;
    <span className="cursorPointer">👆</span>&nbsp;button at the top-right.
  </div>
            </div>
          ) : (
         quoteData.map((quote, index) => (
           <div 
           key={index} 
           className={styles.savedQuote}
           style={{ backgroundColor: quote.backgroundColor }} 
           >
              <h2 className={styles.quotesText}>{quote.quote}</h2>
              <label className={styles.quotesTexts}>{quote.name}, {quote.type}</label>
             <div>
             <button onClick={() => handleEdit(index)} className={styles.editButton}>
             <FontAwesomeIcon icon={faEdit} />
              </button>
              <button onClick={() => handleDelete(index)} className={styles.deleteButton}>
              <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
            </div>
          ))
        )}
        </div> 

      </div>  
    </div>
  );
}

export default QuotePage;
