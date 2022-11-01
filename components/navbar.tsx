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
        <div className="flex absolute justify-center top-0 left-0 h-16 w-full bg-[#1a1a1a] p-2">
            <nav className="max-w-screen-xl w-full flex justify-between items-center p-2">
                <div className="left flex w-1/4 gap-10 items-center">
                    <div className=" bg-white rounded-full p-2 font-bold text-xs">
                        LZ
                    </div>
                    <input
                        type="text"
                        className="rounded-xl bg-[#272727] p-1 px-2"
                        placeholder="#"
                    />
                </div>
                <div className="center flex w-1/2 justify-center items-center gap-10">
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
                <div className="right flex w-1/4 justify-end ">
                    <div className="px-1 py-1   bg-[#222222] rounded-xl text-gray-300 flex items-center gap-3">
                        <Image
                            height={24}
                            width={24}
                            src="/profile_2.svg"
                            alt="drop"
                        />
                        <div className="font-medium text-sm">
                            {user?.user_metadata.name}
                        </div>
                        <ChevronDownIcon className="h-3 w-3 text-white mr-2" />
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
