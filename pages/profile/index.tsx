import { PhotoIcon } from "@heroicons/react/24/solid";
import {
    useSession,
    useSupabaseClient,
    useUser,
} from "@supabase/auth-helpers-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ImageUpload from "../../components/imageUpload";

const Profile = () => {
    const supabase = useSupabaseClient();
    const user = useUser();
    const session = useSession();
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [avatar_url, setAvatarUrl] = useState("");

    useEffect(() => {
        async function getProfile() {
            try {
                setLoading(true);

                let { data, error, status } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", user?.id)
                    .single();

                if (error && status !== 406) {
                    throw error;
                }

                if (data) {
                    setUsername(data.username);
                    setFullname(data.full_name);
                    setAvatarUrl(data.avatar_url);
                }
            } catch (error) {
                alert("Error loading user data!");
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        getProfile();
    }, [session, supabase, user?.id]);

    async function updateProfile({
        username,
        fullname,
        avatar_url,
    }: {
        [key: string]: string;
    }) {
        try {
            setLoading(true);

            const updates = {
                id: user?.id,
                username,
                full_name: fullname,
                avatar_url,
                updated_at: new Date().toISOString(),
            };
            console.log({ updates });

            let { error } = await supabase.from("profiles").upsert(updates);
            if (error) throw error;
            alert("Profile updated!");
        } catch (error) {
            alert("Error updating the data!");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-full w-full bg-emerald-400">
            <div className="flex flex-col gap-5 h-full mx-auto max-w-screen-xl p-2 text-orange-500">
                <div className="aspect-w-1 w-40 h-40 overflow-hidden rounded-lg bg-pc ">
                    {avatar_url ? (
                        <Image
                            src={avatar_url}
                            layout="fill"
                            alt="post"
                            objectFit="contain"
                            onLoadingComplete={() => setLoading(false)}
                        />
                    ) : (
                        <PhotoIcon className="bg-sc text-bg" />
                    )}
                </div>
                <div className="w-40">
                    <ImageUpload
                        onUpload={async (url) => {
                            try {
                                const { data } = supabase.storage
                                    .from("avatars")
                                    .getPublicUrl(url);

                                // if (error) {
                                //     throw error;
                                // }
                                // const url = URL.createObjectURL(data);
                                setAvatarUrl(data.publicUrl);
                                updateProfile({
                                    username,
                                    fullname,
                                    avatar_url: data.publicUrl,
                                });
                            } catch (error) {
                                console.log("Error downloading image: ", error);
                            }
                        }}
                        uid={user?.id as string}
                    />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="text"
                        value={session?.user.email}
                        disabled
                    />
                </div>
                <div>
                    <label htmlFor="username">Full name</label>
                    <input
                        id="fullname"
                        type="text"
                        value={fullname || ""}
                        onChange={(e) => setFullname(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username || ""}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div>
                    <button
                        className="button primary block"
                        onClick={() =>
                            updateProfile({ username, fullname, avatar_url })
                        }
                        disabled={loading}
                    >
                        {loading ? "Loading ..." : "Update"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
