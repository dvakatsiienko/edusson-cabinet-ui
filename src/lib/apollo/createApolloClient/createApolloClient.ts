/* Core */
import { GetServerSidePropsContext } from 'next';
import * as apollo from '@apollo/client';

/* Instruments */
import * as links from './links';

const KEYSTONE_COOKIE_NAME = 'keystonejs-session';

const typeDefs = apollo.gql`
  extend type User {
    name: String
    email: String
    password: String
  }
`;

const typePolicies = {
    User: {
        fields: {
            name: {
                read(...rest) {
                    console.log('TEST', rest);

                    return 'Walter';
                },
            },
        },
    },
};

export const createApolloClient = (
    ctx?: GetServerSidePropsContext,
    initialState?: apollo.NormalizedCacheObject,
) => {
    const headers: { cookie?: string } = {};

    if (ctx?.req.cookies) {
        const cookie = ctx.req.cookies[KEYSTONE_COOKIE_NAME];

        headers.cookie = `${KEYSTONE_COOKIE_NAME}=${cookie}`;
    }

    console.log('CREATE_APOLLO_CLIENT');

    return new apollo.ApolloClient({
        typeDefs,
        ssrMode: typeof window === 'undefined',
        link:    apollo.from([
            /* 1 ↓↑ 5 */ links.loggerLink,
            /* 3 ↓↑ 3 */ links.errorLink,
            /* 4 ↓↑ 2 */ links.uploadLink({ headers }), // ? Upload link contains HTTP Link and corresponds to Networking element.
            /* server */
        ]),

        cache: new apollo.InMemoryCache({
            typePolicies,
        }).restore(initialState || {}),
    });
};
