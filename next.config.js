/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cshhlpsxxvoyacgyjyqd.supabase.co",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

module.exports = nextConfig;
