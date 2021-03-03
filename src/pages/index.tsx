/* Core */
import { NextPage } from 'next';

/* Instruments */
import * as gql from '@/graphql';
import { withApollo } from '@/lib';

const IndexPage: NextPage = () => {
    const userQuery = gql.useUserQuery({ variables: { id: '123' } });
    const userData = JSON.stringify(userQuery.data?.user, null, 4);

    return (
        <>
            <h1>Order Form Prototype</h1>
            <pre>{userData}</pre>
        </>
    );
};

export default withApollo(IndexPage);
