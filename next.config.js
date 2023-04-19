/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    output: "standalone",
    webpack: (config) => {
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
        };
        config.externals.push({
            "utf-8-validate": "commonjs utf-8-validate",
            bufferutil: "commonjs bufferutil",
            "supports-color": "commonjs supports-color",
        });
        return config;
    },
};

module.exports = nextConfig;
