/* Core */
import { GetServerSideProps } from 'next';
import { ApolloError }        from '@apollo/client';

/* Instruments */
import * as gql       from '@/graphql';
import { withApollo } from '@/lib';

const IndexPage: PageAllProductsComp = () => {
    const userQuery = gql.useUserQuery({ variables: { id: '123' } });
    const userData = JSON.stringify(userQuery.data?.user, null, 4);

    return (
        <>
            <h1>Order Form Prototype SSR</h1>
            <pre>{userData}</pre>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    const userQuery = await gql.getServerPageUser(
        { variables: { id: '123' } },
        ctx,
    );

    return {
        props: {
            ...userQuery,
            TEST: 'TEST',
        },
    };
};

/* Types */
export type PageAllProductsComp = React.FC<{
    data?: gql.PageUserComp;
    error?: ApolloError;
    TEST: string;
}>;

export default withApollo(IndexPage);
