import Image from 'next/image';
import React, { useState } from 'react';
import { classNameJoiner } from '../../lib/helper';
import { postType } from '../../types/all';
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline';
import { HeartIcon as SolidFilledHeartIcon } from '@heroicons/react/24/solid';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Modal from '../modal';
import PostForm from './postForm';
import { useUser } from '@supabase/auth-helpers-react';
import {
  removePost,
  useAddLikeMutation,
  useRemoveLikeMutation,
} from '../../hooks';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

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
  const user = useUser();
  const queryClient = useQueryClient();

  const postMutation = useMutation(removePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });
  const addLikeMutation = useAddLikeMutation();
  const removeLikeMutation = useRemoveLikeMutation();
  const handleLike = async () => {
    if (!isLiked && user?.id) {
      addLikeMutation.mutate({ user_id: user?.id, post_id: post.id });
    } else if (user?.id) {
      removeLikeMutation.mutate({ user_id: user?.id, post_id: post.id });
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
              {formatDistanceToNow(new Date(post.created_at))} ago
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-1">
          <div className="">{post.content}</div>
          <div className="py-2">
            <div className="aspect-w-2 aspect-h-1 w-full overflow-hidden rounded-lg">
              <Image
                src={post.img_url}
                objectFit="cover"
                alt="pic"
                layout="fill"
              />
            </div>
          </div>
          <div className="flex gap-2 items-center py-2">
            <SolidFilledHeartIcon
              className={classNameJoiner(
                'w-6 h-6 cursor-pointer',
                isLiked ? 'text-red-500' : ''
              )}
              onClick={handleLike}
            />

            <Link href={`/post/${post.id}`}>
              <ChatBubbleOvalLeftIcon className="w-6 h-6 cursor-pointer" />
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
