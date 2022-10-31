import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  Typography,
  Grid,
  Card,
  TextField
} from '@mui/material';
import { addMovie } from '../../redux/MoviesSlice';
import { getGenres } from '../../redux/MoviesSlice';

function AddMovieContainer() {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const genres = useSelector(
    (state) => state.movies.genres);
  const isFetchingGenres = useSelector(
    (state) => state.movies.FetchingGenres);

  const onSubmit = async (formData) => {
    try {
      await dispatch(addMovie({ formData: formData }));
    } catch (error) { }
  };

  const clearForm = async () => {
    try {
      reset();
      await onSubmit();
    } catch (error) {

    }
  }

  useEffect(() => {
    if (!genres) {
      dispatch(getGenres());
    }
  }, [dispatch, genres]);

  return (
    <Grid container>
      <Grid item xs={12} sx={{ marginTop: '30px', marginBottom: '30px' }}>
        <Typography variant="h4" sx={{ marginLeft: '20px' }}>Hullo, Add A Movie</Typography>
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: '10px' }}>
        <Card key={"cardempty"} sx={{ marginBottom: '10px', padding: '20px' }}>
          <form onSubmit={handleSubmit((data) => onSubmit(data))}>

            <Grid container >
              <Grid item xs={12} sx={{ padding: '10px' }}>
                <TextField
                  id="name"
                  name="name"
                  {...register("name")}
                  label="Name"
                  variant="outlined"
                  fullWidth />
              </Grid>
              <Grid item xs={12} sx={{ padding: '10px' }}>
                <TextField
                  multiline
                  rows={3}
                  id="synopsis"
                  name="synopsis"
                  {...register("synopsis")}
                  label="Synopsis"
                  variant="outlined"
                  fullWidth />
              </Grid>
            </Grid>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
}

export default AddMovieContainer;
