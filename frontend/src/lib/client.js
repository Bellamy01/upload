import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const client = new ApolloClient({
    uri: 'https://flyby-router-demo.herokuapp.com/',
    cache: new InMemoryCache(),
  });

client
    .query({
        query: gql`
        query GetLocations {
            locations {
            id
            name
            description
            photo
            }
        }
        `,
    })
    .then((result) => console.log(result));
