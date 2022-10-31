import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import type { NextPage } from "next";

import { useState } from "react";

const Home: NextPage = () => {
    const supabaseClient = useSupabaseClient();
    const user = useUser();
    const [data, setData] = useState();

    return (
        <>
            <button onClick={() => supabaseClient.auth.signOut()}>
                Sign out
            </button>
            <p>user:</p>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
    );
};

export default Home;
export const getServerSideProps = withPageAuth({ redirectTo: "/signin" });
