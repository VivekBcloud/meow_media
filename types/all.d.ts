export type postType = {
    id: string;
    content: string;
    img_url: string;
    created_at: string;
    user_id: { avatar_url: string; username: string };
};

export type likeType = {
    id: string;
    created_at: string;
    user_id: string;
    post_id: string;
};

export interface Profile {
    id: string;
    username: string;
    full_name: string;
    avatar_url: string;
}
