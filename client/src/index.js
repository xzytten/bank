import React from 'react';
import ReactDOM from 'react-dom/client';
import MainPage from './components/MainPage/MainPage'
import { Provider } from 'react-redux';

import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <MainPage />
  </Provider>
);

