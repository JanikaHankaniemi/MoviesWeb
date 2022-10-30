/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable object-curly-newline */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useTranslation } from 'react-i18next';
import { Typography, Container, } from '@mui/material';
import Grid from '@mui/material/Grid';
import { getMovies } from '../../redux/MoviesSlice';
// import theme from '../../theme/theme';

function FindMoviesContainer() {
  console.log("taalla");
  return (
    <Container maxWidth="xl" id="contactForm">
      <Grid container>
        <Grid item>
          <Typography variant="h1">Hullo, Search Movie</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default FindMoviesContainer;
