import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { AUTH_TOKEN } from '../lib/constants';

// HTTP Link
const httpLink = createHttpLink({
    uri: 'https://upload-api-three.vercel.app/',
});

// Authorization Link
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',  
            'client-name': 'Upload [Web]',
            'client-version': '1.0.0',
        }
    }
})

// Web Socket Link
const wsLink = new WebSocketLink({
    uri: `ws://upload-api-three.vercel.app/graphql`,
    options: {
        reconnect: true,
        connectionParams: {
            authToken: localStorage.getItem(AUTH_TOKEN)
        }
    }
})

const link = split(
    ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
        return (
            kind === 'OperationDefinition' &&
            operation === 'subscription'
        );
    },
    wsLink,
    authLink.concat(httpLink)
);

export const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});
