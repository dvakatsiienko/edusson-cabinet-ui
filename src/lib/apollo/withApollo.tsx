/* Core */
import { NextPage } from 'next';
import { ApolloProvider } from '@apollo/client';

export const withApollo = (Comp: NextPage) => (props: any) => {
    return (
        <ApolloProvider client = { getApolloClient(null, props.apolloState) }>
            <Comp { ...props } />
        </ApolloProvider>
    );
};

import { createApolloClient as getApolloClient } from './createApolloClient';
export { getApolloClient };
