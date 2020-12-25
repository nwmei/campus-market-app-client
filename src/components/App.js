import React, {useState} from 'react';
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

const App = () => {
  const [userDetails, setUserDetails] = useState({});
  const [sessionQueryResponded, setSessionQueryResponded] = useState(false);

  const accessToken = localStorage.getItem('accessToken') || "";

  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
  });

  if (!userDetails.sessionUserDetails && !sessionQueryResponded) {
    client.query({query: SessionUserDetails, variables: {input: {accessToken}}})
      .then((result) => {
        if (result.data.sessionUserDetails) {
          setUserDetails(result.data);
        }
        setSessionQueryResponded(true);
      });
  } else {
    if (!setSessionQueryResponded) {
      setSessionQueryResponded(true)
    }
  }

  const routeToLogin = !userDetails.sessionUserDetails;
  const showHeader = window.location.pathname !== '/login' && !!userDetails.sessionUserDetails;

  if (!sessionQueryResponded) {
    return <></>
  } else {
    return (
      <ApolloProvider client={client}>
        <SessionContextProvider userDetails={userDetails}>
          <Router>
            <div>
              {showHeader? <Header clearUserDetails={() => setUserDetails({})}/> : <></>}
              <Switch>
                <Route
                  component={
                    routeToLogin? () => <Redirect to="/login" /> : () => <Redirect to="/explore"/>}
                  exact path="/"
                />
                <Route
                  component={
                    routeToLogin? () => <Redirect to="/login" />
                    : () => <ExplorePage accessToken={accessToken} />}
                  exact path="/explore"
                />
                <Route component={routeToLogin? () => <Redirect to="/login" /> : Single}
                  path="/item/:itemId" />
                <Route
                  component={() => <LandingPage setSessionQueryResponded={setSessionQueryResponded} />}
                  exact path="/login"
                />
                <Route
                  component={
                    routeToLogin? () => <Redirect to="/login" />
                    : () => <MyItems accessToken={accessToken} />}
                  path="/myItems"
                />
                <Route
                  component={
                    routeToLogin? () => <Redirect to="/login" />
                    : () => <About accessToken={accessToken} />}
                  path="/about"
                />
                <Route
                  component={
                    routeToLogin? () => <Redirect to="/login" />
                      : () => <p>invalid url</p>}
                  path="/"
                />
              </Switch>
            </div>
          </Router>
        </SessionContextProvider>
      </ApolloProvider>
    )
  }



}

export default App;
