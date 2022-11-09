import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

import CreatePost from "../components/post/createPost";
import Post from "../components/post";
import { likeType, postType, Profile } from "../types/all";
import ProfileCard from "../components/profileCard";
import { GetServerSidePropsContext } from "next";

const Home = ({
    posts,
    likes,
    profile,
}: {
    posts: postType[];
    likes: likeType[];
    profile: Profile;
}) => {
    console.log({ posts, likes, profile });

    return (
        <div className="h-full w-full ">
            <div className="grid grid-cols-4 gap-5 h-full mx-auto max-w-screen-xl p-2">
                <div className="col-span-1 bg-pc rounded-lg">
                    <ProfileCard {...profile} />
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
    const fetchAllPosts = await supabase
        .from("Post")
        .select("*, user_id (username,avatar_url)")
        .order("created_at", { ascending: false });
    // console.log({ user_id });
    const fetchLikes = await supabase.from("Like").select("*");

    const fetchProfile = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();
    const [{ data: postData }, { data: likeData }, { data: profileData }] =
        await Promise.all([fetchAllPosts, fetchLikes, fetchProfile]);
    // const res = await fetcher("/post", {}, "GET");
    // console.log({ res });

    return {
        props: { posts: postData, likes: likeData, profile: profileData },
    };
};
