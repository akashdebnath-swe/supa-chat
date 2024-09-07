/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**", // matches any domain with https
            },
        ],
    },
};

export default nextConfig;
