import React, {useContext, useEffect, useState} from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Redirect } from 'react-router'
import ExplorePage from './ExplorePage';
import About from './About';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MyItems from './MyItems';
import LandingPage from './LandingPage';
import SessionContextProvider from './SessionContext';
import Single from "./Single";
import Header from "./Header";
import SessionUserDetails from '../queries/SessionUserDetails.graphql';
import Error from "./Error";
import {sessionContext} from "./SessionContext";

const MyRouter = ({accessToken}) => {
  const [loggedIn, setLoggedIn] = useState(accessToken !== '');

  const {sessionContextValue} = useContext(sessionContext);
  console.log(loggedIn);

  const routeToLogin = !loggedIn;


  return (
    <Router>
      <div>
        {loggedIn? <Header clearUserDetails={() => setLoggedIn(false)}/> : <></>}
        <Switch>
          <Route
            component={
              routeToLogin? () => <Redirect to="/login" /> : () => <Redirect to="/explore"/>}
            exact path="/"
          />
          <Route
            component={
              routeToLogin? () => <Redirect to="/login" />
                : () => <ExplorePage />}
            exact path="/explore"
          />
          <Route component={routeToLogin? () => <Redirect to="/login" />
            : () => <Single />}
                 path="/item/:itemId" />
          <Route
            component={() => <LandingPage setLoggedIn={setLoggedIn} />}
            exact path="/login"
          />
          <Route
            component={
              routeToLogin? () => <Redirect to="/login" />
                : () => <MyItems />}
            path="/myItems"
          />
          <Route
            component={
              routeToLogin? () => <Redirect to="/login" />
                : () => <About />}
            path="/about"
          />
          <Route
            component={
              routeToLogin? () => <Redirect to="/login" />
                : () => <Error/>}
            path="/"
          />
        </Switch>
      </div>
    </Router>
  )
};

export default MyRouter;
