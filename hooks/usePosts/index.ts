import { useQuery } from '@tanstack/react-query';
import fetcher from '../../lib/fetcher';
import { postType } from '../../types/all';

type mutatePostType = {
    content: string;
    imageUrl: string;
    userId: string;
    postId: string;
    method: 'POST' | 'PUT';
};

const fetchPosts = async (): Promise<postType[]> => {
    const res = await fetcher<postType[]>('/post');
    return res;
};

const fetchPostCommentsByID = async (id: string): Promise<postType[]> => {
    const res = await fetcher<postType[]>(`/post/comments/${id}`);
    return res;
};

const addComment = async (
    user_id: string,
    post_id: string,
    comment: string
) => {
    const res = await fetcher(
        `/post/comments/${post_id}`,
        {
            user_id,
            comment,
        },
        'POST'
    );
    return res;
};

const mutatePost = async ({
    method,
    content,
    imageUrl,
    userId,
    postId,
}: mutatePostType): Promise<postType[]> => {
    const res = await fetcher<postType[]>(
        '/post',
        {
            id: postId,
            content,
            img_url: imageUrl,
            user_id: userId,
        },
        method
    );
    return res;
};

const removePost = async ({
    id,
    userId,
}: {
    id: string;
    userId: string;
}): Promise<{ message: string }> => {
    const res = await fetcher<{ message: string }>(
        '/post',
        {
            id,
            user_id: userId,
        },
        'DELETE'
    );
    return res;
};

const fetchPostsByUsername = async (username: string): Promise<postType[]> => {
    const res = await fetcher<postType[]>(`/post/${username}`);
    return res;
};

const usePosts = () => {
    return useQuery(['posts'], () => fetchPosts());
};

export {
    usePosts,
    fetchPosts,
    mutatePost,
    removePost,
    fetchPostsByUsername,
    fetchPostCommentsByID,
    addComment,
};
