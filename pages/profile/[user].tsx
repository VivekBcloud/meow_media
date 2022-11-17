import Image from 'next/image';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { fetchPostsByUserId, fetchUserDetailsByUsername } from '../../hooks';
import UserPost from '../../components/post/mypost';

const UserProfile = () => {
    const router = useRouter();
    const { user: username } = router.query;
    const {
        data: profile,
        isError,
        isLoading,
    } = useQuery(
        ['profile', username],
        () => fetchUserDetailsByUsername(username as string),
        {
            enabled: !!username,
        }
    );
    const userId = profile?.id;
    const { data: posts, isLoading: postIsLoading } = useQuery(
        ['posts', userId],
        () => fetchPostsByUserId(username as string),
        {
            enabled: !!userId,
        }
    );
    console.log({ posts });

    if (isError) return router.push('/404');
    if (isLoading) return 'loading';
    return (
        <div className="h-full w-full ">
            <div className="grid grid-cols-4 gap-5 h-full mx-auto max-w-screen-xl p-2 text-orange-500 text-lg ">
                <div className="col-span-1 p-1 text-gray-300 font-light">
                    <div className="px-1">friends</div>
                    <div className="w-full rounded-lg  bg-sc p-2">
                        your friend
                    </div>
                </div>
                <div className="col-span-1 bg-pc rounded-lg">
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
                        <Image
                            src={profile?.avatar_url || '/profile_2.svg'}
                            layout="fill"
                            objectFit="cover"
                            objectPosition={'50% '}
                            alt="profile pic"
                        />
                    </div>
                </div>
                <div className="col-span-2 flex flex-col gap-2 rounded-lg bg-pc p-4 ">
                    <div className="flex">
                        <div className="text-6xl">{profile?.username}</div>
                    </div>
                    <div className="flex gap-2">
                        <div>Total posts: {posts?.length}</div>
                    </div>
                    <div className=" h-full text-gray-300">{profile?.bio}</div>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-5 h-full mx-auto max-w-screen-xl p-2 text-orange-500 text-lg ">
                <div className="col-span-1"></div>
                <div className="col-span-2">
                    {postIsLoading && 'loading'}
                    {Array.isArray(posts) &&
                        posts.length > 0 &&
                        posts.map((post) => (
                            <UserPost post={post} key={post.id} />
                        ))}
                </div>
                <div className="col-span-1"></div>
            </div>
        </div>
    );
};

export default UserProfile;
