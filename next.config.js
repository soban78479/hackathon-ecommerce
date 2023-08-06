/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental :{
        appDir: true,
        serverComponentsExternalPackages:['@prisma/client','bcrypt']
    },
    async rewrites() {
        return [
          {
            source: '/uploads/:path*',
            destination: '/public/uploads/:path*',
          },
        ];
      },
}

module.exports = nextConfig
