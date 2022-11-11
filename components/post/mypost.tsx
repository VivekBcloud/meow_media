import Image from "next/image";
import React, { useState } from "react";
import { classNameJoiner, relativeTimeFromDates } from "../../lib/helper";
import { postType } from "../../types/all";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Modal from "../modal";
import PostForm from "./postForm";
import { useUser } from "@supabase/auth-helpers-react";
import { removePost } from "../../hooks";

const UserPost = ({ post }: { post: postType }) => {
    // console.log(post);
    const [open, setOpen] = useState(false);
    const user = useUser();
    const queryClient = useQueryClient();

    const postMutation = useMutation(removePost, {
        onSuccess: () => {
            queryClient.invalidateQueries(["posts"]);
        },
    });

    return (
        <>
            <div className=" bg-pc p-3 rounded-lg items-center mt-2 text-gray-300">
                <div className="flex gap-3 items-center py-2">
                    <div className="aspect-w-1 rounded-full overflow-hidden  bg-pc w-10 h-10">
                        <Image src={post.avatar_url} alt="pic" layout="fill" />
                    </div>
                    <div className=" font-semibold  items-center gap-1 text">
                        <div>{post.username}</div>
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
                        <PencilSquareIcon
                            className="w-6 h-6 "
                            onClick={() => setOpen(true)}
                        />
                        <TrashIcon
                            className="w-6 h-6 "
                            onClick={() => {
                                postMutation.mutate({
                                    id: post.id,
                                    userId: user?.id as string,
                                });
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

export default UserPost;
