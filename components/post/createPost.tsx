import React, { FC, useState } from 'react';
import Image from 'next/image';

import Modal from '../modal';
import PostForm from './postForm';

interface PropType {
    avatar_url: string;
}

const CreatePost: FC<PropType> = ({ avatar_url }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex  bg-pc p-3 rounded-lg gap-2 items-center ">
            <div className="col-span-1 flex items-center">
                <Image
                    src={avatar_url || '/profile_2.svg'}
                    alt="profile"
                    height={40}
                    width={40}
                    objectFit="cover"
                    className="rounded-full"
                />
            </div>
            <div className="flex-grow">
                <button
                    type="button"
                    className="w-full bg-sc py-3 px-3 rounded-lg text-white text-sm placeholder:text-white/30 hover:bg-bg duration-150"
                    onClick={() => setOpen(true)}
                >
                    {'Create a post'}
                </button>
                <Modal open={open} setOpen={setOpen}>
                    <PostForm method="ADD" setOpen={setOpen} />
                </Modal>
            </div>
        </div>
    );
};

export default CreatePost;
