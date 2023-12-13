require('dotenv').config()

module.exports = {
  reactStrictMode: true,
  transpilePackages: ['@repo/ui', '@repo/plugin'],
  swcMinify: true,
  images: {
    domains: ['localhost', process.env.NEXT_PUBLIC_PAYLOAD_URL],
  },
}
