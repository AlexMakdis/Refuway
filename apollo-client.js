import {
  ApolloLink,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split } from "@apollo/client";
  import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

// const tokenFromLocalStorage = localStorage.getItem('token')
// const token = tokenFromLocalStorage;
const token = "test"
// create the http link for the API
const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000'
      : 'https://sockdata.herokuapp.com/',
});

// const wsLink = new WebSocketLink({
//   // uri: `wss://sockdata.herokuapp.com/graphql`,
//   uri: `wss://localhost:4000`,
//   options: {
//     reconnect: true,
//     connectionParams: {
//       authToken: token ? `Bearer ${token}` : '',
//     },
//   },
// });


// create the authentication header
const authLink = new ApolloLink((operation, forward) => {
  // get the authentication token from local storage if it exists
  
  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  // wsLink,
  authLink.concat(httpLink),
);

// init apolloclient
const client = new ApolloClient({
  // link: splitLink,
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

export default client;