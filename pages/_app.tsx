import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import {
    QueryClient,
    QueryClientProvider,
    Hydrate,
    DehydratedState,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import MyLayout from '../components/layout/myLayout';
import { useRouter } from 'next/router';

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
            (event) => {
                if (event == 'SIGNED_IN') router.push('/home');
                if (event == 'SIGNED_OUT') router.push('/');
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
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        Component.setLayout ? (
                            <Component {...pageProps} />
                        ) : (
                            <MyLayout>
                                <Component {...pageProps} />
                            </MyLayout>
                        )
                    }
                </Hydrate>
                <ReactQueryDevtools initialIsOpen={true} />
            </QueryClientProvider>
        </SessionContextProvider>
    );
}

export default MyApp;
