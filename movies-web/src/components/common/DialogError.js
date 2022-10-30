import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Card,
  Button
} from '@mui/material';

function DialogError() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const errorMessage = useSelector((state) => state.errors.errorMessage);
  const errorCode = useSelector((state) => state.errors.errorCode);

  return (
    <Dialog
      open={!!errorMessage}
      onClose={() => dispatch({ type: 'error/resetErrors' })}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ square: true }}
    >
      <Card
        ariaLabel="customer-service-info"
        title={`${errorCode ? `${errorCode}: ` : ''} ${t(errorMessage) || ''}`}
      >
        {errorCode === 500 && (
        <DialogContent sx={{ padding: 0 }} id="alert-dialog-description">
          <Typography variant="subtitle1">
            testing
          </Typography>
        </DialogContent>
        )}
        <DialogActions>
          <Button onClick={() => dispatch({ type: 'error/resetErrors' })}>
            {t('close')}
          </Button>
        </DialogActions>
      </Card>
    </Dialog>
  );
}

DialogError.propTypes = {};

DialogError.defaultProps = {};

export default DialogError;
