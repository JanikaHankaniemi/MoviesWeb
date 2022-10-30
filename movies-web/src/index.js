import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import RouteList from './app/Routes';
import store from './app/Store';
import { setupInterceptors } from './api/AxiosSetup';

setupInterceptors(store);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouteList />
    </Provider>
  </React.StrictMode>
);