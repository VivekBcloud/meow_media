import { useQuery, useQueryClient } from '@tanstack/react-query';

import CreatePost from '../../components/post/createPost';
import Post from '../../components/post/postCard';
import ProfileCard from '../../components/profileCard';
import { fetchPosts, fetchLikes, fetchUser, fetchAllUser } from '../../hooks';
import PostLoading from '../../components/post/postLoading';
import { useUser } from '@supabase/auth-helpers-react';
import MyLayout from '../../components/layout/myLayout';

const Home = () => {
    const user = useUser();
    const user_id = user?.id;
    const { data: posts, isLoading: postIsLoading } = useQuery(['posts'], () =>
        fetchPosts()
    );
    const queryclient = useQueryClient();

    queryclient.prefetchQuery({
        queryKey: ['all_profile'],
        queryFn: fetchAllUser,
    });
    const { data: likes } = useQuery(['likes'], () => fetchLikes());
    const { data: profile } = useQuery(['profile', user_id], () =>
        fetchUser(user_id as string)
    );

    return (
        <MyLayout>
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
                                                like.post_id === post.id &&
                                                like.user_id === post.user_id
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
        </MyLayout>
    );
};

export default Home;
