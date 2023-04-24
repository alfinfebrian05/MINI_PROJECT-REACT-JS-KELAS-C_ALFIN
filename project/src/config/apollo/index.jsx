/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
import * as client from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'wss://modest-dog-55.hasura.app/v1/graphql',
    connectionParams: {
      headers: {
        'x-hasura-admin-secret':
          'OoWhqvdrdDnVGQDvvi7G1ummRjlqgG04A8anFEcEF4WbY6YsNK7QYRuvW6PLheWP',
      },
    },
  })
);

const httpLink = new client.HttpLink({
  uri: 'https://modest-dog-55.hasura.app/v1/graphql',
  headers: {
    'x-hasura-admin-secret':
      'OoWhqvdrdDnVGQDvvi7G1ummRjlqgG04A8anFEcEF4WbY6YsNK7QYRuvW6PLheWP',
  },
});

const splitLink = client.split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const clientApollo = new client.ApolloClient({
  link: splitLink,
  cache: new client.InMemoryCache(),
});

export default clientApollo;
