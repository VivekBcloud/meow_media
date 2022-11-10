import { useQuery } from "@tanstack/react-query";
import fetcher from "../../lib/fetcher";
import { postType } from "../../types/all";

const fetchPosts = async (): Promise<postType[]> => {
    const res = await fetcher("/post");
    return res;
};

const usePosts = async () => {
    return useQuery(["posts"], () => fetchPosts());
};

export { usePosts, fetchPosts };
