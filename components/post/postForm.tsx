import React, { FC, useState } from "react";
import { PhotoIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import ImageUpload from "../imageUpload";
import fetcher from "../../lib/fetcher";

import { classNameJoiner } from "../../lib/helper";

interface PostFormI {
    method: "ADD" | "EDIT";
    postContent?: string;
    img_url?: string;
    id?: string;
    setOpen: (val: boolean) => void;
}

const PostForm: FC<PostFormI> = ({
    method,
    postContent = "",
    id,
    img_url = "",
    setOpen,
}) => {
    const [imageUrl, setImageUrl] = useState(img_url);
    const [content, setContent] = useState(postContent);

    const [isLoading, setLoading] = useState(false);
    const supabaseClient = useSupabaseClient();
    const user = useUser();

    const handlePost = async () => {
        if (!content || !imageUrl) return;
        console.log("post mer");
        try {
            const res = await fetcher(
                "/post",
                {
                    content,
                    img_url: imageUrl,
                    user_id: user?.id,
                    user_email: user?.email,
                    id,
                },
                method === "ADD" ? "POST" : "PUT"
            );
            if (res) {
                console.log(res);
                setOpen(false);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1">
                <div className="aspect-w-3 aspect-h-2 w-full overflow-hidden rounded-lg bg-pc xl:aspect-w-7 xl:aspect-h-5">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            layout="fill"
                            alt="post"
                            objectFit="cover"
                            className={classNameJoiner(
                                "duration-700 ease-in-out ",
                                isLoading
                                    ? "scale-110 blur-2xl grayscale"
                                    : "scale-100 blur-0 grayscale-0"
                            )}
                            onLoadingComplete={() => setLoading(false)}
                        />
                    ) : (
                        <PhotoIcon className="bg-sc text-bg" />
                    )}
                </div>
                <textarea
                    className="w-full mt-5 bg-sc py-3 px-3 rounded-lg text-white text-sm placeholder:text-white/30"
                    placeholder="tell your friends how was your day"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-4 gap-3 mt-4">
                <ImageUpload
                    onUpload={async (url) => {
                        try {
                            const { data } = supabaseClient.storage
                                .from("post-image")
                                .getPublicUrl(url);

                            // if (error) {
                            //     throw error;
                            // }
                            // const url = URL.createObjectURL(data);
                            setImageUrl(data.publicUrl);
                        } catch (error) {
                            console.log("Error downloading image: ", error);
                        }
                    }}
                />
                <button
                    onClick={() => handlePost()}
                    className="w-full rounded-xl  px-4 flex items-center justify-center gap-1 col-start-4 text-white border border-pc"
                >
                    <PaperAirplaneIcon className="h-5 w-5 " />
                    <div className="font-bold text-sm">{"Post"}</div>
                </button>
            </div>
        </div>
    );
};

export default PostForm;
