import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import {
    HomeIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    BellIcon,
    HeartIcon,
    ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
const Navbar = () => {
    const user = useUser();
    const supabaseClient = useSupabaseClient();

    return (
        <div className="flex absolute justify-center top-0 left-0 h-16 w-full bg-bg p-2">
            <nav className="max-w-screen-xl w-full grid grid-cols-4 gap-5 p-2">
                <div className="left col-span-1 flex gap-5 items-center">
                    <div className=" bg-white rounded-full p-2 font-bold text-xs">
                        LZ
                    </div>
                    <input
                        type="text"
                        className="rounded-xl bg-sc p-1 px-2 w-full"
                        placeholder="#"
                    />
                </div>
                <div className="center col-span-2  flex justify-center items-center gap-10">
                    <div>
                        <HomeIcon className="h-6 w-6 text-[#fffd01]" />
                    </div>
                    <div>
                        <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <BellIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <HeartIcon className="h-6 w-6 text-white" />
                    </div>
                </div>
                <div className="right col-span-1 flex justify-end ">
                    <div className="px-1 py-1 bg-sc rounded-xl text-gray-300 flex items-center gap-3">
                        <Image
                            height={24}
                            width={24}
                            src="/profile_2.svg"
                            alt="drop"
                        />
                        <div className="font-medium text-sm">
                            {user?.user_metadata.name}
                        </div>
                        <ChevronDownIcon
                            className="h-3 w-3 text-white mr-2"
                            onClick={() => supabaseClient.auth.signOut()}
                        />
                    </div>
                </div>

                <button
                    className="hidden"
                    onClick={() => supabaseClient.auth.signOut()}
                >
                    Sign out
                </button>
            </nav>
        </div>
    );
};

export default Navbar;
