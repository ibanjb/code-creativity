import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';

export default function CommonDialog(props: {
  visible: boolean;
  onCancel: Function;
  onAccept: Function;
  title: string;
  description: string;
  acceptButton: string;
  cancelButton: string;
}) {
  const {
    visible,
    onCancel,
    onAccept,
    acceptButton,
    cancelButton,
    title,
    description,
  } = props;

  const handleAccept = React.useCallback(() => {
    onAccept();
  }, [onAccept]);

  const handleCancel = React.useCallback(() => {
    onCancel();
  }, [onCancel]);

  return (
    <Dialog
      open={visible}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      data-testid="common-dialog-id"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          {cancelButton}
        </Button>
        <Button onClick={handleAccept} color="primary" autoFocus>
          {acceptButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
