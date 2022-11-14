import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';

import {
    HomeIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    BellIcon,
    FolderOpenIcon,
    ChevronDownIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { classNameJoiner } from '../../lib/helper';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { fetchUser } from '../../hooks';

const Navbar = () => {
    const user = useUser();
    const user_id = user?.id;
    const supabaseClient = useSupabaseClient();

    const { data: profile } = useQuery(
        ['profile', user_id],
        () => fetchUser(user_id as string),
        {
            enabled: !!user_id,
        }
    );

    const router = useRouter();
    const currTab = router.pathname;
    // console.log({ currTab });

    return (
        <div className="flex absolute justify-center top-0 left-0 h-16 w-full bg-bg p-2">
            <nav className="max-w-screen-xl w-full grid grid-cols-4 gap-5 p-2">
                <div className="left col-span-1 flex gap-5 items-center">
                    <Link href="/home" passHref>
                        <a className=" bg-white rounded-full p-2 font-bold text-xs cursor-pointer">
                            LZ
                        </a>
                    </Link>
                    <input
                        type="text"
                        className="rounded-xl bg-sc p-1 px-2 w-full"
                        placeholder="#"
                    />
                </div>
                <div className="center col-span-2  flex justify-center items-center gap-10">
                    <div>
                        <Link href="/home">
                            <HomeIcon
                                className={classNameJoiner(
                                    'h-6 w-6 text-white',
                                    currTab === '/home' ? 'text-impact' : ''
                                )}
                            />
                        </Link>
                    </div>
                    <div>
                        <Link href="/chat">
                            <ChatBubbleOvalLeftEllipsisIcon
                                className={classNameJoiner(
                                    'h-6 w-6 text-white',
                                    currTab === '/chat' ? 'text-impact' : ''
                                )}
                            />
                        </Link>
                    </div>
                    <div>
                        <Link href="/notification">
                            <BellIcon
                                className={classNameJoiner(
                                    'h-6 w-6 text-white',
                                    currTab === '/notification'
                                        ? 'text-impact'
                                        : ''
                                )}
                            />
                        </Link>
                    </div>
                    {/* <Link href="/posts">
                            <FolderOpenIcon
                                className={classNameJoiner(
                                    "h-6 w-6 text-white",
                                    currTab === "/posts" ? "text-impact" : ""
                                )}
                            />
                        </Link> */}
                </div>
                <div className="right col-span-1 flex justify-end ">
                    <div className="px-1 py-1 bg-sc rounded-xl text-gray-300 flex items-center gap-3">
                        <Image
                            height={24}
                            width={24}
                            src={profile?.avatar_url || '/profile_2.svg'}
                            alt="drop"
                            className="rounded-full "
                        />
                        <Link href={`/profile/${profile?.username}`} passHref>
                            <div className="font-medium text-sm cursor-pointer">
                                {profile?.username}
                            </div>
                        </Link>
                        <Menu
                            as="div"
                            className="relative inline-block text-left"
                        >
                            <div>
                                <Menu.Button className="inline-flex w-full justify-center rounded-md  bg-transparent outline-none">
                                    <ChevronDownIcon className="h-3 w-3 text-white mr-2" />
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 rounded-lg  whitespace-nowrap origin-top-right overflow-hidden bg-sc shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={classNameJoiner(
                                                        active
                                                            ? ' text-impact'
                                                            : 'text-gray-200',
                                                        'block px-4 py-2 text-sm w-full'
                                                    )}
                                                    onClick={() => {
                                                        supabaseClient.auth.signOut();
                                                    }}
                                                >
                                                    Sign out
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>

                {/* <button
                    className="hidden"
                    onClick={() => {
                        supabaseClient.auth.signOut();
                    }}
                >
                    Sign out
                </button> */}
            </nav>
        </div>
    );
};

export default Navbar;
