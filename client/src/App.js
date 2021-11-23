import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';


const client = new ApolloClient({
// Construct request middleware that will attach the JWT token to every request as an `authorization` header
  request: (operation) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them

    operation.setContext({
    headers: {
      // ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
});
  },
  uri: '/graphql',
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={SearchBooks} />
            <Route exact path='/saved' component={SavedBooks} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
