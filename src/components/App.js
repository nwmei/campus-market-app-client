import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import HomeGrid from '../components/HomeGrid';
import Header from './Header';
import About from './About';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MyItems from './MyItems';
import SessionContextProvider from './SessionContext';

const App = () => {
  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      <SessionContextProvider>
        <Router>
          <div>
            <Header />
            <Switch>
              <Route component={HomeGrid} exact path="/" />
              <Route component={MyItems} path="/single" />
              <Route component={About} path="/about" />
            </Switch>
          </div>
        </Router>
      </SessionContextProvider>
    </ApolloProvider>
  )
}

export default App;
