import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { RealtimePostgresInsertPayload } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import MyLayout from '../../components/layout/myLayout';
import PostCard from '../../components/post/postCard';
import ProfileCard from '../../components/profileCard';
import {
  addComment,
  fetchPostCommentsByID,
  fetchPosts,
  fetchUser,
  useMapUserIdToUsername,
} from '../../hooks';
import { commentType } from '../../types/all';
import { formatDistanceToNow } from 'date-fns';

const Comment = ({ comment }: { comment: commentType }) => {
  const username = useMapUserIdToUsername(comment.user_id);
  return (
    <div className="p-2 mt-2 bg-pc rounded-lg text-gray-300">
      <div className="flex items-center gap-3">
        <div className="flex aspect-w-1 overflow-hidden w-10 h-10 rounded-full bg-impact">
          <Image
            layout="fill"
            objectFit="cover"
            src={
              `https://cshhlpsxxvoyacgyjyqd.supabase.co/storage/v1/object/public/avatars/${comment.user_id}` ||
              '/profile_2.svg'
            }
            alt={comment.user_id || 'username'}
          />
        </div>
        <div className="text-sm flex flex-col gap-1">
          <div className="">{username || 'username'}</div>
          <div className="text-xs">
            {formatDistanceToNow(new Date(comment.created_at))} ago
          </div>
        </div>
      </div>
      <div className=" py-2 text-lg">{comment.comment}</div>
    </div>
  );
};

const Post = () => {
  const router = useRouter();
  const [commentsData, setCommentsData] = useState<commentType[]>([]);
  const { post_id } = router.query;
  const { isLoading } = useQuery(
    ['comment', post_id],
    () => fetchPostCommentsByID(post_id as string),
    {
      onSuccess: (data) => {
        setCommentsData(data);
      },
    }
  );

  const user = useUser();
  const user_id = user?.id;
  const commentRef = useRef<HTMLInputElement>(null);
  const { data: posts } = useQuery(['posts'], () => fetchPosts());
  const supabase = useSupabaseClient();

  useEffect(() => {
    const channel = supabase
      .channel('public:comment')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'Comment',
        },
        async (payload: RealtimePostgresInsertPayload<commentType>) => {
          setCommentsData((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const { data: profile } = useQuery(
    ['profile', user_id],
    () => fetchUser(user_id as string),
    {
      enabled: !!user_id,
    }
  );
  const currPost = posts?.filter((post) => post.id === post_id)[0];

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!commentRef.current?.value) return;

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
          <section className="col-start-2 col-span-2 max-h-[calc(100vh-5rem)] px-1 overflow-y-scroll">
            {currPost && <PostCard post={currPost} isLiked likedBy={1} />}
            <div className="py-2">
              <form onSubmit={handleSubmit}>
                <label htmlFor="comment">
                  <div className="relative flex gap-1 items-center">
                    <input
                      id="comment"
                      type="text"
                      ref={commentRef}
                      placeholder="type comment"
                      className="w-full px-3 p-2 rounded bg-sc text-gray-300 focus:bg-bg  "
                    />
                    <PaperAirplaneIcon
                      onClick={handleSubmit}
                      className="w-7 h-7 text-gray-300 absolute right-2 top-[50%] translate-y-[-50%]"
                    />
                  </div>
                </label>
              </form>
              {isLoading && <div className="text-gray-300">Loading...</div>}
              {commentsData.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </MyLayout>
  );
};

export default Post;
