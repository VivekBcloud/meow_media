import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import fetcher from '../../lib/fetcher';
import { likeType } from '../../types/all';

interface resI {
    message: string;
}

const fetchLikes = async (): Promise<likeType[]> => {
    const res = await fetcher<likeType[]>('/post_like');
    return res;
};

const addLike = async ({
    user_id,
    post_id,
}: {
    user_id: string;
    post_id: string;
}): Promise<resI> => {
    const res = await fetcher<resI>('/post_like', { user_id, post_id }, 'POST');
    return res;
};

const removeLike = async ({
    user_id,
    post_id,
}: {
    user_id: string;
    post_id: string;
}): Promise<resI> => {
    const res = await fetcher<resI>(
        '/post_like',
        { user_id, post_id },
        'DELETE'
    );
    return res;
};

const useLikes = () => {
    return useQuery(['likes'], () => fetchLikes());
};

const useAddLikeMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['likes'],
        mutationFn: addLike,
        onMutate: async (newLike: likeType) => {
            await queryClient.cancelQueries({ queryKey: ['likes'] });

            const previousLikes = queryClient.getQueryData(['likes']);

            queryClient.setQueryData(
                ['likes'],
                (old: likeType[] | undefined) => {
                    if (old) return [...old, newLike];
                    return [newLike];
                }
            );

            return { previousLikes };
        },
        onError: (err, newLike, context) => {
            queryClient.setQueryData(['likes'], context?.previousLikes);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['likes'] });
        },
    });
};
const useRemoveLikeMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['likes'],
        mutationFn: removeLike,
        onMutate: async (oldLike: likeType) => {
            await queryClient.cancelQueries({ queryKey: ['likes'] });

            const previousLikes = queryClient.getQueryData(['likes']);
            console.log({ previousLikes });

            queryClient.setQueryData(
                ['likes'],
                (old: likeType[] | undefined) => {
                    if (old) {
                        return old.filter(
                            (like) =>
                                like.user_id !== oldLike.user_id ||
                                like.post_id !== oldLike.post_id
                        );
                    }
                }
            );

            return { previousLikes };
        },
        onError: (err, oldLike, context) => {
            queryClient.setQueryData(['likes'], context?.previousLikes);
        },
        // Always refetch after error or success:
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['likes'] });
        },
    });
};

export {
    useLikes,
    fetchLikes,
    addLike,
    removeLike,
    useAddLikeMutation,
    useRemoveLikeMutation,
};
