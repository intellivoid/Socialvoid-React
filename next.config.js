/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    if (typeof config.resolve.fallback !== "undefined") {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
};
