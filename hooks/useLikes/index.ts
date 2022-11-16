import { useQuery } from '@tanstack/react-query';
import fetcher from '../../lib/fetcher';
import { likeType } from '../../types/all';

const fetchLikes = async (): Promise<likeType[]> => {
    const res = await fetcher('/post_like');
    return res;
};

const useLikes = () => {
    return useQuery(['likes'], () => fetchLikes());
};

export { useLikes, fetchLikes };
