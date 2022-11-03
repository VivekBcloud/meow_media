import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import type { InferGetServerSidePropsType, NextPage } from "next";

import { useState } from "react";
import CreatePost from "../components/createPost";
import Post from "../components/post";
import { postType } from "../types/all";

const Home = ({ posts }: { posts: postType[] }) => {
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
                    {Array.isArray(posts) &&
                        posts.length > 0 &&
                        posts.map((post) => <Post post={post} key={post.id} />)}
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
        const { data, error } = await supabase
            .from("Post")
            .select("*, user_email (image,name)");
        console.log({ data });

        if (error) {
            console.log(error);
        }
        return { props: { posts: data } };
    },
});
