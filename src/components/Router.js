import React, {useContext, useState} from 'react';
import { Redirect } from 'react-router'
import ExplorePage from './ExplorePage';
import About from './About';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MyItems from './MyItems';
import LandingPage from './LandingPage';
import Single from "./Single";
import Header from "./Header";
import Error from "./Error";

const MyRouter = ({accessToken}) => {
  const [loggedIn, setLoggedIn] = useState(accessToken !== '');
  const routeToLogin = !loggedIn;

  return (
    <Router>
      <div>
        {loggedIn? <Header setLoggedOut={() => setLoggedIn(false)}/> : <></>}
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
