import { useQuery, useQueryClient } from '@tanstack/react-query';

import CreatePost from '../../components/post/createPost';
import Post from '../../components/post/postCard';
import ProfileCard from '../../components/profileCard';
import { fetchLikes, fetchUser, fetchAllUser, usePosts } from '../../hooks';
import PostSkeleton from '../../components/post/postSkeleton';
import { useUser } from '@supabase/auth-helpers-react';
import MyLayout from '../../components/layout/myLayout';
import { useCallback } from 'react';
import Activites from '../../components/activities';

const Home = () => {
  const user = useUser();
  const user_id = user?.id;

  const { data: posts, isLoading: postIsLoading } = usePosts();
  const queryclient = useQueryClient();

  const { data: likes } = useQuery(['likes'], () => fetchLikes());
  const { data: profile, isLoading: isProfileLoading } = useQuery(
    ['profile'],
    () => fetchUser(user_id as string),
    {
      enabled: !!user_id,
    }
  );

  const prefetchAllProfiles = useCallback(async () => {
    await queryclient.prefetchQuery({
      queryKey: ['all_profile'],
      queryFn: fetchAllUser,
    });
  }, [queryclient]);
  prefetchAllProfiles();

  return (
    <MyLayout>
      <div className="h-full w-full  ">
        <div className="grid grid-cols-4 gap-5  mx-auto max-w-screen-xl p-2">
          <div className="relative">
            <div className="col-span-1 bg-pc rounded-lg sticky top-[4.5rem] ">
              {isProfileLoading
                ? 'loading'
                : profile && <ProfileCard {...profile} />}
            </div>
          </div>
          <div className="col-span-2 rounded-lg">
            {profile && <CreatePost {...profile} />}
            {postIsLoading
              ? Array(3)
                  .fill('0')
                  .map((el, idx) => <PostSkeleton key={el + idx} />)
              : Array.isArray(posts) &&
                posts.length > 0 &&
                posts.map((post) => (
                  <Post
                    post={post}
                    key={post.id}
                    likedBy={
                      Array.isArray(likes)
                        ? likes
                            .map((like) => (like.post_id === post.id ? 1 : 0))
                            .reduce((acc: number, curr) => acc + curr, 0)
                        : 0
                    }
                    isLiked={
                      Array.isArray(likes) &&
                      likes.some(
                        (like) =>
                          like.post_id === post.id && like.user_id === user_id
                      )
                    }
                  />
                ))}
          </div>
          <div className="relative w-full ">
            <div className=" col-span-1 w-full flex flex-col gap-3 text-gray-300 sticky top-[4.5rem] ">
              <div className="bg-pc rounded-lg">
                <Activites />
              </div>
              <div className="bg-pc rounded-lg p-2 px-3 font-light">
                Friends online
              </div>
            </div>
          </div>
        </div>
      </div>
    </MyLayout>
  );
};

export default Home;
