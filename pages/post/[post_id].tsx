import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';
import { GetStaticPropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { SyntheticEvent, useEffect, useRef } from 'react';
import MyLayout from '../../components/layout/myLayout';
import Post from '../../components/post/post';
import ProfileCard from '../../components/profileCard';
import {
    addComment,
    fetchPostCommentsByID,
    fetchPosts,
    fetchUser,
} from '../../hooks';
import { relativeTimeFromDates } from '../../lib/helper';
import { commentType } from '../../types/all';

const Comment = ({ comment }: { comment: commentType }) => {
    return (
        <div className="p-2 mt-2 bg-pc rounded-lg text-gray-300">
            <div className="flex items-center gap-3">
                <div className="flex aspect-w-1 overflow-hidden w-10 h-10 rounded-full bg-impact">
                    <Image
                        layout="fill"
                        src={comment.user_id.avatar_url}
                        alt={comment.user_id.username}
                    />
                </div>
                <div className="text-sm flex flex-col gap-1">
                    <div className="">{comment.user_id.username}</div>
                    <div className="text-xs">
                        {relativeTimeFromDates(new Date(comment.created_at))}
                    </div>
                </div>
            </div>
            <div className=" py-2 text-lg">{comment.comment}</div>
        </div>
    );
};

const Posts = ({ comments }: { comments: commentType[] }) => {
    console.log({ comments });
    const router = useRouter();
    const { post_id } = router.query;
    const user = useUser();
    const user_id = user?.id;
    const commentRef = useRef<HTMLInputElement>(null);
    const { data: posts } = useQuery(['posts'], () => fetchPosts());
    // const supabase = useSupabaseClient();
    // useEffect(() => {
    //     const channel = supabase
    //         .channel('public:comment')
    //         .on(
    //             'postgres_changes',
    //             {
    //                 event: 'INSERT',
    //                 schema: 'public',
    //                 table: 'comment',
    //             },
    //             (payload) => console.log(payload)
    //         )
    //         .subscribe();

    //     // return supabase.removeChannel(channel);
    // }, []);

    const { data: profile } = useQuery(
        ['profile', user_id],
        () => fetchUser(user_id as string),
        {
            enabled: !user_id,
        }
    );
    const currPost = posts?.filter((post) => post.id === post_id)[0];

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        if (!commentRef.current?.value) return;
        console.log(commentRef.current?.value);

        if (user_id && currPost?.id) {
            addComment(user_id, currPost?.id, commentRef.current?.value);
            commentRef.current.value = '';
        }
    };

    return (
        <MyLayout>
            <div className="h-full w-full ">
                <div className="grid grid-cols-4 gap-5  mx-auto max-w-screen-xl p-2">
                    {profile && <ProfileCard {...profile} />}
                    <section className="col-start-2 col-span-2 max-h-[calc(100vh-5rem)] overflow-y-scroll">
                        {currPost && <Post post={currPost} isLiked />}
                        <div className="p-2">
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="comment">
                                    Add comment
                                    <input
                                        id="comment"
                                        type="text"
                                        ref={commentRef}
                                        className="w-full p-1 rounded bg-pc text-gray-300 border "
                                    />
                                </label>
                            </form>

                            {comments.map((comment) => (
                                <Comment key={comment.id} comment={comment} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </MyLayout>
    );
};

export default Posts;

export async function getStaticPaths() {
    // When this is true (in preview environments) don't
    // prerender any static pages
    // (faster builds, but slower initial page load)
    if (process.env.SKIP_BUILD_STATIC_GENERATION) {
        return {
            paths: [],
            fallback: 'blocking',
        };
    }

    const posts = await fetchPosts();

    const paths = posts.map((post) => ({
        params: { post_id: post.id },
    }));

    // { fallback: false } means other routes should 404
    return { paths, fallback: false };
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const { params } = context;
    const post_id = params?.post_id;
    const comments = await fetchPostCommentsByID(post_id as string);
    return {
        props: {
            comments,
        },
    };
}
