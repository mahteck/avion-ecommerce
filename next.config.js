"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nextConfig = {
/* config options here */
};
module.exports = {
    reactStrictMode: true,
    typescript: {
        ignoreBuildErrors: false,
    },
    images: {
        remotePatterns: [
            {
                hostname: 'cdn.sanity.io',
            },
        ],
    },
};
exports.default = nextConfig;
