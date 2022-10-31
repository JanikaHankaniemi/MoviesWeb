import React, { useEffect, useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
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
  TextField
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { searchMovie } from '../../redux/MoviesSlice';
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
        .number()
        .nullable(),
      ageLimit: yup
        .number()
        .nullable(),
      rating: yup
        .number()
        .nullable()
    })
    .required();

  const {
    handleSubmit, control, setValue, watch, reset,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      freeText: '',
      person: '',
      genre: '',
      year: '',
      ageLimit: '',
      rating: ''
    },
  });

  const modSearchObject = (formData) => {
    dispatch(searchMovie({ searchTerms: formData }));
  };
  const [selection, setSelection] = useState();
  const genres = useSelector(
    (state) => state.movies.genres);
  const isFetchingGenres = useSelector(
    (state) => state.movies.isFetchingGenres);

  useEffect(() => {
    if (!genres || genres?.length === 0) {
      dispatch(getGenres());
    }
    console.log("Genres", genres)
  }, [dispatch, genres]);

  const GetStarOptions = () => {
    let rows = [];
    let innerRows = [];
    const fiveRows = [...Array(5).keys()].reverse();
    fiveRows.forEach(index => {
      for (var i = 0; i < index+1; i++) {
        innerRows.push(<StarBorderIcon sx={{ fontSize: 16 }}/>)
      }
      rows.push(<MenuItem key={index + 1} value={index + 1}>{innerRows}</MenuItem>)
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
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{ backgroundColor: "#5E747F" }}
        >
          <Typography variant="button" color="white">
            Search
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form id="serchMovies" onSubmit={handleSubmit(modSearchObject)}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={2}
              marginTop={0.5}
            >
              <Grid item xs={12} md={12} lg={12}>
                <TextField id="outlined-basic" label="Free text" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <TextField id="outlined-basic" label="Year" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <TextField
                  value={selection}
                  onChange={(e) => setSelection(e.target.value)}
                  select
                  label="Rating"
                  fullWidth
                >
                  {GetStarOptions()}
                </TextField>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <TextField
                  value={selection}
                  onChange={(e) => setSelection(e.target.value)}
                  select
                  label="Age Limit"
                  fullWidth
                >
                  {[...Array(19).keys()].map(age => <MenuItem key={`age${age}`} value={age}>{age}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                {!isFetchingGenres && genres && (
                  <TextField
                    value={selection}
                    onChange={(e) => setSelection(e.target.value)}
                    select
                    label="Genre"
                    fullWidth
                  >
                    {genres.map(genre => <MenuItem key={`genre${genre.name}`} value={genre.name}>{genre.name}</MenuItem>)}
                  </TextField>
                )}
              </Grid>
            </Grid>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  )
};

export default SearchAccordion;
