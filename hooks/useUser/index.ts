import { useQuery } from '@tanstack/react-query';
import fetcher from '../../lib/fetcher';
import { Profile } from '../../types/all';

const fetchUser = async (id: string): Promise<Profile> => {
    const res = await fetcher(`/user/${id}`);
    return res;
};

const fetchAllUser = async (): Promise<Profile[]> => {
    const res = await fetcher(`/user`);
    return res;
};

const fetchUserDetailsByUsername = async (
    username: string
): Promise<Profile> => {
    const res = await fetcher(`/user/username/${username}`);
    return res;
};

const useMapUserIdToUsername = (id: string): string => {
    const { data } = useQuery(['all_profile'], () => fetchAllUser());
    return data?.filter((user) => user.id === id)[0].username || '';
};

const useUser = async (id: string) => {
    return useQuery(['profile'], () => fetchUser(id));
};

export {
    fetchUser,
    fetchAllUser,
    useUser,
    fetchUserDetailsByUsername,
    useMapUserIdToUsername,
};
