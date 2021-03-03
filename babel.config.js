/* Instruments */
const { envConfig } = require('./env-config.js');

module.exports = api => {
    const env = api.env();

    api.cache.using(() => env === 'development');

    const presets = [ 'next/babel' ];
    const plugins = [
        [ 'styled-components', { ssr: true }],
        [ 'transform-define', envConfig ],
        'graphql-tag',
    ];

    return { presets, plugins };
};
