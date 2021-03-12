/* Core */
import { NextPage }       from 'next';
import { ApolloProvider } from '@apollo/client';

/* Instruments */
import { createApolloClient as getApolloClient } from './createApolloClient';

// eslint-disable-next-line
export const withApollo = (Comp: NextPage) => (props: any) => {
    return (
        <ApolloProvider client = { getApolloClient(null, props.apolloState) }>
            <Comp { ...props } />
        </ApolloProvider>
    );
};
