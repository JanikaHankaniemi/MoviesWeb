import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import Routes from './app/Routes';
import store from './app/Store';
import theme from './theme/Theme';
import AddMovieContainer from './components/movies/AddMovieContainer';

const App = () => (
        <AddMovieContainer/>
)

export default App

  //< React.StrictMode >
  //<Provider store={store}>
  //  <ThemeProvider theme={theme}>
  //    <AddMovieContainer />
  //  </ThemeProvider>
  //</Provider>
  //</React.StrictMode >