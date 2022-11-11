import { useQuery, useMutation } from "@tanstack/react-query";
import fetcher from "../../lib/fetcher";
import { postType } from "../../types/all";

type mutatePostType = {
    content: string;
    imageUrl: string;
    userId: string;
    postId: string;
    method: "POST" | "PUT";
};

const fetchPosts = async (): Promise<postType[]> => {
    const res = await fetcher("/post");
    return res;
};

const mutatePost = async ({
    method,
    content,
    imageUrl,
    userId,
    postId,
}: mutatePostType): Promise<postType[]> => {
    const res = await fetcher(
        "/post",
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
    const res = await fetcher(
        "/post",
        {
            id,
            user_id: userId,
        },
        "DELETE"
    );
    return res;
};

const fetchPostsByUserId = async (username: string): Promise<postType[]> => {
    const res = await fetcher(`/post/${username}`);
    return res;
};

const usePosts = async () => {
    return useQuery(["posts"], () => fetchPosts());
};

export { usePosts, fetchPosts, mutatePost, removePost, fetchPostsByUserId };
