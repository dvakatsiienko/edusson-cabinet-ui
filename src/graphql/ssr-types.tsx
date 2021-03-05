import * as Types from './operation-types';

import * as Operations from './operation-types';
import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router';
import { QueryHookOptions, useQuery } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type React from 'react';
import { getApolloClient } from '../lib';
export async function getServerPageUser(
    options: Omit<Apollo.QueryOptions<Types.UserQueryVariables>, 'query'>,
    ctx?: any,
) {
    const apolloClient = getApolloClient(ctx);

    const data = await apolloClient.query<Types.UserQuery>({
        ...options,
        query: Operations.UserDocument,
    });

    const apolloState = apolloClient.cache.extract();

    return {
        props: {
            apolloState,
            data: data?.data,
            error: data?.error ?? data?.errors ?? null,
        },
    };
}
export const useUser = (
    optionsFunc?: (
        router: NextRouter,
    ) => QueryHookOptions<Types.UserQuery, Types.UserQueryVariables>,
) => {
    const router = useRouter();
    const options = optionsFunc ? optionsFunc(router) : {};
    return useQuery(Operations.UserDocument, options);
};
export type PageUserComp = React.FC<{
    data?: Types.UserQuery;
    error?: Apollo.ApolloError;
}>;
export const ssrUser = {
    getServerPage: getServerPageUser,

    usePage: useUser,
};
export async function getServerPageSession(
    options: Omit<Apollo.QueryOptions<Types.SessionQueryVariables>, 'query'>,
    ctx?: any,
) {
    const apolloClient = getApolloClient(ctx);

    const data = await apolloClient.query<Types.SessionQuery>({
        ...options,
        query: Operations.SessionDocument,
    });

    const apolloState = apolloClient.cache.extract();

    return {
        props: {
            apolloState,
            data: data?.data,
            error: data?.error ?? data?.errors ?? null,
        },
    };
}
export const useSession = (
    optionsFunc?: (
        router: NextRouter,
    ) => QueryHookOptions<Types.SessionQuery, Types.SessionQueryVariables>,
) => {
    const router = useRouter();
    const options = optionsFunc ? optionsFunc(router) : {};
    return useQuery(Operations.SessionDocument, options);
};
export type PageSessionComp = React.FC<{
    data?: Types.SessionQuery;
    error?: Apollo.ApolloError;
}>;
export const ssrSession = {
    getServerPage: getServerPageSession,

    usePage: useSession,
};
