import { useUser } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import Post from "../../components/post/post";
import ProfileCard from "../../components/profileCard";
import { fetchPosts, fetchUser } from "../../hooks";

const Comments = () => {
  return (
    <div className="p-2 mt-2 bg-pc rounded-lg">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-impact"></div>
        <div className="w-50 h-5  bg-impact">username</div>
      </div>
      <div className="">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
        voluptatem ea consequatur in illum magnam. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Rerum voluptatem ea consequatur in illum
        magnam. voluptatem ea consequatur in illum magnam.
      </div>
    </div>
  );
};

const Posts = () => {
  const router = useRouter();
  const { post_id } = router.query;
  const user = useUser();
  const user_id = user?.id;
  const { data: posts, isLoading: postIsLoading } = useQuery(["posts"], () =>
    fetchPosts()
  );

  const { data: profile } = useQuery(
    ["profile", user_id],
    () => fetchUser(user_id as string),
    {
      enabled: !user_id,
    }
  );
  const currPost = posts?.filter((post) => post.id === post_id)[0];

  return (
    <div className="h-full w-full ">
      <div className="grid grid-cols-4 gap-5  mx-auto max-w-screen-xl p-2">
        {profile && <ProfileCard {...profile} />}
        <section className="col-start-2 col-span-2 max-h-[calc(100vh-5rem)] overflow-y-scroll">
          {currPost && <Post post={currPost} isLiked />}
          <div className="p-2">
            <label htmlFor="comment">
              Add comment
              <input
                id="comment"
                type="text"
                className="w-full p-1 rounded bg-pc text-gray-300 border "
              />
            </label>
            {Array(10)
              .fill(0)
              .map((it) => (
                <Comments key={"as"} />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Posts;
