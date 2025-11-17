/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: "export",
    images: {
        loader: "akamai",
        path: ""
    },
    assetPrefix: "./",
    trailingSlash: true,
    reactStrictMode: true,
    allowedDevOrigins: []
};

module.exports = nextConfig;
