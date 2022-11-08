import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import {
    createServerSupabaseClient,
    withPageAuth,
} from "@supabase/auth-helpers-nextjs";

import { useState } from "react";
import CreatePost from "../components/post/createPost";
import Post from "../components/post";
import { likeType, postType } from "../types/all";
import ProfileCard from "../components/profileCard";
import { GetServerSidePropsContext } from "next";

const Home = ({ posts, likes }: { posts: postType[]; likes: likeType[] }) => {
    const user = useUser();
    const [data, setData] = useState();
    console.log({ posts, likes });

    return (
        <div className="h-full w-[calc(100%-10px)] ">
            <div className="grid grid-cols-4 gap-5 h-full mx-auto max-w-screen-xl p-2">
                <div className="col-span-1 bg-pc rounded-lg">
                    <ProfileCard />
                </div>
                <div className="  col-span-2  rounded-lg">
                    <CreatePost />
                    {Array.isArray(posts) &&
                        posts.length > 0 &&
                        posts.map((post) => (
                            <Post
                                post={post}
                                key={post.id}
                                isLiked={likes.some(
                                    (like) =>
                                        like.post_id === post.id &&
                                        like.user_id === post.user_id
                                )}
                            />
                        ))}
                </div>
                <div className=" col-span-1 bg-pc rounded-lg">activity</div>
            </div>
        </div>
    );
};

export default Home;
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient(ctx);
    // Check if we have a session
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session)
        return {
            redirect: {
                destination: "/signin",
                permanent: false,
            },
        };
    // Access the user object
    // console.log({ user: session.user });
    const email = "20vivektoppo@gmail.com";
    const { data, error } = await supabase
        .from("Post")
        .select("*, user_email (image,name)")
        .eq("user_email", email)
        .order("created_at", { ascending: false });
    const user_id = session.user.id;
    console.log({ user_id });

    const { data: likeData, error: likeError } = await supabase
        .from("Like")
        .select("*");
    if (likeError) console.log(likeError);
    // const res = await fetcher("/post", {}, "GET");
    // console.log({ res });

    return { props: { posts: data, likes: likeData } };
};
