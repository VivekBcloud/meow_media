import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import MyLayout from "../components/myLayout";
import { useRouter } from "next/router";

function MyApp({
    Component,
    pageProps,
}: AppProps<{ initialSession: Session }>) {
    const [supabaseClient] = useState(() => createBrowserSupabaseClient());
    const router = useRouter();
    useEffect(() => {
        const { data: authListener } = supabaseClient.auth.onAuthStateChange(
            (event, session) => {
                if (event == "SIGNED_IN") router.push("/");
                if (event == "SIGNED_OUT") router.push("/signin");
            }
        );

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, [supabaseClient.auth, router]);
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
