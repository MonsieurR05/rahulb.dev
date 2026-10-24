/** @type {import('next').NextConfig} */
const nextConfig = {
  // The old multi-page site had these routes; old links now land on the matching section.
  async redirects() {
    return [
      { source: "/projects", destination: "/#work", permanent: false },
      { source: "/about", destination: "/#about", permanent: false },
      { source: "/contact", destination: "/#contact", permanent: false },
    ];
  },
};

export default nextConfig;
