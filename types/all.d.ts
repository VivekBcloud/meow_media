export type postType = {
    id: string;
    user_id: string;
    content: string;
    img_url: string;
    created_at: string;
    user_email: { image: string; name: string };
};

export type likeType = {
    id: string;
    created_at: string;
    user_id: string;
    post_id: string;
};
