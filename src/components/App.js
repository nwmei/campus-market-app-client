import React, {useEffect, useState} from 'react';
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
import MyRouter from './Router';
import set from "@babel/runtime/helpers/esm/set";

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
  const [userDetails, setUserDetails] = useState(null);

  const accessToken = localStorage.getItem('accessToken') || '';

  const apolloClientUri = process.env.NODE_ENV==='development'
    ? 'http://localhost:4000/graphql'
    : 'https://736xv5hs64.execute-api.us-east-1.amazonaws.com/prod/gql';

  const client = new ApolloClient({
    uri: apolloClientUri,
    cache: new InMemoryCache(),
    fetchOptions: {
      mode: 'no-cors',
    },
  });

  console.log(userDetails)

  if (!userDetails) {
    client.query({query: SessionUserDetails, variables: {input: {accessToken}}})
      .then((result) => {
        if (result.data.sessionUserDetails) {
          setUserDetails(result.data);
        } else {
          setUserDetails(false)
        }
      }).catch(e => console.log("error with sessionQuery: ", e));
  }

  const routeToLogin = userDetails === false;
  const showHeader = window.location.pathname !== '/login' && !!userDetails;

  if (userDetails === null) {
    return <></>
  } else {
    return (
      <ApolloProvider client={client}>
        <SessionContextProvider userDetails={userDetails}>
          <ThemeProvider theme={theme}>
            <MyRouter accessToken={accessToken}/>
          </ThemeProvider>
        </SessionContextProvider>
      </ApolloProvider>
    )
  }
};

export default App;
