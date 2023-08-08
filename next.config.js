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
      typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
}

module.exports = nextConfig
