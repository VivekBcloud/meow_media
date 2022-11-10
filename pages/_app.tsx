import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import {
    QueryClient,
    QueryClientProvider,
    Hydrate,
    DehydratedState,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import MyLayout from "../components/layout/myLayout";
import { useRouter } from "next/router";

function MyApp({
    Component,
    pageProps,
}: AppProps<{ initialSession: Session; dehydratedState: DehydratedState }>) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                    },
                },
            })
    );
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

    return (
        <SessionContextProvider
            supabaseClient={supabaseClient}
            initialSession={pageProps.initialSession}
        >
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    {
                        // @ts-ignore
                        Component.authPage ? (
                            <Component {...pageProps} />
                        ) : (
                            <MyLayout>
                                <Component {...pageProps} />
                            </MyLayout>
                        )
                    }
                </Hydrate>
            </QueryClientProvider>
        </SessionContextProvider>
    );
}

export default MyApp;
