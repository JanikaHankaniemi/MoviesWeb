import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Select,
  InputLabel,
  MenuItem,
  Grid,
  TextField,
  Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { searchMovies } from '../../redux/MoviesSlice';
import { getGenres } from '../../redux/MoviesSlice';

function SearchAccordion() {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const schema = yup
    .object()
    .shape({
      freeText: yup
        .string()
        .nullable(),
      person: yup
        .string()
        .nullable(),
      genre: yup
        .string()
        .nullable(),
      year: yup
        .string()
        .nullable(),
      ageLimit: yup
        .string()
        .nullable(),
      rating: yup
        .string()
        .nullable()
    })
    .required();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (formData) => {
    try {
      await dispatch(searchMovies({ formData: formData }));
    } catch (error) {
      
    }
  };

  const clearForm = async () => {
    try {
      reset();
      await onSubmit();
    } catch (error) {

    }
  }

  const genres = useSelector(
    (state) => state.movies.genres);
  const isFetchingGenres = useSelector(
    (state) => state.movies.isFetchingGenres);

  useEffect(() => {
    if (!genres || genres?.length === 0) {
      dispatch(getGenres());
    }
  }, [dispatch, genres]);

  const GetStarOptions = () => {
    let rows = [];
    let innerRows = [];
    const fiveRows = [...Array(5).keys()].reverse();
    fiveRows.forEach(index => {
      for (var i = 0; i < index+1; i++) {
        innerRows.push(<StarBorderIcon key={`starsicon${index},${i}`} sx={{ fontSize: 16 }}/>)
      }
      rows.push(<MenuItem key={`stars${index + 1}`} value={index + 1}>{innerRows}</MenuItem>)
      innerRows=[];
    })
    return rows;
  };

  return (
    <div>
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)} disableGutters={true}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="searcAccordion"
          sx={{ backgroundColor: "#5E747F" }}
        >
          <Typography variant="button" color="white">
            Search
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={2}
              marginTop={0.5}
            >
              <Grid item xs={12} md={12} lg={12}>
                <TextField
                  id="freeText"
                  name="freeText"
                  {...register("freeText")}
                  label="Free text"
                  variant="outlined"
                  fullWidth />
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <TextField
                  id="year"
                  name="year"
                  {...register("year")}
                  label="Year"
                  variant="outlined"
                  fullWidth />
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
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
              <Grid item xs={12} md={4} lg={3}>
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
              <Grid item xs={12} md={4} lg={3}>
                {!isFetchingGenres && genres && (
                    <TextField
                      select
                      id="genre"
                      name="genre"
                      {...register("genre")}
                      label="Genre"
                      fullWidth
                      defaultValue=""
                    >
                    <MenuItem key="nullselect" value="">&nbsp;</MenuItem>
                    {genres.map(genre => <MenuItem key={`genre${genre.name}`} value={genre.name}>{genre.name}</MenuItem>)}
                    </TextField>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" sx={{marginRight: '20px', marginBottom:'15px', width:'100px'}}>Search</Button>
                <Button onClick={clearForm} sx={{ width: '100px', marginBottom: '15px',}} variant="contained">Clear</Button>
              </Grid>
            </Grid>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  )
};

export default SearchAccordion;
