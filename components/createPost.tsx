import React, { useState } from "react";
import { PhotoIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import ImageUpload from "./imageUpload";
import fetcher from "../lib/fetcher";
import Modal from "./modal";
import { classNameJoiner } from "../lib/helper";

const CreatePost = () => {
    const user = useUser();
    const [imageUrl, setImageUrl] = useState("");
    const [content, setContent] = useState("");
    const [open, setOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const supabaseClient = useSupabaseClient();

    const handlePost = async () => {
        if (!content || !imageUrl) return;
        console.log("post mer");

        try {
            const res = await fetcher("/create_post", {
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
        <div className="grid grid-cols-8 bg-pc p-4 rounded-lg items-center">
            <div className="col-span-1">
                <Image
                    src="/profile_2.svg"
                    alt="profile"
                    height={50}
                    width={50}
                />
            </div>
            <div className="col-span-7">
                <button
                    type="button"
                    className="w-full bg-sc py-3 px-3 rounded-lg text-white text-sm placeholder:text-white/30"
                    onClick={() => setOpen(true)}
                >
                    {"Create a post"}
                </button>
                <Modal open={open} setOpen={setOpen}>
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
                                        onLoadingComplete={() =>
                                            setLoading(false)
                                        }
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
                                        console.log(
                                            "Error downloading image: ",
                                            error
                                        );
                                    }
                                }}
                            />
                            <button
                                onClick={() => handlePost()}
                                className="w-full rounded-xl  px-4 flex items-center justify-center gap-1 col-start-4 text-white border border-pc"
                            >
                                <PaperAirplaneIcon className="h-5 w-5 " />
                                <div className="font-bold text-sm">
                                    {"Post"}
                                </div>
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default CreatePost;
