// Dialog.js
import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const CustomDialog = ({ open, handleClose, handleFormSubmit, formData, handleFormChange }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Do you want any update? Click here."}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          If you want to update any employee details, fill out the form and press OK.
        </DialogContentText>
        <br />
        <form onSubmit={handleFormSubmit}>
        {/* <form className={styles.formContainer} onSubmit={handleFormSubmit}> */}
          {/* Form inputs */}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
