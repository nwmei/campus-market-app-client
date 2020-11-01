import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, Button, DialogContent, Input } from '@material-ui/core';
import AddItemForm from './AddItemForm';

const Popup = (props) => {
  const { isOpen, setIsOpen, title, children } = props;

  return (
    <Dialog open={isOpen} disableBackdropClick={false}>
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default Popup;
