import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const EditDialog = ({ open, handleClose, formData, handleFormChange, handleFormSubmit }) => {
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
          <br />
          <label htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={formData.name || ''}
            onChange={handleFormChange}
          />

          <label htmlFor="department">
            Department:
          </label>
          <input
            type="text"
            id="department"
            value={formData.department || ''}
            onChange={handleFormChange}
          />

          <label htmlFor="number">
            Number:
          </label>
          <input
            type="number"
            id="number"
            value={formData.number || ''}
            onChange={handleFormChange}
          />

          <label htmlFor="designation">
            Designation:
          </label>
          <input
            type="text"
            id="designation"
            value={formData.designation || ''}
            onChange={handleFormChange}
          />

          <label htmlFor="type">
            Type:
          </label>
          <input
            type="text"
            id="type"
            value={formData.type || ''}
            onChange={handleFormChange}
          />
          <Button type="submit" onClick={handleClose} autoFocus>
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
