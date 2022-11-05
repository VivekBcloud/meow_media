import React, { useState } from "react";
import Image from "next/image";
import { useUser } from "@supabase/auth-helpers-react";

import Modal from "../modal";
import PostForm from "./postForm";

const CreatePost = () => {
    const user = useUser();

    const [open, setOpen] = useState(false);

    return (
        <div className="flex  bg-pc p-3 rounded-lg gap-2 items-center ">
            <div className="col-span-1 flex items-center">
                <Image
                    src={user?.user_metadata?.avatar_url}
                    alt="profile"
                    height={40}
                    width={40}
                    className="rounded-full"
                />
            </div>
            <div className="flex-grow">
                <button
                    type="button"
                    className="w-full bg-sc py-3 px-3 rounded-lg text-white text-sm placeholder:text-white/30"
                    onClick={() => setOpen(true)}
                >
                    {"Create a post"}
                </button>
                <Modal open={open} setOpen={setOpen}>
                    <PostForm method="ADD" setOpen={setOpen} />
                </Modal>
            </div>
        </div>
    );
};

export default CreatePost;
