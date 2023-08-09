
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../generics/Navbar/Navbar';
import styles from './QuoteGeneratorForm.module.css';
//import { useDispatch } from 'react-redux';
 import quoteActions  from '../../../redux/slices/code.slice';

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
              <input type="text" id="quote" name="quote" placeholder="Enter the quote" />
              
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Enter your name" />
              
              <label htmlFor="country">Country</label>
              <select id="country" name="country">
                <option value="">Select a country</option>
                <option value="us">United States</option>
                <option value="ca">Canada</option>
                <option value="au">Australia</option>
                <option value="uk">United Kingdom</option>
                <option value="in">India</option>
                <option value="jp">Japan</option>
              </select>
              
              <label htmlFor="type">Type</label>
              <select id="type" name="type">
              <option value="">Select any type</option>
                <option value="inspirational">Inspirational</option>
                <option value="funny">Funny</option>
                <option value="study">Study</option>
                <option value="life">Life</option>
                <option value="gym">Gym</option>
                <option value="courage">Courage</option>
              </select>
              
              <button type="submit">Save</button>
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
            </div>
          ))}
        </div>

      </div>  
    </div>
  );
}

export default QuotePage;

























// import React, { useState } from 'react';
// import Navbar from "../../generics/Navbar/Navbar";
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import TextField from '@mui/material/TextField';
// import ListItemText from '@mui/material/ListItemText';
// import ListItem from '@mui/material/ListItem';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import CloseIcon from '@mui/icons-material/Close';
// import Slide from '@mui/material/Slide';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';

// import styles from './QuoteGeneratorForm.module.css';  
// import { useDispatch } from 'react-redux';
// import quoteActions  from '../../../redux/slices/code.slice';


// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// const countryOptions = ['USA', 'Canada', 'UK', 'Australia', 'India'];
// const typeOptions = ['Life', 'Peace', 'Motivation'];

// export default function QuoteGeneratorForm() {
//   const [open, setOpen] = useState(false);
//   const [selectedCountry, setSelectedCountry] = useState('');
//   const [selectedType, setSelectedType] = useState('');
//    const [quote, setQuote] = useState('');
//   const [name, setName] = useState('');
//   const [showCard, setShowCard] = useState(false);
 
//   const dispatch = useDispatch();
 
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };
//   const handleDelete = () => {
//     if (window.confirm("Do you really want to delete this quote?")) {
//       setOpen(false); 
//     }
//   };

//   const handleSetQuote = () => {
//     const newQuote = {
//       text: 'Quote text',
//       name: 'Author name',
//       timestamp: 'Timestamp value',
//       country: selectedCountry,
//       type:  selectedType,
//     };
//     dispatch(quoteActions(newQuote));
//     setOpen(false);
//   };

//   return (
//     <div className={styles.container}>
    

//       <Navbar />

//       <Button
//         variant="outlined"
//         className={styles.button}
//         onClick={handleClickOpen}
//       >
//         Open quote generator form
//       </Button>
//       <Dialog
//         fullScreen
//         open={open}
//         onClose={handleClose}
//         TransitionComponent={Transition}
//       >
//         <AppBar sx={{ position: 'relative' }}>
//           <Toolbar>
//             <IconButton
//               edge="start"
//               color="inherit"
//               onClick={handleClose}
//               aria-label="close"
//             >
//               <CloseIcon />
//             </IconButton>
//             <Typography className={styles.dialogTitle} variant="h6" component="div">
//               Quote Generator
//             </Typography>
//             <Button autoFocus color="inherit" onClick={handleClose}>
//               Get Quote
//             </Button>
//             <Button
//               autoFocus
//               color="inherit"
//               onClick={handleDelete}
//               startIcon={<DeleteIcon />}
//             >
//               Delete
//             </Button>
//             <Button
//               color="inherit"
//               onClick={() => console.log('Edit clicked')} // Add your edit logic here
//               startIcon={<EditIcon />}
//             >
//               Edit
//             </Button>
//           </Toolbar>
//         </AppBar>
//         <List>
//           <ListItem>
//             <TextField label="Quote" fullWidth variant="outlined" />
//           </ListItem>
//           <Divider />
//           <ListItem>
//             <TextField label="Name" fullWidth variant="outlined" />
//           </ListItem>
//           <Divider />
//           <ListItem>
          
//             <TextField label="Timestamp" fullWidth variant="outlined" />
//           </ListItem>
//           <Divider />
//           <ListItem>
//           <TextField label="Country" fullWidth variant="outlined" select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
//           {countryOptions.map((option) => (
//             <MenuItem key={option} value={option}>
//               {option}
//             </MenuItem>
//           ))}
//         </TextField>
//           </ListItem>
//           <Divider />
//           <ListItem>
//           <TextField label="Type" fullWidth variant="outlined" select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
//           {typeOptions.map((option) => (
//             <MenuItem key={option} value={option}>
//               {option}
//             </MenuItem>
//           ))}
//         </TextField>
//           </ListItem>

//             <ListItem>
//             <TextField
//               label="Quote"
//               fullWidth
//               variant="outlined"
//               value={quote}
//               onChange={(e) => setQuote(e.target.value)}
//             />
//           </ListItem>

//         </List>
// <Button autoFocus color="inherit" onClick={handleSetQuote}>
//           Get Quote
//         </Button>
//       </Dialog>

//        {showCard && (
//         <div className={styles.cardContainer}>
//           <div className={styles.cardSection}>
//             <h2>Quote:</h2>
//             <p>{quote}</p>
//           </div>
//           <div className={styles.cardSection}>
//             <h2>Name:</h2>
//             <p>{name}</p>
//           </div>
//           <div className={styles.cardSection}>
//             <h2>Country:</h2>
//             <p>{selectedCountry}</p>
//           </div>
//           <div className={styles.cardSection}>
//             <h2>Type:</h2>
//             <p>{selectedType}</p>
//           </div>
//         </div>
//       )}
      
//     </div>
//   );
// }
