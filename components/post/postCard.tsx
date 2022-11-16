import Image from 'next/image';
import React, { useState } from 'react';
import { classNameJoiner, relativeTimeFromDates } from '../../lib/helper';
import { likeType, postType } from '../../types/all';
import {
    ChatBubbleOvalLeftIcon,
    HeartIcon as SolidHeartIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as SolidFilledHeartIcon } from '@heroicons/react/24/solid';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import fetcher from '../../lib/fetcher';
import Modal from '../modal';
import PostForm from './postForm';
import { useUser } from '@supabase/auth-helpers-react';
import { removePost } from '../../hooks';
import Link from 'next/link';

const PostCard = ({
    post,
    isLiked,
    likedBy = 0,
}: {
    post: postType;
    isLiked: boolean;
    likedBy: number;
}) => {
    // console.log(post);
    const [open, setOpen] = useState(false);
    const [likeDisabled, setLikeDisabled] = useState(false);
    const user = useUser();
    const queryClient = useQueryClient();

    const postMutation = useMutation(removePost, {
        onSuccess: () => {
            queryClient.invalidateQueries(['posts']);
        },
    });

    const handleLike = async () => {
        if (!user?.id) return;
        if (likeDisabled) return;
        try {
            setLikeDisabled(true);
            const res = await fetcher(
                '/post_like',
                {
                    user_id: user?.id,
                    post_id: post.id,
                },
                !isLiked ? 'POST' : 'DELETE'
            );
            if (res) {
                console.log(res);
                setLikeDisabled(false);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLikeDisabled(false);
        }
    };

    return (
        <>
            <div className=" bg-pc p-3 rounded-lg items-center mt-2 text-gray-300">
                <div className="flex gap-3 items-center py-2">
                    <div className="aspect-w-1 rounded-full overflow-hidden  bg-pc w-10 h-10">
                        <Image src={post.avatar_url} alt="pic" layout="fill" />
                    </div>
                    <div className=" font-semibold  items-center gap-1 text">
                        <div>{post.username}</div>
                        <div className="text-xs font-light">
                            {relativeTimeFromDates(new Date(post.created_at))}
                        </div>
                    </div>
                </div>
                <div className=" flex flex-col gap-1">
                    <div className="">{post.content}</div>
                    <div className="py-2">
                        <div className="aspect-w-2 aspect-h-1 w-full overflow-hidden rounded-lg">
                            <Image src={post.img_url} alt="pic" layout="fill" />
                        </div>
                    </div>
                    <div className="flex gap-2 items-center py-2">
                        <SolidFilledHeartIcon
                            className={classNameJoiner(
                                'w-6 h-6',
                                isLiked ? 'text-red-500' : ''
                            )}
                            onClick={handleLike}
                        />

                        <Link href={`/post/${post.id}`}>
                            <ChatBubbleOvalLeftIcon className="w-6 h-6 " />
                        </Link>
                    </div>
                    <div className="text-sm">Liked by {likedBy}</div>
                </div>
            </div>
            <Modal open={open} setOpen={setOpen}>
                <PostForm
                    setOpen={setOpen}
                    method="EDIT"
                    postContent={post.content}
                    id={post.id}
                    img_url={post.img_url}
                />
            </Modal>
        </>
    );
};

export default PostCard;
