import Image from "next/image";
import React, { useState } from "react";
import { classNameJoiner, relativeTimeFromDates } from "../lib/helper";
import { postType } from "../types/all";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";

import fetcher from "../lib/fetcher";
import Modal from "./modal";
import PostForm from "./post/postForm";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

const Post = ({ post, isLiked }: { post: postType; isLiked: boolean }) => {
    // console.log(post);
    const [open, setOpen] = useState(false);
    const [alreadyLiked, setAlreadyLiked] = useState(isLiked);
    const user = useUser();
    const supabase = useSupabaseClient();
    // const session = useSession();
    // console.log({ session });

    const handleLike = async () => {
        try {
            const res = await fetcher(
                "/post_like",
                {
                    user_id: user?.id,
                    post_id: post.id,
                },
                !alreadyLiked ? "POST" : "DELETE"
            );
            if (res) {
                console.log(res);
                setAlreadyLiked((prev) => !prev);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <div className=" bg-pc p-3 rounded-lg items-center mt-2 text-gray-300">
                <div className="flex gap-3 items-center py-2">
                    <div className="aspect-w-1 rounded-full overflow-hidden  bg-pc w-10 h-10">
                        <Image
                            src={post.user_id.avatar_url}
                            alt="pic"
                            layout="fill"
                        />
                    </div>
                    <div className=" font-semibold  items-center gap-1 text">
                        <div>{post.user_id.username}</div>
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
                        <SolidHeartIcon
                            className={classNameJoiner(
                                "w-6 h-6 ",
                                alreadyLiked ? "text-red-500" : "text-white"
                            )}
                            onClick={handleLike}
                        />
                        <PencilSquareIcon
                            className="w-6 h-6 "
                            onClick={() => setOpen(true)}
                        />
                        <TrashIcon
                            className="w-6 h-6 "
                            onClick={async () => {
                                try {
                                    const res = await fetcher(
                                        "/post",
                                        {
                                            id: post.id,
                                            userId: post.user_id,
                                        },
                                        "DELETE"
                                    );
                                    if (res) console.log(res);
                                } catch (e) {
                                    console.log(e);
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
            <Modal open={open} setOpen={setOpen}>
                <PostForm
                    setOpen={setOpen}
                    method="EDIT"
                    postContent={post.content}
                    id={post.id}
                    img_url={post.img_url}
                />
            </Modal>
        </>
    );
};

export default Post;
