/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            "cshhlpsxxvoyacgyjyqd.supabase.co",
            "avatars.githubusercontent.com",
        ],
        // remotePatterns: [
        //     {
        //         protocol: "https",
        //         hostname: [
        //             "cshhlpsxxvoyacgyjyqd.supabase.co",
        //             "avatars.githubusercontent.com",
        //         ],
        //         // port: "",
        //         pathname: "/**",
        //     },
        // ],
    },
};

module.exports = nextConfig;
