/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useTranslation } from 'react-i18next';
import {
  Typography,
  Card
} from '@mui/material';
import Grid from '@mui/material/Grid';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { getMovies } from '../../redux/MoviesSlice';
import SearchAccordion from '../movies/SearchAccordion';

function FindMoviesContainer() {
  const dispatch = useDispatch();
  const movies = useSelector(
    (state) => state.movies.movies);
  const isFetchingMovies = useSelector(
    (state) => state.movies.isFetchingMovies);

  useEffect(() => {
    if (!movies || movies?.length === 0) {
      dispatch(getMovies());
    }
  }, [dispatch, movies]);

  const GetStars = ({ rating }) => {
    let rows = [];
    if (rating) {
      for (var i = 0; i < rating; i++) {
        rows.push(<StarBorderIcon key={`stars${i}`}  sx={{ fontSize: 16 }}/>)
      }
    }
    return rows;
  };

  return (
    <Grid container>
      <Grid item xs={12} sx={{ marginTop: '30px', marginBottom: '30px' }}>
        <Typography variant="h4" sx={{marginLeft:'20px'}}>Hullo, Find A Movie</Typography>
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: '10px' }}>
        <SearchAccordion />
      </Grid>
      {!isFetchingMovies && movies && (
      <Grid item xs={12}>
        {movies?.map((movie, index) => (
          <Card key={`card${index}`} sx={{ marginBottom: '10px', padding: '20px' }}>
            <Grid container sx={{ padding: '5px' }}>
              <Grid item xs={12}>
                <Typography variant="button">{movie.name}</Typography>
              </Grid>
              <Grid item xs={12}>
                <GetStars rating={movie.rating} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">{movie.synopsis}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3} alignItems="center">
                <Typography variant="body2">{`Year: ${movie.year}`}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2">{`Age limit: ${movie.ageLimit}`}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2">{"Genres: "}
                {movie.genres?.join(', ')}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Typography variant="body2">{"Director: "}
                  {`${movie.director?.firstName} ${movie.director?.lastName}`}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Typography variant="body2">{"Actors: "}
                  {movie.actors?.map(actor => actor.firstName + " " + actor.lastName).join(', ')}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        ))}
        </Grid>
      )}
    </Grid>
  );
}
export default FindMoviesContainer;
