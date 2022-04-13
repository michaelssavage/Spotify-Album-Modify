/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      "blend-playlist-covers.spotifycdn.com",
      "newjams-images.scdn.co",
      "mosaic.scdn.co",
      "i.scdn.co",
    ],
  },
};
