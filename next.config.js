/** @type {import('next').NextConfig} */

// const withTM = require('next-transpile-modules')(['@babel/preset-react']);
//   '@fullcalendar/common',
//   '@fullcalendar/common',
//   '@fullcalendar/daygrid',
//   '@fullcalendar/interaction',
//   '@fullcalendar/react',

const nextConfig = {
  swcMinify: true,
  // basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  // NEXT_PUBLIC_SERVER: process.env.NEXT_PUBLIC_SERVER,
  // assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  images: {
    domains: [
      'images.unsplash.com',
      'i.ibb.co',
      'scontent.fotp8-1.fna.fbcdn.net',
    ],
    // Make ENV
    unoptimized: true,
  },
  // Can't upgrade eslint library version because of issue with nextjs
  // https://github.com/vercel/next.js/issues/64409
};

module.exports = nextConfig;
