import { useQuery, useQueryClient } from '@tanstack/react-query';

import CreatePost from '../../components/post/createPost';
import Post from '../../components/post/postCard';
import ProfileCard from '../../components/profileCard';
import { fetchLikes, fetchUser, fetchAllUser, usePosts } from '../../hooks';
import PostSkeleton from '../../components/post/postSkeleton';
import { useUser } from '@supabase/auth-helpers-react';
import MyLayout from '../../components/layout/myLayout';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import Activites from '../../components/activities';

const Home = () => {
    const user = useUser();
    const user_id = user?.id;
    const router = useRouter();
    useEffect(() => {
        if (!user) router.push('/');
    }, [router, user]);
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
        console.log('called');
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
                                  .map((el, idx) => (
                                      <PostSkeleton key={el + idx} />
                                  ))
                            : Array.isArray(posts) &&
                              posts.length > 0 &&
                              posts.map((post) => (
                                  <Post
                                      post={post}
                                      key={post.id}
                                      likedBy={
                                          Array.isArray(likes)
                                              ? likes
                                                    .map((like) =>
                                                        like.post_id === post.id
                                                            ? 1
                                                            : 0
                                                    )
                                                    .reduce(
                                                        (acc: number, curr) =>
                                                            acc + curr,
                                                        0
                                                    )
                                              : 0
                                      }
                                      isLiked={
                                          Array.isArray(likes) &&
                                          likes.some(
                                              (like) =>
                                                  like.post_id === post.id &&
                                                  like.user_id === user_id
                                          )
                                      }
                                  />
                              ))}
                    </div>
                    <div className="relative w-full ">
                        <div className=" col-span-1 w-full bg-pc rounded-lg text-gray-300 sticky top-[4.5rem] ">
                            <Activites />
                        </div>
                    </div>
                </div>
            </div>
        </MyLayout>
    );
};

export default Home;
