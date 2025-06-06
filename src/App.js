/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  createStore,
  applyMiddleware,
  // eslint-disable-next-line no-unused-vars
  compose,
} from 'redux';
import { BrowserRouter } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';

// const sagaMiddleware = createSagaMiddleware();
// const store = createStore(reducer, applyMiddleware(sagaMiddleware));
const App = () => (
  <Provider>
    <LanguageReducer>
      <BrowserRouter>
        <div>
          page
        </div>
      </BrowserRouter>
    </LanguageReducer>
  </Provider>
);
export default App;
