import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import {Route} from 'react-router-dom';
import AuthPage from 'pages/AuthPage';
// pages
import DashboardPage from 'pages/DashboardPage';
import EventsPage from 'pages/EventsPage';
import BooksPage from 'pages/BooksPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import './styles/reduction.scss';
import Callback from './Callback';

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            {/* <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            /> */}
            <Route 
              exact 
              path="/callback"
              component={Callback}
            />
            <LayoutRoute
              exact
              path="/"
              layout={MainLayout}
              component={DashboardPage}
            />
            <LayoutRoute
              exact
              path="/events"
              layout={MainLayout}
              component={EventsPage}
            />
            <LayoutRoute
              exact
              path="/books"
              layout={MainLayout}
              component={BooksPage}
            />
            <LayoutRoute
              exact
              path="/register"
              layout={MainLayout}
              component={AuthPage}
            />
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
