import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react';
import { Profile } from '../types/all';

const ProfileCard: FC<Profile> = ({ full_name, username, avatar_url }) => {
    return (
        <div className="w-full p-2 ">
            <div className=" relative  w-full bg-sc rounded-lg p-4 text-white whitespace-pre-line overflow-hidden ">
                <div className="absolute top-0 left-0 aspect-w-7 aspect-h-4 w-full overflow-hidden rounded-lg  ">
                    <Image
                        src="/profilebg.svg"
                        alt="pic"
                        layout="fill"
                        objectFit="cover"
                        objectPosition={'0px 0px'}
                    />
                </div>
                <div className=" grid grid-cols-7 mt-[40%] items-end ">
                    <div className="flex flex-col items-end p-2 col-span-2">
                        <div className="text-sm">{'0'}</div>
                        <div className="text-xs">Follower</div>
                    </div>
                    <div className=" relative bg-pc col-span-3 border-[6px] border-sc rounded-lg ">
                        <Image
                            src={avatar_url || '/profile_2.svg'}
                            alt="pic"
                            height="140"
                            width="140"
                            layout="responsive"
                            objectFit="cover"
                            className="rounded-lg"
                        />
                    </div>
                    <div className="flex flex-col items-start p-2 col-span-2">
                        <div className="text-sm">{'0'}</div>
                        <div className="text-xs">Following</div>
                    </div>
                </div>
                <div className="w-full  p-2 rounded-lg overflow-clip flex flex-col items-center">
                    {/* {JSON.stringify(user?.user_metadata, null, 2)} */}
                    <div>{full_name || 'full name'}</div>
                    <div>@{username || 'username'}</div>
                </div>
                <Link href={`/profile/${username}`}>
                    <button className="w-full mt-2 p-2 bg-pc rounded-lg cursor-pointer hover:bg-impact hover:font-bold transition-all ease-out duration-100 ">
                        My profile
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ProfileCard;
