import React, {useState} from 'react';
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
import {gql} from '@apollo/client';

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 10,
      },
    },
  },
});

const App = () => {
  const [userDetails, setUserDetails] = useState({});
  const [sessionQueryResponded, setSessionQueryResponded] = useState(false);

  const accessToken = localStorage.getItem('accessToken') || "";

  const client = new ApolloClient({
    //uri: 'http://localhost:4000/graphql',
    //uri: 'https://mqjjatwyce.execute-api.us-east-1.amazonaws.com/prod',
    uri: 'https://mqjjatwyce.execute-api.us-east-1.amazonaws.com/prod/test',
    cache: new InMemoryCache(),
    fetchOptions: {
      mode: 'no-cors',
    },
  });

  client
  .query({
    query: gql`
        query {
            testQuery
        }
    `
  })
  .then(result => console.log(result));

  if (!userDetails.sessionUserDetails && !sessionQueryResponded) {
    client.query({query: SessionUserDetails, variables: {input: {accessToken}}})
      .then((result) => {
        if (result.data.sessionUserDetails) {
          setUserDetails(result.data);
        }
        setSessionQueryResponded(true);
      }).catch(e => console.log("error with sessionQuery: ", e));
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
          <ThemeProvider theme={theme}>
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
                      : () => <ExplorePage />}
                    exact path="/explore"
                  />
                  <Route component={routeToLogin? () => <Redirect to="/login" />
                      : () => <Single />}
                    path="/item/:itemId" />
                  <Route
                    component={() => <LandingPage setSessionQueryResponded={setSessionQueryResponded} />}
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
          </ThemeProvider>
        </SessionContextProvider>
      </ApolloProvider>
    )
  }
};

export default App;
