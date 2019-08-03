import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import thunk from 'redux-thunk';
import notifyReducer from './store/reducers/notify';
import favBooksReducer from './store/reducers/favBooks';
import bookSearchReducer from './store/reducers/bookSearch';

const rootReducer = combineReducers({
  notify: notifyReducer,
  favBooks: favBooksReducer,
  bookSearch: bookSearchReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)

ReactDOM.render(
  //provider for redux
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>,

  document.getElementById('root'));
  
