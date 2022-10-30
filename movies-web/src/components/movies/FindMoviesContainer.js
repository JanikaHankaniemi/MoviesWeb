/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useTranslation } from 'react-i18next';
import {
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary
} from '@mui/material';
import Grid from '@mui/material/Grid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getMovies } from '../../redux/MoviesSlice';
import SearchAccordion from '../movies/SearchAccordion';

function FindMoviesContainer() {
  const dispatch = useDispatch();
  const movies = useSelector(
    (state) => state.movies.movies);
  useEffect(() => {
    if (!movies || movies?.length === 0) {
      dispatch(getMovies());
    }
    console.log("movies", movies);
  }, [dispatch, movies]);

  return (
    <Grid container>
      <Grid item xs={12} sx={{marginTop: '30px', marginBottom: '30px'}}>
        <Typography variant="h4">Hullo, Find A Movie</Typography>
      </Grid>
      <Grid item xs={12}>
        <SearchAccordion />
      </Grid>
    </Grid>
  );
}

export default FindMoviesContainer;
