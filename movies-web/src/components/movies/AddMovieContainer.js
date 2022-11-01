import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import {
  Typography,
  Grid,
  Card,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  Button
} from '@mui/material';
import { addMovie } from '../../redux/MoviesSlice';
import { getGenres } from '../../redux/MoviesSlice';
import { clearAddedMovie } from '../../redux/MoviesSlice';
import { GetStarOptions } from '../common/Utils'

function AddMovieContainer() {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });
  const [genreSelection, setGenre] = useState([]);

  const defaultValues = {
    year: "",
    rating: "",
    ageLimit: "",
    name: "",
    synopsis: "",
    actors: "",
    director: ""
  };

  const genres = useSelector(
    (state) => state.movies.genres);
  const addedMovie = useSelector(
    (state) => state.movies.addedMovie);
  const isFetchingGenres = useSelector(
    (state) => state.movies.FetchingGenres);

  const onSubmit = async (formData) => {
    const modFormData = {
      ...formData,
      genres: genreSelection
    }

    try {
      await dispatch(addMovie({ formData: modFormData }))
        .then((result) => {
          clearForm();
        });
    } catch (error) { }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setGenre(value);
  };

  const clearForm = () => {
    reset(defaultValues);
    setGenre([]);
  }

  useEffect(() => {
    return () => {
      reset();
      setGenre([]);
      dispatch(clearAddedMovie());
    }
  }, [dispatch, reset])

  useEffect(() => {
    if (!genres) {
      dispatch(getGenres());
    }
  }, [dispatch, genres]);
  console.log("errors", errors)
  return (
    <Grid container>
      <Grid item xs={12} sx={{ marginTop: '30px', marginBottom: '30px' }}>
        <Typography variant="h4" sx={{ marginLeft: '20px' }}>Hullo, Add a Movie</Typography>
      </Grid>
      {addedMovie && (
        <Grid item xs={12} sx={{ marginBottom: '10px' }}>
          <Card key={"cardSuccess"} sx={{ marginBottom: '10px', padding: '20px' }}>
            <Grid container sx={{ padding: '5px' }}>
              <Grid item xs={12}>
                <Typography variant="body1">Movie saved!</Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      )}
      {!addedMovie && (
        <Grid item xs={12} sx={{ marginBottom: '10px' }}>
          <Card key={"cardAddMovie"} sx={{ marginBottom: '10px', padding: '20px' }}>
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
              <Grid container >
                <Grid item xs={12} sx={{ padding: '10px' }}>
                  <TextField
                    id="name"
                    name="name"
                    {...register("name", { required: true })}
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
                    {...register("synopsis", { required: true })}
                    label="Synopsis"
                    variant="outlined"
                    fullWidth />
                </Grid>
                <Grid item xs={12} sx={{ padding: '10px' }}>
                  <TextField
                    id="actors"
                    name="actors"
                    {...register("actors", { required: true })}
                    label="Actors"
                    variant="outlined"
                    fullWidth />
                </Grid>
                <Grid item xs={12} sx={{ padding: '10px' }}>
                  <TextField
                    id="director"
                    name="director"
                    {...register("director", { required: true })}
                    label="Director"
                    variant="outlined"
                    fullWidth />
                </Grid>
                <Grid item xs={12} md={6} lg={3} sx={{ padding: '10px' }}>
                  <InputLabel htmlFor="year">Year</InputLabel>
                  <TextField
                    id="year"
                    name="year"
                    {...register("year", { required: true, pattern: /^[0-9]+$/i })}
                    variant="outlined"
                    fullWidth />
                </Grid>
                <Grid item xs={12} md={6} lg={3} sx={{ padding: '10px' }}>
                  <InputLabel htmlFor="rating">Rating</InputLabel>
                  <TextField
                    select
                    id="rating"
                    name="rating"
                    {...register("rating", { required: true })}
                    fullWidth
                    defaultValue=""
                  >
                    <MenuItem key="nullselect" value="null">&nbsp;</MenuItem>
                    {GetStarOptions()}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6} lg={3} sx={{ padding: '10px' }}>
                  <InputLabel htmlFor="age">Age Limit</InputLabel>
                  <TextField
                    select
                    id="ageLimit"
                    name="ageLimit"
                    {...register("ageLimit", { required: true })}
                    fullWidth
                    defaultValue=""
                  >
                    {[...Array(19).keys()].map(age => <MenuItem key={`age${age}`} value={age}>{age}</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6} lg={3} sx={{ padding: '10px' }}>
                  {!isFetchingGenres && genres && (
                    <>
                      <InputLabel htmlFor="genre">Genre</InputLabel>
                      <Select
                        multiple
                        id="genres"
                        name="genres"
                        fullWidth
                        value={genreSelection}
                        onChange={handleChange}
                      >
                        {genres.map(genre => <MenuItem key={`genre${genre.name}`} value={genre.name}>{genre.name}</MenuItem>)}
                      </Select>
                     </>
                  )}
                </Grid>
                {Object.keys(errors).length !== 0 && (
                  <Grid item xs={12} sx={{ padding: '10px', paddingTop: '20px' }}>
                    <Typography variant="body1">All fields are mandatory, please checks</Typography>
                    {errors.year?.type === 'pattern' && <Typography variant="body1">Year must be in numeric format</Typography>}
                 </Grid>
                )}
                <Grid item xs={12} sx={{ padding: '10px', paddingTop: '20px' }}>
                  <Button type="submit" variant="contained" sx={{ marginRight: '20px', marginBottom: '15px', width: '100px' }}>Save</Button>
                  <Button onClick={clearForm} sx={{ width: '100px', marginBottom: '15px', }} variant="contained">Clear</Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grid>
      )}
    </Grid>
  );
}

export default AddMovieContainer;
