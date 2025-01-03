export type postType = {
    id: string;
    content: string;
    img_url: string;
    avatar_url: string;
    username: string;
    created_at: string;
    likes: number;
    user_id: string;
};

export type likeType = {
    id?: string;
    created_at?: string;
    user_id: string;
    post_id: string;
};

export interface Profile {
    id: string;
    username: string;
    full_name: string;
    avatar_url: string;
    bio: string;
}

export type commentType = {
    id: string;
    comment: string;
    post_id: string;
    created_at: string;
    user_id: string;
};

export type commentReturnType = {
    id: string;
    comment: string;
    post_id: string;
    created_at: string;
    user_id: Profile;
};

export type activityType = {
    id: string;
    user_id: string;
    type: 'post';
    created_at: string;
};
