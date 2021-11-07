import React from 'react';
import { ApolloProvider, ApolloClient, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AUTH_TOKEN } from '../constants.jsx';
import { cache } from '../cache.jsx';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token || ""
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
});


const Provider = ({ children }) => 
  <ApolloProvider client={client}>{children}</ApolloProvider>;

export default Provider;