import React from 'react';
import {
  Typography,
  Card,
  Grid
} from '@mui/material';

function LoadingContainer() {
  return (
    <Card key={"cardempty"} sx={{ marginBottom: '10px', padding: '20px' }}>
      <Grid container sx={{ padding: '5px' }}>
        <Grid item xs={12}>
          <Typography variant="button">Loading...</Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default LoadingContainer;
