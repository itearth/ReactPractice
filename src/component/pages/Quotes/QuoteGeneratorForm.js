import React, { useState } from 'react';
// import Navbar from "../../generics/Navbar/Navbar";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import styles from './QuoteGeneratorForm.module.css';  
import { useDispatch } from 'react-redux';
import quoteActions  from '../../../redux/slices/code.slice';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const countryOptions = ['USA', 'Canada', 'UK', 'Australia', 'India'];
const typeOptions = ['Life', 'Peace', 'Motivation'];

export default function QuoteGeneratorForm() {
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedType, setSelectedType] = useState('');
 
  const dispatch = useDispatch();
 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    if (window.confirm("Do you really want to delete this quote?")) {
      setOpen(false); 
    }
  };

  const handleSetQuote = () => {
    const newQuote = {
      text: 'Quote text',
      name: 'Author name',
      timestamp: 'Timestamp value',
      country: selectedCountry,
      type:  selectedType,
    };
    dispatch(quoteActions(newQuote));
    setOpen(false);
  };

  return (
    <div className={styles.container}>
    

      {/* <Navbar /> */}

      <Button
        variant="outlined"
        className={styles.button}
        onClick={handleClickOpen}
      >
        Open quote generator form
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography className={styles.dialogTitle} variant="h6" component="div">
              Quote Generator
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Get Quote
            </Button>
            <Button
              autoFocus
              color="inherit"
              onClick={handleDelete}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
            <Button
              color="inherit"
              onClick={() => console.log('Edit clicked')} // Add your edit logic here
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <TextField label="Quote" fullWidth variant="outlined" />
          </ListItem>
          <Divider />
          <ListItem>
            <TextField label="Name" fullWidth variant="outlined" />
          </ListItem>
          <Divider />
          <ListItem>
          
            <TextField label="Timestamp" fullWidth variant="outlined" />
          </ListItem>
          <Divider />
          <ListItem>
          <TextField label="Country" fullWidth variant="outlined" select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
          {countryOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
          </ListItem>
          <Divider />
          <ListItem>
          <TextField label="Type" fullWidth variant="outlined" select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          {typeOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}
