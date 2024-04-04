import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';

import { httpService } from './api/axiosClient';
import { store, persistor } from './store';
import App from './App';

httpService.setupInterceptors(store);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        {/* <React.StrictMode> */}
        <App />
        {/* </React.StrictMode> */}
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);
