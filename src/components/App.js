import React, {useState} from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import SessionContextProvider from './SessionContext';
import SessionUserDetails from '../queries/SessionUserDetails.graphql';
import MyRouter from './Router';
import Loading from './Loading';
import Footer from './Footer'

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

  if (userDetails === null) {
    return <Loading />
  } else {
    return (
      <ApolloProvider client={client}>
        <SessionContextProvider userDetails={userDetails}>
          <ThemeProvider theme={theme}>
            <MyRouter accessToken={accessToken}/>
            <Footer />
          </ThemeProvider>
        </SessionContextProvider>
      </ApolloProvider>
    )
  }
};

export default App;
