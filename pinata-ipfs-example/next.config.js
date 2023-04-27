/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET
  }
}

module.exports = nextConfig
