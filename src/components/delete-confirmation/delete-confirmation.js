import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { DeleteConfirmStyle } from '../../style-component/delete-confirmation'

export default function DeleteConfirmation({
  title,
  message,
  confirmButton,
  cancelButton,
  onConfirmButtonClick,
  onCancelButtonClick,
  onClose
}) {
  const handleClose = () => {
    onClose()
  }

  return (
    <div>
      <DeleteConfirmStyle
        open={true}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancelButtonClick}>{cancelButton}</Button>
          <Button onClick={onConfirmButtonClick} autoFocus>
            {confirmButton}
          </Button>
        </DialogActions>
      </DeleteConfirmStyle>
    </div>
  )
}

DeleteConfirmation.defaultProps = {
  title: 'Confirmation',
  message: 'Are you sure you want to delete?',
  confirmButton: 'Yes',
  cancelButton: 'No'
}
