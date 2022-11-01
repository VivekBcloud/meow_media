import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import type { NextPage } from "next";

import { useState } from "react";

const Home: NextPage = () => {
    const supabaseClient = useSupabaseClient();
    const user = useUser();
    const [data, setData] = useState();

    return <div>home</div>;
};

export default Home;
export const getServerSideProps = withPageAuth({ redirectTo: "/signin" });
