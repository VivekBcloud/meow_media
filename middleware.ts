import { withMiddlewareAuth } from "@supabase/auth-helpers-nextjs";

export const middleware = withMiddlewareAuth({ redirectTo: "/auth" });

export const config = {
    matcher: ["/user/:path*"],
};
