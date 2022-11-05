import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";

import { useState } from "react";
import CreatePost from "../components/post/createPost";
import Post from "../components/post";
import { postType } from "../types/all";
import ProfileCard from "../components/profileCard";
import fetcher from "../lib/fetcher";

const Home = ({ posts }: { posts: postType[] }) => {
    const user = useUser();
    const [data, setData] = useState();
    console.log({ posts });

    return (
        <div className="h-full w-full">
            <div className="grid grid-cols-4 gap-5 h-full mx-auto max-w-screen-xl p-2">
                <div className="col-span-1 bg-pc rounded-lg">
                    <ProfileCard />
                </div>
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
            .select("*, user_email (image,name)")
            .order("created_at", { ascending: false });
        console.log({ data });
        // const res = await fetcher("/post", {}, "GET");
        // console.log({ res });

        return { props: { posts: data } };
    },
});
