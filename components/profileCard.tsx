import { useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";
import React from "react";
const ProfileCard = () => {
    const user = useUser();
    return (
        <div className="w-full p-2">
            <div className=" bg-sc rounded-lg p-4 text-white whitespace-pre-line overflow-hidden ">
                <div className="aspect-w-7 aspect-h-4 w-full overflow-hidden rounded-lg  ">
                    <Image
                        src="/profilebg.svg"
                        alt="pic"
                        layout="fill"
                        objectFit="cover"
                        objectPosition={"0px 0px"}
                    />
                </div>
                <div className=" grid grid-cols-4  ">
                    <div className="flex flex-col items-end p-2">
                        <div className="text-sm">{"1000"}</div>
                        <div className="text-sm">Follower</div>
                    </div>
                    <div className="relative bg-pc col-span-2 top-[-50%] border-[6px] border-sc rounded-lg ">
                        <Image
                            src={user?.user_metadata.avatar_url}
                            alt="pic"
                            height="150"
                            width="150"
                            layout="responsive"
                            className="  rounded-lg"
                        />
                    </div>
                    <div className="flex flex-col items-start p-2">
                        <div className="text-sm">{"1000"}</div>
                        <div className="text-xm">Following</div>
                    </div>
                </div>
                <div className="w-full bg-pc p-2 rounded-lg overflow-clip">
                    about
                    {JSON.stringify(user?.user_metadata, null, 2)}
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
