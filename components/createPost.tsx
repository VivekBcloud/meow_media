import React, { useState } from "react";
import { PhotoIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useUser } from "@supabase/auth-helpers-react";
import ImageUpload from "./imageUpload";

const CreatePost = () => {
    const user = useUser();
    const [imageUrl, setImageUrl] = useState("");
    console.log(imageUrl);

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
                />
                <div className="grid grid-cols-4 gap-3 mt-4">
                    <div className="w-full rounded-xl p-2 px-3 flex items-center justify-center gap-1  bg-sc">
                        <PhotoIcon className="h-5 w-5 text-emerald-400" />
                        <ImageUpload
                            uid={user.id}
                            url={""}
                            size={150}
                            onUpload={(url) => {
                                setImageUrl(url);
                            }}
                        />
                        <div className="text-white text-sm">{"Photo"}</div>
                    </div>
                    <div className="w-full rounded-xl p-2 px-3 flex items-center justify-center gap-1 col-start-4 text-white border border-bg">
                        <PaperAirplaneIcon className="h-5 w-5 " />
                        <div className="font-bold text-sm">{"Post"}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
