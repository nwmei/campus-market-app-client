import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import ExplorePage from './ExplorePage';
import About from './About';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MyItems from './MyItems';
import LandingPage from './LandingPage';
import SessionContextProvider from './SessionContext';

const App = () => {
  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
  });

  const accessToken = localStorage.getItem('accessToken');

  return (
    <ApolloProvider client={client}>
      <SessionContextProvider>
        <Router>
          <div>
            <Switch>
              <Route component={() => <ExplorePage />} exact path="/explore" />
              <Route component={() => <LandingPage />} exact path="/login" />
              <Route component={() => <MyItems />} path="/myItems" />
              <Route component={() => <About />} path="/about" />
            </Switch>
          </div>
        </Router>
      </SessionContextProvider>
    </ApolloProvider>
  )
}

export default App;
