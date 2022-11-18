import { PhotoIcon } from '@heroicons/react/24/solid';
import {
    useSession,
    useSupabaseClient,
    useUser,
} from '@supabase/auth-helpers-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { FormEvent, useState } from 'react';
import ImageUploadWrapper from '../../components/imageUpload/ImgUploadWrapper';
import { fetchUser } from '../../hooks';

const Profile = () => {
    const supabase = useSupabaseClient();
    const user = useUser();
    const user_id = user?.id;
    const session = useSession();
    const [loading, setLoading] = useState(true);
    const [avatar_url, setAvatarUrl] = useState('');
    const { data: profile, isLoading: isProfileLoading } = useQuery(
        ['profile'],
        () => fetchUser(user_id as string),
        {
            enabled: !!user_id,
            onSuccess(data) {
                setAvatarUrl(data.avatar_url);
            },
        }
    );

    async function updateProfile(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const { username, full_name, bio } = Object.fromEntries(
            new FormData(e.target as HTMLFormElement)
        );
        try {
            const updates = {
                id: profile?.id,
                username,
                full_name,
                bio,
                avatar_url,
                updated_at: new Date().toISOString(),
            };
            console.log({ updates });

            const { error } = await supabase.from('profiles').upsert(updates);
            if (error) throw error;
            alert('Profile updated!');
        } catch (error) {
            alert('Error updating the data!');
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    const profileUpdate = useMutation(updateProfile);

    return (
        <div className="h-full w-full ">
            <div className=" gap-5 h-full mx-auto max-w-screen-xl p-2 text-gray-300 ">
                <form
                    onSubmit={profileUpdate.mutate}
                    className="grid grid-cols-5 gap-20 text-lg"
                >
                    <div className="col-span-3 w-full flex flex-col gap-3">
                        <div className="text-2xl">User Information</div>
                        <div>
                            Change the required information below and click on
                            update. You can change it anytime you want{' '}
                        </div>
                        <div className=" flex flex-col gap-1 mt-2">
                            <label htmlFor="email" className="text-sm">
                                Email address
                            </label>
                            <input
                                className="p-2 border border-orange-500 bg-bg rounded-lg text-white "
                                id="email"
                                type="text"
                                value={session?.user.email}
                                disabled
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="full_name">Full name</label>
                            <input
                                className="p-2 border border-orange-500 bg-bg rounded-lg text-white "
                                id="full_name"
                                name="full_name"
                                type="text"
                                defaultValue={profile?.full_name || ''}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="fullname">Bio</label>
                            <textarea
                                className="p-2 border border-orange-500 bg-bg rounded-lg text-white "
                                id="bio"
                                defaultValue={profile?.bio || ''}
                                name="bio"
                            />
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div>Profile photo</div>
                        <div className="flex flex-col gap-2 items-center  ">
                            <ImageUploadWrapper
                                onUpload={async (url) => {
                                    try {
                                        const { data } = supabase.storage
                                            .from('avatars')
                                            .getPublicUrl(url);
                                        setAvatarUrl(data.publicUrl);
                                    } catch (error) {
                                        console.log(
                                            'Error downloading image: ',
                                            error
                                        );
                                    }
                                }}
                                uid={profile?.id as string}
                            >
                                <div className="aspect-w-1 w-40 h-40 overflow-hidden rounded-full bg-pc ">
                                    {avatar_url ? (
                                        <Image
                                            src={avatar_url}
                                            layout="fill"
                                            alt="post"
                                            objectFit="cover"
                                            onLoadingComplete={() =>
                                                setLoading(false)
                                            }
                                        />
                                    ) : (
                                        <PhotoIcon className="bg-sc text-bg" />
                                    )}
                                </div>
                            </ImageUploadWrapper>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="username" className="text-sm">
                                Username
                            </label>
                            <input
                                className="p-2 border border-impact bg-pc rounded-lg text-white "
                                id="username"
                                name="username"
                                type="text"
                                defaultValue={profile?.username || ''}
                            />
                        </div>
                    </div>

                    <div className="col-start-4 w-full">
                        <button
                            className="button primary block float-right bg-impact w-full py-2 text-white rounded-lg"
                            type="submit"
                            disabled={loading}
                        >
                            {loading || profileUpdate.isLoading
                                ? 'Loading ...'
                                : 'Update'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
