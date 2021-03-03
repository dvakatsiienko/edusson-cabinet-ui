/* Core */
import { createUploadLink, UploadLinkOptions } from 'apollo-upload-client';

export const uploadLink = (options: UploadLinkOptions) => {
    const uri = __DEV__
        ? process.env.NEXT_PUBLIC_DEV_GQL_URL
        : process.env.NEXT_PUBLIC_PROD_GQL_URL;

    return createUploadLink({
        uri,
        credentials: 'include',
        headers:     options.headers,
        fetch,
    });
};
