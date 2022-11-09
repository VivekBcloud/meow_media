import {
    useSession,
    useSupabaseClient,
    useUser,
} from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";
import Avatar from "../../components/avatar";

const Profile = () => {
    const supabase = useSupabaseClient();
    const user = useUser();
    const session = useSession();
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [avatar_url, setAvatarUrl] = useState("");

    useEffect(() => {
        getProfile();
    }, [session]);

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

    async function updateProfile({ username, fullname, avatar_url }) {
        try {
            setLoading(true);

            const updates = {
                id: user.id,
                username,
                full_name: fullname,
                avatar_url,
                updated_at: new Date().toISOString(),
            };

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
                <Avatar
                    uid={user.id}
                    url={avatar_url}
                    size={150}
                    onUpload={(url) => {
                        setAvatarUrl(url);
                        updateProfile({ username, fullname, avatar_url: url });
                    }}
                />
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="text"
                        value={session.user.email}
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
