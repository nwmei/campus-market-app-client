import React, {useState} from 'react';
import { useQuery} from "@apollo/client";
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
  const [loggedIn, setLoggedIn] = useState(false);

  const accessToken = localStorage.getItem('accessToken');

  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
  });

  if (!userDetails.sessionUserDetails) {
    client.query({query: SessionUserDetails, variables: {input: {accessToken}}})
      .then((result) => {
        if (result.data.sessionUserDetails !== null) {
          setUserDetails(result.data);
        }
      });
  }

  return (
    <ApolloProvider client={client}>
      <SessionContextProvider userDetails={userDetails}>
        <Router>
          <div>
            {userDetails.sessionUserDetails? <Header clearUserDetails={() => setUserDetails({})}/> : <></>}
            <Switch>
              <Route
                component={() => <Redirect to = "/login" />}
                exact path="/"
              />
              <Route
                component={() => <ExplorePage accessToken={accessToken} />}
                exact path="/explore"
              />
              <Route component={Single} path="/item/:itemId" />
              <Route
                component={() => <LandingPage setLoggedIn={setLoggedIn} />}
                exact path="/login"
              />
              <Route
                component={() => <MyItems accessToken={accessToken} />}
                path="/myItems"
              />
              <Route
                component={() => <About accessToken={accessToken} />}
                path="/about"
              />
            </Switch>
          </div>
        </Router>
      </SessionContextProvider>
    </ApolloProvider>
  )
}

export default App;
