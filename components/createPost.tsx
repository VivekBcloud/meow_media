import React, { useState } from "react";
import { PhotoIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import ImageUpload from "./imageUpload";
import fetcher from "../lib/fetcher";
const CreatePost = () => {
    const user = useUser();
    const [imageUrl, setImageUrl] = useState("");
    const [content, setContent] = useState("");
    const supabaseClient = useSupabaseClient();

    console.log(imageUrl);

    const handlePost = async () => {
        if (!!content || !!imageUrl) return;

        try {
            const res = await fetcher("/create-post", {
                content,
                imageUrl,
                userId: user?.id,
            });
            if (res) console.log(res);
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div className="grid grid-cols-8 bg-pc p-4 rounded-lg">
            <div className="col-span-1">
                <Image
                    src="/profile_2.svg"
                    alt="profile"
                    height={50}
                    width={50}
                />
            </div>
            <div className="col-span-7">
                <input
                    type="text"
                    className="w-full bg-sc py-3 px-3 rounded-lg text-white text-sm placeholder:text-white/30"
                    placeholder="tell your friends how was your day"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        height={"100%"}
                        width={"100%"}
                        alt="post"
                    />
                )}
                <div className="grid grid-cols-4 gap-3 mt-4">
                    <ImageUpload
                        uid={user!.id}
                        url={imageUrl}
                        size={150}
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
                    <div
                        onClick={() => handlePost()}
                        className="w-full rounded-xl p-2 px-3 flex items-center justify-center gap-1 col-start-4 text-white border border-bg"
                    >
                        <PaperAirplaneIcon className="h-5 w-5 " />
                        <div className="font-bold text-sm">{"Post"}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
