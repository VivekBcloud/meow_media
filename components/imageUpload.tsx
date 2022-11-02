import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/24/solid";
export default function ImageUpload({
    uid,
    url,
    size,
    onUpload,
}: {
    uid: string;
    url: string;
    size: number;
    onUpload: (url: string) => void;
}) {
    const supabase = useSupabaseClient();
    const [avatarUrl, setAvatarUrl] = useState("");
    const [uploading, setUploading] = useState(false);

    const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
        event
    ) => {
        try {
            setUploading(true);

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error("You must select an image to upload.");
            }

            const file = event.target.files[0];
            const fileExt = file.name.split(".").pop();
            const fileName = `${uid}.${fileExt}`;
            const filePath = `${fileName}`;

            let { error: uploadError } = await supabase.storage
                .from("post-image")
                .upload(filePath, file, { upsert: true });

            if (uploadError) {
                throw uploadError;
            }

            onUpload(filePath);
        } catch (error) {
            alert("Error uploading avatar!");
            console.log(error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="w-full rounded-xl p-2 px-3 flex items-center justify-center gap-1  bg-sc">
            {avatarUrl ? (
                <Image
                    src={avatarUrl}
                    alt="Avatar"
                    className="avatar image"
                    height={size}
                    width={size}
                />
            ) : null}
            <div>
                <label
                    className="w-full rounded-xl p-2 px-3 flex items-center justify-center gap-1  bg-s "
                    htmlFor="single"
                >
                    <PhotoIcon className="h-5 w-5 text-emerald-400" />
                    <div className="text-white text-sm">
                        {uploading ? "Uploading ..." : "Photo"}
                    </div>
                </label>
                <input
                    style={{
                        visibility: "hidden",
                        position: "absolute",
                    }}
                    type="file"
                    id="single"
                    accept="image/*"
                    onChange={uploadAvatar}
                    disabled={uploading}
                />
            </div>
        </div>
    );
}
