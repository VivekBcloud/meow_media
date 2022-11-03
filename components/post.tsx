import Image from "next/image";
import React from "react";
import { relativeTimeFromDates } from "../lib/helper";
import { postType } from "../types/all";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";

const Post = ({ post }: { post: postType }) => {
    console.log(post);

    return (
        <div className=" bg-pc p-3 rounded-lg items-center mt-2 text-gray-300">
            <div className="flex gap-3 items-center py-2">
                <div className="aspect-w-1 rounded-full overflow-hidden  bg-pc w-10 h-10">
                    <Image
                        src={post.user_email.image}
                        alt="pic"
                        layout="fill"
                    />
                </div>
                <div className=" font-semibold  items-center gap-1 text">
                    <div>{post.user_email.name}</div>
                    <div className="text-xs font-light">
                        {relativeTimeFromDates(new Date(post.created_at))}
                    </div>
                </div>
            </div>
            <div className=" flex flex-col gap-1">
                <div className="">{post.content}</div>
                <div className="py-2">
                    <div className="aspect-w-2 aspect-h-1 w-full overflow-hidden rounded-lg">
                        <Image src={post.img_url} alt="pic" layout="fill" />
                    </div>
                </div>
                <div className="flex gap-1 items-center py-2">
                    <SolidHeartIcon className="w-6 h-6 text-red-500" />
                    <ChatBubbleOvalLeftIcon className="w-6 h-6 " />
                </div>
            </div>
        </div>
    );
};

export default Post;
