import React, { useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Input,
  Select
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { searchMovie } from '../../redux/MoviesSlice';

function SearchAccordion() {
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
        .int()
        .nullable(),
      ageLimit: yup
        .int()
        .nullable(),
      rating: yup
        .int()
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

  return (
    <div>
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{ backgroundColor: 'lightgray' }}
        >
          <Typography variant="subtitle1">
            SEARCH
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form id="serchMovies" onSubmit={handleSubmit(modSearchObject)}>
            <Grid
              container
              rowSpacing={2}
              direction="column"
            >
              <Grid item xs={12}>
                <TextField id="outlined-basic" label="Free text" variant="outlined" />
              </Grid>
            </Grid>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  )
};

export default SearchAccordion;
