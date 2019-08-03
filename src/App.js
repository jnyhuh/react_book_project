import GAListener from 'components/GAListener';
import { LayoutRoute, MainLayout } from 'components/Layout';
// pages
import DashboardPage from 'pages/DashboardPage';
import EventsPage from 'pages/EventsPage';
import BooksPage from 'pages/BooksPage';
import FavBooksPage from 'pages/FavBooksPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Switch, Route, withRouter } from 'react-router-dom';
import './styles/reduction.scss';
import Callback from './Callback';
import auth0Client from './Auth';

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  async componentDidMount() {
    if (this.props.location.pathname === '/callback') return;
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
  }

  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
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
              path="/calendar"
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
              path="/mybooks"
              layout={MainLayout}
              component={FavBooksPage}
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

export default componentQueries(query)(withRouter(App));
//export default withRouter(App);

