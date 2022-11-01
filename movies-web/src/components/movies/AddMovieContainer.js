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
  InputLabel
} from '@mui/material';
import { addMovie } from '../../redux/MoviesSlice';
import { getGenres } from '../../redux/MoviesSlice';
import { GetStarOptions } from '../common/Utils'

function AddMovieContainer() {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [genreSelection, setGenre] = useState([]);

  const genres = useSelector(
    (state) => state.movies.genres);
  const isFetchingGenres = useSelector(
    (state) => state.movies.FetchingGenres);

  const onSubmit = async (formData) => {
    try {
      await dispatch(addMovie({ formData: formData }));
    } catch (error) { }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    console.log("newValue", value)
    setGenre(value);
  };

  const clearForm = async () => {
    try {
      reset();
      await onSubmit();
    } catch (error) {

    }
  }
  console.log("genreSelection", genreSelection)
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
                  <MenuItem key="nullselect" value="">&nbsp;</MenuItem>
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
                  <MenuItem key="nullselect" value="">&nbsp;</MenuItem>
                  {[...Array(19).keys()].map(age => <MenuItem key={`age${age}`} value={age}>{age}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={12} md={4} lg={3} sx={{ padding: '10px' }}>
                {!isFetchingGenres && genres && (
                  <>
                    <Select multiple
                      id="genre"
                      name="genre"
                      fullWidth
                      label="test"
                      value={genreSelection}
                      onChange={handleChange}
                      {...register("genre")}
                    >
                      <MenuItem key="nullselect" value="">&nbsp;</MenuItem>
                      {genres.map(genre => <MenuItem key={`genre${genre.name}`} value={genre.name}>{genre.name}</MenuItem>)}
                    </Select>
                  </>
                )}
              </Grid>
            </Grid>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
}

export default AddMovieContainer;
