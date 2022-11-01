import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Card,
  Button
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function DialogError() {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.errors.errorMessage);
  const errorCode = useSelector((state) => state.errors.errorCode);

  return (
    <Dialog
      open={!!errorMessage}
      onClose={() => dispatch({ type: 'error/resetErrors' })}
      PaperProps={{ square: true }}
    >
      <Card title={`${errorCode}: ${errorMessage}`} sx={{ padding: '20px' }}
      >
        {errorCode === 500 && (
          <DialogContent sx={{ padding: 0 }} id="alert-dialog-description-500">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
              <ErrorOutlineIcon sx={{ fontSize: 24, marginRight:'15px' }} />
              <Typography variant="h5">
                {`${errorCode}: ${errorMessage}`}
              </Typography>
            </div>
          <Typography variant="subtitle1">
           Something went wrong with the request and the server wasn't able to fullfil it.
          </Typography>
        </DialogContent>
        )}
        {errorCode === 400 && (
          <DialogContent sx={{ padding: 0 }} id="alert-dialog-description-400">
            <Typography variant="subtitle1">
              Something was wrong with the request and the server wasn't able to fullfil it.
            </Typography>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={() => dispatch({ type: 'error/resetErrors' })}>
            Close
          </Button>
        </DialogActions>
      </Card>
    </Dialog>
  );
}

export default DialogError;
