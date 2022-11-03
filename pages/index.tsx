import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import type { InferGetServerSidePropsType, NextPage } from "next";

import { useState } from "react";
import CreatePost from "../components/createPost";

const Home: NextPage<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ posts }) => {
    const supabaseClient = useSupabaseClient();
    const user = useUser();
    const [data, setData] = useState();
    console.log({ posts });

    return (
        <div className="h-full w-full">
            <div className="grid grid-cols-4 gap-5 h-full mx-auto max-w-screen-xl p-2">
                <div className="col-span-1 bg-pc rounded-lg">profile</div>
                <div className="  col-span-2  rounded-lg">
                    <CreatePost />
                </div>
                <div className=" col-span-1 bg-pc rounded-lg">activity</div>
            </div>
        </div>
    );
};

export default Home;
export const getServerSideProps = withPageAuth({
    redirectTo: "/signin",
    async getServerSideProps(ctx, supabase) {
        // Access the user object
        const { data, error } = await supabase.from("Post").select("*");
        console.log({ data });

        if (error) {
            console.log(error);
        }
        return { props: { posts: data } };
    },
});
