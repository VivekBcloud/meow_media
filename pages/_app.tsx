import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import MyLayout from "../components/myLayout";

function MyApp({
    Component,
    pageProps,
}: AppProps<{ initialSession: Session }>) {
    const [supabaseClient] = useState(() => createBrowserSupabaseClient());
    // @ts-ignore
    if (Component.authPage)
        return (
            <SessionContextProvider
                supabaseClient={supabaseClient}
                initialSession={pageProps.initialSession}
            >
                <Component {...pageProps} />
            </SessionContextProvider>
        );

    return (
        <SessionContextProvider
            supabaseClient={supabaseClient}
            initialSession={pageProps.initialSession}
        >
            <MyLayout>
                <Component {...pageProps} />
            </MyLayout>
        </SessionContextProvider>
    );
}

export default MyApp;
