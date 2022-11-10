import { useQuery } from "@tanstack/react-query";
import fetcher from "../../lib/fetcher";
import { Profile } from "../../types/all";

const fetchUser = async (id: string): Promise<Profile> => {
    const res = await fetcher(`/user/${id}`);
    return res;
};

const useUser = async (id: string) => {
    return useQuery(["profile"], () => fetchUser(id));
};

export { fetchUser, useUser };
