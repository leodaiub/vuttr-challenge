/**
 *
 * Dialog
 *
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Dialogs from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Close } from '@material-ui/icons';
import Box from '@material-ui/core/Box';

interface Props {
  deleteTool?: any;
}

export function Dialog(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = e => {
    e.stopPropagation();
    setOpen(false);
  };
  return (
    <div>
      <Button
        onClick={e => {
          e.stopPropagation();
          handleClickOpen();
        }}
        color="secondary"
      >
        <Close fontSize="small" /> remove
      </Button>

      <Dialogs
        open={open}
        onClose={e => {
          handleClose(e);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this tool?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action is irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Box borderRadius="30" color="error.main" bgcolor="error.main" clone>
            <Button
              onClick={e => {
                e.stopPropagation();
                handleClose(e);
                props.deleteTool();
              }}
            >
              YES!
            </Button>
          </Box>
          <Box bgcolor="info.main" color="text.primary" clone>
            <Button
              onClick={e => {
                e.stopPropagation();
                handleClose(e);
              }}
            >
              NO!
            </Button>
          </Box>
        </DialogActions>
      </Dialogs>
    </div>
  );
}
