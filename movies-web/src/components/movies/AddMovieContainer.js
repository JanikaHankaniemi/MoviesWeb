import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
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
  const { register, handleSubmit, reset } = useForm();
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
                <Grid item xs={12} sx={{ padding: '10px' }}>
                  <TextField
                    id="actors"
                    name="actors"
                    {...register("actors")}
                    label="Actors"
                    variant="outlined"
                    fullWidth />
                </Grid>
                <Grid item xs={12} sx={{ padding: '10px' }}>
                  <TextField
                    id="director"
                    name="director"
                    {...register("director")}
                    label="Director"
                    variant="outlined"
                    fullWidth />
                </Grid>
                <Grid item xs={12} md={4} lg={3} sx={{ padding: '10px' }}>
                  <TextField
                    id="year"
                    name="year"
                    {...register("year")}
                    label="Year"
                    variant="outlined"
                    fullWidth />
                </Grid>
                <Grid item xs={12} md={4} lg={3} sx={{ padding: '10px' }}>
                  <TextField
                    select
                    id="rating"
                    name="rating"
                    {...register("rating")}
                    label="Rating"
                    fullWidth
                    defaultValue=""
                  >
                    <MenuItem key="nullselect" value="null">&nbsp;</MenuItem>
                    {GetStarOptions()}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={4} lg={3} sx={{ padding: '10px' }}>
                  <TextField
                    select
                    id="ageLimit"
                    name="ageLimit"
                    {...register("ageLimit")}
                    label="Age Limit"
                    fullWidth
                    defaultValue=""
                  >
                    {[...Array(19).keys()].map(age => <MenuItem key={`age${age}`} value={age}>{age}</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid item xs={12} sx={{ padding: '10px' }}>
                  {!isFetchingGenres && genres && (
                    <>
                      <InputLabel id="genre-label">Genre</InputLabel>
                      <Select
                        multiple
                        labelId="genre-label"
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
