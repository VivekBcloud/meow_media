import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";

import CreatePost from "../components/post/createPost";
import Post from "../components/post/post";
import ProfileCard from "../components/profileCard";
import { GetServerSidePropsContext } from "next";
import { fetchPosts, fetchLikes, fetchUser } from "../hooks";
import PostLoading from "../components/post/postLoading";

const Home = ({ user_id }: { user_id: string }) => {
  const { data: posts, isLoading: postIsLoading } = useQuery(["posts"], () =>
    fetchPosts()
  );
  const { data: likes } = useQuery(["likes"], () => fetchLikes());
  const { data: profile } = useQuery(["profile", user_id], () =>
    fetchUser(user_id)
  );

  return (
    <div className="h-full w-full ">
      <div className="grid grid-cols-4 gap-5  mx-auto max-w-screen-xl p-2">
        <div className="col-span-1 bg-pc rounded-lg">
          {profile && <ProfileCard {...profile} />}
        </div>
        <div className="col-span-2 rounded-lg">
          {profile && <CreatePost {...profile} />}
          {postIsLoading ? (
            <PostLoading />
          ) : (
            Array.isArray(posts) &&
            posts.length > 0 &&
            posts.map((post) => (
              <Post
                post={post}
                key={post.id}
                isLiked={
                  Array.isArray(likes) &&
                  likes.some(
                    (like) =>
                      like.post_id === post.id && like.user_id === post.user_id
                  )
                }
              />
            ))
          )}
        </div>
        <div className=" col-span-1 bg-pc rounded-lg text-gray-300">
          Friends
        </div>
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

  const { id } = session.user;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["posts"], () => fetchPosts());
  await queryClient.prefetchQuery(["likes"], () => fetchLikes());
  await queryClient.prefetchQuery(["profile", id], () => fetchUser(id));

  return {
    props: {
      user_id: id,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
