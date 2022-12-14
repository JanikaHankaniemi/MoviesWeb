/* eslint-disable react/jsx-props-no-spreading */
import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { styled } from '@mui/system';
import NavigationBar from '../components/common/NavigationBar'
import LoadingContainer from '../components/common/LoadingContainer';
import DialogError from '../components/common/DialogError';
import ScrollToTop from '../app/ScrollToTop'
const AsyncFindMovies = lazy(() => import('../components/movies/FindMoviesContainer'));
const AsyncAddMovie = lazy(() => import('../components/movies/AddMovieContainer'));
const navLinks = [{ title: "Search movies", path: "/movies" }, { title: "Add movie", path: "/addMovie" }];

const FullHeightDiv = styled('div')({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const ScrollDiv = styled('div')({
  overflowY: 'auto',
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  '& > div:nth-of-type(2)': {
    flexGrow: 1,
  },
});

const RouteList = () => {
  return (
    <BrowserRouter>
      <FullHeightDiv role="main">
        <DialogError />
        <NavigationBar links={navLinks} />
        <ScrollDiv>
        <ScrollToTop />
        <Suspense fallback={<LoadingContainer />}>
          <Routes>
            <Route path="/" element={<AsyncFindMovies />} />
            <Route path="/movies" element={<AsyncFindMovies />} />
            <Route path="/addMovie" element={<AsyncAddMovie />} />
          </Routes>
        </Suspense>
        </ScrollDiv >
      </FullHeightDiv>
    </BrowserRouter>
  );
}

export default RouteList;